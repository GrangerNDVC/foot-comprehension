/* ============================================================
   BANQUE « PETITS MOTS » (chantier 15) : type « motpetit », pour les tirs au but.
   80 questions : 16 par niveau (1 à 5). Une phrase à compléter (le trou s'écrit « ____ »),
   4 petits mots (un par coin du but), UNE SEULE chance.

   Niveaux : 1 un petit mot évident, phrase courte · 2 mots proches (à / a, ou / où, on / ont…)
   · 3 pièges réels (car / parce que, quand / quant, dont / donc, malgré / bien que, afin de / afin que…)
   · 4 locutions et modes (sans que, alors que, de sorte que, à moins que…) · 5 phrases longues, formules figées
   (faute de, de peur que, par conséquent, néanmoins, quel que…).

   Format d'un item : voir 04-QUESTIONS.md. Ici : consigne = la phrase avec le trou ; question = toujours
   « Quel petit mot complète la phrase ? » ; mot = l'indice qui décide, écrit tel quel dans la phrase ;
   regle = clé de data/regles-motspetits.js ; explication = { bonne, cle, piege } (18 mots maximum chacune).
   AUCUN PRÉNOM EN DUR, et aucune place {A} : ces phrases ne dépendent pas de l'action du match.
   Quand le trou est en début de phrase, l'option commence par une majuscule.
   ============================================================ */
