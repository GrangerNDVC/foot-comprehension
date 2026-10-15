/* Contrôle de la banque d'attaque (chantier 5).
   Usage : node outils-test/verifier-attaque.js
   Remplace JEU.banque.verifier() quand le jeu complet n'est pas là ; refait les mêmes
   contrôles (id uniques, bonne valide, règle connue, 18 mots, mot décisif présent)
   et ajoute des statistiques d'équilibre. */
var path = require("path");
global.window = global;
global.JEU = { ajouterQuestions: function (q) { global.QUESTIONS = q; } };
var racine = path.join(__dirname, "..");
require(path.join(racine, "data", "regles-attaque.js"));
require(path.join(racine, "data", "attaque.js"));

var NSP_CHOIX = "On ne peut pas savoir : il manque une information";
var VFN = ["Oui", "Non", "On ne peut pas savoir"];
var erreurs = [], alertes = [];
function err(id, m) { erreurs.push(id + " : " + m); }
function alerte(id, m) { alertes.push(id + " : " + m); }
function mots(s) { return String(s).trim().split(/\s+/).filter(Boolean).length; }

var ids = {}, stats = {}, nspBonne = 0, nspMauvaise = 0, formats = {}, positions = [0, 0, 0, 0], plusLongue = 0, nChoix = 0;
var usedRules = {};

QUESTIONS.forEach(function (q) {
  var id = q.id || "(sans id)";
  if (ids[id]) err(id, "id en double"); ids[id] = 1;
  if (!(q.niveau >= 1 && q.niveau <= 5)) err(id, "niveau invalide");
  if (q.type !== "passe" && q.type !== "dribble") err(id, "type invalide");
  if (["choix", "barrer", "vrai-faux-nsp"].indexOf(q.format) < 0) err(id, "format invalide");
  if (!q.consigne || !q.question) err(id, "consigne ou question manquante");
  if (!Array.isArray(q.options) || q.options.length < 2) { err(id, "options manquantes"); return; }
  var k = q.type + " niv" + q.niveau; stats[k] = (stats[k] || 0) + 1;
  formats[q.format] = (formats[q.format] || 0) + 1;

  // options sans doublon
  var vus = {};
  q.options.forEach(function (o) { if (vus[o]) err(id, "option en double : " + o); vus[o] = 1; });

  // bonne valide
  if (q.format === "barrer") {
    if (!Array.isArray(q.bonne) || q.bonne.length < 2) err(id, "barrer : bonne doit être une liste d'au moins 2 numéros");
    else q.bonne.forEach(function (b) { if (!(b >= 0 && b < q.options.length)) err(id, "bonne hors limites"); });
    if (q.options.length !== 4) err(id, "barrer : 4 options attendues");
    if (Array.isArray(q.bonne) && q.bonne.length >= q.options.length) err(id, "barrer : toutes les options sont bonnes");
  } else {
    if (typeof q.bonne !== "number" || !(q.bonne >= 0 && q.bonne < q.options.length)) err(id, "bonne invalide");
    if (q.format === "vrai-faux-nsp" && JSON.stringify(q.options) !== JSON.stringify(VFN)) err(id, "vrai-faux-nsp : options attendues Oui / Non / On ne peut pas savoir");
    if (q.format === "choix" && q.options.length !== 4) err(id, "choix : 4 options attendues");
  }

  // « On ne peut pas savoir »
  var estNsp = function (i) { return q.options[i] === NSP_CHOIX || (q.format === "vrai-faux-nsp" && i === 2); };
  if (q.format === "choix") {
    nChoix++;
    positions[q.bonne]++;
    var lg = q.options.map(function (o) { return o.length; });
    if (q.options[q.bonne] !== NSP_CHOIX && lg[q.bonne] === Math.max.apply(null, lg) && lg.filter(function (x) { return x === lg[q.bonne]; }).length === 1) plusLongue++;
    if (q.options.indexOf(NSP_CHOIX) >= 0) { if (estNsp(q.bonne)) nspBonne++; else nspMauvaise++; }
  } else if (q.format === "vrai-faux-nsp") {
    if (q.bonne === 2) nspBonne++;
  }

  // mot décisif
  var source = [q.consigne, q.situation || "", (q.indices || []).join(" ")].join(" ");
  if (!q.mot) err(id, "mot manquant");
  else if (source.indexOf(q.mot) < 0) err(id, "mot absent du texte : « " + q.mot + " »");

  // règle
  if (!q.regle) err(id, "règle manquante");
  else if (!JEU.regles_texte[q.regle]) err(id, "règle inconnue : " + q.regle);
  else usedRules[q.regle] = (usedRules[q.regle] || 0) + 1;

  // explication
  var e = q.explication;
  if (!e || !e.bonne || !e.cle || !e.piege) err(id, "explication incomplète");
  else ["bonne", "cle", "piege"].forEach(function (c) { if (mots(e[c]) > 18) err(id, "explication." + c + " : " + mots(e[c]) + " mots (max 18)"); });
});

// règles : 10 mots maximum
Object.keys(JEU.regles_texte).forEach(function (r) {
  if (mots(JEU.regles_texte[r]) > 10) err("règle " + r, mots(JEU.regles_texte[r]) + " mots (max 10)");
  if (!usedRules[r]) alerte("règle " + r, "jamais utilisée");
});

// répartition : 8 par type et par niveau
["passe", "dribble"].forEach(function (t) { for (var n = 1; n <= 5; n++) { var c = stats[t + " niv" + n] || 0; if (c !== 8) err(t + " niv" + n, c + " questions (8 attendues)"); } });

var total = QUESTIONS.length;
console.log("Questions : " + total);
console.log("Formats : " + JSON.stringify(formats));
console.log("« On ne peut pas savoir » bonne réponse : " + nspBonne + " (" + Math.round(100 * nspBonne / total) + " %) ; proposée comme mauvaise réponse : " + nspMauvaise);
console.log("Position de la bonne réponse (choix, options 1 à 4) : " + positions.join(" / ") + " sur " + nChoix);
console.log("Bonne réponse = seule option la plus longue : " + plusLongue + " sur " + nChoix);
if (alertes.length) console.log("\nAlertes (" + alertes.length + ") :\n- " + alertes.join("\n- "));
if (erreurs.length) { console.log("\nERREURS (" + erreurs.length + ") :\n- " + erreurs.join("\n- ")); process.exit(1); }
console.log("\nAucune erreur.");
