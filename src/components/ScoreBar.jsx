export default function ScoreBar({ value, color = "#6366f1", size = "sm" }) {
  const h = size === "sm" ? "h-1" : "h-1.5";
  return (
    <div className="flex items-center gap-2">
      <div className={`flex-1 ${h} bg-gray-100 rounded-full overflow-hidden`}>
        <div
          className={`${h} rounded-full transition-all duration-300`}
          style={{ width: `${Math.min(100, value)}%`, background: color }}
        />
      </div>
      <span className="font-mono text-xs font-semibold text-gray-700 w-8 text-right tabular-nums">
        {value}
      </span>
    </div>
  );
}
