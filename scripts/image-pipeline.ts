import { createHash } from "node:crypto";
import { stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { imageOptions, type ImageOptions } from "./image-options.ts";
import type { ImageManifestEntry, PhotoName } from "../src/types.ts";

export async function buildResponsivePhoto(
  name: PhotoName,
  bytes: Buffer,
  output: URL,
  options: ImageOptions = imageOptions,
): Promise<{ entry: ImageManifestEntry; bytes: number }> {
  const requested = [...new Set(options.responsive.widths)].sort(
    (a, b) => a - b,
  );
  if (
    !requested.length ||
    requested.some((width) => !Number.isSafeInteger(width) || width < 1)
  )
    throw new Error("Responsive image widths must be positive integers");

  const fingerprint = createHash("sha256")
    .update(bytes)
    .update("\0")
    .update(JSON.stringify({ pipeline: 2, options: options.responsive }))
    .digest("hex")
    .slice(0, 10);
  const { info } = await sharp(bytes)
    .rotate()
    .toBuffer({ resolveWithObject: true });
  const widths = requested.filter((width) => width <= info.width);
  const finalWidth = Math.min(requested.at(-1)!, info.width);
  if (!widths.includes(finalWidth)) widths.push(finalWidth);
  const base = `${name}-${fingerprint}`;
  const entry = { base, width: info.width, height: info.height, widths };
  let totalBytes = 0;

  for (const width of widths) {
    for (const format of ["avif", "webp", "jpg"] as const) {
      const target = new URL(`${base}-${width}.${format}`, output);
      const path = fileURLToPath(target);
      const cached = await stat(path).catch((error: NodeJS.ErrnoException) => {
        if (error.code === "ENOENT") return undefined;
        throw error;
      });
      if (!cached?.size) {
        const pipeline = sharp(bytes)
          .rotate()
          .resize({ width, withoutEnlargement: true });
        if (format === "avif") pipeline.avif(options.responsive.formats.avif);
        if (format === "webp") pipeline.webp(options.responsive.formats.webp);
        if (format === "jpg") pipeline.jpeg(options.responsive.formats.jpg);
        await pipeline.toFile(path);
      }
      totalBytes += (await stat(path)).size;
    }
  }
  return { entry, bytes: totalBytes };
}

export async function buildOgImage(
  bytes: Buffer,
  target: URL,
  options: ImageOptions = imageOptions,
) {
  await sharp(bytes)
    .rotate()
    .resize(options.og.width, options.og.height, {
      fit: options.og.fit,
      position: options.og.position,
    })
    .jpeg(options.og.jpg)
    .toFile(fileURLToPath(target));
}

export async function buildAppleIcon(
  source: URL,
  target: URL,
  options: ImageOptions = imageOptions,
) {
  await sharp(fileURLToPath(source))
    .resize(options.appleIcon.width, options.appleIcon.height)
    .png()
    .toFile(fileURLToPath(target));
}
