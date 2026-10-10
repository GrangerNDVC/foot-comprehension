/* Démarrage du jeu et branchements de l'interface. */
(function () {
  var J = window.JEU = window.JEU || {};
  function $(id) { return document.getElementById(id); }

  function ouvrirVestiaire() {
    var t = $("table-vestiaire");
    while (t.firstChild) { t.removeChild(t.firstChild); }
    J.vestiaire.forEach(function (v) {
      var tr = document.createElement("tr");
      var a = document.createElement("th"); a.textContent = v.mot;
      var b = document.createElement("td"); b.textContent = v.sens;
      tr.appendChild(a); tr.appendChild(b); t.appendChild(tr);
    });
    $("modal-vestiaire").hidden = false;
  }

  function demarrer() {
    J.assets.charger();
    J.scene.init($("scene"));
    J.moteur.brancher();
    $("btn-vestiaire").onclick = ouvrirVestiaire;
    $("btn-vestiaire-menu").onclick = ouvrirVestiaire;
    $("btn-reset").onclick = function () {
      if (window.confirm("Effacer tous les scores ?")) { J.progression.effacer(); J.moteur.menu(); }
    };
    var fermer = document.querySelectorAll("[data-fermer]");
    for (var i = 0; i < fermer.length; i++) {
      fermer[i].onclick = function () {
        $("modal-var").hidden = true; $("modal-vestiaire").hidden = true;
      };
    }
    J.moteur.menu();
  }

  if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", demarrer); }
  else { demarrer(); }
})();
