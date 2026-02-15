import * as XLSX from 'xlsx';
import type { RosterImportResult, RosterImportColumn } from '@/types/rosterImport';
import { validateAndMapRows } from './rosterValidator';

const COLUMN_ALIASES: Record<keyof RosterImportColumn, string[]> = {
  number: ['number', 'no', 'num', 'numero', 'num\u00e9ro', '#', 'jersey'],
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

export function parseExcel(buffer: ArrayBuffer): RosterImportResult {
  let workbook: XLSX.WorkBook;
  try {
    workbook = XLSX.read(buffer, { type: 'array' });
  } catch {
    return {
      success: false,
      players: [],
      errors: ['Impossible de lire le fichier Excel'],
      warnings: [],
    };
  }

  const sheetName = workbook.SheetNames[0];
  if (!sheetName) {
    return {
      success: false,
      players: [],
      errors: ['Aucune feuille trouv\u00e9e dans le fichier'],
      warnings: [],
    };
  }

  const sheet = workbook.Sheets[sheetName];
  if (!sheet) {
    return {
      success: false,
      players: [],
      errors: ['Feuille vide'],
      warnings: [],
    };
  }

  const rawData = XLSX.utils.sheet_to_json<string[]>(sheet, { header: 1 });
  if (rawData.length < 2) {
    return {
      success: false,
      players: [],
      errors: ['Le fichier ne contient pas assez de lignes (en-t\u00eate + donn\u00e9es)'],
      warnings: [],
    };
  }

  const headerRow = rawData[0];
  if (!headerRow) {
    return { success: false, players: [], errors: ['En-t\u00eate manquant'], warnings: [] };
  }

  const headers = headerRow.map(String);
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
  for (let i = 1; i < rawData.length; i++) {
    const row = rawData[i];
    if (!row) continue;
    rows.push({
      number: row[numIdx] != null ? String(row[numIdx]) : '',
      name: row[nameIdx] != null ? String(row[nameIdx]) : '',
      position: posIdx >= 0 && row[posIdx] != null ? String(row[posIdx]) : '',
    });
  }

  return validateAndMapRows(rows);
}
