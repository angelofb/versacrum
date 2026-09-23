import { mkdir, readFile, writeFile } from "node:fs/promises";
import {
  buildAppleIcon,
  buildOgImage,
  buildResponsivePhoto,
} from "./image-pipeline.ts";
import { featuredPhoto, photos } from "../src/site.config.ts";
import type { ImageManifest, PhotoName } from "../src/types.ts";

const output = new URL("../src/public/images/", import.meta.url);
await mkdir(output, { recursive: true });
const manifest = {} as ImageManifest;
let total = 0;
for (const [name, photo] of Object.entries(photos) as [
  PhotoName,
  (typeof photos)[PhotoName],
][]) {
  const bytes = await readFile(
    new URL(`../src/images/${photo.file}`, import.meta.url),
  );
  const result = await buildResponsivePhoto(name, bytes, output);
  manifest[name] = result.entry;
  total += result.bytes;
}
await buildOgImage(
  await readFile(
    new URL(`../src/images/${photos[featuredPhoto].file}`, import.meta.url),
  ),
  new URL("og-image.jpg", output),
);
await buildAppleIcon(
  new URL("../src/public/favicon.svg", import.meta.url),
  new URL("../src/public/apple-touch-icon.png", import.meta.url),
);
await writeFile(
  new URL("../src/image-manifest.json", import.meta.url),
  JSON.stringify(manifest, null, 2),
);
console.log(
  `Immagini: ${Object.keys(photos).length} scatti, AVIF/WebP/JPEG responsive (${(total / 1024 / 1024).toFixed(1)} MB totali su disco).`,
);
