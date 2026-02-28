import type { ManualChapter } from '@/types/userManual';

/**
 * Charge les fichiers markdown du manuel depuis docs/manuel-utilisateur/.
 * Source de verite unique : tout le contenu du manuel est dans ces fichiers .md.
 */
const modules = import.meta.glob('/docs/manuel-utilisateur/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function getContent(filename: string): string {
  const key = `/docs/manuel-utilisateur/${filename}`;
  const content = modules[key];
  if (!content) {
    throw new Error(`Manuel : fichier introuvable : ${filename}`);
  }
  return content;
}

/** Extrait le titre depuis la premiere ligne H1 du fichier markdown. */
function extractTitle(content: string): string {
  const firstLine = content.split('\n')[0] ?? '';
  const prefixMatch = firstLine.match(/^#\s+Manuel utilisateur\s*[-\u2013\u2014]\s*(.+)/);
  if (prefixMatch?.[1]) return prefixMatch[1].trim();
  const numberMatch = firstLine.match(/^#\s+\d+\.\s*(.+)/);
  if (numberMatch?.[1]) return numberMatch[1].trim();
  const simpleMatch = firstLine.match(/^#\s+(.+)/);
  return simpleMatch?.[1]?.trim() ?? '';
}

/** Supprime la premiere ligne H1 (le titre est affiche separement par le composant). */
function stripFirstHeading(content: string): string {
  const lines = content.split('\n');
  if (lines[0]?.startsWith('# ')) {
    return lines.slice(1).join('\n').trimStart();
  }
  return content;
}

function buildChapter(id: string, filename: string): ManualChapter {
  const raw = getContent(filename);
  return { id, title: extractTitle(raw), content: stripFirstHeading(raw) };
}

const layoutLibreMain = getContent('03-layout-libre.md');
const layoutLibreElements = getContent('03b-layout-elements.md');
const layoutLibreTutoriels = getContent('03c-layout-tutoriels.md');

/** Chapitre unique fusionnant prise en main, elements et tutoriels */
const layoutLibre: ManualChapter = {
  id: 'layout-libre',
  title: extractTitle(layoutLibreMain),
  content: [layoutLibreMain, layoutLibreElements, layoutLibreTutoriels]
    .map(stripFirstHeading)
    .join('\n\n---\n\n'),
};

export const MANUAL_CHAPTERS: readonly ManualChapter[] = [
  buildChapter('introduction', '01-introduction.md'),
  buildChapter('editeur', '02-editeur.md'),
  layoutLibre,
  buildChapter('body-types', '04-body-types.md'),
  buildChapter('personnalisation', '05-personnalisation.md'),
  buildChapter('horloge', '06-horloge-et-phases.md'),
  buildChapter('templates', '07-templates.md'),
  buildChapter('operateur', '08-mode-operateur.md'),
  buildChapter('sortie', '09-sortie-broadcast.md'),
  buildChapter('capture', '10-capture-impression.md'),
  buildChapter('photos', '11-photos-joueurs.md'),
  buildChapter('logos', '12-logos.md'),
  buildChapter('animations', '13-animations-export.md'),
  buildChapter('integrations', '14-integrations.md'),
] as const;
