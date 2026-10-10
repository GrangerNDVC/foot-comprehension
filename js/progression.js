/* Meilleurs scores, gardés dans le navigateur de l'élève (localStorage). */
(function () {
  var J = window.JEU = window.JEU || {};
  var CLE = "foot-comprehension-v1";

  function lire() {
    try { return JSON.parse(window.localStorage.getItem(CLE) || "{}"); } catch (e) { return {}; }
  }
  function ecrire(o) {
    try { window.localStorage.setItem(CLE, JSON.stringify(o)); } catch (e) {}
  }

  J.progression = {
    meilleur: function (id) { return lire()[id] || null; },
    enregistrer: function (id, points, max) {
      var o = lire(), ancien = o[id];
      if (!ancien || points > ancien.points) {
        o[id] = { points: points, max: max };
        ecrire(o);
        return true;
      }
      return false;
    },
    effacer: function () { ecrire({}); }
  };
})();
