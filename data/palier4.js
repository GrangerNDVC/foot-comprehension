/* ============================================================
   QUESTIONS « Le bon résumé » (petits textes)  ·  type : tir
   (anciennes questions du palier 4, en attendant la banque du chantier 7)
   « consigne » contient le petit texte à lire.
   Les choix se ressemblent : il faut trouver celui qui correspond le mieux,
   sans ajouter d'informations absentes du texte.
   Format : voir data/palier1.js
   ============================================================ */
JEU.items[4] = [
  {
    id: "p4-01", niveau: 2, type: "tir", format: "choix",
    consigne: "Il pleut depuis ce matin. Le terrain est tout boueux. Les joueurs glissent à chaque course.",
    question: "Quelle phrase correspond le mieux au texte ?",
    options: ["Les joueurs courent facilement.", "Le terrain est difficile à cause de la pluie.", "Le match est annulé."], bonne: 1,
    mot: "glissent", regle: "pasplus",
    explication: {
      bonne: "Le terrain est difficile à cause de la pluie.",
      cle: "« Boueux » et « glissent » : c'est difficile.",
      piege: "« Annulé » n'est pas dans le texte."
    }
  },
  {
    id: "p4-02", niveau: 2, type: "tir", format: "choix",
    consigne: "Nina croise les doigts. C'est la dernière minute et son équipe perd d'un but. Le penalty va être tiré.",
    question: "Quelle phrase correspond le mieux au texte ?",
    options: [
      "Nina a peur de tirer le penalty.",
      "Nina espère que le penalty sera marqué.",
      "Nina veut que l'arbitre arrête le match."
    ], bonne: 1,
    mot: "croise les doigts", regle: "inference",
    explication: {
      bonne: "Nina espère que le penalty sera marqué.",
      cle: "« Croiser les doigts » = espérer.",
      piege: "Nina ne tire pas le penalty : rien ne dit qu'elle a peur."
    }
  },
  {
    id: "p4-03", niveau: 3, type: "tir", format: "choix",
    consigne: "Tom enlève son survêtement. Il attache bien ses lacets. Le coach vient de dire son nom.",
    question: "Quelle phrase correspond le mieux au texte ?",
    options: [
      "Tom se prépare à entrer sur le terrain.",
      "Tom a fini de jouer et il rentre chez lui.",
      "Le coach a puni Tom."
    ], bonne: 0,
    mot: "dire son nom", regle: "pasplus",
    explication: {
      bonne: "Tom se prépare à entrer sur le terrain.",
      cle: "Survêtement enlevé + lacets + son nom appelé : il va jouer.",
      piege: "Rien ne dit que Tom est puni."
    }
  },
  {
    id: "p4-04", niveau: 3, type: "tir", format: "choix",
    consigne: "Léa a couru vers le ballon. Elle a tiré, mais le gardien a touché le ballon du bout des doigts.",
    question: "Quelle phrase correspond le mieux au texte ?",
    options: [
      "Le gardien a attrapé le ballon.",
      "Le gardien a seulement effleuré le ballon, sans l'attraper.",
      "Le gardien n'a pas touché le ballon."
    ], bonne: 1,
    mot: "du bout des doigts", regle: "detail",
    explication: {
      bonne: "Le gardien a seulement effleuré le ballon.",
      cle: "« Du bout des doigts » = à peine touché.",
      piege: "« Attrapé » est trop fort. « Pas touché » est faux : il l'a touché."
    }
  },
  {
    id: "p4-05", niveau: 4, type: "tir", format: "choix",
    consigne: "Sam a marqué le premier but. Ensuite, l'autre équipe a égalisé. Dans les dernières minutes, l'équipe de Sam a repris l'avantage.",
    question: "Quelle phrase correspond le mieux au texte ?",
    options: [
      "L'équipe de Sam a toujours été devant.",
      "Le score a été égal avant que l'équipe de Sam repasse devant.",
      "L'autre équipe a gagné le match."
    ], bonne: 1,
    mot: "égalisé", regle: "ordre",
    explication: {
      bonne: "Le score a été égal avant que Sam repasse devant.",
      cle: "« A égalisé » puis « a repris l'avantage » : dans cet ordre.",
      piege: "« Toujours devant » est faux : le score a été égal."
    }
  },
  {
    id: "p4-06", niveau: 5, type: "tir", format: "choix",
    consigne: "À la 89e minute, Inès aurait pu tirer. Elle a pourtant passé le ballon à Yanis, mieux placé. Yanis a marqué et Inès a levé les bras.",
    question: "Quelle phrase correspond le mieux au texte ?",
    options: [
      "Inès regrette de ne pas avoir tiré.",
      "Inès a raté son tir.",
      "Inès a choisi de passer à un coéquipier mieux placé, et elle est contente du but."
    ], bonne: 2,
    mot: "mieux placé", regle: "inference",
    explication: {
      bonne: "Elle a passé à Yanis, mieux placé, et elle est contente.",
      cle: "« Mieux placé » + « a levé les bras » : son choix était bon.",
      piege: "Inès n'a pas tiré : pas de tir raté. Lever les bras, ce n'est pas regretter."
    }
  }
];
