import type { ManualChapter, ManualSearchResult, ManualSearchSnippet } from '@/types/userManual';

const SNIPPET_CONTEXT_LENGTH = 60;
const MAX_SNIPPETS_PER_CHAPTER = 3;

/**
 * Normalise le texte pour une recherche insensible aux accents et a la casse.
 * Retire les diacritiques (e, e, a, c, etc.) et passe en minuscules.
 */
export function normalizeText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

/**
 * Compte les occurrences d'un terme normalise dans un texte normalise.
 */
function countOccurrences(normalizedText: string, normalizedTerm: string): number {
  if (!normalizedTerm) return 0;
  let count = 0;
  let position = 0;
  while (true) {
    const index = normalizedText.indexOf(normalizedTerm, position);
    if (index === -1) break;
    count++;
    position = index + 1;
  }
  return count;
}

/**
 * Extrait des extraits de texte autour des occurrences du terme de recherche.
 * Retourne le texte original (avec accents) pour un affichage fidele.
 */
function extractSnippets(
  originalContent: string,
  normalizedContent: string,
  normalizedTerm: string,
): ManualSearchSnippet[] {
  const snippets: ManualSearchSnippet[] = [];
  let position = 0;

  while (snippets.length < MAX_SNIPPETS_PER_CHAPTER) {
    const matchIndex = normalizedContent.indexOf(normalizedTerm, position);
    if (matchIndex === -1) break;

    const lineStart = originalContent.lastIndexOf('\n', matchIndex);
    const lineEnd = originalContent.indexOf('\n', matchIndex);
    const actualLineEnd = lineEnd === -1 ? originalContent.length : lineEnd;

    const rawLine = originalContent.slice(lineStart + 1, actualLineEnd).trim();
    const cleanLine = rawLine
      .replace(/^#{1,3}\s+/, '')
      .replace(/\*\*/g, '')
      .replace(/\|/g, ' ')
      .replace(/`/g, '')
      .trim();

    if (cleanLine.length > 0) {
      const normalizedClean = normalizeText(cleanLine);
      const termPos = normalizedClean.indexOf(normalizedTerm);

      if (termPos !== -1) {
        const start = Math.max(0, termPos - SNIPPET_CONTEXT_LENGTH);
        const end = Math.min(cleanLine.length, termPos + normalizedTerm.length + SNIPPET_CONTEXT_LENGTH);

        const prefix = start > 0 ? '\u2026' : '';
        const suffix = end < cleanLine.length ? '\u2026' : '';
        const text = prefix + cleanLine.slice(start, end) + suffix;

        const isDuplicate = snippets.some((s) => s.text === text);
        if (!isDuplicate) {
          snippets.push({ text, matchIndex });
        }
      }
    }

    position = matchIndex + normalizedTerm.length;
  }

  return snippets;
}

/**
 * Recherche un terme dans tous les chapitres du manuel.
 * Retourne les resultats tries par nombre de correspondances (decroissant).
 */
export function searchManualChapters(
  chapters: readonly ManualChapter[],
  query: string,
): ManualSearchResult[] {
  const normalizedQuery = normalizeText(query).trim();
  if (normalizedQuery.length < 2) return [];

  const results: ManualSearchResult[] = [];

  for (let i = 0; i < chapters.length; i++) {
    const chapter = chapters[i];
    if (!chapter) continue;

    const normalizedContent = normalizeText(chapter.content);
    const normalizedTitle = normalizeText(chapter.title);

    const contentMatches = countOccurrences(normalizedContent, normalizedQuery);
    const titleMatch = normalizedTitle.includes(normalizedQuery);

    const totalMatches = contentMatches + (titleMatch ? 1 : 0);
    if (totalMatches === 0) continue;

    const snippets = extractSnippets(chapter.content, normalizedContent, normalizedQuery);

    results.push({
      chapterIndex: i,
      chapterTitle: chapter.title,
      matchCount: totalMatches,
      snippets,
    });
  }

  return results.sort((a, b) => b.matchCount - a.matchCount);
}

/**
 * Surligne les occurrences du terme de recherche dans du HTML rendu.
 * Ne modifie que le texte entre les balises (preserve la structure HTML).
 */
export function highlightInHtml(html: string, term: string): string {
  if (!term) return html;

  const normalizedTerm = normalizeText(term).trim();
  if (normalizedTerm.length < 2) return html;

  const parts = html.split(/(<[^>]+>)/);

  return parts
    .map((part) => {
      if (part.startsWith('<')) return part;
      return highlightTextNode(part, normalizedTerm);
    })
    .join('');
}

/**
 * Surligne les occurrences dans un noeud texte (pas de balise HTML).
 */
function highlightTextNode(text: string, normalizedTerm: string): string {
  const normalizedText = normalizeText(text);
  const indices: number[] = [];
  let pos = 0;

  while (true) {
    const idx = normalizedText.indexOf(normalizedTerm, pos);
    if (idx === -1) break;
    indices.push(idx);
    pos = idx + 1;
  }

  if (indices.length === 0) return text;

  let result = '';
  let lastEnd = 0;

  for (const startIdx of indices) {
    const endIdx = startIdx + normalizedTerm.length;
    result += text.slice(lastEnd, startIdx);
    result += `<mark class="bg-amber-400/30 text-amber-200 rounded px-0.5">${text.slice(startIdx, endIdx)}</mark>`;
    lastEnd = endIdx;
  }

  result += text.slice(lastEnd);
  return result;
}
