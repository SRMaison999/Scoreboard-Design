import type { ManualChapter } from '@/types/userManual';

export const ch13: ManualChapter = {
  id: 'integrations',
  title: 'Int\u00e9grations',
  content: `## Emplacement

Les int\u00e9grations se trouvent dans le **panneau gauche**, onglet **Int\u00e9grations** (ic\u00f4ne de radio, 5e et derni\u00e8re ic\u00f4ne du rail de navigation). Cet onglet contient quatre sous-onglets : **Live** (API temps r\u00e9el), **Multi** (multi-scoreboard), **Sync** (synchronisation multi-poste) et **Broadcast** (CasparCG / Viz).

## 1. Import de rosters (CSV, Excel, JSON)

**Emplacement** : panneau gauche > onglet **Contenu** > sous-onglet **\u00c9quipes** > section **Roster**.

Permet d'importer des compositions d'\u00e9quipe depuis des fichiers externes.

| Format | Extensions |
|--------|-----------|
| CSV | .csv |
| Excel | .xlsx, .xls |
| JSON | .json |

Deux modes d'import : **Remplacer** (\u00e9crase le roster) ou **Ajouter** (fusionne, limite de 25 joueurs). Trois formats d'export : CSV, JSON, Excel.

## 2. API scores temps r\u00e9el

**Emplacement** : panneau gauche > onglet **Int\u00e9grations** > sous-onglet **Live**.

Connecte le scoreboard \u00e0 une source de donn\u00e9es externe pour recevoir automatiquement les mises \u00e0 jour de score, temps et p\u00e9nalit\u00e9s.

- **WebSocket** : connexion persistante, donn\u00e9es en temps r\u00e9el
- **Polling HTTP** : requ\u00eate toutes les 5 secondes (mode fallback)

## 3. Multi-scoreboard (overlays)

**Emplacement** : panneau gauche > onglet **Int\u00e9grations** > sous-onglet **Multi**.

Affiche plusieurs formats de scoreboard simultan\u00e9ment :

| Type | Description |
|------|-------------|
| Lower Third | Barre inf\u00e9rieure pleine largeur |
| Score Bug | Affichage compact positionnable |
| Ticker | Bandeau d\u00e9filant |

Maximum 10 overlays, chacun avec visibilit\u00e9 et opacit\u00e9 configurables.

## 4. Synchronisation multi-poste

**Emplacement** : panneau gauche > onglet **Int\u00e9grations** > sous-onglet **Sync**.

Partage l'\u00e9tat du scoreboard entre plusieurs postes via WebSocket.

| R\u00f4le | Droits |
|------|--------|
| Admin | Contr\u00f4le total |
| Op\u00e9rateur | Envoi et r\u00e9ception |
| Viewer | Lecture seule |

## 5. Int\u00e9gration CasparCG / Viz

**Emplacement** : panneau gauche > onglet **Int\u00e9grations** > sous-onglet **Broadcast**.

Streame les donn\u00e9es du scoreboard vers des syst\u00e8mes broadcast professionnels via WebSocket et/ou export de fichiers JSON. Le streaming utilise le delta encoding pour r\u00e9duire la bande passante.`,
};
