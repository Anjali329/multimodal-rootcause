import { useAppStore } from '@/store';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, ChevronDown, Sparkles } from 'lucide-react';

export function Header() {
  const { toggleSidebar, profile } = useAppStore();
  const navigate = useNavigate();

  return (
    <header className="h-16 px-6 flex items-center justify-between shrink-0 bg-transparent">
      {/* Mobile hamburger menu + Landing Page Link */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-xs cursor-pointer"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <button
          onClick={() => navigate('/')}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 shadow-2xs transition-colors cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-500" />
          <span>Project Info / Landing</span>
        </button>
      </div>

      {/* Top right: Notification Bell + User Profile */}
      <div className="flex items-center gap-4 shrink-0">
        {/* Notification Bell with red badge */}
        <button
          className="relative w-9 h-9 rounded-full bg-white dark:bg-slate-800 border border-slate-200/80 flex items-center justify-center text-slate-600 hover:text-blue-600 shadow-2xs transition-colors cursor-pointer"
          aria-label="Notifications"
        >
          <Bell className="w-4.5 h-4.5" />
          <span className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-[#EF4444] ring-2 ring-white" />
        </button>

        {/* User Avatar + Deepak ▾ */}
        <div className="flex items-center gap-2.5 cursor-pointer group min-w-0">
          <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border border-slate-200">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80"
              alt="Deepak"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-[14px] font-bold text-slate-800 flex items-center gap-1 min-w-0">
            <span className="truncate max-w-[120px]">{profile?.name || 'Deepak'}</span>
            <ChevronDown className="w-3.5 h-3.5 shrink-0 text-slate-500 group-hover:text-slate-800 transition-colors" />
          </span>
        </div>
      </div>
    </header>
  );
}
