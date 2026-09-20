import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createSeo, canonicalUrl, publicationIssues } from "../scripts/seo.js";
import { privacy } from "../src/privacy.config.js";
import { site, seo, photos } from "../src/site.config.js";

const manifest = Object.fromEntries(
  Object.keys(photos).map((key) => [
    key,
    {
      base: `${key}-test`,
      width: 1200,
      height: 1600,
      widths: [480, 800, 1200],
    },
  ]),
);
const configured = {
  ...Object.fromEntries(
    Object.keys(site).map((key) => [key, "Dato verificato di prova"]),
  ),
  domain: "https://dimora.fixture/soggiorno/",
  email: "ospite@dimora.fixture",
  phone: "+390000000000",
  maps: "https://mappe.fixture/luogo",
  booking: "https://booking.fixture/struttura",
  airbnb: "https://airbnb.fixture/struttura",
};
const completePrivacy = {
  ...privacy,
  reviewed: true,
  analyticsRetention: "2 mesi, senza rinnovo",
  requestRetentionConfirmed: true,
};
const render = (changes = {}) =>
  createSeo({ site, seo, photos, manifest, privacy, ...changes });

test("preview emits no fake URLs or structured business and leaves noindex crawlable", () => {
  const result = render({
    site: { ...site, domain: "[DOMINIO]", address: "[INDIRIZZO]" },
  });
  assert.match(result.head, /noindex, nofollow/);
  assert.match(result.robots, /Allow: \//);
  assert.doesNotMatch(result.robots, /Disallow|Sitemap/);
  assert.equal(result.sitemap, null);
  assert.deepEqual(result.graph, []);
  assert.doesNotMatch(result.head, /\[DOMINIO\]|\[EMAIL\]/);
});
test("setting only a domain does not activate indexing", () => {
  const result = render({
    site: { ...site, domain: configured.domain, address: "[INDIRIZZO]" },
  });
  assert.equal(result.indexable, false);
  assert.match(result.head, /noindex/);
  assert.equal(result.sitemap, null);
  assert.equal(
    result.graph.some((node) => node["@type"] === "LodgingBusiness"),
    false,
  );
});
test("indexable build refuses placeholder content and bad contact details", () => {
  assert.throws(
    () =>
      render({
        seo: { ...seo, indexable: true },
        privacy: { ...privacy, reviewed: false },
      }),
    /Completare\/verificare/,
  );
  assert.ok(
    publicationIssues({
      ...configured,
      email: "invalid",
      phone: "123",
    }).includes("email"),
  );
  assert.ok(
    publicationIssues({
      ...configured,
      email: "invalid",
      phone: "123",
    }).includes("phone"),
  );
});
test("canonical preserves base path and rejects unsafe or test URLs", () => {
  assert.equal(
    canonicalUrl("https://dimora.fixture/soggiorno/index.html"),
    configured.domain,
  );
  for (const value of [
    "[DOMINIO]",
    "http://dimora.fixture",
    "https://example.com",
    "https://localhost",
    "https://127.0.0.1",
    "https://demo.test",
    "https://name:password@dimora.fixture",
    "https://dimora.fixture/?x=1",
    "https://dimora.fixture/#home",
  ])
    assert.equal(canonicalUrl(value), null);
});
test("public metadata, entities and image sitemap share one canonical URL", () => {
  const result = render({
    site: configured,
    privacy: completePrivacy,
    seo: { ...seo, indexable: true },
  });
  assert.equal(result.indexable, true);
  assert.match(result.head, /max-image-preview:large/);
  assert.match(
    result.robots,
    /https:\/\/dimora.fixture\/soggiorno\/sitemap.xml/,
  );
  assert.equal((result.sitemap.match(/<url>/g) || []).length, 1);
  assert.equal((result.sitemap.match(/<image:loc>/g) || []).length, 7);
  assert.doesNotMatch(result.sitemap, /lastmod|#|priority/);
  const business = result.graph.find(
    (node) => node["@type"] === "LodgingBusiness",
  );
  assert.equal(business.address.streetAddress, configured.address);
  assert.equal(business.telephone, configured.phone);
  const ids = new Set(result.graph.map((node) => node["@id"]));
  const visit = (value) => {
    if (!value || typeof value !== "object") return;
    if (Object.keys(value).length === 1 && value["@id"])
      assert.ok(ids.has(value["@id"]));
    Object.values(value).forEach(visit);
  };
  visit(result.graph);
  assert.doesNotMatch(
    JSON.stringify(result.graph),
    /aggregateRating|reviewCount|ratingValue|Offer|GeoCoordinates/,
  );
});
test("metadata is HTML escaped and JSON-LD cannot break out of its script", () => {
  const result = render({
    site: { ...configured, address: "</script><script>alert(1)</script>" },
    seo: { ...seo, title: 'Titolo " & <prova>' },
  });
  assert.match(result.head, /Titolo &quot; &amp; &lt;prova&gt;/);
  assert.doesNotMatch(result.head, /<script>alert/);
  const json = result.head.match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
  )[1];
  assert.doesNotThrow(() => JSON.parse(json));
});
test("compiled page has no unresolved template tokens or duplicate SEO tags", () => {
  const html = readFileSync(
    new URL("../dist/index.html", import.meta.url),
    "utf8",
  );
  assert.doesNotMatch(html, /\{\{(?:photo|site|ref|full|metadata)/);
  assert.equal((html.match(/<title>/g) || []).length, 1);
  assert.equal((html.match(/name="description"/g) || []).length, 1);
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
});

test("publication checks the rendered privacy, not a legacy text field", () => {
  const publicSeo = { ...seo, indexable: true };
  assert.throws(
    () =>
      render({
        site: { ...configured, privacy: "legacy" },
        seo: publicSeo,
        privacy: { ...privacy, analyticsRetention: "[VERIFICARE]" },
      }),
    /privacy.analyticsRetention/,
  );
  for (const change of [
    { reviewed: false },
    { requestRetentionConfirmed: false },
    { controller: "[TITOLARE]" },
    { contact: "invalid" },
    { analyticsRetention: "[VERIFICARE]" },
  ]) {
    assert.throws(
      () =>
        render({
          site: configured,
          seo: publicSeo,
          privacy: { ...completePrivacy, ...change },
        }),
      /privacy/,
    );
  }
  assert.equal(
    render({ site: configured, seo: publicSeo, privacy: completePrivacy })
      .indexable,
    true,
  );
});
