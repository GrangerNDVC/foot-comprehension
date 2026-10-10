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
        window.speechSynthesis.speak(u);
        return true;
      } catch (e) { return false; }
    },
    stop: function () {
      try { window.speechSynthesis.cancel(); } catch (e) {}
    }
  };
})();
