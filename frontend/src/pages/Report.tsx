import { Link } from 'react-router';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { 
  Target, 
  Lightbulb, 
  TrendingUp, 
  TrendingDown, 
  Award, 
  ChevronRight,
  BookOpen,
  ArrowRight,
  ShieldAlert,
  BrainCircuit,
  MessageCircle
} from 'lucide-react';
import { demoReport, demoRootCause } from '@/lib/mock-data';
import { cn, formatDate } from '@/lib/utils';

export function Report() {
  const { score, totalQuestions, topicPerformance, masteryBefore, completedAt } = demoReport;
  const scorePercent = (score / totalQuestions) * 100;
  const isImproved = masteryBefore ? scorePercent > masteryBefore : true;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      
      {/* ── Header & Overview ──────────────────────────────────────── */}
      <header className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Diagnostic <span className="bg-gradient-to-r from-[#D946EF] via-[#C084FC] to-[#38BDF8] bg-clip-text text-transparent">Assessment Report</span>
          </h1>
          <p className="text-slate-400 mt-1.5 text-xs sm:text-sm">
            Topological root-cause breakdown completed on {formatDate(completedAt)}
          </p>
        </div>
        <div className="flex gap-2.5">
          <Link to="/quiz" className="px-5 py-2.5 bg-white/[0.06] border border-white/[0.1] text-slate-200 text-xs font-semibold rounded-full hover:bg-white/[0.1] transition-all">
            Retake Quiz
          </Link>
          <Link to="/map" className="px-5 py-2.5 bg-[#2563EB] hover:bg-blue-600 text-white text-xs font-bold rounded-full shadow-lg shadow-blue-500/25 transition-all">
            View Knowledge Map
          </Link>
        </div>
      </header>

      {/* ── Grid: Score & Chart ────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Score Card */}
        <div className="md:col-span-1 bg-white/[0.03] rounded-3xl p-6 sm:p-8 shadow-xl border border-white/[0.08] flex flex-col items-center justify-center text-center backdrop-blur-md">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-400/20 flex items-center justify-center text-blue-400 mb-3">
            <Award className="w-6 h-6" />
          </div>
          <div className="text-5xl sm:text-6xl font-black text-white tracking-tight mb-1">{scorePercent}%</div>
          <div className="text-slate-400 font-medium text-xs mb-5">Overall Accuracy ({score}/{totalQuestions} correct)</div>
          
          {masteryBefore !== undefined && (
            <div className={cn(
              "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border",
              isImproved 
                ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" 
                : "bg-rose-500/15 text-rose-300 border-rose-500/30"
            )}>
              {isImproved ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              <span>{isImproved ? '+' : ''}{scorePercent - masteryBefore}% from baseline</span>
            </div>
          )}
        </div>

        {/* Topic Performance Bar Chart */}
        <div className="md:col-span-2 bg-white/[0.03] rounded-3xl p-6 sm:p-7 shadow-xl border border-white/[0.08] backdrop-blur-md">
          <h3 className="font-bold text-sm text-white mb-5 flex items-center gap-2">
            <Target className="w-4 h-4 text-cyan-400" />
            <span>Sub-Topic Mastery Distribution</span>
          </h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topicPerformance} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255, 255, 255, 0.08)" />
                <XAxis 
                  dataKey="topic" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: '#94A3B8' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: '#94A3B8' }} 
                  domain={[0, 100]}
                  tickFormatter={(val: number) => `${val}%`}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255, 255, 255, 0.04)' }}
                  contentStyle={{ borderRadius: '14px', backgroundColor: '#090E1D', borderColor: 'rgba(255, 255, 255, 0.15)', color: '#fff' }}
                  formatter={(value: any) => [`${value}%`, 'Accuracy']}
                />
                <Bar dataKey="accuracy" radius={[6, 6, 0, 0]} maxBarSize={44}>
                  {topicPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.accuracy < 50 ? '#f43f5e' : entry.accuracy < 75 ? '#f59e0b' : '#2563EB'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ── ROOT-CAUSE REWIND SPOTLIGHT ───────────────────────────── */}
      <div className="bg-gradient-to-br from-[#111C33] via-[#0E172A] to-[#0A101E] rounded-3xl shadow-2xl border border-blue-400/25 p-7 sm:p-9 relative overflow-hidden backdrop-blur-md">
        <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none text-blue-400">
          <BrainCircuit className="w-56 h-56" />
        </div>
        
        <div className="relative z-10 space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse shadow-[0_0_8px_#f43f5e]" />
            <span>Root-Cause Diagnostic Trace</span>
          </div>
          
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
            Identified Prerequisite Bottleneck:{' '}
            <span className="bg-gradient-to-r from-[#D946EF] via-[#C084FC] to-[#38BDF8] bg-clip-text text-transparent">
              {demoRootCause.suspectedPrerequisite}
            </span>
          </h3>
          
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl font-normal">
            Your missed questions on <strong className="text-white">{demoRootCause.affectedConcept}</strong> stem from an earlier foundational gap in <strong className="text-cyan-300">{demoRootCause.suspectedPrerequisite}</strong>.
          </p>

          <div className="grid md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2.5">
              <h4 className="font-bold text-slate-300 text-xs uppercase tracking-wider">Topological Evidence</h4>
              <ul className="space-y-2">
                {demoRootCause.evidence.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-slate-400 text-xs sm:text-sm">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white/[0.03] p-5 rounded-2xl border border-white/[0.08] backdrop-blur-md">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Diagnosis Confidence</span>
                <span className={cn(
                  "px-3 py-1 rounded-full text-xs font-bold uppercase border",
                  demoRootCause.confidence === 'high' ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" :
                  demoRootCause.confidence === 'medium' ? "bg-amber-500/15 text-amber-300 border-amber-500/30" : "bg-white/[0.05] text-slate-400 border-white/[0.1]"
                )}>
                  {demoRootCause.confidence} confidence
                </span>
              </div>
              
              <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold">
                <span className="text-rose-400 line-through decoration-rose-500/60 bg-rose-950/40 px-2.5 py-1 rounded-lg border border-rose-500/30">
                  Chain Rule Failure
                </span>
                <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-cyan-200 bg-cyan-950/50 px-2.5 py-1 rounded-lg border border-cyan-400/40 shadow-sm">
                  Function Composition (Root Gap)
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 items-center border-t border-white/[0.08] pt-6">
            <Link to="/tutor" className="px-6 py-2.5 bg-[#2563EB] hover:bg-blue-600 text-white font-bold text-xs rounded-full shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span>Remediate with Socratic AI Tutor</span>
            </Link>
            <Link to="/quiz" className="px-5 py-2.5 bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-slate-200 font-semibold text-xs rounded-full transition-all">
              Retest Weak Concepts
            </Link>
            
            {!demoRootCause.isConfirmed && (
              <span className="text-[11px] text-slate-400 flex items-center gap-1.5 ml-auto">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" /> Grounded across topological prerequisite traces.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Misconceptions Detected ────────────────────────────────── */}
      {demoReport.misconceptions.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            <span>Misconceptions Detected</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {demoReport.misconceptions.map(misc => (
              <div key={misc.id} className="bg-white/[0.03] rounded-2xl p-5.5 shadow-xl border border-white/[0.08] backdrop-blur-md flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2.5">
                    <h4 className="font-bold text-sm text-white">{misc.description}</h4>
                    <span className="bg-white/[0.05] border border-white/[0.08] text-slate-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      {misc.frequency}x Detected
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    <strong className="text-amber-300">Target Correction: </strong>
                    {misc.correction}
                  </p>
                </div>
                <Link to="/map" className="text-xs font-semibold text-blue-300 hover:text-white flex items-center gap-1 mt-auto transition-colors">
                  <span>Inspect on Knowledge Graph</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Concepts to Review ─────────────────────────────────────── */}
      <div className="bg-white/[0.03] rounded-3xl p-6 sm:p-7 shadow-xl border border-white/[0.08] backdrop-blur-md">
        <h3 className="text-base font-bold text-white mb-5 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <span>Scheduled Prerequisite Revisions</span>
        </h3>
        <div className="divide-y divide-white/[0.04]">
          {demoReport.conceptsForRevision.map(conceptId => (
            <div key={conceptId} className="py-4 flex items-center justify-between first:pt-0 last:pb-0">
              <div>
                <div className="font-bold text-sm text-white capitalize">{conceptId.replace('c_', '').replace('_', ' ')}</div>
                <div className="text-xs text-slate-400 mt-0.5">Automated remedial practice path generated</div>
              </div>
              <Link to="/map" className="p-2 text-slate-400 hover:text-white hover:bg-white/[0.06] rounded-xl transition-all">
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
