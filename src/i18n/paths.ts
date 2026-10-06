import { getRelativeLocaleUrl } from "astro:i18n";
import type { Locale } from "./config.ts";
import type { PageName } from "../types.ts";

export function localePath(locale: Locale, page: PageName = "home") {
  const base = getRelativeLocaleUrl(locale).replace(/\/?$/, "/");
  if (page === "privacy") return `${base}privacy.html`;
  if (page === "location") return `${base}ascoli-piceno/`;
  return base;
}
