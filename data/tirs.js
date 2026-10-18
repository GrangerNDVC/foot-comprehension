/* ============================================================
   BANQUE DE TIRS (chantier 7) : petits textes à lire avant de tirer, type « tir ».
   40 questions : 8 par niveau (1 à 5). Format : voir 04-QUESTIONS.md. Règles du carnet : data/regles-tirs.js.
   Remplace data/provisoire.js (supprimé).

   Principe : le texte (champ `consigne`) fait 2 à 4 phrases ; une bonne réponse ne dit jamais plus que le texte ;
   les mauvaises changent un détail, ajoutent une information ou tirent une conclusion que le texte ne permet pas.

   LES NOMS : aucun prénom en dur. {A} = le joueur qui tire (utilisé dans chaque question), {C} {D} = d'autres joueurs
   de Nankatsu sur le terrain, {X} = l'adversaire en face (écrit « n°7 »). Voir js/banque.js.

   NIVEAUX : 1 deux informations à tenir ; 2 un seul élément change (qui, combien, pourquoi, « il ») ;
   3 l'ordre (puis, avant, pendant que, comme) ; 4 négation et quantités ; 5 conditions et exceptions.
   Niveaux 1 à 3 : textes de foot. Niveaux 4 et 5 : surtout des documents scolaires authentiques (tag "ecole" :
   règlement, maths, SVT, physique, recette, fiche d'EPS, sortie scolaire), plus quelques textes de foot.

   Les textes de foot racontent un entraînement ou un geste, sans dire le score, la minute ni la météo du moment,
   pour ne jamais contredire ce que le joueur voit à l'écran.
   ============================================================ */
