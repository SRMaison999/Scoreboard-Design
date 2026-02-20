/**
 * Champ texte inline \u00e9ditable sur le canvas du scoreboard.
 * Double-clic pour entrer en mode \u00e9dition, Enter ou blur pour valider, Escape pour annuler.
 * Rendu dans le canvas (inline styles autoris\u00e9s).
 */

import { useState, useRef, useCallback, useEffect } from 'react';

interface InlineEditProps {
  /** Valeur actuelle du texte */
  readonly value: string;
  /** Callback appel\u00e9 quand la valeur est valid\u00e9e */
  readonly onCommit: (value: string) => void;
  /** Styles appliqu\u00e9s au texte et \u00e0 l'input */
  readonly style: React.CSSProperties;
  /** data-testid optionnel */
  readonly testId?: string;
}

export function InlineEdit({ value, onCommit, style, testId }: InlineEditProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      });
    }
  }, [editing]);

  const startEdit = useCallback(() => {
    setDraft(value);
    setEditing(true);
  }, [value]);

  const commit = useCallback(() => {
    setEditing(false);
    if (draft !== value) {
      onCommit(draft);
    }
  }, [draft, value, onCommit]);

  const cancel = useCallback(() => {
    setEditing(false);
    setDraft(value);
  }, [value]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    e.stopPropagation();
    if (e.key === 'Enter') {
      commit();
    } else if (e.key === 'Escape') {
      cancel();
    }
  }, [commit, cancel]);

  if (editing) {
    return (
      <input
        ref={inputRef}
        data-testid={testId ? `${testId}-input` : undefined}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={handleKeyDown}
        onPointerDown={(e) => e.stopPropagation()}
        style={{
          ...style,
          background: 'rgba(56, 189, 248, 0.15)',
          border: '2px solid rgba(56, 189, 248, 0.6)',
          borderRadius: 4,
          outline: 'none',
          padding: '0 4px',
          margin: 0,
          boxSizing: 'border-box',
          width: '100%',
          minWidth: 40,
        }}
      />
    );
  }

  return (
    <div
      data-testid={testId}
      onDoubleClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        startEdit();
      }}
      style={{
        ...style,
        cursor: 'default',
      }}
    >
      {value}
    </div>
  );
}
