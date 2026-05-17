import { useMemo, useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { ExerciseRunner } from '@/components/ExerciseRunner';
import { useSpeech } from '@/hooks/useSpeech';
import { buildDictationSession } from '@/features/builders';
import p from './pages.module.css';

export function DictationPage() {
  const { supported } = useSpeech();
  const [sessionId, setSessionId] = useState(0);
  const questions = useMemo(
    () => buildDictationSession(10),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sessionId],
  );

  return (
    <main className={`container ${p.page}`}>
      <PageHeader
        eyebrow="Dictation"
        title="Write what you hear"
        lead="The prompt is hidden — only sound. Replay as needed, then reconstruct the spelling from memory."
        aside={
          <button
            className={p.chip}
            onClick={() => setSessionId((s) => s + 1)}
          >
            New session
          </button>
        }
      />
      {!supported && (
        <p className={p.muted} style={{ marginBottom: 'var(--space-5)' }}>
          Speech synthesis is unavailable in this browser, so audio plays as a
          placeholder. The answer is still revealed after each attempt.
        </p>
      )}
      <ExerciseRunner
        key={sessionId}
        questions={questions}
        mode="listen"
      />
    </main>
  );
}
