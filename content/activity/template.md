+++
title = "Titolo dell'attività"
description = "Descrizione nell'elenco"

# Questa è una singola pagina di attività, lasciare così: è il template
# che viene usato per visualizzare la singola pagina
template = "activity/page.html"

[taxonomies]
# Sezioni del sito dove mettere la pagina, da scegliere tra una o più di queste
#scuole = ["infanzia"]
#tutti = ["animazione", "corsi", "lezioni", "altro"]
#volantino = ["primociclo"]

[extra]
# Se questa voce è impostata, a fondo pagina NON apparirà il link per scaricare i volantini
# (questo perché il default è false: se manca la voce, il link appare)
# no_scarica_volantino = true
thumb = "/images/activities/matematica_al_parco.jpg"
image = "/images/activities/matematica_al_parco.jpg"
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
[extra.volantino.header]
# Siccome questa pagina può apparire su più volantini, le impostazioni sono da definire
# per ogni volantino in cui può apparire.
# primociclo = { text = "Scuola dell'infanzia", style = "infanzia" }
# secondociclo = { text = "Scuole superiori", style = "secondogrado" }

# Questo valore, opzionale (default è false) indica se mettere l'icona "anche online"
online = true

[extra.volantino.meta]
# ico-XXXX indica l'icona da mettere a sinistra, tra quelle in sass/css/volantino-screen.scss
# Devono essere tutte diverse 
ico-durata = ["Durata?", "C cicli da L lezioni da I incontri"]
ico-rimborso = ["Rimborso?", "E euro per ogni C cicli"]
# ico-modalita = ["Modalita", "Valore 3"]
+++

<h2 class="ico ico-infanzia-domanda">Domanda</h2>

Cosa sta succedendo?.

<h2 class="ico ico-infanzia-risposta">Risposta</h2>

Lorem ipsum dolor sit amet, consectetur adipiscing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna
aliqua. Ut enim ad minim veniam, quis nostrud exercitation
ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit
esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
occaecat cupidatat non proident, sunt in culpa qui officia
deserunt mollit anim id est laborum.

 - # Foo
   Lorem ipsum dolor sit amet, consectetur adipiscing elit,
   sed do eiusmod tempor incididunt ut labore et dolore magna
   aliqua.
 - # Bar
   Lorem ipsum dolor sit amet, consectetur adipiscing elit,
   sed do eiusmod tempor incididunt ut labore et dolore magna
   aliqua.
 - # Baz
   Lorem ipsum dolor sit amet, consectetur adipiscing elit,
   sed do eiusmod tempor incididunt ut labore et dolore magna
   aliqua.
