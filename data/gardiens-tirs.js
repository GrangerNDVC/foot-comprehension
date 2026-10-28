/* ============================================================
   LES GARDIENS DES TIRS AU BUT (chantier 15)
   Tout ce qui se règle sur les gardiens est ICI (aucun besoin de toucher à js/tirsaubut.js).

   gardiens : les 5 gardiens (images dans assets/tirs/gardien-atlas.js, clé « sprite »)
     nom, sous    : ce que voit l'élève dans le choix du gardien
     sprite       : la clé de l'image (alan, ted, thomas, rempl1, rempl2)
     couleur      : couleur du jogging quand on s'entraîne (RVB). null = l'image ne se recolore pas (Thomas Pryce, en bleu)
     niveaux      : [mini, maxi] des niveaux de questions (1 à 5) que ce gardien pose ; le niveau s'adapte tout seul dans cette plage
     types        : banques de questions : "motpetit" (petits mots), "vocabulaire" (vocabulaire des consignes)
     cats         : catégories permises : "pc" (prépositions, conjonctions, locutions), "autre" (pronoms, négation…),
                    "vocab" (vocabulaire des consignes), "hom" (homophones : a / à, on / ont… : orthographe, donc seulement pour le niveau facile)
   parEquipe : le gardien de chaque équipe dans les tirs au but de fin de match (la couleur du jogging vient de l'équipe,
               dans data/equipes/equipe-*.js ; Thomas Pryce garde son bleu).
   match     : en match, mélange petits mots + vocabulaire ; homophones seulement pour les tirs de niveau <= homophonesJusquAuNiveau.
   ============================================================ */
window.JEU = window.JEU || {};
JEU.gardiensTirs = {
  ordreTheme: ["blond", "noir"],
  ordreNiveau: ["alan", "ted", "thomas"],
  gardiens: {
    blond:  { nom: "Gardien remplaçant 1", sous: "Vocabulaire des consignes", sprite: "rempl1", couleur: [255, 214, 0],
              niveaux: [1, 5], types: ["vocabulaire"], cats: ["vocab"] },
    noir:   { nom: "Gardien remplaçant 2", sous: "Prépositions et conjonctions", sprite: "rempl2", couleur: [0, 150, 160],
              niveaux: [1, 5], types: ["motpetit"], cats: ["pc"] },
    alan:   { nom: "Alan Crocker", sous: "Niveau 1 · facile · mélange de tout", sprite: "alan", couleur: [255, 120, 0],
              niveaux: [1, 2], types: ["motpetit", "vocabulaire"], cats: ["pc", "autre", "vocab", "hom"] },
    ted:    { nom: "Ted Warner", sous: "Niveau 2 · mélange, tournures difficiles", sprite: "ted", couleur: [21, 95, 217],
              niveaux: [3, 4], types: ["motpetit", "vocabulaire"], cats: ["pc", "autre", "vocab"] },
    thomas: { nom: "Thomas Pryce", sous: "Niveau 3 · difficile · mélange", sprite: "thomas", couleur: null,
              niveaux: [4, 5], types: ["motpetit", "vocabulaire"], cats: ["pc", "autre", "vocab"] }
  },
  parEquipe: { nankatsu: "noir", azumaichi: "blond", nishikigaoka: "alan", hanawa: "alan", hirado: "blond", furano: "thomas", toho: "ted" },
  match: { types: ["motpetit", "vocabulaire"], homophonesJusquAuNiveau: 1 }
};
