# SEO di Ver Sacrum

## Obiettivo editoriale

Le cinque versioni linguistiche rispondono alla ricerca di un appartamento e di un soggiorno nel centro storico di Ascoli Piceno: posizione, capienza di tre ospiti, camera, cucina, servizi, fotografie e richiesta di disponibilità. Titoli e descrizioni localizzati sono nei cataloghi TypeScript in `src/i18n/locales/` e alimentano anche Open Graph e Twitter Card. Astro gestisce gli URL localizzati dalla configurazione comune. I testi mantengono un tono naturale, senza ripetizioni artificiali di parole chiave.

Non sono state create pagine quasi identiche per ogni ricerca o dichiarazioni non verificate su distanze, prezzi, colazione inclusa, recensioni o classificazione della struttura. La FAQ sulla ricerca di un B&B chiarisce che Ver Sacrum offre un appartamento intero a uso esclusivo, senza cambiare la classificazione della struttura o promettere una colazione inclusa. Le FAQ rispondono a domande reali e sono disponibili nell'HTML anche senza JavaScript; non vengono promessi risultati avanzati FAQ.

## Indicizzazione e metadati

- Le cinque home e le cinque guide `/ascoli-piceno/` sono indicizzabili. Le rispettive informative privacy sono `noindex, follow`.
- Home e guide hanno canonical autoreferenziale e `hreflang` per le cinque versioni equivalenti della stessa pagina, con `x-default` verso l’italiano. Le guide non puntano alle home nelle relazioni linguistiche. Il JSON-LD collega WebSite, WebPage, fotografie, LodgingBusiness e Apartment con identificativi della struttura condivisi tra tutte le lingue. I dati includono indirizzo completo, capienza e codici CIN/CIR; le guide hanno anche BreadcrumbList coerente con la navigazione visibile.
- La sitemap contiene dieci URL: cinque home e cinque guide. Ogni gruppo ha le proprie relazioni linguistiche; le sette immagini sono associate a ciascuna home. Le ancore e le privacy non sono URL indicizzabili. `lastmod` usa la data editoriale esplicita di `site.lastModified`, aggiornata quando cambiano i contenuti. Non si modifica a ogni build; `changefreq` e `priority`, ignorati da Google, sono omessi.
- La build e i test falliscono in presenza di cataloghi incompleti, token irrisolti, canonical incoerenti o riferimenti al vecchio ID Analytics.
- `robots.txt` permette la scansione e indica la sitemap canonica. Non è una protezione per contenuti riservati.
- La regola attuale `User-agent: *` / `Allow: /` non esclude neppure i bot usati per l'addestramento di modelli. Non è stata scelta né applicata un'esclusione specifica; l'eventuale scelta sui crawler di addestramento è distinta dall'indicizzazione nei motori di ricerca. In particolare, Google documenta che `Google-Extended` non influisce sulla presenza in Google Search. Una direttiva `robots.txt` esprime una preferenza ai crawler conformi, non una garanzia contro ogni accesso o riutilizzo.
- Impostare sull'hosting i redirect permanenti dalle varianti del dominio (HTTP, www/non-www) verso la versione canonica. Il sito statico non può configurare da solo questi redirect.

## Verifica e lancio

1. Completare i dati e verificare che testi e traduzioni corrispondano a ciò che l’ospite trova davvero.
2. Eseguire `npm run build` e `npm test`: i controlli coprono cataloghi, URL, sitemap, metadati, JSON-LD, form, privacy, accessibilità e browser desktop/mobile.
3. Pubblicare e verificare risposta HTTP 200, canonical, assenza di noindex, accessibilità delle immagini e sitemap sul dominio finale.
4. Nel proprio account, verificare `versacrumbnb.it` in Google Search Console e Bing Webmaster Tools, inviare `https://versacrumbnb.it/sitemap.xml`, controllarne lo stato e ispezionare home e guide. Validare gli URL pubblici con Rich Results Test, distinguendo gli errori di sintassi dai tipi non idonei a un risultato avanzato. Queste verifiche nei pannelli restano in carico al gestore: i soli test del repository non provano che Google o Bing abbiano scansionato o indicizzato le pagine.
5. Tenere coerenti nome, indirizzo, telefono e sito nei profili Booking/Airbnb. Non creare recensioni o valutazioni artificiali. Non aprire un Google Business Profile per il solo appartamento turistico: Google elenca le case vacanza e gli appartamenti in affitto fra le proprietà non idonee; un'eventuale attività distinta con sede e contatto di persona va valutata separatamente secondo le regole correnti.
6. Osservare query, impressioni, clic e richieste ricevute; decidere eventuali pagine di approfondimento in base a contenuti utili e dati reali. Un punteggio Lighthouse non misura il posizionamento.

