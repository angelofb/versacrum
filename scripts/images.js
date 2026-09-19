import { mkdir, readFile, writeFile, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import sharp from "sharp";
import { photos } from "../src/site.config.js";

const output = new URL("../src/public/images/", import.meta.url);
await mkdir(output, { recursive: true });
const widths = [480, 800, 1200, 1600];
const manifest = {};
let total = 0;
for (const [name, photo] of Object.entries(photos)) {
  const input = new URL(`../src/images/${photo.file}`, import.meta.url);
  const bytes = await readFile(input);
  const fingerprint = createHash("sha256")
    .update(bytes)
    .update("responsive-v1")
    .digest("hex")
    .slice(0, 10);
  const metadata = await sharp(bytes)
    .rotate()
    .toBuffer({ resolveWithObject: true });
  const actualWidths = widths.filter((width) => width <= metadata.info.width);
  if (!actualWidths.includes(Math.min(1600, metadata.info.width)))
    actualWidths.push(Math.min(1600, metadata.info.width));
  const base = `${name}-${fingerprint}`;
  manifest[name] = {
    base,
    width: metadata.info.width,
    height: metadata.info.height,
    widths: actualWidths,
  };
  for (const width of actualWidths) {
    for (const format of ["avif", "webp", "jpg"]) {
      const target = new URL(`${base}-${width}.${format}`, output);
      try {
        await stat(target);
      } catch {
        const pipeline = sharp(bytes)
          .rotate()
          .resize({ width, withoutEnlargement: true });
        if (format === "avif") pipeline.avif({ quality: 52, effort: 4 });
        if (format === "webp") pipeline.webp({ quality: 78 });
        if (format === "jpg") pipeline.jpeg({ quality: 80, mozjpeg: true });
        await pipeline.toFile(target.pathname);
      }
      total += (await stat(target)).size;
    }
  }
}
await sharp(new URL("../src/images/IMG_8595.jpg", import.meta.url).pathname)
  .rotate()
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .jpeg({ quality: 85 })
  .toFile(new URL("og-image.jpg", output).pathname);
await sharp(new URL("../src/public/favicon.svg", import.meta.url).pathname)
  .resize(180, 180)
  .png()
  .toFile(
    new URL("../src/public/apple-touch-icon.png", import.meta.url).pathname,
  );
await writeFile(
  new URL("../src/image-manifest.json", import.meta.url),
  JSON.stringify(manifest, null, 2),
);
console.log(
  `Immagini: ${Object.keys(photos).length} scatti, AVIF/WebP/JPEG responsive (${(total / 1024 / 1024).toFixed(1)} MB totali su disco).`,
);
