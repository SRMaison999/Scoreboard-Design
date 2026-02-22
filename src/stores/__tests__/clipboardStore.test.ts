import { describe, it, expect, beforeEach } from 'vitest';
import { useClipboardStore } from '../clipboardStore';
import { DEFAULT_FIELD_STYLE } from '@/types/customField';
import type { CustomField, FieldElementConfig } from '@/types/customField';

function makeField(id: string): CustomField {
  const element: FieldElementConfig = {
    type: 'text-block',
    config: {
      content: 'test',
      fontSize: 20,
      fontWeight: 400,
      fontFamily: '',
      textAlign: 'center',
      textTransform: 'none',
      letterSpacing: 0,
      textColor: '#ffffff',
    },
  };
  return {
    id,
    label: `Champ ${id}`,
    x: 100,
    y: 200,
    width: 200,
    height: 80,
    rotation: 0,
    zIndex: 1,
    locked: false,
    visible: true,
    lockAspectRatio: false,
    scaleContent: true,
    initialWidth: 200,
    initialHeight: 80,
    element,
    style: { ...DEFAULT_FIELD_STYLE },
  };
}

describe('clipboardStore', () => {
  beforeEach(() => {
    useClipboardStore.setState({ copiedFields: [], pasteCount: 0 });
  });

  it('commence avec un presse-papiers vide', () => {
    const state = useClipboardStore.getState();
    expect(state.copiedFields).toHaveLength(0);
    expect(state.pasteCount).toBe(0);
  });

  it('copie des champs en deep copy', () => {
    const original = makeField('f1');
    useClipboardStore.getState().copyFields([original]);

    const { copiedFields } = useClipboardStore.getState();
    expect(copiedFields).toHaveLength(1);
    expect(copiedFields[0]?.id).toBe('f1');
    expect(copiedFields[0]).not.toBe(original);
  });

  it('r\u00e9initialise le compteur de collage lors de la copie', () => {
    useClipboardStore.setState({ pasteCount: 3 });
    useClipboardStore.getState().copyFields([makeField('f1')]);
    expect(useClipboardStore.getState().pasteCount).toBe(0);
  });

  it('incr\u00e9mente le compteur de collage', () => {
    useClipboardStore.getState().incrementPasteCount();
    expect(useClipboardStore.getState().pasteCount).toBe(1);
    useClipboardStore.getState().incrementPasteCount();
    expect(useClipboardStore.getState().pasteCount).toBe(2);
  });

  it('r\u00e9initialise le compteur de collage', () => {
    useClipboardStore.setState({ pasteCount: 5 });
    useClipboardStore.getState().resetPasteCount();
    expect(useClipboardStore.getState().pasteCount).toBe(0);
  });

  it('vide le presse-papiers', () => {
    useClipboardStore.getState().copyFields([makeField('f1'), makeField('f2')]);
    expect(useClipboardStore.getState().copiedFields).toHaveLength(2);

    useClipboardStore.getState().clear();
    expect(useClipboardStore.getState().copiedFields).toHaveLength(0);
    expect(useClipboardStore.getState().pasteCount).toBe(0);
  });

  it('copie plusieurs champs', () => {
    const fields = [makeField('a'), makeField('b'), makeField('c')];
    useClipboardStore.getState().copyFields(fields);
    expect(useClipboardStore.getState().copiedFields).toHaveLength(3);
  });

  it('remplace les champs copi\u00e9s lors d\u2019une nouvelle copie', () => {
    useClipboardStore.getState().copyFields([makeField('old')]);
    expect(useClipboardStore.getState().copiedFields[0]?.id).toBe('old');

    useClipboardStore.getState().copyFields([makeField('new')]);
    expect(useClipboardStore.getState().copiedFields).toHaveLength(1);
    expect(useClipboardStore.getState().copiedFields[0]?.id).toBe('new');
  });

  it('effectue une copie profonde ind\u00e9pendante de l\u2019original', () => {
    const original = makeField('f1');
    useClipboardStore.getState().copyFields([original]);

    /* Modifier l'original ne doit pas affecter la copie */
    original.x = 999;
    original.label = 'modifi\u00e9';

    const { copiedFields } = useClipboardStore.getState();
    expect(copiedFields[0]?.x).toBe(100);
    expect(copiedFields[0]?.label).toBe('Champ f1');
  });
});
