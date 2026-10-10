import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function AppShell() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F8FAFC] text-slate-900 font-sans antialiased relative selection:bg-indigo-500 selection:text-white">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden bg-[#F8FAFC]">
        <Header />
        <main className="flex-1 min-w-0 overflow-y-auto p-4 sm:p-6 lg:p-7">
          <div className="max-w-[1560px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
