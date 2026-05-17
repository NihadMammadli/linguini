import type {
  ItemKind,
  MistakePattern,
  ReviewItem,
  UserProgress,
} from '@/types/models';

/** Leitner box → delay before an item is due again. */
const BOX_DELAYS_MS = [
  0, // box 0: due immediately (just failed)
  20 * 60_000, // box 1: 20 min
  24 * 3_600_000, // box 2: 1 day
  3 * 24 * 3_600_000, // box 3: 3 days
  7 * 24 * 3_600_000, // box 4: 1 week
];
export const MAX_BOX = BOX_DELAYS_MS.length - 1;

export function reviewKey(itemKind: ItemKind, itemId: string): string {
  return `${itemKind}:${itemId}`;
}

function freshItem(itemKind: ItemKind, itemId: string): ReviewItem {
  return {
    id: reviewKey(itemKind, itemId),
    itemKind,
    itemId,
    box: 0,
    attempts: 0,
    failures: 0,
    lastSeen: 0,
    dueAt: 0,
    mistakes: [],
  };
}

/**
 * Record an attempt. Correct → promote a box; wrong → drop to box 0.
 * Returns the updated reviewItems map (does not mutate input).
 */
export function recordAttempt(
  reviewItems: Record<string, ReviewItem>,
  itemKind: ItemKind,
  itemId: string,
  correct: boolean,
  mistakes: MistakePattern[] = [],
): Record<string, ReviewItem> {
  const key = reviewKey(itemKind, itemId);
  const prev = reviewItems[key] ?? freshItem(itemKind, itemId);
  const now = Date.now();
  const box = correct ? Math.min(prev.box + 1, MAX_BOX) : 0;
  const next: ReviewItem = {
    ...prev,
    box,
    attempts: prev.attempts + 1,
    failures: prev.failures + (correct ? 0 : 1),
    lastSeen: now,
    dueAt: now + BOX_DELAYS_MS[box],
    mistakes: [...prev.mistakes, ...mistakes].slice(-12),
  };
  return { ...reviewItems, [key]: next };
}

export function isWeak(item: ReviewItem): boolean {
  return item.box <= 1 && item.failures > 0;
}

/** Items whose due time has passed, weakest first. */
export function getReviewQueue(
  progress: UserProgress,
  limit = 20,
): ReviewItem[] {
  const now = Date.now();
  return Object.values(progress.reviewItems)
    .filter((it) => it.attempts > 0 && it.dueAt <= now && it.failures > 0)
    .sort((a, b) => a.box - b.box || b.failures - a.failures)
    .slice(0, limit);
}

export function weakItemsByKind(
  progress: UserProgress,
  kind: ItemKind,
): ReviewItem[] {
  return Object.values(progress.reviewItems)
    .filter((it) => it.itemKind === kind && isWeak(it))
    .sort((a, b) => b.failures - a.failures);
}
