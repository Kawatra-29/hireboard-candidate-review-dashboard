import { useState, useMemo, useCallback } from "react";
import { getCandidates } from "../data/candidates";
import { computePriorityScore, computePriorityLevel } from "../utils/priority";

export function useDashboard() {
  const [candidates, setCandidates] = useState(() => getCandidates());
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    assignmentMin: 0, assignmentMax: 100,
    videoMin: 0, videoMax: 100,
    atsMin: 0, atsMax: 100,
    reviewStatus: "all",
  });
  const [sortBy, setSortBy] = useState("priorityScore");
  const [sortDir, setSortDir] = useState("desc");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [compareList, setCompareList] = useState([]);
  const [showCompare, setShowCompare] = useState(false);

  const filtered = useMemo(() => {
    return candidates
      .filter(c => {
        if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
        if (c.assignmentScore < filters.assignmentMin || c.assignmentScore > filters.assignmentMax) return false;
        if (c.videoScore < filters.videoMin || c.videoScore > filters.videoMax) return false;
        if (c.atsScore < filters.atsMin || c.atsScore > filters.atsMax) return false;
        if (filters.reviewStatus !== "all" && c.reviewStatus !== filters.reviewStatus) return false;
        return true;
      })
      .sort((a, b) => {
        const mul = sortDir === "asc" ? 1 : -1;
        if (typeof a[sortBy] === "string") return a[sortBy].localeCompare(b[sortBy]) * mul;
        return (a[sortBy] - b[sortBy]) * mul;
      });
  }, [candidates, search, filters, sortBy, sortDir]);

  const stats = useMemo(() => ({
    total: candidates.length,
    reviewed: candidates.filter(c => c.reviewStatus === "reviewed").length,
    shortlisted: candidates.filter(c => c.reviewStatus === "shortlisted").length,
    pending: candidates.filter(c => c.reviewStatus === "pending").length,
  }), [candidates]);

  const updateCandidate = useCallback((id, updates) => {
    setCandidates(prev => prev.map(c => {
      if (c.id !== id) return c;
      const next = { ...c, ...updates };
      const ps = computePriorityScore(next);
      next.priorityScore = ps;
      next.priorityLevel = computePriorityLevel(ps);
      return next;
    }));
    setSelectedCandidate(prev => {
      if (!prev || prev.id !== id) return prev;
      const next = { ...prev, ...updates };
      const ps = computePriorityScore(next);
      next.priorityScore = ps;
      next.priorityLevel = computePriorityLevel(ps);
      return next;
    });
  }, []);

  const toggleCompare = useCallback((candidate) => {
    setCompareList(prev => {
      if (prev.find(c => c.id === candidate.id)) return prev.filter(c => c.id !== candidate.id);
      if (prev.length >= 3) return prev;
      return [...prev, candidate];
    });
  }, []);

  const isInCompare = useCallback((id) => compareList.some(c => c.id === id), [compareList]);

  return {
    candidates: filtered, stats, search, setSearch, filters, setFilters,
    sortBy, setSortBy, sortDir, setSortDir,
    selectedCandidate, setSelectedCandidate,
    compareList, toggleCompare, isInCompare,
    showCompare, setShowCompare,
    updateCandidate,
  };
}
