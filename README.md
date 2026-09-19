# Ver Sacrum

Sito statico della dimora Ver Sacrum ad Ascoli Piceno. Design editoriale in avorio e verde oliva, fotografie originali, galleria accessibile e richiesta di disponibilità. Nessuna recensione o valutazione inventata.

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

Modificare **`src/site.config.js`** per email, telefono, indirizzo, dominio, mappa, Booking, Airbnb, CIN/CIR, orari, parcheggi, animali e informativa privacy. I dati ricevuti dal gestore sono già inseriti; i valori ancora mancanti restano tra parentesi quadre. Dopo una modifica alla configurazione riavviare il server o ricompilare.

- I placeholder vengono mostrati come testo, senza link fittizi.
- `domain` deve contenere l'URL HTTPS completo, con eventuale sottocartella. L'indicizzazione richiede anche `seo.indexable: true` e riferimenti visibili completi: altrimenti l'anteprima resta `noindex`. `robots.txt` permette la scansione per far leggere questa direttiva. Canonical e anteprime social richiedono un dominio valido; la sitemap viene generata soltanto nella versione indicizzabile. Procedura e verifiche in [SEO.md](SEO.md).
- `maps`, `booking` e `airbnb` accettano URL HTTPS. Nessuna mappa di terze parti viene caricata automaticamente.
- Il modulo valida i campi e apre un’email precompilata a **versacrumbnb@gmail.com**. L’ospite deve inviarla dal proprio programma di posta: il sito non conferma l’avvenuto invio e conserva i campi. Se il programma non si apre, rimangono disponibili il link all’email precompilata e i contatti diretti. Serve un programma o gestore email configurato sul dispositivo.
- Per passare in futuro all’invio diretto, completare `privacy` e impostare `formEndpoint` con un endpoint che accetti `POST` con `FormData` e risponda con codice 2xx (compatibile con Formspree). I campi sono `name`, `email`, `checkin`, `checkout`, `guests`, `message`, `privacy`. Il servizio deve supportare CORS, validare i dati anche sul server e gestire lo spam. Eseguire una prova reale prima di pubblicare.
- Le date usano il giorno locale e impongono partenza successiva all'arrivo. La richiesta non equivale a conferma di prenotazione. In caso di errore o timeout i dati restano nel modulo.
- Senza JavaScript contenuti, FAQ, navigazione e link alle foto restano utilizzabili; il form rimane disabilitato.

## Foto

Gli originali in `src/images/` sono preservati. La selezione è definita in `photos` dentro `src/site.config.js`:

| Ambiente             | Originale    |
| -------------------- | ------------ |
| Soggiorno / apertura | IMG_8595.jpg |
| Camera               | IMG_8597.jpg |
| Cucina               | IMG_8584.jpg |
| Bagno                | IMG_8569.jpg |
| Caffè e dettagli     | IMG_8580.jpg |
| Pianta e finestra    | IMG_8607.jpg |
| Vicolo di Ascoli     | IMG_8571.jpg |

`scripts/images.js` genera AVIF, WebP e JPEG a più larghezze, corregge l'orientamento e rimuove i metadati dalle varianti. Nomi descrittivi con hash permettono di cambiare foto senza riutilizzare vecchi URL. Il browser seleziona formato e risoluzione tramite `picture`, `srcset` e `sizes`. Le immagini sotto la prima schermata sono lazy; il JPEG grande della galleria si carica solo all'apertura. Vengono generati anche immagine Open Graph e icona Apple.

Le cartelle generate sono ignorate da Git. Se si cambiano foto o impostazioni di compressione, si possono eliminare **solo** `src/public/images/` e `src/image-manifest.json`, quindi ricostruire, per rimuovere varianti obsolete.

## Struttura e dipendenze

- `src/index.html`: contenuti e struttura semantica; i segnaposto `{{…}}` sono risolti da Vite prima di servire/compilare la pagina.
- `src/styles.css`: stile responsive e preferenza movimento ridotto.
- `src/main.js`: lightbox e form. Il piccolo script del menu è inline nell'HTML per inizializzarlo prima del primo rendering ed evitare spostamenti della pagina.
- `vite.config.js`: rendering dei segnaposto, metadati e output statico.
- Vite: sviluppo, bundling e minificazione. Sharp: immagini. Fontsource: font serviti localmente. Playwright e axe: verifiche browser e accessibilità.

Tailwind CDN, PostCSS/autoprefixer espliciti, clean-css, html-minifier-terser e ffmpeg-static sono stati rimossi perché non più usati. Non ci sono font remoti, analytics o widget esterni. Le versioni sono bloccate in `package-lock.json`.

## Pubblicazione

Il workflow GitHub Pages usa Node 24, esegue build e test prima del deploy di `dist/`. In Settings → Pages scegliere GitHub Actions. I percorsi relativi funzionano anche in una sottocartella. Il dominio `versacrumbnb.it` è impostato in configurazione e in `src/public/CNAME`. Restano da configurare e verificare DNS e dominio personalizzato nelle impostazioni Pages. Nessun deploy viene avviato dalla sola modifica locale.

Documentazione: [Vite](https://vite.dev/guide/build), [Sharp](https://sharp.pixelplumbing.com/api-output/), [release delle azioni GitHub](https://github.com/actions/checkout/releases).
