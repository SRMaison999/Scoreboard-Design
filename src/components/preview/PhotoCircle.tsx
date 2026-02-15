import type { CSSProperties } from 'react';

interface PhotoCircleProps {
  readonly photo: string;
  readonly fallbackText: string;
  readonly size: number;
  readonly fontSize: number;
  readonly color: string;
  readonly fontFamily: string;
}

/**
 * Cercle de photo pour le canvas de rendu.
 * Affiche l'image si fournie, sinon un texte de fallback (numéro du joueur).
 */
export function PhotoCircle({
  photo,
  fallbackText,
  size,
  fontSize,
  color,
  fontFamily,
}: PhotoCircleProps) {
  const circleStyle: CSSProperties = {
    width: size,
    height: size,
    borderRadius: '50%',
    overflow: 'hidden',
    flexShrink: 0,
  };

  if (photo) {
    return (
      <div style={circleStyle}>
        <img
          src={photo}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        ...circleStyle,
        background: 'rgba(255,255,255,0.06)',
        border: '3px solid rgba(255,255,255,0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span
        style={{
          fontSize,
          fontWeight: 700,
          color,
          fontFamily,
          lineHeight: 1,
        }}
      >
        {fallbackText}
      </span>
    </div>
  );
}
