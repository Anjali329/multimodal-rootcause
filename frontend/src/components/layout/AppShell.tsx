import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export function AppShell() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#080D1A] text-slate-100 font-sans antialiased relative selection:bg-blue-600 selection:text-white">
      {/* ── Background Grid & Atmospheric Glow Matching Landing Page ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:28px_28px] opacity-70" />
        <div className="absolute top-[-15%] left-[25%] w-[800px] h-[550px] bg-purple-600/15 rounded-full blur-[160px]" />
        <div className="absolute top-[10%] right-[-10%] w-[650px] h-[650px] bg-blue-600/12 rounded-full blur-[170px]" />
      </div>

      <Sidebar />
      <div className="flex-1 min-w-0 overflow-y-auto relative z-10">
        <main className="max-w-[1440px] mx-auto p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
