import { toPng } from 'html-to-image';
import type { VideoFormat } from '@/types/animation';

/** État du recorder. */
export type RecorderState = 'idle' | 'recording' | 'stopping';

/** Mime type pour le format vidéo. */
function mimeType(format: VideoFormat): string {
  return format === 'mp4' ? 'video/mp4' : 'video/webm';
}

/** Extension du fichier. */
function fileExtension(format: VideoFormat): string {
  return format === 'mp4' ? 'mp4' : 'webm';
}

/**
 * Enregistre un élément HTML en vidéo via canvas.captureStream + MediaRecorder.
 * Utilise html-to-image pour capturer chaque frame.
 */
export class VideoRecorder {
  private recorder: MediaRecorder | null = null;
  private chunks: Blob[] = [];
  private animFrameId = 0;
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private _state: RecorderState = 'idle';

  get state(): RecorderState {
    return this._state;
  }

  /** Démarre l'enregistrement. */
  async start(
    element: HTMLElement,
    format: VideoFormat = 'webm',
    fps: number = 30,
  ): Promise<void> {
    if (this._state !== 'idle') return;

    const w = element.scrollWidth;
    const h = element.scrollHeight;

    this.canvas = document.createElement('canvas');
    this.canvas.width = w;
    this.canvas.height = h;
    this.ctx = this.canvas.getContext('2d');

    const stream = this.canvas.captureStream(fps);
    const mime = mimeType(format);
    const options = MediaRecorder.isTypeSupported(mime) ? { mimeType: mime } : undefined;

    this.recorder = new MediaRecorder(stream, options);
    this.chunks = [];

    this.recorder.ondataavailable = (e) => {
      if (e.data.size > 0) this.chunks.push(e.data);
    };

    this.recorder.start(100);
    this._state = 'recording';

    const drawFrame = async () => {
      if (this._state !== 'recording') return;
      try {
        const dataUrl = await toPng(element, { width: w, height: h, pixelRatio: 1 });
        const img = new Image();
        img.onload = () => {
          this.ctx?.drawImage(img, 0, 0, w, h);
        };
        img.src = dataUrl;
      } catch {
        /* frame ratée, on continue */
      }
      this.animFrameId = requestAnimationFrame(drawFrame);
    };

    this.animFrameId = requestAnimationFrame(drawFrame);
  }

  /** Arrête l'enregistrement et renvoie le blob vidéo. */
  async stop(format: VideoFormat = 'webm'): Promise<Blob | null> {
    if (this._state !== 'recording' || !this.recorder) return null;
    this._state = 'stopping';

    cancelAnimationFrame(this.animFrameId);

    return new Promise((resolve) => {
      if (!this.recorder) { resolve(null); return; }

      this.recorder.onstop = () => {
        const mime = mimeType(format);
        const blob = new Blob(this.chunks, { type: mime });
        this.cleanup();
        resolve(blob);
      };

      this.recorder.stop();
    });
  }

  /** Télécharge le blob en fichier. */
  static download(blob: Blob, format: VideoFormat, team1: string, team2: string): void {
    const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const name = `scoreboard_${team1}vs${team2}_${ts}.${fileExtension(format)}`;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  }

  private cleanup(): void {
    this._state = 'idle';
    this.recorder = null;
    this.chunks = [];
    this.canvas = null;
    this.ctx = null;
  }
}
