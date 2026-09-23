import "./analytics.ts";
import { site } from "./site.config.ts";
import { getRuntimeCopy } from "./i18n/runtime.ts";

const copy = getRuntimeCopy().home;
if (!copy) throw new Error("Missing home translations");
const { dynamic: messages, gallery } = copy;

function required<ElementType extends Element>(selector: string): ElementType {
  const element = document.querySelector<ElementType>(selector);
  if (!element) throw new Error(`Missing required element: ${selector}`);
  return element;
}

const galleryLinks = [
  ...document.querySelectorAll<HTMLAnchorElement>("[data-photo]"),
];
const dialog = required<HTMLDialogElement>("#lightbox");
const dialogImage = required<HTMLImageElement>("#lightbox-image");
let activePhoto = 0;
let galleryOpener: HTMLAnchorElement | undefined;
function showPhoto(index: number) {
  activePhoto = (index + galleryLinks.length) % galleryLinks.length;
  const link = galleryLinks[activePhoto];
  const name = link.dataset.photo;
  if (!name || !Object.hasOwn(gallery, name))
    throw new Error("Unknown gallery image");
  const photo = gallery[name as keyof typeof gallery];
  if (!Array.isArray(photo)) throw new Error("Invalid gallery image");
  const image = link.querySelector<HTMLImageElement>("img");
  if (!image) throw new Error("Gallery link has no image");
  // Large versions load only when explicitly opened.
  dialogImage.src = link.href;
  dialogImage.alt = image.alt;
  required<HTMLElement>("#lightbox-title").textContent = photo[0];
  required<HTMLElement>("#lightbox-caption").textContent =
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
    required<HTMLButtonElement>("#lightbox-close").focus();
  }),
);
required<HTMLButtonElement>("#lightbox-close").addEventListener("click", () =>
  dialog.close(),
);
required<HTMLButtonElement>("#lightbox-prev").addEventListener("click", () =>
  showPhoto(activePhoto - 1),
);
required<HTMLButtonElement>("#lightbox-next").addEventListener("click", () =>
  showPhoto(activePhoto + 1),
);
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
let touchStart: Touch | undefined;
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
    touchStart = undefined;
  },
  { passive: true },
);

const form = required<HTMLFormElement>("#booking-form");
const checkin = required<HTMLInputElement>("#checkin");
const checkout = required<HTMLInputElement>("#checkout");
const submit = required<HTMLButtonElement>("#booking-form [type=submit]");
const status = required<HTMLElement>("#form-status");
const emailConfigured = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(site.email);
const submitText = submit.firstChild;
if (!(submitText instanceof Text))
  throw new Error("Submit button label missing");
const submitLabel = submitText.textContent.trim();
submit.disabled = !emailConfigured;
submitText.textContent = `${submitLabel} `;
required<HTMLElement>("#form-notice").textContent = emailConfigured
  ? messages.configuredNotice
  : messages.unavailable;
function localDate(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function nextDay(value: string) {
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
    checkin.value && checkin.value < today ? messages.arrivalError : "",
  );
  checkout.setCustomValidity(
    checkout.value && checkout.value < checkout.min
      ? messages.departureError
      : "",
  );
}
validateDates();
checkin.addEventListener("input", validateDates);
checkout.addEventListener("input", validateDates);
checkin.addEventListener("change", validateDates);
checkout.addEventListener("change", validateDates);
form.addEventListener("focusin", validateDates);
// Native constraint validation can prevent submit before our submit handler
// runs. Refresh custom date errors on the submit button's activation too.
submit.addEventListener("click", validateDates);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  validateDates();
  if (!form.reportValidity()) return;
  if (!emailConfigured) return;
  const data = new FormData(form);
  const labels = messages.emailLabels;
  const body = [
    messages.emailGreeting,
    "",
    `${labels[0]}: ${data.get("name")}`,
    `${labels[1]}: ${data.get("email")}`,
    `${labels[2]}: ${data.get("checkin")}`,
    `${labels[3]}: ${data.get("checkout")}`,
    `${labels[4]}: ${data.get("guests")}`,
    "",
    data.get("message") || "",
  ].join("\r\n");
  const href = `mailto:${site.email}?subject=${encodeURIComponent(messages.emailSubject)}&body=${encodeURIComponent(body)}`;
  status.textContent = messages.prepared;
  // Keep personal fields out of link URLs that automatic click measurement
  // could read. Only hand the prepared URI to the user's mail application.
  const openEmail = () => window.open(href, "_self");
  const button = document.createElement("button");
  button.type = "button";
  button.className = "text-link";
  button.textContent = messages.openEmail;
  button.addEventListener("click", openEmail);
  status.append(button, messages.direct);
  status.focus();
  openEmail();
});
required<HTMLElement>("#year").textContent = String(new Date().getFullYear());
