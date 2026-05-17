import type { UserProgress } from '@/types/models';

const KEY = 'linguini.profile.v1';
const VERSION = 1;

export function defaultProgress(): UserProgress {
  return {
    version: VERSION,
    username: null,
    createdAt: Date.now(),
    completedLessonIds: [],
    reviewItems: {},
    recentlyPracticed: [],
    exercisesReviewed: 0,
    streak: { count: 0, lastActiveDate: null, best: 0 },
  };
}

/** Safe read with versioned fallback to defaults. */
export function loadProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultProgress();
    const parsed = JSON.parse(raw) as Partial<UserProgress>;
    if (!parsed || parsed.version !== VERSION) return defaultProgress();
    return { ...defaultProgress(), ...parsed } as UserProgress;
  } catch {
    return defaultProgress();
  }
}

export function saveProgress(p: UserProgress): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* storage unavailable — silently degrade */
  }
}

export function clearProgress(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}

export function todayKey(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

function daysBetween(a: string, b: string): number {
  const da = new Date(a + 'T00:00:00');
  const db = new Date(b + 'T00:00:00');
  return Math.round((db.getTime() - da.getTime()) / 86_400_000);
}

/** Update the date-based streak; returns a new streak object. */
export function bumpStreak(streak: UserProgress['streak']): UserProgress['streak'] {
  const today = todayKey();
  if (streak.lastActiveDate === today) return streak;
  if (!streak.lastActiveDate) {
    return { count: 1, lastActiveDate: today, best: Math.max(1, streak.best) };
  }
  const gap = daysBetween(streak.lastActiveDate, today);
  const count = gap === 1 ? streak.count + 1 : 1;
  return { count, lastActiveDate: today, best: Math.max(count, streak.best) };
}
