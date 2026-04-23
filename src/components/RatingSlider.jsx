export default function RatingSlider({ label, value, onChange }) {
  const pct = ((value - 1) / 9) * 100;
  const color = pct >= 70 ? "#10b981" : pct >= 40 ? "#f59e0b" : "#ef4444";

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-gray-600 font-medium">{label}</span>
        <span className="font-mono text-sm font-bold" style={{ color }}>{value}<span className="text-gray-300">/10</span></span>
      </div>
      <input
        type="range" min={1} max={10} value={value}
        onChange={e => onChange(+e.target.value)}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{ accentColor: color }}
      />
    </div>
  );
}
