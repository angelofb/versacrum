import type { Locale, PhotoName } from "../types.ts";

type ConsentCopy = {
  title: string;
  description: string;
  privacyLink: string;
  reject: string;
  accept: string;
};

export const consentCopy: Record<Locale, ConsentCopy> = {
  it: {
    title: "Statistiche del sito",
    description:
      "Con il tuo consenso usiamo Google Analytics e i suoi cookie per capire come viene visitato il sito. Puoi rifiutare e continuare a navigare, oppure cambiare scelta da “Preferenze cookie” in fondo alla pagina.",
    privacyLink: "Leggi l’informativa privacy e cookie",
    reject: "Rifiuta Analytics",
    accept: "Accetta Analytics",
  },
  en: {
    title: "Website statistics",
    description:
      "With your consent, we use Google Analytics and its cookies to understand how the website is visited. You may decline and continue browsing, or change your choice through “Cookie preferences” at the bottom of the page.",
    privacyLink: "Read the privacy and cookie notice",
    reject: "Decline Analytics",
    accept: "Accept Analytics",
  },
  fr: {
    title: "Statistiques du site",
    description:
      "Avec votre consentement, nous utilisons Google Analytics et ses cookies pour comprendre comment le site est visité. Vous pouvez refuser et poursuivre votre navigation, ou modifier votre choix via « Préférences de cookies » en bas de page.",
    privacyLink: "Lire la politique de confidentialité et de cookies",
    reject: "Refuser Analytics",
    accept: "Accepter Analytics",
  },
  es: {
    title: "Estadísticas del sitio",
    description:
      "Con tu consentimiento usamos Google Analytics y sus cookies para comprender cómo se visita el sitio. Puedes rechazarlo y seguir navegando, o cambiar tu elección en «Preferencias de cookies» al final de la página.",
    privacyLink: "Leer la política de privacidad y cookies",
    reject: "Rechazar Analytics",
    accept: "Aceptar Analytics",
  },
  de: {
    title: "Website-Statistik",
    description:
      "Mit Ihrer Einwilligung verwenden wir Google Analytics und dessen Cookies, um zu verstehen, wie die Website besucht wird. Sie können ablehnen und weiter surfen oder Ihre Auswahl unten über „Cookie-Einstellungen“ ändern.",
    privacyLink: "Datenschutz- und Cookie-Hinweise lesen",
    reject: "Analytics ablehnen",
    accept: "Analytics akzeptieren",
  },
};

export const faqLinkCopy: Record<Locale, readonly [string, string, string]> = {
  it: [
    "richiesta di disponibilità",
    "foto degli ambienti",
    "Ascoli e posizione",
  ],
  en: ["availability request", "photos of the spaces", "Ascoli and location"],
  fr: ["demande de disponibilité", "photos des espaces", "Ascoli et situation"],
  es: [
    "solicitud de disponibilidad",
    "fotos de los espacios",
    "Ascoli y ubicación",
  ],
  de: ["Verfügbarkeitsanfrage", "Fotos der Räume", "Ascoli und Lage"],
};

export const photoAltCopy: Record<Locale, Record<PhotoName, string>> = {
  it: {
    soggiorno:
      "Soggiorno con divano senape, travi bianche e due finestre sul centro storico",
    camera: "Camera matrimoniale con armadio turchese, letto e travi a vista",
    cucina:
      "Cucina grigia con forno, piano cottura e bollitore sotto le travi in legno",
    bagno: "Bagno con lavabo bianco, rivestimenti grigi e doccia in vetro",
    colazione:
      "Tazza e caffettiera su una tovaglietta a fiori, davanti alla cucina",
    dettagli:
      "Pianta sospesa accanto alla finestra e vista sul soggiorno con divano giallo",
    ascoli:
      "Affaccio dalla finestra su un vicolo di Ascoli, tra facciate in pietra e persiane",
  },
  en: {
    soggiorno:
      "Living room with a mustard sofa, white beams and two windows overlooking the historic centre",
    camera: "Double bedroom with a turquoise wardrobe, bed and exposed beams",
    cucina: "Grey kitchen with oven, hob and kettle beneath wooden beams",
    bagno: "Bathroom with white basin, grey finishes and glass shower",
    colazione:
      "Cup and coffee pot on a floral placemat in front of the kitchen",
    dettagli:
      "Hanging plant by the window and view of the living room with yellow sofa",
    ascoli:
      "View from the window over an Ascoli lane, stone façades and shutters",
  },
  fr: {
    soggiorno:
      "Salon avec canapé moutarde, poutres blanches et deux fenêtres sur le centre historique",
    camera: "Chambre double avec armoire turquoise, lit et poutres apparentes",
    cucina:
      "Cuisine grise avec four, plaques et bouilloire sous les poutres en bois",
    bagno:
      "Salle de bains avec vasque blanche, revêtements gris et douche vitrée",
    colazione: "Tasse et cafetière sur un set fleuri devant la cuisine",
    dettagli:
      "Plante suspendue près de la fenêtre et vue sur le salon au canapé jaune",
    ascoli:
      "Vue depuis la fenêtre sur une ruelle d’Ascoli, façades en pierre et volets",
  },
  es: {
    soggiorno:
      "Salón con sofá mostaza, vigas blancas y dos ventanas al centro histórico",
    camera: "Dormitorio doble con armario turquesa, cama y vigas vistas",
    cucina: "Cocina gris con horno, placa y hervidor bajo las vigas de madera",
    bagno: "Baño con lavabo blanco, revestimientos grises y ducha de cristal",
    colazione:
      "Taza y cafetera sobre un mantel individual de flores frente a la cocina",
    dettagli:
      "Planta colgante junto a la ventana y vista del salón con sofá amarillo",
    ascoli:
      "Vista desde la ventana a una callejuela de Ascoli, fachadas de piedra y contraventanas",
  },
  de: {
    soggiorno:
      "Wohnzimmer mit senffarbenem Sofa, weißen Balken und zwei Fenstern zur Altstadt",
    camera:
      "Doppelzimmer mit türkisfarbenem Schrank, Bett und sichtbaren Balken",
    cucina:
      "Graue Küche mit Backofen, Kochfeld und Wasserkocher unter Holzbalken",
    bagno:
      "Badezimmer mit weißem Waschbecken, grauen Oberflächen und Glasdusche",
    colazione:
      "Tasse und Kaffeekanne auf einer geblümten Unterlage vor der Küche",
    dettagli:
      "Hängepflanze am Fenster und Blick ins Wohnzimmer mit gelbem Sofa",
    ascoli:
      "Blick aus dem Fenster in eine Gasse von Ascoli mit Steinfassaden und Fensterläden",
  },
};
