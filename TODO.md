# TODO — Ver Sacrum B&B

## 🏆 Priorità Alta

- [ ] **Stripe** — Integrare pagamenti online (prenotazione con deposito/cauzione)
    - [ ] Definire flusso: richiesta → verifica disponibilità → link Stripe per caparra → conferma
    - [ ] Scegliere tra Stripe Payment Links (leggero) o Stripe Checkout (completo)
- [ ] **Prezzi / Tariffe visibili** — Aggiungere sezione con fasce di prezzo (bassa/alta/eventi), cosa è incluso, politiche cancellazione
- [ ] **Recensioni integrate** — Widget Google Reviews / TripAdvisor / Booking.com score (es. rating embed o screenshot)
- [ ] **Form contatti** — Sostituire `YOUR_FORM_ID` con l'ID reale di Formspree
- [ ] **Nomi descrittivi per le foto** — Rinominare `IMG_XXXX.jpg` in nomi parlanti (es. `camera-matrimoniale.jpg`, `soggiorno-divano.jpg`, ...) e aggiornare l'HTML
- [ ] **Dominio canonico** — Sostituire `https://tuodominio.com/` con il dominio reale

## 🖼️ Immagini e Media

- [ ] **Video** — Integrare `IMG_8622.mp4` nel sito (hero o sezione "Tour virtuale")
- [ ] **Galleria categorizzata** — Dividere le foto per ambienti:
    - Camera matrimoniale
    - Soggiorno / angolo cucina
    - Bagno
    - Dettagli e atmosfera
    - Ascoli e dintorni
- [ ] **WebP** — Modificare l'HTML per servire immagini in WebP con fallback JPEG (o direttamente WebP)
- [ ] **Dimensioni immagini** — Aggiungere `width` e `height` espliciti a tutti i tag `<img>` (migliora Core Web Vitals / CLS)
- [ ] **Alt text** — Migliorare i testi alternativi delle immagini (descrivere il contenuto reale, non generico)
- [ ] **OG Image** — Creare un'immagine Open Graph (1200×630px) per i social
- [ ] **Favicon / apple-touch-icon** — Sostituire la favicon emoji con una icona personalizzata

## 📧 Contatti e Prenotazioni

- [ ] **Info email** — Verificare che `info@versacrum.it` esista e sia configurata
- [ ] **Booking CTA sticky su mobile** — Pulsante "Prenota" o "Richiedi disponibilità" sticky in basso su mobile
- [ ] **Link Airbnb / Booking** — Sostituire gli `href="#"` con i link reali delle inserzioni
- [ ] **Social** — Aggiungere link reali a Instagram, Facebook (sostituire i placeholder)

## 🔧 Tecnico

- [ ] **CIR** — Inserire il Codice Identificativo Regionale nel footer
- [ ] **Telefono** — Verificare il numero `+39 333 123 4567` e sostituire con quello reale
- [ ] **Mappa OpenStreetMap** — Centrare sulla posizione esatta del B&B (non solo Piazza del Popolo)
- [ ] **GitHub Pages** — Verificare che la GitHub Action deploy funzioni (branch `main`, cartella `dist/`)
- [ ] **CNAME** — Aggiungere file `CNAME` con il dominio personalizzato se necessario

## ⚡ Performance & SEO

- [ ] **HTTP/2** — Assicurarsi che il server supporti HTTP/2 (se hosting diverso da Pages)
- [ ] **Cache headers** — Configurare cache policy per immagini e asset statici
- [ ] **Sitemap** — Generare `sitemap.xml`
- [ ] **Google Analytics / Matomo** — Aggiungere tracking (se desiderato)
- [ ] **Structured data** — Verificare e arricchire il JSON-LD (recensioni, prezzi, disponibilità)

## ♿ Accessibilità

- [ ] **Contrasto colori** — Verificare che il testo su sfondi chiari/scuri abbia contrasto sufficiente
- [ ] **Stati focus** — Assicurarsi che tutti gli elementi interattivi abbiano un focus ring visibile (il `:focus-visible` è presente? controllare)
- [ ] **Form errori** — Aggiungere validazione lato client con messaggi di errore chiari

## ✨ Varie ed Eventuali (super figo)

- [ ] **Video hero** — Usare `IMG_8622.mp4` come background video nell'hero (autoplay, muted, loop) al posto della foto statica
- [ ] **Lightbox gallery** — Cliccare sulle foto per vederle a schermo intero con swipe su mobile (puro CSS/JS, zero librerie)
- [ ] **Rating badge** — Aggiungere "⭐ 5/0 — Consigliato dai viaggiatori" nell'hero o esperienza (sfrutta il JSON-LD già presente)
- [ ] **CTA sticky mobile** — Barra fissa in basso su mobile con "Prenota ora" + "Chiama"
- [ ] **Micro-animazioni** — Stagger effect sulle card, numeri che contano all'arrivo, parallax più fluido
- [ ] **Mappa con marker personalizzato** — Pin carino al posto del marker default OpenStreetMap

## 🧹 Pulizia

- [ ] **Lighthouse report** — Aggiungere `lh-report*.json` al `.gitignore`
- [ ] **package.json** — Verificare che `name` e `description` siano aggiornati
- [ ] **README.md** — Aggiornare con le istruzioni aggiornate (dominio, form, ecc.)
