import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const key = "ver-sacrum.analytics-consent.v2";
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
  expect(commands[3][2].cookie_expires).toBe(180 * 24 * 60 * 60);
  expect(commands[3][2].cookie_update).toBe(false);
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
  await page.getByRole("button", { name: "Rifiuta Analytics" }).click();
  await expect(page.locator("#analytics-consent")).toBeHidden();
  expect(requests).toHaveLength(2);
  expect(
    (await context.cookies()).filter((cookie) => cookie.name.startsWith("_ga")),
  ).toEqual([]);
  expect(await page.evaluate((id) => window[`ga-disable-${id}`], id)).toBe(
    true,
  );
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

test("refusal is respected even after six months", async ({ page }) => {
  const requests = await interceptGoogle(page);
  await page.addInitScript(
    ({ key }) => {
      localStorage.setItem(
        key,
        JSON.stringify({ choice: "rejected", expires: Date.now() - 1000 }),
      );
    },
    { key },
  );
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: "Preferenze cookie" }),
  ).toBeVisible();
  await expect(page.locator("#analytics-consent")).toBeHidden();
  expect(requests).toEqual([]);
});

test("consent expires in an open page without losing the request", async ({
  page,
  context,
}) => {
  await page.clock.install();
  await interceptGoogle(page);
  await page.goto("/");
  await page.evaluate(
    ({ key }) =>
      localStorage.setItem(
        key,
        JSON.stringify({ choice: "accepted", expires: Date.now() + 60_000 }),
      ),
    { key },
  );
  await page.reload();
  await page.getByLabel("Il tuo nome").fill("Richiesta in corso");
  await context.addCookies([
    { name: "_ga", value: "test", url: "http://127.0.0.1:4173/" },
  ]);
  await page.clock.fastForward(61_000);
  await expect(page.locator("#analytics-consent")).toBeVisible();
  expect(await page.evaluate((id) => window[`ga-disable-${id}`], id)).toBe(
    true,
  );
  await expect(page.getByLabel("Il tuo nome")).toHaveValue(
    "Richiesta in corso",
  );
  expect(
    (await context.cookies()).filter((c) => c.name.startsWith("_ga")),
  ).toEqual([]);
});

test("choices from another tab preserve the form on acceptance, withdrawal and storage clearing", async ({
  page,
  context,
}) => {
  await interceptGoogle(page);
  await page.goto("/");
  await page.getByRole("button", { name: "Rifiuta Analytics" }).click();
  await page.getByLabel("Il tuo nome").fill("Richiesta in corso");
  const other = await context.newPage();
  await interceptGoogle(other);
  await other.goto("/privacy.html");
  for (const choice of [
    "Accetta Analytics",
    "Rifiuta Analytics",
    "Accetta Analytics",
  ]) {
    await other.getByRole("button", { name: "Preferenze cookie" }).click();
    await other.getByRole("button", { name: choice }).click();
    await expect
      .poll(() => page.evaluate((id) => window[`ga-disable-${id}`], id))
      .toBe(choice === "Rifiuta Analytics");
    await expect(page.getByLabel("Il tuo nome")).toHaveValue(
      "Richiesta in corso",
    );
  }
  await other.evaluate(() => localStorage.clear());
  await expect(page.locator("#analytics-consent")).toBeVisible();
  expect(await page.evaluate((id) => window[`ga-disable-${id}`], id)).toBe(
    true,
  );
  await expect(page.getByLabel("Il tuo nome")).toHaveValue(
    "Richiesta in corso",
  );
});

test("returning to a suspended page rechecks an expired acceptance", async ({
  page,
}) => {
  await interceptGoogle(page);
  await page.goto("/");
  await page.getByRole("button", { name: "Accetta Analytics" }).click();
  await page.evaluate(
    ({ key }) => {
      localStorage.setItem(
        key,
        JSON.stringify({ choice: "accepted", expires: Date.now() - 1 }),
      );
      window.dispatchEvent(new Event("pageshow"));
    },
    { key },
  );
  await expect(page.locator("#analytics-consent")).toBeVisible();
  expect(await page.evaluate((id) => window[`ga-disable-${id}`], id)).toBe(
    true,
  );
});

test("a choice works when storage is readable but writes are blocked", async ({
  page,
}) => {
  const requests = await interceptGoogle(page);
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => {
      throw new Error("Read-only storage");
    };
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Accetta Analytics" }).click();
  await expect.poll(() => requests.length).toBe(1);
  await page.evaluate(() => window.dispatchEvent(new Event("focus")));
  await expect(page.locator("#analytics-consent")).toBeHidden();
  await page.getByRole("button", { name: "Preferenze cookie" }).click();
  await page.getByRole("button", { name: "Rifiuta Analytics" }).click();
  expect(await page.evaluate((id) => window[`ga-disable-${id}`], id)).toBe(
    true,
  );
});

for (const path of ["/", "/privacy.html"]) {
  test(`consent focus returns to the content or its opener on ${path}`, async ({
    page,
  }) => {
    await interceptGoogle(page);
    await page.goto(path);
    await page.getByRole("button", { name: "Rifiuta Analytics" }).click();
    await expect(page.locator("main h1")).toBeFocused();
    await page.keyboard.press("Tab");
    expect(
      await page.evaluate(() =>
        document.querySelector("main").contains(document.activeElement),
      ),
    ).toBe(true);
    await page.getByRole("button", { name: "Preferenze cookie" }).click();
    await expect(page.locator("#analytics-title")).toBeFocused();
    await page.getByRole("button", { name: "Accetta Analytics" }).click();
    await expect(
      page.getByRole("button", { name: "Preferenze cookie" }),
    ).toBeFocused();
  });
}
