# Il sito di PiGreco

Questi sono i codici sorgenti per il sito di
[PiGreco - il Luogo Ideale](https://pigreco.luogoideale.org).

Quando questo codice viene cambiato, esso viene compilato in automatico e
caricato sul server per essere reso pubblico. Il risultato della compilazione è
il codice HTML, CSS e tutti i contenuti che compongono il sito vero e proprio.

Se ci fossero degli errori o dei problemi, la compilazione non avrà successo e
il sito attualmente online non verrà toccato. Gli errori di compilazione sono
disponibili in un'area privata su GitHub.

## Zola

La generazione del sito viene fatta in automatico usando
[Zola](https://www.getzola.org), che prende i "contenuti del sito"
(e.g. i testi, titoli, etc) e li impagina usando dei "template".

Tendenzialmente, i contenuti vanno nella directory "contents", mentre in
"templates" vengono messe delle pagine HTML parziali che rappresentano i
"modelli di pagina". Zola non fa altro che prendere i contenuti, formattarli
(trasformando il Markdown in HTML) e riempiendo i modelli mettendoci
i contenuti (in HTML).

Le cose importanti da sapere sono:

 - ogni pagina di contenuto inizia con un _header_ delimitato da `+++`;
 - all'inizio dell'header (nella sezione principale), ci si può trovare una voce
   `template`, che indica quale HTML usare (tra quelli in `templates/`) per il 
   render di quel contenuto;
 - `title`, `description`, `data` e `weight` vanno nella sezione principale,
   all'inizio dell'header, _prima_ di `[extra]`;
 - nella sotto-sezione `[extra]` dell'header, ci possono andare altre
   informazioni che verranno usate dal `template`;
 - nella cartella `contents` ci vanno solo file `.md` ed eventuali assets;
 - nella cartella `templates` ci vanno solo pagine HTML che vengono usate dalle
   pagine o dalle sezioni in `contents`;
 - nella cartella `static` ci vanno gli altri file (css, immagini, etc) che
   verranno copiati sul sito (in `/`) senza essere toccati in altro modo;
 - i file `_index.md` indicano che la cartella che li contiene è una _sezione_,
   ovvero che conterrà altre pagine;
 - i file `index.md` indicano che nella cartella che li contiene vi è una pagina
   e, assieme a quel file, possono essere messi degli assets (immagini, font,
   pdf o altro) nella stessa cartella a cui quella pagina farà riferimento,
   anziché essere messi in `static`;
 - nei contenuti delle pagine, anche se sono markdown (`.md`) ci può andare
   anche il codice HTML, bisogna però prestare attenzione a:
   1. non lasciare spazi all'inizio della riga;
   2. lasciare una linea vuota tra il codice HTML e il codice Markdown.

## Volantino

Il volantino è anch'esso generato automaticamente, ma in modo particolare: una
parte specifica del sito viene compilata e si producono delle pagine HTML che
poi vengono automaticamente trasformate in PDF.

Il codice per fare ciò è nel file `flier.sh`.
