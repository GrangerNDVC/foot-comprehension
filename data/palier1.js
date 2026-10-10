/* ============================================================
   PALIER 1 — « Qui est-ce ? » (indices de plus en plus fins)
   - niveau : 1 (grossier) → 3 (fin)
   - indices : du plus général au plus précis (le 1er laisse tout possible)
   - options : les réponses possibles ; bonne = numéro de la bonne (0 = la 1re)
   Pour ajouter un exercice : copier un bloc { ... }, changer les textes.
   ============================================================ */
JEU.items[1] = [
  {
    id: "p1-01", niveau: 1, question: "Qui est-ce ?",
    indices: [
      "C'est une personne que l'on voit pendant un match.",
      "Elle n'est pas assise dans les gradins.",
      "Elle est sur le terrain avec les joueurs.",
      "Elle décide quand le match commence et quand il finit."
    ],
    options: ["Le gardien", "L'arbitre", "L'entraîneur", "Le supporter"], bonne: 1,
    explication: "Elle décide du début et de la fin du match : c'est l'arbitre. Le gardien est aussi sur le terrain, mais il ne décide pas."
  },
  {
    id: "p1-02", niveau: 1, question: "Qu'est-ce que c'est ?",
    indices: [
      "C'est quelque chose que l'on voit pendant un match.",
      "On peut le tenir dans une main.",
      "Ce n'est pas un vêtement.",
      "Il ne roule pas et on souffle dedans pour faire du bruit."
    ],
    options: ["Un ballon", "Un but", "Un maillot", "Un sifflet"], bonne: 3,
    explication: "On souffle dedans pour faire du bruit : c'est un sifflet. Le ballon roule, le maillot est un vêtement, et le but ne se tient pas dans la main."
  },
  {
    id: "p1-03", niveau: 1, question: "Où sommes-nous ?",
    indices: [
      "Il y a beaucoup de monde.",
      "On est dehors.",
      "Les gens sont assis dans des gradins.",
      "Ils regardent un match."
    ],
    options: ["Au stade", "À la piscine", "À la cantine", "Au cinéma"], bonne: 0,
    explication: "Des gradins, des gens dehors et un match : nous sommes au stade."
  },
  {
    id: "p1-04", niveau: 2, question: "Que s'est-il passé ?",
    indices: [
      "Pendant le match, tout le monde s'est arrêté de jouer.",
      "Le ballon n'est pas entré dans le but.",
      "Le ciel est bleu, il ne pleut pas.",
      "Un joueur en a poussé un autre et l'arbitre a sifflé."
    ],
    options: [
      "Un joueur a marqué un but.",
      "L'arbitre a sifflé une faute.",
      "Le match est arrêté à cause de la pluie.",
      "Un joueur s'est blessé."
    ], bonne: 1,
    explication: "Un joueur en pousse un autre : c'est une faute et l'arbitre siffle. Il n'y a ni but, ni pluie, et personne n'est dit blessé."
  },
  {
    id: "p1-05", niveau: 2, question: "Qui parle ?",
    indices: [
      "Cette personne parle pendant le match.",
      "Elle ne joue pas.",
      "Elle ne donne pas de conseils aux joueurs.",
      "Elle raconte le match à des gens qui l'écoutent à la radio."
    ],
    options: ["Le gardien", "L'entraîneur", "Le commentateur", "Un supporter"], bonne: 2,
    explication: "Elle raconte le match à la radio : c'est le commentateur. Un supporter ne raconte pas le match à la radio."
  },
  {
    id: "p1-06", niveau: 3, question: "À quel moment sommes-nous ?",
    indices: [
      "Les joueurs sont dans le vestiaire.",
      "Le score est déjà de 1 à 1.",
      "Le match n'est pas encore fini.",
      "Le coach donne des conseils avant que les joueurs retournent sur le terrain."
    ],
    options: ["Avant le match", "À la mi-temps", "Après le match", "Pendant un tir au but"], bonne: 1,
    explication: "Le score est déjà de 1 à 1 (donc le match a commencé) mais il n'est pas fini : c'est la mi-temps."
  },
  {
    id: "p1-07", niveau: 3, question: "Qui est-ce ?",
    indices: [
      "C'est un joueur de l'équipe.",
      "Il peut courir dans tout le terrain.",
      "Son travail principal est de marquer des buts.",
      "Il joue le plus près du but des adversaires."
    ],
    options: ["Le défenseur", "L'attaquant", "Le milieu de terrain", "Le gardien"], bonne: 1,
    explication: "Marquer des buts et jouer près du but adverse : c'est l'attaquant. Le défenseur, lui, protège son propre but."
  }
];
