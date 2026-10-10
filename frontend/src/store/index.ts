import { create } from 'zustand';
import type { Course, LearnerProfile, Citation } from '@/types';
import { demoCourse, demoProfile } from '@/lib/mock-data';

interface AppState {
  // Sidebar
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;

  // Active course
  activeCourse: Course | null;
  setActiveCourse: (course: Course) => void;

  // Learner profile
  profile: LearnerProfile | null;
  setProfile: (profile: LearnerProfile) => void;

  // Source viewer
  activeSourceCitation: Citation | null;
  setActiveSourceCitation: (citation: Citation | null) => void;

  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;

  // Demo mode indicator
  isDemoMode: boolean;
}

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  activeCourse: demoCourse,
  setActiveCourse: (course) => set({ activeCourse: course }),

  profile: demoProfile,
  setProfile: (profile) => set({ profile }),

  activeSourceCitation: null,
  setActiveSourceCitation: (citation) => set({ activeSourceCitation: citation }),

  theme: 'light',
  toggleTheme: () => set((s) => {
    const nextTheme = s.theme === 'light' ? 'dark' : 'light';
    if (typeof document !== 'undefined') {
      if (nextTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    return { theme: nextTheme };
  }),

  isDemoMode: import.meta.env.VITE_DEMO_MODE === 'true',
}));

