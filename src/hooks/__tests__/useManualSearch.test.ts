import { describe, it, expect, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useManualSearch } from '@/hooks/useManualSearch';

describe('useManualSearch', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('demarre avec une requete vide et aucun resultat', () => {
    const { result } = renderHook(() => useManualSearch());
    expect(result.current.query).toBe('');
    expect(result.current.debouncedQuery).toBe('');
    expect(result.current.results).toEqual([]);
    expect(result.current.isSearchActive).toBe(false);
  });

  it('met a jour la requete immediatement', () => {
    const { result } = renderHook(() => useManualSearch());
    act(() => {
      result.current.updateQuery('test');
    });
    expect(result.current.query).toBe('test');
  });

  it('applique le debounce sur la requete', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useManualSearch());

    act(() => {
      result.current.updateQuery('score');
    });

    expect(result.current.debouncedQuery).toBe('');

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current.debouncedQuery).toBe('score');
    vi.useRealTimers();
  });

  it('produit des resultats apres le debounce', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useManualSearch());

    act(() => {
      result.current.updateQuery('score');
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current.isSearchActive).toBe(true);
    expect(result.current.results.length).toBeGreaterThan(0);
    vi.useRealTimers();
  });

  it('reinitialise la recherche avec clearSearch', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useManualSearch());

    act(() => {
      result.current.updateQuery('score');
    });
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current.isSearchActive).toBe(true);

    act(() => {
      result.current.clearSearch();
    });

    expect(result.current.query).toBe('');
    expect(result.current.debouncedQuery).toBe('');
    expect(result.current.isSearchActive).toBe(false);
    vi.useRealTimers();
  });

  it('ignore les requetes de moins de 2 caracteres', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useManualSearch());

    act(() => {
      result.current.updateQuery('a');
    });
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current.isSearchActive).toBe(false);
    expect(result.current.results).toEqual([]);
    vi.useRealTimers();
  });

  it('calcule le nombre total de correspondances', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useManualSearch());

    act(() => {
      result.current.updateQuery('score');
    });
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current.totalMatchCount).toBeGreaterThan(0);
    vi.useRealTimers();
  });
});
