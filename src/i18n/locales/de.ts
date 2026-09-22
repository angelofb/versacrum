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
          `Das Zuhause befindet sich in ${site.address}, mitten in der Altstadt von Ascoli Piceno. Im Abschnitt Ascoli und Lage finden Sie den Blick auf die Gassen und Hinweise zur Anreise.`,
        ],
        [
          "An- und Abreise",
          `Check-in: ${site.checkin}.
Check-out: ${site.checkout}.`,
        ],
        [
          "Treppen und Barrierefreiheit",
          `Das Zuhause liegt im ersten Stock und ist über etwa ${site.accessSteps} Stufen ohne Aufzug erreichbar. Wenn Sie besondere Anforderungen haben, sprechen Sie bitte vor der Buchung mit uns.`,
        ],
        [
          "Parken und ZTL",
          `Zum Ausladen des Gepäcks können Sie die Ladezonen an der Piazza Roma nutzen, etwa ${site.parking.unloadingMetres} Meter von der Wohnung entfernt. Für längeres Parken gibt es gebührenpflichtige Stellplätze am Gericht in der Piazza Serafino Orlini sowie in der Via delle Rimembranze mit einem Tagesticket für ${site.parking.dailyEuros} €. Das private beschrankte Parkhaus Porta Torricella ist etwa ${site.parking.privateMetres} Meter entfernt. Kostenlose Parkplätze finden Sie in rund ${site.parking.freeMetres} Metern Entfernung bei Porta Romana, Viale Treviri und Via Oberdan.`,
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
    sections: [
      {
        id: "titolare",
        title: "1. Verantwortlicher",
        paragraphs: [
          `Verantwortlicher ist <strong>${privacy.controller}</strong> mit Kontaktanschrift ${privacy.address}. Bei Datenschutzfragen oder zur Ausübung Ihrer Rechte schreiben Sie an <a href="mailto:${privacy.contact}">${privacy.contact}</a>.`,
        ],
      },
      {
        id: "richieste",
        title: "2. Verfügbarkeitsanfragen und Kontakt",
        paragraphs: [
          "Das Formular erfasst Name, E-Mail-Adresse, An- und Abreisedatum, Anzahl der Gäste und eine optionale Nachricht. Eingabe und Vorbereitung erfolgen im Browser: Die Website speichert diese Felder nicht in einer eigenen Datenbank und übermittelt sie nicht an einen Versanddienst.",
          `„Anfrage senden“ öffnet eine vorbereitete E-Mail in Ihrem E-Mail-Programm. Die Anfrage erreicht <a href="mailto:${site.email}">${site.email}</a> erst, wenn Sie sie absenden. Das Programm kann den Entwurf speichern. Bei telefonischem Kontakt verarbeiten wir Nummer und mitgeteilte Angaben zur Beantwortung.`,
          "Zweck ist die Beantwortung und Bearbeitung der Aufenthaltsanfrage auf Grundlage vorvertraglicher Maßnahmen auf Ihre Anfrage (Art. 6 Abs. 1 lit. b DSGVO). Analytics muss zur Kontaktaufnahme nicht akzeptiert werden.",
          "Die Angaben sind freiwillig; ohne notwendige Daten können wir nicht antworten oder die Verfügbarkeit prüfen. Bitte übermitteln Sie keine Ausweise, Zahlungs- oder Gesundheitsdaten.",
          `<strong>Speicherdauer:</strong> ${privacy.requestRetentionDays} Tage nach Abschluss der Unterhaltung bei Anfragen, die nicht zu Buchungen werden. Die Löschung betrifft die vom Beherbergungsbetrieb verwalteten Daten, nicht Kopien in Ihrem Postfach. Für Buchungen gelten gesonderte Fristen und Pflichten.`,
        ],
      },
      {
        id: "navigazione",
        title: "3. Nutzung und Sicherheit",
        paragraphs: [
          "Die Website wird über GitHub Pages, einen Dienst von GitHub, Inc., bereitgestellt. Zur Bereitstellung und Absicherung können IP-Adresse, Datum und Uhrzeit, angeforderte Ressourcen sowie technische Browser- und Gerätedaten verarbeitet werden.",
          'Zweck sind Nutzung, Sicherheit und Betrieb der Website auf Grundlage des berechtigten Interesses an Bereitstellung und Schutz des Dienstes (Art. 6 Abs. 1 lit. f DSGVO). Ver Sacrum führt kein eigenes Anwendungsprotokollarchiv. GitHub speichert technische Daten gemäß <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">seiner Datenschutzerklärung</a>.',
          "Schriften und Bilder werden mit der Website ausgeliefert. Maps, Booking und Airbnb sind externe Links; diese Dienste werden nicht eingebettet oder automatisch geladen.",
        ],
      },
      {
        id: "cookie",
        title: "4. Cookies und Google Analytics",
        paragraphs: [
          "Wir verwenden Google Analytics 4 zur Messung von Besuchen und Nutzung ausschließlich nach Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Vor einer Auswahl und bei Ablehnung wird das Tag nicht geladen und es werden keine Analytics-Anfragen gesendet.",
          "Nach Einwilligung kann Google Cookie-Kennungen, Browser- und Geräteinformationen, besuchte Seiten, Zeiten und Interaktionen verarbeiten. Die IP-Adresse ist an der Kommunikation mit Google beteiligt; diese Daten sind nicht automatisch anonym.",
          "Formularwerte werden nicht an Analytics gesendet. Werbesignale sind deaktiviert, Einwilligungen für Werbung und Personalisierung bleiben verweigert, und gemeldete URLs enthalten weder Abfrage noch Fragment.",
          `<strong>Speicherung bei Analytics:</strong> ${privacy.eventRetentionMonths} Monate für Ereignisdaten und ${privacy.userRetentionMonths} Monate für Nutzerdaten; der Nutzerdatenzeitraum wird bei neuer Aktivität zurückgesetzt. Die Cookie-Laufzeit im Browser ist davon getrennt.`,
          "Sie können zustimmen, ablehnen oder keine Auswahl treffen und die Cookie-Einstellungen erneut öffnen. Scrollen gilt nicht als Einwilligung. Ein Widerruf deaktiviert Analytics und löscht zugängliche Cookies ohne Neuladen oder Löschen des Formulars; die Rechtmäßigkeit vorheriger Verarbeitung bleibt unberührt.",
          "Blockiert der Browser die Speicherung, gilt die Auswahl für die aktuelle Seite. Website-Daten können im Browser gelöscht werden. Ohne JavaScript wird Analytics nicht geladen.",
          'Anbieterinformationen: <a href="https://policies.google.com/privacy?hl=de">Datenschutzerklärung von Google</a> und <a href="https://support.google.com/analytics/answer/11397207?hl=de">Google-Analytics-Cookies</a>.',
        ],
        storage: [
          [
            "Datenschutzeinstellung im Browser",
            "<code>ver-sacrum.analytics-consent.v2</code> (localStorage) speichert Auswahl und Ablauf, ohne sie an einen Server zu senden. Die Zustimmung gilt sechs Monate; die Ablehnung bleibt bis zur Änderung oder Löschung der Website-Daten bestehen.",
          ],
          [
            "Cookie <code>_ga</code>",
            `Statistisches Google-Analytics-Cookie zur Unterscheidung von Browsern. Die Website setzt eine Laufzeit von ${privacy.cookieDays} Tagen ohne automatische Verlängerung bei jedem Besuch.`,
          ],
          [
            `Cookie <code>${`_ga_${analytics.measurementId.slice(2)}`}</code>`,
            `Statistisches Google-Analytics-Cookie zur Beibehaltung des Sitzungsstatus. Die Website setzt ${privacy.cookieDays} Tage ohne automatische Verlängerung; der Browser kann eine kürzere Grenze anwenden.`,
          ],
        ],
      },
      {
        id: "destinatari",
        title: "5. Empfänger und Übermittlungen",
        paragraphs: [
          "Anfragedaten werden vom Verantwortlichen und befugten Personen verwendet. Das Zielpostfach nutzt Gmail; Google und GitHub verarbeiten Daten im Rahmen ihrer Dienste und Rollen. Daten können bei gesetzlicher Verpflichtung an Behörden weitergegeben werden.",
          'Anbieter können Daten außerhalb des EWR, auch in den USA, verarbeiten. Anwendbare Garantien können Angemessenheitsbeschlüsse und Standardvertragsklauseln umfassen. Siehe <a href="https://policies.google.com/privacy/frameworks?hl=de">Informationen von Google</a> und <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">die GitHub-Datenschutzerklärung</a>; relevante Garantien können beim Verantwortlichen angefordert werden.',
          "Für Google Maps, Booking oder Airbnb gelten die Hinweise des jeweiligen externen Dienstes. Dieses Dokument betrifft die Website von Ver Sacrum.",
        ],
      },
      {
        id: "diritti",
        title: "6. Ihre Rechte",
        paragraphs: [
          "Soweit die DSGVO dies vorsieht, können Sie Auskunft, Berichtigung, Löschung, Einschränkung und Übertragbarkeit verlangen, einer Verarbeitung aus berechtigtem Interesse widersprechen und die Analytics-Einwilligung jederzeit widerrufen.",
          `Zur Ausübung Ihrer Rechte schreiben Sie an <a href="mailto:${privacy.contact}">${privacy.contact}</a>. Sie können sich beim italienischen <a href="https://www.garanteprivacy.it/">Garante</a> oder der zuständigen Behörde Ihres Landes beschweren. Die Website trifft keine ausschließlich automatisierten Entscheidungen mit rechtlicher oder ähnlich erheblicher Wirkung.`,
        ],
      },
    ],
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
  faqLinks: ["Verfügbarkeitsanfrage", "Fotos der Räume", "Ascoli und Lage"],
} satisfies Catalog;
