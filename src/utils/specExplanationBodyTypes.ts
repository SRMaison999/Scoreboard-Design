/**
 * Fonctions d'explication par body type pour le generateur de documentation.
 * Chaque fonction produit un tableau de lignes Markdown decrivant
 * la disposition et les donnees d'un type d'affichage specifique.
 */

import { heading, bullet, asRecord, asArray } from '@/utils/specMarkdownHelpers';

export function explainType1(data: unknown): string[] {
  const d = asRecord(data);
  const titles = asRecord(d.titles);
  const stats = asArray(d.stats);
  return [
    heading(3, 'Stats centrees (type 1)'),
    '',
    'Affichage en colonne centree.',
    '',
    bullet('Titre central', String(titles.center ?? '')),
    '',
    `${stats.length} ligne(s) de stats :`,
    '',
    '| # | Label | Valeur gauche | Valeur droite |',
    '|---|-------|---------------|---------------|',
    ...stats.map((s, i) => {
      const row = asRecord(s);
      return `| ${i + 1} | ${row.label ?? ''} | ${row.valL ?? ''} | ${row.valR ?? ''} |`;
    }),
    '',
    'Chaque ligne affiche : `Valeur G` | `Label (centre)` | `Valeur D`.',
    'Le titre est centre au-dessus du tableau de stats.',
  ];
}

export function explainType2(data: unknown): string[] {
  const d = asRecord(data);
  const titles = asRecord(d.titles);
  const stats = asArray(d.stats);
  return [
    heading(3, 'Stats gauche/droite (type 2)'),
    '',
    'Similaire au type 1 mais avec des titres lateraux.',
    '',
    bullet('Titre gauche', String(titles.left ?? '')),
    bullet('Titre droite', String(titles.right ?? '')),
    '',
    `${stats.length} ligne(s) de stats (meme format que le type 1).`,
  ];
}

export function explainType3(data: unknown): string[] {
  const d = asRecord(data);
  const titles = asRecord(d.titles);
  const playerStats = asArray(d.playerStats);
  return [
    heading(3, 'Stats joueur (type 3)'),
    '',
    'Affichage dedie a un joueur individuel avec photo optionnelle.',
    '',
    bullet('Titre', String(titles.center ?? '')),
    bullet('Photo joueur', String(d.showPhoto ?? false)),
    '',
    `${playerStats.length} stat(s) du joueur :`,
    '',
    '| # | Variable | Numero | Nom | Valeur |',
    '|---|----------|--------|-----|--------|',
    ...playerStats.map((s, i) => {
      const row = asRecord(s);
      return `| ${i + 1} | ${row.variable ?? ''} | ${row.number ?? ''} | ${row.name ?? ''} | ${row.value ?? ''} |`;
    }),
    '',
    'Si la photo est active, elle apparait a gauche du bloc stats, dans un cercle.',
  ];
}

export function explainType4(data: unknown): string[] {
  const d = asRecord(data);
  return [
    heading(3, 'Celebration de but (type 4)'),
    '',
    'Ecran de celebration affiche apres un but.',
    '',
    bullet('Cote equipe marqueuse', String(d.scoringTeamSide ?? '')),
    bullet('Nom du buteur', String(d.scorerName ?? '')),
    bullet('Numero', String(d.scorerNumber ?? '')),
    bullet('Temps du but', String(d.goalTime ?? '')),
    bullet('Periode', String(d.goalPeriod ?? '')),
    bullet('Buts dans le match', String(d.goalsInMatch ?? '')),
    bullet('Buts dans le tournoi', String(d.goalsInTournament ?? '')),
    '',
    heading(4, 'Assistances'),
    bullet('Assist 1', `${d.assist1Name ?? ''} (#${d.assist1Number ?? ''})`),
    bullet('Assist 2', `${d.assist2Name ?? ''} (#${d.assist2Number ?? ''})`),
    '',
    'Le drapeau de l\'equipe marqueuse est affiche a cote du nom du buteur.',
  ];
}

