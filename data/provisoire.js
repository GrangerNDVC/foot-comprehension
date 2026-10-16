/* ============================================================
   QUESTIONS PROVISOIRES de défense (consignes de l'entraîneur) et de tirs (petits textes).
   Anciennes questions des paliers 2 et 4, réécrites avec des places {A} {B}… (plus de prénoms inventés).
   Elles seront remplacées par les banques des chantiers 6 (défense) et 7 (tirs) : supprimer ce fichier alors
   (et sa ligne <script> dans index.html).
   ============================================================ */
JEU.ajouterQuestions([

{ id: "prov-p2-01", niveau: 1, type: "defense", format: "choix", provisoire: true,
  consigne: "Tire au but avec le pied droit.",
  question: "Qui a bien fait ce que dit la consigne ?",
  options: ["{A} tire au but avec le pied droit.", "{B} prend le ballon avec les mains.", "{C} s'assoit sur le banc."],
  bonne: 0, mot: "pied droit", regle: "deux",
  explication: { bonne: "{A}.", cle: "Deux choses : tirer ET avec le pied droit.", piege: "{B} (avec les mains) et {C} (sur le banc) ne tirent pas." } },

{ id: "prov-p2-02", niveau: 1, type: "defense", format: "choix", provisoire: true,
  consigne: "Passe le ballon à {A}.",
  question: "Qui a bien fait ce que dit la consigne ?",
  options: ["{B} dribble tous les adversaires et marque.", "{B} passe le ballon à {A}.", "{B} sort du terrain."],
  bonne: 1, mot: "Passe", regle: "deux",
  explication: { bonne: "{B} passe à {A}.", cle: "« Passe » + « à {A} » : une passe, et pour {A}.", piege: "Dribbler et marquer, ce n'est pas passer." } },

{ id: "prov-p2-03", niveau: 2, type: "defense", format: "choix", provisoire: true,
  consigne: "Passe le ballon à {A}.",
  question: "Qui a bien fait ce que dit la consigne ?",
  options: ["{B} passe le ballon à {C}.", "{B} passe le ballon à {A}.", "{B} donne le ballon à l'arbitre."],
  bonne: 1, mot: "{A}", regle: "motamot",
  explication: { bonne: "{B} passe à {A}.", cle: "Le nom compte : « à {A} ».", piege: "Passer à {C}, c'est la bonne action mais pas la bonne personne." } },

{ id: "prov-p2-04", niveau: 2, type: "defense", format: "choix", provisoire: true,
  consigne: "Tire avec le pied gauche.",
  question: "Qui a bien fait ce que dit la consigne ?",
  options: ["{A} tire avec le pied droit.", "{A} tire avec la tête.", "{A} tire avec le pied gauche."],
  bonne: 2, mot: "gauche", regle: "motamot",
  explication: { bonne: "{A}, avec le pied gauche.", cle: "Un seul mot décide : « gauche ».", piege: "Le pied droit, c'est l'autre pied." } },

{ id: "prov-p2-05", niveau: 3, type: "defense", format: "choix", provisoire: true,
  consigne: "Dribble un défenseur, puis tire.",
  question: "Qui a bien fait ce que dit la consigne ?",
  options: ["{A} tire, puis il dribble un défenseur.", "{A} dribble un défenseur, puis il passe.", "{A} dribble un défenseur, puis il tire."],
  bonne: 2, mot: "puis", regle: "ordre",
  explication: { bonne: "{A} dribble, puis il tire.", cle: "« Puis » donne l'ordre : 1) dribbler, 2) tirer.", piege: "Dans « tire, puis dribble », l'ordre est inversé." } },

{ id: "prov-p2-06", niveau: 3, type: "defense", format: "choix", provisoire: true,
  consigne: "Avant de tirer, regarde où est le gardien.",
  question: "Qui a bien fait ce que dit la consigne ?",
  options: ["{A} tire, puis il regarde le gardien.", "{A} regarde le gardien, puis il tire.", "{A} regarde les supporters, puis il tire."],
  bonne: 1, mot: "Avant de tirer", regle: "ordre",
  explication: { bonne: "{A} regarde le gardien, puis il tire.", cle: "« Avant de tirer » : on regarde d'abord.", piege: "Regarder après le tir, c'est trop tard." } },

{ id: "prov-p2-07", niveau: 4, type: "defense", format: "choix", provisoire: true,
  consigne: "Ne tire pas avant d'avoir fait deux passes.",
  question: "Qui a bien fait ce que dit la consigne ?",
  options: ["{A} tire après une seule passe.", "{A} tire sans faire de passe.", "{A} tire après avoir fait deux passes."],
  bonne: 2, mot: "deux passes", regle: "nombres",
  explication: { bonne: "{A} tire après deux passes.", cle: "Il faut DEUX passes avant de tirer.", piege: "Une seule passe, ou aucune : ce n'est pas assez." } },

{ id: "prov-p2-08", niveau: 4, type: "defense", format: "choix", provisoire: true,
  consigne: "Tous les joueurs doivent toucher le ballon avant le tir.",
  situation: "Dans l'équipe, il y a trois joueurs : {A}, {B} et {C}.",
  question: "Qui a bien fait ce que dit la consigne ?",
  options: ["Seul {A} touche le ballon, puis il tire.", "{A} et {B} touchent le ballon, mais pas {C}, puis {A} tire.", "{A}, {B} et {C} touchent le ballon, puis {A} tire."],
  bonne: 2, mot: "Tous", regle: "tous",
  explication: { bonne: "{A}, {B} et {C} touchent le ballon.", cle: "« Tous » : personne n'est oublié.", piege: "Sans {C}, ce n'est plus « tous »." } },

{ id: "prov-p2-09", niveau: 5, type: "defense", format: "choix", provisoire: true,
  consigne: "Passe à {A}, sauf s'il est marqué. Dans ce cas, tire.",
  situation: "{A} est marqué par un défenseur.",
  question: "Que doit faire {B} ?",
  options: ["Il passe à {A}.", "Il tire.", "Il attend que {A} soit libre."],
  bonne: 1, mot: "sauf", regle: "sauf",
  explication: { bonne: "Il tire.", cle: "« Sauf s'il est marqué » : {A} est marqué, donc pas de passe.", piege: "« Attendre » n'est pas dans la consigne : « dans ce cas, tire »." } },

{ id: "prov-p2-10", niveau: 5, type: "defense", format: "choix", provisoire: true, legacy: true,
  consigne: "Si le gardien est à gauche, tire à droite. Sinon, tire à gauche.",
  situation: "Le gardien est au centre du but.",
  question: "Que doit faire le joueur ?",
  options: ["Il tire à droite.", "Il tire à gauche.", "Il tire au centre."],
  bonne: 1, mot: "Sinon", regle: "sisinon",
  explication: { bonne: "Il tire à gauche.", cle: "Le gardien n'est pas à gauche : c'est le « sinon ».", piege: "Tirer à droite demande un gardien à gauche." } },

{ id: "prov-p4-01", niveau: 2, type: "tir", format: "choix", provisoire: true, legacy: true,
  consigne: "Il pleut depuis ce matin. Le terrain est tout boueux. Les joueurs glissent à chaque course.",
  question: "Quelle phrase correspond le mieux au texte ?",
  options: ["Les joueurs courent facilement.", "Le terrain est difficile à cause de la pluie.", "Le match est annulé."],
  bonne: 1, mot: "glissent", regle: "pasplus",
  explication: { bonne: "Le terrain est difficile à cause de la pluie.", cle: "« Boueux » et « glissent » : c'est difficile.", piege: "« Annulé » n'est pas dans le texte." } },

{ id: "prov-p4-02", niveau: 2, type: "tir", format: "choix", provisoire: true,
  consigne: "{A} croise les doigts. C'est la dernière minute et son équipe perd d'un but. Le penalty va être tiré.",
  question: "Quelle phrase correspond le mieux au texte ?",
  options: ["{A} a peur de tirer le penalty.", "{A} espère que le penalty sera marqué.", "{A} veut que l'arbitre arrête le match."],
  bonne: 1, mot: "croise les doigts", regle: "inference",
  explication: { bonne: "{A} espère que le penalty sera marqué.", cle: "« Croiser les doigts » = espérer.", piege: "{A} ne tire pas le penalty : rien ne dit qu'il a peur." } },

{ id: "prov-p4-03", niveau: 3, type: "tir", format: "choix", provisoire: true,
  consigne: "{A} enlève son survêtement. Il attache bien ses lacets. Le coach vient de dire son nom.",
  question: "Quelle phrase correspond le mieux au texte ?",
  options: ["{A} se prépare à entrer sur le terrain.", "{A} a fini de jouer et il rentre chez lui.", "Le coach a puni {A}."],
  bonne: 0, mot: "dire son nom", regle: "pasplus",
  explication: { bonne: "{A} se prépare à entrer sur le terrain.", cle: "Survêtement enlevé + lacets + son nom appelé : il va jouer.", piege: "Rien ne dit que {A} est puni." } },

{ id: "prov-p4-04", niveau: 3, type: "tir", format: "choix", provisoire: true,
  consigne: "{A} a couru vers le ballon. Il a tiré, mais le gardien a touché le ballon du bout des doigts.",
  question: "Quelle phrase correspond le mieux au texte ?",
  options: ["Le gardien a attrapé le ballon.", "Le gardien a seulement effleuré le ballon, sans l'attraper.", "Le gardien n'a pas touché le ballon."],
  bonne: 1, mot: "du bout des doigts", regle: "detail",
  explication: { bonne: "Le gardien a seulement effleuré le ballon.", cle: "« Du bout des doigts » = à peine touché.", piege: "« Attrapé » est trop fort. « Pas touché » est faux : il l'a touché." } },

{ id: "prov-p4-05", niveau: 4, type: "tir", format: "choix", provisoire: true,
  consigne: "{A} a marqué le premier but. Ensuite, l'autre équipe a égalisé. Dans les dernières minutes, l'équipe {de:A} a repris l'avantage.",
  question: "Quelle phrase correspond le mieux au texte ?",
  options: ["L'équipe {de:A} a toujours été devant.", "Le score a été égal avant que l'équipe {de:A} repasse devant.", "L'autre équipe a gagné le match."],
  bonne: 1, mot: "égalisé", regle: "ordre",
  explication: { bonne: "Le score a été égal avant que {A} repasse devant.", cle: "« A égalisé » puis « a repris l'avantage » : dans cet ordre.", piege: "« Toujours devant » est faux : le score a été égal." } },

{ id: "prov-p4-06", niveau: 5, type: "tir", format: "choix", provisoire: true,
  consigne: "À la 89e minute, {A} aurait pu tirer. Il a pourtant passé le ballon à {B}, mieux placé. {B} a marqué et {A} a levé les bras.",
  question: "Quelle phrase correspond le mieux au texte ?",
  options: ["{A} regrette de ne pas avoir tiré.", "{A} a raté son tir.", "{A} a choisi de passer à un coéquipier mieux placé, et il est content du but."],
  bonne: 2, mot: "mieux placé", regle: "inference",
  explication: { bonne: "Il a passé à {B}, mieux placé, et il est content.", cle: "« Mieux placé » + « a levé les bras » : son choix était bon.", piege: "{A} n'a pas tiré : pas de tir raté. Lever les bras, ce n'est pas regretter." } }
]);
