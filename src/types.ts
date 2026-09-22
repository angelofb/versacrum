export const locales = ["it", "en", "fr", "es", "de"] as const;

export type Locale = (typeof locales)[number];
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
