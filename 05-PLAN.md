# Plan de travail (un chantier = une conversation du projet)

Légende : [ ] à faire · [~] en cours · [x] fait

## Chantier 1 : Atelier sprites (outil planche -> atlas)
[x] fait le 11/10/2026 : atlas Tsubasa (47), gardiens (85), portraits (27), recoloration. Voir 07-CHANTIER1-RESULTATS.md.

## Chantier 2 : Les équipes
[x] fait le 11/10/2026 : 12 atlas joueurs (47 poses), 7 équipes mixtes recolorées. Voir 08-CHANTIER2-RESULTATS.md. Reste à confirmer : planche 188104 (coupe d'Afrique centrale).

## Chantier 3 : Moteur de match
[x] fait le 12/10/2026 (testé en simulation et dans Chromium ; à tester sur ton iPad). Voir 10-CHANTIER3-RESULTATS.md.

## Chantier 4 : Mise en scène des gros plans
[x] fait le 13/10/2026 : scènes avec sprites pour les 8 actions (réussi/raté), tirs selon le niveau, équipes, réglages dans data/grosplan-reglages.js (testé en images dans Chromium ; à tester sur ton iPad). Voir 11-CHANTIER4-RESULTATS.md.

## Chantiers 5, 6, 7 : Banques de questions (en parallèle, aucune dépendance technique) : **le cœur du jeu**
5 : attaque (commentaires), niveaux 1 à 5. 6 : défense (consignes de l'entraîneur). 7 : tirs (textes courts) et contextes scolaires. Chaque banque suit 04-QUESTIONS.md **et le nouveau format d'item** (champs `format`, `mot`, `regle`, `explication {bonne, cle, piege}`), niveau 5ème (12 ans). Objectif : au moins 6 à 8 questions par type et par niveau.
- 5 : [x] fait le 15/10/2026 : 80 questions (passe et dribble, 8 par niveau), data/attaque.js + data/regles-attaque.js, contrôle automatique sans erreur. **À brancher dans index.html et à passer au contrôle officiel du jeu** (le zip n'était pas dans la conversation). Voir 12-CHANTIER5-RESULTATS.md.
- 6 : [ ]
- 7 : [ ]

## Chantier 8 : Championnat et histoire
6 matchs, adversaires, intermèdes narratifs avec images, sauvegarde de progression, écrans de menu. Dépend de 3. [ ]
Déjà fait au chantier 3 (version simple, à enrichir) : menu des 6 matchs, déblocage du match suivant, écran avant-match avec le texte de contexte, sauvegarde du résultat de chaque match.

## Chantier 9 : Test avec l'élève
Retours après essai, réglages de difficulté et de rythme (tout est dans data/config.js). [ ]

## Chantier 10 : Mise en ligne et maintenance
GitHub (dépôt privé), Netlify, nettoyage du dépôt, crédits. [ ]

## Déjà fait
- Prototype 4 paliers, 30 exercices, découpeur de sprites, crédits.
- Chantiers 1, 2 et 3 (voir ci-dessus). Les anciens fichiers js/moteur.js et js/scene.js ont été supprimés ; les 30 questions sont gardées (nouveau format, type passe/défense/dribble/tir), à remplacer par les banques des chantiers 5 à 7.
- Brouillon du championnat (data/championnat.js).

## Journal (une ligne par conversation : date, chantier, ce qui a changé, fichiers touchés)
- 2026-10-10 : cadrage du mode match, brouillon du championnat, plan.
- 2026-10-11 : chantiers 1 (atelier sprites) et 2 (équipes). Voir 07 et 08.
- 2026-10-12 : chantier 3 (moteur de match). Nouveaux : js/regles.js, js/banque.js, js/match.js, js/terrain.js, js/grosplan.js, data/config.js, data/regles.js, data/essai-formats.js, README. Réécrits : index.html, css/jeu.css, js/progression.js, js/main.js, data/palier1-4.js (nouveau format). Supprimés : js/moteur.js, js/scene.js. Décisions : match 1 = match d'essai sans choix (règle le niveau de départ), choix d'action limité à passer/tirer au match 2 ; formats de question choix / barrer / vrai-faux-nsp ; correction en 3 lignes + carnet de règles. Voir 09-INSPIRATIONS-ORTHO-ET-NES.md et 10-CHANTIER3-RESULTATS.md. Mise à jour de 04-QUESTIONS.md et PROMPTS-CHANTIERS.md (nouveau format de question).
- 2026-10-13 : chantier 4 (gros plans). Nouveaux : data/grosplan-reglages.js, js/sprites-recolor.js, assets/atlas/, data/equipes/, outils-test/galerie.html. Réécrits/modifiés : js/grosplan.js, js/assets.js, js/regles.js, js/match.js, index.html, README. Décisions : tir au sol (niv. 1-2), volée (3), tête (4), ciseau (5) ; tir adverse = scène de tir en miroir ; formes de remplacement conservées. Voir 11-CHANTIER4-RESULTATS.md.
- 2026-10-15 : chantier 5 (banque d'attaque). Nouveaux : data/attaque.js (80 questions), data/regles-attaque.js (19 règles att_...), outils-test/verifier-attaque.js. Décisions : 8 questions par type et par niveau ; 10 choix / 3 vrai-faux-nsp / 3 barrer par niveau ; 3 « On ne peut pas savoir » par niveau. Voir 12-CHANTIER5-RESULTATS.md.
