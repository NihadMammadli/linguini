import { createBrowserRouter, Navigate } from 'react-router-dom';
import { App } from './App';
import { LandingPage } from '@/pages/LandingPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { AlphabetTrainerPage } from '@/pages/AlphabetTrainerPage';
import { WordRecallPage } from '@/pages/WordRecallPage';
import { SentenceBuilderPage } from '@/pages/SentenceBuilderPage';
import { DictationPage } from '@/pages/DictationPage';
import { ReviewPage } from '@/pages/ReviewPage';
import { ProfilePage } from '@/pages/ProfilePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'alphabet', element: <AlphabetTrainerPage /> },
      { path: 'words', element: <WordRecallPage /> },
      { path: 'sentences', element: <SentenceBuilderPage /> },
      { path: 'dictation', element: <DictationPage /> },
      { path: 'review', element: <ReviewPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);
