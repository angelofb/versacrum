import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { catalogs, locales } from "../src/i18n/index.ts";
import {
  formatDate,
  serializeInline,
  shareImageAlt,
} from "../src/i18n/helpers.ts";
import { faqIds, type RichText } from "../src/i18n/schema.ts";
import { assertCatalog, assertRichText } from "../src/i18n/validate.ts";
import { featuredPhoto, photos, site } from "../src/site.config.ts";
import { resolveReleaseTag } from "../src/lib/release-version.ts";
import type { Locale, PhotoName } from "../src/types.ts";
import type { RuntimeCopy } from "../src/i18n/runtime.ts";

const route = (locale: Locale, page = "index") => {
  const prefix = locale === "it" ? "" : `${locale}/`;
  return new URL(`../dist/${prefix}${page}.html`, import.meta.url);
};

const textContent = (html: string) =>
  html
    .replace(/<[^>]*>/g, "")
    .replace(/&(?:amp|lt|gt|quot|apos|#\d+|#x[0-9a-f]+);/gi, (entity) => {
      const name = entity.slice(1, -1).toLowerCase();
      if (name.startsWith("#"))
        return String.fromCodePoint(
          name.startsWith("#x")
            ? Number.parseInt(name.slice(2), 16)
            : Number(name.slice(1)),
        );
      return { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" }[
        name as "amp" | "lt" | "gt" | "quot" | "apos"
      ];
    })
    .replace(/\s+/g, " ")
    .trim();

const plainRichText = (content: RichText) =>
  content
    .map((part) =>
      typeof part === "string" ? part : part.kind === "break" ? " " : part.text,
    )
    .join("")
    .replace(/\s+/g, " ")
    .trim();

test("raw catalogs are complete without fallback", () => {
  for (const locale of locales) {
    assertCatalog(catalogs.it, catalogs[locale]);
  }
  for (const locale of ["fr", "es", "de"] as const) {
    assert.notEqual(
      catalogs[locale].common.booking,
      catalogs.en.common.booking,
    );
    assert.notEqual(catalogs[locale].common.airbnb, catalogs.en.common.airbnb);
    assert.doesNotMatch(JSON.stringify(catalogs[locale].privacy), /<\/a> e <a/);
  }
});

test("missing, blank and invalid interpolated translations fail validation", () => {
  assert.throws(() => assertCatalog({ title: "Hello" }, {}), /keys/);
  assert.throws(() => assertCatalog({ title: "Hello" }, { title: "" }), /text/);
  assert.throws(
    () => assertCatalog({ title: "Hello {{name}}" }, { title: "Bonjour" }),
    /placeholders/,
  );
});

test("FAQ links and privacy blocks have explicit semantic structure", () => {
  for (const locale of locales) {
    const copy = catalogs[locale];
    for (const [id, href] of [
      ["capacity", "#contatti"],
      ["kitchen", "#spazi"],
      ["location", "#ascoli"],
    ] as const) {
      assert.ok(
        copy.home.stay.faq[id].content.some(
          (part) =>
            typeof part !== "string" &&
            part.kind === "link" &&
            part.href === href,
        ),
      );
    }
    assert.equal(Object.keys(copy.privacy.sections).length, 6);
    for (const [id, section] of Object.entries(copy.privacy.sections)) {
      assert.equal(
        section.blocks.filter((block) => block.kind === "storage").length,
        id === "cookie" ? 1 : 0,
      );
    }
    assert.doesNotMatch(JSON.stringify(copy.privacy), /<(?:a |strong>|code>)/);
  }
  assert.throws(
    () =>
      assertRichText([
        { kind: "link", href: "javascript:alert(1)", text: "unsafe" },
      ]),
    /Unsafe/,
  );
  assert.throws(
    () => assertRichText([{ kind: "html", text: "<script>" }]),
    /Invalid/,
  );
});

test("confirmed access and parking facts appear in every locale", () => {
  for (const locale of locales) {
    const faq = catalogs[locale].home.stay.faq;
    assert.ok(JSON.stringify(faq.location.content).includes(site.address));
    assert.ok(
      JSON.stringify(faq.accessibility.content).includes(
        String(site.accessSteps),
      ),
    );
    const parking = JSON.stringify(faq.parking.content);
    for (const value of Object.values(site.parking))
      assert.ok(parking.includes(String(value)), `${locale}: missing ${value}`);
    const html = readFileSync(route(locale), "utf8");
    assert.ok(html.includes(site.cin));
    assert.ok(html.includes(site.cir));
  }
});

