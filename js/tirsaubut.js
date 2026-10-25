/* ============================================================
   TIRS AU BUT « PETITS MOTS » (chantier 15)
   Écran de tir : le but en pleine page, le tireur vu de dos, le gardien, une phrase à compléter sous le but,
   un petit mot dans chacun des 4 coins. L'élève tire dans le coin qu'il croit juste (UNE SEULE chance).

   Deux usages :
   1. J.tirs.entrainement()          séance d'entraînement du menu : série de 5 tirs, niveau automatique
   2. J.tirs.serieMatch(opts)        tirs au but à la fin d'un match nul (après la prolongation) :
                                      série de 5 chacun, puis mort subite. Nous tirons (tireur), l'adversaire tire
                                      (l'élève est le gardien : le bon petit mot fait plonger le gardien du bon côté).

   Images (facultatives, le jeu marche sans) :
   - assets/tirs/tir-01-but.png : le but en pleine page. Sans elle, le décor est dessiné par le code (SVG).
   - assets/tirs/tirs-atlas.js : les tireurs vus de dos (4 sprites). Le maillot, les chaussettes et le short sont recolorés
     aux couleurs de l'équipe. Sans lui, le tireur est dessiné par le code.
   Le gardien est toujours dessiné par le code (SVG).
   Code en ES5 (vieil iPad). Les réglages sont dans data/config.js (J.config.tirsAuBut).
   ============================================================ */
