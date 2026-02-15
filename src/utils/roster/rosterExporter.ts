import ExcelJS from 'exceljs';
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

export async function exportRosterExcel(players: RosterPlayer[]): Promise<ExcelJS.Buffer> {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Roster');

  sheet.addRow(['number', 'name', 'position']);
  for (const p of players) {
    sheet.addRow([p.number, p.name, p.position]);
  }

  return workbook.xlsx.writeBuffer();
}

export function downloadFile(data: string | BlobPart, filename: string, mime: string): void {
  const blob = new Blob([data], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
