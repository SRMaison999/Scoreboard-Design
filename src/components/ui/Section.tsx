import { useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  readonly title: string;
  readonly defaultOpen?: boolean;
  readonly children: ReactNode;
}

export function Section({ title, defaultOpen = true, children }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={cn('flex flex-col', open ? 'gap-2' : 'gap-0')}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between border-b border-gray-800 pb-1 cursor-pointer"
      >
        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
          {title}
        </span>
        <span className="text-[10px] text-gray-600">
          {open ? 'v' : '>'}
        </span>
      </button>
      {open && children}
    </div>
  );
}
