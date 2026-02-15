import type { RosterImportResult, RosterImportColumn } from '@/types/rosterImport';
import { validateAndMapRows } from './rosterValidator';

interface JsonPlayerRow {
  number?: string | number;
  no?: string | number;
  num?: string | number;
  name?: string;
  nom?: string;
  player?: string;
  position?: string;
  pos?: string;
}

export function parseJsonRoster(content: string): RosterImportResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(content);
  } catch {
    return {
      success: false,
      players: [],
      errors: ['JSON invalide'],
      warnings: [],
    };
  }

  let items: JsonPlayerRow[];

  if (Array.isArray(parsed)) {
    items = parsed as JsonPlayerRow[];
  } else if (typeof parsed === 'object' && parsed !== null) {
    const obj = parsed as Record<string, unknown>;
    if (Array.isArray(obj['players'])) {
      items = obj['players'] as JsonPlayerRow[];
    } else if (Array.isArray(obj['roster'])) {
      items = obj['roster'] as JsonPlayerRow[];
    } else {
      return {
        success: false,
        players: [],
        errors: ['Format JSON non reconnu. Attendu : un tableau ou un objet avec "players" ou "roster"'],
        warnings: [],
      };
    }
  } else {
    return {
      success: false,
      players: [],
      errors: ['Format JSON non reconnu'],
      warnings: [],
    };
  }

  const rows: RosterImportColumn[] = items.map((item) => ({
    number: String(item.number ?? item.no ?? item.num ?? ''),
    name: String(item.name ?? item.nom ?? item.player ?? ''),
    position: String(item.position ?? item.pos ?? ''),
  }));

  return validateAndMapRows(rows);
}
