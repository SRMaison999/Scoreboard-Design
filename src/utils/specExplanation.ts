/**
 * Generateur de documentation d'explication des specifications.
 * Produit un fichier Markdown lisible par un developpeur,
 * decrivant exactement ou se trouve chaque element a l'ecran.
 */

import type { ScoreboardSpec } from '@/utils/specGenerator';
import { heading, bullet, buildLayoutOverview, buildLogosSection } from '@/utils/specMarkdownHelpers';
import {
  explainType1, explainType2, explainType3, explainType4,
  explainType5, explainType6, explainType7, explainType8,
  explainType9, explainType10, explainType11, explainType12,
  explainType13, explainType14,
} from '@/utils/specExplanationBodyTypes';

const SECTION_SEPARATOR = '\n---\n';

function buildCanvasSection(spec: ScoreboardSpec): string {
  const lines = [
    heading(2, 'Canvas (zone de rendu)'),
    '',
    'Le scoreboard est rendu dans un conteneur HTML/CSS fixe.',
    '',
    bullet('Largeur', `${spec.canvas.width}px`),
    bullet('Hauteur', `${spec.canvas.height}px`),
    bullet('Ratio', `${spec.canvas.width}:${spec.canvas.height}`),
    '',
    'Le canvas est positionne au centre de la fenetre et mis a l\'echelle via `transform: scale()` pour s\'adapter a l\'espace disponible.',
  ];
  return lines.join('\n');
}

function buildBackgroundSection(spec: ScoreboardSpec): string {
  const bg = spec.background;
  const lines = [
    heading(2, 'Fond d\'ecran'),
    '',
    bullet('Mode', bg.mode),
  ];

  if (bg.mode === 'uniform') {
    lines.push(bullet('Couleur', bg.colors.top));
  } else {
    lines.push(bullet('Couleur haut', bg.colors.top));
    lines.push(bullet('Couleur milieu', bg.colors.mid));
    lines.push(bullet('Couleur bas', bg.colors.bot));
    lines.push('', 'Le degrade est vertical (180deg), du haut vers le bas.');
  }

  if (spec.media.mode !== 'none' && spec.media.url) {
    lines.push('', heading(3, 'Media de fond'));
    lines.push(bullet('Type', spec.media.mode));
    lines.push(bullet('URL', spec.media.url));
    lines.push('', 'Le media est positionne en absolue, couvre tout le canvas (object-fit: cover).');
  }

  return lines.join('\n');
}

function buildHeaderSection(spec: ScoreboardSpec): string {
  const h = spec.header;
  const lines = [
    heading(2, 'Header (bandeau superieur)'),
    '',
    'Le header occupe toute la largeur du canvas, avec un padding de `14px 96px 10px`.',
    'Il est compose d\'une seule ligne flex (justify: space-between).',
    '',
    heading(3, 'Equipe gauche'),
    '',
    bullet('Code', h.teamLeft.code),
    bullet('Nom complet', h.teamLeft.name),
    bullet('Score', h.teamLeft.score),
    '',
    'Disposition de gauche a droite : Drapeau/Logo | Nom | Score',
    '',
    heading(3, 'Equipe droite'),
    '',
    bullet('Code', h.teamRight.code),
    bullet('Nom complet', h.teamRight.name),
    bullet('Score', h.teamRight.score),
    '',
    'Disposition de gauche a droite : Score | Nom | Drapeau/Logo',
    '',
    heading(3, 'Horloge et periode'),
    '',
    'L\'horloge est centree horizontalement sous les noms d\'equipes.',
    '',
    bullet('Temps affiche', h.clock.time),
    bullet('Visible', h.clock.visible),
    bullet('Mode du cadre', h.clock.boxMode),
    bullet('Seuil dixiemes', `${h.clock.tenthsThreshold}s`),
    '',
    bullet('Periode', h.period.text),
    'La periode est affichee juste en dessous de l\'horloge, centree.',
  ];

  if (h.penalties.show) {
    lines.push('', heading(3, 'Penalites'));
    lines.push('', 'Les colonnes de penalites sont affichees de chaque cote du corps (body).');
    lines.push(bullet('Penalites gauche', `${h.penalties.left.length} entree(s)`));
    lines.push(bullet('Penalites droite', `${h.penalties.right.length} entree(s)`));
    lines.push('', 'Chaque penalite affiche un temps et un numero de joueur, empilee verticalement.');
  }

  if (h.timeouts.show) {
    lines.push('', heading(3, 'Temps morts'));
    lines.push(bullet('Temps morts gauche', h.timeouts.left));
    lines.push(bullet('Temps morts droite', h.timeouts.right));
    lines.push('', 'Affiches sous le nom d\'equipe, sous forme de pastilles rondes.');
  }

  if (h.shootout.show) {
    lines.push('', heading(3, 'Tirs au but'));
    lines.push(bullet('Tirs gauche', `${h.shootout.left.length} tir(s)`));
    lines.push(bullet('Tirs droite', `${h.shootout.right.length} tir(s)`));
    lines.push('', 'Affiches sous le drapeau, pastilles vertes (O), rouges (X) ou grises (-).');
  }

  return lines.join('\n');
}

