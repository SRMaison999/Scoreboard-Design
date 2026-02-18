import { describe, it, expect } from 'vitest';
import { renderMarkdown } from '@/utils/markdownRenderer';

describe('renderMarkdown', () => {
  it('rend un titre h2', () => {
    const html = renderMarkdown('## Mon titre');
    expect(html).toContain('<h2');
    expect(html).toContain('Mon titre');
  });

  it('rend un titre h3', () => {
    const html = renderMarkdown('### Sous-titre');
    expect(html).toContain('<h3');
    expect(html).toContain('Sous-titre');
  });

  it('rend du texte en gras', () => {
    const html = renderMarkdown('Un **texte gras** ici');
    expect(html).toContain('<strong>texte gras</strong>');
  });

  it('rend du code inline', () => {
    const html = renderMarkdown('Utiliser `npm install`');
    expect(html).toContain('<code');
    expect(html).toContain('npm install');
  });

  it('rend une liste non ordonnee', () => {
    const html = renderMarkdown('- Premier\n- Deuxieme');
    expect(html).toContain('<ul');
    expect(html).toContain('<li');
    expect(html).toContain('Premier');
    expect(html).toContain('Deuxieme');
  });

  it('rend une liste ordonnee', () => {
    const html = renderMarkdown('1. Etape un\n2. Etape deux');
    expect(html).toContain('<ol');
    expect(html).toContain('Etape un');
    expect(html).toContain('Etape deux');
  });

  it('rend un tableau', () => {
    const md = '| Col A | Col B |\n|-------|-------|\n| val1 | val2 |';
    const html = renderMarkdown(md);
    expect(html).toContain('<table');
    expect(html).toContain('Col A');
    expect(html).toContain('val1');
    expect(html).toContain('val2');
  });

  it('rend un paragraphe simple', () => {
    const html = renderMarkdown('Un paragraphe simple.');
    expect(html).toContain('<p');
    expect(html).toContain('Un paragraphe simple.');
  });

  it('echappe le HTML', () => {
    const html = renderMarkdown('Un <script>alert("xss")</script>');
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
  });

  it('gere le contenu vide', () => {
    const html = renderMarkdown('');
    expect(html).toBe('');
  });
});
