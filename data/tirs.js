/* ============================================================
   BANQUE DE TIRS (chantier 7) : petits textes à lire avant de tirer, type « tir ».
   60 questions : 12 par niveau (1 à 5), réécrites au chantier 9c (textes de 22 à 75 mots selon le niveau). Format : voir 04-QUESTIONS.md. Règles du carnet : data/regles-tirs.js.
   Remplace data/provisoire.js (supprimé).

   Principe : le texte (champ `consigne`) fait 2 à 5 phrases ; une bonne réponse ne dit jamais plus que le texte ;
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

/* ---------------- NIVEAU 1 : deux informations à tenir (22 à 32 mots) ---------------- */

{ id: "tir-1-01", niveau: 1, type: "tir", format: "choix",
  consigne: "{A} est à dix mètres du but. Le gardien est sorti en courant vers lui. {C}, seul sur la droite, lève le bras pour réclamer le ballon, mais {A} ne le voit pas.",
  question: "Quelle phrase correspond le mieux au texte ?",
  options: ["Le gardien est resté sur sa ligne, devant le but.", "Le gardien est sorti, et {C} est libre sur la droite.", "{C} est entouré de défenseurs sur la droite du terrain.", "{A} est à cinquante mètres du but et voit {C}."],
  bonne: 1, mot: "seul sur la droite", regle: "tir_collage",
  explication: { bonne: "Le gardien est sorti, et {C} est libre.", cle: "« Seul » : aucun adversaire près de {C}.", piege: "{A} est à dix mètres et ne voit pas {C}." } },

{ id: "tir-1-02", niveau: 1, type: "tir", format: "choix",
  consigne: "Avant le match, {A} a changé de chaussures. {C} l'a regardé faire sans rien dire, puis il est allé chercher un ballon dans le sac. Dehors, les supporters arrivent.",
  question: "Pourquoi {A} a-t-il changé de chaussures ?",
  options: ["Parce que ses anciennes chaussures étaient abîmées.", "Parce qu'un joueur de l'équipe lui a prêté les siennes.", "Parce que {C} le lui avait demandé avant le match.", "On ne peut pas savoir : il manque une information"],
  bonne: 3, mot: "changé de chaussures", regle: "tir_pas_dit",
  explication: { bonne: "Le texte ne dit pas pourquoi.", cle: "Aucun « parce que » dans le texte.", piege: "Chaque raison est possible, mais aucune n'est écrite." } },

{ id: "tir-1-03", niveau: 1, type: "tir", format: "vrai-faux-nsp",
  consigne: "{C} passe le ballon à {A}. {A} contrôle, regarde le but et tire du pied gauche. Le gardien, lui, reste immobile sur sa ligne, les bras écartés.",
  question: "Cette phrase est-elle vraie ? « {C} tire du pied gauche. »",
  options: ["Oui", "Non", "On ne peut pas savoir"],
  bonne: 1, mot: "tire du pied gauche", regle: "tir_qui",
  explication: { bonne: "Non : c'est {A} qui tire.", cle: "« Tire » reprend {A}, le dernier joueur nommé.", piege: "{C} donne seulement le ballon." } },

{ id: "tir-1-04", niveau: 1, type: "tir", format: "choix",
  consigne: "{A} regarde le gardien adverse. Le gardien est grand : il garde bien les ballons hauts, mais il est moins sûr sur les ballons au ras du sol. {C} le remarque aussi.",
  question: "Quelle phrase correspond le mieux au texte ?",
  options: ["Le gardien est petit, mais très rapide.", "Le gardien est sûr sur tous les ballons, hauts comme bas.", "Le gardien est moins sûr sur les ballons au ras du sol.", "Le gardien est moins sûr sur les ballons hauts, plus sûr au sol."],
  bonne: 2, mot: "moins sûr", regle: "detail",
  explication: { bonne: "Il est moins sûr sur les ballons au ras du sol.", cle: "« Moins sûr » : le point faible du gardien.", piege: "Les ballons hauts, il les garde bien." } },

{ id: "tir-1-05", niveau: 1, type: "tir", format: "choix",
  consigne: "À l'entraînement, {A} a tiré dix fois : sept fois à droite et trois fois à gauche. Le gardien a arrêté deux tirs, et {C} a ramassé tous les ballons derrière le but.",
  question: "Quelle phrase correspond le mieux au texte ?",
  options: ["{A} a tiré plus souvent à droite qu'à gauche.", "{A} a tiré plus souvent à gauche qu'à droite.", "Le gardien a tout arrêté.", "On ne peut pas savoir : il manque une information"],
  bonne: 0, mot: "sept fois à droite", regle: "tir_nombre",
  explication: { bonne: "{A} a tiré sept fois à droite, trois fois à gauche.", cle: "Compare les nombres : sept est plus grand que trois.", piege: "Le gardien n'a arrêté que deux tirs sur dix." } },

{ id: "tir-1-06", niveau: 1, type: "tir", format: "choix",
  consigne: "{A} reçoit le ballon sur la gauche. {C} court vers le but, sur la droite. {A} garde le ballon, regarde le but, puis il avance de deux pas.",
  question: "Quelle phrase correspond le mieux au texte ?",
  options: ["{A} passe le ballon à {C}, sur la droite.", "{A} reçoit le ballon sur la droite.", "{A} reçoit le ballon à gauche et il le garde.", "On ne peut pas savoir : il manque une information"],
  bonne: 2, mot: "sur la gauche", regle: "detail",
  explication: { bonne: "{A} reçoit le ballon à gauche et le garde.", cle: "« Sur la gauche » : c'est {A} qui est à gauche.", piege: "{C} est à droite, et {A} ne lui passe pas le ballon." } },

{ id: "tir-1-07", niveau: 1, type: "tir", format: "barrer",
  consigne: "Hier, à l'entraînement, {A} a tiré deux fois : un tir est passé au-dessus du but, l'autre a touché le poteau. Le gardien n'a pas bougé, et {C} a rigolé.",
  question: "Quelles phrases sont vraies ? (Plusieurs réponses possibles.)",
  options: ["{A} a tiré deux fois.", "Un tir a touché le poteau.", "Le gardien a arrêté un tir.", "{A} a marqué un but."],
  bonne: [0, 1], mot: "deux fois", regle: "tir_quantite",
  explication: { bonne: "{A} a tiré deux fois ; un tir a touché le poteau.", cle: "« Deux fois » et « poteau » sont écrits dans le texte.", piege: "Le gardien n'a pas bougé : il n'a rien arrêté." } },

