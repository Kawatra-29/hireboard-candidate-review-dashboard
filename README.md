# HireBoard – Candidate Review Dashboard

A production-grade internal hiring dashboard built with **Vite + React 18 + Tailwind CSS**.

## Features

- 🗂 **Candidate Table** — searchable, filterable, sortable across 100 mock candidates
- 🎯 **Priority Engine** — real-time weighted score → P0/P1/P2/P3
- 📋 **Detail Drawer** — profile, assignment eval sliders, video eval sliders, timestamped notes
- ⚖ **Comparison Mode** — side-by-side compare 2–3 candidates with best-score highlighting
- 📊 **Summary Panel** — live stats: Total, Reviewed, Shortlisted, Pending
- 🎨 **Color-coded priorities** — Green (P0), Yellow (P1), Orange (P2), Red (P3)

## Priority Formula

| Dimension     | Weight |
|---------------|--------|
| Assignment    | 30%    |
| Video         | 25%    |
| ATS           | 20%    |
| GitHub        | 15%    |
| Communication | 10%    |

## Setup & Run

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`

## Build

```bash
npm run build
npm run preview
```

## Folder Structure

```
hire-vite/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
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
