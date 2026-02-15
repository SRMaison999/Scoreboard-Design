import type { RosterPlayer, PlayerPosition } from '@/types/bodyTypes/roster';
import type { RosterImportResult, RosterImportColumn } from '@/types/rosterImport';
import { VALID_POSITIONS, MAX_ROSTER_IMPORT } from '@/types/rosterImport';

function normalizePosition(raw: string): PlayerPosition | null {
  const upper = raw.trim().toUpperCase();
  if ((VALID_POSITIONS as readonly string[]).includes(upper)) {
    return upper as PlayerPosition;
  }
  return null;
}

export function validateAndMapRows(
  rows: RosterImportColumn[],
): RosterImportResult {
  const players: RosterPlayer[] = [];
  const errors: string[] = [];
  const warnings: string[] = [];

  if (rows.length === 0) {
    return { success: false, players: [], errors: ['Aucune ligne de donn\u00e9es trouv\u00e9e'], warnings: [] };
  }

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (!row) continue;

    const lineLabel = `Ligne ${String(i + 1)}`;

    const number = (row.number ?? '').toString().trim();
    const name = (row.name ?? '').toString().trim();
    const posRaw = (row.position ?? '').toString().trim();

    if (!number && !name && !posRaw) {
      continue;
    }

    if (!number) {
      errors.push(`${lineLabel} : num\u00e9ro manquant`);
      continue;
    }

    if (!name) {
      errors.push(`${lineLabel} : nom manquant`);
      continue;
    }

    const position = normalizePosition(posRaw);
    if (!position) {
      warnings.push(`${lineLabel} : position "${posRaw}" invalide, d\u00e9faut "F"`);
    }

    players.push({
      number,
      name: name.toUpperCase(),
      position: position ?? 'F',
    });
  }

  if (players.length > MAX_ROSTER_IMPORT) {
    warnings.push(`Import limit\u00e9 \u00e0 ${String(MAX_ROSTER_IMPORT)} joueurs (${String(players.length)} trouv\u00e9s)`);
    players.length = MAX_ROSTER_IMPORT;
  }

  return {
    success: players.length > 0,
    players,
    errors,
    warnings,
  };
}
