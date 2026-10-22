/* Lecture à voix haute (synthèse vocale du navigateur, gratuite). */
(function () {
  var J = window.JEU = window.JEU || {};
  J.audio = {
    lire: function (texte) {
      try {
        if (!("speechSynthesis" in window)) { return false; }
        window.speechSynthesis.cancel();
        var u = new SpeechSynthesisUtterance(texte);
        u.lang = "fr-FR";
        u.rate = 0.85;
        var fin = function () { try { if (J.sons) { J.sons.baisserMusique(false); } } catch (e) {} };
        u.onend = fin; u.onerror = fin;
        try { if (J.sons) { J.sons.baisserMusique(true); } } catch (e) {}
        window.speechSynthesis.speak(u);
        return true;
      } catch (e) { return false; }
    },
    stop: function () {
      try { window.speechSynthesis.cancel(); if (J.sons) { J.sons.baisserMusique(false); } } catch (e) {}
    }
  };
})();
