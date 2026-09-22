import { privacy } from "../privacy.config.ts";
import { site } from "../site.config.ts";
import type { Locale } from "../types.ts";

type PrivacySection = {
  id: string;
  title: string;
  paragraphs: string[];
  storage?: string[][];
};

type TranslatedLocale = Exclude<Locale, "it">;
type TranslatedSeed = Omit<PrivacyCopy, "sections"> & {
  titles: string[];
  paragraphs: string[][];
};

export type PrivacyCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  updated: string;
  authority: string;
  intro: string;
  sections: PrivacySection[];
  back: string;
};

const providerLinks = (
  locale: Locale,
  googleLabel: string,
  cookieLabel: string,
) =>
  `<a href="https://policies.google.com/privacy?hl=${locale}">${googleLabel}</a> ${{ it: "e", en: "and", fr: "et", es: "y", de: "und" }[locale]} <a href="https://support.google.com/analytics/answer/11397207?hl=${locale}">${cookieLabel}</a>`;
const githubLink = (label: string) =>
  `<a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">${label}</a>`;

const italianPrivacy = {
  it: {
    metaTitle: "Privacy e cookie | Ver Sacrum",
    metaDescription:
      "Informazioni sul trattamento dei dati delle richieste e sui cookie di Ver Sacrum.",
    eyebrow: "VER SACRUM · INFORMAZIONI SUI DATI",
    title: "Privacy e cookie",
    updated: `Ultimo aggiornamento: ${privacy.updated}.`,
    authority: "",
    intro:
      "Questa informativa riguarda la visita al sito di Ver Sacrum e le richieste di informazioni o disponibilità. Le informazioni specifiche sui trattamenti necessari a una prenotazione e al soggiorno saranno fornite prima della relativa raccolta dei dati.",
    sections: [
      {
        id: "titolare",
        title: "1. Chi tratta i dati",
        paragraphs: [
          `Il titolare del trattamento è <strong>${privacy.controller}</strong>, con indirizzo di riferimento ${privacy.address}. Per domande sulla privacy o per esercitare i tuoi diritti puoi scrivere a <a href="mailto:${privacy.contact}">${privacy.contact}</a>.`,
        ],
      },
      {
        id: "richieste",
        title: "2. Richieste di disponibilità e contatti",
        paragraphs: [
          "Il modulo raccoglie nome, email, date di arrivo e partenza, numero di ospiti ed eventuale messaggio. La compilazione e la preparazione della richiesta avvengono nel browser: il sito non salva questi campi in un proprio database e non li trasmette con una chiamata a un servizio di invio.",
          `“Invia la richiesta” apre un’email precompilata nel tuo programma di posta. Solo inviandola da quel programma la richiesta viene trasmessa alla casella <a href="mailto:${site.email}">${site.email}</a>. Il programma di posta può conservare la bozza secondo le sue impostazioni. Se ci contatti telefonicamente, trattiamo il numero e le informazioni che scegli di comunicarci per risponderti.`,
          "La finalità è rispondere alle domande e gestire la richiesta di soggiorno. La base giuridica è l’esecuzione di misure precontrattuali richieste dall’interessato (art. 6, par. 1, lett. b del GDPR). Non serve accettare Analytics per contattarci.",
          "Il conferimento è facoltativo; senza i dati necessari non possiamo rispondere o verificare la disponibilità. Il messaggio libero è facoltativo: evita di includere documenti, dati di pagamento o informazioni sanitarie.",
          `<strong>Conservazione:</strong> ${privacy.requestRetention}. La cancellazione riguarda le email e i dati della richiesta gestiti dalla struttura; non cancella le copie nella tua casella. Le richieste che diventano prenotazioni seguono tempi e obblighi distinti, illustrati nell’informativa relativa al soggiorno.`,
        ],
      },
      {
        id: "navigazione",
        title: "3. Navigazione e sicurezza",
        paragraphs: [
          "Il sito è ospitato su GitHub Pages, servizio di GitHub, Inc. Per fornire le pagine e proteggere il servizio, l’infrastruttura può trattare indirizzo IP, data e ora della richiesta, risorse richieste, dati del browser e informazioni tecniche del dispositivo.",
          `La finalità è consentire la navigazione e mantenere sicurezza e funzionamento del sito; la base giuridica è il legittimo interesse a rendere disponibile e proteggere il servizio (art. 6, par. 1, lett. f del GDPR). La struttura non gestisce un archivio applicativo dei log di navigazione. GitHub conserva i dati tecnici secondo le necessità descritte nella ${githubLink("propria informativa")}.`,
          "Font e immagini sono serviti insieme al sito. Mappe, Booking e Airbnb sono collegamenti esterni: i relativi servizi non vengono incorporati o caricati automaticamente.",
        ],
      },
      {
        id: "cookie",
        title: "4. Cookie e Google Analytics",
        paragraphs: [
          "Usiamo Google Analytics 4 per misurare le visite e capire come viene utilizzato il sito, solo dopo la tua accettazione. La base giuridica è il consenso (art. 6, par. 1, lett. a del GDPR). Prima della scelta e in caso di rifiuto il codice del sito non carica il tag e non invia richieste ad Analytics.",
          "Dopo l’accettazione Google può trattare identificatori dei cookie, informazioni su browser e dispositivo, pagine visitate, orari e interazioni, secondo le opzioni attive nella proprietà Analytics. L’indirizzo IP è coinvolto nella comunicazione con i server Google. Questi dati non vanno considerati automaticamente anonimi.",
          "Il codice del sito non invia ad Analytics i valori inseriti nel modulo. I segnali pubblicitari sono disabilitati e i consensi per pubblicità e personalizzazione restano negati. L’URL comunicato viene privato di query string e frammento.",
          `<strong>Conservazione sui server Analytics:</strong> ${privacy.analyticsRetention}. La durata dei cookie nel browser è distinta dalla conservazione dei dati sui server. I rapporti aggregati seguono regole diverse dalla conservazione dei dati dei singoli utenti ed eventi.`,
          "Puoi rifiutare o accettare Analytics, continuare a navigare senza scegliere e riaprire “Preferenze cookie” in fondo a ogni pagina. Scorrere o navigare non equivale ad accettare. La revoca disabilita Analytics ed elimina i cookie accessibili senza ricaricare la pagina né cancellare i dati del modulo; non pregiudica la liceità dei trattamenti già effettuati.",
          "Se il browser impedisce il salvataggio della scelta, questa vale per la pagina corrente. Puoi eliminare i dati del sito dalle impostazioni del browser. Senza JavaScript Analytics non viene caricato.",
          `Informazioni del fornitore: ${providerLinks("it", "privacy di Google", "cookie di Google Analytics")}.`,
        ],
        storage: [
          [
            "Preferenza privacy nel browser",
            "<code>ver-sacrum.analytics-consent.v2</code>, in localStorage: memorizza scelta e scadenza senza trasmetterle autonomamente a un server. L’accettazione vale sei mesi; il rifiuto resta valido finché cambi scelta o cancelli i dati del sito.",
          ],
          [
            "Cookie <code>_ga</code>",
            "Cookie statistico di Google Analytics per distinguere i browser. Il sito imposta una durata di 180 giorni, senza rinnovo automatico a ogni visita.",
          ],
          [
            "Cookie <code>_ga_3S75NJZ588</code>",
            "Cookie statistico di Google Analytics per mantenere lo stato della sessione. Il sito imposta una durata di 180 giorni, senza rinnovo automatico a ogni visita; il browser può applicare limiti più brevi.",
          ],
        ],
      },
      {
        id: "destinatari",
        title: "5. Destinatari e trasferimenti",
        paragraphs: [
          "I dati delle richieste sono utilizzati dal titolare e dalle persone autorizzate a gestirle. La casella di destinazione utilizza Gmail; i servizi Google e l’hosting GitHub trattano dati nell’ambito dei rispettivi servizi e ruoli. I dati possono inoltre essere comunicati alle autorità quando previsto dalla legge.",
          `I fornitori possono trattare dati fuori dallo Spazio economico europeo, anche negli Stati Uniti. Le garanzie applicabili comprendono, nei casi previsti, decisioni di adeguatezza e clausole contrattuali standard. I dettagli sono disponibili nelle <a href="https://policies.google.com/privacy/frameworks?hl=it">informazioni Google sui trasferimenti</a> e nell’${githubLink("informativa GitHub")}; puoi chiedere al titolare informazioni e copia delle garanzie pertinenti.`,
          "Se segui un collegamento a Google Maps, Booking o Airbnb, il trattamento svolto dal servizio esterno è descritto nella sua informativa. Questo documento riguarda il sito Ver Sacrum.",
        ],
      },
      {
        id: "diritti",
        title: "6. I tuoi diritti",
        paragraphs: [
          "Nei casi previsti dal GDPR puoi chiedere accesso ai dati, rettifica, cancellazione, limitazione del trattamento e portabilità. Puoi opporti ai trattamenti fondati sul legittimo interesse per motivi legati alla tua situazione e revocare il consenso ad Analytics in ogni momento.",
          `Per esercitare i diritti scrivi a <a href="mailto:${privacy.contact}">${privacy.contact}</a>. Puoi presentare reclamo al <a href="https://www.garanteprivacy.it/">Garante per la protezione dei dati personali</a> o all’autorità competente nel tuo paese. Il sito non prende decisioni esclusivamente automatizzate che producano effetti giuridici o analogamente significativi sull’ospite.`,
        ],
      },
    ],
    back: "Torna a Ver Sacrum",
  },
};