JEU.ajouterQuestions([

/* ---------------- NIVEAU 1 : deux informations à tenir ---------------- */

{ id: "tir-1-01", niveau: 1, type: "tir", format: "choix",
  consigne: "{A} est à dix mètres du but. Le gardien est sorti en courant vers lui. {C}, seul sur la droite, lève le bras.",
  question: "Quelle phrase correspond le mieux au texte ?",
  options: ["Le gardien est resté sur sa ligne, devant le but.", "Le gardien est sorti, et {C} est libre sur la droite.", "{C} est entouré de défenseurs sur la droite du terrain.", "{A} est à cinquante mètres du but, près du rond central."],
  bonne: 1, mot: "seul sur la droite", regle: "tir_collage",
  explication: { bonne: "Le gardien est sorti, et {C} est libre.", cle: "« Seul » : aucun adversaire près de {C}.", piege: "{A} est à dix mètres, pas à cinquante." } },

{ id: "tir-1-02", niveau: 1, type: "tir", format: "choix",
  consigne: "Avant le match, {A} a changé de chaussures. {C} l'a regardé faire sans rien dire.",
  question: "Pourquoi {A} a-t-il changé de chaussures ?",
  options: ["Parce que ses anciennes chaussures étaient abîmées.", "Parce qu'un joueur de l'équipe lui a prêté les siennes.", "Parce que {C} le lui avait demandé avant le match.", "On ne peut pas savoir : il manque une information"],
  bonne: 3, mot: "changé de chaussures", regle: "tir_pas_dit",
  explication: { bonne: "Le texte ne dit pas pourquoi.", cle: "Aucun « parce que » dans le texte.", piege: "Chaque raison est possible, mais aucune n'est écrite." } },

{ id: "tir-1-03", niveau: 1, type: "tir", format: "vrai-faux-nsp",
  consigne: "{C} passe le ballon à {A}. {A} contrôle, regarde le but et tire du pied gauche.",
  question: "Cette phrase est-elle vraie ? « {C} tire du pied gauche. »",
  options: ["Oui", "Non", "On ne peut pas savoir"],
  bonne: 1, mot: "tire du pied gauche", regle: "tir_qui",
  explication: { bonne: "Non : c'est {A} qui tire.", cle: "« Tire » reprend {A}, le dernier joueur nommé.", piege: "{C} donne seulement le ballon." } },

{ id: "tir-1-04", niveau: 1, type: "tir", format: "choix",
  consigne: "{A} regarde le gardien adverse. Le gardien est grand : il garde bien les ballons hauts, mais il est moins sûr sur les ballons au ras du sol.",
  question: "Quelle phrase correspond le mieux au texte ?",
  options: ["Le gardien est petit, mais très rapide.", "Le gardien est sûr sur tous les ballons, hauts comme bas.", "Le gardien est moins sûr sur les ballons au ras du sol.", "Le gardien est moins sûr sur les ballons hauts, plus sûr au sol."],
  bonne: 2, mot: "moins sûr", regle: "detail",
  explication: { bonne: "Il est moins sûr sur les ballons au ras du sol.", cle: "« Moins sûr » : le point faible du gardien.", piege: "Les ballons hauts, il les garde bien." } },

{ id: "tir-1-05", niveau: 1, type: "tir", format: "choix",
  consigne: "À l'entraînement, {A} a tiré dix fois : sept fois à droite et trois fois à gauche. Le gardien a arrêté deux tirs.",
  question: "Quelle phrase correspond le mieux au texte ?",
  options: ["{A} a tiré plus souvent à droite qu'à gauche.", "{A} a tiré plus souvent à gauche qu'à droite.", "Le gardien a tout arrêté.", "On ne peut pas savoir : il manque une information"],
  bonne: 0, mot: "sept fois à droite", regle: "tir_nombre",
  explication: { bonne: "{A} a tiré sept fois à droite, trois fois à gauche.", cle: "Compare les nombres : sept est plus grand que trois.", piege: "Le gardien n'a arrêté que deux tirs sur dix." } },

{ id: "tir-1-06", niveau: 1, type: "tir", format: "choix",
  consigne: "{A} reçoit le ballon sur la gauche. {C} court vers le but, sur la droite. {A} garde le ballon et regarde le but.",
  question: "Quelle phrase correspond le mieux au texte ?",
  options: ["{A} passe le ballon à {C}, sur la droite.", "{A} reçoit le ballon sur la droite.", "{A} reçoit le ballon à gauche et il le garde.", "On ne peut pas savoir : il manque une information"],
  bonne: 2, mot: "sur la gauche", regle: "detail",
  explication: { bonne: "{A} reçoit le ballon à gauche et le garde.", cle: "« Sur la gauche » : c'est {A} qui est à gauche.", piege: "{C} est à droite, et {A} ne lui passe pas le ballon." } },

{ id: "tir-1-07", niveau: 1, type: "tir", format: "barrer",
  consigne: "Hier, à l'entraînement, {A} a tiré deux fois : un tir est passé au-dessus du but, l'autre a touché le poteau. Le gardien n'a pas bougé.",
  question: "Quelles phrases sont vraies ? (Plusieurs réponses possibles.)",
  options: ["{A} a tiré deux fois.", "Un tir a touché le poteau.", "Le gardien a arrêté un tir.", "{A} a marqué un but."],
  bonne: [0, 1], mot: "deux fois", regle: "tir_quantite",
  explication: { bonne: "{A} a tiré deux fois ; un tir a touché le poteau.", cle: "« Deux fois » et « poteau » sont écrits dans le texte.", piege: "Le gardien n'a pas bougé : il n'a rien arrêté." } },

{ id: "tir-1-08", niveau: 1, type: "tir", format: "vrai-faux-nsp",
  consigne: "{A} met son maillot. Dehors, les supporters chantent. {C} attache ses lacets.",
  question: "Cette phrase est-elle vraie ? « {C} est nerveux avant le match. »",
  options: ["Oui", "Non", "On ne peut pas savoir"],
  bonne: 2, mot: "attache ses lacets", regle: "tir_pas_dit",
  explication: { bonne: "Le texte ne dit pas ce que ressent {C}.", cle: "Attacher ses lacets ne dit pas s'il est nerveux.", piege: "On peut l'imaginer, mais ce n'est pas écrit." } },

/* ---------------- NIVEAU 2 : un seul élément change (qui, combien, pourquoi, « il ») ---------------- */

{ id: "tir-2-01", niveau: 2, type: "tir", format: "choix",
  consigne: "{A} frappe du pied droit. Le ballon touche la barre, puis retombe devant le but. {C} le reprend de la tête.",
  question: "Quelle phrase correspond le mieux au texte ?",
  options: ["{A} frappe du pied gauche, et le ballon touche la barre.", "{A} frappe du pied droit, et le ballon touche le poteau gauche.", "{A} frappe du pied droit, et {C} reprend le ballon de la tête.", "{A} frappe du pied droit, et le ballon entre dans le but."],
  bonne: 2, mot: "du pied droit", regle: "tir_collage",
  explication: { bonne: "{A} frappe du pied droit et {C} reprend de la tête.", cle: "Compare mot à mot : un seul mot change à chaque choix.", piege: "La barre n'est pas le poteau, et le ballon n'entre pas." } },

{ id: "tir-2-02", niveau: 2, type: "tir", format: "choix",
  consigne: "{A} donne le ballon à {C}. Il le rend à {A} aussitôt, puis {A} arme sa frappe.",
  question: "Qui rend le ballon à {A} ?",
  options: ["{C}", "{A}", "{D}", "{X}"],
  bonne: 0, mot: "Il le rend", regle: "tir_qui",
  explication: { bonne: "{C} rend le ballon à {A}.", cle: "« Il » reprend {C}, qui vient de le recevoir.", piege: "{A} ne peut pas se rendre le ballon à lui-même." } },

{ id: "tir-2-03", niveau: 2, type: "tir", format: "vrai-faux-nsp",
  consigne: "À l'entraînement, {A} a tiré trois fois du pied droit et deux fois du pied gauche.",
  question: "Cette phrase est-elle vraie ? « {A} a tiré cinq fois à l'entraînement. »",
  options: ["Oui", "Non", "On ne peut pas savoir"],
  bonne: 0, mot: "trois fois", regle: "tir_nombre",
  explication: { bonne: "Oui : trois tirs et deux tirs, cinq tirs en tout.", cle: "Additionne les deux nombres : 3 + 2 = 5.", piege: "Ne retiens pas un seul pied : compte les deux." } },

{ id: "tir-2-04", niveau: 2, type: "tir", format: "choix",
  consigne: "{C} est tombé en tirant. {A} lui a tendu la main.",
  question: "Pourquoi {C} est-il tombé ?",
  options: ["Parce que {A} l'a poussé par-derrière dans le dos.", "Parce qu'un défenseur l'a taclé au moment du tir.", "Parce que le terrain glissait sous ses pieds.", "On ne peut pas savoir : il manque une information"],
  bonne: 3, mot: "est tombé", regle: "tir_pas_dit",
  explication: { bonne: "Le texte ne dit pas pourquoi {C} est tombé.", cle: "Aucune cause n'est écrite dans le texte.", piege: "Chaque cause est possible, mais aucune n'est écrite." } },

{ id: "tir-2-05", niveau: 2, type: "tir", format: "choix",
  consigne: "{A} lève les bras vers le ciel et tape dans la main de {C}. Derrière le but, le gardien frappe le sol du poing.",
  question: "Quelle phrase correspond le mieux au texte ?",
  options: ["{A} a manqué son tir, car le gardien était bien placé.", "Le gardien a arrêté le ballon avec les deux mains.", "{A} a probablement marqué un but pour son équipe.", "{C} a reçu un carton jaune de l'arbitre à cet instant."],
  bonne: 2, mot: "lève les bras", regle: "inference",
  explication: { bonne: "{A} a probablement marqué : il est heureux, le gardien est déçu.", cle: "Bras levés d'un côté, poing sur le sol de l'autre.", piege: "Le texte ne parle ni d'un tir manqué, ni d'un carton." } },

{ id: "tir-2-06", niveau: 2, type: "tir", format: "vrai-faux-nsp",
  consigne: "{C} a tiré fort, mais un défenseur a dévié le ballon en corner. {A} a regardé {D} tirer le corner.",
  question: "Cette phrase est-elle vraie ? « {D} a tiré le corner du côté droit. »",
  options: ["Oui", "Non", "On ne peut pas savoir"],
  bonne: 2, mot: "tirer le corner", regle: "tir_pas_dit",
  explication: { bonne: "Le texte ne dit pas de quel côté.", cle: "« Tirer le corner » : aucun côté n'est écrit.", piege: "Droite ou gauche : les deux sont possibles." } },

{ id: "tir-2-07", niveau: 2, type: "tir", format: "barrer",
  consigne: "Hier, {A} et {C} ont tiré chacun deux fois au but. {A} a marqué une fois. {C} n'a pas marqué.",
  question: "Quelles phrases sont vraies ? (Plusieurs réponses possibles.)",
  options: ["{A} a tiré deux fois.", "{C} a marqué une fois.", "{C} n'a pas marqué.", "{A} n'a pas marqué."],
  bonne: [0, 2], mot: "chacun", regle: "tir_quantite",
  explication: { bonne: "{A} a tiré deux fois ; {C} n'a pas marqué.", cle: "« Chacun » : deux tirs pour {A}, deux pour {C}.", piege: "{A} a marqué une fois, et {C} aucune." } },

{ id: "tir-2-08", niveau: 2, type: "tir", format: "choix",
  consigne: "{A} court plus vite que {C}, mais {C} tire plus fort que {A}. {D} court moins vite que {C}.",
  question: "Qui est le plus rapide des trois ?",
  options: ["{C}", "{A}", "{D}", "On ne peut pas savoir : il manque une information"],
  bonne: 1, mot: "plus vite", regle: "tir_comparaison",
  explication: { bonne: "{A} bat {C}, et {C} bat {D} : {A} est le plus rapide.", cle: "« Plus vite que » : compare deux joueurs à la fois.", piege: "{C} tire plus fort : ce n'est pas courir plus vite." } },

/* ---------------- NIVEAU 3 : l'ordre (puis, avant, pendant que, comme) ---------------- */

{ id: "tir-3-01", niveau: 3, type: "tir", format: "choix",
  consigne: "Avant de tirer, {A} a regardé le gardien, puis il a fait une feinte vers la droite. Ensuite, il a frappé à gauche.",
  question: "Quelle phrase correspond le mieux au texte ?",
  options: ["{A} a frappé à droite, puis il a feinté à gauche.", "{A} a regardé le gardien, a feinté à droite, puis a frappé à gauche.", "{A} a feinté à droite, puis il a regardé le gardien et frappé à gauche.", "{A} a regardé le gardien, a feinté à gauche, puis a frappé à droite."],
  bonne: 1, mot: "Ensuite", regle: "tir_ordre",
  explication: { bonne: "Il regarde, il feinte à droite, puis il frappe à gauche.", cle: "« Puis » et « ensuite » donnent l'ordre.", piege: "Inverser deux actions ou deux côtés change tout." } },

{ id: "tir-3-02", niveau: 3, type: "tir", format: "choix",
  consigne: "Pendant que {C} retenait le défenseur, {A} s'est démarqué. {D} lui a alors passé le ballon, et {A} a tiré.",
  question: "Qui a passé le ballon à {A} ?",
  options: ["{D}", "{C}", "{X}", "On ne peut pas savoir : il manque une information"],
  bonne: 0, mot: "alors passé", regle: "tir_pendant",
  explication: { bonne: "{D} a passé le ballon à {A}.", cle: "« Lui » reprend {A} : {D} lui passe le ballon.", piege: "{C} retenait le défenseur : il n'a pas passé le ballon." } },

{ id: "tir-3-03", niveau: 3, type: "tir", format: "vrai-faux-nsp",
  consigne: "Comme {A} était seul devant le but, il a pris son temps. Puis {C} a crié : « Tire ! » Alors seulement {A} a frappé.",
  question: "Cette phrase est-elle vraie ? « {A} a tiré avant que {C} crie. »",
  options: ["Oui", "Non", "On ne peut pas savoir"],
  bonne: 1, mot: "Alors seulement", regle: "tir_ordre",
  explication: { bonne: "Non : {A} a frappé après le cri de {C}.", cle: "« Alors seulement » : le tir vient après le cri.", piege: "{A} a d'abord pris son temps, puis il a tiré." } },

{ id: "tir-3-04", niveau: 3, type: "tir", format: "vrai-faux-nsp",
  consigne: "Hier, {A} a tiré un penalty. Le gardien a plongé à gauche. Après son plongeon, le ballon est entré à droite.",
  question: "Cette phrase est-elle vraie ? « Le ballon est entré du côté opposé au plongeon du gardien. »",
  options: ["Oui", "Non", "On ne peut pas savoir"],
  bonne: 0, mot: "Après son plongeon", regle: "tir_ordre",
  explication: { bonne: "Oui : plongeon à gauche, ballon à droite.", cle: "« Après son plongeon » : le but arrive ensuite.", piege: "Le gardien n'a rien arrêté : le ballon est entré." } },

{ id: "tir-3-05", niveau: 3, type: "tir", format: "choix",
  consigne: "Comme le terrain était sec, le ballon roulait vite. {A} a donc préparé un tir tendu, ras du sol.",
  question: "Pourquoi {A} a-t-il préparé un tir ras du sol ?",
  options: ["Parce que le ballon roulait vite sur le terrain sec.", "Parce que le gardien adverse était beaucoup trop petit.", "Parce que le terrain était mouillé et glissant.", "Parce que {C} lui avait demandé un tir bien fort."],
  bonne: 0, mot: "Comme", regle: "tir_cause",
  explication: { bonne: "Le terrain sec fait rouler le ballon vite.", cle: "« Comme » donne la cause, avant la conséquence.", piege: "Le texte ne parle ni du gardien, ni de la pluie, ni de {C}." } },

{ id: "tir-3-06", niveau: 3, type: "tir", format: "choix",
  consigne: "{A} a fait un grand pas en arrière avant de tirer. Le ballon a filé au-dessus de la barre. {C} s'est pris la tête dans les mains.",
  question: "Qu'a fait {A} juste après son tir ?",
  options: ["Il s'est pris la tête dans les mains, déçu.", "Il a levé les bras vers les supporters, content.", "Il a couru vers le gardien pour lui parler.", "On ne peut pas savoir : il manque une information"],
  bonne: 3, mot: "s'est pris la tête", regle: "tir_qui",
  explication: { bonne: "Le texte ne dit pas ce que fait {A} après.", cle: "« S'est pris la tête » parle de {C}, pas de {A}.", piege: "Ne mélange pas les deux joueurs : ce geste est celui de {C}." } },

{ id: "tir-3-07", niveau: 3, type: "tir", format: "choix",
  consigne: "Avant chaque match, {A} fait trois choses : il s'étire, puis il boit de l'eau, et enfin il tire cinq ballons au but.",
  question: "Que fait {A} juste après avoir bu ?",
  options: ["Il s'étire de nouveau, tranquillement.", "Il boit encore un peu d'eau.", "Il rentre au vestiaire sans rien dire.", "Il tire cinq ballons au but."],
  bonne: 3, mot: "enfin", regle: "tir_ordre",
  explication: { bonne: "Il tire cinq ballons au but.", cle: "« Enfin » : c'est la dernière chose, après avoir bu.", piege: "S'étirer vient avant : « puis » le dit." } },

{ id: "tir-3-08", niveau: 3, type: "tir", format: "barrer",
  consigne: "{D} a passé le ballon à {C}. Ensuite, {C} l'a donné à {A}, qui a tiré aussitôt.",
  question: "Quelles phrases sont vraies ? (Plusieurs réponses possibles.)",
  options: ["{C} a reçu le ballon de {D}.", "{A} a donné le ballon à {C}.", "{A} a tiré après avoir reçu le ballon de {C}.", "{D} a tiré le premier."],
  bonne: [0, 2], mot: "Ensuite", regle: "tir_ordre",
  explication: { bonne: "{D} passe à {C}, puis {C} passe à {A}, qui tire.", cle: "« Ensuite » : la deuxième passe vient après la première.", piege: "{A} ne passe à personne : il reçoit, puis il tire." } },

/* ---------------- NIVEAU 4 : négation et quantités (documents scolaires et textes de foot) ---------------- */

{ id: "tir-4-01", niveau: 4, type: "tir", format: "choix", tags: ["ecole"],
  consigne: "Règlement du collège : aucun élève ne doit courir dans le couloir. Personne n'entre dans la salle avant le professeur. {A} est dans le couloir, devant la salle de classe.",
  question: "Quelle phrase montre que {A} respecte le règlement ?",
  options: ["{A} court dans le couloir pour arriver avant {C}.", "{A} marche calmement, puis il entre dans la salle vide.", "{A} entre dans la salle avant l'arrivée du professeur.", "{A} marche et attend le professeur devant la salle."],
  bonne: 3, mot: "Personne n'entre", regle: "tir_negation",
  explication: { bonne: "{A} marche et attend le professeur.", cle: "« Aucun » et « personne » : ces deux choses sont interdites.", piege: "Entrer avant le professeur est interdit, même sans courir." } },

{ id: "tir-4-02", niveau: 4, type: "tir", format: "choix", tags: ["ecole"],
  consigne: "Problème de maths : dans la classe de {A}, vingt-six élèves sont présents. Trois élèves sont absents. Personne d'autre n'est inscrit.",
  question: "Combien d'élèves y a-t-il dans la classe en tout ?",
  options: ["23", "26", "29", "30"],
  bonne: 2, mot: "sont absents", regle: "tir_nombre",
  explication: { bonne: "26 présents + 3 absents = 29 élèves.", cle: "« En tout » : on additionne présents et absents.", piege: "23 vient d'une soustraction : on ne retire pas les absents." } },

{ id: "tir-4-03", niveau: 4, type: "tir", format: "vrai-faux-nsp", tags: ["ecole"],
  consigne: "En SVT, {A} lit : « Une plante verte a besoin de lumière, d'eau et d'air. Sans lumière, elle jaunit. » {A} a mis sa plante dans un placard fermé pendant dix jours.",
  question: "Cette phrase est-elle vraie ? « La plante de {A} a manqué d'eau. »",
  options: ["Oui", "Non", "On ne peut pas savoir"],
  bonne: 2, mot: "Sans lumière", regle: "tir_pas_dit",
  explication: { bonne: "On ne sait pas si {A} l'a arrosée.", cle: "Le placard fermé prive de lumière, pas forcément d'eau.", piege: "Seul le manque de lumière est sûr ; l'eau n'est pas citée." } },

{ id: "tir-4-04", niveau: 4, type: "tir", format: "choix", tags: ["ecole"],
  consigne: "Sortie scolaire au musée. Sur le panneau : « Entrée gratuite pour les moins de 12 ans. Aucune visite sans guide. » {A} a 12 ans.",
  question: "Quelle phrase est vraie ?",
  options: ["{A} entre gratuitement dans le musée.", "{A} visite le musée sans guide, avec sa classe.", "{A} n'a pas le droit d'entrer dans le musée.", "{A} paie l'entrée et visite avec un guide."],
  bonne: 3, mot: "moins de 12 ans", regle: "tir_exclu",
  explication: { bonne: "{A} a 12 ans : ce n'est pas « moins de 12 ans ».", cle: "« Moins de 12 ans » ne compte pas les 12 ans.", piege: "Gratuit seulement avant 12 ans ; le guide est obligatoire." } },

{ id: "tir-4-05", niveau: 4, type: "tir", format: "barrer", tags: ["ecole"],
  consigne: "Atelier cuisine, recette des crêpes : « Mélange la farine et les œufs. Ajoute du lait, pas d'eau. Ne mets aucun sucre dans la pâte. Laisse-la reposer une heure. » {A} suit la recette.",
  question: "Quelles phrases sont vraies ? (Plusieurs réponses possibles.)",
  options: ["{A} ajoute du lait.", "{A} ajoute de l'eau.", "{A} met du sucre dans la pâte.", "{A} laisse reposer la pâte."],
  bonne: [0, 3], mot: "aucun sucre", regle: "tir_negation",
  explication: { bonne: "Il ajoute du lait et laisse reposer la pâte.", cle: "« Pas d'eau » et « aucun sucre » : à ne pas faire.", piege: "L'eau et le sucre sont interdits dans cette recette." } },

{ id: "tir-4-06", niveau: 4, type: "tir", format: "choix",
  consigne: "{A} n'a marqué aucun but depuis trois matchs. Pourtant, il n'a jamais cessé de tirer : hier, il a tiré cinq fois. {C}, lui, n'a tiré qu'une fois hier.",
  question: "Quelle phrase correspond le mieux au texte ?",
  options: ["{A} a marqué hier.", "{A} a cessé de tirer.", "{A} a tiré plus souvent que {C} hier.", "On ne peut pas savoir : il manque une information"],
  bonne: 2, mot: "n'a tiré qu'une fois", regle: "tir_ne_que",
  explication: { bonne: "{A} a tiré cinq fois, {C} une seule fois.", cle: "« N'… qu' » veut dire seulement.", piege: "Aucun but depuis trois matchs : {A} n'a pas marqué hier." } },

{ id: "tir-4-07", niveau: 4, type: "tir", format: "choix",
  consigne: "Trois attaquants, {A}, {C} et {D}, ont tiré une fois chacun. Un seul tir a fini dans le but. Le gardien a arrêté un autre tir, et le troisième est passé à côté.",
  question: "Quelle phrase correspond le mieux au texte ?",
  options: ["Les trois tirs ont fini dans le but.", "Le gardien a arrêté un seul tir.", "Deux joueurs ont marqué.", "On ne peut pas savoir : il manque une information"],
  bonne: 1, mot: "Un seul tir", regle: "tir_quantite",
  explication: { bonne: "Un but, un tir arrêté, un tir à côté.", cle: "« Un seul tir » est un but ; « un autre » est arrêté.", piege: "Trois tirs, mais un seul but : pas deux buts." } },

{ id: "tir-4-08", niveau: 4, type: "tir", format: "vrai-faux-nsp",
  consigne: "{A} ne tire jamais du pied gauche, et {C} ne tire jamais de la tête. Hier, {A} a tiré trois fois, toutes du pied droit.",
  question: "Cette phrase est-elle vraie ? « Hier, {A} a tiré de la tête. »",
  options: ["Oui", "Non", "On ne peut pas savoir"],
  bonne: 1, mot: "toutes du pied droit", regle: "tir_quantite",
  explication: { bonne: "Non : ses trois tirs étaient du pied droit.", cle: "« Toutes » : aucun tir d'une autre sorte.", piege: "« Jamais de la tête » concerne {C}, pas {A}." } },

/* ---------------- NIVEAU 5 : conditions et exceptions (documents scolaires et textes de foot) ---------------- */

{ id: "tir-5-01", niveau: 5, type: "tir", format: "choix", tags: ["ecole"],
  consigne: "Règlement du CDI : on peut emprunter trois livres à la fois. Un dictionnaire ne s'emprunte pas, sauf avec l'accord de la documentaliste. {A} a l'accord de la documentaliste.",
  question: "{A} veut emprunter un dictionnaire et deux romans. Que peut-il faire ?",
  options: ["Il emprunte seulement les deux romans.", "Il emprunte les trois livres.", "Il emprunte le dictionnaire, mais un seul roman.", "Il n'emprunte rien aujourd'hui."],
  bonne: 1, mot: "sauf avec l'accord", regle: "tir_sauf",
  explication: { bonne: "Il a l'accord : dictionnaire et deux romans, c'est trois livres.", cle: "« Sauf avec l'accord » : avec l'accord, c'est permis.", piege: "Trois livres à la fois : la limite est atteinte, pas dépassée." } },

{ id: "tir-5-02", niveau: 5, type: "tir", format: "choix", tags: ["ecole"],
  consigne: "Programme de calcul : « Choisis un nombre. S'il est plus grand que 10, enlève 4. Sinon, multiplie-le par 2. » {A} choisit 7.",
  question: "Quel résultat {A} obtient-il ?",
  options: ["14", "3", "11", "28"],
  bonne: 0, mot: "Sinon", regle: "tir_condition",
  explication: { bonne: "7 n'est pas plus grand que 10 : 7 × 2 = 14.", cle: "« Sinon » : la condition est fausse, on multiplie.", piege: "Enlever 4 est pour les nombres plus grands que 10." } },

{ id: "tir-5-03", niveau: 5, type: "tir", format: "choix", tags: ["ecole"],
  consigne: "Expérience de physique : « Quand l'eau atteint 100 °C, elle bout. Tant que la température reste inférieure à 100 °C, elle ne bout pas. » Après cinq minutes, le thermomètre de {A} indique 85 °C.",
  question: "Que peut écrire {A} dans son cahier ?",
  options: ["L'eau est en train de bouillir.", "L'eau ne bout pas encore.", "L'eau a déjà atteint 100 °C.", "L'eau est devenue complètement froide."],
  bonne: 1, mot: "Tant que", regle: "tir_tantque",
  explication: { bonne: "85 °C est inférieur à 100 °C : elle ne bout pas.", cle: "« Tant que » : sous 100 °C, pas d'ébullition.", piege: "Elle bout seulement quand elle atteint 100 °C." } },

{ id: "tir-5-04", niveau: 5, type: "tir", format: "choix", tags: ["ecole"],
  consigne: "Sortie scolaire : « Le car part à 8 h, sauf s'il pleut : dans ce cas, il part à 9 h. » Le matin de la sortie, {A} prépare son sac.",
  question: "À quelle heure le car part-il ?",
  options: ["À 8 h.", "À 9 h.", "À 8 h 30.", "On ne peut pas savoir : il manque une information"],
  bonne: 3, mot: "sauf s'il pleut", regle: "tir_inconnu",
  explication: { bonne: "On ne sait pas s'il pleut ce matin-là.", cle: "« Sauf s'il pleut » : l'heure dépend de la météo.", piege: "Choisir 8 h ou 9 h, c'est deviner le temps." } },

{ id: "tir-5-05", niveau: 5, type: "tir", format: "barrer", tags: ["ecole"],
  consigne: "Mot de la vie scolaire : « Les élèves qui ont sport ce matin viennent en tenue de sport. Les autres viennent en tenue normale, à moins d'avoir un mot du professeur. » {A} a sport ce matin. {C} n'a pas sport et n'a pas de mot du professeur.",
  question: "Quelles phrases sont vraies ? (Plusieurs réponses possibles.)",
  options: ["{A} vient en tenue de sport.", "{C} vient en tenue de sport.", "{C} vient en tenue normale.", "{A} vient en tenue normale."],
  bonne: [0, 2], mot: "à moins d'avoir un mot", regle: "tir_amoinsque",
  explication: { bonne: "{A} vient en tenue de sport, {C} en tenue normale.", cle: "{C} n'a pas de mot : l'exception ne s'applique pas.", piege: "{A} a sport ; {C} n'a ni sport ni mot." } },

{ id: "tir-5-06", niveau: 5, type: "tir", format: "choix",
  consigne: "Le coach a dit à {A} : « Si le gardien est avancé, tente le lob. Sinon, frappe au ras du sol. » Le gardien est resté sur sa ligne.",
  question: "Que doit tenter {A} ?",
  options: ["Une frappe au ras du sol.", "Le lob.", "Une passe à {C}.", "On ne peut pas savoir : il manque une information"],
  bonne: 0, mot: "Sinon", regle: "tir_condition",
  explication: { bonne: "Une frappe au ras du sol.", cle: "« Sinon » : le gardien n'est pas avancé.", piege: "Le lob est pour un gardien avancé." } },

{ id: "tir-5-07", niveau: 5, type: "tir", format: "vrai-faux-nsp",
  consigne: "Le coach a dit : « Les joueurs qui ont tiré au moins deux fois à l'entraînement joueront dimanche, à moins d'être blessés. » {A} a tiré trois fois. {C} a tiré une fois.",
  question: "Cette phrase est-elle vraie ? « {A} jouera dimanche. »",
  options: ["Oui", "Non", "On ne peut pas savoir"],
  bonne: 2, mot: "à moins d'être blessés", regle: "tir_inconnu",
  explication: { bonne: "On ne sait pas si {A} est blessé.", cle: "« À moins d'être blessés » : une blessure change tout.", piege: "Trois tirs suffisent, mais la blessure n'est pas exclue." } },

{ id: "tir-5-08", niveau: 5, type: "tir", format: "vrai-faux-nsp", tags: ["ecole"],
  consigne: "Fiche d'EPS : « Le saut en longueur est validé à partir de 3 mètres, même si le pied touche la planche. Si le pied dépasse la planche, le saut ne compte pas. » {A} a sauté 3 m 20, le pied sur la planche.",
  question: "Cette phrase est-elle vraie ? « Le saut de {A} est validé. »",
  options: ["Oui", "Non", "On ne peut pas savoir"],
  bonne: 0, mot: "même si", regle: "tir_meme_si",
  explication: { bonne: "Oui : plus de 3 m, et le pied ne dépasse pas.", cle: "« Même si » : toucher la planche n'annule pas le saut.", piege: "Seul un pied qui dépasse la planche annule le saut." } }

]);
