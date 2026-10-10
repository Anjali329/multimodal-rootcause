import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Flame, 
  Target, 
  CheckCircle2, 
  MessageSquare,
  Network,
  Trophy,
  FlaskConical,
  Video,
  ChevronRight,
  Sparkles,
  Zap,
  Lock,
  Compass,
  Layers,
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

  // Visual Roadmap Track Milestones
  const personalTrackMilestones = [
    {
      step: 1,
      title: 'Matrix Calculus & Jacobians',
      topic: 'Prerequisite Core',
      mastery: 95,
      status: 'completed',
      tag: 'Foundations Mastered',
      tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      desc: 'Vector gradients, chain-rule tensors, and multivariate differentials verified.',
    },
    {
      step: 2,
      title: 'Activation Function Derivatives',
      topic: 'Non-Linearities',
      mastery: 84,
      status: 'completed',
      tag: 'Prerequisite Remediated',
      tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      desc: 'Sigmoid saturation regimes & LeakyReLU derivative preservation mastered.',
    },
    {
      step: 3,
      title: 'Gradient Vanishing in Deep ResNets',
      topic: 'Active Root-Cause Blocker',
      mastery: 35,
      status: 'in_progress',
      tag: 'Current Diagnostic Focus',
      tagColor: 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse',
      desc: 'Diagnosed failure: exponential decay of backprop gradients across 18+ layers without identity shortcuts.',
    },
    {
      step: 4,
      title: 'Residual & Highway Skip Connections',
      topic: 'Remedial Architecture',
      mastery: 0,
      status: 'upcoming',
      tag: 'Next Step (Unlocks at 80% Step 3)',
      tagColor: 'bg-amber-50 text-amber-700 border-amber-200',
      desc: 'Formulation of identity mappings F(x) + x to preserve gradient flow magnitude.',
    },
    {
      step: 5,
      title: 'Multi-Head Attention & Transformer Gradients',
      topic: 'Capstone Objective',
      mastery: 0,
      status: 'locked',
      tag: 'Curriculum Goal',
      tagColor: 'bg-slate-100 text-slate-500 border-slate-200',
      desc: 'Self-attention scaling factors, LayerNorm placement, and deep gradient propagation.',
    },
  ];

  // Heatmap sessions matrix (7 rows x 16 columns)
  const heatmapData: number[][] = [
    [0, 1, 0, 0, 0, 2, 0, 0, 0, 0, 1, 2, 0, 3, 4, 3],
    [1, 0, 0, 0, 0, 4, 2, 0, 0, 0, 3, 0, 0, 4, 4, 4],
    [0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 2, 3, 4, 4],
    [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 3, 4, 4],
    [0, 0, 2, 0, 0, 0, 0, 2, 3, 0, 4, 3, 4, 4, 4, 4],
    [0, 3, 4, 0, 0, 0, 0, 0, 4, 0, 4, 4, 4, 4, 4, 4],
    [0, 4, 4, 0, 0, 0, 0, 0, 4, 0, 4, 4, 4, 4, 4, 4],
  ];

  const getHeatmapColor = (level: number) => {
    switch (level) {
      case 1: return 'bg-blue-100';
      case 2: return 'bg-blue-300';
      case 3: return 'bg-blue-500';
      case 4: return 'bg-blue-600';
      default: return 'bg-slate-100';
    }
  };

  const weeklyStudyHours = [
    { day: 'Mon', hours: 1.5 },
    { day: 'Tue', hours: 2.2 },
    { day: 'Wed', hours: 1.0 },
    { day: 'Thu', hours: 2.8 },
    { day: 'Fri', hours: 3.4 },
    { day: 'Sat', hours: 2.5 },
    { day: 'Sun', hours: 1.8, active: true },
  ];

  return (
    <div className="space-y-6">
      
      {/* ── Top Header ───────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Learning Workspace
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Personalized root-cause diagnostics, prerequisite milestones, and Socratic remediation
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Track: Deep Learning Foundations & Calculus</span>
          </div>
        </div>
      </div>

      {/* ── Main Two-Column Layout ───────────────────────────────── */}
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
        {/* ── RIGHT SIDE: VISUALIZED PERSONAL LEARNING TRACK ───────── */}
        {/* ═════════════════════════════════════════════════════════════ */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-1">
            <div>
              <span className="text-[11px] font-bold text-blue-600 tracking-wider uppercase">
                Learner Trajectory
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight mt-0.5">
                Personal Learning Track
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-blue-600" />
                <span>Track Progress: 68%</span>
              </span>
            </div>
          </div>

          {/* ── 1. Visual Learning Roadmap Pathway ──────────────────── */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-600" />
                  <span>Prerequisite Milestone Roadmap</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Topological progression path calculated from diagnostic evaluations
                </p>
              </div>
              <button 
                onClick={() => navigate('/map')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>Full Graph</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Visual Node Journey */}
            <div className="relative pl-6 sm:pl-8 space-y-6">
              
              {/* Connecting Track Line */}
              <div className="absolute left-[15px] sm:left-[19px] top-3 bottom-6 w-[2px] bg-slate-200" />

              {personalTrackMilestones.map((m) => {
                const isCompleted = m.status === 'completed';
                const isInProgress = m.status === 'in_progress';
                const isUpcoming = m.status === 'upcoming';
                const isLocked = m.status === 'locked';

                return (
                  <div key={m.step} className="relative group">
                    {/* Step Icon / Circle Indicator */}
                    <div 
                      className={`absolute -left-[27px] sm:-left-[31px] top-1 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs z-10 ${
                        isCompleted 
                          ? 'bg-emerald-600 text-white ring-4 ring-emerald-50' 
                          : isInProgress
                            ? 'bg-blue-600 text-white ring-4 ring-blue-100 animate-pulse'
                            : isUpcoming
                              ? 'bg-amber-400 text-white ring-4 ring-amber-50'
                              : 'bg-slate-200 text-slate-500 ring-4 ring-slate-50'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : isLocked ? (
                        <Lock className="w-3.5 h-3.5" />
                      ) : (
                        <span>{m.step}</span>
                      )}
                    </div>

                    {/* Milestone Card */}
                    <div 
                      className={`rounded-xl p-4 transition-all border ${
                        isInProgress 
                          ? 'bg-blue-50/40 border-blue-300 shadow-sm' 
                          : isCompleted
                            ? 'bg-slate-50/60 border-slate-200/80 hover:bg-slate-50'
                            : 'bg-white border-slate-200/60 opacity-80'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-slate-900">
                            {m.title}
                          </h4>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${m.tagColor}`}>
                          {m.tag}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed mb-2.5">
                        {m.desc}
                      </p>

                      {/* Progress bar or action */}
                      {isCompleted && (
                        <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/60">
                          <span className="text-emerald-700 font-semibold flex items-center gap-1 text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            Prerequisite Solved
                          </span>
                          <span className="font-bold text-slate-700 text-[11px]">{m.mastery}% Mastery</span>
                        </div>
                      )}

                      {isInProgress && (
                        <div className="space-y-3 pt-1 border-t border-blue-200">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-600 font-medium">Remediation Progress</span>
                            <span className="font-extrabold text-blue-700 font-mono">{m.mastery}% In Progress</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                            <div className="bg-blue-600 h-2 rounded-full transition-all duration-500" style={{ width: `${m.mastery}%` }} />
                          </div>

                          {/* Quick Interactive Actions */}
                          <div className="flex flex-wrap items-center gap-2 pt-1">
                            <button
                              onClick={() => navigate('/tutor')}
                              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs transition-all cursor-pointer"
                            >
                              <span>Resume Socratic Remediation</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => navigate('/report/report-001')}
                              className="inline-flex items-center gap-1 px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                            >
                              <span>View Diagnostic Trace</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {isUpcoming && (
                        <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-500" />
                          <span>Unlocks automatically when ResNets reach 80% mastery.</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── 2. Visual Activity Heatmap & Weekly Velocity ─────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Visual Learning Sessions Heatmap (The Activity Grid) */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-900">
                    Learning Sessions
                  </h3>
                  <span className="text-[11px] font-bold text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                    174 Sessions
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Consistent diagnostic activity over the last year
                </p>

                {/* Months header */}
                <div className="flex justify-between text-[10px] text-slate-400 font-medium px-0.5 pt-3">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                </div>

                {/* Grid matrix */}
                <div className="grid grid-rows-7 grid-flow-col gap-1 pt-1.5 justify-between">
                  {heatmapData.map((row, rIdx) =>
                    row.map((val, cIdx) => (
                      <div
                        key={`${rIdx}-${cIdx}`}
                        className={`w-3.5 h-3.5 rounded-[3px] transition-colors ${getHeatmapColor(val)}`}
                        title={`${val > 0 ? val * 2 : 0} sessions`}
                      />
                    ))
                  )}
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-100">
                <span>Less</span>
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-slate-100" />
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-blue-100" />
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-blue-300" />
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-blue-500" />
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-blue-600" />
                </div>
                <span>More</span>
              </div>
            </div>

            {/* Weekly Velocity Histogram & Active Streak */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-900">
                    Weekly Study Velocity
                  </h3>
                  <span className="text-[11px] font-bold text-orange-600 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Flame className="w-3 h-3 fill-orange-500 text-orange-500" />
                    <span>5-Day Streak</span>
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  14.7 hours invested across prerequisite remediation
                </p>

                {/* Weekly Bar Chart */}
                <div className="flex items-end justify-between gap-2 h-24 pt-4 px-1">
                  {weeklyStudyHours.map((d) => (
                    <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div className="w-full bg-slate-100 rounded-t-md relative flex items-end overflow-hidden" style={{ height: '70px' }}>
                        <div 
                          className={`w-full rounded-t-md transition-all ${
                            d.active ? 'bg-blue-600' : 'bg-blue-400/80'
                          }`}
                          style={{ height: `${(d.hours / 3.5) * 100}%` }}
                        />
                      </div>
                      <span className={`text-[10px] font-semibold ${d.active ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
                        {d.day}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Daily Target Met</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" /> 100% on schedule
                </span>
              </div>
            </div>

          </div>

          {/* ── 3. Visual Modality Learning Breakdown ───────────────── */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-3.5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-900">
                  How I Learn Best (Modality Breakdown)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Measured comprehension retention across multimodal representations
                </p>
              </div>
              <span className="text-[11px] font-semibold text-slate-500">Calibrated Profile</span>
            </div>

            <div className="space-y-3 pt-1">
              {/* Modality 1: Visual & DAGs */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-slate-700 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                    Visual Diagrams & Knowledge DAGs
                  </span>
                  <span className="font-bold text-slate-800">85% Retention</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }} />
                </div>
              </div>

              {/* Modality 2: Socratic Reasoning */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-slate-700 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                    Interactive Socratic Dialogue & Proofs
                  </span>
                  <span className="font-bold text-slate-800">72% Retention</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '72%' }} />
                </div>
              </div>

              {/* Modality 3: Text & Paper Readings */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-slate-700 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    Academic Text & Lecture Slides
                  </span>
                  <span className="font-bold text-slate-800">45% Retention</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '45%' }} />
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100">
                🌱 High Growth
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-800 border border-blue-100">
                🎨 Visual Learner
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-800 border border-purple-100">
                🧠 Deep Reasoning
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