{ id: "tir-1-08", niveau: 1, type: "tir", format: "vrai-faux-nsp",
  consigne: "{A} met son maillot. Dehors, les supporters chantent. {C} attache ses lacets en silence, puis il boit un grand verre d'eau avant de sortir du vestiaire.",
  question: "Cette phrase est-elle vraie ? « {C} est nerveux avant le match. »",
  options: ["Oui", "Non", "On ne peut pas savoir"],
  bonne: 2, mot: "attache ses lacets", regle: "tir_pas_dit",
  explication: { bonne: "Le texte ne dit pas ce que ressent {C}.", cle: "Attacher ses lacets ne dit pas s'il est nerveux.", piege: "On peut l'imaginer, mais ce n'est pas écrit." } },

{ id: "tir-1-09", niveau: 1, type: "tir", format: "choix",
  consigne: "{A} frappe fort du pied droit. Le ballon passe à côté du poteau gauche. Le gardien ne bouge pas, et {C} baisse la tête en soupirant.",
  question: "Où passe le ballon ?",
  options: ["Au-dessus de la barre", "À côté du poteau gauche", "Dans le but", "Dans les mains du gardien"],
  bonne: 1, mot: "poteau gauche", regle: "tir_collage",
  explication: { bonne: "Le ballon passe à côté du poteau gauche.", cle: "Cherche le mot « poteau » : il donne l'endroit.", piege: "Le gardien ne bouge pas : il n'arrête rien." } },

{ id: "tir-1-10", niveau: 1, type: "tir", format: "vrai-faux-nsp",
  consigne: "{A} va tirer un coup franc. Le mur compte quatre joueurs, et le gardien se place à droite du mur. {C} reste près du ballon, les bras croisés.",
  question: "Cette phrase est-elle vraie ? « Le mur compte quatre joueurs. »",
  options: ["Oui", "Non", "On ne peut pas savoir"],
  bonne: 0, mot: "quatre joueurs", regle: "tir_nombre",
  explication: { bonne: "Oui : le mur compte quatre joueurs.", cle: "Le nombre est écrit dans le texte.", piege: "Le gardien est à droite du mur, pas dans le mur." } },

{ id: "tir-1-11", niveau: 1, type: "tir", format: "choix",
  consigne: "{C} donne le ballon à {A}, qui est à l'entrée de la surface. {A} tire tout de suite. Le gardien plonge à droite, mais le ballon part à gauche.",
  question: "De quel côté le gardien plonge-t-il ?",
  options: ["À gauche", "À droite", "Il ne plonge pas", "On ne peut pas savoir : il manque une information"],
  bonne: 1, mot: "plonge à droite", regle: "tir_collage",
  explication: { bonne: "Le gardien plonge à droite.", cle: "Ne mélange pas le gardien et le ballon.", piege: "À gauche, c'est le côté du ballon." } },

{ id: "tir-1-12", niveau: 1, type: "tir", format: "barrer",
  consigne: "{A} tire trois fois pendant l'échauffement. Le premier tir est bloqué, le deuxième est dévié, et le troisième entre dans le but, sous les cris de {C}.",
  question: "Quelles phrases sont vraies ? (Plusieurs réponses possibles.)",
  options: ["Le premier tir est bloqué.", "Le deuxième tir entre dans le but.", "Le troisième tir entre dans le but.", "{C} tire le troisième ballon."],
  bonne: [0, 2], mot: "le troisième entre", regle: "tir_quantite",
  explication: { bonne: "Le premier est bloqué, le troisième entre.", cle: "Suis l'ordre : premier, deuxième, troisième.", piege: "Le deuxième est dévié ; {C} crie, il ne tire pas." } },

/* ---------------- NIVEAU 2 : un seul élément change (qui, combien, pourquoi, « il ») (30 à 40 mots) ---------------- */

{ id: "tir-2-01", niveau: 2, type: "tir", format: "choix",
  consigne: "{A} frappe du pied droit. Le ballon touche la barre, puis retombe devant le but. {C} le reprend de la tête, mais le gardien, couché au sol, réussit à le repousser du bout du pied.",
  question: "Quelle phrase correspond le mieux au texte ?",
  options: ["{A} frappe du pied gauche, et le ballon touche la barre.", "{A} frappe du pied droit, et le ballon touche le poteau gauche.", "{C} reprend de la tête, et le gardien repousse le ballon du pied.", "{A} frappe du pied droit, et le ballon entre dans le but."],
  bonne: 2, mot: "de la tête", regle: "tir_collage",
  explication: { bonne: "{C} reprend de la tête ; le gardien repousse du pied.", cle: "Compare mot à mot : un seul mot change à chaque choix.", piege: "La barre n'est pas le poteau, et le ballon n'entre pas." } },

{ id: "tir-2-02", niveau: 2, type: "tir", format: "choix",
  consigne: "{A} donne le ballon à {C}. Il le rend à {A} aussitôt, puis {A} arme sa frappe. Pendant ce temps, {D} court vers le but et appelle le ballon à voix haute.",
  question: "Qui rend le ballon à {A} ?",
  options: ["{C}", "{A}", "{D}", "{X}"],
  bonne: 0, mot: "Il le rend", regle: "tir_qui",
  explication: { bonne: "{C} rend le ballon à {A}.", cle: "« Il » reprend {C}, qui vient de le recevoir.", piege: "{D} appelle le ballon, mais il ne l'a pas." } },

{ id: "tir-2-03", niveau: 2, type: "tir", format: "vrai-faux-nsp",
  consigne: "À l'entraînement, {A} a tiré trois fois du pied droit et deux fois du pied gauche. {C} a tiré quatre fois en tout, et {D} a fait les passes sans jamais tirer.",
  question: "Cette phrase est-elle vraie ? « {A} a tiré cinq fois à l'entraînement. »",
  options: ["Oui", "Non", "On ne peut pas savoir"],
  bonne: 0, mot: "trois fois", regle: "tir_nombre",
  explication: { bonne: "Oui : trois tirs et deux tirs, cinq tirs en tout.", cle: "Additionne les deux nombres : 3 + 2 = 5.", piege: "Les quatre tirs sont ceux de {C}, pas de {A}." } },

{ id: "tir-2-04", niveau: 2, type: "tir", format: "choix",
  consigne: "{C} est tombé en tirant. {A} lui a tendu la main pour l'aider à se relever, pendant que le gardien rangeait ses gants et que l'arbitre regardait sa montre.",
  question: "Pourquoi {C} est-il tombé ?",
  options: ["Parce que {A} l'a poussé par-derrière dans le dos.", "Parce qu'un défenseur l'a taclé au moment du tir.", "Parce que le terrain glissait sous ses pieds.", "On ne peut pas savoir : il manque une information"],
  bonne: 3, mot: "est tombé", regle: "tir_pas_dit",
  explication: { bonne: "Le texte ne dit pas pourquoi {C} est tombé.", cle: "Aucune cause n'est écrite dans le texte.", piege: "Chaque cause est possible, mais aucune n'est écrite." } },

