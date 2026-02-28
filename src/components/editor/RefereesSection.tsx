import { Section } from '@/components/ui/Section';
import { InputField } from '@/components/ui/InputField';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { EDITOR_LABELS } from '@/constants/labels';
import type { SelectOption } from '@/components/ui/Select';
import type { RefereesPreset, RefereeRole } from '@/types/bodyTypes/referees';

const MAX_REFEREES = 8;

const PRESET_OPTIONS: readonly SelectOption[] = [
  { value: 'all', label: EDITOR_LABELS.refereesPresetAll },
  { value: 'one-by-one', label: EDITOR_LABELS.refereesPresetOneByOne },
  { value: 'refs-vs-linesmen-columns', label: EDITOR_LABELS.refereesPresetColumnsRole },
  { value: 'refs-vs-linesmen-rows', label: EDITOR_LABELS.refereesPresetRowsRole },
  { value: 'free', label: EDITOR_LABELS.refereesPresetFree },
];

const ROLE_OPTIONS: readonly SelectOption[] = [
  { value: 'referee', label: EDITOR_LABELS.refereesRoleReferee },
  { value: 'linesman', label: EDITOR_LABELS.refereesRoleLinesman },
];

export function RefereesSection() {
  const data = useScoreboardStore((s) => s.refereesData);
  const updateField = useScoreboardStore((s) => s.updateRefereesField);
  const addReferee = useScoreboardStore((s) => s.addReferee);
  const removeReferee = useScoreboardStore((s) => s.removeReferee);
  const updateReferee = useScoreboardStore((s) => s.updateReferee);

  const title = `${EDITOR_LABELS.sectionReferees} (${String(data.referees.length)}/${String(MAX_REFEREES)})`;

  return (
    <Section title={title}>
      <InputField
        label={EDITOR_LABELS.refereesTitle}
        value={data.title}
        onChange={(v) => updateField('title', v)}
      />

      <Select
        label={EDITOR_LABELS.refereesPreset}
        options={PRESET_OPTIONS}
        value={data.preset}
        onChange={(v) => updateField('preset', v as RefereesPreset)}
      />

      {data.preset === 'one-by-one' && (
        <InputField
          label={EDITOR_LABELS.refereesActiveIndex}
          value={String(data.activeIndex + 1)}
          onChange={(v) => updateField('activeIndex', Math.max(0, Math.min(data.referees.length - 1, (Number(v) || 1) - 1)))}
        />
      )}

      <div className="flex flex-col gap-1">
        <label className="flex items-center gap-2 cursor-pointer text-[13px]">
          <input
            type="checkbox"
            checked={data.showFlags}
            onChange={(e) => updateField('showFlags', e.target.checked)}
            className="accent-sky-300"
          />
          {EDITOR_LABELS.refereesShowFlags}
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-[13px]">
          <input
            type="checkbox"
            checked={data.showNocs}
            onChange={(e) => updateField('showNocs', e.target.checked)}
            className="accent-sky-300"
          />
          {EDITOR_LABELS.refereesShowNocs}
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-[13px]">
          <input
            type="checkbox"
            checked={data.showRoles}
            onChange={(e) => updateField('showRoles', e.target.checked)}
            className="accent-sky-300"
          />
          {EDITOR_LABELS.refereesShowRoles}
        </label>
      </div>

      {data.referees.map((ref, i) => (
        <div key={`ref-${String(i)}`} className="bg-gray-800 rounded-md p-1.5 flex flex-col gap-1">
          <div className="flex gap-1.5 items-end">
            <InputField
              label={EDITOR_LABELS.refereesNumber}
              value={ref.number}
              onChange={(v) => updateReferee(i, 'number', v)}
            />
            <InputField
              label={EDITOR_LABELS.refereesName}
              value={ref.name}
              onChange={(v) => updateReferee(i, 'name', v)}
            />
            <InputField
              label={EDITOR_LABELS.refereesNationality}
              value={ref.nationality}
              onChange={(v) => updateReferee(i, 'nationality', v)}
            />
          </div>
          <div className="flex gap-1.5 items-end">
            <Select
              label={EDITOR_LABELS.refereesRole}
              options={ROLE_OPTIONS}
              value={ref.role}
              onChange={(v) => updateReferee(i, 'role', v as RefereeRole)}
            />
            <label className="flex items-center gap-1.5 cursor-pointer text-[11px] text-gray-400">
              <input
                type="checkbox"
                checked={ref.showFlag}
                onChange={(e) => updateReferee(i, 'showFlag', e.target.checked)}
                className="accent-sky-300"
              />
              {EDITOR_LABELS.refereesShowFlag}
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer text-[11px] text-gray-400">
              <input
                type="checkbox"
                checked={ref.showNoc}
                onChange={(e) => updateReferee(i, 'showNoc', e.target.checked)}
                className="accent-sky-300"
              />
              {EDITOR_LABELS.refereesShowNoc}
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer text-[11px] text-gray-400">
              <input
                type="checkbox"
                checked={ref.showRole}
                onChange={(e) => updateReferee(i, 'showRole', e.target.checked)}
                className="accent-sky-300"
              />
              {EDITOR_LABELS.refereesShowRole}
            </label>
            <Button
              variant="danger"
              className="flex-shrink-0 h-8 px-2.5 ml-auto"
              onClick={() => removeReferee(i)}
            >
              X
            </Button>
          </div>
        </div>
      ))}

      {data.referees.length < MAX_REFEREES && (
        <Button variant="add" onClick={addReferee}>
          + {EDITOR_LABELS.refereesAddReferee}
        </Button>
      )}
    </Section>
  );
}
