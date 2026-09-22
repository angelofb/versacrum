import { getRelativeLocaleUrl } from "astro:i18n";
import type { Locale } from "./config.ts";
import type { PageName } from "../types.ts";

export function localePath(locale: Locale, page: PageName = "home") {
  const base = getRelativeLocaleUrl(locale).replace(/\/?$/, "/");
  return page === "privacy" ? `${base}privacy.html` : base;
}
