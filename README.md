# Il sito di PiGreco

Quasi tutto nel sito è pubblico e viene messo su Github.

Si fa push sul repo, dove si può modificare il contenuto.

Per pubblicarlo, per ora è necessario fare pull, eseguire hugo e copiarlo sul
server FTP.

## Caricamento e backup locale

Per caricarlo sul server, si può usare [rclone](https://rclone.org/), che è uno
strumento molto comodo per copiare i file da e verso il server ftp.

Dopo aver installato `rclone`, va configurato usando `rclone config` con i
parametri di connessione al server. Una volta fatto, è possibile fare una copia
di sicurezza di ciò che è on-line attualmente (backup):

    rclone copy -v luogoideale:/htdocs ./backup-directory

Quando si desidera caricare il sito attuale, bisogna andare nella root del
repository [hugo](https://github.com/pigreco-luogoideale/hugo-site), lanciare
il comando `hugo` per compilare il sito, e caricare la directory `public` che
viene generata usando:

    rclone copy -v hugo-site/public/ luogoideale:/htdocs/

I file che non sono stati modificati dovrebbero rimanere come sono attualmente.


## TODO

 - [ ] Avere un sistema di deploy automatico, tipo [questo](https://gomakethings.com/automating-the-deployment-of-your-static-site-with-hugo-and-github/).
 - [ ] Paginazione delle news
 - [ ] Display migliore dell'archivio newsletter
 - [ ] Mappa del sito
