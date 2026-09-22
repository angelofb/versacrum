import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { getT, locales } from "../src/i18n/index.ts";
import { resources } from "../src/i18n/translations.ts";
import { consentCopy, photoAltCopy, faqLinkCopy } from "../src/i18n/content.ts";
import { runtime } from "../src/i18n/runtime.ts";
import { assertCatalog } from "../src/i18n/validate.ts";
import type { Locale } from "../src/types.ts";

const route = (locale: Locale, page = "index") => {
  const prefix = locale === "it" ? "" : `${locale}/`;
  return new URL(`../dist/${prefix}${page}.html`, import.meta.url);
};

test("raw catalogs are complete without fallback", () => {
  for (const locale of locales) {
    assertCatalog(resources.it.translation, resources[locale].translation);
    assertCatalog(consentCopy.it, consentCopy[locale]);
    assertCatalog(photoAltCopy.it, photoAltCopy[locale]);
    assertCatalog(faqLinkCopy.it, faqLinkCopy[locale]);
    assertCatalog(runtime.it, runtime[locale]);
  }
  for (const locale of ["fr", "es", "de"] as const) {
    assert.notEqual(
      resources[locale].translation.common.booking,
      resources.en.translation.common.booking,
    );
    assert.notEqual(
      resources[locale].translation.common.airbnb,
      resources.en.translation.common.airbnb,
    );
    assert.doesNotMatch(
      JSON.stringify(resources[locale].translation.privacy),
      /<\/a> e <a/,
    );
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

test("all locale catalogues contain the required content", () => {
  for (const locale of locales) {
    const t = getT(locale);
    for (const key of [
      "seo.title",
      "seo.description",
      "home.hero.line1",
      "home.form.submit",
      "dynamic.emailSubject",
      "privacy.metaTitle",
      "privacy.sections",
    ]) {
      const value = t<unknown>(key, { returnObjects: true });
      assert.notEqual(value, key, `${locale} is missing ${key}`);
      assert.ok(value && (typeof value !== "string" || value.trim()));
    }
    assert.equal(
      t<unknown[]>("privacy.sections", { returnObjects: true }).length,
      6,
    );
  }
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
