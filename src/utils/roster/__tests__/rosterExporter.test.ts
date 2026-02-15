import { describe, it, expect } from 'vitest';
import { exportRosterCsv, exportRosterJson } from '@/utils/roster/rosterExporter';
import type { RosterPlayer } from '@/types/bodyTypes/roster';

const PLAYERS: RosterPlayer[] = [
  { number: '1', name: 'HUET', position: 'G' },
  { number: '3', name: 'CERNAK', position: 'D' },
];

describe('exportRosterCsv', () => {
  it('g\u00e9n\u00e8re un CSV valide avec en-t\u00eates', () => {
    const csv = exportRosterCsv(PLAYERS);
    const lines = csv.split('\n');
    expect(lines[0]).toBe('number,name,position');
    expect(lines[1]).toBe('1,HUET,G');
    expect(lines[2]).toBe('3,CERNAK,D');
  });

  it('g\u00e8re un tableau vide', () => {
    const csv = exportRosterCsv([]);
    expect(csv).toBe('number,name,position');
  });
});

describe('exportRosterJson', () => {
  it('g\u00e9n\u00e8re un JSON avec cl\u00e9 players', () => {
    const json = exportRosterJson(PLAYERS);
    const parsed = JSON.parse(json) as { players: RosterPlayer[] };
    expect(parsed.players).toHaveLength(2);
    expect(parsed.players[0]?.name).toBe('HUET');
  });
});
