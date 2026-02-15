import { describe, it, expect } from 'vitest';
import { VideoRecorder } from '@/utils/videoRecorder';

describe('VideoRecorder', () => {
  it('initialise en etat idle', () => {
    const recorder = new VideoRecorder();
    expect(recorder.state).toBe('idle');
  });

  it('download cree un lien de telechargement', () => {
    const blob = new Blob(['test'], { type: 'video/webm' });

    const clicks: string[] = [];
    const origCreateElement = document.createElement.bind(document);
    const origCreateObjectURL = URL.createObjectURL;
    const origRevokeObjectURL = URL.revokeObjectURL;

    URL.createObjectURL = () => 'blob:test';
    URL.revokeObjectURL = () => {};

    document.createElement = ((tag: string) => {
      const el = origCreateElement(tag);
      if (tag === 'a') {
        el.click = () => { clicks.push(el.getAttribute('download') ?? ''); };
      }
      return el;
    }) as typeof document.createElement;

    VideoRecorder.download(blob, 'webm', 'SVK', 'FIN');

    expect(clicks.length).toBe(1);
    expect(clicks[0]).toMatch(/scoreboard_SVKvsFIN_.*\.webm$/);

    document.createElement = origCreateElement;
    URL.createObjectURL = origCreateObjectURL;
    URL.revokeObjectURL = origRevokeObjectURL;
  });

  it('download utilise l extension mp4 pour le format mp4', () => {
    const blob = new Blob(['test'], { type: 'video/mp4' });

    const downloads: string[] = [];
    const origCreateElement = document.createElement.bind(document);
    const origCreateObjectURL = URL.createObjectURL;
    const origRevokeObjectURL = URL.revokeObjectURL;

    URL.createObjectURL = () => 'blob:test';
    URL.revokeObjectURL = () => {};

    document.createElement = ((tag: string) => {
      const el = origCreateElement(tag);
      if (tag === 'a') {
        el.click = () => { downloads.push(el.getAttribute('download') ?? ''); };
      }
      return el;
    }) as typeof document.createElement;

    VideoRecorder.download(blob, 'mp4', 'CAN', 'USA');

    expect(downloads[0]).toMatch(/\.mp4$/);

    document.createElement = origCreateElement;
    URL.createObjectURL = origCreateObjectURL;
    URL.revokeObjectURL = origRevokeObjectURL;
  });

  it('stop retourne null si pas en cours d enregistrement', async () => {
    const recorder = new VideoRecorder();
    const result = await recorder.stop();
    expect(result).toBeNull();
  });
});
