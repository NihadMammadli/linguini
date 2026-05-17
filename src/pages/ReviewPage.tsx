import { useMemo, useState } from 'react';
import { useProfile } from '@/hooks/useProfile';
import { PageHeader } from '@/components/PageHeader';
import { ExerciseRunner } from '@/components/ExerciseRunner';
import { Card } from '@/components/Card';
import { buildReviewSession } from '@/features/builders';
import { getReviewQueue } from '@/utils/srs';
import p from './pages.module.css';

export function ReviewPage() {
  const { progress } = useProfile();
  const [run, setRun] = useState(0);

  // Snapshot the queue when a run starts so it stays stable mid-session.
  const questions = useMemo(
    () => buildReviewSession(progress, 15),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [run],
  );
  const dueCount = getReviewQueue(progress, 99).length;

  return (
    <main className={`container ${p.page}`}>
      <PageHeader
        eyebrow="Spaced repetition"
        title="Retrain your weak spots"
        lead="A Leitner queue gathers every letter, word, and sentence you have gotten wrong and brings it back on schedule."
        aside={
          <button className={p.chip} onClick={() => setRun((r) => r + 1)}>
            {run === 0 ? 'Start review' : 'Refresh queue'}
          </button>
        }
      />

      {run === 0 ? (
        <Card goldEdge style={{ maxWidth: 560, margin: '0 auto' }}>
          <span className="eyebrow">Queue status</span>
          <h3 style={{ fontSize: 'var(--fs-h3)', margin: 'var(--space-3) 0' }}>
            {dueCount > 0
              ? `${dueCount} item${dueCount === 1 ? '' : 's'} due for review`
              : 'Nothing due right now'}
          </h3>
          <p className={p.muted}>
            {dueCount > 0
              ? 'These are drawn only from items you have missed. Press “Start review” to write them again.'
              : 'Practise in any mode — missed items will collect here and resurface on a spaced schedule.'}
          </p>
        </Card>
      ) : (
        <ExerciseRunner
          key={run}
          questions={questions}
          emptyMessage="No items are due for review. Go make some mistakes — then come back."
        />
      )}
    </main>
  );
}
