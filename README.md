# Multimodal Root-Cause AI Tutor

An intelligent, multimodal learning platform designed to diagnose conceptual misunderstandings, trace root causes across prerequisite hierarchies, and guide learners through Socratic remediation.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## 🌟 Key Features

- **Root-Cause Rewind Engine**: Identifies conceptual regressions and maps downstream failures back to missing foundational concepts.
- **Socratic AI Tutor**: Interactive multi-turn dialogue with progressive hints, step-by-step reasoning, and confidence tracking.
- **Topological Knowledge Map**: Dynamic visual graph representing prerequisite hierarchies, mastery status, and targeted learning pathways.
- **Multimodal Content Ingestion**: Ingests textbooks, lecture slides, academic PDFs, and diagrams into unified conceptual knowledge units.
- **Adaptive Quiz Arena**: Real-time calibrated assessment engine that probes depth of understanding rather than surface recall.
- **Evaluation & Faithfulness Lab**: Real-time hallucination prevention, citation grounding checks, and response faithfulness metrics.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations & Graphics**: Native Canvas API (3D Iridescent Helix visualization), CSS Glassmorphism
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: Client-side single-page architecture

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Anjali329/multimodal-rootcause.git
   cd multimodal-rootcause
   ```

2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Configure environment variables:
   ```bash
   cp .env.example .env
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:5173`.

---

## 📁 Repository Structure

```
multimodal-rootcause/
├── frontend/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # UI components (Landing, Layout, Common)
│   │   ├── pages/           # Page views (Overview, Tutor, Map, Quiz, etc.)
│   │   ├── types/           # TypeScript definitions
│   │   ├── App.tsx          # Root routing & layout container
│   │   └── main.tsx         # Application entry point
│   ├── package.json         # Frontend dependencies and scripts
│   ├── tsconfig.json        # TypeScript configuration
│   └── vite.config.ts       # Vite bundler configuration
├── .gitignore
├── LICENSE
└── README.md
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
