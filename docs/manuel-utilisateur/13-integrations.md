# Integrations

Ce chapitre couvre les cinq modules d'integration disponibles dans le panneau editeur, sous le groupe **Integrations**.

---

## 1. Import de rosters (CSV, Excel, JSON)

### Presentation

Permet d'importer des compositions d'equipe depuis des fichiers externes au lieu de saisir chaque joueur manuellement.

### Formats supportes

| Format | Extensions | Details |
|--------|-----------|---------|
| CSV | `.csv` | Colonnes separees par virgule ou point-virgule. Colonnes reconnues : `number`/`no`/`#`, `name`/`nom`, `position`/`pos` |
| Excel | `.xlsx`, `.xls` | Premiere feuille du classeur. Memes alias de colonnes que le CSV |
| JSON | `.json` | Tableau de joueurs, ou objet avec cle `players` ou `roster` |

### Utilisation

1. Dans la section **Roster** de l'editeur, cliquer sur le bouton **Importer**
2. Dans la modale, glisser-deposer un fichier ou cliquer pour parcourir
3. Un apercu des joueurs detectes s'affiche dans un tableau
4. Choisir le mode d'import :
   - **Remplacer** : ecrase le roster existant
   - **Ajouter** : fusionne avec le roster existant (limite de 25 joueurs)
5. Valider l'import

### Export

Trois formats d'export sont disponibles via le bouton **Exporter** :
- CSV : fichier texte avec en-tetes
- JSON : tableau d'objets avec `number`, `name`, `position`
- Excel : classeur `.xlsx`

### Limites

- Maximum 25 joueurs par equipe
- Les positions invalides sont marquees comme vides
- Les lignes sans numero ni nom sont ignorees

---

## 2. API scores temps reel

### Presentation

Connecte le scoreboard a une source de donnees externe (API de ligue, serveur de stats) pour recevoir automatiquement les mises a jour de score, de temps et de penalites.

### Configuration

| Champ | Description |
|-------|-------------|
| **Point de terminaison** | URL du serveur. Prefixe `ws://` ou `wss://` pour WebSocket, `http://` ou `https://` pour le polling HTTP |
| **ID du match** | Identifiant du match a suivre |
| **Mise a jour auto** | Active/desactive la synchronisation automatique des donnees recues |

### Modes de connexion

- **WebSocket** : connexion persistante, donnees poussees en temps reel
- **Polling HTTP** : requete toutes les 5 secondes (mode fallback)

### Donnees recues

Les donnees live peuvent mettre a jour :
- Scores des deux equipes
- Temps de jeu et periode
- Penalites actives (joueur, infraction, duree)

### Statuts

| Statut | Signification |
|--------|---------------|
| Deconnecte | Pas de connexion active |
| Connexion... | Tentative de connexion en cours |
| Connecte | Donnees recues normalement |
| Erreur | Probleme de connexion ou de donnees |

---

## 3. Multi-scoreboard (overlays)

### Presentation

Permet d'afficher plusieurs formats de scoreboard simultanement sur la fenetre de sortie : lower third, score bug, ticker defilant.

### Types d'overlay

| Type | Description |
|------|-------------|
| **Lower Third** | Barre inferieure pleine largeur affichant equipes, score, temps et periode |
| **Score Bug** | Affichage compact de score, positionnable en 6 positions (haut/milieu/bas, gauche/droite) |
| **Ticker** | Bandeau defilant avec texte personnalisable |

### Gestion des overlays

- **Ajouter** : boutons dedies pour chaque type (maximum 10 overlays)
- **Visibilite** : basculer l'affichage de chaque overlay individuellement
- **Position** : choisir parmi 6 positions predefinies (score bug)
- **Opacite** : regler la transparence de chaque overlay (0 a 100%)
- **Supprimer** : retirer un overlay de la liste

### Ticker

- Ajouter des elements de texte qui defilent en boucle
- Regler la vitesse de defilement (1 a 200 pixels par seconde)
- Maximum 20 elements de texte

---

## 4. Synchronisation multi-poste

### Presentation

Permet a plusieurs postes de travail de partager le meme etat du scoreboard en temps reel via WebSocket. Utile pour les productions avec plusieurs operateurs.

### Roles

| Role | Droits |
|------|--------|
| **Admin** | Controle total, peut envoyer et recevoir les mises a jour |
| **Operateur** | Peut envoyer et recevoir les mises a jour |
| **Viewer** | Lecture seule, recoit les mises a jour sans pouvoir les modifier |

### Configuration

| Champ | Description |
|-------|-------------|
| **URL du serveur** | Adresse du serveur WebSocket de synchronisation |
| **Role** | Admin, operateur ou viewer |

### Fonctionnement

1. Configurer l'URL du serveur et le role
2. Cliquer sur **Connecter**
3. Les pairs connectes apparaissent dans la liste avec leur nom et role
4. Les modifications de l'etat sont propagees automatiquement selon le role

### Protocole

Les messages echanges suivent un protocole structure :
- `STATE_UPDATE` : mise a jour partielle de l'etat
- `FULL_SYNC` : synchronisation complete de l'etat
- `PEER_JOIN` / `PEER_LEAVE` : notifications de connexion/deconnexion
- `REQUEST_SYNC` : demande de synchronisation initiale

La reconnexion automatique est geree avec backoff exponentiel (jusqu'a 5 tentatives).

---

## 5. Integration CasparCG / Viz

### Presentation

Permet de streamer les donnees du scoreboard vers des systemes broadcast professionnels (CasparCG, Vizrt) via WebSocket et/ou export de fichiers JSON.

### Configuration

| Champ | Description |
|-------|-------------|
| **Port WebSocket** | Port d'ecoute pour les clients CasparCG/Viz (defaut : 8080) |
| **Port HTTP** | Port pour l'acces HTTP aux donnees (defaut : 8081) |
| **Export fichier** | Active l'export automatique vers un fichier JSON |
| **Chemin du fichier** | Chemin du fichier JSON de sortie |
| **Intervalle** | Frequence de mise a jour du fichier (en millisecondes, defaut : 1000) |

### Fonctionnement

1. Configurer les ports et les options d'export
2. Cliquer sur **Demarrer** pour lancer le streaming
3. Les statistiques s'affichent en temps reel :
   - Nombre de clients connectes
   - Nombre de frames envoyees
   - Heure de la derniere frame
4. Utiliser **Snapshot** pour exporter manuellement un etat complet en JSON

### Format des donnees

Les donnees sont envoyees en trois couches :
- **Template** : design, couleurs, polices (change rarement)
- **Match** : equipes, rosters, phases (change entre les matchs)
- **Frame** : scores, temps, penalites (change chaque seconde)

Le streaming utilise le delta encoding : seules les differences entre deux frames consecutives sont envoyees, ce qui reduit la bande passante.

### Arret

Cliquer sur **Arreter** pour couper le streaming. Le compteur de frames et les statistiques sont reinitialises.
