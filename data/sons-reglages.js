/* ============================================================
   RÉGLAGES DU SON (chantier 10)
   Le jeu cherche d'abord un vrai fichier dans assets/audio/. S'il n'existe pas (ou s'il ne se lit pas),
   js/sons.js fabrique un bruitage simple dans le navigateur : le jeu reste donc jouable et sonore même sans fichier.
   Pour ajouter un son : déposer le fichier .mp3 avec EXACTEMENT ce nom dans assets/audio/sfx/ (bruitages)
   ou assets/audio/musique/ (musiques). Rien d'autre à modifier.
   volume : de 0 (muet) à 1 (plein). boucle : la musique recommence quand elle est finie.
   ============================================================ */
window.JEU = window.JEU || {};
JEU.sonsReglages = {
  dossier: "assets/audio/",
  volumeEffets: 0.8,        // volume général des bruitages
  volumeMusique: 0.35,      // volume général des musiques (assez bas pour ne pas gêner la lecture)
  volumeMusiqueParole: 0.12,// volume de la musique pendant « 🔊 Écouter » (lecture à voix haute)
  matchTension: 4,          // à partir du match n° (0 = essai) : musique « match-tension » au lieu de « match »
  effets: {
    "clic":             { volume: 0.5 },
    "sifflet-debut":    { volume: 0.7 },
    "sifflet-mitemps":  { volume: 0.7 },
    "sifflet-fin":      { volume: 0.7 },
    "coup-de-pied":     { volume: 0.8 },
    "tir":              { volume: 0.9 },
    "tacle":            { volume: 0.8 },
    "arret-gardien":    { volume: 0.9 },
    "but-nous":         { volume: 1.0 },
    "but-adverse":      { volume: 0.8 },
    "bonne-reponse":    { volume: 0.7 },
    "mauvaise-reponse": { volume: 0.6 },
    "indice":           { volume: 0.5 },
    "carton":           { volume: 0.7 },
    "blessure":         { volume: 0.7 },
    "prolongation":     { volume: 0.8 },
    "victoire-tournoi": { volume: 1.0 }
  },
  musiques: {
    "menu":            { boucle: true,  volume: 1 },
    "histoire":        { boucle: true,  volume: 1 },
    "match":           { boucle: true,  volume: 1 },
    "match-tension":   { boucle: true,  volume: 1 },
    "mi-temps":        { boucle: true,  volume: 1 },
    "victoire":        { boucle: false, volume: 1 },
    "defaite":         { boucle: false, volume: 1 },
    "fin-championnat": { boucle: false, volume: 1 }
  }
};
