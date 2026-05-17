import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  useExerciseSession,
  type SessionQuestion,
} from '@/hooks/useExerciseSession';
import type { CheckResult } from '@/types/models';
import { TypingInput, type TypingInputHandle } from './TypingInput';
import { ResultFeedback } from './ResultFeedback';
import { AudioButton } from './AudioButton';
import { Button } from './Button';
import { ProgressBar } from './ProgressWidgets';
import styles from './ExerciseRunner.module.css';

interface ExerciseRunnerProps {
  questions: SessionQuestion[];
  /** 'see' shows the prompt text; 'listen' hides it behind audio. */
  mode?: 'see' | 'listen';
  multiline?: boolean;
  emptyMessage?: string;
  onDone?: () => void;
  renderExtra?: (q: SessionQuestion, r: CheckResult) => ReactNode;
}

export function ExerciseRunner({
  questions,
  mode = 'see',
  multiline = false,
  emptyMessage = 'Nothing to practise here yet.',
  onDone,
  renderExtra,
}: ExerciseRunnerProps) {
  const session = useExerciseSession(questions);
  const [value, setValue] = useState('');
  const inputRef = useRef<TypingInputHandle>(null);
  const { current, result, finished, total, index, correctCount } = session;

  useEffect(() => {
    setValue('');
    inputRef.current?.focus();
  }, [index]);

  useEffect(() => {
    if (finished) onDone?.();
  }, [finished, onDone]);

  if (total === 0) {
    return <div className={styles.empty}>{emptyMessage}</div>;
  }

  if (finished) {
    const pct = Math.round((correctCount / total) * 100);
    return (
      <div className={styles.done}>
        <span className="eyebrow">Session complete</span>
        <h2 className={styles.score}>
          {correctCount} / {total}
        </h2>
        <p className={styles.scoreNote}>
          {pct >= 80
            ? 'Strong recall. The hard items will return on schedule.'
            : 'Every miss has been queued for review — that is the point.'}
        </p>
        <Button onClick={session.restart}>Practise again</Button>
      </div>
    );
  }

  const q = current!;
  const submitted = result !== null;
  const state = submitted
    ? result!.correct
      ? 'correct'
      : 'wrong'
    : 'idle';

  const handlePrimary = () => {
    if (!submitted) {
      if (!value.trim()) return;
      session.submit(value);
    } else {
      session.next();
    }
  };

  return (
    <div className={styles.runner}>
      <div className={styles.meta}>
        <ProgressBar
          value={index / total}
          label={`Question ${index + 1} of ${total}`}
        />
      </div>

      <div className={styles.promptCard}>
        {mode === 'listen' ? (
          <div className={styles.listen}>
            <span className="eyebrow">Type what you hear</span>
            <AudioButton
              text={q.audioText ?? q.answer}
              label="Play again"
              big
            />
          </div>
        ) : (
          <>
            <span className="eyebrow">{q.prompt}</span>
            <p className={styles.promptMain}>{q.subtitle ?? q.label}</p>
            {q.audioText && (
              <div className={styles.audioRow}>
                <AudioButton text={q.audioText} label="Hear it" />
              </div>
            )}
          </>
        )}
      </div>

      <TypingInput
        ref={inputRef}
        value={value}
        onChange={setValue}
        onSubmit={handlePrimary}
        disabled={submitted}
        multiline={multiline}
        state={state}
      />

      {submitted && (
        <>
          <ResultFeedback result={result!} />
          {renderExtra?.(q, result!)}
        </>
      )}

      <div className={styles.controls}>
        <Button
          onClick={handlePrimary}
          disabled={!submitted && !value.trim()}
          size="lg"
        >
          {!submitted
            ? 'Check'
            : index + 1 < total
              ? 'Next'
              : 'Finish session'}
        </Button>
        {!submitted && (
          <Button variant="ghost" onClick={() => session.submit(value)}>
            Skip / reveal
          </Button>
        )}
      </div>
    </div>
  );
}
