import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const versions = [
  {
    locale: "it",
    path: "/",
    title: "Abitare Ascoli,",
    submit: "Invia la richiesta",
    privacy: "Privacy e cookie",
  },
  {
    locale: "en",
    path: "/en/",
    title: "Live Ascoli,",
    submit: "Send request",
    privacy: "Privacy and cookies",
  },
  {
    locale: "fr",
    path: "/fr/",
    title: "Habiter Ascoli,",
    submit: "Envoyer la demande",
    privacy: "Confidentialité et cookies",
  },
  {
    locale: "es",
    path: "/es/",
    title: "Vivir Ascoli,",
    submit: "Enviar la solicitud",
    privacy: "Privacidad y cookies",
  },
  {
    locale: "de",
    path: "/de/",
    title: "Ascoli erleben,",
    submit: "Anfrage senden",
    privacy: "Datenschutz und Cookies",
  },
];

for (const version of versions) {
  test(`${version.locale} is fully rendered and linked`, async ({ page }) => {
    await page.goto(version.path);
    await expect(page.locator("html")).toHaveAttribute("lang", version.locale);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      version.title,
    );
    await expect(
      page.getByRole("button", { name: version.submit }),
    ).toBeEnabled();
    await expect(page.locator(".language-switcher a")).toHaveCount(5);
    await expect(
      page.locator('.language-switcher a[aria-current="page"]'),
    ).toHaveAttribute("lang", version.locale);
    await expect(page.locator('link[rel="alternate"]')).toHaveCount(6);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
    const privacyHref =
      version.locale === "it"
        ? "/privacy.html"
        : `/${version.locale}/privacy.html`;
    await page
      .getByRole("link", { name: version.privacy, exact: true })
      .click();
    expect(new URL(page.url()).pathname).toBe(privacyHref);
    await expect(page.locator("html")).toHaveAttribute("lang", version.locale);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex, follow",
    );
    if (version.locale !== "it")
      await expect(page.locator(".privacy-authority")).toBeVisible();
  });
}

test("language switch keeps an equivalent section anchor", async ({ page }) => {
  await page.goto("/#contatti");
  await page.locator(".language-switcher summary").click();
  await page.locator('.language-switcher a[lang="de"]').click();
  await expect(page).toHaveURL(/\/de\/#contatti$/);
  await expect(page.locator("#contatti")).toBeVisible();
});

test("English form creates a localized email", async ({ page }) => {
  await page.addInitScript(() => {
    window.open = (href) => {
      window.preparedEmail = String(href ?? "");
      return null;
    };
  });
  await page.goto("/en/");
  await page.getByLabel("Your name").fill("Test Guest");
  await page.getByLabel("Your email").fill("guest@example.com");
  const future = new Date();
  future.setDate(future.getDate() + 10);
  const arrival = future.toISOString().slice(0, 10);
  await page.getByLabel("Arrival", { exact: false }).fill(arrival);
  const departure = await page.locator("#checkout").getAttribute("min");
  await page.getByLabel("Departure", { exact: false }).fill(departure ?? "");
  await page.getByRole("button", { name: "Send request" }).click();
  const href = new URL(
    await page.evaluate(() => window.preparedEmail as string),
  );
  expect(href.searchParams.get("subject")).toBe(
    "[EN] Availability request — Ver Sacrum",
  );
  expect(href.searchParams.get("body")).toContain("Name: Test Guest");
});

test("German home and privacy remain accessible", async ({ page }) => {
  for (const path of ["/de/", "/de/privacy.html"]) {
    await page.goto(path);
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
  }
});

test("localized HTML remains useful without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  for (const version of versions.slice(1)) {
    await page.goto(`http://127.0.0.1:4173${version.path}`);
    await expect(page.locator("html")).toHaveAttribute("lang", version.locale);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      version.title,
    );
    await expect(page.locator('[data-photo="camera"]')).toHaveAttribute(
      "href",
      /images\/camera-.*\.jpg/,
    );
    await expect(
      page.getByRole("button", { name: version.submit }),
    ).toBeDisabled();
  }
  await context.close();
});

test("Analytics consent is shared when changing language", async ({ page }) => {
  const requests: string[] = [];
  await page.route("https://www.googletagmanager.com/**", async (route) => {
    requests.push(route.request().url());
    await route.fulfill({ contentType: "application/javascript", body: "" });
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Accetta Analytics" }).click();
  await expect.poll(() => requests.length).toBe(1);
  await page.goto("/fr/");
  await expect(page.locator("#analytics-consent")).toBeHidden();
  await expect.poll(() => requests.length).toBe(2);
  await expect(
    page.getByRole("button", { name: "Préférences de cookies" }),
  ).toBeVisible();
});
