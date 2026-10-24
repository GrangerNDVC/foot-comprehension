/* ============================================================
   COMPTES ÉLÈVES (chantier 13) : numéro à 4 chiffres, reprise de partie, espace enseignant caché.

   Principes
   - Le jeu marche toujours sans réseau et sans compte : la mémoire principale reste le localStorage
     (js/progression.js). Firebase n'en garde qu'une COPIE, dans la Realtime Database du projet LEXICA,
     à l'adresse  jeux/foot/<numéro>.
   - Les scripts Firebase (version « compat » 8.10.1, sans modules) ne sont chargés que quand un élève
     tape un numéro. Avec « Jouer sans compte », rien n'est chargé et rien n'est envoyé.
   - À chaque connexion : lecture de la copie du cloud, FUSION avec celle de l'appareil (on ne perd jamais
     de progression), puis envoi. On n'écrit jamais dans le cloud avant d'avoir lu et fusionné.
   - Envois économes : 5 s après la dernière modification (20 s au plus pendant un match).
     La connexion est coupée entre deux envois (l'offre gratuite limite à 100 connexions simultanées).
   - Rien dans ce fichier n'écrit dans la console du navigateur.

   Espace enseignant : bouton discret en bas à droite. Verrou (empreinte seulement, jamais le mot de passe
   en clair), puis vraie connexion Firebase de l'enseignante : ce sont les RÈGLES FIREBASE qui réservent la
   liste et la suppression à son compte, pas ce verrou.
   ============================================================ */
