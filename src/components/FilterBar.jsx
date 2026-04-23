import { useState } from "react";

export default function FilterBar({ search, setSearch, filters, setFilters, sortBy, setSortBy, sortDir, setSortDir }) {
  const [open, setOpen] = useState(false);

  const resetFilters = () =>
    setFilters({ assignmentMin: 0, assignmentMax: 100, videoMin: 0, videoMax: 100, atsMin: 0, atsMax: 100, reviewStatus: "all" });

  const rangeFields = [
    { key: "assignment", label: "Assignment Score" },
    { key: "video", label: "Video Score" },
    { key: "ats", label: "ATS Score" },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-4">
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[220px]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name..."
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
          />
        </div>

        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-indigo-400 cursor-pointer"
        >
          <option value="priorityScore">Sort: Priority Score</option>
          <option value="assignmentScore">Sort: Assignment</option>
          <option value="videoScore">Sort: Video</option>
          <option value="atsScore">Sort: ATS</option>
          <option value="name">Sort: Name</option>
        </select>

        <button
          onClick={() => setSortDir(d => d === "asc" ? "desc" : "asc")}
          className="px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition"
        >
          {sortDir === "asc" ? "↑ Ascending" : "↓ Descending"}
        </button>

        <button
          onClick={() => setOpen(o => !o)}
          className={`px-4 py-2.5 text-sm font-semibold rounded-lg border transition ${open ? "bg-indigo-500 text-white border-indigo-500" : "bg-white text-indigo-600 border-indigo-300 hover:bg-indigo-50"}`}
        >
          ⚙ Filters
        </button>
      </div>

      {open && (
        <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-4">
          {rangeFields.map(({ key, label }) => (
            <div key={key}>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{label}</div>
              <div className="flex items-center gap-2">
                <input
                  type="number" min={0} max={100}
                  value={filters[`${key}Min`]}
                  onChange={e => setFilters(f => ({ ...f, [`${key}Min`]: +e.target.value }))}
                  className="w-16 px-2 py-1.5 text-sm border border-gray-200 rounded-md outline-none focus:border-indigo-400"
                />
                <span className="text-gray-300 text-xs">–</span>
                <input
                  type="number" min={0} max={100}
                  value={filters[`${key}Max`]}
                  onChange={e => setFilters(f => ({ ...f, [`${key}Max`]: +e.target.value }))}
                  className="w-16 px-2 py-1.5 text-sm border border-gray-200 rounded-md outline-none focus:border-indigo-400"
                />
              </div>
            </div>
          ))}

          <div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Review Status</div>
            <select
              value={filters.reviewStatus}
              onChange={e => setFilters(f => ({ ...f, reviewStatus: e.target.value }))}
              className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-md outline-none focus:border-indigo-400"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={resetFilters}
              className="px-4 py-1.5 text-sm text-gray-500 border border-gray-200 rounded-md hover:bg-gray-50 transition"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
