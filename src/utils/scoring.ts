import type { CheckResult, DiffChar, MistakePattern } from '@/types/models';
import { latinToGeorgian, looksLatin } from './transliteration';

/** Normalize for forgiving comparison: trim, collapse spaces, drop final punctuation. */
export function normalize(s: string): string {
  return s
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/[.!?,;:]+$/g, '')
    .toLowerCase();
}

/** Classic Levenshtein distance. */
export function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (!m) return n;
  if (!n) return m;
  const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost,
      );
    }
  }
  return dp[m][n];
}

export function similarity(a: string, b: string): number {
  if (!a && !b) return 1;
  const dist = levenshtein(a, b);
  return 1 - dist / Math.max(a.length, b.length, 1);
}

/** Character-level diff (LCS backtrace) for the highlighted correction view. */
export function diffChars(expected: string, got: string): DiffChar[] {
  const e = [...expected];
  const g = [...got];
  const m = e.length;
  const n = g.length;
  const lcs: number[][] = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(0),
  );
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      lcs[i][j] =
        e[i] === g[j]
          ? lcs[i + 1][j + 1] + 1
          : Math.max(lcs[i + 1][j], lcs[i][j + 1]);
    }
  }
  const out: DiffChar[] = [];
  let i = 0;
  let j = 0;
  while (i < m && j < n) {
    if (e[i] === g[j]) {
      out.push({ char: e[i], status: 'ok' });
      i++;
      j++;
    } else if (lcs[i + 1][j] >= lcs[i][j + 1]) {
      out.push({ char: e[i], status: 'missing' });
      i++;
    } else {
      out.push({ char: g[j], status: 'extra' });
      j++;
    }
  }
  while (i < m) out.push({ char: e[i++], status: 'missing' });
  while (j < n) out.push({ char: g[j++], status: 'extra' });
  return out;
}

function classifyMistakes(diff: DiffChar[], expected: string, got: string): MistakePattern[] {
  const at = Date.now();
  if (!got.trim()) {
    return [{ type: 'empty', expected, got, at }];
  }
  const out: MistakePattern[] = [];
  let missing = 0;
  let extra = 0;
  for (const d of diff) {
    if (d.status === 'missing') missing++;
    if (d.status === 'extra') extra++;
  }
  if (missing && extra) out.push({ type: 'wrong-letter', expected, got, at });
  else if (missing) out.push({ type: 'missing-letter', expected, got, at });
  else if (extra) out.push({ type: 'extra-letter', expected, got, at });
  return out;
}

/**
 * The single check used by every writing exercise.
 * Tolerant of near-misses; flags transliteration so users learn the script.
 */
export function checkAnswer(rawExpected: string, rawGot: string): CheckResult {
  const expected = rawExpected.trim();
  const got = rawGot.trim();

  const transliterated = looksLatin(got) && !looksLatin(expected);
  const effectiveGot = transliterated ? latinToGeorgian(got) : got;

  const nExpected = normalize(expected);
  const nGot = normalize(effectiveGot);
  const exact = nExpected === nGot;
  const sim = similarity(nExpected, nGot);
  const correct = exact || (!transliterated && sim >= 0.94 && nExpected.length > 3);

  const diff = diffChars(expected, transliterated ? latinToGeorgian(got) : got);

  let mistakes: MistakePattern[] = [];
  let hint = '';

  if (correct) {
    hint = transliterated
      ? 'Right word — but type it in Georgian script next time.'
      : sim < 1
        ? 'Accepted — a tiny slip, but the meaning is right.'
        : 'Exact. Well recalled.';
  } else if (transliterated) {
    mistakes = [{ type: 'transliteration-slip', expected, got, at: Date.now() }];
    hint = 'You wrote it in Latin letters. Produce it in Georgian script: ' + expected;
  } else {
    mistakes = classifyMistakes(diff, expected, got);
    if (!got) hint = 'Nothing typed — try to reconstruct it from memory.';
    else if (sim >= 0.6)
      hint = 'Close. Check the highlighted letters and try again.';
    else hint = 'Not quite. Expected: ' + expected;
  }

  return { correct, similarity: sim, expected, got, hint, mistakes, diff };
}
