/**
 * Thin wrapper over the Web Speech API. Speaks Georgian text with lang="ka-GE".
 * Designed as a swap point: a future real-audio player can implement the same
 * `speak()` signature without touching call sites.
 */

export function speechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

function pickVoice(): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((v) => v.lang?.toLowerCase().startsWith('ka')) ??
    voices.find((v) => /georgian/i.test(v.name)) ??
    undefined
  );
}

export interface SpeakOptions {
  rate?: number;
  onEnd?: () => void;
}

export function speak(text: string, opts: SpeakOptions = {}): boolean {
  if (!speechSupported() || !text.trim()) {
    opts.onEnd?.();
    return false;
  }
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'ka-GE';
  u.rate = opts.rate ?? 0.85;
  const voice = pickVoice();
  if (voice) u.voice = voice;
  if (opts.onEnd) u.onend = () => opts.onEnd?.();
  window.speechSynthesis.speak(u);
  return true;
}

export function cancelSpeech(): void {
  if (speechSupported()) window.speechSynthesis.cancel();
}
