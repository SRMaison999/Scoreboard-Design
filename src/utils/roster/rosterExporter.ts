import * as XLSX from 'xlsx';
import type { RosterPlayer } from '@/types/bodyTypes/roster';

export function exportRosterCsv(players: RosterPlayer[]): string {
  const header = 'number,name,position';
  const lines = players.map(
    (p) => `${p.number},${p.name},${p.position}`,
  );
  return [header, ...lines].join('\n');
}

export function exportRosterJson(players: RosterPlayer[]): string {
  return JSON.stringify({ players }, null, 2);
}

export function exportRosterExcel(players: RosterPlayer[]): ArrayBuffer {
  const data = [
    ['number', 'name', 'position'],
    ...players.map((p) => [p.number, p.name, p.position]),
  ];
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, 'Roster');
  return XLSX.write(wb, { type: 'array', bookType: 'xlsx' }) as ArrayBuffer;
}

export function downloadFile(data: string | ArrayBuffer, filename: string, mime: string): void {
  const blob = data instanceof ArrayBuffer
    ? new Blob([data], { type: mime })
    : new Blob([data], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
