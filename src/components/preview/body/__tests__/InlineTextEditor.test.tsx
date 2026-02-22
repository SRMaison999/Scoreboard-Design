import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { InlineTextEditor } from '../InlineTextEditor';
import type { TextBlockConfig } from '@/types/customField';

const DEFAULT_CONFIG: TextBlockConfig = {
  content: 'Texte initial',
  fontSize: 24,
  fontWeight: 600,
  fontFamily: '',
  textAlign: 'center',
  textTransform: 'none',
  letterSpacing: 0,
  textColor: '#ffffff',
};

describe('InlineTextEditor', () => {
  it('rend le contenu du texte', () => {
    render(
      <InlineTextEditor
        config={DEFAULT_CONFIG}
        originalContent="Texte initial"
        onCommit={vi.fn()}
        onCancel={vi.fn()}
      />,
    );
    expect(screen.getByTestId('inline-text-editor')).toBeInTheDocument();
    expect(screen.getByTestId('inline-text-editor').textContent).toBe('Texte initial');
  });

  it('rend un element contentEditable', () => {
    render(
      <InlineTextEditor
        config={DEFAULT_CONFIG}
        originalContent="Texte initial"
        onCommit={vi.fn()}
        onCancel={vi.fn()}
      />,
    );
    const editor = screen.getByTestId('inline-text-editor');
    expect(editor).toHaveAttribute('contenteditable', 'true');
  });

  it('appelle onCommit au blur avec le contenu actuel', () => {
    const onCommit = vi.fn();
    render(
      <InlineTextEditor
        config={DEFAULT_CONFIG}
        originalContent="Texte initial"
        onCommit={onCommit}
        onCancel={vi.fn()}
      />,
    );
    const editor = screen.getByTestId('inline-text-editor');
    fireEvent.blur(editor);
    expect(onCommit).toHaveBeenCalledWith('Texte initial');
  });

  it('appelle onCancel sur la touche Escape', () => {
    const onCancel = vi.fn();
    render(
      <InlineTextEditor
        config={DEFAULT_CONFIG}
        originalContent="Texte initial"
        onCommit={vi.fn()}
        onCancel={onCancel}
      />,
    );
    const editor = screen.getByTestId('inline-text-editor');
    fireEvent.keyDown(editor, { key: 'Escape' });
    expect(onCancel).toHaveBeenCalled();
  });

  it('ne sort pas du mode edition sur Enter', () => {
    const onCommit = vi.fn();
    const onCancel = vi.fn();
    render(
      <InlineTextEditor
        config={DEFAULT_CONFIG}
        originalContent="Texte initial"
        onCommit={onCommit}
        onCancel={onCancel}
      />,
    );
    const editor = screen.getByTestId('inline-text-editor');
    fireEvent.keyDown(editor, { key: 'Enter' });
    expect(onCommit).not.toHaveBeenCalled();
    expect(onCancel).not.toHaveBeenCalled();
  });

  it('applique les styles de police corrects', () => {
    const config: TextBlockConfig = {
      ...DEFAULT_CONFIG,
      fontSize: 36,
      fontWeight: 700,
      textAlign: 'left',
      textTransform: 'uppercase',
      letterSpacing: 2,
    };
    render(
      <InlineTextEditor
        config={config}
        originalContent="Test"
        onCommit={vi.fn()}
        onCancel={vi.fn()}
      />,
    );
    const editor = screen.getByTestId('inline-text-editor');
    expect(editor.style.fontSize).toBe('36px');
    expect(editor.style.fontWeight).toBe('700');
    expect(editor.style.textTransform).toBe('uppercase');
    expect(editor.style.letterSpacing).toBe('2px');
  });

  it('a le role textbox et aria-multiline', () => {
    render(
      <InlineTextEditor
        config={DEFAULT_CONFIG}
        originalContent="Texte"
        onCommit={vi.fn()}
        onCancel={vi.fn()}
      />,
    );
    const editor = screen.getByRole('textbox');
    expect(editor).toHaveAttribute('aria-multiline', 'true');
  });

  it('arrete la propagation du pointerDown', () => {
    render(
      <InlineTextEditor
        config={DEFAULT_CONFIG}
        originalContent="Texte"
        onCommit={vi.fn()}
        onCancel={vi.fn()}
      />,
    );
    const editor = screen.getByTestId('inline-text-editor');
    const event = new MouseEvent('pointerdown', { bubbles: true });
    const stopPropagation = vi.spyOn(event, 'stopPropagation');
    fireEvent(editor, event);
    expect(stopPropagation).toHaveBeenCalled();
  });
});
