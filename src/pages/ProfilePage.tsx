import { useState } from 'react';
import { useProfile } from '@/hooks/useProfile';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { ALPHABET } from '@/data/alphabet';
import p from './pages.module.css';

export function ProfilePage() {
  const { progress, setUsername, resetProfile } = useProfile();
  const [name, setName] = useState(progress.username ?? '');
  const [saved, setSaved] = useState(false);

  const mastered = ALPHABET.filter(
    (l) => (progress.reviewItems[`letter:${l.id}`]?.box ?? 0) >= 2,
  ).length;
  const weak = Object.values(progress.reviewItems).filter(
    (i) => i.box <= 1 && i.failures > 0,
  ).length;

  return (
    <main className={`container ${p.page}`}>
      <PageHeader
        eyebrow="Local profile"
        title="Your account"
        lead="There is no server. Everything below lives in this browser’s localStorage."
      />

      <div className={p.profileWrap}>
        <Card>
          <span className="eyebrow">Identity</span>
          <form
            className={p.modalForm}
            style={{ marginTop: 'var(--space-4)' }}
            onSubmit={(e) => {
              e.preventDefault();
              setUsername(name || 'Learner');
              setSaved(true);
              setTimeout(() => setSaved(false), 1800);
            }}
          >
            <input
              className={p.field}
              value={name}
              maxLength={24}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
            <Button type="submit">{saved ? 'Saved ✓' : 'Save name'}</Button>
          </form>
        </Card>

        <Card>
          <span className="eyebrow">Progress</span>
          <div
            className={p.statRow}
            style={{ marginTop: 'var(--space-5)' }}
          >
            <div className={p.stat}>
              <strong>{progress.streak.count}</strong>
              <span>day streak</span>
            </div>
            <div className={p.stat}>
              <strong>{progress.exercisesReviewed}</strong>
              <span>exercises</span>
            </div>
            <div className={p.stat}>
              <strong>{progress.completedLessonIds.length}</strong>
              <span>lessons done</span>
            </div>
            <div className={p.stat}>
              <strong>{mastered}</strong>
              <span>letters mastered</span>
            </div>
            <div className={p.stat}>
              <strong>{weak}</strong>
              <span>weak items</span>
            </div>
          </div>
        </Card>

        <Card>
          <span className="eyebrow">Danger zone</span>
          <p
            className={p.muted}
            style={{ margin: 'var(--space-3) 0 var(--space-4)' }}
          >
            This permanently clears your name, streak, and all recorded
            mistakes.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              if (
                window.confirm(
                  'Reset all local progress? This cannot be undone.',
                )
              )
                resetProfile();
            }}
          >
            <span className={p.danger}>Reset all progress</span>
          </Button>
        </Card>
      </div>
    </main>
  );
}
