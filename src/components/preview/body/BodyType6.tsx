import { hexToRgba } from '@/utils/color';
import { ff } from '@/utils/font';
import { bodyTitleFs, bodyValueFs, bodyLabelFs } from '@/utils/fontScale';
import { Flag } from '@/components/preview/Flag';
import type { StandingsData } from '@/types/bodyTypes/standings';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { FontId } from '@/types/fonts';
import type { FontSizeConfig } from '@/types/fontSizes';

interface BodyType6Props {
  readonly standingsData: StandingsData;
  readonly showPenalties: boolean;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly fontBody: FontId;
  readonly fontSizes?: FontSizeConfig;
}

const BASE_RANK_W = 40;
const BASE_FLAG_COL_W = 70;
const BASE_TEAM_W = 80;
const BASE_COL_W = 55;

function computeRowMetrics(
  rowCount: number,
  fontSizes: FontSizeConfig | undefined,
): { rowFs: number; rowH: number } {
  const baseFs = rowCount <= 4 ? 30 : rowCount <= 6 ? 26 : rowCount <= 8 ? 22 : 18;
  const baseH = rowCount <= 4 ? 60 : rowCount <= 6 ? 48 : rowCount <= 8 ? 40 : 34;
  const fs = fontSizes ? bodyValueFs(fontSizes, baseFs) : baseFs;
  const h = Math.round(baseH * (fs / baseFs));
  return { rowFs: fs, rowH: h };
}

export function BodyType6({
  standingsData,
  showPenalties,
  colors,
  opacities,
  fontBody,
  fontSizes,
}: BodyType6Props) {
  const col = (key: keyof ColorMap) => hexToRgba(colors[key], opacities[key] ?? 0);
  const pad = showPenalties ? 10 : 40;
  const { title, columns, rows } = standingsData;
  const rowCount = rows.length;
  const { rowFs, rowH } = computeRowMetrics(rowCount, fontSizes);

  const fsTitle = fontSizes ? bodyTitleFs(fontSizes, 28) : 28;
  const fsHeader = fontSizes ? bodyLabelFs(fontSizes, 14) : 14;

  const scale = rowFs / (rowCount <= 4 ? 30 : rowCount <= 6 ? 26 : rowCount <= 8 ? 22 : 18);
  const rankW = Math.round(BASE_RANK_W * scale);
  const flagColW = Math.round(BASE_FLAG_COL_W * scale);
  const teamW = Math.round(BASE_TEAM_W * scale);
  const colW = Math.round(BASE_COL_W * scale);

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: `30px ${pad + 20}px`,
        fontFamily: ff(fontBody),
        overflow: 'hidden',
      }}
    >
      {/* Titre */}
      <div
        style={{
          textAlign: 'center',
          fontSize: fsTitle,
          fontWeight: 600,
          letterSpacing: 5,
          textTransform: 'uppercase',
          color: col('titleText'),
          paddingBottom: 24,
          flexShrink: 0,
        }}
      >
        {title}
      </div>

      {/* En-tete colonnes */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: 32,
          borderBottom: '1px solid rgba(255,255,255,0.15)',
          fontSize: fsHeader,
          fontWeight: 600,
          letterSpacing: 2,
          color: col('statLabel'),
          opacity: 0.6,
          textTransform: 'uppercase',
          flexShrink: 0,
        }}
      >
        <div style={{ width: rankW, textAlign: 'center' }}>#</div>
        <div style={{ width: flagColW }} />
        <div style={{ width: teamW }}>NOC</div>
        {columns.map((c) => (
          <div key={c.id} style={{ width: colW, textAlign: 'center' }}>{c.label}</div>
        ))}
      </div>

      {/* Lignes */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
        {rows.map((row, i) => (
          <div
            key={`row-${i}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              height: rowH,
              fontSize: rowFs,
              fontWeight: 500,
              color: col('statVal'),
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              background: row.highlighted ? 'rgba(76,175,80,0.12)' : 'transparent',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: rankW,
                textAlign: 'center',
                fontWeight: 700,
                color: col('statLabel'),
              }}
            >
              {i + 1}
            </div>
            <div style={{ width: flagColW, display: 'flex', justifyContent: 'center' }}>
              <Flag code={row.team} w={42} h={27} />
            </div>
            <div
              style={{
                width: teamW,
                fontWeight: 700,
                letterSpacing: 3,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {row.team}
            </div>
            {columns.map((c) => (
              <div
                key={c.id}
                style={{
                  width: colW,
                  textAlign: 'center',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {row.values[c.id] ?? ''}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
