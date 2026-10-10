/* ============================================================
   PALIER 2 — Les consignes (différences de plus en plus fines)
   niveau 1 : les choix sont très différents
   niveau 2 : un seul élément change (qui / quoi / quel pied)
   niveau 3 : l'ordre des actions
   niveau 4 : la négation et les quantités
   niveau 5 : les conditions et les exceptions
   ============================================================ */
JEU.items[2] = [
  {
    id: "p2-01", niveau: 1, consigne: "Tire au but avec le pied droit.",
    question: "Qui a bien fait ce que dit la consigne ?",
    options: ["Léo tire au but avec le pied droit.", "Max prend le ballon avec les mains.", "Tom s'assoit sur le banc."], bonne: 0,
    explication: "Seul Léo fait les deux choses demandées : il tire au but ET il utilise le pied droit."
  },
  {
    id: "p2-02", niveau: 1, consigne: "Passe le ballon à Sam.",
    question: "Qui a bien fait ce que dit la consigne ?",
    options: ["Léa dribble tous les adversaires et marque.", "Léa passe le ballon à Sam.", "Léa sort du terrain."], bonne: 1,
    explication: "La consigne demande une passe, et la passe va à Sam."
  },
  {
    id: "p2-03", niveau: 2, consigne: "Passe le ballon à Sam.",
    question: "Qui a bien fait ce que dit la consigne ?",
    options: ["Léa passe le ballon à Nina.", "Léa passe le ballon à Sam.", "Léa donne le ballon à l'arbitre."], bonne: 1,
    explication: "Dans les trois choix, Léa fait quelque chose avec le ballon. Mais un seul choix donne le ballon à Sam."
  },
  {
    id: "p2-04", niveau: 2, consigne: "Tire avec le pied gauche.",
    question: "Qui a bien fait ce que dit la consigne ?",
    options: ["Tom tire avec le pied droit.", "Tom tire avec la tête.", "Tom tire avec le pied gauche."], bonne: 2,
    explication: "La consigne dit « gauche ». Tire avec le pied droit, c'est l'autre pied !"
  },
  {
    id: "p2-05", niveau: 3, consigne: "Dribble un défenseur, puis tire.",
    question: "Qui a bien fait ce que dit la consigne ?",
    options: ["Ali tire, puis il dribble un défenseur.", "Ali dribble un défenseur, puis il passe.", "Ali dribble un défenseur, puis il tire."], bonne: 2,
    explication: "Le mot « puis » donne l'ordre : d'abord dribbler, ensuite tirer."
  },
  {
    id: "p2-06", niveau: 3, consigne: "Avant de tirer, regarde où est le gardien.",
    question: "Qui a bien fait ce que dit la consigne ?",
    options: ["Inès tire, puis elle regarde le gardien.", "Inès regarde le gardien, puis elle tire.", "Inès regarde les supporters, puis elle tire."], bonne: 1,
    explication: "« Avant de tirer » veut dire que regarder le gardien vient en premier."
  },
  {
    id: "p2-07", niveau: 4, consigne: "Ne tire pas avant d'avoir fait deux passes.",
    question: "Qui a bien fait ce que dit la consigne ?",
    options: ["Zoé tire après une seule passe.", "Zoé tire sans faire de passe.", "Zoé tire après avoir fait deux passes."], bonne: 2,
    explication: "Il faut avoir fait deux passes avant de tirer. Une passe, ou aucune, ce n'est pas assez."
  },
  {
    id: "p2-08", niveau: 4, consigne: "Tous les joueurs doivent toucher le ballon avant le tir.",
    situation: "Dans l'équipe, il y a trois joueurs : Max, Sam et Léa.",
    question: "Qui a bien fait ce que dit la consigne ?",
    options: [
      "Seul Max touche le ballon, puis il tire.",
      "Max et Sam touchent le ballon, mais pas Léa, puis Max tire.",
      "Max, Sam et Léa touchent le ballon, puis Max tire."
    ], bonne: 2,
    explication: "« Tous » veut dire qu'aucun joueur n'est oublié : Max, Sam ET Léa."
  },
  {
    id: "p2-09", niveau: 5, consigne: "Passe à Sam, sauf s'il est marqué. Dans ce cas, tire.",
    situation: "Sam est marqué par un défenseur.",
    question: "Que doit faire Léa ?",
    options: ["Elle passe à Sam.", "Elle tire.", "Elle attend que Sam soit libre."], bonne: 1,
    explication: "« Sauf s'il est marqué » : Sam est marqué, donc on ne lui passe pas. « Dans ce cas, tire » : Léa tire."
  },
  {
    id: "p2-10", niveau: 5, consigne: "Si le gardien est à gauche, tire à droite. Sinon, tire à gauche.",
    situation: "Le gardien est au centre du but.",
    question: "Que doit faire le joueur ?",
    options: ["Il tire à droite.", "Il tire à gauche.", "Il tire au centre."], bonne: 1,
    explication: "Le gardien n'est pas à gauche, il est au centre. C'est donc le « sinon » qui s'applique : on tire à gauche."
  }
];
