# Ver Sacrum — completamento contenuti

## Implementato

- [x] Restyling editoriale responsive e fotografie selezionate per ambiente.
- [x] Rimozione della valutazione e dei riferimenti a recensioni.
- [x] Immagini responsive AVIF/WebP/JPEG con dimensioni esplicite.
- [x] Galleria con tastiera, swipe e ripristino del focus.
- [x] Menu mobile accessibile, movimento ridotto, contenuti fruibili senza JavaScript.
- [x] Form con verifica date, email precompilata e riapertura della richiesta senza inserire dati personali nei link della pagina.
- [x] Sezione soggiorno con orari, informazioni pratiche e FAQ.
- [x] Configurazione centralizzata dei riferimenti e nessun link fittizio.
- [x] Font locali, favicon, immagine Open Graph e SEO condizionato al dominio.
- [x] Dipendenze aggiornate, build Vite e verifiche browser in CI.

## Prima dell'apertura al pubblico

- [x] Completata l’informativa in `src/privacy.html` e `src/privacy.config.js`: dati del titolare e cancellazione manuale confermati; conservazione GA4 verificata. Corretto il controllo di pubblicazione (#12). La verifica della versione pubblicata resta parte del deploy.
- [ ] Confermare piano e accessibilità (primo piano, circa 20 gradini, senza ascensore).
- [ ] Verificare una richiesta reale dal programma di posta fino alla ricezione nella casella della struttura.
- [ ] Configurare e verificare DNS, dominio personalizzato e HTTPS su GitHub Pages; controllare i redirect HTTP e www verso https://versacrumbnb.it/. Dominio in configurazione e CNAME già presenti.
- [ ] Verificare una visita con consenso nei report GA4 in tempo reale dopo la pubblicazione.
- [ ] Misurare prestazioni mobile e Core Web Vitals sull’hosting definitivo, usando anche i dati reali quando disponibili. I report Lighthouse già presenti nel repository sono storici.

## SEO e ricerca AI — priorità

Stato verificato nel codice locale: HTML statico leggibile senza JavaScript, titolo e descrizione, canonical, dati strutturati della struttura e immagini responsive già presenti. `seo.indexable` è ancora `false`: la build produce `noindex, nofollow` e non genera la sitemap. Il controllo del 20 settembre 2026 conferma noindex sulla home pubblica HTTP e sitemap assente; HTTPS fallisce per certificato non corrispondente al dominio. L’indicizzazione effettiva nei motori non è stata verificata. Esiti e priorità in [AUDIT.md](AUDIT.md). Procedura tecnica in [SEO.md](SEO.md).

### 1. Indicizzazione e verifica al lancio

- [ ] Dopo aver completato la privacy e verificato i dati, impostare `seo.indexable: true` in `src/site.config.js` e aggiornare i test della pagina compilata per la modalità pubblica, mantenendo quelli dell’anteprima.
- [ ] Eseguire build e test; verificare sul dominio pubblico risposta HTTP 200, canonical corretto, assenza di `noindex`, accessibilità delle immagini, `robots.txt` e `sitemap.xml` generata.
- [ ] Verificare la proprietà in Google Search Console, inviare la sitemap e usare Ispezione URL per controllare la pagina ricevuta da Google.
- [ ] Configurare Bing Webmaster Tools, inviare la sitemap e controllare indicizzazione ed eventuali problemi di scansione.
- [ ] Validare i dati strutturati pubblicati e la loro corrispondenza con i contenuti visibili, senza assumere che garantiscano risultati avanzati.

### 2. Contenuti e presenza locale

- [ ] Confermare con il gestore la definizione “appartamento nel centro storico” e, se corretta, affiancarla a “dimora” nei testi e nei metadati senza ripetizioni artificiali.
- [ ] Aggiungere indicazioni verificate dalla stazione all’ingresso della struttura; mantenere coerenti le informazioni già presenti su parcheggi e accessibilità.
- [ ] Allineare nome, indirizzo, telefono e sito tra i profili effettivamente presenti, Booking e Airbnb; valutare Google Business Profile solo se la struttura è idonea.
- [ ] Come fase finale, dopo il completamento e il consolidamento della versione italiana, tradurre integralmente il sito in inglese: URL dedicati, contenuti, modulo e messaggi, privacy e cookie, testi accessibili e metadati, canonical e collegamenti `hreflang` coerenti. Attività richiesta e tracciata in [#9](https://github.com/angelofb/versacrum/issues/9).

### 3. Bot, ricerca AI e misurazione

- [ ] Verificare sull’hosting che Googlebot, Bingbot e OAI-SearchBot possano raggiungere il sito senza blocchi. Il `robots.txt` generato consente già la scansione generale: non servono regole duplicate di autorizzazione.
- [ ] Decidere separatamente l’eventuale politica per i bot di addestramento, come GPTBot; consentire la ricerca e consentire l’addestramento sono scelte distinte.
- [ ] Dopo il lancio, osservare query, impressioni e clic in Search Console/Bing e richieste effettive; usare questi dati per scegliere ulteriori miglioramenti e contenuti. Prima baseline e cadenza di controllo in [#10](https://github.com/angelofb/versacrum/issues/10); il monitoraggio continuativo non blocca la traduzione finale.

Per Google AI Overviews/AI Mode valgono le fondamenta SEO: contenuti utili, accurati, accessibili e indicizzabili. Non sono prioritari file `llms.txt`, markup “AI” o pagine ripetitive create solo per i bot. Consentire la scansione non garantisce indicizzazione, posizionamento o citazioni nelle risposte AI. Analytics è già integrato e misura le visite dopo il consenso; la verifica della ricezione sul sito pubblico resta nella checklist di lancio.

Riferimenti: [Google e ricerca AI](https://developers.google.com/search/docs/appearance/ai-features), [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a), [crawler OpenAI](https://developers.openai.com/api/docs/bots).

## CORREZIONI

- [x] togliere la dicitura fino a 3 ospiti ma lasciare "La dimora accoglie fino a tre ospiti, con un letto matrimoniale nella camera e un divano letto nel soggiorno. Puoi indicare il numero di ospiti nella richiesta di disponibilità."
- [x] non c'è l aria condizionata
- [x] indirizzo: Via Ottaviano Iannella 32
- [x] posizione mappa
- [x] togliere TARIFFA_A_NOTTE,SERVIZI_INCLUSI_NELLA_TARIFFA,SOGGIORNO_MINIMO,IMPOSTA_DI_SOGGIORNO e rivedere la sezione che li contenvea
- [x] aggiungere nella sezione "La dimora dispone di una cucina? Sì, trovi una cucina attrezzata con piano cottura, forno e bollitore. Puoi preparare i tuoi pasti e organizzare le giornate secondo i tuoi ritmi. Guarda le foto degli ambienti." che sono presenti anche lavatrice e asciugatrice
- [x] nella sezione "Dove si trova Ver Sacrum ad Ascoli Piceno?" aggiungere l inidirizzo
- [x] ORARIO_CHECK_IN 15-18
- [x] ORARIO_CHECK_OUT 8-10
- [x] INDICAZIONI_PARCHEGGIO_E_ZTL Vi lascio qualche informazione che può esservi utile. Potete lasciare la macchina nei posti di carico e scarico presenti a Piazza Roma, a circa 80 metri dall’appartamento, in modo tale da poter scaricare le valigie. Per il parcheggio potete usufruire dei normali parcheggi a raso a pagamento posti in zona Tribunale (piazza serafino Orlini, tariffa oraria) o in via delle Rimembranze (ticket periodico 2€ al giorno),In alternativa c’è il parcheggio di Porta Torricella (gestito da società di parcheggio privata, accesso con sbarre), distante circa 600mt. I parcheggi gratuiti distano invece 800mt in zona Porta Romana (viale Treviri e via Oberdan).
- [x] togliere CONDIZIONI_DI_ACCONTO, CONDIZIONI_DI_CANCELLAZIONE
- [x] POLITICA_ANIMALI ammessi animali piccola taglia
- [x] EMAIL versacrumbnb@gmail.com
- [x] +39 3384344560
- [x] cambia prova la richiesta in invia la richiesta, l indirizzo è lo stesso di EMAIL
- [x] LINK_BOOKING https://www.booking.com/hotel/it/ver-sacrum-appartamento-in-centro.it.html
- [x] LINK_AIRBNB https://www.airbnb.it/rooms/1742987946032945161
- [x] togliere instagram
- [x] dominio versacrumbnb.it
- [x] CIR 044007-LOC-00092
- [x] CIN IT044007C2BWYNPLYY
- [x] aggiungere Google Analytics: G-S4XQ2MLL70, con accettazione/rifiuto e revoca dalle preferenze cookie.

## Dati ancora necessari dal gestore

- Dati privacy acquisiti: titolare, recapito, cancellazione manuale dopo 30 giorni, GA4 eventi 2 mesi e utenti 14 mesi con rinnovo. Resta l’automazione Gmail (#11), separata dalla procedura manuale già confermata.
- Conferma delle informazioni su piano, gradini e ascensore già presenti.
- Configurazione/accesso a DNS e GitHub Pages per completare la pubblicazione sul dominio.
- Accesso o verifica della proprietà in Search Console e Bing Webmaster Tools.
- Conferma della definizione dell’alloggio e indicazioni dalla stazione. La versione inglese completa è già richiesta, da realizzare come fase finale.

La mappa usa una ricerca per Via Ottaviano Iannella 32, Ascoli Piceno. Un eventuale link alla scheda Google Maps della struttura può sostituirla.
Il modulo apre un’email precompilata: invio finale e ricezione vanno provati con un programma di posta reale.