{ id: "tir-2-05", niveau: 2, type: "tir", format: "choix",
  consigne: "{A} lève les bras vers le ciel et tape dans la main de {C}. Derrière le but, le gardien frappe le sol du poing. Les supporters adverses se taisent, la tête basse.",
  question: "Quelle phrase correspond le mieux au texte ?",
  options: ["{A} a manqué son tir, car le gardien était bien placé.", "Le gardien a arrêté le ballon avec les deux mains.", "{A} a probablement marqué un but pour son équipe.", "{C} a reçu un carton jaune de l'arbitre à cet instant."],
  bonne: 2, mot: "lève les bras", regle: "inference",
  explication: { bonne: "{A} a probablement marqué : il est heureux, le gardien est déçu.", cle: "Bras levés d'un côté, poing sur le sol de l'autre.", piege: "Le texte ne parle ni d'un tir manqué, ni d'un carton." } },

{ id: "tir-2-06", niveau: 2, type: "tir", format: "vrai-faux-nsp",
  consigne: "{C} a tiré fort, mais un défenseur a dévié le ballon en corner. {A} a regardé {D} tirer le corner, puis il s'est placé au premier poteau avec deux défenseurs.",
  question: "Cette phrase est-elle vraie ? « {D} a tiré le corner du côté droit. »",
  options: ["Oui", "Non", "On ne peut pas savoir"],
  bonne: 2, mot: "tirer le corner", regle: "tir_pas_dit",
  explication: { bonne: "Le texte ne dit pas de quel côté.", cle: "« Tirer le corner » : aucun côté n'est écrit.", piege: "Droite ou gauche : les deux sont possibles." } },

{ id: "tir-2-07", niveau: 2, type: "tir", format: "barrer",
  consigne: "Hier, {A} et {C} ont tiré chacun deux fois au but. {A} a marqué une fois. {C} n'a pas marqué, mais il a touché le poteau avec son deuxième tir.",
  question: "Quelles phrases sont vraies ? (Plusieurs réponses possibles.)",
  options: ["{A} a tiré deux fois.", "{C} a marqué une fois.", "{C} n'a pas marqué.", "{A} n'a pas marqué."],
  bonne: [0, 2], mot: "chacun", regle: "tir_quantite",
  explication: { bonne: "{A} a tiré deux fois ; {C} n'a pas marqué.", cle: "« Chacun » : deux tirs pour {A}, deux pour {C}.", piege: "{A} a marqué une fois, et {C} aucune." } },

{ id: "tir-2-08", niveau: 2, type: "tir", format: "choix",
  consigne: "{A} court plus vite que {C}, mais {C} tire plus fort que {A}. {D} court moins vite que {C}, et il tire moins fort que {A}. Le coach les regarde tous les trois.",
  question: "Qui est le plus rapide des trois ?",
  options: ["{C}", "{A}", "{D}", "On ne peut pas savoir : il manque une information"],
  bonne: 1, mot: "plus vite", regle: "tir_comparaison",
  explication: { bonne: "{A} bat {C}, et {C} bat {D} : {A} est le plus rapide.", cle: "« Plus vite que » : compare deux joueurs à la fois.", piege: "{C} tire plus fort : ce n'est pas courir plus vite." } },

{ id: "tir-2-09", niveau: 2, type: "tir", format: "choix",
  consigne: "{A} n'a pas tiré tout de suite : un défenseur était devant lui. Il a donc passé le ballon à {C}, qui était seul, et {C} a tiré. Le coach regardait la scène, les bras croisés.",
  question: "Pourquoi {A} a-t-il passé le ballon à {C} ?",
  options: ["Parce qu'un défenseur était devant lui", "Parce que {C} est plus grand que lui", "Parce que le coach l'a crié", "Parce que le gardien était sorti"],
  bonne: 0, mot: "Il a donc passé", regle: "tir_cause",
  explication: { bonne: "Un défenseur était devant {A}.", cle: "« Donc » annonce la conséquence de la cause écrite avant.", piege: "Le coach regarde seulement ; le gardien n'est pas cité." } },

{ id: "tir-2-10", niveau: 2, type: "tir", format: "vrai-faux-nsp",
  consigne: "{C} a le ballon, mais {A} est mieux placé. {C} lui passe le ballon, et {A} tire au but de l'extérieur du pied. Le tir passe loin du poteau, et {D} se retourne vers le milieu.",
  question: "Cette phrase est-elle vraie ? « {C} tire au but. »",
  options: ["Oui", "Non", "On ne peut pas savoir"],
  bonne: 1, mot: "lui passe le ballon", regle: "tir_qui",
  explication: { bonne: "Non : {C} passe le ballon, c'est {A} qui tire.", cle: "« Lui » désigne {A}, qui reçoit le ballon.", piege: "{C} a le ballon d'abord, mais il le donne." } },

{ id: "tir-2-11", niveau: 2, type: "tir", format: "choix",
  consigne: "Le coach a posé six ballons devant {A}. {A} en a tiré quatre, puis il s'est reposé un moment. {C} a ramassé les deux autres pour les ranger dans le grand sac.",
  question: "Combien de ballons {A} n'a-t-il pas tirés ?",
  options: ["Deux", "Quatre", "Six", "On ne peut pas savoir : il manque une information"],
  bonne: 0, mot: "les deux autres", regle: "tir_nombre",
  explication: { bonne: "Six ballons moins quatre tirés : il en reste deux.", cle: "« Les deux autres » : ceux que {A} n'a pas tirés.", piege: "Quatre est le nombre de ballons tirés." } },

{ id: "tir-2-12", niveau: 2, type: "tir", format: "barrer",
  consigne: "{D} bouscule {C}, mais {A} a le ballon : il avance, évite le gardien, puis il pousse le ballon dans le but vide. {C} se relève et le félicite.",
  question: "Quelles phrases sont vraies ? (Plusieurs réponses possibles.)",
  options: ["{A} marque un but.", "{D} bouscule {C}.", "{C} marque un but.", "{A} bouscule {C}."],
  bonne: [0, 1], mot: "pousse le ballon", regle: "tir_qui",
  explication: { bonne: "{A} marque ; {D} bouscule {C}.", cle: "Chaque action a son joueur : relis les noms.", piege: "{C} félicite {A} ; {A} ne bouscule personne." } },

/* ---------------- NIVEAU 3 : l'ordre (puis, avant, pendant que, comme) (38 à 52 mots) ---------------- */

