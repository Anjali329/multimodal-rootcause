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
  TrendingUp,
  Sparkles
} from 'lucide-react';

export function OverviewPage() {
  const navigate = useNavigate();

  const featuresList = [
    {
      id: 'feat-rewind',
      title: 'Root-Cause Rewind',
      badge: 'Core Diagnosis',
      badgeColor: 'text-rose-700 border-rose-200 bg-rose-50',
      description: 'Traces failure patterns backward through prerequisite knowledge DAG to isolate foundational gaps.',
      icon: Target,
      iconColor: 'text-rose-600',
      iconBg: 'bg-rose-50 border-rose-100',
      path: '/report/report-001',
      cta: 'Inspect Diagnosis'
    },
    {
      id: 'feat-tutor',
      title: 'Socratic AI Tutor',
      badge: 'Zero Hallucinations',
      badgeColor: 'text-blue-700 border-blue-200 bg-blue-50',
      description: 'Interactive Socratic coach providing targeted hints and diagram proofs grounded in your course materials.',
      icon: MessageSquare,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50 border-blue-100',
      path: '/tutor',
      cta: 'Launch Tutor'
    },
    {
      id: 'feat-map',
      title: 'Topological Knowledge Map',
      badge: 'Visual DAG',
      badgeColor: 'text-purple-700 border-purple-200 bg-purple-50',
      description: 'Interactive concept graph displaying live mastery levels, dependency bottlenecks, and remedial learning paths.',
      icon: Network,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-50 border-purple-100',
      path: '/map',
      cta: 'Explore Map'
    },
    {
      id: 'feat-library',
      title: 'Multimodal Source Grounding',
      badge: 'OCR & Video Citations',
      badgeColor: 'text-cyan-700 border-cyan-200 bg-cyan-50',
      description: 'Course lecture PDFs, slides, and timestamped video recordings auto-indexed into granular conceptual units.',
      icon: Video,
      iconColor: 'text-cyan-600',
      iconBg: 'bg-cyan-50 border-cyan-100',
      path: '/library',
      cta: 'Open Library'
    },
    {
      id: 'feat-quiz',
      title: 'Adaptive Quiz Arena',
      badge: 'Confidence-Weighted',
      badgeColor: 'text-amber-700 border-amber-200 bg-amber-50',
      description: 'Calibrated diagnostic assessments with Sure/Maybe/Guess signaling to distinguish true gaps from test fatigue.',
      icon: Trophy,
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-50 border-amber-100',
      path: '/quiz',
      cta: 'Start Practice'
    },
    {
      id: 'feat-eval',
      title: 'Evaluation & Faithfulness Lab',
      badge: '92.4% Precision',
      badgeColor: 'text-fuchsia-700 border-fuchsia-200 bg-fuchsia-50',
      description: 'Benchmark suite evaluating retrieval faithfulness, citation precision, context recall, and comparative ablations.',
      icon: FlaskConical,
      iconColor: 'text-fuchsia-600',
      iconBg: 'bg-fuchsia-50 border-fuchsia-100',
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
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50',
    },
    {
      id: 'act-2',
      title: 'Attempted: SQL Joins Quiz',
      subject: 'Database Systems',
      time: '4h ago',
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-50',
    },
    {
      id: 'act-3',
      title: 'Viewed: System Design Notes',
      subject: 'System Design',
      time: '6h ago',
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-50',
    },
    {
      id: 'act-4',
      title: 'Traced: Chain Rule Gap',
      subject: 'Calculus I (Function Comp)',
      time: '1d ago',
      iconColor: 'text-rose-600',
      iconBg: 'bg-rose-50',
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* ── Top Bar ──────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Learning Workspace
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Real-time multimodal diagnostics, prerequisite tracking, and Socratic remediation
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Active Session: CS500 Deep Learning</span>
          </div>
        </div>
      </div>

      {/* ── Main Two-Column Layout: Features Left, Dashboard Right ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-7 items-start">
        
        {/* ═════════════════════════════════════════════════════════════ */}
        {/* ── LEFT SIDE: Core Platform Features Arranged Vertically ── */}
        {/* ═════════════════════════════════════════════════════════════ */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="flex items-center justify-between pb-1">
            <div>
              <span className="text-[11px] font-bold text-blue-600 tracking-wider uppercase">
                Platform Capabilities
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight mt-0.5">
                Adaptive Features
              </h2>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
              6 Modules Active
            </span>
          </div>

          {/* Vertical Feature Cards Stack */}
          <div className="space-y-3">
            {featuresList.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.id}
                  onClick={() => navigate(feat.path)}
                  className="bg-white hover:border-slate-300 rounded-2xl p-4 sm:p-4.5 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-150 cursor-pointer group flex items-start gap-3.5"
                >
                  {/* Icon */}
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border group-hover:scale-105 transition-transform ${feat.iconBg} ${feat.iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Feature Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="font-bold text-sm text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                        {feat.title}
                      </h3>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border shrink-0 ${feat.badgeColor}`}>
                        {feat.badge}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                      {feat.description}
                    </p>

                    <div className="mt-2.5 flex items-center gap-1 text-[11px] font-semibold text-blue-600 group-hover:text-blue-700 transition-colors">
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
        <div className="lg:col-span-7 space-y-5">
          
          <div className="flex items-center justify-between pb-1">
            <div>
              <span className="text-[11px] font-bold text-emerald-600 tracking-wider uppercase">
                Learner Analytics
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight mt-0.5">
                Personal Progress Dashboard
              </h2>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Optimal Study State
            </span>
          </div>

          {/* 1. Hero Diagnostic Gap Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 border border-rose-200 text-rose-700">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  Critical Prerequisite Gap
                </span>
                <span className="text-xs text-slate-500 font-mono font-medium">
                  Identified 45 mins ago
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Gradient Vanishing in Deep ResNets
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                  Struggling with residual connections? Root-cause tracer detected missing mastery in 
                  <span className="font-semibold text-blue-600"> Activation Function Derivatives</span> and 
                  <span className="font-semibold text-purple-600"> Matrix Jacobians</span>.
                </p>
              </div>

              {/* Progress & Confidence */}
              <div className="space-y-2 pt-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-500">Remediation Progress</span>
                  <span className="text-slate-900 font-bold font-mono">35% Complete</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                    style={{ width: '35%' }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => navigate('/tutor')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-all cursor-pointer"
                >
                  <span>Launch Socratic AI Tutor</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => navigate('/map')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-medium text-xs transition-all cursor-pointer"
                >
                  <span>Inspect DAG Graph</span>
                </button>
                <button
                  onClick={() => navigate('/report/report-001')}
                  className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
                >
                  <span>View Report</span>
                </button>
              </div>
            </div>
          </div>

          {/* 2. Four Metric Stat Cards (2x2 Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Metric 1: Accuracy */}
            <div className="bg-white hover:border-slate-300 rounded-2xl p-5 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-150 flex flex-col justify-between min-w-0 group">
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Target className="w-4.5 h-4.5" />
                </div>
                <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +12%
                </span>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Overall Accuracy</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">78%</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Based on 45 answered questions</p>
              </div>
            </div>

            {/* Metric 2: Topics Mastered */}
            <div className="bg-white hover:border-slate-300 rounded-2xl p-5 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-150 flex flex-col justify-between min-w-0 group">
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <CheckCircle2 className="w-4.5 h-4.5" />
                </div>
                <span className="text-[11px] text-blue-700 font-bold bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                  50%
                </span>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Topics Mastered</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">12 / 24</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Calculus & Database modules</p>
              </div>
            </div>

            {/* Metric 3: Current Streak */}
            <div className="bg-white hover:border-slate-300 rounded-2xl p-5 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-150 flex flex-col justify-between min-w-0 group">
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 border border-orange-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Flame className="w-4.5 h-4.5 fill-orange-500 text-orange-600" />
                </div>
                <span className="text-[11px] text-orange-700 font-bold bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full">
                  Best Streak
                </span>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Current Streak</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">5 Days</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Consecutive daily problem solving</p>
              </div>
            </div>

            {/* Metric 4: Source Materials */}
            <div className="bg-white hover:border-slate-300 rounded-2xl p-5 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-150 flex flex-col justify-between min-w-0 group">
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <BookOpen className="w-4.5 h-4.5" />
                </div>
                <span className="text-[11px] text-purple-700 font-bold bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full">
                  Indexed
                </span>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">Source Materials</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">4 Sources</p>
                <p className="text-[11px] text-slate-400 mt-0.5">PDF syllabi & lecture videos</p>
              </div>
            </div>

          </div>

          {/* 3. Recent Activity Stream */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Recent Learning Stream</span>
              </h3>
              <button
                onClick={() => navigate('/report/report-001')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>View Full History</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {recentActivities.map((act) => (
                <div
                  key={act.id}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 flex items-center gap-3 min-w-0 transition-all"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${act.iconBg} ${act.iconColor}`}>
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {act.title}
                    </p>
                    <p className="text-[10px] text-slate-500 truncate mt-0.5">
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
