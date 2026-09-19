import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const key = "ver-sacrum.analytics-consent.v1";
const id = "G-S4XQ2MLL70";

async function interceptGoogle(page) {
  const requests = [];
  await page.route(
    /https:\/\/.*(google-analytics\.com|googletagmanager\.com)\//,
    async (route) => {
      requests.push(route.request().url());
      await route.fulfill({ contentType: "application/javascript", body: "" });
    },
  );
  return requests;
}

test("Analytics stays blocked before consent and after persistent refusal", async ({
  page,
}) => {
  const requests = await interceptGoogle(page);
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: "Accetta Analytics" }),
  ).toBeVisible();
  expect(requests).toEqual([]);
  expect(await page.evaluate(() => window.dataLayer)).toBeUndefined();
  expect(
    (await new AxeBuilder({ page }).include("#analytics-consent").analyze())
      .violations,
  ).toEqual([]);
  await page.getByRole("button", { name: "Rifiuta Analytics" }).click();
  await page.reload();
  await expect(page.locator("#analytics-consent")).toBeHidden();
  await expect(
    page.getByRole("button", { name: "Preferenze cookie" }),
  ).toBeVisible();
  expect(requests).toEqual([]);
});

test("acceptance loads the correct tag once, persists, and can be withdrawn", async ({
  page,
  context,
}) => {
  const requests = await interceptGoogle(page);
  await page.goto("/?email=private%40example.com#contatti");
  await page.getByRole("button", { name: "Accetta Analytics" }).click();
  await expect.poll(() => requests.length).toBe(1);
  expect(requests[0]).toBe(`https://www.googletagmanager.com/gtag/js?id=${id}`);
  const commands = await page.evaluate(() =>
    window.dataLayer.map((entry) => Array.from(entry)),
  );
  expect(commands[0]).toEqual([
    "consent",
    "default",
    {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    },
  ]);
  expect(commands[1]).toEqual([
    "consent",
    "update",
    { analytics_storage: "granted" },
  ]);
  expect(commands[3][2].page_location).toBe("http://127.0.0.1:4173/");
  expect(commands[3][2].allow_google_signals).toBe(false);
  await page.getByRole("button", { name: "Preferenze cookie" }).click();
  await page.getByRole("button", { name: "Accetta Analytics" }).click();
  expect(requests).toHaveLength(1);
  await page.reload();
  await expect.poll(() => requests.length).toBe(2);
  await context.addCookies([
    { name: "_ga", value: "test", url: "http://127.0.0.1:4173/" },
    { name: "_ga_S4XQ2MLL70", value: "test", url: "http://127.0.0.1:4173/" },
  ]);
  await page.getByRole("button", { name: "Preferenze cookie" }).click();
  await Promise.all([
    page.waitForEvent("load"),
    page.getByRole("button", { name: "Rifiuta Analytics" }).click(),
  ]);
  await expect(page.locator("#analytics-consent")).toBeHidden();
  expect(requests).toHaveLength(2);
  expect(
    (await context.cookies()).filter((cookie) => cookie.name.startsWith("_ga")),
  ).toEqual([]);
  expect(await page.evaluate(() => window.dataLayer)).toBeUndefined();
});

test("expired consent requires a new choice", async ({ page }) => {
  const requests = await interceptGoogle(page);
  await page.addInitScript(
    ({ key }) => {
      localStorage.setItem(
        key,
        JSON.stringify({ choice: "accepted", expires: Date.now() - 1000 }),
      );
    },
    { key },
  );
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: "Accetta Analytics" }),
  ).toBeVisible();
  expect(requests).toEqual([]);
});

test("blocked storage does not break consent or the booking form", async ({
  page,
}) => {
  const requests = await interceptGoogle(page);
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => {
      throw new Error("Storage blocked");
    };
    Storage.prototype.setItem = () => {
      throw new Error("Storage blocked");
    };
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Rifiuta Analytics" }).click();
  await expect(
    page.getByRole("button", { name: "Invia la richiesta" }),
  ).toBeEnabled();
  await page.getByRole("button", { name: "Preferenze cookie" }).click();
  await page.getByRole("button", { name: "Accetta Analytics" }).click();
  await expect.poll(() => requests.length).toBe(1);
});
