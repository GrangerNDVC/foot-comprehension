/* Démarrage du jeu. */
(function () {
  var J = window.JEU = window.JEU || {};
  function demarrer() {
    if (J.sons) { J.sons.brancher(); }
    J.match.brancher();
    if (J.compte) { J.compte.brancher(); J.compte.demarrer(); }   // écran du numéro, puis le menu
    else { J.match.menu(); }
  }
  if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", demarrer); }
  else { demarrer(); }
})();
