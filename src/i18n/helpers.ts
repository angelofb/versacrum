import { privacy } from "../privacy.config.ts";
import type { Locale } from "./config.ts";
import type { Catalog } from "./schema.ts";
import type { PhotoName } from "../types.ts";

export const formatDate = (locale: Locale, date: string) =>
  new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));

export const formatUpdated = (locale: Locale) =>
  formatDate(locale, privacy.updated);

// The cropped sharing image may omit details described by the full photo alt.
export function shareImageAlt(copy: Catalog, name: PhotoName) {
  const label =
    name === "ascoli" ? copy.home.city.caption : copy.home.gallery[name][0];
  return `Ver Sacrum · Ascoli Piceno — ${label}`;
}

/** JSON embedded in a script must not be able to terminate its element. */
export const serializeInline = (value: unknown) =>
  JSON.stringify(value).replace(/</g, "\\u003c");
