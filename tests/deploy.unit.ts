import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  chmod,
  mkdtemp,
  mkdir,
  readFile,
  rm,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  assertReleaseFiles,
  deploy,
  nextVersion,
  parseOptions,
  type RunCommand,
} from "../scripts/deploy.ts";
import { resolveReleaseTag } from "../src/lib/release-version.ts";

test("release versions increment predictably and never overwrite an existing version", () => {
  assert.equal(nextVersion("2.0.0", "patch", []), "2.0.1");
  assert.equal(nextVersion("2.3.9", "minor", []), "2.4.0");
  assert.equal(nextVersion("2.3.9", "major", []), "3.0.0");
  assert.equal(nextVersion("2.0.0", "patch", ["v2.0.10", "v2.0.9"]), "2.0.11");
  assert.equal(nextVersion("2.0.0", "v2.1.0", []), "2.1.0");
  assert.equal(
    nextVersion("2.0.0", "patch", ["preview", "v3.0.0-rc.1"]),
    "2.0.1",
  );
  for (const version of [
    "1.9.9",
    "2.0.0",
    "02.1.0",
    "2.1.0-rc.1",
    "2.1.0; echo bad",
  ])
    assert.throws(() => nextVersion("2.0.0", version, []));
  assert.throws(() => nextVersion("2.0.0", "2.1.0", ["v2.2.0"]), /newer/);
  assert.throws(
    () => nextVersion("2.0.9007199254740991", "patch", []),
    /too large/,
  );
});

test("CLI defaults, explicit versions, planning and retry are unambiguous", () => {
  assert.deepEqual(parseOptions([]), {
    version: "patch",
    dryRun: false,
    retry: false,
  });
  assert.deepEqual(parseOptions(["minor", "--dry-run"]), {
    version: "minor",
    dryRun: true,
    retry: false,
  });
  assert.equal(parseOptions(["v2.1.0"]).version, "v2.1.0");
  assert.equal(parseOptions(["--retry"]).retry, true);
  for (const args of [
    ["--force"],
    ["minor", "patch"],
    ["--retry", "minor"],
    ["2.1.0-beta.1"],
  ])
    assert.throws(() => parseOptions(args));
});

test("build version uses the release tag and rejects mismatched or unsafe values", () => {
  assert.equal(resolveReleaseTag("2.0.1"), "v2.0.1");
  assert.equal(resolveReleaseTag("2.0.1", "v2.0.1"), "v2.0.1");
  for (const tag of ["v2.0.0", "main", "v2.0.1<script>"])
    assert.throws(() => resolveReleaseTag("2.0.1", tag), /does not match/);
  assert.throws(() => resolveReleaseTag("02.0.1"), /Invalid/);
});

test("release staging is limited to version metadata and generated images", () => {
  assert.doesNotThrow(() =>
    assertReleaseFiles([
      "package.json",
      "package-lock.json",
      "src/image-manifest.json",
      "src/public/apple-touch-icon.png",
      "src/public/images/new-photo.avif",
    ]),
  );
  for (const file of [
    "README.md",
    ".env",
    "src/main.ts",
    "src/public/images-other/secret",
  ])
    assert.throws(() => assertReleaseFiles([file]), /Unexpected/);
});

interface FixtureOptions {
  branch?: string;
  dirty?: boolean;
  behind?: boolean;
  changedFiles?: string[];
  pushFails?: boolean;
  imagesFail?: boolean;
  watchFails?: boolean;
  retryTagMatches?: boolean;
  runFailed?: boolean;
  releaseExists?: boolean;
  noWorkflow?: boolean;
  tagPolicyExists?: boolean;
  protectedOnly?: boolean;
  tags?: string[];
}

