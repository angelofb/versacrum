// Dati della struttura. I riferimenti ancora da completare restano tra parentesi quadre.
export const site = {
  domain: "https://versacrumbnb.it",
  email: "versacrumbnb@gmail.com",
  phone: "+39 338 4344560",
  address: "Via Ottaviano Iannella 32",
  maps: "https://www.google.com/maps/search/?api=1&query=Via+Ottaviano+Iannella+32%2C+Ascoli+Piceno",
  booking:
    "https://www.booking.com/hotel/it/ver-sacrum-appartamento-in-centro.it.html",
  airbnb: "https://www.airbnb.it/rooms/1742987946032945161",
  cin: "IT044007C2BWYNPLYY",
  cir: "044007-LOC-00092",
  checkin: "15:00–18:00",
  checkout: "08:00–10:00",
  parking:
    "Per scaricare le valigie potete utilizzare i posti di carico e scarico in Piazza Roma, a circa 80 metri dall’appartamento. Per soste più lunghe sono disponibili i parcheggi a raso a pagamento in zona Tribunale (Piazza Serafino Orlini, tariffa oraria) e in Via delle Rimembranze (ticket periodico di 2 € al giorno). In alternativa, il parcheggio privato di Porta Torricella, con accesso a sbarre, dista circa 600 metri. I parcheggi gratuiti si trovano a circa 800 metri, in zona Porta Romana, lungo Viale Treviri e Via Oberdan.",
  pets: "Sono ammessi animali di piccola taglia.",
};

export const analytics = {
  measurementId: "G-3S75NJZ588",
};

export const seo = {
  // Indicizzazione autorizzata dal gestore dopo la pubblicazione HTTPS.
  indexable: true,
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
