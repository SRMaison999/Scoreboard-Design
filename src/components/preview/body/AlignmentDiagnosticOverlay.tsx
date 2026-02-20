/**
 * Overlay de diagnostic d'alignement sur le canvas.
 * Affiche les lignes d'alignement exactes (vert) et quasi-alignements (ambre)
 * avec des badges cliquables pour corriger les quasi-alignements.
 * Rendu sur le canvas (inline styles autorisés).
 */

import { useMemo, memo, useCallback } from 'react';
import { detectAlignments } from '@/utils/fieldAlignmentCheck';
import type { AlignmentDiagnostic } from '@/utils/fieldAlignmentCheck';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import type { CustomField } from '@/types/customField';

interface AlignmentDiagnosticOverlayProps {
  readonly field: CustomField;
  readonly fields: readonly CustomField[];
  readonly canvasWidth: number;
  readonly canvasHeight: number;
}

const EXACT_COLOR = 'rgba(74, 222, 128, 0.5)';
const NEAR_COLOR = 'rgba(251, 191, 36, 0.6)';
const BADGE_BG = 'rgba(0, 0, 0, 0.9)';
const BADGE_BORDER = 'rgba(251, 191, 36, 0.8)';
const BADGE_TEXT = 'rgba(251, 191, 36, 1)';

function dashedBg(orientation: 'vertical' | 'horizontal'): React.CSSProperties {
  const dir = orientation === 'vertical' ? 'to bottom' : 'to right';
  return {
    backgroundImage: `repeating-linear-gradient(${dir}, ${NEAR_COLOR} 0px, ${NEAR_COLOR} 4px, transparent 4px, transparent 8px)`,
  };
}

function ExactLine({ diag }: { readonly diag: AlignmentDiagnostic }) {
  const isVert = diag.orientation === 'vertical';
  return (
    <div style={{
      position: 'absolute',
      left: isVert ? diag.position : diag.start,
      top: isVert ? diag.start : diag.position,
      width: isVert ? 1 : diag.end - diag.start,
      height: isVert ? diag.end - diag.start : 1,
      backgroundColor: EXACT_COLOR,
      pointerEvents: 'none',
    }} />
  );
}

function NearMissLine({ diag, onFix }: {
  readonly diag: AlignmentDiagnostic;
  readonly onFix: (x: number, y: number) => void;
}) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFix(diag.fix.x, diag.fix.y);
  };

  const isVert = diag.orientation === 'vertical';
  const midLeft = isVert ? diag.position : (diag.start + diag.end) / 2;
  const midTop = isVert ? (diag.start + diag.end) / 2 : diag.position;

  return (
    <>
      <div style={{
        position: 'absolute',
        left: isVert ? diag.position : diag.start,
        top: isVert ? diag.start : diag.position,
        width: isVert ? 1 : diag.end - diag.start,
        height: isVert ? diag.end - diag.start : 1,
        pointerEvents: 'none',
        ...dashedBg(diag.orientation),
      }} />
      <div
        data-testid="alignment-fix-badge"
        onClick={handleClick}
        onPointerDown={(e) => e.stopPropagation()}
        title={`${CUSTOM_FIELD_LABELS.alignmentFixHint} (${diag.targetLabel})`}
        style={{
          position: 'absolute',
          left: midLeft,
          top: midTop,
          transform: 'translate(-50%, -50%)',
          backgroundColor: BADGE_BG,
          border: `1px solid ${BADGE_BORDER}`,
          borderRadius: 10,
          padding: '2px 8px',
          fontSize: 11,
          fontWeight: 600,
          color: BADGE_TEXT,
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          pointerEvents: 'auto',
          zIndex: 1,
          userSelect: 'none',
        }}
      >
        {Math.abs(diag.delta)}px
      </div>
    </>
  );
}

export const AlignmentDiagnosticOverlay = memo(function AlignmentDiagnosticOverlay({
  field, fields, canvasWidth, canvasHeight,
}: AlignmentDiagnosticOverlayProps) {
  const updatePosition = useScoreboardStore((s) => s.updateCustomFieldPosition);

  const diagnostics = useMemo(
    () => detectAlignments(field, fields, canvasWidth, canvasHeight),
    [field, fields, canvasWidth, canvasHeight],
  );

  const handleFix = useCallback((x: number, y: number) => {
    updatePosition(field.id, x, y);
  }, [updatePosition, field.id]);

  if (diagnostics.length === 0) return null;

  const exact = diagnostics.filter((d) => d.exact);
  const nearMiss = diagnostics.filter((d) => !d.exact);

  return (
    <div
      data-testid="alignment-diagnostic-overlay"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 9997 }}
    >
      {exact.map((d, i) => (
        <ExactLine key={`e-${d.orientation}-${d.position}-${i}`} diag={d} />
      ))}
      {nearMiss.map((d, i) => (
        <NearMissLine key={`n-${d.orientation}-${d.position}-${i}`} diag={d} onFix={handleFix} />
      ))}
    </div>
  );
});
