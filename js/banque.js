/* ============================================================
   LA BANQUE DE QUESTIONS : rassemble les questions de tous les fichiers data/,
   choisit la prochaine question selon le type d'action et le niveau, et ÉCRIT LES NOMS
   des joueurs réellement présents dans l'action en cours.

   Pour ajouter une banque : dans un nouveau fichier data/xxx.js, écrire
       JEU.ajouterQuestions([ { id: "...", niveau: 2, type: "passe", ... }, ... ]);
   puis ajouter la ligne <script> dans index.html. Format : voir 04-QUESTIONS.md.

   LES NOMS DANS LES QUESTIONS (nouveau) : jamais de prénom écrit en dur. On écrit des « places » :
     {A}  le joueur qui a le ballon (ou le défenseur qui défend)       {B}  le joueur choisi pour la passe
     {C} {D}  d'autres joueurs de l'équipe présents sur le terrain
     {X} {Y} {Z}  des adversaires (écrits « n°7 », « n°9 »…) ; {X} est l'adversaire en face de {A}
     {de:A}  « de Paul » ou « d'Izawa » (élision) ;  {que:A}  « que Paul » ou « qu'Izawa »
   Champs facultatifs d'une question :
     fixe: { B: 10 }   cette place doit être ce joueur (ex. « le capitaine » = 10)
     special: "une-deux"   question réservée à l'échange de passes des deux joueurs spécialistes
     tags: [...]       thèmes (ex. "pluie", "triche") pour les matchs à particularité
   ============================================================ */
