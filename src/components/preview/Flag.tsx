import { HOCKEY_NATIONS, FLAG_STYLES } from '@/constants/nations';
import type { CSSProperties } from 'react';

interface FlagProps {
  readonly code: string;
  readonly w?: number;
  readonly h?: number;
}

export function Flag({ code, w = 77, h = 50 }: FlagProps) {
  const nation = HOCKEY_NATIONS.find((n) => n.noc === code);
  const iso = nation?.iso ?? '';
  const style = FLAG_STYLES[iso];

  if (!style) {
    const fallback: CSSProperties = {
      width: w,
      height: h,
      borderRadius: 4,
      overflow: 'hidden',
      boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
      flexShrink: 0,
      background: '#334155',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 14,
      color: '#94a3b8',
    };
    return <div style={fallback}>{code}</div>;
  }

  const base: CSSProperties = {
    width: w,
    height: h,
    borderRadius: 4,
    overflow: 'hidden',
    boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
    flexShrink: 0,
    background: style.bg,
    position: 'relative',
  };

  return (
    <div style={base}>
      {style.overlay && (
        <div style={{ position: 'absolute', ...style.overlay }} />
      )}
      {style.cross && (
        <>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '28%',
              width: style.cross.border ? '16%' : '12%',
              height: '100%',
              background: style.cross.border ?? style.cross.color,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '35%',
              left: 0,
              width: '100%',
              height: style.cross.border ? '26%' : '20%',
              background: style.cross.border ?? style.cross.color,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '30%',
              width: '12%',
              height: '100%',
              background: style.cross.color,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '37%',
              left: 0,
              width: '100%',
              height: '20%',
              background: style.cross.color,
            }}
          />
        </>
      )}
      {iso === 'ch' && (
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '30%',
            width: '40%',
            height: '60%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ position: 'absolute', width: '60%', height: '20%', background: '#fff' }} />
          <div style={{ position: 'absolute', width: '20%', height: '60%', background: '#fff' }} />
        </div>
      )}
      {iso === 'jp' && (
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '32%',
            width: '36%',
            height: '60%',
            borderRadius: '50%',
            background: '#bc002d',
          }}
        />
      )}
    </div>
  );
}
