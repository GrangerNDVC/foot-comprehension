/* ============================================================
   QUESTIONS « Les consignes » (différences de plus en plus fines)  ·  type : defense
   (anciennes questions du palier 2, en attendant la banque du chantier 6)
   niveau 1 : les choix sont très différents
   niveau 2 : un seul élément change (qui / quoi / quel pied)
   niveau 3 : l'ordre des actions
   niveau 4 : la négation et les quantités
   niveau 5 : les conditions et les exceptions
   Format : voir data/palier1.js
   ============================================================ */
JEU.items[2] = [
  {
    id: "p2-01", niveau: 1, type: "defense", format: "choix", consigne: "Tire au but avec le pied droit.",
    question: "Qui a bien fait ce que dit la consigne ?",
    options: ["Léo tire au but avec le pied droit.", "Max prend le ballon avec les mains.", "Tom s'assoit sur le banc."], bonne: 0,
    mot: "pied droit", regle: "deux",
    explication: {
      bonne: "Léo.",
      cle: "Deux choses : tirer ET avec le pied droit.",
      piege: "Max (avec les mains) et Tom (sur le banc) ne tirent pas."
    }
  },
  {
    id: "p2-02", niveau: 1, type: "defense", format: "choix", consigne: "Passe le ballon à Sam.",
    question: "Qui a bien fait ce que dit la consigne ?",
    options: ["Léa dribble tous les adversaires et marque.", "Léa passe le ballon à Sam.", "Léa sort du terrain."], bonne: 1,
    mot: "Passe", regle: "deux",
    explication: {
      bonne: "Léa passe à Sam.",
      cle: "« Passe » + « à Sam » : une passe, et pour Sam.",
      piege: "Dribbler et marquer, ce n'est pas passer."
    }
  },
  {
    id: "p2-03", niveau: 2, type: "defense", format: "choix", consigne: "Passe le ballon à Sam.",
    question: "Qui a bien fait ce que dit la consigne ?",
    options: ["Léa passe le ballon à Nina.", "Léa passe le ballon à Sam.", "Léa donne le ballon à l'arbitre."], bonne: 1,
    mot: "Sam", regle: "motamot",
    explication: {
      bonne: "Léa passe à Sam.",
      cle: "Le nom compte : « à Sam ».",
      piege: "Passer à Nina, c'est la bonne action mais pas la bonne personne."
    }
  },
  {
    id: "p2-04", niveau: 2, type: "defense", format: "choix", consigne: "Tire avec le pied gauche.",
    question: "Qui a bien fait ce que dit la consigne ?",
    options: ["Tom tire avec le pied droit.", "Tom tire avec la tête.", "Tom tire avec le pied gauche."], bonne: 2,
    mot: "gauche", regle: "motamot",
    explication: {
      bonne: "Tom, avec le pied gauche.",
      cle: "Un seul mot décide : « gauche ».",
      piege: "Le pied droit, c'est l'autre pied."
    }
  },
  {
    id: "p2-05", niveau: 3, type: "defense", format: "choix", consigne: "Dribble un défenseur, puis tire.",
    question: "Qui a bien fait ce que dit la consigne ?",
    options: ["Ali tire, puis il dribble un défenseur.", "Ali dribble un défenseur, puis il passe.", "Ali dribble un défenseur, puis il tire."], bonne: 2,
    mot: "puis", regle: "ordre",
    explication: {
      bonne: "Ali dribble, puis il tire.",
      cle: "« Puis » donne l'ordre : 1) dribbler, 2) tirer.",
      piege: "Dans « tire, puis dribble », l'ordre est inversé."
    }
  },
  {
    id: "p2-06", niveau: 3, type: "defense", format: "choix", consigne: "Avant de tirer, regarde où est le gardien.",
    question: "Qui a bien fait ce que dit la consigne ?",
    options: ["Inès tire, puis elle regarde le gardien.", "Inès regarde le gardien, puis elle tire.", "Inès regarde les supporters, puis elle tire."], bonne: 1,
    mot: "Avant de tirer", regle: "ordre",
    explication: {
      bonne: "Inès regarde le gardien, puis elle tire.",
      cle: "« Avant de tirer » : on regarde d'abord.",
      piege: "Regarder après le tir, c'est trop tard."
    }
  },
  {
    id: "p2-07", niveau: 4, type: "defense", format: "choix", consigne: "Ne tire pas avant d'avoir fait deux passes.",
    question: "Qui a bien fait ce que dit la consigne ?",
    options: ["Zoé tire après une seule passe.", "Zoé tire sans faire de passe.", "Zoé tire après avoir fait deux passes."], bonne: 2,
    mot: "deux passes", regle: "nombres",
    explication: {
      bonne: "Zoé tire après deux passes.",
      cle: "Il faut DEUX passes avant de tirer.",
      piege: "Une seule passe, ou aucune : ce n'est pas assez."
    }
  },
  {
    id: "p2-08", niveau: 4, type: "defense", format: "choix", consigne: "Tous les joueurs doivent toucher le ballon avant le tir.",
    situation: "Dans l'équipe, il y a trois joueurs : Max, Sam et Léa.",
    question: "Qui a bien fait ce que dit la consigne ?",
    options: [
      "Seul Max touche le ballon, puis il tire.",
      "Max et Sam touchent le ballon, mais pas Léa, puis Max tire.",
      "Max, Sam et Léa touchent le ballon, puis Max tire."
    ], bonne: 2,
    mot: "Tous", regle: "tous",
    explication: {
      bonne: "Max, Sam et Léa touchent le ballon.",
      cle: "« Tous » : personne n'est oublié.",
      piege: "Sans Léa, ce n'est plus « tous »."
    }
  },
  {
    id: "p2-09", niveau: 5, type: "defense", format: "choix", consigne: "Passe à Sam, sauf s'il est marqué. Dans ce cas, tire.",
    situation: "Sam est marqué par un défenseur.",
    question: "Que doit faire Léa ?",
    options: ["Elle passe à Sam.", "Elle tire.", "Elle attend que Sam soit libre."], bonne: 1,
    mot: "sauf", regle: "sauf",
    explication: {
      bonne: "Elle tire.",
      cle: "« Sauf s'il est marqué » : Sam est marqué, donc pas de passe.",
      piege: "« Attendre » n'est pas dans la consigne : « dans ce cas, tire »."
    }
  },
  {
    id: "p2-10", niveau: 5, type: "defense", format: "choix", consigne: "Si le gardien est à gauche, tire à droite. Sinon, tire à gauche.",
    situation: "Le gardien est au centre du but.",
    question: "Que doit faire le joueur ?",
    options: ["Il tire à droite.", "Il tire à gauche.", "Il tire au centre."], bonne: 1,
    mot: "Sinon", regle: "sisinon",
    explication: {
      bonne: "Il tire à gauche.",
      cle: "Le gardien n'est pas à gauche : c'est le « sinon ».",
      piege: "Tirer à droite demande un gardien à gauche."
    }
  }
];
