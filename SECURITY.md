# Header di sicurezza: decisione per GitHub Pages

Decisione del gestore (23 settembre 2026): **mantenere GitHub Pages**, senza proxy/CDN davanti al sito e senza migrazione. Il sito è statico, HTTPS è obbligatorio per il dominio personalizzato e non ci sono backend, account o pagamenti; questo limita la superficie d'attacco, ma non sostituisce le protezioni degli header HTTP.

Il controllo `curl -sSI https://versacrumbnb.it/` del 23 settembre 2026 ha restituito `200`, `server: GitHub.com` e `content-type: text/html; charset=utf-8`; non erano presenti gli header sotto elencati. Eseguire `npm run audit:headers` per ricontrollare home e privacy sul sito pubblico. Lo script **segnala**, ma non considera superato il controllo quando un header manca: la sua assenza è una decisione di rischio esplicita, non un test verde di sicurezza.

| Header assente                                                        | Protezione non disponibile con la configurazione attuale                                                  |
| --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `Content-Security-Policy`                                             | Limitazione degli script, stili, immagini e destinazioni di rete tramite risposta HTTP.                   |
| `Strict-Transport-Security`                                           | Upgrade HTTPS automatico del browser nelle visite successive. Il redirect HTTP→HTTPS non equivale a HSTS. |
| `X-Content-Type-Options: nosniff`                                     | Blocco dell'interpretazione di risorse con MIME diverso da quello dichiarato.                             |
| `Referrer-Policy`                                                     | Controllo esplicito della quantità di URL inviata ai siti esterni.                                        |
| `Permissions-Policy`                                                  | Limitazione delle API browser non necessarie.                                                             |
| `Content-Security-Policy: frame-ancestors 'none'` / `X-Frame-Options` | Divieto di incorporare la pagina in frame di terzi.                                                       |

GitHub Pages, nella configurazione usata dal progetto, non espone una regola di deploy per impostare questi header di risposta sul dominio. Non aggiungiamo una CSP permissiva o una pseudo-soluzione in `<meta>`: `frame-ancestors` non funziona in un meta tag; HSTS richiede una risposta HTTPS con l'header. Nessun `includeSubDomains` o preload HSTS è stato attivato, e non va attivato senza verificare tutti i sottodomini. Queste limitazioni restano aperte finché la scelta di hosting non cambia.

Inventario utile per una futura CSP: HTML, CSS, JavaScript, font WOFF2 e fotografie sono serviti dallo stesso dominio; Analytics viene caricato solo dopo consenso da `www.googletagmanager.com` e invia eventi verso Google Analytics. Le pagine includono JSON-LD e dati delle traduzioni in script inline. Una futura policy dovrebbe partire in `Content-Security-Policy-Report-Only`, usare hash/nonces per gli script inline dove possibile, consentire solo gli endpoint Google strettamente necessari dopo consenso e verificare modulo email, galleria, font e tutte le lingue prima dell'enforcement. Non è stata preparata una policy fittizia non verificata, né è stato attivato un endpoint di report.

Le verifiche di consenso, galleria, modulo, font e navigazione sono nella suite Playwright; il controllo degli header pubblici è separato perché un build statico locale non rappresenta gli header restituiti da GitHub Pages. Se in futuro si sceglie un proxy o altro hosting, riaprire questa decisione, progettare e testare gli header reali, poi aggiungere un gate CI che richieda la loro presenza.

Riferimenti: [MDN su `frame-ancestors`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors), [MDN su HSTS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Strict-Transport-Security), [MDN su CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP).
