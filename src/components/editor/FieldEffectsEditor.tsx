/**
 * Editeur d'effets visuels pour un champ : opacite, ombre portee, flou.
 */

import { useScoreboardStore } from '@/stores/scoreboardStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import type { FieldShadow } from '@/types/customField';

const DEFAULT_SHADOW: FieldShadow = {
  offsetX: 4,
  offsetY: 4,
  blur: 10,
  color: '#000000',
  opacity: 50,
};

interface FieldEffectsEditorProps {
  readonly fieldId: string;
}

export function FieldEffectsEditor({ fieldId }: FieldEffectsEditorProps) {
  const field = useScoreboardStore(
    (s) => s.customFieldsData.fields.find((f) => f.id === fieldId),
  );
  const updateStyle = useScoreboardStore((s) => s.updateCustomFieldStyle);

  if (!field) return null;

  const hasShadow = field.style.shadow !== null;
  const shadow = field.style.shadow ?? DEFAULT_SHADOW;

  const handleShadowToggle = () => {
    updateStyle(fieldId, { shadow: hasShadow ? null : { ...DEFAULT_SHADOW } });
  };

  const handleShadowChange = (key: keyof FieldShadow, value: number | string) => {
    if (!field.style.shadow) return;
    updateStyle(fieldId, {
      shadow: { ...field.style.shadow, [key]: value },
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="text-[10px] text-gray-500 uppercase tracking-wider border-t border-gray-800 pt-1 mt-1">
        {CUSTOM_FIELD_LABELS.effectsTitle}
      </div>

      {/* Opacite globale */}
      <div>
        <label className="text-[11px] text-gray-400">{CUSTOM_FIELD_LABELS.effectOpacity}</label>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={0}
            max={100}
            value={field.style.opacity}
            onChange={(e) => updateStyle(fieldId, { opacity: Number(e.target.value) })}
            className="flex-1 accent-sky-300"
          />
          <span className="text-[11px] text-gray-400 w-8 text-right">{field.style.opacity}%</span>
        </div>
      </div>

      {/* Ombre portee */}
      <label className="flex items-center gap-2 cursor-pointer text-[12px] text-gray-300">
        <input
          type="checkbox"
          checked={hasShadow}
          onChange={handleShadowToggle}
          className="accent-sky-300"
        />
        {CUSTOM_FIELD_LABELS.effectShadowEnable}
      </label>

      {hasShadow && (
        <div className="flex flex-col gap-1.5 pl-2 border-l-2 border-gray-800">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] text-gray-400">{CUSTOM_FIELD_LABELS.effectShadowOffsetX}</label>
              <input
                type="number"
                min={-50}
                max={50}
                value={shadow.offsetX}
                onChange={(e) => handleShadowChange('offsetX', Number(e.target.value))}
                className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded px-2 py-0.5 text-[13px]"
              />
            </div>
            <div>
              <label className="text-[11px] text-gray-400">{CUSTOM_FIELD_LABELS.effectShadowOffsetY}</label>
              <input
                type="number"
                min={-50}
                max={50}
                value={shadow.offsetY}
                onChange={(e) => handleShadowChange('offsetY', Number(e.target.value))}
                className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded px-2 py-0.5 text-[13px]"
              />
            </div>
          </div>
          <div>
            <label className="text-[11px] text-gray-400">{CUSTOM_FIELD_LABELS.effectShadowBlur}</label>
            <input
              type="number"
              min={0}
              max={100}
              value={shadow.blur}
              onChange={(e) => handleShadowChange('blur', Number(e.target.value))}
              className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded px-2 py-0.5 text-[13px]"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] text-gray-400">{CUSTOM_FIELD_LABELS.effectShadowColor}</label>
              <input
                type="color"
                value={shadow.color}
                onChange={(e) => handleShadowChange('color', e.target.value)}
                className="w-full h-6 bg-gray-800 border border-gray-700 rounded cursor-pointer"
              />
            </div>
            <div>
              <label className="text-[11px] text-gray-400">{CUSTOM_FIELD_LABELS.effectShadowOpacity}</label>
              <div className="flex items-center gap-1">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={shadow.opacity}
                  onChange={(e) => handleShadowChange('opacity', Number(e.target.value))}
                  className="flex-1 accent-sky-300"
                />
                <span className="text-[10px] text-gray-500 w-6 text-right">{shadow.opacity}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Flou d'arriere-plan */}
      <div>
        <label className="text-[11px] text-gray-400">{CUSTOM_FIELD_LABELS.effectBackdropBlur}</label>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={0}
            max={30}
            value={field.style.backdropBlur}
            onChange={(e) => updateStyle(fieldId, { backdropBlur: Number(e.target.value) })}
            className="flex-1 accent-sky-300"
          />
          <span className="text-[11px] text-gray-400 w-8 text-right">{field.style.backdropBlur}px</span>
        </div>
      </div>
    </div>
  );
}
