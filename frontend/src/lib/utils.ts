import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMasteryColor(mastery: number): string {
  if (mastery < 40) return 'text-mastery-low';
  if (mastery < 70) return 'text-mastery-mid';
  return 'text-mastery-high';
}

export function getMasteryBgColor(mastery: number): string {
  if (mastery < 40) return 'bg-red-50 border-red-200';
  if (mastery < 70) return 'bg-amber-50 border-amber-200';
  return 'bg-emerald-50 border-emerald-200';
}

export function getMasteryLabel(mastery: number): string {
  if (mastery < 40) return 'Needs Work';
  if (mastery < 70) return 'Developing';
  return 'Mastered';
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function formatPercentage(value: number): string {
  return `${Math.round(value)}%`;
}

export const isDemoMode = (): boolean => {
  return import.meta.env.VITE_DEMO_MODE === 'true';
};

