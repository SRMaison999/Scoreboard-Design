import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AlignmentDiagnosticOverlay } from '../AlignmentDiagnosticOverlay';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import type { CustomField } from '@/types/customField';

function makeField(overrides: Partial<CustomField> & { id: string }): CustomField {
  return {
    label: overrides.id,
    x: 0, y: 0, width: 100, height: 100,
    rotation: 0, zIndex: 1, locked: false, visible: true,
    lockAspectRatio: false, scaleContent: true,
    initialWidth: 100, initialHeight: 100,
    element: { type: 'shape-block', config: { shape: 'rectangle', fillColor: '#fff', fillOpacity: 100, borderColor: '', borderWidth: 0, borderRadius: 0 } },
    style: { backgroundColor: '', backgroundOpacity: 0, borderColor: '', borderWidth: 0, borderRadius: 0, borderOpacity: 100 },
    ...overrides,
  } as CustomField;
}

describe('AlignmentDiagnosticOverlay', () => {
  beforeEach(() => {
    useScoreboardStore.getState().resetState();
  });

  it('affiche l\'overlay quand des alignements existent', () => {
    const selected = makeField({ id: 'a', x: 0, y: 50 });
    const other = makeField({ id: 'b', x: 0, y: 200 });

    render(
      <AlignmentDiagnosticOverlay
        field={selected}
        fields={[selected, other]}
        canvasWidth={1920}
        canvasHeight={1080}
      />,
    );

    expect(screen.getByTestId('alignment-diagnostic-overlay')).toBeInTheDocument();
  });

  it('affiche des badges cliquables pour les quasi-alignements', () => {
    const selected = makeField({ id: 'a', x: 103, y: 50 });
    const other = makeField({ id: 'b', x: 100, y: 200 });

    render(
      <AlignmentDiagnosticOverlay
        field={selected}
        fields={[selected, other]}
        canvasWidth={1920}
        canvasHeight={1080}
      />,
    );

    const badges = screen.getAllByTestId('alignment-fix-badge');
    expect(badges.length).toBeGreaterThan(0);
    expect(badges.some((b) => b.textContent?.includes('3px'))).toBe(true);
  });

  it('ne rend rien quand aucun alignement n\'est détecté', () => {
    const selected = makeField({ id: 'a', x: 500, y: 500 });

    const { container } = render(
      <AlignmentDiagnosticOverlay
        field={selected}
        fields={[selected]}
        canvasWidth={1920}
        canvasHeight={1080}
      />,
    );

    expect(container.querySelector('[data-testid="alignment-diagnostic-overlay"]')).toBeNull();
  });

  it('le clic sur un badge appelle updateCustomFieldPosition', () => {
    /* Ajouter un champ dans le store pour que updateCustomFieldPosition fonctionne */
    const store = useScoreboardStore.getState();
    store.update('bodyType', 14);
    const element = {
      type: 'shape-block' as const,
      config: { shape: 'rectangle' as const, fillColor: '#fff', fillOpacity: 100, borderColor: '', borderWidth: 0, borderRadius: 0 },
    };
    store.addCustomField(element, 103, 50, 100, 100);

    const fields = useScoreboardStore.getState().customFieldsData.fields;
    const selected = fields[0]!;

    const other = makeField({ id: 'b', x: 100, y: 200 });

    render(
      <AlignmentDiagnosticOverlay
        field={selected}
        fields={[selected, other]}
        canvasWidth={1920}
        canvasHeight={1080}
      />,
    );

    const badges = screen.getAllByTestId('alignment-fix-badge');
    const badge3px = badges.find((b) => b.textContent?.includes('3px'));
    expect(badge3px).toBeDefined();

    fireEvent.click(badge3px!);

    /* Vérifier que la position a été corrigée */
    const updated = useScoreboardStore.getState().customFieldsData.fields[0]!;
    expect(updated.x).toBe(100);
  });
});
