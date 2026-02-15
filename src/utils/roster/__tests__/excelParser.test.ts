import { describe, it, expect } from 'vitest';
import ExcelJS from 'exceljs';
import { parseExcel } from '@/utils/roster/excelParser';

async function createExcelBuffer(
  headers: string[],
  rows: (string | number)[][],
): Promise<ArrayBuffer> {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Sheet1');
  sheet.addRow(headers);
  for (const row of rows) {
    sheet.addRow(row);
  }
  const buffer = await workbook.xlsx.writeBuffer();
  return buffer as ArrayBuffer;
}

describe('parseExcel', () => {
  it('parse un fichier Excel standard avec number, name, position', async () => {
    const buffer = await createExcelBuffer(
      ['number', 'name', 'position'],
      [
        [1, 'HUET', 'G'],
        [3, 'CERNAK', 'D'],
      ],
    );
    const result = await parseExcel(buffer);
    expect(result.success).toBe(true);
    expect(result.players).toHaveLength(2);
    expect(result.players[0]).toEqual({ number: '1', name: 'HUET', position: 'G' });
    expect(result.players[1]).toEqual({ number: '3', name: 'CERNAK', position: 'D' });
  });

  it('accepte les alias de colonnes (no, nom, pos)', async () => {
    const buffer = await createExcelBuffer(
      ['no', 'nom', 'pos'],
      [[1, 'HUET', 'G']],
    );
    const result = await parseExcel(buffer);
    expect(result.success).toBe(true);
    expect(result.players).toHaveLength(1);
  });

  it('retourne une erreur si les colonnes requises sont absentes', async () => {
    const buffer = await createExcelBuffer(
      ['foo', 'bar'],
      [[1, 'HUET']],
    );
    const result = await parseExcel(buffer);
    expect(result.success).toBe(false);
    expect(result.errors[0]).toContain('Colonnes requises');
  });

  it('retourne une erreur pour un buffer invalide', async () => {
    const invalidBuffer = new ArrayBuffer(10);
    const result = await parseExcel(invalidBuffer);
    expect(result.success).toBe(false);
    expect(result.errors[0]).toContain('Impossible de lire');
  });

  it('retourne une erreur pour un fichier sans assez de lignes', async () => {
    const buffer = await createExcelBuffer(['number', 'name', 'position'], []);
    const result = await parseExcel(buffer);
    expect(result.success).toBe(false);
    expect(result.errors[0]).toContain('pas assez de lignes');
  });
});
