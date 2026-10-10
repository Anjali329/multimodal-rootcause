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
    <div className="space-y-7">
      {/* ── Page Header ───────────────────────────────────────────── */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Adaptive Quiz Arena
        </h1>
        <p className="text-slate-500 mt-1 text-sm">
          Targeted diagnostic practice sessions with confidence-weighted evaluation to isolate root misconceptions
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-7">
        
        {/* ── Main Configuration Column ────────────────────────────── */}
        <div className="flex-1 space-y-6">
          
          {/* 1. Select Topics */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 mb-5">
              <Target className="w-5 h-5 text-blue-600" />
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
                          "flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all duration-150",
                          selectedConcepts.has(concept.id)
                            ? "bg-blue-50 border-blue-400 text-slate-900 shadow-2xs"
                            : "bg-slate-50/50 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700"
                        )}
                      >
                        <input
                          type="checkbox"
                          className="mt-1 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                          checked={selectedConcepts.has(concept.id)}
                          onChange={() => toggleConcept(concept.id)}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-semibold truncate">{concept.name}</p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full rounded-full transition-all"
                                style={{ 
                                  width: `${concept.mastery}%`, 
                                  backgroundColor: concept.mastery < 40 ? '#f43f5e' : concept.mastery < 70 ? '#f59e0b' : '#10b981' 
                                }}
                              />
                            </div>
                            <span className="text-[10px] font-mono text-slate-500">{Math.round(concept.mastery)}%</span>
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
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-6">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-600" />
              <span>2. Session Parameters</span>
            </h2>
            
            {/* Question count */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3">Number of Questions</label>
              <div className="flex flex-wrap gap-2.5">
                {[5, 10, 15, 20].map(count => (
                  <button
                    key={count}
                    onClick={() => setQuestionCount(count)}
                    className={cn(
                      "px-5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer",
                      questionCount === count
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100"
                    )}
                  >
                    {count} Questions
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3">Adaptive Difficulty Mode</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['easy', 'medium', 'hard', 'adaptive'].map(level => (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className={cn(
                      "py-2.5 px-3 rounded-xl border text-xs font-bold capitalize transition-all cursor-pointer",
                      difficulty === level
                        ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                    )}
                  >
                    {level === 'adaptive' ? '✨ Adaptive' : level}
                  </button>
                ))}
              </div>
            </div>

            {/* Timer Toggle */}
            <div className="pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" /> Time Constraint
                </label>
                <button 
                  onClick={() => setTimerEnabled(!timerEnabled)}
                  className={cn(
                    "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors",
                    timerEnabled ? "bg-blue-600" : "bg-slate-200"
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
                          ? "bg-blue-50 border border-blue-400 text-blue-700 font-bold"
                          : "bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100"
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
              className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-xs transition-all flex items-center gap-2.5 text-sm sm:text-base cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Launch Assessment ({selectedConcepts.size} concepts)</span>
            </button>
          </div>
        </div>

        {/* ── Sidebar Info Column ──────────────────────────────────── */}
        <div className="w-full lg:w-80 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] text-slate-900">
            <h3 className="font-bold text-base mb-1 flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-600" />
              <span>Smart Presets</span>
            </h3>
            <p className="text-slate-500 text-xs mb-4">Jump straight into targeted practice without manual setup.</p>
            
            <div className="space-y-3">
              <button 
                onClick={() => {
                  setSelectedConcepts(new Set(['c-chain-rule', 'c-product-rule']));
                  handleStartQuiz();
                }}
                className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all p-3.5 rounded-xl text-left flex items-start gap-3 cursor-pointer group"
              >
                <Target className="w-5 h-5 text-amber-500 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="font-bold text-xs text-slate-900">Target Weak Gaps</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Calculus Chain Rule & Function Composition</div>
                </div>
              </button>
              
              <button 
                onClick={() => {
                  setSelectedConcepts(new Set(demoConcepts.map(c => c.id)));
                  handleStartQuiz();
                }}
                className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all p-3.5 rounded-xl text-left flex items-start gap-3 cursor-pointer group"
              >
                <TrendingUp className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="font-bold text-xs text-slate-900">Full Curriculum Check</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">All 12 mapped concepts comprehensive test</div>
                </div>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2 mb-4">
              <Award className="w-4 h-4 text-blue-600" /> Recent Assessment
            </h3>
            
            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/60">
              <div className="flex justify-between items-start mb-1.5">
                <div className="font-bold text-xs text-slate-900">Calculus Derivatives Quiz</div>
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {demoQuiz.score}/{demoQuiz.questions.length}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 mb-3">{demoQuiz.completedAt ? formatDate(demoQuiz.completedAt) : 'Recently completed'}</div>
              <Link to={`/report/${demoQuiz.id}`} className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                View Diagnostic Report →
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
