import "./analytics.js";
import { site } from "./site.config.js";
import { getRuntimeT } from "./i18n/runtime.js";

const locale = document.documentElement.lang || "it";
const t = getRuntimeT(locale);

const galleryLinks = [...document.querySelectorAll("[data-photo]")];
const dialog = document.querySelector("#lightbox");
const dialogImage = document.querySelector("#lightbox-image");
let activePhoto = 0;
let galleryOpener;
function showPhoto(index) {
  activePhoto = (index + galleryLinks.length) % galleryLinks.length;
  const link = galleryLinks[activePhoto];
  const photo = t(`gallery.${link.dataset.photo}`, {
    returnObjects: true,
  });
  // Large versions load only when explicitly opened.
  dialogImage.src = link.href;
  dialogImage.alt = link.querySelector("img").alt;
  document.querySelector("#lightbox-title").textContent = photo[0];
  document.querySelector("#lightbox-caption").textContent =
    `${activePhoto + 1} / ${galleryLinks.length} — ${photo[1]}`;
}
galleryLinks.forEach((link, index) =>
  link.addEventListener("click", (event) => {
    if (
      typeof dialog.showModal !== "function" ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    event.preventDefault();
    galleryOpener = link;
    showPhoto(index);
    dialog.showModal();
    document.querySelector("#lightbox-close").focus();
  }),
);
document
  .querySelector("#lightbox-close")
  .addEventListener("click", () => dialog.close());
document
  .querySelector("#lightbox-prev")
  .addEventListener("click", () => showPhoto(activePhoto - 1));
document
  .querySelector("#lightbox-next")
  .addEventListener("click", () => showPhoto(activePhoto + 1));
dialog.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
    event.preventDefault();
    showPhoto(activePhoto + (event.key === "ArrowRight" ? 1 : -1));
  }
});
dialog.addEventListener("click", (event) => {
  const rect = dialog.getBoundingClientRect();
  if (
    event.target === dialog &&
    (event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom)
  )
    dialog.close();
});
dialog.addEventListener("close", () => galleryOpener?.focus());
let touchStart;
dialogImage.addEventListener(
  "touchstart",
  (event) => {
    touchStart = event.changedTouches[0];
  },
  { passive: true },
);
dialogImage.addEventListener(
  "touchend",
  (event) => {
    if (!touchStart) return;
    const end = event.changedTouches[0];
    const dx = end.clientX - touchStart.clientX;
    if (
      Math.abs(dx) > 60 &&
      Math.abs(dx) > Math.abs(end.clientY - touchStart.clientY)
    )
      showPhoto(activePhoto + (dx < 0 ? 1 : -1));
    touchStart = null;
  },
  { passive: true },
);

const form = document.querySelector("#booking-form");
const checkin = document.querySelector("#checkin");
const checkout = document.querySelector("#checkout");
const submit = form.querySelector("[type=submit]");
const status = document.querySelector("#form-status");
const emailConfigured = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(site.email);
const submitLabel = submit.firstChild.textContent.trim();
submit.disabled = !emailConfigured;
submit.firstChild.textContent = `${submitLabel} `;
document.querySelector("#form-notice").textContent = emailConfigured
  ? t("dynamic.configuredNotice")
  : t("dynamic.unavailable");
function localDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function nextDay(value) {
  const date = new Date(`${value}T12:00:00`);
  date.setDate(date.getDate() + 1);
  return localDate(date);
}
function validateDates() {
  const today = localDate(new Date());
  checkin.min = today;
  checkout.min = nextDay(
    checkin.value && checkin.value >= today ? checkin.value : today,
  );
  checkin.setCustomValidity(
    checkin.value && checkin.value < today
      ? t("dynamic.arrivalError")
      : "",
  );
  checkout.setCustomValidity(
    checkout.value && checkout.value < checkout.min
      ? t("dynamic.departureError")
      : "",
  );
}
validateDates();
checkin.addEventListener("input", validateDates);
checkout.addEventListener("input", validateDates);
form.addEventListener("focusin", validateDates);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  validateDates();
  if (!form.reportValidity()) return;
  if (!emailConfigured) return;
  const data = new FormData(form);
  const labels = t("dynamic.emailLabels", { returnObjects: true });
  const body = [
    t("dynamic.emailGreeting"),
    "",
    `${labels[0]}: ${data.get("name")}`,
    `${labels[1]}: ${data.get("email")}`,
    `${labels[2]}: ${data.get("checkin")}`,
    `${labels[3]}: ${data.get("checkout")}`,
    `${labels[4]}: ${data.get("guests")}`,
    "",
    data.get("message") || "",
  ].join("\r\n");
  const href = `mailto:${site.email}?subject=${encodeURIComponent(t("dynamic.emailSubject"))}&body=${encodeURIComponent(body)}`;
  status.textContent = t("dynamic.prepared");
  // Keep personal fields out of link URLs that automatic click measurement
  // could read. Only hand the prepared URI to the user's mail application.
  const openEmail = () => window.open(href, "_self");
  const button = document.createElement("button");
  button.type = "button";
  button.className = "text-link";
  button.textContent = t("dynamic.openEmail");
  button.addEventListener("click", openEmail);
  status.append(button, t("dynamic.direct"));
  status.focus();
  openEmail();
});
document.querySelector("#year").textContent = new Date().getFullYear();
