import it from "./locales/it.ts";
import en from "./locales/en.ts";
import fr from "./locales/fr.ts";
import es from "./locales/es.ts";
import de from "./locales/de.ts";
import type { Locale } from "./config.ts";
import type { Catalog } from "./schema.ts";

export const catalogs = { it, en, fr, es, de } satisfies Record<
  Locale,
  Catalog
>;
export const getCopy = (locale: Locale): Catalog => catalogs[locale];
export { locales, localeInfo } from "./config.ts";
