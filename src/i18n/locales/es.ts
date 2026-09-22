import { site, analytics } from "../../site.config.ts";
import { privacy } from "../../privacy.config.ts";
import { formatUpdated } from "../helpers.ts";
import type { Catalog } from "../schema.ts";

export default {
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
      labels: { checkin: "Llegada", checkout: "Salida", pets: "En compañía" },
      cta: "Hablemos de tu estancia",
      faq: {
        capacity: {
          title: "¿Cuántas personas puede alojar Ver Sacrum?",
          content: [
            "La casa puede recibir hasta tres huéspedes, con una cama doble en el dormitorio y un sofá cama en el salón. Indica el número de huéspedes en la ",
            {
              kind: "link",
              href: "#contatti",
              text: "solicitud de disponibilidad",
            },
            ".",
          ],
        },
        kitchen: {
          title: "¿El alojamiento dispone de cocina?",
          content: [
            "Sí. La cocina está equipada con placa, horno y hervidor. También hay lavadora y secadora. Prepara tus comidas y organiza el día a tu ritmo. Mira las ",
            { kind: "link", href: "#spazi", text: "fotos de los espacios" },
            ".",
          ],
        },
        location: {
          title: "¿Dónde se encuentra Ver Sacrum en Ascoli Piceno?",
          content: [
            `La casa está en ${site.address}, en el centro histórico de Ascoli Piceno. En la sección `,
            { kind: "link", href: "#ascoli", text: "Ascoli y ubicación" },
            " encontrarás las vistas a las callejuelas y las indicaciones para llegar.",
          ],
        },
        arrival: {
          title: "Llegada y salida",
          content: [
            `Llegada: ${site.checkin}.`,
            { kind: "break" },
            `Salida: ${site.checkout}.`,
          ],
        },
        accessibility: {
          title: "Escaleras y accesibilidad",
          content: [
            `La casa está en la primera planta, accesible por unos ${site.accessSteps} escalones y sin ascensor. Si tienes necesidades específicas, consúltanos antes de reservar.`,
          ],
        },
        parking: {
          title: "Aparcamiento y ZTL",
          content: [
            `Para descargar el equipaje puedes utilizar las zonas de carga y descarga de Piazza Roma, a unos ${site.parking.unloadingMetres} metros del apartamento. Para estancias más largas hay aparcamiento de pago junto al Palacio de Justicia, en Piazza Serafino Orlini, y en Via delle Rimembranze, con un abono diario de ${site.parking.dailyEuros} €. El aparcamiento privado con barrera de Porta Torricella está a unos ${site.parking.privateMetres} metros. Hay aparcamiento gratuito a unos ${site.parking.freeMetres} metros, cerca de Porta Romana, Viale Treviri y Via Oberdan.`,
          ],
        },
        pets: {
          title: "Viajar con mascotas",
          content: ["Se admiten mascotas pequeñas."],
        },
      },
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
  privacy: {
    metaTitle: "Privacidad y cookies | Ver Sacrum",
    metaDescription:
      "Información sobre el tratamiento de solicitudes y las cookies de Ver Sacrum.",
    eyebrow: "VER SACRUM · INFORMACIÓN SOBRE DATOS",
    title: "Privacidad y cookies",
    updated: `Última actualización: ${formatUpdated("es")}.`,
    authority:
      "Esta traducción se facilita a título informativo. En caso de discrepancia, prevalece el texto italiano.",
    intro:
      "Este aviso se refiere a la visita del sitio de Ver Sacrum y a las solicitudes de información o disponibilidad. El tratamiento necesario para una reserva y la estancia se explicará antes de recoger los datos correspondientes.",
    back: "Volver a Ver Sacrum",
    sections: {
      titolare: {
        title: "1. Responsable del tratamiento",
        blocks: [
          {
            kind: "paragraph",
            content: [
              "El responsable del tratamiento es ",
              { kind: "strong", text: `${privacy.controller}` },
              `, con domicilio de referencia en ${privacy.address}. Para cuestiones de privacidad o para ejercer tus derechos, escribe a `,
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
        title: "2. Solicitudes de disponibilidad y contacto",
        blocks: [
          {
            kind: "paragraph",
            content: [
              "El formulario recoge nombre, correo electrónico, fechas de llegada y salida, número de huéspedes y un mensaje opcional. La cumplimentación y preparación se realizan en el navegador: el sitio no guarda estos campos en una base de datos propia ni los transmite a un servicio de envío.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "«Enviar la solicitud» abre un correo preparado en tu aplicación. La solicitud solo llega a ",
              {
                kind: "link",
                href: `mailto:${site.email}`,
                text: `${site.email}`,
              },
              " cuando la envías. Tu aplicación puede conservar el borrador. Si llamas por teléfono, tratamos el número y la información que facilites para responder.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "La finalidad es responder y gestionar la solicitud de estancia, sobre la base de medidas precontractuales solicitadas por el interesado (art. 6.1.b del RGPD). No es necesario aceptar Analytics para contactarnos.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "Facilitar los datos es opcional, pero sin la información necesaria no podremos responder ni comprobar la disponibilidad. No incluyas documentos, datos de pago ni información sanitaria.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              { kind: "strong", text: "Conservación:" },
              ` ${privacy.requestRetentionDays} días desde el cierre de la conversación para solicitudes que no se conviertan en reservas. La eliminación afecta a los datos gestionados por el alojamiento, no a las copias de tu buzón. Las reservas siguen plazos y obligaciones diferentes.`,
            ],
          },
        ],
      },
      navigazione: {
        title: "3. Navegación y seguridad",
        blocks: [
          {
            kind: "paragraph",
            content: [
              "El sitio está alojado en GitHub Pages, servicio de GitHub, Inc. Para proporcionar y proteger el sitio, la infraestructura puede tratar la dirección IP, fecha y hora, recursos solicitados y datos técnicos del navegador y dispositivo.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "La finalidad es permitir la navegación y mantener la seguridad y el funcionamiento, sobre la base del interés legítimo en proporcionar y proteger el servicio (art. 6.1.f del RGPD). Ver Sacrum no conserva un archivo propio de registros. GitHub conserva los datos técnicos según ",
              {
                kind: "link",
                href: "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement",
                text: "su declaración de privacidad",
              },
              ".",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "Las fuentes y las imágenes se sirven con el sitio. Maps, Booking y Airbnb son enlaces externos; dichos servicios no se integran ni cargan automáticamente.",
            ],
          },
        ],
      },
      cookie: {
        title: "4. Cookies y Google Analytics",
        blocks: [
          {
            kind: "paragraph",
            content: [
              "Usamos Google Analytics 4 para medir visitas y comprender el uso del sitio, únicamente después de tu aceptación, sobre la base del consentimiento (art. 6.1.a del RGPD). Antes de elegir o si rechazas, no se carga la etiqueta ni se envían solicitudes.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "Tras la aceptación, Google puede tratar identificadores de cookies, información del navegador y dispositivo, páginas visitadas, horarios e interacciones. La dirección IP interviene en la comunicación con Google; estos datos no deben considerarse automáticamente anónimos.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "El sitio no envía a Analytics los valores del formulario. Las señales publicitarias están desactivadas, los consentimientos de publicidad y personalización siguen denegados y la URL comunicada no incluye consultas ni fragmentos.",
            ],
          },
          {
            kind: "storage",
            items: [
              {
                term: ["Preferencia de privacidad del navegador"],
                description: [
                  { kind: "code", text: "ver-sacrum.analytics-consent.v2" },
                  " (localStorage) guarda la elección y su vencimiento sin enviarlos a un servidor. La aceptación dura seis meses; el rechazo se mantiene hasta que se cambie o se eliminen los datos del sitio.",
                ],
              },
              {
                term: ["Cookie ", { kind: "code", text: "_ga" }],
                description: [
                  `Cookie estadística de Google Analytics para distinguir navegadores. El sitio fija una duración de ${privacy.cookieDays} días, sin renovación automática en cada visita.`,
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
                  `Cookie estadística de Google Analytics para mantener el estado de la sesión. El sitio fija ${privacy.cookieDays} días sin renovación automática; el navegador puede aplicar un límite menor.`,
                ],
              },
            ],
          },
          {
            kind: "paragraph",
            content: [
              { kind: "strong", text: "Conservación en Analytics:" },
              ` ${privacy.eventRetentionMonths} meses para eventos y ${privacy.userRetentionMonths} meses para datos de usuario; este último plazo se reinicia con nueva actividad. La duración de las cookies del navegador es independiente.`,
            ],
          },
          {
            kind: "paragraph",
            content: [
              "Puedes aceptar, rechazar o no elegir y volver a abrir Preferencias de cookies. Desplazarse no implica consentimiento. La retirada desactiva Analytics y elimina las cookies accesibles sin recargar ni borrar el formulario, sin afectar a la licitud del tratamiento anterior.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "Si el navegador bloquea el almacenamiento, la elección se aplica a la página actual. Puedes eliminar los datos del sitio desde el navegador. Sin JavaScript no se carga Analytics.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "Información del proveedor: ",
              {
                kind: "link",
                href: "https://policies.google.com/privacy?hl=es",
                text: "política de privacidad de Google",
              },
              " y ",
              {
                kind: "link",
                href: "https://support.google.com/analytics/answer/11397207?hl=es",
                text: "cookies de Google Analytics",
              },
              ".",
            ],
          },
        ],
      },
      destinatari: {
        title: "5. Destinatarios y transferencias",
        blocks: [
          {
            kind: "paragraph",
            content: [
              "Los datos de las solicitudes son utilizados por el responsable y las personas autorizadas. El buzón de destino usa Gmail; Google y GitHub tratan datos dentro de sus respectivos servicios y funciones. Los datos pueden comunicarse a las autoridades cuando la ley lo exija.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "Los proveedores pueden tratar datos fuera del EEE, incluso en Estados Unidos. Las garantías aplicables pueden incluir decisiones de adecuación y cláusulas contractuales tipo. Consulta la ",
              {
                kind: "link",
                href: "https://policies.google.com/privacy/frameworks?hl=es",
                text: "información de Google",
              },
              " y ",
              {
                kind: "link",
                href: "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement",
                text: "la declaración de GitHub",
              },
              "; puedes solicitar al responsable información y copia de las garantías pertinentes.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "El tratamiento de Google Maps, Booking o Airbnb se rige por sus propios avisos. Este documento se refiere al sitio de Ver Sacrum.",
            ],
          },
        ],
      },
      diritti: {
        title: "6. Tus derechos",
        blocks: [
          {
            kind: "paragraph",
            content: [
              "En los casos previstos por el RGPD puedes solicitar acceso, rectificación, supresión, limitación y portabilidad, oponerte al tratamiento basado en intereses legítimos y retirar en cualquier momento el consentimiento para Analytics.",
            ],
          },
          {
            kind: "paragraph",
            content: [
              "Para ejercer tus derechos escribe a ",
              {
                kind: "link",
                href: `mailto:${privacy.contact}`,
                text: `${privacy.contact}`,
              },
              ". Puedes reclamar ante el ",
              {
                kind: "link",
                href: "https://www.garanteprivacy.it/",
                text: "Garante italiano",
              },
              " o la autoridad competente de tu país. El sitio no adopta decisiones exclusivamente automatizadas con efectos jurídicos o similares.",
            ],
          },
        ],
      },
    },
  },
  dynamic: {
    configuredNotice:
      "El botón prepara un correo: revísalo y envíalo desde tu aplicación de correo. El sitio no envía la solicitud automáticamente.",
    unavailable:
      "El envío todavía no está disponible. Utiliza los datos de contacto directo.",
    arrivalError: "Elige una fecha de llegada a partir de hoy.",
    departureError: "La salida debe ser posterior a la llegada.",
    emailGreeting: "Hola, quisiera consultar la disponibilidad de Ver Sacrum.",
    emailLabels: ["Nombre", "Correo", "Llegada", "Salida", "Huéspedes"],
    emailSubject: "[ES] Solicitud de disponibilidad — Ver Sacrum",
    prepared:
      "El correo está preparado, pero todavía no se ha enviado. Si no se abre tu aplicación, ",
    openEmail: "abre el correo preparado",
    direct: " o utiliza los datos de contacto directo.",
    consentAccepted: "Elección actual: Analytics aceptado.",
    consentRejected: "Elección actual: Analytics rechazado.",
    consentOff: "Analytics permanece desactivado hasta que lo aceptes.",
  },
  consent: {
    title: "Estadísticas del sitio",
    description:
      "Con tu consentimiento usamos Google Analytics y sus cookies para comprender cómo se visita el sitio. Puedes rechazarlo y seguir navegando, o cambiar tu elección en «Preferencias de cookies» al final de la página.",
    privacyLink: "Leer la política de privacidad y cookies",
    reject: "Rechazar Analytics",
    accept: "Aceptar Analytics",
  },
  photoAlt: {
    soggiorno:
      "Salón con sofá mostaza, vigas blancas y dos ventanas al centro histórico",
    camera: "Dormitorio doble con armario turquesa, cama y vigas vistas",
    cucina: "Cocina gris con horno, placa y hervidor bajo las vigas de madera",
    bagno: "Baño con lavabo blanco, revestimientos grises y ducha de cristal",
    colazione:
      "Taza y cafetera sobre un mantel individual de flores frente a la cocina",
    dettagli:
      "Planta colgante junto a la ventana y vista del salón con sofá amarillo",
    ascoli:
      "Vista desde la ventana a una callejuela de Ascoli, fachadas de piedra y contraventanas",
  },
} satisfies Catalog;
