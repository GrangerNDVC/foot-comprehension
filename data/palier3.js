/* ============================================================
   PALIER 3 — Dire autrement (reformulation)
   La phrase de départ est dans "consigne" (c'est la phrase à reformuler).
   ============================================================ */
JEU.items[3] = [
  {
    id: "p3-01", niveau: 2, consigne: "Le match commence à quinze heures.",
    question: "Quelle phrase veut dire la même chose ?",
    options: ["Le match est fini à quinze heures.", "Le match débute à quinze heures.", "Le match dure quinze minutes."], bonne: 1,
    explication: "« Commence » et « débute » veulent dire la même chose. Le match n'est pas fini, et il ne dure pas quinze minutes."
  },
  {
    id: "p3-02", niveau: 2, consigne: "Léa a été félicitée par l'entraîneur.",
    question: "Quelle phrase veut dire la même chose ?",
    options: ["Léa a félicité l'entraîneur.", "L'entraîneur a félicité Léa.", "L'entraîneur a puni Léa."], bonne: 1,
    explication: "Ici, c'est l'entraîneur qui fait l'action de féliciter, et Léa la reçoit."
  },
  {
    id: "p3-03", niveau: 3, consigne: "Le gardien n'a pas arrêté tous les tirs.",
    question: "Quelle phrase veut dire la même chose ?",
    options: ["Le gardien n'a arrêté aucun tir.", "Le gardien a arrêté certains tirs, mais pas tous.", "Le gardien a arrêté tous les tirs."], bonne: 1,
    explication: "« Pas tous » veut dire qu'il en a quand même arrêté quelques-uns. Ce n'est pas « aucun »."
  },
  {
    id: "p3-04", niveau: 3, consigne: "Il tire seulement quand il est seul.",
    question: "Quelle phrase veut dire la même chose ?",
    options: ["Il tire toujours, même quand il est entouré.", "Il tire uniquement s'il n'y a personne près de lui.", "Il ne tire jamais quand il est seul."], bonne: 1,
    explication: "« Seulement » et « uniquement » veulent dire qu'il n'y a que ce cas-là."
  },
  {
    id: "p3-05", niveau: 4, consigne: "Si l'arbitre siffle, les joueurs s'arrêtent.",
    question: "Quelle phrase veut dire la même chose ?",
    options: [
      "Les joueurs s'arrêtent, puis l'arbitre siffle.",
      "Dès que l'arbitre siffle, les joueurs doivent s'arrêter.",
      "Les joueurs s'arrêtent quand ils veulent."
    ], bonne: 1,
    explication: "Le sifflet vient en premier, l'arrêt vient après. Les autres choix changent l'ordre ou la cause."
  },
  {
    id: "p3-06", niveau: 4, consigne: "Ils ont gagné, bien que leur adversaire soit plus fort.",
    question: "Quelle phrase veut dire la même chose ?",
    options: [
      "Ils ont perdu parce que leur adversaire est plus fort.",
      "Ils ont gagné contre un adversaire plus fort qu'eux.",
      "Ils ont gagné parce que leur adversaire était plus faible."
    ], bonne: 1,
    explication: "« Bien que » annonce une surprise : malgré un adversaire plus fort, ils ont gagné."
  },
  {
    id: "p3-07", niveau: 5, consigne: "Ce n'est qu'à la dernière minute que Sam a marqué.",
    question: "Quelle phrase veut dire la même chose ?",
    options: [
      "Sam a marqué dès la première minute.",
      "Sam a marqué seulement à la toute fin du match.",
      "Sam n'a marqué aucun but."
    ], bonne: 1,
    explication: "« Ce n'est qu'à la dernière minute que » veut dire : pas avant, seulement à la fin."
  }
];
