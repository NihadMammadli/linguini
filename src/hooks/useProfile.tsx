import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type {
  CheckResult,
  ItemKind,
  PracticeRecord,
  UserProgress,
} from '@/types/models';
import {
  bumpStreak,
  clearProgress,
  defaultProgress,
  loadProgress,
  saveProgress,
} from '@/utils/storage';
import { recordAttempt } from '@/utils/srs';

interface ProfileContextValue {
  progress: UserProgress;
  ready: boolean;
  hasProfile: boolean;
  setUsername: (name: string) => void;
  resetProfile: () => void;
  completeLesson: (lessonId: string) => void;
  /** Record a graded attempt: updates SRS, streak, recents, counters. */
  recordResult: (
    itemKind: ItemKind,
    itemId: string,
    label: string,
    result: CheckResult,
  ) => void;
}

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProgress(loadProgress());
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) saveProgress(progress);
  }, [progress, ready]);

  const setUsername = useCallback((name: string) => {
    setProgress((p) => ({ ...p, username: name.trim() || 'Learner' }));
  }, []);

  const resetProfile = useCallback(() => {
    clearProgress();
    setProgress({ ...defaultProgress(), createdAt: Date.now() });
  }, []);

  const completeLesson = useCallback((lessonId: string) => {
    setProgress((p) =>
      p.completedLessonIds.includes(lessonId)
        ? p
        : { ...p, completedLessonIds: [...p.completedLessonIds, lessonId] },
    );
  }, []);

  const recordResult = useCallback(
    (
      itemKind: ItemKind,
      itemId: string,
      label: string,
      result: CheckResult,
    ) => {
      setProgress((p) => {
        const reviewItems = recordAttempt(
          p.reviewItems,
          itemKind,
          itemId,
          result.correct,
          result.mistakes,
        );
        const record: PracticeRecord = {
          itemKind,
          itemId,
          label,
          at: Date.now(),
        };
        const recentlyPracticed = [
          record,
          ...p.recentlyPracticed.filter(
            (r) => !(r.itemKind === itemKind && r.itemId === itemId),
          ),
        ].slice(0, 12);
        return {
          ...p,
          reviewItems,
          recentlyPracticed,
          exercisesReviewed: p.exercisesReviewed + 1,
          streak: bumpStreak(p.streak),
        };
      });
    },
    [],
  );

  const value = useMemo<ProfileContextValue>(
    () => ({
      progress,
      ready,
      hasProfile: Boolean(progress.username),
      setUsername,
      resetProfile,
      completeLesson,
      recordResult,
    }),
    [progress, ready, setUsername, resetProfile, completeLesson, recordResult],
  );

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export function useProfile(): ProfileContextValue {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used within ProfileProvider');
  return ctx;
}
