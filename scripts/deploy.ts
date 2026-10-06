import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath } from "node:url";
import { stableVersion } from "../src/lib/release-version.ts";
import { site } from "../src/site.config.ts";

export interface DeployOptions {
  version: string;
  dryRun: boolean;
  retry: boolean;
}

export type RunCommand = (
  command: string,
  args: string[],
  capture?: boolean,
  env?: Record<string, string>,
) => string;

type Wait = (milliseconds: number) => Promise<unknown>;

export function parseOptions(args: string[]): DeployOptions {
  let version: string | undefined;
  let dryRun = false;
  let retry = false;
  for (const arg of args) {
    if (arg === "--dry-run") dryRun = true;
    else if (arg === "--retry") retry = true;
    else if (!arg.startsWith("-") && version === undefined) version = arg;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (retry && version !== undefined)
    throw new Error("--retry cannot be combined with a new version");
  const requested = version ?? "patch";
  if (
    !["patch", "minor", "major"].includes(requested) &&
    !stableVersion.test(requested.replace(/^v/, ""))
  )
    throw new Error(
      "Use patch, minor, major, or a stable version such as 2.1.0",
    );
  return { version: requested, dryRun, retry };
}

const parts = (version: string) => {
  if (!stableVersion.test(version))
    throw new Error(`Invalid version: ${version}`);
  const values = version.split(".").map(Number);
  if (!values.every(Number.isSafeInteger))
    throw new Error(`Version components are too large: ${version}`);
  return values;
};

const compare = (left: string, right: string) => {
  const a = parts(left);
  const b = parts(right);
  for (let index = 0; index < 3; index++)
    if (a[index] !== b[index]) return a[index] > b[index] ? 1 : -1;
  return 0;
};

export function nextVersion(
  current: string,
  requested: string,
  tags: string[],
) {
  parts(current);
  const base = tags
    .filter((tag) => tag.startsWith("v") && stableVersion.test(tag.slice(1)))
    .map((tag) => tag.slice(1))
    .reduce(
      (latest, version) => (compare(version, latest) > 0 ? version : latest),
      current,
    );
  let next: string;
  if (["patch", "minor", "major"].includes(requested)) {
    const values = parts(base);
    const index = { major: 0, minor: 1, patch: 2 }[
      requested as "major" | "minor" | "patch"
    ];
    values[index]++;
    for (let following = index + 1; following < 3; following++)
      values[following] = 0;
    next = values.join(".");
  } else next = requested.replace(/^v/, "");
  parts(next);
  if (compare(next, base) <= 0)
    throw new Error(`The release version must be newer than ${base}`);
  return next;
}

export function assertReleaseFiles(files: string[]) {
  for (const file of files) {
    if (
      ![
        "package.json",
        "package-lock.json",
        "src/image-manifest.json",
        "src/public/apple-touch-icon.png",
      ].includes(file) &&
      !file.startsWith("src/public/images/")
    )
      throw new Error(`Unexpected local change during release: ${file}`);
  }
}

const root = fileURLToPath(new URL("../", import.meta.url));

const runCommand: RunCommand = (
  command,
  args,
  capture = false,
  extraEnv = {},
) => {
  const env = { ...process.env, ...extraEnv };
  // npm run exports the user policy as an environment override; keep .npmrc authoritative.
  delete env.npm_config_allow_scripts;
  delete env.NPM_CONFIG_ALLOW_SCRIPTS;
  const result = spawnSync(command, args, {
    cwd: root,
    env,
    encoding: "utf8",
    stdio: capture ? ["ignore", "pipe", "pipe"] : "inherit",
  });
  if (result.error) throw result.error;
  if (result.status !== 0)
    throw new Error(
      `${command} ${args.join(" ")} failed (${result.status ?? result.signal})${result.stderr ? `: ${result.stderr.trim()}` : ""}`,
    );
  return result.stdout?.trim() ?? "";
};

export async function waitForSite(tag: string, wait: Wait = delay) {
  const url = new URL(site.domain);
  url.searchParams.set("release", tag);
  for (let attempt = 0; attempt < 20; attempt++) {
    try {
      const response = await fetch(url, {
        headers: { "Cache-Control": "no-cache" },
        signal: AbortSignal.timeout(10000),
      });
      if (
        response.ok &&
        (await response.text()).includes(`data-site-version="${tag}"`)
      )
        return;
    } catch {
      // Pages or its CDN may not serve the new deployment immediately.
    }
    await wait(3000);
  }
  throw new Error(
    `The Action finished, but ${site.domain} does not yet expose ${tag}. Retry with npm run deploy -- --retry.`,
  );
}

export async function deploy(
  options: DeployOptions,
  run: RunCommand = runCommand,
  wait: Wait = delay,
  confirmSite: (tag: string) => Promise<void> = waitForSite,
) {
  const gh = (args: string[], capture = false) =>
    run("mise", ["exec", "--", "gh", ...args], capture);
  const git = (args: string[], capture = false) => run("git", args, capture);
  const branch = git(["branch", "--show-current"], true);
  if (!["main", "master"].includes(branch))
    throw new Error(
      "Release from main or master, not a feature branch or detached HEAD",
    );
  if (git(["status", "--porcelain"], true))
    throw new Error(
      "Commit or stash local changes before running npm run deploy",
    );

  gh(["auth", "status"]);
  const repository = gh(
    ["repo", "view", "--json", "nameWithOwner", "--jq", ".nameWithOwner"],
    true,
  );
  git(["fetch", "origin", "--tags"]);
  try {
    git(["merge-base", "--is-ancestor", `origin/${branch}`, "HEAD"]);
  } catch {
    throw new Error(
      `Local ${branch} is behind or diverges from origin/${branch}; synchronize it before releasing`,
    );
  }
  // npm's scalar output differs across CLI versions and --json settings.
  // Read the manifest with the same Node executable running this script.
  const current = run(
    process.execPath,
    ["-p", "require('./package.json').version"],
    true,
  );
  const tags = git(["tag", "--list", "v*"], true).split("\n").filter(Boolean);
  const version = options.retry
    ? current
    : nextVersion(current, options.version, tags);
  parts(version);
  const tag = `v${version}`;
  if (!options.retry && tags.includes(tag))
    throw new Error(`Tag ${tag} already exists`);
  if (options.retry) {
    if (
      tags.some(
        (candidate) =>
          candidate.startsWith("v") &&
          stableVersion.test(candidate.slice(1)) &&
          compare(candidate.slice(1), version) > 0,
      )
    )
      throw new Error(`A newer release tag exists; do not redeploy ${tag}`);
    const tagged = git(["rev-parse", "--verify", `${tag}^{commit}`], true);
    if (tagged !== git(["rev-parse", "HEAD"], true))
      throw new Error(
        `--retry requires ${tag} to point to the current HEAD; use a new release for changed code`,
      );
  }
  console.log(`\nRelease ${tag} — ${repository} (${branch})`);
  if (options.dryRun) {
    console.log(
      "Plan only: install dependencies/hooks/browsers, generate images, commit version, tag, atomic push with pre-push checks, wait for Pages, verify the public version, publish GitHub Release.",
    );
    return;
  }

  const environmentPath = `repos/${repository}/environments/github-pages`;
  const environment: {
    deployment_branch_policy: {
      custom_branch_policies: boolean;
      protected_branches: boolean;
    } | null;
  } = JSON.parse(gh(["api", environmentPath], true));
  if (environment.deployment_branch_policy?.protected_branches)
    throw new Error(
      "The github-pages environment allows only protected branches. Configure selected branches/tags before releasing.",
    );
  if (environment.deployment_branch_policy?.custom_branch_policies) {
    const policies: { branch_policies: { name: string; type: string }[] } =
      JSON.parse(
        gh(["api", `${environmentPath}/deployment-branch-policies`], true),
      );
    if (
      !policies.branch_policies.some(
        (policy) => policy.name === "v*" && policy.type === "tag",
      )
    ) {
      console.log(
        "Allowing release tags v* in the github-pages environment (existing policies are preserved)…",
      );
      gh([
        "api",
        `${environmentPath}/deployment-branch-policies`,
        "--method",
        "POST",
        "-f",
        "name=v*",
        "-f",
        "type=tag",
      ]);
    }
  }

  run("npm", ["ci", "--no-audit", "--no-fund"]);
  run("npm", ["run", "hooks:install"]);
  run("npm", ["run", "browsers:install"]);
  if (!options.retry) {
    run("npm", ["run", "images"]);
    run("npm", [
      "version",
      version,
      "--no-git-tag-version",
      "--ignore-scripts",
    ]);
    const files = [
      ...git(["diff", "--name-only", "-z", "HEAD"], true).split("\0"),
      ...git(["ls-files", "--others", "--exclude-standard", "-z"], true).split(
        "\0",
      ),
    ].filter(Boolean);
    assertReleaseFiles(files);
    git([
      "add",
      "--",
      "package.json",
      "package-lock.json",
      "src/image-manifest.json",
      "src/public/images",
      "src/public/apple-touch-icon.png",
    ]);
    git(["commit", "-m", `release: ${tag}`]);
    git(["tag", "-a", tag, "-m", `Release ${tag}`]);
  }
  const sha = git(["rev-parse", "HEAD"], true);
  console.log(
    "\nRunning local pre-push checks and publishing branch + tag atomically…",
  );
  run(
    "git",
    [
      "push",
      "--atomic",
      "origin",
      `HEAD:refs/heads/${branch}`,
      `refs/tags/${tag}:refs/tags/${tag}`,
    ],
    false,
    {
      RELEASE_TAG: tag,
      LEFTHOOK: "1",
      LEFTHOOK_EXCLUDE: "",
    },
  );

  interface WorkflowRun {
    databaseId: number;
    status: string;
    conclusion: string;
    url: string;
  }
  let workflow: WorkflowRun | undefined;
  for (let attempt = 0; attempt < 24; attempt++) {
    const runs: WorkflowRun[] = JSON.parse(
      gh(
        [
          "run",
          "list",
          "--repo",
          repository,
          "--workflow",
          "deploy.yml",
          "--branch",
          tag,
          "--commit",
          sha,
          "--event",
          "push",
          "--limit",
          "1",
          "--json",
          "databaseId,status,conclusion,url",
        ],
        true,
      ),
    );
    if (runs.length) {
      workflow = runs[0];
      break;
    }
    await wait(5000);
  }
  if (!workflow)
    throw new Error(
      `No deployment Action found for ${tag}; inspect GitHub Actions and retry with --retry`,
    );
  console.log(`\nDeployment: ${workflow.url}`);
  if (
    options.retry &&
    workflow.status === "completed" &&
    workflow.conclusion !== "success"
  ) {
    gh(["run", "rerun", String(workflow.databaseId), "--repo", repository]);
    await wait(5000);
  }
  gh([
    "run",
    "watch",
    String(workflow.databaseId),
    "--repo",
    repository,
    "--exit-status",
    "--interval",
    "10",
  ]);
  await confirmSite(tag);

  let releaseUrl: string;
  try {
    releaseUrl = gh(
      [
        "release",
        "view",
        tag,
        "--repo",
        repository,
        "--json",
        "url",
        "--jq",
        ".url",
      ],
      true,
    );
  } catch (error) {
    if (!(error instanceof Error) || !/not found|404/i.test(error.message))
      throw error;
    releaseUrl = gh(
      [
        "release",
        "create",
        tag,
        "--repo",
        repository,
        "--verify-tag",
        "--generate-notes",
        "--title",
        tag,
      ],
      true,
    );
  }
  console.log(
    `\n${tag} is online: ${site.domain}\nGitHub Release: ${releaseUrl}`,
  );
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  if (process.argv.slice(2).includes("--help")) {
    console.log(
      "npm run deploy [-- patch|minor|major|2.1.0] [--dry-run]\nnpm run deploy -- --retry\nDefault: next patch release. Requires a clean main/master branch and GitHub authentication.",
    );
  } else {
    Promise.resolve()
      .then(() => deploy(parseOptions(process.argv.slice(2))))
      .catch((error: unknown) => {
        console.error(
          `\nDeploy stopped: ${error instanceof Error ? error.message : String(error)}`,
        );
        console.error(
          "If a release commit/tag was already created, keep it and use npm run deploy -- --retry. No force-push is used.",
        );
        process.exitCode = 1;
      });
  }
}
