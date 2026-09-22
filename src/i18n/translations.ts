import { privacyCopy } from "./privacy.ts";
import { runtime } from "./runtime.ts";
import { locales } from "../types.ts";
export { locales };

const it = {
  common: {
    skip: "Vai al contenuto",
    tagline: "DIMORA AD ASCOLI PICENO",
    navLabel: "Navigazione principale",
    menu: "Menu",
    menuOpen: "Apri il menu",
    menuClose: "Chiudi il menu",
    language: "Lingua",
    languageMenu: "Scegli la lingua",
    nav: ["La dimora", "Gli spazi", "Ascoli", "Il soggiorno"],
    request: "Richiedi disponibilità",
    map: "Apri la mappa",
    booking: "Vedi su Booking.com",
    airbnb: "Vedi su Airbnb",
    privacy: "Privacy e cookie",
    settings: "Preferenze cookie",
    backTop: "Torna all’inizio",
    close: "Chiudi",
  },
  seo: {
    title: "Ver Sacrum | Dimora nel centro storico di Ascoli Piceno",
    description:
      "Dormi nel centro storico di Ascoli Piceno: scopri Ver Sacrum, con camera matrimoniale, cucina attrezzata, Wi-Fi, lavatrice e asciugatrice.",
  },
  home: {
    hero: {
      eyebrow: "MARCHE · ASCOLI PICENO",
      line1: "Abitare Ascoli,",
      line2: "con calma.",
      description: [
        "La tua dimora nel centro storico di Ascoli Piceno.",
        "Una cucina tutta tua.",
        "E la libertà di sentirsi a casa.",
      ],
      enter: "Entra nella dimora",
      note1: "Una città da scoprire.",
      note2: "Il tuo tempo, finalmente.",
      caption: "UN ANGOLO DI CASA",
      discover: "SCOPRI IL NOSTRO MONDO",
    },
    factsLabel: "La dimora in breve",
    facts: [
      ["Nel ", "centro storico"],
      ["Una ", "cucina tutta tua"],
      ["Connessione ", "Wi-Fi"],
    ],
    intro: {
      eyebrow: "01 / LA DIMORA",
      line1: "Dormire ad Ascoli.",
      line2: "Sentirsi ",
      emphasis: "a casa.",
      paragraphs: [
        "Ver Sacrum è una dimora nel centro storico di Ascoli Piceno, nelle Marche, per chi cerca un alloggio raccolto da cui vivere la città a piedi. Travi bianche, legno sotto i piedi e finestre aperte sui vicoli accompagnano i tuoi giorni qui.",
        "La camera matrimoniale e il divano letto offrono spazio per il riposo. La cucina attrezzata lascia spazio ai tuoi ritmi e il Wi-Fi ti permette di restare connesso. Una casa per un fine settimana in coppia, una visita in famiglia o qualche giorno per sé.",
      ],
      link: "Uno sguardo agli spazi",
    },
    spaces: {
      eyebrow: "02 / GLI SPAZI",
      line1: "Camera e spazi.",
      line2: "Il piacere di restare.",
      description: [
        "Una camera, il soggiorno, una cucina.",
        "Ogni ambiente, un modo di sentirsi a casa.",
      ],
      essential: "L'ESSENZIALE, CON TE",
      amenities: [
        "Letto matrimoniale",
        "Divano letto",
        "Cucina attrezzata",
        "Wi-Fi",
        "Lavatrice",
        "Asciugatrice",
        "TV",
      ],
    },
    gallery: {
      camera: [
        "La camera",
        "Un piccolo rifugio, a fine giornata.",
        "Apri la foto della camera",
      ],
      soggiorno: [
        "Il soggiorno",
        "La luce, le travi, il tempo per sé.",
        "Apri la foto del soggiorno",
      ],
      cucina: [
        "La cucina",
        "Il piacere dei propri ritmi.",
        "Apri la foto della cucina",
      ],
      bagno: [
        "Il bagno",
        "Linee semplici, dettagli essenziali.",
        "Apri la foto del bagno",
      ],
      colazione: [
        "I piccoli rituali",
        "Il primo caffè, senza fretta.",
        "Apri la foto dei piccoli rituali",
      ],
      dettagli: [
        "I dettagli",
        "Le cose che fanno una casa.",
        "Apri la foto dei dettagli",
      ],
      dialog: "Gli spazi",
      close: "Chiudi la galleria",
      previous: "Foto precedente",
      next: "Foto successiva",
    },
    quote: [
      "Ascoli non si visita.",
      "Si abita.",
      "ANCHE SOLO PER QUALCHE GIORNO.",
    ],
    quoteLabel: "La nostra idea di ospitalità",
    city: {
      caption: "Il centro storico, dalla nostra finestra.",
      eyebrow: "03 / FUORI DALLA PORTA",
      line1: "La città di pietra.",
      line2: "Da vivere a piedi.",
      intro:
        "La bellezza di Ascoli è anche tra una piazza e l’altra. Nei vicoli, nelle facciate di travertino, in un caffè che diventa una sosta un po’ più lunga.",
      items: [
        [
          "Piazza del Popolo",
          "Il salotto della città, da ritrovare a ogni ora.",
        ],
        [
          "Il gusto delle Marche",
          "Olive ascolane, botteghe e tavole da scoprire.",
        ],
        [
          "Perdersi, senza fretta",
          "Una passeggiata tra vicoli e scorci di pietra.",
        ],
      ],
      where: "DOVE SIAMO",
    },
    stay: {
      eyebrow: "04 / PRIMA DI PARTIRE",
      line1: "Il soggiorno,",
      line2: "in ogni dettaglio.",
      description: [
        "Tutto quello che serve sapere",
        "per immaginare i tuoi giorni qui.",
      ],
      cardEyebrow: "LA TUA SOSTA AD ASCOLI",
      cardTitle: "Una casa, i tuoi ritmi.",
      cardText:
        "Raccontaci le date del tuo viaggio: ti risponderemo con disponibilità e dettagli per organizzare il soggiorno.",
      labels: ["Check-in", "Check-out", "In compagnia"],
      cta: "Parliamo del tuo soggiorno",
      faq: [
        [
          "Quante persone può ospitare Ver Sacrum?",
          "La dimora accoglie fino a tre ospiti, con un letto matrimoniale nella camera e un divano letto nel soggiorno. Puoi indicare il numero di ospiti nella richiesta di disponibilità.",
        ],
        [
          "La dimora dispone di una cucina?",
          "Sì, trovi una cucina attrezzata con piano cottura, forno e bollitore. Sono presenti anche lavatrice e asciugatrice. Puoi preparare i tuoi pasti e organizzare le giornate secondo i tuoi ritmi. Guarda le foto degli ambienti.",
        ],
        [
          "Dove si trova Ver Sacrum ad Ascoli Piceno?",
          "La dimora si trova in {{address}}, nel centro storico di Ascoli Piceno. Nella sezione Ascoli e posizione trovi l’affaccio sui vicoli e i riferimenti per raggiungerci.",
        ],
        [
          "Arrivo e partenza",
          "Check-in: {{checkin}}.\nCheck-out: {{checkout}}.",
        ],
        [
          "Scale e accessibilità",
          "La dimora si trova al primo piano, raggiungibile tramite circa 20 gradini, senza ascensore. Se hai esigenze specifiche, confrontiamoci prima della prenotazione.",
        ],
        ["Parcheggio e ZTL", "{{parking}}"],
        ["Viaggiare con animali", "{{pets}}"],
      ],
    },
    contact: {
      eyebrow: "05 / CI VEDIAMO AD ASCOLI",
      line1: "Il tuo prossimo",
      line2: "piccolo viaggio.",
      intro:
        "Raccontaci quando vorresti arrivare e con chi. Da qui comincia il tuo soggiorno a Ver Sacrum.",
      direct: "UN CONTATTO DIRETTO",
      note: "Una richiesta di disponibilità non costituisce una prenotazione. Date e condizioni saranno concordate nella risposta.",
    },
    form: {
      notice:
        "Il pulsante apre un’email precompilata da inviare dal tuo programma di posta. Il sito non invia la richiesta automaticamente.",
      legend: "La tua richiesta di disponibilità",
      name: "Il tuo nome",
      namePlaceholder: "Nome e cognome",
      email: "La tua email",
      emailPlaceholder: "nome@esempio.it",
      arrival: "Arrivo",
      departure: "Partenza",
      dateHelp: "La partenza deve essere successiva all’arrivo.",
      guests: "Ospiti",
      guestOptions: ["1 ospite", "2 ospiti", "3 ospiti"],
      message: "Qualcosa da aggiungere?",
      optional: "(facoltativo)",
      messagePlaceholder: "Un desiderio o una domanda sul soggiorno…",
      sensitive:
        "Non inserire documenti, dati di pagamento o informazioni sanitarie.",
      privacySummary: "Informativa sul trattamento dei dati",
      privacyText:
        "Usiamo i dati che ci invii per rispondere alla tua richiesta.",
      privacyLink: "Leggi l’informativa privacy",
      required: "* Campi obbligatori",
      submit: "Invia la richiesta",
      noscript:
        "Per utilizzare il modulo attiva JavaScript. Puoi consultare i contatti diretti qui accanto.",
    },
    footer: {
      line1: "Un luogo da abitare.",
      line2: "Un ricordo da portare con sé.",
      platforms: "CI TROVI ANCHE QUI",
    },
  },
};

