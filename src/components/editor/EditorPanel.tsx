import { EDITOR_LABELS } from '@/constants/labels';
import { EditorNavigation } from './EditorNavigation';

export function EditorPanel() {
  return (
    <div className="w-[360px] flex-shrink-0 border-r border-gray-800 flex flex-col h-full">
      <div className="px-4 py-3 border-b border-gray-800">
        <div className="text-lg font-bold font-[family-name:var(--font-oswald)] tracking-widest uppercase text-sky-300">
          {EDITOR_LABELS.appTitle}
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <EditorNavigation />
      </div>
    </div>
  );
}
