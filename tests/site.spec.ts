import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("production assets, metadata and responsive layout", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  const external: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (response.status() >= 400)
      errors.push(`${response.status()} ${response.url()}`);
  });
  page.on("request", (request) => {
    if (!request.url().startsWith("http://127.0.0.1:4173"))
      external.push(request.url());
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    /Abitare Ascoli,\s*con calma\./,
  );
  for (const photo of await page.locator("picture").all())
    await photo.scrollIntoViewIfNeeded();
  await page.evaluate(() =>
    Promise.all(
      [...document.images]
        .filter((i) => i.id !== "lightbox-image")
        .map((i) => i.decode()),
    ),
  );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  expect(await page.locator("meta[name=robots]").getAttribute("content")).toBe(
    "index, follow, max-image-preview:large",
  );
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(
    1,
  );
  await expect(page).toHaveTitle(
    "Ver Sacrum | Dimora nel centro storico di Ascoli Piceno",
  );
  await expect(page.locator('meta[name="description"]')).toHaveCount(1);
  await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
  const robots = await page.request.get("/robots.txt");
  expect(await robots.text()).toContain("Allow: /");
  expect(await robots.text()).not.toContain("Disallow: /");
  expect(await robots.text()).toContain(
    "Sitemap: https://versacrumbnb.it/sitemap.xml",
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://versacrumbnb.it/",
  );
  const sitemap = await page.request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain("<loc>https://versacrumbnb.it/</loc>");
  expect((await sitemap.text()).match(/<url>/g)).toHaveLength(5);
  expect((await sitemap.text()).match(/<image:loc>/g)).toHaveLength(35);
  expect((await sitemap.text()).match(/hreflang="x-default"/g)).toHaveLength(5);
  expect(await sitemap.text()).not.toContain("privacy.html");
  await expect(
    page.locator('a[href="#"],a[href*="["],a[href*="tuodominio"]'),
  ).toHaveCount(0);
  expect(external).toEqual([]);
  expect(errors).toEqual([]);
  await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({
    path: `artifacts/${testInfo.project.name}-hero.png`,
  });
  await page.screenshot({
    path: `artifacts/${testInfo.project.name}.png`,
    fullPage: true,
  });
});

test("accessible page and dialog", async ({ page }) => {
  await page.goto("/");
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.locator('[data-photo="camera"]').click();
  await expect(page.getByRole("dialog")).toBeVisible();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
});

test("gallery keyboard navigation, focus and escape", async ({ page }) => {
  await page.goto("/");
  const opener = page.locator('[data-photo="camera"]');
  await opener.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.locator("#lightbox-close")).toBeFocused();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator("#lightbox-title")).toHaveText("Il soggiorno");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(opener).toBeFocused();
});

test("form validates dates and prepares email without sending data", async ({
  page,
}) => {
  await page.addInitScript(() => {
    window.open = (href, target) => {
      window.preparedEmail = { href: String(href ?? ""), target };
      return null;
    };
  });
  const submissions: string[] = [];
  page.on("request", (request) => {
    if (request.method() === "POST") submissions.push(request.url());
  });
  await page.goto("/");
  await page.getByLabel("Il tuo nome").fill("Ospite di prova");
  await page.getByLabel("La tua email").fill("ospite@example.com");
  const future = new Date();
  future.setDate(future.getDate() + 15);
  const arrival = `${future.getFullYear()}-${String(future.getMonth() + 1).padStart(2, "0")}-${String(future.getDate()).padStart(2, "0")}`;
  await page.getByLabel("Arrivo", { exact: false }).fill(arrival);
  await page.getByLabel("Partenza", { exact: false }).fill(arrival);
  await expect(page.locator("#checkout")).toHaveJSProperty(
    "validationMessage",
    "La partenza deve essere successiva all’arrivo.",
  );
  await page.getByRole("button", { name: "Invia la richiesta" }).click();
  await expect(page.locator("#form-status")).toBeEmpty();
  const validDeparture = await page.locator("#checkout").getAttribute("min");
  await page.locator("#checkout").fill(validDeparture ?? "");
  await page.getByRole("button", { name: "Invia la richiesta" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Email preparata, ancora da inviare",
  );
  const { href, target } = await page.evaluate(
    () => window.preparedEmail as { href: string; target?: string },
  );
  expect(target).toBe("_self");
  await expect(page.locator('a[href*="body="], [data-email]')).toHaveCount(0);
  await page.evaluate(() => {
    window.preparedEmail = null;
  });
  await page.getByRole("button", { name: "apri l’email precompilata" }).click();
  expect(
    await page.evaluate(() => (window.preparedEmail as { href: string }).href),
  ).toBe(href);
  const email = new URL(href);
  expect(email.pathname).toBe("versacrumbnb@gmail.com");
  expect(email.searchParams.get("subject")).toBe(
    "Richiesta di disponibilità — Ver Sacrum",
  );
  expect(email.searchParams.get("body")).toContain("Nome: Ospite di prova");
  expect(email.searchParams.get("body")).toContain(
    `Partenza: ${validDeparture}`,
  );
  await expect(page.getByLabel("La tua email")).toHaveValue(
    "ospite@example.com",
  );
  expect(submissions).toEqual([]);
});

test("mobile menu state and closing behavior", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile");
  await page.goto("/");
  const toggle = page.locator(".menu-toggle");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Gli spazi" })
    .click();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});

test("content and gallery remain usable without JavaScript", async ({
  browser,
}, testInfo) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport:
      testInfo.project.name === "mobile"
        ? { width: 390, height: 844 }
        : { width: 1440, height: 1000 },
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173");
  await expect(
    page.getByRole("navigation").getByRole("link", { name: "Gli spazi" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Il tuo prossimo piccolo viaggio." }),
  ).toBeVisible();
  await expect(page.locator('[data-photo="camera"]')).toHaveAttribute(
    "href",
    /images\/camera-.*\.jpg/,
  );
  await expect(
    page.getByRole("button", { name: "Invia la richiesta" }),
  ).toBeDisabled();
  await context.close();
});

test("small screens and reduced motion", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (const width of [320, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
  }
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
});
