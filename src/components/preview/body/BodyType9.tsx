import { hexToRgba } from '@/utils/color';
import { ff, scaleFontSize } from '@/utils/font';
import { PhotoCircle } from '@/components/preview/PhotoCircle';
import { playerPhotoKey } from '@/types/playerPhoto';
import type { HeadToHeadData } from '@/types/bodyTypes/headToHead';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { FontId } from '@/types/fonts';
import type { FontSizeConfig } from '@/types/fontSizes';

interface BodyType9Props {
  readonly headToHeadData: HeadToHeadData;
  readonly showPenalties: boolean;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly fontBody: FontId;
  readonly playerPhotos?: Record<string, string>;
  readonly fontSizes?: FontSizeConfig;
}

export function BodyType9({
  headToHeadData,
  showPenalties,
  colors,
  opacities,
  fontBody,
  playerPhotos = {},
  fontSizes,
}: BodyType9Props) {
  const col = (key: keyof ColorMap) => hexToRgba(colors[key], opacities[key] ?? 0);
  const pad = showPenalties ? 10 : 40;
  const sc = fontSizes?.bodyScale9 ?? 100;
  const { title, playerLeft, playerRight, stats } = headToHeadData;
  const photoLeft = playerPhotos[playerPhotoKey(playerLeft.team, playerLeft.number)] ?? '';
  const photoRight = playerPhotos[playerPhotoKey(playerRight.team, playerRight.number)] ?? '';

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `20px ${pad + 20}px`,
        gap: 10,
        fontFamily: ff(fontBody),
      }}
    >
      {/* Titre */}
      <div
        style={{
          fontSize: scaleFontSize(28, sc),
          fontWeight: 600,
          letterSpacing: 5,
          textTransform: 'uppercase',
          color: col('titleText'),
        }}
      >
        {title}
      </div>

      {/* Photos et noms des joueurs */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          padding: '8px 20px',
        }}
      >
        <div style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: 16 }}>
          <PhotoCircle
            photo={photoLeft}
            fallbackText={playerLeft.number}
            size={scaleFontSize(64, sc)}
            fontSize={scaleFontSize(24, sc)}
            color={col('statVal')}
            fontFamily={ff(fontBody)}
          />
          <div>
            <div style={{ fontSize: scaleFontSize(32, sc), fontWeight: 700, color: col('statVal'), letterSpacing: 2 }}>
              {playerLeft.name}
            </div>
            <div style={{ fontSize: scaleFontSize(16, sc), color: col('statLabel'), letterSpacing: 2 }}>
              #{playerLeft.number} {playerLeft.team}
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: 16 }}>
          <div>
            <div style={{ fontSize: scaleFontSize(32, sc), fontWeight: 700, color: col('statVal'), letterSpacing: 2 }}>
              {playerRight.name}
            </div>
            <div style={{ fontSize: scaleFontSize(16, sc), color: col('statLabel'), letterSpacing: 2 }}>
              {playerRight.team} #{playerRight.number}
            </div>
          </div>
          <PhotoCircle
            photo={photoRight}
            fallbackText={playerRight.number}
            size={scaleFontSize(64, sc)}
            fontSize={scaleFontSize(24, sc)}
            color={col('statVal')}
            fontFamily={ff(fontBody)}
          />
        </div>
      </div>

      {/* Lignes de stats */}
      {stats.map((stat, i) => (
        <div
          key={`h2h-${i}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: '6px 20px',
            borderTop: i === 0 ? '1px solid rgba(255,255,255,0.1)' : 'none',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div
            style={{
              flex: 1,
              textAlign: 'left',
              fontSize: scaleFontSize(26, sc),
              fontWeight: 700,
              fontVariantNumeric: 'tabular-nums',
              color: col('statVal'),
            }}
          >
            {stat.valueLeft}
          </div>
          <div
            style={{
              flex: 1,
              textAlign: 'center',
              fontSize: scaleFontSize(16, sc),
              fontWeight: 500,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: col('statLabel'),
            }}
          >
            {stat.label}
          </div>
          <div
            style={{
              flex: 1,
              textAlign: 'right',
              fontSize: scaleFontSize(26, sc),
              fontWeight: 700,
              fontVariantNumeric: 'tabular-nums',
              color: col('statVal'),
            }}
          >
            {stat.valueRight}
          </div>
        </div>
      ))}
    </div>
  );
}
