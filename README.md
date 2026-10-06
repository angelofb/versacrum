# Ver Sacrum

Sito statico multilingua della dimora Ver Sacrum ad Ascoli Piceno. Design editoriale in avorio e verde oliva, fotografie originali, galleria accessibile e richiesta di disponibilità. Nessuna recensione o valutazione inventata.

Attività residue, verifiche esterne e decisioni sono tracciate nelle [issue del progetto](https://github.com/angelofb/versacrum/issues); non ci sono checklist locali parallele.

## Avvio

Node.js 24 in CI; minimo 22.12. In locale usiamo i runtime e i tool gestiti da mise.

```sh
npm ci
npm run hooks:install
npm run browsers:install
npm run dev
```

Lefthook e actionlint devono essere disponibili nel PATH usato da mise. Lefthook installato con Homebrew è supportato: `mise exec` usa anche i programmi già presenti nel PATH. Installare gli hook su ogni clone; l'installazione dei browser Playwright serve al primo avvio e dopo gli aggiornamenti di Playwright. Se mancano librerie di sistema, seguire il messaggio di Playwright per installarle.

Le immagini ottimizzate sono già nel repository. `npm run dev` aggiorna le varianti usando la cache locale; `npm run images` permette di rigenerarle esplicitamente.

```sh
npm run verify
npm run preview
```

`npm run verify` esegue formattazione, actionlint, build Astro, tipi, cataloghi, SEO, immagini, quattro progetti browser e audit dipendenze (soglia high). I test browser girano con due worker e vietano `test.only`. È lo stesso comando eseguito dall'hook pre-push.

Per eseguire soltanto build e test: `npm run build && npm test`. La build non genera più immagini: usa gli asset versionati. I test verificano la versione compilata: eseguire la build prima dei test. `npm run preview` usa la CLI ufficiale Astro con `--ignore-lock`, senza un server HTTP personalizzato. Playwright avvia il proprio preview: fermare eventuali server locali sulla porta 4173 prima di eseguire `npm test`. Chromium e WebKit vengono provati su desktop e viewport iPhone. Screenshot in `artifacts/`, tracce degli errori in `test-results/`. Firefox resta una possibile estensione: i due motori attuali coprono Chrome/Edge e Safari senza aumentare subito la matrice. Su macOS il test di focus Safari usa Option-Tab, che include i collegamenti anche quando Full Keyboard Access non è attivo.

La prima misura mobile sul dominio pubblicato, distinta dai test automatici, è in [PERFORMANCE.md](PERFORMANCE.md).
La decisione sugli header HTTP del sito pubblico e il rischio residuo di GitHub Pages sono in [SECURITY.md](SECURITY.md); `npm run audit:headers` ripete il controllo sul dominio.

## Contenuti e riferimenti

Modificare **`src/site.config.ts`** per email, telefono, indirizzo, dominio, mappa, Booking, Airbnb, CIN/CIR, orari, parcheggi e animali. I dati dell’informativa sono in **`src/privacy.config.ts`**; testi e traduzioni sono nei cataloghi sotto **`src/i18n/`**. Dopo una modifica alla configurazione riavviare il server o ricompilare.

- I placeholder vengono mostrati come testo, senza link fittizi.
- `domain` deve contenere l’URL HTTPS canonico completo. Le cinque home sono indicizzabili; le pagine privacy restano `noindex, follow`. La build genera canonical, alternative linguistiche, dati strutturati, `robots.txt` e sitemap. Procedura e verifiche in [SEO.md](SEO.md).
- `maps`, `booking` e `airbnb` accettano URL HTTPS. Nessuna mappa di terze parti viene caricata automaticamente.
- `PhoneContact.astro` usa `site.phone` per il link WhatsApp nel formato internazionale `https://wa.me/<numero>`, senza `+` o spazi. L’etichetta è tradotta in tutte le lingue e funziona senza JavaScript. Il numero non viene mostrato nel testo o nei dati strutturati, ma resta pubblico nell’URL del link: questa modifica non impedisce la raccolta automatica. WhatsApp viene aperto soltanto seguendo il collegamento.
- `ContactLink.astro` dà a email e WhatsApp la stessa dimensione, spaziatura e icona decorativa. L’icona WhatsApp monocromatica originale è servita localmente da `src/public/icons/whatsapp.svg`, senza modifiche: proviene dal pacchetto digitale RGB 2026 del [Brand Resource Center ufficiale](https://about.meta.com/brand/resources/whatsapp/whatsapp-brand/).
- Il modulo valida i campi e apre un’email precompilata a **versacrumbnb@gmail.com**. L’ospite deve inviarla dal proprio programma di posta: il sito non conferma l’avvenuto invio e conserva i campi. Se il programma non si apre, rimangono disponibili il pulsante per riaprire l’email precompilata e i contatti diretti. Serve un programma o gestore email configurato sul dispositivo.
- Il modulo usa soltanto email precompilate. Il ramo di invio diretto e i campi legacy `site.privacy` e `formEndpoint` sono stati rimossi: introdurre un servizio esterno richiederà una modifica esplicita al codice e un’informativa coerente.
- Le date usano il giorno locale e impongono partenza successiva all'arrivo. La richiesta non equivale a conferma di prenotazione. In caso di errore o timeout i dati restano nel modulo.
- Senza JavaScript contenuti, FAQ, navigazione e link alle foto restano utilizzabili; il form rimane disabilitato.

## Foto

I file del logo completo e dell'emblema senza testo, in SVG e PNG, sono raccolti in [design/logo](design/logo/README.md), insieme ai font e alla relativa licenza.

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

`scripts/images.ts` genera AVIF, WebP e JPEG a più larghezze, corregge l'orientamento e rimuove i metadati dalle varianti. Larghezze, formati, qualità, crop Open Graph e dimensione dell'icona Apple sono in `scripts/image-options.ts`. L'hash dei file responsive include i byte originali e le opzioni serializzate: cambiare una foto o un parametro rilevante crea URL nuovi e non riusa varianti obsolete. La foto di apertura è `featuredPhoto` in `src/site.config.ts`; anche Open Graph deriva da quella sorgente. Il browser seleziona formato e risoluzione tramite `picture`, `srcset` e `sizes`. Le immagini sotto la prima schermata sono lazy; il JPEG grande della galleria si carica solo all'apertura.

Le varianti con lo stesso hash vengono riutilizzate durante `npm run images`; quelle obsolete vengono rimosse automaticamente, senza toccare gli originali o altri file. **`src/public/images/`, `src/image-manifest.json` e `src/public/apple-touch-icon.png` sono versionati** (circa 11 MB), mentre `dist/` resta ignorato. La CI copia questi asset senza usare Sharp per generarli.

L'hook **pre-commit** rigenera e aggiunge all'indice solo gli asset prodotti quando cambiano foto, configurazione della struttura, favicon o pipeline. Se questi input hanno modifiche parzialmente staged, il commit si ferma: aggiungere tutte le modifiche agli input o accantonare quelle non desiderate, per non includere immagini derivate da sorgenti fuori dal commit. Gli altri file non vengono aggiunti automaticamente.

`npm run test:images` verifica cache, parametri, EXIF, manifest, riferimenti HTML, Open Graph, icona Apple e una sorgente sotto 800 px. Confronta anche l'hash di ogni foto con sorgente e opzioni attuali, così un manifest obsoleto ferma i controlli locali. Gli originali in `src/images/` non vanno cancellati.

Gli [asset nativi di Astro](https://docs.astro.build/en/reference/modules/astro-assets/) supportano immagini responsive, formati e qualità. Per ora la pipeline esistente resta più prudente: una migrazione cambierebbe URL e trasformazioni già approvati visivamente, senza risolvere da sola la necessità di verificare crop, cache e immagine Open Graph. Rivalutarla solo con un confronto degli output e delle prestazioni.

## Lingue e URL

Astro genera HTML statico completo in italiano, inglese, francese, spagnolo e tedesco. L’italiano resta sulla root; le altre lingue usano `/en/`, `/fr/`, `/es/` e `/de/`. Ogni lingua dispone anche della propria pagina `privacy.html`. Non viene eseguito alcun redirect automatico in base al browser.

Astro gestisce il routing i18n; `src/i18n/config.ts` definisce tutte le lingue. Ogni file in `src/i18n/locales/` contiene un catalogo completo e indipendente verificato da `schema.ts` con TypeScript. Non ci sono fallback: una chiave mancante ferma i controlli. I template leggono proprietà tipizzate e il browser riceve soltanto i messaggi necessari della lingua corrente, serializzati in JSON sicuro. Il selettore usa link reali, funziona senza JavaScript e conserva le ancore equivalenti. Canonical, `hreflang`, Open Graph, JSON-LD e sitemap sono generati per tutte le lingue.

Orari, distanze, tariffe e numero di gradini sono dati condivisi in `site.config.ts`; date e durate di conservazione sono in `privacy.config.ts`. Le frasi (incluse regole sugli animali e indicazioni di parcheggio) appartengono ai cataloghi. Per aggiungere una lingua: registrarla in `config.ts`, creare il catalogo e registrarlo in `index.ts`; route e alternative linguistiche seguono la configurazione.

FAQ e sezioni privacy usano identificatori stabili. I testi ricchi sono sequenze tipizzate di testo, link, grassetto, codice e interruzioni di riga: non inserire HTML nei cataloghi. Il componente `RichText.astro` esegue l’escaping dei contenuti; la posizione della tabella cookie è un blocco esplicito nel catalogo, modificabile senza indici nel template.

## Struttura e dipendenze

- `src/components/Home.astro` e `Privacy.astro`: template condivisi delle pagine.
- `src/i18n/`: cataloghi per lingua in `locales/`, schema comune, configurazione lingue e helper; `runtime.ts` legge i soli messaggi generati per la pagina corrente.
- `src/pages/`: route statiche, `robots.txt` e sitemap multilingua.
- `src/styles.css`: stile responsive e preferenza movimento ridotto.
- `src/main.ts`: lightbox, validazione e preparazione dell’email localizzati.
- Astro: generazione statica, routing i18n e bundling tramite Vite. TypeScript: cataloghi localizzati. Sharp: immagini. Fontsource: font locali. Playwright e axe: verifiche browser e accessibilità.

Tailwind CDN, PostCSS/autoprefixer espliciti, clean-css, html-minifier-terser e ffmpeg-static sono stati rimossi perché non più usati. Non ci sono font remoti o widget esterni. Google Analytics viene caricato soltanto dopo l’accettazione dell’ospite. Le versioni sono bloccate in `package-lock.json`.

## Pubblicazione

Il deploy parte **solo quando viene pubblicato un tag di release `vX.Y.Z`**. I normali push su main/master, le pull request e le pianificazioni non pubblicano il sito. Il comando completo è:

```sh
npm run deploy                    # prossima versione patch, per esempio v2.0.1
npm run deploy -- minor           # prossima versione minor
npm run deploy -- major           # prossima versione major
npm run deploy -- 2.1.0           # versione stabile esplicita, anche con prefisso v
npm run deploy -- --dry-run       # mostra il piano senza pubblicare
npm run deploy -- --retry         # riprende la stessa release dopo un errore
```

Partire da **main/master con working tree pulita**: committare prima le modifiche al sito. Servono mise, Lefthook, actionlint e GitHub CLI disponibili, autenticazione Git per `origin` e autenticazione GitHub CLI (`mise exec -- gh auth login` se necessaria). La prima release richiede anche il permesso di aggiornare le regole dell'ambiente GitHub Pages se non autorizzano ancora i tag. Il comando:

1. controlla branch, working tree, autenticazione e allineamento con `origin`; recupera i tag senza sovrascriverli e autorizza i tag `v*` nell'ambiente `github-pages`, se necessario, preservando le regole esistenti;
2. sceglie una versione superiore alla versione del pacchetto e ai tag stabili esistenti (patch di default);
3. installa dipendenze, hook e browser Playwright; rigenera le immagini usando la cache;
4. aggiorna `package.json` e lockfile, committa **solo** la versione e gli asset generati e crea un tag annotato;
5. invia branch e tag in un **push atomico**, senza force-push: il pre-push esegue tutti i controlli locali una sola volta prima che qualcosa venga pubblicato;
6. attende l'Action della release, controlla la versione sulla home pubblica e crea la GitHub Release con note automatiche, solo dopo il deploy riuscito.

`--dry-run` esegue le verifiche iniziali e recupera i riferimenti Git, ma non installa dipendenze, rigenera immagini, modifica file, crea commit/tag o pubblica. Se falliscono generazione o controlli, il comando si ferma: **non viene eseguito un push parziale**. Un commit/tag di release già creato resta locale se il push fallisce; correggere problemi di ambiente/rete e usare `--retry` senza cambiare HEAD. Il retry non incrementa la versione né riscrive tag; può ripetere un'Action fallita e completare una GitHub Release mancante. Se serve cambiare codice o dipendenze, committare la correzione e creare una nuova release. Non usare retry per una release più vecchia quando esiste già un tag più recente.

Il workflow usa Node 24 e fa solo `npm ci --no-audit --no-fund`, build Astro, upload di `dist/` e deploy GitHub Pages. **Non esegue test, installazione browser, audit o generazione immagini.** La versione viene passata dal tag alla build: un tag che non coincide con `package.json` ferma la build. Le release sono serializzate per evitare deploy sovrapposti. I permessi Pages/OIDC restano limitati al job di deploy; le Actions sono bloccate a SHA e Dependabot propone gli aggiornamenti.

Il tag appare come piccolo **`vX.Y.Z` nel footer**, su home e privacy di tutte le lingue, senza JavaScript. In sviluppo locale viene mostrata la versione del pacchetto, che non implica una release già pubblicata.

L'hook **pre-push** di Lefthook esegue `npm run verify` e blocca il push se fallisce una verifica, anche per push di soli tag. Richiede una working tree pulita (aggiungere al commit o accantonare le modifiche), così verifica i file committati anziché una versione locale diversa. Gli hook sono locali, devono essere installati su ogni clone e sono aggirabili: push da altri ambienti non garantiscono l'esecuzione dei test. Non c'è più un gate di test server-side; pubblicare un tag manualmente può aggirare il comando di release.

In Settings → Pages scegliere GitHub Actions. Il dominio `versacrumbnb.it` è impostato in configurazione e in `src/public/CNAME`. Verifica del 20 settembre 2026: DNS corretto, certificato approvato per dominio principale e www, HTTPS obbligatorio attivo. Home e privacy pubblicate rispondono 200 in HTTPS; HTTP e www reindirizzano al dominio canonico. Verifica tracciata in [#3](https://github.com/angelofb/versacrum/issues/3). Nessun deploy viene avviato dalla sola modifica locale.

I test locali producono schermate desktop e mobile in `artifacts/`, report in `playwright-report/` e trace in `test-results/`, tutti ignorati da Git. Le modifiche visive richiedono una revisione delle schermate, ma non sono bloccate da un confronto automatico pixel-per-pixel con una vecchia build. Il test del tag Google reale resta disponibile come verifica locale esplicita con `GA4_TAG_FIXTURE`, descritta sotto; non viene più scaricato o eseguito automaticamente dalle Actions.

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
GA4_TAG_FIXTURE=/tmp/versacrum-gtag.js ./node_modules/.bin/playwright test tests/analytics-live.spec.ts
```

Questo test esegue il tag in locale e intercetta tutte le richieste esterne: nessun evento di prova raggiunge Google. Verifica assenza di dati del modulo e dell’URL negli eventi e blocco dopo la revoca. La prova non sostituisce la verifica di ricezione nei report reali (#2). Ripeterla se cambiano proprietà, tag o modalità di contatto. Le impostazioni di misurazione avanzata non sono state modificate durante la correzione.

Il gestore ha confermato la cancellazione delle richieste senza prenotazione dopo 30 giorni dalla chiusura, manualmente finché #11 non sarà implementata. Registrare la chiusura, escludere le prenotazioni e rimuovere alla scadenza le email interessate anche dal cestino, oltre alle eventuali copie della struttura. Il solo spostamento nel cestino aggiungerebbe normalmente altri 30 giorni. Non svuotare indiscriminatamente l’intera casella o il cestino. Questa procedura non elimina le copie del mittente; l’automazione Gmail non è stata attivata.