test("inline translations cannot terminate their script element", () => {
  const value = { text: '</script><script>alert("x")</script>' };
  const json = serializeInline(value);
  assert.ok(!json.includes("<"));
  assert.deepEqual(JSON.parse(json), value);
});

test("compiled localized pages have self canonicals and complete hreflang", () => {
  for (const locale of locales) {
    const prefix = locale === "it" ? "" : `${locale}/`;
    const html = readFileSync(route(locale), "utf8");
    const expected = `https://versacrumbnb.it/${prefix}`;
    assert.match(html, new RegExp(`<html lang="${locale}"`));
    assert.ok(html.includes(`<link rel="canonical" href="${expected}">`));
    assert.equal((html.match(/rel="alternate" hreflang=/g) || []).length, 6);
    assert.equal((html.match(/<title>/g) || []).length, 1);
    assert.equal((html.match(/type="application\/ld\+json"/g) || []).length, 1);
    assert.doesNotMatch(html, /\{\{|undefined|G-S4XQ2MLL70/);
    const privacy = readFileSync(route(locale, "privacy"), "utf8");
    assert.match(privacy, /name="robots" content="noindex, follow"/);
    assert.equal((privacy.match(/rel="alternate" hreflang=/g) || []).length, 6);
    assert.doesNotMatch(privacy, /\{\{|G-S4XQ2MLL70/);
  }
});

test("answers are self-contained static HTML with unique, stable citation targets", () => {
  for (const locale of locales) {
    const html = readFileSync(route(locale), "utf8");
    const faq = catalogs[locale].home.stay.faq;
    assert.deepEqual(Object.keys(faq), [...faqIds]);
    for (const id of faqIds) {
      assert.match(faq[id].title, /\?$/);
      assert.ok(plainRichText(faq[id].content).includes("Ver Sacrum"));
      const target = `faq-${id}`;
      assert.equal(html.split(`id="${target}"`).length - 1, 1);
      const details = html.match(
        new RegExp(`<details id="${target}"[^>]*>([\\s\\S]*?)</details>`),
      );
      assert.ok(details, `${locale}/${target}: missing static answer`);
      const summary = details[1].match(/<summary[^>]*>([\s\S]*?)<\/summary>/);
      const answer = details[1].match(/<p[^>]*>([\s\S]*?)<\/p>/);
      assert.ok(summary);
      assert.ok(answer);
      assert.equal(textContent(summary[1]), `${faq[id].title} +`);
      assert.equal(textContent(answer[1]), plainRichText(faq[id].content));
    }
    assert.ok(
      plainRichText(faq.capacity.content).includes(String(site.maxGuests)),
    );
    assert.ok(plainRichText(faq.location.content).includes(site.postalCode));
    assert.ok(plainRichText(faq.request.content).includes(site.email));
    assert.ok(
      faq.request.content.some(
        (part) =>
          typeof part !== "string" &&
          part.kind === "link" &&
          part.href === "#booking-form",
      ),
    );
  }
});

test("visible lodging facts and editorial dates match the shared configuration", () => {
  assert.match(site.lastModified, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(
    new Date(`${site.lastModified}T00:00:00Z`).toISOString().slice(0, 10),
    site.lastModified,
  );
  for (const locale of locales) {
    const home = readFileSync(route(locale), "utf8");
    const card = home.match(
      /<div class="rate-card">([\s\S]*?)<a class="button button-light"/,
    );
    assert.ok(card);
    const facts = [
      ...card[1].matchAll(/<dt>([\s\S]*?)<\/dt>\s*<dd>([\s\S]*?)<\/dd>/g),
    ].map((match) => [textContent(match[1]), textContent(match[2])]);
    assert.deepEqual(facts.slice(0, 4), [
      [catalogs[locale].home.stay.labels.capacity, String(site.maxGuests)],
      [
        catalogs[locale].home.stay.labels.address,
        `${site.address}, ${site.postalCode} Ascoli Piceno`,
      ],
      [catalogs[locale].home.stay.labels.checkin, site.checkin],
      [catalogs[locale].home.stay.labels.checkout, site.checkout],
    ]);
    for (const page of ["index", "ascoli-piceno/index"]) {
      const html = readFileSync(route(locale, page), "utf8");
      const date = html.match(
        /<time[^>]+datetime="([^"]+)"[^>]*>([\s\S]*?)<\/time>/,
      );
      assert.ok(date, `${locale}/${page}: missing visible editorial date`);
      assert.equal(date[1], site.lastModified);
      assert.equal(textContent(date[2]), formatDate(locale, site.lastModified));
      const json = html.match(
        /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
      );
      assert.ok(json);
      assert.equal(
        JSON.parse(json[1])["@graph"].find(
          (node: Record<string, unknown>) => node["@type"] === "WebPage",
        ).dateModified,
        date[1],
      );
    }
  }
});

test("sharing descriptions identify the selected photo without relying on cropped details", () => {
  for (const locale of locales) {
    for (const name of Object.keys(photos) as PhotoName[]) {
      const label =
        name === "ascoli"
          ? catalogs[locale].home.city.caption
          : catalogs[locale].home.gallery[name][0];
      assert.equal(
        shareImageAlt(catalogs[locale], name),
        `Ver Sacrum · Ascoli Piceno — ${label}`,
      );
    }
  }
});

test("search snippets stay eligible and shared images have localized descriptions", () => {
  for (const locale of locales) {
    for (const page of ["index", "ascoli-piceno/index", "privacy"]) {
      const html = readFileSync(route(locale, page), "utf8");
      for (const key of ["og:image:alt", "twitter:image:alt"]) {
        const meta = html.match(
          new RegExp(`<meta (?:property|name)="${key}" content="([^"]+)"`),
        );
        assert.ok(meta, `${locale}/${page}: missing ${key}`);
        assert.equal(
          textContent(meta[1]),
          shareImageAlt(catalogs[locale], featuredPhoto),
        );
      }
      if (page !== "privacy") {
        assert.match(
          html,
          /name="robots" content="index, follow, max-image-preview:large"/,
        );
        assert.doesNotMatch(
          html,
          /nosnippet|data-nosnippet|max-snippet|noai|noimageai/i,
        );
      }
    }
  }
});

test("all localized pages publish only the current Google verification token", () => {
  assert.equal(site.googleSiteVerificationTokens.length, 1);
  assert.ok(site.googleSiteVerificationTokens[0].trim());
  for (const locale of locales) {
    for (const page of ["index", "privacy", "ascoli-piceno/index"]) {
      const html = readFileSync(route(locale, page), "utf8");
      const tokens = [
        ...html.matchAll(
          /<meta name="google-site-verification" content="([^"]+)"\s*\/?>/g,
        ),
      ].map((match) => match[1]);
      assert.deepEqual(
        tokens,
        site.googleSiteVerificationTokens,
        `${locale}/${page}: unexpected Google verification tokens`,
      );
    }
  }
});

test("location guides are indexable, linked and localized with distinct metadata", () => {
  for (const locale of locales) {
    const prefix = locale === "it" ? "" : `${locale}/`;
    const home = readFileSync(route(locale), "utf8");
    const html = readFileSync(route(locale, "ascoli-piceno/index"), "utf8");
    const expected = `${site.domain}/${prefix}ascoli-piceno/`;
    assert.match(html, new RegExp(`<html lang="${locale}"`));
    assert.ok(html.includes(`<link rel="canonical" href="${expected}">`));
    assert.match(
      html,
      /name="robots" content="index, follow, max-image-preview:large"/,
    );
    assert.equal((html.match(/rel="alternate" hreflang=/g) ?? []).length, 6);
    assert.ok(home.includes(`href="/${prefix}ascoli-piceno/"`));
    assert.ok(html.includes(`href="/${prefix}#contatti"`));
    assert.ok(html.includes(`href="/${prefix}privacy.html"`));
    assert.ok(html.includes(catalogs[locale].location.title));
    assert.ok(html.includes(site.address));
    assert.ok(html.includes(`href="${site.tourism}"`));
    assert.ok(html.includes(catalogs[locale].location.visit.sourceLabel));
    assert.ok(html.includes(String(site.accessSteps)));
    assert.notEqual(
      catalogs[locale].location.metaTitle,
      catalogs[locale].seo.title,
    );
    assert.doesNotMatch(html, /\{\{|undefined|G-S4XQ2MLL70/);
  }
});

test("structured data identifies one apartment consistently across languages and pages", () => {
  const ids = new Set<string>();
  for (const locale of locales) {
    for (const page of ["index", "ascoli-piceno/index"]) {
      const html = readFileSync(route(locale, page), "utf8");
      const json = html.match(
        /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
      );
      assert.ok(json);
      const { "@graph": graph } = JSON.parse(json[1]);
      const business = graph.find(
        (node: Record<string, unknown>) => node["@type"] === "LodgingBusiness",
      );
      const apartment = graph.find(
        (node: Record<string, unknown>) => node["@type"] === "Apartment",
      );
      assert.ok(business);
      assert.ok(apartment);
      ids.add(apartment["@id"]);
      assert.equal(business.containsPlace["@id"], apartment["@id"]);
      assert.equal(apartment.containedInPlace["@id"], business["@id"]);
      assert.equal(apartment.occupancy.maxValue, site.maxGuests);
      assert.equal(apartment.address.postalCode, site.postalCode);
      assert.equal(business.identifier[0].value, site.cin);
      assert.deepEqual(business.sameAs, [site.booking, site.airbnb]);
      assert.ok(!("telephone" in business));
      assert.ok(
        !graph.some((node: Record<string, unknown>) =>
          ["BedAndBreakfast", "FAQPage"].includes(String(node["@type"])),
        ),
      );
      const webpage = graph.find(
        (node: Record<string, unknown>) => node["@type"] === "WebPage",
      );
      assert.equal(webpage.inLanguage, locale);
      if (page === "ascoli-piceno/index") {
        const breadcrumb = graph.find(
          (node: Record<string, unknown>) => node["@type"] === "BreadcrumbList",
        );
        assert.equal(breadcrumb.itemListElement[1].item, webpage.url);
        assert.equal(webpage.breadcrumb["@id"], breadcrumb["@id"]);
      }
    }
  }
  assert.equal(ids.size, 1);
});

test("all localized footers expose the same discreet release version", () => {
  const { version } = JSON.parse(
    readFileSync(new URL("../package.json", import.meta.url), "utf8"),
  );
  const tag = resolveReleaseTag(version, process.env.RELEASE_TAG);
  for (const locale of locales) {
    for (const page of ["index", "privacy", "ascoli-piceno/index"]) {
      const html = readFileSync(route(locale, page), "utf8");
      assert.ok(
        html.includes(
          `<small class="site-version" data-site-version="${tag}">${tag}</small>`,
        ),
        `${locale}/${page}: missing release version`,
      );
      assert.equal((html.match(/data-site-version=/g) ?? []).length, 1);
    }
  }
});

test("each page embeds only its own runtime messages", () => {
  for (const locale of locales) {
    for (const page of ["index", "privacy", "ascoli-piceno/index"]) {
      const html = readFileSync(route(locale, page), "utf8");
      const match = html.match(
        /<script[^>]*id="locale-messages"[^>]*>([\s\S]*?)<\/script>/,
      );
      assert.ok(match, `${locale}/${page}: missing runtime data`);
      const value: RuntimeCopy = JSON.parse(match[1]);
      assert.equal(
        value.consent.consentOff,
        catalogs[locale].dynamic.consentOff,
      );
      assert.deepEqual(
        Object.keys(value).sort(),
        page === "index" ? ["consent", "home"] : ["consent"],
      );
      if (page === "index")
        assert.equal(
          value.home?.dynamic.emailSubject,
          catalogs[locale].dynamic.emailSubject,
        );
    }
  }
});

test("multilingual sitemap groups ten indexable pages with equivalent alternates", () => {
  const sitemap = readFileSync(
    new URL("../dist/sitemap.xml", import.meta.url),
    "utf8",
  );
  assert.equal((sitemap.match(/<url>/g) || []).length, 10);
  assert.equal((sitemap.match(/<lastmod>/g) || []).length, 10);
  assert.equal((sitemap.match(/<image:loc>/g) || []).length, 35);
  assert.equal((sitemap.match(/hreflang="x-default"/g) || []).length, 10);
  assert.doesNotMatch(sitemap, /privacy\.html/);
  assert.ok(sitemap.includes(`<lastmod>${site.lastModified}</lastmod>`));
  for (const path of ["/", "/en/", "/fr/", "/es/", "/de/"]) {
    assert.ok(sitemap.includes(`<loc>https://versacrumbnb.it${path}</loc>`));
    assert.ok(
      sitemap.includes(
        `<loc>https://versacrumbnb.it${path}ascoli-piceno/</loc>`,
      ),
    );
  }
  for (const match of sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const guide = match[1].includes("ascoli-piceno/");
    const alternates = [
      ...match[1].matchAll(/<xhtml:link[^>]+href="([^"]+)"/g),
    ].map((item) => item[1]);
    assert.equal(alternates.length, 6);
    assert.ok(
      alternates.every((url) => url.includes("ascoli-piceno/") === guide),
    );
  }
});

test("robots.txt exposes the canonical sitemap", () => {
  const robots = readFileSync(
    new URL("../dist/robots.txt", import.meta.url),
    "utf8",
  );
  assert.match(robots, /^User-agent: \*$/m);
  assert.match(robots, /^Allow: \/$/m);
  assert.match(robots, new RegExp(`^Host: ${new URL(site.domain).host}$`, "m"));
  assert.match(
    robots,
    new RegExp(`^Sitemap: ${site.domain}/sitemap\\.xml$`, "m"),
  );
});