{ id: "tir-3-01", niveau: 3, type: "tir", format: "choix",
  consigne: "Avant de tirer, {A} a regardé le gardien, puis il a fait une feinte vers la droite. Ensuite, il a frappé à gauche. Le gardien, trompé, a plongé trop tard, et {C} a applaudi depuis le milieu du terrain.",
  question: "Quelle phrase correspond le mieux au texte ?",
  options: ["{A} a frappé à droite, puis il a feinté à gauche.", "{A} a regardé le gardien, a feinté à droite, puis a frappé à gauche.", "{A} a feinté à droite, puis il a regardé le gardien et frappé à gauche.", "{A} a regardé le gardien, a feinté à gauche, puis a frappé à droite."],
  bonne: 1, mot: "Ensuite", regle: "tir_ordre",
  explication: { bonne: "Il regarde, il feinte à droite, puis il frappe à gauche.", cle: "« Puis » et « ensuite » donnent l'ordre.", piege: "Inverser deux actions ou deux côtés change tout." } },

{ id: "tir-3-02", niveau: 3, type: "tir", format: "choix",
  consigne: "Pendant que {C} retenait le défenseur par le maillot, {A} s'est démarqué. {D} lui a alors passé le ballon, et {A} a tiré. Le gardien n'a rien pu faire, mais l'arbitre a sifflé une faute contre {C}.",
  question: "Qui a passé le ballon à {A} ?",
  options: ["{D}", "{C}", "{X}", "On ne peut pas savoir : il manque une information"],
  bonne: 0, mot: "alors passé", regle: "tir_pendant",
  explication: { bonne: "{D} a passé le ballon à {A}.", cle: "« Lui » reprend {A} : {D} lui passe le ballon.", piege: "{C} retenait le défenseur : il n'a pas passé le ballon." } },

{ id: "tir-3-03", niveau: 3, type: "tir", format: "vrai-faux-nsp",
  consigne: "Comme {A} était seul devant le but, il a pris son temps. Puis {C} a crié : « Tire ! » Alors seulement {A} a frappé, du pied droit, avant que le défenseur ne revienne. {D} regardait de loin, sans bouger, les mains sur les hanches.",
  question: "Cette phrase est-elle vraie ? « {A} a tiré avant que {C} crie. »",
  options: ["Oui", "Non", "On ne peut pas savoir"],
  bonne: 1, mot: "Alors seulement", regle: "tir_ordre",
  explication: { bonne: "Non : {A} a frappé après le cri de {C}.", cle: "« Alors seulement » : le tir vient après le cri.", piege: "{A} a d'abord pris son temps, puis il a tiré." } },

{ id: "tir-3-04", niveau: 3, type: "tir", format: "vrai-faux-nsp",
  consigne: "Hier, {A} a tiré un penalty. Le gardien a plongé à gauche. Après son plongeon, le ballon est entré à droite, tout doucement, et {C} a levé les poings avant même que le ballon ne s'arrête.",
  question: "Cette phrase est-elle vraie ? « Le ballon est entré du côté opposé au plongeon du gardien. »",
  options: ["Oui", "Non", "On ne peut pas savoir"],
  bonne: 0, mot: "Après son plongeon", regle: "tir_ordre",
  explication: { bonne: "Oui : plongeon à gauche, ballon à droite.", cle: "« Après son plongeon » : le but arrive ensuite.", piege: "Le gardien n'a rien arrêté : le ballon est entré." } },

{ id: "tir-3-05", niveau: 3, type: "tir", format: "choix",
  consigne: "Comme le terrain était sec, le ballon roulait vite. {A} a donc préparé un tir tendu, ras du sol, que le gardien, pourtant bien placé, n'a pas eu le temps de bloquer. {C} a crié de joie.",
  question: "Pourquoi {A} a-t-il préparé un tir ras du sol ?",
  options: ["Parce que le ballon roulait vite sur le terrain sec.", "Parce que le gardien adverse était beaucoup trop petit.", "Parce que le terrain était mouillé et glissant.", "Parce que {C} lui avait demandé un tir bien fort."],
  bonne: 0, mot: "Comme", regle: "tir_cause",
  explication: { bonne: "Le terrain sec fait rouler le ballon vite.", cle: "« Comme » donne la cause, avant la conséquence.", piege: "Le texte ne dit ni que le gardien est petit, ni que le terrain est mouillé." } },

{ id: "tir-3-06", niveau: 3, type: "tir", format: "choix",
  consigne: "{A} a fait un grand pas en arrière avant de tirer. Le ballon a filé au-dessus de la barre. {C} s'est pris la tête dans les mains, pendant que {D} ramassait un autre ballon derrière le but.",
  question: "Qu'a fait {A} juste après son tir ?",
  options: ["Il s'est pris la tête dans les mains, déçu.", "Il a levé les bras vers les supporters, content.", "Il a couru vers le gardien pour lui parler.", "On ne peut pas savoir : il manque une information"],
  bonne: 3, mot: "s'est pris la tête", regle: "tir_qui",
  explication: { bonne: "Le texte ne dit pas ce que fait {A} après.", cle: "« S'est pris la tête » parle de {C}, pas de {A}.", piege: "Ne mélange pas les deux joueurs : ce geste est celui de {C}." } },

{ id: "tir-3-07", niveau: 3, type: "tir", format: "choix",
  consigne: "Avant chaque match, {A} fait trois choses : il s'étire, puis il boit de l'eau, et enfin il tire cinq ballons au but. {C}, lui, commence toujours par tirer, puis il s'étire.",
  question: "Que fait {A} juste après avoir bu ?",
  options: ["Il s'étire de nouveau, tranquillement.", "Il boit encore un peu d'eau.", "Il rentre au vestiaire sans rien dire.", "Il tire cinq ballons au but."],
  bonne: 3, mot: "enfin", regle: "tir_ordre",
  explication: { bonne: "Il tire cinq ballons au but.", cle: "« Enfin » : c'est la dernière chose, après avoir bu.", piege: "S'étirer vient avant : « puis » le dit." } },

{ id: "tir-3-08", niveau: 3, type: "tir", format: "barrer",
  consigne: "{D} a passé le ballon à {C}. Ensuite, {C} l'a donné à {A}, qui a tiré aussitôt. Le gardien a repoussé le tir, et {D} a repris le ballon avant de le renvoyer vers le but.",
  question: "Quelles phrases sont vraies ? (Plusieurs réponses possibles.)",
  options: ["{C} a reçu le ballon de {D}.", "{A} a donné le ballon à {C}.", "{A} a tiré après avoir reçu le ballon de {C}.", "{D} a tiré le premier."],
  bonne: [0, 2], mot: "Ensuite", regle: "tir_ordre",
  explication: { bonne: "{D} passe à {C}, puis {C} passe à {A}, qui tire.", cle: "« Ensuite » : la deuxième passe vient après la première.", piege: "{A} ne passe à personne : il reçoit, puis il tire." } },

