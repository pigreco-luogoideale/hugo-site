+++
title = "Titolo dell'attività"
description = "Descrizione nell'elenco"

# Questa è una singola pagina di attività, lasciare così
template = "activity/page.html"

[taxonomies]
# Sezioni del sito dove mettere la pagina, da scegliere tra una o più di queste
#scuole = ["secondogrado"]
#tutti = ["animazione", "corsi", "lezioni", "altro"]
#volantino = ["primociclo", "secondociclo"]

[extra]
thumb = "/images/activities/matematica_al_parco.jpg"
image = "/images/activities/matematica_al_parco.jpg"
alt = "Caselle disegnate a gesso sull'asfalto e dei dadi"

[extra.volantino]
# Usare un peso da 100 a 1000 per le pagine di contenuto (<100 e >1000 sono per le info)
# 100-199 per infanzia
# 200-299 per primaria
# 300-399 per primo grado
# 400-499 per secondo grado
weight = 400
online = true
[extra.volantino.header]
secondociclo = { text = "Scuola secondaria II grado" }

[extra.volantino.meta]
# ico-XXXX indica l'icona da mettere a sinistra, tra quelle in sass/css/volantino-screen.scss
# Devono essere tutte diverse 
ico-durata = ["Durata?", "C cicli da L lezioni da I incontri"]
ico-rimborso = ["Rimborso?", "E euro per ogni C cicli"]
# ico-modalita = ["Modalita", "Valore 3"]
+++

<h2 class="ico ico-secondogrado-teorema">Teorema</h2>

Lorem ipsum dolor sit amet, consectetur adipiscing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

<h2 class="ico ico-secondogrado-dimostrazione">Dimostrazione</h2>

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
