# Chantier 15 : tirs au but « petits mots » (25/10/2026)

## Décisions validées
- L'élève est **gardien** sur les tirs adverses : une question « petit mot » à chaque fois, bonne réponse = arrêt.
- Niveau d'entraînement **automatique** (4 buts ou plus : +1 ; 2 buts ou moins : −1), ou fixé à la main. Niveau sauvegardé (`tirs`) et fusionné avec le cloud.
- Tirs au but **après la prolongation**, si le match est encore nul (prolongation inchangée). 5 tirs chacun, arrêt anticipé quand l'écart ne peut plus être rattrapé, puis mort subite par paires (garde-fou : 10 paires).
- Images du but et des tireurs générées par Julie ; gardien dessiné en SVG par le code.

## Fonctionnement
- Un tir : phrase à compléter sous le but, un petit mot dans chaque coin, **une seule chance**. Tireur : bon mot = but, mauvais = arrêt. Gardien : le coin choisi est le plongeon ; bon mot = arrêt, mauvais = but adverse.
- Remédiation : 1 ligne si juste ; explication en 3 lignes + règle si faux. Carnet : `noterRegle` (règles `mp_*`) et `noterMot`.
- Niveau en match : `R.niveauTirs` = niveau du match + calibrage + ajustement, borné 1–5, +1 en mort subite.
- Le match enregistre `tab` (ex. « 4–3 ») affiché dans le menu et l'écran de fin.

## Banque
`data/motspetits.js` : 80 questions (type `motpetit`), 16 par niveau, longueur moyenne 13 / 15 / 18 / 21 / 27 mots. N1 : évidents (donc, mais, où, dans…). N2 : homophones proches (a/à, on/ont, son/sont, ces/ses…). N3 : vrais pièges (car/parce que, or, quant/quand, dont/donc, malgré/bien que…). N4 : locutions et modes (sans que, alors que, de sorte que, à moins que…). N5 : longues phrases (faute de, au fur et à mesure que, de peur que, néanmoins, quel que…). Aucun prénom en dur. Règles : `data/regles-motspetits.js` (≤ 10 mots).

## Réglages (`data/config.js`, `tirsAuBut`)
`serie` 5, `mortSubiteMax` 10, `niveauSupp` 0, `entrainement: {tirs, niveauHaut, niveauBas}`. `tirsAuBut: true` sur les matchs m2 à m6.

## Fichiers
Nouveaux : `data/motspetits.js`, `data/regles-motspetits.js`, `js/tirsaubut.js`, `assets/tirs/tir-01-but.png`, `assets/tirs/tirs-atlas.js`, `28-CHANTIER15-RESULTATS.md`.
Modifiés : `index.html`, `css/jeu.css`, `js/match.js`, `js/regles.js`, `js/progression.js`, `js/banque.js`, `data/config.js`, `outils-test/verifier-questions.js`, `README.md`, `CREDITS.md`.

## Tests faits
- `verifier-questions.js` : « Contrôle complet : aucun problème » (80 questions petits mots incluses).
- `simuler.js` : équilibre des matchs inchangé.
- Playwright (Chromium, file://) : entraînement (niveau 4 buts→3, 1 but→2, 5 buts→3, sauvegardé) ; fin de match : victoire en mort subite 4–3, arrêt anticipé 3–0, défaite 0–3 (match enregistré avec `tab`) ; tailles iPad portrait/paysage et téléphone, phrase et 4 coins visibles sans défiler ; aucune erreur JS.
- Balayage ES5 de `tirsaubut.js` : aucune syntaxe ES6 ; préfixes -webkit- pour les animations.

## Non testé / limites
- **iPad Mini 2 (iOS 12) réel** : à essayer en classe (animations du gardien et du ballon, recoloration des tireurs).
- Gardien dessiné en code (pas de sprites). Le but pèse ~228 Ko.
- Sons : réutilisation des sons existants. Panneau enseignant et Firebase inchangés.

## Remplacer les images
Le but : remplacer `assets/tirs/tir-01-but.png` (même nom, ratio 8:7). Les tireurs sont dans `tirs-atlas.js` (4 poses ; maillot magenta uni recoloré, short blanc).