(function (root) {
  var J = root.JEU = root.JEU || {};
  var doc = root.document;
  var T = J.tirs = {};
  var E = null;                // la séance en cours
  var Q = null;                // la question en cours

  /* ---------- petits outils ---------- */
  function $(id) { return doc.getElementById(id); }
  function vider(e) { while (e.firstChild) { e.removeChild(e.firstChild); } }
  function el(tag, classe, texte) {
    var e = doc.createElement(tag);
    if (classe) { e.className = classe; }
    if (texte !== undefined) { e.textContent = texte; }
    return e;
  }
  function borne(x, a, b) { return Math.max(a, Math.min(b, x)); }
  function cfg() { return (J.config && J.config.tirsAuBut) || {}; }
  function alea() { return (J.alea || Math.random)(); }
  function melange(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(alea() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function son(nom) { try { if (J.sons) { J.sons.jouer(nom); } } catch (e) {} }
  function sonApres(nom, ms) { try { if (J.sons) { J.sons.jouerApres(nom, ms); } } catch (e) {} }
  function musique(nom, opts) { try { if (J.sons) { J.sons.musique(nom, opts); } } catch (e) {} }
  function attendre(ms, f) { var id = root.setTimeout(f, ms); E.minuteurs.push(id); return id; }
  function annulerMinuteurs() { if (E) { E.minuteurs.forEach(function (id) { root.clearTimeout(id); }); E.minuteurs = []; } }
  function rgb(c, defaut) { return c ? "rgb(" + c[0] + "," + c[1] + "," + c[2] + ")" : defaut; }
  function voyelleDebut(t) { return /^[aeiouyhàâäéèêëîïôöùûü]/i.test(t); }

  /* ---------- les 4 coins ---------- */
  // x, y : où le ballon arrive (au bord extérieur du coin, pour ne pas cacher le mot), en % de la scène (largeur, hauteur)
  // Deux géométries : le décor dessiné par le code, et l'image du but (assets/tirs/tir-01-but.png), où le but est plus bas.
  var COINS = [
    { id: "hg", nom: "en haut à gauche" },
    { id: "hd", nom: "en haut à droite" },
    { id: "bg", nom: "en bas à gauche" },
    { id: "bd", nom: "en bas à droite" }
  ];
  var GEO = {
    dessin: { hautY: 22, basY: 60, gaucheX: 16, droiteX: 84 },
    image:  { hautY: 39, basY: 70, gaucheX: 16, droiteX: 84 }
  };
  function appliquerGeo(image) {
    var g = image ? GEO.image : GEO.dessin;
    COINS[0].x = g.gaucheX; COINS[0].y = g.hautY; COINS[1].x = g.droiteX; COINS[1].y = g.hautY;
    COINS[2].x = g.gaucheX; COINS[2].y = g.basY;  COINS[3].x = g.droiteX; COINS[3].y = g.basY;
  }
  var IMG_BUT = false;                  // l'image du but est-elle disponible ? (sondée une fois au chargement)
  (function () {
    try { var im = new root.Image(); im.onload = function () { IMG_BUT = true; }; im.src = "assets/tirs/tir-01-but.png"; } catch (e) {}
  })();

  /* ---------- les sprites du tireur (atlas en data-URI, recolorés par canvas) ---------- */
  var ATLAS = {}, CACHE_SPRITE = {}, SPRITE = { actif: false, c: null, cheveux: "noir" };
  (function () {
    var src = J.tirsImages, k;
    if (!src) { return; }
    function charger(cle) { var im = new root.Image(); im.onload = function () { ATLAS[cle] = im; }; im.src = src[cle]; }
    for (k in src) { if (src.hasOwnProperty(k)) { charger(k); } }
  })();
  function numeros(c, defaut) { return (c && c.length === 3) ? c : defaut; }
  // Renvoie un canvas (le sprite recoloré), ou null si le sprite ou le canvas n'est pas disponible
  function spriteRecolore(cle, c) {
    var im = ATLAS[cle];
    if (!im) { return null; }
    var id = cle + "|" + c.maillot.join(",") + "|" + c.short.join(","), n = im.width, base = CACHE_SPRITE[id];
    try {
      if (!base) {
        base = doc.createElement("canvas"); base.width = n; base.height = im.height;
        var ctx = base.getContext("2d"); ctx.drawImage(im, 0, 0);
        var d = ctx.getImageData(0, 0, n, im.height), p = d.data, i, x, y;
        for (i = 0; i < p.length; i += 4) {
          if (p[i + 3] === 0) { continue; }
          y = Math.floor((i / 4) / n);
          if (p[i] > 240 && p[i + 1] < 20 && p[i + 2] > 240) { p[i] = c.maillot[0]; p[i + 1] = c.maillot[1]; p[i + 2] = c.maillot[2]; }                  // maillot, chaussettes
          else if (p[i] > 245 && p[i + 1] > 245 && p[i + 2] > 245 && y > 48 && y < 82) { p[i] = c.short[0]; p[i + 1] = c.short[1]; p[i + 2] = c.short[2]; }   // short (pas le ballon)
        }
        ctx.putImageData(d, 0, 0);
        CACHE_SPRITE[id] = base;
      }
      var copie = doc.createElement("canvas"); copie.width = base.width; copie.height = base.height;
      copie.getContext("2d").drawImage(base, 0, 0);
      return copie;
    } catch (e) { return null; }
  }
  function couleursNum(eq) { return { maillot: numeros(eq && eq.maillot, [255, 255, 255]), short: numeros(eq && eq.short, [21, 95, 217]) }; }

  /* ---------- couleurs des équipes ---------- */
  function equipeNous() { return (root.EQUIPES && root.EQUIPES.nankatsu) || null; }
  function equipeAdv(def) {
    var r = J.grosplanReglages, cle = def && r && r.equipeParMatch ? r.equipeParMatch[def.id] : null;
    return (cle && root.EQUIPES && root.EQUIPES[cle]) || null;
  }
  function couleursTireur(eq) {
    return { maillot: rgb(eq && eq.maillot, "#ffffff"), short: rgb(eq && eq.short, "#1561d9") };
  }
  function couleurGardien(eq, defaut) { return rgb(eq && eq.gardien && eq.gardien.maillot, defaut); }

  /* ---------- le décor (dessiné en code, 256 × 224 comme les images du jeu) ---------- */
  var NS = "http://www.w3.org/2000/svg";
  function svgTexte(w, h, corps, id) {
    return '<svg xmlns="' + NS + '" viewBox="0 0 ' + w + " " + h + '" preserveAspectRatio="none" shape-rendering="crispEdges"' + (id ? ' id="' + id + '"' : "") + ' width="100%" height="100%">' + corps + "</svg>";
  }
  function decor() {
    var s = "";
    s += '<defs><pattern id="tp-foule" width="6" height="6" patternUnits="userSpaceOnUse">' +
         '<rect width="6" height="6" fill="#26346b"/><rect x="1" y="1" width="2" height="2" fill="#6AB0FF"/><rect x="4" y="3" width="2" height="2" fill="#fff"/><rect x="2" y="4" width="1" height="1" fill="#ABABAB"/></pattern>' +
         '<pattern id="tp-filet" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="#161a2e"/><rect width="6" height="1" fill="#9aa0b8"/><rect width="1" height="6" fill="#9aa0b8"/></pattern></defs>';
    s += '<rect x="0" y="0" width="256" height="224" fill="#6AB0FF"/>';
    s += '<rect x="20" y="6" width="44" height="8" fill="#fff"/><rect x="28" y="2" width="28" height="6" fill="#fff"/><rect x="170" y="12" width="52" height="8" fill="#fff"/><rect x="180" y="8" width="30" height="6" fill="#fff"/>';
    s += '<rect x="0" y="24" width="256" height="80" fill="url(#tp-foule)"/>';
    s += '<rect x="0" y="24" width="256" height="3" fill="#000"/>';
    // fanions
    var k, cols = ["#fff", "#1561D9"];
    for (k = 0; k < 16; k++) { s += '<rect x="' + (8 + k * 16) + '" y="27" width="8" height="5" fill="' + cols[k % 2] + '"/>'; }
    // panneaux sans texte
    var pub = ["#d82020", "#ffd600", "#fff", "#1561D9"];
    for (k = 0; k < 8; k++) { s += '<rect x="' + (k * 32) + '" y="104" width="32" height="9" fill="' + pub[k % 4] + '"/>'; }
    s += '<rect x="0" y="113" width="256" height="2" fill="#000"/>';
    // pelouse
    s += '<rect x="0" y="115" width="256" height="109" fill="#0A9400"/>';
    for (k = 0; k < 8; k++) { s += '<rect x="0" y="' + (118 + k * 14) + '" width="256" height="7" fill="#0b8a00"/>'; }
    // le but : poteaux, barre, filet
    s += '<rect x="32" y="40" width="192" height="106" fill="url(#tp-filet)"/>';
    s += '<rect x="26" y="34" width="6" height="112" fill="#fff"/><rect x="224" y="34" width="6" height="112" fill="#fff"/><rect x="26" y="34" width="204" height="6" fill="#fff"/>';
    s += '<rect x="25" y="33" width="1" height="114" fill="#000"/><rect x="230" y="33" width="1" height="114" fill="#000"/><rect x="25" y="33" width="206" height="1" fill="#000"/>';
    // lignes du terrain et point de penalty
    s += '<rect x="0" y="146" width="256" height="2" fill="#fff"/>';
    s += '<rect x="24" y="148" width="2" height="62" fill="#fff"/><rect x="230" y="148" width="2" height="62" fill="#fff"/><rect x="24" y="208" width="208" height="2" fill="#fff"/>';
    s += '<rect x="125" y="182" width="6" height="4" fill="#fff"/>';
    return svgTexte(256, 224, s, "t-decor");
  }

  /* ---------- le tireur, vu de dos ---------- */
  function svgTireur(c) {
    var s = "";
    s += '<rect x="14" y="2" width="12" height="12" fill="#2b1a0c"/><rect x="13" y="6" width="14" height="6" fill="#2b1a0c"/>';     // cheveux
    s += '<rect x="16" y="12" width="8" height="4" fill="#e8b48c"/>';                                                                // nuque
    s += '<rect x="7" y="16" width="26" height="22" fill="' + c.maillot + '"/><rect x="7" y="16" width="26" height="2" fill="rgba(0,0,0,.25)"/>';  // maillot
    s += '<rect x="2" y="17" width="5" height="16" fill="' + c.maillot + '"/><rect x="33" y="17" width="5" height="16" fill="' + c.maillot + '"/>'; // bras
    s += '<rect x="2" y="31" width="5" height="4" fill="#e8b48c"/><rect x="33" y="31" width="5" height="4" fill="#e8b48c"/>';
    s += '<rect x="10" y="38" width="20" height="12" fill="' + c.short + '"/>';                                                      // short
    s += '<rect x="11" y="50" width="7" height="14" fill="#e8b48c"/><rect x="22" y="50" width="7" height="14" fill="#e8b48c"/>';     // jambes
    s += '<rect x="11" y="58" width="7" height="6" fill="' + c.maillot + '"/><rect x="22" y="58" width="7" height="6" fill="' + c.maillot + '"/>'; // chaussettes
    s += '<rect x="9" y="64" width="10" height="5" fill="#000"/><rect x="21" y="64" width="10" height="5" fill="#000"/>';            // chaussures
    return svgTexte(40, 70, s);
  }
  /* ---------- le gardien (de face) ---------- */
  function svgGardien(couleur) {
    var s = "";
    s += '<rect x="12" y="2" width="16" height="14" fill="#2b1a0c"/><rect x="14" y="7" width="12" height="9" fill="#e8b48c"/>';
    s += '<rect x="16" y="10" width="2" height="2" fill="#000"/><rect x="22" y="10" width="2" height="2" fill="#000"/>';
    s += '<rect x="8" y="17" width="24" height="22" fill="' + couleur + '"/><rect x="8" y="17" width="24" height="2" fill="rgba(0,0,0,.25)"/>';
    s += '<rect x="1" y="14" width="7" height="14" fill="' + couleur + '"/><rect x="32" y="14" width="7" height="14" fill="' + couleur + '"/>';
    s += '<rect x="0" y="8" width="9" height="8" fill="#ffe600"/><rect x="31" y="8" width="9" height="8" fill="#ffe600"/>';          // gants
    s += '<rect x="11" y="39" width="18" height="10" fill="#222"/>';
    s += '<rect x="11" y="49" width="7" height="14" fill="#e8b48c"/><rect x="22" y="49" width="7" height="14" fill="#e8b48c"/>';
    s += '<rect x="11" y="57" width="7" height="6" fill="#222"/><rect x="22" y="57" width="7" height="6" fill="#222"/>';
    s += '<rect x="9" y="63" width="10" height="5" fill="#000"/><rect x="21" y="63" width="10" height="5" fill="#000"/>';
    return svgTexte(40, 68, s);
  }

  /* ---------- la scène ---------- */
  function construireScene() {
    var sc = $("t-scene"); vider(sc);
    var cadre = el("div", ""); cadre.id = "t-cadre";
    var fond = el("div", ""); fond.id = "t-fond";
    if (IMG_BUT) {                                                   // l'image du but (assets/tirs/tir-01-but.png)
      cadre.className = "t-img";
      var img = doc.createElement("img"); img.id = "t-img-but"; img.alt = ""; img.src = "assets/tirs/tir-01-but.png";
      fond.appendChild(img);
    } else { fond.innerHTML = decor(); }
    appliquerGeo(IMG_BUT);
    cadre.appendChild(fond);
    var g = el("div", ""); g.id = "t-gardien"; cadre.appendChild(g);
    COINS.forEach(function (c) {
      var b = el("button", "t-coin t-" + c.id, ""); b.id = "t-coin-" + c.id; b.type = "button"; b.disabled = true;
      cadre.appendChild(b);
    });
    var b2 = el("div", ""); b2.id = "t-ballon"; cadre.appendChild(b2);
    var t = el("div", ""); t.id = "t-tireur"; cadre.appendChild(t);
    var bulle = el("div", ""); bulle.id = "t-bulle"; bulle.hidden = true; cadre.appendChild(bulle);
    sc.appendChild(cadre);
  }
  function placerBallon(x, y, taille) {      // centre en % de la largeur (x) et de la hauteur (y)
    var b = $("t-ballon"), h = taille / 0.875;
    b.style.left = (x - taille / 2) + "%"; b.style.top = (y - h / 2) + "%";
    b.style.width = taille + "%"; b.style.paddingBottom = taille + "%";
  }
  function reinitialiserScene(tireurEq, gardienCouleur, cheveux) {
    var g = $("t-gardien"); g.className = ""; g.innerHTML = svgGardien(gardienCouleur);
    var t = $("t-tireur"), b = $("t-ballon");
    var cn = couleursNum(tireurEq), sp = spriteRecolore((cheveux || "noir") + "Repos", cn);
    vider(t); b.className = "t-sans-transition";
    if (sp) {                                  // le sprite contient déjà le ballon : le nôtre n'apparaît qu'au tir
      SPRITE.actif = true; SPRITE.c = cn; SPRITE.cheveux = cheveux || "noir";
      t.className = "t-sprite"; t.appendChild(sp);
      b.className = "t-sans-transition t-cache";
      placerBallon(SPRITE_BALLON.x, SPRITE_BALLON.y, SPRITE_BALLON.t);
    } else {
      SPRITE.actif = false;
      t.className = ""; t.innerHTML = svgTireur(couleursTireur(tireurEq));
      placerBallon(55, 82, 5.5);
      root.setTimeout(function () { b.className = ""; }, 30);
    }
    var bulle = $("t-bulle"); bulle.hidden = true;
    COINS.forEach(function (c) { $("t-coin-" + c.id).className = "t-coin t-" + c.id; });
  }
  // où est le ballon dans le sprite du tireur (centre et taille, en % de la scène)
  var SPRITE_BALLON = { x: 52.4, y: 95.9, t: 4.1 };
  function coin(id) { var i; for (i = 0; i < COINS.length; i++) { if (COINS[i].id === id) { return COINS[i]; } } return COINS[0]; }
  function bulle(texte, classe) {
    var b = $("t-bulle"); b.textContent = texte; b.className = classe || ""; b.hidden = false;
  }

  /* ---------- la phrase à compléter ---------- */
  function remplirPhrase(item, reponse) {
    var p = $("t-phrase"); vider(p);
    var morceaux = item.consigne.split("____"), i;
    for (i = 0; i < morceaux.length; i++) {
      p.appendChild(doc.createTextNode(morceaux[i]));
      if (i < morceaux.length - 1) {
        p.appendChild(reponse ? el("mark", "t-trou-rempli", reponse) : el("span", "t-trou", "      "));
      }
    }
  }
  function texteALire(item, ordre) {
    var t = item.consigne.replace("____", " blanc ") + " ... " + item.question;
    ordre.forEach(function (reel, k) { t += " ... " + COINS[k].nom + " : " + item.options[reel]; });
    return t;
  }

  /* ---------- une série (entraînement ou match) : l'état commun ---------- */
  function nouvelleSeance(mode) {
    return { mode: mode, minuteurs: [], exclus: [], reglesRatees: [], dernierRate: null, nbRepondu: 0 };
  }

  function niveauCourant() {
    if (E.mode === "match") { return E.niveau(E); }
    return E.niveauChoisi || E.niveau;
  }

  /* ---------- hud ---------- */
  function pastilles(liste, total) {
    var s = "", i;
    for (i = 0; i < Math.max(total, liste.length); i++) { s += (i < liste.length) ? (liste[i] ? "⚽" : "❌") : "⚪"; s += " "; }
    return s;
  }
  function majHud() {
    var ps = $("t-pastilles"); vider(ps);
    if (E.mode === "match") {
      var total = Math.max(5, E.nous.length, E.eux.length);
      var l1 = el("div", "t-ligne-pastille" + (E.tour === "nous" ? " t-actif" : ""), E.nomNous + " : " + pastilles(E.nous, total));
      var l2 = el("div", "t-ligne-pastille" + (E.tour === "eux" ? " t-actif" : ""), E.nomEux + " : " + pastilles(E.eux, total));
      ps.appendChild(l1); ps.appendChild(l2);
      $("t-score").textContent = butsDe(E.nous) + " – " + butsDe(E.eux);
      $("t-titre").textContent = "Tirs au but";
    } else {
      ps.appendChild(el("div", "t-ligne-pastille t-actif", pastilles(E.resultats, E.total)));
      $("t-score").textContent = butsDe(E.resultats) + " / " + E.total;
      $("t-titre").textContent = "Entraînement : tirs au but";
    }
  }
  function butsDe(l) { var n = 0, i; for (i = 0; i < l.length; i++) { if (l[i]) { n++; } } return n; }

  /* ---------- le bas de l'écran ---------- */
  function viderBas() {
    ["t-etiquette", "t-phrase", "t-question", "t-feedback", "t-remede", "t-extra", "t-outils"].forEach(function (id) { vider($(id)); });
    $("t-suite").hidden = true; $("t-suite").onclick = null;
  }
  function outils(item, ordre) {
    var o = $("t-outils"); vider(o);
    var ec = el("button", "petit", "🔊 Écouter"); ec.type = "button";
    ec.onclick = function () { J.audio.lire(texteALire(item, ordre)); };
    var ca = el("button", "petit", "📒 Carnet"); ca.type = "button";
    ca.onclick = function () { if (J.match && J.match.ouvrirCarnet) { J.match.ouvrirCarnet(); } };
    o.appendChild(ec); o.appendChild(ca);
  }
  function ligneRemede(icone, titre, texte, classe) {
    var l = el("div", "ligne-remede " + classe);
    l.appendChild(el("span", "remede-icone", icone));
    var t = el("span", "remede-texte"); t.appendChild(el("strong", "", titre + " : ")); t.appendChild(doc.createTextNode(texte));
    l.appendChild(t);
    return l;
  }

  /* ---------- UN TIR ---------- */
  // role : "tireur" (notre tir : le bon coin = but) ou "gardien" (tir adverse : le bon coin = arrêt)
  function unTir(role, quand) {
    annulerMinuteurs();
    viderBas();
    var niveau = borne(niveauCourant(), 1, 5);
    var item = J.banque.choisir("motpetit", niveau, {
      exclus: E.exclus, revoir: J.progression.revoir(), dernierRate: E.dernierRate, base: null
    });
    if (!item) { return quand(false); }
    E.exclus.push(item.id);
    var ordre = melange([0, 1, 2, 3].slice(0, item.options.length));
    Q = { item: item, ordre: ordre, role: role, niveau: niveau, verrou: false, quand: quand };

    // équipes et couleurs
    var eqT, eqG, couleurG, cheveux = "noir";
    if (E.mode === "match") {
      if (role === "tireur") { eqT = E.eqNous; eqG = E.eqAdv; couleurG = couleurGardien(E.eqAdv, "#4a6cd4"); }
      else { eqT = E.eqAdv; eqG = E.eqNous; couleurG = couleurGardien(E.eqNous, "#ff7800"); cheveux = "brun"; }     // l'adversaire a les cheveux bruns
    } else { eqT = equipeNous(); couleurG = "#4a6cd4"; }
    reinitialiserScene(eqT, couleurG, cheveux);
    majHud();

    var e = $("t-etiquette");
    e.appendChild(el("span", "t-niveau", "niveau " + niveau));
    e.appendChild(el("span", "puce-unique", "⚠ Une seule chance !"));
    if (role === "tireur") {
      e.appendChild(doc.createTextNode(" " + (E.mode === "match" ? E.nomNous + " tire : " : "") + "choisis le coin avec le bon petit mot."));
    } else {
      e.appendChild(doc.createTextNode(" " + E.nomEux + " tire ! Ton gardien plonge dans le coin du bon petit mot."));
    }
    remplirPhrase(item, null);
    $("t-question").textContent = item.question;
    outils(item, ordre);

    COINS.forEach(function (c, k) {
      var b = $("t-coin-" + c.id);
      b.textContent = item.options[ordre[k]];
      b.disabled = false;
      b.onclick = function () { repondre(k); };
    });
    if (root.scrollTo) { root.scrollTo(0, 0); }
  }

  function repondre(k) {
    if (!Q || Q.verrou) { return; }
    Q.verrou = true;
    J.audio.stop();
    var item = Q.item, reel = Q.ordre[k], ok = (reel === item.bonne);
    var choisi = COINS[k];
    COINS.forEach(function (c) { $("t-coin-" + c.id).disabled = true; });
    son(ok ? "bonne-reponse" : "mauvaise-reponse");
    J.progression.noterRegle(item.regle, ok);
    J.progression.noterMot(String(item.options[item.bonne]).toLowerCase(), item.regle, ok);
    if (!ok) { E.dernierRate = item.id; if (E.reglesRatees.indexOf(item.regle) < 0) { E.reglesRatees.push(item.regle); } }

    // où part le ballon, où plonge le gardien ?
    var cibleBalle, cibleGardien, but;
    if (Q.role === "tireur") {
      cibleBalle = choisi;
      if (ok) { but = true; cibleGardien = autreCoin(choisi); }      // bon mot : le gardien se trompe de côté
      else { but = false; cibleGardien = choisi; }                   // mauvais mot : le gardien plonge au bon endroit
    } else {
      cibleGardien = choisi;                                         // l'élève choisit où plonge SON gardien
      if (ok) { but = false; cibleBalle = choisi; }                  // bon mot : le gardien est au bon endroit
      else { but = true; cibleBalle = autreCoin(choisi); }
    }
    animer(cibleBalle, cibleGardien, but, ok, k);
  }
  function autreCoin(c) {
    var autres = COINS.filter(function (x) { return x.id !== c.id; });
    return autres[Math.floor(alea() * autres.length)];
  }

  function animer(cb, cg, but, ok, kChoisi) {
    var item = Q.item, role = Q.role;
    // élan du tireur, puis frappe
    if (!SPRITE.actif) { $("t-tireur").className = "t-elan"; }
    sonApres("coup-de-pied", 150);
    attendre(380, function () {
      var b = $("t-ballon");
      if (SPRITE.actif) {                                  // le tireur passe à la pose « frappe » (sans ballon) : le nôtre part du même endroit
        var sp = spriteRecolore(SPRITE.cheveux + "Frappe", SPRITE.c);
        if (sp) { var t = $("t-tireur"); vider(t); t.appendChild(sp); }
        b.className = "t-sans-transition"; placerBallon(SPRITE_BALLON.x, SPRITE_BALLON.y, SPRITE_BALLON.t);
        root.setTimeout(function () { b.className = ""; placerBallon(cb.x, cb.y, 3.6); }, 40);
      } else { $("t-tireur").className = "t-frappe"; placerBallon(cb.x, cb.y, 3.6); }
      son("tir");
      $("t-gardien").className = "t-plonge-" + cg.id;
    });
    attendre(1050, function () {
      var bonCoin = COINS[Q.ordre.indexOf(item.bonne)];
      COINS.forEach(function (c, k) {
        var b = $("t-coin-" + c.id);
        if (Q.ordre[k] === item.bonne) { b.className += " t-bonne"; }
        else if (k === kChoisi) { b.className += " t-fausse"; }
        else { b.className += " t-grise"; }
      });
      remplirPhrase(item, item.options[item.bonne]);
      if (role === "tireur") {
        if (but) { bulle("BUT !", "t-bulle-ok"); son("but-nous"); } else { bulle("ARRÊTÉ…", "t-bulle-ko"); son("arret-gardien"); }
      } else {
        if (but) { bulle("BUT ADVERSE…", "t-bulle-ko"); son("but-adverse"); } else { bulle("ARRÊT !", "t-bulle-ok"); son("arret-gardien"); }
      }
      afficherRemede(ok, but);
      var tir = { role: role, ok: ok, but: but, regle: item.regle };
      var suite = $("t-suite");
      suite.hidden = false;
      var terminee = Q.quand(tir);           // l'état est mis à jour ; renvoie le texte du bouton
      suite.textContent = terminee.texte;
      suite.onclick = function () { J.audio.stop(); annulerMinuteurs(); terminee.suite(); };
      majHud();
    });
  }

  function afficherRemede(ok, but) {
    var it = Q.item, e = it.explication, f = $("t-feedback"), r = $("t-remede"); vider(r);
    f.className = "feedback " + (ok ? "ok" : "ko");
    f.textContent = ok ? "✔ Bien joué !" : "✖ Raté… mais regarde pourquoi :";
    // 1 ligne si juste, 3 lignes si raté (une seule chance)
    if (!ok) { r.appendChild(ligneRemede("✔", "Bonne réponse", e.bonne, "bonne")); }
    r.appendChild(ligneRemede("🔑", "Le mot qui décide", e.cle, "cle"));
    if (!ok) {
      r.appendChild(ligneRemede("✖", "Le piège", e.piege, "piege"));
      r.appendChild(el("div", "regle", "📒 Règle : " + (J.regles_texte[it.regle] || "")));
    }
  }

  /* ---------- l'écran ---------- */
  function montrerEcran() {
    if (J.match && J.match.ecran) { J.match.ecran("ecran-tirs"); }
    construireScene();
  }
  function brancherFixes() {
    $("t-menu").onclick = function () {
      var msg = (E && E.mode === "match") ? "Quitter les tirs au but ? Le match sera perdu." : "Quitter la séance d'entraînement ?";
      if (root.confirm(msg)) { arreter(); if (E && E.surQuitter) { E.surQuitter(); } else if (J.match) { J.match.menu(); } }
    };
  }
  function arreter() { J.audio.stop(); annulerMinuteurs(); }
  T.arreter = arreter;

  /* ============================================================
     1. ENTRAÎNEMENT
     ============================================================ */
  function niveauDepart() {
    var n = J.progression.niveauTirs ? J.progression.niveauTirs() : 0;
    if (!n) { n = 2 + (J.progression.calibrage ? J.progression.calibrage() : 0); }
    return borne(n, 1, 5);
  }
  T.entrainement = function () {
    brancherFixes();
    var c = cfg().entrainement || {};
    E = nouvelleSeance("entrainement");
    E.total = c.tirs || 5; E.resultats = []; E.niveau = niveauDepart(); E.niveauChoisi = null;
    E.surQuitter = function () { J.match.menu(); };
    musique("match");
    montrerEcran();
    reinitialiserScene(equipeNous(), "#4a6cd4");
    majHud();
    introEntrainement();
  };
  function introEntrainement() {
    viderBas();
    var ex = $("t-extra");
    ex.appendChild(el("div", "titre-menu", "🥅 Tirs au but : les petits mots"));
    ex.appendChild(el("p", "", "Une phrase à compléter, quatre petits mots, un dans chaque coin du but. Tire dans le coin du bon mot ! Tu as une seule chance par tir : " + E.total + " tirs."));
    var ch = el("p", "t-choix-niveau");
    ch.appendChild(el("label", "", "Niveau : "));
    var sel = doc.createElement("select"); sel.id = "t-select-niveau";
    var o0 = doc.createElement("option"); o0.value = "0"; o0.textContent = "Automatique (niveau " + E.niveau + " pour commencer)"; sel.appendChild(o0);
    var k;
    for (k = 1; k <= 5; k++) { var o = doc.createElement("option"); o.value = String(k); o.textContent = "Niveau " + k + (k === 1 ? " (très simple)" : (k === 5 ? " (très difficile)" : "")); sel.appendChild(o); }
    ch.appendChild(sel);
    ex.appendChild(ch);
    var b = el("button", "gros", "⚽ Aux tirs !"); b.type = "button";
    b.onclick = function () {
      var v = parseInt(sel.value, 10) || 0;
      E.niveauChoisi = v ? v : null;
      E.resultats = []; E.exclus = E.exclus.slice(-30); E.reglesRatees = [];
      son("sifflet-debut"); prochainEntrainement();
    };
    ex.appendChild(b);
    var r = el("button", "petit discret", "↩ Retour au menu"); r.type = "button";
    r.onclick = function () { arreter(); J.match.menu(); };
    ex.appendChild(r);
  }
  function prochainEntrainement() {
    if (E.resultats.length >= E.total) { return finEntrainement(); }
    unTir("tireur", function (tir) {
      E.resultats.push(tir.but);
      var derniere = (E.resultats.length >= E.total);
      return { texte: derniere ? "Voir mon bilan ▶" : "Tir suivant ▶", suite: prochainEntrainement };
    });
  }
  function finEntrainement() {
    viderBas(); annulerMinuteurs();
    reinitialiserScene(equipeNous(), "#4a6cd4");
    var buts = butsDe(E.resultats), c = cfg().entrainement || {}, ex = $("t-extra");
    var haut = (c.niveauHaut != null) ? c.niveauHaut : 4, bas = (c.niveauBas != null) ? c.niveauBas : 2;
    var msg;
    if (E.niveauChoisi) { msg = "Tu as choisi le niveau " + E.niveauChoisi + " : le niveau automatique n'a pas bougé."; }
    else {
      var ancien = E.niveau, n = ancien;
      if (buts >= haut && n < 5) { n++; msg = "Bravo ! Prochaine série : niveau " + n + " (un peu plus difficile)."; }
      else if (buts <= bas && n > 1) { n--; msg = "On revient au niveau " + n + " pour la prochaine série : un peu plus doux."; }
      else { msg = "Tu restes au niveau " + n + "."; }
      E.niveau = n;
      if (J.progression.fixerNiveauTirs) { J.progression.fixerNiveauTirs(n); }
    }
    bulle(buts + " / " + E.total, buts >= haut ? "t-bulle-ok" : "t-bulle-ko");
    majHud();
    musique(buts >= haut ? "victoire" : "menu", { boucle: false });
    ex.appendChild(el("div", "titre-menu", buts + " but" + (buts > 1 ? "s" : "") + " sur " + E.total));
    ex.appendChild(el("p", "", msg));
    if (E.reglesRatees.length) {
      var bo = el("div", "boite-avant"); bo.appendChild(el("strong", "", "📒 À retenir :"));
      var ul = el("ul");
      E.reglesRatees.slice(0, 4).forEach(function (r) { ul.appendChild(el("li", "", J.regles_texte[r] || r)); });
      bo.appendChild(ul); ex.appendChild(bo);
    }
    var b = el("button", "gros", "🔁 Une autre série"); b.type = "button";
    b.onclick = function () { E.resultats = []; E.reglesRatees = []; musique("match"); introEntrainement(); reinitialiserScene(equipeNous(), "#4a6cd4"); majHud(); };
    var m = el("button", "petit", "☰ Menu"); m.type = "button";
    m.onclick = function () { arreter(); J.match.menu(); };
    ex.appendChild(b); ex.appendChild(m);
  }

  /* ============================================================
     2. TIRS AU BUT DE FIN DE MATCH (après la prolongation, si c'est encore nul)
     opts = { def, nomNous, nomEux, niveau(E) -> 1..5, exclus (liste partagée avec le match), onFin(res), surQuitter() }
     res = { nous, eux, gagne, reglesRatees }
     ============================================================ */
  // Qui a gagné ? "nous", "eux" ou null (on continue).  Série de 5, puis mort subite.
  T.verdict = function (nous, eux, n5, plafond) {
    var n = nous.length, e = eux.length, bn = butsDe(nous), be = butsDe(eux), rn, re;
    n5 = n5 || 5;
    if (n >= n5 && e >= n5) {
      if (n === e && bn !== be) { return bn > be ? "nous" : "eux"; }
      if (plafond && n === e && n >= n5 + plafond) { return "nous"; }     // sécurité : jamais de série infinie
      return null;
    }
    rn = Math.max(0, n5 - n); re = Math.max(0, n5 - e);
    if (bn > be + re) { return "nous"; }
    if (be > bn + rn) { return "eux"; }
    return null;
  };

  T.serieMatch = function (opts) {
    brancherFixes();
    var c = cfg();
    E = nouvelleSeance("match");
    E.nous = []; E.eux = []; E.tour = "nous";
    E.nomNous = opts.nomNous; E.nomEux = opts.nomEux;
    E.eqNous = equipeNous(); E.eqAdv = equipeAdv(opts.def);
    E.exclus = opts.exclus || [];
    E.n5 = c.serie || 5; E.plafond = (c.mortSubiteMax != null) ? c.mortSubiteMax : 10;
    E.niveau = function (etat) { return opts.niveau(etat); };
    E.surQuitter = opts.surQuitter;
    E.onFin = opts.onFin;
    musique("match-tension");
    montrerEcran();
    reinitialiserScene(E.eqNous, couleurGardien(E.eqAdv, "#4a6cd4"));
    majHud();
    introMatch();
  };
  function introMatch() {
    viderBas();
    var ex = $("t-extra");
    ex.appendChild(el("div", "titre-menu", "🥅 Tirs au but !"));
    ex.appendChild(el("p", "", "Égalité même après la prolongation. " + E.n5 + " tirs chacun, puis un tir de plus chacun jusqu'à ce qu'il y ait un gagnant."));
    ex.appendChild(el("p", "", "À ton tour de tirer, tu tires dans le coin du bon petit mot. Quand " + E.nomEux + " tire, tu es le gardien : le bon petit mot fait plonger ton gardien du bon côté. Une seule chance à chaque fois."));
    var b = el("button", "gros", "⚽ C'est parti !"); b.type = "button";
    b.onclick = function () { son("sifflet-debut"); prochainMatch(); };
    ex.appendChild(b);
  }
  function prochainMatch() {
    var v = T.verdict(E.nous, E.eux, E.n5, E.plafond);
    if (v) { return finMatch(v); }
    E.tour = (E.nous.length <= E.eux.length) ? "nous" : "eux";
    E.rondeSubite = (E.nous.length >= E.n5 && E.eux.length >= E.n5) ? (E.nous.length - E.n5 + 1) : 0;
    var role = (E.tour === "nous") ? "tireur" : "gardien";
    unTir(role, function (tir) {
      if (role === "tireur") { E.nous.push(tir.but); } else { E.eux.push(!!tir.but); }
      var v2 = T.verdict(E.nous, E.eux, E.n5, E.plafond);
      return { texte: v2 ? "Voir le résultat ▶" : "Tir suivant ▶", suite: prochainMatch };
    });
  }
  function finMatch(v) {
    viderBas(); annulerMinuteurs();
    var ex = $("t-extra"), gagne = (v === "nous"), bn = butsDe(E.nous), be = butsDe(E.eux);
    majHud();
    reinitialiserScene(gagne ? E.eqNous : E.eqAdv, couleurGardien(gagne ? E.eqAdv : E.eqNous, "#4a6cd4"), gagne ? "noir" : "brun");
    bulle(bn + " – " + be, gagne ? "t-bulle-ok" : "t-bulle-ko");
    ex.appendChild(el("div", "titre-menu", gagne ? "🏆 Victoire aux tirs au but !" : "Défaite aux tirs au but"));
    ex.appendChild(el("p", "texte-pause", E.nomNous + " " + bn + " – " + be + " " + E.nomEux + " aux tirs au but"));
    if (E.reglesRatees.length) {
      var bo = el("div", "boite-avant"); bo.appendChild(el("strong", "", "📒 À retenir :"));
      var ul = el("ul");
      E.reglesRatees.slice(0, 4).forEach(function (r) { ul.appendChild(el("li", "", J.regles_texte[r] || r)); });
      bo.appendChild(ul); ex.appendChild(bo);
    }
    var b = el("button", "gros", "Voir le résultat du match ▶"); b.type = "button";
    b.onclick = function () {
      arreter();
      var res = { nous: bn, eux: be, gagne: gagne, reglesRatees: E.reglesRatees.slice() };
      var f = E.onFin; E = null;
      if (f) { f(res); }
    };
    ex.appendChild(b);
  }

  // pour les tests automatiques
  T._etat = function () { return { E: E, Q: Q }; };
})(typeof window !== "undefined" ? window : this);
