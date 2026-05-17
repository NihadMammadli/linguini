import { useMemo, useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { ExerciseRunner } from '@/components/ExerciseRunner';
import { buildSentenceSession } from '@/features/builders';
import { SENTENCES_BY_ID } from '@/data/sentences';
import p from './pages.module.css';

const GROUPS = [
  { id: 'all', label: 'Mixed' },
  { id: 'intro', label: 'Opening phrases' },
  { id: 'core', label: 'Everyday' },
  { id: 'advanced', label: 'Fluent' },
] as const;

type Group = (typeof GROUPS)[number]['id'];

export function SentenceBuilderPage() {
  const [group, setGroup] = useState<Group>('all');
  const [sessionId, setSessionId] = useState(0);

  const questions = useMemo(
    () => buildSentenceSession(group, 8),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [group, sessionId],
  );

  return (
    <main className={`container ${p.page}`}>
      <PageHeader
        eyebrow="Sentence builder"
        title="Produce the sentence"
        lead="Translate full sentences into Georgian, then study the token breakdown and the structure behind them."
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
      <ExerciseRunner
        key={`${group}-${sessionId}`}
        questions={questions}
        multiline
        renderExtra={(q) => {
          const s = SENTENCES_BY_ID[q.itemId];
          if (!s) return null;
          return (
            <div className={p.sentenceBreakdown}>
              <span className="eyebrow">Breakdown</span>
              <div className={p.tokens}>
                {s.tokens.map((t, i) => (
                  <div key={i} className={p.token}>
                    <b>{t.ka}</b>
                    <span>{t.gloss}</span>
                  </div>
                ))}
              </div>
              <p className={p.note}>{s.structureNote}</p>
            </div>
          );
        }}
      />
    </main>
  );
}
