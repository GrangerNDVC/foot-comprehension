/* ============================================================
   NOMS DES JOUEURS ET DES ÉQUIPES : version « manga » (japonaise) et version « Olive et Tom » (française).
   L'élève choisit sur l'écran du menu. Toutes les questions, les textes d'histoire et les écrans
   écrivent les noms à travers ce tableau : pour corriger un nom, il suffit de le changer ici.
   joueurs : numéro de maillot -> [nom manga, nom français]
   ============================================================ */
window.JEU = window.JEU || {};
JEU.nomsTable = {
  joueurs: {
    1:  ["Morisaki",  "Alan"],
    2:  ["Nakazato",  "Jacques"],
    3:  ["Nagano",    "Charlie"],
    4:  ["Oda",       "Billie"],
    5:  ["Iwami",     "David"],
    6:  ["Takasugi",  "Bob"],
    7:  ["Taki",      "Ted"],
    8:  ["Izawa",     "Paul"],
    9:  ["Kisugi",    "Johnny"],
    10: ["Tsubasa",   "Olivier"],
    11: ["Misaki",    "Ben"],
    14: ["Ishizaki",  "Bruce"],
    15: ["Okawa",     "Arthur"],
    16: ["Yamamori",  "Peter"]
  },
  /* Autres personnes citées dans l'histoire (texte seulement) : [manga, français] */
  autres: [
    ["Tsubasa Ozora", "Olivier Atton"],
    ["Hyuga", "Mark"],
    ["Wakashimazu", "Ed"],
    ["Matsuyama", "Philipe"]
  ],
  /* Équipes : [manga, français] */
  equipes: [
    ["Nankatsu", "Newteam"],
    ["Azumaichi", "Alarme"],
    ["Nishikigaoka", "Nishikigaoka"],
    ["Hanawa", "Hot-Dog"],
    ["Hirado", "Hirado"],
    ["Furano", "Flynet"],
    ["Toho Academy", "Toho Academy"],
    ["Toho", "Toho"]
  ]
};
