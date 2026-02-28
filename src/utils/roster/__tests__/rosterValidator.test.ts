import { describe, it, expect } from 'vitest';
import { validateAndMapRows } from '@/utils/roster/rosterValidator';

describe('validateAndMapRows', () => {
  it('mappe des lignes valides en joueurs', () => {
    const result = validateAndMapRows([
      { number: '1', name: 'HUET', position: 'G' },
      { number: '3', name: 'CERNAK', position: 'D' },
    ]);
    expect(result.success).toBe(true);
    expect(result.players).toHaveLength(2);
    expect(result.players[0]).toEqual({ number: '1', name: 'HUET', position: 'G' });
  });

  it('retourne une erreur pour un tableau vide', () => {
    const result = validateAndMapRows([]);
    expect(result.success).toBe(false);
    expect(result.errors).toHaveLength(1);
  });

  it('ignore les lignes enti\u00e8rement vides', () => {
    const result = validateAndMapRows([
      { number: '', name: '', position: '' },
      { number: '1', name: 'HUET', position: 'G' },
    ]);
    expect(result.success).toBe(true);
    expect(result.players).toHaveLength(1);
  });

  it('signale une erreur si le num\u00e9ro manque', () => {
    const result = validateAndMapRows([
      { number: '', name: 'HUET', position: 'G' },
    ]);
    expect(result.success).toBe(false);
    expect(result.errors[0]).toContain('num\u00e9ro manquant');
  });

  it('signale une erreur si le nom manque', () => {
    const result = validateAndMapRows([
      { number: '1', name: '', position: 'G' },
    ]);
    expect(result.success).toBe(false);
    expect(result.errors[0]).toContain('nom manquant');
  });

  it('d\u00e9faut en F pour une position invalide avec message fran\u00e7ais', () => {
    const result = validateAndMapRows([
      { number: '1', name: 'HUET', position: 'INVALID' },
    ]);
    expect(result.success).toBe(true);
    expect(result.players[0]?.position).toBe('F');
    expect(result.warnings[0]).toContain('invalide');
    expect(result.warnings[0]).toContain('Attaquant');
  });

  it('accepte les positions en fran\u00e7ais complet', () => {
    const result = validateAndMapRows([
      { number: '1', name: 'HUET', position: 'Gardien' },
      { number: '3', name: 'CERNAK', position: 'D\u00e9fenseur' },
      { number: '11', name: 'KOPITAR', position: 'Centre' },
      { number: '18', name: 'SLAFKOVSKY', position: 'Ailier gauche' },
      { number: '81', name: 'HOSSA', position: 'Ailier droit' },
      { number: '9', name: 'TATAR', position: 'Attaquant' },
    ]);
    expect(result.success).toBe(true);
    expect(result.players[0]?.position).toBe('G');
    expect(result.players[1]?.position).toBe('D');
    expect(result.players[2]?.position).toBe('C');
    expect(result.players[3]?.position).toBe('LW');
    expect(result.players[4]?.position).toBe('RW');
    expect(result.players[5]?.position).toBe('F');
    expect(result.warnings).toHaveLength(0);
  });

  it('accepte les anciennes abr\u00e9viations fran\u00e7aises (AG, AD, A)', () => {
    const result = validateAndMapRows([
      { number: '18', name: 'SLAFKOVSKY', position: 'AG' },
      { number: '81', name: 'HOSSA', position: 'AD' },
      { number: '9', name: 'TATAR', position: 'A' },
    ]);
    expect(result.success).toBe(true);
    expect(result.players[0]?.position).toBe('LW');
    expect(result.players[1]?.position).toBe('RW');
    expect(result.players[2]?.position).toBe('F');
  });

  it('normalise le nom en majuscules', () => {
    const result = validateAndMapRows([
      { number: '1', name: 'huet', position: 'G' },
    ]);
    expect(result.players[0]?.name).toBe('HUET');
  });

  it('accepte les positions en minuscules', () => {
    const result = validateAndMapRows([
      { number: '1', name: 'HUET', position: 'g' },
    ]);
    expect(result.players[0]?.position).toBe('G');
  });

  it('limite \u00e0 25 joueurs', () => {
    const rows = Array.from({ length: 30 }, (_, i) => ({
      number: String(i + 1),
      name: `JOUEUR${String(i + 1)}`,
      position: 'F',
    }));
    const result = validateAndMapRows(rows);
    expect(result.players).toHaveLength(25);
    expect(result.warnings.some((w) => w.includes('25'))).toBe(true);
  });
});
