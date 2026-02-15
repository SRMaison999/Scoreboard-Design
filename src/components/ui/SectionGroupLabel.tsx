interface SectionGroupLabelProps {
  readonly label: string;
}

export function SectionGroupLabel({ label }: SectionGroupLabelProps) {
  return (
    <div className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider mt-2 border-t border-gray-700 pt-3">
      {label}
    </div>
  );
}