Fonti ufficiali: [titoli](https://developers.google.com/search/docs/appearance/title-link), [noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing), [Search Console](https://developers.google.com/search/docs/monitor-debug/search-console-start), [Bing Webmaster Tools](https://www2.bing.com/webmasters/help/add-and-verify-site-12184f8b), [Google-Extended](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers), [idoneità Business Profile](https://support.google.com/business/answer/13763036?hl=it), [sitemap immagini](https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps).

## Intervento del 6 ottobre 2026

Confrontati i siti indicati dal gestore: [Villa Fortezza](https://www.villafortezza.it/en/), [Ascoli Antica](http://www.ascolianticabb.it/), [Stella](https://www.stellabb.it/it/), [Antico Borgo Piceno](https://www.anticoborgopiceno.it/) e [Il Duomo](https://www.bbilduomo.it/). L’osservazione del gestore riguarda la query «b&b ascoli piceno»; non è stata misurata una posizione Google riproducibile né l’autorità dei domini o dei backlink.

Le pagine dei concorrenti espongono chiaramente il tipo di alloggio, la zona, i servizi e informazioni per l’arrivo. Villa Fortezza offre approfondimenti sulle camere; Stella presenta servizi e zona; Il Duomo descrive piazze e parcheggi. La qualità tecnica non è uniforme: Ascoli Antica risponde in HTTP e Villa Fortezza usa un canonical verso la radice anche sulla pagina inglese. Questi rilievi non dimostrano la causa delle rispettive posizioni.

Il sito pubblico di Ver Sacrum risponde 200, permette la scansione e reindirizza HTTP e www al dominio HTTPS canonico. Nelle ricerche pubbliche effettuate emergono Booking e Google Travel; l’assenza di un risultato del dominio in questo controllo non prova da sola che Google non l’abbia indicizzato. Il gestore ha confermato che Search Console e l’invio della sitemap non sono ancora stati configurati.

Applicato al sito:

- Titoli con «appartamento», nome completo della città e posizione, descrizioni con capienza e servizi, nelle cinque lingue; H1 con «Ascoli Piceno» e introduzione con l’indirizzo reale.
- FAQ visibile e tradotta per chi cerca un B&B, con descrizione dell’appartamento intero; nessun tipo BedAndBreakfast, prezzo, valutazione o recensione aggiunti artificialmente.
- Guida di arrivo `/ascoli-piceno/`, con quattro equivalenti localizzati: posizione, scarico bagagli, parcheggi a pagamento e gratuiti, scale, orari e visita a piedi. I dati pratici usano `site.config.ts`, già confermati dal gestore. I collegamenti in home rendono la guida raggiungibile anche senza JavaScript.
- Riferimenti locali a Piazza del Popolo, Piazza Arringo, Palazzo dei Capitani, San Francesco, Caffè Meletti e Sant’Emidio. Verificati sulle schede di [Piazza del Popolo](https://eventi.turismo.marche.it/it-it/Cosa-vedere/Attrazioni/Piazza-del-Popolo/6193) e [Piazza Arringo](https://eventi.turismo.marche.it/it-it/Cosa-vedere/Attrazioni/Piazza-Arringo/8857) del portale turistico della Regione Marche; non si dichiarano minuti di percorrenza o distanze non verificate.
- Metadati, sitemap, navigazione tra lingue e dati strutturati aggiornati per le nuove pagine. Non si promettono risultati avanzati alberghieri: la conformità dello schema non prova l’idoneità a una specifica funzione di Google.

## Search Console: passaggio operativo ancora da completare

La registrazione in Google Analytics riguarda le visite al sito. Per osservare indicizzazione, impressioni, query e clic nella ricerca serve [Google Search Console](https://search.google.com/search-console). Il servizio non è obbligatorio per comparire su Google, ma consente di individuare problemi e richiedere una nuova scansione.

Per la verifica del solo sito, usare una proprietà **Prefisso URL** con `https://versacrumbnb.it/` e il metodo **Tag HTML**. Il 6 ottobre 2026 il gestore ha fornito il token Google: è configurato in `site.googleSiteVerification` e il layout comune lo inserisce nel `<head>` dell’HTML iniziale di tutte le lingue. Dopo la pubblicazione, fare clic su **Verifica** nella scheda Tag HTML di Search Console. Il meta tag deve restare pubblicato anche dopo la verifica, perché Google ne controlla periodicamente la presenza.

In alternativa, il metodo **File HTML** è compatibile con GitHub Pages: inserire il file di Google senza modifiche in `src/public/` e mantenerlo pubblicato. La proprietà **Dominio** richiede invece un record TXT DNS. Non usare il metodo Analytics come scorciatoia: sul sito il tag viene caricato solo dopo il consenso e non è presente nella pagina iniziale del crawler; il fallimento di questa verifica non dimostra un guasto della raccolta delle statistiche.

Dopo la verifica:

1. In **Sitemap**, inviare `https://versacrumbnb.it/sitemap.xml` e controllare che venga letta correttamente.
2. In **Controllo URL**, ispezionare `https://versacrumbnb.it/` e `https://versacrumbnb.it/ascoli-piceno/`, eseguire il test dell’URL pubblicato e richiedere l’indicizzazione; controllare anche gli equivalenti linguistici.
3. In **Indicizzazione → Pagine**, distinguere le home e guide da indicizzare dalle privacy intenzionalmente escluse.
4. In **Rendimento → Risultati di ricerca**, osservare inizialmente «b&b ascoli piceno», «dormire ascoli piceno», «appartamento ascoli piceno centro» e «ver sacrum»: impressioni, clic e posizione media. Conservare il periodo di confronto; non confondere una posizione media con la posizione vista in una singola ricerca.

Il meta tag richiesto dal gestore è stato inserito nel sito. Sono ancora da confermare nel pannello la verifica della proprietà, l’invio della sitemap e l’Ispezione URL. Non sono stati modificati account Google o DNS. La comparsa e l’ordine dei risultati richiedono una nuova scansione e non sono garantiti dalle modifiche del sito.

Fonti ufficiali: [verifica della proprietà](https://support.google.com/webmasters/answer/9008080?hl=it), [sitemap e lastmod](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [contenuti utili](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [breadcrumb](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb), [Apartment](https://schema.org/Apartment).
