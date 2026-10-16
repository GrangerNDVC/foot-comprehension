/* Contrôle officiel des questions (Node). Usage : node outils-test/verifier-questions.js
   Charge js/banque.js + toutes les banques de data/ comme le fait index.html, lance JEU.banque.verifier()
   puis affiche la répartition par type, niveau et format. */
var fs = require("fs"), path = require("path"), vm = require("vm");
var racine = path.join(__dirname, "..");
var html = fs.readFileSync(path.join(racine, "index.html"), "utf8");
var scripts = [], re = /<script src="([^"]+)"><\/script>/g, m;
while ((m = re.exec(html))) { if (/^(js\/banque|data\/(regles|palier|essai|attaque|provisoire|noms|defense|tirs)|js\/noms)/.test(m[1])) { scripts.push(m[1]); } }
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
Object.keys(J.regles_texte).forEach(function (k) { if (/^att_/.test(k) && J.regles_texte[k].split(/\s+/).length > 10) { pb.push("règle " + k + " > 10 mots"); } });
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
process.exit(pb.length ? 1 : 0);
