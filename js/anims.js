/* ============================================================
   ANIMATIONS ET MISE EN SCÈNE DU TIR
   Tout se règle ici, sans toucher au moteur.
   Les noms (id) sont ceux de assets/manifest.js (nom du fichier sans .png).
   Les positions sont en « pixels NES » dans une scène de 320 x 200.
   ============================================================ */
window.JEU = window.JEU || {};

JEU.anims = {
  joueur: {
    attente: ["tsubasa_tir_02"],
    course:  ["tsubasa_tir_02", "tsubasa_tir_03", "tsubasa_tir_04", "tsubasa_tir_05"],
    frappe:  ["tsubasa-ground-shot-foot-blur-1"],
    apres:   ["tsubasa-ground-shot-foot-blur-2"]
  },
  gardien: {
    attente:  ["gardien-penalty-1"],
    plongeon: ["gardien-penalty-2"],   // plongeon sur le côté
    saut:     ["gardien-saut"],        // saut vers le haut (tir au centre)
    battu:    ["gardien-hurt"],
    // Dans quel sens regarde l'image d'origine du plongeon ? "droite" ou "gauche".
    // Si le gardien plonge du mauvais côté, remplace par l'autre valeur.
    sensPlongeon: "droite",
    sensSaut: "droite"
  },
  // Le ballon rétrécit en s'éloignant du tireur : du plus gros au plus petit.
  ballon: ["ballon_ballon_12", "ballon_ballon_11", "ballon_ballon_10", "ballon_ballon_09", "ballon_ballon_08"]
};

JEU.scene = JEU.scene || {};
JEU.sceneConfig = {
  largeur: 320,
  hauteur: 200,
  ciel: "#64b0ff",
  horizon: 70,                              // hauteur où commence la pelouse
  pelouse: ["#0c9300", "#14a600"],          // deux verts en bandes
  tribune: { id: "stadium-02", y: 6 },      // image répétée sur la largeur
  but: { x0: 130, x1: 295, haut: 95, sol: 150 },   // le but est dessiné par le code
  joueur: { x: 62, pied: 190 },             // position du tireur (pieds au sol)
  gardien: { x: 212, pied: 150 },           // position du gardien (pieds au sol)
  ballonDepart: { x: 112, y: 182 },
  // Les 3 zones visées dans le but : gauche, centre, droite
  zones: [ { x: 168, y: 120 }, { x: 212, y: 112 }, { x: 257, y: 120 } ]
};
