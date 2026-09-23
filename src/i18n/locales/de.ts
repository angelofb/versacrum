import { site, analytics } from "../../site.config.ts";
import { privacy } from "../../privacy.config.ts";
import { formatUpdated } from "../helpers.ts";
import type { Catalog } from "../schema.ts";

export default {
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
      "Ver Sacrum ist eine Ferienwohnung in der Altstadt von Ascoli Piceno – mit Doppelzimmer, ausgestatteter Küche, WLAN, Waschmaschine und Trockner.",
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
        "Ver Sacrum ist eine behagliche Ferienwohnung in der Altstadt von Ascoli Piceno in den Marken – für alle, die die Stadt zu Fuß erleben möchten. Weiße Balken, Holzböden und Fenster zu den Gassen begleiten Ihre Tage hier.",
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
      labels: {
        checkin: "Check-in",
        checkout: "Check-out",
        pets: "In Begleitung",
      },
      cta: "Sprechen wir über Ihren Aufenthalt",
      faq: {
        capacity: {
          title: "Wie viele Gäste finden in Ver Sacrum Platz?",
          content: [
            "Das Zuhause bietet Platz für bis zu drei Gäste: ein Doppelbett im Schlafzimmer und ein Schlafsofa im Wohnzimmer. Die Anzahl der Gäste können Sie in der ",
            { kind: "link", href: "#contatti", text: "Verfügbarkeitsanfrage" },
            " angeben.",
          ],
        },
        kitchen: {
          title: "Gibt es eine Küche?",
          content: [
            "Ja. Die ausgestattete Küche verfügt über Kochfeld, Backofen und Wasserkocher. Waschmaschine und Trockner sind ebenfalls vorhanden. Bereiten Sie Ihre Mahlzeiten zu und gestalten Sie den Tag in Ihrem Rhythmus. Sehen Sie sich die ",
            { kind: "link", href: "#spazi", text: "Fotos der Räume" },
            " an.",
          ],
        },
        location: {
          title: "Wo liegt Ver Sacrum in Ascoli Piceno?",
          content: [
            `Das Zuhause befindet sich in ${site.address}, mitten in der Altstadt von Ascoli Piceno. Im Abschnitt `,
            { kind: "link", href: "#ascoli", text: "Ascoli und Lage" },
            " finden Sie den Blick auf die Gassen und Hinweise zur Anreise.",
          ],
        },
        arrival: {
          title: "An- und Abreise",
          content: [
            `Check-in: ${site.checkin}.`,
            { kind: "break" },
            `Check-out: ${site.checkout}.`,
          ],
        },
        accessibility: {
          title: "Treppen und Barrierefreiheit",
          content: [
            `Das Zuhause liegt im ersten Stock und ist über etwa ${site.accessSteps} Stufen ohne Aufzug erreichbar. Wenn Sie besondere Anforderungen haben, sprechen Sie bitte vor der Buchung mit uns.`,
          ],
        },
        parking: {
          title: "Parken und ZTL",
          content: [
            `Zum Ausladen des Gepäcks können Sie die Ladezonen an der Piazza Roma nutzen, etwa ${site.parking.unloadingMetres} Meter von der Wohnung entfernt. Für längeres Parken gibt es gebührenpflichtige Stellplätze am Gericht in der Piazza Serafino Orlini mit Stundentarif; in der Via delle Rimembranze kostet ein Tagesticket ${site.parking.dailyEuros} €. Das private beschrankte Parkhaus Porta Torricella ist etwa ${site.parking.privateMetres} Meter entfernt. Kostenlose Parkplätze finden Sie in rund ${site.parking.freeMetres} Metern Entfernung bei Porta Romana, Viale Treviri und Via Oberdan.`,
          ],
        },
        pets: {
          title: "Reisen mit Haustieren",
          content: ["Kleine Haustiere sind willkommen."],
        },
      },
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
  privacy: {
    metaTitle: "Datenschutz und Cookies | Ver Sacrum",
    metaDescription:
      "Informationen zur Verarbeitung von Anfragen und zu Cookies bei Ver Sacrum.",
    eyebrow: "VER SACRUM · DATENSCHUTZHINWEISE",
    title: "Datenschutz und Cookies",
    updated: `Letzte Aktualisierung: ${formatUpdated("de")}.`,
    authority:
      "Diese Übersetzung dient nur der Information. Bei Abweichungen ist der italienische Text maßgeblich.",
    intro:
      "Diese Hinweise betreffen den Besuch der Website von Ver Sacrum sowie Informations- und Verfügbarkeitsanfragen. Über die für Buchung und Aufenthalt erforderliche Verarbeitung wird vor der jeweiligen Datenerhebung gesondert informiert.",
    back: "Zurück zu Ver Sacrum",
    sections: {
      titolare: {
        title: "1. Verantwortlicher",
        blocks: [
          {
            kind: "paragraph",
            content: [
              "Verantwortlicher ist ",
              { kind: "strong", text: `${privacy.controller}` },
              ` mit Kontaktanschrift ${privacy.address}. Bei Datenschutzfragen oder zur Ausübung Ihrer Rechte schreiben Sie an `,
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
        title: "2. Verfügbarkeitsanfragen und Kontakt",
        blocks: [
          {
            kind: "paragraph",
            content: [
              "Das Formular erfasst Name, E-Mail-Adresse, An- und Abreisedatum, Anzahl der Gäste und eine optionale Nachricht. Eingabe und Vorbereitung erfolgen im Browser: Die Website speichert diese Felder nicht in einer eigenen Datenbank und übermittelt sie nicht an einen Versanddienst.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "„Anfrage senden“ öffnet eine vorbereitete E-Mail in Ihrem E-Mail-Programm. Die Anfrage erreicht ",
              {
                kind: "link",
                href: `mailto:${site.email}`,
                text: `${site.email}`,
              },
              " erst, wenn Sie sie absenden. Das Programm kann den Entwurf speichern. Bei telefonischem Kontakt verarbeiten wir Nummer und mitgeteilte Angaben zur Beantwortung.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "Zweck ist die Beantwortung und Bearbeitung der Aufenthaltsanfrage auf Grundlage vorvertraglicher Maßnahmen auf Ihre Anfrage (Art. 6 Abs. 1 lit. b DSGVO). Analytics muss zur Kontaktaufnahme nicht akzeptiert werden.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "Die Angaben sind freiwillig; ohne notwendige Daten können wir nicht antworten oder die Verfügbarkeit prüfen. Bitte übermitteln Sie keine Ausweise, Zahlungs- oder Gesundheitsdaten.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              { kind: "strong", text: "Speicherdauer:" },
              ` ${privacy.requestRetentionDays} Tage nach Abschluss der Unterhaltung bei Anfragen, die nicht zu Buchungen werden. Die Löschung betrifft die vom Beherbergungsbetrieb verwalteten Daten, nicht Kopien in Ihrem Postfach. Für Buchungen gelten gesonderte Fristen und Pflichten.`,
            ],
          },
        ],
      },
      navigazione: {
        title: "3. Nutzung und Sicherheit",
        blocks: [
          {
            kind: "paragraph",
            content: [
              "Die Website wird über GitHub Pages, einen Dienst von GitHub, Inc., bereitgestellt. Zur Bereitstellung und Absicherung können IP-Adresse, Datum und Uhrzeit, angeforderte Ressourcen sowie technische Browser- und Gerätedaten verarbeitet werden.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "Zweck sind Nutzung, Sicherheit und Betrieb der Website auf Grundlage des berechtigten Interesses an Bereitstellung und Schutz des Dienstes (Art. 6 Abs. 1 lit. f DSGVO). Ver Sacrum führt kein eigenes Anwendungsprotokollarchiv. GitHub speichert technische Daten gemäß ",
              {
                kind: "link",
                href: "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement",
                text: "seiner Datenschutzerklärung",
              },
              ".",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "Schriften und Bilder werden mit der Website ausgeliefert. Maps, Booking und Airbnb sind externe Links; diese Dienste werden nicht eingebettet oder automatisch geladen.",
            ],
          },
        ],
      },
      cookie: {
        title: "4. Cookies und Google Analytics",
        blocks: [
          {
            kind: "paragraph",
            content: [
              "Wir verwenden Google Analytics 4 zur Messung von Besuchen und Nutzung ausschließlich nach Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Vor einer Auswahl und bei Ablehnung wird das Tag nicht geladen und es werden keine Analytics-Anfragen gesendet.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "Nach Einwilligung kann Google Cookie-Kennungen, Browser- und Geräteinformationen, besuchte Seiten, Zeiten und Interaktionen verarbeiten. Die IP-Adresse ist an der Kommunikation mit Google beteiligt; diese Daten sind nicht automatisch anonym.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "Formularwerte werden nicht an Analytics gesendet. Werbesignale sind deaktiviert, Einwilligungen für Werbung und Personalisierung bleiben verweigert, und gemeldete URLs enthalten weder Abfrage noch Fragment.",
            ],
          },
          {
            kind: "storage",
            items: [
              {
                term: ["Datenschutzeinstellung im Browser"],
                description: [
                  { kind: "code", text: "ver-sacrum.analytics-consent.v2" },
                  " (localStorage) speichert Auswahl und Ablauf, ohne sie an einen Server zu senden. Die Zustimmung gilt sechs Monate; die Ablehnung bleibt bis zur Änderung oder Löschung der Website-Daten bestehen.",
                ],
              },
              {
                term: ["Cookie ", { kind: "code", text: "_ga" }],
                description: [
                  `Statistisches Google-Analytics-Cookie zur Unterscheidung von Browsern. Die Website setzt eine Laufzeit von ${privacy.cookieDays} Tagen ohne automatische Verlängerung bei jedem Besuch.`,
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
                  `Statistisches Google-Analytics-Cookie zur Beibehaltung des Sitzungsstatus. Die Website setzt ${privacy.cookieDays} Tage ohne automatische Verlängerung; der Browser kann eine kürzere Grenze anwenden.`,
                ],
              },
            ],
          },
          {
            kind: "paragraph",
            content: [
              { kind: "strong", text: "Speicherung bei Analytics:" },
              ` ${privacy.eventRetentionMonths} Monate für Ereignisdaten und ${privacy.userRetentionMonths} Monate für Nutzerdaten; der Nutzerdatenzeitraum wird bei neuer Aktivität zurückgesetzt. Die Cookie-Laufzeit im Browser ist davon getrennt.`,
            ],
          },
          {
            kind: "paragraph",
            content: [
              "Sie können zustimmen, ablehnen oder keine Auswahl treffen und die Cookie-Einstellungen erneut öffnen. Scrollen gilt nicht als Einwilligung. Ein Widerruf deaktiviert Analytics und löscht zugängliche Cookies ohne Neuladen oder Löschen des Formulars; die Rechtmäßigkeit vorheriger Verarbeitung bleibt unberührt.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "Blockiert der Browser die Speicherung, gilt die Auswahl für die aktuelle Seite. Website-Daten können im Browser gelöscht werden. Ohne JavaScript wird Analytics nicht geladen.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "Anbieterinformationen: ",
              {
                kind: "link",
                href: "https://policies.google.com/privacy?hl=de",
                text: "Datenschutzerklärung von Google",
              },
              " und ",
              {
                kind: "link",
                href: "https://support.google.com/analytics/answer/11397207?hl=de",
                text: "Google-Analytics-Cookies",
              },
              ".",
            ],
          },
        ],
      },
      destinatari: {
        title: "5. Empfänger und Übermittlungen",
        blocks: [
          {
            kind: "paragraph",
            content: [
              "Anfragedaten werden vom Verantwortlichen und befugten Personen verwendet. Das Zielpostfach nutzt Gmail; Google und GitHub verarbeiten Daten im Rahmen ihrer Dienste und Rollen. Daten können bei gesetzlicher Verpflichtung an Behörden weitergegeben werden.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "Anbieter können Daten außerhalb des EWR, auch in den USA, verarbeiten. Anwendbare Garantien können Angemessenheitsbeschlüsse und Standardvertragsklauseln umfassen. Siehe ",
              {
                kind: "link",
                href: "https://policies.google.com/privacy/frameworks?hl=de",
                text: "Informationen von Google",
              },
              " und ",
              {
                kind: "link",
                href: "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement",
                text: "die GitHub-Datenschutzerklärung",
              },
              "; relevante Garantien können beim Verantwortlichen angefordert werden.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "Für Google Maps, Booking oder Airbnb gelten die Hinweise des jeweiligen externen Dienstes. Dieses Dokument betrifft die Website von Ver Sacrum.",
            ],
          },
        ],
      },
      diritti: {
        title: "6. Ihre Rechte",
        blocks: [
          {
            kind: "paragraph",
            content: [
              "Soweit die DSGVO dies vorsieht, können Sie Auskunft, Berichtigung, Löschung, Einschränkung und Übertragbarkeit verlangen, einer Verarbeitung aus berechtigtem Interesse widersprechen und die Analytics-Einwilligung jederzeit widerrufen.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "Zur Ausübung Ihrer Rechte schreiben Sie an ",
              {
                kind: "link",
                href: `mailto:${privacy.contact}`,
                text: `${privacy.contact}`,
              },
              ". Sie können sich beim italienischen ",
              {
                kind: "link",
                href: "https://www.garanteprivacy.it/",
                text: "Garante",
              },
              " oder der zuständigen Behörde Ihres Landes beschweren. Die Website trifft keine ausschließlich automatisierten Entscheidungen mit rechtlicher oder ähnlich erheblicher Wirkung.",
            ],
          },
        ],
      },
    },
  },
  dynamic: {
    configuredNotice:
      "Die Schaltfläche erstellt eine E-Mail: Prüfen und senden Sie sie in Ihrem E-Mail-Programm. Die Website sendet die Anfrage nicht automatisch.",
    unavailable:
      "Der Versand ist noch nicht verfügbar. Nutzen Sie bitte die direkten Kontaktdaten.",
    arrivalError: "Wählen Sie ein Anreisedatum ab heute.",
    departureError: "Die Abreise muss nach der Anreise liegen.",
    emailGreeting:
      "Guten Tag, ich möchte die Verfügbarkeit von Ver Sacrum anfragen.",
    emailLabels: ["Name", "E-Mail", "Anreise", "Abreise", "Gäste"],
    emailSubject: "[DE] Verfügbarkeitsanfrage — Ver Sacrum",
    prepared:
      "Die E-Mail ist vorbereitet, aber noch nicht gesendet. Falls sich Ihr E-Mail-Programm nicht öffnet, ",
    openEmail: "öffnen Sie die vorbereitete E-Mail",
    direct: " oder nutzen Sie die direkten Kontaktdaten.",
    consentAccepted: "Aktuelle Auswahl: Analytics akzeptiert.",
    consentRejected: "Aktuelle Auswahl: Analytics abgelehnt.",
    consentOff: "Analytics bleibt deaktiviert, bis Sie zustimmen.",
  },
  consent: {
    title: "Website-Statistik",
    description:
      "Mit Ihrer Einwilligung verwenden wir Google Analytics und dessen Cookies, um zu verstehen, wie die Website besucht wird. Sie können ablehnen und weiter surfen oder Ihre Auswahl unten über „Cookie-Einstellungen“ ändern.",
    privacyLink: "Datenschutz- und Cookie-Hinweise lesen",
    reject: "Analytics ablehnen",
    accept: "Analytics akzeptieren",
  },
  photoAlt: {
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
} satisfies Catalog;
