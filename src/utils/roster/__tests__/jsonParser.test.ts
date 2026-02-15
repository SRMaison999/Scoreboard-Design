import { describe, it, expect } from 'vitest';
import { parseJsonRoster } from '@/utils/roster/jsonParser';

describe('parseJsonRoster', () => {
  it('parse un tableau JSON de joueurs', () => {
    const json = JSON.stringify([
      { number: '1', name: 'HUET', position: 'G' },
      { number: '3', name: 'CERNAK', position: 'D' },
    ]);
    const result = parseJsonRoster(json);
    expect(result.success).toBe(true);
    expect(result.players).toHaveLength(2);
  });

  it('parse un objet avec cl\u00e9 "players"', () => {
    const json = JSON.stringify({
      players: [{ number: '1', name: 'HUET', position: 'G' }],
    });
    const result = parseJsonRoster(json);
    expect(result.success).toBe(true);
    expect(result.players).toHaveLength(1);
  });

  it('parse un objet avec cl\u00e9 "roster"', () => {
    const json = JSON.stringify({
      roster: [{ no: 1, nom: 'HUET', pos: 'G' }],
    });
    const result = parseJsonRoster(json);
    expect(result.success).toBe(true);
  });

  it('retourne une erreur pour du JSON invalide', () => {
    const result = parseJsonRoster('not json');
    expect(result.success).toBe(false);
    expect(result.errors[0]).toContain('invalide');
  });

  it('retourne une erreur pour un format non reconnu', () => {
    const result = parseJsonRoster(JSON.stringify({ foo: 'bar' }));
    expect(result.success).toBe(false);
    expect(result.errors[0]).toContain('non reconnu');
  });

  it('accepte les alias de champs (no, nom, pos)', () => {
    const json = JSON.stringify([{ no: 1, nom: 'HUET', pos: 'G' }]);
    const result = parseJsonRoster(json);
    expect(result.success).toBe(true);
    expect(result.players[0]?.name).toBe('HUET');
  });
});
