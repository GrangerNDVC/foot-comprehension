# Chantier 10 : bruitages et musiques (20/10/2026)

## Ce qui est fait dans le jeu
- Nouveau : `js/sons.js`, `data/sons-reglages.js`, `outils-test/sons.html`, dossier `assets/audio/` (sfx + musique) avec RANGEMENT-SONS.md et CREDITS-SONS.md.
- Modifiés : `js/match.js` (déclenche les sons), `index.html` (3 boutons son + 2 scripts), `js/main.js`, `js/audio.js` (la musique baisse pendant « 🔊 Écouter »), `css/jeu.css`, `CREDITS.md`.
- Principe : le jeu cherche ton fichier .mp3 ; s'il n'existe pas, il fabrique un bruitage simple dans le navigateur (Web Audio). Les musiques absentes = silence. Le jeu reste jouable si le son échoue.
- Le son ne démarre qu'après le premier appui (règle des iPad). Boutons : 🔊 dans le match (tout couper / tout remettre), « Bruitages » et « Musique » séparés dans le menu. Choix mémorisé dans le navigateur.

## Arborescence à créer (déjà dans le zip)
```
assets/
└─ audio/
   ├─ RANGEMENT-SONS.md
   ├─ CREDITS-SONS.md
   ├─ sfx/        ← 17 fichiers .mp3
   └─ musique/    ← 8 fichiers .mp3
```
Garde tes fichiers d'origine (wav, gros fichiers) HORS du dépôt GitHub, dans un dossier à toi (par ex. « sons-originaux »).

## Les 17 bruitages (dossier assets/audio/sfx/)
Chaque bruitage peut être déposé en **.mp3 ou .wav** (même nom, extension au choix ; le .mp3 est essayé en premier, puis le .wav, puis le bruit fabriqué). Les musiques restent en .mp3.
Durée visée = durée du fichier final, silence du début coupé (sinon le son arrive en retard).

