import type { AlphabetLetter } from '@/types/models';

/** Modern Mkhedruli — 33 letters, in traditional teaching order. */
export const ALPHABET: AlphabetLetter[] = [
  { id: 'an', glyph: 'ა', name: 'an', translit: 'a', ipa: '/ɑ/', order: 1, group: 'intro', confusableWith: ['ban'], exampleWord: { ka: 'არა', en: 'no' } },
  { id: 'ban', glyph: 'ბ', name: 'ban', translit: 'b', ipa: '/b/', order: 2, group: 'intro', confusableWith: ['an', 'don'], exampleWord: { ka: 'ბავშვი', en: 'child' } },
  { id: 'gan', glyph: 'გ', name: 'gan', translit: 'g', ipa: '/ɡ/', order: 3, group: 'intro', confusableWith: ['don'], exampleWord: { ka: 'გული', en: 'heart' } },
  { id: 'don', glyph: 'დ', name: 'don', translit: 'd', ipa: '/d/', order: 4, group: 'intro', confusableWith: ['on', 'gan', 'ban'], exampleWord: { ka: 'დედა', en: 'mother' } },
  { id: 'en', glyph: 'ე', name: 'en', translit: 'e', ipa: '/ɛ/', order: 5, group: 'intro', confusableWith: ['in'], exampleWord: { ka: 'ერთი', en: 'one' } },
  { id: 'vin', glyph: 'ვ', name: 'vin', translit: 'v', ipa: '/v/', order: 6, group: 'intro', confusableWith: ['kan'], exampleWord: { ka: 'ვაშლი', en: 'apple' } },
  { id: 'zen', glyph: 'ზ', name: 'zen', translit: 'z', ipa: '/z/', order: 7, group: 'intro', confusableWith: ['zhan'], exampleWord: { ka: 'ზამთარი', en: 'winter' } },
  { id: 'tan', glyph: 'თ', name: 'tan', translit: 't', ipa: '/tʰ/', order: 8, group: 'intro', confusableWith: ['tar'], exampleWord: { ka: 'თვალი', en: 'eye' } },
  { id: 'in', glyph: 'ი', name: 'in', translit: 'i', ipa: '/i/', order: 9, group: 'intro', confusableWith: ['en'], exampleWord: { ka: 'იქ', en: 'there' } },
  { id: 'kar', glyph: 'კ', name: "k'an", translit: "k'", ipa: '/kʼ/', order: 10, group: 'core', confusableWith: ['par', 'kan', 'vin'], exampleWord: { ka: 'კაცი', en: 'man' } },
  { id: 'las', glyph: 'ლ', name: 'las', translit: 'l', ipa: '/l/', order: 11, group: 'core', confusableWith: ['man'], exampleWord: { ka: 'ლომი', en: 'lion' } },
  { id: 'man', glyph: 'მ', name: 'man', translit: 'm', ipa: '/m/', order: 12, group: 'core', confusableWith: ['nar', 'las'], exampleWord: { ka: 'მზე', en: 'sun' } },
  { id: 'nar', glyph: 'ნ', name: 'nar', translit: 'n', ipa: '/n/', order: 13, group: 'core', confusableWith: ['man'], exampleWord: { ka: 'ნავი', en: 'boat' } },
  { id: 'on', glyph: 'ო', name: 'on', translit: 'o', ipa: '/ɔ/', order: 14, group: 'core', confusableWith: ['don'], exampleWord: { ka: 'ოთახი', en: 'room' } },
  { id: 'par', glyph: 'პ', name: "p'ar", translit: "p'", ipa: '/pʼ/', order: 15, group: 'core', confusableWith: ['kar', 'hae'], exampleWord: { ka: 'პური', en: 'bread' } },
  { id: 'zhan', glyph: 'ჟ', name: 'zhan', translit: 'zh', ipa: '/ʒ/', order: 16, group: 'core', confusableWith: ['zen'], exampleWord: { ka: 'ჟანგი', en: 'rust' } },
  { id: 'rae', glyph: 'რ', name: 'rae', translit: 'r', ipa: '/r/', order: 17, group: 'core', confusableWith: [], exampleWord: { ka: 'რძე', en: 'milk' } },
  { id: 'san', glyph: 'ს', name: 'san', translit: 's', ipa: '/s/', order: 18, group: 'core', confusableWith: [], exampleWord: { ka: 'სახლი', en: 'house' } },
  { id: 'tar', glyph: 'ტ', name: "t'ar", translit: "t'", ipa: '/tʼ/', order: 19, group: 'core', confusableWith: ['tan'], exampleWord: { ka: 'ტყე', en: 'forest' } },
  { id: 'un', glyph: 'უ', name: 'un', translit: 'u', ipa: '/u/', order: 20, group: 'core', confusableWith: [], exampleWord: { ka: 'უღელი', en: 'yoke' } },
  { id: 'par2', glyph: 'ფ', name: 'par', translit: 'p', ipa: '/pʰ/', order: 21, group: 'advanced', confusableWith: ['kan'], exampleWord: { ka: 'ფული', en: 'money' } },
  { id: 'kan', glyph: 'ქ', name: 'kan', translit: 'k', ipa: '/kʰ/', order: 22, group: 'advanced', confusableWith: ['kar', 'par2', 'vin'], exampleWord: { ka: 'ქალი', en: 'woman' } },
  { id: 'ghan', glyph: 'ღ', name: 'ghan', translit: 'gh', ipa: '/ɣ/', order: 23, group: 'advanced', confusableWith: ['qar'], exampleWord: { ka: 'ღამე', en: 'night' } },
  { id: 'qar', glyph: 'ყ', name: "q'ar", translit: "q'", ipa: '/qʼ/', order: 24, group: 'advanced', confusableWith: ['ghan'], exampleWord: { ka: 'ყავა', en: 'coffee' } },
  { id: 'shin', glyph: 'შ', name: 'shin', translit: 'sh', ipa: '/ʃ/', order: 25, group: 'advanced', confusableWith: ['chin', 'tsil'], exampleWord: { ka: 'შვილი', en: 'child' } },
  { id: 'chin', glyph: 'ჩ', name: 'chin', translit: 'ch', ipa: '/t͡ʃʰ/', order: 26, group: 'advanced', confusableWith: ['shin', 'char'], exampleWord: { ka: 'ჩაი', en: 'tea' } },
  { id: 'tsan', glyph: 'ც', name: 'tsan', translit: 'ts', ipa: '/t͡sʰ/', order: 27, group: 'advanced', confusableWith: ['dzil', 'tsil'], exampleWord: { ka: 'ცა', en: 'sky' } },
  { id: 'dzil', glyph: 'ძ', name: 'dzil', translit: 'dz', ipa: '/d͡z/', order: 28, group: 'advanced', confusableWith: ['tsan'], exampleWord: { ka: 'ძაღლი', en: 'dog' } },
  { id: 'tsil', glyph: 'წ', name: "ts'il", translit: "ts'", ipa: '/t͡sʼ/', order: 29, group: 'advanced', confusableWith: ['char', 'tsan', 'shin'], exampleWord: { ka: 'წყალი', en: 'water' } },
  { id: 'char', glyph: 'ჭ', name: "ch'ar", translit: "ch'", ipa: '/t͡ʃʼ/', order: 30, group: 'advanced', confusableWith: ['tsil', 'chin'], exampleWord: { ka: 'ჭკუა', en: 'wit' } },
  { id: 'khan', glyph: 'ხ', name: 'khan', translit: 'kh', ipa: '/x/', order: 31, group: 'advanced', confusableWith: [], exampleWord: { ka: 'ხელი', en: 'hand' } },
  { id: 'jan', glyph: 'ჯ', name: 'jan', translit: 'j', ipa: '/d͡ʒ/', order: 32, group: 'advanced', confusableWith: ['chin'], exampleWord: { ka: 'ჯარი', en: 'army' } },
  { id: 'hae', glyph: 'ჰ', name: 'hae', translit: 'h', ipa: '/h/', order: 33, group: 'advanced', confusableWith: ['par'], exampleWord: { ka: 'ჰაერი', en: 'air' } },
];

export const ALPHABET_BY_ID: Record<string, AlphabetLetter> = Object.fromEntries(
  ALPHABET.map((l) => [l.id, l]),
);

export const CONFUSION_PAIRS: Array<[string, string]> = [
  ['en', 'in'],
  ['kar', 'par'],
  ['kan', 'kar'],
  ['man', 'nar'],
  ['tan', 'tar'],
  ['tsan', 'dzil'],
  ['tsil', 'char'],
  ['shin', 'chin'],
  ['ghan', 'qar'],
];
