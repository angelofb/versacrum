# Verifiche locali: configurazione e tempi

Queste misure riguardano il **runner dei test**, non le prestazioni del sito per i visitatori. Le misure Lighthouse e i limiti dei dati reali sono in [PERFORMANCE.md](PERFORMANCE.md).

## Copertura e diagnostica

`npm run verify`, eseguito anche dall'hook pre-push, mantiene build, formattazione, actionlint, tipi, test SEO/immagini/release/runner, tutti i quattro progetti Playwright e audit dipendenze. La matrice browser comprende 224 test: 216 passano e 8 sono skip intenzionali. Nessun progetto o scenario è stato rimosso per ottenere tempi inferiori.

- Due worker per default, oppure uno se `availableParallelism()` vede una sola CPU. `PLAYWRIGHT_WORKERS` accetta un intero positivo esplicito; la CLI browser supporta anche `--workers`.
- Tracce solo sul primo retry (`on-first-retry`), con un solo retry diagnostico. Uno screenshot automatico conserva anche il primo fallimento.
- `failOnFlakyTests: true`: un test che passa solo al retry **blocca comunque la verifica e il push**. Un retry superato non è una correzione.
- `CI=true` resta attivo nella verifica completa, compreso il divieto di `test.only`.
- I sei test di `npm run test:runner` controllano configurazione e override; fixture reali Playwright provano che flaky, errori persistenti e test focalizzati fanno terminare il runner con errore, e che le tracce vengono prodotte solo sul retry.

Per diagnosticare il primo tentativo, usare `npm run test:browser -- <file> --project=<profilo> --trace=retain-on-failure`. Il comando mirato richiede una build aggiornata e non sostituisce la verifica completa.

## Confronto completo del 7 ottobre 2026

Macchina locale: Linux, Intel Core i5-4300U, **due core fisici/quattro thread**, 7,6 GiB di RAM. Node 26.10.0, Playwright 1.63.0, due worker in entrambe le verifiche. Prima: configurazione della release `v2.0.8`; dopo: tracce sul retry, screenshot solo sugli errori, sincronizzazioni dei test e sei nuovi test del runner. Dipendenze, immagini e copertura browser non cambiano.

| Misura            | Prima      | Dopo       | Riduzione circa |
| ----------------- | ---------- | ---------- | --------------- |
| Verifica completa | 9 min 30 s | 7 min 35 s | 20%             |
| Suite browser     | 9 min 6 s  | 7 min 3 s  | 22%             |
| Chromium desktop  | 1 min 5 s  | 47 s       |                 |
| Chromium mobile   | 1 min 12 s | 58 s       |                 |
| WebKit desktop    | 3 min 43 s | 2 min 50 s |                 |
| WebKit mobile     | 3 min 4 s  | 2 min 26 s |                 |

Entrambe le verifiche di riferimento sono riuscite: 216 browser passati, 8 skip previsti, zero errori di tipo e zero vulnerabilità. Quella nuova comprende anche i sei test del runner. I tempi dei profili sono finestre approssimate dal report e non includono tutto l'avvio del runner. Il confronto usa due esecuzioni complete, non una serie statistica: carico, frequenza della CPU, temperatura e cache possono cambiare i risultati. Non è una promessa di durata su altri computer.

## Esperimenti mirati

Prima di modificare la configurazione, lo stesso test di navigazione è stato ripetuto tre volte per ciascun profilo WebKit, con due worker: sei esecuzioni per modalità, tutte riuscite. Con `retain-on-failure` il campione ha richiesto 34,3 s; con trace disattivato 23,0 s, circa il 33% in meno. Questo campione non rappresenta l'intera suite.

Il confronto fra worker usava 16 esecuzioni di quattro scenari WebKit: navigazione home, accessibilità del dialogo, scadenza del consenso e guide localizzate, con tracce disattivate. È stato eseguito **prima** delle correzioni di sincronizzazione:

| Worker | Tempo  | Esito                                 | CPU inattiva media |
| ------ | ------ | ------------------------------------- | ------------------ |
| 2      | 66,8 s | 15 passati, 1 click intermittente     | 19,1%              |
| 3      | 73,4 s | 16 passati                            | 7,4%               |
| 4      | 79,3 s | 15 passati, 1 timeout del test a 30 s | 6,0%               |

Sono aumentati contesa CPU e swap; più worker non hanno ridotto il tempo del campione. Le prove fallite non sono riferimenti di verifica superata. Il default resta prudenzialmente due: per altre macchine confrontare esplicitamente i worker senza dedurre la capacità dai soli thread logici.

## Stabilità senza attese fisse

Riducendo il tracing sono emerse fragilità che le pause della registrazione potevano nascondere:

- Il test delle guide con JavaScript usa movimento ridotto, evitando di gareggiare con lo scorrimento dei frammenti. Le prove dedicate di scorrimento animato e allineamento in `tests/anchors.spec.ts` restano attive. Otto esecuzioni mirate della guida sui due profili WebKit sono passate senza flaky.
- Il test del form avanza con Tab dopo aver corretto il campo data e il tentativo volutamente invalido: il popup nativo di validazione WebKit non intercetta più il click successivo. Ventiquattro esecuzioni mirate sui quattro profili sono passate senza flaky.

Non sono state aggiunte attese fisse, click forzati o tolleranze maggiori. Una prima verifica con il nuovo runner è stata bloccata per un test flaky del form, nonostante il retry riuscito: non è conteggiata nel confronto completo. La verifica finale è riuscita senza flaky. Nessun codice del sito pubblico è stato modificato da questa ottimizzazione.
