/* Règles du carnet pour la banque de défense (chantier 6).
   Une règle = une phrase de 10 mots maximum (la ponctuation séparée compte comme un mot).
   Clés préfixées « def_ » pour ne pas rencontrer celles de data/regles.js et data/regles-attaque.js. */
window.JEU = window.JEU || {};
JEU.regles_texte = JEU.regles_texte || {};

JEU.regles_texte.def_deux_ordres = "Une consigne peut donner deux ordres : fais les deux.";
JEU.regles_texte.def_qui_ou      = "Qui fait quoi, et où ? Relie chaque joueur.";
JEU.regles_texte.def_ou          = "Où ? Cherche le lieu : touche, centre, but, côté.";
JEU.regles_texte.def_detail      = "Un petit mot (droite, gauche) change tout : relis.";
JEU.regles_texte.def_pronom      = "Il, lui, elle : cherche qui est repris.";
JEU.regles_texte.def_reprise_nom = "Un autre nom (le capitaine) reprend le même joueur.";
JEU.regles_texte.def_nombre      = "Cherche le nombre écrit : ne le devine pas.";
JEU.regles_texte.def_pourquoi    = "Pourquoi ? Cherche la raison : pour que, parce que.";
JEU.regles_texte.def_ordre       = "Puis, avant, après : remets les actions dans l'ordre.";
JEU.regles_texte.def_simultane   = "« Pendant que » : deux actions en même temps.";
JEU.regles_texte.def_cause       = "Comme ou car donne la cause, avant la conséquence.";
JEU.regles_texte.def_negation    = "Ne… pas : barre les choix qui font l'action.";
JEU.regles_texte.def_compte      = "Compte : combien en tout, combien en moins ?";
JEU.regles_texte.def_seulement   = "Seulement si : sans la condition, non.";
JEU.regles_texte.def_ne_que      = "« Ne… que » veut dire seulement.";
JEU.regles_texte.def_sauf        = "« Sauf » annonce une exception : vérifie la situation.";
JEU.regles_texte.def_si_sinon    = "Si… sinon : vérifie la condition, puis choisis le cas.";
JEU.regles_texte.def_amoinsque   = "À moins que : condition absente, la règle reste.";
JEU.regles_texte.def_condition   = "Tant que, dès que : l'action dépend d'une condition.";
JEU.regles_texte.def_malgre      = "Bien que annonce une surprise : on attendait le contraire.";
JEU.regles_texte.def_nsp         = "Rien n'est écrit : on ne peut pas savoir.";
