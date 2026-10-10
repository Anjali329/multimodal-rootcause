import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { ModuleCard } from './ModuleCard';
import { allModules } from './moduleData';

export function ModuleGrid() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredModules = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return allModules;
    return allModules.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.status.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <section className="space-y-6">
      {/* ── Title & Live Search ──────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Platform Modules
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            College-portal launcher for all 7 adaptive learning components
          </p>
        </div>

        {/* Centered / Underlined Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search module..."
            className="w-full pl-9 pr-8 py-2 text-sm bg-transparent border-b-2 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-400 transition-colors"
            aria-label="Search modules"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* ── Responsive Module Grid ──────────────────────────────── */}
      {filteredModules.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredModules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-8 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No modules found matching &ldquo;<span className="font-semibold">{searchQuery}</span>&rdquo;
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-3 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Clear filter
          </button>
        </div>
      )}
    </section>
  );
}