const en = {
  common: {
    skip: "Skip to content",
    tagline: "A HOME IN ASCOLI PICENO",
    navLabel: "Main navigation",
    menu: "Menu",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    language: "Language",
    languageMenu: "Choose language",
    nav: ["The house", "The spaces", "Ascoli", "Your stay"],
    request: "Check availability",
    map: "Open map",
    booking: "View on Booking.com",
    airbnb: "View on Airbnb",
    privacy: "Privacy and cookies",
    settings: "Cookie preferences",
    backTop: "Back to top",
    close: "Close",
  },
  seo: {
    title: "Ver Sacrum | A home in Ascoli Piceno’s historic centre",
    description:
      "Stay in the historic centre of Ascoli Piceno at Ver Sacrum, with a double bedroom, equipped kitchen, Wi-Fi, washing machine and tumble dryer.",
  },
  home: {
    hero: {
      eyebrow: "MARCHE · ASCOLI PICENO",
      line1: "Live Ascoli,",
      line2: "at your own pace.",
      description: [
        "Your own home in Ascoli Piceno’s historic centre.",
        "A kitchen all to yourself.",
        "And the freedom to feel at home.",
      ],
      enter: "Step inside",
      note1: "A city to discover.",
      note2: "Time that is truly yours.",
      caption: "A CORNER OF HOME",
      discover: "DISCOVER OUR WORLD",
    },
    factsLabel: "The house at a glance",
    facts: [
      ["In the ", "historic centre"],
      ["Your own ", "fully equipped kitchen"],
      ["Stay connected with ", "Wi-Fi"],
    ],
    intro: {
      eyebrow: "01 / THE HOUSE",
      line1: "Sleep in Ascoli.",
      line2: "Feel ",
      emphasis: "at home.",
      paragraphs: [
        "Ver Sacrum is an intimate home in the historic centre of Ascoli Piceno, in the Marche, for guests who want to experience the city on foot. White beams, wooden floors and windows opening onto the lanes accompany your days here.",
        "The double bedroom and sofa bed offer room to rest. The equipped kitchen lets you follow your own rhythm, while Wi-Fi keeps you connected. A home for a weekend as a couple, a family visit or a few days to yourself.",
      ],
      link: "Explore the spaces",
    },
    spaces: {
      eyebrow: "02 / THE SPACES",
      line1: "Rooms and spaces.",
      line2: "The pleasure of staying.",
      description: [
        "A bedroom, a living room, a kitchen.",
        "Every space offers another way to feel at home.",
      ],
      essential: "EVERYTHING YOU NEED",
      amenities: [
        "Double bed",
        "Sofa bed",
        "Equipped kitchen",
        "Wi-Fi",
        "Washing machine",
        "Tumble dryer",
        "TV",
      ],
    },
    gallery: {
      camera: [
        "The bedroom",
        "A quiet retreat at the end of the day.",
        "Open the bedroom photo",
      ],
      soggiorno: [
        "The living room",
        "Light, beams and time to yourself.",
        "Open the living room photo",
      ],
      cucina: [
        "The kitchen",
        "The pleasure of your own rhythm.",
        "Open the kitchen photo",
      ],
      bagno: [
        "The bathroom",
        "Simple lines, thoughtful details.",
        "Open the bathroom photo",
      ],
      colazione: [
        "Little rituals",
        "That first coffee, with nowhere to rush.",
        "Open the little rituals photo",
      ],
      dettagli: [
        "The details",
        "The things that make a house a home.",
        "Open the details photo",
      ],
      dialog: "The spaces",
      close: "Close gallery",
      previous: "Previous photo",
      next: "Next photo",
    },
    quote: [
      "Ascoli is not merely visited.",
      "It is lived.",
      "EVEN FOR JUST A FEW DAYS.",
    ],
    quoteLabel: "Our idea of hospitality",
    city: {
      caption: "The historic centre, from our window.",
      eyebrow: "03 / OUTSIDE THE DOOR",
      line1: "The city of stone.",
      line2: "Made for walking.",
      intro:
        "Ascoli’s beauty also lies between one square and the next: in its lanes, its travertine façades and a coffee that turns into a longer pause.",
      items: [
        [
          "Piazza del Popolo",
          "The city’s drawing room, worth returning to at any hour.",
        ],
        [
          "A taste of the Marche",
          "Olive all’ascolana, small shops and tables to discover.",
        ],
        ["Wander, unhurried", "A walk through lanes and glimpses of stone."],
      ],
      where: "WHERE WE ARE",
    },
    stay: {
      eyebrow: "04 / BEFORE YOU LEAVE",
      line1: "Your stay,",
      line2: "in every detail.",
      description: [
        "Everything you need to know",
        "to picture your days here.",
      ],
      cardEyebrow: "YOUR STAY IN ASCOLI",
      cardTitle: "A home, your rhythm.",
      cardText:
        "Tell us your travel dates and we will reply with availability and everything you need to plan your stay.",
      labels: ["Check-in", "Check-out", "Travelling together"],
      cta: "Let’s talk about your stay",
      faq: [
        [
          "How many guests can Ver Sacrum accommodate?",
          "The house welcomes up to three guests, with a double bed in the bedroom and a sofa bed in the living room. You can specify the number of guests in your availability request.",
        ],
        [
          "Does the house have a kitchen?",
          "Yes. The equipped kitchen includes a hob, oven and kettle, as well as a washing machine and tumble dryer. Prepare your own meals and organise each day at your own pace. See the photos of the spaces.",
        ],
        [
          "Where is Ver Sacrum in Ascoli Piceno?",
          "The house is at {{address}}, in Ascoli Piceno’s historic centre. The Ascoli and location section shows the view over the lanes and how to find us.",
        ],
        [
          "Arrival and departure",
          "Check-in: {{checkin}}.\nCheck-out: {{checkout}}.",
        ],
        [
          "Stairs and accessibility",
          "The house is on the first floor, reached by approximately 20 steps, with no lift. If you have specific needs, please speak to us before booking.",
        ],
        [
          "Parking and restricted traffic zone",
          "For unloading luggage, you may use the loading bays in Piazza Roma, around 80 metres from the apartment. Longer stays are available in paid street parking near the courthouse in Piazza Serafino Orlini, or in Via delle Rimembranze, where a daily ticket costs €2. The private barrier-controlled Porta Torricella car park is about 600 metres away. Free parking is around 800 metres away near Porta Romana, Viale Treviri and Via Oberdan.",
        ],
        ["Travelling with pets", "Small pets are welcome."],
      ],
    },
    contact: {
      eyebrow: "05 / SEE YOU IN ASCOLI",
      line1: "Your next",
      line2: "little journey.",
      intro:
        "Tell us when you would like to arrive and who you are travelling with. Your stay at Ver Sacrum begins here.",
      direct: "CONTACT US DIRECTLY",
      note: "An availability request is not a confirmed booking. Dates and conditions will be agreed in our reply.",
    },
    form: {
      notice:
        "The button prepares an email for you to review and send from your email application. The website does not send your request automatically.",
      legend: "Your availability request",
      name: "Your name",
      namePlaceholder: "Full name",
      email: "Your email",
      emailPlaceholder: "name@example.com",
      arrival: "Arrival",
      departure: "Departure",
      dateHelp: "Departure must be after arrival.",
      guests: "Guests",
      guestOptions: ["1 guest", "2 guests", "3 guests"],
      message: "Anything to add?",
      optional: "(optional)",
      messagePlaceholder: "A wish or a question about your stay…",
      sensitive:
        "Do not include identity documents, payment details or health information.",
      privacySummary: "How we use your data",
      privacyText:
        "We use the information you provide to reply to your request.",
      privacyLink: "Read the privacy notice",
      required: "* Required fields",
      submit: "Send request",
      noscript:
        "Enable JavaScript to use the form, or contact us directly using the details alongside.",
    },
    footer: {
      line1: "A place to inhabit.",
      line2: "A memory to take with you.",
      platforms: "FIND US HERE TOO",
    },
  },
};

