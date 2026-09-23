import { test, expect, type Page } from "@playwright/test";
import { createServer, type Server } from "node:http";
import { readFile } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import sharp from "sharp";

// Compare two builds in the SAME browser/OS, avoiding platform-specific PNGs.
const reference = process.env.VISUAL_REFERENCE_DIR;
let server: Server | undefined;
let referenceUrl = "";
test.beforeAll(async () => {
  if (process.env.CI && !reference)
    throw new Error("CI requires VISUAL_REFERENCE_DIR");
  if (!reference) return;
  const root = resolve(reference);
  const mime: Record<string, string> = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".avif": "image/avif",
    ".webp": "image/webp",
    ".jpg": "image/jpeg",
    ".woff2": "font/woff2",
    ".svg": "image/svg+xml",
  };
  server = createServer(async (request, response) => {
    try {
      const pathname = decodeURIComponent(
        new URL(request.url ?? "/", "http://localhost").pathname,
      );
      const file = resolve(
        root,
        `.${pathname}${pathname.endsWith("/") ? "index.html" : ""}`,
      );
      if (!file.startsWith(root + sep)) {
        response.writeHead(403).end();
        return;
      }
      const body = await readFile(file);
      response
        .writeHead(200, {
          "Content-Type": mime[extname(file)] ?? "application/octet-stream",
        })
        .end(body);
    } catch {
      response.writeHead(404).end();
    }
  });
  await new Promise<void>((ready) => server!.listen(0, "127.0.0.1", ready));
  const address = server.address();
  if (!address || typeof address === "string")
    throw new Error("Missing reference server");
  referenceUrl = `http://127.0.0.1:${address.port}`;
});
test.afterAll(async () => {
  if (server)
    await new Promise<void>((done, reject) =>
      server!.close((error) => (error ? reject(error) : done())),
    );
});

async function screenshot(page: Page, url: string) {
  await page.goto(url);
  // Compare the established Italian page layout independently of the
  // intentionally repositioned consent panel (#24).
  const reject = page.locator("#analytics-reject");
  if (await reject.isVisible()) await reject.click();
  await page.evaluate(async () => {
    const images = [...document.images].filter(
      (image) => image.id !== "lightbox-image",
    );
    images.forEach((image) => (image.loading = "eager"));
    await Promise.all(images.map((image) => image.decode()));
    await document.fonts.ready;
  });
  // WebKit can decode images before their final composited frame is ready.
  // Require two consecutive equal frames, like Playwright's screenshot matcher.
  let current: Buffer | undefined;
  await expect(async () => {
    const previous = current;
    current = await page.screenshot({
      fullPage: true,
      animations: "disabled",
      scale: "css",
      // WebKit rasterizes AVIF photographs inconsistently across origins.
      // Image loading and dimensions are verified by the functional suite.
      mask: [page.locator("picture")],
      maskColor: "#000000",
    });
    expect(previous && current.equals(previous)).toBeTruthy();
  }).toPass({ timeout: 10000, intervals: [100, 200, 500] });
  return current!;
}

for (const path of ["/", "/privacy.html", "/de/"]) {
  test(`visual regression against reference build: ${path}`, async ({
    page,
  }, info) => {
    test.skip(!reference, "Set VISUAL_REFERENCE_DIR to a previous dist build");
    const expected = await screenshot(page, referenceUrl + path);
    const actual = await screenshot(page, `http://127.0.0.1:4173${path}`);
    const left = await sharp(expected)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const right = await sharp(actual)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    await info.attach("reference", {
      body: expected,
      contentType: "image/png",
    });
    await info.attach("current", { body: actual, contentType: "image/png" });
    expect(right.info).toEqual(left.info);
    let changed = 0;
    for (let i = 0; i < left.data.length; i += 4) {
      if (
        [0, 1, 2].some(
          (channel) =>
            Math.abs(left.data[i + channel] - right.data[i + channel]) > 16,
        )
      )
        changed++;
    }
    expect(
      changed / (left.info.width * left.info.height),
      "Changed pixel ratio",
    ).toBeLessThanOrEqual(0.001);
  });
}
