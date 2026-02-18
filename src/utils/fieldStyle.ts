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

  return result;
}
