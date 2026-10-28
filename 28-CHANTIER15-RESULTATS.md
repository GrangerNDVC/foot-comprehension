# Chantier 15 : tirs au but et « vocabulaire à maîtriser » (25-27/10/2026)

## Ce que fait le jeu
- **Séance d'entraînement** (menu : « 🥅 Vocabulaire à maîtriser avant de commencer ») : l'élève choisit un gardien, puis 5 tirs. Une phrase à compléter sous le but, un mot dans chaque coin, **une seule chance**. Bon coin = but, mauvais coin = arrêt.
- **Fin de match** : si le score est encore nul après la prolongation, 5 tirs chacun, arrêt anticipé quand l'écart ne peut plus être rattrapé, puis mort subite (garde-fou : 10 paires). L'élève **tire** pour son équipe et est **gardien** sur les tirs adverses (le coin qu'il choisit = là où plonge son gardien ; bon mot = arrêt). Le match enregistre `tab` (ex. « 4–3 »).
- Remédiation comme ailleurs : 1 ligne si juste ; explication en 3 lignes + règle du carnet si faux. Carnet : règles `mp_` (petits mots) et `vc_` (vocabulaire).

## Les 5 gardiens (data/gardiens-tirs.js)
| Gardien | Rôle à l'entraînement | Niveaux de questions |
|---|---|---|
| Gardien remplaçant 1 (blond) | Vocabulaire des consignes (banque `vocabulaire`) | 1 à 5, adaptatif |
| Gardien remplaçant 2 (peau mate, casquette) | Prépositions et conjonctions (petits mots, catégorie `pc`) | 1 à 5, adaptatif |
| Alan Crocker (cheveux noirs en pointes ; niveau 1, facile) | Mélange de tout, **avec** homophones (a / à, on / ont…) | 1 à 2 |
| Ted Warner (niveau 2) | Mélange, tournures difficiles, **sans** homophones | 3 à 4 |
| Thomas Pryce (niveau 3, difficile) | Mélange, tournures les plus difficiles, sans homophones | 4 à 5 |

- Chaque gardien garde son niveau (`progression.tirs.par[id]`) ; en dehors de l'automatique, l'élève peut fixer un niveau de la plage.
- **En match**, chaque équipe a son gardien (`parEquipe`) : Nankatsu = remplaçant 2 (Morisaki, peau mate) ; Nishikigaoka et Hanawa = Alan Crocker ; Azumaichi et Hirado = remplaçant 1 (blond) ; Furano = Thomas Pryce ; Toho = Ted Warner (Wakashimazu). Le jogging prend la couleur de gardien de l'équipe (data/equipes/equipe-*.js) ; **Thomas Pryce reste en bleu** (image non recolorable). En match, les questions mélangent petits mots et vocabulaire ; les homophones ne tombent qu'aux tirs de niveau 1.
- Noms des deux gardiens sans nom : à remplacer dans `data/gardiens-tirs.js` (champ `nom`) si tu retrouves leurs noms dans le manga.
- Images : redécoupées en pleine résolution (160 px de haut, réduction lissée) ; `ECHELLE_G = 0.4`.
- Menu : le mode entraînement est une carte avec image sous les six matchs (plus de petit bouton).
- Les poses : repos, plongeon bas, plongeon en diagonale (haut). Les images regardent vers la droite, le jeu les retourne pour la gauche.

## Banques de questions
- **Petits mots** (`motpetit`) : `data/motspetits.js` (80) + `data/motspetits-prepositions.js` (17 : chez / à, entre / parmi, dans / en, au / en + pays, pour / par, contre ; verbes qui veulent une préposition : tenir à, dépendre de, compter sur…). Catégories calculées par `J.banque.categorie` : `hom` (homophones), `pc` (prépositions, conjonctions, connecteurs), `autre` (pronoms, négation…).
- **Vocabulaire des consignes** (`vocabulaire`) : `data/vocabulaire.js`, 70 questions (14 par niveau) : 1 gestes (cocher, souligner, relier…) · 2 comprendre (relever, repérer, justifier, citer, synonyme, strophe…) · 3 raisonner (comparer, déduire, reformuler, résumer, au moins / au plus, chaque / chacun, d'après) · 4 lire de près (explicite / implicite, narrateur / auteur, légende, types de textes) · 5 consignes exigeantes (confronter, nuancer, pertinent, guillemets / parenthèses, ci-dessous / ci-dessus, intention de l'auteur).
- Règles du carnet : `data/regles-motspetits.js` (`mp_`), `data/regles-vocabulaire.js` (`vc_`), 10 mots au plus.
- Contrôle : `node outils-test/verifier-questions.js` vérifie les deux banques (12 par niveau au moins, un seul trou, 4 options, règles, explications de 18 mots au plus) et le nombre de questions de chaque gardien à thème par niveau. Résultat : « Contrôle complet : aucun problème ».

## Fichiers
Nouveaux : `data/gardiens-tirs.js`, `data/vocabulaire.js`, `data/regles-vocabulaire.js`, `data/motspetits-prepositions.js`, `data/motspetits.js`, `data/regles-motspetits.js`, `js/tirsaubut.js`, `assets/tirs/tir-01-but.png`, `assets/tirs/tirs-atlas.js`, `assets/tirs/gardien-atlas.js`, `28-CHANTIER15-RESULTATS.md`.
Modifiés : `index.html`, `css/jeu.css`, `js/match.js`, `js/regles.js`, `js/progression.js`, `js/banque.js`, `data/config.js`, `outils-test/verifier-questions.js`, `README.md`, `CREDITS.md`.

## Tests faits
- Playwright (Chromium, file://) : entraînement avec chacun des 5 gardiens (bonne banque et bonne catégorie, plongeon vers les 4 coins, jogging recoloré) ; niveau automatique par gardien (4 buts → niveau 3, 1 but → 2, sauvegardé) ; fin de match : victoire en mort subite 4–3, arrêt anticipé 3–0, défaite 0–3 ; gardien de chaque adversaire (m2 à m6) ; iPad portrait / paysage et téléphone ; aucune erreur JS.
- `simuler.js` : l'équilibre des matchs n'a pas changé. Aucune syntaxe ES6 dans le code ajouté.

## Non testé / limites
- **iPad Mini 2 (iOS 12) réel** : à essayer en classe (animations, recoloration des images par canvas).
- Gardiens : pas de pose « arrêt avec ballon » ; sur téléphone, les phrases longues du niveau 5 obligent à défiler un peu.
- Le jeu garde les sons existants. Panneau enseignant et Firebase inchangés.

## Modifier
- Changer le gardien d'une équipe, les niveaux ou les catégories d'un gardien : `data/gardiens-tirs.js`.
- Remplacer une image : refaire `assets/tirs/gardien-atlas.js` (3 poses par gardien, le rouge se recolore) ou remplacer `assets/tirs/tir-01-but.png` (même nom, ratio 8:7).
- Taille des gardiens : `ECHELLE_G` dans `js/tirsaubut.js`.

## Correction 27/10
La question « indique le nom du joueur » ne dit plus « pas une phrase » : toutes les réponses restent en phrases complètes. « au plus trois mots » devient « au plus trois phrases ».

## Menu compact (28/10)
L'accueil tient sans défiler : image à gauche, titre et consignes à droite ; six matchs + carte « Vocabulaire à maîtriser avant de commencer » sur une même rangée (4 + 3 sur petit écran) ; boutons dessous. Fichiers : `index.html`, `css/jeu.css`, `js/match.js` (à envoyer ensemble : l'ancien bouton du menu est remplacé par la carte).
