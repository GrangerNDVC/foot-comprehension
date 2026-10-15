/* sprites-recolor.js (chantier 2) : recoloration par remplacement exact de couleurs, en double-clic (sans serveur).
   Prérequis : charger d'abord les atlas (joueur-NN-atlas.js, gardiens-atlas.js) : ils contiennent le PNG en dataUri,
   ce qui évite le blocage "canvas souillé" des navigateurs sur file://.
   API :
     SPRITES_RECOLOR.pret(["joueur-08","gardiens"], function(){ ... })   // décode les images
     var c = SPRITES_RECOLOR.joueur("joueur-08", {maillot:[r,g,b], short:[r,g,b], cheveux:[r,g,b], peau:[r,g,b]}); // canvas de l'atlas recoloré (mis en cache)
     var g = SPRITES_RECOLOR.gardien({maillot:[..], maillotClair:[..], cheveux:[..], peau:[..]});
     SPRITES_RECOLOR.dessiner(ctx, canvasAtlas, "joueur-08", "course-balle__1", x, y, echelle);
     SPRITES_RECOLOR.dessinerEquipe(ctx, equipe, joueur, pose, x, y, echelle)  // équipe = window.EQUIPES[id] */
(function () {
  var imgs = {}, cache = {};
  var SRC_J = { maillot: [100,176,255], short: [21,95,217], cheveux: [153,78,0], peau: [254,204,197] };
  var SRC_G = { maillot: [21,95,217], maillotClair: [100,176,255], cheveux: [153,78,0], peau: [254,204,197] };
  function key(c){ return c ? c.join(",") : ""; }
  function pret(noms, cb) {
    var restant = noms.length;
    if (!restant) { cb(); return; }
    noms.forEach(function (n) {
      if (imgs[n]) { if (--restant === 0) cb(); return; }
      var im = new Image();
      im.onload = function () { imgs[n] = im; if (--restant === 0) cb(); };
      im.src = window.SPRITES[n].dataUri;
    });
  }
  function recolorer(nom, src, app, cle) {
    var k = nom + "|" + cle;
    if (cache[k]) return cache[k];
    var im = imgs[nom]; if (!im) throw new Error("atlas non chargé : " + nom + " (appeler pret d'abord)");
    var cv = document.createElement("canvas"); cv.width = im.width; cv.height = im.height;
    var cx = cv.getContext("2d"); cx.drawImage(im, 0, 0);
    var id = cx.getImageData(0, 0, cv.width, cv.height), d = id.data, regles = [];
    for (var p in src) { if (app[p]) regles.push([src[p], app[p]]); }
    for (var i = 0; i < d.length; i += 4) {
      if (d[i+3] === 0) continue;
      for (var r = 0; r < regles.length; r++) {
        var s = regles[r][0];
        if (d[i] === s[0] && d[i+1] === s[1] && d[i+2] === s[2]) { var t = regles[r][1]; d[i] = t[0]; d[i+1] = t[1]; d[i+2] = t[2]; break; }
      }
    }
    cx.putImageData(id, 0, 0);
    cache[k] = cv; return cv;
  }
  function joueur(nom, app) { return recolorer(nom, SRC_J, app, [key(app.maillot), key(app.short), key(app.cheveux), key(app.peau)].join("/")); }
  function gardien(app) { return recolorer("gardiens", SRC_G, app, [key(app.maillot), key(app.maillotClair), key(app.cheveux), key(app.peau)].join("/")); }
  function dessiner(ctx, atlasCanvas, atlasNom, sprite, x, y, e) {
    e = e || 1; var s = window.SPRITES[atlasNom].sprites[sprite]; if (!s) throw new Error("sprite inconnu : " + sprite);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(atlasCanvas, s.x, s.y, s.w, s.h, x, y, s.w * e, s.h * e);
  }
  function dessinerEquipe(ctx, equipe, j, pose, x, y, e) {
    if (j.modele || j === equipe.gardien) {
      var g = j.modele ? j : equipe.gardien;
      dessiner(ctx, gardien(g), "gardiens", g.modele + "__" + pose, x, y, e); return;
    }
    var c = joueur(j.coupe, { maillot: equipe.maillot, short: equipe.short, cheveux: j.cheveux, peau: j.peau });
    dessiner(ctx, c, j.coupe, j.coupe + "__" + pose, x, y, e);
  }
  window.SPRITES_RECOLOR = { pret: pret, joueur: joueur, gardien: gardien, dessiner: dessiner, dessinerEquipe: dessinerEquipe };
})();
