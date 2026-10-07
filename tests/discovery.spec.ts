import { test, expect } from "@playwright/test";
import { catalogs } from "../src/i18n/index.ts";
import { site } from "../src/site.config.ts";

const versions = [
  ["it", "/"],
  ["en", "/en/"],
  ["fr", "/fr/"],
  ["es", "/es/"],
  ["de", "/de/"],
] as const;

test.use({ reducedMotion: "reduce" });

test("FAQ citations reveal answers and keep their identity when changing language", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const [locale, path] of versions) {
    await page.goto(`${path}#faq-capacity`);
    await expect(page.locator("#faq-capacity")).toHaveJSProperty("open", true);
    await expect(page.locator("#faq-capacity > p")).toBeVisible();
    await expect(page.locator("#faq-capacity > p")).toContainText(
      String(site.maxGuests),
    );
    await expect(page.locator(".rate-card dl")).toContainText(
      catalogs[locale].home.stay.labels.capacity,
    );
    await expect(page.locator(".rate-card dl")).toContainText(site.address);
    await expect(page.locator(".rate-card time")).toHaveAttribute(
      "datetime",
      site.lastModified,
    );
    await page.evaluate(() => {
      location.hash = "faq-request";
    });
    await expect(page.locator("#faq-request")).toHaveJSProperty("open", true);
    await expect(page.locator("#faq-request > p")).toContainText(site.email);
    await expect(
      page.locator('#faq-request a[href="#booking-form"]'),
    ).toBeVisible();
  }
  await page.goto("/#faq-accessibility");
  await expect(page.locator("#faq-accessibility")).toHaveJSProperty(
    "open",
    true,
  );
  const reject = page.locator("#analytics-reject");
  if (await reject.isVisible()) await reject.click();
  await page.locator(".language-switcher summary").click();
  await page.locator('.language-switcher a[lang="en"]').click();
  await expect(page).toHaveURL(/\/en\/#faq-accessibility$/);
  await expect(page.locator("#faq-accessibility")).toHaveJSProperty(
    "open",
    true,
  );
  await expect(page.locator("#faq-accessibility > p")).toContainText("no lift");
  await page.goto("/en/#%E0%A4%A");
  expect(errors).toEqual([]);
});

test.describe("answers without JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  test("native questions, lodging facts and editorial dates remain usable", async ({
    page,
  }) => {
    for (const [locale, path] of versions) {
      await page.goto(`${path}#faq-request`);
      await expect(page.locator("#faq-request > summary")).toHaveText(
        `${catalogs[locale].home.stay.faq.request.title} +`,
      );
      await page.locator("#faq-request > summary").click();
      await expect(page.locator("#faq-request > p")).toBeVisible();
      await expect(page.locator("#faq-request > p")).toContainText(site.email);
      await expect(page.locator(".rate-card time")).toHaveAttribute(
        "datetime",
        site.lastModified,
      );
      await page.goto(`${path}ascoli-piceno/`);
      await expect(page.locator(".content-updated")).toBeVisible();
      await expect(page.locator(".content-updated time")).toHaveAttribute(
        "datetime",
        site.lastModified,
      );
    }
  });
});
