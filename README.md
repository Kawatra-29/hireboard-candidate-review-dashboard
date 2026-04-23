# ⚡ HireBoard – Candidate Review Dashboard

A production-grade internal hiring dashboard built with **Vite + React 18 + Tailwind CSS**, designed to help recruiters review, evaluate, and shortlist candidates efficiently.

---

## 📸 Features

- 🗂 **Candidate List** — Searchable, filterable, sortable table of 100 mock candidates
- 🎯 **Real-time Priority Engine** — Auto-computes P0 / P1 / P2 / P3 using weighted scoring
- 📋 **Candidate Detail Drawer** — Profile, scores, assignment eval, video eval, timestamped notes
- ⚖ **Comparison Mode** — Side-by-side comparison of up to 3 candidates
- 📊 **Summary Panel** — Live stats: Total, Reviewed, Shortlisted, Pending
- 🎨 **Color-coded Priority** — 🟢 P0 · 🟡 P1 · 🟠 P2 · 🔴 P3

---

## 🧮 Priority Engine Formula

| Dimension     | Weight |
|---------------|--------|
| Assignment    | 30%    |
| Video         | 25%    |
| ATS           | 20%    |
| GitHub        | 15%    |
| Communication | 10%    |

| Score Range | Priority | Label                 |
|-------------|----------|-----------------------|
| ≥ 80        | P0       | Interview Immediately |
| ≥ 65        | P1       | Strong Shortlist      |
| ≥ 50        | P2       | Review Later          |
| < 50        | P3       | Reject                |

---

## 🛠 Tech Stack

- [Vite](https://vitejs.dev/) — Lightning-fast build tool
- [React 18](https://react.dev/) — UI library
- [Tailwind CSS v3](https://tailwindcss.com/) — Utility-first styling
- [DM Sans + DM Mono](https://fonts.google.com/) — Typography

---

## 📁 Folder Structure

```
hire-vite/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── .gitignore
├── README.md
└── src/
    ├── main.jsx
    ├── index.css
    ├── App.jsx
    ├── components/
    │   ├── Avatar.jsx
    │   ├── CandidateDrawer.jsx
    │   ├── CandidateList.jsx
    │   ├── CompareModal.jsx
    │   ├── FilterBar.jsx
    │   ├── PriorityBadge.jsx
    │   ├── RatingSlider.jsx
    │   ├── ScoreBar.jsx
    │   ├── StatusBadge.jsx
    │   └── SummaryPanel.jsx
    ├── data/
    │   └── candidates.js
    ├── hooks/
    │   └── useDashboard.js
    └── utils/
        └── priority.js
```

---

## ⚙️ Setup Instructions

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) — v18 or above
- npm — comes with Node.js

### 1. Clone the Repository

```bash
git clone https://github.com/Kawatra-29/hireboard-candidate-review-dashboard
cd hireboard-candidate-review-dashboard
```

### 2. Install Dependencies

```bash
npm install
```

---

## ▶️ Run Steps

### Development Server

```bash
npm run dev
```

App will be running at:

```
http://localhost:5173
```

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 📦 Available Scripts

| Script            | Description                    |
|-------------------|--------------------------------|
| `npm run dev`     | Start local development server |
| `npm run build`   | Build for production           |
| `npm run preview` | Preview the production build   |

---

## 📝 Notes

- All candidate data is randomly generated locally — no external API required
- Priority scores update in real-time when evaluation sliders are changed
- Up to 3 candidates can be selected and compared simultaneously

---

## 👤 Author

**Your Name**  
GitHub: [@Kawatra-29](https://github.com/Kawatra-29)