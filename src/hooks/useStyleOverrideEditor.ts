import { useCallback } from 'react';
import type { ElementStyleOverride, TextTransformValue } from '@/types/elementStyleOverride';
import type { FontId } from '@/types/fonts';

/**
 * Hook pour gérer la mise à jour d'un ElementStyleOverride.
 * Fournit des callbacks typés pour chaque propriété.
 */
export function useStyleOverrideEditor(
  current: ElementStyleOverride | undefined,
  onChange: (override: ElementStyleOverride | undefined) => void,
) {
  const update = useCallback(
    (patch: Partial<ElementStyleOverride>) => {
      const merged = { ...(current ?? {}), ...patch };
      const hasValues = Object.values(merged).some((v) => v !== undefined);
      onChange(hasValues ? merged : undefined);
    },
    [current, onChange],
  );

  const clearField = useCallback(
    (field: keyof ElementStyleOverride) => {
      if (!current) return;
      const next = { ...current };
      delete next[field];
      const hasValues = Object.values(next).some((v) => v !== undefined);
      onChange(hasValues ? next : undefined);
    },
    [current, onChange],
  );

  const reset = useCallback(() => onChange(undefined), [onChange]);

  const setFontSize = useCallback((v: number) => update({ fontSize: v }), [update]);
  const setFontWeight = useCallback((v: number) => update({ fontWeight: v }), [update]);
  const setFontFamily = useCallback((v: FontId) => update({ fontFamily: v }), [update]);
  const setLetterSpacing = useCallback((v: number) => update({ letterSpacing: v }), [update]);
  const setTextTransform = useCallback((v: TextTransformValue) => update({ textTransform: v }), [update]);
  const setColor = useCallback((v: string) => update({ color: v }), [update]);
  const setOpacity = useCallback((v: number) => update({ opacity: v }), [update]);

  return {
    update,
    clearField,
    reset,
    setFontSize,
    setFontWeight,
    setFontFamily,
    setLetterSpacing,
    setTextTransform,
    setColor,
    setOpacity,
    hasOverride: current !== undefined && Object.keys(current).length > 0,
  };
}