{ id: "tir-3-09", niveau: 3, type: "tir", format: "choix",
  consigne: "Quand {A} a reçu le ballon, il a d'abord regardé les joueurs adverses, puis il a compté ses coéquipiers libres. Ensuite seulement, il a tiré, car personne n'était mieux placé. {C} lui criait de se dépêcher.",
  question: "Que fait {A} juste avant de tirer ?",
  options: ["Il compte ses coéquipiers libres", "Il regarde les joueurs adverses", "Il crie à {C} de se dépêcher", "Il passe le ballon à {C}"],
  bonne: 0, mot: "Ensuite seulement", regle: "tir_ordre",
  explication: { bonne: "Il compte ses coéquipiers libres, puis il tire.", cle: "« Ensuite seulement » : le tir vient en dernier.", piege: "Regarder les adversaires vient avant le comptage." } },

{ id: "tir-3-10", niveau: 3, type: "tir", format: "vrai-faux-nsp",
  consigne: "Comme {C} était fatigué, le coach l'a remplacé par {D}. {D} a tiré dès sa première touche de balle, mais le ballon est passé à côté du poteau. {A} lui a tapé dans le dos pour le consoler.",
  question: "Cette phrase est-elle vraie ? « {D} a été remplacé par {C}. »",
  options: ["Oui", "Non", "On ne peut pas savoir"],
  bonne: 1, mot: "l'a remplacé par", regle: "tir_qui",
  explication: { bonne: "Non : {C} a été remplacé par {D}.", cle: "« Remplacé par » : le premier sort, le second entre.", piege: "{D} est entré, et {C} est sorti." } },

{ id: "tir-3-11", niveau: 3, type: "tir", format: "choix",
  consigne: "Pendant que le gardien criait ses consignes à ses défenseurs, {A} a pris le ballon, évité deux joueurs et tiré. Le gardien n'a eu le temps de rien faire. {C} courait en arrière, trop loin pour aider.",
  question: "Que faisait le gardien quand {A} a pris le ballon ?",
  options: ["Il criait des consignes", "Il plongeait déjà", "Il dégageait le ballon", "Il regardait le banc"],
  bonne: 0, mot: "Pendant que", regle: "tir_pendant",
  explication: { bonne: "Il criait ses consignes à ses défenseurs.", cle: "« Pendant que » : deux actions en même temps.", piege: "Il n'a eu le temps de rien faire : il ne plongeait pas." } },

{ id: "tir-3-12", niveau: 3, type: "tir", format: "barrer",
  consigne: "{A} a d'abord tiré sur le poteau. Le ballon est revenu dans le jeu, et {C} l'a repris de volée avant qu'un défenseur n'intervienne. Le gardien a plongé après le tir de {C}, mais trop tard.",
  question: "Quelles phrases sont vraies ? (Plusieurs réponses possibles.)",
  options: ["{A} a tiré le premier.", "{C} a tiré après {A}.", "Le gardien a plongé avant le tir de {C}.", "{C} a tiré sur le poteau."],
  bonne: [0, 1], mot: "d'abord", regle: "tir_ordre",
  explication: { bonne: "{A} tire d'abord, puis {C} reprend de volée.", cle: "« D'abord » : {A} est le premier à tirer.", piege: "Le gardien plonge après le tir de {C}, pas avant." } },

/* ---------------- NIVEAU 4 : négation et quantités (documents scolaires et textes de foot) (48 à 62 mots) ---------------- */

{ id: "tir-4-01", niveau: 4, type: "tir", format: "choix", tags: ["ecole"],
  consigne: "Règlement du collège : aucun élève ne doit courir dans le couloir. Personne n'entre dans la salle avant le professeur. Les sacs restent dans le casier, jamais devant la porte. {A} est dans le couloir, devant la salle de classe, son sac sur l'épaule.",
  question: "Quelle phrase montre que {A} respecte le règlement ?",
  options: ["{A} court dans le couloir pour arriver avant {C}.", "{A} marche calmement, puis il entre dans la salle vide.", "{A} pose son sac devant la porte et attend le professeur.", "{A} range son sac dans le casier, marche et attend le professeur."],
  bonne: 3, mot: "Personne n'entre", regle: "tir_negation",
  explication: { bonne: "Il range son sac, marche et attend le professeur.", cle: "« Aucun », « personne », « jamais » : trois interdits.", piege: "Courir, entrer seul ou poser son sac devant la porte est interdit." } },

{ id: "tir-4-02", niveau: 4, type: "tir", format: "choix", tags: ["ecole"],
  consigne: "Problème de maths : dans la classe de {A}, vingt-six élèves sont présents ce matin. Trois élèves sont absents, car ils ont la grippe. Personne d'autre n'est inscrit dans la classe. Parmi les élèves présents, onze sont des garçons. Les élèves s'assoient par deux.",
  question: "Combien d'élèves y a-t-il dans la classe en tout ?",
  options: ["23", "26", "29", "30"],
  bonne: 2, mot: "sont absents", regle: "tir_nombre",
  explication: { bonne: "26 présents + 3 absents = 29 élèves.", cle: "« En tout » : on additionne présents et absents.", piege: "23 vient d'une soustraction : on ne retire pas les absents." } },

{ id: "tir-4-03", niveau: 4, type: "tir", format: "vrai-faux-nsp", tags: ["ecole"],
  consigne: "En SVT, {A} lit : « Une plante verte a besoin de lumière, d'eau et d'air. Sans lumière, elle jaunit et ne grandit plus. » {A} a mis sa plante dans un placard fermé pendant dix jours. Son cahier ne dit rien sur l'arrosage.",
  question: "Cette phrase est-elle vraie ? « La plante de {A} a manqué d'eau. »",
  options: ["Oui", "Non", "On ne peut pas savoir"],
  bonne: 2, mot: "Sans lumière", regle: "tir_pas_dit",
  explication: { bonne: "On ne sait pas si {A} l'a arrosée.", cle: "Le placard fermé prive de lumière, pas forcément d'eau.", piege: "Seul le manque de lumière est sûr ; l'eau n'est pas citée." } },