| Fichier | Quand | Durée | Description | Mots à chercher (anglais, sites de sons) |
|---|---|---|---|---|
| clic.mp3 | tout bouton de menu | 0,1 s | petit clic doux | ui click, soft button click |
| sifflet-debut.mp3 | coup d'envoi | 0,7-1 s | un coup de sifflet d'arbitre | referee whistle, single |
| sifflet-mitemps.mp3 | mi-temps | 1-1,5 s | deux coups de sifflet | referee whistle double |
| sifflet-fin.mp3 | fin du match | 1,5-2 s | trois coups, le dernier long | final whistle, three blasts |
| coup-de-pied.mp3 | passe, dribble, dégagement réussis | 0,2-0,4 s | ballon frappé du pied, sec | soccer ball kick, football pass |
| tir.mp3 | tir (le nôtre et celui de l'adversaire) | 0,4-0,6 s | frappe puissante | soccer shot, powerful kick |
| tacle.mp3 | tacle, contre, interception, blocage réussis | 0,3-0,5 s | glissade sur l'herbe, choc | slide tackle, grass slide, swoosh |
| arret-gardien.mp3 | arrêt du gardien | 0,3-0,6 s | claque de gants sur le ballon | goalkeeper save, ball catch gloves |
| but-nous.mp3 | NOTRE but | 3-4 s | foule qui explose de joie | goal cheer, stadium crowd cheering |
| but-adverse.mp3 | but ADVERSE | 1,5-2 s | foule déçue, « ohhh » (pas moqueur) | crowd groan, disappointed crowd |
| bonne-reponse.mp3 | bonne réponse | 0,4-0,8 s | petit « ding » joyeux à deux notes | correct answer chime, success ding |
| mauvaise-reponse.mp3 | mauvaise réponse | 0,3-0,5 s | son DOUX et neutre (jamais un « buzzer » humiliant) | soft wrong, gentle error, low tone |
| indice.mp3 | deuxième chance, indice affiché | 0,3-0,5 s | petite étincelle | hint sparkle, magic twinkle short |
| carton.mp3 | carton jaune ou rouge | 0,8-1 s | sifflet court + froissement | referee card, whistle short |
| blessure.mp3 | joueur blessé | 0,8-1,2 s | deux sifflets courts urgents | whistle urgent short, injury stop |
| prolongation.mp3 | début de la prolongation | 2 s | coup de gong grave et tendu | gong hit, dramatic low gong |
| victoire-tournoi.mp3 | fin du championnat | 4-6 s | fanfare + applaudissements | victory fanfare, trophy celebration |

**Où chercher** (vérifie toujours la licence de CHAQUE son et note-la dans CREDITS-SONS.md) : Freesound (filtre licence « Creative Commons 0 »), Pixabay (rubrique Sound Effects), Mixkit, OpenGameArt, Kenney.nl (packs audio libres de droits). Évite les sons « Attribution NonCommercial » mélangés sans les noter. Usage en classe, dépôt privé : reste prudente sur tout son dont la licence interdit la redistribution.

## Les 8 musiques (dossier assets/audio/musique/)
Le jeu est un jeu de LECTURE : musiques douces, sans paroles, sans mélodie envahissante. Elles jouent déjà à volume bas (réglable dans data/sons-reglages.js).

| Fichier | Où elle joue | Durée | Boucle |
|---|---|---|---|
| menu.mp3 | écran d'accueil | 60-90 s | oui |
| histoire.mp3 | texte d'avant-match | 60 s | oui |
| match.mp3 | matchs 1 à 4 | 90-120 s | oui |
| match-tension.mp3 | matchs 5 et 6, prolongation | 90-120 s | oui |
| mi-temps.mp3 | écran de mi-temps | 30-45 s | oui |
| victoire.mp3 | écran de fin, match gagné | 8-12 s | non |
| defaite.mp3 | écran de fin, match perdu ou nul | 6-10 s | non |
| fin-championnat.mp3 | fin du tournoi | 20-30 s | non |

### Prompts pour les générateurs de musique
Colle-les tels quels (l'anglais donne de meilleurs résultats). Ajoute si ton outil le permet : « instrumental », « no vocals », « seamless loop » pour celles en boucle. Ne cite ni la série, ni un compositeur, ni un morceau existant.

1. **menu.mp3** : `Instrumental video game menu music, bright and friendly 8-bit chiptune mixed with soft acoustic guitar, 110 bpm, major key, optimistic sporty atmosphere, gentle melody, no vocals, seamless loop, 75 seconds`
2. **histoire.mp3** : `Calm instrumental storytelling music for a school sports adventure, warm piano and soft strings, slow tempo 80 bpm, hopeful and slightly mysterious, very sparse melody that does not distract from reading, no vocals, seamless loop, 60 seconds`
3. **match.mp3** : `Instrumental football game background music, light energetic chiptune with a steady drum groove and a simple bass line, 118 bpm, cheerful, focused, minimal melody so the player can read and think, no vocals, seamless loop, 100 seconds`
4. **match-tension.mp3** : `Instrumental sports game music for a tense final match, driving chiptune drums and pulsing bass, 128 bpm, determined and a little dramatic, rising energy but still not too busy, no vocals, no aggressive sounds, seamless loop, 100 seconds`
5. **mi-temps.mp3** : `Short relaxing instrumental interlude, soft marimba and light pad, 90 bpm, calm and reassuring, a breath between two halves, no vocals, seamless loop, 35 seconds`
6. **victoire.mp3** : `Short triumphant victory jingle, bright chiptune fanfare with a cheerful ending chord, 10 seconds, joyful, no vocals`
7. **defaite.mp3** : `Short gentle encouraging jingle after a lost game, soft piano and light strings, hopeful rather than sad, resolving to a warm major chord, 8 seconds, no vocals`
8. **fin-championnat.mp3** : `Epic but joyful instrumental championship celebration theme, full chiptune and brass fanfare building to a big finale, triumphant, 25 seconds, no vocals`

**Conseils** : prends des musiques sans paroles ; normalise le volume (les 8 doivent avoir un volume proche) ; exporte en mp3 mono ou stéréo 96-128 kbps (≈ 1,5 Mo pour 2 minutes) ; surveille la licence du générateur (certaines offres gratuites interdisent un usage hors usage personnel : note la mention dans CREDITS-SONS.md). Pour les boucles, écoute la fin et le début : s'il y a un « trou » audible, demande une version « loop » ou termine le morceau par un fondu.

## Quand chaque son se déclenche (pour régler)
| Moment | Son |
|---|---|
| clic sur un bouton (hors réponses) | clic |
| coup d'envoi | sifflet-debut + musique du match |
| réponse | bonne-reponse ou mauvaise-reponse ; indice si deuxième chance |
| 0,45 s après la réponse | coup-de-pied / tir / tacle / arret-gardien selon l'action |
| 1,1 s après un tir | but-nous (ou arret-gardien si raté) |
| but adverse | tir puis but-adverse |
| sanction | carton ou blessure (1 s plus tard) |
| mi-temps | sifflet-mitemps + musique mi-temps |
| prolongation | prolongation + musique match-tension |
| fin de match | sifflet-fin, puis victoire ou defaite 1,8 s plus tard |
| fin du championnat | victoire-tournoi, puis fin-championnat |
Les délais sont dans js/match.js (fonction sonsAction) : à ajuster après essai.

## Tester
1. Ouvre `outils-test/sons.html`, appuie sur « Activer le son », puis ▶ sur chaque ligne : « ✔ fichier » = ton mp3 est lu, « ⚠ synthèse » = absent, le jeu utilise un bruit fabriqué.
2. Fais-le sur l'iPad (pas seulement sur le PC).

## Ce qui n'a pas pu être écouté ici
J'ai testé : le code, l'absence d'erreur, les boutons, la mémorisation du choix, la détection d'un fichier mp3 et le repli sur les sons fabriqués. Je n'ai PAS pu écouter le rendu : volumes, synchronisation avec les animations, qualité des sons fabriqués et lecture sur ton iPad Mini 2 sont à vérifier par toi.

## Ligne pour le Journal
- 2026-10-20 : chantier 10 (bruitages et musiques : js/sons.js, data/sons-reglages.js, outils-test/sons.html, assets/audio/, boutons son). Modifiés : js/match.js, index.html, js/main.js, js/audio.js, css/jeu.css, CREDITS.md. Restent : 9b, 9c, 11, 12 ; déposer les fichiers .mp3 dans assets/audio/.
