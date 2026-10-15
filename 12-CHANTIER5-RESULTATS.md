# Chantier 5 : Banque de questions d'attaque, résultats (15/10/2026)

## Ce qui est fait
- **80 questions originales** (commentaires de match), types `passe` et `dribble`, niveaux 1 à 5, **8 par type et par niveau**. Joueurs de Nankatsu (Tsubasa, Izawa, Taki, Kisugi, Nagano, Okawa, Oda, Nakazato, Yamamori…) ; adversaires sans nom (« le défenseur n°5 », « l'arrière droit adverse »).
- Formats par niveau : 10 `choix`, 3 `vrai-faux-nsp`, 3 `barrer` (soit 50 / 15 / 15 en tout).
- « On ne peut pas savoir : il manque une information » : bonne réponse 3 fois par niveau (15 sur 80, 19 %) ; proposée comme mauvaise réponse dans 17 autres questions.
- Bonne réponse répartie sur les 4 positions (12 / 12 / 12 / 14) ; elle n'est la plus longue que dans 6 questions « choix » sur 50.
- Remédiation : `bonne`, `cle`, `piege`, 18 mots maximum chacune ; 19 règles du carnet (10 mots maximum) dans data/regles-attaque.js, clés `att_...`.

## Progression de la difficulté
| Niveau | Ce que la question demande de lire | Mécanismes |
|---|---|---|
| 1 | deux informations à tenir (qui + où, qui + quoi) | pronoms simples, « puis », lieu |
| 2 | un seul élément change entre les choix | phrases presque identiques, reprises (le capitaine, ce défenseur), pourquoi, où |
| 3 | l'ordre et la cause | avant / après / pendant que / dès que, « comme », une-deux |
| 4 | négation et quantités | ne… pas, aucun, ni… ni, seulement, un seul, sauf un, compter |
| 5 | conditions et exceptions | si… sinon, sauf si, à moins que, bien que, même si, tant que, condition non remplie |

## Appui sur les évaluations nationales de 5ème (2003, 2012, 2018, début de cinquième 2026)
Ces documents ne donnent **pas de taux de réussite nationaux** (ceux de 2003 étaient publiés à part) : le calage est donc qualitatif. Ce qu'ils demandent à un élève de 5ème, et que la banque reprend sous forme de commentaires de match :
- repérer qui fait quoi quand le personnage est repris par un pronom ou un autre groupe de mots (« Cet animal / Son maître / Le compagnon / Il / l'autre ») → niveaux 1 à 3 (reprises) ;
- attribuer des paroles ou des actions à chaque personnage → niveaux 1-2 ;
- ordonner des faits, distinguer avant / après / en même temps, cause et conséquence → niveau 3 ;
- vrai / faux sur un document avec des conditions (« il faut… », « seulement ») → niveaux 4-5 ;
- comprendre ce qu'une phrase laisse entendre sans le dire (indices) → réponse « On ne peut pas savoir » ;
- évaluation 2026 (début de cinquième) : connecteurs (car, étant donné que), négation / contraire, pronoms, expression du temps, condition → niveaux 3 à 5.
La différence avec ces évaluations : les textes sont très courts (1 à 3 phrases) et le vocabulaire reste celui du foot ; seule la logique de lecture atteint le niveau 5ème. Les évaluations 4ème et 3ème permettraient de régler le haut de l'échelle (niveaux 4-5) : à joindre avant le chantier 9 si tu veux comparer l'écart.

## Contrôle
- `outils-test/verifier-attaque.js` (Node) : id uniques, niveau / type / format, `bonne` valide (liste pour `barrer`), options sans doublon, `mot` présent tel quel dans le texte, règle connue, règles de 10 mots maximum, explications de 18 mots maximum, 8 questions par type et par niveau, statistiques d'équilibre. **Résultat : aucune erreur.**
- Relecture question par question (80 sur 80) : une seule réponse correcte pour les `choix` et `vrai-faux-nsp` ; pour les `barrer`, la liste des bonnes réponses est exacte.
- `outils-test/reequilibrer.js` : outil de fabrication (change l'ordre des options pour répartir la bonne réponse) ; inutile à relancer.

## Pas vérifié
- **Le zip du jeu n'était pas dans la conversation** : je n'ai pas lancé `JEU.banque.verifier()` du jeu ni vu `data/palier1.js` ni `data/regles.js`. Le format vient de 04-QUESTIONS.md et 02-ARCHITECTURE.md. À faire : ajouter les deux scripts dans index.html et lancer le contrôle officiel.
- Le livre de M.-C. Perret n'était pas dans la conversation : j'ai utilisé les mécanismes déjà résumés dans 09-INSPIRATIONS-ORTHO-ET-NES.md, sans aucun contenu du livre.
- La difficulté réelle (2 réussites sur 3 du premier coup) reste à mesurer avec l'élève (chantier 9).
- Vocabulaire de foot à surveiller avec ton élève : marqué / démarqué, centrer, feinter, dégager, une-deux (défini dans la question 3-05).

## Pour brancher les fichiers
Dans index.html, après js/banque.js et les autres data/ : 
```
<script src="data/regles-attaque.js"></script>
<script src="data/attaque.js"></script>
```
(`regles-attaque.js` avant `attaque.js`). Les 30 questions de départ (data/palier1-4.js) peuvent être retirées une fois les chantiers 6 et 7 faits ; en attendant, elles restent pour les types `defense` et `tir`.

## Lignes pour le Journal
- 2026-10-15 : chantier 5 fait (80 questions d'attaque, passe et dribble, niveaux 1 à 5). Nouveaux : data/attaque.js, data/regles-attaque.js, outils-test/verifier-attaque.js. Voir 12-CHANTIER5-RESULTATS.md.
