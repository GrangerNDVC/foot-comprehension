/* ============================================================
   LA BANQUE DE QUESTIONS : rassemble les questions de tous les fichiers data/
   et choisit la prochaine question selon le type d'action et le niveau.

   Pour ajouter une banque : dans un nouveau fichier data/xxx.js, écrire
       JEU.ajouterQuestions([ { id: "...", niveau: 2, type: "passe", ... }, ... ]);
   puis ajouter la ligne <script> dans index.html. Format : voir data/palier1.js.
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

  /* Choisit une question.
     type    : passe | dribble | tir | defense
     niveau  : 1 à 5
     opts.exclus      : ids déjà posés dans ce match (dans l'ordre)
     opts.revoir      : règles du carnet à revoir
     opts.dernierRate : id de la dernière question ratée (pour ne pas la reposer tout de suite) */
  B.choisir = function (type, niveau, opts) {
    opts = opts || {};
    var exclus = opts.exclus || [];
    var tous = B.toutes().filter(function (q) { return q.type === type; });
    if (!tous.length) { tous = B.toutes(); }
    if (!tous.length) { return null; }
    var libre = function (q) { return exclus.indexOf(q.id) < 0; };
    var cand, d;

    // 1) Une règle ratée revient, dans une autre question, de temps en temps
    if (opts.revoir && opts.revoir.length && J.alea() < 0.5) {
      cand = tous.filter(function (q) {
        return libre(q) && opts.revoir.indexOf(q.regle) >= 0 &&
               Math.abs(q.niveau - niveau) <= 1 && q.id !== opts.dernierRate;
      });
      if (cand.length) { return hasard(cand); }
    }
    // 2) Le niveau demandé, sinon le plus proche, parmi les questions pas encore posées
    for (d = 0; d <= 4; d++) {
      cand = tous.filter(function (q) { return libre(q) && Math.abs(q.niveau - niveau) === d; });
      if (cand.length) { return hasard(cand); }
    }
    // 3) Tout a été posé : on reprend la plus ancienne au niveau le plus proche
    var meilleur = null, score = null;
    tous.forEach(function (q) {
      var rang = exclus.lastIndexOf(q.id);
      var s = Math.abs(q.niveau - niveau) * 1000 + rang;
      if (score === null || s < score) { score = s; meilleur = q; }
    });
    return meilleur;
  };

  /* Contrôle des questions (pour la personne qui écrit des questions).
     Renvoie la liste des problèmes trouvés (vide = tout va bien). */
  B.verifier = function () {
    var pb = [], ids = {};
    B.toutes().forEach(function (q) {
      var p = function (m) { pb.push(q.id + " : " + m); };
      if (!q.id) { pb.push("une question sans id"); return; }
      if (ids[q.id]) { p("id en double"); }
      ids[q.id] = true;
      if (["passe", "dribble", "tir", "defense"].indexOf(q.type) < 0) { p("type inconnu (" + q.type + ")"); }
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
      if (!e || typeof e !== "object" || !e.bonne || !e.cle || !e.piege) { p("explication : {bonne, cle, piege} attendus"); }
      else {
        ["bonne", "cle", "piege"].forEach(function (c) {
          if (e[c].split(/\s+/).length > 18) { p("explication." + c + " trop longue (18 mots max)"); }
        });
      }
      if (q.mot) {
        var texte = ((q.consigne || "") + " " + (q.situation || "") + " " + (q.indices ? q.indices.join(" ") : "")).toLowerCase();
        if (texte.indexOf(String(q.mot).toLowerCase()) < 0) { p("`mot` introuvable dans le texte (" + q.mot + ")"); }
      }
      // options en double
      var vus = {};
      q.options.forEach(function (o) { if (vus[o]) { p("option en double"); } vus[o] = true; });
    });
    return pb;
  };
})(typeof window !== "undefined" ? window : this);
