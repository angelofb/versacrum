import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const prefixes = ["/", "/en/", "/fr/", "/es/", "/de/"];

test("arrival guides have working localized routes, contacts and language navigation", async ({
  page,
}) => {
  const errors: string[] = [];
  const external: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("request", (request) => {
    if (!request.url().startsWith("http://127.0.0.1:4173"))
      external.push(request.url());
  });
  for (const prefix of prefixes) {
    const response = await page.goto(`${prefix}ascoli-piceno/`);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Ascoli Piceno",
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://versacrumbnb.it${prefix}ascoli-piceno/`,
    );
    await expect(page.locator('a[href^="mailto:"]')).toHaveAttribute(
      "href",
      "mailto:versacrumbnb@gmail.com",
    );
    await expect(page.locator('a[href^="https://wa.me/"]')).toHaveAttribute(
      "href",
      "https://wa.me/393384344560",
    );
    await expect(page.locator(".location-card .button")).toHaveAttribute(
      "href",
      `${prefix}#contatti`,
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
    const reject = page.locator("#analytics-reject");
    if (await reject.isVisible()) await reject.click();
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(result.violations).toEqual([]);
  }
  await page.goto("/ascoli-piceno/#parcheggi");
  await page.locator(".language-switcher summary").click();
  await page.locator('.language-switcher a[lang="en"]').click();
  await expect(page).toHaveURL(/\/en\/ascoli-piceno\/#parcheggi$/);
  await expect(page.locator("#parcheggi")).toBeVisible();
  await page.locator(".location-card .button").click();
  await expect(page).toHaveURL(/\/en\/#contatti$/);
  await expect(page.locator("#booking-form")).toBeVisible();
  expect(errors).toEqual([]);
  expect(external).toEqual([]);
});

test("arrival information and reciprocal links remain available without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL: "http://127.0.0.1:4173",
  });
  const page = await context.newPage();
  for (const prefix of prefixes) {
    await page.goto(prefix);
    await page.locator(`.city-copy a[href="${prefix}ascoli-piceno/"]`).click();
    await expect(page.locator("#parcheggi")).toBeVisible();
    await expect(page.locator(".location-content")).toContainText(
      "Via Ottaviano Iannella 32",
    );
    await expect(page.locator(".location-content")).toContainText("20");
    await page.locator(".breadcrumbs a").click();
    await expect(page).toHaveURL(new RegExp(`${prefix}$`));
  }
  await context.close();
});
