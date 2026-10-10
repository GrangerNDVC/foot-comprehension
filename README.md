# Match de compréhension

Serious game de foot : lire finement une phrase, une consigne, un texte, puis tirer au but.
4 paliers, du grossier au fin. Aucun serveur, aucun compte : tout tourne dans le navigateur.

## Lancer
- Ouvrir `index.html` (double-clic) ou, dans VS Code, « Live Server ».
- Sur Netlify : publier le dossier tel quel (pas de build).

## Où ranger les images
Voir `assets/RANGEMENT.md` : un tableau dossier par dossier avec les noms exacts.
Sans images, le jeu fonctionne quand même (formes simples à la place).

## Organisation
```
index.html
css/jeu.css
js/            le moteur (assets, audio, progression, scene, moteur, main)
data/          les exercices : un fichier par palier  (palier1.js … palier4.js)
assets/
  manifest.js  le catalogue des images (id, dossier, fichier, rôle, taille)
  anims.js     quelles images pour quelles animations + position des éléments de la scène
  ballon/ joueurs/ gardiens/ decors/
```

## Ajouter ou modifier des exercices
Ouvrir `data/palierN.js`, copier un bloc `{ ... }`, changer les textes.
- `niveau` : 1 (grossier) à 5 (fin). Le jeu les présente du plus facile au plus fin.
- `options` : les réponses ; `bonne` : le numéro de la bonne (0 = la première).
- Palier 1 : `indices` (du plus général au plus précis). Paliers 2 à 4 : `consigne` (+ `situation` facultative).

## Régler la scène
`assets/anims.js` : positions du tireur, du gardien, du but, des 3 zones de tir ; images de chaque animation.
Si le gardien plonge du mauvais côté : changer `sensPlongeon` (« droite » ou « gauche »).

## Pistes pour la suite
- Palier hors foot : mêmes types de consignes dans des contextes scolaires (maths, SVT, recettes).
- Plusieurs équipes adverses, décors variés (tribunes, ciel, filets en gros plan).
- Mode « Défi » avec timer, bilan par type d'erreur (mots de négation, ordre, quantité…).
