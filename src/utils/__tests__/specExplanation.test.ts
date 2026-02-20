import { describe, it, expect } from 'vitest';
import { generateExplanation } from '@/utils/specExplanation';
import { generateSpec } from '@/utils/specGenerator';
import { DEFAULT_STATE } from '@/data/defaultState';
import type { ScoreboardState } from '@/types/scoreboard';

function stateWith(overrides: Partial<ScoreboardState>): ScoreboardState {
  return { ...DEFAULT_STATE, ...overrides };
}

function specFor(overrides: Partial<ScoreboardState> = {}) {
  return generateSpec(stateWith(overrides));
}

describe('generateExplanation', () => {
  it('genere un document Markdown non vide', () => {
    const explanation = generateExplanation(specFor());
    expect(explanation).toBeTruthy();
    expect(typeof explanation).toBe('string');
  });

  it('contient le titre principal avec le label du body type', () => {
    const explanation = generateExplanation(specFor({ bodyType: 6 }));
    expect(explanation).toContain('Classement');
  });

  it('contient la section canvas avec les dimensions', () => {
    const explanation = generateExplanation(specFor({ templateWidth: 1280, templateHeight: 720 }));
    expect(explanation).toContain('1280px');
    expect(explanation).toContain('720px');
  });

  it('contient la section fond d ecran', () => {
    const explanation = generateExplanation(specFor());
    expect(explanation).toContain('Fond d\'ecran');
    expect(explanation).toContain('gradient');
  });

  it('contient la section header avec les equipes', () => {
    const explanation = generateExplanation(specFor({ team1: 'CAN', team2: 'FIN' }));
    expect(explanation).toContain('CAN');
    expect(explanation).toContain('FIN');
    expect(explanation).toContain('Equipe gauche');
    expect(explanation).toContain('Equipe droite');
  });

  it('contient la section horloge', () => {
    const explanation = generateExplanation(specFor({ time: '15:30', period: '2nd PERIOD' }));
    expect(explanation).toContain('15:30');
    expect(explanation).toContain('2nd PERIOD');
  });

  it('contient la section polices', () => {
    const explanation = generateExplanation(specFor());
    expect(explanation).toContain('Polices');
    expect(explanation).toContain('Oswald');
  });

  it('contient la section couleurs', () => {
    const explanation = generateExplanation(specFor());
    expect(explanation).toContain('Couleurs');
    expect(explanation).toContain('Element');
  });

  it('contient le schema de disposition (layout overview)', () => {
    const explanation = generateExplanation(specFor());
    expect(explanation).toContain('Vue d\'ensemble de la disposition');
    expect(explanation).toContain('HEADER');
  });

  it('contient les penalites quand actives', () => {
    const explanation = generateExplanation(specFor({
      showPenalties: true,
      penaltiesLeft: [{ time: '1:30', number: '11' }],
    }));
    expect(explanation).toContain('Penalites');
    expect(explanation).toContain('PEN.G');
  });

  it('ne contient pas les penalites quand desactivees', () => {
    const explanation = generateExplanation(specFor({ showPenalties: false }));
    expect(explanation).not.toContain('PEN.G');
  });

  it('decrit le type 1 (stats centrees)', () => {
    const explanation = generateExplanation(specFor({ bodyType: 1 }));
    expect(explanation).toContain('Stats centrees');
    expect(explanation).toContain('Titre central');
  });

  it('decrit le type 6 (classement)', () => {
    const explanation = generateExplanation(specFor({ bodyType: 6 }));
    expect(explanation).toContain('Classement');
    expect(explanation).toContain('Rang');
  });

  it('decrit le type 14 (layout libre)', () => {
    const explanation = generateExplanation(specFor({ bodyType: 14 }));
    expect(explanation).toContain('Layout libre');
    expect(explanation).toContain('positionne librement');
  });

  it('contient la section visibilite', () => {
    const explanation = generateExplanation(specFor({ scoreboardVisible: false }));
    expect(explanation).toContain('Visibilite');
    expect(explanation).toContain('false');
  });

  it('contient la section logos', () => {
    const explanation = generateExplanation(specFor({ showCompetitionLogo: true }));
    expect(explanation).toContain('Logos');
    expect(explanation).toContain('Logo competition');
  });

  it('contient le media de fond quand actif', () => {
    const explanation = generateExplanation(specFor({
      backgroundMediaMode: 'image',
      backgroundMediaUrl: 'http://example.com/bg.jpg',
    }));
    expect(explanation).toContain('Media de fond');
    expect(explanation).toContain('http://example.com/bg.jpg');
  });
});
