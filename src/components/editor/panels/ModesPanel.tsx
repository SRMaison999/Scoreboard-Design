import { useScoreboardStore } from '@/stores/scoreboardStore';
import { BODY_TYPES } from '@/constants/bodyTypes';
import { EDITOR_LABELS } from '@/constants/labels';
import type { BodyTypeId } from '@/types/scoreboard';
import { cn } from '@/lib/utils';

export function ModesPanel() {
  const bodyType = useScoreboardStore((s) => s.bodyType);
  const update = useScoreboardStore((s) => s.update);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-800">
        <h2 className="text-sm font-semibold text-gray-300">
          {EDITOR_LABELS.sectionModes}
        </h2>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto p-3">
        <div className="grid grid-cols-2 gap-2">
          {BODY_TYPES.map((t) => (
            <button
              key={t.id}
              type="button"
              data-testid={`mode-btn-${t.id}`}
              onClick={() => update('bodyType', t.id as BodyTypeId)}
              className={cn(
                'rounded-md px-2 py-2 text-[12px] leading-tight text-left cursor-pointer transition-colors',
                'border',
                bodyType === t.id
                  ? 'bg-sky-950 border-sky-500 text-sky-200 font-semibold'
                  : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-300',
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
