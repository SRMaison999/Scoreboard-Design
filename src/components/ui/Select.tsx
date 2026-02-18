import { type SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  readonly value: string;
  readonly label: string;
  readonly style?: React.CSSProperties;
}

export interface SelectOptionGroup {
  readonly label: string;
  readonly options: readonly SelectOption[];
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  readonly label?: string;
  readonly options: readonly SelectOption[];
  readonly groups?: readonly SelectOptionGroup[];
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly placeholder?: string;
}

function OptionList({ options }: { readonly options: readonly SelectOption[] }) {
  return (
    <>
      {options.map((o) => (
        <option key={o.value} value={o.value} style={o.style}>
          {o.label}
        </option>
      ))}
    </>
  );
}

export function Select({
  label,
  options,
  groups,
  value,
  onChange,
  placeholder,
  className,
  ...props
}: SelectProps) {
  return (
    <div className="flex flex-col gap-0.5">
      {label && (
        <label className="text-[11px] text-gray-400 font-medium">{label}</label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'bg-gray-800 border border-gray-700 rounded-md px-2.5 py-1.5 text-gray-100 text-sm font-[family-name:var(--font-barlow)] outline-none',
          className,
        )}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {groups
          ? groups.map((g) => (
              <optgroup key={g.label} label={g.label}>
                <OptionList options={g.options} />
              </optgroup>
            ))
          : <OptionList options={options} />}
      </select>
    </div>
  );
}
