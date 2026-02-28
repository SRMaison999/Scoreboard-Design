import { describe, it, expect } from 'vitest';
import { normalizeText, searchManualChapters, highlightInHtml } from '@/utils/textSearch';
import type { ManualChapter } from '@/types/userManual';

describe('normalizeText', () => {
  it('retire les accents et passe en minuscules', () => {
    expect(normalizeText('Équipe')).toBe('equipe');
    expect(normalizeText('créer')).toBe('creer');
    expect(normalizeText('événementiel')).toBe('evenementiel');
    expect(normalizeText('DONNÉES')).toBe('donnees');
  });

  it('gere le texte sans accents', () => {
    expect(normalizeText('hello world')).toBe('hello world');
  });

  it('gere une chaine vide', () => {
    expect(normalizeText('')).toBe('');
  });

  it('gere les caracteres speciaux', () => {
    expect(normalizeText('côté (gauche)')).toBe('cote (gauche)');
  });
});

describe('searchManualChapters', () => {
  const chapters: ManualChapter[] = [
    {
      id: 'ch1',
      title: 'Introduction',
      content: 'Bienvenue dans Scoreboard Design - Ice Hockey. Cet éditeur permet de créer des affichages.',
    },
    {
      id: 'ch2',
      title: 'Éditeur',
      content: 'Le panneau éditeur se trouve à gauche. Il contient les contrôles principaux.',
    },
    {
      id: 'ch3',
      title: 'Layout libre',
      content: 'Le Layout libre permet de placer librement des éléments sur le canvas.',
    },
  ];

  it('trouve des resultats insensibles aux accents', () => {
    const results = searchManualChapters(chapters, 'editeur');
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((r) => r.chapterTitle === 'Éditeur')).toBe(true);
  });

  it('trouve des resultats insensibles a la casse', () => {
    const results = searchManualChapters(chapters, 'LAYOUT');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0]?.chapterTitle).toBe('Layout libre');
  });

  it('retourne un tableau vide pour une requete trop courte', () => {
    expect(searchManualChapters(chapters, 'a')).toEqual([]);
    expect(searchManualChapters(chapters, '')).toEqual([]);
  });

  it('retourne un tableau vide quand aucun resultat', () => {
    const results = searchManualChapters(chapters, 'xyznonexistent');
    expect(results).toEqual([]);
  });

  it('trie par nombre de correspondances decroissant', () => {
    const results = searchManualChapters(chapters, 'libre');
    if (results.length > 1) {
      for (let i = 1; i < results.length; i++) {
        const prev = results[i - 1];
        const curr = results[i];
        if (prev && curr) {
          expect(prev.matchCount).toBeGreaterThanOrEqual(curr.matchCount);
        }
      }
    }
  });

  it('inclut les correspondances dans le titre', () => {
    const results = searchManualChapters(chapters, 'introduction');
    expect(results.length).toBe(1);
    expect(results[0]?.matchCount).toBeGreaterThanOrEqual(1);
  });

  it('fournit des extraits de contexte', () => {
    const results = searchManualChapters(chapters, 'canvas');
    expect(results.length).toBeGreaterThan(0);
    const layoutResult = results.find((r) => r.chapterTitle === 'Layout libre');
    expect(layoutResult).toBeDefined();
    expect(layoutResult?.snippets.length).toBeGreaterThan(0);
    expect(layoutResult?.snippets[0]?.text).toContain('canvas');
  });

  it('cherche dans le contenu markdown', () => {
    const results = searchManualChapters(chapters, 'panneau');
    expect(results.length).toBe(1);
    expect(results[0]?.chapterTitle).toBe('Éditeur');
  });
});

describe('highlightInHtml', () => {
  it('surligne les occurrences dans le texte', () => {
    const html = '<p>Le scoreboard affiche les scores.</p>';
    const result = highlightInHtml(html, 'score');
    expect(result).toContain('<mark');
    expect(result).toContain('score');
  });

  it('ne modifie pas les balises HTML', () => {
    const html = '<p class="score-display">Texte</p>';
    const result = highlightInHtml(html, 'score');
    expect(result).toContain('class="score-display"');
  });

  it('est insensible aux accents', () => {
    const html = '<p>Les équipes sont prêtes.</p>';
    const result = highlightInHtml(html, 'equipe');
    expect(result).toContain('<mark');
  });

  it('retourne le HTML inchange si le terme est vide', () => {
    const html = '<p>Texte</p>';
    expect(highlightInHtml(html, '')).toBe(html);
  });

  it('retourne le HTML inchange si le terme est trop court', () => {
    const html = '<p>Texte</p>';
    expect(highlightInHtml(html, 'a')).toBe(html);
  });

  it('surligne plusieurs occurrences', () => {
    const html = '<p>Score gauche et score droite.</p>';
    const result = highlightInHtml(html, 'score');
    const markCount = (result.match(/<mark/g) ?? []).length;
    expect(markCount).toBe(2);
  });
});
