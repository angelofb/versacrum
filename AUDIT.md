# Audit di Ver Sacrum — 20 settembre 2026

Controllo della copia locale, delle issue GitHub, del workflow Pages e del sito pubblico. Le modifiche locali non sono tutte in Git: la pagina privacy e i relativi file sono ancora non tracciati. Il comportamento del sito pubblicato è quindi distinto da quello verificato con Playwright.

## Esito e ordine di intervento

Le basi locali funzionano, ma il sito non è pronto per un lancio indicizzabile. La prima priorità emersa è il certificato HTTPS del dominio pubblico, seguita dal completamento e dalla pubblicazione dell’informativa e dalla correzione dei controlli privacy/SEO. Il noindex è tuttora intenzionale: non va rimosso per aggirare questi problemi.

| Priorità                       | Risultato                                                                         | Stato / attività                                                                               |
| ------------------------------ | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Alta                           | Certificato HTTPS non valido per dominio principale e www; HTTP resta accessibile | Confermato, [#3](https://github.com/angelofb/versacrum/issues/3) aggiornata                    |
| Alta                           | L’informativa esiste localmente ma la pagina pubblica restituisce 404             | Confermato, completare #1 e pubblicare dopo verifica                                           |
| Alta                           | Blocco SEO basato sul vecchio campo privacy, non sull’informativa effettiva       | Riprodotto, nuova [#12](https://github.com/angelofb/versacrum/issues/12)                       |
| Media                          | Consenso scaduto resta attivo nella pagina già aperta                             | Riprodotto, nuova [#13](https://github.com/angelofb/versacrum/issues/13)                       |
| Media                          | Cambio del consenso in un’altra scheda ricarica e svuota la richiesta compilata   | Riprodotto, #13                                                                                |
| Media                          | Prima scelta cookie sposta il focus al footer                                     | Riprodotto, nuova [#14](https://github.com/angelofb/versacrum/issues/14)                       |
| Da verificare prima del lancio | Eventi effettivamente prodotti dal tag GA4 e misurazione avanzata                 | Non coperti dai test simulati, [#2](https://github.com/angelofb/versacrum/issues/2) aggiornata |
| Bassa                          | Documentazione non coerente con nuova privacy e durata del rifiuto                | Correzioni locali a README e TODO effettuate                                                   |

## 1. Dominio e pubblicazione

Verifiche di rete eseguite senza disabilitare la validazione TLS:

- DNS di `versacrumbnb.it` e `www.versacrumbnb.it` risolti verso indirizzi GitHub Pages.
- `http://versacrumbnb.it/`: HTTP 200, nessun passaggio obbligatorio a HTTPS.
- `http://www.versacrumbnb.it/`: arriva alla home HTTP senza www.
- HTTPS su entrambi i nomi: `CERTIFICATE_VERIFY_FAILED`, hostname mismatch.
- API GitHub Pages: dominio personalizzato corretto, pubblicazione tramite workflow, `https_enforced=false`.
- Home pubblica HTTP: titolo corretto e `noindex, nofollow`; canonical e immagini social puntano però all’HTTPS attualmente non valido.
- `/privacy.html` via HTTP: 404. La home pubblica non contiene il nuovo link a questa pagina.
- `/robots.txt` via HTTP: 200 e scansione consentita.
- `/sitemap.xml` via HTTP: 404, coerente con la modalità anteprima.
- Ultimo workflow elencato: concluso con successo il 19 settembre 2026. Il successo del workflow non dimostra che il certificato del dominio sia valido.

La home è già pubblicamente raggiungibile: noindex non è un controllo di accesso. Non basta quindi considerare la privacy un’attività da svolgere prima che il sito diventi accessibile. Verificare certificato e HTTPS in Pages e preparare la pubblicazione della versione corretta, senza attivare prematuramente l’indicizzazione.

## 2. Configurazione privacy e blocco SEO

Riferimenti: `scripts/seo.js:33`, `src/site.config.js`, `src/privacy.config.js`, `src/main.js:94`.

`publicationIssues(site)` guarda ogni campo di `site` eccetto `formEndpoint`, incluso il vecchio `site.privacy`. La pagina effettiva legge invece un altro oggetto. Con la configurazione corrente il risultato del controllo è soltanto `['privacy']`.

Prova eseguita senza modificare la configurazione reale: assegnare una stringa al campo legacy e passare `indexable: true` a `createSeo` produce `indexable: true`, anche se `privacy.analyticsRetention` contiene ancora il placeholder. Ci sono quindi due difetti: completare la vera informativa non sblocca il controllo, mentre riempire il campo sbagliato lo supera senza completarla.

Il ramo opzionale di invio diretto dipende dallo stesso campo legacy. Se attivato con un endpoint HTTPS, contraddirebbe il testo attuale dell’informativa, che dichiara assenza di chiamate a servizi di invio. Al momento quel ramo non è attivo: il flusso configurato è mailto.

La bozza ha ora nome, email e indirizzo del titolare. Restano da confermare gestione e tempi delle richieste e conservazione Analytics. I 30 giorni sono un valore nella bozza, non la prova di un’automazione operativa: #11 descrive lavoro futuro. Il controllo SEO deve leggere la configurazione effettiva e uno stato di revisione coerente con il documento (#12).

## 3. Consenso durante la sessione

Riferimento: `src/analytics.js`, funzioni `readChoice`, `saveChoice` e listener `storage`.

Il consenso viene verificato quando lo script parte. Una prova con accettazione valida in scadenza dopo un secondo mostra, trascorso il termine, `ga-disable-G-S4XQ2MLL70=false`, banner nascosto e preferenze che indicano ancora accettazione. Il tag era intercettato: questo conferma il difetto dello stato locale, non una trasmissione reale a Google. Occorrono gestione della scadenza, ricontrollo al ritorno sulla pagina e test dedicati.

Seconda prova: compilare il nome nella home, aprire la privacy in un’altra scheda e passare da rifiuto ad accettazione. Il listener `storage` ricarica la home e il campo torna vuoto. Il reload avviene anche quando Analytics non era caricato, quindi non serviva rimuoverlo. La soluzione deve evitare perdita silenziosa dei campi senza aggiungere conservazione persistente non prevista (#13).

Terza prova: dopo il primo rifiuto, il focus è `analytics-settings` nel footer; Tab non prosegue verso il contenuto principale. Il ripristino al footer è sensato quando il pannello è stato aperto da lì, non alla prima scelta (#14).

## 4. Analytics: limite delle verifiche attuali

I test sostituiscono il tag Google con uno script vuoto. Verificano il blocco iniziale, i comandi, la persistenza, la revoca e i cookie di prova; non eseguono il codice reale di misurazione avanzata.

Il mailto costruito in `src/main.js:154` contiene dati della richiesta nel parametro body. La rimozione di query e frammento da `page_location` non garantisce che altri parametri, come `link_url`, siano privi di dati. Google documenta URL di destinazione e interazioni con moduli tra i dati di misurazione avanzata. Non è accertato che il mailto sia raccolto dalla proprietà attuale: va verificato, non presentato come fuga di dati già avvenuta.

In #2 sono richiesti controllo delle opzioni effettive e osservazione di URL/payload con dati sintetici, raccolta bloccata o proprietà di test. Controllare sia il click automatico sia il link manuale di fallback. Un evento `form_submit` o click mailto non prova l’invio né la ricezione della richiesta.

Fonti: [misurazione avanzata](https://support.google.com/analytics/answer/9216061), [parametri degli eventi](https://support.google.com/analytics/table/13594742).

## 5. Contenuti, modulo e presentazione

- Date, composizione della richiesta, contatti, galleria, menu e assenza di overflow superano i test locali. Nessun riferimento interno `#id` mancante nella home controllata.
- Nessun errore JavaScript o risorsa locale in errore nei percorsi coperti dai test; nessuna richiesta esterna prima del consenso.
- Screenshot desktop e mobile controllati: nessuna sovrapposizione evidente nel primo schermo. Su mobile il banner occupa molto spazio e la fotografia scende sotto la prima schermata: miglioramento di presentazione, non errore funzionale.
- La prova di apertura e ricezione con un programma di posta reale resta da fare (#5); la lunghezza del messaggio mailto va verificata sui client effettivamente usati, dato il campo libero fino a 2.000 caratteri.
- Piano, gradini, ascensore, parcheggi e descrizione precisa dell’alloggio richiedono conferma del gestore (#6). Non sono stati dedotti nuovi dati dalle foto.
- La versione inglese resta una fase finale completa (#9), non un prerequisito per correggere HTTPS o privacy.

## 6. Copertura e limiti dei test

Eseguiti sulla build locale:

- `npm run build`: riuscita.
- Test SEO: 7 superati.
- Playwright: 30 superati, 2 saltati intenzionalmente perché specifici di desktop/mobile.
- Controlli axe nei test: superati per gli stati coperti; non dimostrano da soli l’accessibilità di tutti i percorsi da tastiera.
- `npm audit`: zero vulnerabilità note segnalate al momento del controllo; non equivale a un audit completo di sicurezza.
- Formattazione: trovato e corretto un errore di formato in `src/privacy.html`.

La prima esecuzione browser era bloccata dalla sandbox all’apertura della porta locale; la seconda, con autorizzazione all’esecuzione, è terminata correttamente. Nessun test fallito è stato mascherato come superato.

La configurazione mobile usa Chromium con emulazione iPhone, non Safari/WebKit reale. Mancano prove con client email reali, proprietà GA4 reale, Search Console/Bing e prestazioni dell’hosting corretto. I test della home aspettano esplicitamente noindex e dovranno essere adattati al lancio (#4). Mancavano i casi limite riprodotti nei punti precedenti, ora tracciati nelle nuove issue.

## 7. Correzioni e attività risultanti

Corrette localmente la formattazione della privacy e le indicazioni obsolete di README/TODO: sorgente della privacy, differenza tra sei mesi di accettazione e 180 giorni dei cookie, rifiuto persistente, stato del dominio e rischi del ramo di invio diretto.

Aggiornate #2 e #3 con evidenze concrete; create #12, #13 e #14 con riproduzione e criteri di completamento. Il codice funzionale dei difetti appena individuati non è stato modificato durante questo audit; non sono stati effettuati deploy, cambi di DNS, cambi alla proprietà GA4 o cancellazioni di posta.

Ordine proposto: correggere certificato/HTTPS, chiudere la bozza privacy e il controllo di pubblicazione, correggere la gestione del consenso, verificare i contatti e GA4, pubblicare e verificare la versione completa; quindi attivare l’indicizzazione con gli strumenti di ricerca. Misure reali e traduzione seguono il backlog esistente.

## 8. Correzioni successive all’audit

L’audit precedente è una fotografia dello stato iniziale; le seguenti correzioni sono state eseguite nella stessa sessione su richiesta del gestore.

- `5b08a2c`: commit del lavoro privacy e dell’audit preesistenti.
- `2e9629a`: fonte unica privacy/SEO, controlli sui dati effettivi e stato di revisione; rimosso il ramo di invio diretto non configurato e incompatibile con l’informativa.
- `4bc188b`: scadenza durante la sessione, sincronizzazione senza reload e gestione dello storage non disponibile; preservazione del modulo.
- `9acb687`: focus sul contenuto alla prima scelta e ritorno al controllo di apertura quando si usano le preferenze.
- `901cf40`: eliminazione dei dati della richiesta dai link del DOM, destinazione del modulo esplicita e pulizia dell’URL prima di caricare Analytics; test opzionale con tag Google reale e rete completamente intercettata.

La prova con il tag reale ha confermato un percorso di esposizione prima della correzione: `form_start` includeva la query della pagina in `form_destination`, pur avendo `page_location` pulito. Dopo la correzione, i due test desktop/mobile passano e nessun marcatore sintetico dei campi o dell’URL compare nelle richieste intercettate. Tutte le richieste di raccolta sono state bloccate localmente: nessun evento del test è stato trasmesso alla proprietà.

L’accesso in lettura all’interfaccia GA4 ha mostrato la proprietà Ver Sacrum B&B e l’ID corretto: eventi conservati 2 mesi, utenti 14 mesi, rinnovo in caso di nuova attività attivo. Questi valori sono stati inseriti nell’informativa, senza cambiare le impostazioni della proprietà. Il gestore ha confermato la cancellazione manuale dopo 30 giorni dalla chiusura per le richieste senza prenotazione. Rimosso pertanto lo stato di bozza; la pagina privacy resta noindex e l’indicizzazione della home resta disattivata in attesa del lancio completo.

Per HTTPS è stato tentato il comando Pages `https_enforced=true`: GitHub risponde “The certificate does not exist yet”. Il dominio è stato risalvato, poi rimosso e immediatamente riassociato secondo la procedura ufficiale per riavviare il provisioning. La configurazione finale mantiene `versacrumbnb.it`. Il certificato e il redirect HTTPS non vanno considerati risolti finché la verifica esterna non riesce. Fonte: [procedura GitHub](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https).

La revoca senza reload usa il [flag di esclusione documentato da Google](https://developers.google.com/tag-platform/security/guides/privacy): il codice caricato resta in memoria ma la raccolta e la scrittura dei cookie sono disabilitate. Non sono state introdotte copie persistenti del modulo.
