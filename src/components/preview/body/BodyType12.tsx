import { hexToRgba } from '@/utils/color';
import { ff, scaleFontSize } from '@/utils/font';
import { Flag } from '@/components/preview/Flag';
import type { RosterData } from '@/types/bodyTypes/roster';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { FontId } from '@/types/fonts';
import type { FontSizeConfig } from '@/types/fontSizes';

interface BodyType12Props {
  readonly rosterData: RosterData;
  readonly showPenalties: boolean;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly fontBody: FontId;
  readonly fontSizes?: FontSizeConfig;
  readonly flagOverrides?: Record<string, string>;
}

export function BodyType12({
  rosterData,
  showPenalties,
  colors,
  opacities,
  fontBody,
  fontSizes,
  flagOverrides,
}: BodyType12Props) {
  const col = (key: keyof ColorMap) => hexToRgba(colors[key], opacities[key] ?? 0);
  const pad = showPenalties ? 10 : 40;
  const sc = fontSizes?.bodyScale12 ?? 100;
  const { title, team, coach, players } = rosterData;

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `16px ${pad + 20}px`,
        gap: 6,
        fontFamily: ff(fontBody),
        overflow: 'hidden',
      }}
    >
      {/* Titre + drapeau */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 4 }}>
        <Flag code={team} w={44} h={28} flagOverrides={flagOverrides} />
        <div
          style={{
            fontSize: scaleFontSize(26, sc),
            fontWeight: 600,
            letterSpacing: 5,
            textTransform: 'uppercase',
            color: col('titleText'),
          }}
        >
          {title}
        </div>
      </div>

      {/* Entraîneur */}
      {coach && (
        <div style={{ fontSize: scaleFontSize(16, sc), color: col('statLabel'), letterSpacing: 3, opacity: 0.7, marginBottom: 4 }}>
          Coach : {coach}
        </div>
      )}

      {/* Liste des joueurs */}
      {players.map((player, i) => (
        <div
          key={`roster-${i}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: '4px 20px',
            gap: 16,
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div
            style={{
              width: 40,
              fontSize: scaleFontSize(20, sc),
              fontWeight: 700,
              fontVariantNumeric: 'tabular-nums',
              color: col('statVal'),
              textAlign: 'center',
            }}
          >
            {player.number}
          </div>
          <div
            style={{
              flex: 1,
              fontSize: scaleFontSize(20, sc),
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: col('statVal'),
            }}
          >
            {player.name}
          </div>
          <div
            style={{
              width: 40,
              fontSize: scaleFontSize(16, sc),
              fontWeight: 500,
              color: col('statLabel'),
              textAlign: 'center',
              letterSpacing: 1,
            }}
          >
            {player.position}
          </div>
        </div>
      ))}
    </div>
  );
}
