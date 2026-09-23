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
