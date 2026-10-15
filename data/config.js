/* ============================================================
   RÉGLAGES DU MATCH — tout ce qui change la difficulté ou le rythme est ici.
   On peut corriger ces valeurs sans toucher au moteur (js/regles.js).
   ============================================================ */
window.JEU = window.JEU || {};

JEU.config = {

  /* Les 11 joueurs de Nankatsu sur le terrain (numéros de maillot de championnat.js) */
  titulaires: [1, 2, 4, 6, 14, 5, 8, 10, 3, 7, 9],

  /* Le terrain est une ligne de positions 0 … zones.
     0 = devant notre but, zones = devant le but adverse.
     Le ballon avance d'une position à chaque passe réussie. */
  terrain: {
    zones: 6,
    milieu: 3           // position du coup d'envoi (3 = milieu de terrain)
    // Tir normal à partir de la position zones-1, tir lointain (plus difficile) à zones-2.
  },

  /* Guts = énergie. Les actions fortes en consomment ; les bonnes réponses en redonnent. */
  guts: {
    max: 100,
    depart: 50,
    gainPremierEssai: 10,     // bonne réponse du premier coup
    gainDeuxiemeEssai: 5,     // bonne réponse à la deuxième chance
    cout: { passe: 0, dribble: 10, tir: 20, couper: 0, tacler: 10, bloquer: 10, degager: 0, gardien: 0 },
    aideEliminer: 25          // dépenser des guts pour éliminer une mauvaise réponse
  },

  /* Niveau de la question = niveau du match + réglage + ce décalage selon l'action (1 à 5). */
  niveauAction: {
    passe: 0,
    dribble: 0, dribbleProche: 1,   // dribble près du but : +1
    tir: 1, tirLointain: 2,         // tir depuis la surface : +1 ; tir lointain : +2
    couper: 0, tacler: 1, bloquer: 0, degager: -1,
    gardien: 1
  },

  /* Réglage automatique de la difficulté pendant le match */
  adaptatif: {
    echecs: 2,        // 2 premières réponses fausses d'affilée -> question un cran plus facile
    reussites: 3,     // 3 bonnes réponses du premier coup d'affilée -> un cran plus dur
    min: -1, max: 1
  },

  /* Après le match d'essai : réglage du niveau de départ pour la suite (-1, 0 ou +1) */
  calibrage: {
    tauxHaut: 0.80,   // au moins 80 % de réussite du premier coup -> +1
    tauxBas: 0.40     // au plus 40 % -> -1
  },

  /* Combien d'indices voit-on au départ pour les questions « Qui est-ce ? » (indices[]) */
  indicesAuDepart: 2,

  /* Règles de chaque match.
     actionsParMiTemps : nombre de questions par mi-temps (le chrono en est déduit)
     auto : true = pas de choix d'action (une question par action)
     actionsAttaque / actionsDefense : les commandes disponibles
     prolongation : nombre de questions en cas d'égalité (le premier but gagne)
     Réglages d'équilibre (facultatifs) :
       defenseRequise : bonnes réponses de suite pour récupérer le ballon en « coupant » (1 par défaut)
       departAdv : où l'adversaire engage (0 = devant notre but, 2 par défaut) : plus c'est bas, plus c'est dangereux
       contre : où l'adversaire se retrouve quand on perd le ballon en attaquant (1 par défaut)
       defenseBonus : niveau en plus pour les questions de défense et de gardien (0 par défaut) */
  matchs: {
    m1: { nom: "Match d'essai", auto: true,  niveauBase: 2, actionsParMiTemps: 5,  prolongation: 0 },
    m2: { auto: false, actionsAttaque: ["passe", "tir"],
          actionsDefense: ["couper", "tacler"],            actionsParMiTemps: 8,  prolongation: 4 },
    m3: { auto: false, actionsAttaque: ["passe", "dribble", "tir"],
          actionsDefense: ["couper", "tacler", "degager"], actionsParMiTemps: 9,  prolongation: 4 },
    m4: { auto: false, actionsAttaque: ["passe", "dribble", "tir"],
          actionsDefense: ["couper", "tacler", "bloquer", "degager"], actionsParMiTemps: 10, prolongation: 4 },
    m5: { auto: false, defenseBonus: 1, actionsAttaque: ["passe", "dribble", "tir"],
          actionsDefense: ["couper", "tacler", "bloquer", "degager"], actionsParMiTemps: 10, prolongation: 4 },
    m6: { auto: false, defenseBonus: 1, departAdv: 1, actionsAttaque: ["passe", "dribble", "tir"],
          actionsDefense: ["couper", "tacler", "bloquer", "degager"], actionsParMiTemps: 12, prolongation: 6 }
  }
};
