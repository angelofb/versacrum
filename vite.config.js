import { defineConfig } from "vite";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { privacy } from "./src/privacy.config.js";
import {
  site,
  seo,
  photos,
  isConfigured,
  isHttpsUrl,
} from "./src/site.config.js";
import { createSeo, canonicalUrl, privacyIssues } from "./scripts/seo.js";

const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
function editorialHtml() {
  return {
    name: "editorial-html",
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        html = html.replace("{{include:analytics-consent}}", () =>
          readFileSync(
            new URL("./src/partials/analytics-consent.html", import.meta.url),
            "utf8",
          ),
        );
        html = html.replace(/\{\{privacy:(\w+)\}\}/g, (_, key) => {
          if (key === "draftNotice") {
            return privacyIssues(privacy).length
              ? '<p class="privacy-draft"><strong>Bozza non definitiva.</strong> La verifica dell’informativa e della configurazione Analytics è ancora in corso.</p>'
              : "";
          }
          if (key === "metadata") {
            const base = canonicalUrl(site.domain);
            return [
              "<title>Privacy e cookie | Ver Sacrum</title>",
              '<meta name="description" content="Informazioni sul trattamento dei dati delle richieste e sui cookie di Ver Sacrum.">',
              '<meta name="robots" content="noindex, follow">',
              base
                ? `<link rel="canonical" href="${escape(new URL("privacy.html", base).href)}">`
                : "",
            ].join("\n");
          }
          return escape(privacy[key]);
        });

        const manifest = JSON.parse(
          readFileSync(
            new URL("./src/image-manifest.json", import.meta.url),
            "utf8",
          ),
        );
        html = html.replace(/\{\{photo:(\w+):(\w+)\}\}/g, (_, name, layout) => {
          const photo = photos[name];
          const { base, width, height, widths } = manifest[name];
          const sizes =
            layout === "hero"
              ? "(min-width: 900px) 53vw, 100vw"
              : layout === "city"
                ? "(min-width: 900px) 45vw, 100vw"
                : "(min-width: 900px) 33vw, (min-width: 600px) 50vw, 100vw";
          const srcset = (ext) =>
            widths.map((w) => `./images/${base}-${w}.${ext} ${w}w`).join(", ");
          return `<picture><source type="image/avif" srcset="${srcset("avif")}" sizes="${sizes}"><source type="image/webp" srcset="${srcset("webp")}" sizes="${sizes}"><img src="./images/${base}-800.jpg" srcset="${srcset("jpg")}" sizes="${sizes}" width="${width}" height="${height}" alt="${escape(photo.alt)}" ${layout === "hero" ? 'fetchpriority="high" loading="eager"' : 'loading="lazy"'} decoding="async"></picture>`;
        });
        html = html.replace(
          /\{\{full:(\w+)\}\}/g,
          (_, name) =>
            `./images/${manifest[name].base}-${manifest[name].widths.at(-1)}.jpg`,
        );
        html = html.replace(/\{\{ref:(\w+)\}\}/g, (_, key) => {
          const value = site[key];
          const href =
            key === "email" && isConfigured(value)
              ? `mailto:${value}`
              : key === "phone" && isConfigured(value)
                ? `tel:${value.replace(/[^+\d]/g, "")}`
                : isHttpsUrl(value)
                  ? value
                  : null;
          const label =
            {
              maps: "Apri la mappa",
              booking: "Vedi su Booking.com",
              airbnb: "Vedi su Airbnb",
            }[key] ?? value;
          return href
            ? `<a href="${escape(href)}">${escape(label)}</a>`
            : `<span class="placeholder">${escape(value)}</span>`;
        });
        html = html.replace(/\{\{site:(\w+)\}\}/g, (_, key) =>
          escape(site[key]),
        );
        return html.replace(
          "{{metadata}}",
          createSeo({ site, seo, photos, manifest, privacy }).head,
        );
      },
    },
    generateBundle() {
      const manifest = JSON.parse(
        readFileSync(
          new URL("./src/image-manifest.json", import.meta.url),
          "utf8",
        ),
      );
      const generated = createSeo({ site, seo, photos, manifest, privacy });
      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: generated.robots,
      });
      if (generated.sitemap)
        this.emitFile({
          type: "asset",
          fileName: "sitemap.xml",
          source: generated.sitemap,
        });
    },
  };
}

export default defineConfig({
  root: "src",
  base: "./",
  plugins: [editorialHtml()],
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home: fileURLToPath(new URL("./src/index.html", import.meta.url)),
        privacy: fileURLToPath(new URL("./src/privacy.html", import.meta.url)),
      },
    },
  },
});
