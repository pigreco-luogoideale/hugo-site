+++
title = "Dati a catinelle"
description = "Saper leggere e interpretare dati è una competenza sempre più importante. "

# Questa è una singola pagina di attività, lasciare così
template = "activity/page.html"

[taxonomies]
# Sezioni del sito dove mettere la pagina, da scegliere tra una o più di queste
scuole = ["secondogrado"]
#tutti = ["animazione", "corsi", "lezioni", "altro"]
volantino = ["secondociclo"]

[extra]
thumb = "/images/activities/secondogrado-dati-a-catinelle.jpg"
image = "/images/activities/secondogrado-dati-a-catinelle.jpg"
alt = "Una cartina del mondo con evidenziate alcune città e i collegamenti tra esse."

[extra.volantino]
# Usare un peso da 100 a 1000 per le pagine di contenuto (<100 e >1000 sono per le info)
# 100-199 per infanzia
# 200-299 per primaria
# 300-399 per primo grado
# 400-499 per secondo grado
weight = 450
header = { text = "Scuola secondaria II grado", style = "secondogrado" }
online = true

[extra.volantino.meta]
# ico-XXXX indica l'icona da mettere a sinistra, tra quelle in sass/css/volantino-screen.scss
# Devono essere tutte diverse 
ico-durata = ["Durata?", "1 incontro di 2 ore"]
ico-rimborso = ["Rimborso?", "120 euro a incontro"]
# ico-modalita = ["Modalita", "Valore 3"]
+++

<h2 class="ico ico-secondogrado-teorema">Teorema</h2>

Saper leggere e interpretare dati è una competenza sempre più importante. 

<h2 class="ico ico-secondogrado-dimostrazione">Dimostrazione</h2>

Ogni giorno, in ogni istante, in qualsiasi luogo siamo circondati da dispositivi
che raccolgono dati di tipo diverso: geolocalizzazioni, velocità, tempi di percorrenza,
numero di guasti, accessi, pagamenti elettronici. Ma che fine fanno tutte
queste informazioni? Spesso sono le aziende a raccoglierle per poter conoscere
meglio i consumatori, migliorare i loro servizi e perfezionare i loro prodotti.
Per poter utilizzare queste informazioni, però, non è solo sufficiente raccogliere
i dati, ma bisogna riuscire anche a visualizzarli in modo efficace e funzionale
per poterli interpretare correttamente e trovare risposte alle domande che ci
stiamo ponendo. Qual è la visualizzazione migliore? Dipende dal tipo di dati
e dagli obiettivi. 

In questo laboratorio, dopo aver presentato la problematica
della data visualization, gli studenti dovranno ricoprire il ruolo di giovani programmatori
alle prese con un cliente di cui soddisfare le esigenze. Lavorando a
gruppi, dovranno immergersi in una pioggia di dati, capirne la natura, orientarsi
tra diagrammi a barre, tabelle, cartine, grafici cartesiani, ideogrammi. . . alla
ricerca della rappresentazione migliore e di risposte!