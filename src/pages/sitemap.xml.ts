import manifest from "../image-manifest.json";
import { locales, localePath } from "../i18n/index.ts";
import { site, photos } from "../site.config.ts";
import type { ImageManifest, PhotoName } from "../types.ts";

const imagesManifest = manifest as ImageManifest;

const escape = (value: string | number) =>
  String(value).replace(
    /[&<>'"]/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&apos;",
        '"': "&quot;",
      })[char as "&" | "<" | ">" | "'" | '"'],
  );
const absolute = (path: string) =>
  new URL(path.replace(/^\//, ""), `${site.domain}/`).href;

export function GET() {
  const alternates = locales
    .map(
      (locale) =>
        `<xhtml:link rel="alternate" hreflang="${locale}" href="${escape(absolute(localePath(locale)))}"/>`,
    )
    .concat(
      `<xhtml:link rel="alternate" hreflang="x-default" href="${escape(absolute("/"))}"/>`,
    )
    .join("");
  const images = (Object.keys(photos) as PhotoName[])
    .map((name) => {
      const image = imagesManifest[name];
      return `<image:image><image:loc>${escape(absolute(`/images/${image.base}-${image.widths.at(-1)}.jpg`))}</image:loc></image:image>`;
    })
    .join("");
  const urls = locales
    .map(
      (locale) =>
        `<url><loc>${escape(absolute(localePath(locale)))}</loc>${alternates}${images}</url>`,
    )
    .join("");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${urls}</urlset>\n`,
    {
      headers: { "Content-Type": "application/xml; charset=utf-8" },
    },
  );
}