const translated: Partial<Record<TranslatedLocale, TranslatedSeed>> = {
  en: {
    metaTitle: "Privacy and cookies | Ver Sacrum",
    metaDescription:
      "Information about how Ver Sacrum processes enquiry data and uses cookies.",
    eyebrow: "VER SACRUM · DATA INFORMATION",
    title: "Privacy and cookies",
    updated: "Last updated: 20 September 2026.",
    authority:
      "This translation is provided for information. If it differs from the Italian version, the Italian text prevails.",
    intro:
      "This notice covers visits to the Ver Sacrum website and requests for information or availability. Specific information about processing required for a booking and stay will be provided before those data are collected.",
    titles: [
      "1. Who processes the data",
      "2. Availability requests and contact",
      "3. Browsing and security",
      "4. Cookies and Google Analytics",
      "5. Recipients and international transfers",
      "6. Your rights",
    ],
    paragraphs: [
      [
        `The data controller is <strong>${privacy.controller}</strong>, whose contact address is ${privacy.address}. For privacy questions or to exercise your rights, email <a href="mailto:${privacy.contact}">${privacy.contact}</a>.`,
      ],
      [
        "The form collects your name, email address, arrival and departure dates, number of guests and any message. The form and prepared request remain in your browser: this website does not save the fields in its own database or transmit them to a sending service.",
        `“Send request” opens a prepared email in your email application. The request reaches <a href="mailto:${site.email}">${site.email}</a> only when you send it there. Your email application may retain the draft. If you call us, we process your number and the information you choose to provide in order to reply.`,
        "We process these data to answer questions and manage your stay request, under steps taken at your request before entering into a contract (Article 6(1)(b) GDPR). You do not need to accept Analytics to contact us.",
        "Providing data is optional, but without the necessary information we cannot reply or check availability. The free-text message is optional; do not include identity documents, payment details or health information.",
        `<strong>Retention:</strong> 30 days after the conversation is closed for requests that do not become bookings. Deletion covers emails and request data managed by the accommodation, not copies in your mailbox. Requests that become bookings follow separate periods and obligations explained in the stay notice.`,
      ],
      [
        "The website is hosted on GitHub Pages, a service provided by GitHub, Inc. To deliver and protect the website, the infrastructure may process IP address, request date and time, requested resources, browser data and technical device information.",
        `The purpose is to provide, secure and maintain the website, based on the legitimate interest in making the service available and protecting it (Article 6(1)(f) GDPR). Ver Sacrum does not maintain an application log archive. GitHub retains technical data as described in ${githubLink("its privacy statement")}.`,
        "Fonts and images are served with the website. Maps, Booking and Airbnb are external links; those services are not embedded or loaded automatically.",
      ],
      [
        "We use Google Analytics 4 to measure visits and understand use of the website, only after you accept. Processing is based on consent (Article 6(1)(a) GDPR). Before a choice, and after a refusal, the website does not load the tag or send Analytics requests.",
        "After acceptance, Google may process cookie identifiers, browser and device information, visited pages, times and interactions under the property’s active settings. The IP address is involved in communication with Google’s servers; these data must not automatically be regarded as anonymous.",
        "The website does not send form values to Analytics. Advertising signals are disabled, advertising and personalisation consent remains denied, and query strings and fragments are removed from the reported page URL.",
        `<strong>Analytics server retention:</strong> event data for 2 months and user data for 14 months, with the user-data period reset on new activity. Browser cookie duration is separate from server retention.`,
        "You may accept, decline or make no choice, and reopen Cookie preferences on every page. Scrolling does not constitute consent. Withdrawal disables Analytics and removes accessible Analytics cookies without reloading or clearing the form; it does not affect the lawfulness of earlier processing.",
        "If the browser blocks storage, the choice applies to the current page. You can delete site data in browser settings. Analytics is not loaded without JavaScript.",
        `Provider information: ${providerLinks("en", "Google Privacy Policy", "Google Analytics cookies")}.`,
      ],
      [
        "Request data are used by the controller and authorised people who manage them. The destination mailbox uses Gmail; Google services and GitHub hosting process data within their respective services and roles. Data may be disclosed to authorities where required by law.",
        `Providers may process data outside the European Economic Area, including in the United States. Applicable safeguards may include adequacy decisions and standard contractual clauses. See <a href="https://policies.google.com/privacy/frameworks?hl=en">Google’s transfer information</a> and ${githubLink("GitHub’s privacy statement")}; you may ask the controller for information and a copy of relevant safeguards.`,
        "If you follow a link to Google Maps, Booking or Airbnb, that external service’s notice governs its processing. This notice concerns the Ver Sacrum website.",
      ],
      [
        "Where provided by the GDPR, you may request access, rectification, erasure, restriction and portability. You may object to processing based on legitimate interests for reasons relating to your situation and withdraw Analytics consent at any time.",
        `To exercise your rights, email <a href="mailto:${privacy.contact}">${privacy.contact}</a>. You may complain to the Italian <a href="https://www.garanteprivacy.it/">Data Protection Authority</a> or the competent authority in your country. The website does not make solely automated decisions producing legal or similarly significant effects.`,
      ],
    ],
    back: "Back to Ver Sacrum",
  },
  fr: {
    metaTitle: "Confidentialité et cookies | Ver Sacrum",
    metaDescription:
      "Informations sur le traitement des demandes et les cookies de Ver Sacrum.",
    eyebrow: "VER SACRUM · INFORMATIONS SUR LES DONNÉES",
    title: "Confidentialité et cookies",
    updated: "Dernière mise à jour : 20 septembre 2026.",
    authority:
      "Cette traduction est fournie à titre informatif. En cas de divergence, le texte italien prévaut.",
    intro:
      "Cette notice concerne la visite du site Ver Sacrum et les demandes d’information ou de disponibilité. Les traitements nécessaires à une réservation et au séjour feront l’objet d’une information spécifique avant la collecte.",
    titles: [
      "1. Responsable du traitement",
      "2. Demandes de disponibilité et contacts",
      "3. Navigation et sécurité",
      "4. Cookies et Google Analytics",
      "5. Destinataires et transferts",
      "6. Vos droits",
    ],
    paragraphs: [
      [
        `Le responsable du traitement est <strong>${privacy.controller}</strong>, à l’adresse ${privacy.address}. Pour toute question ou pour exercer vos droits, écrivez à <a href="mailto:${privacy.contact}">${privacy.contact}</a>.`,
      ],
      [
        "Le formulaire recueille le nom, l’adresse e-mail, les dates d’arrivée et de départ, le nombre de voyageurs et un éventuel message. La saisie et la préparation de la demande ont lieu dans votre navigateur : le site ne conserve pas ces champs dans une base de données et ne les transmet pas à un service d’envoi.",
        `« Envoyer la demande » ouvre un e-mail préparé dans votre messagerie. La demande n’est transmise à <a href="mailto:${site.email}">${site.email}</a> que lorsque vous l’envoyez. Votre messagerie peut conserver le brouillon. En cas de contact téléphonique, nous traitons votre numéro et les informations communiquées afin de vous répondre.`,
        "La finalité est de répondre et de gérer votre demande de séjour, sur la base des mesures précontractuelles prises à votre demande (art. 6, par. 1, b du RGPD). Accepter Analytics n’est pas nécessaire pour nous contacter.",
        "La fourniture des données est facultative, mais sans les éléments nécessaires nous ne pouvons pas répondre ni vérifier les disponibilités. N’indiquez pas de documents, données de paiement ou informations de santé.",
        "<strong>Conservation :</strong> 30 jours après la clôture de la conversation pour les demandes sans réservation. La suppression concerne les données gérées par l’hébergement, pas les copies de votre messagerie. Les réservations suivent des durées et obligations distinctes.",
      ],
      [
        "Le site est hébergé sur GitHub Pages, service de GitHub, Inc. Pour fournir et protéger le site, l’infrastructure peut traiter l’adresse IP, la date et l’heure, les ressources demandées ainsi que des données sur le navigateur et l’appareil.",
        `La finalité est d’assurer navigation, sécurité et fonctionnement, sur la base de l’intérêt légitime à fournir et protéger le service (art. 6, par. 1, f du RGPD). Ver Sacrum ne tient pas d’archive applicative des journaux. GitHub conserve les données techniques selon ${githubLink("sa déclaration de confidentialité")}.`,
        "Les polices et images sont servies avec le site. Maps, Booking et Airbnb sont des liens externes et ne sont pas chargés automatiquement.",
      ],
      [
        "Nous utilisons Google Analytics 4 pour mesurer les visites, uniquement après votre acceptation, sur la base du consentement (art. 6, par. 1, a du RGPD). Avant votre choix ou en cas de refus, le tag n’est pas chargé.",
        "Après acceptation, Google peut traiter des identifiants de cookies, des données sur le navigateur et l’appareil, les pages, horaires et interactions. L’adresse IP intervient dans la communication avec Google ; ces données ne sont pas automatiquement anonymes.",
        "Les valeurs du formulaire ne sont pas envoyées à Analytics. Les signaux publicitaires sont désactivés, les consentements publicitaires restent refusés et l’URL transmise est privée de requête et de fragment.",
        "<strong>Conservation Analytics :</strong> 2 mois pour les événements et 14 mois pour les données utilisateur, période réinitialisée en cas de nouvelle activité. La durée des cookies est distincte.",
        "Vous pouvez accepter, refuser ou ne pas choisir, puis rouvrir les Préférences de cookies. Le défilement ne vaut pas consentement. Le retrait désactive Analytics et supprime les cookies accessibles sans recharger ni effacer le formulaire.",
        "Si le stockage est bloqué, le choix vaut pour la page courante. Vous pouvez supprimer les données du site dans le navigateur. Sans JavaScript, Analytics n’est pas chargé.",
        `Informations du fournisseur : ${providerLinks("fr", "règles de confidentialité de Google", "cookies Google Analytics")}.`,
      ],
      [
        "Les données des demandes sont utilisées par le responsable et les personnes autorisées. La boîte de destination utilise Gmail ; Google et GitHub traitent des données dans le cadre de leurs services et rôles. Les données peuvent être communiquées aux autorités lorsque la loi l’exige.",
        `Des traitements peuvent avoir lieu hors de l’EEE, notamment aux États-Unis, avec les garanties applicables telles que décisions d’adéquation et clauses contractuelles types. Consultez les <a href="https://policies.google.com/privacy/frameworks?hl=fr">informations Google</a> et ${githubLink("la déclaration GitHub")}.`,
        "Les traitements de Google Maps, Booking ou Airbnb sont régis par leurs propres notices. Ce document concerne le site Ver Sacrum.",
      ],
      [
        "Dans les cas prévus par le RGPD, vous pouvez demander accès, rectification, effacement, limitation et portabilité, vous opposer aux traitements fondés sur l’intérêt légitime et retirer le consentement Analytics.",
        `Écrivez à <a href="mailto:${privacy.contact}">${privacy.contact}</a>. Vous pouvez saisir le <a href="https://www.garanteprivacy.it/">Garante italien</a> ou l’autorité compétente de votre pays. Le site ne prend aucune décision exclusivement automatisée produisant des effets juridiques ou similaires.`,
      ],
    ],
    back: "Retour à Ver Sacrum",
  },
};

