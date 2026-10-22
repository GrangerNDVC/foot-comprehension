/* ============================================================
   LE MATCH : écrans et déroulement (menu, avant-match, match, mi-temps, fin).
   La logique (ballon, score, niveaux) est dans js/regles.js ; ici on affiche
   et on branche les boutons.
   Écran du match : en haut le tableau (mi-temps, minute, score, guts) ;
   à gauche la scène (mini-carte ou gros plan) ; à droite le panneau
   (menu d'actions, question, correction).
   ============================================================ */
(function (root) {
  var J = root.JEU = root.JEU || {};
  var R = J.regles, M = J.match = {};
  var doc = root.document;
  var S = null;        // état du match (regles.js)
  var Q = null;        // question en cours
  var IDX = 0;         // numéro du match dans le championnat

  /* ---------- petits outils ---------- */
  function $(id) { return doc.getElementById(id); }
  function vider(e) { while (e.firstChild) { e.removeChild(e.firstChild); } }
  function el(tag, classe, texte) {
    var e = doc.createElement(tag);
    if (classe) { e.className = classe; }
    if (texte !== undefined) { e.textContent = texte; }
    return e;
  }
  function melange(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(J.alea() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function ecran(id) {
    ["ecran-menu", "ecran-avant", "ecran-match", "ecran-fin", "ecran-championnat"].forEach(function (x) { $(x).hidden = (x !== id); });
    if (J.histoire && id !== "ecran-avant" && id !== "ecran-fin" && id !== "ecran-championnat") { J.histoire.arreter(); }
    root.scrollTo(0, 0);
  }
  function tout() { return /[?&]tout\b/.test(root.location.search || ""); }
  function matchs() { return J.championnat.matchs; }
  function nomEquipe() { return R.eq(J.championnat.equipe); }
  function adv() { return R.eq(S.def.adversaire); }
  function tx(t) { return J.noms ? J.noms.texte(t) : t; }
  // Sons (chantier 10) : le jeu reste jouable si le son manque ou échoue
  function son(nom) { try { if (J.sons) { J.sons.jouer(nom); } } catch (e) {} }
  function sonApres(nom, ms) { try { if (J.sons) { J.sons.jouerApres(nom, ms); } } catch (e) {} }
  function musique(nom, opts) { try { if (J.sons) { J.sons.musique(nom, opts); } } catch (e) {} }
  function musiqueMatch() { var r = J.sonsReglages || {}; return (IDX >= (r.matchTension || 4)) ? "match-tension" : "match"; }
  // Les bruitages de l'action qui vient d'être jouée (un peu après le « ding » de la réponse)
  function sonsAction(ev) {
    var a = ev.action, d = 450;
    if (a === "passe" || a === "dribble") { if (ev.ok) { sonApres("coup-de-pied", d); } }
    else if (a === "tir") { sonApres("tir", d); sonApres(ev.but === "nous" ? "but-nous" : "arret-gardien", d + 650); }
    else if (a === "gardien") { if (ev.ok) { sonApres("arret-gardien", d); } else { sonApres("tir", d); sonApres("but-adverse", d + 500); } }
    else if (a === "degager") { if (ev.ok) { sonApres("coup-de-pied", d); } }
    else if (a === "couper" || a === "tacler" || a === "bloquer") { if (ev.ok) { sonApres("tacle", d); } }
    if (ev.sanction) { sonApres(ev.sanction.type === "blessure" ? "blessure" : "carton", d + 1000); }
  }

  // Écrit un texte dans un élément ; si `mot` est donné, le surligne (sans accent ni casse)
  function remplirTexte(parent, texte, mot, surligne) {
    vider(parent);
    if (!surligne || !mot) { parent.appendChild(doc.createTextNode(texte)); return; }
    var bas = texte.toLowerCase(), m = String(mot).toLowerCase(), i = bas.indexOf(m);
    if (i < 0) { parent.appendChild(doc.createTextNode(texte)); return; }
    parent.appendChild(doc.createTextNode(texte.slice(0, i)));
    parent.appendChild(el("mark", "", texte.slice(i, i + m.length)));
    parent.appendChild(doc.createTextNode(texte.slice(i + m.length)));
  }

  /* ---------- menu ---------- */
  M.menu = function () {
    if (J.sons) { J.sons.annulerAttentes(); } musique("menu");
    J.audio.stop(); if (J.grosplan) { J.grosplan.arreter(); }
    var zone = $("cartes"); vider(zone);
    if (J.histoire) { J.histoire.afficher($("accueil-image"), "accueil", "avant", "histoire-accueil"); }
    var gagnes = matchs().filter(function (m) { var r = J.progression.match(m.id); return r && r.gagne; }).length;
    $("menu-progres").textContent = gagnes ? ("🏆 " + gagnes + " match" + (gagnes > 1 ? "s" : "") + " gagné" + (gagnes > 1 ? "s" : "") + " sur " + matchs().length) : "Six matchs t'attendent. Prêt ?";
    matchs().forEach(function (m, i) {
      var p = J.config.matchs[m.id] || {};
      var ouvert = tout() || J.progression.ouvert(i, matchs());
      var meilleur = J.progression.match(m.id);
      var carte = el("div", "carte" + (ouvert ? "" : " verrou") + (meilleur && meilleur.gagne ? " gagne" : ""));
      var eqAdv = root.EQUIPES && J.grosplanReglages && root.EQUIPES[J.grosplanReglages.equipeParMatch[m.id]];
      if (eqAdv) { carte.style.borderColor = "rgb(" + eqAdv.maillot.join(",") + ")"; }
      if (J.histoire) {
        var vig = el("div", "vignette");
        var cv = doc.createElement("canvas"); cv.width = 512; cv.height = 256; vig.appendChild(cv);
        if (!ouvert) { vig.appendChild(el("div", "vignette-cadenas", "🔒")); }
        if (meilleur && meilleur.gagne) { vig.appendChild(el("div", "vignette-coupe", "🏆")); }
        carte.appendChild(vig);
        J.histoire.vignette(cv, m.id, "avant", 96);
      }
      carte.appendChild(el("div", "carte-num", p.auto ? "Match d'essai" : m.tour));
      carte.appendChild(el("h2", "", nomEquipe() + " – " + R.eq(m.adversaire)));
      var etoiles = ""; var k;
      for (k = 1; k <= 5; k++) { etoiles += (k <= m.niveau ? "★" : "☆"); }
      carte.appendChild(el("p", "carte-niveau", "Difficulté " + etoiles));
      carte.appendChild(el("div", "carte-score",
        meilleur ? ((meilleur.gagne ? "✅ Gagné " : "Pas encore gagné · ") + meilleur.nous + " – " + meilleur.eux) :
                   (ouvert ? "À jouer" : "🔒 Gagne le match d'avant")));
      var b = el("button", "gros", ouvert ? "▶ Jouer" : "🔒");
      b.disabled = !ouvert;
      b.onclick = function () { M.avant(i); };
      carte.appendChild(b);
      zone.appendChild(carte);
    });
    majBoutonNoms();
    $("btn-fin-tournoi").hidden = !J.progression.termine(matchs());
    ecran("ecran-menu");
  };

  // Choix des noms : prénoms du manga ou d'« Olive et Tom »
  function majBoutonNoms() {
    var b = $("btn-noms"); if (!b) { return; }
    var fr = J.noms.mode() === "francais";
    b.textContent = "🔤 Noms : " + (fr ? "Olivier, Ben… (Olive et Tom)" : "Tsubasa, Misaki… (manga)") + " — changer";
    b.onclick = function () { J.noms.fixer(fr ? "manga" : "francais"); M.menu(); };
  }

  /* ---------- avant le match ---------- */
  M.avant = function (i) {
    if (J.sons) { J.sons.annulerAttentes(); } musique("histoire");
    IDX = i;
    var m = matchs()[i], p = J.config.matchs[m.id] || {};
    if (J.grosplan && J.grosplan.preparer) { J.grosplan.preparer(m); }      // décode les images pendant que l'élève lit
    $("av-titre").textContent = (p.auto ? "Match d'essai" : m.tour) + " : " + nomEquipe() + " – " + R.eq(m.adversaire);
    var pro = $("av-prologue"); vider(pro);
    var prologue = (i === 0 && !J.progression.prologueVu());
    if (J.histoire) {
      if (prologue) { J.histoire.afficher($("av-image"), "prologue", "avant", J.championnat.prologue.image); }
      else { J.histoire.afficher($("av-image"), m.id, "avant", m.image); }
    }
    if (prologue) {
      J.championnat.prologue.texte.forEach(function (t) { pro.appendChild(el("p", "", tx(t))); });
    }
    $("av-contexte").textContent = tx(m.contexte);
    var regle = $("av-regle"); vider(regle);
    var lignes = p.auto ?
      ["C'est un match d'essai : à chaque action, tu réponds à une question. Pas de choix à faire.",
       "Le jeu regarde comment tu lis, puis règle la difficulté pour la suite.",
       "Si tu te trompes, tu as une deuxième chance avec un indice."] :
      ["À chaque action, tu choisis ton geste : une passe, un lob, un dribble… Plus le geste est risqué, plus la question est difficile.",
       "Une bonne réponse fait avancer le ballon. Deux erreurs : ballon perdu.",
       "L'énergie (⚡) permet les gestes forts. Les bonnes réponses en redonnent." +
         ((p.sanctions && p.sanctions.length) ? " Attention : trop de questions ratées, et l'arbitre sanctionne ton équipe !" : "")];
    lignes.forEach(function (t) { regle.appendChild(el("li", "", t)); });
    $("btn-ecouter-avant").onclick = function () { J.audio.lire(tx((i === 0 ? J.championnat.prologue.texte.join(" ") + " " : "") + m.contexte)); };
    $("btn-coup-envoi").onclick = function () { J.audio.stop(); J.progression.marquerPrologue(); M.demarrer(i); };
    $("btn-retour-avant").onclick = function () { J.audio.stop(); M.menu(); };
    ecran("ecran-avant");
  };

  /* ---------- démarrage ---------- */
  M.demarrer = function (i) {
    IDX = i;
    if (J.sons) { J.sons.annulerAttentes(); } son("sifflet-debut"); musique(musiqueMatch());
    S = R.nouveau(matchs()[i], { calibrage: J.progression.calibrage() });
    if (J.grosplan && J.grosplan.preparer) { J.grosplan.preparer(S.def); }
    Q = null;
    ecran("ecran-match");
    tour();
  };

  /* ---------- tableau du haut et scène ---------- */
  function libelleMi() {
    return S.mi === 1 ? "1re mi-temps" : (S.mi === 2 ? "2e mi-temps" : "Prolongation");
  }
  function majHud() {
    $("hud-score").textContent = nomEquipe() + " " + S.score.nous + " – " + S.score.eux + " " + adv();
    $("hud-temps").textContent = libelleMi() + " · " + R.minute(S) + "'";
    var g = $("hud-energie-barre"); g.style.width = Math.round(100 * S.energie / J.config.energie.max) + "%";
    $("hud-energie-nombre").textContent = String(S.energie);
    var sa = $("hud-sanctions");
    if (sa) {
      var t = "";
      if (S.jaunes) { t += "🟨".repeat(S.jaunes) + " "; }
      if (S.blesses) { t += "🩹".repeat(S.blesses) + " "; }
      if (S.rouges) { t += "🟥".repeat(S.rouges) + " "; }
      if (S.equipe.length < 11) { t += S.equipe.length + " joueurs"; }
      sa.textContent = t; sa.hidden = !t;
    }
  }
  function bandeau() {
    var b = $("m-bandeau");
    if (S.poss === "nous") { b.textContent = "⚽ " + R.nom(S.porteur) + "   contre   " + R.nomAdv(S, S.adv); }
    else { b.textContent = "🛡️ " + R.nom(S.porteur) + "   face à   " + R.nomAdv(S, S.adv); }
  }
  function dessinerCarte(candidats) {
    bandeau();
    J.terrain.dessiner($("m-canvas"), S, { candidats: candidats });
  }
  function narration(t) { $("m-narration").textContent = t || ""; }

  /* ---------- un tour : menu d'actions ou question directe ---------- */
  function tour() {
    if (S.etat === "mitemps") { return ecranMiTemps(); }
    if (S.etat === "prolongation") { return ecranProlongation(); }
    if (S.etat === "fin") { return finMatch(); }
    majHud();
    dessinerCarte();
    if (root.scrollTo) { root.scrollTo(0, 0); }          // nouvelle action : on remonte en haut de l'écran
    var ph = R.phase(S);
    if (ph === "gardien") {
      narration("Le tir part vers notre but ! Arrêt du gardien.");
      return engager("gardien");
    }
    if (S.p.auto) {
      var a = R.autoAction(S);
      narration(a === "passe" ? R.nom(S.porteur) + " a le ballon." :
                a === "tir" ? "Face au but : " + R.nom(S.porteur) + " va tirer !" :
                a === "bloquer" ? R.nomAdv(S, S.adv) + " va tirer : il faut le bloquer !" :
                R.nomAdv(S, S.adv) + " a le ballon et attaque.");
      return engager(a, a === "passe" ? R.candidats(S)[0] : null);
    }
    narration(ph === "attaque" ? nomEquipe() + " a le ballon." : adv() + " attaque !");
    menu(ph);
  }

  // Le menu d'actions « en contexte » : les gestes avec le vrai nom du partenaire.
  // Plus le geste est risqué (étoiles), plus la question sera difficile.
  function menu(ph) {
    var p = $("m-panneau"); vider(p);
    $("ecran-match").className = "ecran etat-menu";
    p.appendChild(el("div", "titre-menu", ph === "attaque" ? "Que fais-tu avec le ballon ?" : "Comment reprendre le ballon ?"));
    p.appendChild(el("div", "sous-titre-menu", ph === "attaque" ?
      R.nomNum(S.porteur) + " a le ballon face à " + R.nomAdv(S, S.adv) + ". Choisis ton geste." :
      R.nomAdv(S, S.adv) + " attaque. Tu défends avec " + R.nomNum(S.porteur) + ". Récupérer le ballon est plus difficile que de le garder."));
    var cands = (ph === "attaque") ? R.candidats(S) : null;
    dessinerCarte(cands);
    var liste = el("div", "actions");
    R.actionsDisponibles(S).forEach(function (a) {
      var b = el("button", "action");
      b.disabled = !a.dispo;
      b.appendChild(el("span", "action-icone", a.icone));
      var t = el("span", "action-texte");
      t.appendChild(el("strong", "", a.texte));
      var info = a.dispo ? a.aide : a.raison;
      t.appendChild(el("small", "", info));
      b.appendChild(t);
      var d = el("span", "action-cout");
      d.textContent = "★".repeat(a.etoiles) + "☆".repeat(3 - a.etoiles) + (a.cout ? "  ⚡ " + a.cout : "");
      d.title = "Difficulté du geste" + (a.cout ? " et énergie dépensée" : "");
      b.appendChild(d);
      b.onclick = function () { engager(a.id, a.cible); };
      liste.appendChild(b);
    });
    p.appendChild(liste);
    p.appendChild(el("div", "aide-etoiles", "★ = difficulté de la question · ⚡ = énergie dépensée"));
  }

  /* ---------- une question ---------- */
  function etiquette(item) {
    if (item.type === "passe") { return item.indices ? "Indices" : "Commentaire du match"; }
    if (item.type === "defense" || item.type === "gardien") { return "Consigne de l'entraîneur"; }
    if (item.type === "dribble") { return "Phrase de départ"; }
    return "Texte";
  }

  function engager(geste, cible) {
    var action = geste;
    R.engager(S, geste, cible);
    var niveau = R.niveau(S, geste);
    var g = R.geste(geste);
    var item = J.banque.choisir(R.typeQuestion(geste), niveau, {
      tags: S.def.tags || [], exclus: S.exclus, revoir: J.progression.revoir(), dernierRate: S.dernierRate,
      base: R.base(S, cible), special: g.special || null
    });
    S.exclus.push(item.id);
    var ordre = [], k;
    for (k = 0; k < item.options.length; k++) { ordre.push(k); }
    if (item.format !== "vrai-faux-nsp") { ordre = melange(ordre); }
    Q = { item: item, action: action, niveau: niveau, essai: 1, ordre: ordre, barre: {}, off: {}, sel: {},
          verrou: false, hint: false, aide: false, cible: cible || null };
    majHud();
    afficherQuestion();
  }

  function nbIndices() {
    var n = J.config.indicesAuDepart + (Q.essai - 1);
    return Math.min(Q.item.indices.length, n);
  }

  function remplirTextes(surligne) {
    var it = Q.item;
    if (Q.elConsigne) { remplirTexte(Q.elConsigne, it.consigne, it.mot, surligne); }
    if (Q.elSituation) { remplirTexte(Q.elSituation, it.situation, it.mot, surligne); }
    if (Q.elIndices) {
      vider(Q.elIndices);
      var n = Q.verrou ? it.indices.length : nbIndices(), k;
      for (k = 0; k < n; k++) {
        var ligne = el("div", "indice" + (k === n - 1 && Q.essai > 1 && !Q.verrou ? " nouveau" : ""));
        ligne.appendChild(el("span", "indice-num", "Indice " + (k + 1)));
        var t = el("span", "indice-txt"); remplirTexte(t, it.indices[k], it.mot, surligne);
        ligne.appendChild(t);
        Q.elIndices.appendChild(ligne);
      }
    }
  }

  function afficherQuestion() {
    var it = Q.item, p = $("m-panneau"); vider(p);
    $("ecran-match").className = "ecran etat-question";
    var lib = R.libelle(Q.action);
    var puce = el("div", "puce-action");
    puce.appendChild(el("span", "", lib.icone + " " + lib.texte + (Q.cible ? " : " + R.nom(Q.cible) : "")));
    puce.appendChild(el("span", "puce-niveau", "niveau " + Q.niveau));
    if (!R.secondeChance(S, Q.action)) { puce.appendChild(el("span", "puce-unique", "⚠ Une seule chance !")); }
    p.appendChild(puce);

    Q.elConsigne = Q.elSituation = Q.elIndices = null;
    if (it.consigne) {
      var boite = el("div", "boite-consigne");
      boite.appendChild(el("div", "etiquette", etiquette(it)));
      Q.elConsigne = el("div", "texte-consigne");
      boite.appendChild(Q.elConsigne);
      if (it.situation) { Q.elSituation = el("div", "situation"); boite.appendChild(Q.elSituation); }
      p.appendChild(boite);
    }
    if (it.indices) { Q.elIndices = el("div", "bloc-indices"); p.appendChild(Q.elIndices); }
    remplirTextes(false);

    p.appendChild(el("div", "question-grosse", it.question));
    if (it.format === "barrer") {
      p.appendChild(el("div", "aide-format", "Plusieurs réponses sont possibles : touche toutes les bonnes."));
    }

    var zone = el("div", "options"); Q.elOptions = zone; Q.lignes = [];
    Q.ordre.forEach(function (reel, k) {
      var ligne = el("div", "opt-ligne");
      var b = el("button", "option", it.options[reel]);
      b.onclick = function () { cliquerOption(k); };
      var x = el("button", "croix", "✖");
      x.title = "Barrer cette réponse (pour t'aider à réfléchir)";
      x.onclick = function () {
        if (Q.verrou) { return; }
        Q.barre[k] = !Q.barre[k];
        ligne.className = "opt-ligne" + (Q.barre[k] ? " barree" : "");
        if (Q.barre[k]) { indiceCroix(k); }
      };
      ligne.appendChild(b); ligne.appendChild(x);
      zone.appendChild(ligne);
      Q.lignes.push({ ligne: ligne, bouton: b, croix: x });
    });
    p.appendChild(zone);

    Q.btnValider = null;
    if (it.format === "barrer") {
      Q.btnValider = el("button", "gros valider", "✔ Valider ma réponse");
      Q.btnValider.disabled = true;
      Q.btnValider.onclick = function () { validerSelection(); };
      p.appendChild(Q.btnValider);
    }

    Q.elFeedback = el("div", "feedback"); p.appendChild(Q.elFeedback);
    Q.elRemede = el("div", "remediation"); p.appendChild(Q.elRemede);
    Q.btnSuite = el("button", "gros suite", "Continuer ▶"); Q.btnSuite.hidden = true;
    Q.btnSuite.onclick = continuer;
    p.appendChild(Q.btnSuite);
    p.appendChild(outils());
    dessinerCarte();
    majOutils();
  }

  /* Barrer une réponse donne un coup de pouce gratuit : le mot clé s'allume dans le texte.
     Réglage « croix » de data/config.js : "neutre" = toujours la même réaction (la solution ne se devine pas) ;
     "reactif" = on est averti si on barre la bonne réponse. */
  function indiceCroix(k) {
    if (Q.hint) { return; }
    if (J.config.croix === "reactif" && estBonne(Q.ordre[k]) && Q.item.format !== "barrer") {
      Q.elFeedback.className = "feedback ko";
      Q.elFeedback.textContent = "🤔 Es-tu sûr de vouloir barrer celle-là ? Relis le mot en jaune.";
      Q.hint = true; remplirTextes(true); return;
    }
    Q.hint = true; remplirTextes(true);
    Q.elFeedback.className = "feedback ok";
    Q.elFeedback.textContent = "💡 Coup de pouce : le mot important est en jaune. Cherche-le dans chaque réponse.";
  }

  /* ---------- boutons d'aide ---------- */
  function outils() {
    var o = el("div", "outils");
    var ec = el("button", "petit", "🔊 Écouter"); ec.onclick = function () { J.audio.lire(textePourLire()); };
    var va = el("button", "petit", "📺 Aide VAR"); va.onclick = ouvrirVAR;
    var ve = el("button", "petit", "🎽 Vestiaire"); ve.onclick = ouvrirVestiaire;
    var ca = el("button", "petit", "📒 Carnet"); ca.onclick = ouvrirCarnet;
    Q.btnGuts = el("button", "petit guts", "⭐ Éliminer une erreur (⚡ " + J.config.energie.aideEliminer + ")");
    Q.btnGuts.onclick = aideEnergie;
    [ec, va, ve, ca, Q.btnGuts].forEach(function (b) { o.appendChild(b); });
    return o;
  }
  function majOutils() {
    if (!Q.btnGuts) { return; }
    var ok = !Q.verrou && !Q.aide && Q.item.format !== "barrer" && S.energie >= J.config.energie.aideEliminer;
    Q.btnGuts.disabled = !ok;
  }
  function aideEnergie() {
    if (Q.verrou || Q.aide || Q.item.format === "barrer") { return; }
    var restants = [];
    Q.ordre.forEach(function (reel, k) { if (reel !== Q.item.bonne && !Q.off[k]) { restants.push(k); } });
    if (restants.length < 2) { return; }          // il doit rester au moins 2 choix
    if (!R.aideEnergie(S)) { return; }
    var k = restants[Math.floor(J.alea() * restants.length)];
    Q.off[k] = true; Q.aide = true;
    marquerFausse(k);
    majHud(); majOutils();
    Q.elFeedback.className = "feedback ok";
    Q.elFeedback.textContent = "⭐ Une mauvaise réponse est éliminée !";
  }
  function textePourLire() {
    var it = Q.item, t = [];
    if (it.consigne) { t.push(etiquette(it)); t.push(it.consigne); }
    if (it.situation) { t.push(it.situation); }
    if (it.indices) { for (var k = 0; k < (Q.verrou ? it.indices.length : nbIndices()); k++) { t.push("Indice " + (k + 1) + ". " + it.indices[k]); } }
    t.push(it.question);
    Q.ordre.forEach(function (reel, j) { t.push("Choix " + (j + 1) + ". " + it.options[reel]); });
    return t.join(" ... ");
  }
  function varMethode() {
    var par = { passe: 0, defense: 1, dribble: 2, tir: 3, gardien: 3 };
    var pal = J.paliers[par[Q ? Q.item.type : "defense"] || 0];
    return pal.methode;
  }
  function ouvrirVAR() {
    var ul = $("liste-methode"); vider(ul);
    varMethode().forEach(function (m) { ul.appendChild(el("li", "", m)); });
    $("modal-var").hidden = false;
  }
  function ouvrirVestiaire() {
    var t = $("table-vestiaire"); vider(t);
    J.vestiaire.forEach(function (v) {
      var tr = el("tr"); tr.appendChild(el("th", "", v.mot)); tr.appendChild(el("td", "", v.sens)); t.appendChild(tr);
    });
    $("modal-vestiaire").hidden = false;
  }
  function ouvrirCarnet() {
    var ul = $("liste-carnet"); vider(ul);
    var c = J.progression.carnet();
    $("carnet-vide").hidden = c.length > 0;
    c.sort(function (a, b) { return (a.maitrisee ? 1 : 0) - (b.maitrisee ? 1 : 0); });
    c.forEach(function (r) {
      var li = el("li", r.maitrisee ? "maitrisee" : "");
      li.appendChild(el("span", "carnet-etat", r.maitrisee ? "✅" : "🔁"));
      li.appendChild(el("span", "", J.regles_texte[r.regle] || r.regle));
      ul.appendChild(li);
    });
    $("modal-carnet").hidden = false;
  }

  /* ---------- réponse ---------- */
  function lignesRestantes() { return Q.lignes; }
  function bloquerOptions(oui) {
    Q.lignes.forEach(function (l, k) { l.bouton.disabled = oui || !!Q.off[k]; l.croix.disabled = oui; });
  }
  function marquerFausse(k) {
    Q.lignes[k].bouton.className = "option fausse";
    Q.lignes[k].bouton.disabled = true;
  }
  function bonnes() { return (Q.item.bonne instanceof Array) ? Q.item.bonne : [Q.item.bonne]; }
  function estBonne(reel) { return bonnes().indexOf(reel) >= 0; }

  function cliquerOption(k) {
    if (Q.verrou || Q.off[k]) { return; }
    if (Q.item.format === "barrer") {
      Q.sel[k] = !Q.sel[k];
      Q.lignes[k].bouton.className = "option" + (Q.sel[k] ? " retenue" : "");
      var n = 0, j; for (j in Q.sel) { if (Q.sel[j]) { n++; } }
      Q.btnValider.disabled = (n === 0);
      return;
    }
    valider(Q.ordre[k] === Q.item.bonne, k);
  }
  function validerSelection() {
    if (Q.verrou) { return; }
    var ok = true;
    Q.ordre.forEach(function (reel, k) { if (!!Q.sel[k] !== estBonne(reel)) { ok = false; } });
    valider(ok, null);
  }

  function valider(ok, k) {
    R.reponse(S, Q.essai, ok);
    son(ok ? "bonne-reponse" : "mauvaise-reponse");
    majHud();
    if (ok) { return terminer(Q.essai === 1 ? "premier" : "second"); }
    if (Q.essai === 1 && R.secondeChance(S, Q.action)) {
      Q.essai = 2; Q.hint = true;
      sonApres("indice", 350);
      if (k !== null) { Q.off[k] = true; marquerFausse(k); }
      remplirTextes(true);
      Q.elFeedback.className = "feedback ko";
      Q.elFeedback.textContent = "Pas tout à fait… Tu as une deuxième chance ! " +
        (Q.item.mot ? "💡 Regarde le mot en jaune." : "💡 Relis lentement, mot par mot.") +
        (Q.item.indices ? " Un nouvel indice est apparu." : "");
      bloquerOptions(false);
      majOutils();
      return;
    }
    terminer("rate");
  }

  function terminer(issue) {
    Q.verrou = true;
    var it = Q.item, ok = (issue !== "rate");
    bloquerOptions(true);
    Q.ordre.forEach(function (reel, k) {
      var b = Q.lignes[k].bouton;
      if (estBonne(reel)) { b.className = "option bonne"; }
      else if (it.format === "barrer" ? Q.sel[k] : Q.off[k]) { b.className = "option fausse"; }
      else if (!ok && it.format === "barrer") { b.className = "option"; }
    });
    remplirTextes(true);
    J.progression.noterRegle(it.regle, issue === "premier");
    if (issue === "rate") { S.dernierRate = it.id; if (S.reglesRatees.indexOf(it.regle) < 0) { S.reglesRatees.push(it.regle); } }

    var ev = R.conclure(S, Q.action, issue, Q.cible);
    Q.ev = ev;

    // correction courte : 1 ligne si réussi du premier coup, 2 si deuxième chance, 3 si raté
    var e = it.explication, r = Q.elRemede; vider(r);
    Q.elFeedback.className = "feedback " + (ok ? "ok" : "ko");
    Q.elFeedback.textContent = (issue === "premier") ? "✔ Bien joué !" :
                               (issue === "second") ? "✔ Réussi à la deuxième chance." : "✖ Raté… mais regarde pourquoi :";
    if (issue === "rate") { r.appendChild(ligneRemede("✔", "Bonne réponse", e.bonne, "bonne")); }
    r.appendChild(ligneRemede("🔑", "Le mot qui décide", e.cle, "cle"));
    if (issue !== "premier") { r.appendChild(ligneRemede("✖", "Le piège", e.piege, "piege")); }
    if (issue !== "premier") { r.appendChild(el("div", "regle", "📒 Règle : " + (J.regles_texte[it.regle] || ""))); }

    Q.btnSuite.hidden = false;
    Q.btnSuite.textContent = (S.etat === "fin") ? "Voir le résultat ▶" : "Continuer ▶";
    majOutils();

    narration(ev.texte);
    sonsAction(ev);
    if (ev.sanction) {
      var sa = el("div", "sanction sanction-" + ev.sanction.type, ev.sanction.texte);
      Q.elRemede.appendChild(sa);
      majHud(); dessinerCarte();
    }
    // petit écran : la scène est empilée au-dessus des questions, on la ramène à l'écran
    var scn = $("m-scene");
    if (root.innerWidth < 880 && scn && scn.getBoundingClientRect().top < 0 && scn.scrollIntoView) { scn.scrollIntoView(true); }
    var g = ev.gros; g.but = ev.but;
    g.niveau = it.niveau;                 // pour choisir le tir (au sol, volée, tête, ciseau)
    g.matchId = S.def.id;                 // pour les couleurs et les joueurs de l'adversaire
    J.grosplan.jouer($("m-canvas"), g, function () { majHud(); });
  }
  function ligneRemede(icone, titre, texte, classe) {
    var l = el("div", "ligne-remede " + classe);
    l.appendChild(el("span", "remede-icone", icone));
    var t = el("span", "remede-texte");
    t.appendChild(el("strong", "", titre + " : "));
    t.appendChild(doc.createTextNode(texte));
    l.appendChild(t);
    return l;
  }

  function continuer() {
    J.audio.stop(); J.grosplan.arreter();
    $("m-canvas").onclick = null;
    majHud();
    tour();
  }

  /* ---------- mi-temps, prolongation ---------- */
  function ecranMiTemps() {
    son("sifflet-mitemps"); musique("mi-temps");
    majHud(); dessinerCarte(); narration("");
    var p = $("m-panneau"); vider(p);
    $("ecran-match").className = "ecran etat-pause";
    p.appendChild(el("div", "titre-menu", "⏸ Mi-temps"));
    p.appendChild(el("div", "score-pause", nomEquipe() + " " + S.score.nous + " – " + S.score.eux + " " + adv()));
    p.appendChild(el("p", "texte-pause", "Du premier coup, tu as bien répondu à " + S.stats.premier + " question" +
      (S.stats.premier > 1 ? "s" : "") + " sur " + S.stats.q + "."));
    var d = el("p", "texte-pause",
      S.stats.rate > 0 ? "Pense à relire la question en entier avant de choisir : les erreurs viennent souvent d'un petit mot."
                       : "Continue comme ça : tu lis bien.");
    p.appendChild(d);
    var b = el("button", "gros", "Reprendre ▶");
    b.onclick = function () { musique(musiqueMatch()); R.secondeMiTemps(S); tour(); };
    p.appendChild(b);
  }
  function ecranProlongation() {
    son("prolongation"); musique("match-tension");
    majHud(); dessinerCarte(); narration("");
    var p = $("m-panneau"); vider(p);
    $("ecran-match").className = "ecran etat-pause";
    p.appendChild(el("div", "titre-menu", "⏱ Prolongation !"));
    p.appendChild(el("div", "score-pause", nomEquipe() + " " + S.score.nous + " – " + S.score.eux + " " + adv()));
    p.appendChild(el("p", "texte-pause", "Égalité ! Le premier qui marque gagne le match."));
    var b = el("button", "gros", "C'est parti ▶");
    b.onclick = function () { R.prolongation(S); tour(); };
    p.appendChild(b);
  }

  /* ---------- fin du match ---------- */
  function finMatch() {
    var res = S.resultat, m = matchs()[IDX];
    son("sifflet-fin");
    var p = J.config.matchs[m.id] || {};
    // Le match d'essai ne bloque jamais : il sert à régler le niveau, on passe au suivant quoi qu'il arrive
    var pris = (p.auto) ? { nous: res.nous, eux: res.eux, gagne: true } : res;
    J.progression.enregistrerMatch(m.id, pris);
    var calib = null;
    if (p.auto) { calib = R.calibrer(res); J.progression.fixerCalibrage(calib); }

    $("fin-titre").textContent = res.gagne ? "🏆 Victoire !" : (res.nul ? "🤝 Égalité" : "Match perdu");
    $("fin-score").textContent = nomEquipe() + " " + res.nous + " – " + res.eux + " " + R.eq(m.adversaire);
    var pct = res.total ? Math.round(100 * res.premier / res.total) : 0;
    var msg = p.auto ? "Match d'essai terminé : le jeu a réglé le niveau. Le championnat commence !" :
              res.gagne ? "Bravo, tu as gagné ce match !" :
              res.nul ? "Égalité : rejoue pour décrocher la victoire." :
                        "Pas cette fois. Rejoue : chaque match te fait progresser !";
    $("fin-message").textContent = msg;
    var det = $("fin-details"); vider(det);
    det.appendChild(el("li", "", "Bonnes réponses du premier coup : " + res.premier + " sur " + res.total + " (" + pct + " %)"));
    if (res.second) { det.appendChild(el("li", "", "Réussies à la deuxième chance : " + res.second)); }
    if (calib !== null) {
      det.appendChild(el("li", "", calib > 0 ? "Niveau de départ réglé : un peu plus difficile pour la suite."
        : calib < 0 ? "Niveau de départ réglé : un peu plus doux pour la suite."
        : "Niveau de départ réglé : le niveau normal te va bien."));
    }
    var rev = $("fin-regles"); vider(rev);
    $("fin-regles-bloc").hidden = !S.reglesRatees.length;
    S.reglesRatees.slice(0, 3).forEach(function (r) { rev.appendChild(el("li", "", J.regles_texte[r] || r)); });

    // Intermède après une victoire : image + petit texte d'histoire
    var victoire = !!(res.gagne || p.auto), histoire = $("fin-histoire"), derniere = (IDX === matchs().length - 1);
    if (victoire && J.histoire && m.apres) {
      J.histoire.afficher($("fin-image"), m.id, "apres", m.image + "-victoire");
      histoire.textContent = tx(m.apres); histoire.hidden = false;
    } else {
      if (J.histoire) { J.histoire.arreter(); }
      $("fin-image").hidden = true; histoire.hidden = true;
    }
    var suivant = matchs()[IDX + 1];
    $("btn-suivant").hidden = !(victoire && suivant);
    $("btn-fin-championnat").hidden = !(res.gagne && derniere);
    $("btn-fin-championnat").onclick = function () { M.finChampionnat(); };
    $("btn-suivant").onclick = function () { M.avant(IDX + 1); };
    $("btn-rejouer").onclick = function () { M.demarrer(IDX); };
    $("btn-retour-menu").onclick = function () { M.menu(); };
    ecran("ecran-fin");
    musique((res.gagne || p.auto) ? "victoire" : "defaite", { apres: 1800, boucle: false });
  }

  /* ---------- fin du championnat ---------- */
  M.finChampionnat = function () {
    var f = J.championnat.fin, texte = $("ch-texte"), bilan = $("ch-bilan"), tous = [];
    J.audio.stop(); if (J.sons) { J.sons.annulerAttentes(); } son("victoire-tournoi"); musique("fin-championnat", { apres: 2500, boucle: false });
    $("ch-titre").textContent = f.titre;
    if (J.histoire) { J.histoire.afficher($("ch-image"), "fin", "apres", "histoire-07-fin"); }
    vider(texte); f.texte.forEach(function (t) { texte.appendChild(el("p", "", tx(t))); tous.push(tx(t)); });
    vider(bilan); bilan.appendChild(el("strong", "", "Ton parcours :"));
    var ul = el("ul"); bilan.appendChild(ul);
    matchs().forEach(function (m) {
      var r = J.progression.match(m.id);
      ul.appendChild(el("li", "", R.eq(m.adversaire) + " : " + (r ? (r.nous + " – " + r.eux) : "—")));
    });
    $("btn-ecouter-fin").onclick = function () { J.audio.lire(tous.join(" ")); };
    $("btn-ch-recommencer").onclick = function () { recommencer(); };
    $("btn-ch-menu").onclick = function () { M.menu(); };
    ecran("ecran-championnat");
  };
  function recommencer() {
    if (root.confirm("Recommencer le championnat depuis le premier match ? Ton carnet de règles est gardé.")) {
      J.progression.recommencerChampionnat(); M.menu();
    }
  }

  /* ---------- branchements fixes ---------- */
  M.brancher = function () {
    $("btn-menu").onclick = function () {
      if (root.confirm("Quitter le match ? Il sera perdu.")) { J.grosplan.arreter(); J.audio.stop(); M.menu(); }
    };
    $("btn-vestiaire-menu").onclick = ouvrirVestiaire;
    $("btn-recommencer").onclick = recommencer;
    $("btn-fin-tournoi").onclick = function () { M.finChampionnat(); };
    $("btn-carnet-menu").onclick = ouvrirCarnet;
    $("btn-reset").onclick = function () {
      if (root.confirm("Effacer toute ma progression ?")) { J.progression.effacer(); M.menu(); }
    };
    var f = doc.querySelectorAll("[data-fermer]"), i;
    for (i = 0; i < f.length; i++) {
      f[i].onclick = function () {
        $("modal-var").hidden = true; $("modal-vestiaire").hidden = true; $("modal-carnet").hidden = true;
      };
    }
  };

  // pour les tests automatiques
  M._etat = function () { return { S: S, Q: Q }; };
  M._finMatch = function () { return finMatch(); };
  M._tour = function () { return tour(); };
})(typeof window !== "undefined" ? window : this);
