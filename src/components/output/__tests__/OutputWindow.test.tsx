import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { OutputWindow } from '@/components/output/OutputWindow';

describe('OutputWindow', () => {
  beforeEach(() => {
    const MockBroadcastChannel = vi.fn(function (this: { onmessage: null; postMessage: ReturnType<typeof vi.fn>; close: ReturnType<typeof vi.fn> }) {
      this.onmessage = null;
      this.postMessage = vi.fn();
      this.close = vi.fn();
    });
    vi.stubGlobal('BroadcastChannel', MockBroadcastChannel);
  });

  it('affiche le message d attente avant connexion', () => {
    render(<OutputWindow />);
    expect(screen.getByText('En attente de connexion...')).toBeInTheDocument();
  });
});