const fr = {
  common: {
    skip: "Aller au contenu",
    tagline: "UNE DEMEURE À ASCOLI PICENO",
    navLabel: "Navigation principale",
    menu: "Menu",
    menuOpen: "Ouvrir le menu",
    menuClose: "Fermer le menu",
    language: "Langue",
    languageMenu: "Choisir la langue",
    nav: ["La demeure", "Les espaces", "Ascoli", "Le séjour"],
    request: "Demander les disponibilités",
    map: "Ouvrir la carte",
    booking: "Voir sur Booking.com",
    airbnb: "Voir sur Airbnb",
    privacy: "Confidentialité et cookies",
    settings: "Préférences de cookies",
    backTop: "Retour en haut",
    close: "Fermer",
  },
  seo: {
    title: "Ver Sacrum | Une demeure dans le centre historique d’Ascoli Piceno",
    description:
      "Séjournez dans le centre historique d’Ascoli Piceno à Ver Sacrum : chambre double, cuisine équipée, Wi-Fi, lave-linge et sèche-linge.",
  },
  home: {
    hero: {
      eyebrow: "MARCHES · ASCOLI PICENO",
      line1: "Habiter Ascoli,",
      line2: "tout doucement.",
      description: [
        "Votre demeure au cœur du centre historique d’Ascoli Piceno.",
        "Une cuisine rien que pour vous.",
        "Et la liberté de vous sentir chez vous.",
      ],
      enter: "Entrez dans la demeure",
      note1: "Une ville à découvrir.",
      note2: "Enfin, du temps pour vous.",
      caption: "UN COIN DE CHEZ SOI",
      discover: "DÉCOUVREZ NOTRE UNIVERS",
    },
    factsLabel: "La demeure en bref",
    facts: [
      ["Dans le ", "centre historique"],
      ["Une ", "cuisine rien qu’à vous"],
      ["Connexion ", "Wi-Fi"],
    ],
    intro: {
      eyebrow: "01 / LA DEMEURE",
      line1: "Dormir à Ascoli.",
      line2: "Se sentir ",
      emphasis: "chez soi.",
      paragraphs: [
        "Ver Sacrum est une demeure intime dans le centre historique d’Ascoli Piceno, dans les Marches, pour celles et ceux qui souhaitent vivre la ville à pied. Poutres blanches, parquet et fenêtres ouvertes sur les ruelles accompagnent vos journées.",
        "La chambre double et le canapé-lit offrent tout l’espace nécessaire au repos. La cuisine équipée suit votre rythme et le Wi-Fi vous permet de rester connecté. Une maison pour un week-end à deux, une visite en famille ou quelques jours rien que pour soi.",
      ],
      link: "Découvrir les espaces",
    },
    spaces: {
      eyebrow: "02 / LES ESPACES",
      line1: "Pièces et espaces.",
      line2: "Le plaisir de rester.",
      description: [
        "Une chambre, un salon, une cuisine.",
        "Chaque espace est une autre façon de se sentir chez soi.",
      ],
      essential: "L’ESSENTIEL, AVEC VOUS",
      amenities: [
        "Lit double",
        "Canapé-lit",
        "Cuisine équipée",
        "Wi-Fi",
        "Lave-linge",
        "Sèche-linge",
        "TV",
      ],
    },
    gallery: {
      camera: [
        "La chambre",
        "Un petit refuge en fin de journée.",
        "Ouvrir la photo de la chambre",
      ],
      soggiorno: [
        "Le salon",
        "La lumière, les poutres, du temps pour soi.",
        "Ouvrir la photo du salon",
      ],
      cucina: [
        "La cuisine",
        "Le plaisir de suivre son rythme.",
        "Ouvrir la photo de la cuisine",
      ],
      bagno: [
        "La salle de bains",
        "Des lignes simples, des détails essentiels.",
        "Ouvrir la photo de la salle de bains",
      ],
      colazione: [
        "Les petits rituels",
        "Le premier café, sans se presser.",
        "Ouvrir la photo des petits rituels",
      ],
      dettagli: [
        "Les détails",
        "Ces petites choses qui font une maison.",
        "Ouvrir la photo des détails",
      ],
      dialog: "Les espaces",
      close: "Fermer la galerie",
      previous: "Photo précédente",
      next: "Photo suivante",
    },
    quote: [
      "Ascoli ne se visite pas.",
      "Elle se vit.",
      "MÊME POUR QUELQUES JOURS.",
    ],
    quoteLabel: "Notre idée de l’hospitalité",
    city: {
      caption: "Le centre historique, depuis notre fenêtre.",
      eyebrow: "03 / DERRIÈRE LA PORTE",
      line1: "La ville de pierre.",
      line2: "À parcourir à pied.",
      intro:
        "La beauté d’Ascoli se dévoile aussi entre deux places : dans ses ruelles, ses façades en travertin et un café qui devient une pause un peu plus longue.",
      items: [
        [
          "Piazza del Popolo",
          "Le salon de la ville, où revenir à toute heure.",
        ],
        [
          "Les saveurs des Marches",
          "Olives à l’ascolane, boutiques et bonnes tables à découvrir.",
        ],
        [
          "Flâner, sans se presser",
          "Une promenade entre ruelles et perspectives de pierre.",
        ],
      ],
      where: "OÙ NOUS TROUVER",
    },
    stay: {
      eyebrow: "04 / AVANT DE PARTIR",
      line1: "Votre séjour,",
      line2: "dans les moindres détails.",
      description: [
        "Tout ce qu’il faut savoir",
        "pour imaginer vos journées ici.",
      ],
      cardEyebrow: "VOTRE SÉJOUR À ASCOLI",
      cardTitle: "Une maison, votre rythme.",
      cardText:
        "Indiquez-nous les dates de votre voyage : nous vous répondrons avec les disponibilités et les informations utiles pour organiser votre séjour.",
      labels: ["Arrivée", "Départ", "En compagnie"],
      cta: "Parlons de votre séjour",
      faq: [
        [
          "Combien de personnes Ver Sacrum peut-elle accueillir ?",
          "La demeure accueille jusqu’à trois personnes, avec un lit double dans la chambre et un canapé-lit dans le salon. Indiquez le nombre de voyageurs dans votre demande de disponibilité.",
        ],
        [
          "La demeure dispose-t-elle d’une cuisine ?",
          "Oui, vous trouverez une cuisine équipée avec plaques de cuisson, four et bouilloire, ainsi qu’un lave-linge et un sèche-linge. Préparez vos repas et organisez vos journées à votre rythme. Découvrez les photos des espaces.",
        ],
        [
          "Où se trouve Ver Sacrum à Ascoli Piceno ?",
          "La demeure se trouve {{address}}, dans le centre historique d’Ascoli Piceno. La section Ascoli et situation présente la vue sur les ruelles et les indications pour nous rejoindre.",
        ],
        ["Arrivée et départ", "Arrivée : {{checkin}}.\nDépart : {{checkout}}."],
        [
          "Escaliers et accessibilité",
          "La demeure se trouve au premier étage, accessible par une vingtaine de marches, sans ascenseur. Si vous avez des besoins particuliers, contactez-nous avant de réserver.",
        ],
        [
          "Stationnement et ZTL",
          "Pour décharger les bagages, vous pouvez utiliser les emplacements de livraison de la Piazza Roma, à environ 80 mètres de l’appartement. Pour un stationnement plus long, des places payantes sont disponibles près du tribunal, Piazza Serafino Orlini, et Via delle Rimembranze, avec un ticket journalier de 2 €. Le parking privé avec barrière de Porta Torricella se trouve à environ 600 mètres. Des places gratuites sont disponibles à environ 800 mètres, près de Porta Romana, Viale Treviri et Via Oberdan.",
        ],
        [
          "Voyager avec des animaux",
          "Les animaux de petite taille sont acceptés.",
        ],
      ],
    },
    contact: {
      eyebrow: "05 / RENDEZ-VOUS À ASCOLI",
      line1: "Votre prochaine",
      line2: "petite escapade.",
      intro:
        "Dites-nous quand vous souhaitez arriver et avec qui. Votre séjour à Ver Sacrum commence ici.",
      direct: "CONTACT DIRECT",
      note: "Une demande de disponibilité ne constitue pas une réservation. Les dates et conditions seront convenues dans notre réponse.",
    },
    form: {
      notice:
        "Le bouton prépare un e-mail que vous devrez vérifier et envoyer depuis votre messagerie. Le site n’envoie pas automatiquement la demande.",
      legend: "Votre demande de disponibilité",
      name: "Votre nom",
      namePlaceholder: "Nom et prénom",
      email: "Votre e-mail",
      emailPlaceholder: "nom@exemple.fr",
      arrival: "Arrivée",
      departure: "Départ",
      dateHelp: "Le départ doit être postérieur à l’arrivée.",
      guests: "Voyageurs",
      guestOptions: ["1 voyageur", "2 voyageurs", "3 voyageurs"],
      message: "Quelque chose à ajouter ?",
      optional: "(facultatif)",
      messagePlaceholder: "Une envie ou une question sur votre séjour…",
      sensitive:
        "N’indiquez aucun document, donnée de paiement ou information de santé.",
      privacySummary: "Traitement de vos données",
      privacyText:
        "Nous utilisons les informations fournies pour répondre à votre demande.",
      privacyLink: "Lire la politique de confidentialité",
      required: "* Champs obligatoires",
      submit: "Envoyer la demande",
      noscript:
        "Activez JavaScript pour utiliser le formulaire ou contactez-nous directement grâce aux coordonnées ci-contre.",
    },
    footer: {
      line1: "Un lieu à habiter.",
      line2: "Un souvenir à emporter.",
      platforms: "RETROUVEZ-NOUS AUSSI ICI",
    },
  },
};

