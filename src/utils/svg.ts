/**
 * Convertit un contenu SVG brut en data URI.
 * Utilise l'encodage URL (plus robuste que base64 pour les SVG).
 * Utilisable comme source d'une balise img.
 */
export function svgToDataUri(svgContent: string): string {
  if (!svgContent) return '';
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgContent)}`;
}
