import { Section } from '@/components/ui/Section';
import { InputField } from '@/components/ui/InputField';
import { Button } from '@/components/ui/Button';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { EDITOR_LABELS } from '@/constants/labels';
import type { PenaltySide } from '@/types/scoreboard';

interface PenaltySectionProps {
  readonly side: PenaltySide;
}

const MAX_PENALTIES = 8;

export function PenaltySection({ side }: PenaltySectionProps) {
  const team1 = useScoreboardStore((s) => s.team1);
  const team2 = useScoreboardStore((s) => s.team2);
  const penalties = useScoreboardStore((s) =>
    side === 'left' ? s.penaltiesLeft : s.penaltiesRight,
  );
  const updatePenalty = useScoreboardStore((s) => s.updatePenalty);
  const addPenalty = useScoreboardStore((s) => s.addPenalty);
  const removePenalty = useScoreboardStore((s) => s.removePenalty);

  const teamName = side === 'left' ? team1 : team2;
  const title = `Pénalités ${teamName} (${String(penalties.length)}/${String(MAX_PENALTIES)})`;

  return (
    <Section title={title}>
      {penalties.map((p, i) => (
        <div key={`pen-${side}-${String(i)}`} className="flex gap-1.5 items-end">
          {side === 'left' ? (
            <>
              <InputField
                label={EDITOR_LABELS.penaltyTime}
                value={p.time}
                onChange={(v) => updatePenalty(side, i, 'time', v)}
              />
              <InputField
                label={EDITOR_LABELS.penaltyNumber}
                value={p.number}
                onChange={(v) => updatePenalty(side, i, 'number', v)}
              />
            </>
          ) : (
            <>
              <InputField
                label={EDITOR_LABELS.penaltyNumber}
                value={p.number}
                onChange={(v) => updatePenalty(side, i, 'number', v)}
              />
              <InputField
                label={EDITOR_LABELS.penaltyTime}
                value={p.time}
                onChange={(v) => updatePenalty(side, i, 'time', v)}
              />
            </>
          )}
          <Button
            variant="danger"
            className="flex-shrink-0 h-8 px-2.5"
            onClick={() => removePenalty(side, i)}
          >
            X
          </Button>
        </div>
      ))}
      {penalties.length < MAX_PENALTIES && (
        <Button variant="add" onClick={() => addPenalty(side)}>
          + {EDITOR_LABELS.addPenalty}
        </Button>
      )}
    </Section>
  );
}
