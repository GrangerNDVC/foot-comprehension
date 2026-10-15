/* ============================================================
   QUESTIONS « Dire autrement » (reformulation)  ·  type : dribble
   (anciennes questions du palier 3, en attendant la banque du chantier 5)
   La phrase de départ est dans « consigne » (c'est la phrase à reformuler).
   Format : voir data/palier1.js
   ============================================================ */
JEU.items[3] = [
  {
    id: "p3-01", niveau: 2, type: "dribble", format: "choix", consigne: "Le match commence à quinze heures.",
    question: "Quelle phrase veut dire la même chose ?",
    options: ["Le match est fini à quinze heures.", "Le match débute à quinze heures.", "Le match dure quinze minutes."], bonne: 1,
    mot: "commence", regle: "synonyme",
    explication: {
      bonne: "Le match débute à quinze heures.",
      cle: "« Commence » = « débute ».",
      piege: "« Fini » et « dure quinze minutes » changent le sens."
    }
  },
  {
    id: "p3-02", niveau: 2, type: "dribble", format: "choix", consigne: "Léa a été félicitée par l'entraîneur.",
    question: "Quelle phrase veut dire la même chose ?",
    options: ["Léa a félicité l'entraîneur.", "L'entraîneur a félicité Léa.", "L'entraîneur a puni Léa."], bonne: 1,
    mot: "par l'entraîneur", regle: "quifait",
    explication: {
      bonne: "L'entraîneur a félicité Léa.",
      cle: "« Par l'entraîneur » : c'est lui qui félicite.",
      piege: "Léa reçoit les félicitations, elle ne les donne pas."
    }
  },
  {
    id: "p3-03", niveau: 3, type: "dribble", format: "choix", consigne: "Le gardien n'a pas arrêté tous les tirs.",
    question: "Quelle phrase veut dire la même chose ?",
    options: ["Le gardien n'a arrêté aucun tir.", "Le gardien a arrêté certains tirs, mais pas tous.", "Le gardien a arrêté tous les tirs."], bonne: 1,
    mot: "pas arrêté tous", regle: "tous",
    explication: {
      bonne: "Il en a arrêté certains, mais pas tous.",
      cle: "« Pas tous » n'est pas « aucun ».",
      piege: "« Aucun » veut dire zéro : il en a quand même arrêté."
    }
  },
  {
    id: "p3-04", niveau: 3, type: "dribble", format: "choix", consigne: "Il tire seulement quand il est seul.",
    question: "Quelle phrase veut dire la même chose ?",
    options: ["Il tire toujours, même quand il est entouré.", "Il tire uniquement s'il n'y a personne près de lui.", "Il ne tire jamais quand il est seul."], bonne: 1,
    mot: "seulement", regle: "seulement",
    explication: {
      bonne: "Il tire uniquement s'il est seul.",
      cle: "« Seulement » = « uniquement » : un seul cas.",
      piege: "« Toujours » : mais il ne tire pas quand il est entouré."
    }
  },
  {
    id: "p3-05", niveau: 4, type: "dribble", format: "choix", consigne: "Si l'arbitre siffle, les joueurs s'arrêtent.",
    question: "Quelle phrase veut dire la même chose ?",
    options: [
      "Les joueurs s'arrêtent, puis l'arbitre siffle.",
      "Dès que l'arbitre siffle, les joueurs doivent s'arrêter.",
      "Les joueurs s'arrêtent quand ils veulent."
    ], bonne: 1,
    mot: "Si l'arbitre siffle", regle: "ordre",
    explication: {
      bonne: "Dès que l'arbitre siffle, les joueurs s'arrêtent.",
      cle: "Le sifflet vient d'abord, l'arrêt ensuite.",
      piege: "Dans le premier choix, l'ordre est inversé."
    }
  },
  {
    id: "p3-06", niveau: 4, type: "dribble", format: "choix", consigne: "Ils ont gagné, bien que leur adversaire soit plus fort.",
    question: "Quelle phrase veut dire la même chose ?",
    options: [
      "Ils ont perdu parce que leur adversaire est plus fort.",
      "Ils ont gagné contre un adversaire plus fort qu'eux.",
      "Ils ont gagné parce que leur adversaire était plus faible."
    ], bonne: 1,
    mot: "bien que", regle: "bienque",
    explication: {
      bonne: "Ils ont gagné contre un adversaire plus fort.",
      cle: "« Bien que » = malgré : c'est une surprise.",
      piege: "« Parce que » donne une cause : ce n'est pas le même sens."
    }
  },
  {
    id: "p3-07", niveau: 5, type: "dribble", format: "choix", consigne: "Ce n'est qu'à la dernière minute que Sam a marqué.",
    question: "Quelle phrase veut dire la même chose ?",
    options: [
      "Sam a marqué dès la première minute.",
      "Sam a marqué seulement à la toute fin du match.",
      "Sam n'a marqué aucun but."
    ], bonne: 1,
    mot: "Ce n'est qu'à", regle: "seulement",
    explication: {
      bonne: "Sam a marqué seulement à la toute fin.",
      cle: "« Ce n'est qu'à… que » : pas avant.",
      piege: "« Dès la première minute » dit le contraire."
    }
  }
];
