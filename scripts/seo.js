import { isConfigured, isHttpsUrl } from "../src/site.config.js";

export const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );

export function canonicalUrl(value) {
  if (!isHttpsUrl(value)) return null;
  const url = new URL(value);
  // Never emit credentials, query parameters, fragments or a local/test host.
  if (
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    url.port ||
    !url.hostname.includes(".") ||
    /(^|\.)(localhost|example\.(com|org|net))$|\.(test|invalid|localhost)$|^\d+\.\d+\.\d+\.\d+$/.test(
      url.hostname,
    )
  )
    return null;
  url.pathname =
    url.pathname.replace(/\/index\.html$/, "/").replace(/\/+$/, "") + "/";
  return url.href;
}

export function publicationIssues(site) {
  const missing = Object.entries(site)
    .filter(([key, value]) => key !== "formEndpoint" && !isConfigured(value))
    .map(([key]) => key);
  if (!canonicalUrl(site.domain) && !missing.includes("domain"))
    missing.push("domain");
  for (const key of ["maps", "booking", "airbnb", "instagram"]) {
    if (isConfigured(site[key]) && !isHttpsUrl(site[key])) missing.push(key);
  }
  if (
    isConfigured(site.email) &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(site.email)
  )
    missing.push("email");
  if (
    isConfigured(site.phone) &&
    !/^\+\d{7,15}$/.test(site.phone.replace(/[\s()-]/g, ""))
  )
    missing.push("phone");
  return [...new Set(missing)];
}

export function createSeo({ site, seo, photos, manifest }) {
  if (seo.indexable && publicationIssues(site).length) {
    throw new Error(
      `SEO: pubblicazione indicizzabile incompleta. Completare/verificare: ${publicationIssues(site).join(", ")}. Lasciare seo.indexable=false per l'anteprima.`,
    );
  }
  const canonical = canonicalUrl(site.domain);
  const indexable = seo.indexable === true && Boolean(canonical);
  const meta = (name, content, property = false) =>
    `<meta ${property ? "property" : "name"}="${name}" content="${escapeHtml(content)}">`;
  const head = [
    `<title>${escapeHtml(seo.title)}</title>`,
    meta("description", seo.description),
    meta(
      "robots",
      indexable
        ? "index, follow, max-image-preview:large"
        : "noindex, nofollow",
    ),
    meta("og:type", "website", true),
    meta("og:locale", "it_IT", true),
    meta("og:site_name", "Ver Sacrum", true),
    meta("og:title", seo.title, true),
    meta("og:description", seo.description, true),
    meta("twitter:card", "summary_large_image"),
    meta("twitter:title", seo.title),
    meta("twitter:description", seo.description),
  ];
  let graph = [];
  let sitemap = null;
  // Let crawlers fetch the page and read noindex even when the site is a preview.
  let robots = "User-agent: *\nAllow: /\n";
  if (canonical) {
    const absolute = (path) => new URL(path, canonical).href;
    const ogImage = absolute("images/og-image.jpg");
    head.push(
      `<link rel="canonical" href="${escapeHtml(canonical)}">`,
      meta("og:url", canonical, true),
      meta("og:image", ogImage, true),
      meta("og:image:width", "1200", true),
      meta("og:image:height", "630", true),
      meta("og:image:type", "image/jpeg", true),
      meta("og:image:alt", photos.soggiorno.alt, true),
      meta("twitter:image", ogImage),
      meta("twitter:image:alt", photos.soggiorno.alt),
    );
    const imageNodes = Object.entries(photos).map(([key, photo]) => {
      const image = manifest[key];
      const width = image.widths.at(-1);
      return {
        "@type": "ImageObject",
        "@id": `${canonical}#foto-${key}`,
        contentUrl: absolute(`images/${image.base}-${width}.jpg`),
        caption: photo.alt,
        width,
        height: Math.round((image.height * width) / image.width),
        inLanguage: "it-IT",
      };
    });
    const businessId = `${canonical}#dimora`;
    const hasAddress = isConfigured(site.address);
    graph = [
      {
        "@type": "WebSite",
        "@id": `${canonical}#website`,
        url: canonical,
        name: "Ver Sacrum",
        inLanguage: "it-IT",
        ...(hasAddress ? { publisher: { "@id": businessId } } : {}),
      },
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: seo.title,
        description: seo.description,
        inLanguage: "it-IT",
        isPartOf: { "@id": `${canonical}#website` },
        primaryImageOfPage: { "@id": `${canonical}#foto-soggiorno` },
        image: imageNodes.map((image) => ({ "@id": image["@id"] })),
        ...(hasAddress ? { about: { "@id": businessId } } : {}),
      },
      ...imageNodes,
    ];
    if (hasAddress) {
      const business = {
        "@type": "LodgingBusiness",
        "@id": businessId,
        name: "Ver Sacrum",
        url: canonical,
        description: seo.description,
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address,
          addressLocality: "Ascoli Piceno",
          addressRegion: "Marche",
          addressCountry: "IT",
        },
        image: imageNodes
          .filter((image) => !image["@id"].endsWith("foto-ascoli"))
          .map((image) => ({ "@id": image["@id"] })),
        amenityFeature: [
          "Cucina attrezzata",
          "Wi-Fi",
          "Aria condizionata",
          "TV",
        ].map((name) => ({
          "@type": "LocationFeatureSpecification",
          name,
          value: true,
        })),
      };
      if (isConfigured(site.email)) business.email = site.email;
      if (isConfigured(site.phone)) business.telephone = site.phone;
      if (isHttpsUrl(site.maps)) business.hasMap = site.maps;
      const sameAs = ["instagram", "booking", "airbnb"]
        .map((key) => site[key])
        .filter(isHttpsUrl);
      if (sameAs.length) business.sameAs = sameAs;
      graph.push(business);
    }
    head.push(
      `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c")}</script>`,
    );
    if (indexable) {
      robots += `\nSitemap: ${absolute("sitemap.xml")}\n`;
      sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"><url><loc>${escapeHtml(canonical)}</loc>${imageNodes.map((image) => `<image:image><image:loc>${escapeHtml(image.contentUrl)}</image:loc></image:image>`).join("")}</url></urlset>\n`;
    }
  }
  return {
    head: head.join("\n"),
    robots,
    sitemap,
    graph,
    indexable,
    canonical,
  };
}
