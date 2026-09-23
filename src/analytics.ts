import { analytics } from "./site.config.ts";
import { privacy } from "./privacy.config.ts";
import { getRuntimeCopy } from "./i18n/runtime.ts";

const id = analytics.measurementId;
const messages = getRuntimeCopy().consent;
const storageKey = "ver-sacrum.analytics-consent.v2";
type ChoiceValue = "accepted" | "rejected";
type ConsentChoice = { choice: ChoiceValue; expires: number };

function required<ElementType extends Element>(selector: string): ElementType {
  const element = document.querySelector<ElementType>(selector);
  if (!element) throw new Error(`Missing required element: ${selector}`);
  return element;
}

function isConsentChoice(value: unknown): value is ConsentChoice {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<ConsentChoice>;
  return (
    (candidate.choice === "accepted" || candidate.choice === "rejected") &&
    typeof candidate.expires === "number" &&
    Number.isFinite(candidate.expires)
  );
}

function consentExpiry() {
  const expires = new Date();
  expires.setMonth(expires.getMonth() + 6);
  return expires.getTime();
}
const panel = required<HTMLElement>("#analytics-consent");
const settings = required<HTMLButtonElement>("#analytics-settings");
const choiceText = required<HTMLElement>("#analytics-choice");
let started = false;
let memoryChoice: ConsentChoice | null = null;
let sessionOnly = false;
let savedChoice = readChoice();
let choice = savedChoice?.choice ?? null;
let expiryTimer: ReturnType<typeof setTimeout> | undefined;
let settingsOpen = false;

function readChoice(): ConsentChoice | null {
  if (sessionOnly)
    return memoryChoice &&
      (memoryChoice.choice === "rejected" || memoryChoice.expires > Date.now())
      ? memoryChoice
      : null;
  try {
    const raw = localStorage.getItem(storageKey);
    const saved: unknown = raw ? JSON.parse(raw) : null;
    if (
      isConsentChoice(saved) &&
      (saved.choice === "rejected" || saved.expires > Date.now())
    )
      return saved;
  } catch {
    // Preserve a choice only in this page when storage is unavailable.
    if (
      memoryChoice &&
      (memoryChoice.choice === "rejected" || memoryChoice.expires > Date.now())
    )
      return memoryChoice;
  }
  return null;
}

function clearAnalyticsCookies() {
  const domains = location.hostname.split(".");
  const scopes = [""];
  for (let i = 0; i < domains.length - 1; i++) {
    const domain = domains.slice(i).join(".");
    scopes.push(`; Domain=${domain}`, `; Domain=.${domain}`);
  }
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0].trim();
    if (name === "_ga" || name.startsWith("_ga_")) {
      for (const scope of scopes)
        document.cookie = `${name}=; Max-Age=0; Path=/${scope}; SameSite=Lax`;
    }
  }
}

function startAnalytics() {
  // This static site has no query-driven pages. Remove unused URL data before
  // Google's automatic events can read it (e.g. form_destination/site search).
  let safeHash = "";
  try {
    if (document.getElementById(decodeURIComponent(location.hash.slice(1))))
      safeHash = location.hash;
  } catch {
    /* malformed fragments are discarded */
  }
  if (location.search || location.hash !== safeHash)
    history.replaceState(history.state, "", location.pathname + safeHash);
  window[`ga-disable-${id}`] = false;
  if (started) return;
  started = true;
  const dataLayer = (window.dataLayer ??= []);
  const gtag = function (..._args: unknown[]) {
    dataLayer.push(arguments);
  };
  window.gtag = gtag;
  gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  gtag("consent", "update", { analytics_storage: "granted" });
  gtag("js", new Date());
  gtag("config", id, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    cookie_domain: location.hostname,
    cookie_path: "/",
    cookie_expires: privacy.cookieDays * 24 * 60 * 60,
    cookie_update: false,
    // Do not send query parameters or fragments that may contain visitor data.
    page_location: location.origin + location.pathname,
    page_referrer: "",
  });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.append(script);
}

function showPanel() {
  panel.hidden = false;
  choiceText.textContent =
    choice === "accepted"
      ? messages.consentAccepted
      : choice === "rejected"
        ? messages.consentRejected
        : messages.consentOff;
}

function syncChoice() {
  savedChoice = readChoice();
  choice = savedChoice?.choice ?? null;
  clearTimeout(expiryTimer);
  if (savedChoice?.choice === "accepted") {
    startAnalytics();
    // Browsers clamp larger delays to a signed 32-bit integer.
    expiryTimer = setTimeout(
      syncChoice,
      Math.min(savedChoice.expires - Date.now(), 2_147_483_647),
    );
  } else {
    // Google's documented opt-out flag stops collection without reloading the
    // document or persisting the visitor's unfinished request in storage.
    window[`ga-disable-${id}`] = true;
    clearAnalyticsCookies();
  }
  if (!choice || settingsOpen) showPanel();
  else panel.hidden = true;
  // The panel already contains the choices: do not offer a control that
  // appears to do nothing while it is open.
  settings.hidden = !choice || settingsOpen;
}

function saveChoice(next: ChoiceValue) {
  memoryChoice = { choice: next, expires: consentExpiry() };
  try {
    localStorage.setItem(storageKey, JSON.stringify(memoryChoice));
    sessionOnly = false;
  } catch {
    sessionOnly = true;
    // The choice still applies to this page when persistence is unavailable.
  }
  const returnToSettings = settingsOpen;
  settingsOpen = false;
  syncChoice();
  const target: HTMLElement = returnToSettings
    ? settings
    : required<HTMLElement>("main h1");
  if (target) {
    if (!returnToSettings) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: returnToSettings });
  }
}

if (/^G-[A-Z0-9]+$/.test(id)) {
  required<HTMLButtonElement>("#analytics-accept").addEventListener(
    "click",
    () => saveChoice("accepted"),
  );
  required<HTMLButtonElement>("#analytics-reject").addEventListener(
    "click",
    () => saveChoice("rejected"),
  );
  settings.addEventListener("click", () => {
    settingsOpen = true;
    syncChoice();
    required<HTMLElement>("#analytics-title").focus();
  });
  window.addEventListener("storage", (event) => {
    if (
      event.storageArea === localStorage &&
      (event.key === storageKey || event.key === null)
    )
      syncChoice();
  });
  window.addEventListener("pageshow", syncChoice);
  window.addEventListener("focus", syncChoice);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) syncChoice();
  });
  syncChoice();
}
