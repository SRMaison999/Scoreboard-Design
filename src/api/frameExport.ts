import type {
  FullSnapshot,
  FrameData,
  FrameRecording,
} from '@/types/frameData';
import type { ScoreboardState } from '@/types/scoreboard';
import { toTemplateData, toMatchData, toFrameData, toFullSnapshot } from './frameConverters';

/* ------------------------------------------------------------------ */
/*  API d'export : fonctions principales                              */
/* ------------------------------------------------------------------ */

export function getFullSnapshot(
  state: ScoreboardState,
  frameNumber?: number,
  timestamp?: number,
): FullSnapshot {
  return toFullSnapshot(state, frameNumber ?? 0, timestamp ?? 0);
}

export function getCurrentFrame(
  state: ScoreboardState,
  frameNumber?: number,
  timestamp?: number,
): FrameData {
  return toFrameData(state, frameNumber ?? 0, timestamp ?? 0);
}

export function getConfiguration(state: ScoreboardState) {
  return {
    template: toTemplateData(state),
    match: toMatchData(state),
  };
}

/* ------------------------------------------------------------------ */
/*  Export fichiers                                                    */
/* ------------------------------------------------------------------ */

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/** Exporte un snapshot complet en .frame.json */
export function exportFrameJson(snapshot: FullSnapshot, filename: string): void {
  const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' });
  downloadBlob(blob, filename.endsWith('.frame.json') ? filename : `${filename}.frame.json`);
}

/** Exporte un enregistrement complet en .match.json */
export function exportMatchJson(recording: FrameRecording, filename: string): void {
  const blob = new Blob([JSON.stringify(recording, null, 2)], { type: 'application/json' });
  downloadBlob(blob, filename.endsWith('.match.json') ? filename : `${filename}.match.json`);
}

/** Exporte un stream de frames en .stream.ndjson (Newline Delimited JSON) */
export function exportStreamNdjson(frames: FrameData[], filename: string): void {
  const lines = frames.map((f) => JSON.stringify(f)).join('\n');
  const blob = new Blob([lines], { type: 'application/x-ndjson' });
  downloadBlob(blob, filename.endsWith('.stream.ndjson') ? filename : `${filename}.stream.ndjson`);
}

/** G\u00e9n\u00e8re un Blob NDJSON sans t\u00e9l\u00e9chargement (pour usage programmatique) */
export function framesToNdjsonBlob(frames: FrameData[]): Blob {
  const lines = frames.map((f) => JSON.stringify(f)).join('\n');
  return new Blob([lines], { type: 'application/x-ndjson' });
}
