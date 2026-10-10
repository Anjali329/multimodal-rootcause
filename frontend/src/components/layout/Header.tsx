import { useAppStore } from '@/store';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, ChevronDown, Search } from 'lucide-react';

export function Header() {
  const { toggleSidebar } = useAppStore();
  const navigate = useNavigate();

  return (
    <header className="h-16 px-6 sm:px-8 flex items-center justify-between shrink-0 bg-white border-b border-slate-200/80 z-20">
      {/* Left: Mobile hamburger */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Right: Search, Notifications & User Profile */}
      <div className="flex items-center gap-4 shrink-0">
        {/* Search icon */}
        <button
          onClick={() => navigate('/library')}
          className="w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer shadow-2xs"
          title="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Notification Bell */}
        <button
          onClick={() => navigate('/plan')}
          className="relative w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer shadow-2xs"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
        </button>

        {/* User Profile: AK Anjali Kharade */}
        <div 
          onClick={() => navigate('/settings')}
          className="flex items-center gap-2.5 px-2 py-1 rounded-full hover:bg-slate-50 transition-colors cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
            AK
          </div>
          <span className="text-[13px] font-bold text-slate-800 flex items-center gap-1.5 hidden sm:flex">
            <span>Anjali Kharade</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-colors" />
          </span>
        </div>
      </div>
    </header>
  );
}
