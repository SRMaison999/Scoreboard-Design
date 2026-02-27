import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  StaffRowElement,
  StaffListElement,
  DataTableElement,
} from '@/components/preview/body/FieldTeamElements';

describe('StaffRowElement', () => {
  it('affiche un placeholder lorsque les donn\u00e9es sont vides', () => {
    render(
      <StaffRowElement
        element={{ config: { role: '', name: '', fontSize: 20, fontFamily: '', textColor: '#ffffff' } }}
      />,
    );
    expect(screen.getByText('Membre du staff')).toBeInTheDocument();
  });

  it('affiche le r\u00f4le et le nom', () => {
    render(
      <StaffRowElement
        element={{ config: { role: 'Entra\u00eeneur', name: 'MARTIN', fontSize: 20, fontFamily: '', textColor: '#ffffff' } }}
      />,
    );
    expect(screen.getByText('Entra\u00eeneur')).toBeInTheDocument();
    expect(screen.getByText('MARTIN')).toBeInTheDocument();
  });
});

describe('StaffListElement', () => {
  it('affiche un placeholder lorsque la liste est vide et sans titre', () => {
    render(
      <StaffListElement
        element={{ config: { title: '', members: [], fontSize: 18, fontFamily: '', textColor: '#ffffff', titleColor: '#ffffff' } }}
      />,
    );
    expect(screen.getByText('Liste du staff')).toBeInTheDocument();
  });

  it('affiche le titre et les membres', () => {
    render(
      <StaffListElement
        element={{ config: {
          title: 'STAFF TECHNIQUE',
          members: [
            { role: 'Entra\u00eeneur', name: 'MARTIN' },
            { role: 'Adjoint', name: 'DUPONT' },
          ],
          fontSize: 18, fontFamily: '', textColor: '#ffffff', titleColor: '#ffffff',
        } }}
      />,
    );
    expect(screen.getByText('STAFF TECHNIQUE')).toBeInTheDocument();
    expect(screen.getByText('MARTIN')).toBeInTheDocument();
    expect(screen.getByText('DUPONT')).toBeInTheDocument();
  });
});

describe('DataTableElement', () => {
  it('affiche un placeholder lorsqu\u2019il n\u2019y a pas de colonnes', () => {
    render(
      <DataTableElement
        element={{ config: { title: '', columns: [], rows: [], showHeader: true, fontSize: 16, fontFamily: '', headerColor: '#ffffff', textColor: '#ffffff' } }}
      />,
    );
    expect(screen.getByText('Tableau de donn\u00e9es')).toBeInTheDocument();
  });

  it('affiche le titre, les en-t\u00eates et les donn\u00e9es', () => {
    render(
      <DataTableElement
        element={{ config: {
          title: 'CLASSEMENT',
          columns: [
            { id: 'team', label: '\u00c9quipe', align: 'left' },
            { id: 'pts', label: 'PTS', align: 'center' },
          ],
          rows: [
            { values: { team: 'SVK', pts: '9' }, highlighted: false },
            { values: { team: 'CZE', pts: '6' }, highlighted: true },
          ],
          showHeader: true, fontSize: 16, fontFamily: '', headerColor: '#ffffff', textColor: '#ffffff',
        } }}
      />,
    );
    expect(screen.getByText('CLASSEMENT')).toBeInTheDocument();
    expect(screen.getByText('\u00c9quipe')).toBeInTheDocument();
    expect(screen.getByText('PTS')).toBeInTheDocument();
    expect(screen.getByText('SVK')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument();
    expect(screen.getByText('CZE')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
  });

  it('masque les en-t\u00eates si showHeader est false', () => {
    render(
      <DataTableElement
        element={{ config: {
          title: '',
          columns: [{ id: 'a', label: 'COL_A', align: 'left' }],
          rows: [{ values: { a: 'val' }, highlighted: false }],
          showHeader: false, fontSize: 16, fontFamily: '', headerColor: '#ffffff', textColor: '#ffffff',
        } }}
      />,
    );
    expect(screen.queryByText('COL_A')).not.toBeInTheDocument();
    expect(screen.getByText('val')).toBeInTheDocument();
  });
});