function fixture(options: FixtureOptions = {}) {
  const calls: {
    command: string;
    args: string[];
    env?: Record<string, string>;
  }[] = [];
  const sha = "a".repeat(40);
  const run: RunCommand = (command, args, _capture, env) => {
    calls.push({ command, args, env });
    if (command === "git") {
      if (args[0] === "branch") return options.branch ?? "main";
      if (args[0] === "tag" && args[1] === "--list")
        return (options.tags ?? []).join("\n");
      if (args[0] === "status") return options.dirty ? " M src/main.ts" : "";
      if (args[0] === "merge-base" && options.behind) throw new Error("behind");
      if (args[0] === "diff")
        return (
          options.changedFiles ?? ["package.json", "package-lock.json"]
        ).join("\0");
      if (args[0] === "rev-parse")
        return args.includes("--verify") && options.retryTagMatches === false
          ? "b".repeat(40)
          : sha;
      if (args[0] === "push" && options.pushFails)
        throw new Error("pre-push checks failed");
      return "";
    }
    if (command === process.execPath && args[0] === "-p") return "2.0.0";
    if (
      command === "npm" &&
      args.join(" ") === "run images" &&
      options.imagesFail
    )
      throw new Error("image generation failed");
    if (command === "mise") {
      const gh = args.slice(3);
      if (gh[0] === "repo") return "angelofb/versacrum";
      if (gh[0] === "api" && !gh.includes("--method")) {
        if (gh[1].endsWith("deployment-branch-policies"))
          return JSON.stringify({
            branch_policies: [
              { name: "main", type: "branch" },
              ...(options.tagPolicyExists ? [{ name: "v*", type: "tag" }] : []),
            ],
          });
        return JSON.stringify({
          deployment_branch_policy: {
            custom_branch_policies: !options.protectedOnly,
            protected_branches: Boolean(options.protectedOnly),
          },
        });
      }
      if (gh[0] === "run" && gh[1] === "list")
        return JSON.stringify(
          options.noWorkflow
            ? []
            : [
                {
                  databaseId: 123,
                  status: "completed",
                  conclusion: options.runFailed ? "failure" : "success",
                  url: "https://github.com/angelofb/versacrum/actions/runs/123",
                },
              ],
        );
      if (gh[0] === "run" && gh[1] === "watch" && options.watchFails)
        throw new Error("Action failed");
      if (gh[0] === "release" && gh[1] === "view" && !options.releaseExists)
        throw new Error("release not found");
      if (gh[0] === "release")
        return "https://github.com/angelofb/versacrum/releases/tag/v2.0.1";
    }
    return "";
  };
  const confirmed: string[] = [];
  const confirm = async (tag: string) => {
    confirmed.push(tag);
  };
  const wait = async () => {};
  return { calls, run, confirm, wait, confirmed, sha };
}

const command = (
  calls: ReturnType<typeof fixture>["calls"],
  name: string,
  firstArg: string,
) =>
  calls.findIndex((call) => call.command === name && call.args[0] === firstArg);
const ghCommand = (
  calls: ReturnType<typeof fixture>["calls"],
  ...prefix: string[]
) =>
  calls.findIndex(
    (call) =>
      call.command === "mise" &&
      prefix.every((arg, index) => call.args[index + 3] === arg),
  );

test("deploy prepares assets, commits, annotates, atomically pushes through hooks, then waits and publishes release", async () => {
  const f = fixture();
  await deploy(parseOptions([]), f.run, f.wait, f.confirm);
  const push = f.calls.find(
    (call) => call.command === "git" && call.args[0] === "push",
  )!;
  assert.deepEqual(push.args, [
    "push",
    "--atomic",
    "origin",
    "HEAD:refs/heads/main",
    "refs/tags/v2.0.1:refs/tags/v2.0.1",
  ]);
  assert.equal(push.env?.RELEASE_TAG, "v2.0.1");
  assert.equal(push.env?.LEFTHOOK, "1");
  assert.ok(
    f.calls.some(
      (call) =>
        call.command === "npm" && call.args.join(" ") === "run hooks:install",
    ),
  );
  assert.ok(
    f.calls.some(
      (call) =>
        call.command === "npm" &&
        call.args.join(" ") === "run browsers:install",
    ),
  );
  assert.ok(
    f.calls.some(
      (call) => call.command === "npm" && call.args.join(" ") === "run images",
    ),
  );
  const annotated = f.calls.findIndex(
    (call) =>
      call.command === "git" && call.args[0] === "tag" && call.args[1] === "-a",
  );
  assert.ok(command(f.calls, "git", "commit") < annotated);
  assert.ok(annotated < command(f.calls, "git", "push"));
  assert.ok(
    command(f.calls, "git", "push") < ghCommand(f.calls, "run", "watch"),
  );
  assert.ok(
    ghCommand(f.calls, "run", "watch") <
      ghCommand(f.calls, "release", "create"),
  );
  assert.deepEqual(f.confirmed, ["v2.0.1"]);
  assert.ok(
    f.calls[ghCommand(f.calls, "release", "create")].args.includes(
      "--verify-tag",
    ),
  );
});

