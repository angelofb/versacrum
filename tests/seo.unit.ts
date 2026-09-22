import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { catalogs, locales } from "../src/i18n/index.ts";
import { serializeInline } from "../src/i18n/helpers.ts";
import { assertCatalog, assertRichText } from "../src/i18n/validate.ts";
import type { Locale } from "../src/types.ts";
import type { RuntimeCopy } from "../src/i18n/runtime.ts";

const route = (locale: Locale, page = "index") => {
  const prefix = locale === "it" ? "" : `${locale}/`;
  return new URL(`../dist/${prefix}${page}.html`, import.meta.url);
};

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

test("each page embeds only its own runtime messages", () => {
  for (const locale of locales) {
    for (const page of ["index", "privacy"]) {
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
      assert.equal((html.match(/rel="stylesheet"/g) ?? []).length, 1);
    }
  }
});

test("multilingual sitemap lists only the five home pages", () => {
  const sitemap = readFileSync(
    new URL("../dist/sitemap.xml", import.meta.url),
    "utf8",
  );
  assert.equal((sitemap.match(/<url>/g) || []).length, 5);
  assert.equal((sitemap.match(/<image:loc>/g) || []).length, 35);
  assert.equal((sitemap.match(/hreflang="x-default"/g) || []).length, 5);
  assert.doesNotMatch(sitemap, /privacy\.html/);
  for (const path of ["/", "/en/", "/fr/", "/es/", "/de/"])
    assert.ok(sitemap.includes(`<loc>https://versacrumbnb.it${path}</loc>`));
});
