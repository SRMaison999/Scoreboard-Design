import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useUserManual } from '@/hooks/useUserManual';

describe('useUserManual', () => {
  it('demarre ferme avec le premier chapitre actif', () => {
    const { result } = renderHook(() => useUserManual());
    expect(result.current.isOpen).toBe(false);
    expect(result.current.activeChapterIndex).toBe(0);
  });

  it('ouvre le manuel', () => {
    const { result } = renderHook(() => useUserManual());
    act(() => result.current.open());
    expect(result.current.isOpen).toBe(true);
  });

  it('ferme le manuel', () => {
    const { result } = renderHook(() => useUserManual());
    act(() => result.current.open());
    act(() => result.current.close());
    expect(result.current.isOpen).toBe(false);
  });

  it('change de chapitre', () => {
    const { result } = renderHook(() => useUserManual());
    act(() => result.current.goToChapter(5));
    expect(result.current.activeChapterIndex).toBe(5);
  });
});
