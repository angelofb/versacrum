# Ver Sacrum — completamento contenuti

## Implementato

- [x] Restyling editoriale responsive e fotografie selezionate per ambiente.
- [x] Rimozione della valutazione e dei riferimenti a recensioni.
- [x] Immagini responsive AVIF/WebP/JPEG con dimensioni esplicite.
- [x] Galleria con tastiera, swipe e ripristino del focus.
- [x] Menu mobile accessibile, movimento ridotto, contenuti fruibili senza JavaScript.
- [x] Form con verifica date, email precompilata e gestione errori per un eventuale servizio di invio diretto.
- [x] Sezione soggiorno con orari, informazioni pratiche e FAQ.
- [x] Configurazione centralizzata dei riferimenti e nessun link fittizio.
- [x] Font locali, favicon, immagine Open Graph e SEO condizionato al dominio.
- [x] Dipendenze aggiornate, build Vite e verifiche browser in CI.

## Prima dell'apertura al pubblico

- [ ] Completare l’informativa privacy in `src/site.config.js`.
- [ ] Confermare piano e accessibilità (primo piano, circa 20 gradini, senza ascensore).
- [ ] Verificare una richiesta reale dal programma di posta fino alla ricezione nella casella della struttura.
- [ ] Configurare DNS e dominio personalizzato su GitHub Pages; verificare il sito su versacrumbnb.it e attivare l’indicizzazione dopo aver completato la privacy. CNAME già presente.
- [ ] Verificare una visita con consenso nei report GA4 in tempo reale dopo la pubblicazione.
- [ ] Ripetere la misurazione performance sull'hosting definitivo. I report Lighthouse già presenti nel repository sono storici.

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

- Testo o URL dell’informativa privacy della struttura.
- Conferma delle informazioni su piano, gradini e ascensore già presenti.
- Configurazione/accesso a DNS e GitHub Pages per completare la pubblicazione sul dominio.

La mappa usa una ricerca per Via Ottaviano Iannella 32, Ascoli Piceno. Un eventuale link alla scheda Google Maps della struttura può sostituirla.
Il modulo apre un’email precompilata: invio finale e ricezione vanno provati con un programma di posta reale.
