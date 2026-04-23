import { useState } from "react";
import Avatar from "./Avatar";
import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";
import ScoreBar from "./ScoreBar";
import RatingSlider from "./RatingSlider";
import { STATUS_CONFIG } from "../utils/priority";

const TABS = ["profile", "assignment", "video", "notes"];

export default function CandidateDrawer({ candidate, onClose, onUpdate }) {
  const [tab, setTab] = useState("profile");
  const [note, setNote] = useState("");

  if (!candidate) return null;

  const updateAssignment = (key, val) =>
    onUpdate(candidate.id, { assignmentEval: { ...candidate.assignmentEval, [key]: val } });

  const updateVideo = (key, val) =>
    onUpdate(candidate.id, { videoEval: { ...candidate.videoEval, [key]: val } });

  const addNote = () => {
    if (!note.trim()) return;
    onUpdate(candidate.id, { notes: [...(candidate.notes || []), { text: note, time: new Date().toLocaleString() }] });
    setNote("");
  };

  const avgAssignment = (Object.values(candidate.assignmentEval).reduce((a, b) => a + b, 0) / 6).toFixed(1);
  const avgVideo = (Object.values(candidate.videoEval).reduce((a, b) => a + b, 0) / 5).toFixed(1);

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-end" onClick={onClose}>
      <div
        className="w-full max-w-xl h-full bg-white flex flex-col overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex-shrink-0 px-6 pt-6 pb-0 border-b border-gray-100">
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-4">
              <Avatar name={candidate.name} id={candidate.id} size="lg" />
              <div>
                <h2 className="text-lg font-bold text-gray-900 leading-tight">{candidate.name}</h2>
                <p className="text-sm text-gray-400 mt-0.5">{candidate.college}</p>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <PriorityBadge level={candidate.priorityLevel} showText />
                  <StatusBadge status={candidate.reviewStatus} />
                </div>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-300 hover:text-gray-500 text-xl leading-none p-1">✕</button>
          </div>

          <div className="flex gap-1">
            {TABS.map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2.5 text-sm font-semibold capitalize transition border-b-2 ${
                  tab === t
                    ? "text-indigo-600 border-indigo-500"
                    : "text-gray-400 border-transparent hover:text-gray-600"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">

          {tab === "profile" && (
            <div className="space-y-5">
              {/* Score Grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Priority Score", value: candidate.priorityScore, color: "#6366f1" },
                  { label: "Assignment", value: candidate.assignmentScore, color: "#6366f1" },
                  { label: "Video", value: candidate.videoScore, color: "#8b5cf6" },
                  { label: "ATS", value: candidate.atsScore, color: "#06b6d4" },
                  { label: "GitHub", value: candidate.githubScore, color: "#f59e0b" },
                  { label: "Communication", value: candidate.communicationScore, color: "#10b981" },
                ].map(item => (
                  <div key={item.label} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{item.label}</div>
                    <ScoreBar value={item.value} color={item.color} size="md" />
                  </div>
                ))}
              </div>

              {/* Skills */}
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Skills</div>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map(sk => (
                    <span key={sk} className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status Control */}
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Update Status</div>
                <div className="flex flex-wrap gap-2">
                  {["pending", "reviewed", "shortlisted", "rejected"].map(st => {
                    const sc = STATUS_CONFIG[st];
                    const active = candidate.reviewStatus === st;
                    return (
                      <button
                        key={st}
                        onClick={() => onUpdate(candidate.id, { reviewStatus: st })}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border-2 transition ${
                          active ? `${sc.bg} ${sc.color} border-current` : "bg-white text-gray-400 border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {sc.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Contact */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-1.5 text-sm text-gray-500">
                <div>📧 {candidate.email}</div>
                <div>📱 {candidate.phone}</div>
                <div>💼 {candidate.experience} year{candidate.experience !== 1 ? "s" : ""} experience</div>
                <div>📅 Applied: {candidate.appliedDate}</div>
              </div>
            </div>
          )}

          {tab === "assignment" && (
            <div>
              <p className="text-sm text-blue-600 bg-blue-50 rounded-lg px-4 py-3 mb-5">
                Rate each dimension of the assignment submission from 1–10.
              </p>
              {[
                { key: "uiQuality", label: "UI Quality" },
                { key: "componentStructure", label: "Component Structure" },
                { key: "stateHandling", label: "State Handling" },
                { key: "edgeCaseHandling", label: "Edge-case Handling" },
                { key: "responsiveness", label: "Responsiveness" },
                { key: "accessibilityAwareness", label: "Accessibility Awareness" },
              ].map(({ key, label }) => (
                <RatingSlider key={key} label={label} value={candidate.assignmentEval[key]} onChange={val => updateAssignment(key, val)} />
              ))}
              <div className="mt-4 bg-indigo-50 rounded-xl p-4 border border-indigo-100">
                <div className="text-xs text-indigo-400 font-bold uppercase tracking-wider">Average Eval</div>
                <div className="font-mono text-3xl font-bold text-indigo-600 mt-1">{avgAssignment}<span className="text-indigo-300 text-lg">/10</span></div>
              </div>
            </div>
          )}

          {tab === "video" && (
            <div>
              <p className="text-sm text-violet-600 bg-violet-50 rounded-lg px-4 py-3 mb-5">
                Rate the candidate's video explanation across these dimensions.
              </p>
              {[
                { key: "clarity", label: "Clarity" },
                { key: "confidence", label: "Confidence" },
                { key: "architectureExplanation", label: "Architecture Explanation" },
                { key: "tradeoffReasoning", label: "Tradeoff Reasoning" },
                { key: "communicationStrength", label: "Communication Strength" },
              ].map(({ key, label }) => (
                <RatingSlider key={key} label={label} value={candidate.videoEval[key]} onChange={val => updateVideo(key, val)} />
              ))}
              <div className="mt-4 bg-violet-50 rounded-xl p-4 border border-violet-100">
                <div className="text-xs text-violet-400 font-bold uppercase tracking-wider">Average Eval</div>
                <div className="font-mono text-3xl font-bold text-violet-600 mt-1">{avgVideo}<span className="text-violet-300 text-lg">/10</span></div>
              </div>
            </div>
          )}

          {tab === "notes" && (
            <div>
              <textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="Add a timestamped observation about this candidate..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm resize-none outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
              />
              <button
                onClick={addNote}
                className="mt-2 px-5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold rounded-lg transition"
              >
                Add Note
              </button>

              <div className="mt-5 space-y-3">
                {(candidate.notes || []).length === 0 ? (
                  <div className="text-center text-gray-300 py-10 text-sm">No notes yet</div>
                ) : (
                  (candidate.notes || []).map((n, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <div className="font-mono text-xs text-gray-400 mb-1">{n.time}</div>
                      <div className="text-sm text-gray-700">{n.text}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