(function () {
  var Q = "Quel petit mot complète la phrase ?";
  function mp(id, niveau, consigne, mot, options, bonne, regle, e1, e2, e3) {
    return { id: id, niveau: niveau, type: "motpetit", format: "choix", consigne: consigne, question: Q,
             options: options, bonne: bonne, mot: mot, regle: regle,
             explication: { bonne: e1, cle: e2, piege: e3 } };
  }

  JEU.ajouterQuestions([

/* ---------------- NIVEAU 1 : un petit mot évident, phrase courte ---------------- */

mp("mp-1-01", 1, "Il pleut depuis ce matin, ____ nous prenons un parapluie pour aller au stade.", "Il pleut",
   ["donc", "mais", "ou", "avant"], 0, "mp_consequence",
   "« Donc » annonce la conséquence : à cause de la pluie, on prend un parapluie.",
   "« Il pleut » est la cause ; la suite en est la conséquence.",
   "« Mais » annonce un contraire : ici, rien ne s'oppose."),

mp("mp-1-02", 1, "Le ballon est resté coincé ____ le filet après le tir du capitaine.", "filet",
   ["dans", "avec", "pendant", "mais"], 0, "mp_lieu",
   "« Dans » dit où est le ballon : à l'intérieur du filet.",
   "« Coincé » et « le filet » : on cherche un lieu.",
   "« Pendant » parle du temps, pas du lieu."),

mp("mp-1-03", 1, "Pour réparer le filet, le gardien coupe la corde ____ des ciseaux.", "coupe",
   ["avec", "sans", "donc", "où"], 0, "mp_avec_sans",
   "« Avec » donne l'outil qu'on utilise : des ciseaux.",
   "Pour couper, il faut un outil : « avec » le présente.",
   "« Sans » dit le contraire : on n'utiliserait pas les ciseaux."),

mp("mp-1-04", 1, "Mon ballon est caché ____ le banc : on ne le voit pas depuis le terrain.", "caché",
   ["sous", "mais", "donc", "avec"], 0, "mp_lieu",
   "« Sous » dit où est le ballon : en dessous du banc.",
   "« Caché » et « le banc » : on cherche un lieu.",
   "« Mais » et « donc » relient des idées : ils ne disent pas où."),

mp("mp-1-05", 1, "Il court très vite ____ l'équipe adverse revient en force vers notre but.", "revient en force",
   ["parce que", "mais", "ou", "où"], 0, "mp_cause",
   "« Parce que » donne la raison : l'équipe adverse revient, alors il court.",
   "La deuxième partie explique pourquoi il court vite.",
   "« Mais » annonce un contraire : ici, la phrase donne une raison."),

mp("mp-1-06", 1, "Il est petit, ____ il court plus vite que tous les autres joueurs de l'équipe.", "petit",
   ["mais", "donc", "ou", "où"], 0, "mp_opposition",
   "« Mais » oppose deux idées : petit, pourtant très rapide.",
   "Petit et rapide ne vont pas ensemble : le texte dit le contraire.",
   "« Donc » annonce une conséquence : être petit n'oblige pas à courir vite."),

mp("mp-1-07", 1, "Voici le stade ____ nous jouons notre premier match du tournoi samedi prochain.", "stade",
   ["où", "ou", "dont", "avec"], 0, "mp_ou",
   "« Où » indique le lieu : le stade dans lequel on joue.",
   "« Le stade » est un lieu : « où » le reprend.",
   "« Ou » veut dire « ou bien » : il propose un choix."),

mp("mp-1-08", 1, "Le coach te demande : tu préfères jouer en défense ____ en attaque ?", "préfères",
   ["ou", "où", "donc", "parce que"], 0, "mp_ou",
   "« Ou » propose un choix entre deux postes.",
   "« Tu préfères… ou… » : on choisit entre deux possibilités.",
   "« Où » parle d'un lieu : ici, on choisit un poste."),

mp("mp-1-09", 1, "Je fais mes devoirs ____ je rentre de l'école, avant d'aller m'entraîner.", "rentre",
   ["quand", "où", "avec", "sans"], 0, "mp_moment",
   "« Quand » donne le moment : au retour de l'école.",
   "« Je rentre » : on cherche à quel moment on fait les devoirs.",
   "« Avec » et « sans » ne donnent pas de moment."),

mp("mp-1-10", 1, "Le gardien se lave les mains ____ de manger son sandwich au vestiaire.", "se lave",
   ["avant", "après", "pendant", "sans"], 0, "mp_avant",
   "« Avant de » : d'abord se laver les mains, ensuite manger.",
   "« De manger » : seul « avant » s'utilise avec « de » ici.",
   "« Après » ne se place pas devant « de manger »."),

mp("mp-1-11", 1, "Il s'entraîne chaque jour ____ devenir un meilleur gardien de but.", "devenir",
   ["pour", "sans", "avec", "donc"], 0, "mp_but",
   "« Pour » annonce le but qu'il veut atteindre : devenir meilleur.",
   "« Devenir » : on cherche le but de l'entraînement.",
   "« Sans » dit le contraire : il ne s'entraînerait pas pour progresser."),

mp("mp-1-12", 1, "Elle a joué le match ____ chaussures, pieds nus dans l'herbe mouillée.", "pieds nus",
   ["sans", "avec", "pour", "dans"], 0, "mp_avec_sans",
   "« Sans » dit qu'il manque quelque chose : elle n'a pas de chaussures.",
   "« Pieds nus » veut dire : pas de chaussures.",
   "« Avec » dit qu'elle en porte : cela contredit « pieds nus »."),

mp("mp-1-13", 1, "Ce soir, après l'entraînement, je dors ____ mon cousin parce que nous partons tôt.", "cousin",
   ["chez", "dans", "sur", "après"], 0, "mp_lieu",
   "« Chez » se place devant une personne : chez mon cousin.",
   "« Mon cousin » est une personne : on dit « chez ».",
   "« Dans » et « sur » ne vont pas avec une personne."),

mp("mp-1-14", 1, "____ la mi-temps, les joueurs boivent de l'eau et écoutent les conseils du coach.", "mi-temps",
   ["Pendant", "Sans", "Donc", "Où"], 0, "mp_duree",
   "« Pendant » donne la durée : tout le temps de la mi-temps.",
   "« La mi-temps » est un moment : « pendant » le situe.",
   "« Donc » et « où » ne se placent pas devant « la mi-temps »."),

mp("mp-1-15", 1, "Il ne joue pas ____ son pied lui fait mal depuis le dernier match.", "lui fait mal",
   ["parce que", "donc", "mais", "où"], 0, "mp_cause",
   "« Parce que » donne la raison : le pied lui fait mal.",
   "« Son pied lui fait mal » explique pourquoi il ne joue pas.",
   "« Donc » inverse le sens : le mal de pied n'est pas la conséquence."),

mp("mp-1-16", 1, "____ tu cours vite, tu arriveras à l'heure au stade avant le coup d'envoi.", "arriveras",
   ["Si", "Mais", "Où", "Donc"], 0, "mp_si",
   "« Si » pose la condition : courir vite, pour arriver à l'heure.",
   "« Tu arriveras » : le futur répond à une condition avec « si ».",
   "« Mais » et « donc » ne commencent pas une condition."),

/* ---------------- NIVEAU 2 : des mots proches (a / à, ou / où, on / ont, son / sont…) ---------------- */

mp("mp-2-01", 2, "Le gardien ____ un gant rouge à la main gauche et un gant bleu à la main droite.", "gardien",
   ["a", "à", "as", "ai"], 0, "mp_a",
   "« A » est le verbe avoir : « le gardien avait un gant ».",
   "On peut dire « avait » : on écrit « a » sans accent.",
   "« À » marque un lieu : on ne peut pas dire « avait »."),

mp("mp-2-02", 2, "Après l'école, nous allons ____ la piscine pour nous détendre avant le match de samedi.", "allons",
   ["à", "a", "as", "ont"], 0, "mp_a",
   "« À » annonce le lieu où l'on va.",
   "On ne peut pas dire « nous allons avait la piscine » : accent.",
   "« A » sans accent est le verbe avoir, il ne marque pas le lieu."),

mp("mp-2-03", 2, "Je ne sais plus ____ j'ai posé mon maillot : dans le sac ou dans le vestiaire ?", "posé",
   ["où", "ou", "a", "à"], 0, "mp_ou",
   "« Où » demande le lieu : où est le maillot ?",
   "« J'ai posé mon maillot » : on cherche l'endroit.",
   "« Ou » sans accent veut dire « ou bien » : il propose un choix."),

mp("mp-2-04", 2, "Pour le goûter, tu choisis : une pomme ____ une banane, mais pas les deux.", "pas les deux",
   ["ou", "où", "a", "à"], 0, "mp_ou",
   "« Ou » propose un choix : pomme ou banane.",
   "« Mais pas les deux » : on choisit l'un des deux.",
   "« Où » parle d'un lieu : ici, aucun lieu n'est demandé."),

mp("mp-2-05", 2, "Les joueurs de l'équipe ____ gagné le tournoi et sont rentrés chez eux avec la coupe.", "gagné",
   ["ont", "on", "sont", "son"], 0, "mp_on_ont",
   "« Ont » est le verbe avoir : « avaient gagné ».",
   "On peut dire « avaient » : on écrit « ont ».",
   "« On » veut dire « il » : le sujet est pluriel ici."),

mp("mp-2-06", 2, "Quand ____ marque un but, tout le stade se lève et crie de joie.", "marque",
   ["on", "ont", "son", "sont"], 0, "mp_on_ont",
   "« On » veut dire « il » : « quand il marque ».",
   "On peut dire « il marque » : on écrit « on ».",
   "« Ont » = « avaient » : « quand avaient marque » n'a aucun sens."),

mp("mp-2-07", 2, "Mes amis ____ arrivés au stade avant moi, et le match n'avait pas encore commencé.", "arrivés",
   ["sont", "son", "ont", "on"], 0, "mp_son_sont",
   "« Sont » = « étaient » : « mes amis étaient arrivés ».",
   "On peut dire « étaient » : on écrit « sont ».",
   "« Ont » = « avaient » : on ne dit pas « avaient arrivés »."),

mp("mp-2-08", 2, "Le gardien a perdu ____ gant dans la boue pendant le match de mercredi.", "gant",
   ["son", "sont", "ont", "on"], 0, "mp_son_sont",
   "« Son » se place devant un nom : son gant.",
   "« Gant » est un nom : « son » dit à qui il est.",
   "« Sont » = « étaient » : « il a perdu étaient gant » n'a aucun sens."),

mp("mp-2-09", 2, "Le ciel ____ bleu, le soleil brille et il n'y a pas un nuage au-dessus du stade.", "bleu",
   ["est", "et", "es", "ai"], 0, "mp_et_est",
   "« Est » = « était » : « le ciel était bleu ».",
   "On peut dire « était » : on écrit « est ».",
   "« Et » relie deux mots : il ne remplace pas « était »."),

mp("mp-2-10", 2, "J'ai rangé ____ affaires de sport dans mon sac avant de partir pour l'entraînement.", "affaires",
   ["mes", "mais", "met", "m'est"], 0, "mp_mes_mais",
   "« Mes » se place devant un nom pluriel : mes affaires.",
   "« Affaires » est un nom au pluriel : « mes » est le bon mot.",
   "« Mais » oppose deux idées : ici, il n'y a aucun contraire."),

mp("mp-2-11", 2, "Avant de manger, le joueur ____ lave les mains au vestiaire, puis il s'assoit.", "lave",
   ["se", "ce", "sais", "c'est"], 0, "mp_ce_se",
   "« Se » va avec un verbe : se laver.",
   "« Lave » est un verbe : « se » le précède.",
   "« Ce » se place devant un nom : ce joueur, ce ballon."),

mp("mp-2-12", 2, "Regarde ____ chaussures là-bas, sur le banc : ce sont celles du capitaine ?", "là-bas",
   ["ces", "ses", "c'est", "s'est"], 0, "mp_ces_ses",
   "« Ces » montre des objets qu'on désigne : ces chaussures-là.",
   "« Là-bas » : on montre du doigt, donc « ces ».",
   "« Ses » = à lui ou à elle : on ne montre rien."),

mp("mp-2-13", 2, "Pose le ballon ____, sur la ligne blanche, et attends le coup de sifflet.", "sur la ligne blanche",
   ["là", "la", "l'a", "las"], 0, "mp_la_la",
   "« Là » indique un endroit précis : ici, sur la ligne.",
   "« Sur la ligne » : on montre un endroit, donc « là » avec accent.",
   "« La » sans accent est un article : il se place devant un nom."),

mp("mp-2-14", 2, "____ on s'échauffe, ensuite on joue le match, et enfin on prend une douche chaude.", "ensuite",
   ["D'abord", "Enfin", "Donc", "Mais"], 0, "mp_ordre",
   "« D'abord » commence la série : d'abord, ensuite, enfin.",
   "« Ensuite » et « enfin » suivent : il manque le premier mot.",
   "« Enfin » est déjà utilisé : il ferme la série."),

mp("mp-2-15", 2, "Il porte un gros manteau ____ il fait très froid dehors ce matin.", "très froid",
   ["car", "donc", "mais", "où"], 0, "mp_cause",
   "« Car » donne la raison : il fait froid.",
   "« Il fait très froid » explique le gros manteau.",
   "« Donc » inverse le sens : le manteau ne fait pas venir le froid."),

mp("mp-2-16", 2, "Il voulait tirer au but, ____ le gardien a arrêté le ballon avec le pied.", "voulait",
   ["mais", "car", "ou", "donc"], 0, "mp_opposition",
   "« Mais » oppose deux faits : il voulait tirer, le gardien a arrêté.",
   "Ce qu'il voulait et ce qui arrive sont contraires.",
   "« Car » donnerait une raison : l'arrêt n'explique pas son désir."),

/* ---------------- NIVEAU 3 : des pièges réels (car / parce que, quand / quant, dont / donc, malgré / bien que…) ---------------- */

mp("mp-3-01", 3, "Pourquoi le match a-t-il été annulé hier soir ? ____ le terrain était complètement gelé et trop dangereux pour les joueurs.", "Pourquoi",
   ["Parce que", "Car", "Donc", "Quand"], 0, "mp_cause",
   "On répond à « pourquoi » par « parce que » : le terrain était gelé.",
   "La question « pourquoi » appelle une réponse avec « parce que ».",
   "« Car » ne commence jamais une réponse : il relie deux phrases."),

mp("mp-3-02", 3, "Le match devait commencer à quinze heures. ____ l'arbitre n'était pas encore arrivé au stade, et il a fallu attendre.", "n'était pas encore arrivé",
   ["Or", "Car", "Donc", "Ou"], 0, "mp_or",
   "« Or » introduit le fait qui bloque ce qui était prévu.",
   "Le match devait commencer, mais un fait l'empêche : « or ».",
   "« Car » donne une cause : ici, la phrase ne donne pas de raison."),

mp("mp-3-03", 3, "Le capitaine préfère tirer les penaltys. ____ à moi, je préfère jouer en défense et protéger notre but.", "à moi",
   ["Quant", "Quand", "Quel", "Qu'en"], 0, "mp_quand",
   "« Quant à » veut dire « à propos de » : on passe à une autre personne.",
   "« À moi » suit le trou : « quant à » les relie.",
   "« Quand » parle du moment : ici, aucun moment n'est donné."),

mp("mp-3-04", 3, "Je sifflerai le début de la partie ____ tout le monde sera prêt, placé derrière sa ligne.", "sifflerai",
   ["quand", "quant", "quel", "qu'en"], 0, "mp_quand",
   "« Quand » donne le moment : le coup de sifflet attend que tout le monde soit prêt.",
   "« Sifflerai » : on cherche à quel moment on siffle.",
   "« Quant » est toujours suivi de « à » : quant à moi."),

mp("mp-3-05", 3, "Le joueur ____ je t'ai parlé hier est le nouveau gardien de l'équipe : il est très grand.", "parlé",
   ["dont", "donc", "que", "où"], 0, "mp_dont_donc",
   "« Dont » remplace « de qui » : je t'ai parlé de ce joueur.",
   "« Parler de quelqu'un » : le mot qui reprend « de » est « dont ».",
   "« Donc » annonce une conséquence : ici, aucune conséquence."),

mp("mp-3-06", 3, "Il a gagné trois matchs de suite sans faire une seule faute, ____ il va jouer la finale samedi.", "va jouer la finale",
   ["donc", "dont", "où", "ou"], 0, "mp_dont_donc",
   "« Donc » annonce la conséquence : ses victoires lui ouvrent la finale.",
   "Les victoires sont la cause ; la finale en est la conséquence.",
   "« Dont » remplace « de qui » : il n'y a rien à reprendre ici."),

mp("mp-3-07", 3, "____ la pluie, les enfants ont joué dehors toute la matinée et ils se sont bien amusés.", "la pluie",
   ["Malgré", "Bien que", "Parce que", "Afin de"], 0, "mp_malgre",
   "« Malgré » est suivi d'un nom : malgré la pluie.",
   "« La pluie » est un nom, sans verbe : on écrit « malgré ».",
   "« Bien que » demande un verbe au subjonctif, pas un nom."),

mp("mp-3-08", 3, "____ il pleuve depuis ce matin, les enfants jouent dehors et ils se sentent très bien.", "pleuve",
   ["Bien que", "Malgré", "Donc", "Parce que"], 0, "mp_malgre",
   "« Bien que » est suivi d'un verbe au subjonctif : bien qu'il pleuve.",
   "« Pleuve » est un verbe au subjonctif : « bien que » l'appelle.",
   "« Malgré » est suivi d'un nom, pas d'un verbe conjugué."),

mp("mp-3-09", 3, "Il s'entraîne tous les soirs après l'école ____ battre le record de l'école au tir au but.", "battre",
   ["afin de", "afin que", "parce que", "quant à"], 0, "mp_afin",
   "« Afin de » + infinitif : c'est lui qui s'entraîne et qui veut battre le record.",
   "« Battre » est à l'infinitif : « afin de » va avec lui.",
   "« Afin que » demande un nouveau sujet et un subjonctif."),

mp("mp-3-10", 3, "Le coach répète la consigne trois fois ____ tout le monde comprenne bien ce qu'il faut faire.", "comprenne",
   ["afin que", "afin de", "parce que", "quand"], 0, "mp_afin",
   "« Afin que » + subjonctif : ceux qui comprennent ne sont pas le coach.",
   "Un nouveau sujet (« tout le monde ») et « comprenne » : « afin que ».",
   "« Afin de » se place devant un infinitif, avec le même sujet."),

mp("mp-3-11", 3, "Nous sommes arrivés ____ que d'habitude, car la route était vide et personne ne nous a ralentis.", "route était vide",
   ["plus tôt", "plutôt", "plus tard", "plutôt que"], 0, "mp_plustot",
   "« Plus tôt » s'oppose à « plus tard » : arrivés en avance.",
   "Route vide : on arrive en avance, donc « plus tôt » en deux mots.",
   "« Plus tard » dirait le contraire : la route vide ne retarde pas."),

mp("mp-3-12", 3, "Après la défaite, elle ne mange ____ gâteau ni bonbon : elle n'a envie de rien d'autre que de dormir.", "ne mange",
   ["ni", "ou", "et", "nu"], 0, "mp_ni",
   "« Ni… ni… » : elle ne mange ni gâteau ni bonbon.",
   "« Ne mange » appelle « ni » : deux choses niées.",
   "« Ou » et « et » ne se placent pas après « ne mange » ici."),

mp("mp-3-13", 3, "Je joue au foot ____ trois ans, et mon équipe m'a déjà donné beaucoup de bons souvenirs.", "joue",
   ["depuis", "pendant", "il y a", "dans"], 0, "mp_duree",
   "« Depuis » : une action qui a commencé et qui continue (je joue).",
   "« Je joue » est au présent : l'action continue, donc « depuis ».",
   "« Il y a trois ans » situe un début passé, sans durée en cours."),

mp("mp-3-14", 3, "Nous avons gagné le match ____ notre gardien, qui a tout arrêté pendant les quatre-vingt-dix minutes.", "tout arrêté",
   ["grâce à", "à cause de", "malgré", "sans"], 0, "mp_grace",
   "« Grâce à » donne une bonne cause : le gardien nous a fait gagner.",
   "Le gardien a « tout arrêté » : c'est une cause heureuse.",
   "« À cause de » donne une mauvaise cause : ici, la victoire est une bonne chose."),

mp("mp-3-15", 3, "Le match a été arrêté ____ l'orage qui menaçait le stade, avec ses éclairs et son vent très fort.", "orage",
   ["à cause de", "grâce à", "afin de", "bien que"], 0, "mp_grace",
   "« À cause de » donne une cause fâcheuse : l'orage arrête le match.",
   "L'orage est dangereux : c'est une mauvaise cause.",
   "« Grâce à » donne une bonne cause : l'orage n'en est pas une."),

mp("mp-3-16", 3, "Tu as des chaussures de rechange ? Oui, j'____ ai deux paires dans mon sac de sport.", "deux paires",
   ["en", "y", "le", "lui"], 0, "mp_en_y",
   "« En » remplace « des chaussures » : j'en ai deux.",
   "« Deux » : un nombre qui accompagne « en ».",
   "« Y » remplace « à » + chose : ici, il ne s'agit pas d'un lieu."),

/* ---------------- NIVEAU 4 : locutions et modes (sans que, alors que, de sorte que, à moins que…) ---------------- */

mp("mp-4-01", 4, "L'attaquant a glissé le ballon dans le coin gauche ____ personne dans le public ne le voie, tellement son geste était rapide et discret.", "ne le voie",
   ["sans que", "sans", "parce que", "donc"], 0, "mp_sans_que",
   "« Sans que » est suivi d'un sujet et d'un verbe au subjonctif : ne le voie.",
   "Nouveau sujet (personne) et subjonctif (voie) : « sans que ».",
   "« Sans » seul est suivi d'un nom ou d'un infinitif, pas d'un sujet."),

mp("mp-4-02", 4, "Il avait très mal au genou depuis le début de la deuxième mi-temps ; ____ il a terminé la course sans s'arrêter une seule fois.", "avait très mal",
   ["pourtant", "bien que", "parce que", "afin de"], 0, "mp_opposition",
   "« Pourtant » oppose deux faits : il avait mal, il a couru jusqu'au bout.",
   "Mal au genou et course finie : le texte dit le contraire de ce qu'on attend.",
   "« Bien que » se place au début d'une phrase avec un subjonctif."),

mp("mp-4-03", 4, "Mon frère adore jouer au foot sous la pluie, ____ ma sœur déteste avoir les pieds mouillés et préfère rester au chaud à la maison.", "adore",
   ["alors que", "afin que", "parce que", "de sorte que"], 0, "mp_opposition",
   "« Alors que » oppose deux goûts : lui adore, elle déteste.",
   "« Adore » et « déteste » : deux idées contraires.",
   "« Parce que » donnerait une raison : la sœur ne déteste pas à cause du frère."),

mp("mp-4-04", 4, "Le coach a changé toute la composition de l'équipe, ____ les joueurs ont dû apprendre de nouveaux rôles avant le match de samedi.", "ont dû",
   ["de sorte que", "bien que", "afin de", "quoique"], 0, "mp_consequence",
   "« De sorte que » annonce la conséquence : le changement oblige à apprendre.",
   "Le changement est la cause ; les nouveaux rôles en sont la conséquence.",
   "« Afin de » se place devant un infinitif : ici, la phrase continue avec un sujet."),

mp("mp-4-05", 4, "____ tu connais déjà la règle du hors-jeu, tu peux l'expliquer aux plus petits qui viennent d'arriver dans l'équipe.", "connais déjà",
   ["Puisque", "Bien que", "Afin que", "Sans que"], 0, "mp_cause",
   "« Puisque » donne une raison connue de tous : tu connais la règle.",
   "« Tu connais » est vrai (indicatif) : « puisque » s'utilise avec un fait sûr.",
   "« Bien que » demande un subjonctif : « bien que tu connaisses »."),

mp("mp-4-06", 4, "Nous jouerons dehors, sur le terrain en herbe, ____ la pluie soit trop forte et empêche de voir le ballon.", "soit",
   ["à moins que", "afin que", "puisque", "alors que"], 0, "mp_subjonctif",
   "« À moins que » est suivi du subjonctif : sauf si la pluie est trop forte.",
   "« Soit » est au subjonctif : « à moins que » l'appelle.",
   "« Puisque » demande l'indicatif, pas le subjonctif."),

mp("mp-4-07", 4, "Rentrons au vestiaire ____ la nuit tombe, car nous n'avons plus de lumière sur le terrain et il fait déjà très frais.", "Rentrons",
   ["avant que", "avant de", "après que", "depuis que"], 0, "mp_avant",
   "« Avant que » est suivi d'un sujet et du subjonctif : avant que la nuit tombe.",
   "« La nuit tombe » : un sujet et un verbe, donc « avant que ».",
   "« Avant de » est suivi d'un infinitif, pas d'un sujet."),

mp("mp-4-08", 4, "Je lève la main bien haut ____ le professeur me voie, car j'ai une question importante sur le règlement du tournoi.", "voie",
   ["pour que", "pour", "afin de", "avant de"], 0, "mp_afin",
   "« Pour que » + subjonctif : je lève la main, le professeur me voie.",
   "Deux sujets (je, le professeur) : « pour que » et le subjonctif « voie ».",
   "« Pour » et « afin de » se placent devant un infinitif, avec le même sujet."),

mp("mp-4-09", 4, "En ____ de la fatigue accumulée pendant la saison, l'équipe a couru jusqu'au bout du match sans jamais baisser la tête.", "jusqu'au bout",
   ["dépit", "raison", "lieu", "cas"], 0, "mp_locution",
   "« En dépit de » veut dire « malgré » : malgré la fatigue.",
   "Fatigue et course jusqu'au bout : un contraire, donc « en dépit de ».",
   "« En raison de » donne une cause : la fatigue ne fait pas courir."),

mp("mp-4-10", 4, "____ de rester assis sur le banc pendant tout le match, il a demandé au coach de le faire entrer pour la fin.", "demandé",
   ["Au lieu", "En lieu", "Au cas", "À cause"], 0, "mp_locution",
   "« Au lieu de » remplace une action par une autre : rester, puis entrer.",
   "Il ne reste pas assis : il demande à entrer, donc « au lieu de ».",
   "« À cause de » donne une raison : ici, la phrase oppose deux actions."),

mp("mp-4-11", 4, "À ____ de répéter les mêmes gestes à chaque entraînement, il a fini par tout retenir, même les règles les plus compliquées.", "répéter",
   ["force", "cause", "moins", "côté"], 0, "mp_locution",
   "« À force de » veut dire « en répétant beaucoup » : répéter, puis retenir.",
   "Répéter beaucoup mène à retenir : c'est « à force de ».",
   "« À cause de » donne une raison fâcheuse : ici, c'est un progrès."),

mp("mp-4-12", 4, "Appelle-moi ____ tu arrives devant le stade, je viendrai t'ouvrir la grande porte du côté des vestiaires.", "arrives",
   ["dès que", "à moins que", "bien que", "quoique"], 0, "mp_moment",
   "« Dès que » veut dire « tout de suite quand » : à ton arrivée.",
   "« Tu arrives » : un fait vrai, donc « dès que » et l'indicatif.",
   "« Bien que » et « à moins que » demandent le subjonctif."),

mp("mp-4-13", 4, "Le gardien ____ le gant est déchiré a demandé un autre gant au coach, juste avant le début du match.", "le gant est déchiré",
   ["dont", "donc", "que", "où"], 0, "mp_relatif",
   "« Dont » = « de qui » : le gant du gardien est déchiré.",
   "« Le gant du gardien » : « dont » reprend « du gardien ».",
   "« Donc » annonce une conséquence : ici, il ne s'agit pas de cela."),

mp("mp-4-14", 4, "Je me souviens très bien du jour ____ nous avons gagné notre premier match, après une saison de défaites.", "du jour",
   ["où", "ou", "dont", "donc"], 0, "mp_ou",
   "« Où » reprend un moment : le jour où nous avons gagné.",
   "« Du jour » est un moment : « où » le reprend.",
   "« Ou » veut dire « ou bien » : il propose un choix."),

mp("mp-4-15", 4, "Mon frère lit son livre dans le salon ____ ma sœur dessine à côté de lui : ils sont tous les deux très calmes.", "dessine à côté",
   ["tandis que", "parce que", "afin que", "sans que"], 0, "mp_simultane",
   "« Tandis que » relie deux actions faites en même temps : lire, dessiner.",
   "Les deux actions se passent ensemble : « tandis que ».",
   "« Parce que » donne une raison : lire n'explique pas dessiner."),

mp("mp-4-16", 4, "Écoute bien la consigne avant de commencer l'exercice, ____ tu feras des erreurs et tu devras tout recommencer.", "tu feras",
   ["sinon", "pourtant", "puisque", "alors que"], 0, "mp_condition",
   "« Sinon » signifie « si tu n'écoutes pas » : tu feras des erreurs.",
   "Si tu n'écoutes pas, tu fais des erreurs : une condition, donc « sinon ».",
   "« Puisque » donne une raison connue : on ne sait pas encore ce que tu feras."),

/* ---------------- NIVEAU 5 : phrases longues, formules figées (faute de, de peur que, par conséquent, néanmoins, quel que…) ---------------- */

mp("mp-5-01", 5, "____ de temps, le professeur de sport a dû arrêter la séance au milieu de l'exercice de tirs, et toute la classe a promis de la terminer le lendemain matin.", "de temps",
   ["Faute", "Grâce", "Malgré", "Afin"], 0, "mp_locution",
   "« Faute de » signifie « parce qu'il manque » : il manque du temps.",
   "Séance arrêtée : le temps a manqué, c'est « faute de ».",
   "« Grâce à » donne une bonne cause : ici, la séance s'arrête."),

mp("mp-5-02", 5, "Le coach note les erreurs de chacun ____ que le match avance, puis il les explique calmement à la mi-temps, en prenant un exemple pour chaque joueur concerné.", "puis il les explique",
   ["au fur et à mesure", "à moins", "de peur", "afin"], 0, "mp_locution",
   "« Au fur et à mesure que » : il note pendant que le match avance.",
   "Le coach note pendant le match, puis explique plus tard.",
   "« De peur que » dit une crainte : le coach ne craint rien ici."),

mp("mp-5-03", 5, "Il parle tout bas à son coéquipier ____ le gardien adverse ne l'entende et ne comprenne son plan pour le prochain corner, qu'il garde donc secret jusqu'au dernier moment.", "tout bas",
   ["de peur que", "à condition que", "parce que", "tandis que"], 0, "mp_subjonctif",
   "« De peur que » exprime la crainte : il a peur que le gardien entende.",
   "Parler tout bas, c'est craindre d'être entendu : « de peur que ».",
   "« À condition que » pose une condition : ici, il y a une crainte."),

mp("mp-5-04", 5, "Le terrain était devenu impraticable ce matin. ____, l'eau avait tout recouvert pendant la nuit et les poteaux de but étaient presque cachés par la boue.", "impraticable",
   ["En effet", "Pourtant", "Sinon", "Donc"], 0, "mp_lien_phrases",
   "« En effet » ajoute l'explication de la phrase d'avant : l'eau avait tout recouvert.",
   "La deuxième phrase explique la première : « en effet ».",
   "« Donc » annonce une conséquence : ici, c'est la cause qui vient."),

mp("mp-5-05", 5, "L'eau avait recouvert le terrain pendant toute la nuit. ____, le match a été reporté à la semaine suivante, et les deux équipes ont été prévenues par message dès le matin.", "reporté",
   ["Par conséquent", "En effet", "Pourtant", "D'ailleurs"], 0, "mp_consequence",
   "« Par conséquent » annonce la suite logique : le terrain est inondé, le match est reporté.",
   "L'eau est la cause ; le report est la conséquence.",
   "« En effet » donne une explication : ici, c'est un résultat."),

mp("mp-5-06", 5, "L'équipe était très fatiguée après deux matchs en deux jours. ____, elle a continué à courir et à presser l'adversaire jusqu'au coup de sifflet final, sans jamais abandonner.", "très fatiguée",
   ["Néanmoins", "Par conséquent", "En effet", "Puisque"], 0, "mp_opposition",
   "« Néanmoins » oppose : fatiguée, pourtant elle continue.",
   "Fatigue et effort : deux idées qui ne vont pas ensemble.",
   "« Par conséquent » annonce une suite logique : la fatigue ne fait pas courir plus."),

mp("mp-5-07", 5, "Le capitaine écoute attentivement le coach ____ regardant le tableau d'affichage, car il veut savoir combien de minutes il reste avant la fin de la rencontre.", "regardant",
   ["tout en", "au lieu", "afin de", "faute de"], 0, "mp_simultane",
   "« Tout en » + participe présent : deux actions en même temps.",
   "Écouter et regarder se font ensemble : « tout en regardant ».",
   "« Afin de » demande un infinitif : « afin de regarder »."),

mp("mp-5-08", 5, "Je n'ai pas du tout envie de sortir sous la pluie battante ; ____, j'ai encore plusieurs exercices à terminer avant l'entraînement de ce soir.", "plusieurs exercices",
   ["d'ailleurs", "pourtant", "sinon", "tandis que"], 0, "mp_lien_phrases",
   "« D'ailleurs » ajoute un argument de plus à la phrase précédente.",
   "Deux raisons de rester : la pluie, et les exercices.",
   "« Pourtant » oppose : ici, le deuxième argument va dans le même sens."),

mp("mp-5-09", 5, "Nous gagnerons le tournoi de fin d'année, ____ chacun fasse son travail sérieusement et respecte les consignes que le coach donne avant chaque match.", "fasse",
   ["pourvu que", "bien que", "sans que", "de peur que"], 0, "mp_subjonctif",
   "« Pourvu que » veut dire « à condition que » : il faut que chacun travaille.",
   "La victoire dépend d'une condition : « pourvu que » et le subjonctif.",
   "« Bien que » oppose : ici, le travail est nécessaire, pas contraire."),

mp("mp-5-10", 5, "Reste calme sur le banc des remplaçants ____ l'arbitre t'appelle pour entrer sur le terrain, et surtout ne commence pas à t'échauffer sans en avoir reçu l'ordre.", "t'appelle",
   ["jusqu'à ce que", "avant de", "afin de", "parce que"], 0, "mp_subjonctif",
   "« Jusqu'à ce que » + subjonctif : l'attente dure jusqu'à l'appel de l'arbitre.",
   "Reste calme tant que l'arbitre n'a pas appelé : « jusqu'à ce que ».",
   "« Avant de » demande un infinitif : « avant d'appeler »."),

mp("mp-5-11", 5, "Prends ton imperméable avec toi, ____ il pleuvrait pendant la sortie scolaire, car la météo annonce des orages pour la fin de l'après-midi sur toute la région.", "pleuvrait",
   ["au cas où", "bien que", "jusqu'à ce que", "puisque"], 0, "mp_condition",
   "« Au cas où » est suivi du conditionnel : il se pourrait qu'il pleuve.",
   "« Pleuvrait » est au conditionnel : « au cas où » l'appelle.",
   "« Bien que » demande le subjonctif, pas le conditionnel."),

mp("mp-5-12", 5, "Il avait bien préparé son sac de sport la veille au soir. ____, il n'a rien oublié le jour du match, ni ses protège-tibias, ni sa gourde, ni son maillot.", "bien préparé",
   ["Ainsi", "Pourtant", "Faute de", "Tandis que"], 0, "mp_consequence",
   "« Ainsi » annonce le résultat : bien préparé, donc rien oublié.",
   "La préparation est la cause ; l'absence d'oubli est le résultat.",
   "« Pourtant » opposerait : ici, les deux idées vont ensemble."),

mp("mp-5-13", 5, "Les spectateurs se sont mis ____ la pluie, sous le grand toit de la tribune, et ils ont regardé la fin du match sans être mouillés.", "sous le grand toit",
   ["à l'abri de", "à cause de", "à moins de", "à force de"], 0, "mp_locution",
   "« À l'abri de » veut dire « protégé de » : ils échappent à la pluie.",
   "Sous le toit, ils sont protégés : « à l'abri de ».",
   "« À cause de » donne une cause fâcheuse : ici, ils se protègent."),

mp("mp-5-14", 5, "Il ____ reste plus que deux minutes à jouer dans cette finale, et le score est toujours nul : tout peut encore arriver.", "plus que deux minutes",
   ["ne", "n'", "ni", "non"], 0, "mp_negation",
   "« Ne » se place devant le verbe : il ne reste plus que deux minutes.",
   "« Reste » commence par une consonne : on écrit « ne » en entier.",
   "« N' » s'écrit seulement devant une voyelle."),

mp("mp-5-15", 5, "____ soit le résultat du match, nous serons fiers de notre équipe, qui a travaillé toute l'année avec sérieux et qui n'a jamais abandonné.", "résultat",
   ["Quel que", "Quelque", "Quelle que", "Qu'elle que"], 0, "mp_quel",
   "« Quel que » s'accorde avec « résultat », un nom masculin singulier.",
   "« Résultat » est masculin : on écrit « quel que » sans « e ».",
   "« Quelle que » ne va qu'avec un nom féminin : quelle que soit la difficulté."),

mp("mp-5-16", 5, "Il doit se reposer plusieurs jours avant de rejouer, d'____ plus que son genou est encore fragile et que le prochain match est difficile.", "fragile",
   ["autant", "abord", "ailleurs", "accord"], 0, "mp_dautant",
   "« D'autant plus que » ajoute une raison de plus : le genou est fragile.",
   "Le repos a déjà une raison : « d'autant plus que » en ajoute une.",
   "« D'ailleurs » ajoute un argument, mais ne se met pas devant « plus que »."),

  ]);
})();
