interface ProgressRingProps {
  value: number;
  label: string;
}

export function ProgressRing({ value, label }: ProgressRingProps) {
  const degrees = Math.min(100, Math.max(0, value)) * 3.6;
  return (
    <div className="flex items-center gap-3">
      <div
        className="grid size-16 place-items-center rounded-full shadow-inner"
        style={{ background: `conic-gradient(#6366F1 ${degrees}deg, #F1F5F9 0deg)` }}
      >
        <div className="grid size-11 place-items-center rounded-full bg-white text-sm font-bold text-charcoal">{Math.round(value)}%</div>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-slate">Progress</p>
        <p className="font-semibold text-charcoal">{label}</p>
      </div>
    </div>
  );
}
