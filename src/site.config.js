// Tutti i riferimenti da completare sono raccolti qui. Nessun dato fittizio viene inviato.
export const site = {
  domain: "[DOMINIO]",
  email: "[EMAIL]",
  phone: "[TELEFONO]",
  address: "[INDIRIZZO]",
  maps: "[LINK_MAPPA]",
  booking: "[LINK_BOOKING]",
  airbnb: "[LINK_AIRBNB]",
  instagram: "[LINK_INSTAGRAM]",
  cin: "[CIN]",
  cir: "[CIR]",
  checkin: "[ORARIO_CHECK_IN]",
  checkout: "[ORARIO_CHECK_OUT]",
  parking: "[INDICAZIONI_PARCHEGGIO_E_ZTL]",
  pets: "[POLITICA_ANIMALI]",
  privacy: "[INFORMATIVA_PRIVACY]",
  formEndpoint: "[ENDPOINT_FORM]",
};

export const seo = {
  // Attivare solo dopo aver completato e verificato tutti i riferimenti visibili.
  indexable: false,
  title: "Ver Sacrum | Dimora nel centro storico di Ascoli Piceno",
  description:
    "Dormi nel centro storico di Ascoli Piceno: scopri Ver Sacrum, con camera matrimoniale, cucina attrezzata, Wi-Fi, lavatrice e asciugatrice.",
};

export const isConfigured = (value) =>
  Boolean(value && !/\[[^\]]+\]/.test(value));
export const isHttpsUrl = (value) => {
  if (!isConfigured(value)) return false;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
};

export const photos = {
  soggiorno: {
    file: "IMG_8595.jpg",
    alt: "Soggiorno con divano senape, travi bianche e due finestre sul centro storico",
    title: "Il soggiorno",
    note: "La luce, le travi, il tempo per sé.",
  },
  camera: {
    file: "IMG_8597.jpg",
    alt: "Camera matrimoniale con armadio turchese, letto e travi a vista",
    title: "La camera",
    note: "Un piccolo rifugio, a fine giornata.",
  },
  cucina: {
    file: "IMG_8584.jpg",
    alt: "Cucina grigia con forno, piano cottura e bollitore sotto le travi in legno",
    title: "La cucina",
    note: "Il piacere dei propri ritmi.",
  },
  bagno: {
    file: "IMG_8569.jpg",
    alt: "Bagno con lavabo bianco, rivestimenti grigi e doccia in vetro",
    title: "Il bagno",
    note: "Linee semplici, dettagli essenziali.",
  },
  colazione: {
    file: "IMG_8580.jpg",
    alt: "Tazza e caffettiera su una tovaglietta a fiori, davanti alla cucina",
    title: "I piccoli rituali",
    note: "Il primo caffè, senza fretta.",
  },
  dettagli: {
    file: "IMG_8607.jpg",
    alt: "Pianta sospesa accanto alla finestra e vista sul soggiorno con divano giallo",
    title: "I dettagli",
    note: "Una casa fatta di cose da scoprire.",
  },
  ascoli: {
    file: "IMG_8571.jpg",
    alt: "Affaccio dalla finestra su un vicolo di Ascoli, tra facciate in pietra e persiane",
    title: "Fuori dalla finestra",
    note: "Ascoli comincia qui.",
  },
};
