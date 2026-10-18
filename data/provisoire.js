/* ============================================================
   QUESTIONS PROVISOIRES de tirs (petits textes) : 6 questions.
   Anciennes questions du palier 4, réécrites avec des places {A} {B}… (plus de prénoms inventés).
   Les 10 questions provisoires de défense ont été remplacées par data/defense.js (chantier 6).
   Les tirs seront remplacés par la banque du chantier 7 : supprimer ce fichier alors
   (et sa ligne <script> dans index.html).
   ============================================================ */
JEU.ajouterQuestions([

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
