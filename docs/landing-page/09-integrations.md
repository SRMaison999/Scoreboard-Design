# Intégrations broadcast

[Sommaire](./README.md) | [Chapitre précédent](./08-templates-et-exports.md) | [Chapitre suivant](./10-pourquoi-scoreboard-design.md)

---

## Frame Data API

L'architecture de données du scoreboard est structurée en trois couches, conçue pour l'interopérabilité avec les systèmes broadcast professionnels :

**Couche 1 — Template Data** (quasi-statique) — Design, couleurs, polices, dimensions. Se configure une fois par événement.

**Couche 2 — Match Data** (semi-dynamique) — Équipes, rosters, phases, données spécifiques à chaque type d'affichage. Change entre les matchs.

**Couche 3 — Frame Data** (temps réel) — Scores, temps, pénalités, phase active. Change à chaque seconde pendant un match.

Les snapshots JSON complets et les deltas (encodage différentiel, ne transmettant que les changements) sont disponibles pour une intégration avec les systèmes de production externes. Les flux de frames sont exportables au format NDJSON (Newline Delimited JSON) pour le streaming continu.

## Connexion CasparCG et Viz

L'architecture de streaming intégrée permet la transmission de données vers les systèmes broadcast professionnels CasparCG et Vizrt. Configuration du port, du format d'export, et suivi en temps réel du nombre de frames envoyées et de clients connectés.

## Données live externes

Connexion à des API de scores en temps réel via WebSocket ou HTTP polling. Configuration de l'endpoint, de l'identifiant de match et du mode de mise à jour automatique. Pour synchroniser le scoreboard avec les systèmes de scoring officiels de la compétition.

## Synchronisation multi-poste

Collaboration en temps réel via WebSocket avec trois rôles distincts :

- **Admin** — Contrôle total, modifications propagées à tous les postes.
- **Opérateur** — Contrôle des données de match (scores, horloge, pénalités).
- **Viewer** — Lecture seule, affichage synchronisé.

Pour les productions à grande échelle où plusieurs opérateurs, designers et directeurs techniques travaillent simultanément sur des postes différents.

---

[Chapitre suivant : Pourquoi Scoreboard Design](./10-pourquoi-scoreboard-design.md)
