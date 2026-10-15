/* ============================================================
   LE CHAMPIONNAT : tournoi national de fin de collège (Nankatsu)
   BROUILLON À VÉRIFIER : adversaires, ordre et scores viennent d'une seule
   page de wiki (captaintsubasa.fandom.com : « Nankatsu Middle School »).
   Les textes d'histoire sont courts et simples exprès (l'élève doit pouvoir les lire).
   - niveau : difficulté des questions du match (1 = grossier … 5 = très fin)
   - image : nom du fichier à ranger dans assets/histoire/ (Julie les trouvera)
   ============================================================ */
window.JEU = window.JEU || {};

JEU.championnat = {
  titre: "Le Tournoi National",
  equipe: "Nankatsu",
  prologue: {
    image: "histoire-00-prologue",
    texte: [
      "Nankatsu est une équipe de collégiens qui adore le football.",
      "Leur capitaine s'appelle Tsubasa Ozora. Il porte le numéro 10.",
      "Cette année, l'équipe veut gagner le Tournoi National, le grand championnat des collèges du Japon.",
      "Pour y arriver, il faut gagner match après match. Chaque match est plus difficile que le précédent.",
      "Prêt à jouer ? Le commentateur va raconter chaque action. Lis bien, et choisis la bonne réponse !"
    ]
  },

  /* Les joueurs de Nankatsu (numéro de maillot -> nom, poste).
     Servira à la mini-carte et au commentaire. */
  joueurs: [
    { n: 1,  nom: "Morisaki",  poste: "gardien" },
    { n: 2,  nom: "Nakazato",  poste: "défenseur" },
    { n: 3,  nom: "Nagano",    poste: "attaquant" },
    { n: 4,  nom: "Oda",       poste: "défenseur" },
    { n: 5,  nom: "Iwami",     poste: "milieu" },
    { n: 6,  nom: "Takasugi",  poste: "défenseur" },
    { n: 7,  nom: "Taki",      poste: "attaquant" },
    { n: 8,  nom: "Izawa",     poste: "milieu" },
    { n: 9,  nom: "Kisugi",    poste: "attaquant" },
    { n: 10, nom: "Tsubasa",   poste: "milieu", capitaine: true },
    { n: 14, nom: "Ishizaki",  poste: "défenseur" },
    { n: 15, nom: "Okawa",     poste: "défenseur" },
    { n: 16, nom: "Yamamori",  poste: "milieu" }
  ],

  matchs: [
    { id: "m1", tour: "1er tour", adversaire: "Azumaichi", niveau: 1, scoreHistoire: "2-1",
      image: "histoire-01-azumaichi",
      contexte: "C'est le premier match du tournoi. Les joueurs de Nankatsu sont un peu stressés. L'équipe d'Azumaichi n'est pas très connue, mais elle se bat de toutes ses forces." },
    { id: "m2", tour: "2e tour", adversaire: "Nishikigaoka", niveau: 2, scoreHistoire: "6-0",
      image: "histoire-02-nishikigaoka",
      contexte: "Nankatsu a gagné son premier match. Maintenant, il joue contre Nishikigaoka. Les joueurs ont plus confiance en eux : ils veulent marquer beaucoup de buts." },
    { id: "m3", tour: "3e tour", adversaire: "Hanawa", niveau: 2, scoreHistoire: "3-2",
      image: "histoire-03-hanawa",
      contexte: "Hanawa joue bien et ne se laisse pas faire. Le match est serré. Nankatsu doit rester concentré jusqu'à la dernière minute." },
    { id: "m4", tour: "Quart de finale", adversaire: "Hirado", niveau: 3, scoreHistoire: "4-3",
      image: "histoire-04-hirado",
      contexte: "Il ne reste que huit équipes. Un seul faux pas et c'est fini. Face à Hirado, les deux équipes marquent beaucoup : il faudra lire chaque action avec attention." },
    { id: "m5", tour: "Demi-finale", adversaire: "Furano", niveau: 4, scoreHistoire: "3-2",
      image: "histoire-05-furano",
      contexte: "Furano vient du nord du pays et son joueur Matsuyama est très fort. Il ne reste que quatre équipes. Qui jouera la finale ?" },
    { id: "m6", tour: "Finale", adversaire: "Toho Academy", niveau: 5, scoreHistoire: "4-4",
      image: "histoire-06-toho",
      contexte: "C'est la finale ! En face, il y a Toho Academy, avec Hyuga et Wakashimazu, deux grands joueurs. Le match va être très, très serré. Chaque mot compte." }
  ]
};
