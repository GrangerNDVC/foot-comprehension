/* ============================================================
   PALIER 4 — Le bon résumé (citations / textes courts)
   "consigne" contient le petit texte à lire.
   Les choix se ressemblent de plus en plus : il faut trouver celui qui
   correspond le mieux, sans ajouter d'informations absentes du texte.
   ============================================================ */
JEU.items[4] = [
  {
    id: "p4-01", niveau: 2,
    consigne: "Il pleut depuis ce matin. Le terrain est tout boueux. Les joueurs glissent à chaque course.",
    question: "Quelle phrase correspond le mieux au texte ?",
    options: ["Les joueurs courent facilement.", "Le terrain est difficile à cause de la pluie.", "Le match est annulé."], bonne: 1,
    explication: "La pluie rend le terrain boueux, et les joueurs glissent : c'est difficile. Le texte ne dit pas que le match est annulé."
  },
  {
    id: "p4-02", niveau: 2,
    consigne: "Nina croise les doigts. C'est la dernière minute et son équipe perd d'un but. Le penalty va être tiré.",
    question: "Quelle phrase correspond le mieux au texte ?",
    options: [
      "Nina a peur de tirer le penalty.",
      "Nina espère que le penalty sera marqué.",
      "Nina veut que l'arbitre arrête le match."
    ], bonne: 1,
    explication: "Croiser les doigts, c'est espérer. Son équipe perd d'un but : elle espère que le penalty sera marqué."
  },
  {
    id: "p4-03", niveau: 3,
    consigne: "Tom enlève son survêtement. Il attache bien ses lacets. Le coach vient de dire son nom.",
    question: "Quelle phrase correspond le mieux au texte ?",
    options: [
      "Tom se prépare à entrer sur le terrain.",
      "Tom a fini de jouer et il rentre chez lui.",
      "Le coach a puni Tom."
    ], bonne: 0,
    explication: "Se déshabiller, attacher ses lacets et entendre son nom : Tom va jouer. Rien ne dit qu'il est puni."
  },
  {
    id: "p4-04", niveau: 3,
    consigne: "Léa a couru vers le ballon. Elle a tiré, mais le gardien a touché le ballon du bout des doigts.",
    question: "Quelle phrase correspond le mieux au texte ?",
    options: [
      "Le gardien a attrapé le ballon.",
      "Le gardien a seulement effleuré le ballon, sans l'attraper.",
      "Le gardien n'a pas touché le ballon."
    ], bonne: 1,
    explication: "« Du bout des doigts » : il a touché le ballon un tout petit peu, mais il ne l'a pas attrapé."
  },
  {
    id: "p4-05", niveau: 4,
    consigne: "Sam a marqué le premier but. Ensuite, l'autre équipe a égalisé. Dans les dernières minutes, l'équipe de Sam a repris l'avantage.",
    question: "Quelle phrase correspond le mieux au texte ?",
    options: [
      "L'équipe de Sam a toujours été devant.",
      "Le score a été égal avant que l'équipe de Sam repasse devant.",
      "L'autre équipe a gagné le match."
    ], bonne: 1,
    explication: "« Égalisé » veut dire que le score était à égalité. Ensuite l'équipe de Sam a « repris l'avantage » : elle est repassée devant."
  },
  {
    id: "p4-06", niveau: 5,
    consigne: "À la 89e minute, Inès aurait pu tirer. Elle a pourtant passé le ballon à Yanis, mieux placé. Yanis a marqué et Inès a levé les bras.",
    question: "Quelle phrase correspond le mieux au texte ?",
    options: [
      "Inès regrette de ne pas avoir tiré.",
      "Inès a raté son tir.",
      "Inès a choisi de passer à un coéquipier mieux placé, et elle est contente du but."
    ], bonne: 2,
    explication: "Inès n'a pas tiré : elle a passé à Yanis, mieux placé. Lever les bras montre qu'elle est contente."
  }
];