{ id: "tir-4-04", niveau: 4, type: "tir", format: "choix", tags: ["ecole"],
  consigne: "Sortie scolaire au musée. Sur le panneau : « Entrée gratuite pour les moins de 12 ans. Aucune visite sans guide. Les sacs à dos restent à l'accueil. » {A} a 12 ans et {C} en a 11. Ils viennent avec leur classe, un jeudi matin.",
  question: "Quelle phrase est vraie ?",
  options: ["{A} et {C} entrent tous les deux gratuitement.", "{A} paie l'entrée, et {C} entre gratuitement.", "{A} visite le musée sans guide, avec sa classe.", "{C} garde son sac à dos pendant la visite."],
  bonne: 1, mot: "moins de 12 ans", regle: "tir_exclu",
  explication: { bonne: "{A} a 12 ans : il paie. {C} a 11 ans : gratuit.", cle: "« Moins de 12 ans » ne compte pas les 12 ans.", piege: "Le guide est obligatoire, et les sacs restent à l'accueil." } },

{ id: "tir-4-05", niveau: 4, type: "tir", format: "barrer", tags: ["ecole"],
  consigne: "Atelier cuisine, recette des crêpes : « Mélange la farine et les œufs. Ajoute du lait, pas d'eau. Ne mets aucun sucre dans la pâte. Laisse-la reposer une heure, sans la remuer. » {A} suit la recette à la lettre, mais {C} oublie de l'écouter.",
  question: "Quelles phrases sont vraies ? (Plusieurs réponses possibles.)",
  options: ["{A} ajoute du lait.", "{A} ajoute de l'eau.", "{A} met du sucre dans la pâte.", "{A} laisse reposer la pâte."],
  bonne: [0, 3], mot: "aucun sucre", regle: "tir_negation",
  explication: { bonne: "Il ajoute du lait et laisse reposer la pâte.", cle: "« Pas d'eau » et « aucun sucre » : à ne pas faire.", piege: "L'eau et le sucre sont interdits dans cette recette." } },

{ id: "tir-4-06", niveau: 4, type: "tir", format: "choix",
  consigne: "{A} n'a marqué aucun but depuis trois matchs. Pourtant, il n'a jamais cessé de tirer : hier, à l'entraînement, il a tiré cinq fois. {C}, lui, n'a tiré qu'une fois hier, mais il a marqué. {D} n'a pas tiré du tout, car il jouait en défense.",
  question: "Quelle phrase correspond le mieux au texte ?",
  options: ["{A} a marqué hier.", "{A} a cessé de tirer.", "{A} a tiré plus souvent que {C} hier.", "On ne peut pas savoir : il manque une information"],
  bonne: 2, mot: "n'a tiré qu'une fois", regle: "tir_ne_que",
  explication: { bonne: "{A} a tiré cinq fois, {C} une seule fois.", cle: "« N'… qu' » veut dire seulement.", piege: "Aucun but depuis trois matchs : le texte ne dit pas qu'{A} a marqué hier." } },

{ id: "tir-4-07", niveau: 4, type: "tir", format: "choix",
  consigne: "Trois attaquants, {A}, {C} et {D}, ont tiré une fois chacun. Un seul tir a fini dans le but. Le gardien a arrêté un autre tir, et le troisième est passé à côté. Personne n'a touché le poteau, et aucun tir n'a été repris par un autre joueur.",
  question: "Quelle phrase correspond le mieux au texte ?",
  options: ["Les trois tirs ont fini dans le but.", "Le gardien a arrêté un seul tir.", "Deux joueurs ont marqué.", "On ne peut pas savoir : il manque une information"],
  bonne: 1, mot: "Un seul tir", regle: "tir_quantite",
  explication: { bonne: "Un but, un tir arrêté, un tir à côté.", cle: "« Un seul tir » est un but ; « un autre » est arrêté.", piege: "Trois tirs, mais un seul but : pas deux buts." } },

{ id: "tir-4-08", niveau: 4, type: "tir", format: "vrai-faux-nsp",
  consigne: "{A} ne tire jamais du pied gauche, et {C} ne tire jamais de la tête. Hier, {A} a tiré trois fois, toutes du pied droit. {C} a tiré deux fois, une fois du pied gauche et une fois du pied droit. {D} n'a tiré qu'une seule fois, de la tête.",
  question: "Cette phrase est-elle vraie ? « Hier, {A} a tiré de la tête. »",
  options: ["Oui", "Non", "On ne peut pas savoir"],
  bonne: 1, mot: "toutes du pied droit", regle: "tir_quantite",
  explication: { bonne: "Non : ses trois tirs étaient du pied droit.", cle: "« Toutes » : aucun tir d'une autre sorte.", piege: "La tête, c'est {D} ; « jamais de la tête » concerne {C}." } },

{ id: "tir-4-09", niveau: 4, type: "tir", format: "choix", tags: ["ecole"],
  consigne: "Règlement de la cantine : on ne peut prendre qu'un seul dessert par repas. Les élèves ne quittent pas la table avant la fin du repas, sauf permission d'un surveillant. {A} a fini son plat, et {C} aussi. Ce jour-là, la cantine propose des fruits et des yaourts.",
  question: "Que peut prendre {A} comme dessert ?",
  options: ["Un fruit et un yaourt", "Un seul dessert", "Aucun dessert", "Deux fruits"],
  bonne: 1, mot: "qu'un seul dessert", regle: "tir_ne_que",
  explication: { bonne: "Un seul dessert : fruit ou yaourt.", cle: "« Ne… qu'un seul » veut dire seulement un.", piege: "Deux desserts, même du même genre, est interdit." } },

{ id: "tir-4-10", niveau: 4, type: "tir", format: "choix", tags: ["ecole"],
  consigne: "Fiche de sciences : « Un litre d'eau pèse un kilogramme. Une bouteille vide ne pèse presque rien. » {A} remplit une bouteille de deux litres, puis il en verse un demi-litre sur la pelouse. {C}, lui, remplit une bouteille d'un litre et n'en verse pas une goutte.",
  question: "Combien pèse l'eau qui reste dans la bouteille de {A} ?",
  options: ["Un kilogramme et demi", "Deux kilogrammes", "Un demi-kilogramme", "Un kilogramme"],
  bonne: 0, mot: "un demi-litre", regle: "tir_nombre",
  explication: { bonne: "2 litres moins un demi-litre : 1,5 litre, donc 1,5 kg.", cle: "Un litre pèse un kilogramme : retire ce qu'on verse.", piege: "Deux kilogrammes oublie l'eau versée sur la pelouse." } },

{ id: "tir-4-11", niveau: 4, type: "tir", format: "choix",
  consigne: "Hier, {A} a tiré dix ballons au but. Aucun tir n'est passé au-dessus de la barre. Le gardien en a arrêté quatre, deux ont touché le poteau, et tous les autres sont entrés dans le but. {C} n'a tiré que trois ballons, et il les a tous mis au fond.",
  question: "Combien de ballons {A} a-t-il mis dans le but ?",
  options: ["Deux", "Trois", "Quatre", "Six"],
  bonne: 2, mot: "tous les autres", regle: "tir_nombre",
  explication: { bonne: "Dix tirs, moins quatre arrêtés et deux poteaux : quatre buts.", cle: "« Tous les autres » : ce qui reste après les arrêts et poteaux.", piege: "Trois buts, c'est ceux de {C}." } },

