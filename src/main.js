import "./analytics.js";
import "./styles.css";
import { site, photos } from "./site.config.js";

const galleryLinks = [...document.querySelectorAll("[data-photo]")];
const dialog = document.querySelector("#lightbox");
const dialogImage = document.querySelector("#lightbox-image");
let activePhoto = 0;
let galleryOpener;
function showPhoto(index) {
  activePhoto = (index + galleryLinks.length) % galleryLinks.length;
  const link = galleryLinks[activePhoto];
  const photo = photos[link.dataset.photo];
  // Large versions load only when explicitly opened.
  dialogImage.src = link.href;
  dialogImage.alt = photo.alt;
  document.querySelector("#lightbox-title").textContent = photo.title;
  document.querySelector("#lightbox-caption").textContent =
    `${activePhoto + 1} / ${galleryLinks.length} — ${photo.note}`;
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
const submitLabel = "Invia la richiesta";
submit.disabled = !emailConfigured;
submit.firstChild.textContent = `${submitLabel} `;
document.querySelector("#form-notice").textContent = emailConfigured
  ? "Il pulsante apre un’email precompilata: controllala e inviala dal tuo programma di posta. Il sito non invia la richiesta automaticamente."
  : "L’invio non è ancora disponibile. Usa i contatti diretti.";
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
      ? "Scegli una data di arrivo da oggi in poi."
      : "",
  );
  checkout.setCustomValidity(
    checkout.value && checkout.value < checkout.min
      ? "La partenza deve essere successiva all’arrivo."
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
  const body = [
    "Buongiorno, vorrei chiedere disponibilità per Ver Sacrum.",
    "",
    `Nome: ${data.get("name")}`,
    `Email: ${data.get("email")}`,
    `Arrivo: ${data.get("checkin")}`,
    `Partenza: ${data.get("checkout")}`,
    `Ospiti: ${data.get("guests")}`,
    "",
    data.get("message") || "",
  ].join("\r\n");
  const href = `mailto:${site.email}?subject=${encodeURIComponent("Richiesta di disponibilità — Ver Sacrum")}&body=${encodeURIComponent(body)}`;
  status.textContent =
    "Email preparata, ancora da inviare dal tuo programma di posta. Se non si apre, ";
  const link = document.createElement("a");
  link.href = href;
  link.textContent = "apri l’email precompilata";
  status.append(link, " oppure usa i contatti diretti.");
  status.focus();
  link.click();
});
document.querySelector("#year").textContent = new Date().getFullYear();
