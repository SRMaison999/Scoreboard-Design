import { Header } from './Header';
import { ClockOverlay } from './ClockOverlay';
import { PenaltyColumn } from './PenaltyColumn';
import { BodyType1 } from './body/BodyType1';
import { BodyType2 } from './body/BodyType2';
import { BodyType3 } from './body/BodyType3';
import { hexToRgba } from '@/utils/color';
import { ff } from '@/utils/font';
import type { ScoreboardState } from '@/types/scoreboard';

interface ScoreboardCanvasProps {
  readonly state: ScoreboardState;
  readonly width?: number;
  readonly height?: number;
}

const DEFAULT_W = 1920;
const DEFAULT_H = 1080;

export function ScoreboardCanvas({
  state,
  width = DEFAULT_W,
  height = DEFAULT_H,
}: ScoreboardCanvasProps) {
  const { colors, opacities } = state;
  const col = (key: keyof typeof colors) =>
    hexToRgba(colors[key], opacities[key] ?? 0);

  const bg = `linear-gradient(180deg, ${col('bgTop')} 0%, ${col('bgMid')} 50%, ${col('bgBot')} 100%)`;

  return (
    <div
      data-testid="scoreboard-canvas"
      style={{
        width,
        height,
        background: bg,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: ff(state.fontTeams),
        color: '#fff',
      }}
    >
      {/* Overlay decoratif */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'radial-gradient(ellipse at 25% 15%, rgba(100,200,255,0.12) 0%, transparent 50%), radial-gradient(ellipse at 75% 85%, rgba(100,200,255,0.08) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          flexShrink: 0,
          padding: '14px 96px 10px',
        }}
      >
        <Header
          team1={state.team1}
          team2={state.team2}
          score1={state.score1}
          score2={state.score2}
          colors={colors}
          opacities={opacities}
          fontTeams={state.fontTeams}
        />

        <ClockOverlay
          time={state.time}
          period={state.period}
          showClock={state.showClock}
          clockBoxMode={state.clockBoxMode}
          demoRunning={state.demoRunning}
          colors={colors}
          opacities={opacities}
          fontClock={state.fontClock}
        />
      </div>

      {/* Zone principale */}
      <div style={{ flex: 1, display: 'flex', position: 'relative', zIndex: 1 }}>
        {state.showPenalties && (
          <PenaltyColumn
            side="left"
            penalties={state.penaltiesLeft}
            colors={colors}
            opacities={opacities}
            fontBody={state.fontBody}
          />
        )}

        {state.bodyType === 3 ? (
          <BodyType3
            playerStats={state.playerStats}
            titleCenter={state.titleCenter}
            showPlayerPhoto={state.showPlayerPhoto}
            showPenalties={state.showPenalties}
            colors={colors}
            opacities={opacities}
            fontBody={state.fontBody}
          />
        ) : state.bodyType === 2 ? (
          <BodyType2
            stats={state.stats}
            titleLeft={state.titleLeft}
            titleRight={state.titleRight}
            showPenalties={state.showPenalties}
            colors={colors}
            opacities={opacities}
            fontBody={state.fontBody}
          />
        ) : (
          <BodyType1
            stats={state.stats}
            titleCenter={state.titleCenter}
            showPenalties={state.showPenalties}
            colors={colors}
            opacities={opacities}
            fontBody={state.fontBody}
          />
        )}

        {state.showPenalties && (
          <PenaltyColumn
            side="right"
            penalties={state.penaltiesRight}
            colors={colors}
            opacities={opacities}
            fontBody={state.fontBody}
          />
        )}
      </div>
    </div>
  );
}
