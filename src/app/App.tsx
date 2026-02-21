import { useCallback } from 'react';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { initUndoRedoListener } from '@/stores/undoRedoStore';
import { useTimer } from '@/hooks/useTimer';
import { useFontLoader } from '@/hooks/useFontLoader';
import { useOutputSyncSender } from '@/hooks/useOutputSync';
import { useUserManual } from '@/hooks/useUserManual';
import { EditorPanel } from '@/components/editor/EditorPanel';
import { ScoreboardPreview } from '@/components/preview/ScoreboardPreview';
import { PropertiesPanel } from '@/components/editor/PropertiesPanel';
import { TemplateManager } from '@/components/editor/TemplateManager';
import { UserManual } from '@/components/common/UserManual';
import { EDITOR_LABELS } from '@/constants/labels';
import { captureScreenshot, buildScreenshotFilename } from '@/utils/screenshot';
import { generateSpec, downloadSpec } from '@/utils/specGenerator';
import { generateExplanation, downloadExplanation } from '@/utils/specExplanation';
import { extractState } from '@/utils/stateExtractor';
import { Camera, Printer, Radio, BookOpen, FileCode } from 'lucide-react';
import '@/styles/index.css';
import '@/styles/print.css';

/* Initialise l'écoute undo/redo une seule fois */
initUndoRedoListener();

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

  const handleGenerateSpecs = useCallback(() => {
    const extracted = extractState(useScoreboardStore.getState());
    const spec = generateSpec(extracted);
    downloadSpec(spec, state.team1, state.team2);
    const explanation = generateExplanation(spec);
    downloadExplanation(explanation, state.team1, state.team2);
  }, [state.team1, state.team2]);

  const update = useScoreboardStore((s) => s.update);
  const handleInlineEdit = useCallback((field: string, value: string) => {
    type EditableKey = 'team1' | 'team2' | 'score1' | 'score2' | 'time' | 'period';
    const allowed = new Set<EditableKey>(['team1', 'team2', 'score1', 'score2', 'time', 'period']);
    if (allowed.has(field as EditableKey)) {
      update(field as EditableKey, value);
    }
  }, [update]);

  const toolbarBtnClass = 'bg-blue-950 border border-blue-600 text-blue-300 rounded-md px-3 py-1 cursor-pointer text-sm flex items-center justify-center gap-1.5 flex-1 min-w-0 whitespace-nowrap';

  return (
    <div className="flex h-screen bg-gray-950 text-gray-200 font-[family-name:var(--font-barlow)] overflow-hidden">
      <EditorPanel />

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-800">
          <TemplateManager />
          <div className="flex flex-wrap items-center justify-end gap-2 flex-1">
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
              onClick={handleGenerateSpecs}
              className={toolbarBtnClass}
              title={EDITOR_LABELS.specsToolbarTooltip}
            >
              <FileCode size={14} className="flex-shrink-0" />
              {EDITOR_LABELS.specsToolbarButton}
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

        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex items-center justify-center p-6 bg-gray-950 overflow-hidden">
            <ScoreboardPreview state={state} onInlineEdit={handleInlineEdit} />
          </div>
          {state.bodyType === 14 && <PropertiesPanel />}
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
