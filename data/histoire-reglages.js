/* ============================================================
   RÉGLAGES DES ÉCRANS D'HISTOIRE (chantier 8)
   Les images d'histoire sont COMPOSÉES par le jeu : décors du chantier 1 + sprites des équipes (couleurs des maillots).
   Rien à générer. Tout se règle ici, sans toucher à js/histoire.js.

   Si tu ajoutes un jour ta propre image dans assets/histoire/ (nom = champ « image » de data/championnat.js,
   par exemple assets/histoire/histoire-03-hanawa.png), elle remplace automatiquement la scène composée.

   COMMENT LIRE
   - La scène fait 256 x 224 « pixels NES » (le jeu l'agrandit 2 fois). x : 0 à gauche, 256 à droite.
     y : les PIEDS du joueur (sol des joueurs : 175 à 212). Les joueurs plus bas sont devant les autres.
   - Chaque scène a deux versions : "avant" (avant le match) et "apres" (après une victoire).
   - ambiance : voir « ambiances » ci-dessous.
   - decor : "tribune" (grandes tribunes), "tableau" (le tableau d'affichage en grand), "but" (une cage à droite)
   - acteurs : { eq: "nous" | "adv", n: numéro de maillot, pose, x, y, flip, gardien }
       flip : true = le joueur regarde vers la GAUCHE (les adversaires le sont presque toujours)
       pose : une pose de l'atlas des joueurs (course__1 à 4, course-balle__1 à 4, saut__1, tir-sol__1,
              reception-sol__1, tacle__1, arret__1 ...) ; pour un gardien : attrape__1, saut-haut__1, poing__1 ...
       pose peut être une liste [p1, p2...] : la pose change 6 fois par seconde (course animée)
   - balle : { x, y } (centre du ballon), facultatif
   ============================================================ */
window.JEU = window.JEU || {};

