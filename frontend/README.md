# RootCause Tutor — Frontend

**Source-grounded personalized AI tutoring platform**  
*Multimodal AI Hackathon 2026 — Track D: Personalized Tutoring and Adaptive Learning*

## Quick Start

```bash
cd frontend
npm install
npm run dev
```

The application runs at `http://localhost:5173`.

## Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_BASE_URL` | `http://localhost:8000/api` | Backend API base URL |
| `VITE_DEMO_MODE` | `true` | Enable demo mode with sample data |

## Demo Mode

When `VITE_DEMO_MODE=true`, the application uses realistic sample data (Calculus I course) without requiring a live backend. All pages are fully functional with demo data.

Demo data is visually labeled with an amber "Demo Mode" badge in the sidebar.

## Tech Stack

- **React 19** with TypeScript 6 (strict mode)
- **Vite 8** for build tooling
- **Tailwind CSS 4** for styling
- **React Router** for client-side routing
- **TanStack Query** for server state management
- **Zustand** for shared client state
- **React Flow** (@xyflow/react) for the interactive knowledge map
- **Recharts** for mastery and evaluation charts
- **Lucide React** for icons
- **KaTeX** for mathematical notation (ready for use)

## Project Structure

```
frontend/src/
├── app/          # Router, providers, App shell
├── pages/        # All application pages
├── components/
│   └── layout/   # Sidebar, Header, AppShell
├── api/          # API client, streaming utilities
├── store/        # Zustand shared state
├── types/        # Domain type definitions
├── lib/          # Utilities, mock data, formatting
└── styles/       # Global styles (index.css)
```

## Application Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Overview | Student dashboard with mastery, recommendations, activity |
| `/onboarding` | Onboarding | Multi-step student setup (standalone, no sidebar) |
| `/library` | My Library | Upload and manage course materials |
| `/tutor` | AI Tutor | Source-grounded chat with citation viewer |
| `/map` | Knowledge Map | Interactive prerequisite graph (React Flow) |
| `/quiz` | Quiz Arena | Configure and start adaptive assessments |
| `/quiz/:quizId` | Active Quiz | Take a quiz with confidence signals |
| `/report/:reportId` | Report | Assessment results with Root-Cause Rewind |
| `/plan` | Study Plan | Personalized learning timeline |
| `/eval-lab` | Evaluation Lab | System metrics and test case results |
| `/settings` | Settings | Preferences and profile configuration |

## Key Features

### Root-Cause Rewind
The defining experience: after a quiz, the system traces prerequisite gaps to identify the real cause of mistakes. The report highlights the suspected root cause with evidence and targeted repair actions.

### Source-Grounded Tutoring
Every AI response includes citation chips linking to the exact source material (PDF page, video timestamp, slide number). Claims are verified against uploaded course material.

### Adaptive Knowledge Map
An interactive React Flow graph showing concept prerequisites, mastery levels, and review schedules. Nodes are color-coded by mastery.

### Evaluation Lab
A technical dashboard for hackathon judging, displaying faithfulness, retrieval quality, citation accuracy, and other metrics.

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Type check + production build
npm run preview  # Preview production build
npm run lint     # Run linter
```

## Backend Connection

To connect to a live backend:

1. Set `VITE_API_BASE_URL` to your backend URL
2. Set `VITE_DEMO_MODE=false`
3. The API client in `src/api/client.ts` handles all HTTP requests with typed responses

The Vite dev server proxies `/api` requests to `http://localhost:8000`.

## Component Architecture & Adding New Modules

### Reusable Overview Components (`src/components/common/`)

- `StatCard.tsx` — KPI metric card with tinted circular icon, large number, and trend badge.
- `ModuleCard.tsx` — College-portal module launcher card with 55% pastel gradient top, wave divider, centered 72px icon badge, and hover lift.
- `ModuleGrid.tsx` — Responsive CSS grid displaying all 7 modules with live underlined search filter.
- `DiagnosisHero.tsx` — Root-Cause Rewind hero banner with glass evidence panel and SVG circular mastery progress ring.
- `ChartCard.tsx` — Calculus mastery area chart and prerequisite focus bars.

### How to Add a New Module Card

To register a new module card in the college-portal launcher:

1. Open `src/components/common/moduleData.ts`.
2. Append a new `ModuleData` entry to the `allModules` array:

```typescript
{
  id: 'flashcards',
  title: 'Active Recall',
  description: 'Spaced repetition flashcards with automated prerequisite concept linking.',
  status: '24 cards due',
  route: '/flashcards',
  icon: Sparkles, // any LucideIcon
  iconColor: 'text-cyan-600 dark:text-cyan-400',
  headerGradient: 'bg-gradient-to-br from-cyan-100/90 via-sky-50/80 to-blue-50/70 dark:from-cyan-950/60 dark:via-sky-950/40 dark:to-slate-900',
  accentBorderColor: 'border-cyan-200',
}
```

3. Add the corresponding route in `src/app/router.tsx`. The card will automatically participate in responsive layout sizing and live search filtering.

---

Built for Multimodal AI Hackathon 2026.
