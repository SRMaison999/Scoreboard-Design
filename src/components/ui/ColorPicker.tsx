interface ColorPickerProps {
  readonly label: string;
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly opacity?: number;
  readonly onOpacityChange?: (value: number) => void;
}

export function ColorPicker({
  label,
  value,
  onChange,
  opacity = 0,
  onOpacityChange,
}: ColorPickerProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value || '#ffffff'}
          onChange={(e) => onChange(e.target.value)}
          className="w-7 h-7 border border-gray-700 rounded cursor-pointer bg-transparent p-0"
        />
        <span className="text-xs text-gray-300 flex-1">{label}</span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-[72px] bg-gray-800 border border-gray-700 rounded px-1.5 py-0.5 text-gray-400 text-[11px] font-mono outline-none"
        />
      </div>
      {onOpacityChange && (
        <div className="flex items-center gap-1.5 pl-9">
          <input
            type="range"
            min={0}
            max={100}
            value={opacity}
            onChange={(e) => onOpacityChange(parseInt(e.target.value))}
            className="flex-1 h-1 accent-sky-300"
          />
          <span className="text-[10px] text-gray-500 w-8 text-right">
            {opacity}%
          </span>
        </div>
      )}
    </div>
  );
}
