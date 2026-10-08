# Verifiche: GitHub Actions e misure locali

Queste misure riguardano il **runner dei test**, non le prestazioni del sito per i visitatori. Le misure Lighthouse e i limiti dei dati reali sono in [PERFORMANCE.md](PERFORMANCE.md).

## Pipeline GitHub Actions

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) esegue le verifiche sui push a main/master, sulle pull request e sui tag `v*`; è disponibile anche l'avvio manuale per i soli controlli. Solo **un push di tag**, con tutti i job riusciti, abilita Pages. Un avvio manuale non pubblica, nemmeno scegliendo un tag.

La configurazione [`mise.ci.toml`](mise.ci.toml) è attiva solo con `MISE_ENV=ci` o `mise -E ci`: non modifica i default locali. `mise-action` prepara Node 24, actionlint, Lefthook (per le fixture degli hook) e yq (per i test strutturali della pipeline). Il workflow parte dal generatore `mise generate github-action`, adattato con SHA stabili, permessi minimi e gate di release; non richiede le funzioni sperimentali di mise.

1. `checks` esegue `mise run ci:checks`: formattazione, actionlint, una sola build, tipi, unit test SEO/immagini/release/pipeline e audit high. Condivide il `dist/` riuscito come artefatto `site-build`.
2. La matrice `browser` usa quattro runner Ubuntu 24.04 indipendenti: desktop Chromium, mobile Chromium, desktop WebKit e mobile WebKit, con due worker ciascuno. Tutti scaricano la stessa build e invocano `mise run ci:browser`; il desktop verifica anche le fixture della diagnostica del runner. `fail-fast: false` consente di raccogliere la diagnosi degli altri profili dopo un errore.
3. Il deploy dipende da `checks` e dall'intera matrice. Scarica e pubblica la build testata, senza una seconda compilazione. I permessi Pages/OIDC sono assegnati solo a questo job nell'ambiente `github-pages`.

Tool, pacchetti npm e binari Playwright sono in cache. La cache dei browser è separata per motore e versione Playwright, non per versione del sito; le librerie di sistema vengono comunque installate sui runner nuovi. Le pull request ripristinano le cache senza salvarle. Report HTML, schermate di revisione/fallimento e tracce dei retry sono caricati per ciascun profilo anche in caso di errore, con conservazione di sette giorni. I tag sono serializzati senza cancellazione; i run superati da nuovi push dello stesso branch/PR vengono cancellati.

`npm run test:ci` controlla trigger, dipendenze del deploy, copertura della matrice, task mise, propagazione dell'artefatto, permessi, SHA e rimozione del pre-push; esegue anche il vero comando shell che ricava la versione Playwright. `npm run test:deploy` prova con Git/bare repository e Lefthook reali l'aggiornamento di un clone con il vecchio hook: il push torna libero, ma gli errori di generazione bloccano ancora il commit e gli output corretti vengono aggiunti all'indice.

La generazione e il pre-commit delle immagini restano locali e invariati; la CI controlla gli asset versionati senza rigenerarli. Il comando di release non installa più i browser e non esegue test prima del push. In caso di errore CI, commit/tag rimangono remoti ma Pages e GitHub Release non vengono pubblicati; correggere codice con una nuova versione oppure riprovare la stessa release solo per problemi di ambiente/rete.

## Copertura e diagnostica

`npm run verify` resta disponibile **facoltativamente in locale**, senza hook pre-push, e mantiene build, formattazione, actionlint, tipi, test SEO/immagini/release/pipeline/runner, tutti i quattro progetti Playwright e audit dipendenze. La matrice browser comprende 228 test: 220 scenari ordinari e 8 skip intenzionali. Il controllo dell’identità B&B copre le cinque lingue anche senza JavaScript, su tutti e quattro i profili. Nessun progetto o scenario è stato rimosso per ottenere tempi inferiori.

- Due worker per default, oppure uno se `availableParallelism()` vede una sola CPU. `PLAYWRIGHT_WORKERS` accetta un intero positivo esplicito; la CLI browser supporta anche `--workers`.
- Tracce solo sul primo retry (`on-first-retry`), con un solo retry diagnostico. Uno screenshot automatico conserva anche il primo fallimento.
- `failOnFlakyTests: true`: un test che passa solo al retry **blocca comunque la verifica e il deploy**. Un retry superato non è una correzione.
- `CI=true` resta attivo nella verifica completa, compreso il divieto di `test.only`.
- I sei test di `npm run test:runner` controllano configurazione e override; fixture reali Playwright provano che flaky, errori persistenti e test focalizzati fanno terminare il runner con errore, e che le tracce vengono prodotte solo sul retry.

Per diagnosticare il primo tentativo, usare `npm run test:browser -- <file> --project=<profilo> --trace=retain-on-failure`. Il comando mirato richiede una build aggiornata e non sostituisce la verifica completa.

## Verifiche della migrazione

Il piano `ci:checks` è stato eseguito localmente con Node 24.21.0: build, tipi, formattazione, actionlint, 43 unit test e audit riusciti. Anche i sei test reali della diagnostica del runner sono passati; zizmor non ha segnalato problemi nel workflow.

Una prova separata ha copiato soltanto `dist/` in un workspace temporaneo **senza `.astro/`**, come nel trasferimento tra job. Il task mise ha eseguito i due scenari di `discovery.spec.ts` su tutti i quattro profili: **8 passati in 25,9 s, zero flaky**, senza ricompilare. È una prova mirata del trasferimento della build, non una riesecuzione della suite completa né una misurazione dei runner GitHub.

## Confronto completo locale del 7 ottobre 2026

Queste misure precedono lo spostamento dei test su GitHub e **non sono tempi della nuova CI**. L'ottimizzazione del runner e le regole sui flaky restano attive.

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
