import { describe, it, expect } from 'vitest';
import { generateSpec } from '@/utils/specGenerator';
import { DEFAULT_STATE } from '@/data/defaultState';
import type { ScoreboardState } from '@/types/scoreboard';

function stateWith(overrides: Partial<ScoreboardState>): ScoreboardState {
  return { ...DEFAULT_STATE, ...overrides };
}

describe('generateSpec', () => {
  it('genere les specs avec la version et la date', () => {
    const spec = generateSpec(DEFAULT_STATE);
    expect(spec.version).toBe('1.0');
    expect(spec.generated).toBeTruthy();
  });

  it('inclut les dimensions du canvas', () => {
    const spec = generateSpec(stateWith({ templateWidth: 1280, templateHeight: 720 }));
    expect(spec.canvas.width).toBe(1280);
    expect(spec.canvas.height).toBe(720);
  });

  it('inclut le fond avec les couleurs et le mode', () => {
    const spec = generateSpec(DEFAULT_STATE);
    expect(spec.background.mode).toBe(DEFAULT_STATE.bgMode);
    expect(spec.background.colors.top).toBe(DEFAULT_STATE.colors.bgTop);
    expect(spec.background.colors.mid).toBe(DEFAULT_STATE.colors.bgMid);
    expect(spec.background.colors.bot).toBe(DEFAULT_STATE.colors.bgBot);
  });

  it('resout les noms de pays', () => {
    const spec = generateSpec(stateWith({ team1: 'CAN', team2: 'FIN' }));
    expect(spec.header.teamLeft.code).toBe('CAN');
    expect(spec.header.teamLeft.name).toBe('Canada');
    expect(spec.header.teamRight.code).toBe('FIN');
    expect(spec.header.teamRight.name).toBe('Finlande');
  });

  it('gere un code pays inconnu', () => {
    const spec = generateSpec(stateWith({ team1: 'XYZ' }));
    expect(spec.header.teamLeft.code).toBe('XYZ');
    expect(spec.header.teamLeft.name).toBe('XYZ');
  });

  it('inclut les scores', () => {
    const spec = generateSpec(stateWith({ score1: '3', score2: '2' }));
    expect(spec.header.teamLeft.score).toBe('3');
    expect(spec.header.teamRight.score).toBe('2');
  });

  it('inclut la police avec id et famille CSS', () => {
    const spec = generateSpec(stateWith({ fontTeams: 'oswald' }));
    expect(spec.fonts.teams.id).toBe('oswald');
    expect(spec.fonts.teams.family).toContain('Oswald');
  });

  it('inclut le body type avec son label', () => {
    const spec = generateSpec(stateWith({ bodyType: 6 }));
    expect(spec.body.type).toBe(6);
    expect(spec.body.label).toBe('Classement');
    expect(spec.body.data).toBeTruthy();
  });

  it('inclut les donnees du type 14 (layout libre)', () => {
    const spec = generateSpec(stateWith({ bodyType: 14 }));
    expect(spec.body.type).toBe(14);
    expect(spec.body.label).toBe('Layout libre');
    const data = spec.body.data as Record<string, unknown>;
    expect(data.selectedFieldId).toBeNull();
  });

  it('inclut les donnees des types 1-3 (stats avec titres)', () => {
    const spec = generateSpec(stateWith({ bodyType: 1, titleCenter: 'STATS' }));
    const data = spec.body.data as Record<string, unknown>;
    expect(data.titles).toEqual({ center: 'STATS', left: DEFAULT_STATE.titleLeft, right: DEFAULT_STATE.titleRight });
  });

  it('inclut la configuration des logos', () => {
    const spec = generateSpec(stateWith({ logoMode: 'both', showCompetitionLogo: true }));
    expect(spec.logos.mode).toBe('both');
    expect(spec.logos.competition.show).toBe(true);
  });

  it('inclut les animations', () => {
    const spec = generateSpec(DEFAULT_STATE);
    expect(spec.animations).toBeTruthy();
  });

  it('inclut l\'horloge et la periode', () => {
    const spec = generateSpec(stateWith({ time: '15:30', period: '2nd PERIOD', showClock: true }));
    expect(spec.header.clock.time).toBe('15:30');
    expect(spec.header.period.text).toBe('2nd PERIOD');
    expect(spec.header.clock.visible).toBe(true);
  });

  it('inclut les penalites', () => {
    const spec = generateSpec(stateWith({
      showPenalties: true,
      penaltiesLeft: [{ time: '1:30', number: '11' }],
    }));
    expect(spec.header.penalties.show).toBe(true);
    expect(spec.header.penalties.left).toHaveLength(1);
  });

  it('inclut les tailles de police', () => {
    const spec = generateSpec(DEFAULT_STATE);
    expect(spec.fontSizes).toBeTruthy();
    expect(typeof spec.fontSizes.teamName).toBe('number');
  });

  it('inclut les couleurs de tous les elements', () => {
    const spec = generateSpec(DEFAULT_STATE);
    expect(spec.colors.teamName).toBe(DEFAULT_STATE.colors.teamName);
    expect(spec.colors.score).toBe(DEFAULT_STATE.colors.score);
  });

  it('inclut la visibilite du scoreboard', () => {
    const spec = generateSpec(stateWith({ scoreboardVisible: false }));
    expect(spec.visibility.visible).toBe(false);
  });

  it('inclut le media de fond', () => {
    const spec = generateSpec(stateWith({ backgroundMediaMode: 'image', backgroundMediaUrl: 'http://example.com/bg.jpg' }));
    expect(spec.media.mode).toBe('image');
    expect(spec.media.url).toBe('http://example.com/bg.jpg');
  });

  it('les donnees body sont des copies independantes du state', () => {
    const state = stateWith({ bodyType: 6 });
    const spec = generateSpec(state);
    const data = spec.body.data as Record<string, unknown>;
    expect(data).not.toBe(state.standingsData);
  });
});
