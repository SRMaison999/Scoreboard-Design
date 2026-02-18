import { useCallback } from 'react';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { useTimer } from '@/hooks/useTimer';
import { useFontLoader } from '@/hooks/useFontLoader';
import { useOutputSyncSender } from '@/hooks/useOutputSync';
import { useUserManual } from '@/hooks/useUserManual';
import { EditorPanel } from '@/components/editor/EditorPanel';
import { ScoreboardPreview } from '@/components/preview/ScoreboardPreview';
import { TemplateManager } from '@/components/editor/TemplateManager';
import { UserManual } from '@/components/common/UserManual';
import { EDITOR_LABELS } from '@/constants/labels';
import { captureScreenshot, buildScreenshotFilename } from '@/utils/screenshot';
import { Camera, Printer, Radio, BookOpen } from 'lucide-react';
import '@/styles/index.css';
import '@/styles/print.css';

export function App() {
  useFontLoader();
  useTimer();
  useOutputSyncSender();

  const state = useScoreboardStore();
  const manual = useUserManual();

  const isElectron = 'electronAPI' in window;

  const handleOpenOutput = () => {
    const url = isElectron ? '#/output' : '/output';
    window.open(url, 'scoreboard-output', 'width=1920,height=1080');
  };

  const handleOpenOperator = useCallback(() => {
    window.location.href = isElectron ? '#/operator' : '/operator';
  }, [isElectron]);

  const handleScreenshot = useCallback(() => {
    const el = document.querySelector<HTMLElement>('[data-testid="scoreboard-canvas"]');
    if (!el) return;
    const filename = buildScreenshotFilename(state.team1, state.team2);
    void captureScreenshot(el, filename);
  }, [state.team1, state.team2]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const toolbarBtnClass = 'bg-blue-950 border border-blue-600 text-blue-300 rounded-md px-3 py-1 cursor-pointer text-sm flex items-center gap-1.5';

  return (
    <div className="flex h-screen bg-gray-950 text-gray-200 font-[family-name:var(--font-barlow)] overflow-hidden">
      <EditorPanel />

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between gap-2 px-4 py-2 border-b border-gray-800">
          <TemplateManager />
          <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleScreenshot}
            className={toolbarBtnClass}
          >
            <Camera size={14} className="flex-shrink-0" />
            {EDITOR_LABELS.screenshot}
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className={toolbarBtnClass}
          >
            <Printer size={14} className="flex-shrink-0" />
            {EDITOR_LABELS.print}
          </button>
          <button
            type="button"
            onClick={handleOpenOperator}
            className={toolbarBtnClass}
          >
            <Radio size={14} className="flex-shrink-0" />
            {EDITOR_LABELS.operatorTitle}
          </button>
          <button
            type="button"
            onClick={handleOpenOutput}
            className={toolbarBtnClass}
          >
            {EDITOR_LABELS.openOutput}
          </button>
          <button
            type="button"
            onClick={manual.open}
            className={toolbarBtnClass}
          >
            <BookOpen size={14} className="flex-shrink-0" />
            {EDITOR_LABELS.userManual}
          </button>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 bg-gray-950 overflow-hidden">
          <ScoreboardPreview state={state} />
        </div>
      </div>

      <UserManual
        open={manual.isOpen}
        onClose={manual.close}
        activeChapterIndex={manual.activeChapterIndex}
        onChapterSelect={manual.goToChapter}
      />
    </div>
  );
}
