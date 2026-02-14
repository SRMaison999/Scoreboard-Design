import { type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'danger' | 'ghost' | 'add';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: ButtonVariant;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-green-900 text-white font-bold',
  danger: 'bg-red-900 text-red-300',
  ghost: 'bg-gray-800 border border-gray-700 text-gray-400',
  add: 'bg-blue-950 border border-blue-600 text-blue-300 w-full',
};

export function Button({ variant = 'ghost', className, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'rounded-md px-3 py-1.5 cursor-pointer text-sm',
        VARIANT_CLASSES[variant],
        className,
      )}
      {...props}
    />
  );
}
