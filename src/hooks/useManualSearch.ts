import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { MANUAL_CHAPTERS } from '@/data/manual/chapters';
import { searchManualChapters } from '@/utils/textSearch';
import type { ManualSearchResult } from '@/types/userManual';

const DEBOUNCE_DELAY_MS = 300;

export function useManualSearch() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateQuery = useCallback((value: string) => {
    setQuery(value);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setDebouncedQuery(value);
    }, DEBOUNCE_DELAY_MS);
  }, []);

  const clearSearch = useCallback(() => {
    setQuery('');
    setDebouncedQuery('');
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const results: readonly ManualSearchResult[] = useMemo(
    () => searchManualChapters(MANUAL_CHAPTERS, debouncedQuery),
    [debouncedQuery],
  );

  const totalMatchCount = useMemo(
    () => results.reduce((sum, r) => sum + r.matchCount, 0),
    [results],
  );

  const isSearchActive = debouncedQuery.trim().length >= 2;

  return {
    query,
    debouncedQuery,
    results,
    totalMatchCount,
    isSearchActive,
    updateQuery,
    clearSearch,
  } as const;
}
