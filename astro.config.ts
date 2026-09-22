import { defineConfig } from "astro/config";
import { locales, defaultLocale } from "./src/i18n/config.ts";

export default defineConfig({
  site: "https://versacrumbnb.it",
  output: "static",
  i18n: { locales, defaultLocale, routing: { prefixDefaultLocale: false } },
  build: { format: "preserve" },
  publicDir: "src/public",
  outDir: "dist",
  vite: {
    build: { assetsDir: "assets" },
  },
});
