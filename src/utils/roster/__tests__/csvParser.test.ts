import { describe, it, expect } from 'vitest';
import { parseCsv } from '@/utils/roster/csvParser';

describe('parseCsv', () => {
  it('parse un CSV standard avec en-t\u00eates number,name,position', () => {
    const csv = 'number,name,position\n1,HUET,G\n3,CERNAK,D';
    const result = parseCsv(csv);
    expect(result.success).toBe(true);
    expect(result.players).toHaveLength(2);
    expect(result.players[0]).toEqual({ number: '1', name: 'HUET', position: 'G' });
  });

  it('accepte les alias de colonnes (no, nom, pos)', () => {
    const csv = 'no,nom,pos\n1,HUET,G';
    const result = parseCsv(csv);
    expect(result.success).toBe(true);
    expect(result.players).toHaveLength(1);
  });

  it('accepte l\'alias # pour le num\u00e9ro', () => {
    const csv = '#,name,position\n1,HUET,G';
    const result = parseCsv(csv);
    expect(result.success).toBe(true);
  });

  it('retourne une erreur si les colonnes requises sont absentes', () => {
    const csv = 'foo,bar\n1,HUET';
    const result = parseCsv(csv);
    expect(result.success).toBe(false);
    expect(result.errors[0]).toContain('Colonnes requises');
  });

  it('ignore les lignes vides', () => {
    const csv = 'number,name,position\n1,HUET,G\n\n3,CERNAK,D';
    const result = parseCsv(csv);
    expect(result.success).toBe(true);
    expect(result.players).toHaveLength(2);
  });

  it('g\u00e8re un CSV sans colonne position', () => {
    const csv = 'number,name\n1,HUET\n3,CERNAK';
    const result = parseCsv(csv);
    expect(result.success).toBe(true);
    expect(result.players[0]?.position).toBe('F');
  });
});
