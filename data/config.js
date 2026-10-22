/* ============================================================
   RÉGLAGES DU MATCH — tout ce qui change la difficulté ou le rythme est ici.
   On peut corriger ces valeurs sans toucher au moteur (js/regles.js).
   ============================================================ */
window.JEU = window.JEU || {};

JEU.config = {

  /* Les 11 joueurs de Nankatsu sur le terrain (numéros de maillot de championnat.js).
     Le n°11 (Misaki / Ben) joue à la place du n°5 (Iwami / David), qui passe sur le banc. */
  titulaires: [1, 2, 4, 6, 14, 11, 8, 10, 3, 7, 9],
  banc: [5, 15, 16],              // remplaçants (blessure d'un joueur)
  /* Les duos : deux joueurs dont l'échange de passes (le une-deux) est la spécialité. */
  duos: [[10, 11]],

  /* Le terrain est une ligne de positions 0 … zones.
     0 = devant notre but, zones = devant le but adverse.
     Le ballon avance d'une position à chaque passe réussie. */
  terrain: {
    zones: 6,
    milieu: 3           // position du coup d'envoi (3 = milieu de terrain)
    // Tir normal à partir de la position zones-1, tir lointain (plus difficile) à zones-2.
  },

  /* Énergie : les gestes forts en consomment ; les bonnes réponses en redonnent. */
  energie: {
    max: 100,
    depart: 50,
    gainPremierEssai: 10,     // bonne réponse du premier coup
    gainDeuxiemeEssai: 5,     // bonne réponse à la deuxième chance
    aideEliminer: 25,         // dépenser de l'énergie pour éliminer une mauvaise réponse
    reprise: 10               // énergie retrouvée après un épuisement (énergie à 0 : le ballon est perdu)
  },

  /* LES GESTES : ce que l'élève choisit « en contexte ».
     action : la mécanique utilisée (passe, dribble, tir, couper, tacler, bloquer, degager, gardien)
     avance : crans gagnés par le ballon si la réponse est bonne
     niveau : décalage de difficulté de la question (plus le geste est risqué et rapide, plus la question est difficile)
     cout   : énergie dépensée       gain : crans gagnés en récupérant le ballon (défense)
     cible  : on choisit un partenaire    special : banque de questions réservée (échange de passes) */
  gestes: {
    passe:   { action: "passe",   texte: "Passe courte", avance: 1, niveau: 0, cout: 0,  cible: true,  aide: "Sûr : le ballon avance d'un cran" },
    lob:     { action: "passe",   texte: "Lob",          avance: 2, niveau: 1, cout: 10, cible: true,  aide: "Le ballon avance de deux crans" },
    uneDeux: { action: "passe",   texte: "Une-deux",     avance: 2, niveau: 1, cout: 0,  cible: true,  special: "une-deux", aide: "Leur spécialité : deux crans d'un coup" },
    dribble: { action: "dribble", texte: "Dribbler",     avance: 2, niveau: 0, cout: 10, aide: "Le ballon avance de deux crans" },
    tir:     { action: "tir",     texte: "Tirer",        niveau: 2, cout: 20, aide: "Question difficile, UNE SEULE chance : si tu rates, le ballon repart de l'autre côté" },
    couper:  { action: "couper",  texte: "Couper la passe", niveau: 0, cout: 0,  aide: "Récupère le ballon. Si tu rates : ils avancent d'un cran" },
    tacler:  { action: "tacler",  texte: "Tacler",       niveau: 1, cout: 10, gain: 1, aide: "Récupère le ballon et avance d'un cran" },
    contre:  { action: "tacler",  texte: "Contre",       niveau: 2, cout: 15, gain: 2, recul: 2, aide: "Très difficile : récupère le ballon et file en avant. Si tu rates : ils avancent de DEUX crans" },
    bloquer: { action: "bloquer", texte: "Bloquer le tir", niveau: 0, cout: 10, aide: "Seulement quand l'adversaire va tirer" },
    degager: { action: "degager", texte: "Dégager",      niveau: -1, cout: 0, aide: "Éloigne le danger" },
    gardien: { action: "gardien", texte: "Arrêt du gardien", niveau: 2, cout: 0, aide: "" }      // même difficulté que notre tir (voir R.niveau)
  },
  /* recul : crans perdus (ballon qui avance vers notre but) quand le geste de défense est raté ; 1 par défaut */

  /* Une seule chance (pas de deuxième essai) pour ces actions. Le match d'essai garde toujours la deuxième chance. */
  sansSecondeChance: ["tir", "gardien"],

  /* Montée en difficulté pendant le match : la question gagne jusqu'à « montee » niveaux entre le début et la fin du match
     (progressivement : textes plus longs et phrases plus complexes). Valeur par défaut ; chaque match peut avoir la sienne. */
  montee: 2,
  /* Suppléments de niveau : dribble près du but, tir de loin */
  niveauAction: { dribbleProche: 1, tirLointain: 1 },

  /* Sanctions : à chaque question RATÉE (deux erreurs), le compteur monte.
     Les sanctions ne touchent que le terrain (jamais de note ni de perte de progression).
     Chaque match choisit lesquelles sont actives (sanctions: ["jaune","blessure","rouge"]). */
  sanctions: {
    suite: [ { a: 3, t: "jaune" }, { a: 4, t: "blessure" }, { a: 5, t: "rouge" },
             { a: 7, t: "jaune" }, { a: 8, t: "blessure" }, { a: 9, t: "rouge" } ],
    jauneEnergie: 15,      // énergie perdue après un carton jaune
    blessureEnergie: 10,
    minJoueurs: 8          // on ne descend jamais sous ce nombre de joueurs
  },

  /* Que fait le ✖ sur une réponse ?  "neutre" : il montre le mot clé (toujours pareil, sans révéler la bonne réponse)
     "reactif" : en plus, avertit si on barre la bonne réponse (règle d'origine, mais la réaction trahit la solution) */
  croix: "neutre",

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
       defenseBonus : niveau en plus pour les questions de défense (0 par défaut ; le gardien a la même difficulté que le tir)
       tirNiveau : difficulté du tir et de l'arrêt du gardien dans ce match (par défaut celle du geste « tir » : 2) ; m2 = 1 pour un premier tir plus doux
       montee : niveaux gagnés par les questions entre le début et la fin du match (voir plus haut) */
  matchs: {
    m1: { nom: "Match d'essai", auto: true,  niveauBase: 2, montee: 0, actionsParMiTemps: 5,  prolongation: 0 },
    m2: { auto: false, montee: 1, tirNiveau: 1, actionsAttaque: ["passe", "tir"],
          actionsDefense: ["couper", "tacler"], sanctions: [],                      actionsParMiTemps: 8,  prolongation: 4 },
    m3: { auto: false, departAdv: 1, actionsAttaque: ["passe", "lob", "dribble", "tir"],
          actionsDefense: ["couper", "tacler", "degager"], sanctions: ["jaune"],      actionsParMiTemps: 9,  prolongation: 4 },
    m4: { auto: false, departAdv: 1, defenseRequise: 2, defenseBonus: 1, actionsAttaque: ["passe", "lob", "uneDeux", "dribble", "tir"],
          actionsDefense: ["couper", "tacler", "contre", "bloquer", "degager"], sanctions: ["jaune", "blessure"], actionsParMiTemps: 10, prolongation: 4 },
    m5: { auto: false, defenseBonus: 1, departAdv: 1, defenseRequise: 2, actionsAttaque: ["passe", "lob", "uneDeux", "dribble", "tir"],
          actionsDefense: ["couper", "tacler", "contre", "bloquer", "degager"], sanctions: ["jaune", "blessure", "rouge"], actionsParMiTemps: 10, prolongation: 4 },
    m6: { auto: false, defenseBonus: 1, departAdv: 1, defenseRequise: 2, contre: 0, actionsAttaque: ["passe", "lob", "uneDeux", "dribble", "tir"],
          actionsDefense: ["couper", "tacler", "contre", "bloquer", "degager"], sanctions: ["jaune", "blessure", "rouge"], actionsParMiTemps: 12, prolongation: 6 }
  }
};
