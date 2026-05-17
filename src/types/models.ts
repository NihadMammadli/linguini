/* ============================================================
   Core domain models — single source of truth.
   Scalable shapes for a writing-first Georgian curriculum.
   ============================================================ */

export type ExerciseKind =
  | 'letter-type' // see a letter, type it
  | 'letter-listen' // hear a letter, type it
  | 'letter-confusion' // disambiguate a confusion pair by typing
  | 'word-recall' // English prompt -> type Georgian word
  | 'sentence-build' // English sentence -> type Georgian sentence
  | 'dictation'; // hear Georgian -> type it

export type ItemKind = 'letter' | 'word' | 'sentence';

export type Difficulty = 'intro' | 'core' | 'advanced';

/** A Georgian letter with what a learner needs to produce & confuse it. */
export interface AlphabetLetter {
  id: string; // stable id, e.g. "kar"
  glyph: string; // ვ
  name: string; // "vin"
  translit: string; // "v"
  ipa: string; // "/v/"
  order: number; // teaching order
  group: Difficulty;
  confusableWith: string[]; // ids of visually/aurally similar letters
  exampleWord?: { ka: string; en: string };
}

export interface Word {
  id: string;
  ka: string; // წყალი
  en: string; // "water"
  translit: string; // "ts'q'ali"
  category: string; // "nature"
  group: Difficulty;
  hint?: string;
}

export interface SentenceToken {
  ka: string;
  gloss: string; // word-level English gloss
}

export interface Sentence {
  id: string;
  ka: string; // full Georgian sentence
  en: string; // English prompt
  translit: string;
  tokens: SentenceToken[]; // breakdown for the correction view
  structureNote: string; // short canned grammar explanation
  group: Difficulty;
}

export interface Exercise {
  id: string;
  kind: ExerciseKind;
  itemKind: ItemKind;
  itemId: string; // -> AlphabetLetter.id | Word.id | Sentence.id
  prompt: string; // what the learner sees/hears described
  answer: string; // expected Georgian production
}

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  group: Difficulty;
  order: number;
  itemKind: ItemKind;
  itemIds: string[]; // items covered, in order
}

/* ---- Learning / memory state ---- */

export type MistakeType =
  | 'wrong-letter'
  | 'missing-letter'
  | 'extra-letter'
  | 'transliteration-slip'
  | 'empty';

export interface MistakePattern {
  type: MistakeType;
  expected: string;
  got: string;
  at: number; // timestamp
}

/** Leitner-style scheduling record for any reviewable item. */
export interface ReviewItem {
  id: string; // `${itemKind}:${itemId}`
  itemKind: ItemKind;
  itemId: string;
  box: number; // 0..4 — higher = better known
  attempts: number;
  failures: number;
  lastSeen: number;
  dueAt: number;
  mistakes: MistakePattern[];
}

export interface PracticeRecord {
  itemKind: ItemKind;
  itemId: string;
  label: string;
  at: number;
}

export interface UserProgress {
  version: number;
  username: string | null;
  createdAt: number;
  completedLessonIds: string[];
  reviewItems: Record<string, ReviewItem>;
  recentlyPracticed: PracticeRecord[];
  exercisesReviewed: number;
  streak: {
    count: number;
    lastActiveDate: string | null; // YYYY-MM-DD
    best: number;
  };
}

/* ---- Runtime helpers (not persisted) ---- */

export interface CheckResult {
  correct: boolean;
  similarity: number; // 0..1
  expected: string;
  got: string;
  hint: string;
  mistakes: MistakePattern[];
  diff: DiffChar[];
}

export interface DiffChar {
  char: string;
  status: 'ok' | 'wrong' | 'missing' | 'extra';
}
