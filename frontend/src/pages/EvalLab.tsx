import { useState, useMemo, Fragment } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  AlertTriangle, 
  Download, 
  Play, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  TrendingDown, 
  ChevronDown, 
  ChevronRight, 
  Database 
} from 'lucide-react';
import { cn, formatPercentage, formatDate } from '@/lib/utils';
import { demoEvalRuns } from '@/lib/mock-data';
import type { EvalMetric } from '@/types';

export function EvalLab() {
  const [selectedRunId, setSelectedRunId] = useState<string>(demoEvalRuns[0].id);
  const [expandedTestCases, setExpandedTestCases] = useState<Record<string, boolean>>({});

  const selectedRun = useMemo(() => {
    return demoEvalRuns.find(r => r.id === selectedRunId) || demoEvalRuns[0];
  }, [selectedRunId]);

  const toggleTestCase = (id: string) => {
    setExpandedTestCases(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'retrieval': return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
      case 'generation': return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
      case 'grounding': return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
      case 'learning': return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      default: return 'bg-white/[0.05] text-slate-300 border-white/[0.08]';
    }
  };

  const metricsByCategory = useMemo(() => {
    return selectedRun.metrics.reduce((acc, metric) => {
      if (!acc[metric.category]) acc[metric.category] = [];
      acc[metric.category].push(metric);
      return acc;
    }, {} as Record<string, EvalMetric[]>);
  }, [selectedRun]);

  const chartData = useMemo(() => {
    return selectedRun.metrics.map(metric => ({
      name: metric.name,
      System: metric.value,
      Baseline: metric.baseline || 0,
      category: metric.category
    }));
  }, [selectedRun]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ── Page Header ───────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Evaluation & <span className="bg-gradient-to-r from-[#D946EF] via-[#C084FC] to-[#38BDF8] bg-clip-text text-transparent">Faithfulness Lab</span>
          </h1>
          <p className="text-slate-400 mt-1.5 text-sm">
            Rigorously evaluated retrieval faithfulness, citation precision, context recall, and comparative ablation benchmarks
          </p>
        </div>
        <div className="flex gap-2.5">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white/[0.06] border border-white/[0.1] text-slate-200 text-xs font-semibold rounded-full hover:bg-white/[0.1] transition-all cursor-pointer shadow-sm">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export Metrics</span>
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#2563EB] hover:bg-blue-600 text-white text-xs font-bold rounded-full shadow-lg shadow-blue-500/25 transition-all cursor-pointer hover:scale-[1.02]">
            <Play className="w-4 h-4 fill-current" />
            <span>Run Benchmark</span>
          </button>
        </div>
      </div>

      {/* ── Demo Notice Banner ─────────────────────────────────────── */}
      <div className="bg-amber-950/40 border border-amber-500/30 rounded-2xl p-4 flex items-center gap-3 shadow-lg">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
        <p className="text-xs sm:text-sm text-amber-200 font-medium">
          Demonstration benchmark suite: Evaluating RootCause Tutor vs Ungrounded LLM baseline across 150 calculus & database diagnostic test cases.
        </p>
      </div>

      {/* ── Run Selector ──────────────────────────────────────────── */}
      <div className="bg-white/[0.03] rounded-2xl border border-white/[0.08] p-1.5 flex overflow-x-auto shadow-xl backdrop-blur-md gap-1.5">
        {demoEvalRuns.map(run => (
          <button
            key={run.id}
            onClick={() => setSelectedRunId(run.id)}
            className={cn(
              "flex flex-col px-4 py-2.5 min-w-[210px] rounded-xl text-left transition-all flex-1 cursor-pointer",
              selectedRunId === run.id 
                ? "bg-[#2563EB]/20 border border-blue-400/50 shadow-md shadow-blue-500/15" 
                : "hover:bg-white/[0.04] border border-transparent"
            )}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={cn(
                "font-bold text-xs sm:text-sm",
                selectedRunId === run.id ? "text-white" : "text-slate-300"
              )}>
                {run.name}
              </span>
              <span className={cn(
                "text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border",
                run.status === 'completed' ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" : 
                run.status === 'failed' ? "bg-rose-500/15 text-rose-300 border-rose-500/30" : "bg-blue-500/15 text-blue-300 border-blue-500/30"
              )}>
                {run.status}
              </span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-slate-400">
              <span>{formatDate(run.startedAt)}</span>
              <span className="flex items-center gap-1">
                <Database className="w-3 h-3 text-cyan-400" />
                {run.testCases.length} tests
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* ── Key Metrics Grid ──────────────────────────────────────── */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
          <span>Key Evaluation Metrics</span>
        </h2>
        
        {Object.entries(metricsByCategory).map(([category, metrics]) => (
          <div key={category} className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <div className={cn("w-2 h-2 rounded-full", 
                category === 'retrieval' ? 'bg-blue-400 shadow-[0_0_8px_#60a5fa]' :
                category === 'generation' ? 'bg-purple-400 shadow-[0_0_8px_#c084fc]' :
                category === 'grounding' ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-amber-400 shadow-[0_0_8px_#fbbf24]'
              )} />
              <span>{category} metrics</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {metrics.map(metric => {
                const diff = metric.baseline ? metric.value - metric.baseline : 0;
                const isBetter = diff > 0;
                
                return (
                  <div key={metric.name} className="bg-white/[0.03] hover:bg-white/[0.06] hover:border-blue-400/40 rounded-2xl border border-white/[0.08] p-5 shadow-xl flex flex-col justify-between transition-all duration-200 backdrop-blur-md group">
                    <div>
                      <div className="flex justify-between items-start mb-2.5">
                        <span className="font-bold text-white text-xs sm:text-sm">{metric.name}</span>
                        <span className={cn(
                          "text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border",
                          getCategoryColor(metric.category)
                        )}>
                          {metric.category}
                        </span>
                      </div>
                      
                      <div className="flex items-baseline gap-2 mb-1.5">
                        <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                          {metric.value > 1 ? metric.value.toFixed(1) : formatPercentage(metric.value)}
                        </span>
                        {metric.baseline && (
                          <span className={cn(
                            "flex items-center text-xs font-semibold",
                            isBetter ? "text-emerald-400" : diff < 0 ? "text-rose-400" : "text-slate-400"
                          )}>
                            {isBetter ? <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> : 
                             diff < 0 ? <TrendingDown className="w-3.5 h-3.5 mr-0.5" /> : null}
                            vs {metric.baseline > 1 ? metric.baseline.toFixed(1) : formatPercentage(metric.baseline)}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-xs text-slate-400 mb-4 line-clamp-2 leading-relaxed" title={metric.description}>
                        {metric.description}
                      </p>
                    </div>
                    
                    <div className="pt-3 border-t border-white/[0.06]">
                      <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className={cn(
                            "h-1.5 rounded-full",
                            metric.value > 0.8 ? "bg-emerald-400" : 
                            metric.value > 0.6 ? "bg-blue-400" : 
                            metric.value > 0.4 ? "bg-amber-400" : "bg-rose-400"
                          )}
                          style={{ width: `${metric.value <= 1 ? metric.value * 100 : Math.min(100, metric.value * 10)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* ── Comparison Chart ──────────────────────────────────────── */}
      <div className="bg-white/[0.03] rounded-3xl border border-white/[0.08] p-6 sm:p-8 shadow-xl backdrop-blur-md">
        <h2 className="text-base sm:text-lg font-bold text-white mb-6 tracking-tight">
          System vs Baseline Comparative Evaluation
        </h2>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255, 255, 255, 0.08)" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94A3B8', fontSize: 11 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94A3B8', fontSize: 11 }} 
                dx={-10}
              />
              <Tooltip 
                cursor={{ fill: 'rgba(255, 255, 255, 0.04)' }}
                contentStyle={{ 
                  borderRadius: '16px', 
                  backgroundColor: '#090E1D',
                  borderColor: 'rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
                  color: '#fff'
                }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px', color: '#94A3B8' }} />
              <Bar dataKey="System" fill="#2563EB" radius={[6, 6, 0, 0]} maxBarSize={36} />
              <Bar dataKey="Baseline" fill="#475569" radius={[6, 6, 0, 0]} maxBarSize={36} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Test Cases Table ──────────────────────────────────────── */}
      <div className="bg-white/[0.03] rounded-3xl border border-white/[0.08] shadow-xl overflow-hidden backdrop-blur-md">
        <div className="p-6 border-b border-white/[0.08] flex justify-between items-center">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">Test Cases Breakdown</h2>
            <p className="text-xs text-slate-400 mt-0.5">Automated benchmark runs across {selectedRun.testCases.length} prompt variations</p>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08] bg-white/[0.02] text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                <th className="p-4 w-10"></th>
                <th className="p-4">Diagnostic Query</th>
                <th className="p-4 hidden md:table-cell">Verdict</th>
                <th className="p-4">Faithfulness</th>
                <th className="p-4">Relevancy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {selectedRun.testCases.map(testCase => (
                <Fragment key={testCase.id}>
                  <tr 
                    className="hover:bg-white/[0.04] cursor-pointer transition-colors"
                    onClick={() => toggleTestCase(testCase.id)}
                  >
                    <td className="p-4 text-slate-500">
                      {expandedTestCases[testCase.id] ? 
                        <ChevronDown className="w-4 h-4 text-slate-300" /> : 
                        <ChevronRight className="w-4 h-4 text-slate-500" />
                      }
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="md:hidden">
                          {testCase.isCorrect ? 
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> : 
                            <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                          }
                        </span>
                        <span className="font-semibold text-xs sm:text-sm text-white line-clamp-1">{testCase.query}</span>
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      {testCase.isCorrect ? (
                        <div className="flex items-center gap-1.5 text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-xs font-semibold w-fit">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Passed
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-rose-300 bg-rose-500/15 border border-rose-500/30 px-2.5 py-0.5 rounded-full text-xs font-semibold w-fit">
                          <XCircle className="w-3.5 h-3.5" />
                          Failed
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold text-white">{testCase.faithfulness?.toFixed(2) || 'N/A'}</span>
                        {testCase.faithfulness && (
                          <div className="w-14 h-1.5 bg-white/10 rounded-full hidden sm:block">
                            <div 
                              className={cn("h-1.5 rounded-full", testCase.faithfulness > 0.8 ? "bg-emerald-400" : "bg-amber-400")}
                              style={{ width: `${testCase.faithfulness * 100}%` }}
                            />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold text-white">{testCase.relevancy?.toFixed(2) || 'N/A'}</span>
                        {testCase.relevancy && (
                          <div className="w-14 h-1.5 bg-white/10 rounded-full hidden sm:block">
                            <div 
                              className={cn("h-1.5 rounded-full", testCase.relevancy > 0.8 ? "bg-cyan-400" : "bg-amber-400")}
                              style={{ width: `${testCase.relevancy * 100}%` }}
                            />
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                  
                  {expandedTestCases[testCase.id] && (
                    <tr className="bg-white/[0.02]">
                      <td colSpan={5} className="p-0 border-b border-white/[0.06]">
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Ground Truth Target</h4>
                            <div className="bg-white/[0.03] p-4 rounded-xl border border-white/[0.08] text-xs text-slate-300 leading-relaxed font-mono">
                              {testCase.expectedAnswer || <span className="text-slate-500 italic">No expected answer provided</span>}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Model Generated Answer</h4>
                            <div className={cn(
                              "p-4 rounded-xl border text-xs leading-relaxed font-mono",
                              testCase.isCorrect ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-200" : "bg-rose-950/20 border-rose-500/30 text-rose-200"
                            )}>
                              {testCase.actualAnswer}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