{ id: "tir-4-12", niveau: 4, type: "tir", format: "vrai-faux-nsp",
  consigne: "Le coach répète que personne ne doit tirer de trop loin. Hier, {A} a tiré deux fois depuis la surface. {C} n'a tiré qu'une fois, depuis le rond central. {D} n'a tiré aucune fois, car il n'a jamais eu le ballon à moins de trente mètres du but.",
  question: "Cette phrase est-elle vraie ? « {C} a respecté la consigne du coach. »",
  options: ["Oui", "Non", "On ne peut pas savoir"],
  bonne: 1, mot: "personne ne doit tirer de trop loin", regle: "tir_negation",
  explication: { bonne: "Non : le rond central est trop loin du but.", cle: "« Personne ne doit… » : {C} a fait ce qui est interdit.", piege: "{A} a tiré de près, et {D} n'a pas tiré." } },

/* ---------------- NIVEAU 5 : conditions et exceptions (documents scolaires et textes de foot) (60 à 78 mots) ---------------- */

{ id: "tir-5-01", niveau: 5, type: "tir", format: "choix", tags: ["ecole"],
  consigne: "Règlement du CDI : on peut emprunter trois livres à la fois, pour deux semaines. Un dictionnaire ne s'emprunte pas, sauf avec l'accord de la documentaliste. Les magazines se lisent sur place, sans exception. {A} a l'accord de la documentaliste. Il veut emprunter un dictionnaire, deux romans et un magazine.",
  question: "{A} veut emprunter le plus de livres possible. Que fait-il ?",
  options: ["Il emprunte les quatre.", "Il emprunte le dictionnaire et deux romans, et lit le magazine sur place.", "Il emprunte seulement les deux romans.", "Il emprunte le dictionnaire, mais un seul roman."],
  bonne: 1, mot: "sauf avec l'accord", regle: "tir_sauf",
  explication: { bonne: "Dictionnaire et deux romans : trois livres ; magazine sur place.", cle: "« Sauf avec l'accord » : {A} l'a ; les magazines ne sortent jamais.", piege: "Quatre livres dépasse la limite de trois." } },

{ id: "tir-5-02", niveau: 5, type: "tir", format: "choix", tags: ["ecole"],
  consigne: "Programme de calcul : « Choisis un nombre. S'il est plus grand que 10, enlève 4. Sinon, multiplie-le par 2. Dans les deux cas, ajoute 1 au résultat. » {A} choisit 7 et {C} choisit 12. Chacun applique le programme sans se tromper, puis le professeur passe dans les rangs pour vérifier les cahiers. Il félicite ceux qui ont montré leurs calculs, mais il n'accepte aucun résultat écrit sans la moindre explication.",
  question: "Quel résultat {A} obtient-il ?",
  options: ["14", "15", "9", "29"],
  bonne: 1, mot: "Sinon", regle: "tir_condition",
  explication: { bonne: "7 n'est pas plus grand que 10 : 7 × 2 + 1 = 15.", cle: "« Sinon » : on multiplie, puis « dans les deux cas » on ajoute 1.", piege: "14 oublie d'ajouter 1 ; 9 est le résultat de {C}, pas de {A}." } },

{ id: "tir-5-03", niveau: 5, type: "tir", format: "choix", tags: ["ecole"],
  consigne: "Expérience de physique : « Quand l'eau atteint 100 °C, elle bout. Tant que la température reste inférieure à 100 °C, elle ne bout pas. Quand elle bout, la température ne monte plus. » Après cinq minutes, le thermomètre de {A} indique 85 °C. Après dix minutes, celui de {C} indique 100 °C.",
  question: "Que peut écrire {A} dans son cahier, après cinq minutes ?",
  options: ["L'eau est en train de bouillir.", "L'eau ne bout pas encore.", "L'eau a déjà atteint 100 °C.", "L'eau est devenue complètement froide."],
  bonne: 1, mot: "Tant que", regle: "tir_tantque",
  explication: { bonne: "85 °C est inférieur à 100 °C : elle ne bout pas.", cle: "« Tant que » : sous 100 °C, pas d'ébullition.", piege: "Elle bout seulement quand elle atteint 100 °C : c'est {C}." } },

{ id: "tir-5-04", niveau: 5, type: "tir", format: "choix", tags: ["ecole"],
  consigne: "Sortie scolaire : « Le car part à 8 h, sauf s'il pleut : dans ce cas, il part à 9 h. Les élèves qui arrivent après le départ du car ne peuvent pas venir. » Le matin de la sortie, {A} prépare son sac, et {C} regarde par la fenêtre sans rien dire du temps qu'il fait. Le professeur répète que personne ne doit être en retard, car le car n'attend aucun élève.",
  question: "À quelle heure le car part-il ?",
  options: ["À 8 h.", "À 9 h.", "À 8 h 30.", "On ne peut pas savoir : il manque une information"],
  bonne: 3, mot: "sauf s'il pleut", regle: "tir_inconnu",
  explication: { bonne: "On ne sait pas s'il pleut ce matin-là.", cle: "« Sauf s'il pleut » : l'heure dépend de la météo.", piege: "Choisir 8 h ou 9 h, c'est deviner le temps." } },

{ id: "tir-5-05", niveau: 5, type: "tir", format: "barrer", tags: ["ecole"],
  consigne: "Mot de la vie scolaire : « Les élèves qui ont sport ce matin viennent en tenue de sport. Les autres viennent en tenue normale, à moins d'avoir un mot du professeur. Les chaussures de sport restent obligatoires pour tous, sauf pour les élèves dispensés. » {A} a sport ce matin. {C} n'a pas sport et n'a pas de mot du professeur.",
  question: "Quelles phrases sont vraies ? (Plusieurs réponses possibles.)",
  options: ["{A} vient en tenue de sport.", "{C} vient en tenue de sport.", "{C} vient en tenue normale.", "{A} vient en tenue normale."],
  bonne: [0, 2], mot: "à moins d'avoir un mot", regle: "tir_amoinsque",
  explication: { bonne: "{A} vient en tenue de sport, {C} en tenue normale.", cle: "{C} n'a pas de mot : l'exception ne s'applique pas.", piege: "{A} a sport ; {C} n'a ni sport ni mot." } },

