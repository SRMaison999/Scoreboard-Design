import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';

const mockUpdateStyle = vi.fn();
const mockField = {
  id: 'field-1',
  label: 'Test',
  x: 0,
  y: 0,
  width: 100,
  height: 50,
  zIndex: 1,
  locked: false,
  visible: true,
  lockAspectRatio: false,
  scaleContent: false,
  initialWidth: 100,
  initialHeight: 50,
  element: {
    type: 'text-block' as const,
    config: {
      content: '',
      fontSize: 16,
      fontWeight: 400,
      fontFamily: 'Inter',
      textAlign: 'left' as const,
      textTransform: 'none' as const,
      letterSpacing: 0,
    },
  },
  style: {
    backgroundColor: '',
    backgroundOpacity: 0,
    borderColor: '',
    borderWidth: 0,
    borderRadius: 0,
    padding: 0,
    opacity: 100,
    shadow: null,
    backdropBlur: 0,
  },
};

let fieldsOverride: typeof mockField[] | undefined;

vi.mock('@/stores/scoreboardStore', () => ({
  useScoreboardStore: vi.fn((selector: unknown) => {
    if (typeof selector === 'function') {
      return (selector as (s: unknown) => unknown)({
        customFieldsData: { fields: fieldsOverride ?? [mockField] },
        updateCustomFieldStyle: mockUpdateStyle,
      });
    }
    return undefined;
  }),
}));

describe('FieldEffectsEditor', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    fieldsOverride = undefined;
  });

  it('retourne null quand le champ est introuvable', async () => {
    const { FieldEffectsEditor } = await import('../FieldEffectsEditor');
    fieldsOverride = [];
    const { container } = render(<FieldEffectsEditor fieldId="inexistant" />);
    expect(container.innerHTML).toBe('');
  });

  it('affiche le curseur d\'opacite globale', async () => {
    const { FieldEffectsEditor } = await import('../FieldEffectsEditor');
    render(<FieldEffectsEditor fieldId="field-1" />);
    expect(
      screen.getByText(CUSTOM_FIELD_LABELS.effectOpacity),
    ).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('affiche la case a cocher pour activer l\'ombre portee', async () => {
    const { FieldEffectsEditor } = await import('../FieldEffectsEditor');
    render(<FieldEffectsEditor fieldId="field-1" />);
    expect(
      screen.getByText(CUSTOM_FIELD_LABELS.effectShadowEnable),
    ).toBeInTheDocument();
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('affiche le curseur de flou d\'arriere-plan', async () => {
    const { FieldEffectsEditor } = await import('../FieldEffectsEditor');
    render(<FieldEffectsEditor fieldId="field-1" />);
    expect(
      screen.getByText(CUSTOM_FIELD_LABELS.effectBackdropBlur),
    ).toBeInTheDocument();
    expect(screen.getByText('0px')).toBeInTheDocument();
  });

  it('affiche le titre de la section effets visuels', async () => {
    const { FieldEffectsEditor } = await import('../FieldEffectsEditor');
    render(<FieldEffectsEditor fieldId="field-1" />);
    expect(
      screen.getByText(CUSTOM_FIELD_LABELS.effectsTitle),
    ).toBeInTheDocument();
  });
});
