/* Règles du carnet pour la banque « petits mots » (chantier 15, type motpetit).
   Une règle = une phrase de 10 mots maximum (la ponctuation séparée compte comme un mot).
   Clés préfixées « mp_ » pour ne pas rencontrer celles des autres fichiers de règles. */
window.JEU = window.JEU || {};
JEU.regles_texte = JEU.regles_texte || {};

JEU.regles_texte.mp_lien          = "Cherche le lien : cause, but, conséquence ou contraire.";
JEU.regles_texte.mp_cause         = "Parce que, car, puisque : ils donnent la raison.";
JEU.regles_texte.mp_consequence   = "Donc, alors, si bien que : ils annoncent la conséquence.";
JEU.regles_texte.mp_opposition    = "Mais, pourtant, cependant : la suite dit le contraire.";
JEU.regles_texte.mp_or            = "Or introduit un fait qui bloque ce qu'on attendait.";
JEU.regles_texte.mp_ou            = "Ou = ou bien ; où = lieu ou moment.";
JEU.regles_texte.mp_quand         = "Quant à = à propos de ; quand = moment.";
JEU.regles_texte.mp_moment        = "Quand, dès que, lorsque : le moment de l'action.";
JEU.regles_texte.mp_a             = "Essaie « avait » : si ça va, écris a.";
JEU.regles_texte.mp_on_ont        = "On = il ; ont = avaient.";
JEU.regles_texte.mp_son_sont      = "Sont = étaient ; son = un nom suit.";
JEU.regles_texte.mp_et_est        = "Est = était ; et = et puis.";
JEU.regles_texte.mp_mes_mais      = "Mes + nom pluriel ; mais s'oppose.";
JEU.regles_texte.mp_ce_se         = "Se + verbe ; ce + nom.";
JEU.regles_texte.mp_ces_ses       = "Ces montre ; ses = à lui ou à elle.";
JEU.regles_texte.mp_la_la         = "Là = ici, là-bas ; la = article ou pronom.";
JEU.regles_texte.mp_ordre         = "D'abord, ensuite, enfin : l'ordre des étapes.";
JEU.regles_texte.mp_lieu          = "Chez + personne ; dans, sous, sur + lieu.";
JEU.regles_texte.mp_avec_sans     = "Avec = moyen ; sans = absence.";
JEU.regles_texte.mp_but           = "Pour, afin de : le but à atteindre.";
JEU.regles_texte.mp_afin          = "Afin de : même sujet. Afin que : sujet différent.";
JEU.regles_texte.mp_duree         = "Pendant = durée ; depuis = début jusqu'à maintenant.";
JEU.regles_texte.mp_avant         = "Avant de, après + infinitif ; avant que + subjonctif.";
JEU.regles_texte.mp_condition     = "Si, à condition que, au cas où : une condition.";
JEU.regles_texte.mp_si            = "Si + présent : la suite est au futur.";
JEU.regles_texte.mp_relatif       = "Qui : sujet. Que : objet. Dont : complément de.";
JEU.regles_texte.mp_dont_donc     = "Donc = conséquence ; dont = de qui, de quoi.";
JEU.regles_texte.mp_malgre        = "Malgré + nom ; bien que + verbe au subjonctif.";
JEU.regles_texte.mp_sans_que      = "Sans que + subjonctif ; sans + nom ou infinitif.";
JEU.regles_texte.mp_ni            = "Ni… ni… va avec ne devant le verbe.";
JEU.regles_texte.mp_en_y          = "En : de + chose. Y : à + chose.";
JEU.regles_texte.mp_grace         = "Grâce à : bonne cause. À cause de : mauvaise.";
JEU.regles_texte.mp_plustot       = "Plus tôt ≠ plus tard ; plutôt = de préférence.";
JEU.regles_texte.mp_locution      = "Locution figée : apprends-la en entier, mot à mot.";
JEU.regles_texte.mp_subjonctif    = "Après cette locution, le verbe se met au subjonctif.";
JEU.regles_texte.mp_lien_phrases  = "Entre deux phrases : cherche le lien avec la précédente.";
JEU.regles_texte.mp_simultane     = "Tandis que, tout en : deux actions en même temps.";
JEU.regles_texte.mp_negation      = "Ne devant le verbe ; n' devant une voyelle.";
JEU.regles_texte.mp_quel          = "Quel s'accorde avec le nom qui suit.";
JEU.regles_texte.mp_dautant       = "D'autant plus que : une raison de plus.";
