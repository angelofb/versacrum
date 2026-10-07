import { availableParallelism } from "node:os";
import { defineConfig, devices } from "@playwright/test";

export function resolveWorkers(
  override: string | undefined,
  cpus = availableParallelism(),
): number {
  if (override === undefined) return Math.min(2, cpus);
  const workers = Number(override);
  if (!/^[1-9]\d*$/.test(override) || !Number.isSafeInteger(workers))
    throw new Error("PLAYWRIGHT_WORKERS must be a positive integer");
  return workers;
}

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  failOnFlakyTests: true,
  retries: 1,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  workers: resolveWorkers(process.env.PLAYWRIGHT_WORKERS),
  use: {
    baseURL: "http://127.0.0.1:4173",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 1000 },
      },
    },
    {
      name: "mobile",
      use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" },
    },
    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        viewport: { width: 1440, height: 1000 },
      },
    },
    {
      name: "mobile-webkit",
      use: { ...devices["iPhone 13"], defaultBrowserType: "webkit" },
    },
  ],
  webServer: {
    command: "npm run preview -- --port 4173",
    url: "http://127.0.0.1:4173",
  },
});
