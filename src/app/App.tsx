import { useScoreboardStore } from '@/stores/scoreboardStore';
import { useTimer } from '@/hooks/useTimer';
import { useFontLoader } from '@/hooks/useFontLoader';
import { useOutputSyncSender } from '@/hooks/useOutputSync';
import { EditorPanel } from '@/components/editor/EditorPanel';
import { ScoreboardPreview } from '@/components/preview/ScoreboardPreview';
import { EDITOR_LABELS } from '@/constants/labels';
import '@/styles/index.css';

export function App() {
  useFontLoader();
  useTimer();
  useOutputSyncSender();

  const state = useScoreboardStore();

  const handleOpenOutput = () => {
    window.open('/output', 'scoreboard-output', 'width=1920,height=1080');
  };

  return (
    <div className="flex h-screen bg-gray-950 text-gray-200 font-[family-name:var(--font-barlow)] overflow-hidden">
      <EditorPanel />

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-end px-4 py-2 border-b border-gray-800">
          <button
            type="button"
            onClick={handleOpenOutput}
            className="bg-blue-950 border border-blue-600 text-blue-300 rounded-md px-3 py-1 cursor-pointer text-sm"
          >
            {EDITOR_LABELS.openOutput}
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 bg-gray-950 overflow-hidden">
          <ScoreboardPreview state={state} />
        </div>
      </div>
    </div>
  );
}