test("dry-run plans a release without installing, generating, committing, tagging or publishing", async () => {
  const f = fixture();
  await deploy(parseOptions(["--dry-run"]), f.run, f.wait, f.confirm);
  for (const step of ["commit", "push", "add"])
    assert.equal(command(f.calls, "git", step), -1);
  assert.ok(
    !f.calls.some(
      (call) =>
        call.command === "git" &&
        call.args[0] === "tag" &&
        call.args[1] === "-a",
    ),
  );
  assert.ok(
    !f.calls.some((call) => call.command === "npm" && call.args[0] !== "pkg"),
  );
  assert.equal(ghCommand(f.calls, "release", "create"), -1);
  assert.deepEqual(f.confirmed, []);
});

test("release planning reads the real manifest without depending on npm output", async () => {
  const f = fixture();
  let actualVersion = "";
  const run: RunCommand = (command, args, capture, env) => {
    if (command === process.execPath) {
      const result = spawnSync(command, args, {
        cwd: new URL("../", import.meta.url),
        encoding: "utf8",
      });
      assert.equal(result.status, 0, result.stderr);
      actualVersion = result.stdout.trim();
      return actualVersion;
    }
    assert.ok(!(command === "npm" && args[0] === "pkg"));
    return f.run(command, args, capture, env);
  };
  await deploy(parseOptions(["--dry-run"]), run, f.wait, f.confirm);
  const manifest = JSON.parse(
    await readFile(new URL("../package.json", import.meta.url), "utf8"),
  );
  assert.equal(actualVersion, manifest.version);
  assert.equal(command(f.calls, "git", "push"), -1);
});

test("dirty trees, wrong branches and diverged branches stop before preparing a release", async () => {
  for (const options of [
    { dirty: true },
    { branch: "feature" },
    { branch: "" },
    { behind: true },
  ]) {
    const f = fixture(options);
    await assert.rejects(deploy(parseOptions([]), f.run, f.wait, f.confirm));
    assert.equal(command(f.calls, "git", "push"), -1);
    assert.ok(
      !f.calls.some((call) => call.command === "npm" && call.args[0] === "ci"),
    );
  }
});

test("unexpected source changes and failed pre-push checks prevent publication", async () => {
  for (const options of [
    { changedFiles: ["src/main.ts"] },
    { pushFails: true },
  ]) {
    const f = fixture(options);
    await assert.rejects(deploy(parseOptions([]), f.run, f.wait, f.confirm));
    assert.equal(ghCommand(f.calls, "run", "watch"), -1);
    assert.equal(ghCommand(f.calls, "release", "create"), -1);
    assert.deepEqual(f.confirmed, []);
  }
});

test("failed image generation stops before versioning, committing, tagging or pushing", async () => {
  const f = fixture({ imagesFail: true });
  await assert.rejects(
    deploy(parseOptions([]), f.run, f.wait, f.confirm),
    /image generation failed/,
  );
  assert.ok(
    !f.calls.some(
      (call) => call.command === "npm" && call.args[0] === "version",
    ),
  );
  assert.equal(command(f.calls, "git", "commit"), -1);
  assert.equal(command(f.calls, "git", "push"), -1);
  assert.equal(ghCommand(f.calls, "release", "create"), -1);
});

