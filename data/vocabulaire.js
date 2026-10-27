/* ============================================================
   BANQUE « VOCABULAIRE DES CONSIGNES » (chantier 15) : type « vocabulaire », pour les tirs au but.
   70 questions : 14 par niveau (1 à 5). Les mots courants des consignes de français (souligner, relever, justifier,
   déduire, implicite, ci-dessous…) : une phrase qui explique le mot, le trou (« ____ ») à remplir, 4 mots (un par coin du but),
   UNE SEULE chance. Gardien blond du jeu ; aussi dans le mélange des autres gardiens.

   Niveaux : 1 gestes simples (cocher, souligner, relier…) · 2 comprendre (relever, repérer, justifier, citer, synonyme…)
   · 3 raisonner (comparer, déduire, reformuler, résumer, au moins / au plus, chaque / chacun…)
   · 4 lire de près (explicite / implicite, narrateur, légende, types de textes…)
   · 5 consignes longues (confronter, nuancer, pertinent, guillemets, ci-dessous, intention de l'auteur…).

   Format d'un item : voir 04-QUESTIONS.md. Ici : consigne = la phrase avec le trou ; question = toujours
   « Quel mot complète la phrase ? » ; mot = l'indice qui décide, écrit tel quel dans la phrase ;
   regle = clé de data/regles-vocabulaire.js ; explication = { bonne, cle, piege } (18 mots maximum chacune).
   AUCUN PRÉNOM EN DUR. Quand le trou est en début de phrase, l'option commence par une majuscule.
   ============================================================ */
