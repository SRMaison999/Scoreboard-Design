import { toPng } from 'html-to-image';

/**
 * Extrait les proprietes de fond calculees d'un element pour garantir
 * que html-to-image les reproduit fidellement (gradients inclus).
 */
function extractBackgroundStyle(element: HTMLElement): Partial<CSSStyleDeclaration> {
  const cs = window.getComputedStyle(element);
  return {
    backgroundImage: cs.backgroundImage,
    backgroundColor: cs.backgroundColor,
    backgroundSize: cs.backgroundSize,
    backgroundPosition: cs.backgroundPosition,
    backgroundRepeat: cs.backgroundRepeat,
  };
}

/**
 * Capture un element HTML en image PNG et declenche le telechargement.
 */
export async function captureScreenshot(
  element: HTMLElement,
  filename: string,
): Promise<void> {
  const dataUrl = await toPng(element, {
    width: element.scrollWidth,
    height: element.scrollHeight,
    pixelRatio: 1,
    style: extractBackgroundStyle(element),
  });

  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
}

/**
 * Genere le nom de fichier pour le screenshot.
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
    style: extractBackgroundStyle(element),
  });

  const response = await fetch(dataUrl);
  const blob = await response.blob();
  await navigator.clipboard.write([
    new ClipboardItem({ 'image/png': blob }),
  ]);
}
