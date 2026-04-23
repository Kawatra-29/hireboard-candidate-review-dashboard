import { useDashboard } from "./hooks/useDashboard";
import SummaryPanel from "./components/SummaryPanel";
import FilterBar from "./components/FilterBar";
import CandidateList from "./components/CandidateList";
import CandidateDrawer from "./components/CandidateDrawer";
import CompareModal from "./components/CompareModal";

export default function App() {
  const {
    candidates, stats,
    search, setSearch,
    filters, setFilters,
    sortBy, setSortBy,
    sortDir, setSortDir,
    selectedCandidate, setSelectedCandidate,
    compareList, toggleCompare,
    showCompare, setShowCompare,
    updateCandidate,
  } = useDashboard();

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Navbar */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-base">
              ⚡
            </div>
            <span className="font-bold text-gray-900 text-base tracking-tight">HireBoard</span>
            <span className="text-gray-300 text-sm hidden sm:block">/ Candidate Review</span>
          </div>

          {compareList.length > 0 && (
            <button
              onClick={() => setShowCompare(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-sm font-semibold rounded-lg hover:opacity-90 transition shadow-md"
            >
              ⚖ Compare ({compareList.length})
            </button>
          )}
        </div>
      </header>

      {/* Main */}
      <main className="max-w-screen-xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Candidate Dashboard</h1>
          <p className="text-sm text-gray-400 mt-1">Review, evaluate, and shortlist applicants for interview rounds</p>
        </div>

        <SummaryPanel stats={stats} />

        <FilterBar
          search={search} setSearch={setSearch}
          filters={filters} setFilters={setFilters}
          sortBy={sortBy} setSortBy={setSortBy}
          sortDir={sortDir} setSortDir={setSortDir}
        />

        {compareList.length > 0 && (
          <div className="mb-3 flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-2.5 text-sm text-blue-700">
            <span className="font-semibold">
              {compareList.length} selected:&nbsp;
              {compareList.map(c => c.name).join(", ")}
            </span>
            <button
              onClick={() => setShowCompare(true)}
              className="ml-auto px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-lg hover:bg-blue-600 transition"
            >
              Compare Now
            </button>
          </div>
        )}

        <CandidateList
          candidates={candidates}
          onSelect={setSelectedCandidate}
          compareList={compareList}
          toggleCompare={toggleCompare}
        />
      </main>

      <CandidateDrawer
        candidate={selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
        onUpdate={updateCandidate}
      />

      {showCompare && (
        <CompareModal
          candidates={compareList}
          onClose={() => setShowCompare(false)}
          onRemove={toggleCompare}
        />
      )}
    </div>
  );
}
