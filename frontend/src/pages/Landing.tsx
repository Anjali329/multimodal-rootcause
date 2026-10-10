import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  Target, 
  Network, 
  BookOpen, 
  CalendarCheck, 
  FlaskConical, 
  MessageSquare, 
  Trophy, 
  Video, 
  Sliders,
  ChevronRight
} from 'lucide-react';
import { IridescentHelix } from '@/components/landing/IridescentHelix';

export function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Target,
      title: 'Root-Cause Rewind',
      description: 'Discovers the true origin of repeated mistakes by tracing backward through topological prerequisite graphs instead of just repeating formulas.',
      badge: 'Core Innovation',
      accent: 'from-pink-500/20 to-purple-500/20',
      badgeColor: 'text-pink-400 border-pink-500/30 bg-pink-500/10',
    },
    {
      icon: Video,
      title: 'Multimodal Source Grounding',
      description: 'Every explanation is grounded directly in uploaded lecture PDFs, slide decks, and timestamped video recordings with zero hallucinations.',
      badge: 'Zero Hallucinations',
      accent: 'from-blue-500/20 to-cyan-500/20',
      badgeColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
    },
    {
      icon: Network,
      title: 'Topological Knowledge Map',
      description: 'Visual interactive dependency graph displaying real-time concept mastery, prerequisite bottlenecks, and clear remedial learning paths.',
      badge: 'DAG Mastery',
      accent: 'from-purple-500/20 to-indigo-500/20',
      badgeColor: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
    },
    {
      icon: MessageSquare,
      title: 'Socratic AI Tutor',
      description: 'A conversational agent that guides students with targeted hints and conceptual checkpoints rather than giving away direct answers.',
      badge: 'Interactive',
      accent: 'from-indigo-500/20 to-blue-500/20',
      badgeColor: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10',
    },
    {
      icon: Trophy,
      title: 'Adaptive Quiz Arena',
      description: 'Diagnostic assessments with confidence signaling (Sure, Maybe, Guess) that isolate genuine misconceptions from simple test fatigue.',
      badge: 'Confidence-Weighted',
      accent: 'from-amber-500/20 to-orange-500/20',
      badgeColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    },
    {
      icon: FlaskConical,
      title: 'Evaluation & Faithfulness Lab',
      description: 'Inspect model retrieval faithfulness (92%), citation precision, context recall, and comparative ablation benchmark test runs.',
      badge: '92% Faithfulness',
      accent: 'from-fuchsia-500/20 to-rose-500/20',
      badgeColor: 'text-fuchsia-400 border-fuchsia-500/30 bg-fuchsia-500/10',
    },
  ];

  const modules = [
    { title: 'Overview', path: '/overview', icon: Target, desc: 'Command Center & Stats' },
    { title: 'Study Plan', path: '/plan', icon: CalendarCheck, desc: 'Adaptive Daily Roadmap' },
    { title: 'Eval Lab', path: '/eval-lab', icon: FlaskConical, desc: 'Faithfulness & Benchmarks' },
    { title: 'Knowledge Map', path: '/map', icon: Network, desc: 'Topological Dependency DAG' },
    { title: 'Library', path: '/library', icon: BookOpen, desc: 'PDFs & Timestamped Videos' },
    { title: 'AI Tutor', path: '/tutor', icon: MessageSquare, desc: 'Conversational Socratic Coach' },
    { title: 'Quiz Arena', path: '/quiz', icon: Trophy, desc: 'Confidence-Weighted Quizzes' },
  ];

  return (
    <div className="min-h-screen bg-[#080D1A] text-white selection:bg-blue-600 selection:text-white font-sans antialiased overflow-x-hidden relative">
      
      {/* ── Background Grid & Atmospheric Glow ─────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:28px_28px] opacity-70" />
        
        {/* Top center violet/purple ambient haze */}
        <div className="absolute top-[-15%] left-[25%] w-[800px] h-[550px] bg-purple-600/18 rounded-full blur-[160px]" />
        {/* Right side electric blue glow */}
        <div className="absolute top-[10%] right-[-10%] w-[650px] h-[650px] bg-blue-600/15 rounded-full blur-[170px]" />
        {/* Deep cyan highlight at lower left */}
        <div className="absolute top-[60%] left-[-10%] w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[180px]" />
      </div>

      {/* ── 1. Top Navigation Bar ─────────────────────────────────── */}
      <nav className="relative z-30 border-b border-white/[0.08] backdrop-blur-xl bg-[#080D1A]/70 sticky top-0 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo Mark */}
          <div 
            onClick={() => navigate('/overview')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Geometric Angled Icon */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold tracking-tight text-white">
                RootCause <span className="font-light text-slate-300">Tutor</span>
              </span>
            </div>
          </div>

          {/* Center Links (Matching Reference Image) */}
          <div className="hidden md:flex items-center gap-8 text-[13px] font-medium text-slate-300">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#rewind" className="hover:text-white transition-colors">Methodology</a>
            <a href="#modules" className="hover:text-white transition-colors">Modules</a>
            <a href="#benchmarks" className="hover:text-white transition-colors">Benchmarks</a>
          </div>

          {/* Right Action Button (Pill Button Matching Reference Image) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/overview')}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 hover:border-white/40 text-white font-medium text-xs sm:text-sm backdrop-blur-md hover:bg-white/5 transition-all duration-150 cursor-pointer shadow-sm"
            >
              <span>Get started</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            </button>
          </div>

        </div>
      </nav>

      {/* ── 2. Hero Section (2-Column Grid Matching Reference Image) ── */}
      <section className="relative z-10 pt-12 pb-20 lg:pt-16 lg:pb-28 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Copy, Badge, CTAs, & Stats */}
          <div className="lg:col-span-7 flex flex-col items-start text-left min-w-0">
            
            {/* Announcement Pill Badge */}
            <div 
              onClick={() => navigate('/overview')}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-medium bg-white/[0.05] border border-white/[0.12] text-slate-300 mb-6 backdrop-blur-md hover:border-white/30 transition-all cursor-pointer group shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_#60a5fa]" />
              <span>Multimodal AI Hackathon • Track D</span>
              <span className="text-slate-500 font-light">|</span>
              <span className="text-blue-300 group-hover:text-white transition-colors flex items-center gap-1">
                Explore Demo <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>

            {/* Massive Headline Matching Reference Image */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              Revolutionizing
              <span className="block mt-1 bg-gradient-to-r from-[#D946EF] via-[#C084FC] to-[#38BDF8] bg-clip-text text-transparent">
                Education with AI
              </span>
            </h1>

            {/* Subtitle Matching Reference Image Style */}
            <p className="mt-6 text-slate-300/90 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
              Experience the future of learning with AI-driven online education solutions. Grounded in lecture materials, diagnosing hidden prerequisite gaps, and guiding every student through Socratic mastery.
            </p>

            {/* Action CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {/* Primary Blue Pill */}
              <button
                onClick={() => navigate('/overview')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2563EB] hover:bg-blue-600 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 transition-all duration-150 cursor-pointer hover:scale-[1.03] active:scale-[0.98]"
              >
                <span>Get Started</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Secondary Glass Pill with Sliders Icon */}
              <a
                href="#features"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 border border-white/[0.12] text-sm font-medium backdrop-blur-md transition-all duration-150 cursor-pointer"
              >
                <Sliders className="w-4 h-4 text-slate-300" />
                <span>Explore all features</span>
              </a>
            </div>

            {/* 3 Key Stats Row Matching Reference Image */}
            <div className="mt-12 pt-8 border-t border-white/[0.1] grid grid-cols-3 gap-6 sm:gap-10 w-full max-w-lg">
              
              {/* Stat 1 */}
              <div className="flex flex-col">
                <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  95%
                </span>
                <span className="text-xs text-slate-400 mt-1 leading-snug">
                  Personalization accuracy
                </span>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col border-l border-white/[0.1] pl-6 sm:pl-8">
                <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  30%
                </span>
                <span className="text-xs text-slate-400 mt-1 leading-snug">
                  Learning efficiency improvement
                </span>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col border-l border-white/[0.1] pl-6 sm:pl-8">
                <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  100,000+
                </span>
                <span className="text-xs text-slate-400 mt-1 leading-snug">
                  Active users utilizing platform
                </span>
              </div>

            </div>

          </div>

          {/* Right Column: 3D Iridescent Helix Graphic */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end relative">
            <div className="w-full max-w-[540px] aspect-square relative flex items-center justify-center">
              {/* 3D Iridescent Helix Canvas component */}
              <IridescentHelix className="w-full h-full" />
            </div>
          </div>

        </div>
      </section>

      {/* ── 3. "OUR INVESTORS & PARTNERS" Section (Matching Reference) ─ */}
      <section className="relative z-10 py-12 border-y border-white/[0.08] bg-[#070B16]/50">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-semibold tracking-widest text-slate-400 uppercase mb-8">
            OUR INVESTORS & RESEARCH PARTNERS
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
            {/* Partner 1: Datapoint */}
            <div className="flex items-center gap-2 text-slate-300 font-bold text-lg tracking-wider">
              <div className="w-3 h-3 rounded-full bg-cyan-400" />
              <span>DATAPOINT</span>
            </div>

            {/* Partner 2: Gumroad */}
            <div className="text-slate-300 font-extrabold text-xl tracking-tight">
              GUMROAD
            </div>

            {/* Partner 3: MIT OpenCourseWare */}
            <div className="flex items-center gap-2 text-slate-300 font-semibold text-sm tracking-wide">
              <span className="px-2 py-0.5 rounded bg-white/10 text-xs font-mono font-bold">MIT</span>
              <span>OpenCourseWare</span>
            </div>

            {/* Partner 4: Stanford AI */}
            <div className="flex items-center gap-2 text-slate-300 font-semibold text-sm tracking-wide">
              <span className="font-serif font-bold text-red-400">Stanford</span>
              <span>AI Lab</span>
            </div>

            {/* Partner 5: Hugging Face */}
            <div className="flex items-center gap-1.5 text-slate-300 font-bold text-base">
              <span>🤗</span>
              <span>Hugging Face</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Spotlight: Root-Cause Rewind Interactive Showcase ──── */}
      <section id="rewind" className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-[#111C33] via-[#0E172A] to-[#0A101E] rounded-3xl p-8 sm:p-14 border border-blue-400/20 shadow-2xl relative overflow-hidden">
          
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30 mb-5">
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              <span>The Defining Innovation</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Root-Cause Rewind in Action
            </h2>

            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              When a student repeatedly fails calculus problems on the <strong className="text-white">Chain Rule</strong> (<code className="text-cyan-300 font-mono text-xs px-1.5 py-0.5 bg-blue-950/70 rounded border border-blue-400/30">[f(g(x))]&apos;</code>), existing LLMs merely repeat the derivative formula. 
              <strong> RootCause Tutor</strong> evaluates the topological knowledge graph backward, isolates the root misconception in <strong className="text-rose-400">Function Composition</strong>, opens the exact timestamped lecture video explanation, and remediates the prerequisite bottleneck.
            </p>
          </div>

          {/* 3 Step Diagnostic Flow */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-rose-500/40 transition-all flex flex-col justify-between group">
              <div>
                <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider">Step 1 • Error Pattern</span>
                <h3 className="text-lg font-bold text-white mt-1.5">Repeated Chain Rule Errors</h3>
                <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                  Student missed 3 consecutive derivative problems with low confidence tags.
                </p>
              </div>
              <div className="mt-5 p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-200 font-mono">
                ⚠️ Symptom: Failed <span className="text-white">d/dx sin(3x²)</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-purple-500/40 transition-all flex flex-col justify-between group">
              <div>
                <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">Step 2 • Graph Traversal</span>
                <h3 className="text-lg font-bold text-white mt-1.5">Topological Graph Trace</h3>
                <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                  Knowledge graph evaluates dependencies and traces error to prerequisite concept.
                </p>
              </div>
              <div className="mt-5 p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs text-purple-200 font-mono">
                🎯 Root Cause: Function Composition decomposition gap
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-emerald-500/40 transition-all flex flex-col justify-between group">
              <div>
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Step 3 • Grounded Remediation</span>
                <h3 className="text-lg font-bold text-white mt-1.5">Timestamped Video Practice</h3>
                <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                  Opens Lecture 3 at 14:20 and provides targeted micro-practice with Socratic hints.
                </p>
              </div>
              <div className="mt-5 p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-200 font-mono">
                ✅ Outcome: Gap mastered → 100% quiz accuracy
              </div>
            </div>

          </div>

          {/* Action Link */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 relative z-10 pt-6 border-t border-white/[0.08]">
            <span className="text-xs text-slate-400">
              Evaluated with synthetic and real student cohorts across 24 collegiate calculus and algorithms topics.
            </span>
            <button
              onClick={() => navigate('/report/report-001')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-blue-300 hover:text-white transition-colors cursor-pointer"
            >
              <span>Inspect Sample Root-Cause Diagnostic Report</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* ── 5. Platform Architecture & Features Grid ──────────────── */}
      <section id="features" className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-400 tracking-widest uppercase">
            Platform Capabilities
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-2.5">
            Engineered for Deep Conceptual Learning
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Every feature is purpose-built to deliver verifiable, hallucination-free adaptive tutoring.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="p-7 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-blue-400/40 hover:bg-white/[0.06] transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform border border-blue-400/20">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${feat.badgeColor}`}>
                      {feat.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">{feat.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-2.5 leading-relaxed">{feat.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 6. Horizontal Modules Suite ───────────────────────────── */}
      <section id="modules" className="relative z-10 py-20 px-6 max-w-7xl mx-auto border-t border-white/[0.08]">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase">
            Module Suite
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
            Explore All 7 Adaptive Learning Components
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Click any component to launch directly into that workspace.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.title}
                onClick={() => navigate(m.path)}
                className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-blue-400/50 hover:bg-white/[0.08] flex flex-col items-center justify-center text-center gap-3 cursor-pointer transition-all duration-150 group"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors block">
                    {m.title}
                  </span>
                  <span className="text-[10px] text-slate-500 hidden sm:block mt-0.5">
                    {m.desc}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 7. Evaluation & Research Benchmarks ────────────────────── */}
      <section id="benchmarks" className="relative z-10 py-20 px-6 max-w-7xl mx-auto border-t border-white/[0.08]">
        <div className="bg-gradient-to-r from-blue-900/30 via-indigo-900/20 to-purple-900/30 rounded-3xl p-8 sm:p-12 border border-blue-400/20 backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs font-bold text-blue-400 tracking-wider uppercase">
                Rigorous Quantitative Benchmarks
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
                Evaluated for Faithfulness & Accuracy
              </h2>
              <p className="mt-3 text-slate-300 text-sm leading-relaxed">
                We evaluated RootCause Tutor against baseline RAG and ungrounded LLMs across 150 diagnostic scenarios with automated and human grading.
              </p>
              
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-300 font-medium">
                  <span>Source Grounding Faithfulness</span>
                  <span className="font-bold text-emerald-400">92.4% (vs 64.1% baseline)</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full w-[92%]" />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-300 font-medium pt-2">
                  <span>Root-Cause Identification Precision</span>
                  <span className="font-bold text-cyan-400">89.7% (vs 51.2% baseline)</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-cyan-400 h-full rounded-full w-[89%]" />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start lg:items-end justify-center">
              <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/[0.1] max-w-md w-full">
                <h4 className="text-sm font-bold text-white mb-2">Ready to explore the app?</h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Launch the full interactive environment with pre-loaded calculus, database, and systems coursework.
                </p>
                <button
                  onClick={() => navigate('/overview')}
                  className="w-full py-3 px-5 rounded-full bg-[#2563EB] hover:bg-blue-600 text-white font-semibold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Launch Workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. Clean Minimalist Footer ────────────────────────────── */}
      <footer className="relative z-10 border-t border-white/[0.08] py-12 px-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
              R
            </div>
            <p>© 2026 RootCause Tutor. Multimodal AI Hackathon Track D.</p>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => navigate('/overview')} className="hover:text-white transition-colors cursor-pointer">
              Workspace
            </button>
            <button onClick={() => navigate('/library')} className="hover:text-white transition-colors cursor-pointer">
              Library
            </button>
            <button onClick={() => navigate('/map')} className="hover:text-white transition-colors cursor-pointer">
              Knowledge Map
            </button>
            <button onClick={() => navigate('/eval-lab')} className="hover:text-white transition-colors cursor-pointer">
              Eval Lab
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
