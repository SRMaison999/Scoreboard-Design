import { useCallback } from 'react';
import { Section } from '@/components/ui/Section';
import { InputField } from '@/components/ui/InputField';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { EDITOR_LABELS } from '@/constants/labels';
import { compressImage } from '@/utils/image';

export function GoalSection() {
  const goalData = useScoreboardStore((s) => s.goalData);
  const updateGoalField = useScoreboardStore((s) => s.updateGoalField);

  const handlePhotoUpload = useCallback(
    (dataUrl: string) => {
      void compressImage(dataUrl).then((compressed) => {
        updateGoalField('scorerPhoto', compressed);
      });
    },
    [updateGoalField],
  );

  return (
    <Section title={EDITOR_LABELS.sectionGoal}>
      <div className="bg-gray-800 rounded-md p-1.5">
        <div className="flex gap-1.5 items-end">
          <div className="flex flex-col gap-0.5 flex-1 min-w-0">
            <label className="text-[11px] text-gray-400 font-medium">
              {EDITOR_LABELS.goalScoringTeamSide}
            </label>
            <select
              value={goalData.scoringTeamSide}
              onChange={(e) => updateGoalField('scoringTeamSide', e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-md px-2.5 py-1.5 text-gray-100 text-sm outline-none w-full"
            >
              <option value="left">{EDITOR_LABELS.goalSideLeft}</option>
              <option value="right">{EDITOR_LABELS.goalSideRight}</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-md p-1.5">
        <div className="flex gap-1.5 items-end">
          <InputField
            label={EDITOR_LABELS.goalScorerName}
            value={goalData.scorerName}
            onChange={(v) => updateGoalField('scorerName', v)}
          />
          <InputField
            label={EDITOR_LABELS.goalScorerNumber}
            value={goalData.scorerNumber}
            onChange={(v) => updateGoalField('scorerNumber', v)}
          />
        </div>
      </div>

      <ImageUpload
        label={EDITOR_LABELS.scorerPhoto}
        value={goalData.scorerPhoto}
        onUpload={handlePhotoUpload}
        onRemove={() => updateGoalField('scorerPhoto', '')}
      />

      <div className="bg-gray-800 rounded-md p-1.5">
        <div className="flex gap-1.5 items-end">
          <InputField
            label={EDITOR_LABELS.goalTime}
            value={goalData.goalTime}
            onChange={(v) => updateGoalField('goalTime', v)}
          />
          <InputField
            label={EDITOR_LABELS.goalPeriod}
            value={goalData.goalPeriod}
            onChange={(v) => updateGoalField('goalPeriod', v)}
          />
        </div>
      </div>

      <div className="bg-gray-800 rounded-md p-1.5">
        <div className="flex gap-1.5 items-end">
          <InputField
            label={EDITOR_LABELS.goalCountMatch}
            value={goalData.goalCountMatch}
            onChange={(v) => updateGoalField('goalCountMatch', v)}
          />
          <InputField
            label={EDITOR_LABELS.goalCountTournament}
            value={goalData.goalCountTournament}
            onChange={(v) => updateGoalField('goalCountTournament', v)}
          />
        </div>
      </div>

      <div className="bg-gray-800 rounded-md p-1.5">
        <div className="flex gap-1.5 items-end">
          <InputField
            label={EDITOR_LABELS.goalAssist1Name}
            value={goalData.assist1Name}
            onChange={(v) => updateGoalField('assist1Name', v)}
          />
          <InputField
            label={EDITOR_LABELS.goalAssist1Number}
            value={goalData.assist1Number}
            onChange={(v) => updateGoalField('assist1Number', v)}
          />
        </div>
      </div>

      <div className="bg-gray-800 rounded-md p-1.5">
        <div className="flex gap-1.5 items-end">
          <InputField
            label={EDITOR_LABELS.goalAssist2Name}
            value={goalData.assist2Name}
            onChange={(v) => updateGoalField('assist2Name', v)}
          />
          <InputField
            label={EDITOR_LABELS.goalAssist2Number}
            value={goalData.assist2Number}
            onChange={(v) => updateGoalField('assist2Number', v)}
          />
        </div>
      </div>
    </Section>
  );
}
