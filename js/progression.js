/* Progression de l'élève, gardée dans son navigateur (localStorage).
   - matchs : résultat de chaque match (gagné ?, meilleur score)
   - calibrage : réglage du niveau de départ décidé après le match d'essai (-1, 0, +1)
   - carnet : règles ratées / réussies
   - mots : « Vu à l'entraînement »
   Chantier 13 : avec un compte (js/compte.js), la progression est stockée sous une clé propre à l'élève
   (« foot-comprehension-v2-c1234 ») et copiée dans le cloud. Sans compte, la clé d'origine est utilisée
   et rien n'est envoyé nulle part. Ce fichier ne parle jamais au réseau : c'est compte.js qui le fait. */
(function (root) {
  var J = root.JEU = root.JEU || {};
  var CLE_DEFAUT = "foot-comprehension-v2";
  var CLE = CLE_DEFAUT;

  var memoire = null;       // si le navigateur refuse le stockage, on garde tout en mémoire

  function num(x) { return (typeof x === "number" && isFinite(x)) ? x : 0; }

  // Met un objet de progression au bon format (jamais d'erreur, même si les données sont abîmées)
  function norm(o) {
    if (!o || typeof o !== "object") { o = {}; }
    if (!o.matchs || typeof o.matchs !== "object") { o.matchs = {}; }
    if (!o.carnet || typeof o.carnet !== "object") { o.carnet = {}; }
    if (!o.mots || typeof o.mots !== "object") { o.mots = {}; }
    if (typeof o.calibrage !== "number") { o.calibrage = 0; }
    o.maj = num(o.maj);         // dernière modification (ms)
    o.reinit = num(o.reinit);   // dernier « Recommencer le championnat » (ms)
    o.raz = num(o.raz);         // dernier « Effacer ma progression » (ms)
    return o;
  }
  function copie(o) { return JSON.parse(JSON.stringify(o)); }

  function lire() {
    if (memoire) { return memoire; }
    var o = null;
    try { o = JSON.parse(root.localStorage.getItem(CLE) || "null"); } catch (e) { o = null; }
    memoire = norm(o);
    return memoire;
  }
  function ecrire(silencieux) {
    memoire.maj = Date.now();
    try { root.localStorage.setItem(CLE, JSON.stringify(memoire)); } catch (e) {}
    if (!silencieux && typeof P.surChangement === "function") { try { P.surChangement(); } catch (e2) {} }
  }

  /* ---------- fusion de deux copies (appareil + cloud) : on ne perd jamais de progression ----------
     Deux repères évitent de ressusciter ce que l'élève a volontairement effacé :
     - raz    : « Effacer ma progression » ; une copie plus ancienne que ce repère est ignorée
     - reinit : « Recommencer le championnat » ; une copie plus ancienne n'apporte pas ses matchs */
  function meilleurMatch(x, y) {
    if (!x) { return y ? copie(y) : null; }
    if (!y) { return copie(x); }
    var g = x;
    if (!!y.gagne !== !!x.gagne) { g = y.gagne ? y : x; }
    else if ((y.nous - y.eux) > (x.nous - x.eux)) { g = y; }
    var r = copie(g);
    r.parties = Math.max(num(x.parties), num(y.parties));
    return r;
  }
  function fusion(a, b) {
    a = norm(a ? copie(a) : null); b = norm(b ? copie(b) : null);
    var Z = Math.max(a.raz, b.raz), R = Math.max(a.reinit, b.reinit);
    var cotes = [], k, c;
    [a, b].forEach(function (s) { if (s.raz >= Z) { cotes.push(s); } });   // une copie d'avant un effacement est ignorée
    var sortie = { matchs: {}, carnet: {}, mots: {}, calibrage: 0, raz: Z, reinit: R, maj: Math.max(a.maj, b.maj) };
    // niveau de l'entraînement « tirs au but » : celui de la copie la plus récente (chantier 15)
    var ta = (a.raz >= Z && a.tirs) ? a.tirs : null, tb = (b.raz >= Z && b.tirs) ? b.tirs : null;
    if (ta && tb) { sortie.tirs = (a.maj >= b.maj) ? copie(ta) : copie(tb); } else if (ta || tb) { sortie.tirs = copie(ta || tb); }

    cotes.forEach(function (s) {
      if (s.reinit < R) { return; }
      for (k in s.matchs) { if (s.matchs.hasOwnProperty(k)) { sortie.matchs[k] = meilleurMatch(sortie.matchs[k], s.matchs[k]); } }
      if (s.prologue) { sortie.prologue = true; }
    });

    cotes.forEach(function (s) {
      for (k in s.carnet) {
        if (!s.carnet.hasOwnProperty(k)) { continue; }
        var n = s.carnet[k], o = sortie.carnet[k];
        if (!o) { sortie.carnet[k] = copie(n); continue; }
        var garde = (n.vu > o.vu) ? n : o;
        sortie.carnet[k] = { rate: Math.max(num(n.rate), num(o.rate)), vu: Math.max(num(n.vu), num(o.vu)), serie: num(garde.serie) };
      }
      for (k in s.mots) {
        if (!s.mots.hasOwnProperty(k)) { continue; }
        var m = s.mots[k], p = sortie.mots[k];
        if (!p) { sortie.mots[k] = copie(m); continue; }
        var gm = ((num(m.rate) + num(m.serie)) > (num(p.rate) + num(p.serie))) ? m : p;
        var cm = copie(gm); cm.rate = Math.max(num(m.rate), num(p.rate)); sortie.mots[k] = cm;
      }
    });

    // niveau de départ : la valeur non nulle ; en cas de désaccord, la copie qui a le plus de matchs
    var ca = (cotes.indexOf(a) >= 0) ? a.calibrage : 0, cb = (cotes.indexOf(b) >= 0) ? b.calibrage : 0;
    if (ca === cb) { c = ca; }
    else if (ca === 0) { c = cb; }
    else if (cb === 0) { c = ca; }
    else { c = (Object.keys(b.matchs).length > Object.keys(a.matchs).length) ? cb : ca; }
    sortie.calibrage = c;

    // choix des noms : celui de la copie la plus récente
    var na = (cotes.indexOf(a) >= 0) ? a.noms : undefined, nb = (cotes.indexOf(b) >= 0) ? b.noms : undefined;
    if (na && nb) { sortie.noms = (a.maj >= b.maj) ? na : nb; }
    else if (na || nb) { sortie.noms = na || nb; }
    return sortie;
  }

  var P = J.progression = {
    // appelée après chaque modification (compte.js s'y branche pour copier dans le cloud)
    surChangement: null,

    /* Changer d'élève : lit une autre clé de stockage (null = clé d'origine, sans compte) */
    utiliser: function (cle) { CLE = cle || CLE_DEFAUT; memoire = null; if (J.noms && J.noms.relire) { J.noms.relire(); } },
    cleActuelle: function () { return CLE; },
    exporter: function () { return copie(lire()); },
    /* Remplace la progression (après fusion avec le cloud) sans déclencher d'envoi */
    remplacer: function (obj) { memoire = norm(copie(obj)); ecrire(true); if (J.noms && J.noms.relire) { J.noms.relire(); } },
    fusion: fusion,
    existe: function () { try { return root.localStorage.getItem(CLE) !== null; } catch (e) { return false; } },

    match: function (id) { return lire().matchs[id] || null; },

    /* res : { nous, eux, gagne, premier, total } */
    enregistrerMatch: function (id, res) {
      var d = lire(), a = d.matchs[id];
      var nouveau = !a || (res.gagne && !a.gagne) || (res.gagne === a.gagne && (res.nous - res.eux) > (a.nous - a.eux));
      var jouees = (a ? a.parties : 0) + 1;
      if (nouveau) {
        d.matchs[id] = { gagne: !!res.gagne, nous: res.nous, eux: res.eux, parties: jouees };
        if (res.tirs) { d.matchs[id].tab = res.tirs.nous + "–" + res.tirs.eux; }          // tirs au but (chantier 15)
      } else {
        a.parties = jouees;
      }
      ecrire();
      return nouveau;
    },
    // Un match est ouvert si c'est le premier ou si le précédent est gagné
    ouvert: function (index, matchs) {
      if (index === 0) { return true; }
      var prec = lire().matchs[matchs[index - 1].id];
      return !!(prec && prec.gagne);
    },

    // Niveau de l'entraînement « tirs au but » (1 à 5 ; 0 = pas encore fixé)
    // id = le gardien choisi (blond, noir, alan, ted, thomas) : chaque gardien garde son niveau (chantier 15)
    niveauTirs: function (id) {
      var t = lire().tirs;
      if (id) { return (t && t.par && typeof t.par[id] === "number") ? t.par[id] : 0; }
      return (t && typeof t.niveau === "number") ? t.niveau : 0;
    },
    fixerNiveauTirs: function (n, id) {
      var d = lire(), t = d.tirs || {};
      if (id) { t.par = t.par || {}; t.par[id] = n; } else { t.niveau = n; }
      d.tirs = t; ecrire();
    },

    calibrage: function () { return lire().calibrage; },
    fixerCalibrage: function (v) { lire().calibrage = v; ecrire(); },

    /* Carnet de règles */
    noterRegle: function (regle, ok) {
      if (!regle) { return; }
      var c = lire().carnet, r = c[regle] || { rate: 0, serie: 0, vu: 0 };
      r.vu++;
      if (ok) { r.serie++; } else { r.rate++; r.serie = 0; }
      c[regle] = r;
      ecrire();
    },
    // Règles ratées au moins une fois et pas encore réussies 2 fois de suite
    revoir: function () {
      var c = lire().carnet, sortie = [], k;
      for (k in c) { if (c.hasOwnProperty(k) && c[k].rate > 0 && c[k].serie < 2) { sortie.push(k); } }
      return sortie;
    },
    carnet: function () {
      var c = lire().carnet, sortie = [], k;
      for (k in c) {
        if (c.hasOwnProperty(k) && c[k].rate > 0) {
          sortie.push({ regle: k, rate: c[k].rate, serie: c[k].serie, maitrisee: c[k].serie >= 2 });
        }
      }
      return sortie;
    },

    /* « Vu à l'entraînement » : les petits mots (ou la règle, si le mot contient un nom de joueur) qui ont posé problème.
       Une entrée est créée à la première erreur ; deux réussites de suite la marquent comme maîtrisée. */
    noterMot: function (mot, regle, ok) {
      if (!mot && !regle) { return; }
      var m = lire().mots, cle = mot ? "m:" + String(mot).toLowerCase() : "r:" + regle, r = m[cle];
      if (!r) { if (ok) { return; } r = m[cle] = { mot: mot || null, regle: regle || null, rate: 0, serie: 0 }; }
      if (ok) { r.serie++; } else { r.rate++; r.serie = 0; }
      ecrire();
    },
    mots: function () {
      var m = lire().mots, sortie = [], k;
      for (k in m) { if (m.hasOwnProperty(k) && m[k].rate > 0) { sortie.push({ mot: m[k].mot, regle: m[k].regle, rate: m[k].rate, maitrise: m[k].serie >= 2 }); } }
      return sortie;
    },

    // Prénoms : "manga" ou "francais" (choix de l'élève)
    modeNoms: function () { return lire().noms === "francais" ? "francais" : "manga"; },
    fixerModeNoms: function (m) { lire().noms = m; ecrire(); },

    prologueVu: function () { return !!lire().prologue; },
    marquerPrologue: function () { lire().prologue = true; ecrire(); },

    // Tous les matchs du championnat sont gagnés ? (liste = J.championnat.matchs)
    termine: function (matchs) {
      var d = lire(), i;
      for (i = 0; i < matchs.length; i++) { if (!d.matchs[matchs[i].id] || !d.matchs[matchs[i].id].gagne) { return false; } }
      return matchs.length > 0;
    },
    // Recommencer le championnat : les matchs et le prologue repartent à zéro ; le carnet de règles, le réglage de niveau et le choix des noms restent
    recommencerChampionnat: function () {
      var d = lire(); d.matchs = {}; d.prologue = false; d.reinit = Date.now(); ecrire();
    },

    effacer: function () {
      var m = lire().noms, t = Date.now();
      memoire = { matchs: {}, carnet: {}, mots: {}, calibrage: 0, noms: m, raz: t, reinit: t, maj: t };
      ecrire();
    }
  };
})(typeof window !== "undefined" ? window : this);
