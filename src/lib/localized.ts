import { localePath } from "../i18n/paths.ts";
import { getCopy, localeInfo, locales } from "../i18n/index.ts";
import { featuredPhoto, photos, site } from "../site.config.ts";
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

export function structuredData(locale: Locale, page: PageName = "home") {
  const copy = getCopy(locale);
  const canonical = canonicalFor(locale, page);
  const home = canonicalFor(locale);
  const root = canonicalFor("it");
  const absolute = (path: string) => new URL(path, root).href;
  const imageNodes = (Object.keys(photos) as PhotoName[]).map((key) => {
    const image = images[key];
    const width = image.widths.at(-1) ?? image.width;
    return {
      "@type": "ImageObject",
      "@id": `${home}#photo-${key}`,
      contentUrl: absolute(`images/${image.base}-${width}.jpg`),
      caption: photoAlt(locale, key),
      width,
      height: Math.round((image.height * width) / image.width),
      inLanguage: locale,
    };
  });
  const businessId = `${root}#dimora`;
  const apartmentId = `${root}#appartamento`;
  const isHome = page === "home";
  const title = isHome ? copy.seo.title : copy.location.metaTitle;
  const description = isHome
    ? copy.seo.description
    : copy.location.metaDescription;
  const address = {
    "@type": "PostalAddress",
    streetAddress: site.address,
    addressLocality: "Ascoli Piceno",
    addressRegion: "Marche",
    postalCode: site.postalCode,
    addressCountry: "IT",
  };
  const amenities = copy.home.spaces.amenities.map((name) => ({
    "@type": "LocationFeatureSpecification",
    name,
    value: true,
  }));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${root}#website`,
        url: root,
        name: "Ver Sacrum",
        alternateName: "Ver Sacrum Ascoli Piceno",
        inLanguage: locales,
        publisher: { "@id": businessId },
      },
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: title,
        description,
        dateModified: site.lastModified,
        inLanguage: locale,
        isPartOf: { "@id": `${root}#website` },
        ...(isHome
          ? {
              mainEntity: { "@id": businessId },
              primaryImageOfPage: { "@id": `${home}#photo-${featuredPhoto}` },
              image: imageNodes.map((image) => ({ "@id": image["@id"] })),
            }
          : { breadcrumb: { "@id": `${canonical}#breadcrumb` } }),
        about: { "@id": businessId },
      },
      ...(!isHome
        ? [
            {
              "@type": "BreadcrumbList",
              "@id": `${canonical}#breadcrumb`,
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: copy.location.homeLink,
                  item: home,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: copy.location.title,
                  item: canonical,
                },
              ],
            },
          ]
        : []),
      ...imageNodes,
      {
        "@type": "LodgingBusiness",
        "@id": businessId,
        name: "Ver Sacrum",
        alternateName: "Ver Sacrum - Appartamento in centro",
        url: root,
        description: copy.seo.description,
        address,
        image: imageNodes
          .filter((image) => !image["@id"].endsWith("photo-ascoli"))
          .map((image) => ({ "@id": image["@id"] })),
        amenityFeature: amenities,
        containsPlace: { "@id": apartmentId },
        identifier: [
          { "@type": "PropertyValue", propertyID: "CIN", value: site.cin },
          { "@type": "PropertyValue", propertyID: "CIR", value: site.cir },
        ],
        email: site.email,
        hasMap: site.maps,
        sameAs: [site.booking, site.airbnb],
      },
      {
        "@type": "Apartment",
        "@id": apartmentId,
        name: "Ver Sacrum",
        address,
        containedInPlace: { "@id": businessId },
        occupancy: { "@type": "QuantitativeValue", maxValue: site.maxGuests },
        numberOfBedrooms: 1,
        numberOfBathroomsTotal: 1,
        floorLevel: "1",
        amenityFeature: amenities,
      },
    ],
  };
}

export { localeInfo, localePath, locales };
