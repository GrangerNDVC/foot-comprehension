# Match de compréhension

Serious game de foot : lire finement un commentaire, une consigne, un petit texte, puis jouer l'action.
Un championnat de 6 matchs (Nankatsu). Aucun serveur, aucun compte : tout tourne dans le navigateur.

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
js/progression.js  résultats, niveau de départ, carnet de règles (localStorage)
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