{ id: "tir-5-06", niveau: 5, type: "tir", format: "choix",
  consigne: "Le coach a dit à {A} : « Si le gardien est avancé, tente le lob. Sinon, frappe au ras du sol, mais seulement si tu es à l'intérieur de la surface. Sinon, passe à {C}. » Le gardien est resté sur sa ligne, et {A} est à vingt mètres du but, hors de la surface. {C} est libre, à cinq mètres de lui, et il fait signe avec le bras.",
  question: "Que doit faire {A} ?",
  options: ["Frapper au ras du sol", "Tenter le lob", "Passer à {C}", "On ne peut pas savoir : il manque une information"],
  bonne: 2, mot: "Sinon, passe à {C}", regle: "tir_condition",
  explication: { bonne: "Gardien sur sa ligne, hors surface : il passe à {C}.", cle: "Cherche quelle condition est vraie, une par une.", piege: "Le lob est pour un gardien avancé ; le ras du sol, dans la surface." } },

{ id: "tir-5-07", niveau: 5, type: "tir", format: "vrai-faux-nsp",
  consigne: "Le coach a dit : « Les joueurs qui ont tiré au moins deux fois à l'entraînement joueront dimanche, à moins d'être blessés. Ceux qui ont tiré moins de deux fois resteront remplaçants, sauf si un titulaire se blesse. » {A} a tiré trois fois. {C} a tiré une fois. Personne ne parle de blessure dans le groupe, mais le médecin du club n'est pas encore passé voir les joueurs.",
  question: "Cette phrase est-elle vraie ? « {A} jouera dimanche. »",
  options: ["Oui", "Non", "On ne peut pas savoir"],
  bonne: 2, mot: "à moins d'être blessés", regle: "tir_inconnu",
  explication: { bonne: "On ne sait pas si {A} est blessé.", cle: "« À moins d'être blessés » : une blessure change tout.", piege: "Trois tirs suffisent, mais la blessure n'est pas exclue." } },

{ id: "tir-5-08", niveau: 5, type: "tir", format: "vrai-faux-nsp", tags: ["ecole"],
  consigne: "Fiche d'EPS : « Le saut en longueur est validé à partir de 3 mètres, même si le pied touche la planche. Si le pied dépasse la planche, le saut ne compte pas. Chaque élève fait trois essais, et seul le meilleur saut est noté. » {A} a sauté 3 m 20, le pied sur la planche, à son deuxième essai.",
  question: "Cette phrase est-elle vraie ? « Le saut de {A} est validé. »",
  options: ["Oui", "Non", "On ne peut pas savoir"],
  bonne: 0, mot: "même si", regle: "tir_meme_si",
  explication: { bonne: "Oui : plus de 3 m, et le pied ne dépasse pas.", cle: "« Même si » : toucher la planche n'annule pas le saut.", piege: "Seul un pied qui dépasse la planche annule le saut." } },

{ id: "tir-5-09", niveau: 5, type: "tir", format: "choix",
  consigne: "Règlement du club : tout joueur qui arrive en retard à l'entraînement fait cinq tours de terrain, sauf s'il prévient le coach avant, et sauf s'il a un mot de ses parents. {A} est arrivé en retard et a prévenu le coach. {C} est arrivé en retard sans prévenir, mais il a un mot de ses parents. Le coach range sa feuille de présence en silence.",
  question: "Qui fait cinq tours de terrain ?",
  options: ["{A}", "{C}", "{A} et {C}", "Aucun des deux"],
  bonne: 3, mot: "sauf s'il prévient", regle: "tir_sauf",
  explication: { bonne: "{A} a prévenu, {C} a un mot : personne ne court.", cle: "Chaque « sauf » est une exception : elle suffit seule.", piege: "Être en retard ne suffit pas : les exceptions s'appliquent." } },

{ id: "tir-5-10", niveau: 5, type: "tir", format: "barrer",
  consigne: "À l'entraînement, {A} doit tirer cinq penaltys. S'il en marque au moins quatre, il passe au tir de loin. S'il en marque trois ou moins, il recommence. Pour le tir de loin, il a droit à trois essais seulement. {A} marque quatre penaltys. Ensuite, il tire de loin et manque ses trois essais. Le coach lui dit que ce n'est pas grave, car ce n'est qu'un exercice.",
  question: "Quelles phrases sont vraies ? (Plusieurs réponses possibles.)",
  options: ["{A} passe au tir de loin.", "{A} recommence les penaltys.", "{A} manque ses trois essais de loin.", "{A} a droit à quatre essais de loin."],
  bonne: [0, 2], mot: "au moins quatre", regle: "tir_condition",
  explication: { bonne: "Quatre penaltys : il passe au tir de loin, et manque.", cle: "« Au moins quatre » comprend quatre.", piege: "Il ne recommence qu'avec trois penaltys ou moins." } },

{ id: "tir-5-11", niveau: 5, type: "tir", format: "choix", tags: ["ecole"],
  consigne: "Mot du professeur d'EPS : « Pour le cross, on court trois tours si le terrain est sec, et deux tours s'il est mouillé. Les élèves dispensés ne courent pas, mais ils comptent les tours des autres. » {A} est dispensé. {C} n'est pas dispensé, et le terrain est sec. Le professeur sifflera le départ dans quelques instants, quand tous les élèves auront enlevé leur veste.",
  question: "Que fait {C} ?",
  options: ["Il court deux tours", "Il court trois tours", "Il compte les tours des autres", "On ne peut pas savoir : il manque une information"],
  bonne: 1, mot: "si le terrain est sec", regle: "tir_condition",
  explication: { bonne: "Le terrain est sec : {C} court trois tours.", cle: "{C} n'est pas dispensé : il court.", piege: "Deux tours, c'est pour un terrain mouillé ; compter, c'est {A}." } },

{ id: "tir-5-12", niveau: 5, type: "tir", format: "vrai-faux-nsp",
  consigne: "Bien que {A} soit droitier, il a tiré du pied gauche sur le dernier coup franc, parce que {C} l'avait demandé. Le ballon est passé au-dessus du mur, mais le gardien l'a repoussé. {A} dit que, même si le tir a raté, il a bien fait de changer de pied. {C} n'est pas d'accord et pense que {A} aurait dû garder son pied droit, comme d'habitude.",
  question: "Cette phrase est-elle vraie ? « {A} a marqué sur ce coup franc. »",
  options: ["Oui", "Non", "On ne peut pas savoir"],
  bonne: 1, mot: "même si le tir a raté", regle: "tir_meme_si",
  explication: { bonne: "Non : le gardien a repoussé le ballon.", cle: "« Même si le tir a raté » : {A} le dit lui-même.", piege: "Le ballon passe le mur, mais il n'entre pas." } }


]);
