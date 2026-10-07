import test, { type TestContext } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtemp, mkdir, rm, stat, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import config, { resolveWorkers } from "../playwright.config.ts";

const require = createRequire(import.meta.url);
const root = fileURLToPath(new URL("../", import.meta.url));
const cli = require.resolve("@playwright/test/cli");
const testModule = import.meta.resolve("@playwright/test");
const configModule = new URL("../playwright.config.ts", import.meta.url).href;

interface FixtureResult {
  status: string;
  retry: number;
  attachments: { name: string; path?: string }[];
}

interface FixtureReport {
  stats: { expected: number; unexpected: number; flaky: number };
  errors: { message: string }[];
  suites: {
    specs: { title: string; tests: { results: FixtureResult[] }[] }[];
  }[];
}

test("default workers stay within the available CPUs and the measured two-worker limit", () => {
  for (const cpus of [1, 2, 4, 16])
    assert.equal(resolveWorkers(undefined, cpus), Math.min(2, cpus));
});

test("worker overrides require an explicit positive safe integer", () => {
  for (const value of ["1", "2", "3", "4", "16"])
    assert.equal(resolveWorkers(value, 2), Number(value));
  for (const value of [
    "",
    "0",
    "-1",
    "2.5",
    "50%",
    "2x",
    " 2",
    "02",
    "Infinity",
    "9007199254740992",
  ])
    assert.throws(() => resolveWorkers(value), /positive integer/);
});

test("all four browser profiles retain strict failure checks and retry-only tracing", () => {
  assert.equal(config.retries, 1);
  assert.equal(config.failOnFlakyTests, true);
  assert.equal(config.forbidOnly, Boolean(process.env.CI));
  assert.equal(config.use?.trace, "on-first-retry");
  assert.equal(config.use?.screenshot, "only-on-failure");
  assert.deepEqual(
    config.projects?.map((project) => project.name),
    ["desktop", "mobile", "webkit", "mobile-webkit"],
  );
});

async function fixture(t: TestContext, source: string) {
  const dir = await mkdtemp(join(tmpdir(), "versacrum-browser-runner-"));
  t.after(() => rm(dir, { recursive: true, force: true }));
  await mkdir(join(dir, "tests"));
  await writeFile(join(dir, "package.json"), '{"type":"module"}\n');
  await writeFile(
    join(dir, "playwright.config.ts"),
    `import config from ${JSON.stringify(configModule)};
export default {
  ...config,
  testDir: './tests',
  outputDir: './results',
  projects: config.projects.filter(project => project.name === 'desktop'),
  workers: 1,
  reporter: [['json']],
  webServer: undefined,
  timeout: 5000,
};
`,
  );
  await writeFile(
    join(dir, "tests", "fixture.spec.ts"),
    `import { test, expect } from ${JSON.stringify(testModule)};\n${source}`,
  );
  const result = spawnSync(
    process.execPath,
    [cli, "test", "--config", join(dir, "playwright.config.ts")],
    {
      cwd: root,
      env: { ...process.env, CI: "true" },
      encoding: "utf8",
      timeout: 60_000,
      maxBuffer: 4 * 1024 * 1024,
    },
  );
  assert.ifError(result.error);
  assert.equal(result.status, 1, result.stderr + result.stdout);
  const report = JSON.parse(result.stdout) as FixtureReport;
  return report;
}

function attempts(report: FixtureReport, title: string) {
  const spec = report.suites
    .flatMap((suite) => suite.specs)
    .find((spec) => spec.title === title);
  assert.ok(spec, `Missing fixture test: ${title}`);
  return spec.tests[0].results;
}

const traces = (result: FixtureResult) =>
  result.attachments.filter((attachment) => attachment.name === "trace");

async function assertRetryTrace(results: FixtureResult[], status: string) {
  assert.deepEqual(
    results.map((result) => [result.retry, result.status]),
    [
      [0, "failed"],
      [1, status],
    ],
  );
  assert.equal(traces(results[0]).length, 0);
  assert.equal(
    results[0].attachments.filter(
      (attachment) => attachment.name === "screenshot",
    ).length,
    1,
  );
  const attachments = traces(results[1]);
  assert.equal(attachments.length, 1);
  assert.ok(attachments[0].path);
  assert.ok((await stat(attachments[0].path)).size > 0);
}

test("real Playwright blocks a flaky test even if its diagnostic retry succeeds", async (t) => {
  const report = await fixture(
    t,
    `test('passes immediately', async ({ page }) => {
  await page.setContent('<h1>Ready</h1>');
  await expect(page.locator('h1')).toHaveText('Ready');
});
test('passes only on retry', async ({ page }, testInfo) => {
  await page.setContent('<h1>Retry diagnostic</h1>');
  expect(testInfo.retry).toBe(1);
});
`,
  );
  assert.equal(report.stats.expected, 1);
  assert.equal(report.stats.flaky, 1);
  assert.equal(report.stats.unexpected, 0);
  assert.equal(report.errors.length, 0);
  const passed = attempts(report, "passes immediately");
  assert.equal(passed.length, 1);
  assert.equal(passed[0].retry, 0);
  assert.equal(passed[0].attachments.length, 0);
  await assertRetryTrace(attempts(report, "passes only on retry"), "passed");
});

test("real Playwright keeps a failed diagnostic retry and its trace", async (t) => {
  const report = await fixture(
    t,
    `test('always fails', async ({ page }) => {
  await page.setContent('<h1>Failure diagnostic</h1>');
  expect(false).toBe(true);
});\n`,
  );
  assert.equal(report.stats.expected, 0);
  assert.equal(report.stats.flaky, 0);
  assert.equal(report.stats.unexpected, 1);
  assert.equal(report.errors.length, 0);
  await assertRetryTrace(attempts(report, "always fails"), "failed");
});

test("real Playwright still rejects focused tests in verification mode", async (t) => {
  const report = await fixture(
    t,
    "test.only('focused test', () => { expect(true).toBe(true); });\n",
  );
  assert.equal(report.stats.expected, 0);
  assert.match(
    report.errors.map((error) => error.message).join("\n"),
    /\.only/,
  );
});
