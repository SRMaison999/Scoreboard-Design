import { resolveFlagUrl, getRawFlagSvg } from '@/utils/flagUrl';
import type { CSSProperties } from 'react';

interface FlagProps {
  readonly code: string;
  readonly w?: number;
  readonly h?: number;
  readonly flagOverrides?: Record<string, string>;
}

const EMPTY_OVERRIDES: Record<string, string> = {};

/**
 * Rend le drapeau d'un pays par code NOC.
 * Strategie de rendu (du plus fiable au fallback) :
 * 1. Override utilisateur (img avec data URI)
 * 2. SVG inline (dangerouslySetInnerHTML — le plus fiable pour les SVG embarques)
 * 3. Data URI (fallback encodage URL)
 * 4. Fallback texte (code NOC sur fond gris)
 */
export function Flag({ code, w = 77, h = 50, flagOverrides = EMPTY_OVERRIDES }: FlagProps) {
  /* Code vide : ne rien afficher */
  if (!code) return null;

  const baseStyle: CSSProperties = {
    width: w,
    height: h,
    borderRadius: 4,
    overflow: 'hidden',
    boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
    flexShrink: 0,
  };

  /* 1. Override utilisateur (image custom) */
  const override = flagOverrides[`flag-${code}`];
  if (override) {
    return <img src={override} alt={code} style={{ ...baseStyle, objectFit: 'cover' }} />;
  }

  /* 2. SVG inline depuis le registre embarque — rendu le plus fiable */
  const rawSvg = getRawFlagSvg(code);
  if (rawSvg) {
    /* Injecter width/height 100% dans la balise <svg pour remplir le conteneur */
    const sized = rawSvg.replace(
      /^<svg\b/,
      '<svg width="100%" height="100%" preserveAspectRatio="xMidYMid slice"',
    );
    return (
      <div
        style={baseStyle}
        dangerouslySetInnerHTML={{ __html: sized }}
      />
    );
  }

  /* 3. Data URI (fallback) */
  const url = resolveFlagUrl(code, flagOverrides);
  if (url) {
    return <img src={url} alt={code} style={{ ...baseStyle, objectFit: 'cover' }} />;
  }

  /* 4. Fallback texte */
  return (
    <div style={{
      ...baseStyle,
      background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
      border: '1px solid rgba(148, 163, 184, 0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: Math.max(10, Math.min(14, Math.round(h * 0.22))),
      fontWeight: 700,
      letterSpacing: 1,
      color: '#cbd5e1',
    }}>
      {code}
    </div>
  );
}
