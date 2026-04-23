import { STATUS_CONFIG } from "../utils/priority";

export default function StatusBadge({ status }) {
  const s = STATUS_CONFIG[status];
  if (!s) return null;
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${s.bg} ${s.color}`}>
      {s.label}
    </span>
  );
}
