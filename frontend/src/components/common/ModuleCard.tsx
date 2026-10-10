import { useNavigate } from 'react-router-dom';
import { type LucideIcon, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ModuleData {
  id: string;
  title: string;
  description: string;
  status: string;
  route: string;
  icon: LucideIcon;
  iconColor: string;
  headerGradient: string; // Tailwind gradient classes
  accentBorderColor: string;
}

interface ModuleCardProps {
  module: ModuleData;
}

export function ModuleCard({ module }: ModuleCardProps) {
  const navigate = useNavigate();
  const Icon = module.icon;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate(module.route);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => navigate(module.route)}
      onKeyDown={handleKeyDown}
      aria-label={`Open ${module.title}: ${module.description}`}
      className={cn(
        'group relative flex flex-col justify-between rounded-2xl overflow-hidden',
        'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800',
        'shadow-xs hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700',
        'transition-all duration-200 ease-out cursor-pointer min-w-0',
        'hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
        'h-[245px]'
      )}
    >
      {/* ── Top Header Area with Pastel Tint ────────────────────── */}
      <div className={cn('relative h-[110px] p-4 flex flex-col items-center justify-start overflow-hidden', module.headerGradient)}>
        {/* Module Title */}
        <h3 className="relative z-10 text-[16px] font-bold text-slate-900 dark:text-slate-100 text-center tracking-tight truncate max-w-full">
          {module.title}
        </h3>

        {/* Curved Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10">
          <svg
            viewBox="0 0 500 80"
            preserveAspectRatio="none"
            className="w-full h-5 text-white dark:text-slate-900 fill-current block"
          >
            <path d="M0,0 C150,65 350,65 500,0 L500,80 L0,80 Z" />
          </svg>
        </div>
      </div>

      {/* ── Centered Circular Icon Badge (64px) Overlapping Wave ── */}
      <div className="relative -mt-9 flex justify-center z-20">
        <div
          className={cn(
            'w-16 h-16 rounded-2xl bg-white dark:bg-slate-800',
            'border border-slate-100 dark:border-slate-700 shadow-md',
            'ring-4 ring-white dark:ring-slate-900 flex items-center justify-center',
            'transition-transform duration-200 group-hover:scale-105'
          )}
        >
          <Icon className={cn('w-7 h-7 transition-colors', module.iconColor)} />
        </div>
      </div>

      {/* ── Bottom Details ────────────────────────────────────── */}
      <div className="flex-1 px-4 pt-2 pb-4 flex flex-col justify-between text-center min-w-0">
        <div>
          <p className="text-[12px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed font-normal">
            {module.description}
          </p>
        </div>

        <div className="pt-2 flex items-center justify-center gap-1.5 border-t border-slate-100 dark:border-slate-800/80">
          <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 truncate max-w-[150px] group-hover:hidden">
            {module.status}
          </span>
          <span className="hidden group-hover:inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 transition-colors">
            <span>Launch Module</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </div>
  );
}

