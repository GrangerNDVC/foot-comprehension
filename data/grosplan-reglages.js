/* ============================================================
   RÉGLAGES DES GROS PLANS (chantier 4)
   Tout ce qui se règle dans les scènes (positions, durées, poses, décor) est ICI.
   Aucun besoin de toucher à js/grosplan.js.

   COMMENT LIRE CE FICHIER
   - La scène fait 240 x 150 « pixels NES » (le jeu l'agrandit 2 fois : 480 x 300).
     x : 0 à gauche, 240 à droite.  y : 0 en haut, 150 en bas. Le sol des joueurs est vers y = 134 à 142.
   - Nankatsu attaque toujours vers la DROITE. L'adversaire regarde donc vers la GAUCHE (flip: true).
   - Une scène = une liste d'« acteurs » (joueurs, gardiens, ballon) ; chaque acteur = une liste de « segments ».
       joueur : qui est dessiné
          "porteur"      le joueur de Nankatsu en jeu (son numéro vient du match)
          "cible"        un coéquipier (le destinataire d'une passe)
          "adv"          l'adversaire en face (maillot et joueur de l'équipe adverse)
          "adv2"         un autre adversaire de la même équipe
          "gardienNous"  le gardien de Nankatsu ;  "gardienEux" le gardien adverse
          "balle"        le ballon (dessiné seulement pendant ses segments)
       flip : true = le joueur regarde vers la gauche
       segments : [ { t: [début, fin], pose, de: [x, y], a: [x, y], arc, rythme, sansBalle } , ... ]
          t        moments de la scène, de 0 (début) à 1 (fin)
          pose     nom d'une pose (voir la liste en bas), ou une liste de poses qui se répètent (course)
          rythme   images par seconde quand pose est une liste (8 à 12 = course tranquille)
          de / a   position de départ et d'arrivée (x, y) : y = les PIEDS du joueur ; pour le ballon : son CENTRE
          arc      hauteur (en pixels) de la courbe du déplacement (ballon qui monte puis descend)
          sansBalle  true = on efface le ballon dessiné dans la pose (le vrai ballon prend le relais)
       Avant son premier segment, un acteur reste à sa position de départ ; après le dernier, il reste à sa position d'arrivée.
       (Sauf le ballon, qui n'existe que pendant ses segments ; ajoute  reste: true  pour qu'il reste après.)
   - Les scènes de tir changent selon le niveau de la question (voir « tirParNiveau »).
   - « gardien » (tir de l'adversaire) reprend les scènes de tir en miroir.
   ============================================================ */
window.JEU = window.JEU || {};

