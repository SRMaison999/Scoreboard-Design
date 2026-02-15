import Papa from 'papaparse';
import type { RosterImportResult, RosterImportColumn } from '@/types/rosterImport';
import { validateAndMapRows } from './rosterValidator';

interface CsvRow {
  [key: string]: string | undefined;
}

const COLUMN_ALIASES: Record<keyof RosterImportColumn, string[]> = {
  number: ['number', 'no', 'num', 'numero', 'num\u00e9ro', '#', 'jersey'],
  name: ['name', 'nom', 'player', 'joueur', 'lastname', 'last_name'],
  position: ['position', 'pos', 'poste', 'role'],
};

function findColumn(headers: string[], aliases: string[]): string | null {
  const lower = headers.map((h) => h.toLowerCase().trim());
  for (const alias of aliases) {
    const idx = lower.indexOf(alias.toLowerCase());
    if (idx >= 0 && headers[idx]) return headers[idx];
  }
  return null;
}

export function parseCsv(content: string): RosterImportResult {
  const result = Papa.parse<CsvRow>(content, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h: string) => h.trim(),
  });

  if (result.errors.length > 0 && result.data.length === 0) {
    return {
      success: false,
      players: [],
      errors: result.errors.map((e) => e.message),
      warnings: [],
    };
  }

  const headers = result.meta.fields ?? [];
  const numCol = findColumn(headers, COLUMN_ALIASES.number);
  const nameCol = findColumn(headers, COLUMN_ALIASES.name);
  const posCol = findColumn(headers, COLUMN_ALIASES.position);

  if (!numCol || !nameCol) {
    return {
      success: false,
      players: [],
      errors: [
        'Colonnes requises introuvables. Attendu : number (ou no, num, #), name (ou nom, joueur)',
      ],
      warnings: [],
    };
  }

  const rows: RosterImportColumn[] = result.data.map((row) => ({
    number: row[numCol] ?? '',
    name: row[nameCol] ?? '',
    position: posCol ? (row[posCol] ?? '') : '',
  }));

  return validateAndMapRows(rows);
}
