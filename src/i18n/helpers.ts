import { privacy } from "../privacy.config.ts";
import type { Locale } from "./config.ts";

export const formatUpdated = (locale: Locale) =>
  new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${privacy.updated}T00:00:00Z`));

/** JSON embedded in a script must not be able to terminate its element. */
export const serializeInline = (value: unknown) =>
  JSON.stringify(value).replace(/</g, "\\u003c");
