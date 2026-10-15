/* ============================================================
   LES GROS PLANS : une petite scène animée qui joue le résultat de l'action.
   Chantier 4 : vrais sprites (atlas des chantiers 1 et 2), décor, équipes et tirs selon le niveau.
   L'interface n'a pas changé : J.grosplan.jouer(canvas, spec, finCallback).
   spec = { type, ok, but, niveau, matchId, porteur, adv, cible }
     type  : passe, dribble, tir, couper, tacler, bloquer, degager, gardien
     but   : "nous", "eux" ou null
     niveau: niveau de la question (choisit le tir : au sol, volée, tête, ciseau)
     porteur, adv, cible : numéros de maillot (Nankatsu, adversaire, coéquipier)
   Les scènes se règlent dans data/grosplan-reglages.js (positions, durées, poses).
   Si une image manque, la scène est dessinée avec des formes simples (comme au chantier 3).
   ============================================================ */
(function (root) {
  var J = root.JEU = root.JEU || {};
  var G = J.grosplan = {};
  var courant = null;
  var prets = {};            // atlas décodés : { "joueur-02": true, "gardiens": true }
  var avertis = {};          // pose introuvable : signalée une seule fois dans la console
  G.mode = "formes";         // "sprites" ou "formes" (pour les tests)

  function Rg() { return J.grosplanReglages || null; }
  function borne(x, a, b) { return Math.max(a, Math.min(b, x)); }
  function lisse(p) { return p * p * (3 - 2 * p); }
  function mix(a, b, p) { return a + (b - a) * p; }

  /* ---------- les textes ---------- */
  var TEXTES = {
    passe:   { ok: "PASSE !",        ko: "INTERCEPTÉ !" },
    dribble: { ok: "DRIBBLE !",      ko: "BALLON PERDU !" },
    tir:     { ok: "BUT !!",         ko: "ARRÊT !" },
    couper:  { ok: "PASSE COUPÉE !", ko: "L'ATTAQUE AVANCE !" },
    tacler:  { ok: "TACLE !",        ko: "TACLE ÉVITÉ !" },
    bloquer: { ok: "TIR BLOQUÉ !",   ko: "LE TIR PART !" },
    degager: { ok: "DÉGAGÉ !",       ko: "DÉGAGEMENT RATÉ !" },
    gardien: { ok: "ARRÊT !",        ko: "BUT ADVERSE..." }
  };
  G.texte = function (type, ok) { return (TEXTES[type] || TEXTES.passe)[ok ? "ok" : "ko"]; };

  /* ---------- préparation : décoder les images des deux équipes pendant que l'élève lit ---------- */
  function idAdverse(spec) {
    var r = Rg(), m = r && r.equipeParMatch;
    return (spec && spec.equipeAdv) || (m && spec && m[spec.matchId]) || null;
  }
  function equipe(id) { return (id && root.EQUIPES) ? root.EQUIPES[id] : null; }
  function chercher(eq, n) {
    var l = eq.joueurs, i;
    for (i = 0; i < l.length; i++) { if (l[i].n === n) { return l[i]; } }
    return l[0];
  }
  function appliquer(who) {
    if (who.gardien) { return { cv: root.SPRITES_RECOLOR.gardien(who.j), atlas: "gardiens", prefixe: who.j.modele }; }
    return {
      cv: root.SPRITES_RECOLOR.joueur(who.j.coupe, { maillot: who.eq.maillot, short: who.eq.short, cheveux: who.j.cheveux, peau: who.j.peau }),
      atlas: who.j.coupe, prefixe: who.j.coupe
    };
  }
  function prechauffer(liste) {          // recolore en tâche de fond, un joueur à la fois (évite un à-coup en pleine scène)
    var i = 0;
    (function suite() {
      if (i >= liste.length) { return; }
      try { appliquer(liste[i]); } catch (e) { /* tant pis : ce sera fait au moment de la scène */ }
      i++; root.setTimeout(suite, 40);
    })();
  }
  G.preparer = function (def, cb) {
    var r = Rg();
    if (!r || !root.SPRITES_RECOLOR || !root.EQUIPES || !root.SPRITES) { if (cb) { cb(false); } return; }
    if (J.assets && J.assets.charger && r.images) { J.assets.charger(r.images); }
    var ids = [r.equipeNous || "nankatsu", idAdverse({ matchId: def && def.id })], noms = [], vus = {}, aRecolorer = [];
    ids.forEach(function (id) {
      var e = equipe(id); if (!e) { return; }
      e.joueurs.forEach(function (j) {
        if (!vus[j.coupe]) { vus[j.coupe] = true; noms.push(j.coupe); }
        aRecolorer.push({ eq: e, j: j, gardien: false });
      });
      if (e.gardien) { aRecolorer.push({ eq: e, j: e.gardien, gardien: true }); }
    });
    noms.push("gardiens");
    noms = noms.filter(function (n) { return root.SPRITES[n] && root.SPRITES[n].dataUri; });
    root.SPRITES_RECOLOR.pret(noms, function () {
      noms.forEach(function (n) { prets[n] = true; });
      prechauffer(aRecolorer);
      if (cb) { cb(true); }
    });
  };

  /* ---------- choisir la scène et trouver les joueurs ---------- */
  function choisirScene(spec) {
    var r = Rg(), def = r && r.scenes && r.scenes[spec.type], meta = { miroir: false, roles: null, inverse: false };
    if (!def) { return null; }
    if (def.copieDe) { meta.miroir = !!def.miroir; meta.roles = def.roles || null; meta.inverse = !!def.inverse; def = r.scenes[def.copieDe]; }
    if (def && def.styles) {
      var niv = borne(Math.round(spec.niveau || 1), 1, 5), nom = (r.tirParNiveau && r.tirParNiveau[niv]) || "sol";
      def = def.styles[nom] || def.styles.sol;
    }
    var issue = (spec.ok !== meta.inverse) ? "ok" : "ko";      // inverse : le « ok » du gardien est le « ko » du tir
    var sc = def && def[issue];
    return sc ? { sc: sc, miroir: meta.miroir || !!sc.miroir, roles: meta.roles } : null;
  }
  function resoudre(role, spec) {
    var r = Rg(), nous = equipe(r.equipeNous || "nankatsu"), adv = equipe(idAdverse(spec)), n, tit;
    if (!nous || !adv) { return null; }
    if (role === "porteur") { return { eq: nous, j: chercher(nous, spec.porteur === 1 ? 2 : spec.porteur) }; }
    if (role === "cible") {
      n = spec.cible;
      if (!n || n === spec.porteur || n === 1) {
        tit = (J.config && J.config.titulaires || [2, 4, 6, 14, 5, 8, 10, 3, 7, 9]).filter(function (k) { return k !== 1 && k !== spec.porteur; });
        n = tit[0];
      }
      return { eq: nous, j: chercher(nous, n) };
    }
    if (role === "adv") { return { eq: adv, j: chercher(adv, spec.adv && spec.adv !== 1 ? spec.adv : 9) }; }
    if (role === "adv2") { n = ((spec.adv || 9) % 10) + 2; return { eq: adv, j: chercher(adv, n) }; }
    if (role === "gardienNous") { return nous.gardien ? { eq: nous, j: nous.gardien, gardien: true } : null; }
    if (role === "gardienEux") { return adv.gardien ? { eq: adv, j: adv.gardien, gardien: true } : null; }
    return null;
  }
  function construire(spec) {
    var r = Rg(), ch, acts = [], i, a, role, who, ref = null;
    if (!r || !r.scenes || !root.SPRITES_RECOLOR || !root.EQUIPES) { return null; }
    ch = choisirScene(spec); if (!ch) { return null; }
    for (i = 0; i < ch.sc.acteurs.length; i++) {
      a = ch.sc.acteurs[i];
      role = (ch.roles && ch.roles[a.joueur]) || a.joueur;
      if (role === "balle") { acts.push({ def: a, balle: true }); continue; }
      who = resoudre(role, spec); if (!who) { return null; }
      try { who.app = appliquer(who); } catch (e) { return null; }       // image pas encore décodée
      if (!prets[who.app.atlas]) { return null; }
      acts.push({ def: a, who: who }); ref = ref || who;
    }
    return { sc: ch.sc, miroir: ch.miroir, acts: acts, ref: ref, duree: ch.sc.duree || r.duree || 1800 };
  }

  /* ---------- dessin ---------- */
  function image(id) { return (J.assets && J.assets.get) ? J.assets.get(id) : null; }

  function fond(ctx, plan, ms) {
    var r = Rg(), d = r.decor, L = r.largeur, H = r.hauteur, sc = plan.sc, hor = d.horizon, i, im, w, th, tl, off, v = sc.defilement || 0;
    off = (ms / 1000) * v;
    ctx.fillStyle = d.ciel; ctx.fillRect(0, 0, L, hor + 2);
    // ciel / tribune
    if (sc.action && image("action-effect")) {
      im = image("action-effect"); tl = J.assets.taille("action-effect"); w = Math.round(tl.w); th = Math.round(tl.h);
      var oa = (ms * 0.35) % w;
      for (i = -1; i * w - oa < L; i++) {
        ctx.drawImage(im, Math.round(i * w - oa), 0, w, th);
        ctx.drawImage(im, Math.round(i * w - oa), th, w, th);
      }
    } else if ((im = image(d.tribune))) {
      tl = J.assets.taille(d.tribune); w = Math.round(tl.w); th = Math.round(tl.h);
      var o2 = off % w;
      for (i = -1; i * w - o2 < L; i++) { ctx.drawImage(im, Math.round(i * w - o2), hor - th, w, th); }
    } else {
      ctx.fillStyle = "#44507a"; ctx.fillRect(0, hor - 34, L, 34);
      ctx.fillStyle = "#6a77a8"; for (i = 0; i < L; i += 7) { ctx.fillRect(i + 1, hor - 30 + (i % 3) * 3, 4, 4); }
    }
    // pelouse : bandes verticales qui défilent
    var bw = d.largeurBande || 26, k, o3 = off % (bw * 2);
    ctx.fillStyle = d.pelouse[0]; ctx.fillRect(0, hor, L, H - hor);
    ctx.fillStyle = d.pelouse[1];
    for (k = -2; k * bw - o3 < L; k += 2) { ctx.fillRect(Math.round(k * bw - o3), hor, bw, H - hor); }
    ctx.fillStyle = "rgba(0,0,0,0.10)"; ctx.fillRect(0, hor, L, 2);
    ctx.fillStyle = "rgba(255,255,255,0.55)"; ctx.fillRect(0, hor + 3, L, 1);        // ligne de fond de terrain
    // lignes de vitesse (coup puissant)
    if (sc.vitesse) {
      ctx.fillStyle = "rgba(255,255,255,0.55)";
      for (i = 0; i < 9; i++) {
        var x0 = ((i * 97 + ms * 0.45) % 330) - 70;
        ctx.fillRect(Math.round(L - x0 - 80), 12 + i * 15, 80, 1);
      }
    }
  }
  function dessinerBut(ctx, b, p, sc, ms, L) {
    var x = b.x, y = b.y, l = b.l, h = b.h, sol = y + h, i, dec = 0;
    if (sc.filet != null && p > sc.filet) { dec = Math.sin(ms / 38) * 3 * (1 - (p - sc.filet) / (1 - sc.filet)); }
    ctx.fillStyle = "rgba(8,40,12,0.40)"; ctx.fillRect(x, y, l, h);
    ctx.fillStyle = "rgba(255,255,255,0.40)";
    for (i = 8; i < l; i += 8) { ctx.fillRect(Math.round(x + i + dec * (i / l)), y, 1, h); }
    for (i = 8; i < h; i += 8) { ctx.fillRect(x, y + i, l, 1); }
    ctx.fillStyle = "#e8e8e8"; ctx.fillRect(x - 2, y - 2, 3, h + 4); ctx.fillRect(x + l - 1, y - 2, 3, h + 4); ctx.fillRect(x - 2, y - 2, l + 4, 3);
    ctx.fillStyle = "#9a9a9a"; ctx.fillRect(x - 2, y + h - 1, l + 4, 2);
  }
  // Position, pose et visibilité d'un acteur à l'instant p
  function etatActeur(def, p, ms, duree) {
    var segs = def.segments, actif = null, i, s, q, d, x, y, a, pose, ar;
    for (i = 0; i < segs.length; i++) { if (p >= segs[i].t[0]) { actif = segs[i]; } }
    var avant = (actif === null);
    s = actif || segs[0];
    d = s.t[1] - s.t[0];
    q = avant ? 0 : (d > 0 ? borne((p - s.t[0]) / d, 0, 1) : 1);
    a = s.a || s.de;
    x = mix(s.de[0], a[0], q); y = mix(s.de[1], a[1], q);
    if (s.arc) { y -= Math.sin(Math.PI * q) * s.arc; }
    pose = s.pose;
    if (pose && pose.push) { pose = pose[Math.floor((ms / 1000) * (s.rythme || 10)) % pose.length]; }
    var visible = true;
    if (def.joueur === "balle") { visible = !avant && (p <= s.t[1] || !!s.reste); if (!pose) { pose = "balle__1"; } }
    return { x: x, y: y, pose: pose, visible: visible, seg: s };
  }
  function dessinerSprite(ctx, app, pose, x, y, flip, masque, ancre) {
    var A = root.SPRITES[app.atlas], r = A && A.sprites[app.prefixe + "__" + pose];
    if (!r) {
      if (!avertis[app.prefixe + pose]) { avertis[app.prefixe + pose] = 1; if (root.console) { root.console.warn("Gros plan : pose introuvable « " + pose + " » (" + app.prefixe + ")"); } }
      return;
    }
    ctx.save();
    ctx.translate(Math.round(x), Math.round(y));
    if (flip) { ctx.scale(-1, 1); }
    var dx = -Math.round(r.w / 2), dy = ancre === "centre" ? -Math.round(r.h / 2) : -r.h;
    if (ancre === "centre") { dx = -Math.round(r.w / 2); }
    if (masque) {                      // efface le ballon dessiné dans la pose : on recopie les 4 bandes autour de la zone
      var mx = masque[0], my = masque[1], mw = masque[2], mh = masque[3];
      if (my > 0) { ctx.drawImage(app.cv, r.x, r.y, r.w, my, dx, dy, r.w, my); }
      if (my + mh < r.h) { ctx.drawImage(app.cv, r.x, r.y + my + mh, r.w, r.h - my - mh, dx, dy + my + mh, r.w, r.h - my - mh); }
      if (mx > 0) { ctx.drawImage(app.cv, r.x, r.y + my, mx, mh, dx, dy + my, mx, mh); }
      if (mx + mw < r.w) { ctx.drawImage(app.cv, r.x + mx + mw, r.y + my, r.w - mx - mw, mh, dx + mx + mw, dy + my, r.w - mx - mw, mh); }
    } else {
      ctx.drawImage(app.cv, r.x, r.y, r.w, r.h, dx, dy, r.w, r.h);
    }
    ctx.restore();
  }
  function rendrePlan(canvas, spec, plan, p) {
    var ctx = canvas.getContext("2d"), r = Rg(), L = r.largeur, H = r.hauteur, E = canvas.width / L, ms = p * plan.duree, sc = plan.sc, i, o, e;
    ctx.setTransform(E, 0, 0, E, 0, 0);
    ctx.imageSmoothingEnabled = false;
    if (plan.miroir) { ctx.translate(L, 0); ctx.scale(-1, 1); }
    fond(ctx, plan, ms);
    if (sc.but) { dessinerBut(ctx, sc.but, p, sc, ms, L); }
    for (i = 0; i < plan.acts.length; i++) {
      o = plan.acts[i]; e = etatActeur(o.def, p, ms, plan.duree);
      if (!e.visible) { continue; }
      if (o.balle) {
        dessinerSprite(ctx, plan.ref.app, e.pose, e.x, e.y, false, null, "centre");
      } else {
        var mq = (e.seg.sansBalle && r.masques) ? r.masques[e.pose] : null;
        dessinerSprite(ctx, o.who.app, e.pose, e.x, e.y, !!o.def.flip, mq, "pieds");
      }
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    texteEtEffets(ctx, canvas.width, canvas.height, spec, p);
  }
  function texteEtEffets(ctx, W, Hc, spec, p) {
    var t0 = (Rg() && Rg().texteAu) || 0.55;
    if (p > t0) {
      var a = Math.min(1, (p - t0) / 0.2), txt = G.texte(spec.type, spec.ok);
      ctx.save(); ctx.globalAlpha = a;
      ctx.font = "bold 40px Verdana, sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.lineWidth = 8; ctx.strokeStyle = "#000"; ctx.strokeText(txt, W / 2, 46);
      ctx.fillStyle = (spec.but === "nous") ? "#ffe600" : (spec.ok ? "#8dff8d" : "#ff9a9a"); ctx.fillText(txt, W / 2, 46);
      ctx.restore();
    }
    if (spec.but === "nous" && p > 0.6) { ctx.fillStyle = "rgba(255,255,255," + (0.5 * (1 - p)) + ")"; ctx.fillRect(0, 0, W, Hc); }
    if (spec.but === "eux" && p > 0.6) { ctx.fillStyle = "rgba(120,0,0," + (0.35 * (1 - p)) + ")"; ctx.fillRect(0, 0, W, Hc); }
  }

  /* ---------- formes de remplacement (si une image manque) ---------- */
  var BLEU = "#2f6fe0", ROUGE = "#d83a3a";
  function fondFormes(ctx, vitesse) {
    var L = 480, H = 300, g = ctx.createLinearGradient(0, 0, 0, H), i;
    g.addColorStop(0, "#5ab0ff"); g.addColorStop(0.45, "#b8e0ff"); g.addColorStop(0.45, "#13922f"); g.addColorStop(1, "#0b6d20");
    ctx.fillStyle = g; ctx.fillRect(0, 0, L, H);
    ctx.fillStyle = "#44507a"; ctx.fillRect(0, 70, L, 62);
    ctx.fillStyle = "#6a77a8";
    for (i = 0; i < L; i += 14) { ctx.fillRect(i + 2, 78 + (i % 3) * 6, 8, 8); }
    if (vitesse) {
      ctx.strokeStyle = "rgba(255,255,255,0.55)"; ctx.lineWidth = 3;
      for (i = 0; i < 16; i++) { var y = 20 + i * 17, x0 = ((i * 97) % 140) + 40; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x0 + 190, y); ctx.stroke(); }
    }
  }
  function joueurForme(ctx, x, y, couleur, dir, pose, num) {
    var h = 92;
    ctx.fillStyle = "rgba(0,0,0,0.25)"; ctx.beginPath(); ctx.ellipse(x, y + 2, 24, 7, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#f2c9a0"; ctx.beginPath(); ctx.arc(x, y - h + 10, 11, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = couleur; ctx.fillRect(x - 15, y - h + 22, 30, 36);
    ctx.fillStyle = "#fff"; ctx.font = "bold 16px Verdana, sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    if (num) { ctx.fillText(String(num), x, y - h + 40); }
    ctx.fillStyle = "#1a1a50";
    var ecart = pose === "course" ? 12 : (pose === "tacle" ? 0 : 6);
    if (pose === "tacle") { ctx.fillRect(x - 10, y - 30, 46 * dir, 12); ctx.fillRect(x - 12, y - 42, 14, 12); }
    else { ctx.fillRect(x - 12 - ecart * 0.3, y - 34, 11, 34); ctx.fillRect(x + 1 + ecart * dir * 0.6, y - 34, 11, 34); }
    ctx.fillStyle = couleur; ctx.fillRect(x - 24 * dir - 4, y - h + 28, 10, 22);
  }
  function ballonForme(ctx, x, y, r) {
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = "#fff"; ctx.fill();
    ctx.lineWidth = 2; ctx.strokeStyle = "#111"; ctx.stroke(); ctx.fillStyle = "#222"; ctx.fillRect(x - 2, y - 2, 4, 4);
  }
  function butForme(ctx, x, y) {
    var i;
    ctx.fillStyle = "rgba(255,255,255,0.18)"; ctx.fillRect(x, y - 80, 130, 80);
    ctx.fillStyle = "#fff"; ctx.fillRect(x - 3, y - 84, 5, 86); ctx.fillRect(x + 128, y - 84, 5, 86); ctx.fillRect(x - 3, y - 84, 136, 5);
    ctx.strokeStyle = "rgba(255,255,255,0.4)"; ctx.lineWidth = 1;
    for (i = 0; i < 130; i += 10) { ctx.beginPath(); ctx.moveTo(x + i, y - 80); ctx.lineTo(x + i, y); ctx.stroke(); }
    for (i = 0; i < 80; i += 10) { ctx.beginPath(); ctx.moveTo(x, y - i); ctx.lineTo(x + 130, y - i); ctx.stroke(); }
  }
  function formes(canvas, spec, p) {
    var ctx = canvas.getContext("2d"), t = spec.type, ok = spec.ok, q = lisse(p), sol = 235, L = 480, H = 300;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    fondFormes(ctx, t === "tir" && ok);
    if (t === "passe") {
      joueurForme(ctx, mix(70, 90, q), sol, BLEU, 1, "course", 10);
      joueurForme(ctx, 380, sol, ok ? BLEU : ROUGE, -1, "debout", ok ? 8 : 4);
      ballonForme(ctx, mix(110, ok ? 360 : 330, q), sol - 18 - Math.sin(q * Math.PI) * 50, 9);
    } else if (t === "dribble") {
      joueurForme(ctx, ok ? mix(60, 360, q) : mix(60, 220, q), sol, BLEU, 1, "course", 10);
      joueurForme(ctx, ok ? mix(250, 150, Math.min(1, q * 1.2)) : 250, sol, ROUGE, -1, ok ? "tacle" : "debout", 5);
      ballonForme(ctx, (ok ? mix(60, 360, q) : mix(60, 220, q)) + 30, sol - 10 + Math.sin(q * 20) * 4, 9);
    } else if (t === "tir") {
      butForme(ctx, 300, sol - 20);
      joueurForme(ctx, 110, sol, BLEU, 1, p < 0.3 ? "course" : "debout", 10);
      joueurForme(ctx, ok ? mix(365, 330, q) : mix(365, 395, q), sol - 22, "#e08a00", -1, "debout", 1);
      var cx = mix(140, ok ? 410 : 385, Math.max(0, (p - 0.25) / 0.75)), cy = mix(sol - 20, ok ? sol - 62 : sol - 50, Math.max(0, (p - 0.25) / 0.75));
      ballonForme(ctx, p < 0.25 ? 140 : cx, p < 0.25 ? sol - 10 : cy - Math.sin(Math.max(0, p - 0.25) * Math.PI * 1.2) * 12, 10);
    } else if (t === "couper") {
      joueurForme(ctx, 80, sol, ROUGE, 1, "debout", 7); joueurForme(ctx, 380, sol, ROUGE, -1, "debout", 9);
      joueurForme(ctx, mix(300, 220, q), sol, BLEU, -1, "course", 6);
      ballonForme(ctx, ok ? mix(120, 240, q) : mix(120, 360, q), sol - 18 - (ok ? 0 : Math.sin(q * Math.PI) * 40), 9);
    } else if (t === "tacler") {
      joueurForme(ctx, 230, sol, ROUGE, 1, "course", 7);
      joueurForme(ctx, ok ? mix(380, 270, q) : mix(380, 300, q), sol, BLEU, -1, "tacle", 14);
      ballonForme(ctx, ok ? mix(262, 300, q) : mix(262, 120, q), sol - 8, 9);
    } else if (t === "bloquer") {
      joueurForme(ctx, 90, sol, ROUGE, 1, "debout", 10); joueurForme(ctx, mix(380, 250, q), sol, BLEU, -1, "debout", 4);
      ballonForme(ctx, ok ? mix(130, 252, Math.min(1, q * 1.4)) : mix(130, 380, q), sol - 22 - (ok ? 0 : q * 20), 9);
    } else if (t === "degager") {
      joueurForme(ctx, 130, sol, BLEU, 1, "course", 6);
      ballonForme(ctx, mix(170, 430, q), sol - 18 - Math.sin(q * Math.PI) * (ok ? 150 : 40), 9);
    } else {
      butForme(ctx, 40, sol - 20);
      joueurForme(ctx, 410, sol, ROUGE, -1, p < 0.3 ? "course" : "debout", 9);
      joueurForme(ctx, mix(110, ok ? 150 : 80, q), sol - 22 - Math.sin(q * Math.PI) * 18, "#e08a00", 1, "debout", 1);
      ballonForme(ctx, mix(390, ok ? 160 : 55, q), sol - 40 - Math.sin(q * Math.PI) * 6, 10);
    }
    texteEtEffets(ctx, L, H, spec, p);
  }

  /* ---------- jouer une scène ---------- */
  function dessiner(canvas, spec, plan, p) {
    if (plan) { rendrePlan(canvas, spec, plan, p); } else { formes(canvas, spec, p); }
  }
  G.jouer = function (canvas, spec, fin) {
    var t0 = null, fini = false, plan = null, pause = (Rg() && Rg().pauseFin) || 450, duree;
    if (courant) { courant.stop(); }
    try { plan = construire(spec); } catch (e) { plan = null; if (root.console) { root.console.warn("Gros plan : " + e); } }
    G.mode = plan ? "sprites" : "formes";
    duree = plan ? plan.duree : 1300;
    function terminer() { if (fini) { return; } fini = true; courant = null; if (fin) { fin(); } }
    function pas(t) {
      if (fini) { return; }
      if (t0 === null) { t0 = t; }
      var p = Math.min(1, (t - t0) / duree);
      try { dessiner(canvas, spec, plan, p); } catch (e2) {          // problème d'image en cours de route : on termine avec les formes simples
        if (plan) { plan = null; G.mode = "formes"; t0 = t - p * 1300; duree = 1300; } else { terminer(); return; }
      }
      if (p < 1) { root.requestAnimationFrame(pas); } else { root.setTimeout(terminer, pause); }
    }
    courant = { stop: function () { fini = true; } };
    root.requestAnimationFrame(pas);
    canvas.onclick = function () { if (!fini) { try { dessiner(canvas, spec, plan, 1); } catch (e3) { /* rien */ } terminer(); } };
  };
  G.arreter = function () { if (courant) { courant.stop(); courant = null; } };

  /* pour les tests : une image fixe de la scène à l'instant p (0 à 1) ; renvoie "sprites" ou "formes" */
  G.image = function (canvas, spec, p) {
    var plan = null;
    try { plan = construire(spec); } catch (e) { plan = null; }
    dessiner(canvas, spec, plan, p);
    return plan ? "sprites" : "formes";
  };
  G.pretPour = function (spec) { try { return !!construire(spec); } catch (e) { return false; } };
})(typeof window !== "undefined" ? window : this);
