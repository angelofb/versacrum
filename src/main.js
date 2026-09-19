import "./styles.css";
import { site, photos, isConfigured, isHttpsUrl } from "./site.config.js";

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
const configured = isHttpsUrl(site.formEndpoint) && isConfigured(site.privacy);
const submitLabel = configured
  ? "Richiedi disponibilità"
  : "Prova la richiesta";
submit.disabled = false;
submit.firstChild.textContent = `${submitLabel} `;
if (configured)
  document.querySelector("#form-notice").textContent =
    "Invia una richiesta senza impegno. Ti risponderemo all’indirizzo email indicato.";
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
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  validateDates();
  if (!form.reportValidity()) return;
  if (!configured) {
    status.textContent =
      "Richiesta di prova completata. L’invio non è attivo: nessun dato è stato trasmesso e nessuna prenotazione è stata effettuata.";
    status.focus();
    return;
  }
  submit.disabled = true;
  submit.textContent = "Invio in corso…";
  status.textContent = "";
  try {
    const response = await fetch(site.formEndpoint, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) throw new Error("Request failed");
    status.textContent =
      "La richiesta è stata inviata. Ti risponderemo via email per confermare disponibilità e condizioni. La prenotazione non è ancora confermata.";
    form.reset();
    validateDates();
  } catch {
    status.textContent =
      "Non è stato possibile inviare la richiesta. I tuoi dati sono ancora nel modulo: riprova oppure usa i contatti diretti.";
  } finally {
    submit.disabled = false;
    submit.textContent = submitLabel;
    status.focus();
  }
});
document.querySelector("#year").textContent = new Date().getFullYear();
