/* Chargement des images décrites dans assets/manifest.js.
   Si une image manque, le jeu continue avec des formes simples. */
(function () {
  var J = window.JEU = window.JEU || {};
  var A = J.assets = { images: {}, defs: {}, nbOk: 0, nbTotal: 0 };

  A.charger = function () {
    var liste = J.manifest || [];
    A.nbTotal = liste.length;
    liste.forEach(function (e) {
      A.defs[e.id] = e;
      var im = new Image();
      im.onload = function () { A.images[e.id] = im; A.nbOk++; };
      im.onerror = function () { /* image absente : on ignore */ };
      im.src = "assets/" + e.dossier + "/" + e.fichier;
    });
  };

  A.get = function (id) { return A.images[id] || null; };

  // Taille « logique » (pixels NES) = taille de l'image divisée par l'agrandissement d'export
  A.taille = function (id) {
    var im = A.images[id], d = A.defs[id];
    if (!im || !d) { return null; }
    return { w: im.naturalWidth / d.ech, h: im.naturalHeight / d.ech };
  };
})();
