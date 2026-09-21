import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";

// Opt-in: use a freshly downloaded PUBLIC Google tag, never browser credentials.
// Every outbound request is intercepted; no test events reach the real property.
test("real Google tag excludes form data and respects withdrawal", async ({
  page,
}) => {
  test.skip(
    !process.env.GA4_TAG_FIXTURE,
    "Requires an explicitly downloaded Google tag",
  );
  const tag = readFileSync(process.env.GA4_TAG_FIXTURE, "utf8");
  const outgoing = [];
  await page.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (url.origin === "http://127.0.0.1:4173") return route.continue();
    if (
      url.hostname === "www.googletagmanager.com" &&
      url.pathname === "/gtag/js"
    ) {
      return route.fulfill({
        contentType: "application/javascript",
        body: tag,
      });
    }
    outgoing.push({ url: url.href, body: route.request().postData() || "" });
    await route.fulfill({ status: 204, body: "" });
  });
  await page.addInitScript(() => {
    window.open = () => null;
  });
  await page.goto("/?private=URL_PRIVATE_MARKER#HASH_PRIVATE_MARKER");
  expect(outgoing).toEqual([]);
  await page.getByRole("button", { name: "Accetta Analytics" }).click();
  await expect
    .poll(() => outgoing.some((r) => r.url.includes("/g/collect")))
    .toBe(true);
  await page.getByLabel("Il tuo nome").fill("NAME_PRIVATE_MARKER");
  await page
    .getByLabel("La tua email")
    .fill("EMAIL_PRIVATE_MARKER@example.com");
  await page.locator("#message").fill("MESSAGE_PRIVATE_MARKER");
  await page
    .locator("#checkin")
    .fill(await page.locator("#checkin").getAttribute("min"));
  await page
    .locator("#checkout")
    .fill(await page.locator("#checkout").getAttribute("min"));
  await page.getByRole("button", { name: "Invia la richiesta" }).click();
  await page.getByRole("button", { name: "apri l’email precompilata" }).click();
  await page.evaluate(() =>
    window.gtag("event", "audit_probe", { send_to: "G-3S75NJZ588" }),
  );
  await expect
    .poll(() => JSON.stringify(outgoing), { timeout: 15000 })
    .toContain("audit_probe");
  expect(decodeURIComponent(JSON.stringify(outgoing))).not.toContain(
    "PRIVATE_MARKER",
  );
  await page.getByRole("button", { name: "Preferenze cookie" }).click();
  await page.getByRole("button", { name: "Rifiuta Analytics" }).click();
  // Drain requests already queued before withdrawal, then actively probe opt-out.
  await page.waitForTimeout(1500);
  const afterWithdrawal = outgoing.length;
  await page.evaluate(() =>
    window.gtag("event", "audit_after_withdrawal", { send_to: "G-3S75NJZ588" }),
  );
  await page.waitForTimeout(2000);
  expect(outgoing).toHaveLength(afterWithdrawal);
  expect(JSON.stringify(outgoing)).not.toContain("audit_after_withdrawal");
  expect(await page.context().cookies()).not.toEqual(
    expect.arrayContaining([expect.objectContaining({ name: "_ga" })]),
  );
  await expect(page.getByLabel("Il tuo nome")).toHaveValue(
    "NAME_PRIVATE_MARKER",
  );
});
