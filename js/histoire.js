/* ============================================================
   LES ÉCRANS D'HISTOIRE (chantier 8)
   Compose une image d'histoire avec les décors (chantier 1) et les sprites des équipes (chantier 2),
   aux couleurs de chaque équipe. Aucune image à fournir. Réglages : data/histoire-reglages.js.

   API
     J.histoire.preparer(idScene, cb)            décode les images et les sprites nécessaires, puis cb()
     J.histoire.dessiner(canvas, idScene, mode, ms)   dessine une image fixe ; mode : "avant" | "apres"
     J.histoire.afficher(conteneur, idScene, mode, fichierImage)
            met la scène dans le conteneur (animée légèrement) ; si assets/histoire/<fichierImage>.png existe,
            c'est CETTE image qui s'affiche à la place
     J.histoire.arreter()                        coupe l'animation
   ============================================================ */
(function (root) {
  var J = root.JEU = root.JEU || {};
  var H = J.histoire = {};
  var minuteur = null;

  function Rg() { return J.histoireReglages; }
  function img(id) { return (J.assets && J.assets.get) ? J.assets.get(id) : null; }
  function taille(id) { return (J.assets && J.assets.taille) ? J.assets.taille(id) : null; }
  function equipe(id) { return root.EQUIPES ? root.EQUIPES[id] : null; }
  function idAdverse(idScene) { var m = J.grosplanReglages && J.grosplanReglages.equipeParMatch; return m ? m[idScene] : null; }
  function def(idScene, mode) {
    var s = Rg() && Rg().scenes[idScene];
    return s ? (s[mode] || s.avant || s.apres || null) : null;
  }
  function eqNous() { return (J.grosplanReglages && J.grosplanReglages.equipeNous) || "nankatsu"; }
  function chercher(eq, n) {
    var l = eq.joueurs, i;
    for (i = 0; i < l.length; i++) { if (l[i].n === n) { return l[i]; } }
    return l[0];
  }
  function rgb(c) { return "rgb(" + c[0] + "," + c[1] + "," + c[2] + ")"; }

  /* ---------- préparation ---------- */
  function atlasNecessaires(idScene) {
    var noms = [], vus = {}, nous = equipe(eqNous()), adv = equipe(idAdverse(idScene));
    [nous, adv].forEach(function (e) {
      if (!e) { return; }
      e.joueurs.forEach(function (j) { if (!vus[j.coupe]) { vus[j.coupe] = 1; noms.push(j.coupe); } });
    });
    noms.push("gardiens");
    return noms.filter(function (n) { return root.SPRITES && root.SPRITES[n] && root.SPRITES[n].dataUri; });
  }
  H.preparer = function (idScene, cb) {
    var r = Rg();
    if (r && J.assets && J.assets.charger) { J.assets.charger(r.images); }
    if (!root.SPRITES_RECOLOR || !root.SPRITES || !root.EQUIPES) { if (cb) { cb(false); } return; }
    root.SPRITES_RECOLOR.pret(atlasNecessaires(idScene), function () { if (cb) { cb(true); } });
  };

  /* ---------- le dessin ---------- */
  function appliquer(eq, j, gardien) {
    var R = root.SPRITES_RECOLOR;
    if (gardien) { return { cv: R.gardien(eq.gardien), atlas: "gardiens", prefixe: eq.gardien.modele }; }
    return {
      cv: R.joueur(j.coupe, { maillot: eq.maillot, short: eq.short, cheveux: j.cheveux, peau: j.peau }),
      atlas: j.coupe, prefixe: j.coupe
    };
  }
  function sprite(ctx, app, pose, x, y, flip) {
    var A = root.SPRITES[app.atlas], r = A && A.sprites[app.prefixe + "__" + pose];
    if (!r) { return; }
    ctx.save();
    ctx.translate(Math.round(x), Math.round(y));
    if (flip) { ctx.scale(-1, 1); }
    ctx.drawImage(app.cv, r.x, r.y, r.w, r.h, -Math.round(r.w / 2), -r.h, r.w, r.h);
    ctx.restore();
  }
  function ballon(ctx, x, y) {
    var b = img("ballon_ballon_12") || img("ballon_ballon_10"), id = img("ballon_ballon_12") ? "ballon_ballon_12" : "ballon_ballon_10", t;
    if (b) { t = taille(id); ctx.drawImage(b, Math.round(x - t.w / 2), Math.round(y - t.h / 2), Math.round(t.w), Math.round(t.h)); }
    else { ctx.fillStyle = "#fff"; ctx.fillRect(x - 5, y - 5, 10, 10); ctx.fillStyle = "#000"; ctx.fillRect(x - 2, y - 2, 4, 4); }
  }

  function couleursBanniere(ids) {
    var cs = [];
    (ids || []).forEach(function (id) {
      var e = equipe(id); if (!e) { return; }
      cs.push(rgb(e.maillot)); cs.push(rgb(e.short));
    });
    return cs.length ? cs : ["#ffffff", "#1561d9"];
  }

  function ciel(ctx, amb, L, hor) {
    var bandes = amb.ciel, n = bandes.length, i, h = Math.ceil(hor / n);
    for (i = 0; i < n; i++) { ctx.fillStyle = bandes[i]; ctx.fillRect(0, i * h, L, h + 1); }
  }
  function etoiles(ctx, ms) {
    var i, x, y;
    for (i = 0; i < 26; i++) {
      x = (i * 97 + 13) % 250; y = (i * 53 + 7) % 60;
      if (((i + Math.floor(ms / 500)) % 5) === 0) { continue; }           // scintillement
      ctx.fillStyle = (i % 3 === 0) ? "#ffffff" : "#b8c8ff"; ctx.fillRect(x, y, 2, 2);
    }
  }
  function nuages(ctx, amb) {            // petits nuages dessinés en gros pixels (blanc, bleu clair dessous)
    if (!amb.nuages) { return; }
    amb.nuages.forEach(function (n) {
      var u = 4 * (n.s || 1), x = n.x, y = n.y;
      ctx.fillStyle = "#e4f0ff"; ctx.fillRect(x + u, y + u, u * 6, u); ctx.fillRect(x, y + 2 * u, u * 8, u);
      ctx.fillStyle = "#ffffff"; ctx.fillRect(x + 2 * u, y, u * 3, u); ctx.fillRect(x + u, y + u, u * 5, u); ctx.fillRect(x + u, y + 2 * u, u * 6, u);
      ctx.fillStyle = "#c4dcf8"; ctx.fillRect(x + u, y + 3 * u, u * 6, u / 2);
    });
  }
  function tribune(ctx, L, hor, echelle, x0) {
    // On ne garde que les gradins (le haut de l'image contient du ciel bleu qui jurerait avec le soir ou la nuit)
    var im = img("stadium-02"), t = taille("stadium-02"), d = J.assets && J.assets.defs["stadium-02"], coupe = 34, w, h, i;
    if (!im || !d) {
      ctx.fillStyle = "#44507a"; ctx.fillRect(0, hor - 60, L, 60);
      ctx.fillStyle = "#6a77a8"; for (i = 0; i < L; i += 7) { ctx.fillRect(i + 1, hor - 54 + (i % 3) * 6, 4, 4); }
      return;
    }
    echelle = echelle || 1; w = Math.round(t.w * echelle); h = Math.round((t.h - coupe) * echelle);
    for (i = (x0 || 0); i < L; i += w) { ctx.drawImage(im, 0, coupe * d.ech, im.naturalWidth, im.naturalHeight - coupe * d.ech, i, hor - h, w, h); }
  }
  function bannieres(ctx, couleurs, L, hor) {
    var i, x = 4, k = 0;
    for (; x < L; x += 14, k++) {
      ctx.fillStyle = "#222"; ctx.fillRect(x + 4, hor - 22, 1, 22);               // mât
      ctx.fillStyle = couleurs[k % couleurs.length]; ctx.fillRect(x + 5, hor - 22, 9, 7);
      ctx.fillStyle = "rgba(0,0,0,0.25)"; ctx.fillRect(x + 5, hor - 16, 9, 1);
    }
  }
  function pelouse(ctx, amb, L, H, hor) {
    var y = hor, i = 0, h = 8, k;
    while (y < H) {
      ctx.fillStyle = amb.pelouse[i % 2]; ctx.fillRect(0, y, L, Math.min(h, H - y) + 1);
      y += h; h += 2; i++;
    }
    ctx.fillStyle = "rgba(255,255,255,0.8)"; ctx.fillRect(0, hor + 4, L, 2);      // ligne de touche
    // rond central (demi-ellipse en pixels)
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    for (k = 0; k < 360; k += 6) {
      var a = k * Math.PI / 180, px = Math.round(128 + 78 * Math.cos(a)), py = Math.round(hor + 78 + 22 * Math.sin(a));
      if (py > hor + 8 && py < H) { ctx.fillRect(px, py, 2, 1); }
    }
  }
  function but(ctx, L, H) {
    var im = img("goal-nets-06"), t = taille("goal-nets-06");
    if (!im) { return; }
    ctx.drawImage(im, 150, H - Math.round(t.h) + 6, Math.round(t.w), Math.round(t.h));
  }
  function projecteurs(ctx, L) {
    var xs = [26, 92, 164, 230], i;
    xs.forEach(function (x) {
      ctx.fillStyle = "#cfd4e8"; ctx.fillRect(x - 11, 8, 22, 14);
      ctx.fillStyle = "#ffffff"; ctx.fillRect(x - 9, 10, 18, 10);
      ctx.fillStyle = "#fff6a8"; for (i = 0; i < 3; i++) { ctx.fillRect(x - 7 + i * 6, 12, 4, 6); }
      ctx.fillStyle = "rgba(255,255,200,0.10)"; ctx.fillRect(x - 12, 22, 24, 8);
    });
  }
  function confettis(ctx, ms, L, H) {
    var cs = ["#ff4040", "#ffd23f", "#40c0ff", "#ffffff", "#ff7ad0", "#7aff7a"], i, x, y, t;
    for (i = 0; i < 48; i++) {
      t = (ms / 18 + i * 37) % (H + 20);
      x = (i * 59 + Math.sin((ms / 600) + i) * 6 + 256) % L; y = t - 10;
      ctx.fillStyle = cs[i % cs.length]; ctx.fillRect(Math.round(x), Math.round(y), 3, 3);
    }
  }
  function coupe(ctx, c) {
    var x = c.x, y = c.y;
    ctx.fillStyle = "#c89a00"; ctx.fillRect(x - 20, y, 40, 10);                    // coupe : pied, tige, vasque, anses
    ctx.fillStyle = "#ffd23f"; ctx.fillRect(x - 5, y - 18, 10, 18); ctx.fillRect(x - 18, y - 52, 36, 34);
    ctx.fillStyle = "#fff29a"; ctx.fillRect(x - 14, y - 50, 6, 26);
    ctx.fillStyle = "#c89a00"; ctx.fillRect(x - 18, y - 22, 36, 4); ctx.fillRect(x + 12, y - 48, 4, 24);
    ctx.fillStyle = "#ffd23f"; ctx.fillRect(x - 26, y - 46, 8, 5); ctx.fillRect(x - 26, y - 46, 4, 20); ctx.fillRect(x + 18, y - 46, 8, 5); ctx.fillRect(x + 22, y - 46, 4, 20);
    ctx.fillStyle = "#ffffff"; ctx.fillRect(x - 16, y - 8 + 8, 32, 2);
  }

  H.dessiner = function (canvas, idScene, mode, ms) {
    var r = Rg(), d = def(idScene, mode || "avant"), s = r && r.scenes[idScene];
    if (!r || !d || !s) { return false; }
    ms = ms || 0;
    var amb = r.ambiances[d.ambiance] || r.ambiances.jour, L = r.largeur, Ht = r.hauteur, hor = 108;
    var E = canvas.width / L, ctx = canvas.getContext("2d"), acts = [], i, a, eq, j, ap;
    ctx.setTransform(E, 0, 0, E, 0, 0); ctx.imageSmoothingEnabled = false;
    ciel(ctx, amb, L, hor);
    if (amb.etoiles) { etoiles(ctx, ms); }
    nuages(ctx, amb);                    // (facultatif : amb.nuages ; aucun par défaut)
    if (d.decor === "tableau") { tribune(ctx, L, hor, 3, -70); } else { tribune(ctx, L, hor, 2, -20); }
    bannieres(ctx, couleursBanniere(s.equipesBanniere), L, hor - 2);
    pelouse(ctx, amb, L, Ht, hor);
    if (d.decor === "but") { but(ctx, L, Ht); }
    if (amb.voile) { ctx.fillStyle = amb.voile; ctx.fillRect(0, 0, L, Ht); }
    if (amb.projecteurs) { projecteurs(ctx, L); }
    if (d.coupe) { coupe(ctx, d.coupe); }
    // joueurs : les plus loin (y petit) d'abord
    for (i = 0; i < d.acteurs.length; i++) {
      a = d.acteurs[i];
      eq = equipe(a.eq === "adv" ? idAdverse(idScene) : eqNous());
      if (!eq) { continue; }
      j = a.gardien ? null : chercher(eq, a.n);
      try { ap = appliquer(eq, j, !!a.gardien); } catch (e) { continue; }       // atlas pas encore décodé
      acts.push({ a: a, ap: ap, i: i });
    }
    acts.sort(function (p, q) { return p.a.y - q.a.y; });
    if (d.balle) { ballon(ctx, d.balle.x, d.balle.y); }
    acts.forEach(function (o) {
      var p = o.a.pose, dy = 0;
      if (p && p.push) { p = p[Math.floor(ms / 160) % p.length]; }
      else if (d.confettis || /saut/.test(p || "")) { dy = -Math.abs(Math.round(Math.sin(ms / 260 + o.i * 1.7) * 6)); }      // sautent de joie
      sprite(ctx, o.ap, p, o.a.x, o.a.y + dy, !!o.a.flip);
    });
    if (d.confettis || amb.confettis) { confettis(ctx, ms, L, Ht); }
    return true;
  };

  /* ---------- affichage dans la page ---------- */
  H.arreter = function () { if (minuteur) { root.clearInterval(minuteur); minuteur = null; } };

  H.afficher = function (conteneur, idScene, mode, fichierImage) {
    H.arreter();
    while (conteneur.firstChild) { conteneur.removeChild(conteneur.firstChild); }
    var r = Rg(); if (!r || !def(idScene, mode)) { conteneur.hidden = true; return; }
    conteneur.hidden = false;
    var cv = root.document.createElement("canvas");
    cv.width = r.largeur * 2; cv.height = r.hauteur * 2; cv.className = "histoire-canvas";
    conteneur.appendChild(cv);
    var debut = Date.now(), vivant = true;
    function image() { H.dessiner(cv, idScene, mode, Date.now() - debut); }
    H.preparer(idScene, function () {
      if (!vivant) { return; }
      image();
      var static_ = !(/saut|course|nuit|fete/.test(JSON.stringify(def(idScene, mode))));
      if (!static_) { minuteur = root.setInterval(image, 110); }
      else { minuteur = root.setInterval(image, 400); }                   // images du décor qui arrivent après coup
    });
    // image personnelle facultative : assets/histoire/<fichierImage>.png
    if (fichierImage) {
      var im = new root.Image();
      im.onload = function () {
        if (!conteneur.contains(cv)) { return; }
        vivant = false; H.arreter();
        im.className = "histoire-canvas"; conteneur.replaceChild(im, cv);
      };
      im.src = (J.assets && J.assets.base || "") + "assets/histoire/" + fichierImage + ".png";
    }
  };
})(typeof window !== "undefined" ? window : this);
