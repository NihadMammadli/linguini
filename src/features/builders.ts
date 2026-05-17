import type { SessionQuestion } from '@/hooks/useExerciseSession';
import type { ItemKind, UserProgress } from '@/types/models';
import { ALPHABET, ALPHABET_BY_ID, CONFUSION_PAIRS } from '@/data/alphabet';
import { WORDS, WORDS_BY_ID } from '@/data/words';
import { SENTENCES, SENTENCES_BY_ID } from '@/data/sentences';
import { getReviewQueue } from '@/utils/srs';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export type AlphabetMode = 'type' | 'listen' | 'confusion';

export function buildAlphabetSession(
  mode: AlphabetMode,
  group: 'all' | 'intro' | 'core' | 'advanced' = 'all',
  count = 10,
): SessionQuestion[] {
  if (mode === 'confusion') {
    return shuffle(CONFUSION_PAIRS)
      .slice(0, count)
      .flatMap(([a, b]) =>
        [a, b].map((id) => {
          const L = ALPHABET_BY_ID[id];
          const other = id === a ? ALPHABET_BY_ID[b] : ALPHABET_BY_ID[a];
          return {
            key: `conf-${id}-${other.id}`,
            itemKind: 'letter' as ItemKind,
            itemId: L.id,
            label: `${L.glyph} (not ${other.glyph})`,
            prompt: `Confusion pair · ${L.translit} vs ${other.translit}`,
            subtitle: `Type “${L.name}” — ${L.translit}`,
            answer: L.glyph,
            audioText: L.glyph,
          };
        }),
      )
      .slice(0, count);
  }

  const pool =
    group === 'all' ? ALPHABET : ALPHABET.filter((l) => l.group === group);

  return shuffle(pool)
    .slice(0, count)
    .map((L) =>
      mode === 'listen'
        ? {
            key: `let-listen-${L.id}`,
            itemKind: 'letter' as ItemKind,
            itemId: L.id,
            label: L.glyph,
            prompt: 'Type what you hear',
            answer: L.glyph,
            audioText: L.glyph,
          }
        : {
            key: `let-type-${L.id}`,
            itemKind: 'letter' as ItemKind,
            itemId: L.id,
            label: `${L.name} · ${L.translit}`,
            prompt: 'Type this letter',
            subtitle: `${L.glyph}  —  ${L.translit}`,
            answer: L.glyph,
            audioText: L.glyph,
          },
    );
}

export function buildWordSession(
  group: 'all' | 'intro' | 'core' | 'advanced' = 'all',
  count = 10,
): SessionQuestion[] {
  const pool =
    group === 'all' ? WORDS : WORDS.filter((w) => w.group === group);
  return shuffle(pool)
    .slice(0, count)
    .map((w) => ({
      key: `word-${w.id}`,
      itemKind: 'word' as ItemKind,
      itemId: w.id,
      label: w.en,
      prompt: 'Write the Georgian for',
      subtitle: w.en,
      answer: w.ka,
      audioText: w.ka,
    }));
}

export function buildSentenceSession(
  group: 'all' | 'intro' | 'core' | 'advanced' = 'all',
  count = 8,
): SessionQuestion[] {
  const pool =
    group === 'all'
      ? SENTENCES
      : SENTENCES.filter((s) => s.group === group);
  return shuffle(pool)
    .slice(0, count)
    .map((s) => ({
      key: `sent-${s.id}`,
      itemKind: 'sentence' as ItemKind,
      itemId: s.id,
      label: s.en,
      prompt: 'Translate into Georgian',
      subtitle: s.en,
      answer: s.ka,
      audioText: s.ka,
    }));
}

export function buildDictationSession(count = 10): SessionQuestion[] {
  const words = shuffle(WORDS).slice(0, Math.ceil(count / 2));
  const sentences = shuffle(SENTENCES).slice(0, Math.floor(count / 2));
  const fromWords: SessionQuestion[] = words.map((w) => ({
    key: `dict-w-${w.id}`,
    itemKind: 'word',
    itemId: w.id,
    label: w.en,
    prompt: 'Dictation',
    answer: w.ka,
    audioText: w.ka,
  }));
  const fromSentences: SessionQuestion[] = sentences.map((s) => ({
    key: `dict-s-${s.id}`,
    itemKind: 'sentence',
    itemId: s.id,
    label: s.en,
    prompt: 'Dictation',
    answer: s.ka,
    audioText: s.ka,
  }));
  return shuffle([...fromWords, ...fromSentences]);
}

/** Turns the SRS due-queue into a mixed writing session. */
export function buildReviewSession(
  progress: UserProgress,
  limit = 15,
): SessionQuestion[] {
  return getReviewQueue(progress, limit)
    .map((item): SessionQuestion | null => {
      if (item.itemKind === 'letter') {
        const L = ALPHABET_BY_ID[item.itemId];
        if (!L) return null;
        return {
          key: `rev-${item.id}`,
          itemKind: 'letter',
          itemId: L.id,
          label: `${L.name} · ${L.translit}`,
          prompt: 'Review · type this letter',
          subtitle: `${L.glyph}  —  ${L.translit}`,
          answer: L.glyph,
          audioText: L.glyph,
        };
      }
      if (item.itemKind === 'word') {
        const w = WORDS_BY_ID[item.itemId];
        if (!w) return null;
        return {
          key: `rev-${item.id}`,
          itemKind: 'word',
          itemId: w.id,
          label: w.en,
          prompt: 'Review · write the Georgian for',
          subtitle: w.en,
          answer: w.ka,
          audioText: w.ka,
        };
      }
      const s = SENTENCES_BY_ID[item.itemId];
      if (!s) return null;
      return {
        key: `rev-${item.id}`,
        itemKind: 'sentence',
        itemId: s.id,
        label: s.en,
        prompt: 'Review · translate into Georgian',
        subtitle: s.en,
        answer: s.ka,
        audioText: s.ka,
      };
    })
    .filter((q): q is SessionQuestion => q !== null);
}
