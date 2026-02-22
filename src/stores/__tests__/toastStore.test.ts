import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { useToastStore } from '../toastStore';

describe('toastStore', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    useToastStore.setState({ toasts: [] });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('ajoute un toast avec la variante par défaut success', () => {
    useToastStore.getState().addToast('Opération réussie');
    const toasts = useToastStore.getState().toasts;
    expect(toasts).toHaveLength(1);
    expect(toasts[0]!.message).toBe('Opération réussie');
    expect(toasts[0]!.variant).toBe('success');
  });

  it('ajoute un toast avec une variante spécifique', () => {
    useToastStore.getState().addToast('Erreur', 'error');
    const toasts = useToastStore.getState().toasts;
    expect(toasts[0]!.variant).toBe('error');
  });

  it('supprime un toast manuellement', () => {
    useToastStore.getState().addToast('Test');
    const id = useToastStore.getState().toasts[0]!.id;
    useToastStore.getState().removeToast(id);
    expect(useToastStore.getState().toasts).toHaveLength(0);
  });

  it('supprime automatiquement le toast après 3 secondes', () => {
    useToastStore.getState().addToast('Auto-dismiss');
    expect(useToastStore.getState().toasts).toHaveLength(1);

    vi.advanceTimersByTime(3000);
    expect(useToastStore.getState().toasts).toHaveLength(0);
  });

  it('empile plusieurs toasts', () => {
    useToastStore.getState().addToast('Premier');
    useToastStore.getState().addToast('Second');
    expect(useToastStore.getState().toasts).toHaveLength(2);
  });

  it('les toasts ont des identifiants uniques', () => {
    useToastStore.getState().addToast('A');
    useToastStore.getState().addToast('B');
    const ids = useToastStore.getState().toasts.map((t) => t.id);
    expect(new Set(ids).size).toBe(2);
  });
});
