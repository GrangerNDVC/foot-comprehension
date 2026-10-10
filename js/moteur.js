/* ============================================================
   LE MOTEUR : déroulement d'un palier
   question -> choix -> tir (but ou arrêt) -> explication -> suite
   ============================================================ */
(function () {
  var J = window.JEU = window.JEU || {};
  var E = null;                      // état de la partie en cours
  var M = J.moteur = {};

  function $(id) { return document.getElementById(id); }
  function vider(el) { while (el.firstChild) { el.removeChild(el.firstChild); } }
  function melange(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function el(tag, classe, texte) {
    var e = document.createElement(tag);
    if (classe) { e.className = classe; }
    if (texte !== undefined) { e.textContent = texte; }
    return e;
  }
  function ecran(id) {
    ["ecran-menu", "ecran-jeu", "ecran-fin"].forEach(function (x) { $(x).hidden = (x !== id); });
  }
  function ptsMax(p, it) { return p.type === "indices" ? 3 : 2; }

  /* ---------- menu ---------- */
  M.menu = function () {
    J.audio.stop();
    var zone = $("cartes"); vider(zone);
    J.paliers.forEach(function (p) {
      var nb = (J.items[p.id] || []).length;
      var carte = el("div", "carte");
      carte.appendChild(el("div", "carte-num", "Palier " + p.id));
      carte.appendChild(el("h2", "", p.titre));
      carte.appendChild(el("p", "", p.sousTitre));
      var m = J.progression.meilleur(p.id);
      carte.appendChild(el("div", "carte-score", m ? ("Meilleur score : " + m.points + " / " + m.max) : (nb + " exercices")));
      var b = el("button", "gros", "▶ Jouer");
      b.onclick = function () { M.demarrer(p.id); };
      carte.appendChild(b);
      zone.appendChild(carte);
    });
    ecran("ecran-menu");
  };

  /* ---------- démarrage d'un palier ---------- */
  M.demarrer = function (id) {
    var p = J.paliers.filter(function (x) { return x.id === id; })[0];
    var items = (J.items[id] || []).slice();
    items.forEach(function (it) { it._r = Math.random(); });
    items.sort(function (a, b) { return (a.niveau - b.niveau) || (a._r - b._r); });  // du plus facile au plus fin
    var max = 0; items.forEach(function (it) { max += ptsMax(p, it); });
    E = { palier: p, items: items, i: 0, points: 0, max: max, jauge: 0,
          essai: 1, vus: 1, verrou: false, ordre: [], off: {} };
    $("titre-palier").textContent = "Palier " + p.id + " · " + p.titre;
    $("pts").textContent = "0";
    J.scene.reinit();
    ecran("ecran-jeu");
    afficher();
  };

  /* ---------- affichage d'un exercice ---------- */
  function afficher() {
    var p = E.palier, it = E.items[E.i];
    E.essai = 1; E.vus = 1; E.verrou = false; E.off = {};
    E.ordre = melange(it.options.map(function (_, k) { return k; }));
    $("avancement").textContent = (E.i + 1) + " / " + E.items.length + "  ·  niveau " + it.niveau;
    $("feedback").textContent = "";
    $("feedback").className = "";
    $("btn-suite").hidden = true;

    var bloc = $("bloc-consigne"); vider(bloc);
    var ind = $("bloc-indices"); vider(ind);
    if (p.type === "indices") {
      bloc.appendChild(el("div", "question-grosse", it.question));
      ind.hidden = false;
      montrerIndices();
    } else {
      ind.hidden = true;
      var boite = el("div", "boite-consigne");
      boite.appendChild(el("div", "etiquette", p.etiquette || "Consigne"));
      boite.appendChild(el("div", "texte-consigne", it.consigne));
      if (it.situation) { boite.appendChild(el("div", "situation", it.situation)); }
      bloc.appendChild(boite);
      bloc.appendChild(el("div", "question-grosse", it.question));
    }

    var zone = $("options"); vider(zone);
    E.ordre.forEach(function (reel, k) {
      var b = el("button", "option", it.options[reel]);
      b.onclick = function () { repondre(k); };
      zone.appendChild(b);
    });
    $("btn-indice").hidden = (p.type !== "indices");
    $("btn-indice").disabled = false;
    majJauge();
    J.scene.reinit();
  }

  function montrerIndices() {
    var it = E.items[E.i], ind = $("bloc-indices"); vider(ind);
    for (var k = 0; k < E.vus; k++) {
      var ligne = el("div", "indice" + (k === E.vus - 1 ? " nouveau" : ""));
      ligne.appendChild(el("span", "indice-num", "Indice " + (k + 1)));
      ligne.appendChild(el("span", "indice-txt", it.indices[k]));
      ind.appendChild(ligne);
    }
    $("btn-indice").disabled = (E.vus >= it.indices.length);
  }

  function boutons() { return $("options").getElementsByTagName("button"); }
  function activer(oui) {
    var b = boutons();
    for (var k = 0; k < b.length; k++) { b[k].disabled = (!oui) || !!E.off[k]; }
  }
  function majJauge() {
    $("jauge-rempli").style.width = Math.min(100, E.jauge / 3 * 100) + "%";
    $("btn-super").disabled = (E.jauge < 3) || E.verrou;
  }
  function marquerBonne() {
    var it = E.items[E.i], b = boutons();
    for (var k = 0; k < b.length; k++) { if (E.ordre[k] === it.bonne) { b[k].className = "option bonne"; } }
  }
  function finExercice(feedbackHtmlTexte, classe) {
    var fb = $("feedback");
    fb.textContent = feedbackHtmlTexte; fb.className = classe;
    $("btn-suite").hidden = false;
    $("btn-suite").textContent = (E.i + 1 >= E.items.length) ? "Voir mon score ▶" : "Continuer ▶";
    activer(false);
    $("btn-indice").disabled = true;
    E.verrou = true; majJauge();
  }

  /* ---------- réponse ---------- */
  function repondre(k) {
    if (E.verrou || E.off[k]) { return; }
    var p = E.palier, it = E.items[E.i];
    E.verrou = true; activer(false); majJauge();
    var bon = (E.ordre[k] === it.bonne);
    J.scene.tirer(bon).then(function () {
      if (bon) {
        var pts = (p.type === "indices") ? Math.max(1, 4 - E.vus) : (E.essai === 1 ? 2 : 1);
        E.points += pts; E.jauge = Math.min(3, E.jauge + 1);
        $("pts").textContent = String(E.points);
        marquerBonne();
        finExercice("✅ BUT ! +" + pts + " point" + (pts > 1 ? "s" : "") + ".  " + it.explication, "ok");
      } else if (E.essai === 1) {
        E.essai = 2; E.off[k] = true;
        boutons()[k].className = "option fausse";
        var suite = "Relis bien et compare avec chaque mot.";
        if (p.type === "indices" && E.vus < it.indices.length) { E.vus++; montrerIndices(); suite = "Un nouvel indice est apparu !"; }
        $("feedback").className = "ko";
        $("feedback").textContent = "🧤 Arrêt du gardien ! " + suite + " Tu as une deuxième chance.";
        J.scene.reinit(); E.verrou = false; activer(true); majJauge();
      } else {
        boutons()[k].className = "option fausse";
        marquerBonne();
        finExercice("La bonne réponse est en vert. " + it.explication, "ko");
      }
    });
  }

  /* ---------- boutons d'aide ---------- */
  function textePourLire() {
    var p = E.palier, it = E.items[E.i], t = [], k;
    if (p.type === "indices") {
      t.push(it.question);
      for (k = 0; k < E.vus; k++) { t.push("Indice " + (k + 1) + ". " + it.indices[k]); }
    } else {
      t.push(p.etiquette || "Consigne"); t.push(it.consigne);
      if (it.situation) { t.push(it.situation); }
      t.push(it.question);
    }
    t.push("Les choix sont.");
    E.ordre.forEach(function (reel, j) { t.push("Choix " + (j + 1) + ". " + it.options[reel]); });
    return t.join(" ... ");
  }

  M.brancher = function () {
    $("btn-ecouter").onclick = function () { if (E) { J.audio.lire(textePourLire()); } };
    $("btn-indice").onclick = function () {
      if (!E || E.verrou) { return; }
      var it = E.items[E.i];
      if (E.vus < it.indices.length) { E.vus++; montrerIndices(); }
    };
    $("btn-super").onclick = function () {
      if (!E || E.verrou || E.jauge < 3) { return; }
      var it = E.items[E.i], b = boutons();
      for (var k = 0; k < b.length; k++) {
        if (E.ordre[k] !== it.bonne && !E.off[k]) {
          E.off[k] = true; b[k].className = "option fausse"; b[k].disabled = true;
          E.jauge = 0; majJauge();
          $("feedback").className = "ok";
          $("feedback").textContent = "⭐ Super-tir ! Une mauvaise réponse est éliminée.";
          break;
        }
      }
    };
    $("btn-var").onclick = function () {
      if (!E) { return; }
      var ul = $("liste-methode"); vider(ul);
      E.palier.methode.forEach(function (m) { ul.appendChild(el("li", "", m)); });
      $("modal-var").hidden = false;
    };
    $("btn-suite").onclick = function () {
      J.audio.stop();
      E.i++;
      if (E.i >= E.items.length) { fin(); } else { afficher(); }
    };
    $("btn-menu").onclick = function () { M.menu(); };
    $("btn-rejouer").onclick = function () { M.demarrer(E.palier.id); };
    $("btn-retour-menu").onclick = function () { M.menu(); };
  };

  /* ---------- fin de palier ---------- */
  function fin() {
    var meilleur = J.progression.enregistrer(E.palier.id, E.points, E.max);
    var r = E.max ? E.points / E.max : 0;
    var msg = r >= 0.85 ? "Excellent ! Tu es un vrai buteur de la lecture." :
              r >= 0.6 ? "Bien joué ! Rejoue pour faire encore mieux." :
                         "Continue : chaque match te fait progresser !";
    $("fin-score").textContent = E.points + " / " + E.max + " points";
    $("fin-message").textContent = msg + (meilleur ? "  Nouveau meilleur score !" : "");
    ecran("ecran-fin");
  }
})();
