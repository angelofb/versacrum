# Ver Sacrum

Sito statico multilingua della dimora Ver Sacrum ad Ascoli Piceno. Design editoriale in avorio e verde oliva, fotografie originali, galleria accessibile e richiesta di disponibilità. Nessuna recensione o valutazione inventata.

## Avvio

Node.js 24 consigliato (`nvm use`); minimo 22.12.

```sh
npm ci
npm run dev
```

Il primo avvio genera le immagini e richiede più tempo. Gli avvii successivi riusano le varianti già generate.

```sh
npm run build
npm run preview
npx playwright install chromium
npm test
```

I test verificano la versione compilata: eseguire la build prima dei test. Screenshot desktop/mobile in `artifacts/`, tracce degli errori in `test-results/`.

## Contenuti e riferimenti

Modificare **`src/site.config.ts`** per email, telefono, indirizzo, dominio, mappa, Booking, Airbnb, CIN/CIR, orari, parcheggi e animali. I dati dell’informativa sono in **`src/privacy.config.ts`**; testi e traduzioni sono nei cataloghi sotto **`src/i18n/`**. Dopo una modifica alla configurazione riavviare il server o ricompilare.

- I placeholder vengono mostrati come testo, senza link fittizi.
- `domain` deve contenere l’URL HTTPS canonico completo. Le cinque home sono indicizzabili; le pagine privacy restano `noindex, follow`. La build genera canonical, alternative linguistiche, dati strutturati, `robots.txt` e sitemap. Procedura e verifiche in [SEO.md](SEO.md).
- `maps`, `booking` e `airbnb` accettano URL HTTPS. Nessuna mappa di terze parti viene caricata automaticamente.
- Il modulo valida i campi e apre un’email precompilata a **versacrumbnb@gmail.com**. L’ospite deve inviarla dal proprio programma di posta: il sito non conferma l’avvenuto invio e conserva i campi. Se il programma non si apre, rimangono disponibili il pulsante per riaprire l’email precompilata e i contatti diretti. Serve un programma o gestore email configurato sul dispositivo.
- Il modulo usa soltanto email precompilate. Il ramo di invio diretto e i campi legacy `site.privacy` e `formEndpoint` sono stati rimossi: introdurre un servizio esterno richiederà una modifica esplicita al codice e un’informativa coerente.
- Le date usano il giorno locale e impongono partenza successiva all'arrivo. La richiesta non equivale a conferma di prenotazione. In caso di errore o timeout i dati restano nel modulo.
- Senza JavaScript contenuti, FAQ, navigazione e link alle foto restano utilizzabili; il form rimane disabilitato.

## Foto

Gli originali in `src/images/` sono preservati. La selezione è definita in `photos` dentro `src/site.config.ts`:

| Ambiente             | Originale    |
| -------------------- | ------------ |
| Soggiorno / apertura | IMG_8595.jpg |
| Camera               | IMG_8597.jpg |
| Cucina               | IMG_8584.jpg |
| Bagno                | IMG_8569.jpg |
| Caffè e dettagli     | IMG_8580.jpg |
| Pianta e finestra    | IMG_8607.jpg |
| Vicolo di Ascoli     | IMG_8571.jpg |

`scripts/images.ts` genera AVIF, WebP e JPEG a più larghezze, corregge l'orientamento e rimuove i metadati dalle varianti. Nomi descrittivi con hash permettono di cambiare foto senza riutilizzare vecchi URL. Il browser seleziona formato e risoluzione tramite `picture`, `srcset` e `sizes`. Le immagini sotto la prima schermata sono lazy; il JPEG grande della galleria si carica solo all'apertura. Vengono generati anche immagine Open Graph e icona Apple.

Le cartelle generate sono ignorate da Git. Se si cambiano foto o impostazioni di compressione, si possono eliminare **solo** `src/public/images/` e `src/image-manifest.json`, quindi ricostruire, per rimuovere varianti obsolete.

## Lingue e URL

Astro genera HTML statico completo in italiano, inglese, francese, spagnolo e tedesco. L’italiano resta sulla root; le altre lingue usano `/en/`, `/fr/`, `/es/` e `/de/`. Ogni lingua dispone anche della propria pagina `privacy.html`. Non viene eseguito alcun redirect automatico in base al browser.

Astro gestisce il routing i18n; `src/i18n/config.ts` definisce tutte le lingue. Ogni file in `src/i18n/locales/` contiene un catalogo completo e indipendente verificato da `schema.ts` con TypeScript. Non ci sono fallback: una chiave mancante ferma i controlli. I template leggono proprietà tipizzate e il browser riceve soltanto i messaggi necessari della lingua corrente, serializzati in JSON sicuro. Il selettore usa link reali, funziona senza JavaScript e conserva le ancore equivalenti. Canonical, `hreflang`, Open Graph, JSON-LD e sitemap sono generati per tutte le lingue.

Orari, distanze, tariffe e numero di gradini sono dati condivisi in `site.config.ts`; date e durate di conservazione sono in `privacy.config.ts`. Le frasi (incluse regole sugli animali e indicazioni di parcheggio) appartengono ai cataloghi. Per aggiungere una lingua: registrarla in `config.ts`, creare il catalogo e registrarlo in `index.ts`; route e alternative linguistiche seguono la configurazione.

FAQ e sezioni privacy usano identificatori stabili. I testi ricchi sono sequenze tipizzate di testo, link, grassetto, codice e interruzioni di riga: non inserire HTML nei cataloghi. Il componente `RichText.astro` esegue l’escaping dei contenuti; la posizione della tabella cookie è un blocco esplicito nel catalogo, modificabile senza indici nel template.

