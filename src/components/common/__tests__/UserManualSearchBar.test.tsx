import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserManualSearchBar } from '../UserManualSearchBar';
import { EDITOR_LABELS } from '@/constants/labels';

const defaultProps = {
  query: '',
  totalMatchCount: 0,
  resultCount: 0,
  isSearchActive: false,
  onQueryChange: vi.fn(),
  onClear: vi.fn(),
};

describe('UserManualSearchBar', () => {
  it('affiche le champ de recherche avec le placeholder', () => {
    render(<UserManualSearchBar {...defaultProps} />);
    const input = screen.getByTestId('manual-search-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', EDITOR_LABELS.userManualSearchPlaceholder);
  });

  it('appelle onQueryChange lors de la saisie', () => {
    const onQueryChange = vi.fn();
    render(<UserManualSearchBar {...defaultProps} onQueryChange={onQueryChange} />);
    const input = screen.getByTestId('manual-search-input');
    fireEvent.change(input, { target: { value: 'score' } });
    expect(onQueryChange).toHaveBeenCalledWith('score');
  });

  it('affiche le bouton de suppression quand la requete est non vide', () => {
    render(<UserManualSearchBar {...defaultProps} query="test" />);
    expect(screen.getByTestId('manual-search-clear')).toBeInTheDocument();
  });

  it('masque le bouton de suppression quand la requete est vide', () => {
    render(<UserManualSearchBar {...defaultProps} query="" />);
    expect(screen.queryByTestId('manual-search-clear')).not.toBeInTheDocument();
  });

  it('appelle onClear au clic sur le bouton de suppression', () => {
    const onClear = vi.fn();
    render(<UserManualSearchBar {...defaultProps} query="test" onClear={onClear} />);
    fireEvent.click(screen.getByTestId('manual-search-clear'));
    expect(onClear).toHaveBeenCalled();
  });

  it('affiche le resume des resultats quand la recherche est active', () => {
    render(
      <UserManualSearchBar
        {...defaultProps}
        isSearchActive={true}
        totalMatchCount={12}
        resultCount={3}
      />,
    );
    const summary = screen.getByTestId('manual-search-summary');
    expect(summary).toBeInTheDocument();
    expect(summary.textContent).toContain('12');
    expect(summary.textContent).toContain('3');
  });

  it('affiche un message quand aucun resultat', () => {
    render(
      <UserManualSearchBar
        {...defaultProps}
        isSearchActive={true}
        totalMatchCount={0}
        resultCount={0}
      />,
    );
    const summary = screen.getByTestId('manual-search-summary');
    expect(summary.textContent).toContain(EDITOR_LABELS.userManualSearchNoResults);
  });

  it('masque le resume quand la recherche est inactive', () => {
    render(<UserManualSearchBar {...defaultProps} isSearchActive={false} />);
    expect(screen.queryByTestId('manual-search-summary')).not.toBeInTheDocument();
  });
});
