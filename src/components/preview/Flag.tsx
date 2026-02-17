import { resolveFlagUrl } from '@/utils/flagUrl';
import type { CSSProperties } from 'react';

interface FlagProps {
  readonly code: string;
  readonly w?: number;
  readonly h?: number;
  readonly flagOverrides?: Record<string, string>;
}

const EMPTY_OVERRIDES: Record<string, string> = {};

export function Flag({ code, w = 77, h = 50, flagOverrides = EMPTY_OVERRIDES }: FlagProps) {
  const url = resolveFlagUrl(code, flagOverrides);

  if (!url) {
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

  const imgStyle: CSSProperties = {
    width: w,
    height: h,
    borderRadius: 4,
    overflow: 'hidden',
    boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
    flexShrink: 0,
    objectFit: 'cover',
  };

  return <img src={url} alt={code} style={imgStyle} />;
}
