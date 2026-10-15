/* ============================================================
   LA MINI-CARTE : terrain vu de dessus, joueurs numérotés, ballon.
   Formes simples (aucune image). Nous (bleu) attaquons vers la droite.
   Positions = fractions du terrain (0 à 1) ; elles glissent avec le ballon.
   ============================================================ */
(function (root) {
  var J = root.JEU = root.JEU || {};
  var T = J.terrain = {};

  var L = 480, H = 300, MX = 16, MY = 14;
  var FW = L - 2 * MX, FH = H - 2 * MY;

  // Disposition 4-3-3 (nous, de gauche à droite) : numéro -> [x, y]
  var NOUS = {
    1: [0.06, 0.50],
    2: [0.22, 0.17], 4: [0.22, 0.39], 6: [0.22, 0.61], 14: [0.22, 0.83],
    8: [0.42, 0.27], 10: [0.44, 0.50], 5: [0.42, 0.73],
    7: [0.62, 0.20], 9: [0.64, 0.50], 3: [0.62, 0.80]
  };
  // Adversaires, numérotés 1 à 11 (ils attaquent vers la gauche)
  var ADV = {
    1: [0.94, 0.50],
    2: [0.78, 0.17], 3: [0.78, 0.39], 4: [0.78, 0.61], 5: [0.78, 0.83],
    6: [0.58, 0.27], 7: [0.56, 0.50], 8: [0.58, 0.73],
    9: [0.38, 0.20], 10: [0.36, 0.50], 11: [0.38, 0.80]
  };

  function X(u) { return MX + u * FW; }
  function Y(v) { return MY + v * FH; }

  function pelouse(ctx) {
    var i;
    ctx.fillStyle = "#0c7a25"; ctx.fillRect(0, 0, L, H);
    for (i = 0; i < 10; i++) {
      ctx.fillStyle = (i % 2) ? "#0f8a2b" : "#0c7a25";
      ctx.fillRect(X(i / 10), MY, FW / 10 + 1, FH);
    }
    ctx.strokeStyle = "rgba(255,255,255,0.85)"; ctx.lineWidth = 2;
    ctx.strokeRect(MX, MY, FW, FH);
    ctx.beginPath(); ctx.moveTo(X(0.5), MY); ctx.lineTo(X(0.5), MY + FH); ctx.stroke();
    ctx.beginPath(); ctx.arc(X(0.5), Y(0.5), FH * 0.16, 0, Math.PI * 2); ctx.stroke();
    // surfaces
    ctx.strokeRect(MX, Y(0.22), FW * 0.14, FH * 0.56);
    ctx.strokeRect(MX + FW * 0.86, Y(0.22), FW * 0.14, FH * 0.56);
    // buts
    ctx.fillStyle = "#fff";
    ctx.fillRect(MX - 6, Y(0.42), 6, FH * 0.16);
    ctx.fillRect(MX + FW, Y(0.42), 6, FH * 0.16);
  }

  function pion(ctx, x, y, couleur, texte, couleurTexte, rayon) {
    ctx.beginPath(); ctx.arc(x, y, rayon, 0, Math.PI * 2);
    ctx.fillStyle = couleur; ctx.fill();
    ctx.lineWidth = 2; ctx.strokeStyle = "rgba(0,0,0,0.55)"; ctx.stroke();
    ctx.fillStyle = couleurTexte; ctx.font = "bold 13px Verdana, sans-serif";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText(String(texte), x, y + 1);
  }

  /* s = état du match (js/regles.js) ; opts.candidats = numéros à mettre en évidence */
  T.dessiner = function (canvas, s, opts) {
    opts = opts || {};
    var ctx = canvas.getContext("2d");
    pelouse(ctx);
    var decal = (s.pos / s.N - 0.5) * 0.30;
    var bx = 0.07 + 0.86 * (s.pos / s.N);
    var k, p, x, y, enAttaque = (s.poss === "nous");

    // adversaires
    for (k in ADV) {
      if (!ADV.hasOwnProperty(k)) { continue; }
      p = ADV[k]; x = Math.max(0.03, Math.min(0.97, p[0] + decal)); y = p[1];
      if (!enAttaque && Number(k) === s.adv) { x = bx; }
      pion(ctx, X(x), Y(y), (Number(k) === 1) ? "#d9a400" : "#f4f4f4", k, "#222", 12);
    }
    // nous
    for (k in NOUS) {
      if (!NOUS.hasOwnProperty(k)) { continue; }
      p = NOUS[k]; x = Math.max(0.03, Math.min(0.97, p[0] + decal)); y = p[1];
      if (enAttaque && Number(k) === s.porteur) { x = bx; }
      var cand = opts.candidats && opts.candidats.indexOf(Number(k)) >= 0;
      if (cand) {
        ctx.beginPath(); ctx.arc(X(x), Y(y), 19, 0, Math.PI * 2);
        ctx.strokeStyle = "#ffe600"; ctx.lineWidth = 4; ctx.stroke();
      }
      pion(ctx, X(x), Y(y), (Number(k) === 1) ? "#e08a00" : "#2f6fe0", k, "#fff", 12);
    }
    // porteur : anneau jaune + ballon
    var hx, hy;
    if (enAttaque) { hx = bx; hy = NOUS[s.porteur] ? NOUS[s.porteur][1] : 0.5; }
    else { hx = bx; hy = ADV[s.adv] ? ADV[s.adv][1] : 0.5; }
    ctx.beginPath(); ctx.arc(X(hx), Y(hy), 17, 0, Math.PI * 2);
    ctx.strokeStyle = "#ffd23f"; ctx.lineWidth = 3; ctx.stroke();
    ctx.beginPath(); ctx.arc(X(hx) + 15, Y(hy) + 12, 6, 0, Math.PI * 2);
    ctx.fillStyle = "#fff"; ctx.fill(); ctx.lineWidth = 2; ctx.strokeStyle = "#111"; ctx.stroke();

    // flèche « on attaque vers la droite »
    ctx.fillStyle = "rgba(255,255,255,0.35)"; ctx.font = "bold 12px Verdana, sans-serif";
    ctx.textAlign = "right"; ctx.textBaseline = "alphabetic";
    ctx.fillText("Nankatsu attaque ▶", L - MX - 4, H - 3);
  };
})(typeof window !== "undefined" ? window : this);
