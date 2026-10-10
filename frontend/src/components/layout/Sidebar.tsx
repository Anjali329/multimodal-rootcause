import { NavLink, useLocation } from 'react-router-dom';
import { useAppStore } from '@/store';
import { cn } from '@/lib/utils';
import {
  Home,
  CalendarCheck,
  FlaskConical,
  Network,
  BookOpen,
  FileText,
  Settings,
  Sparkles,
} from 'lucide-react';

const navItems = [
  { path: '/overview', label: 'Overview', icon: Home },
  { path: '/plan', label: 'Study Plan', icon: CalendarCheck },
  { path: '/eval-lab', label: 'Eval Lab', icon: FlaskConical },
  { path: '/map', label: 'Knowledge Map', icon: Network },
  { path: '/library', label: 'Library', icon: BookOpen },
  { path: '/report/report-001', label: 'Reports', icon: FileText },
  { path: '/settings', label: 'Settings', icon: Settings },
  { path: '/', label: 'Project Info', icon: Sparkles },
];

export function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useAppStore();
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-screen bg-[#080D1A]/90 backdrop-blur-xl border-r border-white/[0.08] text-white flex flex-col justify-between transition-all duration-300 ease-in-out',
          'lg:relative lg:z-auto shrink-0 select-none w-[260px]',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex flex-col flex-1 min-h-0">
          
          {/* ── Brand Logo Header ─────────────────────────────────── */}
          <div className="flex items-center gap-3 h-16 px-5 border-b border-white/[0.08] shrink-0">
            {/* Geometric Angled Icon matching Landing page */}
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md shadow-purple-500/20">
              <svg className="w-4.5 h-4.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>

            <div className="flex flex-col min-w-0">
              <span className="text-[16px] font-bold text-white tracking-tight leading-tight">
                RootCause <span className="font-light text-slate-300">Tutor</span>
              </span>
              <span className="text-[10px] text-slate-400 tracking-wider font-medium leading-tight mt-0.5">
                Learn • Analyze • Improve
              </span>
            </div>
          </div>

          {/* ── Navigation Links ─────────────────────────────────── */}
          <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto" role="navigation" aria-label="Main navigation">
            {navItems.map((item) => {
              const isActive = item.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.path.split('/')[1] ? `/${item.path.split('/')[1]}` : item.path);

              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] transition-all duration-150',
                    isActive
                      ? 'bg-[#2563EB] text-white font-semibold shadow-md shadow-blue-500/25'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.06] font-medium'
                  )}
                  title={item.label}
                >
                  <Icon className={cn('w-4.5 h-4.5 shrink-0', isActive ? 'text-white' : 'text-slate-400')} />
                  <span className="truncate">{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* ── Bottom Quote / Motivation Card ───────────────────── */}
        <div className="p-4 m-3 rounded-xl bg-white/[0.04] border border-white/[0.08] relative overflow-hidden shrink-0 backdrop-blur-md">
          {/* Sparkle Icon */}
          <div className="w-5 h-5 flex items-center justify-center text-amber-300 mb-2">
            <Sparkles className="w-4 h-4 fill-amber-300 text-amber-300" />
          </div>

          {/* 3 lines text */}
          <div className="space-y-0.5 relative z-10">
            <p className="text-[12px] font-bold text-white leading-tight">Better Questions</p>
            <p className="text-[12px] font-bold text-white leading-tight">Deeper Learning</p>
            <p className="text-[12px] font-bold text-white leading-tight">Real Progress</p>
          </div>

          {/* Decorative wave at bottom right */}
          <div className="absolute right-0 bottom-0 pointer-events-none opacity-40">
            <svg width="65" height="35" viewBox="0 0 65 35" fill="none">
              <path
                d="M0 25C20 25 25 5 45 15C55 20 60 10 65 5"
                stroke="#C084FC"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </aside>
    </>
  );
}
