import { describe, it, expect } from 'vitest';
import { DEFAULT_STATE } from '@/data/defaultState';
import {
  getFullSnapshot,
  getCurrentFrame,
  getConfiguration,
  framesToNdjsonBlob,
} from '@/api/frameExport';
import { toFrameData } from '@/api/frameConverters';

describe('frameExport', () => {
  describe('getFullSnapshot', () => {
    it('retourne un snapshot complet', () => {
      const snapshot = getFullSnapshot(DEFAULT_STATE);
      expect(snapshot.template.canvas.width).toBe(1920);
      expect(snapshot.match.teamLeft.noc).toBe('SVK');
      expect(snapshot.frame.time).toBe('20:00');
    });
  });

  describe('getCurrentFrame', () => {
    it('retourne la frame courante', () => {
      const frame = getCurrentFrame(DEFAULT_STATE, 5, 5000);
      expect(frame.frameNumber).toBe(5);
      expect(frame.timestamp).toBe(5000);
      expect(frame.score.left).toBe(1);
    });
  });

  describe('getConfiguration', () => {
    it('retourne template + match sans frame', () => {
      const config = getConfiguration(DEFAULT_STATE);
      expect(config.template.bodyType).toBe(1);
      expect(config.match.teamLeft.noc).toBe('SVK');
    });
  });

  describe('framesToNdjsonBlob', () => {
    it('g\u00e9n\u00e8re un Blob NDJSON valide', async () => {
      const frames = [
        toFrameData(DEFAULT_STATE, 0, 0),
        toFrameData(DEFAULT_STATE, 1, 1000),
      ];
      const blob = framesToNdjsonBlob(frames);
      expect(blob.type).toBe('application/x-ndjson');

      const text = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(reader.error);
        reader.readAsText(blob);
      });
      const lines = text.split('\n');
      expect(lines).toHaveLength(2);
      const first = JSON.parse(lines[0]!) as typeof frames[0];
      expect(first.frameNumber).toBe(0);
    });
  });
});
