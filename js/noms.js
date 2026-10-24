/* ============================================================
   LES NOMS : choisit entre les prénoms du manga et ceux d'« Olive et Tom ».
   - J.noms.joueur(n)   -> "Olivier" ou "Tsubasa"
   - J.noms.equipe(x)   -> nom d'équipe dans la version choisie
   - J.noms.texte(t)    -> remplace tous les noms connus dans un texte libre (histoire)
   - J.noms.mode()/fixer(m) -> "manga" ou "francais" (gardé dans le navigateur)
   Dans les questions, les noms s'écrivent {A} {B} {C} {D} : voir J.banque.rendre (js/banque.js).
   ============================================================ */
(function (root) {
  var J = root.JEU = root.JEU || {};
  var N = J.noms = {};
  var MODE = null;

  function T() { return J.nomsTable; }
  function indice() { return N.mode() === "francais" ? 1 : 0; }

  N.mode = function () {
    if (MODE) { return MODE; }
    var m = (J.progression && J.progression.modeNoms) ? J.progression.modeNoms() : "manga";
    MODE = (m === "francais") ? "francais" : "manga";
    return MODE;
  };
  N.relire = function () { MODE = null; };   // après un changement d'élève
  N.fixer = function (m) {
    MODE = (m === "francais") ? "francais" : "manga";
    if (J.progression && J.progression.fixerModeNoms) { J.progression.fixerModeNoms(MODE); }
  };

  // Change le mode sans l'enregistrer (pour les contrôles) ; renvoie l'ancien mode
  N.provisoire = function (m) { var avant = N.mode(); MODE = (m === "francais") ? "francais" : "manga"; return avant; };

  N.joueur = function (n) {
    var e = T().joueurs[n];
    return e ? e[indice()] : ("n°" + n);
  };
  N.equipe = function (x) {
    var l = T().equipes, i;
    for (i = 0; i < l.length; i++) { if (l[i][0] === x || l[i][1] === x) { return l[i][indice()]; } }
    return x;
  };
  // Les noms commençant par une voyelle : « d'Izawa », « qu'Olivier »
  N.voyelle = function (nom) { return /^[AEIOUYÀÂÉÈÊÎÔÛH]/i.test(nom); };

  // Remplace dans un texte libre tous les noms connus (histoire, prologue) par ceux du mode choisi
  N.texte = function (t) {
    if (t == null) { return t; }
    var paires = [], k, i = indice();
    T().autres.forEach(function (p) { paires.push(p); });
    T().equipes.forEach(function (p) { paires.push(p); });
    for (k in T().joueurs) { if (T().joueurs.hasOwnProperty(k)) { paires.push(T().joueurs[k]); } }
    // du plus long au plus court, pour que « Tsubasa Ozora » passe avant « Tsubasa »
    paires.sort(function (a, b) { return b[0].length - a[0].length; });
    var jetons = [];
    paires.forEach(function (p, j) {
      var re = new RegExp("(^|[^A-Za-zÀ-ÿ-])" + p[0].replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?![A-Za-zÀ-ÿ-])", "g");
      t = t.replace(re, function (m, avant) { jetons.push(p[i]); return avant + "\u0001" + (jetons.length - 1) + "\u0002"; });
    });
    return t.replace(/\u0001(\d+)\u0002/g, function (m, n) { return jetons[Number(n)]; });
  };
})(typeof window !== "undefined" ? window : this);
