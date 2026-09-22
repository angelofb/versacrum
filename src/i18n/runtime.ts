import i18next from "i18next";
import type { Locale } from "../types.ts";
import type { Translator } from "./index.ts";

export const runtime = {
  it: {
    gallery: {
      camera: ["La camera", "Un piccolo rifugio, a fine giornata."],
      soggiorno: ["Il soggiorno", "La luce, le travi, il tempo per sé."],
      cucina: ["La cucina", "Il piacere dei propri ritmi."],
      bagno: ["Il bagno", "Linee semplici, dettagli essenziali."],
      colazione: ["I piccoli rituali", "Il primo caffè, senza fretta."],
      dettagli: ["I dettagli", "Le cose che fanno una casa."],
    },
    dynamic: {
      configuredNotice:
        "Il pulsante apre un’email precompilata: controllala e inviala dal tuo programma di posta. Il sito non invia la richiesta automaticamente.",
      unavailable: "L’invio non è ancora disponibile. Usa i contatti diretti.",
      arrivalError: "Scegli una data di arrivo da oggi in poi.",
      departureError: "La partenza deve essere successiva all’arrivo.",
      emailGreeting:
        "Buongiorno, vorrei chiedere disponibilità per Ver Sacrum.",
      emailLabels: ["Nome", "Email", "Arrivo", "Partenza", "Ospiti"],
      emailSubject: "Richiesta di disponibilità — Ver Sacrum",
      prepared:
        "Email preparata, ancora da inviare dal tuo programma di posta. Se non si apre, ",
      openEmail: "apri l’email precompilata",
      direct: " oppure usa i contatti diretti.",
      consentAccepted: "Scelta attuale: Analytics accettato.",
      consentRejected: "Scelta attuale: Analytics rifiutato.",
      consentOff: "Analytics è disattivato finché non accetti.",
    },
  },
  en: {
    gallery: {
      camera: ["The bedroom", "A quiet retreat at the end of the day."],
      soggiorno: ["The living room", "Light, beams and time to yourself."],
      cucina: ["The kitchen", "The pleasure of your own rhythm."],
      bagno: ["The bathroom", "Simple lines, thoughtful details."],
      colazione: ["Little rituals", "That first coffee, with nowhere to rush."],
      dettagli: ["The details", "The things that make a house a home."],
    },
    dynamic: {
      configuredNotice:
        "The button prepares an email: review it and send it from your email application. The website does not send your request automatically.",
      unavailable:
        "Sending is not available yet. Please use the direct contact details.",
      arrivalError: "Choose an arrival date from today onwards.",
      departureError: "Departure must be after arrival.",
      emailGreeting:
        "Hello, I would like to ask about availability at Ver Sacrum.",
      emailLabels: ["Name", "Email", "Arrival", "Departure", "Guests"],
      emailSubject: "[EN] Availability request — Ver Sacrum",
      prepared:
        "Your email is ready but has not been sent. If your email application does not open, ",
      openEmail: "open the prepared email",
      direct: " or use the direct contact details.",
      consentAccepted: "Current choice: Analytics accepted.",
      consentRejected: "Current choice: Analytics declined.",
      consentOff: "Analytics remains off until you accept.",
    },
  },
  fr: {
    gallery: {
      camera: ["La chambre", "Un petit refuge en fin de journée."],
      soggiorno: ["Le salon", "La lumière, les poutres, du temps pour soi."],
      cucina: ["La cuisine", "Le plaisir de suivre son rythme."],
      bagno: [
        "La salle de bains",
        "Des lignes simples, des détails essentiels.",
      ],
      colazione: ["Les petits rituels", "Le premier café, sans se presser."],
      dettagli: ["Les détails", "Ces petites choses qui font une maison."],
    },
    dynamic: {
      configuredNotice:
        "Le bouton prépare un e-mail : vérifiez-le et envoyez-le depuis votre messagerie. Le site n’envoie pas automatiquement la demande.",
      unavailable:
        "L’envoi n’est pas encore disponible. Utilisez les coordonnées directes.",
      arrivalError: "Choisissez une date d’arrivée à partir d’aujourd’hui.",
      departureError: "Le départ doit être postérieur à l’arrivée.",
      emailGreeting:
        "Bonjour, je souhaite connaître les disponibilités de Ver Sacrum.",
      emailLabels: ["Nom", "E-mail", "Arrivée", "Départ", "Voyageurs"],
      emailSubject: "[FR] Demande de disponibilité — Ver Sacrum",
      prepared:
        "L’e-mail est prêt mais n’a pas encore été envoyé. Si votre messagerie ne s’ouvre pas, ",
      openEmail: "ouvrez l’e-mail préparé",
      direct: " ou utilisez les coordonnées directes.",
      consentAccepted: "Choix actuel : Analytics accepté.",
      consentRejected: "Choix actuel : Analytics refusé.",
      consentOff: "Analytics reste désactivé tant que vous ne l’acceptez pas.",
    },
  },
  es: {
    gallery: {
      camera: ["El dormitorio", "Un pequeño refugio al final del día."],
      soggiorno: ["El salón", "La luz, las vigas, tiempo para ti."],
      cucina: ["La cocina", "El placer de seguir tu propio ritmo."],
      bagno: ["El baño", "Líneas sencillas, detalles esenciales."],
      colazione: ["Los pequeños rituales", "El primer café, sin prisas."],
      dettagli: ["Los detalles", "Las cosas que convierten una casa en hogar."],
    },
    dynamic: {
      configuredNotice:
        "El botón prepara un correo: revísalo y envíalo desde tu aplicación de correo. El sitio no envía la solicitud automáticamente.",
      unavailable:
        "El envío todavía no está disponible. Utiliza los datos de contacto directo.",
      arrivalError: "Elige una fecha de llegada a partir de hoy.",
      departureError: "La salida debe ser posterior a la llegada.",
      emailGreeting:
        "Hola, quisiera consultar la disponibilidad de Ver Sacrum.",
      emailLabels: ["Nombre", "Correo", "Llegada", "Salida", "Huéspedes"],
      emailSubject: "[ES] Solicitud de disponibilidad — Ver Sacrum",
      prepared:
        "El correo está preparado, pero todavía no se ha enviado. Si no se abre tu aplicación, ",
      openEmail: "abre el correo preparado",
      direct: " o utiliza los datos de contacto directo.",
      consentAccepted: "Elección actual: Analytics aceptado.",
      consentRejected: "Elección actual: Analytics rechazado.",
      consentOff: "Analytics permanece desactivado hasta que lo aceptes.",
    },
  },
  de: {
    gallery: {
      camera: [
        "Das Schlafzimmer",
        "Ein kleiner Rückzugsort am Ende des Tages.",
      ],
      soggiorno: ["Das Wohnzimmer", "Licht, Balken und Zeit für sich."],
      cucina: ["Die Küche", "Den eigenen Rhythmus genießen."],
      bagno: ["Das Badezimmer", "Klare Linien, ausgewählte Details."],
      colazione: ["Die kleinen Rituale", "Der erste Kaffee, ganz ohne Eile."],
      dettagli: ["Die Details", "Die Dinge, die ein Haus zum Zuhause machen."],
    },
    dynamic: {
      configuredNotice:
        "Die Schaltfläche erstellt eine E-Mail: Prüfen und senden Sie sie in Ihrem E-Mail-Programm. Die Website sendet die Anfrage nicht automatisch.",
      unavailable:
        "Der Versand ist noch nicht verfügbar. Nutzen Sie bitte die direkten Kontaktdaten.",
      arrivalError: "Wählen Sie ein Anreisedatum ab heute.",
      departureError: "Die Abreise muss nach der Anreise liegen.",
      emailGreeting:
        "Guten Tag, ich möchte die Verfügbarkeit von Ver Sacrum anfragen.",
      emailLabels: ["Name", "E-Mail", "Anreise", "Abreise", "Gäste"],
      emailSubject: "[DE] Verfügbarkeitsanfrage — Ver Sacrum",
      prepared:
        "Die E-Mail ist vorbereitet, aber noch nicht gesendet. Falls sich Ihr E-Mail-Programm nicht öffnet, ",
      openEmail: "öffnen Sie die vorbereitete E-Mail",
      direct: " oder nutzen Sie die direkten Kontaktdaten.",
      consentAccepted: "Aktuelle Auswahl: Analytics akzeptiert.",
      consentRejected: "Aktuelle Auswahl: Analytics abgelehnt.",
      consentOff: "Analytics bleibt deaktiviert, bis Sie zustimmen.",
    },
  },
};

const instance = i18next.createInstance();
instance.init({
  initAsync: false,
  fallbackLng: "it",
  resources: Object.fromEntries(
    Object.entries(runtime).map(([locale, value]) => [
      locale,
      { translation: value },
    ]),
  ),
  interpolation: { escapeValue: false },
  returnObjects: true,
});

export const getRuntimeT = (locale: string): Translator =>
  instance.getFixedT(
    (locale === "it" ||
    locale === "en" ||
    locale === "fr" ||
    locale === "es" ||
    locale === "de"
      ? locale
      : "it") satisfies Locale,
  ) as unknown as Translator;
