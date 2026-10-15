/* Règles du carnet pour la banque d'attaque (chantier 5).
   Une règle = une phrase de 10 mots maximum. Clés préfixées « att_ » pour ne pas
   rencontrer celles de data/regles.js. */
window.JEU = window.JEU || {};
JEU.regles_texte = JEU.regles_texte || {};

JEU.regles_texte.att_deux_infos     = "Lis les deux informations avant de choisir.";
JEU.regles_texte.att_qui_reprise    = "Un pronom (il, lui, ils) reprend un joueur déjà nommé.";
JEU.regles_texte.att_reprise_groupe = "Un autre nom (le capitaine) désigne le même joueur.";
JEU.regles_texte.att_detail         = "Un seul petit mot change tout : compare les phrases.";
JEU.regles_texte.att_ou             = "Où ? Cherche le lieu : gauche, droite, centre, surface.";
JEU.regles_texte.att_pourquoi       = "Pourquoi ? Cherche la raison : car, parce que, comme.";
JEU.regles_texte.att_cause          = "Comme ou car donne la cause, avant la conséquence.";
JEU.regles_texte.att_avant_apres    = "Avant, puis, après : ils donnent l'ordre des actions.";
JEU.regles_texte.att_ordre          = "Remets les actions dans l'ordre où le texte les dit.";
JEU.regles_texte.att_simultane      = "« Pendant que » : deux actions en même temps.";
JEU.regles_texte.att_negation       = "Ne… pas, aucun, ni… ni : on écarte une action.";
JEU.regles_texte.att_seulement      = "Seul, seulement : ce joueur-là, et personne d'autre.";
JEU.regles_texte.att_tous_certains  = "Tous, un seul, aucun : compte bien les joueurs.";
JEU.regles_texte.att_nombre         = "Compte : combien de joueurs, combien d'actions ?";
JEU.regles_texte.att_sauf           = "Sauf met un joueur ou un cas à part.";
JEU.regles_texte.att_si_sinon       = "Si… sinon : un seul des deux cas arrive.";
JEU.regles_texte.att_condition      = "Dès que, tant que : l'action dépend d'une condition.";
JEU.regles_texte.att_malgre         = "Bien que, même si : on attendait le contraire.";
JEU.regles_texte.att_nsp            = "Texte muet : on ne peut pas savoir.";
