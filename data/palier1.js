/* ============================================================
   QUESTIONS « Qui est-ce ? » (indices de plus en plus fins)  ·  type : passe
   (anciennes questions du palier 1, en attendant la banque du chantier 5)

   Format d'une question (le même pour toutes les banques) :
   - id, niveau (1 grossier … 5 fin), type : passe | dribble | tir | defense
   - format : "choix" (une seule bonne réponse, par défaut)
              "barrer" (plusieurs bonnes réponses : bonne = [0, 2])
              "vrai-faux-nsp" (options = Oui / Non / On ne peut pas savoir)
   - consigne (le texte à lire), situation (facultatif), question
   - indices[] (facultatif : du plus général au plus précis)
   - options[], bonne (numéro de la bonne, 0 = la première)
   - mot : le mot ou groupe de mots qui décide (surligné en cas d'indice et à la correction)
   - regle : une clé de data/regles.js (la règle du carnet)
   - explication : { bonne, cle, piege }  -> 3 lignes courtes
   ============================================================ */
JEU.items[1] = [
  {
    id: "p1-01", niveau: 1, type: "passe", format: "choix", question: "Qui est-ce ?",
    indices: [
      "C'est une personne que l'on voit pendant un match.",
      "Elle n'est pas assise dans les gradins.",
      "Elle est sur le terrain avec les joueurs.",
      "Elle décide quand le match commence et quand il finit."
    ],
    options: ["Le gardien", "L'arbitre", "L'entraîneur", "Le supporter"], bonne: 1,
    mot: "décide", regle: "fait",
    explication: {
      bonne: "L'arbitre.",
      cle: "Il « décide quand le match commence et quand il finit ».",
      piege: "Le gardien est aussi sur le terrain, mais il ne décide pas."
    }
  },
  {
    id: "p1-02", niveau: 1, type: "passe", format: "choix", question: "Qu'est-ce que c'est ?",
    indices: [
      "C'est quelque chose que l'on voit pendant un match.",
      "On peut le tenir dans une main.",
      "Ce n'est pas un vêtement.",
      "Il ne roule pas et on souffle dedans pour faire du bruit."
    ],
    options: ["Un ballon", "Un but", "Un maillot", "Un sifflet"], bonne: 3,
    mot: "souffle", regle: "neg",
    explication: {
      bonne: "Un sifflet.",
      cle: "« On souffle dedans pour faire du bruit ».",
      piege: "Le ballon se tient dans la main, mais il roule : l'indice dit « ne roule pas »."
    }
  },
  {
    id: "p1-03", niveau: 1, type: "passe", format: "choix", question: "Où sommes-nous ?",
    indices: [
      "Il y a beaucoup de monde.",
      "On est dehors.",
      "Les gens sont assis dans des gradins.",
      "Ils regardent un match."
    ],
    options: ["Au stade", "À la piscine", "À la cantine", "Au cinéma"], bonne: 0,
    mot: "gradins", regle: "croiser",
    explication: {
      bonne: "Au stade.",
      cle: "« Dehors » + « gradins » + « un match » : les trois vont ensemble.",
      piege: "Le cinéma a des sièges, mais on n'y est pas dehors."
    }
  },
  {
    id: "p1-04", niveau: 2, type: "passe", format: "choix", question: "Que s'est-il passé ?",
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
    mot: "poussé", regle: "neg",
    explication: {
      bonne: "L'arbitre a sifflé une faute.",
      cle: "Un joueur « en a poussé un autre » : c'est une faute.",
      piege: "Pas de but (ballon pas entré), pas de pluie (ciel bleu)."
    }
  },
  {
    id: "p1-05", niveau: 2, type: "passe", format: "choix", question: "Qui parle ?",
    indices: [
      "Cette personne parle pendant le match.",
      "Elle ne joue pas.",
      "Elle ne donne pas de conseils aux joueurs.",
      "Elle raconte le match à des gens qui l'écoutent à la radio."
    ],
    options: ["Le gardien", "L'entraîneur", "Le commentateur", "Un supporter"], bonne: 2,
    mot: "raconte", regle: "fait",
    explication: {
      bonne: "Le commentateur.",
      cle: "Elle « raconte le match à la radio ».",
      piege: "L'entraîneur parle, mais il donne des conseils : l'indice dit que non."
    }
  },
  {
    id: "p1-06", niveau: 3, type: "passe", format: "choix", question: "À quel moment sommes-nous ?",
    indices: [
      "Les joueurs sont dans le vestiaire.",
      "Le score est déjà de 1 à 1.",
      "Le match n'est pas encore fini.",
      "Le coach donne des conseils avant que les joueurs retournent sur le terrain."
    ],
    options: ["Avant le match", "À la mi-temps", "Après le match", "Pendant un tir au but"], bonne: 1,
    mot: "déjà", regle: "croiser",
    explication: {
      bonne: "À la mi-temps.",
      cle: "Score « déjà » 1 à 1 (donc commencé) + « pas encore fini ».",
      piege: "Avant le match, le score serait de 0 à 0."
    }
  },
  {
    id: "p1-07", niveau: 3, type: "passe", format: "choix", question: "Qui est-ce ?",
    indices: [
      "C'est un joueur de l'équipe.",
      "Il peut courir dans tout le terrain.",
      "Son travail principal est de marquer des buts.",
      "Il joue le plus près du but des adversaires."
    ],
    options: ["Le défenseur", "L'attaquant", "Le milieu de terrain", "Le gardien"], bonne: 1,
    mot: "marquer", regle: "fait",
    explication: {
      bonne: "L'attaquant.",
      cle: "Son travail : « marquer des buts », près du but adverse.",
      piege: "Le défenseur protège son propre but, il ne cherche pas à marquer."
    }
  }
];
