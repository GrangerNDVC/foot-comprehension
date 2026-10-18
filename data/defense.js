/* ============================================================
   BANQUE DE DÉFENSE (chantier 6) : consignes de l'entraîneur, type « defense ».
   40 questions : 8 par niveau (1 à 5). Format : voir 04-QUESTIONS.md. Règles du carnet : data/regles-defense.js.
   Ces questions servent pour tous les gestes de défense (couper, tacler, contre, bloquer, dégager, arrêt du gardien).

   LES NOMS : aucun prénom en dur. En défense, {A} = notre joueur qui défend (jamais le gardien),
   {X} = l'adversaire qui a le ballon (écrit « n°7 »), {B} {C} {D} = d'autres joueurs de Nankatsu sur le terrain,
   {Y} {Z} = d'autres adversaires. fixe: { B: 10 } = « le capitaine ».
   tags : "pluie" et "triche" (matchs à particularité), "ecole" (consigne scolaire authentique : niveaux 4 et 5).
   Les consignes scolaires (maths, recette, mesures) sont placées dans une situation de mi-temps ou d'après-entraînement.
   ============================================================ */
JEU.ajouterQuestions([

/* ---------------- NIVEAU 1 : deux informations à tenir (où ET quoi, qui ET où) ---------------- */

{ id: "def-1-01", niveau: 1, type: "defense", format: "choix",
  consigne: "Place-toi entre ton adversaire et le but, puis suis-le partout.",
  situation: "{A} est face à l'adversaire {X}.",
  question: "Quelle phrase montre que {A} a bien suivi la consigne ?",
  options: ["{A} reste près du but et ne bouge plus.", "{A} reste entre {X} et le but, et il le suit.", "{A} suit {X} partout, mais loin du but.", "{A} reste entre {X} et le but, mais il ne le suit pas."],
  bonne: 1, mot: "entre ton adversaire et le but", regle: "def_deux_ordres",
  explication: { bonne: "{A} reste entre {X} et le but, et il le suit.", cle: "Deux ordres : se placer entre eux ET le suivre.", piege: "Sans suivre {X}, ou loin du but, un ordre est oublié." } },

{ id: "def-1-02", niveau: 1, type: "defense", format: "choix",
  consigne: "{C} surveille l'attaquant de gauche. {A} surveille celui de droite.",
  question: "Qui surveille l'attaquant de droite ?",
  options: ["{C}", "{A}", "{B}", "On ne peut pas savoir : il manque une information"],
  bonne: 1, mot: "celui de droite", regle: "def_qui_ou",
  explication: { bonne: "{A} surveille l'attaquant de droite.", cle: "« Celui de droite » reprend « l'attaquant ».", piege: "{C} surveille l'attaquant de gauche, pas celui de droite." } },

{ id: "def-1-03", niveau: 1, type: "defense", format: "choix",
  consigne: "Reste devant {X} et attends mon signal pour tacler.",
  question: "Quel signal le coach va-t-il faire ?",
  options: ["Il lève le bras.", "Il siffle.", "Il crie le nom {de:A}.", "On ne peut pas savoir : il manque une information"],
  bonne: 3, mot: "mon signal", regle: "def_nsp",
  explication: { bonne: "Le coach ne dit pas quel signal il fera.", cle: "« Mon signal » : on ne sait pas lequel.", piege: "Lever le bras ou siffler semble logique, mais rien n'est écrit." } },

{ id: "def-1-04", niveau: 1, type: "defense", format: "choix",
  consigne: "Reste à deux pas de ton adversaire et ne le quitte pas des yeux.",
  question: "Quelle phrase montre que {A} a bien suivi la consigne ?",
  options: ["{A} reste à deux pas de {X} et le regarde tout le temps.", "{A} reste à deux pas de {X} mais regarde les supporters.", "{A} reste à vingt pas de {X} et le regarde.", "{A} reste à deux pas de {X}, puis il s'en va."],
  bonne: 0, mot: "deux pas", regle: "def_deux_ordres",
  explication: { bonne: "{A} est à deux pas de {X} et le regarde.", cle: "« Ne le quitte pas des yeux » : le regarder tout le temps.", piege: "Un seul ordre sur deux : regarder ailleurs, ou s'éloigner." } },

{ id: "def-1-05", niveau: 1, type: "defense", format: "choix",
  consigne: "Dégage le ballon loin du but, vers la touche.",
  question: "Où {A} doit-il envoyer le ballon ?",
  options: ["Loin du but, vers la touche.", "Vers le centre, devant le but.", "Vers {X}, tout près.", "Dans notre propre but."],
  bonne: 0, mot: "vers la touche", regle: "def_ou",
  explication: { bonne: "Loin du but, vers la touche.", cle: "« Loin du but » et « vers la touche » disent où.", piege: "Le centre est devant le but : le danger reste là." } },

{ id: "def-1-06", niveau: 1, type: "defense", format: "vrai-faux-nsp",
  consigne: "Reste à droite de l'adversaire {X} et surveille son pied gauche.",
  question: "{A} doit-il se placer à gauche de {X} ?",
  options: ["Oui", "Non", "On ne peut pas savoir"],
  bonne: 1, mot: "à droite de", regle: "def_detail",
  explication: { bonne: "Non : la consigne dit à droite de {X}.", cle: "« À droite de » : le côté droit, pas le gauche.", piege: "Le pied gauche est ce qu'il surveille, pas sa place." } },

{ id: "def-1-07", niveau: 1, type: "defense", format: "vrai-faux-nsp",
  consigne: "Surveille l'adversaire {Y} de près : il court très vite.",
  question: "{Y} tire-t-il très bien ?",
  options: ["Oui", "Non", "On ne peut pas savoir"],
  bonne: 2, mot: "court très vite", regle: "def_nsp",
  explication: { bonne: "Le coach dit seulement que {Y} court vite.", cle: "Courir vite et bien tirer sont deux choses différentes.", piege: "Un joueur rapide ne tire pas forcément bien." } },

{ id: "def-1-08", niveau: 1, type: "defense", format: "barrer",
  consigne: "Le coach donne trois places : {A} reste au centre, {C} reste à gauche, {B} reste à droite.",
  question: "Quelles phrases sont vraies ? (Plusieurs réponses possibles.)",
  options: ["{A} reste au centre.", "{C} reste au centre.", "{C} reste à gauche.", "{B} reste à gauche."],
  bonne: [0, 2], mot: "{A} reste au centre", regle: "def_qui_ou",
  explication: { bonne: "{A} reste au centre ; {C} reste à gauche.", cle: "Relie chaque joueur à sa place, un par un.", piege: "{B} est à droite : ni à gauche, ni au centre." } },

/* ---------------- NIVEAU 2 : un seul élément change (qui, quoi, combien) ---------------- */

{ id: "def-2-01", niveau: 2, type: "defense", format: "choix",
  consigne: "{A} reste collé à {Y}. {B} reste collé à {Z}. {C} garde le centre.",
  question: "Qui reste collé à {Z} ?",
  options: ["{B}", "{A}", "{C}", "On ne peut pas savoir : il manque une information"],
  bonne: 0, mot: "{B} reste collé à {Z}", regle: "def_qui_ou",
  explication: { bonne: "{B} reste collé à {Z}.", cle: "Chaque joueur a son adversaire : lis les deux noms.", piege: "{A} s'occupe de {Y}, et {C} garde le centre." } },

{ id: "def-2-02", niveau: 2, type: "defense", format: "choix",
  consigne: "Quand l'adversaire a le ballon, recule de trois pas et reste face à lui.",
  question: "Quelle phrase montre que {A} a bien suivi la consigne ?",
  options: ["{A} recule de trois pas et reste face à {X}.", "{A} recule de deux pas et reste face à {X}.", "{A} recule de trois pas et tourne le dos à {X}.", "{A} avance de trois pas et reste face à {X}."],
  bonne: 0, mot: "trois pas", regle: "def_detail",
  explication: { bonne: "{A} recule de trois pas, face à {X}.", cle: "Trois mots comptent : recule, trois, face.", piege: "Un seul mot change : deux pas, dos, ou avancer." } },

{ id: "def-2-03", niveau: 2, type: "defense", format: "vrai-faux-nsp",
  consigne: "{A} s'approche de {X}, puis il lui prend le ballon.",
  question: "{A} prend-il le ballon à {X} ?",
  options: ["Oui", "Non", "On ne peut pas savoir"],
  bonne: 0, mot: "lui prend le ballon", regle: "def_pronom",
  explication: { bonne: "Oui : {A} prend le ballon à {X}.", cle: "« Il » prend le ballon ; « lui » le perd.", piege: "Ne confonds pas : {X} perd le ballon, il ne le prend pas." } },

{ id: "def-2-04", niveau: 2, type: "defense", format: "choix",
  consigne: "{A} suit {X} sur toute la largeur du terrain. {X} est très rapide.",
  question: "Combien de fois {X} change-t-il de direction ?",
  options: ["Une fois.", "Deux fois.", "Trois fois.", "On ne peut pas savoir : il manque une information"],
  bonne: 3, mot: "sur toute la largeur", regle: "def_nsp",
  explication: { bonne: "Le texte ne donne aucun nombre de changements.", cle: "Suivre sur toute la largeur ne dit pas combien de fois.", piege: "Le nombre semble logique, mais il n'est pas écrit." } },

{ id: "def-2-05", niveau: 2, type: "defense", format: "choix",
  consigne: "Les quatre défenseurs forment une ligne. {A} est au milieu de la ligne.",
  question: "Combien de défenseurs sont dans la ligne ?",
  options: ["Deux", "Trois", "Quatre", "Cinq"],
  bonne: 2, mot: "quatre défenseurs", regle: "def_nombre",
  explication: { bonne: "Quatre défenseurs.", cle: "Le nombre est écrit : « les quatre défenseurs ».", piege: "{A} est au milieu : cela ne change pas le nombre." } },

{ id: "def-2-06", niveau: 2, type: "defense", format: "choix",
  consigne: "Reste devant {X} pour qu'il ne puisse pas tirer.",
  question: "Pourquoi {A} reste-t-il devant {X} ?",
  options: ["Pour empêcher {X} de passer.", "Pour empêcher {X} de tirer.", "Pour empêcher {X} de courir.", "Pour empêcher {X} de crier."],
  bonne: 1, mot: "ne puisse pas tirer", regle: "def_pourquoi",
  explication: { bonne: "Pour empêcher {X} de tirer.", cle: "« Pour qu'il ne puisse pas tirer » donne le but.", piege: "Passer, courir, crier : ce n'est pas la raison donnée." } },

{ id: "def-2-07", niveau: 2, type: "defense", format: "barrer",
  consigne: "{A} et {B} gardent la zone de droite. {C} et {D} gardent la zone de gauche.",
  question: "Quelles phrases sont vraies ? (Plusieurs réponses possibles.)",
  options: ["{A} garde la zone de droite.", "{D} garde la zone de droite.", "{C} garde la zone de gauche.", "{B} garde la zone de gauche."],
  bonne: [0, 2], mot: "{C} et {D} gardent", regle: "def_qui_ou",
  explication: { bonne: "{A} garde la droite ; {C} garde la gauche.", cle: "Deux joueurs par zone : relis chaque nom.", piege: "{D} est à gauche et {B} à droite." } },

{ id: "def-2-08", niveau: 2, type: "defense", format: "choix", fixe: { B: 10 },
  consigne: "{B}, le capitaine, dit à {A} : « Reste avec {X}. » Ensuite, le capitaine court vers le but.",
  question: "Qui court vers le but ?",
  options: ["{B}", "{A}", "{X}", "On ne peut pas savoir : il manque une information"],
  bonne: 0, mot: "le capitaine", regle: "def_reprise_nom",
  explication: { bonne: "{B}, le capitaine, court vers le but.", cle: "« Le capitaine » reprend {B}, nommé avant.", piege: "{A} reçoit l'ordre : il reste avec {X}." } },

/* ---------------- NIVEAU 3 : l'ordre, la cause, « pendant que » ---------------- */

{ id: "def-3-01", niveau: 3, type: "defense", format: "choix",
  consigne: "Regarde le ballon, puis avance vers {X}, puis tacle.",
  question: "Quelle phrase montre que {A} a bien suivi la consigne ?",
  options: ["{A} avance vers {X}, regarde le ballon, puis tacle.", "{A} regarde le ballon, avance vers {X}, puis tacle.", "{A} tacle, puis avance vers {X}, puis regarde le ballon.", "{A} regarde le ballon, tacle, puis avance vers {X}."],
  bonne: 1, mot: "puis", regle: "def_ordre",
  explication: { bonne: "Regarder, avancer, puis tacler.", cle: "« Puis » donne l'ordre : regarder, avancer, tacler.", piege: "Les autres choix mélangent l'ordre des trois actions." } },

{ id: "def-3-02", niveau: 3, type: "defense", format: "choix",
  consigne: "Avant de dégager, lève la tête pour voir où sont tes partenaires.",
  question: "Quelle phrase montre que {A} a bien suivi la consigne ?",
  options: ["{A} dégage, puis il lève la tête.", "{A} lève la tête, puis il dégage.", "{A} lève la tête, mais il ne dégage pas.", "{A} dégage en même temps qu'il lève la tête."],
  bonne: 1, mot: "Avant de dégager", regle: "def_ordre",
  explication: { bonne: "{A} lève la tête, puis il dégage.", cle: "« Avant de dégager » : on lève la tête d'abord.", piege: "Lever la tête après le dégagement, c'est trop tard." } },

{ id: "def-3-03", niveau: 3, type: "defense", format: "choix",
  consigne: "Pendant que {B} gêne {X}, {A} bloque la passe vers {C}.",
  question: "Que fait {A} pendant que {B} gêne {X} ?",
  options: ["Il bloque la passe vers {C}.", "Il gêne {X}.", "Il passe le ballon à {C}.", "On ne peut pas savoir : il manque une information"],
  bonne: 0, mot: "Pendant que", regle: "def_simultane",
  explication: { bonne: "{A} bloque la passe vers {C}.", cle: "{B} gêne {X}, {A} bloque la passe : en même temps.", piege: "Gêner {X}, c'est ce que fait {B}, pas {A}." } },

{ id: "def-3-04", niveau: 3, type: "defense", format: "choix",
  consigne: "Comme {X} tire toujours du pied droit, ferme-lui le côté droit.",
  question: "Pourquoi {A} ferme-t-il le côté droit ?",
  options: ["Parce que {X} passe du pied droit.", "Parce que {X} tire du pied gauche.", "Parce que {X} court vers la droite.", "Parce que {X} tire du pied droit."],
  bonne: 3, mot: "Comme", regle: "def_cause",
  explication: { bonne: "Parce que {X} tire toujours du pied droit.", cle: "« Comme » donne la cause : il tire du pied droit.", piege: "Passer ou courir à droite : ce n'est pas la raison écrite." } },

{ id: "def-3-05", niveau: 3, type: "defense", format: "vrai-faux-nsp",
  consigne: "Dès que {X} perd le ballon, {A} crie « Libre ! » puis court vers l'avant.",
  question: "{A} crie-t-il « Libre ! » avant de courir vers l'avant ?",
  options: ["Oui", "Non", "On ne peut pas savoir"],
  bonne: 0, mot: "puis", regle: "def_ordre",
  explication: { bonne: "Oui : il crie d'abord, puis il court.", cle: "« Puis » : crier vient avant courir.", piege: "« Dès que » donne le départ, pas l'ordre des actions." } },

{ id: "def-3-06", niveau: 3, type: "defense", format: "choix",
  consigne: "Le coach dit : « {A}, après la mi-temps, tu changes de côté. »",
  question: "Pourquoi {A} change-t-il de côté ?",
  options: ["Parce qu'il est fatigué.", "Parce que le coach l'a puni.", "Parce que le jeu se passe à droite.", "On ne peut pas savoir : il manque une information"],
  bonne: 3, mot: "tu changes de côté", regle: "def_nsp",
  explication: { bonne: "Le coach ne donne aucune raison.", cle: "Il dit quand (après la mi-temps), pas pourquoi.", piege: "Les trois raisons sont inventées : aucune n'est écrite." } },

{ id: "def-3-07", niveau: 3, type: "defense", format: "barrer",
  consigne: "Le coach dit : « D'abord, {A} gêne {X}. Ensuite, {B} récupère le ballon. Enfin, {C} relance. »",
  question: "Quelles phrases sont vraies ? (Plusieurs réponses possibles.)",
  options: ["{B} récupère le ballon avant que {A} gêne {X}.", "{A} gêne {X} avant que {B} récupère le ballon.", "{C} relance en dernier.", "{C} relance avant {B}."],
  bonne: [1, 2], mot: "Enfin", regle: "def_ordre",
  explication: { bonne: "{A} gêne d'abord ; {C} relance en dernier.", cle: "D'abord, ensuite, enfin : premier, deuxième, dernier.", piege: "{B} récupère après {A}, et {C} relance après {B}." } },

{ id: "def-3-08", niveau: 3, type: "defense", format: "vrai-faux-nsp",
  consigne: "Avant que {X} tire, {A} lève la jambe pour bloquer le ballon.",
  question: "Le ballon touche-t-il la jambe de {A} ?",
  options: ["Oui", "Non", "On ne peut pas savoir"],
  bonne: 2, mot: "pour bloquer", regle: "def_nsp",
  explication: { bonne: "Le texte dit ce que {A} tente, pas le résultat.", cle: "« Pour bloquer » : il essaie de bloquer.", piege: "Tenter de bloquer n'est pas réussir à bloquer." } },

/* ---------------- NIVEAU 4 : négation, quantités, premières consignes scolaires ---------------- */

{ id: "def-4-01", niveau: 4, type: "defense", format: "choix", tags: ["pluie"],
  consigne: "Ne tacle pas : reste debout et garde ton adversaire devant toi.",
  situation: "Il pleut. {A} est dans la surface, face à {X}.",
  question: "Quelle phrase montre que {A} a bien suivi la consigne ?",
  options: ["{A} tacle {X} pour prendre le ballon.", "{A} glisse sur le côté pour couper le tir.", "{A} se retourne et suit {X} de dos.", "{A} reste debout et garde {X} devant lui."],
  bonne: 3, mot: "Ne tacle pas", regle: "def_negation",
  explication: { bonne: "{A} reste debout, avec {X} devant lui, sans tacler.", cle: "« Ne… pas » : tacler et glisser sont interdits.", piege: "Se retourner met {X} dans le dos : il n'est plus devant." } },

{ id: "def-4-02", niveau: 4, type: "defense", format: "choix",
  consigne: "Un seul défenseur monte gêner le porteur. Les autres restent derrière.",
  situation: "Il y a quatre défenseurs : {A}, {B}, {C} et {D}. {A} monte.",
  question: "Combien de défenseurs restent derrière ?",
  options: ["Un", "Deux", "Trois", "Quatre"],
  bonne: 2, mot: "Un seul défenseur", regle: "def_compte",
  explication: { bonne: "Quatre moins un : trois restent derrière.", cle: "« Un seul » monte : on l'enlève des quatre.", piege: "Quatre, c'est tous les défenseurs, y compris {A}." } },

{ id: "def-4-03", niveau: 4, type: "defense", format: "vrai-faux-nsp",
  consigne: "Tacle seulement si tu peux toucher le ballon.",
  question: "{A} peut-il tacler s'il ne peut pas toucher le ballon ?",
  options: ["Oui", "Non", "On ne peut pas savoir"],
  bonne: 1, mot: "seulement si", regle: "def_seulement",
  explication: { bonne: "Non : il tacle seulement s'il peut toucher le ballon.", cle: "« Seulement si » : la condition est obligatoire.", piege: "Tacler « quand même » n'est pas permis par la consigne." } },

{ id: "def-4-04", niveau: 4, type: "defense", format: "barrer",
  consigne: "Aucun défenseur ne quitte sa zone. Ni {A} ni {B} ne monte.",
  situation: "{A}, {B} et {C} sont les trois défenseurs.",
  question: "Quelles phrases sont vraies ? (Plusieurs réponses possibles.)",
  options: ["{A} quitte sa zone.", "{B} reste dans sa zone.", "{C} reste dans sa zone.", "{C} monte gêner le porteur."],
  bonne: [1, 2], mot: "Aucun", regle: "def_negation",
  explication: { bonne: "{B} et {C} restent dans leur zone.", cle: "« Aucun » : personne ne sort. « Ni… ni » : ni {A}, ni {B}.", piege: "{A} ne quitte pas sa zone, et {C} ne monte pas." } },

{ id: "def-4-05", niveau: 4, type: "defense", format: "choix", tags: ["ecole"],
  consigne: "Construis un carré de 4 cm de côté. Ne trace pas ses diagonales.",
  situation: "Mi-temps. {A} fait la fiche de maths que le coach lui a donnée.",
  question: "Que doit avoir {A} sur sa feuille à la fin ?",
  options: ["Un carré de 4 cm avec ses diagonales.", "Un carré de 3 cm sans ses diagonales.", "Un carré de 4 cm sans ses diagonales.", "Un rectangle de 4 cm sur 2 cm sans diagonales."],
  bonne: 2, mot: "Ne trace pas", regle: "def_negation",
  explication: { bonne: "Un carré de 4 cm, sans diagonales.", cle: "« Ne trace pas » : on garde le carré, sans diagonales.", piege: "Avec les diagonales, ou avec un autre côté, c'est faux." } },

{ id: "def-4-06", niveau: 4, type: "defense", format: "choix", tags: ["ecole"],
  consigne: "Mélange la farine et le sucre. N'ajoute les œufs qu'après avoir fait fondre le beurre.",
  situation: "Après l'entraînement, {A} prépare un gâteau avec cette recette.",
  question: "Quelle étape {A} ne peut pas faire avant que le beurre soit fondu ?",
  options: ["Mélanger la farine et le sucre.", "Ajouter les œufs.", "Sortir le saladier.", "Peser la farine."],
  bonne: 1, mot: "qu'après", regle: "def_ne_que",
  explication: { bonne: "Ajouter les œufs.", cle: "« N'ajoute… qu'après » : les œufs viennent après le beurre.", piege: "Mélanger la farine n'est pas lié au beurre fondu." } },

{ id: "def-4-07", niveau: 4, type: "defense", format: "choix",
  consigne: "Ne passe jamais en retrait au gardien quand l'adversaire est tout près.",
  question: "Que doit faire {A} si {X} est loin ?",
  options: ["Passer au gardien.", "Dégager le ballon.", "Tacler {X}.", "On ne peut pas savoir : il manque une information"],
  bonne: 3, mot: "tout près", regle: "def_nsp",
  explication: { bonne: "La consigne ne parle pas du cas où {X} est loin.", cle: "Elle interdit un geste quand {X} est tout près, rien d'autre.", piege: "Passer au gardien semble permis, mais ce n'est pas écrit." } },

{ id: "def-4-08", niveau: 4, type: "defense", format: "barrer",
  consigne: "Pour le coup franc, mets trois joueurs dans le mur. Personne ne bouge avant le tir.",
  situation: "Le mur : {A}, {B} et {C}.",
  question: "Quelles phrases sont vraies ? (Plusieurs réponses possibles.)",
  options: ["{A} est dans le mur.", "{D} est dans le mur.", "{C} bouge avant le tir.", "{B} reste immobile avant le tir."],
  bonne: [0, 3], mot: "Personne ne bouge", regle: "def_negation",
  explication: { bonne: "{A} est dans le mur ; {B} reste immobile.", cle: "« Personne ne bouge » : tout le mur reste immobile.", piege: "{D} n'est pas dans le mur, et {C} ne bouge pas." } },

/* ---------------- NIVEAU 5 : conditions et exceptions ---------------- */

{ id: "def-5-01", niveau: 5, type: "defense", format: "choix",
  consigne: "Reste devant ton adversaire, sauf s'il passe le ballon : dans ce cas, cours vers le but.",
  situation: "{X} vient de passer le ballon à {Y}.",
  question: "Que doit faire {A} ?",
  options: ["Il reste devant {X}.", "Il suit le ballon vers {Y}.", "Il court vers le but.", "On ne peut pas savoir : il manque une information"],
  bonne: 2, mot: "sauf", regle: "def_sauf",
  explication: { bonne: "Il court vers le but.", cle: "« Sauf s'il passe » : {X} a passé, l'exception arrive.", piege: "Rester devant {X} est la règle de départ, plus valable." } },

{ id: "def-5-02", niveau: 5, type: "defense", format: "choix", tags: ["triche"],
  consigne: "Si l'arbitre regarde, joue normalement. Sinon, ne réponds pas aux coups : lève la main pour appeler l'arbitre.",
  situation: "{X} tire le maillot de {A}. L'arbitre regarde ailleurs.",
  question: "Que fait {A} ?",
  options: ["Il tire le maillot de {X}.", "Il joue normalement sans rien dire.", "Il lève la main pour appeler l'arbitre.", "Il pousse {X} pour se défendre."],
  bonne: 2, mot: "Sinon", regle: "def_si_sinon",
  explication: { bonne: "L'arbitre ne regarde pas : {A} lève la main.", cle: "« Sinon » : l'arbitre ne regarde pas, c'est ce cas-là.", piege: "Rendre le coup ou pousser est interdit : « ne réponds pas »." } },

{ id: "def-5-03", niveau: 5, type: "defense", format: "vrai-faux-nsp",
  consigne: "Ne sors pas de ta zone, à moins que le gardien te le demande.",
  situation: "Le gardien n'a rien dit. Le ballon roule à dix mètres de la zone de {A}.",
  question: "{A} peut-il sortir de sa zone ?",
  options: ["Oui", "Non", "On ne peut pas savoir"],
  bonne: 1, mot: "à moins que", regle: "def_amoinsque",
  explication: { bonne: "Non : le gardien n'a rien demandé.", cle: "« À moins que » : l'exception demande un ordre du gardien.", piege: "Le ballon proche ne suffit pas : ce n'est pas la condition." } },

{ id: "def-5-04", niveau: 5, type: "defense", format: "vrai-faux-nsp", tags: ["pluie"],
  consigne: "Si la pluie continue à la mi-temps, change de crampons. Sinon, garde les mêmes.",
  situation: "La mi-temps commence. Personne ne sait s'il pleuvra encore.",
  question: "{A} doit-il changer de crampons ?",
  options: ["Oui", "Non", "On ne peut pas savoir"],
  bonne: 2, mot: "Si la pluie continue", regle: "def_nsp",
  explication: { bonne: "On ne sait pas encore s'il pleuvra.", cle: "« Si la pluie continue » : on ignore si c'est vrai.", piege: "Dire oui ou non, c'est deviner la météo." } },

{ id: "def-5-05", niveau: 5, type: "defense", format: "choix", tags: ["ecole"],
  consigne: "Si le nombre est pair, divise-le par 2. Sinon, ajoute 1.",
  situation: "Mi-temps. {A} fait un exercice de maths. Le nombre de départ est 7.",
  question: "Quel nombre {A} obtient-il ?",
  options: ["3,5", "6", "8", "14"],
  bonne: 2, mot: "Sinon", regle: "def_si_sinon",
  explication: { bonne: "7 n'est pas pair, donc 7 + 1 = 8.", cle: "« Sinon » : 7 est impair, on ajoute 1.", piege: "Diviser par 2 demande un nombre pair : 7 ne l'est pas." } },

{ id: "def-5-06", niveau: 5, type: "defense", format: "choix", tags: ["ecole"],
  consigne: "Note la température toutes les heures, même si elle ne change pas.",
  situation: "À 10 h, {A} note 12 °C. À 11 h, il n'a pas encore regardé le thermomètre.",
  question: "Que note {A} à 11 h ?",
  options: ["12 °C", "13 °C", "11 °C", "On ne peut pas savoir : il manque une information"],
  bonne: 3, mot: "même si", regle: "def_nsp",
  explication: { bonne: "Il n'a pas encore lu le thermomètre : on l'ignore.", cle: "« Même si » : il note quoi qu'il arrive, mais on ignore la valeur.", piege: "12 °C n'est vrai que si la température n'a pas changé." } },

{ id: "def-5-07", niveau: 5, type: "defense", format: "barrer",
  consigne: "Tant que le ballon est dans notre moitié de terrain, {A} et {B} restent derrière. Dès qu'il passe au milieu, ils montent d'un pas.",
  situation: "Le ballon est encore dans notre moitié de terrain.",
  question: "Quelles phrases sont vraies ? (Plusieurs réponses possibles.)",
  options: ["{A} reste derrière.", "{B} monte d'un pas.", "{B} reste derrière.", "{A} monte d'un pas."],
  bonne: [0, 2], mot: "Tant que", regle: "def_condition",
  explication: { bonne: "{A} et {B} restent derrière.", cle: "« Tant que » : le ballon n'a pas passé le milieu.", piege: "Monter d'un pas, c'est pour « dès qu'il passe au milieu »." } },

{ id: "def-5-08", niveau: 5, type: "defense", format: "barrer",
  consigne: "Bien que {X} soit plus rapide que toi, reste devant lui : ne le laisse pas tirer.",
  question: "Quelles phrases sont vraies ? (Plusieurs réponses possibles.)",
  options: ["{X} est plus rapide que {A}.", "{A} peut laisser tirer {X}, car il est rapide.", "{A} reste devant {X}.", "{A} s'écarte pour laisser passer {X}."],
  bonne: [0, 2], mot: "Bien que", regle: "def_malgre",
  explication: { bonne: "{X} est plus rapide, mais {A} reste devant lui.", cle: "« Bien que » : un fait vrai, mais l'ordre reste.", piege: "Être rapide n'autorise pas à laisser tirer ou passer." } }

]);
