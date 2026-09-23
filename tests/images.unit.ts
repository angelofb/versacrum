import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import sharp from "sharp";
import { buildResponsivePhoto } from "../scripts/image-pipeline.ts";
import { imageOptions, type ImageOptions } from "../scripts/image-options.ts";
import { fallbackImageWidth } from "../src/lib/image-width.ts";
import { featuredPhoto, photos } from "../src/site.config.ts";
import type { ImageManifest } from "../src/types.ts";

const root = new URL("../", import.meta.url);

test("a rotated source below 800px has valid fallback, clean variants and stable cache", async () => {
  const directory = await mkdtemp(join(tmpdir(), "versacrum-images-"));
  const output = pathToFileURL(`${directory}/`);
  try {
    const source = await sharp({
      create: { width: 740, height: 500, channels: 3, background: "#587654" },
    })
      .jpeg()
      .withMetadata({ orientation: 6 })
      .toBuffer();
    assert.equal((await sharp(source).metadata()).orientation, 6);
    const first = await buildResponsivePhoto("soggiorno", source, output);
    assert.deepEqual(first.entry.widths, [480, 500]);
    assert.equal(first.entry.width, 500);
    assert.equal(first.entry.height, 740);
    const fallback = fallbackImageWidth(first.entry.widths);
    assert.equal(fallback, 500);
    for (const width of first.entry.widths) {
      for (const [extension, format] of [
        ["avif", "heif"],
        ["webp", "webp"],
        ["jpg", "jpeg"],
      ] as const) {
        const path = join(
          directory,
          `${first.entry.base}-${width}.${extension}`,
        );
        const metadata = await sharp(path).metadata();
        assert.equal(metadata.width, width);
        assert.equal(metadata.format, format);
        assert.equal(metadata.orientation, undefined);
        assert.equal(metadata.exif, undefined);
      }
    }
    const fallbackPath = join(directory, `${first.entry.base}-${fallback}.jpg`);
    const modified = (await stat(fallbackPath)).mtimeMs;
    await new Promise((done) => setTimeout(done, 25));
    const repeated = await buildResponsivePhoto("soggiorno", source, output);
    assert.deepEqual(repeated, first);
    assert.equal((await stat(fallbackPath)).mtimeMs, modified);

    const changed: ImageOptions = {
      ...imageOptions,
      responsive: {
        ...imageOptions.responsive,
        formats: {
          ...imageOptions.responsive.formats,
          webp: { quality: 79 },
        },
      },
    };
    const regenerated = await buildResponsivePhoto(
      "soggiorno",
      source,
      output,
      changed,
    );
    assert.notEqual(regenerated.entry.base, first.entry.base);
    assert.ok(
      (await stat(join(directory, `${regenerated.entry.base}-500.webp`))).size >
        0,
    );
    const otherSource = await sharp({
      create: { width: 740, height: 500, channels: 3, background: "#587655" },
    })
      .jpeg()
      .withMetadata({ orientation: 6 })
      .toBuffer();
    assert.notEqual(
      (await buildResponsivePhoto("soggiorno", otherSource, output)).entry.base,
      first.entry.base,
    );
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("built manifest, references and Open Graph image match the configured source", async () => {
  const manifest: ImageManifest = JSON.parse(
    await readFile(new URL("src/image-manifest.json", root), "utf8"),
  );
  assert.deepEqual(Object.keys(manifest).sort(), Object.keys(photos).sort());
  for (const [name, entry] of Object.entries(manifest)) {
    assert.ok(photos[name as keyof typeof photos]);
    for (const width of entry.widths) {
      for (const format of ["avif", "webp", "jpg"]) {
        const file = new URL(
          `src/public/images/${entry.base}-${width}.${format}`,
          root,
        );
        const metadata = await sharp(fileURLToPath(file)).metadata();
        assert.equal(metadata.width, width);
        assert.equal(metadata.orientation, undefined);
        assert.equal(metadata.exif, undefined);
      }
    }
  }
  const html = await readFile(new URL("dist/index.html", root), "utf8");
  for (const path of html.match(/\/images\/[\w.-]+\.(?:avif|webp|jpg)/g) ??
    []) {
    assert.ok(
      (await stat(resolve(fileURLToPath(new URL("dist", root)), `.${path}`)))
        .size > 0,
      path,
    );
  }
  const source = await readFile(
    new URL(`src/images/${photos[featuredPhoto].file}`, root),
  );
  const expectedOg = await sharp(source)
    .rotate()
    .resize(imageOptions.og.width, imageOptions.og.height, {
      fit: imageOptions.og.fit,
      position: imageOptions.og.position,
    })
    .jpeg(imageOptions.og.jpg)
    .toBuffer();
  assert.deepEqual(
    await readFile(new URL("src/public/images/og-image.jpg", root)),
    expectedOg,
  );
});
