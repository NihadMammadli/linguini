import type { Lesson } from '@/types/models';
import { ALPHABET } from './alphabet';
import { WORDS } from './words';
import { SENTENCES } from './sentences';

const lettersByGroup = (g: string) =>
  ALPHABET.filter((l) => l.group === g)
    .sort((a, b) => a.order - b.order)
    .map((l) => l.id);

const wordsByGroup = (g: string) =>
  WORDS.filter((w) => w.group === g).map((w) => w.id);

const sentencesByGroup = (g: string) =>
  SENTENCES.filter((s) => s.group === g).map((s) => s.id);

/** Ordered curriculum — drives "Continue Learning". */
export const LESSONS: Lesson[] = [
  {
    id: 'l-alphabet-1',
    slug: 'alphabet-foundations',
    title: 'Alphabet · Foundations',
    subtitle: 'The first ten letters by hand and ear.',
    group: 'intro',
    order: 1,
    itemKind: 'letter',
    itemIds: lettersByGroup('intro'),
  },
  {
    id: 'l-words-1',
    slug: 'first-words',
    title: 'First Words',
    subtitle: 'Recall everyday vocabulary from English prompts.',
    group: 'intro',
    order: 2,
    itemKind: 'word',
    itemIds: wordsByGroup('intro'),
  },
  {
    id: 'l-sentences-1',
    slug: 'opening-phrases',
    title: 'Opening Phrases',
    subtitle: 'Produce short, high-frequency sentences.',
    group: 'intro',
    order: 3,
    itemKind: 'sentence',
    itemIds: sentencesByGroup('intro'),
  },
  {
    id: 'l-alphabet-2',
    slug: 'alphabet-core',
    title: 'Alphabet · Core',
    subtitle: 'Ejectives and the trickier middle letters.',
    group: 'core',
    order: 4,
    itemKind: 'letter',
    itemIds: lettersByGroup('core'),
  },
  {
    id: 'l-words-2',
    slug: 'living-vocabulary',
    title: 'Living Vocabulary',
    subtitle: 'Food, home, and the natural world.',
    group: 'core',
    order: 5,
    itemKind: 'word',
    itemIds: wordsByGroup('core'),
  },
  {
    id: 'l-sentences-2',
    slug: 'everyday-sentences',
    title: 'Everyday Sentences',
    subtitle: 'Build sentences with real verb agreement.',
    group: 'core',
    order: 6,
    itemKind: 'sentence',
    itemIds: sentencesByGroup('core'),
  },
  {
    id: 'l-alphabet-3',
    slug: 'alphabet-mastery',
    title: 'Alphabet · Mastery',
    subtitle: 'The full set, including confusion pairs.',
    group: 'advanced',
    order: 7,
    itemKind: 'letter',
    itemIds: lettersByGroup('advanced'),
  },
  {
    id: 'l-words-3',
    slug: 'expressive-vocabulary',
    title: 'Expressive Vocabulary',
    subtitle: 'Abstract and idiomatic words.',
    group: 'advanced',
    order: 8,
    itemKind: 'word',
    itemIds: wordsByGroup('advanced'),
  },
  {
    id: 'l-sentences-3',
    slug: 'fluent-sentences',
    title: 'Fluent Sentences',
    subtitle: 'Multi-agreement verbs and idiom.',
    group: 'advanced',
    order: 9,
    itemKind: 'sentence',
    itemIds: sentencesByGroup('advanced'),
  },
];

export const LESSONS_BY_ID: Record<string, Lesson> = Object.fromEntries(
  LESSONS.map((l) => [l.id, l]),
);
