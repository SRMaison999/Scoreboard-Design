import { useMemo } from 'react';
import { Header } from './Header';
import { ClockOverlay } from './ClockOverlay';
import { PenaltyColumn } from './PenaltyColumn';
import { LogoOverlay } from './LogoOverlay';
import { BodyType1 } from './body/BodyType1';
import { BodyType2 } from './body/BodyType2';
import { BodyType3 } from './body/BodyType3';
import { BodyType4 } from './body/BodyType4';
import { BodyType5 } from './body/BodyType5';
import { BodyType6 } from './body/BodyType6';
import { BodyType7 } from './body/BodyType7';
import { BodyType8 } from './body/BodyType8';
import { BodyType9 } from './body/BodyType9';
import { BodyType10 } from './body/BodyType10';
import { BodyType11 } from './body/BodyType11';
import { BodyType12 } from './body/BodyType12';
import { BodyType13 } from './body/BodyType13';
import { BodyType14 } from './body/BodyType14';
import { hexToRgba } from '@/utils/color';
import { ff } from '@/utils/font';
import type { ScoreboardState } from '@/types/scoreboard';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { FontId } from '@/types/fonts';
import type { FontSizeConfig } from '@/types/fontSizes';
import type { LogoPosition } from '@/types/logo';

export type InlineEditHandler = (field: string, value: string) => void;

interface ScoreboardCanvasProps {
  readonly state: ScoreboardState;
  readonly width?: number;
  readonly height?: number;
  readonly playerPhotos?: Record<string, string>;
  readonly logos?: Record<string, string>;
  readonly scorePopLeft?: boolean;
  readonly scorePopRight?: boolean;
  readonly penaltyFlashLeft?: boolean;
  readonly penaltyFlashRight?: boolean;
  readonly clockPulse?: boolean;
  readonly canvasScale?: number;
  readonly onInlineEdit?: InlineEditHandler;
}

interface BodyProps {
  readonly state: ScoreboardState;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly fontBody: FontId;
  readonly fontSizes: FontSizeConfig;
  readonly playerPhotos: Record<string, string>;
  readonly flagOverrides: Record<string, string>;
  readonly canvasScale?: number;
}

function BodyRenderer({ state, colors, opacities, fontBody, fontSizes, playerPhotos, flagOverrides, canvasScale }: BodyProps) {
  const shared = { showPenalties: state.showPenalties, colors, opacities, fontBody, fontSizes };

  switch (state.bodyType) {
    case 2:
      return <BodyType2 stats={state.stats} titleLeft={state.titleLeft} titleRight={state.titleRight} {...shared} />;
    case 3:
      return <BodyType3 playerStats={state.playerStats} titleCenter={state.titleCenter} showPlayerPhoto={state.showPlayerPhoto} playerPhotos={playerPhotos} {...shared} />;
    case 4:
      return <BodyType4 goalData={state.goalData} team1={state.team1} team2={state.team2} flagOverrides={flagOverrides} {...shared} />;
    case 5:
      return <BodyType5 playerCardData={state.playerCardData} flagOverrides={flagOverrides} {...shared} />;
    case 6:
      return <BodyType6 standingsData={state.standingsData} flagOverrides={flagOverrides} {...shared} />;
    case 7:
      return <BodyType7 finalScoreData={state.finalScoreData} team1={state.team1} team2={state.team2} score1={state.score1} score2={state.score2} flagOverrides={flagOverrides} {...shared} />;
    case 8:
      return <BodyType8 freeTextData={state.freeTextData} {...shared} />;
    case 9:
      return <BodyType9 headToHeadData={state.headToHeadData} playerPhotos={playerPhotos} {...shared} />;
    case 10:
      return <BodyType10 timelineData={state.timelineData} {...shared} />;
    case 11:
      return <BodyType11 barChartData={state.barChartData} team1={state.team1} team2={state.team2} {...shared} />;
    case 12:
      return <BodyType12 rosterData={state.rosterData} flagOverrides={flagOverrides} {...shared} />;
    case 13:
      return <BodyType13 scheduleData={state.scheduleData} {...shared} />;
    case 14:
      return <BodyType14 state={state} colors={colors} opacities={opacities} canvasScale={canvasScale} />;
    default:
      return <BodyType1 stats={state.stats} titleCenter={state.titleCenter} {...shared} />;
  }
}

interface LogoRendererProps {
  readonly logos: Record<string, string>;
  readonly position: LogoPosition;
  readonly size: number;
}

function CompetitionLogoRenderer({ logos, position, size }: LogoRendererProps) {
  const url = Object.entries(logos).find(([k]) => k.startsWith('competition-'))?.[1] ?? '';
  return <LogoOverlay dataUrl={url} position={position} size={size} />;
}

function SponsorLogoRenderer({ logos, position, size }: LogoRendererProps) {
  const url = Object.entries(logos).find(([k]) => k.startsWith('sponsor-'))?.[1] ?? '';
  return <LogoOverlay dataUrl={url} position={position} size={size} />;
}

const EMPTY_PHOTOS: Record<string, string> = {};
const EMPTY_LOGOS: Record<string, string> = {};

