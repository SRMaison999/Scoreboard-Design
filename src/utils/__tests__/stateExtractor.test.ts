import { describe, it, expect, beforeEach } from 'vitest';
import { extractState } from '@/utils/stateExtractor';
import { useScoreboardStore } from '@/stores/scoreboardStore';

describe('extractState', () => {
  beforeEach(() => {
    useScoreboardStore.getState().resetState();
  });

  it('extrait uniquement les donn\u00e9es sans les actions', () => {
    const store = useScoreboardStore.getState();
    const state = extractState(store);
    expect(state.team1).toBe('SVK');
    expect(state.team2).toBe('FIN');
    expect(typeof state.team1).toBe('string');
    /* V\u00e9rifier qu'aucune fonction n'est pr\u00e9sente */
    const values = Object.values(state);
    const functions = values.filter((v) => typeof v === 'function');
    expect(functions).toHaveLength(0);
  });

  it('le state extrait est clonable via structuredClone', () => {
    const store = useScoreboardStore.getState();
    const state = extractState(store);
    const cloned = structuredClone(state);
    expect(cloned.team1).toBe(state.team1);
    expect(cloned.bodyType).toBe(state.bodyType);
  });
});
