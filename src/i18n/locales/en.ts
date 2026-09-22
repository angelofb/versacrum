import { site, analytics } from "../../site.config.ts";
import { privacy } from "../../privacy.config.ts";
import { formatUpdated } from "../helpers.ts";
import type { Catalog } from "../schema.ts";

export default {
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
      labels: {
        checkin: "Check-in",
        checkout: "Check-out",
        pets: "Travelling together",
      },
      cta: "Let’s talk about your stay",
      faq: {
        capacity: {
          title: "How many guests can Ver Sacrum accommodate?",
          content: [
            "The house welcomes up to three guests, with a double bed in the bedroom and a sofa bed in the living room. You can specify the number of guests in your ",
            { kind: "link", href: "#contatti", text: "availability request" },
            ".",
          ],
        },
        kitchen: {
          title: "Does the house have a kitchen?",
          content: [
            "Yes. The equipped kitchen includes a hob, oven and kettle, as well as a washing machine and tumble dryer. Prepare your own meals and organise each day at your own pace. See the ",
            { kind: "link", href: "#spazi", text: "photos of the spaces" },
            ".",
          ],
        },
        location: {
          title: "Where is Ver Sacrum in Ascoli Piceno?",
          content: [
            `The house is at ${site.address}, in Ascoli Piceno’s historic centre. The `,
            { kind: "link", href: "#ascoli", text: "Ascoli and location" },
            " section shows the view over the lanes and how to find us.",
          ],
        },
        arrival: {
          title: "Arrival and departure",
          content: [
            `Check-in: ${site.checkin}.`,
            { kind: "break" },
            `Check-out: ${site.checkout}.`,
          ],
        },
        accessibility: {
          title: "Stairs and accessibility",
          content: [
            `The house is on the first floor, reached by approximately ${site.accessSteps} steps, with no lift. If you have specific needs, please speak to us before booking.`,
          ],
        },
        parking: {
          title: "Parking and restricted traffic zone",
          content: [
            `For unloading luggage, you may use the loading bays in Piazza Roma, around ${site.parking.unloadingMetres} metres from the apartment. Longer stays are available in paid street parking near the courthouse in Piazza Serafino Orlini, or in Via delle Rimembranze, where a daily ticket costs €${site.parking.dailyEuros}. The private barrier-controlled Porta Torricella car park is about ${site.parking.privateMetres} metres away. Free parking is around ${site.parking.freeMetres} metres away near Porta Romana, Viale Treviri and Via Oberdan.`,
          ],
        },
        pets: {
          title: "Travelling with pets",
          content: ["Small pets are welcome."],
        },
      },
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
  privacy: {
    metaTitle: "Privacy and cookies | Ver Sacrum",
    metaDescription:
      "Information about how Ver Sacrum processes enquiry data and uses cookies.",
    eyebrow: "VER SACRUM · DATA INFORMATION",
    title: "Privacy and cookies",
    updated: `Last updated: ${formatUpdated("en")}.`,
    authority:
      "This translation is provided for information. If it differs from the Italian version, the Italian text prevails.",
    intro:
      "This notice covers visits to the Ver Sacrum website and requests for information or availability. Specific information about processing required for a booking and stay will be provided before those data are collected.",
    back: "Back to Ver Sacrum",
    sections: {
      titolare: {
        title: "1. Who processes the data",
        blocks: [
          {
            kind: "paragraph",
            content: [
              "The data controller is ",
              { kind: "strong", text: `${privacy.controller}` },
              `, whose contact address is ${privacy.address}. For privacy questions or to exercise your rights, email `,
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
        title: "2. Availability requests and contact",
        blocks: [
          {
            kind: "paragraph",
            content: [
              "The form collects your name, email address, arrival and departure dates, number of guests and any message. The form and prepared request remain in your browser: this website does not save the fields in its own database or transmit them to a sending service.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "“Send request” opens a prepared email in your email application. The request reaches ",
              {
                kind: "link",
                href: `mailto:${site.email}`,
                text: `${site.email}`,
              },
              " only when you send it there. Your email application may retain the draft. If you call us, we process your number and the information you choose to provide in order to reply.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "We process these data to answer questions and manage your stay request, under steps taken at your request before entering into a contract (Article 6(1)(b) GDPR). You do not need to accept Analytics to contact us.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "Providing data is optional, but without the necessary information we cannot reply or check availability. The free-text message is optional; do not include identity documents, payment details or health information.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              { kind: "strong", text: "Retention:" },
              ` ${privacy.requestRetentionDays} days after the conversation is closed for requests that do not become bookings. Deletion covers emails and request data managed by the accommodation, not copies in your mailbox. Requests that become bookings follow separate periods and obligations explained in the stay notice.`,
            ],
          },
        ],
      },
      navigazione: {
        title: "3. Browsing and security",
        blocks: [
          {
            kind: "paragraph",
            content: [
              "The website is hosted on GitHub Pages, a service provided by GitHub, Inc. To deliver and protect the website, the infrastructure may process IP address, request date and time, requested resources, browser data and technical device information.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "The purpose is to provide, secure and maintain the website, based on the legitimate interest in making the service available and protecting it (Article 6(1)(f) GDPR). Ver Sacrum does not maintain an application log archive. GitHub retains technical data as described in ",
              {
                kind: "link",
                href: "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement",
                text: "its privacy statement",
              },
              ".",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "Fonts and images are served with the website. Maps, Booking and Airbnb are external links; those services are not embedded or loaded automatically.",
            ],
          },
        ],
      },
      cookie: {
        title: "4. Cookies and Google Analytics",
        blocks: [
          {
            kind: "paragraph",
            content: [
              "We use Google Analytics 4 to measure visits and understand use of the website, only after you accept. Processing is based on consent (Article 6(1)(a) GDPR). Before a choice, and after a refusal, the website does not load the tag or send Analytics requests.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "After acceptance, Google may process cookie identifiers, browser and device information, visited pages, times and interactions under the property’s active settings. The IP address is involved in communication with Google’s servers; these data must not automatically be regarded as anonymous.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "The website does not send form values to Analytics. Advertising signals are disabled, advertising and personalisation consent remains denied, and query strings and fragments are removed from the reported page URL.",
            ],
          },
          {
            kind: "storage",
            items: [
              {
                term: ["Browser privacy preference"],
                description: [
                  { kind: "code", text: "ver-sacrum.analytics-consent.v2" },
                  " (localStorage): stores the choice and expiry without sending them to a server. Acceptance lasts six months; refusal remains until changed or site data are deleted.",
                ],
              },
              {
                term: ["Cookie ", { kind: "code", text: "_ga" }],
                description: [
                  `Google Analytics statistical cookie used to distinguish browsers. The website sets a ${privacy.cookieDays}-day lifetime without automatic renewal on every visit.`,
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
                  `Google Analytics statistical cookie used to maintain session state. The website sets a ${privacy.cookieDays}-day lifetime without automatic renewal; the browser may impose a shorter limit.`,
                ],
              },
            ],
          },
          {
            kind: "paragraph",
            content: [
              { kind: "strong", text: "Analytics server retention:" },
              ` event data for ${privacy.eventRetentionMonths} months and user data for ${privacy.userRetentionMonths} months, with the user-data period reset on new activity. Browser cookie duration is separate from server retention.`,
            ],
          },
          {
            kind: "paragraph",
            content: [
              "You may accept, decline or make no choice, and reopen Cookie preferences on every page. Scrolling does not constitute consent. Withdrawal disables Analytics and removes accessible Analytics cookies without reloading or clearing the form; it does not affect the lawfulness of earlier processing.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "If the browser blocks storage, the choice applies to the current page. You can delete site data in browser settings. Analytics is not loaded without JavaScript.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "Provider information: ",
              {
                kind: "link",
                href: "https://policies.google.com/privacy?hl=en",
                text: "Google Privacy Policy",
              },
              " and ",
              {
                kind: "link",
                href: "https://support.google.com/analytics/answer/11397207?hl=en",
                text: "Google Analytics cookies",
              },
              ".",
            ],
          },
        ],
      },
      destinatari: {
        title: "5. Recipients and international transfers",
        blocks: [
          {
            kind: "paragraph",
            content: [
              "Request data are used by the controller and authorised people who manage them. The destination mailbox uses Gmail; Google services and GitHub hosting process data within their respective services and roles. Data may be disclosed to authorities where required by law.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "Providers may process data outside the European Economic Area, including in the United States. Applicable safeguards may include adequacy decisions and standard contractual clauses. See ",
              {
                kind: "link",
                href: "https://policies.google.com/privacy/frameworks?hl=en",
                text: "Google’s transfer information",
              },
              " and ",
              {
                kind: "link",
                href: "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement",
                text: "GitHub’s privacy statement",
              },
              "; you may ask the controller for information and a copy of relevant safeguards.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "If you follow a link to Google Maps, Booking or Airbnb, that external service’s notice governs its processing. This notice concerns the Ver Sacrum website.",
            ],
          },
        ],
      },
      diritti: {
        title: "6. Your rights",
        blocks: [
          {
            kind: "paragraph",
            content: [
              "Where provided by the GDPR, you may request access, rectification, erasure, restriction and portability. You may object to processing based on legitimate interests for reasons relating to your situation and withdraw Analytics consent at any time.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "To exercise your rights, email ",
              {
                kind: "link",
                href: `mailto:${privacy.contact}`,
                text: `${privacy.contact}`,
              },
              ". You may complain to the Italian ",
              {
                kind: "link",
                href: "https://www.garanteprivacy.it/",
                text: "Data Protection Authority",
              },
              " or the competent authority in your country. The website does not make solely automated decisions producing legal or similarly significant effects.",
            ],
          },
        ],
      },
    },
  },
  dynamic: {
    configuredNotice:
      "The button prepares an email: review it and send it from your email application. The website does not send your request automatically.",
    unavailable:
      "Sending is not available yet. Please use the direct contact details.",
    arrivalError: "Choose an arrival date from today onwards.",
    departureError: "Departure must be after arrival.",
    emailGreeting:
      "Hello, I would like to ask about availability at Ver Sacrum.",
    emailLabels: ["Name", "Email", "Arrival", "Departure", "Guests"],
    emailSubject: "[EN] Availability request — Ver Sacrum",
    prepared:
      "Your email is ready but has not been sent. If your email application does not open, ",
    openEmail: "open the prepared email",
    direct: " or use the direct contact details.",
    consentAccepted: "Current choice: Analytics accepted.",
    consentRejected: "Current choice: Analytics declined.",
    consentOff: "Analytics remains off until you accept.",
  },
  consent: {
    title: "Website statistics",
    description:
      "With your consent, we use Google Analytics and its cookies to understand how the website is visited. You may decline and continue browsing, or change your choice through “Cookie preferences” at the bottom of the page.",
    privacyLink: "Read the privacy and cookie notice",
    reject: "Decline Analytics",
    accept: "Accept Analytics",
  },
  photoAlt: {
    soggiorno:
      "Living room with a mustard sofa, white beams and two windows overlooking the historic centre",
    camera: "Double bedroom with a turquoise wardrobe, bed and exposed beams",
    cucina: "Grey kitchen with oven, hob and kettle beneath wooden beams",
    bagno: "Bathroom with white basin, grey finishes and glass shower",
    colazione:
      "Cup and coffee pot on a floral placemat in front of the kitchen",
    dettagli:
      "Hanging plant by the window and view of the living room with yellow sofa",
    ascoli:
      "View from the window over an Ascoli lane, stone façades and shutters",
  },
} satisfies Catalog;
