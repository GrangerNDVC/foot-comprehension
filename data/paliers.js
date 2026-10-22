/* ============================================================
   DESCRIPTION DES PALIERS
   Un palier = une série d'exercices du même genre, du plus grossier
   au plus fin. Les exercices sont dans data/palierN.js
   ============================================================ */
window.JEU = window.JEU || {};
JEU.items = {};

JEU.paliers = [
  {
    id: 1,
    titre: "Qui est-ce ?",
    sousTitre: "Trouve la bonne réponse grâce aux indices, de plus en plus précis.",
    type: "indices",
    methode: [
      "Lis le premier indice : beaucoup de réponses sont encore possibles.",
      "Si tu hésites, demande l'indice suivant : chaque indice fait disparaître des réponses.",
      "Moins tu as besoin d'indices, plus tu gagnes de points."
    ]
  },
  {
    id: 2,
    titre: "Les consignes",
    sousTitre: "Qui a fait exactement ce que demande la consigne ?",
    type: "choix",
    etiquette: "Consigne",
    methode: [
      "Lis la consigne en entier, deux fois.",
      "Cherche le petit mot qui change tout : avant, après, puis, sauf, ne … pas, tous, seulement.",
      "Compare chaque choix avec la consigne, mot par mot."
    ]
  },
  {
    id: 3,
    titre: "Dire autrement",
    sousTitre: "Quelle phrase veut dire la même chose ?",
    type: "choix",
    etiquette: "Phrase de départ",
    methode: [
      "Cherche les mots qui changent le sens : jamais, seulement, pas … tous, bien que, dès que.",
      "Demande-toi : qui fait l'action ? qui la reçoit ?",
      "Redis la phrase avec tes propres mots avant de choisir."
    ]
  },
  {
    id: 4,
    titre: "Le bon résumé",
    sousTitre: "Quelle phrase correspond le mieux au texte ?",
    type: "choix",
    etiquette: "Texte",
    methode: [
      "Lis tout le texte, puis cherche ce qu'il DIT et ce qu'il laisse comprendre.",
      "Une bonne réponse ne dit jamais plus que le texte : méfie-toi des choix qui ajoutent des informations.",
      "Trouve dans le texte le mot ou la phrase qui prouve ta réponse."
    ]
  }
];

/* Les petits mots importants : sert à expliquer le sens des mots listés dans « Vu à l'entraînement » (js/match.js) */
JEU.vestiaire = [
  { mot: "avant / après / puis / ensuite / d'abord / enfin", sens: "L'ordre des actions : ce qui se passe en premier, en deuxième." },
  { mot: "sauf", sens: "Une exception : tout est permis SAUF ce qui est dit après." },
  { mot: "seulement / uniquement", sens: "Un seul cas est possible, pas les autres." },
  { mot: "ne … pas / jamais / aucun", sens: "Le contraire : cela ne se passe pas." },
  { mot: "tous / certains", sens: "Tous = personne n'est oublié. Certains = quelques-uns seulement." },
  { mot: "si … sinon", sens: "Si c'est vrai, on fait une chose. Si ce n'est pas vrai, on fait l'autre." },
  { mot: "dès que", sens: "Tout de suite après que quelque chose arrive." },
  { mot: "bien que", sens: "Malgré quelque chose : c'est surprenant." },
  { mot: "parce que / car", sens: "La raison : pourquoi cela arrive." }
];
