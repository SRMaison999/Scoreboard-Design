import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { InputField } from '@/components/ui/InputField';
import { EDITOR_LABELS } from '@/constants/labels';
import { useMultiScoreboardStore } from '@/stores/multiScoreboardStore';
import type { OverlayType, OverlayPosition } from '@/types/multiScoreboard';

const TYPE_LABELS: Record<OverlayType, string> = {
  lowerThird: EDITOR_LABELS.multiScoreboardTypeLowerThird,
  bug: EDITOR_LABELS.multiScoreboardTypeBug,
  ticker: EDITOR_LABELS.multiScoreboardTypeTicker,
};

const POSITION_OPTIONS: { value: OverlayPosition; label: string }[] = [
  { value: 'top-left', label: EDITOR_LABELS.logoPositionTopLeft },
  { value: 'top-center', label: EDITOR_LABELS.logoPositionTopCenter },
  { value: 'top-right', label: EDITOR_LABELS.logoPositionTopRight },
  { value: 'bottom-left', label: EDITOR_LABELS.logoPositionBottomLeft },
  { value: 'bottom-center', label: EDITOR_LABELS.logoPositionBottomCenter },
  { value: 'bottom-right', label: EDITOR_LABELS.logoPositionBottomRight },
];

export function MultiScoreboardSection() {
  const overlays = useMultiScoreboardStore((s) => s.overlays);
  const tickerItems = useMultiScoreboardStore((s) => s.tickerItems);
  const tickerSpeed = useMultiScoreboardStore((s) => s.tickerSpeed);
  const addOverlay = useMultiScoreboardStore((s) => s.addOverlay);
  const removeOverlay = useMultiScoreboardStore((s) => s.removeOverlay);
  const updateVisibility = useMultiScoreboardStore((s) => s.updateOverlayVisibility);
  const updatePosition = useMultiScoreboardStore((s) => s.updateOverlayPosition);
  const updateOpacity = useMultiScoreboardStore((s) => s.updateOverlayOpacity);
  const addTickerItem = useMultiScoreboardStore((s) => s.addTickerItem);
  const removeTickerItem = useMultiScoreboardStore((s) => s.removeTickerItem);
  const updateTickerItem = useMultiScoreboardStore((s) => s.updateTickerItem);
  const setTickerSpeed = useMultiScoreboardStore((s) => s.setTickerSpeed);

  return (
    <Section title={EDITOR_LABELS.sectionMultiScoreboard} defaultOpen={false}>
      {/* Boutons d'ajout */}
      <div className="flex gap-1.5 flex-wrap">
        <Button variant="ghost" className="text-xs" onClick={() => addOverlay('lowerThird')}>
          + {EDITOR_LABELS.multiScoreboardTypeLowerThird}
        </Button>
        <Button variant="ghost" className="text-xs" onClick={() => addOverlay('bug')}>
          + {EDITOR_LABELS.multiScoreboardTypeBug}
        </Button>
        <Button variant="ghost" className="text-xs" onClick={() => addOverlay('ticker')}>
          + {EDITOR_LABELS.multiScoreboardTypeTicker}
        </Button>
      </div>

      {/* Liste des overlays */}
      {overlays.map((overlay) => (
        <div key={overlay.id} className="flex flex-col gap-1 bg-gray-800/50 rounded-md p-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-300">
              {TYPE_LABELS[overlay.type]}
            </span>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={overlay.visible}
                  onChange={(e) => updateVisibility(overlay.id, e.target.checked)}
                  className="accent-sky-400"
                />
                <span className="text-[10px] text-gray-400">
                  {EDITOR_LABELS.multiScoreboardVisible}
                </span>
              </label>
              <Button
                variant="danger"
                className="text-xs px-1.5 py-0.5"
                onClick={() => removeOverlay(overlay.id)}
              >
                X
              </Button>
            </div>
          </div>

          {overlay.type === 'bug' && (
            <div className="flex flex-col gap-0.5">
              <label className="text-[11px] text-gray-400 font-medium">
                {EDITOR_LABELS.multiScoreboardPosition}
              </label>
              <select
                value={overlay.position}
                onChange={(e) => updatePosition(overlay.id, e.target.value as OverlayPosition)}
                className="bg-gray-800 border border-gray-700 rounded-md px-2 py-1 text-gray-100 text-xs outline-none"
              >
                {POSITION_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          )}

          <div className="flex items-center gap-2">
            <label className="text-[11px] text-gray-400 font-medium">
              {EDITOR_LABELS.multiScoreboardOpacity}
            </label>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={overlay.opacity}
              onChange={(e) => updateOpacity(overlay.id, Number(e.target.value))}
              className="flex-1 accent-sky-300"
            />
            <span className="text-[11px] text-gray-300 tabular-nums w-8 text-right">
              {Math.round(overlay.opacity * 100)}%
            </span>
          </div>
        </div>
      ))}

      {/* Ticker items */}
      {overlays.some((o) => o.type === 'ticker') && (
        <div className="flex flex-col gap-1.5 mt-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-gray-400 font-medium">
              {EDITOR_LABELS.multiScoreboardTypeTicker}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-500">
                {String(tickerSpeed)} px/s
              </span>
              <input
                type="range"
                min={10}
                max={200}
                step={10}
                value={tickerSpeed}
                onChange={(e) => setTickerSpeed(Number(e.target.value))}
                className="w-20 accent-sky-300"
              />
            </div>
          </div>
          {tickerItems.map((item, i) => (
            <div key={`ticker-${String(i)}`} className="flex gap-1 items-center">
              <InputField
                label=""
                value={item.text}
                onChange={(v) => updateTickerItem(i, v)}
              />
              <Button
                variant="danger"
                className="flex-shrink-0 h-8 px-2"
                onClick={() => removeTickerItem(i)}
              >
                X
              </Button>
            </div>
          ))}
          <Button variant="add" onClick={() => addTickerItem('')}>
            + {EDITOR_LABELS.multiScoreboardAdd}
          </Button>
        </div>
      )}
    </Section>
  );
}
