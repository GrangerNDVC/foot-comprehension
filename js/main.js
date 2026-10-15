/* Démarrage du jeu. */
(function () {
  var J = window.JEU = window.JEU || {};
  function demarrer() {
    J.match.brancher();
    J.match.menu();
  }
  if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", demarrer); }
  else { demarrer(); }
})();
