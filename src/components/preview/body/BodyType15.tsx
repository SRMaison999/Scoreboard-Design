import { resolveElementStyle } from '@/utils/elementStyle';
import { ff } from '@/utils/font';
import { hexToRgba } from '@/utils/color';
import { Flag } from '@/components/preview/Flag';
import { EDITOR_LABELS } from '@/constants/labels';
import type { RefereesData, RefereeEntry } from '@/types/bodyTypes/referees';
import type { ColorMap, OpacityMap } from '@/types/colors';
import type { FontId } from '@/types/fonts';
import type { FontSizeConfig } from '@/types/fontSizes';
import type { StyleContext, ElementDefaults } from '@/utils/elementStyle';
import type { RefereesStyleOverrides } from '@/types/elementStyleOverride';

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

const DEFAULTS_NAME: ElementDefaults = {
  fontSize: 20, fontWeight: 600, letterSpacing: 2,
  textTransform: 'uppercase', colorKey: 'statVal',
};

const DEFAULTS_NUMBER: ElementDefaults = {
  fontSize: 18, fontWeight: 700, letterSpacing: 0,
  textTransform: 'none', colorKey: 'statVal',
};

const DEFAULTS_NOC: ElementDefaults = {
  fontSize: 16, fontWeight: 600, letterSpacing: 2,
  textTransform: 'none', colorKey: 'statLabel',
};

const DEFAULTS_ROLE: ElementDefaults = {
  fontSize: 14, fontWeight: 500, letterSpacing: 1,
  textTransform: 'none', colorKey: 'statLabel', hardcodedOpacity: 0.8,
};

const DEFAULTS_TITLE: ElementDefaults = {
  fontSize: 26, fontWeight: 600, letterSpacing: 5,
  textTransform: 'uppercase', colorKey: 'titleText',
};

const DEFAULTS_CATEGORY_TITLE: ElementDefaults = {
  fontSize: 14, fontWeight: 700, letterSpacing: 3,
  textTransform: 'uppercase', colorKey: 'titleText', hardcodedOpacity: 0.7,
};

function RefereeRow({
  entry, ctx, overrides,
  globalShowFlags, globalShowNocs, globalShowRoles, flagOverrides,
}: {
  readonly entry: RefereeEntry;
  readonly ctx: StyleContext;
  readonly overrides: RefereesStyleOverrides;
  readonly globalShowFlags: boolean;
  readonly globalShowNocs: boolean;
  readonly globalShowRoles: boolean;
  readonly flagOverrides?: Record<string, string>;
}) {
  const showFlag = globalShowFlags && entry.showFlag;
  const showNoc = globalShowNocs && entry.showNoc;
  const showRole = globalShowRoles && entry.showRole;

  const nameStyle = resolveElementStyle(DEFAULTS_NAME, ctx, overrides.name);
  const numberStyle = resolveElementStyle(DEFAULTS_NUMBER, ctx, overrides.number);
  const nocStyle = resolveElementStyle(DEFAULTS_NOC, ctx, overrides.noc);
  const roleStyle = resolveElementStyle(DEFAULTS_ROLE, ctx, overrides.role);

  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', width: '100%',
        padding: '6px 20px', gap: 16,
        borderBottom: `1px solid ${hexToRgba('#ffffff', 94)}`,
        fontFamily: ff(ctx.fontBody),
      }}
    >
      {showFlag && entry.nationality && (
        <Flag code={entry.nationality} w={36} h={24} flagOverrides={flagOverrides} />
      )}
      {showNoc && entry.nationality && (
        <div style={{ minWidth: 42, textAlign: 'center', ...nocStyle }}>
          {entry.nationality}
        </div>
      )}
      <div style={{ width: 36, fontVariantNumeric: 'tabular-nums', textAlign: 'center', ...numberStyle }}>
        {entry.number}
      </div>
      <div style={{ flex: 1, ...nameStyle }}>
        {entry.name}
      </div>
      {showRole && (
        <div style={{ minWidth: 130, textAlign: 'right', whiteSpace: 'nowrap', ...roleStyle }}>
          {ROLE_LABELS[entry.role] ?? entry.role}
        </div>
      )}
    </div>
  );
}

