# SEO di Ver Sacrum

## Obiettivo editoriale

La pagina risponde alla ricerca di una dimora nel centro storico di Ascoli Piceno: posizione, capienza di tre ospiti, camera, cucina, servizi, fotografie e richiesta di disponibilità. Il titolo e la descrizione sono centralizzati in `seo` dentro `src/site.config.js` e alimentano anche Open Graph e Twitter Card. I testi mantengono un tono naturale, senza ripetizioni artificiali di parole chiave.

Non sono state create pagine quasi identiche per ogni ricerca o dichiarazioni non verificate su distanze, prezzi, colazione inclusa, recensioni o classificazione della struttura. Le FAQ rispondono a domande reali e sono disponibili nell'HTML anche senza JavaScript; non vengono promessi risultati avanzati FAQ.

## Indicizzazione e metadati

- `seo.indexable` resta `false` per l'anteprima. Il dominio da solo non abilita più l'indicizzazione.
- Il `noindex` è leggibile perché `robots.txt` permette la scansione. Il file robots non è una protezione per dati riservati.
- Per la pubblicazione, completare tutti i riferimenti visibili in `site`, verificare telefono internazionale, email e link HTTPS, quindi impostare `seo.indexable: true`. La build segnala i campi mancanti e fallisce se si tenta di indicizzare i placeholder. `formEndpoint` è facoltativo per la SEO; se manca, il form prepara un’email da inviare dal programma di posta dell’ospite.
- Con dominio valido vengono prodotti canonical assoluto, anteprime social 1200×630 e grafo JSON-LD con WebSite, WebPage e ImageObject. LodgingBusiness viene aggiunto solo con indirizzo configurato, usando contatti e profili effettivamente presenti. Nessuna recensione, coordinata approssimata o offerta inventata.
- La sitemap della versione indicizzabile contiene l'unica pagina canonica e le sette foto. Le ancore delle sezioni non sono pagine separate. Nessun `lastmod` aggiornato artificialmente a ogni build.
- Il dominio può includere una sottocartella. `robots.txt` viene letto dai motori soltanto alla radice dell'host: su GitHub Pages sotto `/repository/` il file della sottocartella non controlla l'intero host. In quel caso inviare l'URL completo della sitemap a Search Console; il meta robots resta applicabile alla pagina.
- Impostare sull'hosting i redirect permanenti dalle varianti del dominio (HTTP, www/non-www) verso la versione canonica. Il sito statico non può configurare da solo questi redirect.

## Verifica e lancio

1. Completare i dati, controllare che corrispondano a ciò che l'ospite trova davvero e attivare l'indicizzazione in configurazione.
2. Eseguire `npm run build` e `npm test`: i controlli coprono anteprima, pubblicazione, URL, sitemap, metadati, riferimenti JSON-LD e browser desktop/mobile. I dati della pubblicazione sono simulati nei test, senza modificare i dati del sito.
3. Pubblicare e verificare risposta HTTP 200, canonical, assenza di noindex, accessibilità delle immagini e sitemap sul dominio finale.
4. Verificare la proprietà in Google Search Console; inviare la sitemap e usare Ispezione URL. Validare i dati strutturati con Rich Results Test. Queste attività richiedono il dominio reale e l'accesso del proprietario e non sono state eseguite.
5. Completare il profilo dell'attività su Google, se idoneo, con nome, indirizzo, telefono, sito e foto coerenti; allineare anche Booking/Airbnb. Non creare recensioni o valutazioni artificiali.
6. Osservare query, impressioni, clic e richieste ricevute; decidere eventuali pagine di approfondimento in base a contenuti utili e dati reali. Un punteggio Lighthouse non misura il posizionamento.

Fonti ufficiali: [titoli](https://developers.google.com/search/docs/appearance/title-link), [noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing), [attività locali](https://developers.google.com/search/docs/appearance/structured-data/local-business), [sitemap immagini](https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps).