// Spanish and German retain the same legal facts and structure.
translated.es = {
  ...translated.en!,
  metaTitle: "Privacidad y cookies | Ver Sacrum",
  metaDescription:
    "Información sobre el tratamiento de solicitudes y las cookies de Ver Sacrum.",
  eyebrow: "VER SACRUM · INFORMACIÓN SOBRE DATOS",
  title: "Privacidad y cookies",
  updated: "Última actualización: 20 de septiembre de 2026.",
  authority:
    "Esta traducción se facilita a título informativo. En caso de discrepancia, prevalece el texto italiano.",
  intro:
    "Este aviso se refiere a la visita del sitio de Ver Sacrum y a las solicitudes de información o disponibilidad. El tratamiento necesario para una reserva y la estancia se explicará antes de recoger los datos correspondientes.",
  titles: [
    "1. Responsable del tratamiento",
    "2. Solicitudes de disponibilidad y contacto",
    "3. Navegación y seguridad",
    "4. Cookies y Google Analytics",
    "5. Destinatarios y transferencias",
    "6. Tus derechos",
  ],
  back: "Volver a Ver Sacrum",
};
translated.es!.paragraphs = [
  [
    `El responsable del tratamiento es <strong>${privacy.controller}</strong>, con domicilio de referencia en ${privacy.address}. Para cuestiones de privacidad o para ejercer tus derechos, escribe a <a href="mailto:${privacy.contact}">${privacy.contact}</a>.`,
  ],
  [
    "El formulario recoge nombre, correo electrónico, fechas de llegada y salida, número de huéspedes y un mensaje opcional. La cumplimentación y preparación se realizan en el navegador: el sitio no guarda estos campos en una base de datos propia ni los transmite a un servicio de envío.",
    `«Enviar la solicitud» abre un correo preparado en tu aplicación. La solicitud solo llega a <a href="mailto:${site.email}">${site.email}</a> cuando la envías. Tu aplicación puede conservar el borrador. Si llamas por teléfono, tratamos el número y la información que facilites para responder.`,
    "La finalidad es responder y gestionar la solicitud de estancia, sobre la base de medidas precontractuales solicitadas por el interesado (art. 6.1.b del RGPD). No es necesario aceptar Analytics para contactarnos.",
    "Facilitar los datos es opcional, pero sin la información necesaria no podremos responder ni comprobar la disponibilidad. No incluyas documentos, datos de pago ni información sanitaria.",
    "<strong>Conservación:</strong> 30 días desde el cierre de la conversación para solicitudes que no se conviertan en reservas. La eliminación afecta a los datos gestionados por el alojamiento, no a las copias de tu buzón. Las reservas siguen plazos y obligaciones diferentes.",
  ],
  [
    "El sitio está alojado en GitHub Pages, servicio de GitHub, Inc. Para proporcionar y proteger el sitio, la infraestructura puede tratar la dirección IP, fecha y hora, recursos solicitados y datos técnicos del navegador y dispositivo.",
    `La finalidad es permitir la navegación y mantener la seguridad y el funcionamiento, sobre la base del interés legítimo en proporcionar y proteger el servicio (art. 6.1.f del RGPD). Ver Sacrum no conserva un archivo propio de registros. GitHub conserva los datos técnicos según ${githubLink("su declaración de privacidad")}.`,
    "Las fuentes y las imágenes se sirven con el sitio. Maps, Booking y Airbnb son enlaces externos; dichos servicios no se integran ni cargan automáticamente.",
  ],
  [
    "Usamos Google Analytics 4 para medir visitas y comprender el uso del sitio, únicamente después de tu aceptación, sobre la base del consentimiento (art. 6.1.a del RGPD). Antes de elegir o si rechazas, no se carga la etiqueta ni se envían solicitudes.",
    "Tras la aceptación, Google puede tratar identificadores de cookies, información del navegador y dispositivo, páginas visitadas, horarios e interacciones. La dirección IP interviene en la comunicación con Google; estos datos no deben considerarse automáticamente anónimos.",
    "El sitio no envía a Analytics los valores del formulario. Las señales publicitarias están desactivadas, los consentimientos de publicidad y personalización siguen denegados y la URL comunicada no incluye consultas ni fragmentos.",
    "<strong>Conservación en Analytics:</strong> 2 meses para eventos y 14 meses para datos de usuario; este último plazo se reinicia con nueva actividad. La duración de las cookies del navegador es independiente.",
    "Puedes aceptar, rechazar o no elegir y volver a abrir Preferencias de cookies. Desplazarse no implica consentimiento. La retirada desactiva Analytics y elimina las cookies accesibles sin recargar ni borrar el formulario, sin afectar a la licitud del tratamiento anterior.",
    "Si el navegador bloquea el almacenamiento, la elección se aplica a la página actual. Puedes eliminar los datos del sitio desde el navegador. Sin JavaScript no se carga Analytics.",
    `Información del proveedor: ${providerLinks("es", "política de privacidad de Google", "cookies de Google Analytics")}.`,
  ],
  [
    "Los datos de las solicitudes son utilizados por el responsable y las personas autorizadas. El buzón de destino usa Gmail; Google y GitHub tratan datos dentro de sus respectivos servicios y funciones. Los datos pueden comunicarse a las autoridades cuando la ley lo exija.",
    `Los proveedores pueden tratar datos fuera del EEE, incluso en Estados Unidos. Las garantías aplicables pueden incluir decisiones de adecuación y cláusulas contractuales tipo. Consulta la <a href="https://policies.google.com/privacy/frameworks?hl=es">información de Google</a> y ${githubLink("la declaración de GitHub")}; puedes solicitar al responsable información y copia de las garantías pertinentes.`,
    "El tratamiento de Google Maps, Booking o Airbnb se rige por sus propios avisos. Este documento se refiere al sitio de Ver Sacrum.",
  ],
  [
    "En los casos previstos por el RGPD puedes solicitar acceso, rectificación, supresión, limitación y portabilidad, oponerte al tratamiento basado en intereses legítimos y retirar en cualquier momento el consentimiento para Analytics.",
    `Para ejercer tus derechos escribe a <a href="mailto:${privacy.contact}">${privacy.contact}</a>. Puedes reclamar ante el <a href="https://www.garanteprivacy.it/">Garante italiano</a> o la autoridad competente de tu país. El sitio no adopta decisiones exclusivamente automatizadas con efectos jurídicos o similares.`,
  ],
];
translated.de = {
  ...translated.en!,
  metaTitle: "Datenschutz und Cookies | Ver Sacrum",
  metaDescription:
    "Informationen zur Verarbeitung von Anfragen und zu Cookies bei Ver Sacrum.",
  eyebrow: "VER SACRUM · DATENSCHUTZHINWEISE",
  title: "Datenschutz und Cookies",
  updated: "Letzte Aktualisierung: 20. September 2026.",
  authority:
    "Diese Übersetzung dient nur der Information. Bei Abweichungen ist der italienische Text maßgeblich.",
  intro:
    "Diese Hinweise betreffen den Besuch der Website von Ver Sacrum sowie Informations- und Verfügbarkeitsanfragen. Über die für Buchung und Aufenthalt erforderliche Verarbeitung wird vor der jeweiligen Datenerhebung gesondert informiert.",
  titles: [
    "1. Verantwortlicher",
    "2. Verfügbarkeitsanfragen und Kontakt",
    "3. Nutzung und Sicherheit",
    "4. Cookies und Google Analytics",
    "5. Empfänger und Übermittlungen",
    "6. Ihre Rechte",
  ],
  back: "Zurück zu Ver Sacrum",
};
translated.de!.paragraphs = [
  [
    `Verantwortlicher ist <strong>${privacy.controller}</strong> mit Kontaktanschrift ${privacy.address}. Bei Datenschutzfragen oder zur Ausübung Ihrer Rechte schreiben Sie an <a href="mailto:${privacy.contact}">${privacy.contact}</a>.`,
  ],
  [
    "Das Formular erfasst Name, E-Mail-Adresse, An- und Abreisedatum, Anzahl der Gäste und eine optionale Nachricht. Eingabe und Vorbereitung erfolgen im Browser: Die Website speichert diese Felder nicht in einer eigenen Datenbank und übermittelt sie nicht an einen Versanddienst.",
    `„Anfrage senden“ öffnet eine vorbereitete E-Mail in Ihrem E-Mail-Programm. Die Anfrage erreicht <a href="mailto:${site.email}">${site.email}</a> erst, wenn Sie sie absenden. Das Programm kann den Entwurf speichern. Bei telefonischem Kontakt verarbeiten wir Nummer und mitgeteilte Angaben zur Beantwortung.`,
    "Zweck ist die Beantwortung und Bearbeitung der Aufenthaltsanfrage auf Grundlage vorvertraglicher Maßnahmen auf Ihre Anfrage (Art. 6 Abs. 1 lit. b DSGVO). Analytics muss zur Kontaktaufnahme nicht akzeptiert werden.",
    "Die Angaben sind freiwillig; ohne notwendige Daten können wir nicht antworten oder die Verfügbarkeit prüfen. Bitte übermitteln Sie keine Ausweise, Zahlungs- oder Gesundheitsdaten.",
    "<strong>Speicherdauer:</strong> 30 Tage nach Abschluss der Unterhaltung bei Anfragen, die nicht zu Buchungen werden. Die Löschung betrifft die vom Beherbergungsbetrieb verwalteten Daten, nicht Kopien in Ihrem Postfach. Für Buchungen gelten gesonderte Fristen und Pflichten.",
  ],
  [
    "Die Website wird über GitHub Pages, einen Dienst von GitHub, Inc., bereitgestellt. Zur Bereitstellung und Absicherung können IP-Adresse, Datum und Uhrzeit, angeforderte Ressourcen sowie technische Browser- und Gerätedaten verarbeitet werden.",
    `Zweck sind Nutzung, Sicherheit und Betrieb der Website auf Grundlage des berechtigten Interesses an Bereitstellung und Schutz des Dienstes (Art. 6 Abs. 1 lit. f DSGVO). Ver Sacrum führt kein eigenes Anwendungsprotokollarchiv. GitHub speichert technische Daten gemäß ${githubLink("seiner Datenschutzerklärung")}.`,
    "Schriften und Bilder werden mit der Website ausgeliefert. Maps, Booking und Airbnb sind externe Links; diese Dienste werden nicht eingebettet oder automatisch geladen.",
  ],
  [
    "Wir verwenden Google Analytics 4 zur Messung von Besuchen und Nutzung ausschließlich nach Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Vor einer Auswahl und bei Ablehnung wird das Tag nicht geladen und es werden keine Analytics-Anfragen gesendet.",
    "Nach Einwilligung kann Google Cookie-Kennungen, Browser- und Geräteinformationen, besuchte Seiten, Zeiten und Interaktionen verarbeiten. Die IP-Adresse ist an der Kommunikation mit Google beteiligt; diese Daten sind nicht automatisch anonym.",
    "Formularwerte werden nicht an Analytics gesendet. Werbesignale sind deaktiviert, Einwilligungen für Werbung und Personalisierung bleiben verweigert, und gemeldete URLs enthalten weder Abfrage noch Fragment.",
    "<strong>Speicherung bei Analytics:</strong> 2 Monate für Ereignisdaten und 14 Monate für Nutzerdaten; der Nutzerdatenzeitraum wird bei neuer Aktivität zurückgesetzt. Die Cookie-Laufzeit im Browser ist davon getrennt.",
    "Sie können zustimmen, ablehnen oder keine Auswahl treffen und die Cookie-Einstellungen erneut öffnen. Scrollen gilt nicht als Einwilligung. Ein Widerruf deaktiviert Analytics und löscht zugängliche Cookies ohne Neuladen oder Löschen des Formulars; die Rechtmäßigkeit vorheriger Verarbeitung bleibt unberührt.",
    "Blockiert der Browser die Speicherung, gilt die Auswahl für die aktuelle Seite. Website-Daten können im Browser gelöscht werden. Ohne JavaScript wird Analytics nicht geladen.",
    `Anbieterinformationen: ${providerLinks("de", "Datenschutzerklärung von Google", "Google-Analytics-Cookies")}.`,
  ],
  [
    "Anfragedaten werden vom Verantwortlichen und befugten Personen verwendet. Das Zielpostfach nutzt Gmail; Google und GitHub verarbeiten Daten im Rahmen ihrer Dienste und Rollen. Daten können bei gesetzlicher Verpflichtung an Behörden weitergegeben werden.",
    `Anbieter können Daten außerhalb des EWR, auch in den USA, verarbeiten. Anwendbare Garantien können Angemessenheitsbeschlüsse und Standardvertragsklauseln umfassen. Siehe <a href="https://policies.google.com/privacy/frameworks?hl=de">Informationen von Google</a> und ${githubLink("die GitHub-Datenschutzerklärung")}; relevante Garantien können beim Verantwortlichen angefordert werden.`,
    "Für Google Maps, Booking oder Airbnb gelten die Hinweise des jeweiligen externen Dienstes. Dieses Dokument betrifft die Website von Ver Sacrum.",
  ],
  [
    "Soweit die DSGVO dies vorsieht, können Sie Auskunft, Berichtigung, Löschung, Einschränkung und Übertragbarkeit verlangen, einer Verarbeitung aus berechtigtem Interesse widersprechen und die Analytics-Einwilligung jederzeit widerrufen.",
    `Zur Ausübung Ihrer Rechte schreiben Sie an <a href="mailto:${privacy.contact}">${privacy.contact}</a>. Sie können sich beim italienischen <a href="https://www.garanteprivacy.it/">Garante</a> oder der zuständigen Behörde Ihres Landes beschweren. Die Website trifft keine ausschließlich automatisierten Entscheidungen mit rechtlicher oder ähnlich erheblicher Wirkung.`,
  ],
];

