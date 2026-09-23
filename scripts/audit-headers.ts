import { site } from "../src/site.config.ts";

const expected = [
  "content-security-policy",
  "strict-transport-security",
  "x-content-type-options",
  "referrer-policy",
  "permissions-policy",
  "x-frame-options",
] as const;

for (const path of ["/", "/privacy.html"]) {
  const url = new URL(path, site.domain);
  const response = await fetch(url, {
    method: "HEAD",
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok || new URL(response.url).origin !== url.origin)
    throw new Error(
      `${url}: unexpected response ${response.status} ${response.url}`,
    );

  console.log(`\n${url} — ${response.status}`);
  for (const name of expected)
    console.log(`${name}: ${response.headers.get(name) ?? "ASSENTE"}`);
}

console.log(
  "\nGli header mancanti sono rischi residui documentati, non protezioni attive.",
);
