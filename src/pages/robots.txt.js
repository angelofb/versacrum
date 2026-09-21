import { site } from "../site.config.js";

export function GET() {
  return new Response(
    `User-agent: *\nAllow: /\n\nSitemap: ${site.domain}/sitemap.xml\n`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
}
