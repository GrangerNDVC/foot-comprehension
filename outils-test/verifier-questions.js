/* Contrôle officiel des questions (Node). Usage : node outils-test/verifier-questions.js
   Charge js/banque.js + toutes les banques de data/ comme le fait index.html, lance JEU.banque.verifier()
   puis affiche la répartition par type, niveau et format. */
var fs = require("fs"), path = require("path"), vm = require("vm");
var racine = path.join(__dirname, "..");
var html = fs.readFileSync(path.join(racine, "index.html"), "utf8");
var scripts = [], re = /<script src="([^"]+)"><\/script>/g, m;
while ((m = re.exec(html))) { m[1] = m[1].replace(/\?.*$/, ""); if (/^(js\/banque|data\/(regles|palier|essai|attaque|noms|defense|tirs|gardien|motspetits|vocabulaire)|js\/noms)/.test(m[1])) { scripts.push(m[1]); } }
var ctx = { window: {}, localStorage: { getItem: function () { return null; }, setItem: function () {}, removeItem: function () {} } }; ctx.window = ctx; ctx.JEU = undefined; vm.createContext(ctx);
ctx.JEU = ctx.JEU; scripts.forEach(function (f) { vm.runInContext(fs.readFileSync(path.join(racine, f), "utf8"), ctx, { filename: f }); });
var J = ctx.JEU, pb = J.banque.verifier();
// Contrôles en plus du contrôle officiel
var tous = J.banque.toutes(), NSP = /On ne peut pas savoir/;
tous.forEach(function (q) {
  var avec = (q.options || []).map(function (o) { return NSP.test(o); });
  var bonnes = [].concat(q.bonne);
  if (q.format === "vrai-faux-nsp" && q.options.join("|") !== "Oui|Non|On ne peut pas savoir") { pb.push(q.id + " : options vrai-faux-nsp inattendues"); }
});
tous.forEach(function (q) { if (q.flashback != null && (typeof q.flashback !== "string" || !q.flashback.trim() || q.flashback.length > 40)) { pb.push(q.id + " : flashback doit être un libellé de 1 à 40 caractères"); } });
console.log("Questions en flashback : " + tous.filter(function (q) { return q.flashback; }).length);
Object.keys(J.regles_texte).forEach(function (k) { if (/^(att|def|tir)_/.test(k) && J.regles_texte[k].split(/\s+/).length > 10) { pb.push("règle " + k + " > 10 mots"); } });
console.log("Fichiers chargés : " + scripts.join(", "));
console.log("Questions : " + tous.length);
var stat = {};
tous.forEach(function (q) { var k = q.type + " niv" + q.niveau; stat[k] = stat[k] || { choix: 0, barrer: 0, "vrai-faux-nsp": 0 }; stat[k][q.format]++; });
Object.keys(stat).sort().forEach(function (k) { console.log("  " + k + " : " + JSON.stringify(stat[k])); });
console.log(pb.length ? "PROBLÈMES (" + pb.length + ") :\n- " + pb.join("\n- ") : "Aucun problème trouvé.");
var att = tous.filter(function (q) { return /^att-/.test(q.id); });
var pos = [0, 0, 0, 0], plusLongue = 0, nspBonne = 0, nspMauvaise = 0, nChoix = 0;
att.forEach(function (q) {
  var nsp = q.options.map(function (o) { return /On ne peut pas savoir/.test(o); });
  if (q.format === "choix") { nChoix++; pos[q.bonne]++; var L = q.options.map(function (o) { return o.length; }); if (L[q.bonne] === Math.max.apply(null, L) && L.filter(function (x) { return x === L[q.bonne]; }).length === 1) { plusLongue++; } }
  if (nsp[[].concat(q.bonne)[0]] && q.format !== "barrer") { nspBonne++; } else if (nsp.some(Boolean)) { nspMauvaise++; }
});
var vf = {0: 0, 1: 0, 2: 0}; att.filter(function (q) { return q.format === "vrai-faux-nsp"; }).forEach(function (q) { vf[q.bonne]++; });
console.log("Banque d'attaque : " + att.length + " questions ; position de la bonne (choix) " + pos.join("/") + " ; la plus longue : " + plusLongue + "/" + nChoix);
console.log("« On ne peut pas savoir » : bonne réponse " + nspBonne + " fois, mauvaise réponse " + nspMauvaise + " fois ; vrai-faux-nsp Oui/Non/NSP = " + vf[0] + "/" + vf[1] + "/" + vf[2]);

