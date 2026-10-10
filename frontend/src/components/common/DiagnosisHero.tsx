import { useNavigate } from 'react-router-dom';
import { 
  Target, 
  ExternalLink, 
  Trophy, 
  ArrowRight, 
  Brain, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { demoRootCause } from '@/lib/mock-data';

export function DiagnosisHero() {
  const navigate = useNavigate();

  // Progress ring calculations for 38%
  const masteryPercentage = 38;
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (masteryPercentage / 100) * circumference;

  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 p-6 sm:p-8 text-white shadow-soft-lg border border-indigo-900/40">
      {/* Decorative Brain Background (Low opacity, non-interactive) */}
      <div 
        className="absolute -right-12 -bottom-12 opacity-[0.07] pointer-events-none select-none"
        aria-hidden="true"
      >
        <Brain className="w-96 h-96 text-white" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        
        {/* Left Column: Diagnostics Information */}
        <div className="flex-1 space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-semibold tracking-wide">
            <Target className="w-3.5 h-3.5 text-rose-400" />
            <span>Root-Cause Rewind • Active Diagnosis</span>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Underlying Gap: {demoRootCause.suspectedPrerequisite}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
              You missed repeated questions on <span className="text-white font-medium">{demoRootCause.affectedConcept}</span>. Prerequisite diagnostic analysis isolated that your primary hurdle is <span className="text-white font-medium">{demoRootCause.suspectedPrerequisite}</span>. Remedying this gap resolves errors across multiple derivative formulas.
            </p>
          </div>

          {/* Diagnostic Evidence in Glass Panel */}
          <div className="rounded-xl bg-white/5 border border-white/10 backdrop-blur-md p-4 space-y-2.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
              Diagnostic Evidence
            </p>
            <div className="space-y-2 text-xs sm:text-sm text-slate-200">
              {demoRootCause.evidence.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  {idx === 0 ? (
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  )}
                  <span className="leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => navigate('/tutor')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow transition-all duration-150"
            >
              <ExternalLink className="w-4 h-4 text-indigo-200" />
              <span>Open Cited Video Explanation</span>
            </button>
            
            <button
              onClick={() => navigate('/quiz')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all duration-150"
            >
              <Trophy className="w-4 h-4 text-amber-300" />
              <span>Retest Prerequisite Quiz</span>
            </button>

            <button
              onClick={() => navigate('/report/report-001')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-300 hover:text-white transition-colors pl-2"
            >
              <span>Read full report</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Mastery Progress Ring Card */}
        <div className="w-full sm:w-auto shrink-0 flex justify-center">
          <div className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md p-6 flex flex-col items-center justify-center text-center w-52 sm:w-56 shadow-inner">
            <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
              Prerequisite Mastery
            </p>

            {/* Circular Progress Indicator */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                {/* Background Track */}
                <circle
                  cx="40"
                  cy="40"
                  r={radius}
                  stroke="rgba(255, 255, 255, 0.15)"
                  strokeWidth="6"
                  fill="none"
                />
                {/* Progress Stroke */}
                <circle
                  cx="40"
                  cy="40"
                  r={radius}
                  stroke="#f43f5e"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-white tracking-tight">
                  {masteryPercentage}%
                </span>
                <span className="text-[10px] uppercase font-semibold text-rose-300 tracking-wider">
                  Needs Work
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 mt-3 font-medium">
              Target: 70% threshold
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

