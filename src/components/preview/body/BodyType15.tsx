import { hexToRgba } from '@/utils/color';
import { ff, scaleFontSize } from '@/utils/font';
import { Flag } from '@/components/preview/Flag';
import { EDITOR_LABELS } from '@/constants/labels';
import type { RefereesData, RefereeEntry } from '@/types/bodyTypes/referees';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { FontId } from '@/types/fonts';
import type { FontSizeConfig } from '@/types/fontSizes';

interface BodyType15Props {
  readonly refereesData: RefereesData;
  readonly showPenalties: boolean;
  readonly colors: ColorMap;
  readonly opacities: OpacityMap;
  readonly fontBody: FontId;
  readonly fontSizes?: FontSizeConfig;
  readonly flagOverrides?: Record<string, string>;
}

const ROLE_LABELS: Record<string, string> = {
  referee: EDITOR_LABELS.refereesRoleReferee,
  linesman: EDITOR_LABELS.refereesRoleLinesman,
};

function RefereeRow({
  entry,
  col,
  sc,
  fontBody,
  globalShowFlags,
  globalShowNocs,
  globalShowRoles,
  flagOverrides,
}: {
  readonly entry: RefereeEntry;
  readonly col: (key: keyof ColorMap) => string;
  readonly sc: number;
  readonly fontBody: FontId;
  readonly globalShowFlags: boolean;
  readonly globalShowNocs: boolean;
  readonly globalShowRoles: boolean;
  readonly flagOverrides?: Record<string, string>;
}) {
  const showFlag = globalShowFlags && entry.showFlag;
  const showNoc = globalShowNocs && entry.showNoc;
  const showRole = globalShowRoles && entry.showRole;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: '6px 20px',
        gap: 16,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        fontFamily: ff(fontBody),
      }}
    >
      {showFlag && entry.nationality && (
        <Flag code={entry.nationality} w={36} h={24} flagOverrides={flagOverrides} />
      )}
      {showNoc && entry.nationality && (
        <div
          style={{
            minWidth: 42,
            fontSize: scaleFontSize(16, sc),
            fontWeight: 600,
            color: col('statLabel'),
            letterSpacing: 2,
            textAlign: 'center',
          }}
        >
          {entry.nationality}
        </div>
      )}
      <div
        style={{
          width: 36,
          fontSize: scaleFontSize(18, sc),
          fontWeight: 700,
          fontVariantNumeric: 'tabular-nums',
          color: col('statVal'),
          textAlign: 'center',
        }}
      >
        {entry.number}
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
        {entry.name}
      </div>
      {showRole && (
        <div
          style={{
            minWidth: 130,
            fontSize: scaleFontSize(14, sc),
            fontWeight: 500,
            color: col('statLabel'),
            textAlign: 'right',
            letterSpacing: 1,
            whiteSpace: 'nowrap',
            opacity: 0.8,
          }}
        >
          {ROLE_LABELS[entry.role] ?? entry.role}
        </div>
      )}
    </div>
  );
}

function renderAll(
  referees: readonly RefereeEntry[],
  col: (key: keyof ColorMap) => string,
  sc: number,
  fontBody: FontId,
  data: RefereesData,
  flagOverrides?: Record<string, string>,
) {
  return referees.map((entry, i) => (
    <RefereeRow
      key={`ref-${i}`}
      entry={entry}
      col={col}
      sc={sc}
      fontBody={fontBody}
      globalShowFlags={data.showFlags}
      globalShowNocs={data.showNocs}
      globalShowRoles={data.showRoles}
      flagOverrides={flagOverrides}
    />
  ));
}

function renderOneByOne(
  referees: readonly RefereeEntry[],
  activeIndex: number,
  col: (key: keyof ColorMap) => string,
  sc: number,
  fontBody: FontId,
  data: RefereesData,
  flagOverrides?: Record<string, string>,
) {
  const entry = referees[activeIndex];
  if (!entry) return null;
  return (
    <RefereeRow
      entry={entry}
      col={col}
      sc={sc}
      fontBody={fontBody}
      globalShowFlags={data.showFlags}
      globalShowNocs={data.showNocs}
      globalShowRoles={data.showRoles}
      flagOverrides={flagOverrides}
    />
  );
}

