import { useCallback, useMemo, useState } from 'react';
import type { CheckResult, ItemKind } from '@/types/models';
import { checkAnswer } from '@/utils/scoring';
import { useProfile } from './useProfile';

export interface SessionQuestion {
  key: string;
  itemKind: ItemKind;
  itemId: string;
  label: string; // human label for "recently practiced"
  prompt: string; // what to show the learner
  answer: string; // expected Georgian production
  audioText?: string; // text to speak (dictation / listen drills)
  subtitle?: string; // optional secondary prompt line
}

export interface SessionState {
  total: number;
  index: number;
  current: SessionQuestion | null;
  result: CheckResult | null;
  correctCount: number;
  finished: boolean;
  submit: (value: string) => CheckResult;
  next: () => void;
  restart: () => void;
}

/** Drives any writing exercise: submit → grade → record → advance. */
export function useExerciseSession(
  questions: SessionQuestion[],
): SessionState {
  const { recordResult } = useProfile();
  const [index, setIndex] = useState(0);
  const [result, setResult] = useState<CheckResult | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [graded, setGraded] = useState(false);

  const total = questions.length;
  const current = index < total ? questions[index] : null;
  const finished = total > 0 && index >= total;

  const submit = useCallback(
    (value: string): CheckResult => {
      const q = questions[index];
      const res = checkAnswer(q.answer, value);
      setResult(res);
      if (!graded) {
        setGraded(true);
        if (res.correct) setCorrectCount((c) => c + 1);
        recordResult(q.itemKind, q.itemId, q.label, res);
      }
      return res;
    },
    [questions, index, graded, recordResult],
  );

  const next = useCallback(() => {
    setResult(null);
    setGraded(false);
    setIndex((i) => i + 1);
  }, []);

  const restart = useCallback(() => {
    setResult(null);
    setGraded(false);
    setCorrectCount(0);
    setIndex(0);
  }, []);

  return useMemo(
    () => ({
      total,
      index,
      current,
      result,
      correctCount,
      finished,
      submit,
      next,
      restart,
    }),
    [total, index, current, result, correctCount, finished, submit, next, restart],
  );
}
