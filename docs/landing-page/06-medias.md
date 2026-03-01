# Gestion des médias

[Sommaire](./README.md) | [Chapitre précédent](./05-personnalisation.md) | [Chapitre suivant](./07-animations-et-overlays.md)

---

## Photos de joueurs

Chaque joueur peut se voir attribuer une photo, associée à son équipe (code NOC) et son numéro de maillot. Les photos sont automatiquement recadrées en carré, compressées en WebP et affichées dans des cadres circulaires — ou en fallback avec le numéro du joueur quand aucune photo n'est disponible. Les photos persistent localement dans IndexedDB et sont partagées entre toutes les fenêtres de l'application.

## Système de logos à 4 niveaux

**Logos d'équipe** — Remplacent ou accompagnent les drapeaux nationaux dans le header. Trois modes d'affichage : drapeau seul, logo seul, ou les deux. Cela permet d'utiliser les logos de clubs ou de fédérations tout en conservant l'identification nationale.

**Logo de compétition** — Branding du tournoi positionnable dans 6 emplacements du canvas (coins et milieux) avec contrôle de taille. Pour l'identité visuelle de l'événement organisateur.

**Logo de sponsor** — Habillage commercial en superposition, également positionnable et dimensionnable.

**Drapeaux personnalisés** — Possibilité de remplacer les drapeaux SVG intégrés (31 nations de hockey couvertes) par des visuels sur mesure pour n'importe quel pays.

## Arrière-plans

L'arrière-plan du scoreboard peut être un dégradé à trois couleurs (haut, milieu, bas) ou une couleur unie. Une image d'arrière-plan peut également être appliquée pour des compositions plus riches (texture de glace, pattern graphique, branding d'événement).

## 31 nations de hockey intégrées

Tous les drapeaux des nations majeures du hockey sur glace sont intégrés directement dans l'application en SVG haute définition : Canada, États-Unis, Russie, Suède, Finlande, Tchéquie, Slovaquie, Suisse, Allemagne, Danemark, Norvège, Lettonie, Autriche, France, Biélorussie, Kazakhstan, Slovénie, Hongrie, Grande-Bretagne, Pologne, Italie, Japon, Corée du Sud, Chine, Roumanie, Croatie, Ukraine, Estonie, Lituanie, Serbie, Bulgarie.

Chaque drapeau peut être remplacé par un logo personnalisé si nécessaire.

---

[Chapitre suivant : Animations, effets visuels et overlays](./07-animations-et-overlays.md)
