export { locales } from "./i18n/config.ts";
export type { Locale } from "./i18n/config.ts";
export type PageName = "home" | "privacy";
export type PhotoName =
  | "soggiorno"
  | "camera"
  | "cucina"
  | "bagno"
  | "colazione"
  | "dettagli"
  | "ascoli";

export interface ImageManifestEntry {
  base: string;
  width: number;
  height: number;
  widths: number[];
}

export type ImageManifest = Record<PhotoName, ImageManifestEntry>;
