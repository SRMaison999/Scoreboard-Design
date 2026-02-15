import { useOutputSyncReceiver } from '@/hooks/useOutputSync';
import { useFontLoader } from '@/hooks/useFontLoader';
import { usePlayerPhotos } from '@/hooks/usePlayerPhotos';
import { useLogos } from '@/hooks/useLogos';
import { ScoreboardCanvas } from '@/components/preview/ScoreboardCanvas';

/**
 * Fenetre de sortie capturable par OBS/vMix.
 * Recoit le state de l'editeur via BroadcastChannel.
 * Affiche uniquement le canvas a taille native, sans UI editeur.
 */
export function OutputWindow() {
  useFontLoader();
  const state = useOutputSyncReceiver();
  const playerPhotos = usePlayerPhotos();
  const logos = useLogos();

  if (!state) {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-black text-gray-500 text-lg">
        En attente de connexion...
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-black overflow-hidden flex items-center justify-center">
      <ScoreboardCanvas state={state} playerPhotos={playerPhotos} logos={logos} />
    </div>
  );
}
