# Trois modes, un seul flux de travail

[Sommaire](./README.md) | [Chapitre précédent](./01-introduction.md) | [Chapitre suivant](./03-layout-libre.md)

---

L'application s'articule autour de trois vues synchronisées en temps réel qui couvrent l'intégralité de la chaîne de production broadcast :

## Mode Éditeur — Le terrain de jeu du designer

Le coeur de Scoreboard Design. Un espace de travail professionnel avec un panneau de contrôle latéral et un canvas de prévisualisation en temps réel. Chaque modification — couleur, police, taille, position — se reflète instantanément sur la prévisualisation à la résolution native de diffusion.

Le panneau de l'éditeur organise plus de 28 sections de paramétrage en groupes logiques : contenu (équipes, scores, phases, pénalités, photos, logos), apparence (couleurs, typographies, tailles, arrière-plans, résolutions), horloge (contrôle du temps, phases de match), animations et export, intégrations externes. Tout est accessible en quelques clics, sans jamais perdre de vue le résultat final.

## Mode Opérateur — La simplicité du live

Une interface épurée, conçue pour le rythme effréné d'un match en direct. Seuls les contrôles essentiels sont affichés : boutons de score, gestion de l'horloge, sélection des phases, ajout de pénalités. L'opérateur peut piloter l'intégralité du scoreboard au clavier — barre d'espace pour l'horloge, flèches pour les scores, touches numériques pour les pénalités — sans jamais détourner le regard de l'action sur la glace.

Chaque action de l'opérateur se propage instantanément vers la fenêtre de sortie. Aucun délai, aucune manipulation intermédiaire.

### Raccourcis clavier du mode opérateur

| Action | Raccourci |
|--------|-----------|
| Horloge start/stop | Barre d'espace |
| Réinitialiser l'horloge | R |
| Score équipe 1 +/- | Flèches gauche/droite |
| Score équipe 2 +/- | Flèches haut/bas |
| Phase suivante | P |
| Pénalité rapide équipe 1/2 | 1 / 2 |
| Plein écran | F11 |

## Mode Sortie — Le signal broadcast

Une fenêtre dédiée, affichant uniquement le scoreboard à la résolution native (1920x1080, 4K, ou toute résolution personnalisée). Cette fenêtre est conçue pour être capturée par les logiciels de production vidéo — OBS Studio, vMix, Wirecast — via capture de fenêtre ou source navigateur. Rien d'autre que le rendu final : pas de menus, pas de bordures, pas d'interface. Juste le scoreboard, prêt pour l'antenne.

---

[Chapitre suivant : Le Layout libre](./03-layout-libre.md)
