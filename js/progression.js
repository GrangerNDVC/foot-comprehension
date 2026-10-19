/* Progression de l'élève, gardée dans son navigateur (localStorage). Rien n'est envoyé nulle part.
   - matchs : résultat de chaque match (gagné ?, meilleur score)
   - calibrage : réglage du niveau de départ décidé après le match d'essai (-1, 0, +1)
   - carnet : règles ratées / réussies */
(function (root) {
  var J = root.JEU = root.JEU || {};
  var CLE = "foot-comprehension-v2";

  var memoire = null;       // si le navigateur refuse le stockage, on garde tout en mémoire
  function lire() {
    if (memoire) { return memoire; }
    var o = null;
    try { o = JSON.parse(root.localStorage.getItem(CLE) || "null"); } catch (e) { o = null; }
    if (!o || typeof o !== "object") { o = {}; }
    o.matchs = o.matchs || {};
    o.carnet = o.carnet || {};
    if (typeof o.calibrage !== "number") { o.calibrage = 0; }
    memoire = o;
    return o;
  }
  function ecrire() {
    try { root.localStorage.setItem(CLE, JSON.stringify(memoire)); } catch (e) {}
  }

  J.progression = {
    match: function (id) { return lire().matchs[id] || null; },

    /* res : { nous, eux, gagne, premier, total } */
    enregistrerMatch: function (id, res) {
      var d = lire(), a = d.matchs[id];
      var nouveau = !a || (res.gagne && !a.gagne) || (res.gagne === a.gagne && (res.nous - res.eux) > (a.nous - a.eux));
      var jouees = (a ? a.parties : 0) + 1;
      if (nouveau) {
        d.matchs[id] = { gagne: !!res.gagne, nous: res.nous, eux: res.eux, parties: jouees };
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
      var d = lire(); d.matchs = {}; d.prologue = false; ecrire();
    },

    effacer: function () { var m = lire().noms; memoire = { matchs: {}, carnet: {}, calibrage: 0, noms: m }; ecrire(); }
  };
})(typeof window !== "undefined" ? window : this);