(function () {
  var Q = "Quel mot complète la phrase ?";
  function vc(id, niveau, consigne, mot, options, regle, e1, e2, e3) {
    return { id: id, niveau: niveau, type: "vocabulaire", format: "choix", consigne: consigne, question: Q,
             options: options, bonne: 0, mot: mot, regle: regle,
             explication: { bonne: e1, cle: e2, piege: e3 } };
  }

  JEU.ajouterQuestions([

/* ---------------- NIVEAU 1 : les gestes simples ---------------- */

vc("vc-1-01", 1, "Pour ____ la bonne réponse, tu mets une croix dans la case.", "croix",
   ["cocher", "colorier", "effacer", "recopier"], "vc_cocher",
   "« Cocher » : mettre une croix dans la case de la bonne réponse.",
   "« Une croix dans la case » décrit exactement ce geste.",
   "« Colorier » demande des crayons de couleur, pas une croix."),

vc("vc-1-02", 1, "Quand la consigne dit « ____ le mot », tu passes un trait sous le mot.", "sous le mot",
   ["souligne", "barre", "entoure", "efface"], "vc_souligner",
   "« Souligne » : tracer un trait sous le mot.",
   "Le trait passe sous le mot : c'est souligner.",
   "« Barre » met le trait sur le mot, pas dessous."),

vc("vc-1-03", 1, "Pour ____ un mot qui est faux, tu fais un trait au milieu de ce mot.", "au milieu",
   ["barrer", "souligner", "relier", "recopier"], "vc_barrer",
   "« Barrer » : tracer un trait sur un mot pour l'annuler.",
   "Le trait passe sur le mot lui-même, pas dessous.",
   "« Souligner » met le trait sous le mot, sans l'annuler."),

vc("vc-1-04", 1, "Pour ____ le mot, tu traces un cercle tout autour de lui.", "cercle",
   ["entourer", "effacer", "souligner", "écrire"], "vc_entourer",
   "« Entourer » : tracer un cercle autour du mot.",
   "« Un cercle tout autour » dit ce qu'il faut faire.",
   "« Souligner » ne trace qu'un trait sous le mot."),

vc("vc-1-05", 1, "Pour ____ les deux images, tu traces un trait de l'une à l'autre.", "trait",
   ["relier", "relever", "relire", "rappeler"], "vc_relier",
   "« Relier » : tracer un trait entre deux choses qui vont ensemble.",
   "« Un trait de l'une à l'autre » : c'est relier.",
   "« Relever » veut dire recopier une information du texte."),

vc("vc-1-06", 1, "Tu dois ____ la phrase sur ton cahier, sans changer un seul mot.", "sans changer",
   ["recopier", "inventer", "résumer", "effacer"], "vc_recopier",
   "« Recopier » : écrire de nouveau exactement la même chose.",
   "« Sans changer un seul mot » : on copie tel quel.",
   "« Résumer » raccourcit le texte : on change les mots."),

vc("vc-1-07", 1, "Il manque un mot dans la phrase : tu dois la ____ avec le mot qui convient.", "manque",
   ["compléter", "comparer", "colorier", "compter"], "vc_completer",
   "« Compléter » : ajouter ce qui manque.",
   "« Il manque un mot » : on complète la phrase.",
   "« Comparer » demande de chercher ressemblances et différences."),

vc("vc-1-08", 1, "Avant de répondre, tu dois ____ le texte une deuxième fois, pour ne rien oublier.", "deuxième fois",
   ["relire", "relier", "relever", "redire"], "vc_relire",
   "« Relire » : lire une nouvelle fois.",
   "« Une deuxième fois » : on lit de nouveau, donc on relit.",
   "« Relier » trace un trait entre deux éléments."),

vc("vc-1-09", 1, "Pour ____ ton travail, tu cherches tes erreurs et tu les répares.", "erreurs",
   ["corriger", "copier", "colorier", "compléter"], "vc_corriger",
   "« Corriger » : chercher les erreurs et les réparer.",
   "« Tes erreurs » : on les corrige.",
   "« Compléter » ajoute ce qui manque, sans réparer les fautes."),

vc("vc-1-10", 1, "____ la bonne réponse : une seule est juste parmi les quatre propositions.", "une seule",
   ["Choisis", "Cherche", "Change", "Colorie"], "vc_choisir",
   "« Choisis » : prendre une seule réponse parmi plusieurs.",
   "« Une seule est juste parmi les quatre » : il faut choisir.",
   "« Cherche » veut dire trouver, sans décider entre plusieurs."),

vc("vc-1-11", 1, "Pour ____ les mots dans l'ordre, tu écris un 1, un 2, un 3 devant chacun.", "un 1",
   ["numéroter", "nommer", "noter", "nettoyer"], "vc_numeroter",
   "« Numéroter » : écrire un numéro devant chaque mot.",
   "« Un 1, un 2, un 3 » : ce sont des numéros.",
   "« Nommer » veut dire dire ou écrire le nom."),

vc("vc-1-12", 1, "Pour ____ l'image, regarde-la bien : qui est là, et que fait-on ?", "regarde-la",
   ["observer", "oublier", "obéir", "ouvrir"], "vc_observer",
   "« Observer » : regarder avec attention pour bien comprendre.",
   "« Regarde-la bien » : c'est observer.",
   "« Oublier » est le contraire de se rappeler."),

vc("vc-1-13", 1, "Tu dois ____ le dessin avec les couleurs demandées dans la consigne.", "couleurs",
   ["colorier", "cocher", "copier", "compléter"], "vc_colorier",
   "« Colorier » : remplir un dessin avec des couleurs.",
   "« Les couleurs demandées » : on colorie.",
   "« Cocher » met une croix dans une case."),

vc("vc-1-14", 1, "Pour ____ à la question, tu écris ta réponse dans une phrase complète.", "ta réponse",
   ["répondre", "rendre", "réparer", "reculer"], "vc_repondre",
   "« Répondre » : donner sa réponse à la question posée.",
   "« Ta réponse » : on répond à la question.",
   "« Rendre » veut dire donner en retour, par exemple un cahier."),

/* ---------------- NIVEAU 2 : comprendre ce qu'on demande ---------------- */

vc("vc-2-01", 2, "Pour ____ une information dans le texte, tu la cherches puis tu la recopies telle quelle.", "recopies",
   ["relever", "relier", "rappeler", "retenir"], "vc_relever",
   "« Relever » : trouver une information dans le texte et la recopier.",
   "« Tu la recopies telle quelle » : c'est relever.",
   "« Relier » trace un trait entre deux choses, sans recopier."),

vc("vc-2-02", 2, "Tu dois ____ l'endroit du texte où l'on apprend que le match est annulé.", "endroit",
   ["repérer", "réparer", "répéter", "reculer"], "vc_reperer",
   "« Repérer » : trouver où se trouve une information.",
   "« L'endroit du texte » : on le repère.",
   "« Réparer » veut dire remettre en état un objet cassé."),

vc("vc-2-03", 2, "Pour ____ ta réponse, tu expliques pourquoi tu l'as choisie, en t'appuyant sur le texte.", "pourquoi",
   ["justifier", "vérifier", "simplifier", "modifier"], "vc_justifier",
   "« Justifier » : expliquer pourquoi, avec une preuve du texte.",
   "« Tu expliques pourquoi » : c'est justifier.",
   "« Vérifier » veut dire contrôler, sans donner de raison."),

vc("vc-2-04", 2, "Quand on te demande de ____ un personnage, tu dis comment il est : son âge, son allure, son caractère.", "comment il est",
   ["décrire", "écrire", "dessiner", "découvrir"], "vc_decrire",
   "« Décrire » : dire comment est quelqu'un ou quelque chose.",
   "« Comment il est » : on décrit le personnage.",
   "« Écrire » ressemble à « décrire », mais ne veut pas dire montrer comment c'est."),

vc("vc-2-05", 2, "Pour ____ un mot difficile, tu dis ce qu'il veut dire avec des mots simples.", "veut dire",
   ["définir", "déduire", "défendre", "détruire"], "vc_definir",
   "« Définir » : dire ce que veut dire un mot.",
   "« Ce qu'il veut dire » : on donne sa définition.",
   "« Déduire » : trouver une réponse à partir d'indices."),

vc("vc-2-06", 2, "Quand la consigne dit « ____ le nom du joueur », tu écris seulement son nom, pas une phrase.", "seulement son nom",
   ["indique", "invente", "imite", "interdis"], "vc_indiquer",
   "« Indique » : donner précisément l'information demandée.",
   "« Seulement son nom » : on indique juste le nom.",
   "« Invente » demanderait d'imaginer, alors qu'ici il faut une information vraie."),

vc("vc-2-07", 2, "Pour ____ un passage du texte, tu le recopies entre guillemets, mot pour mot.", "entre guillemets",
   ["citer", "classer", "cacher", "créer"], "vc_citer",
   "« Citer » : recopier un passage exact entre guillemets.",
   "« Entre guillemets, mot pour mot » : c'est une citation.",
   "« Classer » veut dire ranger dans des groupes."),

vc("vc-2-08", 2, "Un ____ est un mot qui a presque le même sens qu'un autre mot : content et joyeux, par exemple.", "même sens",
   ["synonyme", "contraire", "pluriel", "adjectif"], "vc_synonyme",
   "« Synonyme » : un mot de sens proche, comme content et joyeux.",
   "« Le même sens » : c'est un synonyme.",
   "Un contraire a un sens opposé : content et triste."),

vc("vc-2-09", 2, "Un ____ est un mot qui veut dire l'inverse d'un autre : grand et petit, par exemple.", "l'inverse",
   ["contraire", "synonyme", "verbe", "nom"], "vc_synonyme",
   "« Contraire » : un mot de sens opposé, comme grand et petit.",
   "« L'inverse d'un autre » : c'est un contraire.",
   "Un synonyme a un sens proche, pas opposé."),

vc("vc-2-10", 2, "Un ____ est un petit groupe de phrases, séparé du reste du texte par un blanc.", "groupe de phrases",
   ["paragraphe", "titre", "mot", "chapitre"], "vc_paragraphe",
   "« Paragraphe » : un groupe de phrases séparé par un blanc.",
   "« Petit groupe de phrases » : c'est un paragraphe.",
   "Un chapitre est une grande partie d'un livre, beaucoup plus longue."),

vc("vc-2-11", 2, "Dans un poème, chaque ligne s'appelle un ____ et les lignes se regroupent en strophes.", "chaque ligne",
   ["vers", "mot", "titre", "texte"], "vc_poeme",
   "Dans un poème, une ligne s'appelle un vers.",
   "« Chaque ligne » du poème : c'est un vers.",
   "Un groupe de vers s'appelle une strophe."),

vc("vc-2-12", 2, "Le ____ est un petit détail du texte qui te met sur la piste pour trouver la réponse.", "sur la piste",
   ["indice", "incident", "intrus", "index"], "vc_indice",
   "« Indice » : petit détail qui met sur la piste.",
   "« Te met sur la piste » : c'est un indice.",
   "Un intrus est un mot qui n'a rien à faire dans la liste."),

vc("vc-2-13", 2, "Pour ____ les mots dans le tableau, tu les ranges dans la bonne colonne.", "colonne",
   ["classer", "casser", "citer", "copier"], "vc_classer",
   "« Classer » : ranger dans des groupes ou des colonnes.",
   "« Tu les ranges dans la bonne colonne » : c'est classer.",
   "« Citer » veut dire recopier un passage du texte."),

vc("vc-2-14", 2, "Pour ____ chaque phrase à son image, tu relies le texte au dessin qui lui correspond.", "relies",
   ["associer", "assembler", "annoncer", "arrêter"], "vc_associer",
   "« Associer » : mettre ensemble ce qui va ensemble.",
   "« Chaque phrase à son image » : on associe.",
   "« Assembler » veut dire fabriquer en réunissant des morceaux."),

/* ---------------- NIVEAU 3 : raisonner ---------------- */

vc("vc-3-01", 3, "Pour ____ deux personnages, tu dis en quoi ils se ressemblent et en quoi ils sont différents l'un de l'autre.", "se ressemblent",
   ["comparer", "compléter", "compter", "commenter"], "vc_comparer",
   "« Comparer » : chercher ce qui est pareil et ce qui est différent.",
   "« Se ressemblent » et « différents » : on compare.",
   "« Commenter » donne un avis, sans chercher ressemblances et différences."),

vc("vc-3-02", 3, "Quand la réponse n'est écrite nulle part dans le texte, tu dois la ____ à partir des indices que l'auteur donne.", "indices",
   ["déduire", "réduire", "produire", "conduire"], "vc_deduire",
   "« Déduire » : trouver une réponse à partir des indices.",
   "« Pas écrite » mais « des indices » : on déduit.",
   "« Réduire » veut dire rendre plus petit."),

vc("vc-3-03", 3, "Pour ____ une phrase, tu la dis avec tes propres mots, sans changer le sens ni garder les mêmes mots.", "propres mots",
   ["reformuler", "résumer", "recopier", "relever"], "vc_reformuler",
   "« Reformuler » : redire avec d'autres mots, en gardant le sens.",
   "« Tes propres mots » et « même sens » : on reformule.",
   "« Résumer » raccourcit ; « recopier » garde les mêmes mots."),

vc("vc-3-04", 3, "Pour ____ un texte, tu ne gardes que les idées principales, en utilisant beaucoup moins de mots que l'auteur.", "moins de mots",
   ["résumer", "reformuler", "relever", "résoudre"], "vc_resumer",
   "« Résumer » : garder l'essentiel en beaucoup moins de mots.",
   "« Les idées principales, moins de mots » : on résume.",
   "« Reformuler » change les mots sans raccourcir forcément."),

vc("vc-3-05", 3, "Pour ____ les étapes de la recette, tu les nommes une par une, dans l'ordre, sans en oublier aucune.", "une par une",
   ["énumérer", "numéroter", "annoncer", "évaluer"], "vc_enumerer",
   "« Énumérer » : citer les éléments un par un.",
   "« Une par une, sans en oublier » : on énumère.",
   "« Numéroter » écrit seulement des numéros devant les éléments."),

vc("vc-3-06", 3, "Quand la consigne demande d'____ une idée, tu donnes un exemple précis qui la rend plus claire pour le lecteur.", "exemple",
   ["illustrer", "imaginer", "indiquer", "inventer"], "vc_illustrer",
   "« Illustrer » : donner un exemple pour rendre une idée claire.",
   "« Un exemple précis » : on illustre l'idée.",
   "« Inventer » crée quelque chose de nouveau, sans éclairer une idée."),

vc("vc-3-07", 3, "Pour ____ le personnage, tu dois trouver qui il est : son nom, son rôle ou sa place dans l'histoire.", "qui il est",
   ["identifier", "imaginer", "informer", "interdire"], "vc_identifier",
   "« Identifier » : reconnaître et nommer qui ou quoi.",
   "« Trouver qui il est » : on l'identifie.",
   "« Imaginer » demande d'inventer, pas de reconnaître."),

vc("vc-3-08", 3, "Pour ____ ton idée, tu donnes plusieurs raisons et des exemples qui montrent qu'elle est vraie.", "raisons",
   ["argumenter", "arranger", "arrêter", "abréger"], "vc_argumenter",
   "« Argumenter » : défendre une idée avec des raisons.",
   "« Plusieurs raisons et des exemples » : c'est argumenter.",
   "« Abréger » veut dire raccourcir un texte."),

vc("vc-3-09", 3, "Une réponse « au ____ deux lignes » doit faire deux lignes ou plus, mais jamais moins que deux.", "ou plus",
   ["moins", "plus", "mieux", "tout"], "vc_aumoins",
   "« Au moins » donne un minimum : deux lignes ou davantage.",
   "« Deux lignes ou plus, jamais moins » : c'est un minimum.",
   "« Au plus » donne un maximum, qu'on ne doit pas dépasser."),

vc("vc-3-10", 3, "Une réponse « au ____ trois mots » ne doit jamais dépasser trois mots : elle peut être plus courte.", "dépasser",
   ["plus", "moins", "mieux", "tout"], "vc_aumoins",
   "« Au plus » donne un maximum : trois mots, pas davantage.",
   "« Ne jamais dépasser » : c'est un maximum.",
   "« Au moins » donne un minimum : on peut en écrire davantage."),

vc("vc-3-11", 3, "Pour ____ étape de la recette, tu écris une phrase : il y aura autant de phrases que d'étapes.", "étape",
   ["chaque", "chacun", "quelque", "plusieurs"], "vc_chaque",
   "« Chaque » s'emploie devant un nom : une phrase par étape.",
   "« Chaque étape » : le nom suit, au singulier.",
   "« Chacun » s'emploie seul, sans nom derrière."),

vc("vc-3-12", 3, "____ le texte, que font les joueurs après le match ? Ne réponds pas avec ce que tu penses.", "le texte",
   ["D'après", "Depuis", "Devant", "Derrière"], "vc_dapres",
   "« D'après le texte » : en utilisant seulement ce que le texte dit.",
   "La suite, « le texte », annonce la source de la réponse.",
   "« Depuis » parle du temps, pas de la source."),

vc("vc-3-13", 3, "Range les événements dans l'ordre ____ : du premier qui s'est passé jusqu'au dernier.", "premier",
   ["chronologique", "alphabétique", "logique", "croissant"], "vc_chrono",
   "« Chronologique » : dans l'ordre où les choses se sont passées.",
   "« Du premier jusqu'au dernier » : c'est l'ordre du temps.",
   "« Alphabétique » range les mots de A à Z."),

vc("vc-3-14", 3, "En t'____ sur le texte, justifie ta réponse : cite un passage qui prouve ce que tu avances.", "prouve",
   ["appuyant", "appelant", "appliquant", "apportant"], "vc_appuyer",
   "« S'appuyer sur le texte » : prendre le texte comme preuve.",
   "« Cite un passage qui prouve » : on s'appuie sur le texte.",
   "« Apporter » veut dire amener quelque chose avec soi."),

/* ---------------- NIVEAU 4 : lire de près ---------------- */

vc("vc-4-01", 4, "Une information ____ est écrite clairement dans le texte, alors qu'une information implicite, il faut la deviner soi-même.", "clairement",
   ["explicite", "implicite", "exacte", "entière"], "vc_explicite",
   "« Explicite » : écrite clairement, sans rien à deviner.",
   "« Écrite clairement » : c'est explicite.",
   "« Implicite » : pas écrite, il faut la deviner."),

vc("vc-4-02", 4, "Une information ____ n'est pas écrite telle quelle dans le texte : il faut la deviner à partir des indices.", "deviner",
   ["implicite", "explicite", "importante", "immédiate"], "vc_explicite",
   "« Implicite » : pas écrite, il faut la deviner avec des indices.",
   "« Il faut la deviner » : c'est implicite.",
   "« Explicite » : écrite clairement dans le texte."),

vc("vc-4-03", 4, "Pour ____ les deux personnages, tu dois montrer ce qui les différencie : l'un est courageux, l'autre est prudent.", "différencie",
   ["distinguer", "distribuer", "discuter", "diviser"], "vc_distinguer",
   "« Distinguer » : montrer ce qui différencie deux choses.",
   "« Ce qui les différencie » : on les distingue.",
   "« Distribuer » veut dire donner une part à chacun."),

vc("vc-4-04", 4, "Pour ____ ce passage, il ne suffit pas de le comprendre : tu dois dire ce que l'auteur veut faire ressentir.", "faire ressentir",
   ["interpréter", "interrompre", "introduire", "illustrer"], "vc_interpreter",
   "« Interpréter » : dire le sens voulu ou caché d'un passage.",
   "« Ce que l'auteur veut faire ressentir » : on interprète.",
   "« Illustrer » donne un exemple, sans chercher un sens caché."),

vc("vc-4-05", 4, "Le ____ est la voix qui raconte l'histoire : ce n'est pas toujours l'auteur du livre.", "raconte",
   ["narrateur", "auteur", "lecteur", "héros"], "vc_narrateur",
   "« Narrateur » : celui qui raconte l'histoire dans le texte.",
   "« La voix qui raconte » : c'est le narrateur.",
   "L'auteur est la personne qui a écrit le livre."),

vc("vc-4-06", 4, "L'____ est la personne qui a écrit le texte : son nom figure sur la couverture du livre.", "a écrit",
   ["auteur", "acteur", "arbitre", "ancêtre"], "vc_narrateur",
   "« Auteur » : la personne qui a écrit le texte.",
   "« A écrit le texte » : c'est l'auteur.",
   "Un acteur joue dans un film ou une pièce de théâtre."),

vc("vc-4-07", 4, "Une ____ est une courte phrase placée sous une image ou un schéma pour expliquer ce qu'on y voit.", "sous une image",
   ["légende", "histoire", "conclusion", "couverture"], "vc_legende",
   "« Légende » : texte court qui explique une image.",
   "« Sous une image, pour expliquer » : c'est une légende.",
   "La couverture est la page extérieure du livre."),

vc("vc-4-08", 4, "Le ____ d'un texte, c'est ce dont il parle : le thème principal, par exemple l'amitié ou le courage.", "ce dont il parle",
   ["sujet", "trajet", "objet", "projet"], "vc_sujet",
   "« Sujet » : de quoi parle le texte.",
   "« Ce dont il parle » : c'est le sujet.",
   "Un trajet est un chemin entre deux endroits."),

vc("vc-4-09", 4, "Une ____ est la liste des événements rangés dans l'ordre où ils se sont produits, du plus ancien au plus récent.", "plus ancien",
   ["chronologie", "biographie", "géographie", "technologie"], "vc_chrono",
   "« Chronologie » : les événements dans l'ordre du temps.",
   "« Du plus ancien au plus récent » : c'est une chronologie.",
   "La géographie étudie les pays, pas les dates."),

vc("vc-4-10", 4, "Une ____ est un texte qui raconte la vie d'une personne réelle : où elle est née, ce qu'elle a fait.", "personne réelle",
   ["biographie", "bibliographie", "géographie", "autobiographie"], "vc_biographie",
   "« Biographie » : la vie d'une personne, racontée par quelqu'un d'autre.",
   "« La vie d'une personne réelle » : c'est une biographie.",
   "Dans une autobiographie, la personne raconte sa propre vie."),

vc("vc-4-11", 4, "Avant de lire le texte en entier, tu peux le ____ des yeux : regarde le titre, les images et les mots en gras.", "des yeux",
   ["parcourir", "percevoir", "partager", "pardonner"], "vc_parcourir",
   "« Parcourir » : lire vite pour avoir une idée générale.",
   "« Regarde le titre, les images » : on parcourt le texte.",
   "« Partager » veut dire donner une part à quelqu'un."),

vc("vc-4-12", 4, "La ____ d'un texte est sa dernière partie : elle rappelle l'idée essentielle et termine le propos de l'auteur.", "dernière partie",
   ["conclusion", "introduction", "confusion", "conversation"], "vc_conclusion",
   "« Conclusion » : la dernière partie, qui termine le texte.",
   "« Dernière partie » : c'est la conclusion.",
   "L'introduction est le début du texte, pas la fin."),

vc("vc-4-13", 4, "Un texte ____ raconte une histoire : il y a des personnages, des événements et une fin.", "raconte une histoire",
   ["narratif", "descriptif", "explicatif", "informatif"], "vc_type_texte",
   "« Narratif » : un texte qui raconte une histoire.",
   "« Raconte une histoire » : c'est un texte narratif.",
   "Un texte descriptif dit comment est un lieu ou une personne."),

vc("vc-4-14", 4, "Un texte ____ présente un lieu ou une personne : il dit comment c'est, sans raconter d'événements.", "comment c'est",
   ["descriptif", "narratif", "explicatif", "argumentatif"], "vc_type_texte",
   "« Descriptif » : un texte qui dit comment est quelque chose.",
   "« Comment c'est, sans événements » : c'est descriptif.",
   "Un texte narratif raconte une suite d'événements."),

/* ---------------- NIVEAU 5 : consignes longues et mots exigeants ---------------- */

vc("vc-5-01", 5, "Pour ____ un texte et une image, tu les rapproches l'un de l'autre et tu dis ce qui est pareil et ce qui est différent.", "rapproches",
   ["confronter", "conforter", "confondre", "confirmer"], "vc_confronter",
   "« Confronter » : rapprocher deux choses pour voir leurs points communs et leurs différences.",
   "« Tu les rapproches » : on les confronte.",
   "« Confondre » veut dire prendre l'un pour l'autre."),

vc("vc-5-02", 5, "Quand on te demande de ____ une phrase, tu donnes ton avis sur elle et tu expliques pourquoi tu penses cela.", "ton avis",
   ["commenter", "comparer", "compléter", "compter"], "vc_commenter",
   "« Commenter » : donner son avis en l'expliquant.",
   "« Ton avis » et « pourquoi » : on commente.",
   "« Comparer » cherche ressemblances et différences, sans donner d'avis."),

vc("vc-5-03", 5, "Pour ____ ton avis, tu ne réponds pas simplement oui ou non : tu montres que la réponse est plus compliquée.", "plus compliquée",
   ["nuancer", "nommer", "noter", "nier"], "vc_nuancer",
   "« Nuancer » : montrer que la réponse n'est pas toute simple.",
   "« Pas simplement oui ou non » : on nuance.",
   "« Nier » veut dire dire que c'est faux."),

vc("vc-5-04", 5, "Une réponse ____ répond vraiment à la question posée, sans s'égarer ni parler d'un autre sujet que celui demandé.", "à la question posée",
   ["pertinente", "permanente", "persistante", "présente"], "vc_pertinent",
   "« Pertinente » : qui répond bien à la question posée.",
   "« Répond vraiment à la question » : c'est pertinent.",
   "« Permanente » veut dire qui dure toujours."),

vc("vc-5-05", 5, "Une réponse ____ ne se contredit jamais : toutes ses idées s'accordent entre elles, du début jusqu'à la fin.", "ne se contredit jamais",
   ["cohérente", "correcte", "complète", "courte"], "vc_coherent",
   "« Cohérente » : sans contradiction, les idées s'accordent.",
   "« Ne se contredit jamais » : c'est cohérent.",
   "« Correcte » veut dire sans faute, ce qui est différent."),

vc("vc-5-06", 5, "Les mots placés entre ____ sont des paroles ou des passages recopiés exactement, comme dans une citation du texte.", "recopiés exactement",
   ["guillemets", "parenthèses", "tirets", "crochets"], "vc_ponctuation",
   "« Guillemets » : ils encadrent des paroles ou une citation.",
   "« Recopiés exactement » : ce sont des guillemets.",
   "Les parenthèses ajoutent une précision en plus."),

vc("vc-5-07", 5, "Les mots placés entre ____ ajoutent une précision que l'on pourrait enlever sans que la phrase perde son sens.", "précision",
   ["parenthèses", "guillemets", "apostrophes", "accolades"], "vc_ponctuation",
   "« Parenthèses » : elles encadrent une précision qu'on peut enlever.",
   "« Une précision en plus » : ce sont des parenthèses.",
   "Les guillemets encadrent des paroles ou des citations."),

vc("vc-5-08", 5, "Pour répondre, regarde le document ____ : il se trouve plus bas sur la page, juste après la consigne.", "plus bas",
   ["ci-dessous", "ci-dessus", "ci-contre", "ci-joint"], "vc_cidessous",
   "« Ci-dessous » : plus bas sur la page.",
   "« Plus bas, juste après » : c'est ci-dessous.",
   "« Ci-dessus » veut dire plus haut sur la page."),

vc("vc-5-09", 5, "Relis le texte ____ : il se trouve plus haut sur la page, juste avant les questions que tu dois traiter.", "plus haut",
   ["ci-dessus", "ci-dessous", "ci-contre", "ci-joint"], "vc_cidessous",
   "« Ci-dessus » : plus haut sur la page.",
   "« Plus haut, juste avant » : c'est ci-dessus.",
   "« Ci-dessous » veut dire plus bas sur la page."),

vc("vc-5-10", 5, "Dis ce que pense l'auteur ____ le texte, et pas ce que tu penses toi-même sur ce sujet.", "pas ce que tu penses",
   ["selon", "sauf", "sans", "parmi"], "vc_dapres",
   "« Selon le texte » : d'après ce que le texte dit.",
   "« Pas ce que tu penses » : on s'appuie sur le texte.",
   "« Sauf » exclut quelque chose : « tous sauf un »."),

vc("vc-5-11", 5, "L'____ de l'auteur, c'est ce qu'il cherche à obtenir en écrivant : informer, convaincre ou simplement amuser le lecteur.", "cherche à obtenir",
   ["intention", "invention", "attention", "intonation"], "vc_intention",
   "« Intention » : le but de l'auteur quand il écrit.",
   "« Ce qu'il cherche à obtenir » : c'est son intention.",
   "« Attention » veut dire être concentré, ce qui est différent."),

vc("vc-5-12", 5, "Un texte ____ cherche à convaincre le lecteur : l'auteur défend une idée avec des arguments et des exemples.", "convaincre",
   ["argumentatif", "narratif", "descriptif", "explicatif"], "vc_type_texte",
   "« Argumentatif » : un texte qui cherche à convaincre.",
   "« Convaincre avec des arguments » : c'est argumentatif.",
   "Un texte explicatif dit comment ou pourquoi, sans défendre une idée."),

vc("vc-5-13", 5, "Pour ____ des informations venues de plusieurs documents, tu les rassembles en une seule réponse claire et organisée.", "rassembles",
   ["synthétiser", "sympathiser", "symboliser", "synchroniser"], "vc_synthetiser",
   "« Synthétiser » : rassembler plusieurs informations en une seule.",
   "« Plusieurs documents, une seule réponse » : on synthétise.",
   "« Sympathiser » veut dire devenir ami avec quelqu'un."),

vc("vc-5-14", 5, "Pour mettre une idée en ____, tu la soulignes ou tu l'écris en gras pour qu'elle se remarque tout de suite.", "se remarque",
   ["évidence", "évolution", "éventail", "exigence"], "vc_evidence",
   "« Mettre en évidence » : faire bien ressortir une idée.",
   "« Qu'elle se remarque tout de suite » : on la met en évidence.",
   "« Évolution » veut dire changement au fil du temps.")

  ]);
})();
