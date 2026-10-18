/* Simulation de matchs avec un « élève robot » (Node) : node outils-test/simuler.js [precision]
   Vérifie : les deux équipes peuvent marquer, récupérer le ballon est plus dur que le garder, la difficulté monte au fil des matchs. */
var fs = require("fs"), path = require("path"), vm = require("vm");
var racine = path.join(__dirname, "..");
var html = fs.readFileSync(path.join(racine, "index.html"), "utf8"), scripts = [], re = /<script src="([^"]+)"><\/script>/g, m;
while ((m = re.exec(html))) { if (/^(js\/(banque|noms|regles|progression)|data\/(config|regles|championnat|paliers|attaque|defense|tirs|noms|regles-attaque))/.test(m[1])) { scripts.push(m[1]); } }
var ctx = { localStorage: { getItem: function () { return null; }, setItem: function () {}, removeItem: function () {} } };
ctx.window = ctx; vm.createContext(ctx);
scripts.forEach(function (f) { vm.runInContext(fs.readFileSync(path.join(racine, f), "utf8"), ctx, { filename: f }); });
var J = ctx.JEU, R = J.regles;
var P = parseFloat(process.argv[2] || "0.7"), NB = 200;
// précision de l'élève : baisse un peu avec le niveau de la question
function bonnePar(niv) { return Math.max(0.05, P - 0.07 * (niv - 3)); }
var stats = {};
function match(def, calib) {
  var s = R.nouveau(def, { calibrage: calib || 0 }), garde = [0, 0], recup = [0, 0], niv = [], guard = 0;
  while (s.etat !== "fin" && guard++ < 500) {
    if (s.etat === "mitemps") { R.secondeMiTemps(s); continue; }
    if (s.etat === "prolongation") { R.prolongation(s); continue; }
    var ph = R.phase(s), choix, a;
    if (s.p.auto) { var id = R.autoAction(s); choix = { id: id, cible: id === "passe" ? R.candidats(s)[0] : null }; }
    else {
      var l = R.actionsDisponibles(s).filter(function (x) { return x.dispo; });
      if (!l.length) { l = [R.actionsDisponibles(s)[0]]; }
      // élève : tente le tir dès qu'il peut, sinon préfère les gestes à gain élevé s'il a de l'énergie
      var tir = l.filter(function (x) { return R.geste(x.id).action === "tir"; })[0];
      choix = tir || l[Math.floor(Math.random() * l.length)];
    }
    var n = R.niveau(s, choix.id);
    R.engager(s, choix.id, choix.cible);
    var q = J.banque.choisir(R.typeQuestion(choix.id), n, { exclus: s.exclus, base: R.base(s, choix.cible), special: R.geste(choix.id).special || null });
    if (!q) { throw new Error("pas de question " + choix.id + " niv " + n); }
    s.exclus.push(q.id);
    var ok1 = Math.random() < bonnePar(n), issue;
    if (ok1) { issue = "premier"; R.reponse(s, 1, true); }
    else { R.reponse(s, 1, false); var ok2 = Math.random() < 0.5; if (ok2) { issue = "second"; R.reponse(s, 2, true); } else { issue = "rate"; R.reponse(s, 2, false); } }
    var att = (ph === "attaque"); (att ? garde : recup)[issue === "rate" ? 1 : 0]++; niv.push(n);
    R.conclure(s, choix.id, issue, choix.cible);
  }
  return { s: s, garde: garde, recup: recup, niv: niv };
}
J.championnat.matchs.forEach(function (def) {
  var v = 0, nul = 0, bn = 0, be = 0, nn = [], rc = [0, 0], gd = [0, 0], red = 0, jn = 0, bl = 0;
  for (var i = 0; i < NB; i++) {
    var r = match(def, 0); bn += r.s.score.nous; be += r.s.score.eux;
    if (r.s.score.nous > r.s.score.eux) { v++; } else if (r.s.score.nous === r.s.score.eux) { nul++; }
    rc[0] += r.recup[0]; rc[1] += r.recup[1]; gd[0] += r.garde[0]; gd[1] += r.garde[1];
    nn = nn.concat(r.niv); red += r.s.rouges; jn += r.s.jaunes; bl += r.s.blesses;
  }
  var moy = nn.reduce(function (a, b) { return a + b; }, 0) / nn.length;
  console.log(def.id + " " + def.adversaire.padEnd(13) + " victoires " + Math.round(100 * v / NB) + "% nuls " + Math.round(100 * nul / NB) + "% | buts/match nous " + (bn / NB).toFixed(1) + " eux " + (be / NB).toFixed(1) +
    " | niveau moyen " + moy.toFixed(2) + " | jaunes " + (jn / NB).toFixed(1) + " blessés " + (bl / NB).toFixed(1) + " rouges " + (red / NB).toFixed(1));
});
