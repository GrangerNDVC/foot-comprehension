/* ============================================================
   LE CARNET DE RÈGLES : une règle courte par piège de lecture.
   Chaque question renvoie à une règle (champ `regle`). Quand l'élève rate une
   question, la règle va dans son carnet ; elle revient plus tard dans une
   autre question jusqu'à ce qu'elle soit réussie deux fois de suite.
   Une règle = une phrase de 10 mots au plus.
   ============================================================ */
window.JEU = window.JEU || {};

JEU.regles_texte = {
  fait:       "Cherche ce que la personne FAIT.",
  neg:        "« ne … pas » élimine des choix.",
  croiser:    "Croise les indices : tous doivent être vrais.",
  deux:       "Compte tout ce que demande la consigne.",
  motamot:    "Un seul mot change : compare mot à mot.",
  ordre:      "« puis », « avant », « après » : remets dans l'ordre.",
  nombres:    "Les nombres de la consigne comptent.",
  tous:       "« Tous » = personne n'est oublié. « Pas tous » ≠ « aucun ».",
  sauf:       "« Sauf » annonce l'exception : relis la situation.",
  sisinon:    "« Si … sinon » : vérifie d'abord la condition.",
  synonyme:   "Deux mots différents peuvent dire la même chose.",
  quifait:    "Cherche QUI fait l'action et QUI la reçoit.",
  seulement:  "« Seulement » = un seul cas possible.",
  bienque:    "« Bien que » annonce une surprise.",
  pasplus:    "Une bonne réponse ne dit pas plus que le texte.",
  inference:  "Cherche ce que le texte laisse comprendre.",
  detail:     "Un mot précis peut tout changer."
};
