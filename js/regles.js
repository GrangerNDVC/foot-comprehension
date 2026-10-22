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
  // Les noms passent par J.noms : prénoms du manga ou d'« Olive et Tom », au choix de l'élève
  function N() { return J.noms; }
  R.nom = function (n) { return N() ? (N().joueur(n)) : (R.joueur(n) ? R.joueur(n).nom : "n°" + n); };
  R.nomNum = function (n) { return R.nom(n) + " (" + n + ")"; };
  R.eq = function (x) { return N() ? N().equipe(x) : x; };
  R.nomAdv = function (s, n) { return R.eq(s.def.adversaire) + " n°" + n; };

  /* ---------- choix des joueurs selon la position du ballon ---------- */
  function surLeTerrain(s) { return (s && s.equipe) || cfg().titulaires; }
  function titulairesPar(s, postes) {
    return surLeTerrain(s).filter(function (n) {
      var j = R.joueur(n);
      return j && postes.indexOf(j.poste) >= 0;
    });
  }
  R.choisirNous = function (s, sauf) {
    var pos = s.pos, N = s.N, liste;
    if (pos <= 1) { liste = titulairesPar(s, ["défenseur"]); }
    else if (pos <= N - 3) { liste = titulairesPar(s, ["milieu"]); }
    else { liste = titulairesPar(s, ["attaquant", "milieu"]); }
    liste = liste.filter(function (n) { return n !== sauf; });
    if (!liste.length) { liste = surLeTerrain(s).filter(function (n) { return n !== 1 && n !== sauf; }); }
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
    return R.choisirNous({ pos: s.pos <= 1 ? 0 : (s.pos <= s.N - 3 ? 2 : s.N), N: s.N, equipe: s.equipe });
  }

  R.candidatsPasse = function (s) {
    var tous = surLeTerrain(s).filter(function (n) { return n !== 1 && n !== s.porteur; });
    var sortie = [];
    // le partenaire du duo (une-deux) est toujours proposé quand le porteur en fait partie
    var pa = R.partenaire(s);
    if (pa) { sortie.push(pa); tous = tous.filter(function (n) { return n !== pa; }); }
    while (sortie.length < 3 && tous.length) {
      var k = Math.floor(alea() * tous.length);
      sortie.push(tous.splice(k, 1)[0]);
    }
    sortie.sort(function (a, b) { return a - b; });
    return sortie;
  };
  // Le partenaire de duo du porteur, s'il est sur le terrain (sinon null)
  R.partenaire = function (s) {
    var d = cfg().duos || [], i, p = null;
    for (i = 0; i < d.length; i++) {
      if (d[i][0] === s.porteur) { p = d[i][1]; } else if (d[i][1] === s.porteur) { p = d[i][0]; }
    }
    return (p && surLeTerrain(s).indexOf(p) >= 0) ? p : null;
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
      sanctions: p.sanctions || [],
      defenseBonus: p.defenseBonus || 0,                    // niveau en plus pour les questions de défense
      tirNiveau: (p.tirNiveau != null) ? p.tirNiveau : null,        // difficulté du geste « tir » (et de l'arrêt du gardien) dans ce match
      montee: (p.montee != null) ? p.montee : (cfg().montee || 0)   // niveaux gagnés entre le début et la fin du match
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
      energie: c.energie.depart,
      equipe: c.titulaires.slice(), banc: (c.banc || []).slice(), sortis: [],
      rates: 0, jaunes: 0, rouges: 0, blesses: 0,
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
    s.candidats = null;
    if (s.poss === "nous") { s.porteur = R.choisirNous(s); s.adv = advEnFace(s); }
    else { s.adv = R.choisirAdv(s); s.porteur = nousEnFace(s); }
  };

  R.phase = function (s) {
    if (s.poss === "nous") { return "attaque"; }
    return s.tirAdverse ? "gardien" : "defense";
  };

  /* ---------- commandes disponibles ---------- */
  var LIBELLES = {
    passe:   { texte: "Passer",           icone: "➡️" },
    dribble: { texte: "Dribbler",         icone: "💨" },
    tir:     { texte: "Tirer",            icone: "🥅" },
    couper:  { texte: "Couper la passe",  icone: "✋" },
    tacler:  { texte: "Tacler",           icone: "🦵" },
    bloquer: { texte: "Bloquer le tir",   icone: "🛡️" },
    degager: { texte: "Dégager",          icone: "🚀" },
    gardien: { texte: "Arrêt du gardien", icone: "🧤" }
  };
  var ICONES = { passe: "➡️", lob: "🌈", uneDeux: "🔁", dribble: "💨", tir: "🥅", couper: "✋", tacler: "🦵",
                 contre: "⚔️", bloquer: "🛡️", degager: "🚀", gardien: "🧤" };
  R.geste = function (id) { return cfg().gestes[id] || { action: id, texte: id, niveau: 0, cout: 0 }; };
  R.libelle = function (id) {
    var g = R.geste(id);
    return { texte: g.texte, icone: ICONES[id] || (LIBELLES[g.action] || {}).icone || "⚽" };
  };

  R.autoAction = function (s) {
    var ph = R.phase(s);
    if (ph === "gardien") { return "gardien"; }
    if (ph === "attaque") { return (s.pos >= s.N - 1) ? "tir" : "passe"; }
    return (s.pos <= 1) ? "bloquer" : "couper";
  };

  // Les partenaires proposés pour la passe (les mêmes pendant tout le tour)
  R.candidats = function (s) {
    if (!s.candidats) { s.candidats = R.candidatsPasse(s); }
    return s.candidats;
  };
  // Étoiles de difficulté d'un geste : 1 (facile) à 3
  R.difficulte = function (id) { return Math.max(1, Math.min(3, 1 + (R.geste(id).niveau || 0))); };

  /* Les choix du menu pour la phase en cours.
     Chaque choix : { id: geste, cible: n°|null, texte, icone, aide, cout, dispo, raison, etoiles, avance } */
  R.actionsDisponibles = function (s) {
    var ph = R.phase(s), sortie = [];
    var liste = (ph === "attaque") ? s.p.actionsAttaque : s.p.actionsDefense;
    if (ph === "gardien") { liste = ["gardien"]; }
    function ajouter(id, cible, texte) {
      var g = R.geste(id), cout = g.cout || 0, dispo = true, raison = "";
      if (cout > s.energie) { dispo = false; raison = "Pas assez d'énergie"; }
      if (g.action === "tir" && s.pos < s.N - 2) { dispo = false; raison = "Trop loin du but"; }
      if (g.action === "bloquer" && s.pos > 1) { dispo = false; raison = "Pas de tir à bloquer"; }
      if (g.action === "passe" && g.avance > 1 && s.pos + g.avance > s.N - 1 && s.pos + 1 <= s.N - 1) { /* passe longue : plafonnée au dernier cran */ }
      sortie.push({ id: id, cible: cible || null, texte: texte || g.texte, icone: (R.libelle(id).icone), aide: g.aide || "",
                    cout: cout, dispo: dispo, raison: raison, etoiles: R.difficulte(id), avance: g.avance || g.gain || 0 });
    }
    var cands = (ph === "attaque") ? R.candidats(s) : [], pa = R.partenaire(s);
    liste.forEach(function (id) {
      var g = R.geste(id);
      if (g.action === "passe") {
        if (g.special) {                        // une-deux : seulement avec le partenaire du duo
          if (pa) { ajouter(id, pa, g.texte + " avec " + R.nom(pa) + " (" + pa + ")"); }
          return;
        }
        var autres = cands.filter(function (n) { return n !== pa || !liste.some(function (x) { return R.geste(x).special; }); });
        // la passe courte est proposée à deux partenaires, le lob à un seul (le plus avancé)
        var offre = liste.indexOf("lob") >= 0;
        var n1 = (id === "lob") ? autres.slice(-1) : autres.slice(0, offre ? Math.max(1, Math.min(2, autres.length - 1)) : 2);
        n1.forEach(function (n) { ajouter(id, n, g.texte + (id === "lob" ? " vers " : " à ") + R.nomNum(n)); });
      } else { ajouter(id, null, g.texte); }
    });
    return sortie;
  };

  R.engager = function (s, id, cible) {
    var g = R.geste(id);
    s.energie = borne(s.energie - (g.cout || 0), 0, cfg().energie.max);
    s.geste = id; s.action = g.action;
  };

  /* ---------- niveau de la question ---------- */
  // Le niveau = niveau du match + réglage + niveau du geste (plus il est risqué, plus la question est difficile)
  R.niveau = function (s, id) {
    var g = R.geste(id), a = cfg().niveauAction, gn = g.niveau || 0;
    if (g.action === "tir" || g.action === "gardien") {                                // le gardien : exactement aussi difficile que notre tir
      gn = (s.p.tirNiveau != null) ? s.p.tirNiveau : (R.geste("tir").niveau || 0);
    }
    if (s.p.auto) { gn = Math.min(gn, 1); }                                           // match d'essai : jamais très dur
    var n = s.p.niveauBase + s.calibrage + s.ajust + gn + R.montee(s);
    if (g.action === "dribble" && s.pos >= s.N - 2) { n += a.dribbleProche; }
    if (g.action === "tir" && s.pos < s.N - 1) { n += a.tirLointain; }
    if (R.typeQuestion(id) === "defense" && g.action !== "gardien") { n += s.p.defenseBonus; }
    return borne(n, 1, 5);
  };
  // Niveaux gagnés grâce à l'avancée du match (0 au début, jusqu'à s.p.montee à la fin) : les textes s'allongent, les phrases se compliquent
  R.montee = function (s) {
    var m = s.p.montee || 0, total = 2 * s.p.actionsParMiTemps;
    if (!m || !total) { return 0; }
    var avance = Math.min(1, (s.stats.q || 0) / total);
    return Math.min(m, Math.floor(avance * (m + 1)));
  };
  // Y a-t-il une deuxième chance pour cette action ? (tir et gardien : non, sauf au match d'essai)
  R.secondeChance = function (s, id) {
    var action = R.geste(id).action, l = cfg().sansSecondeChance || [];
    return s.p.auto || l.indexOf(action) < 0;
  };

  // type de question (banque) pour chaque action
  R.typeQuestion = function (id) {
    var action = R.geste(id).action;
    if (action === "passe") { return "passe"; }
    if (action === "dribble") { return "dribble"; }
    if (action === "tir") { return "tir"; }
    if (action === "gardien") { return "gardien"; }
    return "defense";
  };

  /* ---------- une réponse (première ou deuxième tentative) ---------- */
  R.reponse = function (s, essai, ok) {
    var c = cfg();
    if (ok) { s.energie = borne(s.energie + (essai === 1 ? c.energie.gainPremierEssai : c.energie.gainDeuxiemeEssai), 0, c.energie.max); }
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

  R.aideEnergie = function (s) {
    var cout = cfg().energie.aideEliminer;
    if (s.energie < cout) { return false; }
    s.energie -= cout;
    return true;
  };

  /* ---------- le contexte de la question : qui joue, contre qui (pour écrire les noms) ---------- */
  R.base = function (s, cible) {
    var advs = [], k;
    for (k = 2; k <= 11; k++) { if (k !== s.adv) { advs.push(k); } }
    return { porteur: s.porteur, cible: cible || null, equipe: s.equipe.slice(), adv: s.adv, advListe: advs };
  };

  /* ---------- fin d'une question : le ballon bouge ---------- */
  // id : le geste choisi ; issue : "premier" | "second" (bonne réponse) | "rate" (deux erreurs)
  R.conclure = function (s, id, issue, cible) {
    var N = s.N, ok = (issue !== "rate"), g = R.geste(id), action = g.action;
    var ev = { action: action, geste: id, ok: ok, but: null, texte: "", gros: { type: action, ok: ok }, sanction: null };
    // Pour les gros plans : qui est en jeu AVANT que le ballon bouge
    ev.gros.porteur = s.porteur; ev.gros.adv = s.adv; ev.gros.cible = cible || null;
    var nomP = R.nom(s.porteur), nomA = R.nomAdv(s, s.adv);
    var nous = R.eq(s.def.equipe || (J.championnat ? J.championnat.equipe : "Nankatsu"));
    var eux = R.eq(s.def.adversaire);

    s.stats.q++; s.stats[issue]++;
    s.tirAdverse = (action === "gardien") ? false : s.tirAdverse;

    if (action === "passe") {
      if (ok) {
        var dest = cible || R.choisirNous(s, s.porteur);
        s.pos = Math.min(N - 1, s.pos + (g.avance || 1));
        ev.texte = (id === "uneDeux") ? nomP + " et " + R.nom(dest) + " se font un une-deux : le ballon file !" :
                   (id === "lob") ? nomP + " lobe le ballon vers " + R.nom(dest) + " !" :
                   nomP + " passe à " + R.nom(dest) + ".";
        ev.gros.cible = dest;
        s.porteur = dest; s.adv = advEnFace(s); s.candidats = null;
      } else {
        ev.texte = nomA + " intercepte la passe de " + nomP + " !";
        perdre(s);
      }
    } else if (action === "dribble") {
      if (ok) {
        s.pos = Math.min(N - 1, s.pos + (g.avance || 2));
        ev.texte = nomP + " dribble " + nomA + " et file en avant !";
        s.adv = advEnFace(s); s.candidats = null;
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
      var contre = (id === "contre");
      if (ok) {
        ev.texte = contre ? "Quel contre de " + nomP + " ! " + nous + " récupère le ballon et file en avant !" :
                            "Beau tacle de " + nomP + " ! " + nous + " récupère le ballon.";
        gagner(s, g.gain || 1);
      } else { ev.texte = contre ? nomA + " passe en force : le contre de " + nomP + " échoue, " + eux + " fonce vers notre but !" : nomA + " évite le tacle !"; avancerAdversaire(s, ev, g.recul); }
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
    if (!ok) { ev.sanction = sanctionner(s, ev.gros.porteur); }
    s.stats.derniere = ev.texte;
    R.temps(s);
    return ev;
  };

  /* ---------- les sanctions (cartons, blessure) ---------- */
  // Appelée à chaque question ratée ; renvoie { type, n, remplacant, texte } ou null
  function sanctionner(s, nPorteur) {
    var c = cfg().sanctions, actives = s.p.sanctions || [], i, st = null;
    s.rates++;
    for (i = 0; i < c.suite.length; i++) { if (c.suite[i].a === s.rates) { st = c.suite[i]; } }
    if (!st || actives.indexOf(st.t) < 0) { return null; }
    var cible = nPorteur;
    if (!cible || cible === 1 || s.equipe.indexOf(cible) < 0) {
      var libres = s.equipe.filter(function (n) { return n !== 1; });
      cible = hasard(libres);
    }
    var nom = R.nom(cible), out = { type: st.t, n: cible, remplacant: null, texte: "" };
    if (st.t === "jaune") {
      s.jaunes++; s.energie = borne(s.energie - c.jauneEnergie, 0, cfg().energie.max);
      out.texte = "🟨 Carton jaune pour " + nom + " ! L'arbitre le prévient : l'équipe perd un peu d'énergie.";
    } else if (st.t === "blessure") {
      s.blesses++; s.energie = borne(s.energie - c.blessureEnergie, 0, cfg().energie.max);
      var banc = s.banc.filter(function (n) { return n !== cible; });
      if (banc.length) {
        out.remplacant = banc[0]; s.banc = s.banc.filter(function (n) { return n !== banc[0]; });
        s.equipe[s.equipe.indexOf(cible)] = out.remplacant; s.sortis.push(cible);
        s.place = s.place || {}; s.place[out.remplacant] = (s.place[cible] || cible);
        out.texte = "🩹 " + nom + " est blessé et sort. " + R.nom(out.remplacant) + " entre en jeu.";
      } else { out.texte = "🩹 " + nom + " est un peu touché : l'équipe perd de l'énergie."; }
    } else if (st.t === "rouge") {
      if (s.equipe.length <= c.minJoueurs) { return null; }
      s.rouges++; s.equipe = s.equipe.filter(function (n) { return n !== cible; }); s.sortis.push(cible);
      out.texte = "🟥 Carton rouge pour " + nom + " ! " + nous10(s) + " L'adversaire attaque plus près de notre but.";
    }
    s.candidats = null;
    if (s.equipe.indexOf(s.porteur) < 0) { R.placer(s); }
    return out;
  }
  function nous10(s) { return R.eq("Nankatsu") + " joue à " + s.equipe.length + "."; }

  function departAdv(s) { return Math.max(0, s.p.departAdv - (s.rouges || 0)); }

  // Notre ballon perdu : l'adversaire l'a là où il a été perdu
  function perdre(s) {
    s.poss = "eux"; s.tirAdverse = false; s.defOk = 0;
    s.pos = Math.min(s.pos, s.p.contre);
    s.adv = R.choisirAdv(s); s.porteur = nousEnFace(s);
  }
  // Énergie à zéro quand on a le ballon : l'équipe est essoufflée, l'adversaire récupère le ballon (pas au match d'essai).
  // Renvoie true si le ballon vient d'être perdu. L'énergie remonte un peu pour ne pas recommencer tout de suite.
  R.epuise = function (s) {
    if (s.p.auto || s.poss !== "nous" || s.energie > 0 || s.etat !== "jeu") { return false; }
    s.energie = cfg().energie.reprise || 10;
    s.stats.epuise = (s.stats.epuise || 0) + 1;
    perdre(s);
    return true;
  };
  // Ballon récupéré (bonus = crans gagnés en même temps)
  function gagner(s, bonus) {
    s.poss = "nous"; s.tirAdverse = false; s.defOk = 0;
    s.pos = Math.min(s.N - 1, s.pos + bonus);
    R.placer(s);
  }
  // Défense ratée : l'adversaire avance, ou tire s'il est déjà tout près
  function avancerAdversaire(s, ev, crans) {
    var n = crans || 1;
    s.defOk = 0;
    if (s.pos <= 1 || s.pos - n < 1) { s.tirAdverse = true; ev.texte += " Il tire !"; }
    else { s.pos = s.pos - n; s.adv = R.choisirAdv(s); }
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
