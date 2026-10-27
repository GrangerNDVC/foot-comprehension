/* ============================================================
   BANQUE « PETITS MOTS », SUITE : les prépositions (chantier 15, type motpetit).
   Pour le gardien aux cheveux noirs (prépositions et conjonctions) et pour le mélange des autres gardiens.
   17 questions : 11 au niveau 2 (chez / à, entre / parmi, dans / en, au / en + pays, pour / par, contre)
   et 6 au niveau 3 (verbes qui veulent une préposition : tenir à, dépendre de, compter sur…).
   Aucune ne porte sur l'orthographe : le piège est le choix du mot, pas la façon de l'écrire.
   Même format que data/motspetits.js. Règles : data/regles-motspetits.js (clés « mp_ »).
   ============================================================ */
(function () {
  var Q = "Quel petit mot complète la phrase ?";
  function mp(id, niveau, consigne, mot, options, bonne, regle, e1, e2, e3) {
    return { id: id, niveau: niveau, type: "motpetit", format: "choix", consigne: consigne, question: Q,
             options: options, bonne: bonne, mot: mot, regle: regle,
             explication: { bonne: e1, cle: e2, piege: e3 } };
  }

  JEU.ajouterQuestions([

/* ---------------- NIVEAU 2 : la bonne préposition ---------------- */

mp("mp-2-p01", 2, "Demain matin, je vais ____ dentiste pour faire contrôler mes dents avant les vacances.", "dentiste",
   ["chez le", "au", "avec le", "à le"], 0, "mp_chez",
   "« Chez le » : on va chez une personne, ici le dentiste.",
   "« Dentiste » est une personne, pas un lieu.",
   "« Au dentiste » est une erreur courante : « au » va avec un lieu."),

mp("mp-2-p02", 2, "Samedi, nous allons ____ grands-parents pour fêter l'anniversaire de ma petite sœur.", "grands-parents",
   ["chez mes", "à mes", "dans mes", "sur mes"], 0, "mp_chez",
   "« Chez mes » : on va chez des personnes.",
   "Les grands-parents sont des personnes, pas un lieu.",
   "« À mes grands-parents » ne se dit pas : « à » va avec un lieu."),

mp("mp-2-p03", 2, "Le ballon est tombé ____ le banc et le mur, et personne ne peut le sortir de là.", "le banc et le mur",
   ["entre", "parmi", "vers", "chez"], 0, "mp_entre_parmi",
   "« Entre » : au milieu de deux choses, ici le banc et le mur.",
   "Il y a deux éléments : le banc et le mur.",
   "« Parmi » s'emploie avec plusieurs éléments, pas avec deux."),

mp("mp-2-p04", 2, "Le sélectionneur a choisi un joueur ____ les vingt candidats qui s'étaient présentés au stade.", "vingt candidats",
   ["parmi", "entre", "dans", "vers"], 0, "mp_entre_parmi",
   "« Parmi » : au milieu de plusieurs personnes.",
   "« Vingt candidats » : il y en a beaucoup.",
   "« Entre » s'emploie avec deux choses, pas avec vingt."),

mp("mp-2-p05", 2, "Le match commence ____ dix minutes : prépare-toi vite, il faut déjà aller sur le terrain.", "commence",
   ["dans", "en", "pendant", "depuis"], 0, "mp_dans_en",
   "« Dans dix minutes » : le match commencera après dix minutes d'attente.",
   "« Commence » parle du futur : on attend dix minutes.",
   "« En dix minutes » donne la durée d'une action, pas le moment où elle commence."),

mp("mp-2-p06", 2, "Elle a couru le tour du stade ____ deux minutes, un vrai record pour une joueuse de son âge.", "record",
   ["en", "dans", "pendant", "depuis"], 0, "mp_dans_en",
   "« En deux minutes » : il lui a fallu deux minutes pour finir.",
   "« Un record » : on parle de la durée pour finir la course.",
   "« Dans deux minutes » parlerait d'un événement à venir."),

mp("mp-2-p07", 2, "Cet été, nous partons en vacances ____ Portugal, où mon oncle nous attend depuis des années.", "Portugal",
   ["au", "en", "à", "dans"], 0, "mp_pays",
   "« Au Portugal » : le mot « Portugal » est masculin.",
   "On dit « le Portugal », donc « au Portugal ».",
   "« En » va avec un pays féminin : « en Italie »."),

mp("mp-2-p08", 2, "Ce cadeau est ____ ma sœur : ne l'ouvre pas avant qu'elle soit rentrée de l'école.", "ma sœur",
   ["pour", "par", "avec", "sans"], 0, "mp_par_pour",
   "« Pour » : la personne qui doit recevoir le cadeau.",
   "« Ma sœur » reçoit le cadeau : c'est la destinataire.",
   "« Par » nomme celui qui fait l'action, pas celui qui reçoit."),

mp("mp-2-p09", 2, "Ce message a été écrit ____ le capitaine lui-même, et il l'a signé de sa main.", "écrit",
   ["par", "pour", "avec", "sur"], 0, "mp_par_pour",
   "« Par » : nomme celui qui a fait l'action, ici le capitaine.",
   "« A été écrit » : on cherche qui l'a écrit.",
   "« Pour » nomme la personne qui reçoit, pas celle qui écrit."),

mp("mp-2-p10", 2, "Le joueur s'est cogné ____ le poteau en essayant de rattraper le ballon, et il a eu très mal.", "cogné",
   ["contre", "avec", "par", "chez"], 0, "mp_contre",
   "« Contre » : le choc, quand on touche quelque chose très fort.",
   "« S'est cogné » : il y a un choc.",
   "« Avec » ne s'emploie pas pour un choc."),

mp("mp-2-p11", 2, "Après l'entraînement, je suis allé ____ boulangère pour acheter du pain frais avant de rentrer.", "boulangère",
   ["chez la", "à la", "dans la", "avec la"], 0, "mp_chez",
   "« Chez la » : on va chez une personne, ici la boulangère.",
   "« Boulangère » est la personne ; la boulangerie est le magasin.",
   "« À la boulangère » ne se dit pas : « à » va avec un lieu."),

/* ---------------- NIVEAU 3 : le verbe veut sa préposition ---------------- */

mp("mp-3-p01", 3, "Je tiens ____ ce maillot : c'est un cadeau de mon grand-père, et je le garderai toute ma vie.", "tiens",
   ["à", "de", "pour", "sur"], 0, "mp_verbe_prep",
   "« Tenir à » : on est très attaché à quelque chose.",
   "Le verbe « tenir » (au sens de « être attaché ») veut « à ».",
   "« Tenir de » veut dire ressembler : « il tient de son père »."),

mp("mp-3-p02", 3, "Ton résultat dépend ____ ton travail : plus tu t'entraînes sérieusement, plus tu progresses vite.", "dépend",
   ["de", "à", "sur", "par"], 0, "mp_verbe_prep",
   "« Dépendre de » : le résultat vient de ton travail.",
   "Le verbe « dépendre » s'emploie toujours avec « de ».",
   "« Dépendre à » ou « sur » est une erreur."),

mp("mp-3-p03", 3, "Le défenseur a obéi ____ l'arbitre sans discuter, et il est sorti du terrain pour se faire soigner.", "obéi",
   ["à", "de", "pour", "par"], 0, "mp_verbe_prep",
   "« Obéir à » : on suit ce que dit l'arbitre.",
   "Le verbe « obéir » s'emploie avec « à » : obéir à quelqu'un.",
   "« Obéir de » n'existe pas."),

mp("mp-3-p04", 3, "Nous comptons ____ vous pour nous aider à ranger les ballons après l'entraînement de ce soir.", "comptons",
   ["sur", "à", "de", "en"], 0, "mp_verbe_prep",
   "« Compter sur quelqu'un » : lui faire confiance pour agir.",
   "Le verbe « compter » (faire confiance) s'emploie avec « sur ».",
   "« Compter à » ou « en » ne se dit pas ainsi."),

mp("mp-3-p05", 3, "Elle s'est habituée ____ jouer sous la pluie et ne se plaint plus du froid ni de la boue.", "habituée",
   ["à", "de", "pour", "en"], 0, "mp_verbe_prep",
   "« S'habituer à » : prendre l'habitude de quelque chose.",
   "Le verbe « s'habituer » s'emploie avec « à ».",
   "« S'habituer de » est une erreur."),

mp("mp-3-p06", 3, "Le joueur a renoncé ____ tirer parce que son coéquipier était mieux placé et seul devant le but.", "renoncé",
   ["à", "de", "pour", "par"], 0, "mp_verbe_prep",
   "« Renoncer à » : décider de ne pas faire quelque chose.",
   "Le verbe « renoncer » s'emploie avec « à ».",
   "« Renoncer de » est une erreur.")

  ]);
})();
