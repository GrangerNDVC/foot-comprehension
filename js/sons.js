/* ============================================================
   LES SONS (chantier 10) : bruitages + musiques.
   - Bruitages : fichiers assets/audio/sfx/<nom>.mp3 ou <nom>.wav (au choix, même nom) ; à défaut, fabriqués dans le navigateur (Web Audio).
   - Musiques  : fichiers assets/audio/musique/<nom>.mp3 ; à défaut, silence.
   - Le son ne démarre qu'après un premier appui de l'élève (règle des iPad). Avant : silence, sans erreur.
   - Le jeu reste jouable si le son échoue : tout est protégé par try/catch.
   - Boutons : 🔊/🔇 (effets) et 🎵/🔇 (musique), mémorisés dans le navigateur.
   API : J.sons.jouer(nom) · jouerApres(nom, ms) · musique(nom, {apres, boucle}) · arreterMusique() · baisserMusique(oui)
   ============================================================ */
(function (root) {
  var J = root.JEU = root.JEU || {};
  var doc = root.document;
  var CFG = J.sonsReglages || { dossier: "assets/audio/", volumeEffets: .8, volumeMusique: .35, effets: {}, musiques: {} };
  var CLE = "jeu-foot-son";
  var ctx = null, sortie = null, bruitBuf = null, deverrouille = false;
  var buffers = {}, statut = {};           // statut[nom] : "chargement" | "fichier" | "synthese"
  var muetEffets = false, muetMusique = false;
  var courante = null;                      // { nom, el, boucle }
  var demandee = null;                      // musique demandée avant le premier appui
  var baisse = false, minuteurs = [];

  /* ---------- réglages mémorisés ---------- */
  function lire() {
    try {
      var v = JSON.parse(root.localStorage.getItem(CLE) || "{}");
      muetEffets = !!v.muetEffets; muetMusique = !!v.muetMusique;
    } catch (e) {}
  }
  function ecrire() {
    try { root.localStorage.setItem(CLE, JSON.stringify({ muetEffets: muetEffets, muetMusique: muetMusique })); } catch (e) {}
  }

  /* ---------- le contexte audio (créé au premier appui) ---------- */
  function deverrouiller() {
    if (deverrouille) { return; }
    try {
      var AC = root.AudioContext || root.webkitAudioContext;
      if (!AC) { deverrouille = true; return; }
      ctx = new AC();
      if (ctx.resume) { ctx.resume(); }
      sortie = ctx.createGain(); sortie.gain.value = CFG.volumeEffets; sortie.connect(ctx.destination);
      var b = ctx.createBuffer(1, 1, 22050), s = ctx.createBufferSource();   // petit silence : réveille l'audio des iPad
      s.buffer = b; s.connect(ctx.destination); if (s.start) { s.start(0); } else { s.noteOn(0); }
      deverrouille = true;
      precharger();
    } catch (e) { ctx = null; deverrouille = true; }
    if (demandee) { var d = demandee; demandee = null; musique(d.nom, d.opts); }
  }

  /* ---------- fichiers ---------- */
  function precharger() {
    Object.keys(CFG.effets).forEach(charger);
  }
  // Un bruitage peut être déposé en .mp3 OU en .wav (même nom) : on essaie dans cet ordre, puis la synthèse
  var EXTENSIONS = ["mp3", "wav"], formats = {};
  function charger(nom) {
    if (statut[nom] || !ctx) { return; }
    statut[nom] = "chargement";
    essayer(nom, 0);
  }
  function essayer(nom, i) {
    if (i >= EXTENSIONS.length) { statut[nom] = "synthese"; return; }
    var suite = function () { essayer(nom, i + 1); };
    try {
      var x = new root.XMLHttpRequest();
      x.open("GET", CFG.dossier + "sfx/" + nom + "." + EXTENSIONS[i], true);
      x.responseType = "arraybuffer";
      x.onload = function () {
        if (x.status !== 200 || !x.response || x.response.byteLength < 500) { return suite(); }
        try {
          ctx.decodeAudioData(x.response, function (buf) { buffers[nom] = buf; statut[nom] = "fichier"; formats[nom] = EXTENSIONS[i]; }, suite);
        } catch (e) { suite(); }
      };
      x.onerror = suite;
      x.send();
    } catch (e) { suite(); }
  }

  /* ---------- les bruitages ---------- */
  function jouer(nom) {
    try {
      if (muetEffets || !ctx) { return; }
      var reg = CFG.effets[nom] || {};
      if (buffers[nom]) {
        var s = ctx.createBufferSource(), g = ctx.createGain();
        s.buffer = buffers[nom]; g.gain.value = (reg.volume == null ? 1 : reg.volume);
        s.connect(g); g.connect(sortie);
        if (s.start) { s.start(0); } else { s.noteOn(0); }
        return;
      }
      if (SYNTH[nom]) { SYNTH[nom](ctx.currentTime + 0.01, reg.volume == null ? 1 : reg.volume); }
    } catch (e) {}
  }
  function jouerApres(nom, ms) {
    var m = root.setTimeout(function () { jouer(nom); }, ms);
    minuteurs.push(m);
  }
  function annulerAttentes() { minuteurs.forEach(function (m) { root.clearTimeout(m); }); minuteurs = []; }

  /* ---------- bruitages fabriqués (secours quand il n'y a pas de fichier) ---------- */
  function env(g, t, a, d, vol) {
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(Math.max(vol, 0.0002), t + a);
    g.gain.exponentialRampToValueAtTime(0.0001, t + a + d);
  }
  function ton(f, t, d, type, vol, f2, a) {
    var o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type || "sine"; o.frequency.setValueAtTime(f, t);
    if (f2) { o.frequency.exponentialRampToValueAtTime(f2, t + d); }
    env(g, t, a || 0.01, d, vol); o.connect(g); g.connect(sortie); o.start(t); o.stop(t + d + (a || 0.01) + 0.05);
  }
  function bruit(t, d, vol, type, f1, f2, a) {
    if (!bruitBuf) {
      bruitBuf = ctx.createBuffer(1, 22050, 22050);
      var dta = bruitBuf.getChannelData(0), i; for (i = 0; i < dta.length; i++) { dta[i] = Math.random() * 2 - 1; }
    }
    var s = ctx.createBufferSource(), fl = ctx.createBiquadFilter(), g = ctx.createGain();
    s.buffer = bruitBuf; s.loop = true;
    fl.type = type || "lowpass"; fl.frequency.setValueAtTime(f1, t);
    if (f2) { fl.frequency.exponentialRampToValueAtTime(f2, t + d); }
    env(g, t, a || 0.01, d, vol); s.connect(fl); fl.connect(g); g.connect(sortie); s.start(t); s.stop(t + d + (a || 0.01) + 0.05);
  }
  function sifflet(t, d, v) {
    ton(2850, t, d, "sine", 0.28 * v, 2950, 0.02); ton(3150, t, d, "sine", 0.18 * v, 3050, 0.02);
    bruit(t, d, 0.12 * v, "highpass", 3500, null, 0.02);
  }
  var SYNTH = {
    "clic": function (t, v) { ton(900, t, 0.05, "square", 0.15 * v, 500); },
    "sifflet-debut": function (t, v) { sifflet(t, 0.7, v); },
    "sifflet-mitemps": function (t, v) { sifflet(t, 0.4, v); sifflet(t + 0.55, 0.4, v); },
    "sifflet-fin": function (t, v) { sifflet(t, 0.3, v); sifflet(t + 0.45, 0.3, v); sifflet(t + 0.9, 0.9, v); },
    "coup-de-pied": function (t, v) { ton(180, t, 0.12, "sine", 0.5 * v, 60); bruit(t, 0.06, 0.3 * v, "lowpass", 1500, 300); },
    "tir": function (t, v) { ton(140, t, 0.2, "sine", 0.6 * v, 45); bruit(t, 0.25, 0.35 * v, "bandpass", 2500, 500); },
    "tacle": function (t, v) { bruit(t, 0.35, 0.35 * v, "bandpass", 800, 2500); ton(110, t + 0.25, 0.1, "sine", 0.4 * v, 60); },
    "arret-gardien": function (t, v) { bruit(t, 0.08, 0.6 * v, "bandpass", 1800); ton(250, t, 0.1, "triangle", 0.3 * v, 120); },
    "bonne-reponse": function (t, v) { ton(660, t, 0.15, "triangle", 0.3 * v); ton(990, t + 0.12, 0.3, "triangle", 0.3 * v); },
    "mauvaise-reponse": function (t, v) { ton(200, t, 0.25, "sawtooth", 0.18 * v, 140); },
    "indice": function (t, v) { ton(1200, t, 0.1, "sine", 0.2 * v); ton(1600, t + 0.08, 0.15, "sine", 0.2 * v); },
    "carton": function (t, v) { sifflet(t, 0.25, v); bruit(t + 0.35, 0.15, 0.3 * v, "highpass", 3000); ton(300, t + 0.35, 0.1, "square", 0.12 * v); },
    "blessure": function (t, v) { sifflet(t, 0.2, v); sifflet(t + 0.3, 0.2, v); ton(220, t + 0.55, 0.3, "sine", 0.3 * v, 110); },
    "prolongation": function (t, v) { ton(110, t, 2, "sine", 0.5 * v); ton(220, t, 1.6, "sine", 0.25 * v); ton(331, t, 1.2, "sine", 0.15 * v); },
    "but-nous": function (t, v) {
      bruit(t, 2.4, 0.5 * v, "bandpass", 600, 1200, 0.3);
      ton(523, t, 0.3, "triangle", 0.25 * v); ton(659, t + 0.12, 0.3, "triangle", 0.25 * v);
      ton(784, t + 0.24, 0.3, "triangle", 0.25 * v); ton(1047, t + 0.36, 0.6, "triangle", 0.28 * v);
    },
    "but-adverse": function (t, v) { bruit(t, 1.4, 0.35 * v, "lowpass", 500, 200, 0.15); ton(300, t, 0.8, "sawtooth", 0.12 * v, 150); },
    "victoire-tournoi": function (t, v) {
      var n = [[523, 0, .15], [523, .18, .15], [523, .36, .15], [659, .54, .3], [523, .9, .2], [659, 1.1, .2], [784, 1.3, 1]], i;
      for (i = 0; i < n.length; i++) { ton(n[i][0], t + n[i][1], n[i][2], "square", 0.12 * v); ton(n[i][0] * 2, t + n[i][1], n[i][2], "triangle", 0.15 * v); }
      bruit(t + 1.3, 1.6, 0.35 * v, "bandpass", 700, 1400, 0.2);
    }
  };

  /* ---------- les musiques (un fichier .mp3 lu en continu) ---------- */
  function volumeMusique(nom) {
    var reg = CFG.musiques[nom] || {};
    return CFG.volumeMusique * (reg.volume == null ? 1 : reg.volume) * (baisse ? CFG.volumeMusiqueParole / CFG.volumeMusique : 1);
  }
  function fondu(el, vers, fin) {
    if (el._fondu) { root.clearInterval(el._fondu); }
    el._fondu = root.setInterval(function () {
      try {
        var d = vers - el.volume;
        if (Math.abs(d) < 0.03) { el.volume = Math.max(0, Math.min(1, vers)); root.clearInterval(el._fondu); el._fondu = null; if (fin) { fin(); } return; }
        el.volume = Math.max(0, Math.min(1, el.volume + (d > 0 ? 0.03 : -0.03)));
      } catch (e) { root.clearInterval(el._fondu); }
    }, 40);
  }
  var toutes = [];                          // tous les lecteurs de musique encore susceptibles de sonner
  function couper(el) {                     // arrêt garanti : petit fondu, MAIS pause forcée même si le volume est bloqué (iPad)
    if (!el || el._mort) { return; }
    el._mort = true; el.onerror = null;
    var fait = false;
    function pause() {
      if (fait) { return; } fait = true;
      try { if (el._fondu) { root.clearInterval(el._fondu); el._fondu = null; } } catch (e) {}
      try { el.pause(); } catch (e) {}
      var i = toutes.indexOf(el); if (i >= 0) { toutes.splice(i, 1); }
    }
    try { fondu(el, 0, pause); } catch (e) {}
    root.setTimeout(pause, 500);
  }
  function toutCouper(sauf) {               // filet de sécurité : plus aucune autre musique ne doit jouer
    var l = toutes.slice(), i;
    for (i = 0; i < l.length; i++) { if (l[i] !== sauf) { couper(l[i]); } }
  }
  function arreterMusique() {
    demandee = null;
    if (courante) { var c = courante; courante = null; couper(c.el); }
    toutCouper(null);
  }
  function musique(nom, opts) {
    try {
      opts = opts || {};
      if (opts.apres) {                      // lancer plus tard (ex. jingle après le coup de sifflet final)
        var o2 = {}; for (var k in opts) { if (k !== "apres") { o2[k] = opts[k]; } }
        minuteurs.push(root.setTimeout(function () { musique(nom, o2); }, opts.apres));
        return;
      }
      if (courante && courante.nom === nom && !courante.el.ended && !courante.el._mort) { return; }
      arreterMusique();
      if (!nom) { return; }
      if (muetMusique || !deverrouille) { demandee = { nom: nom, opts: opts }; return; }
      var reg = CFG.musiques[nom] || {};
      var el = new root.Audio();
      el.src = CFG.dossier + "musique/" + nom + ".mp3";
      var essaiWav = false;                  // pas de .mp3 : on essaie le .wav du même nom
      el.loop = (opts.boucle == null) ? !!reg.boucle : !!opts.boucle;
      el.volume = 0; el.preload = "auto";
      toutes.push(el);
      el.onerror = function () {             // fichier absent : .wav puis silence, jamais d'erreur
        if (el._mort || courante == null || courante.el !== el) { return; }   // lecteur déjà remplacé : on ne le relance pas
        if (!essaiWav) { essaiWav = true; try { el.src = CFG.dossier + "musique/" + nom + ".wav"; var q = el.play(); if (q && q.catch) { q.catch(function () {}); } } catch (e) {} }
      };
      courante = { nom: nom, el: el };
      var p = el.play();
      if (p && p.catch) { p.catch(function () {}); }
      fondu(el, volumeMusique(nom));
    } catch (e) {}
  }
  function baisserMusique(oui) {
    baisse = !!oui;
    if (courante) { fondu(courante.el, volumeMusique(courante.nom)); }
  }

  /* ---------- boutons 🔊 / 🎵 ---------- */
  function majBoutons() {
    var l = doc.querySelectorAll("[data-son]"), i, b, t;
    for (i = 0; i < l.length; i++) {
      b = l[i]; t = b.getAttribute("data-son");
      if (t === "effets") { b.textContent = muetEffets ? "🔇 Bruitages : non" : "🔊 Bruitages : oui"; }
      else if (t === "musique") { b.textContent = muetMusique ? "🔇 Musique : non" : "🎵 Musique : oui"; }
      else { b.textContent = (muetEffets && muetMusique) ? "🔇" : "🔊"; }
    }
  }
  function appliquerMusique() {
    if (muetMusique) {
      if (courante) { demandee = { nom: courante.nom, opts: { boucle: courante.el.loop } }; var c = courante; courante = null; couper(c.el); }
    } else if (demandee) { var d = demandee; demandee = null; musique(d.nom, d.opts); }
  }
  function brancher() {
    lire();
    var l = doc.querySelectorAll("[data-son]"), i;
    for (i = 0; i < l.length; i++) {
      l[i].addEventListener("click", function (e) {
        var t = this.getAttribute("data-son");
        if (t === "effets") { muetEffets = !muetEffets; }
        else if (t === "musique") { muetMusique = !muetMusique; }
        else { var tout = !(muetEffets && muetMusique); muetEffets = tout; muetMusique = tout; }
        ecrire(); majBoutons(); appliquerMusique();
        if (!muetEffets) { jouer("clic"); }
      });
    }
    majBoutons();
  }

  /* ---------- le clic des menus + le premier appui qui réveille le son ---------- */
  function premierAppui() { deverrouiller(); }
  ["touchstart", "mousedown", "keydown", "click"].forEach(function (ev) { doc.addEventListener(ev, premierAppui, true); });
  doc.addEventListener("click", function (e) {
    var n = e.target, ok = false;
    while (n && n !== doc) {
      if (n.tagName === "BUTTON") { ok = !/(^|\s)option(\s|$)/.test(n.className || "") && !n.hasAttribute("data-son"); break; }
      n = n.parentNode;
    }
    if (ok) { jouer("clic"); }
  }, false);
  doc.addEventListener("visibilitychange", function () {     // onglet caché : on coupe la musique
    try { if (courante) { if (doc.hidden) { courante.el.pause(); } else { var p = courante.el.play(); if (p && p.catch) { p.catch(function () {}); } } } } catch (e) {}
  });

  /* ---------- diagnostic (outils-test/sons.html) ---------- */
  function etat() {
    var s = {}; Object.keys(CFG.effets).forEach(function (n) { s[n] = statut[n] || (deverrouille ? "chargement" : "pas encore testé"); });
    return s;
  }
  function formatDe(nom) { return formats[nom] || "";
  }
  function tester(nom, rappel) {
    try {
      var a = new root.Audio(), fini = false;
      function fin(r) { if (!fini) { fini = true; rappel(r); } }
      var wav = false;
      a.preload = "auto"; a.src = CFG.dossier + "musique/" + nom + ".mp3";
      a.oncanplaythrough = function () { fin("fichier" + (wav ? " .wav" : " .mp3")); }; a.onloadedmetadata = function () { fin("fichier" + (wav ? " .wav" : " .mp3")); };
      a.onerror = function () { if (!wav) { wav = true; a.src = CFG.dossier + "musique/" + nom + ".wav"; } else { fin("absent"); } };
      root.setTimeout(function () { fin("absent ou trop lent"); }, 4000);
    } catch (e) { rappel("absent"); }
  }

  J.sons = {
    jouer: jouer, jouerApres: jouerApres, musique: musique, arreterMusique: arreterMusique,
    baisserMusique: baisserMusique, annulerAttentes: annulerAttentes, brancher: brancher,
    etat: etat, formatDe: formatDe, tester: tester, deverrouiller: deverrouiller, reglages: CFG,
    effetsActifs: function () { return !muetEffets; }, musiqueActive: function () { return !muetMusique; },
    noms: function () { return Object.keys(SYNTH); }
  };
})(window);