function renderList(
  refs: readonly RefereeEntry[], ctx: StyleContext,
  overrides: RefereesStyleOverrides, data: RefereesData,
  flagOverrides?: Record<string, string>,
) {
  return refs.map((entry, i) => (
    <RefereeRow
      key={`ref-${i}`} entry={entry} ctx={ctx} overrides={overrides}
      globalShowFlags={data.showFlags} globalShowNocs={data.showNocs}
      globalShowRoles={data.showRoles} flagOverrides={flagOverrides}
    />
  ));
}

function CategoryTitle({ label, ctx, overrides }: {
  readonly label: string;
  readonly ctx: StyleContext;
  readonly overrides: RefereesStyleOverrides;
}) {
  const style = resolveElementStyle(DEFAULTS_CATEGORY_TITLE, ctx, overrides.categoryTitle);
  return <div style={{ textAlign: 'center', marginBottom: 4, ...style }}>{label}</div>;
}

function ColumnsPreset({ referees, ctx, overrides, data, flagOverrides }: {
  readonly referees: readonly RefereeEntry[];
  readonly ctx: StyleContext;
  readonly overrides: RefereesStyleOverrides;
  readonly data: RefereesData;
  readonly flagOverrides?: Record<string, string>;
}) {
  const refs = referees.filter((r) => r.role === 'referee');
  const linesmen = referees.filter((r) => r.role === 'linesman');
  const noRoles: RefereesData = { ...data, showRoles: false };

  return (
    <div style={{ display: 'flex', flex: 1, gap: 32, width: '100%' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <CategoryTitle label={ROLE_LABELS.referee ?? ''} ctx={ctx} overrides={overrides} />
        {renderList(refs, ctx, overrides, noRoles, flagOverrides)}
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <CategoryTitle label={ROLE_LABELS.linesman ?? ''} ctx={ctx} overrides={overrides} />
        {renderList(linesmen, ctx, overrides, noRoles, flagOverrides)}
      </div>
    </div>
  );
}

function RowsPreset({ referees, ctx, overrides, data, flagOverrides }: {
  readonly referees: readonly RefereeEntry[];
  readonly ctx: StyleContext;
  readonly overrides: RefereesStyleOverrides;
  readonly data: RefereesData;
  readonly flagOverrides?: Record<string, string>;
}) {
  const refs = referees.filter((r) => r.role === 'referee');
  const linesmen = referees.filter((r) => r.role === 'linesman');
  const noRoles: RefereesData = { ...data, showRoles: false };

  return (
    <>
      <CategoryTitle label={ROLE_LABELS.referee ?? ''} ctx={ctx} overrides={overrides} />
      {renderList(refs, ctx, overrides, noRoles, flagOverrides)}
      <div style={{ marginTop: 8 }}>
        <CategoryTitle label={ROLE_LABELS.linesman ?? ''} ctx={ctx} overrides={overrides} />
      </div>
      {renderList(linesmen, ctx, overrides, noRoles, flagOverrides)}
    </>
  );
}

export function BodyType15({
  refereesData, showPenalties, colors, opacities, fontBody, fontSizes, flagOverrides,
}: BodyType15Props) {
  const pad = showPenalties ? 10 : 40;
  const sc = fontSizes?.bodyScale15 ?? 100;
  const ctx: StyleContext = { colors, opacities, fontBody, bodyScale: sc };
  const { title, preset, referees, activeIndex, styleOverrides } = refereesData;
  const ov = styleOverrides ?? {};

  const titleStyle = resolveElementStyle(DEFAULTS_TITLE, ctx, ov.title);

  return (
    <div
      style={{
        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: `16px ${pad + 20}px`, gap: 6,
        fontFamily: ff(fontBody), overflow: 'hidden',
      }}
    >
      {title && (
        <div style={{ lineHeight: 1, marginBottom: 8, ...titleStyle }}>{title}</div>
      )}

      {preset === 'one-by-one' && referees[activeIndex] && renderList(
        [referees[activeIndex]], ctx, ov, refereesData, flagOverrides,
      )}
      {preset === 'refs-vs-linesmen-columns' && (
        <ColumnsPreset referees={referees} ctx={ctx} overrides={ov} data={refereesData} flagOverrides={flagOverrides} />
      )}
      {preset === 'refs-vs-linesmen-rows' && (
        <RowsPreset referees={referees} ctx={ctx} overrides={ov} data={refereesData} flagOverrides={flagOverrides} />
      )}
      {(preset === 'all' || preset === 'free') && renderList(
        referees, ctx, ov, refereesData, flagOverrides,
      )}
    </div>
  );
}
