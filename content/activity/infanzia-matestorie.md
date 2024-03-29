+++
title = "MateStorie"
description = "Quali storie possono raccontarci i numeri e le forme geometriche?"

# Questa è una singola pagina di attività, lasciare così: è il template
# che viene usato per visualizzare la singola pagina
template = "activity/page.html"

[taxonomies]
# Sezioni del sito dove mettere la pagina, da scegliere tra una o più di queste
scuole = ["infanzia"]
volantino = ["primociclo"]

[extra]
thumb = "/images/activities/infanzia-matestorie.jpg"
image = "/images/activities/infanzia-matestorie.jpg"
alt = "Uno scaffale con libri per bambini dedicati alla matematica."

[extra.volantino]
# Usare un peso da 100 a 1000 per le pagine di contenuto (<100 e >1000 sono per le info)
# 100-199 per infanzia
# 200-299 per primaria
# 300-399 per primo grado
# 400-499 per secondo grado
weight = 112
# Qui si possono customizzare il titolo e lo stile della pagina, entrambi opzionali.
# Se il text non viene impostato, verrà usato il valore header.text in config.toml
# Lo style invece è la classe nella .page-header in sass/css/volantino-screen.scss
header = { text = "Scuola dell'infanzia", style = "infanzia" }
# Questo valore, opzionale (default è false) indica se mettere l'icona "anche online"
#online = true

[extra.volantino.meta]
# ico-XXXX indica l'icona da mettere a sinistra, tra quelle in sass/css/volantino-screen.scss
# Devono essere tutte diverse 
ico-durata = ["Durata?", "3 incontri da 1 ora ciascuno"]
ico-rimborso = ["Rimborso?", "150 euro "]
# ico-modalita = ["Modalita", "Valore 3"]
+++

<h2 class="ico ico-infanzia-domanda">Domanda</h2>

Quali storie possono raccontarci i numeri e le forme geometriche? 

<h2 class="ico ico-infanzia-risposta">Risposta</h2>

Dopo aver coinvolto i bambini nella letttura animata di un racconto o di albo illustrato, realizzeremo insieme dei giochi e delle attività creative per dare 
vita ai numeri e alle forme incontrate nella storia.
