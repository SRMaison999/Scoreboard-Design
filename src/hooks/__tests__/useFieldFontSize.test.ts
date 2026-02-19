import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFieldFontSize, hasEditableFontSize } from '../useFieldFontSize';
import { useScoreboardStore } from '@/stores/scoreboardStore';

describe('hasEditableFontSize', () => {
  it('retourne true pour text-block', () => {
    expect(hasEditableFontSize('text-block')).toBe(true);
  });

  it('retourne true pour score-display', () => {
    expect(hasEditableFontSize('score-display')).toBe(true);
  });

  it('retourne true pour clock-display', () => {
    expect(hasEditableFontSize('clock-display')).toBe(true);
  });

  it('retourne true pour team-name', () => {
    expect(hasEditableFontSize('team-name')).toBe(true);
  });

  it('retourne true pour period-display', () => {
    expect(hasEditableFontSize('period-display')).toBe(true);
  });

  it('retourne false pour shape-block', () => {
    expect(hasEditableFontSize('shape-block')).toBe(false);
  });

  it('retourne false pour image-block', () => {
    expect(hasEditableFontSize('image-block')).toBe(false);
  });
});

describe('useFieldFontSize', () => {
  beforeEach(() => {
    useScoreboardStore.getState().resetState();
    useScoreboardStore.getState().update('bodyType', 14);
  });

  it('retourne hasFontControl false sans champ sélectionné', () => {
    const { result } = renderHook(() => useFieldFontSize());
    expect(result.current.hasFontControl).toBe(false);
    expect(result.current.fontInfo).toBeNull();
  });

  it('retourne fontInfo pour un text-block sélectionné', () => {
    const element = {
      type: 'text-block' as const,
      config: {
        content: 'Test', fontSize: 30, fontWeight: 400,
        textAlign: 'center' as const, textTransform: 'none' as const,
        letterSpacing: 0,
      },
    };
    useScoreboardStore.getState().addCustomField(element, 0, 0, 200, 100);

    const { result } = renderHook(() => useFieldFontSize());
    expect(result.current.hasFontControl).toBe(true);
    expect(result.current.fontInfo).toEqual({ value: 30, isGlobal: false });
  });

  it('increase augmente la taille de police du text-block', () => {
    const element = {
      type: 'text-block' as const,
      config: {
        content: 'Test', fontSize: 30, fontWeight: 400,
        textAlign: 'center' as const, textTransform: 'none' as const,
        letterSpacing: 0,
      },
    };
    useScoreboardStore.getState().addCustomField(element, 0, 0, 200, 100);

    const { result } = renderHook(() => useFieldFontSize());
    act(() => result.current.increase());

    const fields = useScoreboardStore.getState().customFieldsData.fields;
    const field = fields[0]!;
    expect(field.element.type).toBe('text-block');
    if (field.element.type === 'text-block') {
      expect(field.element.config.fontSize).toBe(31);
    }
  });

  it('decrease diminue la taille de police du text-block', () => {
    const element = {
      type: 'text-block' as const,
      config: {
        content: 'Test', fontSize: 30, fontWeight: 400,
        textAlign: 'center' as const, textTransform: 'none' as const,
        letterSpacing: 0,
      },
    };
    useScoreboardStore.getState().addCustomField(element, 0, 0, 200, 100);

    const { result } = renderHook(() => useFieldFontSize());
    act(() => result.current.decrease());

    const fields = useScoreboardStore.getState().customFieldsData.fields;
    const field = fields[0]!;
    if (field.element.type === 'text-block') {
      expect(field.element.config.fontSize).toBe(29);
    }
  });

  it('retourne isGlobal true pour score-display sans fontSizeOverride', () => {
    const element = {
      type: 'score-display' as const,
      config: { side: 'left' as const, showLabel: false, fontSizeOverride: 0 },
    };
    useScoreboardStore.getState().addCustomField(element, 0, 0, 120, 100);

    const { result } = renderHook(() => useFieldFontSize());
    expect(result.current.fontInfo?.isGlobal).toBe(true);
  });

  it('increase sur score-display définit fontSizeOverride', () => {
    const element = {
      type: 'score-display' as const,
      config: { side: 'left' as const, showLabel: false, fontSizeOverride: 0 },
    };
    useScoreboardStore.getState().addCustomField(element, 0, 0, 120, 100);

    const { result } = renderHook(() => useFieldFontSize());
    act(() => result.current.increase());

    const fields = useScoreboardStore.getState().customFieldsData.fields;
    const field = fields[0]!;
    if (field.element.type === 'score-display') {
      expect(field.element.config.fontSizeOverride).toBeGreaterThan(0);
    }
  });

  it('setFontSize définit une valeur exacte', () => {
    const element = {
      type: 'text-block' as const,
      config: {
        content: 'Test', fontSize: 30, fontWeight: 400,
        textAlign: 'center' as const, textTransform: 'none' as const,
        letterSpacing: 0,
      },
    };
    useScoreboardStore.getState().addCustomField(element, 0, 0, 200, 100);

    const { result } = renderHook(() => useFieldFontSize());
    act(() => result.current.setFontSize(48));

    const fields = useScoreboardStore.getState().customFieldsData.fields;
    const field = fields[0]!;
    if (field.element.type === 'text-block') {
      expect(field.element.config.fontSize).toBe(48);
    }
  });

  it('setFontSize clamp la valeur entre 8 et 300', () => {
    const element = {
      type: 'text-block' as const,
      config: {
        content: 'Test', fontSize: 30, fontWeight: 400,
        textAlign: 'center' as const, textTransform: 'none' as const,
        letterSpacing: 0,
      },
    };
    useScoreboardStore.getState().addCustomField(element, 0, 0, 200, 100);

    const { result } = renderHook(() => useFieldFontSize());
    act(() => result.current.setFontSize(500));

    const fields = useScoreboardStore.getState().customFieldsData.fields;
    const field = fields[0]!;
    if (field.element.type === 'text-block') {
      expect(field.element.config.fontSize).toBe(300);
    }
  });
});
