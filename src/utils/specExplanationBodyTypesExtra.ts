/**
 * Fonctions d'explication pour les body types 10-14.
 * Suite de specExplanationBodyTypes.ts.
 */

import { heading, bullet, asRecord, asArray } from '@/utils/specMarkdownHelpers';

export function explainType10(data: unknown): string[] {
  const d = asRecord(data);
  const events = asArray(d.events);
  return [
    heading(3, 'Chronologie (type 10)'),
    '',
    bullet('Titre', String(d.title ?? '')),
    '',
    `${events.length} evenement(s) :`,
    '',
    '| # | Periode | Temps | Type | Equipe | Description |',
    '|---|---------|-------|------|--------|-------------|',
    ...events.map((e, i) => {
      const row = asRecord(e);
      return `| ${i + 1} | ${row.period ?? ''} | ${row.time ?? ''} | ${row.type ?? ''} | ${row.team ?? ''} | ${row.description ?? ''} |`;
    }),
    '',
    'Les evenements sont affiches verticalement, avec une icone par type.',
  ];
}

export function explainType11(data: unknown): string[] {
  const d = asRecord(data);
  const bars = asArray(d.bars);
  return [
    heading(3, 'Barres comparatives (type 11)'),
    '',
    bullet('Titre', String(d.title ?? '')),
    '',
    `${bars.length} barre(s) :`,
    '',
    '| Label | Val. G | Val. D | Format |',
    '|-------|--------|--------|--------|',
    ...bars.map((b) => {
      const row = asRecord(b);
      return `| ${row.label ?? ''} | ${row.valueLeft ?? ''} | ${row.valueRight ?? ''} | ${row.format ?? ''} |`;
    }),
    '',
    'Chaque barre est une ligne horizontale proportionnelle aux valeurs G/D.',
  ];
}

export function explainType12(data: unknown): string[] {
  const d = asRecord(data);
  const players = asArray(d.players);
  return [
    heading(3, 'Composition d\'equipe (type 12)'),
    '',
    bullet('Titre', String(d.title ?? '')),
    bullet('Equipe', String(d.team ?? '')),
    bullet('Entraineur', String(d.coach ?? '')),
    '',
    `${players.length} joueur(s) :`,
    '',
    '| # | Numero | Nom | Position |',
    '|---|--------|-----|----------|',
    ...players.map((p, i) => {
      const row = asRecord(p);
      return `| ${i + 1} | ${row.number ?? ''} | ${row.name ?? ''} | ${row.position ?? ''} |`;
    }),
    '',
    'Le drapeau de l\'equipe est affiche dans le titre. Les joueurs sont en tableau.',
  ];
}

export function explainType13(data: unknown): string[] {
  const d = asRecord(data);
  const matches = asArray(d.matches);
  return [
    heading(3, 'Calendrier (type 13)'),
    '',
    bullet('Titre', String(d.title ?? '')),
    '',
    `${matches.length} match(s) :`,
    '',
    '| # | Date | Heure | Eq. G | Sc. G | Sc. D | Eq. D | Statut | Lieu |',
    '|---|------|-------|-------|-------|-------|-------|--------|------|',
    ...matches.map((m, i) => {
      const row = asRecord(m);
      return `| ${i + 1} | ${row.date ?? ''} | ${row.time ?? ''} | ${row.teamLeft ?? ''} | ${row.scoreLeft ?? ''} | ${row.scoreRight ?? ''} | ${row.teamRight ?? ''} | ${row.status ?? ''} | ${row.venue ?? ''} |`;
    }),
  ];
}

export function explainType14(data: unknown): string[] {
  const d = asRecord(data);
  const fields = asArray(d.fields);
  return [
    heading(3, 'Layout libre (type 14)'),
    '',
    'En mode layout libre, il n\'y a ni header ni colonnes de penalites.',
    'Chaque champ est positionne librement sur le canvas.',
    '',
    `${fields.length} champ(s) :`,
    '',
    '| # | Type | X | Y | Largeur | Hauteur |',
    '|---|------|---|---|---------|---------|',
    ...fields.map((f, i) => {
      const row = asRecord(f);
      return `| ${i + 1} | ${row.type ?? ''} | ${row.x ?? ''}px | ${row.y ?? ''}px | ${row.width ?? ''}px | ${row.height ?? ''}px |`;
    }),
    '',
    'Chaque champ est un conteneur div positionne en absolu (position: absolute).',
  ];
}
