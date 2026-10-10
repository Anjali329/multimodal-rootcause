import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Lightbulb, 
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { demoQuestions, demoFeedback } from '@/lib/mock-data';
import type { Confidence, QuestionFeedback } from '@/types';
import { cn } from '@/lib/utils';

export function ActiveQuiz() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<Confidence | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<QuestionFeedback | null>(null);
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  const question = demoQuestions[currentIndex];
  const totalQuestions = demoQuestions.length;

  useEffect(() => {
    if (!submitted) {
      const timer = setInterval(() => {
        setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [submitted]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleSubmit = () => {
    if (!selectedOption || !confidence) return;
    setFeedback(demoFeedback[currentIndex] || demoFeedback[0]);
    setSubmitted(true);
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setConfidence(null);
      setSubmitted(false);
      setFeedback(null);
    } else {
      navigate('/report/report-001');
    }
  };

  if (!question) return null;

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* ── Top Floating Header ───────────────────────────────────── */}
      <div className="bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl rounded-2xl p-4 sm:p-5 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-4">
          <span className="font-bold text-white text-xs sm:text-sm">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <div className="w-32 sm:w-48 h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300"
              style={{ width: `${((currentIndex + (submitted ? 1 : 0)) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-slate-300 font-mono text-xs sm:text-sm">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span className={cn(timeLeft < 60 && "text-rose-400 font-bold animate-pulse")}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <button 
            onClick={() => navigate('/quiz')}
            className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-xs font-semibold cursor-pointer"
          >
            <X className="w-4 h-4" /> Exit
          </button>
        </div>
      </div>

      <main className="space-y-6">
        {/* ── Question Card ────────────────────────────────────────── */}
        <div className="bg-white/[0.03] rounded-3xl p-7 sm:p-9 shadow-2xl border border-white/[0.08] backdrop-blur-md">
          <div className="flex items-center gap-2.5 mb-6">
            <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] text-slate-300 text-[11px] font-semibold uppercase tracking-wider">
              {question.type}
            </span>
            <span className={cn(
              "px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider border",
              question.difficulty === 'easy' ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" :
              question.difficulty === 'medium' ? "bg-amber-500/15 text-amber-300 border-amber-500/30" :
              "bg-rose-500/15 text-rose-300 border-rose-500/30"
            )}>
              {question.difficulty}
            </span>
          </div>

          <h2 className="text-lg sm:text-2xl font-bold text-white leading-relaxed mb-8">
            {question.text}
          </h2>

          <div className="space-y-3">
            {question.options?.map((option, idx) => {
              const label = String.fromCharCode(65 + idx);
              const isSelected = selectedOption === option;
              
              let stateClass = "border-white/[0.08] hover:border-blue-400/40 hover:bg-white/[0.06] bg-white/[0.02] text-slate-200";
              
              if (submitted && feedback) {
                if (option === feedback.correctAnswer) {
                  stateClass = "border-emerald-500/60 bg-emerald-500/20 text-emerald-200 shadow-lg shadow-emerald-950/20";
                } else if (isSelected && option !== feedback.correctAnswer) {
                  stateClass = "border-rose-500/60 bg-rose-500/20 text-rose-200 shadow-lg shadow-rose-950/20";
                } else {
                  stateClass = "border-white/[0.04] bg-white/[0.01] opacity-40 text-slate-500";
                }
              } else if (isSelected) {
                stateClass = "border-blue-500 bg-blue-600/20 text-white shadow-lg shadow-blue-500/20 ring-1 ring-blue-400";
              }

              return (
                <button
                  key={idx}
                  disabled={submitted}
                  onClick={() => setSelectedOption(option)}
                  className={cn(
                    "w-full text-left p-4 sm:p-4.5 rounded-2xl border-2 transition-all flex items-center gap-4 cursor-pointer",
                    stateClass
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors",
                    (submitted && option === feedback?.correctAnswer) ? "bg-emerald-500 text-white" :
                    (submitted && isSelected && option !== feedback?.correctAnswer) ? "bg-rose-500 text-white" :
                    isSelected ? "bg-[#2563EB] text-white" : "bg-white/[0.06] text-slate-300"
                  )}>
                    {label}
                  </div>
                  <span className="text-sm sm:text-base font-semibold flex-1 leading-snug">{option}</span>
                  
                  {submitted && option === feedback?.correctAnswer && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                  {submitted && isSelected && option !== feedback?.correctAnswer && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Confidence & Submit ───────────────────────────────────── */}
        {!submitted && (
          <div className="bg-white/[0.03] rounded-3xl p-6 sm:p-7 shadow-xl border border-white/[0.08] backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-3 text-center sm:text-left">
                Rate Confidence (Used to isolate test fatigue vs gap):
              </p>
              <div className="flex gap-2.5">
                <button
                  onClick={() => setConfidence('sure')}
                  className={cn(
                    "px-5 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer",
                    confidence === 'sure' 
                      ? "bg-emerald-500/20 border-emerald-400 text-emerald-200 shadow-md shadow-emerald-500/20" 
                      : "bg-white/[0.04] border-white/[0.08] text-slate-300 hover:bg-white/[0.08]"
                  )}
                >
                  🟢 Sure
                </button>
                <button
                  onClick={() => setConfidence('maybe')}
                  className={cn(
                    "px-5 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer",
                    confidence === 'maybe' 
                      ? "bg-amber-500/20 border-amber-400 text-amber-200 shadow-md shadow-amber-500/20" 
                      : "bg-white/[0.04] border-white/[0.08] text-slate-300 hover:bg-white/[0.08]"
                  )}
                >
                  🟡 Maybe
                </button>
                <button
                  onClick={() => setConfidence('guess')}
                  className={cn(
                    "px-5 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer",
                    confidence === 'guess' 
                      ? "bg-rose-500/20 border-rose-400 text-rose-200 shadow-md shadow-rose-500/20" 
                      : "bg-white/[0.04] border-white/[0.08] text-slate-300 hover:bg-white/[0.08]"
                  )}
                >
                  🔴 Guess
                </button>
              </div>
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={!selectedOption || !confidence}
              className="w-full sm:w-auto px-8 py-3 bg-[#2563EB] hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-full shadow-lg shadow-blue-500/25 transition-all cursor-pointer hover:scale-[1.02]"
            >
              Submit Answer
            </button>
          </div>
        )}

        {/* ── Diagnostic Feedback Area ─────────────────────────────── */}
        {submitted && feedback && (
          <div className="bg-white/[0.03] rounded-3xl shadow-2xl border border-white/[0.08] overflow-hidden backdrop-blur-md animate-in fade-in duration-300">
            <div className={cn(
              "p-5 flex items-center gap-3 border-b",
              feedback.isCorrect 
                ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-300" 
                : "bg-rose-950/40 border-rose-500/30 text-rose-300"
            )}>
              {feedback.isCorrect ? (
                <>
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  <span className="font-extrabold text-lg text-white">Correct Understanding</span>
                </>
              ) : (
                <>
                  <XCircle className="w-6 h-6 text-rose-400" />
                  <span className="font-extrabold text-lg text-white">Prerequisite Misconception Detected</span>
                </>
              )}
            </div>
            
            <div className="p-7 space-y-6">
              <div>
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-2">Step-by-Step Reasoning</h3>
                <p className="text-slate-300 text-sm leading-relaxed bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4">
                  {feedback.explanation}
                </p>
              </div>

              {feedback.misconceptionId && (
                <div className="bg-amber-950/40 rounded-2xl p-4.5 border border-amber-500/30 flex gap-3.5">
                  <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-amber-200 text-sm mb-1">Root Misconception: Function Decomposition</h4>
                    <p className="text-amber-300/80 text-xs sm:text-sm leading-relaxed">
                      You evaluated the outer derivative correctly, but missed decomposing the inner term [g(x)]. RootCause Tutor has scheduled this prerequisite for review.
                    </p>
                  </div>
                </div>
              )}

              {feedback.citations && feedback.citations.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-cyan-400" /> Grounded In Course Sources
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {feedback.citations.map((cite, idx) => (
                      <span 
                        key={idx} 
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-cyan-500/15 border border-cyan-500/30 text-cyan-200 rounded-full text-xs font-medium"
                      >
                        {cite.filename} · {cite.location}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-5 border-t border-white/[0.08]">
                <button
                  onClick={handleNext}
                  className="px-8 py-3 bg-[#2563EB] hover:bg-blue-600 text-white font-bold rounded-full shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2 cursor-pointer hover:scale-[1.02]"
                >
                  <span>{currentIndex < totalQuestions - 1 ? 'Next Question' : 'View Full Diagnostic Report'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
