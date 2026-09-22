# SEO di Ver Sacrum

## Obiettivo editoriale

Le cinque versioni linguistiche rispondono alla ricerca di una dimora nel centro storico di Ascoli Piceno: posizione, capienza di tre ospiti, camera, cucina, servizi, fotografie e richiesta di disponibilità. Titoli e descrizioni localizzati sono nei cataloghi TypeScript in `src/i18n/locales/` e alimentano anche Open Graph e Twitter Card. Astro gestisce gli URL localizzati dalla configurazione comune. I testi mantengono un tono naturale, senza ripetizioni artificiali di parole chiave.

Non sono state create pagine quasi identiche per ogni ricerca o dichiarazioni non verificate su distanze, prezzi, colazione inclusa, recensioni o classificazione della struttura. Le FAQ rispondono a domande reali e sono disponibili nell'HTML anche senza JavaScript; non vengono promessi risultati avanzati FAQ.

## Indicizzazione e metadati

- Le home italiana, inglese, francese, spagnola e tedesca sono indicizzabili. Le rispettive informative privacy sono `noindex, follow`.
- Ogni home ha canonical autoreferenziale, `hreflang` per le cinque lingue e `x-default` verso l’italiano, anteprima sociale 1200×630 e JSON-LD localizzato con WebSite, WebPage, ImageObject e LodgingBusiness.
- La sitemap contiene le cinque home, le relazioni linguistiche e le sette immagini per ogni URL. Le ancore e le privacy non sono URL indicizzabili. Non viene prodotto un `lastmod` artificiale.
- La build e i test falliscono in presenza di cataloghi incompleti, token irrisolti, canonical incoerenti o riferimenti al vecchio ID Analytics.
- `robots.txt` permette la scansione e indica la sitemap canonica. Non è una protezione per contenuti riservati.
- Impostare sull'hosting i redirect permanenti dalle varianti del dominio (HTTP, www/non-www) verso la versione canonica. Il sito statico non può configurare da solo questi redirect.

## Verifica e lancio

1. Completare i dati e verificare che testi e traduzioni corrispondano a ciò che l’ospite trova davvero.
2. Eseguire `npm run build` e `npm test`: i controlli coprono cataloghi, URL, sitemap, metadati, JSON-LD, form, privacy, accessibilità e browser desktop/mobile.
3. Pubblicare e verificare risposta HTTP 200, canonical, assenza di noindex, accessibilità delle immagini e sitemap sul dominio finale.
4. Verificare la proprietà in Google Search Console; inviare la sitemap e usare Ispezione URL. Validare i dati strutturati con Rich Results Test. Queste attività richiedono il dominio reale e l'accesso del proprietario e non sono state eseguite.
5. Completare il profilo dell'attività su Google, se idoneo, con nome, indirizzo, telefono, sito e foto coerenti; allineare anche Booking/Airbnb. Non creare recensioni o valutazioni artificiali.
6. Osservare query, impressioni, clic e richieste ricevute; decidere eventuali pagine di approfondimento in base a contenuti utili e dati reali. Un punteggio Lighthouse non misura il posizionamento.

Fonti ufficiali: [titoli](https://developers.google.com/search/docs/appearance/title-link), [noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing), [attività locali](https://developers.google.com/search/docs/appearance/structured-data/local-business), [sitemap immagini](https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps).
