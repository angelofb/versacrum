import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("privacy information is reachable from the banner, form and footer", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("#analytics-consent a")).toHaveAttribute(
    "href",
    "./privacy.html#cookie",
  );
  await page.locator(".privacy summary").click();
  await expect(page.locator(".privacy a")).toHaveAttribute(
    "href",
    "./privacy.html#richieste",
  );
  await page
    .getByRole("link", { name: "Privacy e cookie", exact: true })
    .click();
  await expect(page).toHaveTitle("Privacy e cookie | Ver Sacrum");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Privacy e cookie",
  );
  await expect(page.locator("main")).toContainText("30 giorni dalla chiusura");
  await expect(page.locator("main")).toContainText("180 giorni");
  await expect(page.locator("main")).not.toContainText("{{");
  await expect(page.locator("main")).not.toContainText("[DA VERIFICARE");
  await expect(page.locator(".privacy-draft")).toHaveCount(0);
  await expect(page.locator("main")).toContainText(
    "2 mesi per i dati degli eventi",
  );
  await expect(page.locator("main")).toContainText("14 mesi per i dati utente");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://versacrumbnb.it/privacy.html",
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex, follow",
  );
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
});

test("privacy remains readable without JavaScript and makes no analytics requests", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  const external = [];
  page.on("request", (request) => {
    if (!request.url().startsWith("http://127.0.0.1:4173"))
      external.push(request.url());
  });
  await page.goto("http://127.0.0.1:4173/privacy.html");
  await expect(
    page.getByRole("heading", { name: "6. I tuoi diritti" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Torna a Ver Sacrum" }),
  ).toBeVisible();
  expect(external).toEqual([]);
  await context.close();
});

test("cookie choices can be changed from the privacy page", async ({
  page,
}) => {
  await page.route("https://www.googletagmanager.com/**", (route) =>
    route.fulfill({ contentType: "application/javascript", body: "" }),
  );
  await page.goto("/privacy.html");
  await page.getByRole("button", { name: "Rifiuta Analytics" }).click();
  await page.getByRole("button", { name: "Preferenze cookie" }).click();
  await expect(page.locator("#analytics-title")).toBeFocused();
  await expect(page.locator("#analytics-choice")).toContainText("rifiutato");
  await page.getByRole("button", { name: "Accetta Analytics" }).click();
  await expect(page.locator('script[src*="googletagmanager.com"]')).toHaveCount(
    1,
  );
});