const es = {
  common: {
    skip: "Ir al contenido",
    tagline: "UN HOGAR EN ASCOLI PICENO",
    navLabel: "Navegación principal",
    menu: "Menú",
    menuOpen: "Abrir el menú",
    menuClose: "Cerrar el menú",
    language: "Idioma",
    languageMenu: "Elegir idioma",
    nav: ["El alojamiento", "Los espacios", "Ascoli", "La estancia"],
    request: "Consultar disponibilidad",
    map: "Abrir el mapa",
    booking: "Ver en Booking.com",
    airbnb: "Ver en Airbnb",
    privacy: "Privacidad y cookies",
    settings: "Preferencias de cookies",
    backTop: "Volver arriba",
    close: "Cerrar",
  },
  seo: {
    title: "Ver Sacrum | Alojamiento en el centro histórico de Ascoli Piceno",
    description:
      "Alójate en el centro histórico de Ascoli Piceno en Ver Sacrum, con dormitorio doble, cocina equipada, Wi-Fi, lavadora y secadora.",
  },
  home: {
    hero: {
      eyebrow: "MARCAS · ASCOLI PICENO",
      line1: "Vivir Ascoli,",
      line2: "sin prisas.",
      description: [
        "Tu alojamiento en el centro histórico de Ascoli Piceno.",
        "Una cocina solo para ti.",
        "Y la libertad de sentirte como en casa.",
      ],
      enter: "Entra en la casa",
      note1: "Una ciudad por descubrir.",
      note2: "Por fin, tiempo para ti.",
      caption: "UN RINCÓN DE CASA",
      discover: "DESCUBRE NUESTRO MUNDO",
    },
    factsLabel: "El alojamiento en pocas palabras",
    facts: [
      ["En el ", "centro histórico"],
      ["Una ", "cocina solo para ti"],
      ["Conexión ", "Wi-Fi"],
    ],
    intro: {
      eyebrow: "01 / EL ALOJAMIENTO",
      line1: "Dormir en Ascoli.",
      line2: "Sentirse ",
      emphasis: "como en casa.",
      paragraphs: [
        "Ver Sacrum es un alojamiento acogedor en el centro histórico de Ascoli Piceno, en las Marcas, para quienes desean vivir la ciudad a pie. Vigas blancas, suelo de madera y ventanas abiertas a las callejuelas acompañan tus días aquí.",
        "El dormitorio doble y el sofá cama ofrecen espacio para descansar. La cocina equipada te permite seguir tu propio ritmo y el Wi-Fi te mantiene conectado. Una casa para un fin de semana en pareja, una visita familiar o unos días para ti.",
      ],
      link: "Descubre los espacios",
    },
    spaces: {
      eyebrow: "02 / LOS ESPACIOS",
      line1: "Habitaciones y espacios.",
      line2: "El placer de quedarse.",
      description: [
        "Un dormitorio, un salón, una cocina.",
        "Cada espacio, una forma de sentirse en casa.",
      ],
      essential: "TODO LO ESENCIAL",
      amenities: [
        "Cama doble",
        "Sofá cama",
        "Cocina equipada",
        "Wi-Fi",
        "Lavadora",
        "Secadora",
        "TV",
      ],
    },
    gallery: {
      camera: [
        "El dormitorio",
        "Un pequeño refugio al final del día.",
        "Abrir la foto del dormitorio",
      ],
      soggiorno: [
        "El salón",
        "La luz, las vigas, tiempo para ti.",
        "Abrir la foto del salón",
      ],
      cucina: [
        "La cocina",
        "El placer de seguir tu propio ritmo.",
        "Abrir la foto de la cocina",
      ],
      bagno: [
        "El baño",
        "Líneas sencillas, detalles esenciales.",
        "Abrir la foto del baño",
      ],
      colazione: [
        "Los pequeños rituales",
        "El primer café, sin prisas.",
        "Abrir la foto de los pequeños rituales",
      ],
      dettagli: [
        "Los detalles",
        "Las cosas que convierten una casa en hogar.",
        "Abrir la foto de los detalles",
      ],
      dialog: "Los espacios",
      close: "Cerrar la galería",
      previous: "Foto anterior",
      next: "Foto siguiente",
    },
    quote: ["Ascoli no se visita.", "Se vive.", "AUNQUE SOLO SEA UNOS DÍAS."],
    quoteLabel: "Nuestra idea de hospitalidad",
    city: {
      caption: "El centro histórico, desde nuestra ventana.",
      eyebrow: "03 / AL SALIR DE CASA",
      line1: "La ciudad de piedra.",
      line2: "Para recorrer a pie.",
      intro:
        "La belleza de Ascoli también está entre una plaza y otra: en sus callejuelas, sus fachadas de travertino y un café que se convierte en una pausa un poco más larga.",
      items: [
        [
          "Piazza del Popolo",
          "El salón de la ciudad, al que volver a cualquier hora.",
        ],
        [
          "El sabor de las Marcas",
          "Aceitunas a la ascolana, tiendas y mesas por descubrir.",
        ],
        [
          "Perderse, sin prisas",
          "Un paseo entre callejuelas y rincones de piedra.",
        ],
      ],
      where: "DÓNDE ESTAMOS",
    },
    stay: {
      eyebrow: "04 / ANTES DE VIAJAR",
      line1: "La estancia,",
      line2: "en cada detalle.",
      description: [
        "Todo lo que necesitas saber",
        "para imaginar tus días aquí.",
      ],
      cardEyebrow: "TU ESTANCIA EN ASCOLI",
      cardTitle: "Una casa, tu ritmo.",
      cardText:
        "Cuéntanos las fechas de tu viaje: te responderemos con la disponibilidad y los detalles necesarios para organizar la estancia.",
      labels: ["Llegada", "Salida", "En compañía"],
      cta: "Hablemos de tu estancia",
      faq: [
        [
          "¿Cuántas personas puede alojar Ver Sacrum?",
          "La casa puede recibir hasta tres huéspedes, con una cama doble en el dormitorio y un sofá cama en el salón. Indica el número de huéspedes en la solicitud de disponibilidad.",
        ],
        [
          "¿El alojamiento dispone de cocina?",
          "Sí. La cocina está equipada con placa, horno y hervidor. También hay lavadora y secadora. Prepara tus comidas y organiza el día a tu ritmo. Mira las fotos de los espacios.",
        ],
        [
          "¿Dónde se encuentra Ver Sacrum en Ascoli Piceno?",
          "La casa está en {{address}}, en el centro histórico de Ascoli Piceno. En la sección Ascoli y ubicación encontrarás las vistas a las callejuelas y las indicaciones para llegar.",
        ],
        ["Llegada y salida", "Llegada: {{checkin}}.\nSalida: {{checkout}}."],
        [
          "Escaleras y accesibilidad",
          "La casa está en la primera planta, accesible por unos 20 escalones y sin ascensor. Si tienes necesidades específicas, consúltanos antes de reservar.",
        ],
        [
          "Aparcamiento y ZTL",
          "Para descargar el equipaje puedes utilizar las zonas de carga y descarga de Piazza Roma, a unos 80 metros del apartamento. Para estancias más largas hay aparcamiento de pago junto al Palacio de Justicia, en Piazza Serafino Orlini, y en Via delle Rimembranze, con un abono diario de 2 €. El aparcamiento privado con barrera de Porta Torricella está a unos 600 metros. Hay aparcamiento gratuito a unos 800 metros, cerca de Porta Romana, Viale Treviri y Via Oberdan.",
        ],
        ["Viajar con mascotas", "Se admiten mascotas pequeñas."],
      ],
    },
    contact: {
      eyebrow: "05 / NOS VEMOS EN ASCOLI",
      line1: "Tu próxima",
      line2: "pequeña escapada.",
      intro:
        "Cuéntanos cuándo quieres llegar y con quién. Tu estancia en Ver Sacrum comienza aquí.",
      direct: "CONTACTO DIRECTO",
      note: "Una solicitud de disponibilidad no constituye una reserva. Las fechas y condiciones se acordarán en nuestra respuesta.",
    },
    form: {
      notice:
        "El botón prepara un correo que deberás revisar y enviar desde tu aplicación de correo. El sitio no envía la solicitud automáticamente.",
      legend: "Tu solicitud de disponibilidad",
      name: "Tu nombre",
      namePlaceholder: "Nombre y apellidos",
      email: "Tu correo electrónico",
      emailPlaceholder: "nombre@ejemplo.es",
      arrival: "Llegada",
      departure: "Salida",
      dateHelp: "La salida debe ser posterior a la llegada.",
      guests: "Huéspedes",
      guestOptions: ["1 huésped", "2 huéspedes", "3 huéspedes"],
      message: "¿Quieres añadir algo?",
      optional: "(opcional)",
      messagePlaceholder: "Un deseo o una pregunta sobre tu estancia…",
      sensitive:
        "No incluyas documentos, datos de pago ni información sanitaria.",
      privacySummary: "Tratamiento de tus datos",
      privacyText:
        "Usamos los datos que nos facilitas para responder a tu solicitud.",
      privacyLink: "Leer la política de privacidad",
      required: "* Campos obligatorios",
      submit: "Enviar la solicitud",
      noscript:
        "Activa JavaScript para utilizar el formulario o ponte en contacto directamente con nosotros.",
    },
    footer: {
      line1: "Un lugar que habitar.",
      line2: "Un recuerdo que llevar contigo.",
      platforms: "TAMBIÉN NOS ENCUENTRAS AQUÍ",
    },
  },
};