(function () {
  function cycle(nom, n) { var t = [], i; for (i = 1; i <= n; i++) { t.push(nom + "__" + i); } return t; }
  var COURSE_BALLE = cycle("course-balle", 4);
  var COURSE = cycle("course", 4);
  var COURSE_TETE = cycle("course-tete-tournee", 4);

  var SOL = 140;        // pieds des joueurs au premier plan
  var SOL2 = 134;       // pieds des joueurs au second plan
  var BUT = { x: 142, y: 50, l: 94, h: 82 };   // le but : coin haut-gauche, largeur, hauteur (sol du but = y + h)
  var GX = 190, GY = 132;                        // le gardien dans son but : x du centre, y des pieds

  /* ---------- les scènes ---------- */
  var scenes = {

    /* PASSE : Nankatsu passe à un coéquipier */
    passe: {
      ok: { fond: "pelouse", duree: 1900, acteurs: [
        { joueur: "adv", flip: true, segments: [ { t: [0, 1], pose: COURSE, rythme: 8, de: [238, SOL2], a: [228, SOL2] } ] },
        { joueur: "porteur", segments: [
          { t: [0, 0.30], pose: COURSE_BALLE, rythme: 10, de: [26, SOL], a: [62, SOL] },
          { t: [0.30, 0.50], pose: "reception-sol__1", de: [62, SOL] },
          { t: [0.50, 1], pose: COURSE, rythme: 10, de: [62, SOL], a: [92, SOL] } ] },
        { joueur: "cible", flip: true, segments: [
          { t: [0, 0.62], pose: COURSE, rythme: 9, de: [180, SOL], a: [168, SOL] },
          { t: [0.62, 0.74], pose: "reception-sol__1", de: [168, SOL] },
          { t: [0.74, 1], pose: "reception-sol__2", de: [168, SOL] } ] },
        { joueur: "balle", segments: [ { t: [0.32, 0.72], de: [80, 133], a: [148, 133], arc: 10 } ] }
      ] },
      ko: { fond: "pelouse", duree: 1900, acteurs: [
        { joueur: "cible", segments: [ { t: [0, 1], pose: COURSE_TETE, rythme: 9, de: [196, SOL2], a: [214, SOL2] } ] },
        { joueur: "porteur", segments: [
          { t: [0, 0.30], pose: COURSE_BALLE, rythme: 10, de: [26, SOL], a: [62, SOL] },
          { t: [0.30, 0.50], pose: "reception-sol__1", de: [62, SOL] },
          { t: [0.50, 1], pose: COURSE, rythme: 10, de: [62, SOL], a: [80, SOL] } ] },
        { joueur: "adv", flip: true, segments: [
          { t: [0, 0.45], pose: COURSE, rythme: 10, de: [186, SOL], a: [152, SOL] },
          { t: [0.45, 0.60], pose: "interception-passe__1", de: [150, SOL] },
          { t: [0.60, 1], pose: "interception-passe__3", de: [150, SOL] } ] },
        { joueur: "balle", segments: [ { t: [0.32, 0.62], de: [80, 133], a: [134, 109], arc: 8 } ] }
      ] }
    },

    /* DRIBBLE : Nankatsu dribble l'adversaire */
    dribble: {
      ok: { fond: "pelouse", duree: 2000, defilement: 120, vitesse: true, acteurs: [
        { joueur: "adv", flip: true, segments: [
          { t: [0, 0.38], pose: COURSE, rythme: 10, de: [232, SOL], a: [176, SOL] },
          { t: [0.38, 1], pose: "tacle__1", de: [176, SOL], a: [60, SOL] } ] },
        { joueur: "porteur", segments: [ { t: [0, 1], pose: COURSE_BALLE, rythme: 12, de: [36, SOL], a: [150, SOL] } ] }
      ] },
      ko: { fond: "pelouse", duree: 2000, defilement: 60, acteurs: [
        { joueur: "porteur", segments: [
          { t: [0, 0.5], pose: COURSE_BALLE, rythme: 12, de: [36, SOL], a: [104, SOL] },
          { t: [0.5, 1], pose: "blesse__1", de: [104, SOL], a: [60, SOL], arc: 26 } ] },
        { joueur: "adv", flip: true, segments: [
          { t: [0, 0.45], pose: COURSE, rythme: 10, de: [230, SOL], a: [160, SOL] },
          { t: [0.45, 1], pose: "tacle__2", de: [160, SOL], a: [150, SOL] } ] }
      ] }
    },

    /* TIR : quatre façons de tirer, de plus en plus spectaculaires (voir tirParNiveau) */
    tir: {
      styles: {
        sol: {
          ok: { fond: "but", duree: 2000, but: BUT, filet: 0.66, acteurs: [
            { joueur: "porteur", segments: [
              { t: [0, 0.32], pose: COURSE_BALLE, rythme: 11, de: [22, SOL], a: [52, SOL] },
              { t: [0.32, 1], pose: "tir-sol__1", de: [52, SOL] } ] },
            { joueur: "gardienEux", segments: [
              { t: [0, 0.34], pose: "attrape__1", de: [GX, GY] },
              { t: [0.34, 0.66], pose: "saut-haut__1", de: [GX, GY], a: [GX - 22, GY - 4], arc: 10 },
              { t: [0.66, 1], pose: "blesse__1", de: [GX - 22, GY] } ] },
            { joueur: "balle", segments: [ { t: [0.36, 0.66], de: [80, 138], a: [222, 118], reste: true } ] }
          ] },
          ko: { fond: "but", duree: 2000, but: BUT, acteurs: [
            { joueur: "porteur", segments: [
              { t: [0, 0.32], pose: COURSE_BALLE, rythme: 11, de: [22, SOL], a: [52, SOL] },
              { t: [0.32, 1], pose: "tir-sol__1", de: [52, SOL] } ] },
            { joueur: "gardienEux", segments: [
              { t: [0, 0.34], pose: "attrape__1", de: [GX, GY] },
              { t: [0.34, 0.66], pose: "saut-bas__1", de: [GX, GY], a: [GX - 14, GY] },
              { t: [0.66, 1], pose: "attrape__3", de: [GX - 14, GY] } ] },
            { joueur: "balle", segments: [ { t: [0.36, 0.66], de: [80, 138], a: [172, 112] } ] }
          ] }
        },
        volee: {
          ok: { fond: "but", duree: 2000, but: BUT, filet: 0.68, acteurs: [
            { joueur: "porteur", segments: [
              { t: [0, 0.26], pose: COURSE_BALLE, rythme: 11, de: [24, SOL], a: [54, SOL] },
              { t: [0.26, 0.42], pose: "volee-gros__1", de: [54, SOL] },
              { t: [0.42, 1], pose: "volee-gros__1", de: [54, SOL], sansBalle: true } ] },
            { joueur: "gardienEux", segments: [
              { t: [0, 0.4], pose: "attrape__1", de: [GX, GY] },
              { t: [0.4, 0.68], pose: "saut-haut__1", de: [GX, GY], a: [GX - 20, GY - 8], arc: 14 },
              { t: [0.68, 1], pose: "blesse__1", de: [GX - 20, GY] } ] },
            { joueur: "balle", segments: [ { t: [0.42, 0.68], de: [92, 131], a: [224, 84], reste: true } ] }
          ] },
          ko: { fond: "but", duree: 2000, but: BUT, acteurs: [
            { joueur: "porteur", segments: [
              { t: [0, 0.26], pose: COURSE_BALLE, rythme: 11, de: [24, SOL], a: [54, SOL] },
              { t: [0.26, 0.42], pose: "volee-gros__1", de: [54, SOL] },
              { t: [0.42, 1], pose: "volee-gros__1", de: [54, SOL], sansBalle: true } ] },
            { joueur: "gardienEux", segments: [
              { t: [0, 0.4], pose: "attrape__1", de: [GX, GY] },
              { t: [0.4, 0.68], pose: "saut-haut__1", de: [GX, GY], a: [GX - 8, GY - 10], arc: 8 },
              { t: [0.68, 1], pose: "attrape__3", de: [GX - 8, GY - 4] } ] },
            { joueur: "balle", segments: [ { t: [0.42, 0.68], de: [92, 131], a: [178, 98] } ] }
          ] }
        },
        tete: {
          ok: { fond: "but", duree: 2200, but: BUT, filet: 0.72, acteurs: [
            { joueur: "porteur", segments: [
              { t: [0, 0.22], pose: COURSE, rythme: 11, de: [24, SOL], a: [52, SOL] },
              { t: [0.22, 0.42], pose: "saut__1", de: [52, SOL], a: [58, SOL - 28] },
              { t: [0.42, 0.72], pose: "tete__2", de: [58, SOL - 28], a: [62, SOL] },
              { t: [0.72, 1], pose: COURSE, rythme: 8, de: [62, SOL], a: [70, SOL] } ] },
            { joueur: "gardienEux", segments: [
              { t: [0, 0.46], pose: "attrape__1", de: [GX, GY] },
              { t: [0.46, 0.72], pose: "saut-haut__1", de: [GX, GY], a: [GX - 22, GY - 6], arc: 14 },
              { t: [0.72, 1], pose: "blesse__1", de: [GX - 22, GY] } ] },
            { joueur: "balle", segments: [
              { t: [0.05, 0.46], de: [-6, 40], a: [74, 66], arc: -10 },
              { t: [0.46, 0.72], de: [74, 66], a: [224, 90], reste: true } ] }
          ] },
          ko: { fond: "but", duree: 2200, but: BUT, acteurs: [
            { joueur: "porteur", segments: [
              { t: [0, 0.22], pose: COURSE, rythme: 11, de: [24, SOL], a: [52, SOL] },
              { t: [0.22, 0.42], pose: "saut__1", de: [52, SOL], a: [58, SOL - 28] },
              { t: [0.42, 0.72], pose: "tete__2", de: [58, SOL - 28], a: [62, SOL] },
              { t: [0.72, 1], pose: COURSE, rythme: 8, de: [62, SOL], a: [70, SOL] } ] },
            { joueur: "gardienEux", segments: [
              { t: [0, 0.46], pose: "attrape__1", de: [GX, GY] },
              { t: [0.46, 0.72], pose: "saut-haut__1", de: [GX, GY], a: [GX - 10, GY - 10], arc: 10 },
              { t: [0.72, 1], pose: "attrape__3", de: [GX - 10, GY - 4] } ] },
            { joueur: "balle", segments: [
              { t: [0.05, 0.46], de: [-6, 40], a: [74, 66], arc: -10 },
              { t: [0.46, 0.72], de: [74, 66], a: [180, 96] } ] }
          ] }
        },
        ciseau: {
          ok: { fond: "but", duree: 2300, but: BUT, filet: 0.74, action: true, acteurs: [
            { joueur: "porteur", segments: [
              { t: [0, 0.22], pose: COURSE, rythme: 11, de: [24, SOL], a: [50, SOL] },
              { t: [0.22, 0.44], pose: "saut__1", de: [50, SOL], a: [54, SOL - 22] },
              { t: [0.44, 0.58], pose: "ciseau__1", de: [54, SOL - 36] },
              { t: [0.58, 1], pose: "ciseau__2", de: [54, SOL - 36], a: [58, SOL - 6] } ] },
            { joueur: "gardienEux", segments: [
              { t: [0, 0.48], pose: "attrape__1", de: [GX, GY] },
              { t: [0.48, 0.74], pose: "saut-haut__1", de: [GX, GY], a: [GX - 22, GY - 8], arc: 16 },
              { t: [0.74, 1], pose: "blesse__1", de: [GX - 22, GY] } ] },
            { joueur: "balle", segments: [
              { t: [0.05, 0.48], de: [-6, 20], a: [82, 56], arc: -8 },
              { t: [0.48, 0.74], de: [82, 56], a: [224, 100], reste: true } ] }
          ] },
          ko: { fond: "but", duree: 2300, but: BUT, action: true, acteurs: [
            { joueur: "porteur", segments: [
              { t: [0, 0.22], pose: COURSE, rythme: 11, de: [24, SOL], a: [50, SOL] },
              { t: [0.22, 0.44], pose: "saut__1", de: [50, SOL], a: [54, SOL - 22] },
              { t: [0.44, 0.58], pose: "ciseau__1", de: [54, SOL - 36] },
              { t: [0.58, 1], pose: "ciseau__2", de: [54, SOL - 36], a: [58, SOL - 6] } ] },
            { joueur: "gardienEux", segments: [
              { t: [0, 0.48], pose: "attrape__1", de: [GX, GY] },
              { t: [0.48, 0.74], pose: "saut-haut__1", de: [GX, GY], a: [GX - 8, GY - 12], arc: 8 },
              { t: [0.74, 1], pose: "attrape__3", de: [GX - 8, GY - 6] } ] },
            { joueur: "balle", segments: [
              { t: [0.05, 0.48], de: [-6, 20], a: [82, 56], arc: -8 },
              { t: [0.48, 0.74], de: [82, 56], a: [182, 94] } ] }
          ] }
        }
      }
    },

    /* COUPER LA PASSE : l'adversaire passe, Nankatsu essaie d'intercepter */
    couper: {
      ok: { fond: "pelouse", duree: 1900, acteurs: [
        { joueur: "adv2", segments: [ { t: [0, 1], pose: COURSE, rythme: 9, de: [40, SOL2], a: [28, SOL2] } ] },
        { joueur: "adv", flip: true, segments: [
          { t: [0, 0.30], pose: COURSE, rythme: 10, de: [218, SOL], a: [200, SOL] },
          { t: [0.30, 0.55], pose: "reception-sol__1", de: [200, SOL] },
          { t: [0.55, 1], pose: COURSE, rythme: 8, de: [200, SOL], a: [214, SOL] } ] },
        { joueur: "porteur", segments: [
          { t: [0, 0.40], pose: COURSE, rythme: 10, de: [92, SOL], a: [118, SOL] },
          { t: [0.40, 0.55], pose: "interception-passe__1", de: [118, SOL] },
          { t: [0.55, 1], pose: "interception-passe__3", de: [118, SOL] } ] },
        { joueur: "balle", segments: [ { t: [0.32, 0.58], de: [176, 133], a: [134, 109], arc: 12 } ] }
      ] },
      ko: { fond: "pelouse", duree: 1900, acteurs: [
        { joueur: "adv", flip: true, segments: [
          { t: [0, 0.30], pose: COURSE, rythme: 10, de: [218, SOL], a: [200, SOL] },
          { t: [0.30, 0.55], pose: "reception-sol__1", de: [200, SOL] },
          { t: [0.55, 1], pose: COURSE, rythme: 8, de: [200, SOL], a: [214, SOL] } ] },
        { joueur: "porteur", segments: [
          { t: [0, 0.40], pose: COURSE, rythme: 10, de: [92, SOL], a: [118, SOL] },
          { t: [0.40, 1], pose: "interception-passe__1", de: [118, SOL] } ] },
        { joueur: "adv2", segments: [
          { t: [0, 0.60], pose: COURSE, rythme: 9, de: [30, SOL2], a: [48, SOL2] },
          { t: [0.60, 1], pose: "reception-sol__2", de: [48, SOL2] } ] },
        { joueur: "balle", segments: [ { t: [0.32, 0.64], de: [176, 133], a: [68, 127] } ] }
      ] }
    },

    /* TACLER : Nankatsu tacle l'adversaire qui a le ballon */
    tacler: {
      ok: { fond: "pelouse", duree: 1900, acteurs: [
        { joueur: "adv", flip: true, segments: [
          { t: [0, 0.42], pose: COURSE_BALLE, rythme: 10, de: [226, SOL], a: [176, SOL] },
          { t: [0.42, 1], pose: "blesse__1", de: [176, SOL], a: [210, SOL], arc: 30 } ] },
        { joueur: "porteur", segments: [
          { t: [0, 0.40], pose: COURSE, rythme: 10, de: [84, SOL], a: [118, SOL] },
          { t: [0.40, 0.58], pose: "tacle__1", de: [118, SOL] },
          { t: [0.58, 1], pose: "tacle__3", de: [118, SOL] } ] },
        { joueur: "balle", segments: [ { t: [0.42, 0.60], de: [160, 134], a: [140, 118], arc: 10 } ] }
      ] },
      ko: { fond: "pelouse", duree: 1900, defilement: 40, acteurs: [
        { joueur: "adv", flip: true, segments: [ { t: [0, 1], pose: COURSE_BALLE, rythme: 11, de: [226, SOL], a: [48, SOL] } ] },
        { joueur: "porteur", segments: [
          { t: [0, 0.40], pose: COURSE, rythme: 10, de: [84, SOL], a: [118, SOL] },
          { t: [0.40, 0.55], pose: "tacle__1", de: [118, SOL] },
          { t: [0.55, 1], pose: "blesse__2", de: [118, SOL] } ] }
      ] }
    },

    /* BLOQUER : l'adversaire tire, Nankatsu essaie de bloquer le ballon */
    bloquer: {
      ok: { fond: "pelouse", duree: 1900, acteurs: [
        { joueur: "adv", flip: true, segments: [
          { t: [0, 0.28], pose: COURSE_BALLE, rythme: 11, de: [236, SOL], a: [208, SOL] },
          { t: [0.28, 1], pose: "tir-sol__1", de: [208, SOL] } ] },
        { joueur: "porteur", segments: [
          { t: [0, 0.38], pose: COURSE, rythme: 10, de: [66, SOL], a: [92, SOL] },
          { t: [0.38, 0.56], pose: "bloc__1", de: [92, SOL] },
          { t: [0.56, 1], pose: "bloc__2", de: [92, SOL] } ] },
        { joueur: "balle", segments: [ { t: [0.32, 0.58], de: [180, 136], a: [98, 84], arc: 6 } ] }
      ] },
      ko: { fond: "pelouse", duree: 1900, acteurs: [
        { joueur: "adv", flip: true, segments: [
          { t: [0, 0.28], pose: COURSE_BALLE, rythme: 11, de: [236, SOL], a: [208, SOL] },
          { t: [0.28, 1], pose: "tir-sol__1", de: [208, SOL] } ] },
        { joueur: "porteur", segments: [
          { t: [0, 0.38], pose: COURSE, rythme: 10, de: [66, SOL], a: [92, SOL] },
          { t: [0.38, 1], pose: "bloc__1", de: [92, SOL] } ] },
        { joueur: "balle", segments: [ { t: [0.32, 0.80], de: [180, 136], a: [-10, 70], arc: 18 } ] }
      ] }
    },

    /* DÉGAGER : Nankatsu dégage le ballon loin du but */
    degager: {
      ok: { fond: "pelouse", duree: 1900, acteurs: [
        { joueur: "adv", flip: true, segments: [ { t: [0, 1], pose: COURSE, rythme: 9, de: [210, SOL2], a: [196, SOL2] } ] },
        { joueur: "porteur", segments: [
          { t: [0, 0.30], pose: COURSE, rythme: 10, de: [44, SOL], a: [72, SOL] },
          { t: [0.30, 1], pose: "degagement-sol__1", de: [72, SOL] } ] },
        { joueur: "balle", segments: [ { t: [0.36, 0.90], de: [112, 134], a: [270, -20], arc: 40 } ] }
      ] },
      ko: { fond: "pelouse", duree: 1900, acteurs: [
        { joueur: "porteur", segments: [
          { t: [0, 0.30], pose: COURSE, rythme: 10, de: [44, SOL], a: [72, SOL] },
          { t: [0.30, 1], pose: "degagement-sol__1", de: [72, SOL] } ] },
        { joueur: "adv", flip: true, segments: [
          { t: [0, 0.40], pose: COURSE, rythme: 10, de: [196, SOL], a: [140, SOL] },
          { t: [0.40, 0.60], pose: "interception-passe__1", de: [140, SOL] },
          { t: [0.60, 1], pose: "interception-passe__3", de: [140, SOL] } ] },
        { joueur: "balle", segments: [ { t: [0.36, 0.62], de: [112, 134], a: [124, 109], arc: 16 } ] }
      ] }
    },

    /* GARDIEN : l'adversaire tire. On reprend les scènes de tir, en miroir :
       le tireur est l'adversaire, le gardien est celui de Nankatsu.
       ok (arrêt) = le tir « raté » de la scène de tir ; ko (but adverse) = le tir « réussi ». */
    gardien: { copieDe: "tir", miroir: true, inverse: true, roles: { porteur: "adv", gardienEux: "gardienNous" } }
  };

  JEU.grosplanReglages = {
    largeur: 240, hauteur: 150,         // taille de la scène (le canvas du jeu fait 480 x 300)
    duree: 1800,                        // durée par défaut d'une scène (millisecondes)
    pauseFin: 450,                      // pause après la scène avant de rendre la main
    equipeNous: "nankatsu",             // l'équipe du joueur (data/equipes/equipe-nankatsu.js)
    texteAu: 0.55,                      // le texte (BUT !, ARRÊT !) apparaît à ce moment de la scène

    /* Quelle équipe adverse pour chaque match (id du fichier data/equipes/equipe-xxx.js) */
    equipeParMatch: { m1: "azumaichi", m2: "nishikigaoka", m3: "hanawa", m4: "hirado", m5: "furano", m6: "toho" },

    /* Style de tir selon le niveau de la question (1 facile ... 5 très fin) */
    tirParNiveau: { 1: "sol", 2: "sol", 3: "volee", 4: "tete", 5: "ciseau" },

    /* Images du décor à charger (assets/manifest.js) */
    images: ["stadium-02", "action-effect"],

    decor: {
      ciel: "#64b0ff",
      horizon: 64,                          // y où commence la pelouse
      pelouse: ["#0c9300", "#14a600"],      // deux verts en bandes
      largeurBande: 26,
      tribune: "stadium-02"                 // image répétée en haut ; si elle manque : dessin simple
    },

    /* Poses où le ballon est dessiné dans l'image : zone à effacer [x, y, largeur, hauteur] (dans l'image de la pose) */
    masques: { "volee-gros__1": [74, 62, 21, 26] },

    scenes: scenes
  };
})();

/* ------------------------------------------------------------
   LISTE DES POSES (joueurs de champ)
   course-balle__1..4  course__1..4  course-tete-tournee__1..4
   passe__1..2  touche__1  rencontre__1  rencontre-aerienne__1  volee-petit__1..2  volee-gros__1
   tir-sol__1  tir-sol-petit__1  effet-trainee-pied__1  balle__1  saut__1  ciseau__1..2
   reception-sol__1..2  reception-air__1..2  tete__1..2  interception-aerienne__1  bloc__1..3
   interception-passe__1..3  degagement-sol__1  tacle__1..3  arret__1  blesse__1..2
   POSES DES GARDIENS
   attrape__1..4 (3 et 4 : le ballon est dans les mains)  poing__1..3  saut-bas__1  saut-haut__1  blesse__1
   penalty-debout__1  penalty-plongeon__1  passe__1..2
   ------------------------------------------------------------ */
