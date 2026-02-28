/**
 * Tests de type pour les configurations des elements du Layout libre.
 * Verifie que les interfaces sont correctement definies et exportees.
 */

import { describe, it, expect } from 'vitest';
import type {
  PlayerRowConfig,
  PlayerListConfig,
  PlayerListEntry,
  GoalScorerConfig,
  GoalAssistsConfig,
  GoalDetailsConfig,
  StaffRowConfig,
  StaffListConfig,
  StaffListEntry,
  DataTableConfig,
  DataTableColumn,
  DataTableRow,
} from '@/types/freeLayoutConfigs';

describe('freeLayoutConfigs types', () => {
  it('PlayerRowConfig accepte une config valide', () => {
    const config: PlayerRowConfig = {
      playerName: 'KOPITAR',
      playerNumber: '11',
      position: 'C',
      showNumber: true,
      showPosition: false,
      fontSize: 24,
      fontFamily: '',
      textColor: '#ffffff',
    };
    expect(config.playerName).toBe('KOPITAR');
  });

  it('PlayerListConfig accepte une liste de joueurs', () => {
    const entry: PlayerListEntry = { name: 'KOPITAR', number: '11', position: 'C' };
    const config: PlayerListConfig = {
      title: 'LIGNE 1',
      players: [entry],
      showNumbers: true,
      showPositions: true,
      fontSize: 20,
      fontFamily: '',
      textColor: '#ffffff',
      titleColor: '#ffffff',
    };
    expect(config.players).toHaveLength(1);
  });

  it('GoalScorerConfig accepte une config buteur', () => {
    const config: GoalScorerConfig = {
      scorerName: 'KOPITAR',
      scorerNumber: '11',
      scorerPhoto: '',
      showPhoto: true,
      showNumber: true,
      fontSize: 32,
      fontFamily: '',
      textColor: '#ffffff',
    };
    expect(config.scorerName).toBe('KOPITAR');
  });

  it('GoalAssistsConfig accepte deux assistants', () => {
    const config: GoalAssistsConfig = {
      assist1Name: 'DOUGHTY',
      assist1Number: '8',
      assist2Name: 'KEMPE',
      assist2Number: '9',
      showNumbers: true,
      fontSize: 20,
      fontFamily: '',
      textColor: '#ffffff',
    };
    expect(config.assist1Name).toBe('DOUGHTY');
    expect(config.assist2Name).toBe('KEMPE');
  });

  it('GoalDetailsConfig accepte les d\u00e9tails du but', () => {
    const config: GoalDetailsConfig = {
      goalTime: '12:34',
      goalPeriod: '2nd PERIOD',
      goalCountMatch: '3',
      goalCountTournament: '7',
      showPeriod: true,
      showCount: true,
      fontSize: 20,
      fontFamily: '',
      textColor: '#ffffff',
    };
    expect(config.goalTime).toBe('12:34');
  });

  it('StaffRowConfig accepte un membre du staff', () => {
    const config: StaffRowConfig = {
      role: 'Entra\u00eeneur',
      name: 'MARTIN',
      fontSize: 20,
      fontFamily: '',
      textColor: '#ffffff',
    };
    expect(config.role).toBe('Entra\u00eeneur');
  });

  it('StaffListConfig accepte une liste de staff', () => {
    const entry: StaffListEntry = { role: 'Adjoint', name: 'DUPONT' };
    const config: StaffListConfig = {
      title: 'STAFF',
      members: [entry],
      fontSize: 18,
      fontFamily: '',
      textColor: '#ffffff',
      titleColor: '#ffffff',
    };
    expect(config.members).toHaveLength(1);
  });

  it('DataTableConfig accepte un tableau complet', () => {
    const column: DataTableColumn = { id: 'team', label: '\u00c9quipe', align: 'left' };
    const row: DataTableRow = { values: { team: 'SVK' }, highlighted: false };
    const config: DataTableConfig = {
      title: 'CLASSEMENT',
      columns: [column],
      rows: [row],
      showHeader: true,
      fontSize: 16,
      fontFamily: '',
      headerColor: '#ffffff',
      textColor: '#ffffff',
    };
    expect(config.columns).toHaveLength(1);
    expect(config.rows).toHaveLength(1);
  });
});
