# SEO di Ver Sacrum

## Obiettivo editoriale

Le cinque versioni linguistiche presentano **Ver Sacrum B&B nel centro storico di Ascoli Piceno**, identità confermata dal gestore l’8 ottobre 2026. L’appartamento intero a uso esclusivo descrive la modalità del soggiorno, non sostituisce il posizionamento del B&B. I contenuti rispondono alle ricerche di bed and breakfast, alloggio e soggiorno ad Ascoli Piceno con posizione, capienza di tre ospiti, camera, cucina, servizi, fotografie e richiesta di disponibilità. Titoli e descrizioni localizzati sono nei cataloghi TypeScript in `src/i18n/locales/` e alimentano anche Open Graph e Twitter Card. Astro gestisce gli URL localizzati dalla configurazione comune. I testi mantengono un tono naturale, senza ripetizioni artificiali di parole chiave.

Non sono state create pagine quasi identiche per ogni ricerca o dichiarazioni non verificate su distanze, prezzi, colazione inclusa o recensioni. La FAQ sull’organizzazione di Ver Sacrum B&B risponde direttamente: soggiorno in un appartamento intero a uso esclusivo per un massimo di tre ospiti. La correzione editoriale recepisce l’identità B&B dichiarata dal gestore; non modifica CIN/CIR, autorizzazioni o servizi e non promette una colazione inclusa. Le FAQ rispondono a domande reali e sono disponibili nell'HTML anche senza JavaScript; non vengono promessi risultati avanzati FAQ.

## Indicizzazione e metadati

- Le cinque home e le cinque guide `/ascoli-piceno/` sono indicizzabili. Le rispettive informative privacy sono `noindex, follow`.
- Home e guide hanno canonical autoreferenziale e `hreflang` per le cinque versioni equivalenti della stessa pagina, con `x-default` verso l’italiano. Le guide non puntano alle home nelle relazioni linguistiche. Il JSON-LD collega WebSite, WebPage, fotografie, BedAndBreakfast (sottotipo di LodgingBusiness) e Apartment con identificativi della struttura condivisi tra tutte le lingue. I dati includono indirizzo completo, capienza e codici CIN/CIR; le guide hanno anche BreadcrumbList coerente con la navigazione visibile.
- La sitemap contiene dieci URL: cinque home e cinque guide. Ogni gruppo ha le proprie relazioni linguistiche; le sette immagini sono associate a ciascuna home. Le ancore e le privacy non sono URL indicizzabili. `lastmod` usa la data editoriale esplicita di `site.lastModified`, aggiornata quando cambiano i contenuti. Non si modifica a ogni build; `changefreq` e `priority`, ignorati da Google, sono omessi.
- La build e i test falliscono in presenza di cataloghi incompleti, token irrisolti, canonical incoerenti o riferimenti al vecchio ID Analytics.
- `robots.txt` permette la scansione e indica la sitemap canonica. Non è una protezione per contenuti riservati.
- La regola attuale `User-agent: *` / `Allow: /` non esclude neppure i bot usati per l'addestramento di modelli. Non è stata scelta né applicata un'esclusione specifica; l'eventuale scelta sui crawler di addestramento è distinta dall'indicizzazione nei motori di ricerca. In particolare, Google documenta che `Google-Extended` non influisce sulla presenza in Google Search. Una direttiva `robots.txt` esprime una preferenza ai crawler conformi, non una garanzia contro ogni accesso o riutilizzo.
- Impostare sull'hosting i redirect permanenti dalle varianti del dominio (HTTP, www/non-www) verso la versione canonica. Il sito statico non può configurare da solo questi redirect.

## Verifica e lancio

