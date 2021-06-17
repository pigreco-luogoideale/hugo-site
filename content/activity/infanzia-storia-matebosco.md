+++
title = "La storia del MateBosco"
description = "Cosa scopriranno i bambini esplorando il MateBosco?"

# Questa è una singola pagina di attività, lasciare così: è il template
# che viene usato per visualizzare la singola pagina
template = "activity/page.html"

[taxonomies]
# Sezioni del sito dove mettere la pagina, da scegliere tra una o più di queste
scuole = ["infanzia"]
tutti = ["animazione"]
volantino = ["primociclo"]

[extra]
thumb = "/images/activities/infanzia-matebosco.jpg"
image = "/images/activities/infanzia-matebosco.jpg"
alt = "Le ombre dei personaggi del matebosco formati da cerchi, quadrati, triangoli e rettangoli."

[extra.volantino]
# Usare un peso da 100 a 1000 per le pagine di contenuto (<100 e >1000 sono per le info)
# 100-199 per infanzia
# 200-299 per primaria
# 300-399 per primo grado
# 400-499 per secondo grado
weight = 150
# Qui si possono customizzare il titolo e lo stile della pagina, entrambi opzionali.
# Se il text non viene impostato, verrà usato il valore header.text in config.toml
# Lo style invece è la classe nella .page-header in sass/css/volantino-screen.scss
header = { text = "Scuola dell'infanzia", style = "infanzia" }
# Questo valore, opzionale (default è false) indica se mettere l'icona "anche online"
#online = true

[extra.volantino.meta]
# ico-XXXX indica l'icona da mettere a sinistra, tra quelle in sass/css/volantino-screen.scss
# Devono essere tutte diverse 
ico-durata = ["Durata?", "1 incontro di 2 ore"]
ico-rimborso = ["Rimborso?", "120 euro a incontro"]
# ico-modalita = ["Modalita", "Valore 3"]
+++

<h2 class="ico ico-infanzia-domanda">Domanda</h2>

Cosa scopriranno i bambini esplorando il MateBosco? 

<h2 class="ico ico-infanzia-risposta">Risposta</h2>

Durante il laboratorio, attraverso la proiezione di ombre e immagini, i bambini avranno l’occasione di ascoltare la storia del MateBosco, un posto speciale dove la matematica si nasconde ovunque.  

Al termine della storia verranno proposte delle attività sulla classificazione delle figure geometriche e ogni bambino avrà l’occasione di utilizzare le forme per costruire il suo personaggio del MateBosco. 
