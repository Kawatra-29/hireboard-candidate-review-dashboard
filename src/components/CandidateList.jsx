import Avatar from "./Avatar";
import ScoreBar from "./ScoreBar";
import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";

export default function CandidateList({ candidates, onSelect, compareList, toggleCompare }) {
  const inCompare = (id) => compareList.some(c => c.id === id);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {["", "Candidate", "College", "Assignment", "Video", "ATS", "Priority", "Status", ""].map((h, i) => (
                <th key={i} className="px-4 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {candidates.map(c => (
              <tr
                key={c.id}
                onClick={() => onSelect(c)}
                className="hover:bg-indigo-50/40 cursor-pointer transition-colors group"
              >
                <td className="pl-4 pr-2 py-3" onClick={e => { e.stopPropagation(); toggleCompare(c); }}>
                  <div
                    className={`w-4.5 h-4.5 w-5 h-5 rounded flex items-center justify-center border-2 transition cursor-pointer ${
                      inCompare(c.id)
                        ? "bg-indigo-500 border-indigo-500"
                        : "border-gray-200 hover:border-indigo-300"
                    }`}
                  >
                    {inCompare(c.id) && <span className="text-white text-[10px] font-bold leading-none">✓</span>}
                  </div>
                </td>

                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={c.name} id={c.id} size="sm" />
                    <div>
                      <div className="font-semibold text-gray-800">{c.name}</div>
                      <div className="text-xs text-gray-400 font-mono">#{String(c.id).padStart(4, "0")}</div>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3 max-w-[160px]">
                  <div className="text-gray-500 text-xs truncate">{c.college}</div>
                </td>

                <td className="px-4 py-3 w-36"><ScoreBar value={c.assignmentScore} color="#6366f1" /></td>
                <td className="px-4 py-3 w-36"><ScoreBar value={c.videoScore} color="#8b5cf6" /></td>
                <td className="px-4 py-3 w-36"><ScoreBar value={c.atsScore} color="#06b6d4" /></td>

                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <PriorityBadge level={c.priorityLevel} />
                    <span className="font-mono text-xs text-gray-400 tabular-nums">{c.priorityScore}</span>
                  </div>
                </td>

                <td className="px-4 py-3"><StatusBadge status={c.reviewStatus} /></td>

                <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                  <button
                    onClick={() => onSelect(c)}
                    className="px-3 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold rounded-lg transition opacity-0 group-hover:opacity-100"
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {candidates.length === 0 && (
          <div className="py-20 text-center text-gray-400">
            <div className="text-4xl mb-3">🔍</div>
            <div className="text-base font-semibold">No candidates match your filters</div>
            <div className="text-sm mt-1">Try adjusting the search or filter criteria</div>
          </div>
        )}
      </div>

      <div className="px-5 py-3 border-t border-gray-50 bg-gray-50/50 text-xs text-gray-400">
        Showing <span className="font-semibold text-gray-600">{candidates.length}</span> candidates
      </div>
    </div>
  );
}
