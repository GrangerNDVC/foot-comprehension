# Match de compréhension

Serious game de foot : lire finement un commentaire, une consigne, un petit texte, puis jouer l'action.
Un championnat de 6 matchs (Nankatsu). Le jeu tourne dans le navigateur ; un numéro à 4 chiffres (facultatif, chantier 13) permet de reprendre sa partie sur un autre appareil.

## Lancer
- Ouvrir `index.html` (double-clic) ou, dans VS Code, « Live Server ». Sur Netlify : publier le dossier tel quel.
- Pour tout débloquer pendant tes essais : ajouter `?tout` à l'adresse (ex. `index.html?tout`).

## Comment se joue un match (chantiers 3 et 4)
- Mini-carte du terrain, joueurs numérotés (Nankatsu en bleu, l'adversaire en blanc), ballon chez un joueur.
- À chaque action : un choix (passer / dribbler / tirer ; couper / tacler / bloquer / dégager), puis une question.
- Bonne réponse : l'action réussit. Première erreur : indice (mot surligné) et deuxième chance. Deuxième erreur : ballon perdu.
- **Match 1 = match d'essai** : pas de choix, une question par action ; le jeu règle le niveau de départ pour la suite.
  Match 2 : passer ou tirer ; match 3 : le dribble arrive ; match 4 : toutes les commandes.
- **Guts** (⚡) : les actions fortes en coûtent, les bonnes réponses en redonnent ; 25 guts = éliminer une mauvaise réponse.
- Le niveau des questions s'ajuste pendant le match (2 erreurs d'affilée : plus facile ; 3 réussites d'affilée : plus dur).
- Correction en 3 lignes maximum : ✔ bonne réponse · 🔑 le mot qui décide · ✖ le piège. Chaque erreur va dans le **carnet de règles** ;
  une règle ratée revient plus tard dans une autre question.
- Mi-temps, prolongation (le premier but gagne), fin de match, rejouer.
- Gros plans (chantier 4) : une scène animée avec les vrais sprites, les couleurs et les joueurs de chaque équipe ; le tir change avec le niveau de la question (sol, volée, tête, ciseau). Si une image manque : formes simples.

## Organisation
```
index.html
css/jeu.css
js/banque.js       rassemble les questions et choisit la suivante ; contrôle des questions
js/regles.js       la logique du match (ballon, score, guts, niveaux, temps) - sans écran
js/match.js        les écrans : menu, avant-match, match, mi-temps, fin
js/terrain.js      la mini-carte
js/grosplan.js     les gros plans (sprites, décor, repli en formes simples)
js/sprites-recolor.js  recoloration des sprites par équipe
js/assets.js       chargement des images de décor
js/progression.js  résultats, niveau de départ, carnet de règles (localStorage ; une clé par élève avec un compte)
js/compte.js       numéro de l'élève, copie dans Firebase, fusion, « Changer d'élève », espace enseignant caché (chantier 13)
js/audio.js        lecture à voix haute
data/config.js     TOUS LES RÉGLAGES (guts, niveaux, durée et règles de chaque match)
data/championnat.js  les 6 matchs, l'histoire, les joueurs de Nankatsu
data/regles.js     les règles du carnet (une phrase chacune)
data/attaque.js    80 questions d'attaque (passe, dribble), niveaux 1 à 5 (chantier 5) ; ses règles : data/regles-attaque.js
data/defense.js    40 questions de défense (consignes de l'entraîneur), niveaux 1 à 5 (chantier 6) ; ses règles : data/regles-defense.js
data/tirs.js       40 petits textes de tir (type tir), niveaux 1 à 5 (chantier 7) ; ses règles : data/regles-tirs.js
data/palier1..4.js les 30 questions de départ (provisoires)
data/essai-formats.js  3 questions pour tester les formats « barrer » et « vrai-faux-nsp »
data/paliers.js    les conseils de l'Aide VAR et le Vestiaire
assets/atlas/      les 12 coupes de joueurs + les gardiens (PNG incorporé dans le .js)
assets/decors, assets/ballon, manifest.js   images du décor (tribune, effet de vitesse)
data/equipes/      couleurs et joueurs des 7 équipes (modifiable : une ligne par joueur)
data/grosplan-reglages.js  TOUTES les scènes : positions, durées, poses, style de tir par niveau
js/histoire.js     les écrans d'histoire : scènes composées avec les décors et les sprites (chantier 8)
data/histoire-reglages.js  les 7 scènes d'histoire (+ version « après victoire ») : ambiance, décor, joueurs, poses
outils-test/histoire.html  page de test : affiche toutes les scènes d'histoire
outils-test/galerie.html   page de test : affiche toutes les scènes (ex. galerie.html?types=tir&niveaux=3,5)
```

## Ajouter ou modifier des questions
Format complet décrit en tête de `data/palier1.js`. Pour une nouvelle banque : un fichier `data/xxx.js` qui commence par
`JEU.ajouterQuestions([ {...}, {...} ]);`, puis une ligne `<script>` dans `index.html`.
Champs : `id, niveau (1-5), type (passe|dribble|tir|defense), format (choix|barrer|vrai-faux-nsp), consigne, situation?, question,
indices?, options[], bonne, mot, regle, explication: {bonne, cle, piege}`.
Champs réservés (acceptés mais pas encore utilisés par le moteur) : `scene` (description de la situation affichée, pour illustrer au chantier 4)
et `repere` (temps, lieu, cause, intention, personnage, reprise, condition, consigne : pour équilibrer les banques).
Pour contrôler une banque (doublons, `bonne` valide, règle connue, explication courte) : `node outils-test/verifier-questions.js` (Node) ou `JEU.banque.verifier()` dans la console du navigateur.

## Régler la difficulté et le rythme
Tout est dans `data/config.js` : durée des mi-temps, commandes de chaque match, coût en guts, niveau des actions,
dangerosité de l'adversaire (`departAdv`, `contre`, `defenseBonus`, `defenseRequise`).

## Chantier 6 (17/10/2026)
Banque de défense : data/defense.js (40 questions) et data/regles-defense.js. Voir 15-CHANTIER6-RESULTATS.md.

## Chantier 5 bis (16/10/2026)
Noms au choix (manga / Olive et Tom), gestes en contexte, énergie, sanctions, Misaki n°11. Voir 14-CHANTIER5B-GESTES-NOMS.md.
Contrôle des questions : `node outils-test/verifier-questions.js`. Simulation d'équilibre : `node outils-test/simuler.js 0.6`.

## Chantier 8 (18/10/2026)
Championnat et histoire. Image d'histoire avant chaque match et au prologue, petit texte et image après une victoire,
écran de fin du tournoi, boutons « Recommencer le championnat » (garde le carnet) et « Voir la fin du tournoi » (menu).
Les images sont composées par le jeu (aucune image à fournir) ; pour mettre ta propre image : `assets/histoire/<nom>.png`
(noms dans `data/championnat.js`, champ `image` ; `-victoire` ajouté pour l'image d'après victoire ; `histoire-07-fin` pour la fin).
Tags de match (pluie, triche) : champ `tags` de chaque match dans `data/championnat.js`. Voir 18-CHANTIER8-RESULTATS.md.

## Réglages du 19/10/2026 (chantier 8 bis)
Tir et arrêt du gardien : une seule chance (le match d'essai garde la deuxième). Contre raté : l'adversaire avance de 2 crans.
Les questions montent en difficulté pendant le match (`montee`). Accueil refait. Un seul ballon par scène d'histoire.
Réglages dans data/config.js : `sansSecondeChance`, `montee`, `tirNiveau`, `recul`. Voir 18-CHANTIER8-RESULTATS.md et les « Règles de jeu validées » du plan.

## Chantier 13 (23/10/2026) : comptes élèves et reprise de partie
- **Écran du numéro** au démarrage : l'élève tape son numéro à 4 chiffres (attribué par l'enseignante), puis choisit **« Reprendre ma partie »** (il a déjà joué) ou **« Nouvelle partie »** (première fois), ou « Jouer sans compte ». Le jeu vérifie le numéro dans le cloud : « Nouvelle partie » est refusée si le numéro est **déjà pris** (message qui renvoie vers « Reprendre ») ; « Reprendre » est refusée si le numéro est **inconnu** (faute de frappe : aucun compte fantôme n'est créé). Sans réseau : « Nouvelle partie » est impossible (numéro non vérifiable) ; « Reprendre » marche seulement si la partie est déjà sur l'appareil. La touche Entrée équivaut à « Reprendre ». Le dernier numéro n'est pas retenu (appareil partagé).
- **Où sont les données** : la mémoire principale reste le localStorage (le jeu marche sans réseau). Une copie est envoyée dans la Realtime Database du projet Firebase LEXICA, à `jeux/foot/<numéro>` (une seule chaîne de texte : `donnees`). Un futur jeu utilisera `jeux/<son-nom>/<numéro>`.
- **À la connexion** : lecture de la copie du cloud, fusion avec celle de l'appareil (meilleur résultat par match, règles des deux côtés), puis envoi. On n'écrit jamais avant d'avoir lu.
- **Envois économes** : 5 s après la dernière modification, 20 s au plus pendant un match ; connexion coupée entre deux envois. Hors connexion : le jeu continue, l'envoi part au retour du réseau.
- **Sans compte** : rien n'est chargé ni envoyé ; la progression reste sur l'appareil (clé d'origine) et n'est jamais copiée dans un compte.
- **Page ouverte en double-clic (file://)** : Firebase ne marche pas, seul « Jouer sans compte » est proposé. Utiliser Live Server (adresse `localhost`) ou Netlify pour tester les comptes.
- **Espace enseignant** : petit ⚙ presque invisible en bas de page. Verrou (le jeu ne contient que son empreinte SHA-256, jamais le mot de passe), puis connexion Firebase de l'enseignante (e-mail et mot de passe saisis à chaque fois, jamais gardés). Liste des comptes (numéro, matchs gagnés, règles et mots à revoir, dernière activité), tri par numéro / progression / activité, recherche par numéro, suppression d'un compte ou des comptes inactifs depuis plus de N jours. La session enseignante n'est pas conservée sur l'appareil. **Ce sont les règles Firebase (fichier regles-realtime-database.json) qui réservent liste et suppression au compte de l'enseignante**, pas le verrou.
- Changer le verrou : calculer le SHA-256 de `foot-prof-v1:` suivi du nouveau mot de passe et remplacer la constante `VERROU` dans js/compte.js.
- **Données enregistrées** : numéro, progression (matchs, carnet de règles, « Vu à l'entraînement », choix des noms, date de dernière activité). Pas de nom, pas d'e-mail, pas d'adresse IP côté jeu.
- Contrôle automatique : `node outils-test/verifier-questions.js` (inchangé). Le test du compte (faux Firebase) est dans le compte rendu 25-CHANTIER13-RESULTATS.md.

## Chantier 15 (25/10/2026) : tirs au but « petits mots »
- **Entraînement** : bouton « 🥅 Tirs au but : petits mots » dans le menu. 5 tirs ; le niveau (1 à 5) s'adapte tout seul (4 buts ou plus : on monte ; 2 buts ou moins : on descend) ou se fixe à la main.
- **Fin de match** : si le match est encore nul après la prolongation, séance de 5 tirs chacun puis mort subite. L'élève tire pour son équipe (il complète une phrase : bon coin = but) et est gardien sur les tirs adverses (bon petit mot = arrêt).
- Banque : data/motspetits.js (80 questions, 16 par niveau, type `motpetit`) et data/regles-motspetits.js (règles `mp_*` du carnet).
- Réglages : `tirsAuBut` dans data/config.js (série, mort subite maximale, niveau supplémentaire, seuils d'entraînement).
- Images : assets/tirs/tir-01-but.png (le but), assets/tirs/tirs-atlas.js (4 tireurs recolorables) et assets/tirs/gardien-atlas.js (gardien, 3 poses). Pour changer le but, remplacer le PNG (même nom).
- Voir 28-CHANTIER15-RESULTATS.md.
