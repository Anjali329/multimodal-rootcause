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
      case 'retrieval': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'generation': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'grounding': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'learning': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
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
    <div className="space-y-7 max-w-7xl mx-auto">
      {/* ── Page Header ───────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Evaluation & Faithfulness Lab
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Rigorously evaluated retrieval faithfulness, citation precision, context recall, and comparative ablation benchmarks
          </p>
        </div>
        <div className="flex gap-2.5">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50 transition-all cursor-pointer shadow-2xs">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export Metrics</span>
          </button>
          <button className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer">
            <Play className="w-4 h-4 fill-current" />
            <span>Run Benchmark</span>
          </button>
        </div>
      </div>

      {/* ── Demo Notice Banner ─────────────────────────────────────── */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
        <p className="text-xs sm:text-sm text-amber-800 font-medium">
          Demonstration benchmark suite: Evaluating RootCause Tutor vs Ungrounded LLM baseline across 150 calculus & database diagnostic test cases.
        </p>
      </div>

      {/* ── Run Selector ──────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-slate-200 p-1.5 flex overflow-x-auto shadow-2xs gap-1.5">
        {demoEvalRuns.map(run => (
          <button
            key={run.id}
            onClick={() => setSelectedRunId(run.id)}
            className={cn(
              "flex flex-col px-4 py-2.5 min-w-[210px] rounded-xl text-left transition-all flex-1 cursor-pointer",
              selectedRunId === run.id 
                ? "bg-blue-50 border border-blue-400 text-slate-900" 
                : "hover:bg-slate-50 border border-transparent text-slate-600"
            )}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={cn(
                "font-bold text-xs sm:text-sm",
                selectedRunId === run.id ? "text-slate-900" : "text-slate-700"
              )}>
                {run.name}
              </span>
              <span className={cn(
                "text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border",
                run.status === 'completed' ? "bg-emerald-50 text-emerald-700 border-emerald-200" : 
                run.status === 'failed' ? "bg-rose-50 text-rose-700 border-rose-200" : "bg-blue-50 text-blue-700 border-blue-200"
              )}>
                {run.status}
              </span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-slate-500">
              <span>{formatDate(run.startedAt)}</span>
              <span className="flex items-center gap-1">
                <Database className="w-3 h-3 text-blue-600" />
                {run.testCases.length} tests
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* ── Key Metrics Grid ──────────────────────────────────────── */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <span>Key Evaluation Metrics</span>
        </h2>
        
        {Object.entries(metricsByCategory).map(([category, metrics]) => (
          <div key={category} className="space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <div className={cn("w-2 h-2 rounded-full", 
                category === 'retrieval' ? 'bg-blue-600' :
                category === 'generation' ? 'bg-purple-600' :
                category === 'grounding' ? 'bg-emerald-600' : 'bg-amber-600'
              )} />
              <span>{category} metrics</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {metrics.map(metric => {
                const diff = metric.baseline ? metric.value - metric.baseline : 0;
                const isBetter = diff > 0;
                
                return (
                  <div key={metric.name} className="bg-white hover:border-slate-300 rounded-2xl border border-slate-200/80 p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between transition-all duration-150 group">
                    <div>
                      <div className="flex justify-between items-start mb-2.5">
                        <span className="font-bold text-slate-900 text-xs sm:text-sm">{metric.name}</span>
                        <span className={cn(
                          "text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border",
                          getCategoryColor(metric.category)
                        )}>
                          {metric.category}
                        </span>
                      </div>
                      
                      <div className="flex items-baseline gap-2 mb-1.5">
                        <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                          {metric.value > 1 ? metric.value.toFixed(1) : formatPercentage(metric.value)}
                        </span>
                        {metric.baseline && (
                          <span className={cn(
                            "flex items-center text-xs font-semibold",
                            isBetter ? "text-emerald-600" : diff < 0 ? "text-rose-600" : "text-slate-500"
                          )}>
                            {isBetter ? <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> : 
                             diff < 0 ? <TrendingDown className="w-3.5 h-3.5 mr-0.5" /> : null}
                            vs {metric.baseline > 1 ? metric.baseline.toFixed(1) : formatPercentage(metric.baseline)}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-xs text-slate-500 mb-4 line-clamp-2 leading-relaxed" title={metric.description}>
                        {metric.description}
                      </p>
                    </div>
                    
                    <div className="pt-3 border-t border-slate-100">
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className={cn(
                            "h-1.5 rounded-full",
                            metric.value > 0.8 ? "bg-emerald-500" : 
                            metric.value > 0.6 ? "bg-blue-600" : 
                            metric.value > 0.4 ? "bg-amber-500" : "bg-rose-500"
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
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-6 tracking-tight">
          System vs Baseline Comparative Evaluation
        </h2>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748B', fontSize: 11 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748B', fontSize: 11 }} 
                dx={-10}
              />
              <Tooltip 
                cursor={{ fill: 'rgba(241, 245, 249, 0.6)' }}
                contentStyle={{ 
                  borderRadius: '12px', 
                  backgroundColor: '#ffffff',
                  borderColor: '#e2e8f0',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  color: '#0f172a'
                }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px', color: '#64748B' }} />
              <Bar dataKey="System" fill="#2563EB" radius={[6, 6, 0, 0]} maxBarSize={36} />
              <Bar dataKey="Baseline" fill="#94A3B8" radius={[6, 6, 0, 0]} maxBarSize={36} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Test Cases Table ──────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">Test Cases Breakdown</h2>
            <p className="text-xs text-slate-500 mt-0.5">Automated benchmark runs across {selectedRun.testCases.length} prompt variations</p>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                <th className="p-4 w-10"></th>
                <th className="p-4">Diagnostic Query</th>
                <th className="p-4 hidden md:table-cell">Verdict</th>
                <th className="p-4">Faithfulness</th>
                <th className="p-4">Relevancy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {selectedRun.testCases.map(testCase => (
                <Fragment key={testCase.id}>
                  <tr 
                    className="hover:bg-slate-50/70 cursor-pointer transition-colors"
                    onClick={() => toggleTestCase(testCase.id)}
                  >
                    <td className="p-4 text-slate-400">
                      {expandedTestCases[testCase.id] ? 
                        <ChevronDown className="w-4 h-4 text-slate-600" /> : 
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      }
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="md:hidden">
                          {testCase.isCorrect ? 
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : 
                            <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                          }
                        </span>
                        <span className="font-semibold text-xs sm:text-sm text-slate-900 line-clamp-1">{testCase.query}</span>
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      {testCase.isCorrect ? (
                        <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full text-xs font-semibold w-fit">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Passed
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full text-xs font-semibold w-fit">
                          <XCircle className="w-3.5 h-3.5 text-rose-600" />
                          Failed
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold text-slate-900">{testCase.faithfulness?.toFixed(2) || 'N/A'}</span>
                        {testCase.faithfulness && (
                          <div className="w-14 h-1.5 bg-slate-100 rounded-full hidden sm:block">
                            <div 
                              className={cn("h-1.5 rounded-full", testCase.faithfulness > 0.8 ? "bg-emerald-500" : "bg-amber-500")}
                              style={{ width: `${testCase.faithfulness * 100}%` }}
                            />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold text-slate-900">{testCase.relevancy?.toFixed(2) || 'N/A'}</span>
                        {testCase.relevancy && (
                          <div className="w-14 h-1.5 bg-slate-100 rounded-full hidden sm:block">
                            <div 
                              className={cn("h-1.5 rounded-full", testCase.relevancy > 0.8 ? "bg-blue-600" : "bg-amber-500")}
                              style={{ width: `${testCase.relevancy * 100}%` }}
                            />
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                  
                  {expandedTestCases[testCase.id] && (
                    <tr className="bg-slate-50/50">
                      <td colSpan={5} className="p-0 border-b border-slate-100">
                        <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Ground Truth Target</h4>
                            <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed font-mono">
                              {testCase.expectedAnswer || <span className="text-slate-400 italic">No expected answer provided</span>}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Model Generated Answer</h4>
                            <div className={cn(
                              "p-4 rounded-xl border text-xs leading-relaxed font-mono",
                              testCase.isCorrect ? "bg-emerald-50 border-emerald-200 text-emerald-900" : "bg-rose-50 border-rose-200 text-rose-900"
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
