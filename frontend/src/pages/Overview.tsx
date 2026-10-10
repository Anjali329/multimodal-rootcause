import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Image as ImageIcon,
  Mic,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  FileText,
  Brain,
  Baby,
  Video,
  ArrowUpRight,
  Flame,
  Trophy,
} from 'lucide-react';

export function OverviewPage() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');

  const quickPills = [
    { label: 'Explain this concept', icon: BookOpen, color: 'text-blue-600' },
    { label: 'Summarize this', icon: FileText, color: 'text-amber-600' },
    { label: 'Test my knowledge', icon: Brain, color: 'text-rose-500' },
    { label: "Explain like I'm 5", icon: Baby, color: 'text-yellow-600' },
    { label: 'Visual demonstration', icon: Video, color: 'text-purple-600' },
  ];

  const handleAskSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (prompt.trim()) {
      navigate(`/tutor?q=${encodeURIComponent(prompt)}`);
    } else {
      navigate('/tutor');
    }
  };

  const handlePillClick = (text: string) => {
    setPrompt(text);
    navigate(`/tutor?q=${encodeURIComponent(text)}`);
  };

  // Activity heatmap grid pattern (7 rows x 16 columns)
  // Higher numbers correspond to deeper blue intensities (0 to 4)
  const heatmapData: number[][] = [
    [0, 1, 0, 0, 0, 2, 0, 0, 0, 0, 1, 2, 0, 3, 4, 3],
    [1, 0, 0, 0, 0, 4, 2, 0, 0, 0, 3, 0, 0, 4, 4, 4],
    [0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 4, 0, 2, 3, 4, 4],
    [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 3, 4, 4],
    [0, 0, 2, 0, 0, 0, 0, 2, 3, 0, 4, 3, 4, 4, 4, 4],
    [0, 3, 4, 0, 0, 0, 0, 0, 4, 0, 4, 4, 4, 4, 4, 4],
    [0, 4, 4, 0, 0, 0, 0, 0, 4, 0, 4, 4, 4, 4, 4, 4],
  ];

  const getHeatmapColor = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-blue-100';
      case 2:
        return 'bg-blue-300';
      case 3:
        return 'bg-blue-500';
      case 4:
        return 'bg-blue-600';
      default:
        return 'bg-slate-100';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-7 items-start">
      
      {/* ═════════════════════════════════════════════════════════════ */}
      {/* ── LEFT & CENTER MAIN CANVAS: Clean Simple Interactive Hub ── */}
      {/* ═════════════════════════════════════════════════════════════ */}
      <div className="lg:col-span-8 space-y-6 sm:space-y-7 min-w-0">

        {/* ── Greeting Header ─────────────────────────────────────── */}
        <div>
          <h1 className="text-2xl sm:text-[28px] font-extrabold text-slate-900 tracking-tight">
            Good Morning, Hana
          </h1>
        </div>

        {/* ── Visual Ask Anything Input Box ────────────────────────── */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-3.5">
          <form onSubmit={handleAskSubmit} className="relative">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask anything"
              className="w-full text-base sm:text-lg text-slate-800 placeholder-slate-400 bg-transparent border-0 outline-none pr-16 pl-1 font-normal"
            />
            
            {/* Input icons inside box */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-3">
              <button
                type="button"
                onClick={() => navigate('/library')}
                title="Attach source file or diagram"
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
              >
                <ImageIcon className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => navigate('/tutor')}
                title="Voice input"
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
              >
                <Mic className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Quick Action Pills matching reference screenshot */}
          <div className="flex flex-wrap gap-2 pt-1">
            {quickPills.map((pill, i) => {
              const Icon = pill.icon;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handlePillClick(pill.label)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 text-[12.5px] font-medium text-slate-700 transition-all cursor-pointer shadow-2xs"
                >
                  <Icon className={`w-3.5 h-3.5 ${pill.color}`} />
                  <span>{pill.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Continue Learning Section ───────────────────────────── */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Continue Learning
            </h2>
            <div className="flex items-center gap-1 text-slate-400">
              <button className="p-1 rounded-full hover:bg-slate-100 hover:text-slate-700 transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="p-1 rounded-full hover:bg-slate-100 hover:text-slate-700 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            
            {/* Card 1: Electricity & Magnetism (Peach/Rose Pastel Banner) */}
            <div
              onClick={() => navigate('/report/report-001')}
              className="bg-white rounded-2xl border border-slate-200/80 p-3 hover:border-slate-300 transition-all cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.02)] group flex flex-col justify-between"
            >
              <div>
                {/* Visual Header Banner */}
                <div className="h-32 rounded-xl bg-[#FEECEC] flex items-center justify-center relative overflow-hidden">
                  <span className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs text-[10.5px] font-semibold text-slate-700 px-2.5 py-0.5 rounded-full shadow-2xs">
                    Due Tomorrow, 9:00
                  </span>
                  
                  {/* Magnet Illustration 🧲 */}
                  <div className="text-5xl group-hover:scale-110 transition-transform duration-200">
                    🧲
                  </div>
                </div>

                {/* Content */}
                <div className="mt-3 px-1">
                  <h3 className="font-bold text-[13.5px] text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                    Electricity & Magnetism
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Physics 12A
                  </p>
                </div>
              </div>

              {/* Progress Bar & Stats */}
              <div className="mt-3 px-1 pt-1">
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '86%' }} />
                </div>
                <div className="mt-2 text-[11px] text-slate-500 font-medium">
                  86% complete • 30 min
                </div>
              </div>
            </div>

            {/* Card 2: Forces & Motion Essentials (Mint/Cyan Pastel Banner) */}
            <div
              onClick={() => navigate('/tutor')}
              className="bg-white rounded-2xl border border-slate-200/80 p-3 hover:border-slate-300 transition-all cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.02)] group flex flex-col justify-between"
            >
              <div>
                {/* Visual Header Banner */}
                <div className="h-32 rounded-xl bg-[#E8F7F8] flex items-center justify-center relative overflow-hidden">
                  <span className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs text-[10.5px] font-semibold text-slate-700 px-2.5 py-0.5 rounded-full shadow-2xs">
                    Due 12 June
                  </span>

                  {/* Stacked Avatars */}
                  <div className="absolute top-2.5 right-2.5 flex items-center">
                    <div className="w-5 h-5 rounded-full bg-purple-600 text-white font-bold text-[9px] flex items-center justify-center shadow-xs border border-white">
                      E
                    </div>
                    <div className="w-5 h-5 rounded-full bg-amber-500 text-white font-bold text-[9px] flex items-center justify-center shadow-xs border border-white -ml-1.5">
                      A
                    </div>
                  </div>

                  {/* Triangle Ruler Illustration 📐 */}
                  <div className="text-5xl group-hover:scale-110 transition-transform duration-200">
                    📐
                  </div>
                </div>

                {/* Content */}
                <div className="mt-3 px-1">
                  <h3 className="font-bold text-[13.5px] text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                    Forces & Motion Essentials
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Physics 12A
                  </p>
                </div>
              </div>

              {/* Progress Bar & Stats */}
              <div className="mt-3 px-1 pt-1">
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '57%' }} />
                </div>
                <div className="mt-2 text-[11px] text-slate-500 font-medium">
                  57% complete • 45 min
                </div>
              </div>
            </div>

            {/* Card 3: ResNets & Gradient Flow (Lavender/Purple Pastel Banner) */}
            <div
              onClick={() => navigate('/map')}
              className="bg-white rounded-2xl border border-slate-200/80 p-3 hover:border-slate-300 transition-all cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.02)] group flex flex-col justify-between"
            >
              <div>
                {/* Visual Header Banner */}
                <div className="h-32 rounded-xl bg-[#F0EEFF] flex items-center justify-center relative overflow-hidden">
                  {/* DNA / Double Helix Illustration 🧬 */}
                  <div className="text-5xl group-hover:scale-110 transition-transform duration-200">
                    🧬
                  </div>
                </div>

                {/* Content */}
                <div className="mt-3 px-1">
                  <h3 className="font-bold text-[13.5px] text-slate-900 group-hover:text-purple-600 transition-colors line-clamp-1">
                    Forces & Motion Essentials
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Mindjoy Physics
                  </p>
                </div>
              </div>

              {/* Progress Bar & Stats */}
              <div className="mt-3 px-1 pt-1">
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '42%' }} />
                </div>
                <div className="mt-2 text-[11px] text-slate-500 font-medium">
                  42% complete • 2 hrs
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── Tutors Section ───────────────────────────────────────── */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Tutors
            </h2>
            <div className="flex items-center gap-1 text-slate-400">
              <button className="p-1 rounded-full hover:bg-slate-100 hover:text-slate-700 transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="p-1 rounded-full hover:bg-slate-100 hover:text-slate-700 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Tutor Card 1: Coding Tutor */}
            <div
              onClick={() => navigate('/tutor?role=coding')}
              className="bg-white rounded-2xl border border-slate-200/80 p-4 hover:border-slate-300 transition-all cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex gap-3.5 items-start group"
            >
              {/* Illustrated Character Avatar */}
              <div className="w-16 h-16 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 overflow-hidden shadow-xs relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900 via-slate-800 to-cyan-900 opacity-90" />
                <span className="relative z-10 text-2xl">💻</span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="font-bold text-[14px] text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                    Coding Tutor
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5">
                  <span className="font-semibold text-blue-600 flex items-center">
                    <ArrowUpRight className="w-3 h-3" /> CS500
                  </span>
                  <span>•</span>
                  <span>4 weeks ago</span>
                </div>

                <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                  Learn coding step-by-step with a patient guide focused on clear logic...
                </p>
              </div>
            </div>

            {/* Tutor Card 2: Physics Mentor */}
            <div
              onClick={() => navigate('/tutor?role=physics')}
              className="bg-white rounded-2xl border border-slate-200/80 p-4 hover:border-slate-300 transition-all cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex gap-3.5 items-start group"
            >
              {/* Illustrated Character Avatar */}
              <div className="w-16 h-16 rounded-xl bg-amber-950 text-white flex items-center justify-center shrink-0 overflow-hidden shadow-xs relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-900 via-slate-800 to-indigo-900 opacity-90" />
                <span className="relative z-10 text-2xl">🧑‍🏫</span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="font-bold text-[14px] text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                    Physics Mentor
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5">
                  <span className="font-semibold text-blue-600 flex items-center">
                    <ArrowUpRight className="w-3 h-3" /> Physics 101
                  </span>
                  <span>•</span>
                  <span>2 weeks ago</span>
                </div>

                <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                  Make physics clear! Learn how equations connect to your everyday intuition...
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* ── Learning Progress Section ───────────────────────────── */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Learning Progress
            </h2>
            <div className="flex items-center gap-1 text-slate-400">
              <button className="p-1 rounded-full hover:bg-slate-100 hover:text-slate-700 transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="p-1 rounded-full hover:bg-slate-100 hover:text-slate-700 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Leaderboard Card */}
            <div
              onClick={() => navigate('/quiz')}
              className="bg-white rounded-2xl border border-slate-200/80 p-4 hover:border-slate-300 transition-all cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-[14px] text-slate-900">
                    Leaderboard
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Time spent learning this week
                  </p>
                </div>
                <Trophy className="w-5 h-5 text-amber-500" />
              </div>

              <div className="mt-4 flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                <span className="font-semibold text-slate-700">Rank #2 in cohort</span>
                <span className="font-bold text-blue-600">14.5 hrs</span>
              </div>
            </div>

            {/* Learning Streak Card */}
            <div
              onClick={() => navigate('/plan')}
              className="bg-white rounded-2xl border border-slate-200/80 p-4 hover:border-slate-300 transition-all cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-[14px] text-slate-900">
                    Learning Streak
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    174 study sessions in the last year
                  </p>
                </div>
                <Flame className="w-5 h-5 text-orange-500" />
              </div>

              <div className="mt-4 flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                <span className="font-semibold text-slate-700">Active Streak</span>
                <span className="font-bold text-orange-600">14 Days 🔥</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* ═════════════════════════════════════════════════════════════ */}
      {/* ── RIGHT PROFILE & VISUALIZATIONS PANEL ─────────────────── */}
      {/* ═════════════════════════════════════════════════════════════ */}
      <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-3xl p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-5">
        
        {/* Profile Card Header */}
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-500 via-sky-400 to-indigo-600 text-white font-bold text-xl flex items-center justify-center shadow-md">
            H
          </div>
          <div>
            <h2 className="text-[17px] font-extrabold text-slate-900 leading-tight">
              Hana
            </h2>
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mt-0.5 inline-block">
              PROBLEM SOLVER
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-b border-dashed border-slate-200" />

        {/* Game Plan Section */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase block">
            GAME PLAN
          </span>
          <p className="text-xs text-slate-700 leading-relaxed font-normal">
            I'm aiming to <strong className="font-semibold text-slate-900">do well academically by mastering the basics</strong>.
          </p>
        </div>

        {/* Divider */}
        <div className="border-b border-dashed border-slate-200" />

        {/* How I Like to Learn (Multi-colored progress bars) */}
        <div className="space-y-3">
          <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase block">
            HOW I LIKE TO LEARN
          </span>

          <div className="space-y-2.5">
            {/* Seeing & Drawing - Blue */}
            <div className="flex items-center justify-between gap-3 text-xs">
              <span className="text-slate-700 font-medium shrink-0">Seeing & Drawing</span>
              <div className="w-28 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '85%' }} />
              </div>
            </div>

            {/* Reading & Writing - Purple */}
            <div className="flex items-center justify-between gap-3 text-xs">
              <span className="text-slate-700 font-medium shrink-0">Reading & Writing</span>
              <div className="w-28 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-600 rounded-full" style={{ width: '42%' }} />
              </div>
            </div>

            {/* Speaking & Listening - Orange */}
            <div className="flex items-center justify-between gap-3 text-xs">
              <span className="text-slate-700 font-medium shrink-0">Speaking & Listening</span>
              <div className="w-28 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full" style={{ width: '25%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-b border-dashed border-slate-200" />

        {/* Values / Mastery Badges */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase block">
            VALUES
          </span>

          <div className="flex flex-wrap gap-1.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-100">
              🌱 Growth
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-100">
              🎨 Creativity
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-800 border border-orange-100">
              🦁 Courage
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-800 border border-blue-100">
              📚 Learning
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-800 border border-yellow-100">
              ⭐ Excellence
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-b border-dashed border-slate-200" />

        {/* Learning Sessions Calendar Heatmap Visualization */}
        <div className="space-y-2 pt-0.5">
          <div>
            <h3 className="font-bold text-[14px] text-slate-900">
              Learning Sessions
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              174 study sessions in the last year
            </p>
          </div>

          {/* Months header */}
          <div className="flex justify-between text-[11px] text-slate-400 font-medium px-0.5 pt-2">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
          </div>

          {/* Heatmap Grid Matrix */}
          <div className="grid grid-rows-7 grid-flow-col gap-1 pt-1 justify-between">
            {heatmapData.map((row, rIdx) =>
              row.map((val, cIdx) => (
                <div
                  key={`${rIdx}-${cIdx}`}
                  className={`w-3.5 h-3.5 rounded-[3px] transition-colors ${getHeatmapColor(val)}`}
                  title={`${val > 0 ? val * 2 : 0} sessions`}
                />
              ))
            )}
          </div>

          {/* Heatmap Legend */}
          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2">
            <span>Less</span>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-[2px] bg-slate-100" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-blue-100" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-blue-300" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-blue-500" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-blue-600" />
            </div>
            <span>More</span>
          </div>
        </div>

      </div>

    </div>
  );
}