Per confrontare visivamente una build precedente: `VISUAL_REFERENCE_DIR=/percorso/della/vecchia/dist npm test`. Home e privacy italiane e home tedesca vengono confrontate nello stesso browser e sistema operativo, con immagini e font caricati; le schermate sono allegate ai risultati.

## Struttura e dipendenze

- `src/components/Home.astro` e `Privacy.astro`: template condivisi delle pagine.
- `src/i18n/`: cataloghi per lingua in `locales/`, schema comune, configurazione lingue e helper; `runtime.ts` legge i soli messaggi generati per la pagina corrente.
- `src/pages/`: route statiche, `robots.txt` e sitemap multilingua.
- `src/styles.css`: stile responsive e preferenza movimento ridotto.
- `src/main.ts`: lightbox, validazione e preparazione dell’email localizzati.
- Astro: generazione statica, routing i18n e bundling tramite Vite. TypeScript: cataloghi localizzati. Sharp: immagini. Fontsource: font locali. Playwright e axe: verifiche browser e accessibilità.

Tailwind CDN, PostCSS/autoprefixer espliciti, clean-css, html-minifier-terser e ffmpeg-static sono stati rimossi perché non più usati. Non ci sono font remoti o widget esterni. Google Analytics viene caricato soltanto dopo l’accettazione dell’ospite. Le versioni sono bloccate in `package-lock.json`.

## Pubblicazione

Il workflow GitHub Pages usa Node 24, esegue build e test prima del deploy di `dist/`. In Settings → Pages scegliere GitHub Actions. Il dominio `versacrumbnb.it` è impostato in configurazione e in `src/public/CNAME`. Verifica del 20 settembre 2026: DNS corretto, certificato approvato per dominio principale e www, HTTPS obbligatorio attivo. Home e privacy pubblicate rispondono 200 in HTTPS; HTTP e www reindirizzano al dominio canonico. Verifica tracciata in [#3](https://github.com/angelofb/versacrum/issues/3). Nessun deploy viene avviato dalla sola modifica locale.

Documentazione: [Astro i18n](https://docs.astro.build/en/guides/internationalization/), [Sharp](https://sharp.pixelplumbing.com/api-output/), [release delle azioni GitHub](https://github.com/actions/checkout/releases).

## Google Analytics

L’ID GA4 è `G-3S75NJZ588`, configurato in `analytics.measurementId` dentro `src/site.config.ts`. `src/analytics.ts` carica il tag Google solo dopo l’accettazione: prima della scelta e dopo il rifiuto non viene effettuata alcuna richiesta ad Analytics.

L’accettazione resta valida in `localStorage` per sei mesi di calendario; il rifiuto persiste finché viene modificato o cancellato lo storage. I cookie Analytics sono configurati per 180 giorni, senza rinnovo automatico: è una durata distinta. La scadenza viene verificata anche a pagina aperta e al ritorno sulla scheda. “Preferenze cookie” nel footer permette di modificarla. La revoca disabilita Analytics, elimina i cookie `_ga` e `_ga_*` senza ricaricare la pagina, tramite il flag di esclusione documentato da Google. Il tag già caricato resta in memoria ma non è autorizzato a inviare misurazioni. Le altre schede aperte sullo stesso sito recepiscono il cambio di scelta. Con storage non disponibile la scelta vale per la pagina corrente.

I consensi pubblicitari restano negati e Google Signals è disabilitato. L’URL iniziale inviato non include query string o frammento; il codice non invia i campi del modulo ad Analytics. L’informativa riporta i valori letti nella proprietà il 20 settembre 2026: eventi 2 mesi, utenti 14 mesi con rinnovo a nuova attività. I campi della richiesta non sono inseriti in link nel DOM; prima del caricamento del tag vengono eliminate query e ancore non riconosciute dall’URL, per evitare che le misurazioni automatiche le includano in altri parametri. Il modulo ha una destinazione esplicita priva di query.

I test intercettano il tag Google, verificando blocco iniziale, rifiuto, accettazione, persistenza, scadenza e revoca senza inviare visite di prova alla proprietà reale. Dopo la pubblicazione verificare una visita con consenso nei report in tempo reale di Analytics.

Riferimento: [Consent Mode di Google, modalità di base](https://developers.google.com/tag-platform/security/concepts/consent-mode).

## Verifica del tag reale e conservazione delle richieste

Il test ordinario usa un tag simulato. Per verificare anche il codice Google effettivo, scaricare il tag pubblico in un file temporaneo e indicarlo con `GA4_TAG_FIXTURE`:

```sh
curl --fail --silent --show-error 'https://www.googletagmanager.com/gtag/js?id=G-3S75NJZ588' -o /tmp/versacrum-gtag.js
npm run build
GA4_TAG_FIXTURE=/tmp/versacrum-gtag.js npx playwright test tests/analytics-live.spec.ts
```

Questo test esegue il tag in locale e intercetta tutte le richieste esterne: nessun evento di prova raggiunge Google. Verifica assenza di dati del modulo e dell’URL negli eventi e blocco dopo la revoca. La prova non sostituisce la verifica di ricezione nei report reali (#2). Ripeterla se cambiano proprietà, tag o modalità di contatto. Le impostazioni di misurazione avanzata non sono state modificate durante la correzione.

Il gestore ha confermato la cancellazione delle richieste senza prenotazione dopo 30 giorni dalla chiusura, manualmente finché #11 non sarà implementata. Registrare la chiusura, escludere le prenotazioni e rimuovere alla scadenza le email interessate anche dal cestino, oltre alle eventuali copie della struttura. Il solo spostamento nel cestino aggiungerebbe normalmente altri 30 giorni. Non svuotare indiscriminatamente l’intera casella o il cestino. Questa procedura non elimina le copie del mittente; l’automazione Gmail non è stata attivata.
