import { useState } from 'react';
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
  ChevronRight,
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  CheckCircle2,
  ShieldCheck,
  Zap
} from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();

  // Login Card Form State
  const [email, setEmail] = useState('anjali@rootcause.ai');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/overview');
    }, 400);
  };

  const handleQuickDemo = () => {
    navigate('/overview');
  };

  const features = [
    {
      icon: Target,
      title: 'Root-Cause Rewind',
      description: 'Discovers the true origin of repeated mistakes by tracing backward through topological prerequisite graphs instead of just repeating formulas.',
      badge: 'Core Innovation',
      accent: 'bg-rose-50 border-rose-200 text-rose-700',
      iconBg: 'bg-rose-100/70 text-rose-600',
    },
    {
      icon: Video,
      title: 'Multimodal Source Grounding',
      description: 'Every explanation is grounded directly in uploaded lecture PDFs, slide decks, and timestamped video recordings with zero hallucinations.',
      badge: 'Zero Hallucinations',
      accent: 'bg-teal-50 border-teal-200 text-teal-700',
      iconBg: 'bg-teal-100/70 text-teal-600',
    },
    {
      icon: Network,
      title: 'Topological Knowledge Map',
      description: 'Visual interactive dependency graph displaying real-time concept mastery, prerequisite bottlenecks, and clear remedial learning paths.',
      badge: 'DAG Mastery',
      accent: 'bg-purple-50 border-purple-200 text-purple-700',
      iconBg: 'bg-purple-100/70 text-purple-600',
    },
    {
      icon: MessageSquare,
      title: 'Socratic AI Tutor',
      description: 'A conversational agent that guides students with targeted hints and conceptual checkpoints rather than giving away direct answers.',
      badge: 'Interactive Coach',
      accent: 'bg-indigo-50 border-indigo-200 text-indigo-700',
      iconBg: 'bg-indigo-100/70 text-indigo-600',
    },
    {
      icon: Trophy,
      title: 'Adaptive Quiz Arena',
      description: 'Diagnostic assessments with confidence signaling (Sure, Maybe, Guess) that isolate genuine misconceptions from simple test fatigue.',
      badge: 'Confidence-Weighted',
      accent: 'bg-amber-50 border-amber-200 text-amber-700',
      iconBg: 'bg-amber-100/70 text-amber-600',
    },
    {
      icon: FlaskConical,
      title: 'Evaluation & Faithfulness Lab',
      description: 'Inspect model retrieval faithfulness (92.4%), citation precision, context recall, and comparative ablation benchmark test runs.',
      badge: '92% Faithfulness',
      accent: 'bg-fuchsia-50 border-fuchsia-200 text-fuchsia-700',
      iconBg: 'bg-fuchsia-100/70 text-fuchsia-600',
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
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-indigo-500 selection:text-white font-sans antialiased overflow-x-hidden relative">
      
      {/* ── Background Subtle Pattern & Soft Glows ─────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#0000000a_1px,transparent_1px)] [background-size:24px_24px] opacity-70" />
        <div className="absolute top-[-10%] left-[20%] w-[650px] h-[450px] bg-indigo-200/30 rounded-full blur-[140px]" />
        <div className="absolute top-[15%] right-[-5%] w-[550px] h-[550px] bg-teal-100/40 rounded-full blur-[150px]" />
        <div className="absolute top-[60%] left-[-10%] w-[600px] h-[600px] bg-purple-100/30 rounded-full blur-[160px]" />
      </div>

      {/* ── 1. Top Navigation Bar ─────────────────────────────────── */}
      <nav className="relative z-30 border-b border-slate-200/80 backdrop-blur-xl bg-white/85 sticky top-0 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo Mark */}
          <div 
            onClick={() => navigate('/overview')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold tracking-tight text-slate-900">
                RootCause <span className="font-normal text-slate-500">Tutor</span>
              </span>
            </div>
          </div>

          {/* Center Links */}
          <div className="hidden md:flex items-center gap-8 text-[13px] font-medium text-slate-600">
            <a href="#about" className="hover:text-slate-900 transition-colors">About</a>
            <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
            <a href="#rewind" className="hover:text-slate-900 transition-colors">Methodology</a>
            <a href="#modules" className="hover:text-slate-900 transition-colors">Modules</a>
            <a href="#benchmarks" className="hover:text-slate-900 transition-colors">Benchmarks</a>
          </div>

          {/* Right Action Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/overview')}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-medium text-xs sm:text-sm transition-all duration-150 cursor-pointer shadow-sm hover:border-slate-300"
            >
              <span>Launch App</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </button>
          </div>

        </div>
      </nav>

      {/* ── 2. Hero Section (2-Column Grid: Copy + Compact Login Card) ── */}
      <section className="relative z-10 pt-12 pb-20 lg:pt-16 lg:pb-28 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Hero Copy, Badge, CTAs, & Stats */}
          <div className="lg:col-span-7 flex flex-col items-start text-left min-w-0">
            
            {/* Announcement Pill Badge */}
            <div 
              onClick={() => navigate('/overview')}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-medium bg-white border border-slate-200/90 text-slate-600 mb-6 shadow-sm hover:border-slate-300 transition-all cursor-pointer group"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
              <span>Multimodal AI Hackathon • Track D</span>
              <span className="text-slate-300 font-light">|</span>
              <span className="text-indigo-600 font-semibold group-hover:text-indigo-700 transition-colors flex items-center gap-1">
                Explore Demo <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
              Revolutionizing
              <span className="block mt-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                Education with AI
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
              Experience the future of learning with AI-driven online education solutions. Grounded in lecture materials, diagnosing hidden prerequisite gaps, and guiding every student through Socratic mastery.
            </p>

            {/* Action CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate('/overview')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-600/20 transition-all duration-150 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Get Started</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <a
                href="#features"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-sm font-medium shadow-sm transition-all duration-150 cursor-pointer hover:border-slate-300"
              >
                <Sliders className="w-4 h-4 text-slate-500" />
                <span>Explore all features</span>
              </a>
            </div>

            {/* 3 Key Stats Row */}
            <div className="mt-12 pt-8 border-t border-slate-200/90 grid grid-cols-3 gap-6 sm:gap-10 w-full max-w-lg">
              
              <div className="flex flex-col">
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  95%
                </span>
                <span className="text-xs text-slate-500 mt-1 leading-snug">
                  Personalization accuracy
                </span>
              </div>

              <div className="flex flex-col border-l border-slate-200 pl-6 sm:pl-8">
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  30%
                </span>
                <span className="text-xs text-slate-500 mt-1 leading-snug">
                  Learning efficiency gain
                </span>
              </div>

              <div className="flex flex-col border-l border-slate-200 pl-6 sm:pl-8">
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  100k+
                </span>
                <span className="text-xs text-slate-500 mt-1 leading-snug">
                  Active diagnostic graphs
                </span>
              </div>

            </div>

          </div>

          {/* Right Column: Small Clean Login Card */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end relative">
            <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.06)] relative z-10 transition-all hover:shadow-[0_16px_48px_rgba(0,0,0,0.09)]">
              
              {/* Card Top Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Interactive Student Portal</span>
                </div>
                <span className="text-xs text-slate-400 font-mono">v2.4 Demo</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Sign in to RootCause
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Access your personalized study roadmap & diagnostic graphs.
              </p>

              {/* Instant 1-Click Demo Button */}
              <button
                type="button"
                onClick={handleQuickDemo}
                className="mt-5 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 border border-indigo-200/80 text-indigo-700 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm group"
              >
                <Zap className="w-4 h-4 text-indigo-600 group-hover:scale-110 transition-transform" />
                <span>Quick Access Demo (as Anjali)</span>
                <ArrowRight className="w-3.5 h-3.5 ml-auto text-indigo-500 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <div className="my-5 flex items-center gap-3">
                <div className="h-px bg-slate-200 flex-1" />
                <span className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">or continue with email</span>
                <div className="h-px bg-slate-200 flex-1" />
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                
                {/* Email Field */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@university.edu"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none transition-all bg-slate-50/50 focus:bg-white"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-slate-700">
                      Password
                    </label>
                    <a href="#forgot" onClick={(e) => { e.preventDefault(); navigate('/overview'); }} className="text-[11px] text-indigo-600 hover:text-indigo-700 font-medium">
                      Forgot?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none transition-all bg-slate-50/50 focus:bg-white"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-3.5 h-3.5 rounded text-indigo-600 focus:ring-indigo-400 border-slate-300"
                    />
                    <span className="text-xs text-slate-600">Keep me logged in</span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm hover:shadow"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" />
                      <span>Sign In to Dashboard</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </>
                  )}
                </button>
              </form>

              {/* Card Footer Trust Badges */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  SOC-2 Grounded
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
                  Encrypted Learning Vault
                </span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ── 3. "OUR INVESTORS & PARTNERS" Section ──────────────────── */}
      <section className="relative z-10 py-10 border-y border-slate-200/80 bg-white/70">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-semibold tracking-widest text-slate-400 uppercase mb-6">
            OUR RESEARCH PARTNERS & DATA SOURCES
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-80 transition-all duration-300">
            <div className="flex items-center gap-2 text-slate-700 font-bold text-base tracking-wider">
              <div className="w-2.5 h-2.5 rounded-full bg-teal-500" />
              <span>DATAPOINT</span>
            </div>

            <div className="text-slate-800 font-extrabold text-lg tracking-tight">
              GUMROAD
            </div>

            <div className="flex items-center gap-2 text-slate-700 font-semibold text-xs sm:text-sm tracking-wide">
              <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-800">MIT</span>
              <span>OpenCourseWare</span>
            </div>

            <div className="flex items-center gap-2 text-slate-700 font-semibold text-xs sm:text-sm tracking-wide">
              <span className="font-serif font-bold text-red-600">Stanford</span>
              <span>AI Lab</span>
            </div>

            <div className="flex items-center gap-1.5 text-slate-700 font-bold text-sm sm:text-base">
              <span>🤗</span>
              <span>Hugging Face</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Spotlight: Root-Cause Rewind Interactive Showcase ──── */}
      <section id="rewind" className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xl shadow-slate-100 relative overflow-hidden">
          
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>The Defining Innovation</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Root-Cause Rewind in Action
            </h2>

            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              When a student repeatedly fails calculus problems on the <strong className="text-slate-900">Chain Rule</strong> (<code className="text-indigo-600 font-mono text-xs px-1.5 py-0.5 bg-indigo-50 rounded border border-indigo-200">[f(g(x))]&apos;</code>), existing LLMs merely repeat the derivative formula. 
              <strong className="text-slate-900"> RootCause Tutor</strong> evaluates the topological knowledge graph backward, isolates the root misconception in <strong className="text-rose-600">Function Composition</strong>, opens the exact timestamped lecture video explanation, and remediates the prerequisite bottleneck.
            </p>
          </div>

          {/* 3 Step Diagnostic Flow */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-rose-300 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider">Step 1 • Error Pattern</span>
                <h3 className="text-lg font-bold text-slate-900 mt-1.5">Repeated Chain Rule Errors</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Student missed 3 consecutive derivative problems with low confidence tags.
                </p>
              </div>
              <div className="mt-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-mono">
                ⚠️ Symptom: Failed <span className="font-semibold text-slate-900">d/dx sin(3x²)</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-purple-300 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider">Step 2 • Graph Traversal</span>
                <h3 className="text-lg font-bold text-slate-900 mt-1.5">Topological Graph Trace</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Knowledge graph evaluates dependencies and traces error to prerequisite concept.
                </p>
              </div>
              <div className="mt-5 p-3 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-800 font-mono">
                🎯 Root Cause: Function Composition decomposition gap
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-emerald-300 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">Step 3 • Grounded Remediation</span>
                <h3 className="text-lg font-bold text-slate-900 mt-1.5">Timestamped Video Practice</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Opens Lecture 3 at 14:20 and provides targeted micro-practice with Socratic hints.
                </p>
              </div>
              <div className="mt-5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-mono">
                ✅ Outcome: Gap mastered → 100% quiz accuracy
              </div>
            </div>

          </div>

          {/* Action Link */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 relative z-10 pt-6 border-t border-slate-100">
            <span className="text-xs text-slate-500">
              Evaluated with synthetic and real student cohorts across 24 collegiate calculus and algorithms topics.
            </span>
            <button
              onClick={() => navigate('/report/report-001')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
            >
              <span>Inspect Sample Root-Cause Diagnostic Report</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* ── 5. Platform Architecture & Features Grid ──────────────── */}
      <section id="features" className="relative z-10 py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-indigo-600 tracking-widest uppercase">
            Platform Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
            Engineered for Deep Conceptual Learning
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2.5">
            Every feature is purpose-built to deliver verifiable, hallucination-free adaptive tutoring.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-lg transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl ${feat.iconBg} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${feat.accent}`}>
                      {feat.badge}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">{feat.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">{feat.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 6. Horizontal Modules Suite ───────────────────────────── */}
      <section id="modules" className="relative z-10 py-16 px-6 max-w-7xl mx-auto border-t border-slate-200/80">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-teal-600 tracking-widest uppercase">
            Module Suite
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1.5">
            Explore All 7 Adaptive Learning Components
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1.5">
            Click any component to launch directly into that workspace.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3.5">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.title}
                onClick={() => navigate(m.path)}
                className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-300 hover:shadow-md flex flex-col items-center justify-center text-center gap-2.5 cursor-pointer transition-all duration-150 group"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-50 text-indigo-600 border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors block">
                    {m.title}
                  </span>
                  <span className="text-[10px] text-slate-400 hidden sm:block mt-0.5">
                    {m.desc}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 7. Evaluation & Research Benchmarks ────────────────────── */}
      <section id="benchmarks" className="relative z-10 py-16 px-6 max-w-7xl mx-auto border-t border-slate-200/80">
        <div className="bg-gradient-to-r from-slate-50 via-indigo-50/20 to-purple-50/20 rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs font-bold text-indigo-600 tracking-wider uppercase">
                Rigorous Quantitative Benchmarks
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1.5">
                Evaluated for Faithfulness & Accuracy
              </h2>
              <p className="mt-2.5 text-slate-600 text-xs sm:text-sm leading-relaxed">
                We evaluated RootCause Tutor against baseline RAG and ungrounded LLMs across 150 diagnostic scenarios with automated and human grading.
              </p>
              
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-700 font-medium">
                  <span>Source Grounding Faithfulness</span>
                  <span className="font-bold text-emerald-600">92.4% (vs 64.1% baseline)</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full w-[92%]" />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-700 font-medium pt-2">
                  <span>Root-Cause Identification Precision</span>
                  <span className="font-bold text-indigo-600">89.7% (vs 51.2% baseline)</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full rounded-full w-[89%]" />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start lg:items-end justify-center">
              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-md max-w-md w-full">
                <h4 className="text-sm font-bold text-slate-900 mb-1.5">Ready to explore the app?</h4>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  Launch the full interactive environment with pre-loaded calculus, database, and systems coursework.
                </p>
                <button
                  onClick={() => navigate('/overview')}
                  className="w-full py-2.5 px-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-indigo-600/20 transition-all cursor-pointer flex items-center justify-center gap-2"
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
      <footer className="relative z-10 border-t border-slate-200 py-10 px-6 text-xs text-slate-500 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
              R
            </div>
            <p>© 2026 RootCause Tutor. Multimodal AI Hackathon Track D.</p>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => navigate('/overview')} className="hover:text-slate-900 transition-colors cursor-pointer">
              Workspace
            </button>
            <button onClick={() => navigate('/library')} className="hover:text-slate-900 transition-colors cursor-pointer">
              Library
            </button>
            <button onClick={() => navigate('/map')} className="hover:text-slate-900 transition-colors cursor-pointer">
              Knowledge Map
            </button>
            <button onClick={() => navigate('/eval-lab')} className="hover:text-slate-900 transition-colors cursor-pointer">
              Eval Lab
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