1. Completare i dati e verificare che testi e traduzioni corrispondano a ciò che l’ospite trova davvero.
2. Eseguire `npm run build` e `npm test`: i controlli coprono cataloghi, URL, sitemap, metadati, JSON-LD, form, privacy, accessibilità e browser desktop/mobile.
3. Pubblicare e verificare risposta HTTP 200, canonical, assenza di noindex, accessibilità delle immagini e sitemap sul dominio finale.
4. Nel proprio account, verificare `versacrumbnb.it` in Google Search Console, inviare `https://versacrumbnb.it/sitemap.xml`, controllarne lo stato e ispezionare home e guide. Bing Webmaster Tools è rimandato per decisione del gestore. Validare gli URL pubblici con Rich Results Test, distinguendo gli errori di sintassi dai tipi non idonei a un risultato avanzato. Queste verifiche nei pannelli restano in carico al gestore: i soli test del repository non provano che Google o Bing abbiano scansionato o indicizzato le pagine.
5. Tenere coerenti nome, indirizzo, telefono e sito nei profili Booking/Airbnb. Non creare recensioni o valutazioni artificiali. Valutare l’idoneità a Google Business Profile in base all’attività effettiva e alle regole correnti, non alla sola etichetta B&B: Google esclude le case vacanza e gli appartamenti in affitto, mentre un’attività ricettiva con sede e contatto di persona va verificata nella categoria appropriata. Questo intervento non crea o modifica profili esterni.
6. Osservare query, impressioni, clic e richieste ricevute; decidere eventuali pagine di approfondimento in base a contenuti utili e dati reali. Un punteggio Lighthouse non misura il posizionamento.

