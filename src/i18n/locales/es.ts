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
    title: "Apartamento en Ascoli Piceno, centro histórico | Ver Sacrum",
    description:
      "Alójate en Ascoli Piceno: apartamento entero en el centro histórico para 1–3 huéspedes, cocina equipada y Wi-Fi. Descubre Ver Sacrum y consulta disponibilidad.",
  },
  home: {
    hero: {
      eyebrow: "APARTAMENTO · CENTRO HISTÓRICO",
      line1: "Ascoli Piceno,",
      line2: "sin prisas.",
      description: [
        "Tu apartamento en Ascoli Piceno, para 1–3 huéspedes.",
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
      line1: "Dormir en Ascoli Piceno.",
      line2: "Sentirse ",
      emphasis: "como en casa.",
      paragraphs: [
        `Ver Sacrum es un apartamento de uso exclusivo en ${site.address}, en el centro histórico de Ascoli Piceno, en las Marcas. A pocos pasos de Piazza del Popolo, permite descubrir la ciudad a pie. Vigas blancas, suelo de madera y ventanas a las callejuelas acompañan tu estancia.`,
        `El apartamento acoge hasta ${site.maxGuests} huéspedes, con un dormitorio doble y un sofá cama en el salón. Cocina equipada, baño privado, Wi-Fi, lavadora y secadora te permiten organizar un fin de semana o una estancia más larga a tu ritmo.`,
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
      line1: "Ascoli Piceno.",
      line2: "Para recorrer a pie.",
      intro:
        "Desde Ver Sacrum puedes recorrer a pie el centro histórico de Ascoli Piceno: Piazza del Popolo, Piazza Arringo y las callejuelas de travertino. Entre visitas, disfruta de un café y de las pequeñas tiendas del centro.",
      items: [
        [
          "Piazza del Popolo",
          "El Palazzo dei Capitani, la iglesia de San Francesco y el histórico Caffè Meletti, a pocos pasos del apartamento.",
        ],
        [
          "Piazza Arringo y la catedral",
          "La catedral de Sant’Emidio y el Palazzo dell’Arengo, para continuar el paseo por el centro.",
        ],
        [
          "El sabor de las Marcas",
          "Aceitunas a la ascolana, tiendas y restaurantes que descubrir entre las callejuelas.",
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
        accommodation: {
          title: "¿Buscas un B&B en Ascoli Piceno?",
          content: [
            `Si buscas un B&B en Ascoli Piceno y deseas una casa solo para ti, Ver Sacrum ofrece un apartamento entero en el centro histórico para un máximo de ${site.maxGuests} huéspedes. Dispones de un dormitorio doble, salón con sofá cama, baño privado y cocina equipada para preparar tus comidas. Descubre los `,
            {
              kind: "link",
              href: "#spazi",
              text: "espacios del apartamento",
            },
            ".",
          ],
        },
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
            `Para descargar el equipaje puedes utilizar las zonas de carga y descarga de Piazza Roma, a unos ${site.parking.unloadingMetres} metros del apartamento. Para estancias más largas, el aparcamiento de pago junto al Palacio de Justicia, en Piazza Serafino Orlini, tiene tarifa por horas; en Via delle Rimembranze hay un ticket diario de ${site.parking.dailyEuros} €. El aparcamiento privado con barrera de Porta Torricella está a unos ${site.parking.privateMetres} metros. Hay aparcamiento gratuito a unos ${site.parking.freeMetres} metros, cerca de Porta Romana, Viale Treviri y Via Oberdan.`,
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
      options:
        "Completa el formulario de abajo o escríbenos directamente por correo electrónico o WhatsApp.",
      direct: "CONTACTO DIRECTO",
      email: "Escríbenos por correo electrónico",
      whatsapp: "Escríbenos por WhatsApp",
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
  location: {
    metaTitle: "Ascoli Piceno: ubicación y aparcamiento | Ver Sacrum",
    metaDescription:
      "Encuentra Ver Sacrum en el centro histórico de Ascoli Piceno: dirección, aparcamiento, descarga de equipaje y acceso cerca de Piazza del Popolo.",
    eyebrow: "VER SACRUM · ASCOLI PICENO",
    title: "En el centro histórico de Ascoli Piceno.",
    intro:
      "Dormir en el centro es salir de casa y comenzar la visita a pie. Aquí encontrarás la ubicación de Ver Sacrum y la información práctica para preparar tu llegada.",
    homeLink: "Ver Sacrum, tu apartamento en el centro",
    breadcrumbLabel: "Ruta de navegación",
    guideLink: "Ubicación, aparcamiento y Ascoli a pie",
    parkingLink: "La guía de aparcamiento y llegada",
    position: {
      title: "Dónde se encuentra el apartamento",
      paragraphs: [
        `Ver Sacrum está en ${site.address}, ${site.postalCode} Ascoli Piceno, a pocos pasos de Piazza del Popolo. El apartamento se encuentra en el centro histórico, entre callejuelas y fachadas de travertino.`,
        `La casa es de uso exclusivo para un máximo de ${site.maxGuests} huéspedes, con dormitorio doble, salón con sofá cama, cocina equipada y baño privado. Una base para un fin de semana en pareja, un viaje familiar o una estancia más larga.`,
      ],
    },
    parking: {
      title: "Dónde aparcar en Ascoli Piceno",
      intro:
        "El alojamiento está en el centro histórico. Si llegas en coche, planifica por separado una parada breve para el equipaje y el aparcamiento durante la estancia.",
      unloading: {
        title: "Descargar el equipaje en Piazza Roma",
        text: `Las plazas de carga y descarga de Piazza Roma están a unos ${site.parking.unloadingMetres} metros del apartamento. Úsalas para una parada breve con las maletas, respetando las señales y los horarios indicados.`,
      },
      paid: {
        title: "Aparcamiento de pago",
        text: `En la zona del tribunal, en Piazza Serafino Orlini, hay aparcamiento en superficie con tarifa por hora. En Via delle Rimembranze, el ticket diario cuesta ${site.parking.dailyEuros} €. El aparcamiento privado de Porta Torricella, con barreras, está a unos ${site.parking.privateMetres} metros.`,
      },
      free: {
        title: "Aparcamiento gratuito hacia Porta Romana",
        text: `Las zonas de aparcamiento gratuito están a unos ${site.parking.freeMetres} metros, en la zona de Porta Romana, a lo largo de Viale Treviri y Via Oberdan. Desde allí puedes continuar a pie hasta el apartamento.`,
      },
      note: "Antes de entrar en las callejuelas o dejar el coche, comprueba las señales, las zonas de tráfico restringido, las plazas disponibles y las tarifas. Escríbenos antes del viaje si tienes dudas sobre la llegada.",
    },
    access: {
      title: "Llegada, escaleras y accesibilidad",
      paragraphs: [
        `El apartamento está en la primera planta, a la que se llega por unos ${site.accessSteps} escalones, sin ascensor. Si viajas con un carrito, equipaje voluminoso o tienes necesidades de movilidad, contacta con nosotros para valorar el acceso antes de reservar.`,
        `La entrada es de ${site.checkin} y la salida de ${site.checkout}. Escríbenos para acordar los detalles de tu llegada.`,
      ],
    },
    visit: {
      title: "Qué ver en el centro de Ascoli Piceno",
      paragraphs: [
        "Empieza por Piazza del Popolo, con el Palazzo dei Capitani, la iglesia de San Francesco y el Caffè Meletti. Continúa hacia Piazza Arringo, donde se encuentran la catedral de Sant’Emidio y el Palazzo dell’Arengo.",
        "El paseo deja tiempo para tiendas, aceitunas a la ascolana y cafés. A la vuelta, tendrás tu cocina y los espacios de Ver Sacrum a tu disposición, al ritmo de una casa solo para ti.",
      ],
    },
    contact: {
      title: "Organicemos tu estancia",
      text: "Indica las fechas y el número de huéspedes. Responderemos con la disponibilidad y los detalles del alojamiento. Puedes añadir preguntas sobre aparcamiento y acceso.",
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
              " cuando la envías. Tu aplicación puede conservar el borrador. Si llamas por teléfono o nos contactas por WhatsApp, tratamos el número y la información que facilites para responder.",
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
              "Las fuentes y las imágenes se sirven con el sitio. Maps, Booking, Airbnb y WhatsApp son enlaces externos; dichos servicios no se integran ni cargan automáticamente.",
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
              "El tratamiento de Google Maps, Booking, Airbnb o WhatsApp se rige por sus propios avisos. Este documento se refiere al sitio de Ver Sacrum.",
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
