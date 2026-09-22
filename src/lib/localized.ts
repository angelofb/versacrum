import { getT, localeInfo, localePath, locales } from "../i18n/index.ts";
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

const translatedAlt = {
  en: {
    soggiorno:
      "Living room with a mustard sofa, white beams and two windows overlooking the historic centre",
    camera: "Double bedroom with a turquoise wardrobe, bed and exposed beams",
    cucina: "Grey kitchen with oven, hob and kettle beneath wooden beams",
    bagno: "Bathroom with white basin, grey finishes and glass shower",
    colazione:
      "Cup and coffee pot on a floral placemat in front of the kitchen",
    dettagli:
      "Hanging plant by the window and view of the living room with yellow sofa",
    ascoli:
      "View from the window over an Ascoli lane, stone façades and shutters",
  },
  fr: {
    soggiorno:
      "Salon avec canapé moutarde, poutres blanches et deux fenêtres sur le centre historique",
    camera: "Chambre double avec armoire turquoise, lit et poutres apparentes",
    cucina:
      "Cuisine grise avec four, plaques et bouilloire sous les poutres en bois",
    bagno:
      "Salle de bains avec vasque blanche, revêtements gris et douche vitrée",
    colazione: "Tasse et cafetière sur un set fleuri devant la cuisine",
    dettagli:
      "Plante suspendue près de la fenêtre et vue sur le salon au canapé jaune",
    ascoli:
      "Vue depuis la fenêtre sur une ruelle d’Ascoli, façades en pierre et volets",
  },
  es: {
    soggiorno:
      "Salón con sofá mostaza, vigas blancas y dos ventanas al centro histórico",
    camera: "Dormitorio doble con armario turquesa, cama y vigas vistas",
    cucina: "Cocina gris con horno, placa y hervidor bajo las vigas de madera",
    bagno: "Baño con lavabo blanco, revestimientos grises y ducha de cristal",
    colazione:
      "Taza y cafetera sobre un mantel individual de flores frente a la cocina",
    dettagli:
      "Planta colgante junto a la ventana y vista del salón con sofá amarillo",
    ascoli:
      "Vista desde la ventana a una callejuela de Ascoli, fachadas de piedra y contraventanas",
  },
  de: {
    soggiorno:
      "Wohnzimmer mit senffarbenem Sofa, weißen Balken und zwei Fenstern zur Altstadt",
    camera:
      "Doppelzimmer mit türkisfarbenem Schrank, Bett und sichtbaren Balken",
    cucina:
      "Graue Küche mit Backofen, Kochfeld und Wasserkocher unter Holzbalken",
    bagno:
      "Badezimmer mit weißem Waschbecken, grauen Oberflächen und Glasdusche",
    colazione:
      "Tasse und Kaffeekanne auf einer geblümten Unterlage vor der Küche",
    dettagli:
      "Hängepflanze am Fenster und Blick ins Wohnzimmer mit gelbem Sofa",
    ascoli:
      "Blick aus dem Fenster in eine Gasse von Ascoli mit Steinfassaden und Fensterläden",
  },
};

export const photoAlt = (locale: Locale, name: PhotoName) =>
  locale === "it" ? photos[name].alt : translatedAlt[locale][name];

export const pictureData = (locale: Locale, name: PhotoName) => ({
  ...images[name],
  alt: photoAlt(locale, name),
});

export function structuredData(locale: Locale) {
  const t = getT(locale);
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
        name: t("seo.title"),
        description: t("seo.description"),
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
        description: t("seo.description"),
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
        amenityFeature: t<string[]>("home.spaces.amenities", {
          returnObjects: true,
        }).map((name) => ({
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
