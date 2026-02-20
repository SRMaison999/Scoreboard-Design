import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { EmbeddedBodyType } from '../FieldEmbeddedBodyType';
import { DEFAULT_STATE } from '@/data/defaultState';
import { DEFAULT_COLORS, DEFAULT_OPACITIES } from '@/constants/colors';

const defaultProps = {
  state: DEFAULT_STATE,
  colors: DEFAULT_COLORS,
  opacities: DEFAULT_OPACITIES,
};

describe('EmbeddedBodyType', () => {
  it('rend le body type 1 sans erreur', () => {
    const { container } = render(
      <EmbeddedBodyType bodyTypeId={1} {...defaultProps} />,
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('rend le body type 8 sans erreur', () => {
    const { container } = render(
      <EmbeddedBodyType bodyTypeId={8} {...defaultProps} />,
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('retourne null pour un body type inconnu', () => {
    const { container } = render(
      <EmbeddedBodyType bodyTypeId={99} {...defaultProps} />,
    );
    expect(container.innerHTML).toBe('');
  });
});