/* Banque de défense (chantier 6) : 12 par niveau au moins, formats, équilibre */
var dfs = tous.filter(function (q) { return /^def-/.test(q.id); });
for (var nv = 1; nv <= 5; nv++) { var n8 = dfs.filter(function (q) { return q.niveau === nv; }).length; if (n8 < 12) { console.log("PROBLÈME : niveau " + nv + " a " + n8 + " questions de défense (12 au moins attendues)"); pb.push("niveau " + nv + " défense : " + n8); } }
dfs.forEach(function (q) { if (q.type !== "defense") { pb.push(q.id + " : type defense attendu"); } });
var dpos = [0, 0, 0, 0], dlongue = 0, dnChoix = 0, dnspBonne = 0, dnspMauvaise = 0, dscol = 0;
dfs.forEach(function (q) {
  var nsp = q.options.map(function (o) { return /On ne peut pas savoir/.test(o); });
  if (q.format === "choix") { dnChoix++; dpos[q.bonne]++; var L = q.options.map(function (o) { return o.length; }); if (L[q.bonne] === Math.max.apply(null, L) && L.filter(function (x) { return x === L[q.bonne]; }).length === 1) { dlongue++; } }
  if (q.format !== "barrer" && nsp[q.bonne]) { dnspBonne++; } else if (nsp.some(Boolean)) { dnspMauvaise++; }
  if (q.tags && q.tags.indexOf("ecole") >= 0) { dscol++; }
});
var dvf = [0, 0, 0]; dfs.filter(function (q) { return q.format === "vrai-faux-nsp"; }).forEach(function (q) { dvf[q.bonne]++; });
console.log("Banque de défense : " + dfs.length + " questions ; position de la bonne (choix) " + dpos.join("/") + " ; la plus longue : " + dlongue + "/" + dnChoix + " ; consignes scolaires : " + dscol);
console.log("Défense, « On ne peut pas savoir » : bonne réponse " + dnspBonne + " fois (" + Math.round(100 * dnspBonne / dfs.length) + " %), mauvaise réponse " + dnspMauvaise + " fois ; vrai-faux-nsp Oui/Non/NSP = " + dvf.join("/"));
/* Banque de tirs (chantiers 7 et 9c) : 12 par niveau au moins, formats, équilibre, textes scolaires */
var trs = tous.filter(function (q) { return /^tir-/.test(q.id); });
for (var nt = 1; nt <= 5; nt++) { var n8t = trs.filter(function (q) { return q.niveau === nt; }).length; if (n8t < 12) { console.log("PROBLÈME : niveau " + nt + " a " + n8t + " questions de tir (12 au moins attendues)"); pb.push("niveau " + nt + " tir : " + n8t); } }
if (tous.filter(function (q) { return q.type === "tir"; }).length !== trs.length) { pb.push("des questions de type tir ne sont pas dans data/tirs.js (provisoires restantes ?)"); }
var tpos = [0, 0, 0, 0], tlongue = 0, tnChoix = 0, tnspBonne = 0, tnspMauvaise = 0, tscol = 0, ttexte = [];
trs.forEach(function (q) {
  if (q.type !== "tir") { pb.push(q.id + " : type tir attendu"); }
  var nsp = q.options.map(function (o) { return /On ne peut pas savoir/.test(o); });
  if (q.format === "choix") { tnChoix++; tpos[q.bonne]++; var L = q.options.map(function (o) { return o.length; }); if (L[q.bonne] === Math.max.apply(null, L) && L.filter(function (x) { return x === L[q.bonne]; }).length === 1 && !/^\d+$/.test(q.options[q.bonne])) { tlongue++; } }
  if (q.format !== "barrer" && nsp[q.bonne]) { tnspBonne++; } else if (nsp.some(Boolean)) { tnspMauvaise++; }
  if (q.tags && q.tags.indexOf("ecole") >= 0) { tscol++; }
  var mots = q.consigne.split(/\s+/).length; ttexte.push(mots);
});
var tvf = [0, 0, 0]; trs.filter(function (q) { return q.format === "vrai-faux-nsp"; }).forEach(function (q) { tvf[q.bonne]++; });
console.log("Banque de tirs : " + trs.length + " questions ; position de la bonne (choix) " + tpos.join("/") + " ; la plus longue : " + tlongue + "/" + tnChoix + " ; textes scolaires : " + tscol + " ; longueur des textes " + Math.min.apply(null, ttexte) + " à " + Math.max.apply(null, ttexte) + " mots");
console.log("Tirs, « On ne peut pas savoir » : bonne réponse " + tnspBonne + " fois (" + Math.round(100 * tnspBonne / trs.length) + " %), mauvaise réponse " + tnspMauvaise + " fois ; vrai-faux-nsp Oui/Non/NSP = " + tvf.join("/"));
/* Banque de gardien (chantier 9b) : 12 par niveau au moins, type gardien, formats, équilibre */
var gds = tous.filter(function (q) { return /^gar-/.test(q.id); });
for (var ng = 1; ng <= 5; ng++) { var n12 = gds.filter(function (q) { return q.niveau === ng; }).length; if (n12 < 12) { console.log("PROBLÈME : niveau " + ng + " a " + n12 + " questions de gardien (12 au moins attendues)"); pb.push("niveau " + ng + " gardien : " + n12); } }
if (tous.filter(function (q) { return q.type === "gardien"; }).length !== gds.length) { pb.push("des questions de type gardien ne sont pas dans data/gardien.js"); }
var gpos = [0, 0, 0, 0], gnChoix = 0, gnspBonne = 0, gnspMauvaise = 0, gmots = {};
gds.forEach(function (q) {
  if (q.type !== "gardien") { pb.push(q.id + " : type gardien attendu"); }
  var nsp = q.options.map(function (o) { return /On ne peut pas savoir/.test(o); });
  if (q.format === "choix") { gnChoix++; gpos[q.bonne]++; }
  if (q.format !== "barrer" && nsp[q.bonne]) { gnspBonne++; } else if (nsp.some(Boolean)) { gnspMauvaise++; }
  var m = (q.consigne + " " + (q.situation || "")).replace(/\{[^}]*\}/g, "x").split(/\s+/).filter(Boolean).length;
  (gmots[q.niveau] = gmots[q.niveau] || []).push(m);
});
var gvf = [0, 0, 0]; gds.filter(function (q) { return q.format === "vrai-faux-nsp"; }).forEach(function (q) { gvf[q.bonne]++; });
console.log("Banque de gardien : " + gds.length + " questions ; position de la bonne (choix) " + gpos.join("/") + " ; longueur consigne+situation par niveau (min-max) " + Object.keys(gmots).map(function (k) { return k + ":" + Math.min.apply(null, gmots[k]) + "-" + Math.max.apply(null, gmots[k]); }).join(" "));
console.log("Gardien, « On ne peut pas savoir » : bonne réponse " + gnspBonne + " fois (" + Math.round(100 * gnspBonne / Math.max(1, gds.length)) + " %), mauvaise réponse " + gnspMauvaise + " fois ; vrai-faux-nsp Oui/Non/NSP = " + gvf.join("/"));
/* Banque « petits mots » (chantier 15) : 12 par niveau au moins, un seul trou « ____ », 4 options distinctes, règles mp_ de 10 mots au plus,
   la longueur des phrases croît avec le niveau, une seule bonne réponse (format choix), aucune place {A}… */
