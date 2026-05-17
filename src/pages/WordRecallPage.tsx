import { useMemo, useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { ExerciseRunner } from '@/components/ExerciseRunner';
import { buildWordSession } from '@/features/builders';
import p from './pages.module.css';

const GROUPS = [
  { id: 'all', label: 'Mixed' },
  { id: 'intro', label: 'First words' },
  { id: 'core', label: 'Everyday' },
  { id: 'advanced', label: 'Expressive' },
] as const;

type Group = (typeof GROUPS)[number]['id'];

export function WordRecallPage() {
  const [group, setGroup] = useState<Group>('all');
  const [sessionId, setSessionId] = useState(0);

  const questions = useMemo(
    () => buildWordSession(group, 12),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [group, sessionId],
  );

  return (
    <main className={`container ${p.page}`}>
      <PageHeader
        eyebrow="Word recall"
        title="Reconstruct the word"
        lead="You see English. Produce the Georgian from memory — no options, no guessing. Near-misses are accepted with a note."
      />
      <div className={p.modes}>
        {GROUPS.map((g) => (
          <button
            key={g.id}
            className={`${p.chip} ${group === g.id ? p.chipOn : ''}`}
            onClick={() => {
              setGroup(g.id);
              setSessionId((s) => s + 1);
            }}
          >
            {g.label}
          </button>
        ))}
      </div>
      <ExerciseRunner key={`${group}-${sessionId}`} questions={questions} />
    </main>
  );
}
