+++
title = "Matematica d'asporto"
description = "Uno stand colorato e interattivo rivolto a grandi e piccini, per mettersi alla prova e portare a casa un po' di matematica."

# Questa è una singola pagina di attività, lasciare così: è il template
# che viene usato per visualizzare la singola pagina
template = "activity/page-noscuole.html"

[taxonomies]
# Sezioni del sito dove mettere la pagina, da scegliere tra una o più di queste
#scuole = ["infanzia"]
tutti = ["animazione"]
#volantino = ["primociclo"]

[extra]
thumb = "/images/activities/matematica-asporto.jpg"
image = "/images/activities/matematica-asporto.jpg"
alt = "Caselle disegnate a gesso sull'asfalto e dei dadi"

[extra.volantino]
# Usare un peso da 100 a 1000 per le pagine di contenuto (<100 e >1000 sono per le info)
# 100-199 per infanzia
# 200-299 per primaria
# 300-399 per primo grado
# 400-499 per secondo grado
weight = 100
# Qui si possono customizzare il titolo e lo stile della pagina, entrambi opzionali.
# Se il text non viene impostato, verrà usato il valore header.text in config.toml
# Lo style invece è la classe nella .page-header in sass/css/volantino-screen.scss
header = { text = "Scuola dell'infanzia", style = "infanzia" }
# Questo valore, opzionale (default è false) indica se mettere l'icona "anche online"
online = true

[extra.volantino.meta]
# ico-XXXX indica l'icona da mettere a sinistra, tra quelle in sass/css/volantino-screen.scss
# Devono essere tutte diverse 
ico-durata = ["Durata?", "C cicli da L lezioni da I incontri"]
ico-rimborso = ["Rimborso?", "E euro per ogni C cicli"]
# ico-modalita = ["Modalita", "Valore 3"]
+++

<h2 class="ico ico-primogrado-problema">Problema</h2>

Uno stand colorato e interattivo rivolto a grandi e piccini, per mettersi alla prova e portare a casa un po' di matematica.

<h2 class="ico ico-primogrado-soluzione">Soluzione</h2>

Giochi, puzzle, sfide e molto altro per divertirsi con la matematica e imparare giocando. Con materiali semplici e di recupero sarà possibile realizzare oggetti matematici da portare con sé oppure arricchire la propria cultura matematica. Un gioco o una nuova scoperta: non si tornerà a casa a mani vuote! 


Seguici su [Facebook](https://www.facebook.com/pigreco.luogoideale/) e [Instagram](https://www.instagram.com/pigrecoluogoideale/) per non perdere l’annuncio del prossimo evento!  

Stai organizzando un evento a cui vorresti aggiungere un po' di matematica? Scrivici a  {{ email(text="pigreco@luogoideale.org") }}.
