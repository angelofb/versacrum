export type Inline =
  | string
  | { kind: "link"; href: string; text: string }
  | { kind: "strong" | "code"; text: string }
  | { kind: "break" };
export type RichText = Inline[];
export type PrivacyBlock =
  | { kind: "paragraph"; content: RichText }
  | { kind: "storage"; items: { term: RichText; description: RichText }[] };
export type PrivacySectionId =
  | "titolare"
  | "richieste"
  | "navigazione"
  | "cookie"
  | "destinatari"
  | "diritti";
export type FaqId =
  | "capacity"
  | "kitchen"
  | "location"
  | "arrival"
  | "accessibility"
  | "parking"
  | "pets";
export interface PrivacyCopy {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  updated: string;
  authority: string;
  intro: string;
  back: string;
  sections: Record<
    PrivacySectionId,
    {
      title: string;
      blocks: PrivacyBlock[];
    }
  >;
}
export type Catalog = {
  common: {
    skip: string;
    tagline: string;
    navLabel: string;
    menu: string;
    menuOpen: string;
    menuClose: string;
    language: string;
    languageMenu: string;
    nav: [string, string, string, string];
    request: string;
    map: string;
    booking: string;
    airbnb: string;
    privacy: string;
    settings: string;
    backTop: string;
    close: string;
  };
  seo: {
    title: string;
    description: string;
  };
  home: {
    hero: {
      eyebrow: string;
      line1: string;
      line2: string;
      description: [string, string, string];
      enter: string;
      note1: string;
      note2: string;
      caption: string;
      discover: string;
    };
    factsLabel: string;
    facts: [[string, string], [string, string], [string, string]];
    intro: {
      eyebrow: string;
      line1: string;
      line2: string;
      emphasis: string;
      paragraphs: [string, string];
      link: string;
    };
    spaces: {
      eyebrow: string;
      line1: string;
      line2: string;
      description: [string, string];
      essential: string;
      amenities: [string, string, string, string, string, string, string];
    };
    gallery: {
      camera: [string, string, string];
      soggiorno: [string, string, string];
      cucina: [string, string, string];
      bagno: [string, string, string];
      colazione: [string, string, string];
      dettagli: [string, string, string];
      dialog: string;
      close: string;
      previous: string;
      next: string;
    };
    quote: [string, string, string];
    quoteLabel: string;
    city: {
      caption: string;
      eyebrow: string;
      line1: string;
      line2: string;
      intro: string;
      items: [[string, string], [string, string], [string, string]];
      where: string;
    };
    stay: {
      eyebrow: string;
      line1: string;
      line2: string;
      description: [string, string];
      cardEyebrow: string;
      cardTitle: string;
      cardText: string;
      labels: { checkin: string; checkout: string; pets: string };
      cta: string;
      faq: Record<FaqId, { title: string; content: RichText }>;
    };
    contact: {
      eyebrow: string;
      line1: string;
      line2: string;
      intro: string;
      direct: string;
      note: string;
    };
    form: {
      notice: string;
      legend: string;
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      arrival: string;
      departure: string;
      dateHelp: string;
      guests: string;
      guestOptions: [string, string, string];
      message: string;
      optional: string;
      messagePlaceholder: string;
      sensitive: string;
      privacySummary: string;
      privacyText: string;
      privacyLink: string;
      required: string;
      submit: string;
      noscript: string;
    };
    footer: {
      line1: string;
      line2: string;
      platforms: string;
    };
  };
  privacy: PrivacyCopy;
  dynamic: {
    configuredNotice: string;
    unavailable: string;
    arrivalError: string;
    departureError: string;
    emailGreeting: string;
    emailLabels: [string, string, string, string, string];
    emailSubject: string;
    prepared: string;
    openEmail: string;
    direct: string;
    consentAccepted: string;
    consentRejected: string;
    consentOff: string;
  };
  consent: {
    title: string;
    description: string;
    privacyLink: string;
    reject: string;
    accept: string;
  };
  photoAlt: {
    soggiorno: string;
    camera: string;
    cucina: string;
    bagno: string;
    colazione: string;
    dettagli: string;
    ascoli: string;
  };
};
export type HomeCopy = Catalog["home"];
