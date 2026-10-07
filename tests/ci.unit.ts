import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import config from "../playwright.config.ts";

interface Step {
  "continue-on-error"?: boolean | string;
  uses?: string;
  run?: string;
  if?: string;
  id?: string;
  with?: Record<string, string | number | boolean>;
}

interface Job {
  "continue-on-error"?: boolean | string;
  if?: string;
  needs?: string | string[];
  permissions?: Record<string, string>;
  environment?: { name: string };
  env?: Record<string, string>;
  strategy?: {
    "fail-fast": boolean;
    matrix: { include: { project: string; browser: string }[] };
  };
  steps: Step[];
}

interface Workflow {
  on: {
    push: { branches: string[]; tags: string[] };
    pull_request: { branches: string[] };
    workflow_dispatch: unknown;
    pull_request_target?: unknown;
  };
  permissions: Record<string, string>;
  env: Record<string, string>;
  concurrency: { group: string; "cancel-in-progress": string };
  jobs: Record<string, Job>;
}

const root = new URL("../", import.meta.url);
function nativeJson(args: string[]) {
  const result = spawnSync("mise", ["-E", "ci", ...args], {
    cwd: root,
    encoding: "utf8",
  });
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  return JSON.parse(result.stdout);
}
const workflow: Workflow = nativeJson([
  "exec",
  "--",
  "yq",
  "-o=json",
  ".",
  ".github/workflows/deploy.yml",
]);
const tasks: { name: string; run: string[] }[] = nativeJson([
  "tasks",
  "--json",
]);
const task = (name: string) => {
  const found = tasks.find((item) => item.name === name);
  assert.ok(found, `Missing mise task: ${name}`);
  return found.run;
};
const artifactStep = (job: Job, action: string) => {
  const step = job.steps.find((item) => item.uses?.startsWith(`${action}@`));
  assert.ok(step, `Missing ${action}`);
  return step;
};

const { checks, browser, deploy } = workflow.jobs;

test("CI checks branches, pull requests and tags; only a pushed release tag may deploy after all checks", () => {
  assert.deepEqual(workflow.on.push.branches, ["main", "master"]);
  assert.deepEqual(workflow.on.push.tags, ["v*"]);
  assert.deepEqual(workflow.on.pull_request.branches, ["main", "master"]);
  assert.ok("workflow_dispatch" in workflow.on);
  assert.ok(!("pull_request_target" in workflow.on));
  assert.equal(
    deploy.if,
    "github.event_name == 'push' && startsWith(github.ref, 'refs/tags/v')",
  );
  assert.deepEqual(deploy.needs, ["checks", "browser"]);
  assert.equal(browser.needs, "checks");
  assert.equal(workflow.env.CI, "true");
  assert.equal(workflow.env.MISE_ENV, "ci");
  assert.equal(
    workflow.env.RELEASE_TAG,
    "${{ startsWith(github.ref, 'refs/tags/v') && github.ref_name || '' }}",
  );
  assert.match(workflow.concurrency.group, /pages-release/);
  assert.equal(
    workflow.concurrency["cancel-in-progress"],
    "${{ !startsWith(github.ref, 'refs/tags/v') }}",
  );
});

test("CI preserves every local check and never regenerates versioned site images", async () => {
  const commands = task("ci:checks");
  for (const script of [
    "format:check",
    "build",
    "check",
    "test:seo",
    "test:images",
    "test:deploy",
    "test:ci",
  ]) {
    assert.ok(commands.includes(`npm run ${script}`), `Missing ${script}`);
  }
  assert.ok(commands.includes("actionlint"));
  assert.ok(
    commands.includes("npm_config_allow_scripts= npm audit --audit-level=high"),
  );
  assert.ok(
    commands.indexOf("npm run build") < commands.indexOf("npm run test:seo"),
  );
  assert.ok(checks.steps.some((step) => step.run === "mise run ci:checks"));
  const scripts = JSON.parse(
    await readFile(new URL("package.json", root), "utf8"),
  ).scripts;
  assert.match(scripts.test, /npm run test:ci/);
  const runs = [
    ...commands,
    ...task("ci:browser"),
    ...Object.values(workflow.jobs).flatMap((job) =>
      job.steps.map((step) => step.run ?? ""),
    ),
  ];
  assert.ok(!runs.some((command) => /npm run images\b/.test(command)));
});