test("failed Actions or a missing workflow do not publish a GitHub Release", async () => {
  for (const options of [{ watchFails: true }, { noWorkflow: true }]) {
    const f = fixture(options);
    await assert.rejects(deploy(parseOptions([]), f.run, f.wait, f.confirm));
    assert.equal(ghCommand(f.calls, "release", "create"), -1);
    assert.deepEqual(f.confirmed, []);
  }
});

test("retry reuses the same tag and can rerun a failed Action without incrementing or retagging", async () => {
  const f = fixture({ runFailed: true, releaseExists: true });
  await deploy(parseOptions(["--retry"]), f.run, f.wait, f.confirm);
  assert.ok(
    !f.calls.some(
      (call) => call.command === "npm" && call.args[0] === "version",
    ),
  );
  assert.equal(command(f.calls, "git", "commit"), -1);
  assert.ok(
    !f.calls.some(
      (call) =>
        call.command === "git" &&
        call.args[0] === "tag" &&
        call.args[1] === "-a",
    ),
  );
  assert.notEqual(ghCommand(f.calls, "run", "rerun"), -1);
  assert.equal(ghCommand(f.calls, "release", "create"), -1);
  assert.deepEqual(f.confirmed, ["v2.0.0"]);
  const changed = fixture({ retryTagMatches: false });
  await assert.rejects(
    deploy(
      parseOptions(["--retry"]),
      changed.run,
      changed.wait,
      changed.confirm,
    ),
    /current HEAD/,
  );
});

test("release tag environment policy is added once without replacing existing policies", async () => {
  const f = fixture();
  await deploy(parseOptions([]), f.run, f.wait, f.confirm);
  const policy = f.calls.find(
    (call) => call.command === "mise" && call.args.includes("POST"),
  )!;
  assert.ok(policy.args.includes("name=v*"));
  assert.ok(policy.args.includes("type=tag"));
  assert.ok(
    !f.calls.some(
      (call) => call.args.includes("DELETE") || call.args.includes("PUT"),
    ),
  );
  const existing = fixture({ tagPolicyExists: true });
  await deploy(parseOptions([]), existing.run, existing.wait, existing.confirm);
  assert.ok(!existing.calls.some((call) => call.args.includes("POST")));
  const protectedOnly = fixture({ protectedOnly: true });
  await assert.rejects(
    deploy(
      parseOptions([]),
      protectedOnly.run,
      protectedOnly.wait,
      protectedOnly.confirm,
    ),
    /protected branches/,
  );
  assert.equal(command(protectedOnly.calls, "git", "push"), -1);
});

test("retry cannot redeploy an older release when newer tags exist", async () => {
  const f = fixture({ tags: ["v2.0.0", "v2.0.1"] });
  await assert.rejects(
    deploy(parseOptions(["--retry"]), f.run, f.wait, f.confirm),
    /newer release/,
  );
  assert.equal(command(f.calls, "git", "push"), -1);
});

test("the public version must be confirmed before publishing the GitHub Release", async () => {
  const f = fixture();
  await assert.rejects(
    deploy(parseOptions([]), f.run, f.wait, async () => {
      throw new Error("stale CDN");
    }),
    /stale CDN/,
  );
  assert.equal(ghCommand(f.calls, "release", "create"), -1);
});