function buildFontsSection(spec: ScoreboardSpec): string {
  const f = spec.fonts;
  const fs = spec.fontSizes;
  const lines = [
    heading(2, 'Polices'),
    '',
    heading(3, 'Familles de polices'),
    '',
    bullet('Equipes / Scores', `${f.teams.family} (id: ${f.teams.id})`),
    bullet('Horloge / Periode', `${f.clock.family} (id: ${f.clock.id})`),
    bullet('Corps (titres, stats, penalites)', `${f.body.family} (id: ${f.body.id})`),
    '',
    heading(3, 'Tailles (en pixels)'),
    '',
  ];

  const sizeMap: Record<string, string> = {
    teamName: 'Noms d\'equipes',
    score: 'Scores',
    clockTime: 'Horloge',
    period: 'Periode',
    title: 'Titres',
    statValue: 'Valeurs stats',
    statLabel: 'Labels stats',
    penaltyTime: 'Temps penalite',
    penaltyNumber: 'Numero penalite',
  };

  for (const [key, label] of Object.entries(sizeMap)) {
    const val = fs[key as keyof typeof fs];
    if (val !== undefined) {
      lines.push(bullet(label, `${val}px`));
    }
  }

  return lines.join('\n');
}

function buildColorsSection(spec: ScoreboardSpec): string {
  const c = spec.colors;
  const colorMap: Record<string, string> = {
    teamName: 'Noms d\'equipes',
    score: 'Scores',
    scoreBox: 'Cadre score (fond)',
    time: 'Horloge',
    clockBox: 'Cadre horloge (fond)',
    period: 'Periode',
    titleText: 'Titres',
    statVal: 'Valeurs stats',
    statLabel: 'Labels stats',
    penaltyTime: 'Temps penalite',
    penaltyNumber: 'Numero penalite',
  };

  const lines = [
    heading(2, 'Couleurs'),
    '',
    '| Element | Couleur |',
    '|---------|---------|',
  ];

  for (const [key, label] of Object.entries(colorMap)) {
    const val = c[key as keyof typeof c];
    if (val) {
      lines.push(`| ${label} | \`${val}\` |`);
    }
  }

  return lines.join('\n');
}

function buildBodySection(spec: ScoreboardSpec): string {
  const b = spec.body;
  const lines = [
    heading(2, `Corps : ${b.label} (type ${b.type})`),
    '',
    'Le corps occupe tout l\'espace restant sous le header.',
    'Si les penalites sont actives, il est encadre par une colonne de penalites a gauche et a droite.',
    '',
  ];

  const explainers: Record<number, (data: unknown) => string[]> = {
    1: explainType1, 2: explainType2, 3: explainType3, 4: explainType4,
    5: explainType5, 6: explainType6, 7: explainType7, 8: explainType8,
    9: explainType9, 10: explainType10, 11: explainType11, 12: explainType12,
    13: explainType13, 14: explainType14,
  };

  const explainer = explainers[b.type];
  if (explainer) {
    lines.push(...explainer(b.data));
  } else {
    lines.push('Type non reconnu.');
  }

  return lines.join('\n');
}

/** Genere le document d'explication complet au format Markdown. */
export function generateExplanation(spec: ScoreboardSpec): string {
  const sections = [
    `${heading(1, `Explication des specifications - ${spec.body.label}`)}\n`,
    `> Document genere le ${spec.generated}`,
    `> Version des specs : ${spec.version}`,
    '',
    'Ce document decrit la disposition exacte de chaque element a l\'ecran.',
    'Un developpeur peut l\'utiliser pour recreer fidelement cet affichage.',
    SECTION_SEPARATOR,
    buildLayoutOverview(spec),
    SECTION_SEPARATOR,
    buildCanvasSection(spec),
    SECTION_SEPARATOR,
    buildBackgroundSection(spec),
    SECTION_SEPARATOR,
    buildHeaderSection(spec),
    SECTION_SEPARATOR,
    buildBodySection(spec),
    SECTION_SEPARATOR,
    buildFontsSection(spec),
    SECTION_SEPARATOR,
    buildColorsSection(spec),
    SECTION_SEPARATOR,
    buildLogosSection(spec),
    SECTION_SEPARATOR,
    heading(2, 'Visibilite'),
    '',
    bullet('Scoreboard visible', spec.visibility.visible),
    '',
    'Si `false`, le scoreboard est masque via une animation de sortie ou `display: none`.',
  ];

  return sections.join('\n');
}

/** Telecharge le fichier d'explication au format Markdown. */
export function downloadExplanation(
  explanation: string,
  team1: string,
  team2: string,
): void {
  const blob = new Blob([explanation], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
  a.href = url;
  a.download = `explication-${team1}-${team2}-${timestamp}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
