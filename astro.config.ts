import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://versacrumbnb.it",
  output: "static",
  build: { format: "preserve" },
  publicDir: "src/public",
  outDir: "dist",
  vite: {
    build: { assetsDir: "assets" },
  },
});
