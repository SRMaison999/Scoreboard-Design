/**
 * Barre flottante de contrôle de taille de police.
 * Apparaît au-dessus du champ sélectionné sur le canvas.
 * Rendu dans le canvas (inline styles autorisés).
 *
 * - Maintenir +/- enfoncé : répétition accélérée
 * - Cliquer sur la valeur : saisie directe au clavier
 * - Molette sur le champ : ajuste la taille
 */

import { useState, useRef, useCallback } from 'react';
import { Minus, Plus } from 'lucide-react';
import { usePressRepeat } from '@/hooks/usePressRepeat';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';

interface FieldFontToolbarProps {
  readonly fontSize: number;
  readonly isGlobal: boolean;
  readonly fieldX: number;
  readonly fieldY: number;
  readonly fieldWidth: number;
  readonly canvasScale: number;
  readonly onIncrease: () => void;
  readonly onDecrease: () => void;
  readonly onSetFontSize: (size: number) => void;
}

const TOOLBAR_GAP = 6;

export function FieldFontToolbar({
  fontSize,
  isGlobal,
  fieldX,
  fieldY,
  fieldWidth,
  canvasScale,
  onIncrease,
  onDecrease,
  onSetFontSize,
}: FieldFontToolbarProps) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const cancelledRef = useRef(false);

  const incRepeat = usePressRepeat(onIncrease);
  const decRepeat = usePressRepeat(onDecrease);

  const startEdit = useCallback(() => {
    setEditValue(String(Math.round(fontSize)));
    setEditing(true);
    cancelledRef.current = false;
    requestAnimationFrame(() => {
      inputRef.current?.select();
    });
  }, [fontSize]);

  const commitEdit = useCallback(() => {
    if (cancelledRef.current) {
      cancelledRef.current = false;
      return;
    }
    setEditing(false);
    const parsed = parseInt(editValue, 10);
    if (!isNaN(parsed) && parsed >= 8 && parsed <= 300) {
      onSetFontSize(parsed);
    }
  }, [editValue, onSetFontSize]);

  const handleEditKeyDown = useCallback((e: React.KeyboardEvent) => {
    e.stopPropagation();
    if (e.key === 'Enter') {
      commitEdit();
    } else if (e.key === 'Escape') {
      cancelledRef.current = true;
      setEditing(false);
    }
  }, [commitEdit]);

  /* Positionnement au-dessus du champ, centré horizontalement */
  const toolbarTop = fieldY - (28 + TOOLBAR_GAP) / canvasScale;
  const showBelow = toolbarTop < 0;
  const inverseScale = 1 / canvasScale;

  const top = showBelow
    ? fieldY - TOOLBAR_GAP / canvasScale
    : fieldY;
  const translateY = showBelow ? '8px' : `calc(-100% - ${TOOLBAR_GAP}px)`;

  const btnStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    border: 'none',
    borderRadius: 5,
    backgroundColor: 'transparent',
    color: '#94a3b8',
    cursor: 'pointer',
  };

  return (
    <div
      data-testid="field-font-toolbar"
      style={{
        position: 'absolute',
        left: fieldX + fieldWidth / 2,
        top,
        transform: `translate(-50%, ${translateY}) scale(${inverseScale})`,
        transformOrigin: 'center bottom',
        zIndex: 10000,
        pointerEvents: 'auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          backgroundColor: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid rgba(56, 189, 248, 0.5)',
          borderRadius: 8,
          padding: '4px 8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
          whiteSpace: 'nowrap',
        }}
      >
        <button
          type="button"
          title={CUSTOM_FIELD_LABELS.fontToolbarDecrease}
          onPointerDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
            decRepeat.start();
          }}
          onPointerUp={decRepeat.stop}
          onPointerLeave={decRepeat.stop}
          style={btnStyle}
        >
          <Minus size={16} />
        </button>

        {editing ? (
          <input
            ref={inputRef}
            data-testid="font-size-input"
            type="number"
            min={8}
            max={300}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={commitEdit}
            onKeyDown={handleEditKeyDown}
            onPointerDown={(e) => e.stopPropagation()}
            style={{
              width: 48,
              fontSize: 14,
              fontWeight: 600,
              fontFamily: 'monospace',
              textAlign: 'center',
              color: '#e2e8f0',
              backgroundColor: 'rgba(56, 189, 248, 0.15)',
              border: '1px solid rgba(56, 189, 248, 0.5)',
              borderRadius: 3,
              padding: '1px 2px',
              outline: 'none',
            }}
          />
        ) : (
          <span
            data-testid="font-size-display"
            onClick={(e) => {
              e.stopPropagation();
              startEdit();
            }}
            onPointerDown={(e) => e.stopPropagation()}
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: isGlobal ? '#64748b' : '#e2e8f0',
              minWidth: 42,
              textAlign: 'center',
              fontFamily: 'monospace',
              userSelect: 'none',
              cursor: 'text',
              padding: '2px 4px',
              borderRadius: 3,
            }}
            title={isGlobal ? CUSTOM_FIELD_LABELS.fontToolbarGlobalHint : CUSTOM_FIELD_LABELS.fontToolbarClickToEdit}
          >
            {Math.round(fontSize)}
          </span>
        )}

        <button
          type="button"
          title={CUSTOM_FIELD_LABELS.fontToolbarIncrease}
          onPointerDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
            incRepeat.start();
          }}
          onPointerUp={incRepeat.stop}
          onPointerLeave={incRepeat.stop}
          style={btnStyle}
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}