var mps = tous.filter(function (q) { return /^mp-/.test(q.id); });
for (var nm = 1; nm <= 5; nm++) { var nn = mps.filter(function (q) { return q.niveau === nm; }).length; if (nn < 12) { console.log("PROBLÈME : niveau " + nm + " a " + nn + " questions de petits mots (12 au moins attendues)"); pb.push("niveau " + nm + " motpetit : " + nn); } }
if (tous.filter(function (q) { return q.type === "motpetit"; }).length !== mps.length) { pb.push("des questions de type motpetit ne sont pas dans data/motspetits.js"); }
var mpLong = {}, mpPos = [0, 0, 0, 0];
mps.forEach(function (q) {
  if (q.type !== "motpetit") { pb.push(q.id + " : type motpetit attendu"); }
  if (q.format !== "choix") { pb.push(q.id + " : format choix attendu"); }
  if (q.options.length !== 4) { pb.push(q.id + " : 4 options attendues (une par coin du but)"); }
  if (q.consigne.split("____").length !== 2) { pb.push(q.id + " : un seul trou « ____ » attendu dans la phrase"); }
  if (/\{[A-Z]/.test(JSON.stringify(q))) { pb.push(q.id + " : pas de place {A}… dans les petits mots"); }
  var debutTrou = /^____/.test(q.consigne), maj = /^[A-ZÀÉÈ]/.test(q.options[q.bonne]);
  if (debutTrou && !maj) { pb.push(q.id + " : trou en début de phrase, l'option doit commencer par une majuscule"); }
  if (!debutTrou && /^[A-ZÀ-Ý]/.test(q.options[q.bonne]) && !/^[A-ZÀ-Ý]/.test(q.consigne.split("____")[0].slice(-3)) && q.consigne.split("____")[0].slice(-2) !== ". " && q.consigne.split("____")[0].slice(-2) !== "? ") { pb.push(q.id + " : majuscule inattendue au milieu de la phrase"); }
  q.options.forEach(function (o, i) { if (i !== q.bonne && o.toLowerCase() === q.options[q.bonne].toLowerCase()) { pb.push(q.id + " : option identique à la bonne réponse"); } });
  var mots = q.consigne.split(/\s+/).length; (mpLong[q.niveau] = mpLong[q.niveau] || []).push(mots);
  mpPos[q.bonne]++;
});
Object.keys(J.regles_texte).forEach(function (k) { if (/^mp_/.test(k) && J.regles_texte[k].split(/\s+/).length > 10) { pb.push("règle " + k + " > 10 mots"); } });
mps.forEach(function (q) { if (!/^mp_/.test(q.regle)) { pb.push(q.id + " : règle mp_ attendue"); } });
var moy = {}; Object.keys(mpLong).forEach(function (k) { var s = 0; mpLong[k].forEach(function (x) { s += x; }); moy[k] = s / mpLong[k].length; });
for (var kl = 2; kl <= 5; kl++) { if (!(moy[kl] > moy[kl - 1])) { pb.push("petits mots : la phrase moyenne du niveau " + kl + " n'est pas plus longue que celle du niveau " + (kl - 1)); } }
console.log("Banque « petits mots » : " + mps.length + " questions ; longueur moyenne des phrases par niveau (mots) " + Object.keys(moy).map(function (k) { return k + ":" + Math.round(moy[k]); }).join(" ") + " ; position de la bonne dans les données " + mpPos.join("/") + " (le jeu mélange les coins)");
/* Banque « vocabulaire des consignes » (chantier 15) : mêmes exigences (12 par niveau, un seul trou, 4 options, règles vc_ de 10 mots au plus) */
var vcs = tous.filter(function (q) { return q.type === "vocabulaire"; });
for (var nv = 1; nv <= 5; nv++) { var nnv = vcs.filter(function (q) { return q.niveau === nv; }).length; if (nnv < 12) { pb.push("niveau " + nv + " vocabulaire : " + nnv + " questions (12 au moins attendues)"); } }
vcs.forEach(function (q) {
  if (!/^vc-/.test(q.id)) { pb.push(q.id + " : identifiant vc- attendu"); }
  if (q.format !== "choix") { pb.push(q.id + " : format choix attendu"); }
  if (q.options.length !== 4) { pb.push(q.id + " : 4 options attendues"); }
  if (q.consigne.split("____").length !== 2) { pb.push(q.id + " : un seul trou « ____ » attendu"); }
  if (/\{[A-Z]/.test(JSON.stringify(q))) { pb.push(q.id + " : pas de place {A}… dans le vocabulaire"); }
  if (q.consigne.indexOf(q.mot) < 0) { pb.push(q.id + " : le mot indice « " + q.mot + " » n'est pas dans la phrase"); }
  var dt = /^____/.test(q.consigne); if (dt && !/^[A-ZÀÉÈ]/.test(q.options[q.bonne])) { pb.push(q.id + " : trou en début de phrase, majuscule attendue"); }
  if (!/^vc_/.test(q.regle) || !J.regles_texte[q.regle]) { pb.push(q.id + " : règle vc_ inconnue (" + q.regle + ")"); }
  ["bonne", "cle", "piege"].forEach(function (k) { if (!q.explication || !q.explication[k]) { pb.push(q.id + " : explication « " + k + " » manquante"); } else if (q.explication[k].split(/\s+/).length > 18) { pb.push(q.id + " : explication « " + k + " » de plus de 18 mots"); } });
  q.options.forEach(function (o, i) { if (i !== q.bonne && o.toLowerCase() === q.options[q.bonne].toLowerCase()) { pb.push(q.id + " : option identique à la bonne réponse"); } });
});
Object.keys(J.regles_texte).forEach(function (k) { if (/^vc_/.test(k) && J.regles_texte[k].split(/\s+/).length > 10) { pb.push("règle " + k + " > 10 mots"); } });
var vcm = {}; vcs.forEach(function (q) { (vcm[q.niveau] = vcm[q.niveau] || []).push(q.consigne.split(/\s+/).length); });
console.log("Banque « vocabulaire » : " + vcs.length + " questions ; longueur moyenne des phrases par niveau (mots) " + Object.keys(vcm).map(function (k) { var s2 = 0; vcm[k].forEach(function (x) { s2 += x; }); return k + ":" + Math.round(s2 / vcm[k].length); }).join(" "));
/* Les gardiens des tirs au but : chacun doit avoir assez de questions à chaque niveau de sa plage (12 au moins pour les gardiens à thème) */
var cat = J.banque.categorie;
function compte(f, niv) { return tous.filter(function (q) { return (q.type === "motpetit" || q.type === "vocabulaire") && q.niveau === niv && f(q); }).length; }
var gardTest = { "noir (prépositions et conjonctions)": function (q) { return cat(q) === "pc"; }, "blond (vocabulaire)": function (q) { return cat(q) === "vocab"; } };
Object.keys(gardTest).forEach(function (g) { var cs = []; for (var lv = 1; lv <= 5; lv++) { var c = compte(gardTest[g], lv); cs.push(lv + ":" + c); if (c < 12) { pb.push("gardien " + g + " : niveau " + lv + " n'a que " + c + " questions (12 au moins)"); } } console.log("Gardien " + g + " : " + cs.join(" ")); });
var sansHom = []; for (var lh = 1; lh <= 5; lh++) { sansHom.push(lh + ":" + compte(function (q) { return cat(q) !== "hom"; }, lh)); }
console.log("Mélange sans homophones (gardiens Ted et Thomas) : " + sansHom.join(" ") + " ; avec homophones, niveau 1-2 (gardien Alan) : " + compte(function () { return true; }, 1) + " / " + compte(function () { return true; }, 2));
console.log(pb.length ? "PROBLÈMES FINAUX (" + pb.length + ") :\n- " + pb.join("\n- ") : "Contrôle complet : aucun problème.");
process.exit(pb.length ? 1 : 0);
