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

export const isConfigured = (value: string) =>
  Boolean(value && !/\[[^\]]+\]/.test(value));
export const isHttpsUrl = (value: string) => {
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
  },
  camera: {
    file: "IMG_8597.jpg",
  },
  cucina: {
    file: "IMG_8584.jpg",
  },
  bagno: {
    file: "IMG_8569.jpg",
  },
  colazione: {
    file: "IMG_8580.jpg",
  },
  dettagli: {
    file: "IMG_8607.jpg",
  },
  ascoli: {
    file: "IMG_8571.jpg",
  },
};
