# Il sito di PiGreco

Questi sono i codici sorgenti per il sito di
[PiGreco - il Luogo Ideale](https://www.luogoideale.org).

Quando questo codice viene cambiato, esso viene compilato in automatico e
caricato sul server per essere reso pubblico. Il risultato della compilazione è
il codice HTML, CSS e tutti i contenuti che compongono il sito vero e proprio.

Se ci fossero degli errori o dei problemi, la compilazione non avrà successo e
il sito attualmente online non verrà toccato. Gli errori di compilazione sono
disponibili nella sezione apposita di GitHub.

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
 - `weight` è usato, in alcuni casi, per determinare l'ordine delle pagine;
 - nella sotto-sezione `[extra]` dell'header, ci possono andare altre
   informazioni che verranno usate dal `template`;
 - nella cartella `contents` ci vanno solo file `.md` ed eventuali assets;
 - nella cartella `templates` ci vanno solo pagine HTML che vengono usate dalle
   pagine o dalle sezioni in `contents`;
 - nella cartella `static` ci vanno gli altri file (css, immagini, etc) che
   verranno copiati sul sito (in `/`) senza essere toccati in altro modo;
 - gli stili del sito non è in `static/css`, ma in `sass/css` e sono scritti in
   un linguaggio "css arricchito" (che ad esempio supporta le variabili), che
   poi viene trasformato in css;
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
 - tutte le attività vengono messe in `contents/activities`, poi ognuna di esse
   può essere messa in una sottocategoria (e.g. scuola infanzia) usando le
   `taxonomies`: una tassonomia è un gruppo di termini, un termine è un tag che
   viene applicato alle pagine, una pagina viene messa in tutte le sezioni
   relative alle tassonomie+termini che appaiono nell'header;
 - le informazioni relative alle singole tassonomie non possono essere inserite
   nelle pagine del sito, quindi non vanno in `contents`, ma sono invece messe
   all'interno del file `config.toml`: lì vanno messe, ad esempio, le tassonomie
   valide (scuola, tutti e volantino) e i dati relativi alle tassonomie ed i
   termini, ad esempio la descrizione delle varie sezioni.

## Volantino

Il volantino è anch'esso generato automaticamente e usa anch'esso le taxonomies,
ma è un po' particolare perché c'è una sezione del sito, `contents/volantino`,
in cui ci sono le pagine "extra". Un volantino viene dall'unione delle pagine
"extra" e dalle pagine con la tassonomia volantino.
L'ordine delle pagine viene determinato dal `weight` specificato nell'header.
Il volantino viene prodotto in HTML e poi viene trasformato automaticamente in
PDF e copiato nella directory `static/volantini`.

Attenzione che la trasformazione da HTML a PDF non è banale e le cose potrebbero
apparire diverse tra le due versioni.

Per modificare il volantino è necessario seguire i seguenti passi:

1. Installare `zola` e `weasyprint` (weasyprint.org)
2. Eseguire `zola serve`, che dovrebbe rendere il sito disponibile all'indirizzo
   http://127.0.0.1:1111
3. Trasformare la pagina del volantino in un PDF con
   `weasyprint http://127.0.0.1:1111/volantino volantino-dev.pdf`
4. Aprire `volantino-dev.pdf` con un programma che lo ricarichi automaticamente
   in caso di modifiche, così da rendere più veloce vedere cosa è cambiato,
   (ad esempio con [SumatraPDF](https://www.sumatrapdfreader.org) o evince).
5. Se possibile, eseguire il passo 3 in automatico (e.g. con watchexec)

## Sviluppo

### Su Windows

1. Usa l'app di github per scaricare il repository
2. Scaricare zola e metterlo nella stessa directory del sito
3. Lanciare zola serve dal terminale (comando ..\zola serve )
4. Aprire su un browser all'indirizzo http://127.0.0.1:1111 l'anteprima del sito
5. Fare le modifiche, aggiungendo o modificando file nelle cartelle del pc. L'anteprima si aggiorna automaticamente.
6. Quando è tutto OK fare push dall'app github per caricare le modifiche online

### Su Linux

Con nix si può usare ad esempio il seguente comando per avviare un server in locale:

    $ nix run . -- serve
    $ nix-shell -p zola --run "zola serve"

Oppure, per generare la versione definitiva da caricare:

    $ nix run . -- build
    $ nix-shell -p zola --run "zola build"

Per il volantino, un bug in zola 0.13 impedisce di compilare correttamente i CSS
a causa del mime type errato mandato da zola serve. Si può usare zola 0.15 o 0.12.2.

    $ URL=https://github.com/NixOS/nixpkgs/archive/559cf76fa3642106d9f23c9e845baf4d354be682.tar.gz
    $ nix-shell -p zola -I nixpkgs=$URL --run "zola serve"

Per generare i volantini:

    $ nix-shell -p python39Packages.weasyprint
    % weasyprint http://localhost:1111/volantino/primociclo/ static/volantini/volantino_primociclo.pdf
    % weasyprint http://localhost:1111/volantino/secondociclo/ static/volantini/volantino_secondociclo.pdf

Per lo sviluppo dei volantini invece, in un'altra shell, si può avviare watchexec
che ricompila il PDF in automatico usando weasyprint, aspettando 1 secondo prima
di farlo per permettere a zola serve di fare il rebuild:

    $ CMD="watchexec -d 1000 -e scss,md,html -- weasyprint http://localhost:1111/volantino/primociclo/ volantino-dev.pdf"
    $ nix-shell -p python39Packages.weasyprint watchexec --run "$CMD"