test("browser jobs cover the same four projects without skipping or forgiving failures", () => {
  const expected = config.projects?.map((project) => ({
    project: project.name,
    browser:
      project.use?.browserName ??
      project.use?.defaultBrowserType ??
      config.use?.browserName ??
      config.use?.defaultBrowserType ??
      "chromium",
  }));
  assert.equal(expected?.length, 4);
  assert.deepEqual(browser.strategy?.matrix.include, expected);
  assert.equal(browser.strategy?.["fail-fast"], false);
  assert.equal(browser.env?.PLAYWRIGHT_PROJECT, "${{ matrix.project }}");
  assert.equal(browser.env?.PLAYWRIGHT_WORKERS, "2");
  assert.deepEqual(task("ci:browser"), [
    'npm run test:browser -- --project="$PLAYWRIGHT_PROJECT"',
  ]);
  assert.ok(browser.steps.some((step) => step.run === "mise run ci:browser"));
  const runner = browser.steps.filter(
    (step) => step.run === "npm run test:runner",
  );
  assert.equal(runner.length, 1);
  assert.equal(runner[0].if, "matrix.project == 'desktop'");
  assert.equal(config.failOnFlakyTests, true);
  assert.equal(config.retries, 1);
});

test("browsers and Pages consume the checked build, never a separate rebuild", () => {
  const upload = artifactStep(checks, "actions/upload-artifact");
  assert.equal(upload.with?.name, "site-build");
  assert.equal(upload.with?.path, "./dist");
  assert.equal(upload.with?.["if-no-files-found"], "error");
  assert.equal(upload.with?.overwrite, true);
  for (const job of [browser, deploy]) {
    const download = artifactStep(job, "actions/download-artifact");
    assert.equal(download.with?.name, upload.with?.name);
    assert.equal(download.with?.path, upload.with?.path);
    assert.ok(!job.steps.some((step) => /npm run build/.test(step.run ?? "")));
  }
  assert.equal(
    artifactStep(deploy, "actions/upload-pages-artifact").with?.path,
    "./dist",
  );
  const reports = artifactStep(browser, "actions/upload-artifact");
  assert.equal(reports.if, "${{ !cancelled() }}");
  for (const directory of [
    "playwright-report/",
    "test-results/",
    "artifacts/",
  ]) {
    assert.ok(String(reports.with?.path).includes(directory));
  }
});

test("actions are SHA-pinned; write permissions and credentials stay out of test jobs", () => {
  assert.deepEqual(workflow.permissions, { contents: "read" });
  for (const [name, job] of Object.entries(workflow.jobs)) {
    if (name !== "deploy") assert.equal(job.permissions, undefined);
    assert.equal(job["continue-on-error"], undefined);
    for (const step of job.steps) {
      assert.equal(step["continue-on-error"], undefined);
      if (step.uses) assert.match(step.uses, /@[a-f0-9]{40}$/);
      if (step.uses?.startsWith("actions/checkout@")) {
        assert.equal(step.with?.["persist-credentials"], false);
      }
      if (step.uses?.startsWith("jdx/mise-action@")) {
        assert.equal(step.with?.persist_github_token, false);
        assert.equal(step.with?.add_shims_to_path, false);
        // Restores are read-only; every cache write uses an explicit guarded save step.
        assert.equal(step.with?.cache, false);
      }
      if (step.uses?.startsWith("actions/cache/save@")) {
        assert.match(step.if ?? "", /^github.event_name == 'push' && /);
      }
    }
  }
  assert.deepEqual(deploy.permissions, {
    contents: "read",
    pages: "write",
    "id-token": "write",
  });
  assert.equal(deploy.environment?.name, "github-pages");
});

test("local hooks contain only image generation, not the obsolete pre-push script", () => {
  const hooks = nativeJson([
    "exec",
    "--",
    "yq",
    "-o=json",
    ".",
    "lefthook.yml",
  ]);
  assert.deepEqual(Object.keys(hooks), ["pre-commit"]);
  assert.match(
    hooks["pre-commit"].commands.images.run,
    /mise exec -- npm run images/,
  );
  assert.equal(
    existsSync(new URL(".lefthook/pre-push/verify.sh", root)),
    false,
  );
});

test("the actual workflow shell step discovers the installed Playwright version", async () => {
  const directory = await mkdtemp(join(tmpdir(), "versacrum-ci-version-"));
  try {
    const output = join(directory, "outputs");
    const step = browser.steps.find((step) => step.id === "playwright");
    assert.ok(step?.run);
    const result = spawnSync("bash", ["-eu", "-c", step.run], {
      cwd: root,
      encoding: "utf8",
      env: { ...process.env, GITHUB_OUTPUT: output },
    });
    assert.equal(result.status, 0, result.stderr);
    const { version } = JSON.parse(
      await readFile(
        new URL("node_modules/@playwright/test/package.json", root),
        "utf8",
      ),
    );
    assert.equal(await readFile(output, "utf8"), `version=${version}\n`);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
