import i18next from "i18next";
import { resources, locales } from "./translations.js";

const instance = i18next.createInstance();
instance.init({
  initImmediate: false,
  fallbackLng: "it",
  supportedLngs: locales,
  resources,
  interpolation: { escapeValue: false },
  returnObjects: true,
});

export const getT = (locale) => instance.getFixedT(locale);
export { locales, resources };

export const localePath = (locale, page = "home") => {
  const prefix = locale === "it" ? "/" : `/${locale}/`;
  return page === "privacy" ? `${prefix}privacy.html` : prefix;
};

export const localeInfo = {
  it: { code: "IT", name: "Italiano", og: "it_IT" },
  en: { code: "EN", name: "English", og: "en_GB" },
  fr: { code: "FR", name: "Français", og: "fr_FR" },
  es: { code: "ES", name: "Español", og: "es_ES" },
  de: { code: "DE", name: "Deutsch", og: "de_DE" },
};
