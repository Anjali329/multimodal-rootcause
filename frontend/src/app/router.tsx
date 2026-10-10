import { createBrowserRouter } from 'react-router-dom';
import { AppShell } from '@/components/layout';
import { LandingPage } from '@/pages/Landing';
import { OverviewPage } from '@/pages/Overview';
import { OnboardingPage } from '@/pages/Onboarding';
import { Library as LibraryPage } from '@/pages/Library';
import { Tutor as TutorPage } from '@/pages/Tutor';
import { KnowledgeMap as KnowledgeMapPage } from '@/pages/KnowledgeMap';
import { Quiz as QuizPage } from '@/pages/Quiz';
import { ActiveQuiz as ActiveQuizPage } from '@/pages/ActiveQuiz';
import { Report as ReportPage } from '@/pages/Report';
import { StudyPlan as StudyPlanPage } from '@/pages/StudyPlan';
import { EvalLab as EvalLabPage } from '@/pages/EvalLab';
import { SettingsPage } from '@/pages/Settings';

export const router = createBrowserRouter([
  // 1. Landing Page (First Page with Project Name, Track D Info, & Features)
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/landing',
    element: <LandingPage />,
  },

  // 2. Main Application Workspace (AppShell + Overview + All Modules)
  {
    path: '/app',
    element: <AppShell />,
    children: [
      { index: true, element: <OverviewPage /> },
      { path: 'overview', element: <OverviewPage /> },
      { path: 'library', element: <LibraryPage /> },
      { path: 'tutor', element: <TutorPage /> },
      { path: 'map', element: <KnowledgeMapPage /> },
      { path: 'quiz', element: <QuizPage /> },
      { path: 'quiz/:quizId', element: <ActiveQuizPage /> },
      { path: 'report/:reportId', element: <ReportPage /> },
      { path: 'plan', element: <StudyPlanPage /> },
      { path: 'eval-lab', element: <EvalLabPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
  {
    path: '/',
    element: <AppShell />,
    children: [
      { path: 'overview', element: <OverviewPage /> },
      { path: 'library', element: <LibraryPage /> },
      { path: 'tutor', element: <TutorPage /> },
      { path: 'map', element: <KnowledgeMapPage /> },
      { path: 'quiz', element: <QuizPage /> },
      { path: 'quiz/:quizId', element: <ActiveQuizPage /> },
      { path: 'report/:reportId', element: <ReportPage /> },
      { path: 'plan', element: <StudyPlanPage /> },
      { path: 'eval-lab', element: <EvalLabPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },

  // 3. Onboarding
  {
    path: '/onboarding',
    element: <OnboardingPage />,
  },
]);
