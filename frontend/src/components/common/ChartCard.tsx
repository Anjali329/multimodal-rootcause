import { useNavigate } from 'react-router-dom';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { demoMasteryTrend, demoConcepts } from '@/lib/mock-data';
import { formatDate, getMasteryColor, cn } from '@/lib/utils';
import { ArrowRight, Trophy } from 'lucide-react';

export function ChartCard() {
  const navigate = useNavigate();

  // Prerequisite focus concepts (< 70% mastery)
  const weakConcepts = [...demoConcepts]
    .filter((c) => c.mastery < 70)
    .sort((a, b) => a.mastery - b.mastery)
    .slice(0, 4);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* ── Left: Calculus Mastery Progression Chart (7 cols) ──── */}
      <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-soft flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Calculus Mastery Progression
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Cumulative understanding tracked across adaptive evaluations
              </p>
            </div>
            <span className="text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
              Last 14 Days
            </span>
          </div>

          <div className="h-64 sm:h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={demoMasteryTrend}>
                <defs>
                  <linearGradient id="masteryGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" strokeOpacity={0.6} />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(val) => formatDate(String(val))}
                  stroke="#94a3b8" 
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <YAxis 
                  domain={[0, 100]} 
                  stroke="#94a3b8" 
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    borderRadius: '12px', 
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.08)' 
                  }}
                  formatter={(val: any) => [`${val}%`, 'Mastery']}
                  labelFormatter={(label: any) => formatDate(String(label))}
                />
                <Area 
                  type="monotone" 
                  dataKey="mastery" 
                  stroke="#4f46e5" 
                  strokeWidth={2.5}
                  fillOpacity={1} 
                  fill="url(#masteryGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Starting baseline: 35%</span>
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            +27% overall improvement this month
          </span>
        </div>
      </div>

      {/* ── Right: Prerequisite Focus Areas List (5 cols) ──────── */}
      <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-soft flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Prerequisite Focus Areas
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Concepts requiring targeted remediation (&lt; 70%)
              </p>
            </div>
            <button
              onClick={() => navigate('/map')}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>Map</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3.5 pt-1">
            {weakConcepts.map((concept) => (
              <div 
                key={concept.id}
                className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {concept.name}
                  </span>
                  <span className={cn('text-xs font-bold', getMasteryColor(concept.mastery))}>
                    {concept.mastery}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all duration-300',
                      concept.mastery < 40 
                        ? 'bg-rose-500' 
                        : concept.mastery < 70 
                          ? 'bg-amber-500' 
                          : 'bg-emerald-500'
                    )}
                    style={{ width: `${concept.mastery}%` }}
                  />
                </div>

                <div className="flex items-center justify-between mt-2 pt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                  <span>Topic: {concept.topic}</span>
                  <button
                    onClick={() => navigate('/tutor')}
                    className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Study Concept →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate('/quiz')}
          className="w-full mt-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
        >
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>Launch Diagnostic Quiz For All Weak Topics</span>
        </button>
      </div>
    </section>
  );
}

