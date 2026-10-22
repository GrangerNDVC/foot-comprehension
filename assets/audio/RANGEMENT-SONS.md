# Où ranger les sons

Format : **.mp3 ou .wav** pour les bruitages (au choix, même nom ; si les deux existent, le .mp3 passe en premier), **.mp3** (ou .wav, mais lourd) pour les musiques. Le vieil iPad Mini 2 ne lit ni .ogg ni .webm. Un .wav est plus lourd : garde-le court. Le nom du fichier doit être EXACTEMENT celui du tableau (minuscules, tirets, pas d'espace, pas d'accent).
Un fichier absent n'est pas grave : le jeu fabrique alors un bruitage simple (bruitages) ou reste silencieux (musiques).

## assets/audio/sfx/  (17 bruitages, courts ; .mp3 ou .wav)
clic · sifflet-debut · sifflet-mitemps · sifflet-fin · coup-de-pied · tir · tacle · arret-gardien · but-nous · but-adverse · bonne-reponse · mauvaise-reponse · indice · carton · blessure · prolongation · victoire-tournoi  (+ .mp3 ou .wav)

## assets/audio/musique/  (8 musiques)
menu.mp3 · histoire.mp3 · match.mp3 · match-tension.mp3 · mi-temps.mp3 · victoire.mp3 · defaite.mp3 · fin-championnat.mp3

## Vérifier
Ouvrir `outils-test/sons.html` (sur le PC, puis sur l'iPad) : chaque son est testable, avec « ✔ fichier » ou « ⚠ synthèse ».
Volumes : data/sons-reglages.js (aucun autre fichier à modifier).
Pour chaque fichier ajouté, noter sa source et sa licence dans CREDITS-SONS.md.
