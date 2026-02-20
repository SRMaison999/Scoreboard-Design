/**
 * Utilitaire pour convertir un FieldStyle en CSS inline.
 * Utilisé par les composants de rendu des champs personnalisés.
 */

import { hexToRgba } from '@/utils/color';
import type { FieldStyle } from '@/types/customField';

export function fieldBgStyle(style: FieldStyle): React.CSSProperties {
  const result: React.CSSProperties = {};

  if (style.backgroundColor) {
    result.backgroundColor = hexToRgba(style.backgroundColor, style.backgroundOpacity);
  }
  if (style.borderWidth > 0 && style.borderColor) {
    result.border = `${style.borderWidth}px solid ${style.borderColor}`;
  }
  if (style.borderRadius > 0) {
    result.borderRadius = `${style.borderRadius}px`;
  }
  if (style.padding > 0) {
    result.padding = `${style.padding}px`;
  }

  /* Opacite globale */
  if (style.opacity < 100) {
    result.opacity = style.opacity / 100;
  }

  /* Ombre portee */
  if (style.shadow) {
    const { offsetX, offsetY, blur, color, opacity } = style.shadow;
    const shadowColor = hexToRgba(color, opacity);
    result.boxShadow = `${offsetX}px ${offsetY}px ${blur}px ${shadowColor}`;
  }

  /* Flou d'arriere-plan */
  if (style.backdropBlur > 0) {
    result.backdropFilter = `blur(${style.backdropBlur}px)`;
  }

  return result;
}