Fonti ufficiali: [titoli](https://developers.google.com/search/docs/appearance/title-link), [noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing), [Search Console](https://developers.google.com/search/docs/monitor-debug/search-console-start), [Bing Webmaster Tools](https://www2.bing.com/webmasters/help/add-and-verify-site-12184f8b), [Google-Extended](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers), [idoneità Business Profile](https://support.google.com/business/answer/13763036?hl=it), [sitemap immagini](https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps).

## Intervento del 6 ottobre 2026

Confrontati i siti indicati dal gestore: [Villa Fortezza](https://www.villafortezza.it/en/), [Ascoli Antica](http://www.ascolianticabb.it/), [Stella](https://www.stellabb.it/it/), [Antico Borgo Piceno](https://www.anticoborgopiceno.it/) e [Il Duomo](https://www.bbilduomo.it/). L’osservazione del gestore riguarda la query «b&b ascoli piceno»; non è stata misurata una posizione Google riproducibile né l’autorità dei domini o dei backlink.

Le pagine dei concorrenti espongono chiaramente il tipo di alloggio, la zona, i servizi e informazioni per l’arrivo. Villa Fortezza offre approfondimenti sulle camere; Stella presenta servizi e zona; Il Duomo descrive piazze e parcheggi. La qualità tecnica non è uniforme: Ascoli Antica risponde in HTTP e Villa Fortezza usa un canonical verso la radice anche sulla pagina inglese. Questi rilievi non dimostrano la causa delle rispettive posizioni.

Il sito pubblico di Ver Sacrum risponde 200, permette la scansione e reindirizza HTTP e www al dominio HTTPS canonico. Nelle ricerche pubbliche effettuate emergono Booking e Google Travel; l’assenza di un risultato del dominio in questo controllo non prova da sola che Google non l’abbia indicizzato. All’inizio dell’intervento il gestore aveva confermato che Search Console e l’invio della sitemap non erano ancora stati configurati; gli aggiornamenti successivi sono riportati sotto.

Applicato al sito:

- Titoli con «appartamento», nome completo della città e posizione, descrizioni con capienza e servizi, nelle cinque lingue; H1 con «Ascoli Piceno» e introduzione con l’indirizzo reale.
- FAQ visibile e tradotta per chi cerca un B&B, con descrizione dell’appartamento intero; nessun tipo BedAndBreakfast, prezzo, valutazione o recensione aggiunti artificialmente.
- Guida di arrivo `/ascoli-piceno/`, con quattro equivalenti localizzati: posizione, scarico bagagli, parcheggi a pagamento e gratuiti, scale, orari e visita a piedi. I dati pratici usano `site.config.ts`, già confermati dal gestore. I collegamenti in home rendono la guida raggiungibile anche senza JavaScript.
- Riferimenti locali a Piazza del Popolo, Piazza Arringo, Palazzo dei Capitani, San Francesco, Caffè Meletti e Sant’Emidio. Verificati sulle schede di [Piazza del Popolo](https://eventi.turismo.marche.it/it-it/Cosa-vedere/Attrazioni/Piazza-del-Popolo/6193) e [Piazza Arringo](https://eventi.turismo.marche.it/it-it/Cosa-vedere/Attrazioni/Piazza-Arringo/8857) del portale turistico della Regione Marche; non si dichiarano minuti di percorrenza o distanze non verificate.
- Metadati, sitemap, navigazione tra lingue e dati strutturati aggiornati per le nuove pagine. Non si promettono risultati avanzati alberghieri: la conformità dello schema non prova l’idoneità a una specifica funzione di Google.

## Search Console: verifica e controlli

La registrazione in Google Analytics riguarda le visite al sito. Per osservare indicizzazione, impressioni, query e clic nella ricerca serve [Google Search Console](https://search.google.com/search-console). Il servizio non è obbligatorio per comparire su Google, ma consente di individuare problemi e richiedere una nuova scansione.

Per la verifica del solo sito, usare una proprietà **Prefisso URL** con `https://versacrumbnb.it/` e il metodo **Tag HTML**. I token Google sono configurati in `site.googleSiteVerificationTokens` e il layout comune li inserisce nel `<head>` dell’HTML iniziale di tutte le lingue. Dopo la pubblicazione, fare clic su **Verifica** nella scheda Tag HTML di Search Console con l’account che ha generato il token. Il meta tag di un proprietario verificato deve restare pubblicato, perché Google ne controlla periodicamente la presenza.

Il 6 ottobre 2026 il gestore ha segnalato di aver verificato il sito con l’account sbagliato e ha fornito il token dell’account corretto. Durante il passaggio sono stati mantenuti entrambi i token. Il gestore ha successivamente confermato di aver corretto la proprietà in Search Console e ha richiesto la rimozione del vecchio tag: la configurazione mantiene ora soltanto il token dell’account corretto. La rimozione del tag non modifica automaticamente gli accessi degli account nel pannello di Search Console.

In alternativa, il metodo **File HTML** è compatibile con GitHub Pages: inserire il file di Google senza modifiche in `src/public/` e mantenerlo pubblicato. La proprietà **Dominio** richiede invece un record TXT DNS. Non usare il metodo Analytics come scorciatoia: sul sito il tag viene caricato solo dopo il consenso e non è presente nella pagina iniziale del crawler; il fallimento di questa verifica non dimostra un guasto della raccolta delle statistiche.

Dopo la verifica:

1. In **Sitemap**, inviare `https://versacrumbnb.it/sitemap.xml` e controllare che venga letta correttamente.
2. In **Controllo URL**, ispezionare `https://versacrumbnb.it/` e `https://versacrumbnb.it/ascoli-piceno/`, eseguire il test dell’URL pubblicato e richiedere l’indicizzazione; controllare anche gli equivalenti linguistici.
3. In **Indicizzazione → Pagine**, distinguere le home e guide da indicizzare dalle privacy intenzionalmente escluse.
4. In **Rendimento → Risultati di ricerca**, osservare inizialmente «b&b ascoli piceno», «bed and breakfast ascoli piceno», «alloggio ascoli piceno», «dormire ascoli piceno» e «ver sacrum»: impressioni, clic e posizione media. Conservare il periodo di confronto; non confondere una posizione media con la posizione vista in una singola ricerca.

Il 6 ottobre 2026 l’Ispezione URL nel pannello ha confermato che la home italiana è indicizzata. La sitemap è stata inviata e reinviata: il report riportava un errore di recupero, ma il test in tempo reale di Google ha confermato che l’URL della sitemap è disponibile. Il file pubblico risponde HTTP 200, contiene XML valido e non è bloccato da robots.txt. Il gestore ha inoltre segnalato che il controllo della guida italiana `/ascoli-piceno/` sembra corretto. Restano da confermare l’elaborazione della sitemap e lo stato delle altre lingue. Bing Webmaster Tools è rimandato: Bing può scoprire il sito autonomamente, ma l’indicizzazione su Google non implica quella su Bing. Le modifiche al repository non intervengono sulle autorizzazioni degli account Google o sui DNS. La comparsa e l’ordine dei risultati richiedono una nuova scansione e non sono garantiti dalle modifiche del sito.

Fonti ufficiali: [verifica della proprietà](https://support.google.com/webmasters/answer/9008080?hl=it), [sitemap e lastmod](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [contenuti utili](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [breadcrumb](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb), [Apartment](https://schema.org/Apartment).

## Correzione del posizionamento — 8 ottobre 2026

Il gestore ha chiarito che Ver Sacrum è un B&B e ha richiesto una correzione complessiva, non solo dei titoli SEO. Il precedente posizionamento dominante come appartamento, descritto nell’intervento del 6 ottobre, è superato:

- Header, H1, apertura della home, FAQ sull’ospitalità, guide di arrivo e collegamenti presentano il B&B in tutte e cinque le lingue. Le informazioni sull’appartamento a uso esclusivo, cucina, letti, scale e capienza restano accurate.
- Titoli, descrizioni, Open Graph, Twitter, testi alternativi delle anteprime e oggetti delle email usano la stessa identità. `site.name` centralizza il nome condiviso.
- Il JSON-LD identifica l’attività come `BedAndBreakfast`, secondo la conferma del gestore, e mantiene `Apartment` come alloggio fisico contenuto. Gli ID `#dimora` e `#appartamento`, indirizzo, CIN/CIR e collegamenti alle piattaforme restano invariati. Non vengono aggiunti prezzi, stelle o recensioni.
- Le risposte sono autonome e disponibili nell’HTML, con gli stessi frammenti citabili. Questa coerenza è utile per SEO, GEO, AEO e ricerca AI; non vengono aggiunti file AI, schemi speciali o promesse di citazioni.
- La data editoriale passa all’8 ottobre 2026. Il prototipo «Ascoli, con calma» resta su un branch separato e non fa parte della pubblicazione.

Il gestore ha segnalato che la sitemap non dà più errore e che Search Console indica pagine indicizzate, ma il Rendimento non mostra ancora dati. I controlli esterni dell’8 ottobre hanno rilevato risposte coerenti dai quattro DNS autorevoli Aruba e dai resolver Google/Cloudflare; home, robots e sitemap rispondono 200 con TLS valido su tutti e quattro gli IPv4 GitHub Pages. Questi riscontri non misurano il ranking né sostituiscono l’account Search Console.

Confrontati anche [Il Duomo](https://www.bbilduomo.it/), [B&B ’700](https://www.bedandbreakfast700.it/it/), [Antico Borgo Piceno](https://www.anticoborgopiceno.it/), [Ascoli Antica](http://www.ascolianticabb.it/) e [Stella](https://www.stellabb.it/it/): l’identità B&B è evidente nei loro contenuti, anche quando descrivono appartamenti. Non sono state misurate posizioni Google riproducibili o autorità dei backlink. Le schede Airbnb/Booking non vengono modificate dal deploy del sito: i loro risultati dipendono da ricerca, disponibilità, prezzo e segnali propri della piattaforma. Il monitoraggio esterno resta nelle issue #4 e #10.

Fonte del tipo strutturato: [BedAndBreakfast](https://schema.org/BedAndBreakfast). La correzione non garantisce posizioni, prenotazioni, idoneità a risultati avanzati o citazioni AI.

## Audit SEO, GEO, AEO e AIO — 7 ottobre 2026

Queste sigle non rappresentano quattro punteggi tecnici o quattro sistemi di ranking indipendenti. In questo audit:

- **SEO**: scansione, indicizzazione, contenuti e segnali del sito nei motori di ricerca.
- **GEO** (Generative Engine Optimization): rendere i fatti della struttura comprensibili, coerenti e citabili nei sistemi che generano risposte.
- **AEO** (Answer Engine Optimization): rispondere in modo diretto alle domande degli ospiti, con risposte identificabili e raggiungibili.
- **AIO**: visibilità nelle esperienze di ricerca AI, comprese AI Overviews e AI Mode. Non è una certificazione o una garanzia di inclusione.

### Risultati sul sito pubblicato

Verificata la release `v2.0.7` prima dell'intervento:

- Tutte le 15 pagine rispondono HTTP 200, hanno un solo H1, canonical autoreferenziale e sei alternative linguistiche, incluso `x-default`.
- Le dieci home/guide sono indicizzabili e ammettono snippet; le cinque privacy restano intenzionalmente `noindex, follow`. Non sono presenti restrizioni `nosnippet`, `max-snippet` o `data-nosnippet` sulle pagine da indicizzare.
- `robots.txt` e sitemap rispondono HTTP 200; la sitemap contiene dieci URL. La regola generale `Allow: /` non blocca i crawler di ricerca.
- La guida italiana restituisce HTTP 200 e il testo dell'indirizzo nelle richieste con user-agent dichiarato Googlebot, bingbot, OAI-SearchBot, ChatGPT-User, PerplexityBot e Claude-SearchBot. La prova **non verifica gli IP dei bot reali, la loro scansione effettiva o la comparsa nelle risposte AI**.
- Contenuti, domande, foto e collegamenti sono nell'HTML statico: non dipendono dall'esecuzione di JavaScript o dall'accettazione di Analytics. Identità della struttura, indirizzo, capienza e riferimenti Booking/Airbnb sono già collegati nel JSON-LD.

Non sono emersi errori bloccanti nella SEO tecnica verificata. Questo non sostituisce i rapporti di Search Console e non dimostra il posizionamento o l'indicizzazione di tutte le lingue.

### Intervento sui contenuti e sui controlli

- Le nove FAQ hanno domande esplicite e risposte comprensibili anche fuori dal contesto del paragrafo. La capienza usa `site.maxGuests`; indirizzo, CAP, orari e scale restano collegati alla configurazione condivisa. Nessun prezzo di soggiorno, recensione, classificazione B&B o servizio non confermato è aggiunto.
- La FAQ sul contatto distingue richiesta e prenotazione e chiarisce l'invio manuale dell'email. Ogni risposta ha un identificatore stabile (`#faq-capacity`, `#faq-accessibility`, `#faq-request`, ecc.), identico nelle cinque lingue. Con JavaScript, una citazione diretta apre la risposta; senza JavaScript, il controllo nativo resta utilizzabile e il testo è già presente nell'HTML.
- La scheda del soggiorno espone capienza massima e indirizzo completo in una lista di definizioni, insieme a orari e animali. Home e guida mostrano una data editoriale leggibile e un elemento `time`, coerenti con `lastmod` e `WebPage.dateModified`. La data cambia per modifiche sostanziali ai contenuti, non automaticamente a ogni build.
- La guida collega [Visit Ascoli](https://visitascoli.it/), portale turistico dell'Amministrazione Comunale, per approfondire la visita. I vecchi collegamenti alle schede della Regione Marche citati nell'intervento del 6 ottobre oggi hanno redirect non funzionanti; restano riferimenti storici, non vengono aggiunti alle pagine pubbliche.
- Le anteprime Open Graph e Twitter hanno descrizioni delle immagini localizzate. I test controllano testo statico delle risposte, ancore uniche, dati visibili/configurazione, date, metadati e assenza di restrizioni agli snippet; i browser provano citazioni, cambio lingua e uso senza JavaScript.

### Decisioni e limiti

Google documenta che AI Overviews e AI Mode seguono i normali requisiti SEO: pagina indicizzata e idonea agli snippet, contenuto utile, collegamenti interni e dati strutturati coerenti con il testo visibile. **Non richiedono file AI, `llms.txt` o uno schema speciale.** Non vengono introdotti file o markup speculativi, pagine duplicate per parole chiave, testo nascosto, istruzioni rivolte ai modelli o dati inventati.

Non viene aggiunto `FAQPage` per promettere risultati avanzati. Il registro ufficiale degli aggiornamenti consultato il 7 ottobre riporta la dismissione dei FAQ rich result dal 7 maggio 2026. Le FAQ restano utili agli ospiti e come testo consultabile indipendentemente da quel formato di risultato.

Accesso alla ricerca e uso per addestramento sono decisioni distinte: OpenAI distingue OAI-SearchBot (ricerca), GPTBot (possibile addestramento) e ChatGPT-User (azioni dell'utente, per le quali `robots.txt` può non applicarsi). La policy attuale dei crawler **non viene modificata**; una futura esclusione dell'addestramento va decisa esplicitamente, senza bloccare per errore i bot di ricerca. Bing Webmaster Tools resta rimandato e l'indicizzazione Google non implica quella su Bing.

Le verifiche esterne restano nelle issue [#4](https://github.com/angelofb/versacrum/issues/4) e [#10](https://github.com/angelofb/versacrum/issues/10): osservare query, impressioni, clic e richieste reali; per eventuali citazioni AI registrare domanda, servizio, data, lingua e URL citato. Non dedurre risultati da una sola risposta, da un test con user-agent o da un punteggio Lighthouse. Il traffico da AI Overviews/AI Mode è incluso nel tipo di ricerca Web di Search Console; una variazione di quel traffico non prova da sola una citazione AI. Nessun dato del modulo viene aggiunto ad Analytics.

Fonti ufficiali consultate: [Google: funzionalità AI e sito](https://developers.google.com/search/docs/appearance/ai-features), [aggiornamenti della documentazione Google](https://developers.google.com/search/updates), [crawler OpenAI](https://developers.openai.com/api/docs/bots), [Visit Ascoli](https://visitascoli.it/). L'accesso tecnico e la qualità dei contenuti non garantiscono scansione, citazioni, raccomandazioni o posizionamento.