const de = {
  common: {
    skip: "Zum Inhalt",
    tagline: "EIN ZUHAUSE IN ASCOLI PICENO",
    navLabel: "Hauptnavigation",
    menu: "Menü",
    menuOpen: "Menü öffnen",
    menuClose: "Menü schließen",
    language: "Sprache",
    languageMenu: "Sprache wählen",
    nav: ["Das Zuhause", "Die Räume", "Ascoli", "Der Aufenthalt"],
    request: "Verfügbarkeit anfragen",
    map: "Karte öffnen",
    booking: "Auf Booking.com ansehen",
    airbnb: "Auf Airbnb ansehen",
    privacy: "Datenschutz und Cookies",
    settings: "Cookie-Einstellungen",
    backTop: "Nach oben",
    close: "Schließen",
  },
  seo: {
    title: "Ver Sacrum | Wohnen in der Altstadt von Ascoli Piceno",
    description:
      "Übernachten Sie bei Ver Sacrum in der Altstadt von Ascoli Piceno – mit Doppelzimmer, ausgestatteter Küche, WLAN, Waschmaschine und Trockner.",
  },
  home: {
    hero: {
      eyebrow: "MARKEN · ASCOLI PICENO",
      line1: "Ascoli erleben,",
      line2: "ganz in Ruhe.",
      description: [
        "Ihr Zuhause in der Altstadt von Ascoli Piceno.",
        "Eine Küche ganz für Sie.",
        "Und die Freiheit, sich wie zu Hause zu fühlen.",
      ],
      enter: "Hereinkommen",
      note1: "Eine Stadt zum Entdecken.",
      note2: "Endlich Zeit für sich.",
      caption: "EIN STÜCK ZUHAUSE",
      discover: "UNSERE WELT ENTDECKEN",
    },
    factsLabel: "Das Zuhause im Überblick",
    facts: [
      ["Mitten in der ", "Altstadt"],
      ["Eine ", "eigene Küche"],
      ["Verbunden mit ", "WLAN"],
    ],
    intro: {
      eyebrow: "01 / DAS ZUHAUSE",
      line1: "In Ascoli schlafen.",
      line2: "Sich ",
      emphasis: "zu Hause fühlen.",
      paragraphs: [
        "Ver Sacrum ist ein behagliches Zuhause in der Altstadt von Ascoli Piceno in den Marken – für alle, die die Stadt zu Fuß erleben möchten. Weiße Balken, Holzböden und Fenster zu den Gassen begleiten Ihre Tage hier.",
        "Das Doppelzimmer und das Schlafsofa bieten Raum zum Ausruhen. In der ausgestatteten Küche bestimmen Sie Ihren eigenen Rhythmus, und WLAN hält Sie in Verbindung. Ein Zuhause für ein Wochenende zu zweit, einen Familienbesuch oder ein paar Tage ganz für sich.",
      ],
      link: "Die Räume entdecken",
    },
    spaces: {
      eyebrow: "02 / DIE RÄUME",
      line1: "Zimmer und Räume.",
      line2: "Die Freude am Bleiben.",
      description: [
        "Ein Schlafzimmer, ein Wohnzimmer, eine Küche.",
        "Jeder Raum ist eine andere Art, sich zu Hause zu fühlen.",
      ],
      essential: "ALLES, WAS SIE BRAUCHEN",
      amenities: [
        "Doppelbett",
        "Schlafsofa",
        "Ausgestattete Küche",
        "WLAN",
        "Waschmaschine",
        "Trockner",
        "TV",
      ],
    },
    gallery: {
      camera: [
        "Das Schlafzimmer",
        "Ein kleiner Rückzugsort am Ende des Tages.",
        "Foto des Schlafzimmers öffnen",
      ],
      soggiorno: [
        "Das Wohnzimmer",
        "Licht, Balken und Zeit für sich.",
        "Foto des Wohnzimmers öffnen",
      ],
      cucina: [
        "Die Küche",
        "Den eigenen Rhythmus genießen.",
        "Foto der Küche öffnen",
      ],
      bagno: [
        "Das Badezimmer",
        "Klare Linien, ausgewählte Details.",
        "Foto des Badezimmers öffnen",
      ],
      colazione: [
        "Die kleinen Rituale",
        "Der erste Kaffee, ganz ohne Eile.",
        "Foto der kleinen Rituale öffnen",
      ],
      dettagli: [
        "Die Details",
        "Die Dinge, die ein Haus zum Zuhause machen.",
        "Foto der Details öffnen",
      ],
      dialog: "Die Räume",
      close: "Galerie schließen",
      previous: "Vorheriges Foto",
      next: "Nächstes Foto",
    },
    quote: [
      "Ascoli besucht man nicht nur.",
      "Man lebt es.",
      "AUCH WENN ES NUR EIN PAAR TAGE SIND.",
    ],
    quoteLabel: "Unsere Vorstellung von Gastfreundschaft",
    city: {
      caption: "Die Altstadt, von unserem Fenster aus.",
      eyebrow: "03 / VOR DER HAUSTÜR",
      line1: "Die Stadt aus Stein.",
      line2: "Zu Fuß erleben.",
      intro:
        "Ascolis Schönheit liegt auch zwischen den Plätzen: in den Gassen, den Travertinfassaden und einem Kaffee, der zu einer etwas längeren Pause wird.",
      items: [
        [
          "Piazza del Popolo",
          "Das Wohnzimmer der Stadt, zu jeder Tageszeit einen Besuch wert.",
        ],
        [
          "Der Geschmack der Marken",
          "Olive all’ascolana, kleine Läden und Lokale zum Entdecken.",
        ],
        [
          "Sich treiben lassen",
          "Ein Spaziergang durch Gassen und steinerne Ausblicke.",
        ],
      ],
      where: "SO FINDEN SIE UNS",
    },
    stay: {
      eyebrow: "04 / VOR DER REISE",
      line1: "Der Aufenthalt,",
      line2: "bis ins Detail.",
      description: [
        "Alles, was Sie wissen müssen,",
        "um sich Ihre Tage hier vorzustellen.",
      ],
      cardEyebrow: "IHR AUFENTHALT IN ASCOLI",
      cardTitle: "Ein Zuhause, Ihr Rhythmus.",
      cardText:
        "Nennen Sie uns Ihre Reisedaten. Wir antworten mit der Verfügbarkeit und allen Informationen für die Planung Ihres Aufenthalts.",
      labels: ["Check-in", "Check-out", "In Begleitung"],
      cta: "Sprechen wir über Ihren Aufenthalt",
      faq: [
        [
          "Wie viele Gäste finden in Ver Sacrum Platz?",
          "Das Zuhause bietet Platz für bis zu drei Gäste: ein Doppelbett im Schlafzimmer und ein Schlafsofa im Wohnzimmer. Die Anzahl der Gäste können Sie in der Verfügbarkeitsanfrage angeben.",
        ],
        [
          "Gibt es eine Küche?",
          "Ja. Die ausgestattete Küche verfügt über Kochfeld, Backofen und Wasserkocher. Waschmaschine und Trockner sind ebenfalls vorhanden. Bereiten Sie Ihre Mahlzeiten zu und gestalten Sie den Tag in Ihrem Rhythmus. Sehen Sie sich die Fotos der Räume an.",
        ],
        [
          "Wo liegt Ver Sacrum in Ascoli Piceno?",
          "Das Zuhause befindet sich in {{address}}, mitten in der Altstadt von Ascoli Piceno. Im Abschnitt Ascoli und Lage finden Sie den Blick auf die Gassen und Hinweise zur Anreise.",
        ],
        ["An- und Abreise", "Check-in: {{checkin}}.\nCheck-out: {{checkout}}."],
        [
          "Treppen und Barrierefreiheit",
          "Das Zuhause liegt im ersten Stock und ist über etwa 20 Stufen ohne Aufzug erreichbar. Wenn Sie besondere Anforderungen haben, sprechen Sie bitte vor der Buchung mit uns.",
        ],
        [
          "Parken und ZTL",
          "Zum Ausladen des Gepäcks können Sie die Ladezonen an der Piazza Roma nutzen, etwa 80 Meter von der Wohnung entfernt. Für längeres Parken gibt es gebührenpflichtige Stellplätze am Gericht in der Piazza Serafino Orlini sowie in der Via delle Rimembranze mit einem Tagesticket für 2 €. Das private beschrankte Parkhaus Porta Torricella ist etwa 600 Meter entfernt. Kostenlose Parkplätze finden Sie in rund 800 Metern Entfernung bei Porta Romana, Viale Treviri und Via Oberdan.",
        ],
        ["Reisen mit Haustieren", "Kleine Haustiere sind willkommen."],
      ],
    },
    contact: {
      eyebrow: "05 / WIR SEHEN UNS IN ASCOLI",
      line1: "Ihre nächste",
      line2: "kleine Reise.",
      intro:
        "Sagen Sie uns, wann und mit wem Sie anreisen möchten. Hier beginnt Ihr Aufenthalt bei Ver Sacrum.",
      direct: "DIREKTER KONTAKT",
      note: "Eine Verfügbarkeitsanfrage ist noch keine Buchung. Termine und Bedingungen werden in unserer Antwort vereinbart.",
    },
    form: {
      notice:
        "Die Schaltfläche erstellt eine E-Mail, die Sie in Ihrem E-Mail-Programm prüfen und absenden. Die Website sendet die Anfrage nicht automatisch.",
      legend: "Ihre Verfügbarkeitsanfrage",
      name: "Ihr Name",
      namePlaceholder: "Vor- und Nachname",
      email: "Ihre E-Mail",
      emailPlaceholder: "name@beispiel.de",
      arrival: "Anreise",
      departure: "Abreise",
      dateHelp: "Die Abreise muss nach der Anreise liegen.",
      guests: "Gäste",
      guestOptions: ["1 Gast", "2 Gäste", "3 Gäste"],
      message: "Möchten Sie etwas ergänzen?",
      optional: "(optional)",
      messagePlaceholder: "Ein Wunsch oder eine Frage zu Ihrem Aufenthalt…",
      sensitive:
        "Bitte geben Sie keine Ausweisdokumente, Zahlungs- oder Gesundheitsdaten an.",
      privacySummary: "Informationen zur Datenverarbeitung",
      privacyText:
        "Wir verwenden Ihre Angaben, um Ihre Anfrage zu beantworten.",
      privacyLink: "Datenschutzhinweise lesen",
      required: "* Pflichtfelder",
      submit: "Anfrage senden",
      noscript:
        "Aktivieren Sie JavaScript, um das Formular zu nutzen, oder kontaktieren Sie uns direkt über die nebenstehenden Angaben.",
    },
    footer: {
      line1: "Ein Ort zum Wohnen.",
      line2: "Eine Erinnerung zum Mitnehmen.",
      platforms: "AUCH HIER FINDEN SIE UNS",
    },
  },
};

export const resources = {
  it: {
    translation: {
      ...it,
      privacy: privacyCopy.it,
      dynamic: runtime.it.dynamic,
    },
  },
  en: {
    translation: {
      ...en,
      privacy: privacyCopy.en,
      dynamic: runtime.en.dynamic,
    },
  },
  fr: {
    translation: {
      ...fr,
      privacy: privacyCopy.fr,
      dynamic: runtime.fr.dynamic,
    },
  },
  es: {
    translation: {
      ...es,
      privacy: privacyCopy.es,
      dynamic: runtime.es.dynamic,
    },
  },
  de: {
    translation: {
      ...de,
      privacy: privacyCopy.de,
      dynamic: runtime.de.dynamic,
    },
  },
};
