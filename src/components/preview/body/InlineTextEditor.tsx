/**
 * Editeur inline pour les blocs de texte sur le canvas.
 * Remplace le contenu statique par un div contentEditable
 * qui conserve la meme police, taille et alignement.
 * Rendu sur le canvas : inline styles autorises.
 */

import { useCallback, useEffect, useRef } from 'react';
import type { TextBlockConfig } from '@/types/customField';

interface InlineTextEditorProps {
  readonly config: TextBlockConfig;
  readonly originalContent: string;
  readonly onCommit: (newContent: string) => void;
  readonly onCancel: () => void;
}

export function InlineTextEditor({
  config,
  originalContent,
  onCommit,
  onCancel,
}: InlineTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  /* Auto-focus et selection de tout le texte a l'entree en mode edition */
  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    el.focus();
    const selection = window.getSelection();
    if (selection) {
      const range = document.createRange();
      range.selectNodeContents(el);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, []);

  const handleBlur = useCallback(() => {
    const el = editorRef.current;
    if (!el) return;
    onCommit(el.textContent ?? '');
  }, [onCommit]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        /* Restaurer le contenu original avant le blur */
        const el = editorRef.current;
        if (el) {
          el.textContent = originalContent;
        }
        onCancel();
      }
      /* Enter ajoute un retour a la ligne (comportement par defaut de contentEditable) */
      /* On laisse passer sans interference */
      /* Empecher la propagation des touches pour ne pas interferer avec les raccourcis du canvas */
      e.stopPropagation();
    },
    [onCancel, originalContent],
  );

  /* Empecher la propagation des clics pour ne pas declencher la deselection du canvas */
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <div
      ref={editorRef}
      data-testid="inline-text-editor"
      contentEditable
      suppressContentEditableWarning
      role="textbox"
      aria-multiline="true"
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: config.textAlign,
        fontSize: config.fontSize,
        fontWeight: config.fontWeight,
        fontFamily: config.fontFamily || undefined,
        textAlign: config.textAlign,
        textTransform: config.textTransform,
        letterSpacing: config.letterSpacing,
        color: '#ffffff',
        overflow: 'hidden',
        whiteSpace: 'pre-wrap',
        outline: 'none',
        cursor: 'text',
        caretColor: '#38bdf8',
      }}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
    >
      {config.content}
    </div>
  );
}