export function explainType5(data: unknown): string[] {
  const d = asRecord(data);
  const stats = asArray(d.stats);
  return [
    heading(3, 'Fiche joueur (type 5)'),
    '',
    bullet('Titre', String(d.title ?? '')),
    bullet('Sous-titre', String(d.subtitle ?? '')),
    bullet('Nom', String(d.playerName ?? '')),
    bullet('Numero', String(d.playerNumber ?? '')),
    bullet('Equipe (NOC)', String(d.team ?? '')),
    '',
    `${stats.length} stat(s) :`,
    '',
    '| # | Label | Valeur |',
    '|---|-------|--------|',
    ...stats.map((s, i) => {
      const row = asRecord(s);
      return `| ${i + 1} | ${row.label ?? ''} | ${row.value ?? ''} |`;
    }),
    '',
    'Le drapeau/logo de l\'equipe est affiche. La photo du joueur est dans un cercle.',
  ];
}

export function explainType6(data: unknown): string[] {
  const d = asRecord(data);
  const rows = asArray(d.rows);
  return [
    heading(3, 'Classement (type 6)'),
    '',
    bullet('Titre', String(d.title ?? '')),
    '',
    `${rows.length} equipe(s) dans le classement :`,
    '',
    '| Rang | Equipe | Surlignee |',
    '|------|--------|-----------|',
    ...rows.map((r, i) => {
      const row = asRecord(r);
      return `| ${i + 1} | ${row.team ?? ''} | ${row.highlight ? 'Oui' : 'Non'} |`;
    }),
    '',
    'Affichage en tableau avec drapeau par equipe. Les equipes surlignees ont un fond distinct.',
  ];
}

export function explainType7(data: unknown): string[] {
  const d = asRecord(data);
  const periods = asArray(d.periods);
  return [
    heading(3, 'Score final (type 7)'),
    '',
    bullet('Titre', String(d.title ?? '')),
    '',
    `${periods.length} periode(s) de detail :`,
    '',
    '| Periode | Score G | Score D |',
    '|---------|---------|---------|',
    ...periods.map((p) => {
      const row = asRecord(p);
      return `| ${row.label ?? ''} | ${row.scoreLeft ?? ''} | ${row.scoreRight ?? ''} |`;
    }),
    '',
    bullet('Afficher but gagnant', String(d.showGwg ?? false)),
  ];
}

export function explainType8(data: unknown): string[] {
  const d = asRecord(data);
  const lines = asArray(d.lines);
  return [
    heading(3, 'Texte libre (type 8)'),
    '',
    `${lines.length} ligne(s) de texte :`,
    '',
    '| # | Texte | Taille | Alignement | Gras |',
    '|---|-------|--------|------------|------|',
    ...lines.map((l, i) => {
      const row = asRecord(l);
      return `| ${i + 1} | ${row.text ?? ''} | ${row.fontSize ?? ''}px | ${row.align ?? ''} | ${row.bold ? 'Oui' : 'Non'} |`;
    }),
    '',
    'Chaque ligne est rendue independamment, centree verticalement dans le corps.',
  ];
}

export function explainType9(data: unknown): string[] {
  const d = asRecord(data);
  const stats = asArray(d.stats);
  const left = asRecord(d.playerLeft);
  const right = asRecord(d.playerRight);
  return [
    heading(3, 'Face-a-face (type 9)'),
    '',
    bullet('Titre', String(d.title ?? '')),
    '',
    heading(4, 'Joueur gauche'),
    bullet('Nom', String(left.name ?? '')),
    bullet('Numero', String(left.number ?? '')),
    bullet('Equipe', String(left.team ?? '')),
    '',
    heading(4, 'Joueur droite'),
    bullet('Nom', String(right.name ?? '')),
    bullet('Numero', String(right.number ?? '')),
    bullet('Equipe', String(right.team ?? '')),
    '',
    `${stats.length} stat(s) comparees :`,
    '',
    '| Stat | Val. G | Val. D |',
    '|------|--------|--------|',
    ...stats.map((s) => {
      const row = asRecord(s);
      return `| ${row.label ?? ''} | ${row.valueLeft ?? ''} | ${row.valueRight ?? ''} |`;
    }),
    '',
    'Les photos des joueurs sont affichees dans des cercles de chaque cote.',
  ];
}

export {
  explainType10, explainType11, explainType12,
  explainType13, explainType14,
} from '@/utils/specExplanationBodyTypesExtra';
