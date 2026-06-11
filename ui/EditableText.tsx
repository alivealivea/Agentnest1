"use client";

interface EditableTextProps {
  value: string;
  editable: boolean;
  className?: string;
  onChange: (value: string) => void;
}

export function EditableText({ value, editable, className, onChange }: EditableTextProps) {
  if (!editable) return <span className={className}>{value}</span>;
  return (
    <input
      className={`min-w-0 rounded-lg border border-indigo-200 bg-white/80 px-2 py-1 outline-none ring-indigo-200 focus:ring ${className ?? ""}`}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}