export function ScoreboardCanvas({
  state,
  width,
  height,
  playerPhotos = EMPTY_PHOTOS,
  logos = EMPTY_LOGOS,
  scorePopLeft = false,
  scorePopRight = false,
  penaltyFlashLeft = false,
  penaltyFlashRight = false,
  clockPulse = false,
  canvasScale,
  onInlineEdit,
}: ScoreboardCanvasProps) {
  const w = width ?? state.templateWidth;
  const h = height ?? state.templateHeight;
  const { colors, opacities, fontSizes } = state;
  const col = (key: keyof typeof colors) =>
    hexToRgba(colors[key], opacities[key] ?? 0);

  const flagOverrides = useMemo(() => {
    const result: Record<string, string> = {};
    for (const [key, value] of Object.entries(logos)) {
      if (key.startsWith('flag-')) {
        result[key] = value;
      }
    }
    return result;
  }, [logos]);

  const bg =
    state.bgMode === 'uniform'
      ? col('bgTop')
      : `linear-gradient(180deg, ${col('bgTop')} 0%, ${col('bgMid')} 50%, ${col('bgBot')} 100%)`;

  return (
    <div
      data-testid="scoreboard-canvas"
      style={{
        '--canvas-w': `${w}px`,
        '--canvas-h': `${h}px`,
        width: w,
        height: h,
        background: bg,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: ff(state.fontTeams),
        color: '#fff',
      } as React.CSSProperties}
    >
      {/* Média de fond (image ou vidéo) */}
      {state.backgroundMediaMode === 'image' && state.backgroundMediaUrl && (
        <img
          src={state.backgroundMediaUrl}
          alt=""
          style={{
            position: 'absolute',
            top: 0, left: 0, width: '100%', height: '100%',
            objectFit: 'cover',
            pointerEvents: 'none',
          }}
        />
      )}
      {state.backgroundMediaMode === 'video' && state.backgroundMediaUrl && (
        <video
          src={state.backgroundMediaUrl}
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: 0, left: 0, width: '100%', height: '100%',
            objectFit: 'cover',
            pointerEvents: 'none',
          }}
        />
      )}

      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'radial-gradient(ellipse at 25% 15%, rgba(100,200,255,0.12) 0%, transparent 50%), radial-gradient(ellipse at 75% 85%, rgba(100,200,255,0.08) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />

      {/* En mode Layout libre (type 14), le canvas est vierge : ni header ni pénalités */}
      {state.bodyType !== 14 && (
      <div style={{ position: 'relative', zIndex: 1, flexShrink: 0, padding: '14px 96px 10px' }}>
        <Header
          team1={state.team1}
          team2={state.team2}
          score1={state.score1}
          score2={state.score2}
          colors={colors}
          opacities={opacities}
          fontTeams={state.fontTeams}
          fontSizeTeamName={fontSizes.teamName}
          fontSizeScore={fontSizes.score}
          showTimeouts={state.showTimeouts}
          timeoutsLeft={state.timeoutsLeft}
          timeoutsRight={state.timeoutsRight}
          showShootout={state.showShootout}
          shootoutLeft={state.shootoutLeft}
          shootoutRight={state.shootoutRight}
          logoMode={state.logoMode}
          teamLogos={logos}
          flagOverrides={flagOverrides}
          scorePopLeft={scorePopLeft}
          scorePopRight={scorePopRight}
          onEdit={onInlineEdit}
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
          fontSizeClockTime={fontSizes.clockTime}
          fontSizePeriod={fontSizes.period}
          clockPulse={clockPulse}
          clockTenthsThreshold={state.clockTenthsThreshold}
          onEditTime={onInlineEdit ? (v) => onInlineEdit('time', v) : undefined}
          onEditPeriod={onInlineEdit ? (v) => onInlineEdit('period', v) : undefined}
        />
      </div>
      )}

      {state.showCompetitionLogo && (
        <CompetitionLogoRenderer logos={logos} position={state.competitionLogoPosition} size={state.competitionLogoSize} />
      )}
      {state.showSponsorLogo && (
        <SponsorLogoRenderer logos={logos} position={state.sponsorLogoPosition} size={state.sponsorLogoSize} />
      )}

      {state.bodyType === 14 ? (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}>
          <BodyType14 state={state} colors={colors} opacities={opacities} canvasScale={canvasScale} />
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', position: 'relative', zIndex: 1 }}>
          {state.showPenalties && (
            <PenaltyColumn side="left" penalties={state.penaltiesLeft} colors={colors} opacities={opacities} fontBody={state.fontBody} fontSizePenaltyTime={fontSizes.penaltyTime} fontSizePenaltyNumber={fontSizes.penaltyNumber} flash={penaltyFlashLeft} clockTenthsThreshold={state.clockTenthsThreshold} />
          )}

          <BodyRenderer state={state} colors={colors} opacities={opacities} fontBody={state.fontBody} fontSizes={fontSizes} playerPhotos={playerPhotos} flagOverrides={flagOverrides} canvasScale={canvasScale} />

          {state.showPenalties && (
            <PenaltyColumn side="right" penalties={state.penaltiesRight} colors={colors} opacities={opacities} fontBody={state.fontBody} fontSizePenaltyTime={fontSizes.penaltyTime} fontSizePenaltyNumber={fontSizes.penaltyNumber} flash={penaltyFlashRight} clockTenthsThreshold={state.clockTenthsThreshold} />
          )}
        </div>
      )}
    </div>
  );
}
