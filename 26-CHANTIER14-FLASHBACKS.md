# Chantier 14 — Flashbacks et personnages cités

Problème : des personnages cités dans les questions « venaient de nulle part ».

Règle : (1) texte qui colle à l'action en cours → joueurs du jeu **sur le terrain**, entourés en **rose** à l'écran ; (2) sinon → **flashback** : étiquette « ⏪ Flashback : … », cadre sépia, personnages pris parmi les 14 joueurs de Nankatsu.

Technique : champ `flashback: "libellé"` (≤ 40 car.) sur la question. banque.js (vivier TOUTE_L_EQUIPE), match.js (bandeau, anneaux, lecture à voix haute), terrain.js (`opts.cites`), css/jeu.css, outils-test/verifier-questions.js (contrôle du champ).

Questions en flashback : tirs 34, attaque 16, défense 7, gardien 14 → 71 sur 310. Textes d'école et de maths/sciences compris.
Correction en plus : gar-2-07 (numéros de maillot écrits en dur contredisaient les noms attribués) réécrit sans {B} ni {X}.
Autres correctifs de la session : musiques superposées (js/sons.js).
