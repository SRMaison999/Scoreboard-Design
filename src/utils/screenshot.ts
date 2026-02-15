import { toPng } from 'html-to-image';

/**
 * Capture un élément HTML en image PNG et déclenche le téléchargement.
 */
export async function captureScreenshot(
  element: HTMLElement,
  filename: string,
): Promise<void> {
  const dataUrl = await toPng(element, {
    width: element.scrollWidth,
    height: element.scrollHeight,
    pixelRatio: 1,
    backgroundColor: undefined,
  });

  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
}

/**
 * Génère le nom de fichier pour le screenshot.
 * Format : scoreboard_{team1}vs{team2}_{timestamp}.png
 */
export function buildScreenshotFilename(team1: string, team2: string): string {
  const now = new Date();
  const ts = now.toISOString().replace(/[:.]/g, '-').slice(0, 19);
  return `scoreboard_${team1}vs${team2}_${ts}.png`;
}

/**
 * Copie l'image dans le presse-papier.
 */
export async function copyScreenshotToClipboard(
  element: HTMLElement,
): Promise<void> {
  const dataUrl = await toPng(element, {
    width: element.scrollWidth,
    height: element.scrollHeight,
    pixelRatio: 1,
    backgroundColor: undefined,
  });

  const response = await fetch(dataUrl);
  const blob = await response.blob();
  await navigator.clipboard.write([
    new ClipboardItem({ 'image/png': blob }),
  ]);
}
