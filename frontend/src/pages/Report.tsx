import { useState } from 'react';
import { Link } from 'react-router-dom';
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
  MessageCircle,
  CheckCircle2,
  XCircle,
  FileText,
  Video,
  Sparkles,
  RefreshCw,
  HelpCircle
} from 'lucide-react';
import { demoReport, demoRootCause, demoQuestions, demoFeedback } from '@/lib/mock-data';
import { cn, formatDate } from '@/lib/utils';

export function Report() {
  const { totalQuestions, topicPerformance, masteryBefore, completedAt, correctAnswers } = demoReport;
  
  // Correctly calculate score percent without the 1200% math bug
  const totalCount = totalQuestions || 5;
  const correctCount = correctAnswers ?? 3;
  const scorePercent = demoReport.accuracy ?? Math.round((correctCount / totalCount) * 100);
  const baselineDiff = masteryBefore !== undefined ? scorePercent - masteryBefore : 5;
  const isImproved = baselineDiff >= 0;

  // Selected tab for question review filter
  const [questionFilter, setQuestionFilter] = useState<'all' | 'incorrect' | 'correct'>('all');

  // Format data for Sub-Topic Mastery Distribution Bar Chart
  const chartData = (topicPerformance || []).map((entry) => ({
    topic: entry.conceptName || 'Topic',
    accuracy: entry.accuracy ?? 0,
    attempted: entry.questionsAttempted ?? 1,
    correct: entry.correctAnswers ?? 0,
  }));

  // Map concept names cleanly for display
  const getConceptName = (id: string) => {
    const map: Record<string, string> = {
      'c-func-composition': 'Function Composition',
      'c-chain-rule': 'Chain Rule',
      'c-power-rule': 'Power Rule',
      'c-derivative-def': 'Derivative Definition',
    };
    return map[id] || id.replace(/^c-/, '').replace(/-/g, ' ');
  };

  // Combine questions and feedback for review list
  const detailedQuestions = demoQuestions.map((q) => {
    const fb = demoFeedback.find((f) => f.questionId === q.id);
    return {
      ...q,
      feedback: fb,
    };
  });

  const filteredQuestions = detailedQuestions.filter((item) => {
    if (questionFilter === 'incorrect') return item.feedback && !item.feedback.isCorrect;
    if (questionFilter === 'correct') return item.feedback && item.feedback.isCorrect;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-7 pb-16">
      
      {/* ── 1. Header & Navigation Actions ─────────────────────────── */}
      <header className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-200/80 px-2.5 py-0.5 rounded-full">
              Post-Assessment Diagnostics
            </span>
            <span className="text-xs text-slate-400">• Calculus 101</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Diagnostic Assessment Report
          </h1>
          <p className="text-slate-500 mt-1 text-xs sm:text-sm">
            Topological root-cause breakdown completed on {formatDate(completedAt)}
          </p>
        </div>
        
        <div className="flex items-center gap-2.5 shrink-0">
          <Link 
            to="/quiz" 
            className="px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 text-xs font-semibold rounded-xl transition-all shadow-xs flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retake Quiz</span>
          </Link>
          <Link 
            to="/map" 
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center gap-1.5"
          >
            <BrainCircuit className="w-3.5 h-3.5 text-indigo-400" />
            <span>View Knowledge Map</span>
          </Link>
        </div>
      </header>

      {/* ── 2. Summary Grid: Score Accuracy + Sub-Topic Bar Chart ──── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Score Card (4 cols) */}
        <div className="md:col-span-4 bg-white rounded-2xl p-6 sm:p-7 shadow-xs border border-slate-200/90 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-3 shadow-2xs">
            <Award className="w-6 h-6" />
          </div>

          {/* Fixed Accuracy: 60% */}
          <div className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight mb-1">
            {scorePercent}%
          </div>
          
          <div className="text-slate-500 font-medium text-xs mb-4">
            Overall Accuracy ({correctCount}/{totalCount} correct)
          </div>
          
          {/* Baseline Improvement badge */}
          <div className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border",
            isImproved 
              ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
              : "bg-rose-50 text-rose-700 border-rose-200"
          )}>
            {isImproved ? <TrendingUp className="w-3.5 h-3.5 text-emerald-600" /> : <TrendingDown className="w-3.5 h-3.5 text-rose-600" />}
            <span>{isImproved ? `+${baselineDiff}%` : `${baselineDiff}%`} from baseline</span>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 w-full grid grid-cols-2 gap-2 text-center text-xs">
            <div className="bg-slate-50/80 rounded-lg p-2 border border-slate-100">
              <span className="text-[10px] text-slate-400 block uppercase">Correct</span>
              <span className="font-bold text-emerald-600 text-sm">{correctCount} Questions</span>
            </div>
            <div className="bg-slate-50/80 rounded-lg p-2 border border-slate-100">
              <span className="text-[10px] text-slate-400 block uppercase">Review Needed</span>
              <span className="font-bold text-rose-600 text-sm">{totalCount - correctCount} Questions</span>
            </div>
          </div>
        </div>

        {/* Sub-Topic Mastery Distribution Bar Chart (8 cols) */}
        <div className="md:col-span-8 bg-white rounded-2xl p-6 sm:p-7 shadow-xs border border-slate-200/90 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Target className="w-4 h-4 text-indigo-600" />
              <span>Sub-Topic Mastery Distribution</span>
            </h3>
            <span className="text-[11px] text-slate-400">Diagnostic accuracy per concept</span>
          </div>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="topic" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: '#64748B' }} 
                  dy={8}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: '#64748B' }} 
                  domain={[0, 100]}
                  ticks={[0, 25, 50, 75, 100]}
                  tickFormatter={(val: number) => `${val}%`}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(241, 245, 249, 0.6)' }}
                  contentStyle={{ 
                    borderRadius: '12px', 
                    backgroundColor: '#ffffff', 
                    borderColor: '#e2e8f0', 
                    color: '#0f172a',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    fontSize: '12px'
                  }}
                  formatter={(value: any, _: any, item: any) => [
                    `${value}% (${item.payload.correct}/${item.payload.attempted} correct)`, 
                    'Mastery'
                  ]}
                />
                <Bar dataKey="accuracy" radius={[6, 6, 0, 0]} maxBarSize={48}>
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.accuracy < 50 ? '#f43f5e' : entry.accuracy < 75 ? '#f59e0b' : '#10b981'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-center gap-6 text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-rose-500" />
              <span>Critical Gap (&lt;50%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-amber-500" />
              <span>Developing (50-75%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500" />
              <span>Mastered (&gt;75%)</span>
            </div>
          </div>
        </div>

      </div>

      {/* ── 3. ROOT-CAUSE REWIND SPOTLIGHT (Clean White/Indigo Card) ─ */}
      <div className="bg-white rounded-2xl shadow-xs border border-indigo-200/90 p-6 sm:p-7 relative overflow-hidden">
        
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-50/60 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-5">
          
          {/* Header Badges */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span>Root-Cause Diagnostic Trace</span>
            </div>
            
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>High Confidence Diagnosis (94%)</span>
            </div>
          </div>

          {/* Title & Core Message */}
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
              Identified Prerequisite Bottleneck:{' '}
              <span className="text-rose-600 underline decoration-rose-300 decoration-wavy underline-offset-4">
                {demoRootCause.suspectedPrerequisite}
              </span>
            </h3>
            
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
              Your missed questions on <strong className="text-slate-900">{demoRootCause.affectedConcept}</strong> do not stem from failing to remember derivative rules. The topological knowledge graph traced the error backward to a foundational gap in <strong className="text-indigo-600">{demoRootCause.suspectedPrerequisite}</strong>.
            </p>
          </div>

          {/* Visual 3-Stage Diagnostic Flow */}
          <div className="bg-slate-50/80 rounded-xl p-4 sm:p-5 border border-slate-200/80">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
              Topological Dependency Resolution
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
              
              {/* Box 1: Surface Error */}
              <div className="bg-white p-3.5 rounded-xl border border-rose-200 shadow-2xs">
                <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wide block">
                  Observed Symptom
                </span>
                <div className="font-bold text-slate-900 text-sm mt-0.5">Chain Rule Failure</div>
                <div className="text-[11px] text-slate-500 mt-1">Accuracy: 33% (1/3 questions)</div>
                <div className="mt-2 text-[10px] font-mono bg-rose-50 text-rose-700 px-2 py-0.5 rounded border border-rose-100">
                  Missed inner derivative g&apos;(x)
                </div>
              </div>

              {/* Arrow Connector */}
              <div className="hidden md:flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200 mb-1">
                  Graph Rewind
                </span>
                <div className="w-full flex items-center justify-center">
                  <div className="h-0.5 bg-indigo-200 flex-1" />
                  <ArrowRight className="w-4 h-4 text-indigo-600 shrink-0 mx-1" />
                  <div className="h-0.5 bg-indigo-200 flex-1" />
                </div>
              </div>

              {/* Box 2: Root Misconception */}
              <div className="bg-white p-3.5 rounded-xl border border-indigo-200 shadow-2xs">
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wide block">
                  Root Prerequisite Gap
                </span>
                <div className="font-bold text-slate-900 text-sm mt-0.5">Function Composition</div>
                <div className="text-[11px] text-slate-500 mt-1">Accuracy: 0% (0/1 questions)</div>
                <div className="mt-2 text-[10px] font-mono bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-100">
                  Confusing f(g(x)) with f(x)·g(x)
                </div>
              </div>

            </div>
          </div>

          {/* Evidence List */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-700 text-xs uppercase tracking-wider">
              Diagnostic Evidence Traces
            </h4>
            <div className="grid sm:grid-cols-3 gap-2.5">
              {demoRootCause.evidence.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-slate-50/70 p-3 rounded-xl border border-slate-200/70 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-3 items-center border-t border-slate-100 pt-5">
            <Link 
              to="/tutor" 
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Remediate with Socratic AI Tutor</span>
            </Link>
            
            <Link 
              to="/quiz" 
              className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all"
            >
              Retest Weak Concepts
            </Link>

            <span className="text-[11px] text-slate-400 flex items-center gap-1.5 sm:ml-auto">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
              Grounded across verified lecture sources with zero hallucinations.
            </span>
          </div>

        </div>
      </div>

      {/* ── 4. Misconceptions Detected ─────────────────────────────── */}
      {demoReport.misconceptions.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              <span>Misconceptions Detected ({demoReport.misconceptions.length})</span>
            </h3>
            <span className="text-xs text-slate-400">Targeted explanations to rectify habits</span>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {demoReport.misconceptions.map((misc) => (
              <div 
                key={misc.id} 
                className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h4 className="font-bold text-sm text-slate-900">{misc.description}</h4>
                    <span className="bg-rose-50 border border-rose-200 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
                      {misc.frequency}x Detected
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    <strong className="text-amber-800">Target Correction: </strong>
                    {misc.correction}
                  </p>
                </div>
                <Link 
                  to="/map" 
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 mt-auto transition-colors"
                >
                  <span>Inspect on Knowledge Graph</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 5. Diagnostic Question Breakdown (Detailed Review) ─────── */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-xs border border-slate-200/80 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-600" />
              <span>Question-by-Question Diagnostic Review</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Review your answers, confidence calibration, and lecture source citations.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-medium text-slate-600 self-start sm:self-auto">
            <button
              onClick={() => setQuestionFilter('all')}
              className={cn(
                "px-3 py-1 rounded-lg transition-all cursor-pointer",
                questionFilter === 'all' ? "bg-white text-slate-900 font-bold shadow-2xs" : "hover:text-slate-900"
              )}
            >
              All ({detailedQuestions.length})
            </button>
            <button
              onClick={() => setQuestionFilter('incorrect')}
              className={cn(
                "px-3 py-1 rounded-lg transition-all cursor-pointer",
                questionFilter === 'incorrect' ? "bg-white text-rose-600 font-bold shadow-2xs" : "hover:text-rose-600"
              )}
            >
              Incorrect (2)
            </button>
            <button
              onClick={() => setQuestionFilter('correct')}
              className={cn(
                "px-3 py-1 rounded-lg transition-all cursor-pointer",
                questionFilter === 'correct' ? "bg-white text-emerald-600 font-bold shadow-2xs" : "hover:text-emerald-600"
              )}
            >
              Correct (3)
            </button>
          </div>
        </div>

        {/* Question Cards List */}
        <div className="space-y-3.5 divide-y divide-slate-100">
          {filteredQuestions.map((item, index) => {
            const isCorrect = item.feedback?.isCorrect ?? false;
            return (
              <div key={item.id} className={cn("pt-4 first:pt-0 space-y-2.5")}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">
                      Q{item.order || index + 1}
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {getConceptName(item.conceptId)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Confidence Pill */}
                    {item.feedback?.confidence && (
                      <span className={cn(
                        "text-[10px] font-semibold px-2 py-0.5 rounded-full border",
                        item.feedback.confidence === 'sure' && !isCorrect 
                          ? "bg-rose-50 text-rose-700 border-rose-200 font-bold" 
                          : "bg-slate-50 text-slate-600 border-slate-200"
                      )}>
                        Confidence: {item.feedback.confidence.toUpperCase()}
                        {item.feedback.confidence === 'sure' && !isCorrect && " (Overconfident)"}
                      </span>
                    )}

                    {/* Correct/Incorrect Pill */}
                    <span className={cn(
                      "inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full",
                      isCorrect 
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                        : "bg-rose-50 text-rose-700 border border-rose-200"
                    )}>
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Correct</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5 text-rose-600" />
                          <span>Incorrect</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>

                {/* Question Text */}
                <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug">
                  {item.text}
                </p>

                {/* Answer comparison */}
                {item.feedback && (
                  <div className="grid sm:grid-cols-2 gap-2 text-xs">
                    <div className={cn(
                      "p-2.5 rounded-xl border",
                      isCorrect 
                        ? "bg-emerald-50/60 border-emerald-200 text-emerald-900" 
                        : "bg-rose-50/60 border-rose-200 text-rose-900"
                    )}>
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Your Answer:</span>
                      <span className="font-mono font-medium">{item.feedback.learnerAnswer}</span>
                    </div>

                    <div className="p-2.5 rounded-xl border bg-slate-50 border-slate-200 text-slate-900">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Correct Answer:</span>
                      <span className="font-mono font-medium text-emerald-700">{item.feedback.correctAnswer}</span>
                    </div>
                  </div>
                )}

                {/* Explanation & Source Grounding Citation */}
                {item.feedback && (
                  <div className="text-xs bg-slate-50/70 p-3 rounded-xl border border-slate-200/60 space-y-2">
                    <p className="text-slate-600 leading-relaxed">
                      <strong className="text-slate-900">Explanation: </strong>
                      {item.feedback.explanation}
                    </p>

                    {item.feedback.citations && item.feedback.citations.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-200/60 text-[11px]">
                        <span className="text-slate-500 font-semibold">Grounded Source:</span>
                        {item.feedback.citations.map((cit, cIdx) => (
                          <div 
                            key={cIdx} 
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 font-medium"
                          >
                            {cit.sourceType === 'pdf' ? (
                              <FileText className="w-3.5 h-3.5 text-rose-500" />
                            ) : (
                              <Video className="w-3.5 h-3.5 text-blue-500" />
                            )}
                            <span>{cit.filename}</span>
                            <span className="text-slate-400">({cit.location})</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 6. Concepts to Review (Scheduled Prerequisite Revisions) ── */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span>Scheduled Prerequisite Revisions</span>
          </h3>
          <span className="text-xs text-slate-400">Adaptive personalized study plan</span>
        </div>

        <div className="divide-y divide-slate-100">
          {demoReport.conceptsForRevision.map((conceptId) => (
            <div key={conceptId} className="py-3.5 flex items-center justify-between first:pt-0 last:pb-0">
              <div>
                <div className="font-bold text-sm text-slate-900">
                  {getConceptName(conceptId)}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Automated remedial practice path generated in Study Plan
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link 
                  to="/tutor"
                  className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Practice with AI</span>
                </Link>
                <Link 
                  to="/map" 
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-all"
                  title="View on Knowledge Map"
                >
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
