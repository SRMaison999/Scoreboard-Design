# Animations, effets visuels et overlays

[Sommaire](./README.md) | [Chapitre précédent](./06-medias.md) | [Chapitre suivant](./08-templates-et-exports.md)

---

## Animations du scoreboard

**Entrée et sortie** — Le scoreboard peut apparaître et disparaître avec des animations configurables : fondu, glissement depuis le haut, le bas, la gauche ou la droite. Durée de 100 à 2 000 ms, avec 5 courbes de lissage disponibles.

**Pop sur changement de score** — À chaque but, le score s'agrandit brièvement pour capter l'attention du téléspectateur. Durée configurable de 100 à 1 000 ms.

**Flash de pénalité** — Effet de couleur flash lors de l'ajout d'une nouvelle pénalité. Durée de 200 à 1 500 ms.

**Pulsation de l'horloge** — Animation subtile de pulsation quand l'horloge passe sous un seuil configurable (5 à 60 secondes), signalant les derniers instants d'une période.

## Effets visuels dans le Layout libre

Chaque élément du Layout libre dispose de contrôles d'effets avancés : opacité globale de l'élément, ombre portée configurable (décalage X/Y, flou, couleur, opacité), et flou d'arrière-plan pour les compositions avec transparence.

## Système d'overlays multi-scoreboard

Pour les productions broadcast complexes, Scoreboard Design permet de superposer plusieurs habillages simultanément dans la fenêtre de sortie :

**Lower Third** — Bandeau inférieur pleine largeur affichant les équipes, le score, le temps et la période. L'habillage classique pour les retransmissions.

**Score Bug** — Affichage compact du score, positionnable dans 6 emplacements (coins et milieux de l'écran). Pour une présence discrète mais constante.

**Ticker** — Bandeau défilant avec texte animé, vitesse de défilement configurable de 10 à 200 pixels par seconde. Pour les résultats d'autres matchs ou les informations en continu.

Jusqu'à 10 overlays peuvent être actifs simultanément, chacun avec son propre contrôle de visibilité, de position et d'opacité.

---

[Chapitre suivant : Templates, rosters et exports](./08-templates-et-exports.md)
