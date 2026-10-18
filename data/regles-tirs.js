/* Règles du carnet pour la banque de tirs (chantier 7).
   Une règle = une phrase de 10 mots maximum (la ponctuation séparée compte comme un mot).
   Clés préfixées « tir_ » pour ne pas rencontrer celles de data/regles.js, regles-attaque.js et regles-defense.js.
   Les règles « pasplus », « inference » et « detail » de data/regles.js sont aussi utilisées. */
window.JEU = window.JEU || {};
JEU.regles_texte = JEU.regles_texte || {};

JEU.regles_texte.tir_collage     = "Chaque mot du choix doit se trouver dans le texte.";
JEU.regles_texte.tir_pas_dit     = "Pas écrit : on ne peut pas savoir.";
JEU.regles_texte.tir_qui         = "Il, lui, elle : cherche qui est repris.";
JEU.regles_texte.tir_nombre      = "Compte avec les nombres du texte : ne devine pas.";
JEU.regles_texte.tir_comparaison = "Plus que, moins que : compare dans le bon sens.";
JEU.regles_texte.tir_ordre       = "Puis, avant, après : remets les actions dans l'ordre.";
JEU.regles_texte.tir_pendant     = "« Pendant que » : deux actions en même temps.";
JEU.regles_texte.tir_cause       = "Comme, parce que : cherche la cause, puis la suite.";
JEU.regles_texte.tir_quantite    = "Un seul, chacun, tous, aucun : le nombre change tout.";
JEU.regles_texte.tir_negation    = "Ne… pas, jamais, aucun : le texte dit non.";
JEU.regles_texte.tir_ne_que      = "« Ne… que » veut dire seulement.";
JEU.regles_texte.tir_exclu       = "Moins de 12 ans : 12 ans n'est pas compris.";
JEU.regles_texte.tir_condition   = "Si… sinon : vérifie d'abord la condition.";
JEU.regles_texte.tir_sauf        = "« Sauf » ouvre une exception : vérifie le cas.";
JEU.regles_texte.tir_amoinsque   = "À moins que : sans l'exception, la règle reste.";
JEU.regles_texte.tir_tantque     = "Tant que : l'action dépend d'une condition.";
JEU.regles_texte.tir_meme_si     = "Même si : ce détail ne change pas le résultat.";
JEU.regles_texte.tir_inconnu     = "Une condition inconnue : on ne peut pas conclure.";
