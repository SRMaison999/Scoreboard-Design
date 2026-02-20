/** Helpers Markdown partages par les fichiers de generation d'explication. */

import type { ScoreboardSpec } from '@/utils/specGenerator';

export function heading(level: number, text: string): string {
  return `${'#'.repeat(level)} ${text}`;
}

export function bullet(label: string, value: string | number | boolean): string {
  return `- **${label}** : \`${String(value)}\``;
}

export function asRecord(data: unknown): Record<string, unknown> {
  return (data ?? {}) as Record<string, unknown>;
}

export function asArray(data: unknown): unknown[] {
  return Array.isArray(data) ? data : [];
}

export function buildLayoutOverview(spec: ScoreboardSpec): string {
  const isType14 = spec.body.type === 14;
  const hasPenalties = spec.header.penalties.show;

  const lines = [
    heading(2, 'Vue d\'ensemble de la disposition'),
    '',
    '```',
  ];

  if (isType14) {
    lines.push(
      `+${'='.repeat(58)}+`,
      `| CANVAS (${spec.canvas.width}x${spec.canvas.height})${' '.repeat(20)}|`,
      '|                                                          |',
      '|   [Champs positionnes librement en absolu]               |',
      '|                                                          |',
      `+${'='.repeat(58)}+`,
    );
  } else if (hasPenalties) {
    lines.push(
      `+${'='.repeat(58)}+`,
      `| HEADER : Drapeau1 NOM1 SCORE1 ... SCORE2 NOM2 Drapeau2  |`,
      `|              HORLOGE  /  PERIODE                         |`,
      `+${'='.repeat(58)}+`,
      '| PEN.G |            CORPS (body)             | PEN.D |',
      '|  t:nn |   Titre / Stats / Contenu specifique|  t:nn |',
      '|  t:nn |                                     |  t:nn |',
      `+${'='.repeat(58)}+`,
    );
  } else {
    lines.push(
      `+${'='.repeat(58)}+`,
      `| HEADER : Drapeau1 NOM1 SCORE1 ... SCORE2 NOM2 Drapeau2  |`,
      `|              HORLOGE  /  PERIODE                         |`,
      `+${'='.repeat(58)}+`,
      '|                                                          |',
      '|                    CORPS (body)                          |',
      '|          Titre / Stats / Contenu specifique              |',
      '|                                                          |',
      `+${'='.repeat(58)}+`,
    );
  }

  lines.push('```');

  return lines.join('\n');
}

export function buildLogosSection(spec: ScoreboardSpec): string {
  const l = spec.logos;
  const lines = [
    heading(2, 'Logos'),
    '',
    bullet('Mode equipes', l.mode),
    '',
  ];

  if (l.competition.show) {
    lines.push(heading(3, 'Logo competition'));
    lines.push(bullet('Position', l.competition.position));
    lines.push(bullet('Taille', `${l.competition.size}px`));
    lines.push('');
  }

  if (l.sponsor.show) {
    lines.push(heading(3, 'Logo sponsor'));
    lines.push(bullet('Position', l.sponsor.position));
    lines.push(bullet('Taille', `${l.sponsor.size}px`));
    lines.push('');
  }

  if (!l.competition.show && !l.sponsor.show) {
    lines.push('Aucun logo supplementaire affiche.');
  }

  return lines.join('\n');
}
