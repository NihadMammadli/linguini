/** Latin → Georgian map used to detect transliteration slips and offer hints. */
const LATIN_TO_KA: Record<string, string> = {
  a: 'ა', b: 'ბ', g: 'გ', d: 'დ', e: 'ე', v: 'ვ', z: 'ზ', t: 'თ',
  i: 'ი', l: 'ლ', m: 'მ', n: 'ნ', o: 'ო', r: 'რ', s: 'ს', u: 'უ',
  p: 'ფ', k: 'ქ', j: 'ჯ', h: 'ჰ',
  "k'": 'კ', "p'": 'პ', "t'": 'ტ', "q'": 'ყ', "ts'": 'წ', "ch'": 'ჭ',
  zh: 'ჟ', gh: 'ღ', sh: 'შ', ch: 'ჩ', ts: 'ც', dz: 'ძ', kh: 'ხ',
};

const KA_TO_LATIN: Record<string, string> = Object.fromEntries(
  Object.entries(LATIN_TO_KA).map(([lat, ka]) => [ka, lat]),
);

/** True if `text` is plausibly a Latin transliteration rather than Georgian script. */
export function looksLatin(text: string): boolean {
  const t = text.trim();
  if (!t) return false;
  return /[a-z]/i.test(t) && !/[Ⴀ-ჿ]/.test(t);
}

/** Best-effort Latin → Georgian conversion (digraph-aware). */
export function latinToGeorgian(input: string): string {
  const s = input.toLowerCase();
  let out = '';
  let i = 0;
  while (i < s.length) {
    const three = s.slice(i, i + 3);
    const two = s.slice(i, i + 2);
    const one = s[i];
    if (LATIN_TO_KA[three]) {
      out += LATIN_TO_KA[three];
      i += 3;
    } else if (LATIN_TO_KA[two]) {
      out += LATIN_TO_KA[two];
      i += 2;
    } else if (LATIN_TO_KA[one]) {
      out += LATIN_TO_KA[one];
      i += 1;
    } else {
      out += one;
      i += 1;
    }
  }
  return out;
}

export function georgianToLatin(input: string): string {
  return [...input].map((ch) => KA_TO_LATIN[ch] ?? ch).join('');
}
