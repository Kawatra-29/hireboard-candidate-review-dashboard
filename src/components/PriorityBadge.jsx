import { PRIORITY_CONFIG } from "../utils/priority";

export default function PriorityBadge({ level, showText = false }) {
  const p = PRIORITY_CONFIG[level];
  if (!p) return null;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${p.bg} ${p.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${p.dot}`} />
      {p.label}
      {showText && <span className="font-medium opacity-75">· {p.text}</span>}
    </span>
  );
}
