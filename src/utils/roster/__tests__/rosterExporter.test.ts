import { describe, it, expect } from 'vitest';
import ExcelJS from 'exceljs';
import { exportRosterCsv, exportRosterJson, exportRosterExcel } from '@/utils/roster/rosterExporter';
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

describe('exportRosterExcel', () => {
  it('g\u00e9n\u00e8re un fichier Excel lisible avec les donn\u00e9es des joueurs', async () => {
    const buffer = await exportRosterExcel(PLAYERS);
    expect(buffer.byteLength).toBeGreaterThan(0);

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);
    const sheet = workbook.worksheets[0];
    expect(sheet).toBeDefined();

    const headerRow = sheet!.getRow(1);
    expect(String(headerRow.getCell(1).value)).toBe('number');
    expect(String(headerRow.getCell(2).value)).toBe('name');
    expect(String(headerRow.getCell(3).value)).toBe('position');

    const firstRow = sheet!.getRow(2);
    expect(String(firstRow.getCell(1).value)).toBe('1');
    expect(String(firstRow.getCell(2).value)).toBe('HUET');
    expect(String(firstRow.getCell(3).value)).toBe('G');
  });

  it('g\u00e8re un tableau vide', async () => {
    const buffer = await exportRosterExcel([]);
    expect(buffer.byteLength).toBeGreaterThan(0);

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);
    const sheet = workbook.worksheets[0];
    expect(sheet!.rowCount).toBe(1);
  });
});
