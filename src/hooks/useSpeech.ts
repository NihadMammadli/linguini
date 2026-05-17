import { useCallback, useEffect, useState } from 'react';
import { cancelSpeech, speak, speechSupported } from '@/utils/speech';

/** React access to the speech wrapper, with speaking state + support flag. */
export function useSpeech() {
  const [speaking, setSpeaking] = useState(false);
  const supported = speechSupported();

  useEffect(() => {
    // Warm up voice list (some browsers populate it lazily).
    if (supported) window.speechSynthesis.getVoices();
    return () => cancelSpeech();
  }, [supported]);

  const say = useCallback(
    (text: string, rate?: number) => {
      if (!supported) return;
      setSpeaking(true);
      speak(text, { rate, onEnd: () => setSpeaking(false) });
    },
    [supported],
  );

  const stop = useCallback(() => {
    cancelSpeech();
    setSpeaking(false);
  }, []);

  return { say, stop, speaking, supported };
}
