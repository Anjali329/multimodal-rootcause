import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  BookOpen,
  Flame,
  FileText,
  Calendar,
  ChevronRight,
  TrendingUp,
  Sparkles,
  Zap,
  Upload,
  Network,
  Video,
  CheckSquare,
  PenTool,
  Bot,
  Lightbulb,
  BarChart3,
  ListTodo,
} from 'lucide-react';

export function OverviewPage() {
  const navigate = useNavigate();
  const [progressRange, setProgressRange] = useState('7d');

  // 7-Day Learning Progress Line Chart Data
  const progressData = [
    { date: 'Oct 4', mastery: 38, accuracy: 30 },
    { date: 'Oct 5', mastery: 44, accuracy: 35 },
    { date: 'Oct 6', mastery: 50, accuracy: 40 },
    { date: 'Oct 7', mastery: 60, accuracy: 48 },
    { date: 'Oct 8', mastery: 65, accuracy: 55 },
    { date: 'Oct 9', mastery: 70, accuracy: 58 },
    { date: 'Oct 10', mastery: 72, accuracy: 65 },
  ];

  // Topic-wise Mastery Donut Chart Data
  const topicData = [
    { name: 'Function Composition', value: 42, color: '#0D9488' }, // Teal
    { name: 'Calculus', value: 78, color: '#6366F1' },             // Indigo
    { name: 'Linear Algebra', value: 85, color: '#334155' },       // Slate Navy
    { name: 'Probability', value: 63, color: '#F43F5E' },          // Rose
    { name: 'Others', value: 70, color: '#A855F7' },               // Purple
  ];

  return (
    <div className="space-y-6">
      
      {/* ── Top Header Greeting ──────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Good evening, Anjali!</span>
            <span className="text-2xl">👋</span>
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Here's your personalized learning overview.
          </p>
        </div>

        {/* Next Exam Pill */}
        <div 
          onClick={() => navigate('/plan')}
          className="flex items-center gap-3 bg-white border border-slate-200/90 px-4 py-2 rounded-2xl shadow-2xs hover:border-slate-300 transition-all cursor-pointer self-start sm:self-auto"
        >
          <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
          <div className="text-left">
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Next Exam</p>
            <p className="text-xs font-bold text-slate-800">in 45 days</p>
          </div>
          <span className="text-xs font-semibold text-teal-600 hover:text-teal-700 ml-1 flex items-center">
            Set Exam Date →
          </span>
        </div>
      </div>

      {/* ── Main Dashboard Layout Grid (Left/Center + Right Sidebar) ── */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* ═════════════════════════════════════════════════════════════ */}
        {/* ── MAIN ANALYTICS & PLANS AREA (Left 8-9 cols) ──────────── */}
        {/* ═════════════════════════════════════════════════════════════ */}
        <div className="xl:col-span-8 2xl:col-span-9 space-y-6">
          
          {/* ── 1. Top Stats Row (4 Cards) ─────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1: Overall Mastery (Radial Progress Ring) */}
            <div 
              onClick={() => navigate('/map')}
              className="bg-white rounded-2xl p-4.5 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-slate-300 transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-3.5">
                {/* Mini Radial Ring */}
                <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
                  <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-100"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-teal-600 transition-all duration-1000"
                      strokeDasharray="72, 100"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="absolute text-xs font-black text-slate-800">72%</span>
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-500">Overall Mastery</p>
                  <p className="text-[11px] font-bold text-emerald-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> +12% this week
                  </p>
                </div>
              </div>

              <TrendingUp className="w-4 h-4 text-slate-300 group-hover:text-teal-600 transition-colors shrink-0" />
            </div>

            {/* Card 2: Topics Mastered */}
            <div 
              onClick={() => navigate('/map')}
              className="bg-white rounded-2xl p-4.5 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-slate-300 transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-500 truncate">Topics Mastered</p>
                  <p className="text-xl font-extrabold text-slate-900 mt-0.5 tracking-tight">12 / 24</p>
                  <p className="text-[11px] text-slate-400 mt-0.5 truncate">50% of curriculum</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors shrink-0" />
            </div>

            {/* Card 3: Current Streak */}
            <div 
              onClick={() => navigate('/plan')}
              className="bg-white rounded-2xl p-4.5 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-slate-300 transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                  <Flame className="w-5 h-5 fill-orange-500 text-orange-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-500 truncate">Current Streak</p>
                  <p className="text-xl font-extrabold text-slate-900 mt-0.5 tracking-tight">5 Days</p>
                  <p className="text-[11px] text-slate-400 mt-0.5 truncate">Personal best</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors shrink-0" />
            </div>

            {/* Card 4: Source Materials */}
            <div 
              onClick={() => navigate('/library')}
              className="bg-white rounded-2xl p-4.5 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-slate-300 transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-500 truncate">Source Materials</p>
                  <p className="text-xl font-extrabold text-slate-900 mt-0.5 tracking-tight">4 Indexed</p>
                  <p className="text-[11px] text-slate-400 mt-0.5 truncate">PDFs, Slides & Videos</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors shrink-0" />
            </div>

          </div>

          {/* ── 2. Middle Row: Two Charts ──────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* Chart 1: Your Learning Progress (7-day Line Chart) */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">
                    Your Learning Progress
                  </h3>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  {/* Legend dots */}
                  <div className="flex items-center gap-1.5 font-medium text-slate-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-600" />
                    <span>Mastery</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium text-slate-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                    <span>Accuracy</span>
                  </div>

                  {/* Range dropdown */}
                  <select 
                    value={progressRange}
                    onChange={(e) => setProgressRange(e.target.value)}
                    className="text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 outline-none cursor-pointer"
                  >
                    <option value="7d">Last 7 Days</option>
                    <option value="14d">Last 14 Days</option>
                    <option value="30d">Last Month</option>
                  </select>
                </div>
              </div>

              {/* Line Chart */}
              <div className="h-56 w-full pt-1">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="date" 
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
                      tickFormatter={(v) => `${v}%`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: '12px', 
                        backgroundColor: '#ffffff', 
                        borderColor: '#e2e8f0', 
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                        fontSize: '12px'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="mastery" 
                      stroke="#0D9488" 
                      strokeWidth={2.5} 
                      dot={{ r: 3.5, fill: '#0D9488' }} 
                      activeDot={{ r: 5 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="accuracy" 
                      stroke="#6366F1" 
                      strokeWidth={2.5} 
                      dot={{ r: 3.5, fill: '#6366F1' }} 
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Topic-wise Mastery (Donut Chart) */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-3 flex flex-col justify-between">
              <h3 className="font-bold text-sm sm:text-base text-slate-900">
                Topic-wise Mastery
              </h3>

              <div className="flex items-center justify-between gap-4">
                {/* Donut Chart with Center Text */}
                <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={topicData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={42}
                        outerRadius={64}
                        paddingAngle={3}
                        stroke="none"
                      >
                        {topicData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-lg font-black text-slate-800 leading-none">72%</span>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">Overall</span>
                  </div>
                </div>

                {/* Slices Legend */}
                <div className="flex-1 space-y-1.5 min-w-0">
                  {topicData.map((t) => (
                    <div key={t.name} className="flex items-center justify-between text-xs gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: t.color }} />
                        <span className="text-slate-600 truncate text-[11.5px]">{t.name}</span>
                      </div>
                      <span className="font-bold text-slate-800 text-[11.5px] shrink-0">{t.value}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Calculated across 5 modules</span>
                <button 
                  onClick={() => navigate('/map')} 
                  className="text-teal-600 hover:text-teal-700 font-semibold text-[11px]"
                >
                  View Details →
                </button>
              </div>
            </div>

          </div>

          {/* ── 3. Bottom Row: Today's Study Plan & Weak Topics ────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Left Card: Today's Study Plan */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-teal-600" />
                    <span>Today's Study Plan</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    3 tasks • 1h 15m
                  </p>
                </div>
                <button
                  onClick={() => navigate('/plan')}
                  className="text-xs font-semibold text-teal-600 hover:text-teal-700 transition-colors"
                >
                  View Full Plan →
                </button>
              </div>

              {/* Task Items */}
              <div className="space-y-3">
                
                {/* Task 1 */}
                <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/70 flex items-center justify-between gap-3 group">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-5 h-5 rounded-full bg-slate-200/80 text-slate-700 text-[11px] font-bold flex items-center justify-center shrink-0">
                      1
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-teal-100/70 text-teal-700 flex items-center justify-center shrink-0">
                      <Video className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate">
                        Function Composition – Video Lesson
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Video Lesson • 20 min
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('/tutor')}
                    className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold shrink-0 transition-colors cursor-pointer"
                  >
                    Continue
                  </button>
                </div>

                {/* Task 2 */}
                <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/70 flex items-center justify-between gap-3 group">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-5 h-5 rounded-full bg-slate-200/80 text-slate-700 text-[11px] font-bold flex items-center justify-center shrink-0">
                      2
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-indigo-100/70 text-indigo-700 flex items-center justify-center shrink-0">
                      <CheckSquare className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate">
                        Diagnostic Quiz – Function Composition
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Diagnostic Quiz • 10 min
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('/quiz')}
                    className="px-3.5 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-xs font-bold shrink-0 transition-colors cursor-pointer"
                  >
                    Start
                  </button>
                </div>

                {/* Task 3 */}
                <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/70 flex items-center justify-between gap-3 group">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-5 h-5 rounded-full bg-slate-200/80 text-slate-700 text-[11px] font-bold flex items-center justify-center shrink-0">
                      3
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-purple-100/70 text-purple-700 flex items-center justify-center shrink-0">
                      <PenTool className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate">
                        Practice Problems – Composite Functions
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Practice Problems • 45 min
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('/quiz')}
                    className="px-3.5 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-xs font-bold shrink-0 transition-colors cursor-pointer"
                  >
                    Start
                  </button>
                </div>

              </div>
            </div>

            {/* Right Card: Weak Topics */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-rose-500" />
                    <span>Weak Topics</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Top 3 topics to focus on
                  </p>
                </div>
                <button
                  onClick={() => navigate('/report/report-001')}
                  className="text-xs font-semibold text-teal-600 hover:text-teal-700 transition-colors"
                >
                  View Details →
                </button>
              </div>

              {/* Weak Topic Items */}
              <div className="space-y-4 pt-1">
                
                {/* Topic 1: Function Composition */}
                <div 
                  onClick={() => navigate('/report/report-001')}
                  className="p-3 rounded-xl bg-slate-50/70 hover:bg-slate-50 border border-slate-200/70 transition-all cursor-pointer flex items-center justify-between gap-3 group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                      <span className="font-bold text-xs text-slate-800 truncate">Function Composition</span>
                      <span className="text-[11px] text-slate-400 font-mono ml-auto">42% mastery</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-rose-500 h-1.5 rounded-full" style={{ width: '42%' }} />
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors shrink-0" />
                </div>

                {/* Topic 2: Inverse Functions */}
                <div 
                  onClick={() => navigate('/report/report-001')}
                  className="p-3 rounded-xl bg-slate-50/70 hover:bg-slate-50 border border-slate-200/70 transition-all cursor-pointer flex items-center justify-between gap-3 group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                      <span className="font-bold text-xs text-slate-800 truncate">Inverse Functions</span>
                      <span className="text-[11px] text-slate-400 font-mono ml-auto">58% mastery</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '58%' }} />
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors shrink-0" />
                </div>

                {/* Topic 3: System Design */}
                <div 
                  onClick={() => navigate('/report/report-001')}
                  className="p-3 rounded-xl bg-slate-50/70 hover:bg-slate-50 border border-slate-200/70 transition-all cursor-pointer flex items-center justify-between gap-3 group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-teal-500 shrink-0" />
                      <span className="font-bold text-xs text-slate-800 truncate">System Design</span>
                      <span className="text-[11px] text-slate-400 font-mono ml-auto">63% mastery</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-teal-500 h-1.5 rounded-full" style={{ width: '63%' }} />
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors shrink-0" />
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* ═════════════════════════════════════════════════════════════ */}
        {/* ── FAR RIGHT SIDEBAR: AI ASSISTANT & QUICK ACTIONS ──────── */}
        {/* ═════════════════════════════════════════════════════════════ */}
        <div className="xl:col-span-4 2xl:col-span-3 space-y-5">
          
          {/* Card 1: AI Study Assistant */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>AI Study Assistant</span>
            </h3>

            {/* Bot Avatar & Description */}
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-teal-50/60 border border-teal-100">
              <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Bot className="w-5 h-5" />
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Ask anything about your course material or get personalized recommendations.
              </p>
            </div>

            {/* Quick Action Prompt Buttons with Arrows */}
            <div className="space-y-2">
              
              <button
                onClick={() => navigate('/tutor?q=Explain%20this%20concept')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50/70 hover:bg-slate-100/80 border border-slate-200/70 text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-semibold text-slate-800">Explain this concept</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => navigate('/report/report-001')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50/70 hover:bg-slate-100/80 border border-slate-200/70 text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <BarChart3 className="w-4 h-4 text-rose-500" />
                  <span className="text-xs font-semibold text-slate-800">Find my weak topics</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => navigate('/quiz')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50/70 hover:bg-slate-100/80 border border-slate-200/70 text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <CheckSquare className="w-4 h-4 text-indigo-500" />
                  <span className="text-xs font-semibold text-slate-800">Create a quiz</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => navigate('/plan')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50/70 hover:bg-slate-100/80 border border-slate-200/70 text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <ListTodo className="w-4 h-4 text-teal-600" />
                  <span className="text-xs font-semibold text-slate-800">Adjust my study plan</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </button>

            </div>
          </div>

          {/* Card 2: Quick Actions (2x2 Grid) */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Quick Actions</span>
            </h3>

            <div className="grid grid-cols-2 gap-3">
              
              {/* Tile 1: Upload Material */}
              <button
                onClick={() => navigate('/library')}
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50/80 hover:bg-teal-50/60 hover:border-teal-200 border border-slate-200/70 transition-all cursor-pointer group text-center"
              >
                <div className="w-9 h-9 rounded-lg bg-teal-100/70 text-teal-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <Upload className="w-4.5 h-4.5" />
                </div>
                <span className="text-[11px] font-bold text-slate-700 group-hover:text-teal-700 leading-tight">
                  Upload Material
                </span>
              </button>

              {/* Tile 2: Start Quiz */}
              <button
                onClick={() => navigate('/quiz')}
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50/80 hover:bg-indigo-50/60 hover:border-indigo-200 border border-slate-200/70 transition-all cursor-pointer group text-center"
              >
                <div className="w-9 h-9 rounded-lg bg-indigo-100/70 text-indigo-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <CheckSquare className="w-4.5 h-4.5" />
                </div>
                <span className="text-[11px] font-bold text-slate-700 group-hover:text-indigo-700 leading-tight">
                  Start Quiz
                </span>
              </button>

              {/* Tile 3: View Knowledge Map */}
              <button
                onClick={() => navigate('/map')}
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50/80 hover:bg-purple-50/60 hover:border-purple-200 border border-slate-200/70 transition-all cursor-pointer group text-center"
              >
                <div className="w-9 h-9 rounded-lg bg-purple-100/70 text-purple-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <Network className="w-4.5 h-4.5" />
                </div>
                <span className="text-[11px] font-bold text-slate-700 group-hover:text-purple-700 leading-tight">
                  View Knowledge Map
                </span>
              </button>

              {/* Tile 4: Open Study Plan */}
              <button
                onClick={() => navigate('/plan')}
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50/80 hover:bg-amber-50/60 hover:border-amber-200 border border-slate-200/70 transition-all cursor-pointer group text-center"
              >
                <div className="w-9 h-9 rounded-lg bg-amber-100/70 text-amber-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <Calendar className="w-4.5 h-4.5" />
                </div>
                <span className="text-[11px] font-bold text-slate-700 group-hover:text-amber-700 leading-tight">
                  Open Study Plan
                </span>
              </button>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
