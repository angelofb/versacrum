import { analytics } from "./site.config.js";

const id = analytics.measurementId;
const storageKey = "ver-sacrum.analytics-consent.v2";
function consentExpiry() {
  const expires = new Date();
  expires.setMonth(expires.getMonth() + 6);
  return expires.getTime();
}
const panel = document.querySelector("#analytics-consent");
const settings = document.querySelector("#analytics-settings");
const choiceText = document.querySelector("#analytics-choice");
let started = false;
let choice = readChoice();

function readChoice() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (
      saved &&
      ["accepted", "rejected"].includes(saved.choice) &&
      Number.isFinite(saved.expires) &&
      (saved.choice === "rejected" || saved.expires > Date.now())
    )
      return saved.choice;
  } catch {
    // Unavailable storage leaves the default as no consent.
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
  if (started) return;
  started = true;
  window[`ga-disable-${id}`] = false;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("consent", "update", { analytics_storage: "granted" });
  window.gtag("js", new Date());
  window.gtag("config", id, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    cookie_domain: location.hostname,
    cookie_path: "/",
    cookie_expires: 180 * 24 * 60 * 60,
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
      ? "Scelta attuale: Analytics accettato."
      : choice === "rejected"
        ? "Scelta attuale: Analytics rifiutato."
        : "Analytics è disattivato finché non accetti.";
}

function saveChoice(next) {
  choice = next;
  try {
    localStorage.setItem(
      storageKey,
      JSON.stringify({ choice, expires: consentExpiry() }),
    );
  } catch {
    // The choice still applies to this page when persistence is unavailable.
  }
  panel.hidden = true;
  settings.focus({ preventScroll: true });
  if (choice === "accepted") {
    startAnalytics();
  } else {
    window[`ga-disable-${id}`] = true;
    clearAnalyticsCookies();
    // Unload Google's script and its listeners when consent is withdrawn.
    if (started) location.reload();
  }
}

if (/^G-[A-Z0-9]+$/.test(id)) {
  settings.hidden = false;
  document
    .querySelector("#analytics-accept")
    .addEventListener("click", () => saveChoice("accepted"));
  document
    .querySelector("#analytics-reject")
    .addEventListener("click", () => saveChoice("rejected"));
  settings.addEventListener("click", () => {
    showPanel();
    document.querySelector("#analytics-title").focus();
  });
  window.addEventListener("storage", (event) => {
    if (event.key === storageKey || event.key === null) {
      // Synchronize withdrawals from another tab before reloading.
      if (readChoice() !== choice) {
        window[`ga-disable-${id}`] = true;
        location.reload();
      }
    }
  });
  if (choice === "accepted") startAnalytics();
  else {
    window[`ga-disable-${id}`] = true;
    clearAnalyticsCookies();
    if (!choice) showPanel();
  }
}
