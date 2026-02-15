import { describe, it, expect } from 'vitest';
import { downloadGif } from '@/utils/gifEncoder';

describe('gifEncoder', () => {
  it('downloadGif cree un lien de telechargement', () => {
    const blob = new Blob(['test'], { type: 'image/gif' });

    const downloads: string[] = [];
    const origCreateElement = document.createElement.bind(document);
    const origCreateObjectURL = URL.createObjectURL;
    const origRevokeObjectURL = URL.revokeObjectURL;

    URL.createObjectURL = () => 'blob:test';
    URL.revokeObjectURL = () => {};

    document.createElement = ((tag: string) => {
      const el = origCreateElement(tag);
      if (tag === 'a') {
        el.click = () => { downloads.push(el.getAttribute('download') ?? ''); };
      }
      return el;
    }) as typeof document.createElement;

    downloadGif(blob, 'SVK', 'FIN');

    expect(downloads.length).toBe(1);
    expect(downloads[0]).toMatch(/scoreboard_SVKvsFIN_.*\.gif$/);

    document.createElement = origCreateElement;
    URL.createObjectURL = origCreateObjectURL;
    URL.revokeObjectURL = origRevokeObjectURL;
  });
});
