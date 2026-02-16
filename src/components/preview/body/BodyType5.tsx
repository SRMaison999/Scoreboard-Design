import { hexToRgba } from '@/utils/color';
import { ff } from '@/utils/font';
import { bodyTitleFs, bodyValueFs, bodyLabelFs, computeFlagDimensions } from '@/utils/fontScale';
import { Flag } from '@/components/preview/Flag';
import { PhotoCircle } from '@/components/preview/PhotoCircle';
import type { PlayerCardData } from '@/types/bodyTypes/playerCard';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { FontId } from '@/types/fonts';
import type { FontSizeConfig } from '@/types/fontSizes';

interface BodyType5Props {
  readonly playerCardData: PlayerCardData;
  readonly showPenalties: boolean;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly fontBody: FontId;
  readonly fontSizes?: FontSizeConfig;
}

export function BodyType5({
  playerCardData,
  showPenalties,
  colors,
  opacities,
  fontBody,
  fontSizes,
}: BodyType5Props) {
  const col = (key: keyof ColorMap) => hexToRgba(colors[key], opacities[key] ?? 0);
  const pad = showPenalties ? 10 : 40;
  const { title, subtitle, playerName, playerNumber, playerTeam, playerPhoto, stats } = playerCardData;

  const fsTitle = fontSizes ? bodyTitleFs(fontSizes, 30) : 30;
  const fsSubtitle = fontSizes ? bodyLabelFs(fontSizes, 20) : 20;
  const fsPlayerName = fontSizes ? bodyValueFs(fontSizes, 40) : 40;
  const fsTeamCode = fontSizes ? bodyLabelFs(fontSizes, 22) : 22;
  const fsStatValue = fontSizes ? bodyValueFs(fontSizes, 36) : 36;
  const fsStatLabel = fontSizes ? bodyLabelFs(fontSizes, 14) : 14;
  const photoSize = fontSizes ? bodyValueFs(fontSizes, 180) : 180;
  const photoFs = fontSizes ? bodyValueFs(fontSizes, 56) : 56;
  const { w: flagW, h: flagH } = computeFlagDimensions(fsTeamCode);

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `20px ${pad + 20}px`,
        gap: 14,
        fontFamily: ff(fontBody),
        overflow: 'hidden',
      }}
    >
      {/* Titre */}
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

      {subtitle && (
        <div style={{ fontSize: fsSubtitle, color: col('statLabel'), letterSpacing: 3, opacity: 0.7 }}>
          {subtitle}
        </div>
      )}

      {/* Photo du joueur */}
      <div style={{ marginTop: 8 }}>
        <PhotoCircle
          photo={playerPhoto}
          fallbackText={playerNumber}
          size={photoSize}
          fontSize={photoFs}
          color={col('statVal')}
          fontFamily={ff(fontBody)}
        />
      </div>

      {/* Nom + equipe */}
      <div
        style={{
          fontSize: fsPlayerName,
          fontWeight: 700,
          letterSpacing: 4,
          textTransform: 'uppercase',
          color: col('statVal'),
        }}
      >
        {playerName}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Flag code={playerTeam} w={flagW} h={flagH} />
        <span style={{ fontSize: fsTeamCode, letterSpacing: 4, color: col('statLabel') }}>
          {playerTeam}
        </span>
      </div>

      {/* Stats en ligne */}
      {stats.length > 0 && (
        <div
          style={{
            display: 'flex',
            gap: 40,
            marginTop: 16,
            padding: '16px 30px',
            borderTop: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {stats.map((s, i) => (
            <div key={`st-${i}`} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: fsStatValue,
                  fontWeight: 700,
                  color: col('statVal'),
                  fontVariantNumeric: 'tabular-nums',
                  textShadow: `0 0 12px ${col('statVal')}5a`,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: fsStatLabel,
                  fontWeight: 500,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: col('statLabel'),
                  marginTop: 4,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
