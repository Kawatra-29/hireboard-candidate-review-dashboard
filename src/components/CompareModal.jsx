import Avatar from "./Avatar";
import PriorityBadge from "./PriorityBadge";
import ScoreBar from "./ScoreBar";

const METRICS = [
  { key: "priorityScore", label: "Priority Score", color: "#6366f1" },
  { key: "assignmentScore", label: "Assignment", color: "#6366f1" },
  { key: "videoScore", label: "Video", color: "#8b5cf6" },
  { key: "atsScore", label: "ATS", color: "#06b6d4" },
  { key: "githubScore", label: "GitHub", color: "#f59e0b" },
  { key: "communicationScore", label: "Communication", color: "#10b981" },
];

export default function CompareModal({ candidates, onClose, onRemove }) {
  if (!candidates.length) return null;
  const count = candidates.length;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Candidate Comparison</h2>
            <p className="text-sm text-gray-400 mt-0.5">Comparing {count} candidate{count > 1 ? "s" : ""} side-by-side</p>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-gray-500 text-xl p-1">✕</button>
        </div>

        <div className="p-7">
          {/* Candidate Cards */}
          <div
            className="grid gap-4 mb-6"
            style={{ gridTemplateColumns: `180px repeat(${count}, 1fr)` }}
          >
            <div />
            {candidates.map(c => (
              <div key={c.id} className="relative bg-gray-50 rounded-xl p-4 border border-gray-100 text-center">
                <button
                  onClick={() => onRemove(c)}
                  className="absolute top-2 right-2 text-gray-300 hover:text-gray-500 text-sm"
                >✕</button>
                <Avatar name={c.name} id={c.id} size="md" />
                <div className="font-bold text-gray-800 text-sm mt-2 leading-tight">{c.name}</div>
                <div className="text-xs text-gray-400 mt-0.5 truncate">{c.college}</div>
                <div className="mt-2 flex justify-center">
                  <PriorityBadge level={c.priorityLevel} />
                </div>
              </div>
            ))}
          </div>

          {/* Metric Rows */}
          {METRICS.map(m => {
            const best = Math.max(...candidates.map(c => c[m.key]));
            return (
              <div
                key={m.key}
                className="grid gap-4 mb-3 items-center"
                style={{ gridTemplateColumns: `180px repeat(${count}, 1fr)` }}
              >
                <div className="text-sm font-semibold text-gray-600">{m.label}</div>
                {candidates.map(c => {
                  const isBest = count > 1 && c[m.key] === best;
                  return (
                    <div
                      key={c.id}
                      className={`rounded-xl px-3 py-3 border ${
                        isBest ? "bg-emerald-50 border-emerald-200" : "bg-gray-50 border-gray-100"
                      }`}
                    >
                      <ScoreBar value={c[m.key]} color={isBest ? "#10b981" : m.color} size="md" />
                      {isBest && (
                        <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-1">Best</div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
