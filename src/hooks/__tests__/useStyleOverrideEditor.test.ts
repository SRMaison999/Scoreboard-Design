import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useStyleOverrideEditor } from '@/hooks/useStyleOverrideEditor';
import type { ElementStyleOverride } from '@/types/elementStyleOverride';

describe('useStyleOverrideEditor', () => {
  it('retourne hasOverride=false sans override', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useStyleOverrideEditor(undefined, onChange));
    expect(result.current.hasOverride).toBe(false);
  });

  it('retourne hasOverride=true avec override non vide', () => {
    const onChange = vi.fn();
    const override: ElementStyleOverride = { fontSize: 20 };
    const { result } = renderHook(() => useStyleOverrideEditor(override, onChange));
    expect(result.current.hasOverride).toBe(true);
  });

  it('setFontSize appelle onChange avec fontSize', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useStyleOverrideEditor(undefined, onChange));
    act(() => { result.current.setFontSize(24); });
    expect(onChange).toHaveBeenCalledWith({ fontSize: 24 });
  });

  it('setFontWeight appelle onChange avec fontWeight', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useStyleOverrideEditor(undefined, onChange));
    act(() => { result.current.setFontWeight(700); });
    expect(onChange).toHaveBeenCalledWith({ fontWeight: 700 });
  });

  it('setColor appelle onChange avec color', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useStyleOverrideEditor(undefined, onChange));
    act(() => { result.current.setColor('#ff0000'); });
    expect(onChange).toHaveBeenCalledWith({ color: '#ff0000' });
  });

  it('setLetterSpacing appelle onChange avec letterSpacing', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useStyleOverrideEditor(undefined, onChange));
    act(() => { result.current.setLetterSpacing(5); });
    expect(onChange).toHaveBeenCalledWith({ letterSpacing: 5 });
  });

  it('setTextTransform appelle onChange avec textTransform', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useStyleOverrideEditor(undefined, onChange));
    act(() => { result.current.setTextTransform('lowercase'); });
    expect(onChange).toHaveBeenCalledWith({ textTransform: 'lowercase' });
  });

  it('setFontFamily appelle onChange avec fontFamily', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useStyleOverrideEditor(undefined, onChange));
    act(() => { result.current.setFontFamily('oswald'); });
    expect(onChange).toHaveBeenCalledWith({ fontFamily: 'oswald' });
  });

  it('setOpacity appelle onChange avec opacity', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useStyleOverrideEditor(undefined, onChange));
    act(() => { result.current.setOpacity(50); });
    expect(onChange).toHaveBeenCalledWith({ opacity: 50 });
  });

  it('fusionne avec l\u2019override existant', () => {
    const onChange = vi.fn();
    const existing: ElementStyleOverride = { fontSize: 20, fontWeight: 600 };
    const { result } = renderHook(() => useStyleOverrideEditor(existing, onChange));
    act(() => { result.current.setColor('#00ff00'); });
    expect(onChange).toHaveBeenCalledWith({ fontSize: 20, fontWeight: 600, color: '#00ff00' });
  });

  it('reset appelle onChange avec undefined', () => {
    const onChange = vi.fn();
    const existing: ElementStyleOverride = { fontSize: 20 };
    const { result } = renderHook(() => useStyleOverrideEditor(existing, onChange));
    act(() => { result.current.reset(); });
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it('clearField supprime un champ et garde les autres', () => {
    const onChange = vi.fn();
    const existing: ElementStyleOverride = { fontSize: 20, fontWeight: 600 };
    const { result } = renderHook(() => useStyleOverrideEditor(existing, onChange));
    act(() => { result.current.clearField('fontSize'); });
    expect(onChange).toHaveBeenCalledWith({ fontWeight: 600 });
  });

  it('clearField appelle undefined quand c\u2019est le dernier champ', () => {
    const onChange = vi.fn();
    const existing: ElementStyleOverride = { fontSize: 20 };
    const { result } = renderHook(() => useStyleOverrideEditor(existing, onChange));
    act(() => { result.current.clearField('fontSize'); });
    expect(onChange).toHaveBeenCalledWith(undefined);
  });
});
