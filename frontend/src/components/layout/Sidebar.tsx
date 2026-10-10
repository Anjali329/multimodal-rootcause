import { NavLink, useLocation } from 'react-router-dom';
import { useAppStore } from '@/store';
import { cn } from '@/lib/utils';
import {
  Home,
  LayoutGrid,
  Clock,
  Compass,
  Rocket,
  Layers,
  Sparkles,
  FlaskConical,
  ChevronsUpDown,
} from 'lucide-react';

const mainNav = [
  { path: '/overview', label: 'Home', icon: Home },
  { path: '/map', label: 'Classrooms', icon: LayoutGrid },
  { path: '/plan', label: 'Due Soon', icon: Clock },
];

const classroomNav = [
  { path: '/report/report-001', label: 'Applied Physics 101', icon: Compass },
  { path: '/tutor', label: 'Startup Strategy', icon: Rocket },
  { path: '/library', label: 'Structural Engineering', icon: Layers },
  { path: '/quiz', label: 'Adaptive Quiz Arena', icon: Sparkles },
  { path: '/eval-lab', label: 'Faithfulness & Eval Lab', icon: FlaskConical },
];

export function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useAppStore();
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-xs z-40 lg:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-screen bg-white border-r border-slate-200/80 text-slate-700 flex flex-col justify-between transition-all duration-200 ease-in-out',
          'lg:relative lg:z-auto shrink-0 select-none w-[240px]',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex flex-col flex-1 min-h-0 px-3.5 py-4">
          
          {/* ── Brand Logo Header matching reference screenshot ───── */}
          <div className="flex items-center gap-2.5 px-2 py-2 mb-4 shrink-0">
            {/* Soft stylized wave / M icon */}
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600">
              <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 16c2-4 4-4 6 0 2-4 4-4 6 0 2-4 4-4 4-2" />
              </svg>
            </div>

            <div className="flex flex-col">
              <span className="text-[17px] font-extrabold text-slate-900 tracking-tight leading-none">
                Mindjoy
              </span>
              <span className="text-[10px] text-slate-400 font-medium leading-none mt-1">
                RootCause Tutor
              </span>
            </div>
          </div>

          {/* ── Main Navigation Links ──────────────────────────────── */}
          <nav className="space-y-1 mb-6" aria-label="Main navigation">
            {mainNav.map((item) => {
              const isActive = location.pathname === item.path || 
                (item.path === '/overview' && location.pathname === '/');
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-xl text-[13.5px] font-medium transition-colors',
                    isActive
                      ? 'bg-slate-100 text-slate-900 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  )}
                >
                  <Icon className={cn('w-4.5 h-4.5 shrink-0', isActive ? 'text-slate-900' : 'text-slate-500')} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* ── Classrooms Section ─────────────────────────────────── */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-3 pb-2">
              <span className="text-[11px] font-semibold text-slate-400 tracking-wider">
                Classrooms
              </span>
            </div>
            <div className="space-y-0.5">
              {classroomNav.map((item) => {
                const isActive = location.pathname.startsWith(item.path);
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium transition-colors',
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    )}
                  >
                    <Icon className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Bottom Profile Pill matching reference screenshot ──── */}
        <div className="p-3 border-t border-slate-100">
          <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 via-indigo-500 to-sky-400 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                H
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[13px] font-bold text-slate-900 leading-tight truncate">
                  Hana
                </span>
                <span className="text-[11px] text-slate-400 leading-tight truncate">
                  hana@mindjoy.com
                </span>
              </div>
            </div>
            <ChevronsUpDown className="w-4 h-4 text-slate-400 shrink-0" />
          </div>
        </div>
      </aside>
    </>
  );
}
