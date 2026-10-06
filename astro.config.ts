import { defineConfig } from "astro/config";
import { locales, defaultLocale } from "./src/i18n/config.ts";

export default defineConfig({
  site: "https://versacrumbnb.it",
  output: "static",
  i18n: { locales, defaultLocale, routing: { prefixDefaultLocale: false } },
  // The shared stylesheet is small after compression. Inlining avoids a
  // render-blocking request on the first visit to this static site.
  build: { format: "preserve", inlineStylesheets: "always" },
  publicDir: "src/public",
  outDir: "dist",
  vite: {
    build: { assetsDir: "assets" },
  },
});
