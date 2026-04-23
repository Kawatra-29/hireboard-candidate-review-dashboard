export const PRIORITY_CONFIG = {
  P0: {
    color: "text-emerald-700",
    bg: "bg-emerald-100",
    dot: "bg-emerald-500",
    border: "border-emerald-300",
    hex: "#10b981",
    label: "P0",
    text: "Interview Immediately",
  },
  P1: {
    color: "text-amber-700",
    bg: "bg-amber-100",
    dot: "bg-amber-500",
    border: "border-amber-300",
    hex: "#f59e0b",
    label: "P1",
    text: "Strong Shortlist",
  },
  P2: {
    color: "text-orange-700",
    bg: "bg-orange-100",
    dot: "bg-orange-500",
    border: "border-orange-300",
    hex: "#f97316",
    label: "P2",
    text: "Review Later",
  },
  P3: {
    color: "text-red-700",
    bg: "bg-red-100",
    dot: "bg-red-500",
    border: "border-red-300",
    hex: "#ef4444",
    label: "P3",
    text: "Reject",
  },
};

export const STATUS_CONFIG = {
  pending: { color: "text-gray-600", bg: "bg-gray-100", label: "Pending" },
  reviewed: { color: "text-blue-600", bg: "bg-blue-100", label: "Reviewed" },
  shortlisted: { color: "text-emerald-600", bg: "bg-emerald-100", label: "Shortlisted" },
  rejected: { color: "text-red-600", bg: "bg-red-100", label: "Rejected" },
};

export function computePriorityScore(c) {
  return parseFloat(
    (c.assignmentScore * 0.3 + c.videoScore * 0.25 + c.atsScore * 0.2 + c.githubScore * 0.15 + c.communicationScore * 0.1).toFixed(1)
  );
}

export function computePriorityLevel(score) {
  if (score >= 80) return "P0";
  if (score >= 65) return "P1";
  if (score >= 50) return "P2";
  return "P3";
}
