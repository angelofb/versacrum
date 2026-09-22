import { localePath } from "../i18n/paths.ts";
import { getCopy, localeInfo, locales } from "../i18n/index.ts";
import { photos, site } from "../site.config.ts";
import manifest from "../image-manifest.json";
import type { ImageManifest, Locale, PageName, PhotoName } from "../types.ts";

const images = manifest as ImageManifest;

export const canonicalFor = (locale: Locale, page: PageName = "home") =>
  new URL(localePath(locale, page).replace(/^\//, ""), `${site.domain}/`).href;

export const alternatesFor = (page: PageName = "home") => [
  ...locales.map((locale) => ({
    locale,
    href: canonicalFor(locale, page),
  })),
  { locale: "x-default", href: canonicalFor("it", page) },
];

export const photoAlt = (locale: Locale, name: PhotoName) =>
  getCopy(locale).photoAlt[name];

export const pictureData = (locale: Locale, name: PhotoName) => ({
  ...images[name],
  alt: photoAlt(locale, name),
});

export function structuredData(locale: Locale) {
  const copy = getCopy(locale);
  const canonical = canonicalFor(locale);
  const root = canonicalFor("it");
  const absolute = (path: string) => new URL(path, root).href;
  const imageNodes = (Object.keys(photos) as PhotoName[]).map((key) => {
    const image = images[key];
    const width = image.widths.at(-1) ?? image.width;
    return {
      "@type": "ImageObject",
      "@id": `${canonical}#photo-${key}`,
      contentUrl: absolute(`images/${image.base}-${width}.jpg`),
      caption: photoAlt(locale, key),
      width,
      height: Math.round((image.height * width) / image.width),
      inLanguage: locale,
    };
  });
  const businessId = `${root}#dimora`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${root}#website`,
        url: root,
        name: "Ver Sacrum",
        inLanguage: locales,
        publisher: { "@id": businessId },
      },
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: copy.seo.title,
        description: copy.seo.description,
        inLanguage: locale,
        isPartOf: { "@id": `${root}#website` },
        primaryImageOfPage: { "@id": `${canonical}#photo-soggiorno` },
        image: imageNodes.map((image) => ({ "@id": image["@id"] })),
        about: { "@id": businessId },
      },
      ...imageNodes,
      {
        "@type": "LodgingBusiness",
        "@id": businessId,
        name: "Ver Sacrum",
        url: root,
        description: copy.seo.description,
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address,
          addressLocality: "Ascoli Piceno",
          addressRegion: "Marche",
          addressCountry: "IT",
        },
        image: imageNodes
          .filter((image) => !image["@id"].endsWith("photo-ascoli"))
          .map((image) => ({ "@id": image["@id"] })),
        amenityFeature: copy.home.spaces.amenities.map((name) => ({
          "@type": "LocationFeatureSpecification",
          name,
          value: true,
        })),
        email: site.email,
        telephone: site.phone,
        hasMap: site.maps,
        sameAs: [site.booking, site.airbnb],
      },
    ],
  };
}

export { localeInfo, localePath, locales };
