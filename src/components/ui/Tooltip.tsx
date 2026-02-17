import { useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TooltipProps {
  readonly text: string;
  readonly children: ReactNode;
  readonly position?: 'right' | 'bottom';
}

export function Tooltip({ text, children, position = 'right' }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          role="tooltip"
          className={cn(
            'absolute z-50 whitespace-nowrap rounded px-2 py-1 text-xs',
            'bg-gray-800 text-gray-200 border border-gray-700 shadow-lg',
            'pointer-events-none',
            position === 'right' && 'left-full top-1/2 -translate-y-1/2 ml-2',
            position === 'bottom' && 'top-full left-1/2 -translate-x-1/2 mt-2',
          )}
        >
          {text}
        </div>
      )}
    </div>
  );
}
