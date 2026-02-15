import { describe, it, expect } from 'vitest';
import { buildScreenshotFilename } from '@/utils/screenshot';

describe('buildScreenshotFilename', () => {
  it('génère un nom de fichier avec les équipes', () => {
    const filename = buildScreenshotFilename('CAN', 'SUI');
    expect(filename).toMatch(/^scoreboard_CANvsSUI_\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}\.png$/);
  });

  it('inclut le timestamp ISO', () => {
    const filename = buildScreenshotFilename('SVK', 'FIN');
    expect(filename).toContain('SVKvsFIN');
    expect(filename.endsWith('.png')).toBe(true);
  });

  it('gère les codes courts', () => {
    const filename = buildScreenshotFilename('A', 'B');
    expect(filename).toMatch(/^scoreboard_AvsB_/);
  });
});
