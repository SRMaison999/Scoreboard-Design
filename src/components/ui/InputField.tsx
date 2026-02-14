interface InputFieldProps {
  readonly label: string;
  readonly value: string;
  readonly onChange: (value: string) => void;
}

export function InputField({ label, value, onChange }: InputFieldProps) {
  return (
    <div className="flex flex-col gap-0.5 flex-1 min-w-0">
      <label className="text-[11px] text-gray-400 font-medium">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-gray-800 border border-gray-700 rounded-md px-2.5 py-1.5 text-gray-100 text-sm font-[family-name:var(--font-barlow)] outline-none w-full"
      />
    </div>
  );
}
