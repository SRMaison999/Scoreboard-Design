import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useFontSelectGroups } from '@/hooks/useFontSelectGroups';
import { FONT_CATEGORY_ORDER, FONT_CATEGORY_LABELS, FONT_OPTIONS } from '@/constants/fonts';

describe('useFontSelectGroups', () => {
  it('retourne un groupe par catégorie dans le bon ordre', () => {
    const { result } = renderHook(() => useFontSelectGroups());
    const groups = result.current;

    expect(groups).toHaveLength(FONT_CATEGORY_ORDER.length);

    groups.forEach((group, i) => {
      const cat = FONT_CATEGORY_ORDER[i] as NonNullable<typeof FONT_CATEGORY_ORDER[number]>;
      expect(group.label).toBe(FONT_CATEGORY_LABELS[cat]);
    });
  });

  it('contient toutes les polices disponibles', () => {
    const { result } = renderHook(() => useFontSelectGroups());
    const allOptions = result.current.flatMap((g) => g.options);
    expect(allOptions).toHaveLength(FONT_OPTIONS.length);
  });

  it('chaque option a un style fontFamily', () => {
    const { result } = renderHook(() => useFontSelectGroups());
    const allOptions = result.current.flatMap((g) => g.options);
    allOptions.forEach((opt) => {
      expect(opt.style).toBeDefined();
      expect(opt.style?.fontFamily).toBeTruthy();
    });
  });

  it('le groupe Sport contient Oswald', () => {
    const { result } = renderHook(() => useFontSelectGroups());
    const sportGroup = result.current.find((g) => g.label === FONT_CATEGORY_LABELS.sport);
    expect(sportGroup).toBeDefined();
    const oswald = sportGroup?.options.find((o) => o.value === 'oswald');
    expect(oswald).toBeDefined();
    expect(oswald?.label).toBe('Oswald');
  });

  it('le groupe Monospace contient les polices monospace', () => {
    const { result } = renderHook(() => useFontSelectGroups());
    const monoGroup = result.current.find((g) => g.label === FONT_CATEGORY_LABELS.monospace);
    expect(monoGroup).toBeDefined();
    const ids = monoGroup?.options.map((o) => o.value) ?? [];
    expect(ids).toContain('share-tech-mono');
    expect(ids).toContain('jetbrains-mono');
  });
});
