import { useCallback } from 'react';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { useTimer } from '@/hooks/useTimer';
import { useFontLoader } from '@/hooks/useFontLoader';
import { useOutputSyncSender } from '@/hooks/useOutputSync';
import { useOperatorKeyboard } from '@/hooks/useOperatorKeyboard';
import { ScoreboardPreview } from '@/components/preview/ScoreboardPreview';
import { ScoreControls } from './ScoreControls';
import { ClockControls } from './ClockControls';
import { PenaltyControls } from './PenaltyControls';
import { PhaseControls } from './PhaseControls';
import { EDITOR_LABELS } from '@/constants/labels';
import { Maximize, ArrowLeft } from 'lucide-react';

export function OperatorPanel() {
  useFontLoader();
  useTimer();
  useOutputSyncSender();
  useOperatorKeyboard();

  const state = useScoreboardStore();

  const handleFullscreen = useCallback(() => {
    void document.documentElement.requestFullscreen?.().catch(() => {
      /* plein écran non disponible */
    });
  }, []);

  const handleBackToEditor = useCallback(() => {
    window.location.href = '/';
  }, []);

  return (
    <div className="flex h-screen bg-gray-950 text-gray-200 font-[family-name:var(--font-barlow)] overflow-hidden">
      {/* Panneau de contrôle */}
      <div className="w-[420px] flex-shrink-0 border-r border-gray-800 overflow-y-auto p-5 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold tracking-widest uppercase text-sky-300">
            {EDITOR_LABELS.operatorTitle}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleFullscreen}
              className="bg-gray-800 border border-gray-700 rounded-md p-2 text-gray-400 hover:text-gray-200 cursor-pointer"
              title={EDITOR_LABELS.operatorFullscreen}
            >
              <Maximize size={16} className="flex-shrink-0" />
            </button>
            <button
              type="button"
              onClick={handleBackToEditor}
              className="bg-gray-800 border border-gray-700 rounded-md p-2 text-gray-400 hover:text-gray-200 cursor-pointer"
              title={EDITOR_LABELS.operatorBackToEditor}
            >
              <ArrowLeft size={16} className="flex-shrink-0" />
            </button>
          </div>
        </div>

        <ScoreControls />

        <div className="border-t border-gray-800" />

        <ClockControls />

        <div className="border-t border-gray-800" />

        <PhaseControls />

        <div className="border-t border-gray-800" />

        <PenaltyControls />

        <div className="border-t border-gray-800" />

        <div className="text-[11px] text-gray-600 leading-relaxed">
          {EDITOR_LABELS.operatorKeyboardHelp}
        </div>

        <div className="h-6 flex-shrink-0" />
      </div>

      {/* Preview */}
      <div className="flex-1 flex items-center justify-center p-4 bg-gray-950 overflow-hidden">
        <ScoreboardPreview state={state} />
      </div>
    </div>
  );
}
