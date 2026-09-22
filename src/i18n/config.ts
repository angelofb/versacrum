export const localeInfo = {
  it: { code: "IT", name: "Italiano", og: "it_IT" },
  en: { code: "EN", name: "English", og: "en_GB" },
  fr: { code: "FR", name: "Français", og: "fr_FR" },
  es: { code: "ES", name: "Español", og: "es_ES" },
  de: { code: "DE", name: "Deutsch", og: "de_DE" },
} as const;
export type Locale = keyof typeof localeInfo;
export const defaultLocale: Locale = "it";
export const locales = Object.keys(localeInfo) as Locale[];
export const translatedLocales = locales.filter(
  (locale) => locale !== defaultLocale,
);
export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && Object.hasOwn(localeInfo, value);
}
