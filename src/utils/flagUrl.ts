import { FLAG_SVG_REGISTRY } from '@/assets/flags';
import { svgToDataUri } from '@/utils/svg';

/**
 * Cache interne des data URIs generees a partir des SVG embarques.
 * Evite de re-encoder le base64 a chaque appel.
 */
const svgDataUriCache = new Map<string, string>();

/**
 * Resout l'URL du drapeau pour un code NOC.
 * Priorite : override utilisateur (flag-CODE) > SVG embarque > chaine vide.
 */
export function resolveFlagUrl(
  code: string,
  flagOverrides: Record<string, string>,
): string {
  const override = flagOverrides[`flag-${code}`];
  if (override) return override;

  const svgRaw = FLAG_SVG_REGISTRY[code];
  if (svgRaw) {
    let cached = svgDataUriCache.get(code);
    if (!cached) {
      cached = svgToDataUri(svgRaw);
      svgDataUriCache.set(code, cached);
    }
    return cached;
  }

  return '';
}