const storageCopy = {
  en: [
    [
      "Browser privacy preference",
      "<code>ver-sacrum.analytics-consent.v2</code> (localStorage): stores the choice and expiry without sending them to a server. Acceptance lasts six months; refusal remains until changed or site data are deleted.",
    ],
    [
      "Cookie <code>_ga</code>",
      "Google Analytics statistical cookie used to distinguish browsers. The website sets a 180-day lifetime without automatic renewal on every visit.",
    ],
    [
      "Cookie <code>_ga_3S75NJZ588</code>",
      "Google Analytics statistical cookie used to maintain session state. The website sets a 180-day lifetime without automatic renewal; the browser may impose a shorter limit.",
    ],
  ],
  fr: [
    [
      "Préférence de confidentialité dans le navigateur",
      "<code>ver-sacrum.analytics-consent.v2</code> (localStorage) mémorise le choix et son échéance sans les envoyer à un serveur. L’acceptation vaut six mois ; le refus reste valable jusqu’à modification ou suppression des données du site.",
    ],
    [
      "Cookie <code>_ga</code>",
      "Cookie statistique Google Analytics servant à distinguer les navigateurs. Le site fixe une durée de 180 jours, sans renouvellement automatique à chaque visite.",
    ],
    [
      "Cookie <code>_ga_3S75NJZ588</code>",
      "Cookie statistique Google Analytics maintenant l’état de la session. Le site fixe une durée de 180 jours sans renouvellement automatique ; le navigateur peut appliquer une durée plus courte.",
    ],
  ],
  es: [
    [
      "Preferencia de privacidad del navegador",
      "<code>ver-sacrum.analytics-consent.v2</code> (localStorage) guarda la elección y su vencimiento sin enviarlos a un servidor. La aceptación dura seis meses; el rechazo se mantiene hasta que se cambie o se eliminen los datos del sitio.",
    ],
    [
      "Cookie <code>_ga</code>",
      "Cookie estadística de Google Analytics para distinguir navegadores. El sitio fija una duración de 180 días, sin renovación automática en cada visita.",
    ],
    [
      "Cookie <code>_ga_3S75NJZ588</code>",
      "Cookie estadística de Google Analytics para mantener el estado de la sesión. El sitio fija 180 días sin renovación automática; el navegador puede aplicar un límite menor.",
    ],
  ],
  de: [
    [
      "Datenschutzeinstellung im Browser",
      "<code>ver-sacrum.analytics-consent.v2</code> (localStorage) speichert Auswahl und Ablauf, ohne sie an einen Server zu senden. Die Zustimmung gilt sechs Monate; die Ablehnung bleibt bis zur Änderung oder Löschung der Website-Daten bestehen.",
    ],
    [
      "Cookie <code>_ga</code>",
      "Statistisches Google-Analytics-Cookie zur Unterscheidung von Browsern. Die Website setzt eine Laufzeit von 180 Tagen ohne automatische Verlängerung bei jedem Besuch.",
    ],
    [
      "Cookie <code>_ga_3S75NJZ588</code>",
      "Statistisches Google-Analytics-Cookie zur Beibehaltung des Sitzungsstatus. Die Website setzt 180 Tage ohne automatische Verlängerung; der Browser kann eine kürzere Grenze anwenden.",
    ],
  ],
};

const sectionIds = [
  "titolare",
  "richieste",
  "navigazione",
  "cookie",
  "destinatari",
  "diritti",
];

const translatedPrivacy = Object.fromEntries(
  (Object.entries(translated) as [TranslatedLocale, TranslatedSeed][]).map(
    ([locale, value]) => [
      locale,
      {
        metaTitle: value.metaTitle,
        metaDescription: value.metaDescription,
        eyebrow: value.eyebrow,
        title: value.title,
        updated: value.updated,
        authority: value.authority,
        intro: value.intro,
        back: value.back,
        sections: value.paragraphs.map((paragraphs, index) => ({
          id: sectionIds[index],
          title: value.titles[index],
          paragraphs,
          ...(index === 3
            ? {
                storage: storageCopy[locale as keyof typeof storageCopy],
              }
            : {}),
        })),
      },
    ],
  ),
) as unknown as Record<TranslatedLocale, PrivacyCopy>;

export const privacyCopy: Record<Locale, PrivacyCopy> = {
  it: italianPrivacy.it,
  ...translatedPrivacy,
};