JEU.histoireReglages = {
  largeur: 256, hauteur: 224,
  images: ["stadium-02", "goal-nets-06", "clouds-02", "ballon_ballon_10", "ballon_ballon_12"],

  /* Ambiances : couleurs du ciel (bandes du haut vers le bas), de la pelouse, voile sur le décor, étoiles, nuages { x, y, s = taille 1 à 3 } */
  ambiances: {
    matin: { ciel: ["#64b0ff", "#8cc8ff"], pelouse: ["#0c9300", "#14a600"], nuages: [{ x: 20, y: 22, s: 2 }, { x: 170, y: 40, s: 1 }] },
    jour:  { ciel: ["#64b0ff", "#64b0ff"], pelouse: ["#0c9300", "#14a600"], nuages: [{ x: 150, y: 16, s: 2 }, { x: 30, y: 44, s: 1 }] },
    soir:  { ciel: ["#64b0ff", "#a8b8f0", "#f8b8c8"], pelouse: ["#0a8200", "#119500"], voile: "rgba(120,40,90,0.18)", nuages: [{ x: 40, y: 30, s: 2 }] },
    gris:  { ciel: ["#8898b0", "#a8b4c8"], pelouse: ["#0a8200", "#119500"], voile: "rgba(60,80,110,0.22)", nuages: [{ x: 10, y: 8, s: 3 }, { x: 140, y: 30, s: 3 }] },
    nuit:  { ciel: ["#080830", "#101050", "#181868"], pelouse: ["#067000", "#0a8000"], voile: "rgba(10,10,70,0.55)", etoiles: true, projecteurs: true },
    fete:  { ciel: ["#64b0ff", "#8cc8ff"], pelouse: ["#0c9300", "#14a600"], nuages: [{ x: 120, y: 20, s: 2 }], confettis: true }
  },

  /* Les scènes. Pour chaque match : id du match (data/championnat.js) ; « prologue » et « fin » en plus. */
  scenes: {
    prologue: {
      equipesBanniere: ["nankatsu"],
      avant: { ambiance: "matin", decor: "tribune",
        acteurs: [
          { eq: "nous", n: 7,  pose: ["course__1", "course__2", "course__3", "course__4"], x: 44,  y: 182 },
          { eq: "nous", n: 8,  pose: "reception-sol__1", x: 98,  y: 180 },
          { eq: "nous", n: 9,  pose: "reception-sol__2", x: 158, y: 180 },
          { eq: "nous", n: 11, pose: ["course__2", "course__3", "course__4", "course__1"], x: 212, y: 182 },
          { eq: "nous", n: 10, pose: "course-balle__1", x: 128, y: 214 }
        ] }
    },

    m1: { equipesBanniere: ["azumaichi"],
      avant: { ambiance: "jour", decor: "tribune",
        acteurs: [
          { eq: "nous", n: 2,  pose: "reception-sol__1", x: 40,  y: 182 },
          { eq: "nous", n: 10, pose: "course-balle__1", x: 92,  y: 212 },
          { eq: "adv",  n: 9,  pose: "reception-sol__1", x: 214, y: 182, flip: true },
          { eq: "adv",  n: 10, pose: "course__2", x: 166, y: 212, flip: true }
        ], balle: { x: 132, y: 208 } },
      apres: { ambiance: "fete", decor: "tribune",
        acteurs: [
          { eq: "nous", n: 10, pose: "saut__1", x: 64,  y: 206 },
          { eq: "nous", n: 11, pose: "saut__1", x: 128, y: 190 },
          { eq: "nous", n: 7,  pose: "saut__1", x: 192, y: 208 }
        ] } },

    m2: { equipesBanniere: ["nishikigaoka"],
      avant: { ambiance: "jour", decor: "but",
        acteurs: [
          { eq: "nous", n: 10, pose: ["course-balle__1", "course-balle__2", "course-balle__3", "course-balle__4"], x: 70, y: 210 },
          { eq: "nous", n: 9,  pose: ["course__1", "course__2", "course__3", "course__4"], x: 36, y: 186 },
          { eq: "adv",  n: 1,  gardien: true, pose: "attrape__1", x: 192, y: 196, flip: false }
        ] },
      apres: { ambiance: "fete", decor: "but",
        acteurs: [
          { eq: "nous", n: 10, pose: "saut__1", x: 56, y: 206 },
          { eq: "nous", n: 9,  pose: "saut__1", x: 120, y: 190 }
        ], balle: { x: 196, y: 190 } } },

    m3: { equipesBanniere: ["hanawa"],
      avant: { ambiance: "jour", decor: "tableau",
        acteurs: [
          { eq: "nous", n: 10, pose: "course-balle__1", x: 76,  y: 212 },
          { eq: "adv",  n: 10, pose: "course__3", x: 150, y: 212, flip: true },
          { eq: "adv",  n: 9,  pose: "reception-sol__1", x: 214, y: 184, flip: true },
          { eq: "nous", n: 2,  pose: "reception-sol__2", x: 28,  y: 184 }
        ] },
      apres: { ambiance: "fete", decor: "tableau",
        acteurs: [
          { eq: "nous", n: 10, pose: "saut__1", x: 80,  y: 206 },
          { eq: "nous", n: 8,  pose: "saut__1", x: 156, y: 192 }
        ] } },

    m4: { equipesBanniere: ["hirado"],
      avant: { ambiance: "soir", decor: "tribune",
        acteurs: [
          { eq: "nous", n: 10, pose: "course-balle__1", x: 84,  y: 212 },
          { eq: "nous", n: 11, pose: "reception-sol__1", x: 34, y: 184 },
          { eq: "adv",  n: 10, pose: "reception-sol__1", x: 174, y: 212, flip: true },
          { eq: "adv",  n: 9,  pose: "course__2", x: 222, y: 184, flip: true }
        ] },
      apres: { ambiance: "fete", decor: "tribune",
        acteurs: [
          { eq: "nous", n: 10, pose: "saut__1", x: 70,  y: 208 },
          { eq: "nous", n: 11, pose: "saut__1", x: 134, y: 190 },
          { eq: "nous", n: 9,  pose: "saut__1", x: 196, y: 208 }
        ] } },

    m5: { equipesBanniere: ["furano"],
      avant: { ambiance: "gris", decor: "tribune",
        acteurs: [
          { eq: "nous", n: 11, pose: "course-balle__1", x: 74,  y: 212 },
          { eq: "nous", n: 10, pose: "reception-sol__1", x: 30, y: 184 },
          { eq: "adv",  n: 10, pose: "reception-sol__1", x: 176, y: 212, flip: true },
          { eq: "adv",  n: 7,  pose: "course__2", x: 226, y: 184, flip: true }
        ] },
      apres: { ambiance: "fete", decor: "tribune",
        acteurs: [
          { eq: "nous", n: 10, pose: "saut__1", x: 76,  y: 208 },
          { eq: "nous", n: 11, pose: "saut__1", x: 140, y: 190 },
          { eq: "nous", n: 8,  pose: "saut__1", x: 200, y: 208 }
        ] } },

    m6: { equipesBanniere: ["toho", "nankatsu"],
      avant: { ambiance: "nuit", decor: "tableau",
        acteurs: [
          { eq: "nous", n: 10, pose: "course-balle__1", x: 82,  y: 214 },
          { eq: "adv",  n: 10, pose: "reception-sol__1", x: 176, y: 214, flip: true },
          { eq: "adv",  n: 9,  pose: "course__2", x: 226, y: 190, flip: true },
          { eq: "nous", n: 2,  pose: "reception-sol__2", x: 26, y: 186 }
        ] },
      apres: { ambiance: "nuit", decor: "tableau", confettis: true,
        acteurs: [
          { eq: "nous", n: 10, pose: "saut__1", x: 60,  y: 210 },
          { eq: "nous", n: 11, pose: "saut__1", x: 118, y: 192 },
          { eq: "nous", n: 9,  pose: "saut__1", x: 176, y: 210 },
          { eq: "nous", n: 7,  pose: "saut__1", x: 224, y: 192 }
        ] } },

    /* Écran de fin du championnat : la coupe, l'équipe qui saute de joie */
    fin: { equipesBanniere: ["nankatsu"],
      apres: { ambiance: "nuit", decor: "tableau", confettis: true, coupe: { x: 128, y: 204 },
        acteurs: [
          { eq: "nous", n: 7,  pose: "saut__1", x: 36,  y: 196 },
          { eq: "nous", n: 11, pose: "saut__1", x: 84,  y: 212 },
          { eq: "nous", n: 10, pose: "saut__1", x: 172, y: 212 },
          { eq: "nous", n: 9,  pose: "saut__1", x: 220, y: 196 }
        ] } }
  }
};
