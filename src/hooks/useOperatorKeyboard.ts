import { useEffect, useCallback } from 'react';
import { useScoreboardStore } from '@/stores/scoreboardStore';

/**
 * Raccourcis clavier pour le mode opérateur.
 *
 * Espace : Start / Stop horloge
 * R : Reset horloge
 * Flèche gauche : Score -1 équipe 1
 * Flèche droite : Score +1 équipe 1
 * Flèche haut : Score +1 équipe 2
 * Flèche bas : Score -1 équipe 2
 * P : Phase suivante
 * 1 : Ajouter pénalité 2:00 équipe 1
 * 2 : Ajouter pénalité 2:00 équipe 2
 * F11 : Plein écran
 */
export function useOperatorKeyboard(): void {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const tag = (e.target as HTMLElement).tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

    const store = useScoreboardStore.getState();

    switch (e.key) {
      case ' ':
        e.preventDefault();
        if (store.demoRunning) store.stopClock();
        else store.startClock();
        break;
      case 'r':
      case 'R':
        e.preventDefault();
        store.resetClock();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        store.decrementScore('left');
        break;
      case 'ArrowRight':
        e.preventDefault();
        store.incrementScore('left');
        break;
      case 'ArrowUp':
        e.preventDefault();
        store.incrementScore('right');
        break;
      case 'ArrowDown':
        e.preventDefault();
        store.decrementScore('right');
        break;
      case 'p':
      case 'P':
        e.preventDefault();
        store.nextPhase();
        break;
      case '1':
        e.preventDefault();
        store.addPenalty('left');
        break;
      case '2':
        e.preventDefault();
        store.addPenalty('right');
        break;
      case 'F11':
        e.preventDefault();
        void document.documentElement.requestFullscreen?.().catch(() => {
          /* fullscreen non disponible */
        });
        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
