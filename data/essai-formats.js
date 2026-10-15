/* ============================================================
   TROIS QUESTIONS D'ESSAI pour les formats « vrai-faux-nsp » et « barrer ».
   Elles servent à tester le moteur ; les vraies banques (chantiers 5, 6, 7)
   les remplaceront. `provisoire: true` permet de les retrouver.
   ============================================================ */
JEU.ajouterQuestions([
  {
    id: "essai-01", provisoire: true, niveau: 2, type: "passe", format: "vrai-faux-nsp",
    consigne: "Le numéro 8 envoie une passe vers le numéro 10. Au même moment, un défenseur adverse s'élance.",
    question: "Le numéro 10 a-t-il reçu le ballon ?",
    options: ["Oui", "Non", "On ne peut pas savoir"], bonne: 2,
    mot: "envoie une passe", regle: "pasplus",
    explication: {
      bonne: "On ne peut pas savoir.",
      cle: "Le texte dit que le 8 ENVOIE la passe, pas que le 10 la REÇOIT.",
      piege: "« Oui » et « non » ajoutent une information absente du texte."
    }
  },
  {
    id: "essai-02", provisoire: true, niveau: 3, type: "defense", format: "vrai-faux-nsp",
    consigne: "Quand un adversaire dribble, le défenseur ne tacle pas avant que le milieu soit revenu.",
    situation: "Le milieu est encore loin, au milieu du terrain.",
    question: "Le défenseur peut-il tacler maintenant ?",
    options: ["Oui", "Non", "On ne peut pas savoir"], bonne: 1,
    mot: "avant que", regle: "ordre",
    explication: {
      bonne: "Non.",
      cle: "« Pas avant que » le milieu soit revenu : il est encore loin.",
      piege: "Le texte donne assez d'informations : ce n'est pas « on ne peut pas savoir »."
    }
  },
  {
    id: "essai-03", provisoire: true, niveau: 3, type: "tir", format: "barrer",
    consigne: "Tsubasa reçoit le ballon dans la surface. Le gardien est avancé. Il lève la tête, puis il tire en essayant de lober le gardien.",
    question: "Quelles phrases sont vraies ? (Plusieurs réponses possibles.)",
    options: [
      "Tsubasa tire avant de regarder le gardien.",
      "Le gardien est avancé.",
      "Tsubasa reçoit le ballon hors de la surface.",
      "Tsubasa essaie de lober le gardien."
    ], bonne: [1, 3],
    mot: "lève la tête", regle: "detail",
    explication: {
      bonne: "Le gardien est avancé, et Tsubasa essaie de le lober.",
      cle: "Vérifie chaque phrase : toutes les bonnes doivent être choisies.",
      piege: "Il lève la tête AVANT de tirer, et il reçoit DANS la surface."
    }
  }
]);
