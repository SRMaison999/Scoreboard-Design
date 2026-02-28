# Intégrations

Ce chapitre couvre les cinq modules d'intégration disponibles dans le panneau éditeur, sous le groupe **Intégrations**.

---

## 1. Import de rosters

### Présentation

Permet d'importer des compositions d'équipe depuis des fichiers externes au lieu de saisir chaque joueur manuellement.

### Formats supportés

| Format | Extensions | Détails |
|--------|-----------|---------|
| CSV | `.csv` | Colonnes séparées par virgule ou point-virgule. Colonnes reconnues : `number`/`no`/`#`, `name`/`nom`, `position`/`pos` |
| TSV | `.tsv` | Colonnes séparées par tabulation. Mêmes alias de colonnes que le CSV |
| Texte | `.txt` | Fichier texte tabulé ou avec séparateur, interprété comme CSV/TSV |
| Excel | `.xlsx`, `.xls` | Première feuille du classeur. Mêmes alias de colonnes que le CSV |
| JSON | `.json` | Tableau de joueurs, ou objet avec clé `players` ou `roster` |

### Utilisation

1. Dans la section **Roster** de l'éditeur, cliquer sur le bouton **Importer**
2. Dans la modale, glisser-déposer un fichier ou cliquer pour parcourir
3. Un aperçu des joueurs détectés s'affiche dans un tableau
4. Choisir le mode d'import :
   - **Remplacer** : écrase le roster existant
   - **Ajouter** : fusionne avec le roster existant (limite de 25 joueurs)
5. Valider l'import

### Export

Trois formats d'export sont disponibles via le bouton **Exporter** :
- CSV : fichier texte avec en-têtes
- JSON : tableau d'objets avec `number`, `name`, `position`
- Excel : classeur `.xlsx`

### Limites

- Maximum 25 joueurs par équipe
- Les positions invalides sont marquées comme vides
- Les lignes sans numéro ni nom sont ignorées

---

## 2. API scores temps réel

### Présentation

Connecte le scoreboard à une source de données externe (API de ligue, serveur de stats) pour recevoir automatiquement les mises à jour de score, de temps et de pénalités.

### Configuration

| Champ | Description |
|-------|-------------|
| **Point de terminaison** | URL du serveur. Préfixe `ws://` ou `wss://` pour WebSocket, `http://` ou `https://` pour le polling HTTP |
| **ID du match** | Identifiant du match à suivre |
| **Mise à jour auto** | Active/désactive la synchronisation automatique des données reçues |

### Modes de connexion

- **WebSocket** : connexion persistante, données poussées en temps réel
- **Polling HTTP** : requête toutes les 5 secondes (mode fallback)

### Données reçues

Les données live peuvent mettre à jour :
- Scores des deux équipes
- Temps de jeu et période
- Pénalités actives (joueur, infraction, durée)

### Statuts

| Statut | Signification |
|--------|---------------|
| Déconnecté | Pas de connexion active |
| Connexion... | Tentative de connexion en cours |
| Connecté | Données reçues normalement |
| Erreur | Problème de connexion ou de données |

---

## 3. Multi-scoreboard (overlays)

### Présentation

Permet d'afficher plusieurs formats de scoreboard simultanément sur la fenêtre de sortie : lower third, score bug, ticker défilant.

### Types d'overlay

| Type | Description |
|------|-------------|
| **Lower Third** | Barre inférieure pleine largeur affichant équipes, score, temps et période |
| **Score Bug** | Affichage compact de score, positionnable en 6 positions (haut/milieu/bas, gauche/droite) |
| **Ticker** | Bandeau défilant avec texte personnalisable |

### Gestion des overlays

- **Ajouter** : boutons dédiés pour chaque type (maximum 10 overlays)
- **Visibilité** : basculer l'affichage de chaque overlay individuellement
- **Position** : choisir parmi 6 positions prédéfinies (score bug)
- **Opacité** : régler la transparence de chaque overlay (0 à 100%)
- **Supprimer** : retirer un overlay de la liste

### Ticker

- Ajouter des éléments de texte qui défilent en boucle
- Régler la vitesse de défilement (10 à 200 pixels par seconde)
- Maximum 20 éléments de texte

---

## 4. Synchronisation multi-poste

### Présentation

Permet à plusieurs postes de travail de partager le même état du scoreboard en temps réel via WebSocket. Utile pour les productions avec plusieurs opérateurs.

### Rôles

| Rôle | Droits |
|------|--------|
| **Admin** | Contrôle total, peut envoyer et recevoir les mises à jour |
| **Opérateur** | Peut envoyer et recevoir les mises à jour |
| **Viewer** | Lecture seule, reçoit les mises à jour sans pouvoir les modifier |

### Configuration

| Champ | Description |
|-------|-------------|
| **URL du serveur** | Adresse du serveur WebSocket de synchronisation |
| **Rôle** | Admin, opérateur ou viewer |

### Fonctionnement

1. Configurer l'URL du serveur et le rôle
2. Cliquer sur **Connecter**
3. Les pairs connectés apparaissent dans la liste avec leur nom et rôle
4. Les modifications de l'état sont propagées automatiquement selon le rôle

### Protocole

Les messages échangés suivent un protocole structuré :
- `STATE_UPDATE` : mise à jour partielle de l'état
- `FULL_SYNC` : synchronisation complète de l'état
- `PEER_JOIN` / `PEER_LEAVE` : notifications de connexion/déconnexion
- `REQUEST_SYNC` : demande de synchronisation initiale

La reconnexion automatique est gérée avec backoff exponentiel (jusqu'à 5 tentatives).

---

## 5. Export de données (Broadcast)

### Présentation

Permet d'exporter les données du scoreboard au format JSON structuré. Le bouton **Snapshot** télécharge un fichier JSON contenant l'état complet du scoreboard.

### Configuration

| Champ | Description |
|-------|-------------|
| **Port WebSocket** | Port de configuration (préparation pour une future connexion réseau) |
| **Port HTTP** | Port de configuration (préparation pour une future connexion réseau) |
| **Export fichier** | Active la génération périodique de frames |
| **Chemin du fichier** | Chemin de sortie configuré |
| **Intervalle** | Fréquence de génération des frames (en millisecondes, défaut : 1000) |

### Fonctionnement

1. Cliquer sur **Démarrer** pour activer la génération de frames
2. Les statistiques s'affichent :
   - Nombre de frames générées
   - Heure de la dernière frame
3. Cliquer sur **Snapshot** pour télécharger un fichier JSON contenant l'état complet du scoreboard

### Format des données

Les données sont organisées en trois couches :
- **Template** : design, couleurs, polices
- **Match** : équipes, rosters, phases
- **Frame** : scores, temps, pénalités

Le format utilise le delta encoding : seules les différences entre deux frames consécutives sont calculées.

### Arrêt

Cliquer sur **Arrêter** pour couper la génération. Le compteur de frames est réinitialisé.
