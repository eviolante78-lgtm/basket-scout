
# Basket Scout v2.2.0 - Finale

## Novità v2.2.0
- **Gestione Avversari identica a Giocatori**: bottone arancione + accanto a select avversario, card gestione con categoria, lista filtrata per categoria, MODIFICA inline, X elimina, SALVA/Chiudi
- **Dropdown Avversari nero**: background #222, testo bianco, freccia V nativa
- **Blocco partita per partita**: lucchetto 🔓/🔒 accanto a X nella lista partite a sinistra
  - 🔓 = sbloccata (editabile)
  - 🔒 = bloccata (solo lettura) arancione #ff6a00, riga opaca 70%
  - Quando bloccata: banner "PARTITA BLOCCATA - SOLO LETTURA" in alto, tutti i dati bloccati (punti, falli, ingresso/uscita, + - MODIFICA, Aggiungi) tranne navigazione periodi 1,2,3,4,1S,2S,3S,4S,5S
  - Sblocco: clicca lucchetto nella lista

## Installazione / Aggiornamento GitHub (senza perdere dati)
1. Vai su https://github.com/eviolante78-lgtm/basket-scout
2. Sostituisci i file nella root con quelli di questo pacchetto: index.html, manifest.json, sw.js, icon-192.png, icon-512.png
3. Commit: "v2.2.0 - Avversari + Lock per partita"
4. Attendi 1-2 min che GitHub Pages aggiorni
5. Sul tablet: apri https://eviolante78-lgtm.github.io/basket-scout/ -> se vedi vecchia versione, fai refresh hard: tieni premuto icona refresh -> "Svuota cache e ricarica" o da Chrome > Impostazioni > Cancella dati sito (solo cache, NON dati sito)
6. Dati salvati: restano in localStorage chiavi:
   - basket_scout_data_v1 (partite, giocatori, stats)
   - basket_scout_opps_v2 (avversari)
   - basket_scout_locks_v1 (blocchi partite)
   Stessa origine https://eviolante78-lgtm.github.io/basket-scout/ -> stessi dati

## PWA Installabile
- manifest.json con start_url ./ e scope ./
- sw.js minimal skipWaiting + claim
- index.html ha <link rel="manifest" href="./manifest.json">
- Chrome: "Installa app" non solo "Crea collegamento"

## Testato
- TEST 46 finale: lucchetti 🔓/🔒 visibili, toggle immediato, banner SOLO LETTURA, blocco dati ma navigazione periodi libera, avversari gestione identica giocatori, dropdown nero

## Struttura dati
- Partite: id, avversario, data, casa/trasferta, categoria, risultato, convocati, playerStats, intervals (quarto, ingresso 10:00, uscita 00:00), periodStats, periodScores
- Avversari: id, nome, categoria
- Locks: {gameId: true/false}