function renderColumns(
  referees: readonly RefereeEntry[],
  col: (key: keyof ColorMap) => string,
  sc: number,
  fontBody: FontId,
  data: RefereesData,
  flagOverrides?: Record<string, string>,
) {
  const refs = referees.filter((r) => r.role === 'referee');
  const linesmen = referees.filter((r) => r.role === 'linesman');

  return (
    <div style={{ display: 'flex', flex: 1, gap: 32, width: '100%' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div
          style={{
            fontSize: scaleFontSize(14, sc),
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: col('titleText'),
            textAlign: 'center',
            opacity: 0.7,
            marginBottom: 4,
          }}
        >
          {ROLE_LABELS.referee}
        </div>
        {refs.map((entry, i) => (
          <RefereeRow
            key={`ref-col-${i}`}
            entry={entry}
            col={col}
            sc={sc}
            fontBody={fontBody}
            globalShowFlags={data.showFlags}
            globalShowNocs={data.showNocs}
            globalShowRoles={false}
            flagOverrides={flagOverrides}
          />
        ))}
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div
          style={{
            fontSize: scaleFontSize(14, sc),
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: col('titleText'),
            textAlign: 'center',
            opacity: 0.7,
            marginBottom: 4,
          }}
        >
          {ROLE_LABELS.linesman}
        </div>
        {linesmen.map((entry, i) => (
          <RefereeRow
            key={`lm-col-${i}`}
            entry={entry}
            col={col}
            sc={sc}
            fontBody={fontBody}
            globalShowFlags={data.showFlags}
            globalShowNocs={data.showNocs}
            globalShowRoles={false}
            flagOverrides={flagOverrides}
          />
        ))}
      </div>
    </div>
  );
}

function renderRows(
  referees: readonly RefereeEntry[],
  col: (key: keyof ColorMap) => string,
  sc: number,
  fontBody: FontId,
  data: RefereesData,
  flagOverrides?: Record<string, string>,
) {
  const refs = referees.filter((r) => r.role === 'referee');
  const linesmen = referees.filter((r) => r.role === 'linesman');

  return (
    <>
      <div
        style={{
          fontSize: scaleFontSize(14, sc),
          fontWeight: 700,
          letterSpacing: 3,
          textTransform: 'uppercase',
          color: col('titleText'),
          textAlign: 'center',
          opacity: 0.7,
        }}
      >
        {ROLE_LABELS.referee}
      </div>
      {refs.map((entry, i) => (
        <RefereeRow
          key={`ref-row-${i}`}
          entry={entry}
          col={col}
          sc={sc}
          fontBody={fontBody}
          globalShowFlags={data.showFlags}
          globalShowNocs={data.showNocs}
          globalShowRoles={false}
          flagOverrides={flagOverrides}
        />
      ))}
      <div
        style={{
          fontSize: scaleFontSize(14, sc),
          fontWeight: 700,
          letterSpacing: 3,
          textTransform: 'uppercase',
          color: col('titleText'),
          textAlign: 'center',
          opacity: 0.7,
          marginTop: 8,
        }}
      >
        {ROLE_LABELS.linesman}
      </div>
      {linesmen.map((entry, i) => (
        <RefereeRow
          key={`lm-row-${i}`}
          entry={entry}
          col={col}
          sc={sc}
          fontBody={fontBody}
          globalShowFlags={data.showFlags}
          globalShowNocs={data.showNocs}
          globalShowRoles={false}
          flagOverrides={flagOverrides}
        />
      ))}
    </>
  );
}

export function BodyType15({
  refereesData,
  showPenalties,
  colors,
  opacities,
  fontBody,
  fontSizes,
  flagOverrides,
}: BodyType15Props) {
  const col = (key: keyof ColorMap) => hexToRgba(colors[key], opacities[key] ?? 0);
  const pad = showPenalties ? 10 : 40;
  const sc = fontSizes?.bodyScale15 ?? 100;
  const { title, preset, referees, activeIndex } = refereesData;

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
      {title && (
        <div
          style={{
            fontSize: scaleFontSize(26, sc),
            fontWeight: 600,
            letterSpacing: 5,
            textTransform: 'uppercase',
            lineHeight: 1,
            color: col('titleText'),
            marginBottom: 8,
          }}
        >
          {title}
        </div>
      )}

      {preset === 'one-by-one' && renderOneByOne(referees, activeIndex, col, sc, fontBody, refereesData, flagOverrides)}
      {preset === 'refs-vs-linesmen-columns' && renderColumns(referees, col, sc, fontBody, refereesData, flagOverrides)}
      {preset === 'refs-vs-linesmen-rows' && renderRows(referees, col, sc, fontBody, refereesData, flagOverrides)}
      {(preset === 'all' || preset === 'free') && renderAll(referees, col, sc, fontBody, refereesData, flagOverrides)}
    </div>
  );
}
