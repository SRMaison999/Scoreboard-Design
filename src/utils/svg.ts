/**
 * Convertit un contenu SVG brut en data URI base64.
 * Utilisable comme source d'une balise img.
 */
export function svgToDataUri(svgContent: string): string {
  if (!svgContent) return '';
  const encoded = btoa(unescape(encodeURIComponent(svgContent)));
  return `data:image/svg+xml;base64,${encoded}`;
}
