import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BodyType10 } from '@/components/preview/body/BodyType10';
import { DEFAULT_TIMELINE_DATA } from '@/types/bodyTypes/timeline';
import { DEFAULT_STATE } from '@/data/defaultState';

const baseProps = {
  timelineData: DEFAULT_TIMELINE_DATA,
  showPenalties: false,
  colors: DEFAULT_STATE.colors,
  opacities: DEFAULT_STATE.opacities,
  fontBody: DEFAULT_STATE.fontBody,
} as const;

describe('BodyType10', () => {
  it('affiche le titre', () => {
    render(<BodyType10 {...baseProps} />);
    expect(screen.getByText('MATCH EVENTS')).toBeInTheDocument();
  });

  it('affiche les événements', () => {
    render(<BodyType10 {...baseProps} />);
    expect(screen.getByText('04:22')).toBeInTheDocument();
    expect(screen.getByText(/KOPITAR/)).toBeInTheDocument();
  });

  it('affiche les symboles de type', () => {
    render(<BodyType10 {...baseProps} />);
    const goalSymbols = screen.getAllByText('G');
    expect(goalSymbols.length).toBeGreaterThanOrEqual(1);
  });

  it('gère une timeline vide', () => {
    const props = {
      ...baseProps,
      timelineData: { title: 'TEST', events: [] },
    };
    const { container } = render(<BodyType10 {...props} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
