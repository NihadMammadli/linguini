import { useMemo, useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { ExerciseRunner } from '@/components/ExerciseRunner';
import { buildAlphabetSession, type AlphabetMode } from '@/features/builders';
import p from './pages.module.css';

const MODES: { id: AlphabetMode; label: string }[] = [
  { id: 'type', label: 'See & type' },
  { id: 'listen', label: 'Type what you hear' },
  { id: 'confusion', label: 'Confusion pairs' },
];

const GROUPS = [
  { id: 'all', label: 'All letters' },
  { id: 'intro', label: 'Foundations' },
  { id: 'core', label: 'Core' },
  { id: 'advanced', label: 'Advanced' },
] as const;

type Group = (typeof GROUPS)[number]['id'];

export function AlphabetTrainerPage() {
  const [mode, setMode] = useState<AlphabetMode>('type');
  const [group, setGroup] = useState<Group>('all');
  const [sessionId, setSessionId] = useState(0);

  const questions = useMemo(
    () => buildAlphabetSession(mode, group, 12),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode, group, sessionId],
  );

  return (
    <main className={`container ${p.page}`}>
      <PageHeader
        eyebrow="Alphabet trainer"
        title="Mkhedruli, by hand"
        lead="Reproduce every letter from sight and from sound. Mistakes are stored as weak letters and resurface in review."
      />

      <div className={p.modes}>
        {MODES.map((m) => (
          <button
            key={m.id}
            className={`${p.chip} ${mode === m.id ? p.chipOn : ''}`}
            onClick={() => {
              setMode(m.id);
              setSessionId((s) => s + 1);
            }}
          >
            {m.label}
          </button>
        ))}
      </div>

      {mode !== 'confusion' && (
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
      )}

      <ExerciseRunner
        key={`${mode}-${group}-${sessionId}`}
        questions={questions}
        mode={mode === 'listen' ? 'listen' : 'see'}
      />
    </main>
  );
}