(function (root) {
  var J = root.JEU = root.JEU || {};
  var C = J.compte = {};
  var doc = root.document;
  function $(id) { return doc.getElementById(id); }
  function P() { return J.progression; }

  /* Configuration publique du projet LEXICA (sans danger dans le code : la sécurité vient des règles Firebase). */
  var CONFIG = {
    apiKey: "AIzaSyBwoQqcFCH7ssSUyGkFd52v6Wam1O4WiVw",
    authDomain: "lexica-488e9.firebaseapp.com",
    databaseURL: "https://lexica-488e9-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "lexica-488e9",
    storageBucket: "lexica-488e9.firebasestorage.app",
    messagingSenderId: "3644116964",
    appId: "1:3644116964:web:5ae47e4211bb5603c301f1"
  };
  var SDK = "https://www.gstatic.com/firebasejs/8.10.1/";
  var CHEMIN = "jeux/foot";                       // un futur jeu : jeux/<son-nom>
  var CLE_LOCALE = "foot-comprehension-v2-c";     // + numéro
  var VERROU = "0cf5528810cedb60df632119333b85a5100c856ce9c7e52562349e29f30dd399";                        // empreinte du verrou (SHA-256), pas le mot de passe
  var SEL = "foot-prof-v1:";

  /* ---------- petits outils ---------- */
  function el(tag, classe, texte) {
    var e = doc.createElement(tag);
    if (classe) { e.className = classe; }
    if (texte !== undefined) { e.textContent = texte; }
    return e;
  }
  function vider(e) { while (e.firstChild) { e.removeChild(e.firstChild); } }
  function avecDelai(promesse, ms) {
    return new Promise(function (resolve, reject) {
      var fini = false, t = setTimeout(function () { if (!fini) { fini = true; reject(new Error("delai")); } }, ms);
      promesse.then(function (v) { if (!fini) { fini = true; clearTimeout(t); resolve(v); } },
                    function (e) { if (!fini) { fini = true; clearTimeout(t); reject(e); } });
    });
  }
  // Texte stable (clés triées) pour comparer deux objets
  function stable(x) {
    if (x === null || typeof x !== "object") { return JSON.stringify(x); }
    if (x instanceof Array) { return "[" + x.map(stable).join(",") + "]"; }
    return "{" + Object.keys(x).sort().map(function (k) { return JSON.stringify(k) + ":" + stable(x[k]); }).join(",") + "}";
  }

  /* SHA-256 en JavaScript simple (marche partout, même sans https) */
  function sha256(texte) {
    var s = unescape(encodeURIComponent(String(texte)));
    var K = [], H = [], i, j, p = 2, n = 0;
    function rr(v, a) { return (v >>> a) | (v << (32 - a)); }
    while (n < 64) {
      var premier = true;
      for (j = 2; j * j <= p; j++) { if (p % j === 0) { premier = false; break; } }
      if (premier) {
        if (n < 8) { H[n] = (Math.pow(p, 0.5) * 4294967296) | 0; }
        K[n++] = (Math.pow(p, 1 / 3) * 4294967296) | 0;
      }
      p++;
    }
    var octets = [];
    for (i = 0; i < s.length; i++) { octets.push(s.charCodeAt(i)); }
    var bits = s.length * 8;
    octets.push(0x80);
    while (octets.length % 64 !== 56) { octets.push(0); }
    for (i = 7; i >= 0; i--) { octets.push(i >= 4 ? 0 : (bits >>> (i * 8)) & 255); }
    for (var b = 0; b < octets.length; b += 64) {
      var w = [];
      for (i = 0; i < 16; i++) { w[i] = (octets[b + i * 4] << 24) | (octets[b + i * 4 + 1] << 16) | (octets[b + i * 4 + 2] << 8) | octets[b + i * 4 + 3]; }
      for (i = 16; i < 64; i++) {
        var s0 = rr(w[i - 15], 7) ^ rr(w[i - 15], 18) ^ (w[i - 15] >>> 3);
        var s1 = rr(w[i - 2], 17) ^ rr(w[i - 2], 19) ^ (w[i - 2] >>> 10);
        w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0;
      }
      var a = H[0], bb = H[1], c = H[2], d = H[3], e = H[4], f = H[5], g = H[6], h = H[7];
      for (i = 0; i < 64; i++) {
        var S1 = rr(e, 6) ^ rr(e, 11) ^ rr(e, 25), ch = (e & f) ^ (~e & g);
        var t1 = (h + S1 + ch + K[i] + w[i]) | 0;
        var S0 = rr(a, 2) ^ rr(a, 13) ^ rr(a, 22), maj = (a & bb) ^ (a & c) ^ (bb & c);
        var t2 = (S0 + maj) | 0;
        h = g; g = f; f = e; e = (d + t1) | 0; d = c; c = bb; bb = a; a = (t1 + t2) | 0;
      }
      H[0] = (H[0] + a) | 0; H[1] = (H[1] + bb) | 0; H[2] = (H[2] + c) | 0; H[3] = (H[3] + d) | 0;
      H[4] = (H[4] + e) | 0; H[5] = (H[5] + f) | 0; H[6] = (H[6] + g) | 0; H[7] = (H[7] + h) | 0;
    }
    var hex = "";
    for (i = 0; i < 8; i++) { hex += ("00000000" + (H[i] >>> 0).toString(16)).slice(-8); }
    return hex;
  }
  C._sha256 = sha256;   // pour les tests automatiques

  /* ---------- état du compte ---------- */
  var numero = null;        // numéro de l'élève connecté (null = sans compte)
  var etat = "sans";        // sans | attente | ok | hors
  var session = 0;          // change à chaque changement d'élève : les opérations en retard sont ignorées
  var fusionFaite = false;  // on n'écrit jamais avant d'avoir lu et fusionné
  var enCours = false, fileRappels = [];
  var minuteur = null, debutAttente = 0, relance = null, aPousser = false;
  var fb = null, db = null, auth = null, ops = 0, coupure = null;

  C.numero = function () { return numero; };
  C.etat = function () { return etat; };
  C.disponible = function () { return !!(root.location && root.location.protocol !== "file:"); };

  function texteEtat() {
    if (!numero) { return "Sans compte : ta partie reste sur cet appareil."; }
    var t = "☁ Élève " + numero + " · ";
    if (etat === "ok") { return t + "partie sauvegardée ✔"; }
    if (etat === "attente") { return t + "sauvegarde…"; }
    return t + "hors connexion (ta partie reste ici et sera envoyée plus tard)";
  }
  function afficherEtat() { var e = $("compte-etat"); if (e) { e.textContent = texteEtat(); e.className = "compte-etat compte-" + (numero ? etat : "sans"); } }
  function fixerEtat(x) { etat = x; afficherEtat(); }
  C.texteEtat = texteEtat;

  /* ---------- chargement de Firebase (seulement quand il sert) ---------- */
  function chargerScript(url, fin) {
    var s = doc.createElement("script"), fait = false;
    function ok(v) { if (!fait) { fait = true; clearTimeout(t); fin(v); } }
    var t = setTimeout(function () { ok(new Error("delai")); }, 12000);
    s.onload = function () { ok(null); };
    s.onerror = function () { ok(new Error("reseau")); };
    s.src = url; doc.head.appendChild(s);
  }
  function charger(fin) {
    if (root.firebase && root.firebase.database && root.firebase.auth) { fin(null); return; }
    chargerScript(SDK + "firebase-app.js", function (e1) {
      if (e1) { fin(e1); return; }
      chargerScript(SDK + "firebase-auth.js", function (e2) {
        if (e2) { fin(e2); return; }
        chargerScript(SDK + "firebase-database.js", function (e3) { fin(e3 || null); });
      });
    });
  }
  function init() {
    fb = root.firebase;
    if (!fb.apps.length) { fb.initializeApp(CONFIG); }
    if (!auth) { auth = fb.auth(); }
    if (!db) { db = fb.database(); db.goOffline(); }   // la connexion ne s'ouvre que pendant un échange
  }
  function ouvrir() { ops++; clearTimeout(coupure); coupure = null; try { db.goOnline(); } catch (e) {} }
  function fermer() {
    ops = Math.max(0, ops - 1);
    if (ops === 0) { clearTimeout(coupure); coupure = setTimeout(function () { if (ops === 0) { try { db.goOffline(); } catch (e) {} } }, 3000); }
  }
  function premierEtat() {
    return new Promise(function (resolve) {
      var off = auth.onAuthStateChanged(function (u) { off(); resolve(u); });
    });
  }
  // S'assure d'être connecté de façon anonyme (jamais avec le compte enseignant)
  function preparer(fin) {
    charger(function (err) {
      if (err) { fin(err); return; }
      try { init(); } catch (e) { fin(e); return; }
      avecDelai(premierEtat(), 8000).then(function (u) {
        if (u && !u.email) { return u; }
        var avant = u ? auth.signOut() : Promise.resolve();
        return avant.then(function () { return auth.signInAnonymously(); });
      }).then(function () { fin(null); }, function (e) { fin(e || new Error("auth")); });
    });
  }

  /* ---------- synchronisation ---------- */
  function terminer(ok) {
    enCours = false;
    var q = fileRappels; fileRappels = [];
    if (!ok && numero) { fixerEtat("hors"); }
    q.forEach(function (f) { try { f(ok); } catch (e) {} });
  }
  function synchroniser(rappel) {
    if (!numero) { if (rappel) { rappel(false); } return; }
    if (rappel) { fileRappels.push(rappel); }
    if (enCours) { return; }
    enCours = true; fixerEtat("attente");
    var n = numero, jeton = session;
    function perime() { return n !== numero || jeton !== session; }
    preparer(function (err) {
      if (err || perime()) { terminer(false); return; }
      ouvrir();
      var ref = db.ref(CHEMIN + "/" + n);
      var lecture = fusionFaite ? Promise.resolve(null) : avecDelai(ref.once("value"), 10000);
      lecture.then(function (snap) {
        if (perime()) { throw new Error("perime"); }
        if (!fusionFaite) {
          var distant = null;
          if (snap && snap.exists()) {
            var v = snap.val();
            try { distant = JSON.parse(v.donnees); } catch (e) { distant = null; }
          }
          var local = P().exporter(), fus = P().fusion(local, distant);
          var change = stable(fus) !== stable(local);
          P().remplacer(fus);
          fusionFaite = true;
          if (change && typeof C.surFusion === "function") { try { C.surFusion(); } catch (e2) {} }
        }
        var mon = P().exporter(), envoyee = mon.maj;
        return avecDelai(ref.set({ v: 1, maj: fb.database.ServerValue.TIMESTAMP, donnees: JSON.stringify(mon) }), 15000).then(function () {
          if (perime()) { return; }
          aPousser = (P().exporter().maj !== envoyee);
          if (aPousser) { planifier(); } else { fixerEtat("ok"); }
        });
      }).then(function () { fermer(); terminer(true); },
              function () { fermer(); terminer(false); });
    });
  }
  function pousser() {
    clearTimeout(minuteur); minuteur = null; debutAttente = 0; clearTimeout(relance); relance = null;
    if (!numero) { return; }
    synchroniser(function (ok) {
      if (!ok && numero) { clearTimeout(relance); relance = setTimeout(pousser, 45000); }
    });
  }
  function planifier() {
    if (!numero) { return; }
    aPousser = true;
    if (etat !== "attente") { fixerEtat("attente"); }
    var maintenant = Date.now();
    if (!debutAttente) { debutAttente = maintenant; }
    clearTimeout(minuteur);
    minuteur = setTimeout(pousser, (maintenant - debutAttente >= 20000) ? 0 : 5000);
  }
  function arreterMinuteurs() { clearTimeout(minuteur); clearTimeout(relance); minuteur = null; relance = null; debutAttente = 0; }

  /* ---------- connexion d'un élève ---------- */
  // rappel("ok" | "hors") : « hors » = on joue quand même avec la copie de l'appareil, l'envoi viendra plus tard
  C.connecter = function (n, rappel) {
    arreterMinuteurs();
    session++; numero = String(n); fusionFaite = false; enCours = false; fileRappels = []; aPousser = false;
    P().utiliser(CLE_LOCALE + numero);
    P().surChangement = planifier;
    fixerEtat("attente");
    var fini = false;
    function fin(r) { if (!fini) { fini = true; rappel(r); } }
    if (!C.disponible()) { fixerEtat("hors"); fin("hors"); return; }
    var t = setTimeout(function () { if (etat === "attente") { fixerEtat("hors"); } fin("hors"); }, 9000);
    synchroniser(function (ok) {
      clearTimeout(t);
      if (!ok) { clearTimeout(relance); relance = setTimeout(pousser, 45000); }
      fin(ok ? "ok" : "hors");
    });
  };
  C.sansCompte = function () {
    arreterMinuteurs(); session++; numero = null; fusionFaite = false; aPousser = false;
    P().surChangement = null; P().utiliser(null); fixerEtat("sans");
  };

  /* ---------- écran du numéro ---------- */
  function montrerEcran(id) {
    var l = doc.querySelectorAll(".ecran"), i;
    for (i = 0; i < l.length; i++) { l[i].hidden = (l[i].id !== id); }
    root.scrollTo(0, 0);
  }
  C.demarrer = function () {
    if (J.audio) { J.audio.stop(); }
    if (J.grosplan) { J.grosplan.arreter(); }
    if (J.sons && J.sons.annulerAttentes) { J.sons.annulerAttentes(); }
    $("compte-numero").value = "";
    $("compte-message").textContent = "";
    $("btn-compte-jouer").disabled = false;
    var dispo = C.disponible();
    $("compte-formulaire").hidden = !dispo;
    $("compte-indispo").hidden = dispo;
    montrerEcran("ecran-compte");
    afficherEtat();
    if (dispo) { try { $("compte-numero").focus(); } catch (e) {} }
  };
  function jouerAvecNumero() {
    var brut = String($("compte-numero").value || "").replace(/\s+/g, "");
    var msg = $("compte-message");
    if (!/^[0-9]{4}$/.test(brut)) { msg.textContent = "Ton numéro a 4 chiffres. Vérifie-le."; return; }
    msg.textContent = "Connexion…";
    $("btn-compte-jouer").disabled = true;
    C.connecter(brut, function (res) {
      msg.textContent = "";
      J.match.menu();
      if (res === "hors") { afficherEtat(); }
    });
  }
  // Changer d'élève : on envoie d'abord ce qui n'est pas parti (4 s au plus), puis retour à l'écran du numéro
  C.changer = function () {
    function fin() {
      arreterMinuteurs(); session++;
      numero = null; fusionFaite = false; aPousser = false; enCours = false; fileRappels = [];
      P().surChangement = null; P().utiliser(null); fixerEtat("sans");
      C.demarrer();
    }
    if (!numero || !aPousser) { fin(); return; }
    var fait = false;
    function une() { if (!fait) { fait = true; fin(); } }
    setTimeout(une, 4000);
    synchroniser(une);
  };

  /* ---------- espace enseignant ---------- */
  var profOuvert = false;
  function profMessage(t) { $("prof-msg").textContent = t || ""; }
  function profEtape(nom) {
    ["prof-verrou", "prof-connexion", "prof-liste"].forEach(function (x) { $(x).hidden = (x !== nom); });
    profMessage("");
  }
  function messageErreur(e) {
    var c = e && e.code ? String(e.code) : "";
    if (/wrong-password|user-not-found|invalid-credential|invalid-email|missing-password/.test(c)) { return "E-mail ou mot de passe incorrect."; }
    if (/too-many-requests/.test(c)) { return "Trop d'essais : attends quelques minutes."; }
    if (/network/.test(c) || (e && (e.message === "reseau" || e.message === "delai"))) { return "Pas de connexion : réessaie plus tard."; }
    if (/permission/i.test(c + " " + (e && e.message ? e.message : ""))) { return "Ce compte n'a pas accès à la liste."; }
    return "Échec (" + (c || "inconnu") + ").";
  }
  C.ouvrirProf = function () {
    profOuvert = true;
    $("prof-mdp1").value = ""; $("prof-email").value = ""; $("prof-mdp2").value = "";
    vider($("prof-lignes"));
    profEtape("prof-verrou");
    $("modal-prof").hidden = false;
    try { $("prof-mdp1").focus(); } catch (e) {}
  };
  C.fermerProf = function () {
    profOuvert = false;
    $("modal-prof").hidden = true;
    $("prof-mdp1").value = ""; $("prof-email").value = ""; $("prof-mdp2").value = "";
    vider($("prof-lignes")); donneesProf = [];
    if (auth) {
      try {
        auth.signOut().then(function () { return auth.setPersistence(fb.auth.Auth.Persistence.LOCAL); }).then(null, function () {});
      } catch (e) {}
    }
  };
  function verifierVerrou() {
    var saisi = $("prof-mdp1").value;
    $("prof-mdp1").value = "";
    if (sha256(SEL + saisi) !== VERROU) { profMessage("Mot de passe incorrect."); return; }
    profEtape("prof-connexion");
    try { $("prof-email").focus(); } catch (e) {}
  }
  function connexionProf() {
    var email = String($("prof-email").value || "").replace(/^\s+|\s+$/g, ""), mdp = $("prof-mdp2").value;
    $("prof-mdp2").value = "";
    if (!email || !mdp) { profMessage("Écris ton e-mail et ton mot de passe."); return; }
    profMessage("Connexion…");
    $("prof-ok2").disabled = true;
    charger(function (err) {
      if (err) { $("prof-ok2").disabled = false; profMessage(messageErreur(err)); return; }
      try { init(); } catch (e) { $("prof-ok2").disabled = false; profMessage(messageErreur(e)); return; }
      auth.setPersistence(fb.auth.Auth.Persistence.SESSION)
        .then(function () { return avecDelai(auth.signInWithEmailAndPassword(email, mdp), 15000); })
        .then(function () { if (!profOuvert) { return null; } return chargerListe(); })
        .then(function () { $("prof-ok2").disabled = false; },
              function (e) { $("prof-ok2").disabled = false; if (profOuvert) { profMessage(messageErreur(e)); } });
    });
  }

  var donneesProf = [];
  function resumerCompte(num, v) {
    var d = null, gagnes = 0, aRevoir = 0, mots = 0, k;
    try { d = JSON.parse(v.donnees); } catch (e) { d = null; }
    if (d) {
      for (k in (d.matchs || {})) { if (d.matchs.hasOwnProperty(k) && d.matchs[k] && d.matchs[k].gagne) { gagnes++; } }
      for (k in (d.carnet || {})) { if (d.carnet.hasOwnProperty(k) && d.carnet[k].rate > 0 && d.carnet[k].serie < 2) { aRevoir++; } }
      for (k in (d.mots || {})) { if (d.mots.hasOwnProperty(k) && d.mots[k].rate > 0 && d.mots[k].serie < 2) { mots++; } }
    }
    return { numero: num, gagnes: gagnes, aRevoir: aRevoir, mots: mots, maj: (typeof v.maj === "number") ? v.maj : 0, lisible: !!d };
  }
  function chargerListe() {
    profMessage("Lecture de la liste…");
    ouvrir();
    return avecDelai(db.ref(CHEMIN).once("value"), 15000).then(function (snap) {
      fermer();
      donneesProf = [];
      snap.forEach(function (enfant) { donneesProf.push(resumerCompte(enfant.key, enfant.val() || {})); });
      profEtape("prof-liste");
      afficherListe();
    }, function (e) { fermer(); throw e; });
  }
  function dateCourte(ms) {
    if (!ms) { return "?"; }
    var d = new Date(ms), j = d.getDate(), m = d.getMonth() + 1;
    return (j < 10 ? "0" : "") + j + "/" + (m < 10 ? "0" : "") + m + "/" + d.getFullYear();
  }
  function afficherListe() {
    var corps = $("prof-lignes"), tri = $("prof-tri").value, filtre = String($("prof-filtre").value || "").replace(/\s+/g, "");
    var total = (J.championnat && J.championnat.matchs) ? J.championnat.matchs.length : 6;
    var jours = parseInt($("prof-jours").value, 10); if (!(jours > 0)) { jours = 180; }
    var limite = Date.now() - jours * 86400000;
    var l = donneesProf.filter(function (x) { return !filtre || x.numero.indexOf(filtre) === 0; });
    l.sort(function (a, b) {
      if (tri === "progression") { return (b.gagnes - a.gagnes) || (b.mots - a.mots) || (a.numero < b.numero ? -1 : 1); }
      if (tri === "activite") { return (a.maj - b.maj) || (a.numero < b.numero ? -1 : 1); }
      return a.numero < b.numero ? -1 : (a.numero > b.numero ? 1 : 0);
    });
    vider(corps);
    l.forEach(function (x) {
      var tr = el("tr", (x.maj && x.maj < limite) ? "prof-ancien" : "");
      tr.appendChild(el("th", "", x.numero));
      tr.appendChild(el("td", "", x.lisible ? (x.gagnes + " / " + total) : "illisible"));
      tr.appendChild(el("td", "", String(x.aRevoir)));
      tr.appendChild(el("td", "", String(x.mots)));
      tr.appendChild(el("td", "", dateCourte(x.maj)));
      var td = el("td"), b = el("button", "petit", "Supprimer");
      b.onclick = function () { supprimer([x.numero]); };
      td.appendChild(b); tr.appendChild(td);
      corps.appendChild(tr);
    });
    var anciens = donneesProf.filter(function (x) { return x.maj && x.maj < limite; }).length;
    $("prof-resume").textContent = donneesProf.length + " compte" + (donneesProf.length > 1 ? "s" : "") + " · " + l.length + " affiché" + (l.length > 1 ? "s" : "") +
      " · " + anciens + " inactif" + (anciens > 1 ? "s" : "") + " depuis plus de " + jours + " jours (en orange)";
    $("prof-vider").disabled = anciens === 0;
  }
  function supprimer(liste) {
    if (!liste.length) { return; }
    var q = liste.length === 1 ? ("Supprimer le compte " + liste[0] + " ? Sa progression sera perdue.") : ("Supprimer " + liste.length + " comptes ? Leur progression sera perdue.");
    if (!root.confirm(q)) { return; }
    var u = {};
    liste.forEach(function (n) { u[CHEMIN + "/" + n] = null; });
    profMessage("Suppression…");
    ouvrir();
    avecDelai(db.ref().update(u), 15000).then(function () {
      fermer();
      donneesProf = donneesProf.filter(function (x) { return liste.indexOf(x.numero) < 0; });
      afficherListe(); profMessage(liste.length === 1 ? "Compte supprimé." : (liste.length + " comptes supprimés."));
    }, function (e) { fermer(); profMessage(messageErreur(e)); });
  }
  function supprimerAnciens() {
    var jours = parseInt($("prof-jours").value, 10); if (!(jours > 0)) { return; }
    var limite = Date.now() - jours * 86400000;
    supprimer(donneesProf.filter(function (x) { return x.maj && x.maj < limite; }).map(function (x) { return x.numero; }));
  }

  /* ---------- branchements ---------- */
  C.brancher = function () {
    $("btn-compte-jouer").onclick = jouerAvecNumero;
    $("compte-numero").onkeydown = function (ev) { if ((ev.key || ev.keyIdentifier) === "Enter" || ev.keyCode === 13) { jouerAvecNumero(); } };
    $("btn-compte-sans").onclick = function () { C.sansCompte(); J.match.menu(); };
    $("btn-changer-eleve").onclick = function () { C.changer(); };
    $("btn-prof").onclick = C.ouvrirProf;
    $("prof-ok1").onclick = verifierVerrou;
    $("prof-mdp1").onkeydown = function (ev) { if (ev.keyCode === 13) { verifierVerrou(); } };
    $("prof-ok2").onclick = connexionProf;
    $("prof-mdp2").onkeydown = function (ev) { if (ev.keyCode === 13) { connexionProf(); } };
    $("prof-fermer").onclick = C.fermerProf;
    $("prof-tri").onchange = afficherListe;
    $("prof-filtre").oninput = afficherListe;
    $("prof-jours").oninput = afficherListe;
    $("prof-vider").onclick = supprimerAnciens;
    C.surFusion = function () {
      var m = $("ecran-menu");
      if (m && !m.hidden && J.match) { J.match.menu(); }
    };
    // Si l'élève ferme la page ou change d'onglet : on tente d'envoyer ce qui reste
    doc.addEventListener("visibilitychange", function () { if (doc.hidden && numero && aPousser) { pousser(); } });
    root.addEventListener("pagehide", function () { if (numero && aPousser) { pousser(); } });
    root.addEventListener("online", function () { if (numero && etat === "hors") { pousser(); } });
  };
})(typeof window !== "undefined" ? window : this);
