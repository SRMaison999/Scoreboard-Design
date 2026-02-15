import ExcelJS from 'exceljs';
import type { RosterImportResult, RosterImportColumn } from '@/types/rosterImport';
import { validateAndMapRows } from './rosterValidator';

const COLUMN_ALIASES: Record<keyof RosterImportColumn, string[]> = {
  number: ['number', 'no', 'num', 'numero', 'numéro', '#', 'jersey'],
  name: ['name', 'nom', 'player', 'joueur', 'lastname', 'last_name'],
  position: ['position', 'pos', 'poste', 'role'],
};

function findColumn(headers: string[], aliases: string[]): number {
  const lower = headers.map((h) => h.toLowerCase().trim());
  for (const alias of aliases) {
    const idx = lower.indexOf(alias.toLowerCase());
    if (idx >= 0) return idx;
  }
  return -1;
}

export async function parseExcel(buffer: ArrayBuffer): Promise<RosterImportResult> {
  const workbook = new ExcelJS.Workbook();

  try {
    await workbook.xlsx.load(buffer);
  } catch {
    return {
      success: false,
      players: [],
      errors: ['Impossible de lire le fichier Excel'],
      warnings: [],
    };
  }

  const sheet = workbook.worksheets[0];
  if (!sheet || sheet.rowCount < 2) {
    return {
      success: false,
      players: [],
      errors: sheet
        ? ['Le fichier ne contient pas assez de lignes (en-tête + données)']
        : ['Aucune feuille trouvée dans le fichier'],
      warnings: [],
    };
  }

  const headerRow = sheet.getRow(1);
  const headers: string[] = [];
  headerRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
    headers[colNumber - 1] = String(cell.value ?? '');
  });

  if (headers.length === 0) {
    return { success: false, players: [], errors: ['En-tête manquant'], warnings: [] };
  }

  const numIdx = findColumn(headers, COLUMN_ALIASES.number);
  const nameIdx = findColumn(headers, COLUMN_ALIASES.name);
  const posIdx = findColumn(headers, COLUMN_ALIASES.position);

  if (numIdx < 0 || nameIdx < 0) {
    return {
      success: false,
      players: [],
      errors: [
        'Colonnes requises introuvables. Attendu : number (ou no, num, #), name (ou nom, joueur)',
      ],
      warnings: [],
    };
  }

  const rows: RosterImportColumn[] = [];
  for (let i = 2; i <= sheet.rowCount; i++) {
    const row = sheet.getRow(i);
    const numVal = row.getCell(numIdx + 1).value;
    const nameVal = row.getCell(nameIdx + 1).value;
    const posVal = posIdx >= 0 ? row.getCell(posIdx + 1).value : null;

    rows.push({
      number: numVal != null ? String(numVal) : '',
      name: nameVal != null ? String(nameVal) : '',
      position: posVal != null ? String(posVal) : '',
    });
  }

  return validateAndMapRows(rows);
}
