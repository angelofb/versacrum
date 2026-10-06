import { site } from "../site.config.ts";

export function GET() {
  return new Response(
    `User-agent: *\nAllow: /\n\nHost: ${new URL(site.domain).host}\nSitemap: ${site.domain}/sitemap.xml\n`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
}
