# Logo Ver Sacrum — ricostruzione vettoriale

Ricostruzione del 5 ottobre 2026, finalizzata il 6 ottobre 2026, dal riferimento di 180 × 180 pixel e dalla copia presente in `src/images/logo.png`.

## File

- `ver-sacrum.svg`: originale vettoriale con fondo trasparente e tutto il testo convertito in tracciati. Non richiede font installati e non contiene immagini raster.
- `ver-sacrum-editabile.svg`: stessa composizione, con scritte modificabili e font WOFF incorporati per la visualizzazione nel browser.
- `ver-sacrum-anteprima.png`: anteprima di 1800 × 1800 pixel su fondo avorio.
- `ver-sacrum-trasparente.png`: logo completo di 2000 × 1500 pixel con fondo trasparente.
- `ver-sacrum-emblema.svg`: solo albero, radici e doppio cerchio, senza scritte, in formato quadrato e con fondo trasparente.
- `ver-sacrum-emblema-anteprima.png`: anteprima del solo emblema di 1800 × 1800 pixel su fondo avorio.
- `ver-sacrum-emblema-trasparente.png`: solo emblema di 2000 × 2000 pixel con fondo trasparente.
- `fonts/`: font TTF per gli editor grafici, con la licenza SIL Open Font License in `OFL.txt`.

## Tipografia e colori

Il carattere è **Cormorant Garamond**, già utilizzato dal sito: Semibold (600) per il marchio e Medium (500) per il sottotitolo. È una scelta coerente con il riferimento; la risoluzione non permette di identificare con certezza il font originale.

Le iniziali V e S sono più grandi delle altre lettere, come nel riferimento. Il nome e il sottotitolo sono rispettivamente “Ver Sacrum” e “Dimora nel cuore di Ascoli”.

| Colore                | Valore    |
| --------------------- | --------- |
| Verde oliva           | `#3E4728` |
| Oro                   | `#AA9152` |
| Avorio dell'anteprima | `#F7F3E8` |

Albero, foglie, radici, doppio cerchio e divisore sono ridisegnati con forme vettoriali pulite. I dettagli ambigui del riferimento sono stati interpretati, mantenendo la composizione e le proporzioni generali.

Per ridimensionare il logo completo, conservare il rapporto 4:3 del file SVG. La sua anteprima quadrata aggiunge soltanto margine e fondo avorio. L'emblema senza testo ha invece rapporto 1:1 e un margine uniforme attorno al cerchio. Per usi molto piccoli, valutare il solo emblema: il sottotitolo completo richiede spazio per rimanere leggibile.

I font provengono dal pacchetto locale `@fontsource/cormorant-garamond`; i TTF sono ottenuti dalle tabelle dei WOFF senza cambiare i disegni dei glifi. In alcuni editor, per modificare il testo della versione editabile occorre rendere disponibili i font allegati.