(function (root) {
  var J = root.JEU = root.JEU || {};
  J.questions = J.questions || [];
  J.items = J.items || {};
  J.alea = J.alea || function () { return Math.random(); };   // remplaçable pour les tests

  J.ajouterQuestions = function (liste) {
    for (var i = 0; i < liste.length; i++) { J.questions.push(liste[i]); }
  };

  var B = J.banque = {};
  var cache = null;
  var CHAMPS_TEXTE = ["consigne", "situation", "question", "mot"];
  var JETON = /\{(?:(de|que):)?([ABCDXYZ])\}/g;

  B.vider = function () { cache = null; };

  // Toutes les questions : nouveaux fichiers (J.questions) + anciens paliers (J.items)
  B.toutes = function () {
    if (cache) { return cache; }
    var sortie = J.questions.slice(), k, i;
    for (k in J.items) {
      if (J.items.hasOwnProperty(k)) {
        for (i = 0; i < J.items[k].length; i++) { sortie.push(J.items[k][i]); }
      }
    }
    for (i = 0; i < sortie.length; i++) {
      if (!sortie[i].format) { sortie[i].format = "choix"; }
    }
    cache = sortie;
    return sortie;
  };

  function hasard(tab) { return tab[Math.floor(J.alea() * tab.length)]; }

  /* ---------- les places {A} {B}… d'une question ---------- */
  function textes(q) {
    var t = [], e = q.explication || {};
    CHAMPS_TEXTE.forEach(function (c) { if (q[c]) { t.push(q[c]); } });
    (q.options || []).forEach(function (o) { t.push(o); });
    (q.indices || []).forEach(function (o) { t.push(o); });
    ["bonne", "cle", "piege"].forEach(function (c) { if (e[c]) { t.push(e[c]); } });
    return t;
  }
  // Lettres de places utilisées par une question : ex. {A:true, B:true, X:true}
  B.places = function (q) {
    var res = {};
    textes(q).forEach(function (t) {
      String(t).replace(JETON, function (m, mode, lettre) { res[lettre] = true; return m; });
    });
    return res;
  };

  function nomPlace(ctx, lettre, mode) {
    var v = ctx[lettre];
    if (v == null) { return "…"; }
    if (lettre === "X" || lettre === "Y" || lettre === "Z") { return "n°" + v; }
    var nom = J.noms.joueur(v);
    if (mode === "de") { return (J.noms.voyelle(nom) ? "d'" : "de ") + nom; }
    if (mode === "que") { return (J.noms.voyelle(nom) ? "qu'" : "que ") + nom; }
    return nom;
  }
  function remplir(t, ctx) {
    return String(t).replace(JETON, function (m, mode, lettre) { return nomPlace(ctx, lettre, mode); });
  }

  /* Écrit une question avec les noms de ctx = { A: 8, B: 7, C: 9, D: 3, X: 5, Y: 6, Z: 4 }.
     Renvoie une COPIE (la question d'origine n'est pas changée). */
  B.rendre = function (q, ctx) {
    var c = {}, k, e = q.explication;
    for (k in q) { if (q.hasOwnProperty(k)) { c[k] = q[k]; } }
    CHAMPS_TEXTE.forEach(function (ch) { if (q[ch]) { c[ch] = remplir(q[ch], ctx); } });
    if (q.options) { c.options = q.options.map(function (o) { return remplir(o, ctx); }); }
    if (q.indices) { c.indices = q.indices.map(function (o) { return remplir(o, ctx); }); }
    if (e) { c.explication = { bonne: remplir(e.bonne, ctx), cle: remplir(e.cle, ctx), piege: remplir(e.piege, ctx) }; }
    c._ctx = ctx; c._brut = q.id;
    return c;
  };

  /* Attribue les joueurs aux places d'une question, selon l'action en cours.
     base = { porteur, cible (ou null), equipe: [numéros sur le terrain], adv, advListe: [numéros adverses] }
     Renvoie ctx, ou null si la question ne convient pas à cette action. */
  var TOUTE_L_EQUIPE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 14, 15, 16];   // les 14 joueurs de Nankatsu
  B.attribuer = function (q, base) {
    var pl = B.places(q), ctx = {}, utilises = {}, l, fixe = q.fixe || {}, libres;
    // A = porteur, B = cible : imposés
    if (pl.A || fixe.A) {
      ctx.A = base.porteur;
      if (fixe.A != null && fixe.A !== ctx.A) { return null; }
    }
    if (pl.B || fixe.B) {
      if (fixe.B != null) {
        if (base.cible != null && base.cible !== fixe.B) { return null; }
        ctx.B = fixe.B;
      } else if (base.cible != null) { ctx.B = base.cible; }
    }
    // les places « fixes » (ex. le capitaine)
    for (l in fixe) {
      if (fixe.hasOwnProperty(l)) {
        if (ctx[l] != null && ctx[l] !== fixe[l]) { return null; }
        ctx[l] = fixe[l];
      }
    }
    for (l in ctx) { if (ctx.hasOwnProperty(l)) { if (utilises[ctx[l]]) { return null; } utilises[ctx[l]] = true; } }
    // les autres places : au hasard parmi les joueurs sur le terrain
    // Flashback (q.flashback) : le texte ne se passe pas dans l'action en cours, donc n'importe quel joueur de Nankatsu convient.
    // Sinon : seulement des joueurs qui sont sur le terrain (ils seront entourés en jaune à l'écran).
    var vivier = q.flashback ? TOUTE_L_EQUIPE : base.equipe;
    var autres = vivier.filter(function (n) { return n !== 1 && !utilises[n]; });
    if (!autres.length) { autres = vivier.filter(function (n) { return !utilises[n]; }); }
    ["A", "B", "C", "D"].forEach(function (lettre) {
      if (pl[lettre] && ctx[lettre] == null) {
        if (!autres.length) { ctx.__manque = true; return; }
        var k = Math.floor(J.alea() * autres.length);
        ctx[lettre] = autres.splice(k, 1)[0];
      }
    });
    if (ctx.__manque) { return null; }
    // adversaires : X = celui qui est en face, Y et Z = d'autres
    var advs = (base.advListe || []).filter(function (n) { return n !== base.adv; });
    if (pl.X) { ctx.X = base.adv; }
    ["Y", "Z"].forEach(function (lettre) {
      if (pl[lettre]) {
        var k = Math.floor(J.alea() * advs.length);
        ctx[lettre] = advs.splice(k, 1)[0];
      }
    });
    return ctx;
  };

  /* Choisit une question et l'écrit avec les noms de l'action en cours.
     type    : passe | dribble | tir | defense | gardien
     niveau  : 1 à 5
     opts.exclus      : ids déjà posés dans ce match (dans l'ordre)
     opts.revoir      : règles du carnet à revoir
     opts.dernierRate : id de la dernière question ratée (pour ne pas la reposer tout de suite)
     opts.base        : l'action en cours (voir B.attribuer)
     opts.special     : "une-deux" pour l'échange de passes des deux spécialistes
     opts.tags        : thèmes du match (facultatif) : les questions de ces thèmes sont préférées
     Renvoie la question écrite (copie) avec ._ctx, ou null. */
  B.choisir = function (type, niveau, opts) {
    opts = opts || {};
    var exclus = opts.exclus || [], base = opts.base || null;
    var tous = B.toutes().filter(function (q) { return q.type === type && !q.retire; });
    if (opts.special) {
      var spe = tous.filter(function (q) { return q.special === opts.special; });
      if (spe.length) { tous = spe; }
    } else {
      tous = tous.filter(function (q) { return !q.special; });
    }
    if (!tous.length) { tous = B.toutes().filter(function (q) { return !q.retire; }); }
    if (!tous.length) { return null; }
    var libre = function (q) { return exclus.indexOf(q.id) < 0; };
    var essai = {};                               // ctx déjà calculé pour chaque question
    var convient = function (q) {
      if (!base) { return true; }
      if (!(q.id in essai)) { essai[q.id] = B.attribuer(q, base); }
      return essai[q.id] !== null;
    };
    var fini = function (q) { return q ? B.rendre(q, base ? essai[q.id] : {}) : null; };
    var cand, d, q;

    // 0) Un thème du match (pluie, triche…) revient de temps en temps
    if (opts.tags && opts.tags.length && J.alea() < 0.35) {
      cand = tous.filter(function (x) {
        return libre(x) && convient(x) && Math.abs(x.niveau - niveau) <= 1 && x.tags &&
               x.tags.some(function (t) { return opts.tags.indexOf(t) >= 0; });
      });
      if (cand.length) { return fini(hasard(cand)); }
    }
    // 1) Une règle ratée revient, dans une autre question, de temps en temps
    if (opts.revoir && opts.revoir.length && J.alea() < 0.5) {
      cand = tous.filter(function (x) {
        return libre(x) && convient(x) && opts.revoir.indexOf(x.regle) >= 0 &&
               Math.abs(x.niveau - niveau) <= 1 && x.id !== opts.dernierRate;
      });
      if (cand.length) { return fini(hasard(cand)); }
    }
    // 2) Le niveau demandé, sinon le plus proche, parmi les questions pas encore posées
    for (d = 0; d <= 4; d++) {
      cand = tous.filter(function (x) { return libre(x) && convient(x) && Math.abs(x.niveau - niveau) === d; });
      if (cand.length) { return fini(hasard(cand)); }
    }
    // 3) Tout a été posé : on reprend la plus ancienne au niveau le plus proche
    var meilleur = null, score = null;
    tous.forEach(function (x) {
      if (!convient(x)) { return; }
      var rang = exclus.lastIndexOf(x.id);
      var s = Math.abs(x.niveau - niveau) * 1000 + rang;
      if (score === null || s < score) { score = s; meilleur = x; }
    });
    return fini(meilleur);
  };

  /* Contrôle des questions (pour la personne qui écrit des questions).
     Renvoie la liste des problèmes trouvés (vide = tout va bien). */
  var CTX_TEST = { A: 8, B: 7, C: 9, D: 3, X: 5, Y: 6, Z: 4 };
  var PRENOMS_INTERDITS = ["Léo", "Max", "Sam", "Léa", "Nina", "Tom", "Ali", "Inès", "Yanis"];
  function motEntier(t, mot) {
    return new RegExp("(^|[^A-Za-zÀ-ÿ])" + mot.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?![A-Za-zÀ-ÿ])").test(t);
  }

  B.verifier = function () {
    var pb = [], ids = {};
    var nomsEnDur = [];
    if (J.nomsTable) {
      Object.keys(J.nomsTable.joueurs).forEach(function (k) { nomsEnDur.push(J.nomsTable.joueurs[k][0], J.nomsTable.joueurs[k][1]); });
    }
    nomsEnDur = nomsEnDur.concat(PRENOMS_INTERDITS);
    B.toutes().forEach(function (q) {
      var p = function (m) { pb.push(q.id + " : " + m); };
      if (!q.id) { pb.push("une question sans id"); return; }
      if (ids[q.id]) { p("id en double"); }
      ids[q.id] = true;
      if (["passe", "dribble", "tir", "defense", "gardien"].indexOf(q.type) < 0) { p("type inconnu (" + q.type + ")"); }
      if (!(q.niveau >= 1 && q.niveau <= 5)) { p("niveau hors de 1 à 5"); }
      if (["choix", "barrer", "vrai-faux-nsp"].indexOf(q.format) < 0) { p("format inconnu (" + q.format + ")"); }
      if (!q.question) { p("pas de question"); }
      if (!q.options || q.options.length < 2) { p("moins de 2 options"); return; }
      if (q.format === "barrer") {
        if (!(q.bonne instanceof Array) || !q.bonne.length) { p("barrer : `bonne` doit être une liste"); }
        else { q.bonne.forEach(function (b) { if (!(b >= 0 && b < q.options.length)) { p("bonne hors des options"); } }); }
      } else if (!(q.bonne >= 0 && q.bonne < q.options.length)) { p("`bonne` hors des options"); }
      if (q.format === "vrai-faux-nsp" && q.options.length !== 3) { p("vrai-faux-nsp : 3 options attendues"); }
      if (!q.consigne && !q.indices) { p("ni consigne ni indices"); }
      if (q.indices && q.indices.length < 2) { p("indices : au moins 2"); }
      if (!q.regle || !J.regles_texte || !J.regles_texte[q.regle]) { p("règle inconnue (" + q.regle + ")"); }
      var e = q.explication;
      if (!e || typeof e !== "object" || !e.bonne || !e.cle || !e.piege) { p("explication : {bonne, cle, piege} attendus"); return; }

      // les noms : jamais en dur, toujours une place {A}…
      var brut = textes(q);
      brut.forEach(function (t) {
        nomsEnDur.forEach(function (n) { if (motEntier(String(t), n)) { p("nom écrit en dur (« " + n + " ») : utiliser {A} {B} {C} {D}"); } });
      });
      var pl = B.places(q);
      if (J.nomsTable && (q.type === "passe" || q.type === "dribble" || q.type === "tir") && !pl.A && !q.legacy) { p("la place {A} (le joueur qui a le ballon) n'est pas utilisée"); }

      // contrôle sur la question écrite, dans les deux versions des noms
      ["manga", "francais"].forEach(function (mode) {
        var mem = J.noms.provisoire(mode);
        var r = B.rendre(q, CTX_TEST), tx = [r.consigne || "", r.situation || "", (r.indices || []).join(" ")].join(" ");
        if (r.question.indexOf("{") >= 0 || tx.indexOf("{") >= 0 || r.options.join("").indexOf("{") >= 0) { p("place {…} non remplacée (" + mode + ")"); }
        if (q.mot && tx.toLowerCase().indexOf(r.mot.toLowerCase()) < 0) { p("`mot` introuvable dans le texte (" + r.mot + ", " + mode + ")"); }
        ["bonne", "cle", "piege"].forEach(function (c) {
          if (r.explication[c].split(/\s+/).length > 18) { p("explication." + c + " trop longue (18 mots max, " + mode + ")"); }
        });
        var vus = {};
        r.options.forEach(function (o) { if (vus[o]) { p("option en double (" + mode + ")"); } vus[o] = true; });
        J.noms.provisoire(mem);
      });
    });
    return pb;
  };
})(typeof window !== "undefined" ? window : this);
