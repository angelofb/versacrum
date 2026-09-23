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
- La regola attuale `User-agent: *` / `Allow: /` non esclude neppure i bot usati per l'addestramento di modelli. Non è stata scelta né applicata un'esclusione specifica; l'eventuale scelta sui crawler di addestramento è distinta dall'indicizzazione nei motori di ricerca. In particolare, Google documenta che `Google-Extended` non influisce sulla presenza in Google Search. Una direttiva `robots.txt` esprime una preferenza ai crawler conformi, non una garanzia contro ogni accesso o riutilizzo.
- Impostare sull'hosting i redirect permanenti dalle varianti del dominio (HTTP, www/non-www) verso la versione canonica. Il sito statico non può configurare da solo questi redirect.

## Verifica e lancio

1. Completare i dati e verificare che testi e traduzioni corrispondano a ciò che l’ospite trova davvero.
2. Eseguire `npm run build` e `npm test`: i controlli coprono cataloghi, URL, sitemap, metadati, JSON-LD, form, privacy, accessibilità e browser desktop/mobile.
3. Pubblicare e verificare risposta HTTP 200, canonical, assenza di noindex, accessibilità delle immagini e sitemap sul dominio finale.
4. Nel proprio account, verificare `versacrumbnb.it` in Google Search Console e Bing Webmaster Tools, inviare `https://versacrumbnb.it/sitemap.xml`, controllarne lo stato e ispezionare le cinque home. Validare gli URL pubblici con Rich Results Test, distinguendo gli errori di sintassi dai tipi non idonei a un risultato avanzato. Queste verifiche nei pannelli restano in carico al gestore: i soli test del repository non provano che Google o Bing abbiano scansionato o indicizzato le pagine.
5. Tenere coerenti nome, indirizzo, telefono e sito nei profili Booking/Airbnb. Non creare recensioni o valutazioni artificiali. Non aprire un Google Business Profile per il solo appartamento turistico: Google elenca le case vacanza e gli appartamenti in affitto fra le proprietà non idonee; un'eventuale attività distinta con sede e contatto di persona va valutata separatamente secondo le regole correnti.
6. Osservare query, impressioni, clic e richieste ricevute; decidere eventuali pagine di approfondimento in base a contenuti utili e dati reali. Un punteggio Lighthouse non misura il posizionamento.

Fonti ufficiali: [titoli](https://developers.google.com/search/docs/appearance/title-link), [noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing), [Search Console](https://developers.google.com/search/docs/monitor-debug/search-console-start), [Bing Webmaster Tools](https://www2.bing.com/webmasters/help/add-and-verify-site-12184f8b), [Google-Extended](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers), [idoneità Business Profile](https://support.google.com/business/answer/13763036?hl=it), [sitemap immagini](https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps).
