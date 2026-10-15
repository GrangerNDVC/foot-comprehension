/* ============================================================
   LES RÈGLES DU MATCH (aucune image, aucun écran : seulement la logique)
   Tout se règle dans data/config.js.

   Le terrain est une ligne de positions 0 … N. 0 = devant notre but, N = devant le but adverse.
   - Nous attaquons : pos augmente à chaque passe réussie.
   - Ils attaquent : pos diminue quand notre défense échoue.
   Une « action » = une question. Chaque question compte dans le temps du match.

   Cycle d'une question :
     R.actionsDisponibles(s)  -> les commandes possibles
     R.engager(s, action)     -> on choisit (les guts sont dépensés)
     R.niveau(s, action)      -> niveau de la question à poser
     R.reponse(s, essai, ok)  -> on enregistre la réponse (guts gagnés, réglage du niveau)
     R.conclure(s, action, issue, cible)  -> issue : "premier" | "second" | "rate" ; renvoie l'événement
   ============================================================ */
(function (root) {
  var J = root.JEU = root.JEU || {};
  var R = J.regles = {};

  function alea() { return (J.alea || Math.random)(); }
  function hasard(t) { return t[Math.floor(alea() * t.length)]; }
  function borne(x, a, b) { return Math.max(a, Math.min(b, x)); }
  function cfg() { return J.config; }
  function joueurs() { return (J.championnat && J.championnat.joueurs) || []; }

  /* ---------- noms ---------- */
  R.joueur = function (n) {
    var l = joueurs(), i;
    for (i = 0; i < l.length; i++) { if (l[i].n === n) { return l[i]; } }
    return null;
  };
  R.nom = function (n) { var j = R.joueur(n); return j ? (n + " " + j.nom) : ("n°" + n); };
  R.nomAdv = function (s, n) { return s.def.adversaire + " n°" + n; };

  /* ---------- choix des joueurs selon la position du ballon ---------- */
  function titulairesPar(postes) {
    return cfg().titulaires.filter(function (n) {
      var j = R.joueur(n);
      return j && postes.indexOf(j.poste) >= 0;
    });
  }
  R.choisirNous = function (s, sauf) {
    var pos = s.pos, N = s.N, liste;
    if (pos <= 1) { liste = titulairesPar(["défenseur"]); }
    else if (pos <= N - 3) { liste = titulairesPar(["milieu"]); }
    else { liste = titulairesPar(["attaquant", "milieu"]); }
    liste = liste.filter(function (n) { return n !== sauf; });
    if (!liste.length) { liste = cfg().titulaires.filter(function (n) { return n !== 1 && n !== sauf; }); }
    return hasard(liste);
  };
  // Adversaires numérotés 1 (gardien), 2-5 défenseurs, 6-8 milieux, 9-11 attaquants
  R.choisirAdv = function (s) {
    var pos = s.pos, N = s.N, liste;
    if (pos <= 2) { liste = [9, 10, 11]; }
    else if (pos <= N - 3) { liste = [6, 7, 8]; }
    else { liste = [2, 3, 4, 5]; }
    return hasard(liste);
  };
  // Adversaire qui se trouve en face de notre porteur : l'inverse
  function advEnFace(s) {
    var pos = s.pos, N = s.N;
    if (pos >= N - 2) { return hasard([2, 3, 4, 5]); }
    if (pos >= 3) { return hasard([6, 7, 8]); }
    return hasard([9, 10, 11]);
  }
  // Notre défenseur qui se trouve en face du porteur adverse
  function nousEnFace(s) {
    return R.choisirNous({ pos: s.pos <= 1 ? 0 : (s.pos <= s.N - 3 ? 2 : s.N), N: s.N });
  }

  R.candidatsPasse = function (s) {
    var tous = cfg().titulaires.filter(function (n) { return n !== 1 && n !== s.porteur; });
    var sortie = [];
    while (sortie.length < 3 && tous.length) {
      var k = Math.floor(alea() * tous.length);
      sortie.push(tous.splice(k, 1)[0]);
    }
    sortie.sort(function (a, b) { return a - b; });
    return sortie;
  };

  /* ---------- création d'un match ---------- */
  function paramsDuMatch(def) {
    var p = cfg().matchs[def.id] || {};
    return {
      nom: p.nom || def.tour,
      auto: !!p.auto,
      niveauBase: (p.niveauBase != null) ? p.niveauBase : def.niveau,
      actionsAttaque: p.actionsAttaque || ["passe", "dribble", "tir"],
      actionsDefense: p.actionsDefense || ["couper", "tacler", "bloquer", "degager"],
      actionsParMiTemps: p.actionsParMiTemps || 8,
      prolongation: p.prolongation || 0,
      defenseRequise: p.defenseRequise || 1,       // bonnes réponses de suite pour récupérer le ballon en « coupant »
      departAdv: (p.departAdv != null) ? p.departAdv : 2,   // position du ballon quand l'adversaire engage (0 = devant notre but)
      contre: (p.contre != null) ? p.contre : 1,            // position du ballon quand on perd la balle en attaquant (contre-attaque)
      contreTir: (p.contreTir != null) ? p.contreTir : 2,   // position après un tir raté (remise en jeu du gardien)
      defenseBonus: p.defenseBonus || 0                     // niveau en plus pour les questions de défense et de gardien
    };
  }

  R.nouveau = function (def, opts) {
    opts = opts || {};
    var c = cfg(), p = paramsDuMatch(def);
    var s = {
      def: def, p: p, N: c.terrain.zones, milieu: c.terrain.milieu,
      calibrage: p.auto ? 0 : (opts.calibrage || 0),
      score: { nous: 0, eux: 0 },
      mi: 1,                         // 1 et 2 = mi-temps ; 3 = prolongation
      restantes: p.actionsParMiTemps,
      faites: 0,                     // questions posées dans la période en cours
      poss: "nous", pos: c.terrain.milieu,
      tirAdverse: false, defOk: 0,
      porteur: null, adv: null,      // numéros affichés dans le bandeau
      guts: c.guts.depart,
      ajust: 0, serieOk: 0, serieKo: 0,
      stats: { q: 0, premier: 0, second: 0, rate: 0 },
      exclus: [], reglesRatees: [],
      etat: "jeu",                   // jeu | mitemps | fin
      resultat: null
    };
    R.placer(s);
    return s;
  };

  // Choisit le porteur et l'adversaire en face selon la possession et la position
  R.placer = function (s) {
    if (s.poss === "nous") { s.porteur = R.choisirNous(s); s.adv = advEnFace(s); }
    else { s.adv = R.choisirAdv(s); s.porteur = nousEnFace(s); }
  };

  R.phase = function (s) {
    if (s.poss === "nous") { return "attaque"; }
    return s.tirAdverse ? "gardien" : "defense";
  };

  /* ---------- commandes disponibles ---------- */
  var LIBELLES = {
    passe:   { texte: "Passer",           icone: "➡️", aide: "Sûr : le ballon avance d'un cran" },
    dribble: { texte: "Dribbler",         icone: "💨", aide: "Le ballon avance de deux crans" },
    tir:     { texte: "Tirer",            icone: "🥅", aide: "Marque si tu réponds bien" },
    couper:  { texte: "Couper la passe",  icone: "✋", aide: "Récupère le ballon" },
    tacler:  { texte: "Tacler",           icone: "🦵", aide: "Récupère le ballon et file en avant" },
    bloquer: { texte: "Bloquer le tir",   icone: "🛡️", aide: "Seulement quand l'adversaire va tirer" },
    degager: { texte: "Dégager",          icone: "🚀", aide: "Éloigne le danger" },
    gardien: { texte: "Arrêt du gardien", icone: "🧤", aide: "" }
  };
  R.libelle = function (a) { return LIBELLES[a]; };

  R.autoAction = function (s) {
    var ph = R.phase(s);
    if (ph === "gardien") { return "gardien"; }
    if (ph === "attaque") { return (s.pos >= s.N - 1) ? "tir" : "passe"; }
    return (s.pos <= 1) ? "bloquer" : "couper";
  };

  R.actionsDisponibles = function (s) {
    var ph = R.phase(s), c = cfg(), sortie = [];
    var liste = (ph === "attaque") ? s.p.actionsAttaque : s.p.actionsDefense;
    if (ph === "gardien") { liste = ["gardien"]; }
    liste.forEach(function (a) {
      var cout = c.guts.cout[a] || 0, dispo = true, raison = "";
      if (cout > s.guts) { dispo = false; raison = "Pas assez de guts"; }
      if (a === "tir" && s.pos < s.N - 2) { dispo = false; raison = "Trop loin du but"; }
      if (a === "bloquer" && s.pos > 1) { dispo = false; raison = "Pas de tir à bloquer"; }
      sortie.push({ id: a, texte: LIBELLES[a].texte, icone: LIBELLES[a].icone, aide: LIBELLES[a].aide,
                    cout: cout, dispo: dispo, raison: raison });
    });
    return sortie;
  };

  R.engager = function (s, action) {
    var c = cfg();
    s.guts = borne(s.guts - (c.guts.cout[action] || 0), 0, c.guts.max);
    s.action = action;
  };

  /* ---------- niveau de la question ---------- */
  R.niveau = function (s, action) {
    var a = cfg().niveauAction, n = s.p.niveauBase + s.calibrage + s.ajust;
    if (action === "dribble") { n += (s.pos >= s.N - 2) ? a.dribbleProche : a.dribble; }
    else if (action === "tir") { n += (s.pos >= s.N - 1) ? a.tir : a.tirLointain; }
    else { n += a[action] || 0; }
    if (R.typeQuestion(action) === "defense") { n += s.p.defenseBonus; }
    return borne(n, 1, 5);
  };

  // type de question (banque) pour chaque action
  R.typeQuestion = function (action) {
    if (action === "passe") { return "passe"; }
    if (action === "dribble") { return "dribble"; }
    if (action === "tir") { return "tir"; }
    return "defense";
  };

  /* ---------- une réponse (première ou deuxième tentative) ---------- */
  R.reponse = function (s, essai, ok) {
    var c = cfg();
    if (ok) { s.guts = borne(s.guts + (essai === 1 ? c.guts.gainPremierEssai : c.guts.gainDeuxiemeEssai), 0, c.guts.max); }
    if (essai !== 1) { return; }
    var a = c.adaptatif;
    if (ok) {
      s.serieOk++; s.serieKo = 0;
      if (s.serieOk >= a.reussites) { s.ajust = Math.min(a.max, s.ajust + 1); s.serieOk = 0; }
    } else {
      s.serieKo++; s.serieOk = 0;
      if (s.serieKo >= a.echecs) { s.ajust = Math.max(a.min, s.ajust - 1); s.serieKo = 0; }
    }
  };

  R.aideGuts = function (s) {
    var cout = cfg().guts.aideEliminer;
    if (s.guts < cout) { return false; }
    s.guts -= cout;
    return true;
  };

  /* ---------- fin d'une question : le ballon bouge ---------- */
  // issue : "premier" | "second" (bonne réponse) | "rate" (deux erreurs)
  R.conclure = function (s, action, issue, cible) {
    var N = s.N, ok = (issue !== "rate");
    var ev = { action: action, ok: ok, but: null, texte: "", gros: { type: action, ok: ok } };
    // Pour les gros plans : qui est en jeu AVANT que le ballon bouge (chantier 4)
    ev.gros.porteur = s.porteur; ev.gros.adv = s.adv; ev.gros.cible = cible || null;
    var nomP = R.nom(s.porteur), nomA = R.nomAdv(s, s.adv);
    var nous = s.def.equipe || (J.championnat ? J.championnat.equipe : "Nankatsu");
    var eux = s.def.adversaire;

    s.stats.q++; s.stats[issue]++;
    s.tirAdverse = (action === "gardien") ? false : s.tirAdverse;

    if (action === "passe") {
      if (ok) {
        var dest = cible || R.choisirNous(s, s.porteur);
        s.pos = Math.min(N - 1, s.pos + 1);
        ev.texte = nomP + " passe à " + R.nom(dest) + ".";
        ev.gros.cible = dest;
        s.porteur = dest; s.adv = advEnFace(s);
      } else {
        ev.texte = nomA + " intercepte la passe de " + nomP + " !";
        perdre(s);
      }
    } else if (action === "dribble") {
      if (ok) {
        s.pos = Math.min(N - 1, s.pos + 2);
        ev.texte = nomP + " dribble " + nomA + " et file en avant !";
        s.adv = advEnFace(s);
      } else {
        ev.texte = nomA + " reprend le ballon à " + nomP + " !";
        perdre(s);
      }
    } else if (action === "tir") {
      if (ok) {
        s.score.nous++; ev.but = "nous";
        ev.texte = "BUT de " + nous + " ! " + nomP + " marque !";
        s.poss = "eux"; s.pos = departAdv(s); s.tirAdverse = false; s.defOk = 0; R.placer(s);
      } else {
        ev.texte = "Le tir de " + nomP + " est arrêté par " + eux + ".";
        s.poss = "eux"; s.pos = s.p.contreTir; s.defOk = 0; R.placer(s);
      }
    } else if (action === "couper") {
      if (ok) {
        s.defOk++;
        if (s.defOk >= s.p.defenseRequise) {
          ev.texte = nomP + " coupe la passe : " + nous + " récupère le ballon !";
          gagner(s, 0);
        } else {
          s.pos = Math.min(s.N - 2, s.pos + 1); s.adv = R.choisirAdv(s);
          ev.texte = nomP + " gêne la passe : l'attaque est repoussée, mais " + eux + " garde le ballon.";
        }
      } else { ev.texte = nomA + " passe et avance vers notre but !"; avancerAdversaire(s, ev); }
    } else if (action === "tacler") {
      if (ok) {
        ev.texte = "Beau tacle de " + nomP + " ! " + nous + " récupère le ballon.";
        gagner(s, 1);
      } else { ev.texte = nomA + " évite le tacle !"; avancerAdversaire(s, ev); }
    } else if (action === "bloquer") {
      if (ok) {
        ev.texte = nomP + " bloque le tir !";
        gagner(s, 1);
      } else { ev.texte = "Le tir de " + nomA + " n'est pas bloqué : il part vers le but !"; s.tirAdverse = true; }
    } else if (action === "degager") {
      if (ok) {
        s.pos = Math.min(N - 2, s.pos + 2);
        ev.texte = nomP + " dégage : le danger s'éloigne.";
        s.adv = R.choisirAdv(s);
      } else { ev.texte = "Dégagement raté ! " + nomA + " revient."; avancerAdversaire(s, ev); }
    } else if (action === "gardien") {
      if (ok) {
        ev.texte = "Arrêt de " + R.nom(1) + " ! " + nous + " garde son but.";
        gagner(s, 0); s.pos = Math.max(s.pos, 2);
        ev.gros.type = "gardien";
      } else {
        s.score.eux++; ev.but = "eux";
        ev.texte = "BUT de " + eux + "... " + nomA + " a marqué.";
        s.poss = "nous"; s.pos = s.milieu; s.tirAdverse = false; R.placer(s);
      }
    }
    ev.gros.but = ev.but;
    s.stats.derniere = ev.texte;
    R.temps(s);
    return ev;
  };

  function departAdv(s) { return s.p.departAdv; }

  // Notre ballon perdu : l'adversaire l'a là où il a été perdu
  function perdre(s) {
    s.poss = "eux"; s.tirAdverse = false; s.defOk = 0;
    s.pos = Math.min(s.pos, s.p.contre);
    s.adv = R.choisirAdv(s); s.porteur = nousEnFace(s);
  }
  // Ballon récupéré (bonus = crans gagnés en même temps)
  function gagner(s, bonus) {
    s.poss = "nous"; s.tirAdverse = false; s.defOk = 0;
    s.pos = Math.min(s.N - 1, s.pos + bonus);
    R.placer(s);
  }
  // Défense ratée : l'adversaire avance, ou tire s'il est déjà tout près
  function avancerAdversaire(s, ev) {
    s.defOk = 0;
    if (s.pos <= 1) { s.tirAdverse = true; ev.texte += " Il tire !"; }
    else { s.pos = s.pos - 1; s.adv = R.choisirAdv(s); }
  }

  /* ---------- le temps ---------- */
  R.temps = function (s) {
    s.faites++; s.restantes--;
    if (s.mi === 3 && s.score.nous !== s.score.eux) { return finDeMatch(s); }      // but en or
    if (s.restantes > 0) { return; }
    if (s.mi === 1) { s.etat = "mitemps"; return; }
    if (s.mi === 2 && s.score.nous === s.score.eux && s.p.prolongation > 0) { s.etat = "prolongation"; return; }
    finDeMatch(s);
  };
  function finDeMatch(s) {
    s.etat = "fin";
    s.resultat = {
      nous: s.score.nous, eux: s.score.eux,
      gagne: s.score.nous > s.score.eux,
      nul: s.score.nous === s.score.eux,
      premier: s.stats.premier, second: s.stats.second, rate: s.stats.rate, total: s.stats.q
    };
  }
  R.secondeMiTemps = function (s) {
    s.mi = 2; s.restantes = s.p.actionsParMiTemps; s.faites = 0; s.etat = "jeu";
    s.poss = "eux"; s.pos = departAdv(s); s.tirAdverse = false; s.defOk = 0; R.placer(s);
  };
  R.prolongation = function (s) {
    s.mi = 3; s.restantes = s.p.prolongation; s.faites = 0; s.etat = "jeu";
    s.poss = "nous"; s.pos = s.milieu; s.tirAdverse = false; R.placer(s);
  };

  // Minute affichée
  R.minute = function (s) {
    var base = (s.mi === 1) ? 0 : (s.mi === 2 ? 45 : 90);
    var duree = (s.mi === 3) ? 15 : 45;
    var total = (s.mi === 3) ? s.p.prolongation : s.p.actionsParMiTemps;
    return Math.min(base + duree, base + Math.round(duree * s.faites / total));
  };

  /* Réglage du niveau de départ après le match d'essai : -1, 0 ou +1 */
  R.calibrer = function (res) {
    var c = cfg().calibrage;
    if (!res.total) { return 0; }
    var taux = res.premier / res.total;
    if (taux >= c.tauxHaut) { return 1; }
    if (taux <= c.tauxBas) { return -1; }
    return 0;
  };
})(typeof window !== "undefined" ? window : this);
