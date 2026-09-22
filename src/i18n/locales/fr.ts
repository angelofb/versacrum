import { site, analytics } from "../../site.config.ts";
import { privacy } from "../../privacy.config.ts";
import { formatUpdated } from "../helpers.ts";
import type { Catalog } from "../schema.ts";

export default {
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
      labels: { checkin: "Arrivée", checkout: "Départ", pets: "En compagnie" },
      cta: "Parlons de votre séjour",
      faq: {
        capacity: {
          title: "Combien de personnes Ver Sacrum peut-elle accueillir ?",
          content: [
            "La demeure accueille jusqu’à trois personnes, avec un lit double dans la chambre et un canapé-lit dans le salon. Indiquez le nombre de voyageurs dans votre ",
            {
              kind: "link",
              href: "#contatti",
              text: "demande de disponibilité",
            },
            ".",
          ],
        },
        kitchen: {
          title: "La demeure dispose-t-elle d’une cuisine ?",
          content: [
            "Oui, vous trouverez une cuisine équipée avec plaques de cuisson, four et bouilloire, ainsi qu’un lave-linge et un sèche-linge. Préparez vos repas et organisez vos journées à votre rythme. Découvrez les ",
            { kind: "link", href: "#spazi", text: "photos des espaces" },
            ".",
          ],
        },
        location: {
          title: "Où se trouve Ver Sacrum à Ascoli Piceno ?",
          content: [
            `La demeure se trouve ${site.address}, dans le centre historique d’Ascoli Piceno. La section `,
            { kind: "link", href: "#ascoli", text: "Ascoli et situation" },
            " présente la vue sur les ruelles et les indications pour nous rejoindre.",
          ],
        },
        arrival: {
          title: "Arrivée et départ",
          content: [
            `Arrivée : ${site.checkin}.`,
            { kind: "break" },
            `Départ : ${site.checkout}.`,
          ],
        },
        accessibility: {
          title: "Escaliers et accessibilité",
          content: [
            `La demeure se trouve au premier étage, accessible par environ ${site.accessSteps} marches, sans ascenseur. Si vous avez des besoins particuliers, contactez-nous avant de réserver.`,
          ],
        },
        parking: {
          title: "Stationnement et ZTL",
          content: [
            `Pour décharger les bagages, vous pouvez utiliser les emplacements de livraison de la Piazza Roma, à environ ${site.parking.unloadingMetres} mètres de l’appartement. Pour un stationnement plus long, des places payantes sont disponibles près du tribunal, Piazza Serafino Orlini, et Via delle Rimembranze, avec un ticket journalier de ${site.parking.dailyEuros} €. Le parking privé avec barrière de Porta Torricella se trouve à environ ${site.parking.privateMetres} mètres. Des places gratuites sont disponibles à environ ${site.parking.freeMetres} mètres, près de Porta Romana, Viale Treviri et Via Oberdan.`,
          ],
        },
        pets: {
          title: "Voyager avec des animaux",
          content: ["Les animaux de petite taille sont acceptés."],
        },
      },
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
  privacy: {
    metaTitle: "Confidentialité et cookies | Ver Sacrum",
    metaDescription:
      "Informations sur le traitement des demandes et les cookies de Ver Sacrum.",
    eyebrow: "VER SACRUM · INFORMATIONS SUR LES DONNÉES",
    title: "Confidentialité et cookies",
    updated: `Dernière mise à jour : ${formatUpdated("fr")}.`,
    authority:
      "Cette traduction est fournie à titre informatif. En cas de divergence, le texte italien prévaut.",
    intro:
      "Cette notice concerne la visite du site Ver Sacrum et les demandes d’information ou de disponibilité. Les traitements nécessaires à une réservation et au séjour feront l’objet d’une information spécifique avant la collecte.",
    back: "Retour à Ver Sacrum",
    sections: {
      titolare: {
        title: "1. Responsable du traitement",
        blocks: [
          {
            kind: "paragraph",
            content: [
              "Le responsable du traitement est ",
              { kind: "strong", text: `${privacy.controller}` },
              `, à l’adresse ${privacy.address}. Pour toute question ou pour exercer vos droits, écrivez à `,
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
        title: "2. Demandes de disponibilité et contacts",
        blocks: [
          {
            kind: "paragraph",
            content: [
              "Le formulaire recueille le nom, l’adresse e-mail, les dates d’arrivée et de départ, le nombre de voyageurs et un éventuel message. La saisie et la préparation de la demande ont lieu dans votre navigateur : le site ne conserve pas ces champs dans une base de données et ne les transmet pas à un service d’envoi.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "« Envoyer la demande » ouvre un e-mail préparé dans votre messagerie. La demande n’est transmise à ",
              {
                kind: "link",
                href: `mailto:${site.email}`,
                text: `${site.email}`,
              },
              " que lorsque vous l’envoyez. Votre messagerie peut conserver le brouillon. En cas de contact téléphonique, nous traitons votre numéro et les informations communiquées afin de vous répondre.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "La finalité est de répondre et de gérer votre demande de séjour, sur la base des mesures précontractuelles prises à votre demande (art. 6, par. 1, b du RGPD). Accepter Analytics n’est pas nécessaire pour nous contacter.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "La fourniture des données est facultative, mais sans les éléments nécessaires nous ne pouvons pas répondre ni vérifier les disponibilités. N’indiquez pas de documents, données de paiement ou informations de santé.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              { kind: "strong", text: "Conservation :" },
              ` ${privacy.requestRetentionDays} jours après la clôture de la conversation pour les demandes sans réservation. La suppression concerne les données gérées par l’hébergement, pas les copies de votre messagerie. Les réservations suivent des durées et obligations distinctes.`,
            ],
          },
        ],
      },
      navigazione: {
        title: "3. Navigation et sécurité",
        blocks: [
          {
            kind: "paragraph",
            content: [
              "Le site est hébergé sur GitHub Pages, service de GitHub, Inc. Pour fournir et protéger le site, l’infrastructure peut traiter l’adresse IP, la date et l’heure, les ressources demandées ainsi que des données sur le navigateur et l’appareil.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "La finalité est d’assurer navigation, sécurité et fonctionnement, sur la base de l’intérêt légitime à fournir et protéger le service (art. 6, par. 1, f du RGPD). Ver Sacrum ne tient pas d’archive applicative des journaux. GitHub conserve les données techniques selon ",
              {
                kind: "link",
                href: "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement",
                text: "sa déclaration de confidentialité",
              },
              ".",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "Les polices et images sont servies avec le site. Maps, Booking et Airbnb sont des liens externes et ne sont pas chargés automatiquement.",
            ],
          },
        ],
      },
      cookie: {
        title: "4. Cookies et Google Analytics",
        blocks: [
          {
            kind: "paragraph",
            content: [
              "Nous utilisons Google Analytics 4 pour mesurer les visites, uniquement après votre acceptation, sur la base du consentement (art. 6, par. 1, a du RGPD). Avant votre choix ou en cas de refus, le tag n’est pas chargé.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "Après acceptation, Google peut traiter des identifiants de cookies, des données sur le navigateur et l’appareil, les pages, horaires et interactions. L’adresse IP intervient dans la communication avec Google ; ces données ne sont pas automatiquement anonymes.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "Les valeurs du formulaire ne sont pas envoyées à Analytics. Les signaux publicitaires sont désactivés, les consentements publicitaires restent refusés et l’URL transmise est privée de requête et de fragment.",
            ],
          },
          {
            kind: "storage",
            items: [
              {
                term: ["Préférence de confidentialité dans le navigateur"],
                description: [
                  { kind: "code", text: "ver-sacrum.analytics-consent.v2" },
                  " (localStorage) mémorise le choix et son échéance sans les envoyer à un serveur. L’acceptation vaut six mois ; le refus reste valable jusqu’à modification ou suppression des données du site.",
                ],
              },
              {
                term: ["Cookie ", { kind: "code", text: "_ga" }],
                description: [
                  `Cookie statistique Google Analytics servant à distinguer les navigateurs. Le site fixe une durée de ${privacy.cookieDays} jours, sans renouvellement automatique à chaque visite.`,
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
                  `Cookie statistique Google Analytics maintenant l’état de la session. Le site fixe une durée de ${privacy.cookieDays} jours sans renouvellement automatique ; le navigateur peut appliquer une durée plus courte.`,
                ],
              },
            ],
          },
          {
            kind: "paragraph",
            content: [
              { kind: "strong", text: "Conservation Analytics :" },
              ` ${privacy.eventRetentionMonths} mois pour les événements et ${privacy.userRetentionMonths} mois pour les données utilisateur, période réinitialisée en cas de nouvelle activité. La durée des cookies est distincte.`,
            ],
          },
          {
            kind: "paragraph",
            content: [
              "Vous pouvez accepter, refuser ou ne pas choisir, puis rouvrir les Préférences de cookies. Le défilement ne vaut pas consentement. Le retrait désactive Analytics et supprime les cookies accessibles sans recharger ni effacer le formulaire.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "Si le stockage est bloqué, le choix vaut pour la page courante. Vous pouvez supprimer les données du site dans le navigateur. Sans JavaScript, Analytics n’est pas chargé.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "Informations du fournisseur : ",
              {
                kind: "link",
                href: "https://policies.google.com/privacy?hl=fr",
                text: "règles de confidentialité de Google",
              },
              " et ",
              {
                kind: "link",
                href: "https://support.google.com/analytics/answer/11397207?hl=fr",
                text: "cookies Google Analytics",
              },
              ".",
            ],
          },
        ],
      },
      destinatari: {
        title: "5. Destinataires et transferts",
        blocks: [
          {
            kind: "paragraph",
            content: [
              "Les données des demandes sont utilisées par le responsable et les personnes autorisées. La boîte de destination utilise Gmail ; Google et GitHub traitent des données dans le cadre de leurs services et rôles. Les données peuvent être communiquées aux autorités lorsque la loi l’exige.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "Des traitements peuvent avoir lieu hors de l’EEE, notamment aux États-Unis, avec les garanties applicables telles que décisions d’adéquation et clauses contractuelles types. Consultez les ",
              {
                kind: "link",
                href: "https://policies.google.com/privacy/frameworks?hl=fr",
                text: "informations Google",
              },
              " et ",
              {
                kind: "link",
                href: "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement",
                text: "la déclaration GitHub",
              },
              ".",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "Les traitements de Google Maps, Booking ou Airbnb sont régis par leurs propres notices. Ce document concerne le site Ver Sacrum.",
            ],
          },
        ],
      },
      diritti: {
        title: "6. Vos droits",
        blocks: [
          {
            kind: "paragraph",
            content: [
              "Dans les cas prévus par le RGPD, vous pouvez demander accès, rectification, effacement, limitation et portabilité, vous opposer aux traitements fondés sur l’intérêt légitime et retirer le consentement Analytics.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "Écrivez à ",
              {
                kind: "link",
                href: `mailto:${privacy.contact}`,
                text: `${privacy.contact}`,
              },
              ". Vous pouvez saisir le ",
              {
                kind: "link",
                href: "https://www.garanteprivacy.it/",
                text: "Garante italien",
              },
              " ou l’autorité compétente de votre pays. Le site ne prend aucune décision exclusivement automatisée produisant des effets juridiques ou similaires.",
            ],
          },
        ],
      },
    },
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
  consent: {
    title: "Statistiques du site",
    description:
      "Avec votre consentement, nous utilisons Google Analytics et ses cookies pour comprendre comment le site est visité. Vous pouvez refuser et poursuivre votre navigation, ou modifier votre choix via « Préférences de cookies » en bas de page.",
    privacyLink: "Lire la politique de confidentialité et de cookies",
    reject: "Refuser Analytics",
    accept: "Accepter Analytics",
  },
  photoAlt: {
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
} satisfies Catalog;
