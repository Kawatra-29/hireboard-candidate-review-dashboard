const cards = [
  { label: "Total Candidates", key: "total", icon: "👥", iconBg: "bg-indigo-100", val_color: "text-indigo-600" },
  { label: "Reviewed", key: "reviewed", icon: "✅", iconBg: "bg-blue-100", val_color: "text-blue-600" },
  { label: "Shortlisted", key: "shortlisted", icon: "⭐", iconBg: "bg-emerald-100", val_color: "text-emerald-600" },
  { label: "Pending Review", key: "pending", icon: "⏳", iconBg: "bg-amber-100", val_color: "text-amber-600" },
];

export default function SummaryPanel({ stats }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map(card => (
        <div key={card.key} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl ${card.iconBg} flex items-center justify-center text-2xl flex-shrink-0`}>
            {card.icon}
          </div>
          <div>
            <div className={`font-mono text-3xl font-bold leading-none ${card.val_color}`}>
              {stats[card.key]}
            </div>
            <div className="text-xs text-gray-400 font-semibold tracking-wide mt-1 uppercase">
              {card.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
