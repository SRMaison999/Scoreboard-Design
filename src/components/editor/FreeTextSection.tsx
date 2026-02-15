import { Section } from '@/components/ui/Section';
import { InputField } from '@/components/ui/InputField';
import { Button } from '@/components/ui/Button';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { EDITOR_LABELS } from '@/constants/labels';
import type { TextAlign } from '@/types/bodyTypes/freeText';

const MAX_LINES = 10;

const ALIGN_OPTIONS: { value: TextAlign; label: string }[] = [
  { value: 'left', label: EDITOR_LABELS.freeTextAlignLeft },
  { value: 'center', label: EDITOR_LABELS.freeTextAlignCenter },
  { value: 'right', label: EDITOR_LABELS.freeTextAlignRight },
];

export function FreeTextSection() {
  const data = useScoreboardStore((s) => s.freeTextData);
  const addLine = useScoreboardStore((s) => s.addFreeTextLine);
  const removeLine = useScoreboardStore((s) => s.removeFreeTextLine);
  const updateLine = useScoreboardStore((s) => s.updateFreeTextLine);

  const title = `${EDITOR_LABELS.sectionFreeText} (${String(data.lines.length)}/${String(MAX_LINES)})`;

  return (
    <Section title={title}>
      {data.lines.map((line, i) => (
        <div
          key={`ft-${String(i)}`}
          className="bg-gray-800 rounded-md p-1.5"
        >
          <div className="flex gap-1.5 items-end">
            <InputField
              label={EDITOR_LABELS.freeTextContent}
              value={line.text}
              onChange={(v) => updateLine(i, 'text', v)}
            />
            <Button
              variant="danger"
              className="flex-shrink-0 h-8 px-2.5"
              onClick={() => removeLine(i)}
            >
              X
            </Button>
          </div>
          <div className="flex gap-1.5 items-end mt-1">
            <InputField
              label={EDITOR_LABELS.freeTextFontSize}
              value={String(line.fontSize)}
              onChange={(v) => updateLine(i, 'fontSize', Number(v) || 20)}
            />
            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
              <label className="text-[11px] text-gray-400 font-medium">
                {EDITOR_LABELS.freeTextAlign}
              </label>
              <select
                value={line.align}
                onChange={(e) => updateLine(i, 'align', e.target.value as TextAlign)}
                className="bg-gray-800 border border-gray-700 rounded-md px-2.5 py-1.5 text-gray-100 text-sm outline-none w-full"
              >
                {ALIGN_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <label className="flex items-center gap-1 cursor-pointer text-[11px] text-gray-400 pb-1.5">
              <input
                type="checkbox"
                checked={line.bold}
                onChange={(e) => updateLine(i, 'bold', e.target.checked)}
                className="accent-sky-300"
              />
              {EDITOR_LABELS.freeTextBold}
            </label>
          </div>
        </div>
      ))}

      {data.lines.length < MAX_LINES && (
        <Button variant="add" onClick={addLine}>
          + {EDITOR_LABELS.freeTextAddLine}
        </Button>
      )}
    </Section>
  );
}
