# Prestazioni: baseline mobile pubblica

Prima rilevazione: 23 settembre 2026, dopo il deploy del commit `f385f00` ([workflow riuscito](https://github.com/angelofb/versacrum/actions/runs/35826031236)). URL: <https://versacrumbnb.it/>. Misura di **laboratorio**, non dati dei visitatori: Lighthouse 13.5.0 con Chromium headless installato da Playwright, profilo mobile predefinito (viewport 412 × 823, DPR 1,75, rete simulata e CPU rallentata 4×), senza precedente consenso Analytics. Tre esecuzioni indipendenti sul Mac locale, con storage inizialmente vuoto. I report JSON completi sono rimasti nella directory temporanea della misura; i risultati essenziali sono registrati qui.

| Esecuzione (UTC) | Punteggio |    FCP |    LCP |   CLS |  TBT |
| ---------------- | --------: | -----: | -----: | ----: | ---: |
| 07:58:36         |        81 | 1,04 s | 1,20 s | 0,421 | 0 ms |
| 07:59:11         |        97 | 1,63 s | 1,89 s |     0 | 9 ms |
| 07:59:40         |        79 | 1,01 s | 1,21 s | 0,484 | 0 ms |

Mediane: punteggio 81, LCP 1,21 s, CLS 0,421. Lighthouse identifica il titolo della hero come elemento LCP nei run esaminati. Il peso trasferito è circa 230–261 kB: in un run 121 kB di immagini, 90 kB di cinque font locali, 5,5 kB di CSS e 3,9 kB di JavaScript applicativo. L'AVIF della foto principale a 800 px pesa circa 44 kB; non risultano richieste di terze parti prima del consenso. Immagine principale, galleria e font si caricano correttamente. Non emerge un problema LCP o di blocco del thread principale da correggere subito.

Il CLS è invece instabile e spesso alto. Nei run con spostamento, i due eventi maggiori (0,312 e 0,110) coinvolgono la sezione iniziale. Il pannello consenso nasce nascosto nell'HTML e viene mostrato tramite JavaScript sopra il contenuto: è una causa plausibile, **da confermare con una traccia mirata**. Lighthouse segnala anche font caricati in alcuni eventi minori. L'intervento è tracciato in [#24](https://github.com/angelofb/versacrum/issues/24); non è stato modificato il layout sulla sola base di questa baseline.

Una prova preliminare con Microsoft Edge ha mostrato uno script aggiuntivo di circa 134 kB, assente dall'HTML pubblico e dalle richieste di Chromium pulito. Per questo i numeri Edge non entrano nella baseline. L'API pubblica PageSpeed Insights ha restituito HTTP 429 durante il controllo: **non è stata ottenuta una misura CrUX**; ciò non dimostra che manchino dati reali. INP richiede interazioni reali e non si ricava da questa prova Lighthouse. Quando disponibili, consultare Core Web Vitals/Search Console per il 75° percentile mobile e distinguere sempre tali valori dai test di laboratorio ([Web Vitals](https://web.dev/articles/vitals/), [CrUX e PageSpeed Insights](https://developer.chrome.com/docs/crux/guides/pagespeed-insights)).

Ripetere tre misure mobile dopo la correzione di #24 e dopo modifiche rilevanti a font, hero o consenso; poi controllare almeno mensilmente i dati reali in Search Console se accessibili. Il monitoraggio continuativo e la visibilità nei motori restano in [#10](https://github.com/angelofb/versacrum/issues/10). Per riprodurre una misura usare Lighthouse 13.5 o annotarne la nuova versione, un Chromium pulito e il profilo mobile predefinito. I punteggi possono variare con rete e macchina: confrontare soprattutto metriche ed elementi responsabili.

## Verifica locale della correzione #24

Il pannello consenso ora è fissato al bordo inferiore: la sua comparsa e scomparsa non spostano più la hero. Una misura Lighthouse mobile locale, sullo stesso server Astro e prima di anticipare i font, ha dato CLS 0,174 in due run; Lighthouse attribuiva lo spostamento residuo al caricamento dei font. Sono quindi stati aggiunti preload per i cinque file WOFF2 latini usati nella prima schermata, senza cambiare famiglie, pesi o stile. Tre run locali successivi hanno dato tutti **CLS 0**, punteggio 99 e LCP circa 2,12 s. Una prima terza esecuzione è fallita con `NO_FCP` ed è stata ripetuta; non è stata conteggiata come misura valida.

Queste misure su `127.0.0.1` verificano il meccanismo, ma non sono direttamente confrontabili con la baseline precedente sul dominio pubblico. La serie pubblica dopo il deploy è riportata sotto; i dati reali dei visitatori vanno verificati nel tempo, se disponibili.

## Verifica pubblica dopo il deploy

Il commit `8bec853` è stato distribuito con [workflow riuscito](https://github.com/angelofb/versacrum/actions/runs/35904139884). La home pubblica espone i cinque preload. Tre nuove misure Lighthouse 13.5 mobile sul dominio definitivo, con lo stesso Chromium pulito e consenso non espresso, hanno dato:

| Esecuzione (UTC) | Punteggio |    FCP |    LCP | CLS |    TBT | Trasferiti |
| ---------------- | --------: | -----: | -----: | --: | -----: | ---------: |
| 18:50:49         |        96 | 1,23 s | 1,98 s |   0 | 139 ms |     261 kB |
| 18:51:24         |        95 | 1,25 s | 2,00 s |   0 | 162 ms |     261 kB |
| 18:51:58         |        96 | 1,12 s | 1,87 s |   0 | 144 ms |     261 kB |

Mediane: punteggio 96, LCP 1,98 s, CLS **0**. Il peso rimane nell'intervallo della baseline. Il CLS di laboratorio è ora stabilmente sotto 0,1 nei tre run pubblici; l'LCP è ancora sotto 2,5 s, ma più alto della mediana precedente (1,21 s), quindi va osservato prima di dichiarare un miglioramento complessivo della velocità. I dati reali Core Web Vitals restano da verificare separatamente (#10).
