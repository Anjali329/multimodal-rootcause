import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  BookOpen, 
  Flame, 
  Target, 
  CheckCircle2, 
  Clock,
  MessageSquare,
  Network,
  Trophy,
  FlaskConical,
  Video,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

export function OverviewPage() {
  const navigate = useNavigate();

  const featuresList = [
    {
      id: 'feat-rewind',
      title: 'Root-Cause Rewind',
      badge: 'Core Diagnosis',
      badgeColor: 'text-rose-400 border-rose-500/30 bg-rose-500/10',
      description: 'Traces failure patterns backward through prerequisite knowledge DAG to isolate foundational gaps.',
      icon: Target,
      iconColor: 'text-rose-400',
      iconBg: 'bg-rose-500/15 border-rose-500/20',
      path: '/report/report-001',
      cta: 'Inspect Diagnosis'
    },
    {
      id: 'feat-tutor',
      title: 'Socratic AI Tutor',
      badge: 'Zero Hallucinations',
      badgeColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
      description: 'Interactive Socratic coach providing targeted hints and diagram proofs grounded in your course materials.',
      icon: MessageSquare,
      iconColor: 'text-cyan-400',
      iconBg: 'bg-cyan-500/15 border-cyan-500/20',
      path: '/tutor',
      cta: 'Launch Tutor'
    },
    {
      id: 'feat-map',
      title: 'Topological Knowledge Map',
      badge: 'Visual DAG',
      badgeColor: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
      description: 'Interactive concept graph displaying live mastery levels, dependency bottlenecks, and remedial learning paths.',
      icon: Network,
      iconColor: 'text-purple-400',
      iconBg: 'bg-purple-500/15 border-purple-500/20',
      path: '/map',
      cta: 'Explore Map'
    },
    {
      id: 'feat-library',
      title: 'Multimodal Source Grounding',
      badge: 'OCR & Video Citations',
      badgeColor: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
      description: 'Course lecture PDFs, slides, and timestamped video recordings auto-indexed into granular conceptual units.',
      icon: Video,
      iconColor: 'text-blue-400',
      iconBg: 'bg-blue-500/15 border-blue-500/20',
      path: '/library',
      cta: 'Open Library'
    },
    {
      id: 'feat-quiz',
      title: 'Adaptive Quiz Arena',
      badge: 'Confidence-Weighted',
      badgeColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
      description: 'Calibrated diagnostic assessments with Sure/Maybe/Guess signaling to distinguish true gaps from test fatigue.',
      icon: Trophy,
      iconColor: 'text-amber-400',
      iconBg: 'bg-amber-500/15 border-amber-500/20',
      path: '/quiz',
      cta: 'Start Practice'
    },
    {
      id: 'feat-eval',
      title: 'Evaluation & Faithfulness Lab',
      badge: '92.4% Precision',
      badgeColor: 'text-fuchsia-400 border-fuchsia-500/30 bg-fuchsia-500/10',
      description: 'Benchmark suite evaluating retrieval faithfulness, citation precision, context recall, and comparative ablations.',
      icon: FlaskConical,
      iconColor: 'text-fuchsia-400',
      iconBg: 'bg-fuchsia-500/15 border-fuchsia-500/20',
      path: '/eval-lab',
      cta: 'View Benchmarks'
    },
  ];

  const recentActivities = [
    {
      id: 'act-1',
      title: 'Completed: Binary Trees',
      subject: 'Data Structures & Algorithms',
      time: '2h ago',
      iconColor: 'text-blue-400',
      iconBg: 'bg-blue-500/15',
    },
    {
      id: 'act-2',
      title: 'Attempted: SQL Joins Quiz',
      subject: 'Database Systems',
      time: '4h ago',
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-500/15',
    },
    {
      id: 'act-3',
      title: 'Viewed: System Design Notes',
      subject: 'System Design',
      time: '6h ago',
      iconColor: 'text-purple-400',
      iconBg: 'bg-purple-500/15',
    },
    {
      id: 'act-4',
      title: 'Traced: Chain Rule Gap',
      subject: 'Calculus I (Function Comp)',
      time: '1d ago',
      iconColor: 'text-rose-400',
      iconBg: 'bg-rose-500/15',
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* ── Main Two-Column Layout: Features Left, Dashboard Right ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* ═════════════════════════════════════════════════════════════ */}
        {/* ── LEFT SIDE: Core Platform Features Arranged Vertically ── */}
        {/* ═════════════════════════════════════════════════════════════ */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="flex items-center justify-between pb-1">
            <div>
              <span className="text-[11px] font-bold text-cyan-400 tracking-widest uppercase">
                Platform Capabilities
              </span>
              <h2 className="text-xl font-extrabold text-white tracking-tight mt-0.5">
                Adaptive Features
              </h2>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] text-slate-300">
              6 Modules Active
            </span>
          </div>

          {/* Vertical Feature Cards Stack */}
          <div className="space-y-3.5">
            {featuresList.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.id}
                  onClick={() => navigate(feat.path)}
                  className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-blue-400/40 rounded-2xl p-4 sm:p-4.5 transition-all duration-200 cursor-pointer group shadow-xl backdrop-blur-md flex items-start gap-4"
                >
                  {/* Glowing Icon */}
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border group-hover:scale-105 transition-transform ${feat.iconBg} ${feat.iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Feature Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="font-bold text-sm text-white truncate group-hover:text-blue-300 transition-colors">
                        {feat.title}
                      </h3>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border shrink-0 ${feat.badgeColor}`}>
                        {feat.badge}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                      {feat.description}
                    </p>

                    <div className="mt-2.5 flex items-center gap-1 text-[11px] font-semibold text-blue-300 group-hover:text-white transition-colors">
                      <span>{feat.cta}</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* ═════════════════════════════════════════════════════════════ */}
        {/* ── RIGHT SIDE: Operational Learning Dashboard ───────────── */}
        {/* ═════════════════════════════════════════════════════════════ */}
        <div className="lg:col-span-7 space-y-6 min-w-0">
          
          <div className="flex items-center justify-between pb-1">
            <div>
              <span className="text-[11px] font-bold text-blue-400 tracking-widest uppercase">
                Student Command Center
              </span>
              <h2 className="text-xl font-extrabold text-white tracking-tight mt-0.5">
                Learning Dashboard
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
              <span className="text-xs font-semibold text-slate-300">Active Session</span>
            </div>
          </div>

          {/* 1. Top Hero Card: Root-Cause Diagnostic Gap */}
          <div className="bg-gradient-to-br from-[#111C33] via-[#0E172A] to-[#0A101E] rounded-3xl p-6 sm:p-7 border border-blue-400/25 shadow-2xl relative overflow-hidden min-w-0">
            <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-3.5 relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse shadow-[0_0_8px_#f43f5e]" />
                <span>Root-Cause Diagnostic Gap</span>
              </div>

              {/* Title with Iridescent Gradient */}
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
                Underlying Gap:{' '}
                <span className="bg-gradient-to-r from-[#D946EF] via-[#C084FC] to-[#38BDF8] bg-clip-text text-transparent">
                  Function Composition
                </span>
              </h2>

              {/* Explanation */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                You repeatedly made errors calculating derivatives via the Chain Rule (<code className="font-mono text-xs bg-blue-950/70 text-cyan-300 px-1.5 py-0.5 rounded border border-blue-400/30">[f(g(x))]&apos;</code>). Topological prerequisite analysis found your root roadblock is decomposing nested functions.
              </p>

              {/* Action CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => navigate('/tutor')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2563EB] hover:bg-blue-600 text-white font-semibold text-xs shadow-lg shadow-blue-500/25 transition-all duration-150 cursor-pointer hover:scale-[1.02]"
                >
                  <span>Launch Socratic AI Tutor</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => navigate('/map')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 border border-white/[0.12] font-medium text-xs backdrop-blur-md transition-all duration-150 cursor-pointer"
                >
                  <span>Inspect DAG Graph</span>
                </button>
                <button
                  onClick={() => navigate('/report/report-001')}
                  className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-blue-300 hover:text-white transition-colors cursor-pointer"
                >
                  <span>View Report</span>
                </button>
              </div>
            </div>
          </div>

          {/* 2. Four Metric Stat Cards (2x2 Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Metric 1: Accuracy */}
            <div className="bg-white/[0.03] hover:bg-white/[0.06] hover:border-blue-400/40 rounded-2xl p-5 border border-white/[0.08] shadow-xl transition-all duration-200 backdrop-blur-md flex flex-col justify-between min-w-0 group">
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-blue-500/15 text-blue-400 border border-blue-400/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Target className="w-4.5 h-4.5" />
                </div>
                <span className="text-[11px] text-emerald-400 font-bold bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +12%
                </span>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400">Overall Accuracy</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1 tracking-tight">78%</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Based on 45 answered questions</p>
              </div>
            </div>

            {/* Metric 2: Topics Mastered */}
            <div className="bg-white/[0.03] hover:bg-white/[0.06] hover:border-emerald-400/40 rounded-2xl p-5 border border-white/[0.08] shadow-xl transition-all duration-200 backdrop-blur-md flex flex-col justify-between min-w-0 group">
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-400/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <CheckCircle2 className="w-4.5 h-4.5" />
                </div>
                <span className="text-[11px] text-blue-300 font-bold bg-blue-500/15 border border-blue-500/30 px-2 py-0.5 rounded-full">
                  50%
                </span>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400">Topics Mastered</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1 tracking-tight">12 / 24</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Calculus & Database modules</p>
              </div>
            </div>

            {/* Metric 3: Current Streak */}
            <div className="bg-white/[0.03] hover:bg-white/[0.06] hover:border-orange-400/40 rounded-2xl p-5 border border-white/[0.08] shadow-xl transition-all duration-200 backdrop-blur-md flex flex-col justify-between min-w-0 group">
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-orange-500/15 text-orange-400 border border-orange-400/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Flame className="w-4.5 h-4.5 fill-orange-400" />
                </div>
                <span className="text-[11px] text-orange-400 font-bold bg-orange-500/15 border border-orange-500/30 px-2 py-0.5 rounded-full">
                  Best Streak
                </span>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400">Current Streak</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1 tracking-tight">5 Days</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Consecutive daily problem solving</p>
              </div>
            </div>

            {/* Metric 4: Source Materials */}
            <div className="bg-white/[0.03] hover:bg-white/[0.06] hover:border-purple-400/40 rounded-2xl p-5 border border-white/[0.08] shadow-xl transition-all duration-200 backdrop-blur-md flex flex-col justify-between min-w-0 group">
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-400 border border-purple-400/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <BookOpen className="w-4.5 h-4.5" />
                </div>
                <span className="text-[11px] text-purple-300 font-bold bg-purple-500/15 border border-purple-500/30 px-2 py-0.5 rounded-full">
                  Indexed
                </span>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400">Source Materials</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1 tracking-tight">4 Sources</p>
                <p className="text-[11px] text-slate-400 mt-0.5">PDF syllabi & lecture videos</p>
              </div>
            </div>

          </div>

          {/* 3. Recent Activity Stream */}
          <div className="bg-white/[0.03] rounded-3xl p-5 sm:p-6 border border-white/[0.08] shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>Recent Learning Stream</span>
              </h3>
              <button
                onClick={() => navigate('/report/report-001')}
                className="text-xs font-semibold text-blue-300 hover:text-white hover:underline flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>View Full History</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {recentActivities.map((act) => (
                <div
                  key={act.id}
                  className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-blue-400/30 hover:bg-white/[0.06] flex items-center gap-3 min-w-0 transition-all"
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${act.iconBg} ${act.iconColor}`}>
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-white truncate">
                      {act.title}
                    </p>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5">
                      {act.subject} • {act.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
