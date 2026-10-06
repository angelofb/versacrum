import { test, expect, type Page, type Locator } from "@playwright/test";

const prefixes = ["/", "/en/", "/fr/", "/es/", "/de/"];
const sections = [
  ["dimora", ".intro .eyebrow"],
  ["spazi", ".gallery-section .eyebrow"],
  ["ascoli", ".city-copy .eyebrow"],
  ["soggiorno", ".stay-section .eyebrow"],
  ["contatti", ".contact-copy .eyebrow"],
] as const;

async function nearTop(content: Locator) {
  await expect
    .poll(() =>
      content.evaluate((element) => {
        const bounds = element.getBoundingClientRect();
        const atBottom =
          scrollY >= document.documentElement.scrollHeight - innerHeight - 1;
        return (
          bounds.top >= 16 &&
          (bounds.top <= 40 || (atBottom && bounds.bottom <= innerHeight))
        );
      }),
    )
    .toBe(true);
}

async function dismissConsent(page: Page) {
  const reject = page.locator("#analytics-reject");
  if (await reject.isVisible()) await reject.click();
  await page.evaluate(() => document.fonts.ready);
}

test.describe("fragment destinations", () => {
  test.use({ reducedMotion: "reduce" });

  for (const prefix of prefixes) {
    test(`${prefix} home links land on the relevant content`, async ({
      page,
    }) => {
      await page.goto(prefix);
      await dismissConsent(page);
      await page.locator(".hero .button").click();
      await expect(page).toHaveURL(new RegExp(`${prefix}#dimora$`));
      await nearTop(page.locator(".intro .eyebrow"));

      for (const [id, content] of sections) {
        const toggle = page.locator(".menu-toggle");
        if (await toggle.isVisible()) await toggle.click();
        await page.locator(`#navigation a[href="#${id}"]`).click();
        await expect(page).toHaveURL(new RegExp(`#${id}$`));
        await nearTop(page.locator(content).first());
        if (await toggle.isVisible())
          await expect(toggle).toHaveAttribute("aria-expanded", "false");
      }

      await page.locator(".intro .text-link").click();
      await nearTop(page.locator(".gallery-section .eyebrow").first());
      await page.locator(".rate-card .button").click();
      await nearTop(page.locator(".contact-copy .eyebrow").first());
      const mobileBooking = page.locator(".mobile-booking");
      if (await mobileBooking.isVisible()) {
        await mobileBooking.click();
        await nearTop(page.locator("#booking-form"));
        await page.locator(".language-switcher summary").click();
        const language = prefix === "/en/" ? "it" : "en";
        await page.locator(`.language-switcher a[lang="${language}"]`).click();
        await expect(page).toHaveURL(/#booking-form$/);
        await nearTop(page.locator("#booking-form"));
      }
      await page.locator(".back-top").click();
      await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);

      // Direct URLs must have the same alignment as clicks, including a
      // localized page loading its images and fonts for the first time.
      for (const [id, content] of sections) {
        await page.goto(`${prefix}#${id}`);
        await page.evaluate(() => document.fonts.ready);
        await nearTop(page.locator(content).first());
      }
    });

    test(`${prefix} guide and privacy fragments land on their headings`, async ({
      page,
    }) => {
      await page.goto(prefix);
      await dismissConsent(page);
      const parkingLink = page.locator(
        `.faq a[href="${prefix}ascoli-piceno/#parcheggi"]`,
      );
      await parkingLink.click();
      await expect(page).toHaveURL(
        new RegExp(`${prefix}ascoli-piceno/#parcheggi$`),
      );
      await nearTop(page.locator("#parcheggi"));
      await page.locator(".location-card .button").click();
      await nearTop(page.locator(".contact-copy > .eyebrow"));
      await page.locator(".privacy summary").click();
      await page.locator(".privacy a").click();
      await nearTop(page.locator("#richieste"));

      for (const id of ["cookie", "navigazione", "destinatari", "diritti"]) {
        await page.goto(`${prefix}privacy.html#${id}`);
        await nearTop(page.locator(`#${id}`));
      }
      for (const id of ["posizione", "accesso", "visita"]) {
        await page.goto(`${prefix}ascoli-piceno/#${id}`);
        await nearTop(page.locator(`#${id}`));
      }
    });
  }

  test("every internal fragment has exactly one destination in every language", async ({
    page,
    request,
  }) => {
    const destinations = new Map<string, string>();
    for (const prefix of prefixes) {
      for (const path of [
        prefix,
        `${prefix}privacy.html`,
        `${prefix}ascoli-piceno/`,
      ]) {
        await page.goto(path);
        const fragments = await page.locator("a[href]").evaluateAll((links) =>
          links.flatMap((element) => {
            const link = element as HTMLAnchorElement;
            const url = new URL(link.href);
            return url.origin === location.origin && url.hash
              ? [
                  {
                    path: url.pathname,
                    id: decodeURIComponent(url.hash.slice(1)),
                  },
                ]
              : [];
          }),
        );
        for (const { path: destination, id } of fragments) {
          if (!destinations.has(destination)) {
            const response = await request.get(destination);
            expect(response.ok(), destination).toBe(true);
            destinations.set(destination, await response.text());
          }
          const html = destinations.get(destination)!;
          expect(
            html.split(`id="${id}"`).length - 1,
            `${path} → ${destination}#${id}`,
          ).toBe(1);
        }
      }
    }
  });
});

test("smooth scrolling settles on the heading", async ({ page }, testInfo) => {
  await page.goto("/");
  await dismissConsent(page);
  await page.locator(".hero .button").click();
  await nearTop(page.locator(".intro .eyebrow"));
  await page.screenshot({
    path: `artifacts/${testInfo.project.name}-anchor.png`,
  });
});

test.describe("native fragments without JavaScript", () => {
  test.use({ javaScriptEnabled: false, reducedMotion: "reduce" });
  test("the entrance and direct fragments align in all languages", async ({
    page,
  }) => {
    for (const prefix of prefixes) {
      await page.goto(prefix);
      // Without enhancement the expanded menu is taller. Put the entrance
      // in the viewport centre, clear of the fixed booking bar, before tapping.
      await page
        .locator(".hero .button")
        .evaluate((element) =>
          element.scrollIntoView({ block: "center", behavior: "instant" }),
        );
      await page.locator(".hero .button").click();
      await expect(page).toHaveURL(new RegExp(`${prefix}#dimora$`));
      await nearTop(page.locator(".intro .eyebrow"));
      await page.goto(`${prefix}ascoli-piceno/#parcheggi`);
      await nearTop(page.locator("#parcheggi"));
    }
  });
});