test("real Lefthook blocks tag-only and atomic release pushes when checks fail", async () => {
  const directory = await mkdtemp(join(tmpdir(), "versacrum-release-hooks-"));
  const local = join(directory, "local");
  const remote = join(directory, "remote.git");
  const native = (command: string, args: string[], allowFailure = false) => {
    const result = spawnSync(command, args, { cwd: local, encoding: "utf8" });
    if (!allowFailure)
      assert.equal(
        result.status,
        0,
        `${command} ${args.join(" ")}\n${result.stdout}\n${result.stderr}`,
      );
    return result;
  };
  try {
    await mkdir(join(local, ".lefthook", "pre-push"), { recursive: true });
    await writeFile(
      join(local, "lefthook.yml"),
      await readFile(new URL("../lefthook.yml", import.meta.url)),
    );
    await writeFile(
      join(local, ".lefthook", "pre-push", "verify.sh"),
      await readFile(
        new URL("../.lefthook/pre-push/verify.sh", import.meta.url),
      ),
    );
    await chmod(join(local, ".lefthook", "pre-push", "verify.sh"), 0o755);
    const packageFile = join(local, "package.json");
    const packageData = {
      name: "release-hook-fixture",
      private: true,
      scripts: { verify: "node -e 'process.exit(1)'" },
    };
    await writeFile(packageFile, `${JSON.stringify(packageData)}\n`);
    await writeFile(join(local, "README.md"), "fixture\n");
    native("git", ["init", "--bare", remote]);
    native("git", ["init", "--initial-branch=main"]);
    native("git", ["config", "user.name", "Release test"]);
    native("git", ["config", "user.email", "release-test@example.invalid"]);
    native("git", ["add", "."]);
    native("git", ["commit", "-m", "fixture"]);
    native("git", ["remote", "add", "origin", remote]);
    native("git", ["push", "origin", "main"]);
    const initial = native("git", ["rev-parse", "HEAD"]).stdout.trim();
    native("mise", ["exec", "--", "lefthook", "install"]);
    assert.equal(native("git", ["status", "--porcelain"]).stdout.trim(), "");

    native("git", ["tag", "-a", "v0.0.1", "-m", "tag-only fixture"]);
    const tagOnly = native("git", ["push", "origin", "refs/tags/v0.0.1"], true);
    assert.notEqual(tagOnly.status, 0);
    assert.match(`${tagOnly.stdout}${tagOnly.stderr}`, /verify\.sh/);
    assert.match(`${tagOnly.stdout}${tagOnly.stderr}`, /process\.exit\(1\)/);
    assert.equal(
      native("git", ["ls-remote", "--tags", "origin"]).stdout.trim(),
      "",
    );

    await writeFile(join(local, "README.md"), "changed fixture\n");
    native("git", ["add", "README.md"]);
    native("git", ["commit", "-m", "changed fixture"]);
    native("git", ["tag", "-a", "v0.0.2", "-m", "atomic fixture"]);
    const atomic = native(
      "git",
      [
        "push",
        "--atomic",
        "origin",
        "HEAD:refs/heads/main",
        "refs/tags/v0.0.2:refs/tags/v0.0.2",
      ],
      true,
    );
    assert.notEqual(atomic.status, 0);
    assert.equal(
      native("git", ["ls-remote", "origin", "refs/heads/main"]).stdout.split(
        /\s/,
      )[0],
      initial,
    );
    assert.equal(
      native("git", ["ls-remote", "--tags", "origin"]).stdout.trim(),
      "",
    );

    packageData.scripts.verify = "node -e 'process.exit(0)'";
    await writeFile(packageFile, `${JSON.stringify(packageData)}\n`);
    native("git", ["add", "package.json"]);
    native("git", ["commit", "-m", "passing checks fixture"]);
    native("git", ["tag", "-a", "v0.0.3", "-m", "passing fixture"]);
    assert.equal(native("git", ["status", "--porcelain"]).stdout.trim(), "");
    native("git", [
      "push",
      "--atomic",
      "origin",
      "HEAD:refs/heads/main",
      "refs/tags/v0.0.3:refs/tags/v0.0.3",
    ]);
    const released = native("git", ["rev-parse", "HEAD"]).stdout.trim();
    assert.equal(
      native("git", ["ls-remote", "origin", "refs/heads/main"]).stdout.split(
        /\s/,
      )[0],
      released,
    );
    assert.equal(
      native("git", [
        "ls-remote",
        "origin",
        "refs/tags/v0.0.3^{}",
      ]).stdout.split(/\s/)[0],
      released,
    );
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
