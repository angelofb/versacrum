import i18next from "i18next";
import { resources, locales } from "./translations.ts";
import type { Locale, PageName } from "../types.ts";

type TranslationOptions = Record<string, unknown>;
export interface Translator {
  (key: string, options?: TranslationOptions): string;
  <Value>(
    key: string,
    options: TranslationOptions & { returnObjects: true },
  ): Value;
}

export type HomeCopy = (typeof resources)["it"]["translation"]["home"];
export type PrivacyTranslation =
  (typeof resources)["it"]["translation"]["privacy"];

const instance = i18next.createInstance();
instance.init({
  initAsync: false,
  fallbackLng: false,
  supportedLngs: locales,
  resources,
  interpolation: { escapeValue: false },
  returnObjects: true,
});

export const getT = (locale: Locale): Translator =>
  instance.getFixedT(locale) as unknown as Translator;
export { locales, resources };

export const localePath = (locale: Locale, page: PageName = "home") => {
  const prefix = locale === "it" ? "/" : `/${locale}/`;
  return page === "privacy" ? `${prefix}privacy.html` : prefix;
};

export const localeInfo: Record<
  Locale,
  { code: string; name: string; og: string }
> = {
  it: { code: "IT", name: "Italiano", og: "it_IT" },
  en: { code: "EN", name: "English", og: "en_GB" },
  fr: { code: "FR", name: "Français", og: "fr_FR" },
  es: { code: "ES", name: "Español", og: "es_ES" },
  de: { code: "DE", name: "Deutsch", og: "de_DE" },
};
