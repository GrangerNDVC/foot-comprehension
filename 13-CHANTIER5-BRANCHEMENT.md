# Chantier 5 : branchement dans le jeu (16/10/2026)

Les fichiers du chantier 5 (data/attaque.js, data/regles-attaque.js) ont été retrouvés par Julie et branchés dans le jeu du chantier 4. Copies de sauvegarde dans ce projet : `data-attaque.js`, `data-regles-attaque.js`, `outils-test-verifier-questions.js`.

## Fait
- index.html : `data/regles-attaque.js` puis `data/attaque.js` ajoutés après `data/essai-formats.js`.
- Nouveau `outils-test/verifier-questions.js` (Node) : charge les banques comme index.html, lance `JEU.banque.verifier()` et affiche la répartition. Résultat : **aucun problème** (113 questions au total : 80 d'attaque + 33 anciennes).
- Test dans Chromium : le jeu se charge sans erreur, les questions d'attaque s'affichent (match 4, commentaire + 4 choix + bouton ✖).
- Équilibre mesuré : bonne réponse en positions 12/12/12/14 ; « On ne peut pas savoir » bonne réponse 15 fois, mauvaise réponse 27 fois ; vrai-faux-nsp Oui/Non/NSP = 5/5/5.
- Deux retouches : att-p4-03 (la réponse était recopiable : « Les deux autres sont coupées » devient « Les autres sont coupées ») et att-p5-06 (Nagano « entouré de défenseurs, loin du gardien » : l'exception « seul face au gardien » est sans ambiguïté).

## Reste à décider
Les questions citent des joueurs fixes (Tsubasa, Izawa, Nagano…), alors que le match affiche d'autres porteurs (ex. « 5 Iwami contre Hirado n°8 »). Prénoms français / japonais au choix et noms des joueurs réellement en jeu : demandent une couche de remplacement de noms dans le moteur.
