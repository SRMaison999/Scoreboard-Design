import { hexToRgba } from '@/utils/color';
import { ff, scaleFontSize } from '@/utils/font';
import type { ElementStyleOverride } from '@/types/elementStyleOverride';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { FontId } from '@/types/fonts';

/**
 * Valeurs par défaut d'un élément, extraites des valeurs
 * historiquement hardcodées dans les composants body type.
 */
export interface ElementDefaults {
  /** Taille de police de base en px (avant bodyScale) */
  fontSize: number;
  /** Graisse de police */
  fontWeight: number;
  /** Espacement des lettres en px */
  letterSpacing: number;
  /** Transformation du texte */
  textTransform: 'none' | 'uppercase' | 'lowercase';
  /** Clé de couleur dans le ColorMap global */
  colorKey: keyof ColorMap;
  /** Opacité hardcodée (0-1, ex: 0.7). Null = utiliser opacityMap global. */
  hardcodedOpacity?: number;
}

/**
 * Contexte global de style du scoreboard, passé à chaque body type.
 */
export interface StyleContext {
  colors: ColorMap;
  opacities: OpacityMap;
  fontBody: FontId;
  bodyScale: number;
}

/**
 * Résout le style final d'un élément en fusionnant :
 * 1. Les valeurs par défaut (historiquement hardcodées)
 * 2. Le contexte global (colors, opacities, fontBody, bodyScale)
 * 3. Les surcharges utilisateur (ElementStyleOverride)
 *
 * Priorité : override > défaut > global
 */
export function resolveElementStyle(
  defaults: ElementDefaults,
  ctx: StyleContext,
  override?: ElementStyleOverride,
): React.CSSProperties {
  const ov = override ?? {};

  const baseFontSize = ov.fontSize ?? defaults.fontSize;
  const fontSize = scaleFontSize(baseFontSize, ctx.bodyScale);

  const fontWeight = ov.fontWeight ?? defaults.fontWeight;

  const letterSpacing = ov.letterSpacing ?? defaults.letterSpacing;

  const textTransform = ov.textTransform ?? defaults.textTransform;

  const fontFamily = ff(ov.fontFamily ?? ctx.fontBody);

  let color: string;
  if (ov.color) {
    const opacityPct = ov.opacity ?? 0;
    color = hexToRgba(ov.color, opacityPct);
  } else {
    const globalOpacity = ctx.opacities[defaults.colorKey] ?? 0;
    color = hexToRgba(ctx.colors[defaults.colorKey], globalOpacity);
  }

  const style: React.CSSProperties = {
    fontSize,
    fontWeight,
    letterSpacing,
    textTransform,
    fontFamily,
    color,
  };

  if (defaults.hardcodedOpacity !== undefined && ov.opacity === undefined && !ov.color) {
    style.opacity = defaults.hardcodedOpacity;
  }

  return style;
}

/**
 * Version simplifiée qui retourne uniquement la couleur résolue.
 * Utile quand on a besoin de la couleur sans les autres propriétés.
 */
export function resolveColor(
  colorKey: keyof ColorMap,
  ctx: StyleContext,
  override?: ElementStyleOverride,
): string {
  if (override?.color) {
    const opacityPct = override.opacity ?? 0;
    return hexToRgba(override.color, opacityPct);
  }
  const globalOpacity = ctx.opacities[colorKey] ?? 0;
  return hexToRgba(ctx.colors[colorKey], globalOpacity);
}
