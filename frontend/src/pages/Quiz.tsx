import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { 
  Settings, 
  Play, 
  Clock, 
  Target, 
  Brain, 
  Award, 
  TrendingUp, 
  CheckCircle2
} from 'lucide-react';
import { demoConcepts, demoQuiz } from '@/lib/mock-data';
import { cn, formatDate } from '@/lib/utils';

export function Quiz() {
  const navigate = useNavigate();
  const [selectedConcepts, setSelectedConcepts] = useState<Set<string>>(new Set());
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [difficulty, setDifficulty] = useState<string>('adaptive');
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState<number>(15);

  const topics = Array.from(new Set(demoConcepts.map(c => c.topic)));

  const toggleConcept = (id: string) => {
    const next = new Set(selectedConcepts);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedConcepts(next);
  };

  const handleStartQuiz = () => {
    navigate('/quiz/quiz-001');
  };

  return (
    <div className="space-y-8">
      {/* ── Page Header ───────────────────────────────────────────── */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Adaptive <span className="bg-gradient-to-r from-[#D946EF] via-[#C084FC] to-[#38BDF8] bg-clip-text text-transparent">Quiz Arena</span>
        </h1>
        <p className="text-slate-400 mt-1.5 text-sm">
          Targeted diagnostic practice sessions with confidence-weighted evaluation to isolate root misconceptions
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* ── Main Configuration Column ────────────────────────────── */}
        <div className="flex-1 space-y-6">
          
          {/* 1. Select Topics */}
          <div className="bg-white/[0.03] rounded-3xl p-6 sm:p-7 border border-white/[0.08] shadow-xl backdrop-blur-md">
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2.5 mb-5">
              <Target className="w-5 h-5 text-blue-400" />
              <span>1. Select Target Concepts</span>
            </h2>
            
            <div className="space-y-6">
              {topics.map(topic => (
                <div key={topic}>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">{topic}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {demoConcepts.filter(c => c.topic === topic).map(concept => (
                      <label 
                        key={concept.id}
                        className={cn(
                          "flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all duration-150 backdrop-blur-md",
                          selectedConcepts.has(concept.id)
                            ? "bg-blue-600/20 border-blue-500/50 shadow-md shadow-blue-500/10 text-white"
                            : "bg-white/[0.03] border-white/[0.06] hover:border-blue-400/30 hover:bg-white/[0.05] text-slate-300"
                        )}
                      >
                        <input
                          type="checkbox"
                          className="mt-1 w-4 h-4 rounded border-white/20 bg-white/10 text-blue-600 focus:ring-blue-500"
                          checked={selectedConcepts.has(concept.id)}
                          onChange={() => toggleConcept(concept.id)}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-semibold truncate">{concept.name}</p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <div 
                                className="h-full rounded-full transition-all"
                                style={{ 
                                  width: `${concept.mastery}%`, 
                                  backgroundColor: concept.mastery < 40 ? '#f43f5e' : concept.mastery < 70 ? '#f59e0b' : '#10b981' 
                                }}
                              />
                            </div>
                            <span className="text-[10px] font-mono text-slate-400">{Math.round(concept.mastery)}%</span>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Quiz Settings */}
          <div className="bg-white/[0.03] rounded-3xl p-6 sm:p-7 border border-white/[0.08] shadow-xl backdrop-blur-md space-y-6">
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2.5">
              <Settings className="w-5 h-5 text-blue-400" />
              <span>2. Session Parameters</span>
            </h2>
            
            {/* Question count */}
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">Number of Questions</label>
              <div className="flex flex-wrap gap-2.5">
                {[5, 10, 15, 20].map(count => (
                  <button
                    key={count}
                    onClick={() => setQuestionCount(count)}
                    className={cn(
                      "px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer",
                      questionCount === count
                        ? "bg-[#2563EB] text-white shadow-md shadow-blue-500/25"
                        : "bg-white/[0.04] text-slate-300 border border-white/[0.08] hover:bg-white/[0.08] hover:text-white"
                    )}
                  >
                    {count} Questions
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">Adaptive Difficulty Mode</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['easy', 'medium', 'hard', 'adaptive'].map(level => (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className={cn(
                      "py-2.5 px-3 rounded-xl border text-xs font-bold capitalize transition-all cursor-pointer",
                      difficulty === level
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-400/50 shadow-md shadow-blue-500/20"
                        : "bg-white/[0.03] border-white/[0.08] text-slate-300 hover:border-white/20 hover:text-white"
                    )}
                  >
                    {level === 'adaptive' ? '✨ Adaptive' : level}
                  </button>
                ))}
              </div>
            </div>

            {/* Timer Toggle */}
            <div className="pt-2 border-t border-white/[0.08]">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-400" /> Time Constraint
                </label>
                <button 
                  onClick={() => setTimerEnabled(!timerEnabled)}
                  className={cn(
                    "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors",
                    timerEnabled ? "bg-[#2563EB]" : "bg-white/10"
                  )}
                >
                  <span 
                    className={cn(
                      "pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform ml-1",
                      timerEnabled ? "translate-x-5" : "translate-x-0"
                    )}
                  />
                </button>
              </div>
              
              {timerEnabled && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {[5, 10, 15, 20, 30].map(mins => (
                    <button
                      key={mins}
                      onClick={() => setTimerMinutes(mins)}
                      className={cn(
                        "px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer",
                        timerMinutes === mins
                          ? "bg-cyan-500/20 border border-cyan-400 text-cyan-200"
                          : "bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:bg-white/[0.08]"
                      )}
                    >
                      {mins} mins
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="pt-2 flex justify-end">
            <button
              onClick={handleStartQuiz}
              disabled={selectedConcepts.size === 0}
              className="px-8 py-3.5 bg-[#2563EB] hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-full shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2.5 text-sm sm:text-base cursor-pointer hover:scale-[1.02]"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Launch Assessment ({selectedConcepts.size} concepts)</span>
            </button>
          </div>
        </div>

        {/* ── Sidebar Info Column ──────────────────────────────────── */}
        <div className="w-full lg:w-80 space-y-6">
          <div className="bg-gradient-to-br from-[#111C33] via-[#0E172A] to-[#0A101E] rounded-3xl p-6 border border-blue-400/25 shadow-xl text-white">
            <h3 className="font-bold text-base mb-1.5 flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-400" />
              <span>Smart Presets</span>
            </h3>
            <p className="text-slate-400 text-xs mb-4">Jump straight into targeted practice without manual setup.</p>
            
            <div className="space-y-3">
              <button 
                onClick={() => {
                  setSelectedConcepts(new Set(['c-chain-rule', 'c-product-rule']));
                  handleStartQuiz();
                }}
                className="w-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-amber-400/30 transition-all p-3.5 rounded-2xl text-left flex items-start gap-3 cursor-pointer group"
              >
                <Target className="w-5 h-5 text-amber-400 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="font-bold text-xs text-white">Target Weak Gaps</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Calculus Chain Rule & Function Composition</div>
                </div>
              </button>
              
              <button 
                onClick={() => {
                  setSelectedConcepts(new Set(demoConcepts.map(c => c.id)));
                  handleStartQuiz();
                }}
                className="w-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-emerald-400/30 transition-all p-3.5 rounded-2xl text-left flex items-start gap-3 cursor-pointer group"
              >
                <TrendingUp className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="font-bold text-xs text-white">Full Curriculum Check</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">All 12 mapped concepts comprehensive test</div>
                </div>
              </button>
            </div>
          </div>

          <div className="bg-white/[0.03] rounded-3xl p-6 border border-white/[0.08] shadow-xl backdrop-blur-md">
            <h3 className="font-bold text-sm text-white flex items-center gap-2 mb-4">
              <Award className="w-4 h-4 text-cyan-400" /> Recent Assessment
            </h3>
            
            <div className="p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
              <div className="flex justify-between items-start mb-1.5">
                <div className="font-bold text-xs text-white">Calculus Derivatives Quiz</div>
                <span className="inline-flex items-center gap-1 bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" /> {demoQuiz.score}/{demoQuiz.questions.length}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 mb-3">{demoQuiz.completedAt ? formatDate(demoQuiz.completedAt) : 'Recently completed'}</div>
              <Link to={`/report/${demoQuiz.id}`} className="text-xs font-semibold text-blue-300 hover:text-white transition-colors">
                View Diagnostic Report →
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
