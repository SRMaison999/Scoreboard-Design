import { describe, it, expect } from 'vitest';
import { DEFAULT_STATE } from '@/data/defaultState';
import {
  toTemplateData,
  toMatchData,
  toFrameData,
  toFullSnapshot,
} from '@/api/frameConverters';

describe('frameConverters', () => {
  describe('toTemplateData', () => {
    it('extrait les dimensions du canvas', () => {
      const tpl = toTemplateData(DEFAULT_STATE);
      expect(tpl.canvas.width).toBe(1920);
      expect(tpl.canvas.height).toBe(1080);
    });

    it('extrait les couleurs et opacit\u00e9s', () => {
      const tpl = toTemplateData(DEFAULT_STATE);
      expect(tpl.colors).toBeDefined();
      expect(tpl.opacities).toBeDefined();
      expect(typeof tpl.colors.bgTop).toBe('string');
    });

    it('extrait les polices', () => {
      const tpl = toTemplateData(DEFAULT_STATE);
      expect(tpl.fonts.teams).toBe('oswald');
      expect(tpl.fonts.clock).toBe('barlow');
    });

    it('inclut la version', () => {
      const tpl = toTemplateData(DEFAULT_STATE);
      expect(tpl.version).toBe('1.0');
    });
  });

  describe('toMatchData', () => {
    it('extrait les \u00e9quipes', () => {
      const match = toMatchData(DEFAULT_STATE);
      expect(match.teamLeft.noc).toBe('SVK');
      expect(match.teamRight.noc).toBe('FIN');
    });

    it('extrait les titres', () => {
      const match = toMatchData(DEFAULT_STATE);
      expect(match.titles.center).toBe('GAME STATISTICS');
    });

    it('extrait le bodyData selon le bodyType', () => {
      const match = toMatchData(DEFAULT_STATE);
      expect(match.bodyData.type).toBe('stats');
      if (match.bodyData.type === 'stats') {
        expect(match.bodyData.data.length).toBeGreaterThan(0);
      }
    });

    it('extrait les phases', () => {
      const match = toMatchData(DEFAULT_STATE);
      expect(match.phases.length).toBeGreaterThan(0);
    });
  });

  describe('toFrameData', () => {
    it('extrait les scores en nombres', () => {
      const frame = toFrameData(DEFAULT_STATE, 0, 0);
      expect(frame.score.left).toBe(1);
      expect(frame.score.right).toBe(1);
    });

    it('extrait le temps en secondes', () => {
      const frame = toFrameData(DEFAULT_STATE, 0, 0);
      expect(frame.time).toBe('20:00');
      expect(frame.timeSeconds).toBe(1200);
    });

    it('utilise le num\u00e9ro de frame et timestamp fournis', () => {
      const frame = toFrameData(DEFAULT_STATE, 42, 5000);
      expect(frame.frameNumber).toBe(42);
      expect(frame.timestamp).toBe(5000);
    });

    it('extrait les p\u00e9nalit\u00e9s', () => {
      const frame = toFrameData(DEFAULT_STATE, 0, 0);
      expect(frame.penaltiesLeft.length).toBe(2);
      expect(frame.penaltiesRight.length).toBe(1);
      expect(frame.penaltiesLeft[0]!.playerNumber).toBe('24');
    });

    it('inclut le wallClock ISO', () => {
      const frame = toFrameData(DEFAULT_STATE, 0, 0);
      expect(frame.wallClock).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    });
  });

  describe('toFullSnapshot', () => {
    it('combine les 3 couches', () => {
      const snapshot = toFullSnapshot(DEFAULT_STATE, 0, 0);
      expect(snapshot.template).toBeDefined();
      expect(snapshot.match).toBeDefined();
      expect(snapshot.frame).toBeDefined();
    });

    it('le snapshot est s\u00e9rialisable en JSON', () => {
      const snapshot = toFullSnapshot(DEFAULT_STATE, 0, 0);
      const json = JSON.stringify(snapshot);
      const parsed = JSON.parse(json) as typeof snapshot;
      expect(parsed.template.canvas.width).toBe(1920);
      expect(parsed.frame.score.left).toBe(1);
    });
  });
});
