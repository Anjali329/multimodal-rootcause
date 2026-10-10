import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor,
  iconBg,
  trend,
}: StatCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-soft hover:shadow-soft-lg transition-all duration-200 flex items-center gap-4">
      <div className={cn('w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-transform hover:scale-105', iconBg)}>
        <Icon className={cn('w-7 h-7', iconColor)} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 truncate">
          {title}
        </p>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            {value}
          </span>
          {trend && (
            <span
              className={cn(
                'text-xs font-semibold px-2 py-0.5 rounded-full',
                trend.isPositive
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400'
                  : 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400'
              )}
            >
              {trend.value}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

