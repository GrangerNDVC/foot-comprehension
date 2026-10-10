/* ============================================================
   LA SCÈNE (canvas) : décor, tireur, gardien, ballon, animation du tir.
   Les réglages (positions, noms d'images) sont dans assets/anims.js.
   Si une image manque, une forme simple la remplace.
   ============================================================ */
(function () {
  var J = window.JEU = window.JEU || {};
  var C = J.sceneConfig, A = J.assets;
  var cv, ctx, etat, enMarche = false;
  var S = J.scene = {};

  function nouvelEtat() {
    return {
      joueurId: J.anims.joueur.attente[0],
      gardien: { id: J.anims.gardien.attente[0], x: C.gardien.x, y: C.gardien.pied, miroir: false },
      ballon: { x: C.ballonDepart.x, y: C.ballonDepart.y, id: J.anims.ballon[0] },
      texte: null,
      flash: 0
    };
  }

  /* ---------- dessin ---------- */
  // Dessine une image : (x, y) = milieu des pieds (bas-centre)
  function image(id, x, y, miroir) {
    var im = A.get(id), t = A.taille(id);
    if (!im || !t) { return false; }
    ctx.save();
    if (miroir) {
      ctx.translate(Math.round(x), 0);
      ctx.scale(-1, 1);
      ctx.drawImage(im, -Math.round(t.w / 2), Math.round(y - t.h), t.w, t.h);
    } else {
      ctx.drawImage(im, Math.round(x - t.w / 2), Math.round(y - t.h), t.w, t.h);
    }
    ctx.restore();
    return true;
  }

  function bonhomme(x, pied, couleur, haut) {      // forme de remplacement (aucune image)
    ctx.fillStyle = couleur;
    ctx.fillRect(x - 8, pied - haut * 0.7, 16, haut * 0.45);
    ctx.fillRect(x - 7, pied - haut * 0.28, 6, haut * 0.28);
    ctx.fillRect(x + 1, pied - haut * 0.28, 6, haut * 0.28);
    ctx.fillStyle = "#f2c9a0";
    ctx.fillRect(x - 5, pied - haut, 10, haut * 0.28);
  }

  function dessinerDecor() {
    var W = C.largeur, H = C.hauteur, i;
    ctx.fillStyle = C.ciel;
    ctx.fillRect(0, 0, W, H);
    // tribunes : image répétée sur la largeur
    var tr = C.tribune, ti = A.get(tr.id), tt = A.taille(tr.id);
    if (ti && tt) {
      for (var x = 0; x < W; x += tt.w) { ctx.drawImage(ti, x, tr.y, tt.w, tt.h); }
    }
    // pelouse en bandes
    for (i = 0, y = C.horizon; y < H; i++, y += 14) {
      ctx.fillStyle = C.pelouse[i % 2];
      ctx.fillRect(0, y, W, 14);
    }
    // but (dessiné par le code) : filet + poteaux
    var b = C.but, y;
    ctx.fillStyle = "rgba(255,255,255,0.12)";
    ctx.fillRect(b.x0, b.haut, b.x1 - b.x0, b.sol - b.haut);
    ctx.strokeStyle = "rgba(255,255,255,0.45)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (x = b.x0; x <= b.x1; x += 8) { ctx.moveTo(x + 0.5, b.haut); ctx.lineTo(x + 0.5, b.sol); }
    for (y = b.haut; y <= b.sol; y += 8) { ctx.moveTo(b.x0, y + 0.5); ctx.lineTo(b.x1, y + 0.5); }
    ctx.stroke();
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(b.x0 - 2, b.haut - 2, 4, b.sol - b.haut + 2);
    ctx.fillRect(b.x1 - 2, b.haut - 2, 4, b.sol - b.haut + 2);
    ctx.fillRect(b.x0 - 2, b.haut - 2, b.x1 - b.x0 + 4, 4);
  }

  function dessiner() {
    if (!enMarche) { return; }
    ctx.imageSmoothingEnabled = false;
    dessinerDecor();
    var g = etat.gardien;
    if (!image(g.id, g.x, g.y, g.miroir)) { bonhomme(g.x, g.y, "#ff9a3c", 42); }
    if (!image(etat.joueurId, C.joueur.x, C.joueur.pied, false)) { bonhomme(C.joueur.x, C.joueur.pied, "#4aa3ff", 80); }
    var bl = etat.ballon;
    if (!image(bl.id, bl.x, bl.y + 8, false)) {
      ctx.fillStyle = "#ffffff"; ctx.beginPath(); ctx.arc(bl.x, bl.y, 8, 0, 7); ctx.fill();
      ctx.fillStyle = "#222"; ctx.fillRect(bl.x - 2, bl.y - 2, 4, 4);
    }
    if (etat.texte) {
      ctx.font = "bold 34px Verdana, sans-serif";
      ctx.textAlign = "center";
      ctx.lineWidth = 6; ctx.strokeStyle = "#000";
      ctx.strokeText(etat.texte.t, C.largeur / 2, 60);
      ctx.fillStyle = etat.texte.c;
      ctx.fillText(etat.texte.t, C.largeur / 2, 60);
    }
    if (etat.flash > 0) {
      ctx.fillStyle = "rgba(255,255,255," + etat.flash + ")";
      ctx.fillRect(0, 0, C.largeur, C.hauteur);
      etat.flash -= 0.04;
    }
    window.requestAnimationFrame(dessiner);
  }

  /* ---------- animations ---------- */
  function pause(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function anim(duree, fn) {
    return new Promise(function (res) {
      var t0 = null;
      function pas(t) {
        if (t0 === null) { t0 = t; }
        var p = Math.min(1, (t - t0) / duree);
        fn(p);
        if (p < 1) { window.requestAnimationFrame(pas); } else { res(); }
      }
      window.requestAnimationFrame(pas);
    });
  }

  S.init = function (canvas) {
    cv = canvas; ctx = cv.getContext("2d");
    cv.width = C.largeur; cv.height = C.hauteur;
    etat = nouvelEtat();
    if (!enMarche) { enMarche = true; window.requestAnimationFrame(dessiner); }
  };

  S.reinit = function () { etat = nouvelEtat(); };

  // but = true : le ballon passe ; false : le gardien arrête
  S.tirer = function (but) {
    var a = J.anims, Z = C.zones;
    var z = Math.floor(Math.random() * 3), zg = z;
    if (but) {
      var autres = [0, 1, 2].filter(function (k) { return k !== z; });
      zg = autres[Math.floor(Math.random() * autres.length)];
    }
    var dep = C.ballonDepart, cible = Z[z], gz = Z[zg];
    var g0 = { x: C.gardien.x, y: C.gardien.pied };
    etat.texte = null;

    return anim(500, function (p) {                       // le tireur court vers le ballon
      var fr = a.joueur.course;
      etat.joueurId = fr[Math.floor(p * fr.length * 2) % fr.length];
    }).then(function () {
      etat.joueurId = a.joueur.frappe[0];                 // frappe
      return pause(150);
    }).then(function () {
      return anim(800, function (p) {                     // le ballon part, le gardien plonge
        etat.ballon.x = dep.x + (cible.x - dep.x) * p;
        etat.ballon.y = dep.y + (cible.y - dep.y) * p - Math.sin(p * Math.PI) * 16;
        var fb = a.ballon;
        etat.ballon.id = fb[Math.min(fb.length - 1, Math.floor(p * fb.length))];
        if (p > 0.25) {
          var q = Math.min(1, (p - 0.25) / 0.75);
          var g = etat.gardien;
          g.x = g0.x + (gz.x - g0.x) * q;
          g.y = g0.y - Math.sin(q * Math.PI * 0.9) * 14;
          if (zg === 1) {
            g.id = a.gardien.saut[0]; g.miroir = false;
          } else {
            g.id = a.gardien.plongeon[0];
            g.miroir = (zg === 0) ? (a.gardien.sensPlongeon === "droite") : (a.gardien.sensPlongeon === "gauche");
          }
        }
      });
    }).then(function () {
      etat.joueurId = a.joueur.apres[0];
      if (but) {
        etat.texte = { t: "BUT !!", c: "#ffe600" };
        etat.flash = 0.8;
      } else {
        etat.ballon.x = etat.gardien.x; etat.ballon.y = etat.gardien.y - 16;
        etat.texte = { t: "ARRÊT !", c: "#ff7a7a" };
      }
      return pause(500);
    });
  };
})();
