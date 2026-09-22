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
  accessSteps: 20,
  parking: {
    unloadingMetres: 80,
    privateMetres: 600,
    freeMetres: 800,
    dailyEuros: 2,
  },
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
