import { hexToRgba } from '@/utils/color';
import { ff } from '@/utils/font';
import { bodyTitleFs, bodyValueFs, bodyLabelFs, computeFlagDimensions } from '@/utils/fontScale';
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
}

export function BodyType12({
  rosterData,
  showPenalties,
  colors,
  opacities,
  fontBody,
  fontSizes,
}: BodyType12Props) {
  const col = (key: keyof ColorMap) => hexToRgba(colors[key], opacities[key] ?? 0);
  const pad = showPenalties ? 10 : 40;
  const { title, team, coach, players } = rosterData;

  const fsTitle = fontSizes ? bodyTitleFs(fontSizes, 26) : 26;
  const fsCoach = fontSizes ? bodyLabelFs(fontSizes, 16) : 16;
  const fsPlayerNum = fontSizes ? bodyValueFs(fontSizes, 20) : 20;
  const fsPlayerName = fontSizes ? bodyValueFs(fontSizes, 20) : 20;
  const fsPosition = fontSizes ? bodyLabelFs(fontSizes, 16) : 16;
  const numColW = fontSizes ? bodyValueFs(fontSizes, 40) : 40;
  const posColW = fontSizes ? bodyLabelFs(fontSizes, 40) : 40;
  const { w: flagW, h: flagH } = computeFlagDimensions(fsTitle);

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
        <Flag code={team} w={flagW} h={flagH} />
        <div
          style={{
            fontSize: fsTitle,
            fontWeight: 600,
            letterSpacing: 5,
            textTransform: 'uppercase',
            color: col('titleText'),
          }}
        >
          {title}
        </div>
      </div>

      {/* Entraineur */}
      {coach && (
        <div style={{ fontSize: fsCoach, color: col('statLabel'), letterSpacing: 3, opacity: 0.7, marginBottom: 4 }}>
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
              width: numColW,
              fontSize: fsPlayerNum,
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
              fontSize: fsPlayerName,
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: col('statVal'),
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            {player.name}
          </div>
          <div
            style={{
              width: posColW,
              fontSize: fsPosition,
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
