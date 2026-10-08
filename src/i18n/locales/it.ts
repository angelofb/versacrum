import { site, analytics } from "../../site.config.ts";
import { privacy } from "../../privacy.config.ts";
import { formatUpdated } from "../helpers.ts";
import type { Catalog } from "../schema.ts";

export default {
  common: {
    skip: "Vai al contenuto",
    tagline: "B&B AD ASCOLI PICENO",
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
    contentUpdated: "Informazioni aggiornate al",
  },
  seo: {
    title: "Ver Sacrum B&B ad Ascoli Piceno | Centro storico",
    description:
      "Ver Sacrum B&B nel centro storico di Ascoli Piceno: appartamento a uso esclusivo per 1–3 ospiti, cucina attrezzata e Wi-Fi. Chiedi disponibilità.",
  },
  home: {
    hero: {
      eyebrow: "BED AND BREAKFAST · CENTRO STORICO",
      line1: "Il tuo B&B.",
      line2: "Ad Ascoli Piceno.",
      description: [
        "Un appartamento tutto tuo, per 1–3 ospiti.",
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
      line1: "Dormire ad Ascoli Piceno.",
      line2: "Sentirsi ",
      emphasis: "a casa.",
      paragraphs: [
        `Ver Sacrum è un B&B in ${site.address}, nel centro storico di Ascoli Piceno, nelle Marche. Il soggiorno è in un appartamento intero a uso esclusivo, a pochi passi da Piazza del Popolo: un punto di partenza per visitare la città a piedi. Travi bianche, pavimenti in legno e finestre sui vicoli fanno da cornice al soggiorno.`,
        `Può accogliere fino a ${site.maxGuests} ospiti, con una camera matrimoniale e un divano letto in soggiorno. La cucina attrezzata, il bagno privato, il Wi-Fi, la lavatrice e l’asciugatrice permettono di organizzare un fine settimana o una permanenza più lunga secondo i propri ritmi.`,
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
      line1: "Ascoli Piceno.",
      line2: "Da vivere a piedi.",
      intro:
        "Da Ver Sacrum puoi vivere a piedi il centro storico di Ascoli Piceno: Piazza del Popolo, Piazza Arringo e i vicoli in travertino. Tra una visita e l’altra, ritrova il piacere di un caffè e delle botteghe del centro.",
      items: [
        [
          "Piazza del Popolo",
          "Il Palazzo dei Capitani, la chiesa di San Francesco e lo storico Caffè Meletti, a pochi passi dalla dimora.",
        ],
        [
          "Piazza Arringo e il Duomo",
          "La Cattedrale di Sant’Emidio e il Palazzo dell’Arengo, per continuare la passeggiata nel centro.",
        ],
        [
          "Il gusto delle Marche",
          "Olive ascolane, botteghe e ristoranti da scoprire lungo i vicoli.",
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
      labels: {
        capacity: "Ospiti (massimo)",
        address: "Indirizzo",
        checkin: "Check-in",
        checkout: "Check-out",
        pets: "Animali",
      },
      cta: "Parliamo del tuo soggiorno",
      faq: {
        accommodation: {
          title: "Com’è organizzato Ver Sacrum B&B?",
          content: [
            `Ver Sacrum è un B&B nel centro storico di Ascoli Piceno. Il soggiorno è in un appartamento intero a uso esclusivo per un massimo di ${site.maxGuests} ospiti, con camera matrimoniale, soggiorno con divano letto, bagno privato e cucina attrezzata per preparare i tuoi pasti. Scopri gli `,
            {
              kind: "link",
              href: "#spazi",
              text: "spazi dell’appartamento",
            },
            ".",
          ],
        },
        capacity: {
          title: "Quante persone può ospitare Ver Sacrum?",
          content: [
            `Ver Sacrum accoglie fino a ${site.maxGuests} ospiti, con un letto matrimoniale nella camera e un divano letto nel soggiorno. Puoi indicare il numero di ospiti nella `,
            {
              kind: "link",
              href: "#contatti",
              text: "richiesta di disponibilità",
            },
            ".",
          ],
        },
        kitchen: {
          title: "Ver Sacrum dispone di una cucina?",
          content: [
            "Sì, Ver Sacrum dispone di una cucina attrezzata con piano cottura, forno e bollitore. Sono presenti anche lavatrice e asciugatrice. Puoi preparare i tuoi pasti e organizzare le giornate secondo i tuoi ritmi. Guarda le ",
            { kind: "link", href: "#spazi", text: "foto degli ambienti" },
            ".",
          ],
        },
        location: {
          title: "Dove si trova Ver Sacrum ad Ascoli Piceno?",
          content: [
            `Ver Sacrum si trova in ${site.address}, ${site.postalCode} Ascoli Piceno, nel centro storico. Nella sezione `,
            { kind: "link", href: "#ascoli", text: "Ascoli e posizione" },
            " trovi l’affaccio sui vicoli e i riferimenti per raggiungerci.",
          ],
        },
        arrival: {
          title: "Quali sono gli orari di check-in e check-out?",
          content: [
            `A Ver Sacrum: check-in ${site.checkin}; check-out ${site.checkout}. Contattaci per concordare i dettagli dell’arrivo.`,
          ],
        },
        accessibility: {
          title: "Ver Sacrum ha un ascensore?",
          content: [
            `No. Ver Sacrum si trova al primo piano, raggiungibile tramite circa ${site.accessSteps} gradini, senza ascensore. Se hai esigenze specifiche, confrontiamoci prima della prenotazione.`,
          ],
        },
        parking: {
          title: "Dove posso parcheggiare per soggiornare a Ver Sacrum?",
          content: [
            `Per scaricare le valigie a Ver Sacrum potete utilizzare i posti di carico e scarico in Piazza Roma, a circa ${site.parking.unloadingMetres} metri dall’appartamento. Per soste più lunghe sono disponibili i parcheggi a raso a pagamento in zona Tribunale (Piazza Serafino Orlini, tariffa oraria) e in Via delle Rimembranze (ticket periodico di ${site.parking.dailyEuros} € al giorno). In alternativa, il parcheggio privato di Porta Torricella, con accesso a sbarre, dista circa ${site.parking.privateMetres} metri. I parcheggi gratuiti si trovano a circa ${site.parking.freeMetres} metri, in zona Porta Romana, lungo Viale Treviri e Via Oberdan.`,
          ],
        },
        pets: {
          title: "Sono ammessi animali a Ver Sacrum?",
          content: ["Sì, a Ver Sacrum sono ammessi animali di piccola taglia."],
        },
        request: {
          title: "Come posso richiedere disponibilità a Ver Sacrum?",
          content: [
            "Per conoscere la disponibilità di Ver Sacrum, indica date e numero di ospiti nel ",
            {
              kind: "link",
              href: "#booking-form",
              text: "modulo di richiesta",
            },
            `. Il pulsante apre un’email precompilata che devi inviare dal tuo programma di posta; il sito non la invia automaticamente. Puoi anche scrivere a ${site.email} o su WhatsApp. La richiesta non è una prenotazione confermata: date e condizioni saranno concordate nella risposta.`,
          ],
        },
      },
    },
    contact: {
      eyebrow: "05 / CI VEDIAMO AD ASCOLI",
      line1: "Il tuo prossimo",
      line2: "piccolo viaggio.",
      intro:
        "Raccontaci quando vorresti arrivare e con chi. Da qui comincia il tuo soggiorno a Ver Sacrum.",
      options:
        "Compila il modulo qui sotto oppure scrivici direttamente via email o WhatsApp.",
      direct: "UN CONTATTO DIRETTO",
      email: "Scrivici via email",
      whatsapp: "Scrivici su WhatsApp",
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
  location: {
    metaTitle: "Dove siamo e parcheggi ad Ascoli Piceno | Ver Sacrum B&B",
    metaDescription:
      "Come arrivare a Ver Sacrum B&B nel centro storico di Ascoli Piceno: indirizzo, parcheggi, scarico bagagli e accesso vicino a Piazza del Popolo.",
    eyebrow: "VER SACRUM B&B · ASCOLI PICENO",
    title: "Nel centro storico di Ascoli Piceno.",
    intro:
      "Dormire in centro significa uscire di casa e iniziare la visita a piedi. Qui trovi la posizione di Ver Sacrum e le informazioni pratiche per organizzare l’arrivo.",
    homeLink: "Ver Sacrum B&B in centro",
    breadcrumbLabel: "Percorso di navigazione",
    guideLink: "Posizione, parcheggi e Ascoli a piedi",
    parkingLink: "La guida ai parcheggi e all’arrivo",
    position: {
      title: "Dove si trova Ver Sacrum B&B",
      paragraphs: [
        `Ver Sacrum B&B si trova in ${site.address}, ${site.postalCode} Ascoli Piceno, a pochi passi da Piazza del Popolo. L’appartamento a uso esclusivo è nel centro storico, tra vicoli e facciate in travertino.`,
        `La casa è riservata a un massimo di ${site.maxGuests} ospiti e comprende camera matrimoniale, soggiorno con divano letto, cucina attrezzata e bagno privato. È una base per un weekend in coppia, un viaggio in famiglia o un soggiorno più lungo.`,
      ],
    },
    parking: {
      title: "Dove parcheggiare ad Ascoli Piceno",
      intro:
        "L’alloggio è nel centro storico. Per l’arrivo in auto, distingui una breve sosta per i bagagli dal parcheggio per tutta la durata del soggiorno.",
      unloading: {
        title: "Scaricare i bagagli in Piazza Roma",
        text: `I posti di carico e scarico in Piazza Roma sono a circa ${site.parking.unloadingMetres} metri dall’appartamento. Sono il riferimento per una breve sosta con le valigie, nel rispetto della segnaletica e degli orari indicati.`,
      },
      paid: {
        title: "Parcheggi a pagamento",
        text: `In zona Tribunale, in Piazza Serafino Orlini, trovi parcheggi a raso con tariffa oraria. In Via delle Rimembranze è disponibile un ticket giornaliero di ${site.parking.dailyEuros} €. Il parcheggio privato di Porta Torricella, con accesso a sbarre, dista circa ${site.parking.privateMetres} metri.`,
      },
      free: {
        title: "Parcheggi gratuiti verso Porta Romana",
        text: `Le aree di parcheggio gratuite sono a circa ${site.parking.freeMetres} metri, in zona Porta Romana, lungo Viale Treviri e Via Oberdan. Da lì puoi proseguire a piedi verso l’appartamento.`,
      },
      note: "Prima di entrare nei vicoli o lasciare l’auto, controlla sul posto segnaletica, ZTL, disponibilità e tariffe. Se hai dubbi sull’arrivo, scrivici prima del viaggio.",
    },
    access: {
      title: "Arrivo, scale e accessibilità",
      paragraphs: [
        `L’appartamento è al primo piano, raggiungibile con circa ${site.accessSteps} gradini, senza ascensore. Se viaggi con un passeggino, bagagli ingombranti o hai esigenze di mobilità, contattaci per valutare l’accesso prima di prenotare.`,
        `Check-in: ${site.checkin}. Check-out: ${site.checkout}. Scrivici per concordare i dettagli del tuo arrivo.`,
      ],
    },
    visit: {
      title: "Cosa vedere nel centro di Ascoli Piceno",
      sourceLabel: "Visit Ascoli: il portale turistico del Comune",
      paragraphs: [
        "Puoi iniziare da Piazza del Popolo, con il Palazzo dei Capitani, la chiesa di San Francesco e il Caffè Meletti. Continua verso Piazza Arringo, dove trovi la Cattedrale di Sant’Emidio e il Palazzo dell’Arengo.",
        "Una passeggiata tra questi luoghi lascia spazio a botteghe, olive ascolane e soste nei caffè. Al rientro, hai la tua cucina e gli spazi di Ver Sacrum a disposizione, con i ritmi di una casa tutta tua.",
      ],
    },
    contact: {
      title: "Organizziamo il tuo soggiorno",
      text: "Indica le date e il numero di ospiti: ti risponderemo con disponibilità e dettagli dell’alloggio. Puoi aggiungere domande su parcheggio e accesso.",
    },
  },
  privacy: {
    metaTitle: "Privacy e cookie | Ver Sacrum B&B",
    metaDescription:
      "Informazioni sul trattamento dei dati delle richieste e sui cookie di Ver Sacrum.",
    eyebrow: "VER SACRUM · INFORMAZIONI SUI DATI",
    title: "Privacy e cookie",
    updated: `Ultimo aggiornamento: ${formatUpdated("it")}.`,
    authority: "",
    intro:
      "Questa informativa riguarda la visita al sito di Ver Sacrum e le richieste di informazioni o disponibilità. Le informazioni specifiche sui trattamenti necessari a una prenotazione e al soggiorno saranno fornite prima della relativa raccolta dei dati.",
    sections: {
      titolare: {
        title: "1. Chi tratta i dati",
        blocks: [
          {
            kind: "paragraph",
            content: [
              "Il titolare del trattamento è ",
              { kind: "strong", text: `${privacy.controller}` },
              `, con indirizzo di riferimento ${privacy.address}. Per domande sulla privacy o per esercitare i tuoi diritti puoi scrivere a `,
              {
                kind: "link",
                href: `mailto:${privacy.contact}`,
                text: `${privacy.contact}`,
              },
              ".",
            ],
          },
        ],
      },
      richieste: {
        title: "2. Richieste di disponibilità e contatti",
        blocks: [
          {
            kind: "paragraph",
            content: [
              "Il modulo raccoglie nome, email, date di arrivo e partenza, numero di ospiti ed eventuale messaggio. La compilazione e la preparazione della richiesta avvengono nel browser: il sito non salva questi campi in un proprio database e non li trasmette con una chiamata a un servizio di invio.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "“Invia la richiesta” apre un’email precompilata nel tuo programma di posta. Solo inviandola da quel programma la richiesta viene trasmessa alla casella ",
              {
                kind: "link",
                href: `mailto:${site.email}`,
                text: `${site.email}`,
              },
              ". Il programma di posta può conservare la bozza secondo le sue impostazioni. Se ci contatti telefonicamente o su WhatsApp, trattiamo il numero e le informazioni che scegli di comunicarci per risponderti.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "La finalità è rispondere alle domande e gestire la richiesta di soggiorno. La base giuridica è l’esecuzione di misure precontrattuali richieste dall’interessato (art. 6, par. 1, lett. b del GDPR). Non serve accettare Analytics per contattarci.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "Il conferimento è facoltativo; senza i dati necessari non possiamo rispondere o verificare la disponibilità. Il messaggio libero è facoltativo: evita di includere documenti, dati di pagamento o informazioni sanitarie.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              { kind: "strong", text: "Conservazione:" },
              ` ${privacy.requestRetentionDays} giorni dalla chiusura della conversazione, per le richieste che non diventano prenotazioni. La cancellazione riguarda le email e i dati della richiesta gestiti dalla struttura; non cancella le copie nella tua casella. Le richieste che diventano prenotazioni seguono tempi e obblighi distinti, illustrati nell’informativa relativa al soggiorno.`,
            ],
          },
        ],
      },
      navigazione: {
        title: "3. Navigazione e sicurezza",
        blocks: [
          {
            kind: "paragraph",
            content: [
              "Il sito è ospitato su GitHub Pages, servizio di GitHub, Inc. Per fornire le pagine e proteggere il servizio, l’infrastruttura può trattare indirizzo IP, data e ora della richiesta, risorse richieste, dati del browser e informazioni tecniche del dispositivo.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "La finalità è consentire la navigazione e mantenere sicurezza e funzionamento del sito; la base giuridica è il legittimo interesse a rendere disponibile e proteggere il servizio (art. 6, par. 1, lett. f del GDPR). La struttura non gestisce un archivio applicativo dei log di navigazione. GitHub conserva i dati tecnici secondo le necessità descritte nella ",
              {
                kind: "link",
                href: "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement",
                text: "propria informativa",
              },
              ".",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "Font e immagini sono serviti insieme al sito. Mappe, Booking, Airbnb e WhatsApp sono collegamenti esterni: i relativi servizi non vengono incorporati o caricati automaticamente.",
            ],
          },
        ],
      },
      cookie: {
        title: "4. Cookie e Google Analytics",
        blocks: [
          {
            kind: "paragraph",
            content: [
              "Usiamo Google Analytics 4 per misurare le visite e capire come viene utilizzato il sito, solo dopo la tua accettazione. La base giuridica è il consenso (art. 6, par. 1, lett. a del GDPR). Prima della scelta e in caso di rifiuto il codice del sito non carica il tag e non invia richieste ad Analytics.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "Dopo l’accettazione Google può trattare identificatori dei cookie, informazioni su browser e dispositivo, pagine visitate, orari e interazioni, secondo le opzioni attive nella proprietà Analytics. L’indirizzo IP è coinvolto nella comunicazione con i server Google. Questi dati non vanno considerati automaticamente anonimi.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "Il codice del sito non invia ad Analytics i valori inseriti nel modulo. I segnali pubblicitari sono disabilitati e i consensi per pubblicità e personalizzazione restano negati. L’URL comunicato viene privato di query string e frammento.",
            ],
          },
          {
            kind: "storage",
            items: [
              {
                term: ["Preferenza privacy nel browser"],
                description: [
                  { kind: "code", text: "ver-sacrum.analytics-consent.v2" },
                  ", in localStorage: memorizza scelta e scadenza senza trasmetterle autonomamente a un server. L’accettazione vale sei mesi; il rifiuto resta valido finché cambi scelta o cancelli i dati del sito.",
                ],
              },
              {
                term: ["Cookie ", { kind: "code", text: "_ga" }],
                description: [
                  `Cookie statistico di Google Analytics per distinguere i browser. Il sito imposta una durata di ${privacy.cookieDays} giorni, senza rinnovo automatico a ogni visita.`,
                ],
              },
              {
                term: [
                  "Cookie ",
                  {
                    kind: "code",
                    text: `${`_ga_${analytics.measurementId.slice(2)}`}`,
                  },
                ],
                description: [
                  `Cookie statistico di Google Analytics per mantenere lo stato della sessione. Il sito imposta una durata di ${privacy.cookieDays} giorni, senza rinnovo automatico a ogni visita; il browser può applicare limiti più brevi.`,
                ],
              },
            ],
          },
          {
            kind: "paragraph",
            content: [
              { kind: "strong", text: "Conservazione sui server Analytics:" },
              ` ${privacy.eventRetentionMonths} mesi per i dati degli eventi e ${privacy.userRetentionMonths} mesi per i dati utente; il periodo dei dati utente viene reimpostato in caso di nuova attività. La durata dei cookie nel browser è distinta dalla conservazione dei dati sui server. I rapporti aggregati seguono regole diverse dalla conservazione dei dati dei singoli utenti ed eventi.`,
            ],
          },
          {
            kind: "paragraph",
            content: [
              "Puoi rifiutare o accettare Analytics, continuare a navigare senza scegliere e riaprire “Preferenze cookie” in fondo a ogni pagina. Scorrere o navigare non equivale ad accettare. La revoca disabilita Analytics ed elimina i cookie accessibili senza ricaricare la pagina né cancellare i dati del modulo; non pregiudica la liceità dei trattamenti già effettuati.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "Se il browser impedisce il salvataggio della scelta, questa vale per la pagina corrente. Puoi eliminare i dati del sito dalle impostazioni del browser. Senza JavaScript Analytics non viene caricato.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "Informazioni del fornitore: ",
              {
                kind: "link",
                href: "https://policies.google.com/privacy?hl=it",
                text: "privacy di Google",
              },
              " e ",
              {
                kind: "link",
                href: "https://support.google.com/analytics/answer/11397207?hl=it",
                text: "cookie di Google Analytics",
              },
              ".",
            ],
          },
        ],
      },
      destinatari: {
        title: "5. Destinatari e trasferimenti",
        blocks: [
          {
            kind: "paragraph",
            content: [
              "I dati delle richieste sono utilizzati dal titolare e dalle persone autorizzate a gestirle. La casella di destinazione utilizza Gmail; i servizi Google e l’hosting GitHub trattano dati nell’ambito dei rispettivi servizi e ruoli. I dati possono inoltre essere comunicati alle autorità quando previsto dalla legge.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "I fornitori possono trattare dati fuori dallo Spazio economico europeo, anche negli Stati Uniti. Le garanzie applicabili comprendono, nei casi previsti, decisioni di adeguatezza e clausole contrattuali standard. I dettagli sono disponibili nelle ",
              {
                kind: "link",
                href: "https://policies.google.com/privacy/frameworks?hl=it",
                text: "informazioni Google sui trasferimenti",
              },
              " e nell’",
              {
                kind: "link",
                href: "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement",
                text: "informativa GitHub",
              },
              "; puoi chiedere al titolare informazioni e copia delle garanzie pertinenti.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "Se segui un collegamento a Google Maps, Booking, Airbnb o WhatsApp, il trattamento svolto dal servizio esterno è descritto nella sua informativa. Questo documento riguarda il sito Ver Sacrum.",
            ],
          },
        ],
      },
      diritti: {
        title: "6. I tuoi diritti",
        blocks: [
          {
            kind: "paragraph",
            content: [
              "Nei casi previsti dal GDPR puoi chiedere accesso ai dati, rettifica, cancellazione, limitazione del trattamento e portabilità. Puoi opporti ai trattamenti fondati sul legittimo interesse per motivi legati alla tua situazione e revocare il consenso ad Analytics in ogni momento.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "Per esercitare i diritti scrivi a ",
              {
                kind: "link",
                href: `mailto:${privacy.contact}`,
                text: `${privacy.contact}`,
              },
              ". Puoi presentare reclamo al ",
              {
                kind: "link",
                href: "https://www.garanteprivacy.it/",
                text: "Garante per la protezione dei dati personali",
              },
              " o all’autorità competente nel tuo paese. Il sito non prende decisioni esclusivamente automatizzate che producano effetti giuridici o analogamente significativi sull’ospite.",
            ],
          },
        ],
      },
    },
    back: "Torna a Ver Sacrum",
  },
  dynamic: {
    configuredNotice:
      "Il pulsante apre un’email precompilata: controllala e inviala dal tuo programma di posta. Il sito non invia la richiesta automaticamente.",
    unavailable: "L’invio non è ancora disponibile. Usa i contatti diretti.",
    arrivalError: "Scegli una data di arrivo da oggi in poi.",
    departureError: "La partenza deve essere successiva all’arrivo.",
    emailGreeting: "Buongiorno, vorrei chiedere disponibilità per Ver Sacrum.",
    emailLabels: ["Nome", "Email", "Arrivo", "Partenza", "Ospiti"],
    emailSubject: "Richiesta di disponibilità — Ver Sacrum B&B",
    prepared:
      "Email preparata, ancora da inviare dal tuo programma di posta. Se non si apre, ",
    openEmail: "apri l’email precompilata",
    direct: " oppure usa i contatti diretti.",
    consentAccepted: "Scelta attuale: Analytics accettato.",
    consentRejected: "Scelta attuale: Analytics rifiutato.",
    consentOff: "Analytics è disattivato finché non accetti.",
  },
  consent: {
    title: "Statistiche del sito",
    description:
      "Con il tuo consenso usiamo Google Analytics e i suoi cookie per capire come viene visitato il sito. Puoi rifiutare e continuare a navigare, oppure cambiare scelta da “Preferenze cookie” in fondo alla pagina.",
    privacyLink: "Leggi l’informativa privacy e cookie",
    reject: "Rifiuta Analytics",
    accept: "Accetta Analytics",
  },
  photoAlt: {
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
} satisfies Catalog;
