import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export function AppShell() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F8FAFC] text-slate-900 font-sans antialiased relative selection:bg-blue-500 selection:text-white">
      {/* ── Ultra-soft ambient canvas styling ── */}
      <Sidebar />
      <div className="flex-1 min-w-0 overflow-y-auto relative z-10 bg-[#F8FAFC]">
        <main className="max-w-[1540px] mx-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
