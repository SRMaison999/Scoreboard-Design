/**
 * Renderers pour les elements "composes" des champs personnalises :
 * header-block, penalty-column.
 * Rendus sur le canvas (inline styles autorises).
 */

import { Header } from '@/components/preview/Header';
import { PenaltyColumn } from '@/components/preview/PenaltyColumn';
import type { ScoreboardState } from '@/types/scoreboard';
import type { ColorMap, OpacityMap } from '@/types/colors';

export function HeaderBlockElement({ state, colors, opacities }: {
  readonly state: ScoreboardState;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
}) {
  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <Header
        team1={state.team1}
        team2={state.team2}
        score1={state.score1}
        score2={state.score2}
        colors={colors}
        opacities={opacities}
        fontTeams={state.fontTeams}
        fontSizeTeamName={state.fontSizes.teamName}
        fontSizeScore={state.fontSizes.score}
        showTimeouts={state.showTimeouts}
        timeoutsLeft={state.timeoutsLeft}
        timeoutsRight={state.timeoutsRight}
        showShootout={state.showShootout}
        shootoutLeft={state.shootoutLeft}
        shootoutRight={state.shootoutRight}
        logoMode={state.logoMode}
      />
    </div>
  );
}

export function PenaltyColumnElement({ state, colors, opacities, element }: {
  readonly state: ScoreboardState;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly element: { readonly config: { readonly side: string } };
}) {
  const side = element.config.side as 'left' | 'right';
  const penalties = side === 'left' ? state.penaltiesLeft : state.penaltiesRight;

  return (
    <div style={{
      width: '100%', height: '100%', overflow: 'hidden',
      display: 'flex', justifyContent: 'center',
    }}>
      <PenaltyColumn
        side={side}
        penalties={penalties}
        colors={colors}
        opacities={opacities}
        fontBody={state.fontBody}
        fontSizePenaltyTime={state.fontSizes.penaltyTime}
        fontSizePenaltyNumber={state.fontSizes.penaltyNumber}
      />
    </div>
  );
}
