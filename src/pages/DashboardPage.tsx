import { Link } from 'react-router-dom';
import { useProfile } from '@/hooks/useProfile';
import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/Card';
import { Reveal } from '@/components/Reveal';
import { ButtonLink } from '@/components/Button';
import {
  ProgressRing,
  StreakBadge,
} from '@/components/ProgressWidgets';
import { LESSONS } from '@/data/lessons';
import { ALPHABET, ALPHABET_BY_ID } from '@/data/alphabet';
import { WORDS_BY_ID } from '@/data/words';
import { weakItemsByKind } from '@/utils/srs';
import p from './pages.module.css';

function relTime(ts: number): string {
  const m = Math.round((Date.now() - ts) / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} h ago`;
  return `${Math.round(h / 24)} d ago`;
}

export function DashboardPage() {
  const { progress } = useProfile();

  const masteredLetters = ALPHABET.filter(
    (l) => (progress.reviewItems[`letter:${l.id}`]?.box ?? 0) >= 2,
  ).length;
  const alphabetPct = masteredLetters / ALPHABET.length;

  const nextLesson =
    LESSONS.find((l) => !progress.completedLessonIds.includes(l.id)) ??
    LESSONS[LESSONS.length - 1];

  const weakLetters = weakItemsByKind(progress, 'letter').slice(0, 8);
  const weakWords = weakItemsByKind(progress, 'word').slice(0, 6);

  return (
    <main className={`container ${p.page}`}>
      <PageHeader
        eyebrow={`Welcome back, ${progress.username ?? 'Learner'}`}
        title="Your studio"
        lead="A calm overview of what to write today and what still needs retraining."
      />

      <div className={p.dashGrid}>
        <Reveal className={p.col8}>
          <Card className={p.continueCard}>
            <span className="eyebrow">Continue learning</span>
            <h3>{nextLesson.title}</h3>
            <p>{nextLesson.subtitle}</p>
            <ButtonLink
              as="link"
              to={
                nextLesson.itemKind === 'letter'
                  ? '/alphabet'
                  : nextLesson.itemKind === 'word'
                    ? '/words'
                    : '/sentences'
              }
              variant="gold"
            >
              Resume writing
            </ButtonLink>
          </Card>
        </Reveal>

        <Reveal className={p.col4} delay={0.06}>
          <Card>
            <span className="eyebrow">Daily streak</span>
            <div style={{ marginTop: 'var(--space-4)' }}>
              <StreakBadge
                count={progress.streak.count}
                best={progress.streak.best}
              />
            </div>
          </Card>
        </Reveal>

        <Reveal className={p.col4} delay={0.1}>
          <Card>
            <div className={p.cardTitle}>
              <h3>Alphabet</h3>
              <Link to="/alphabet">Train</Link>
            </div>
            <div style={{ display: 'grid', placeItems: 'center' }}>
              <ProgressRing value={alphabetPct} caption="mastered" />
              <p className={p.muted} style={{ marginTop: 'var(--space-3)' }}>
                {masteredLetters} of {ALPHABET.length} letters
              </p>
            </div>
          </Card>
        </Reveal>

        <Reveal className={p.col4} delay={0.14}>
          <Card>
            <div className={p.cardTitle}>
              <h3>Weak letters</h3>
              <Link to="/review">Review</Link>
            </div>
            {weakLetters.length ? (
              <div className={p.tagList}>
                {weakLetters.map((it) => (
                  <span key={it.id} className={p.tag}>
                    {ALPHABET_BY_ID[it.itemId]?.glyph ?? '·'}
                  </span>
                ))}
              </div>
            ) : (
              <p className={p.muted}>No weak letters yet — keep writing.</p>
            )}
          </Card>
        </Reveal>

        <Reveal className={p.col4} delay={0.18}>
          <Card>
            <div className={p.cardTitle}>
              <h3>Weak words</h3>
              <Link to="/review">Review</Link>
            </div>
            {weakWords.length ? (
              <ul>
                {weakWords.map((it) => {
                  const w = WORDS_BY_ID[it.itemId];
                  return (
                    <li key={it.id} className={p.recentRow}>
                      <span className="geo">{w?.ka}</span>
                      <span className={p.muted}>{w?.en}</span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className={p.muted}>Nothing flagged. Strong recall so far.</p>
            )}
          </Card>
        </Reveal>

        <Reveal className={p.col8} delay={0.1}>
          <Card>
            <div className={p.cardTitle}>
              <h3>Today’s writing exercises</h3>
            </div>
            <div className={p.dashGrid} style={{ gap: 'var(--space-4)' }}>
              {[
                { to: '/words', t: 'Word recall', d: 'Reconstruct vocabulary from English.' },
                { to: '/sentences', t: 'Sentence builder', d: 'Produce full sentences from memory.' },
                { to: '/dictation', t: 'Dictation', d: 'Hear Georgian, write it down.' },
              ].map((x) => (
                <Card key={x.to} to={x.to} goldEdge className={p.col4}>
                  <h3 style={{ fontSize: '1.1rem' }}>{x.t}</h3>
                  <p className={p.muted} style={{ marginTop: 4 }}>
                    {x.d}
                  </p>
                </Card>
              ))}
            </div>
          </Card>
        </Reveal>

        <Reveal className={p.col4} delay={0.16}>
          <Card>
            <div className={p.cardTitle}>
              <h3>Recently practiced</h3>
            </div>
            {progress.recentlyPracticed.length ? (
              <ul>
                {progress.recentlyPracticed.slice(0, 6).map((r, i) => (
                  <li key={i} className={p.recentRow}>
                    <span>{r.label}</span>
                    <span className={p.muted}>{relTime(r.at)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={p.muted}>
                Your finished exercises will appear here.
              </p>
            )}
          </Card>
        </Reveal>
      </div>
    </main>
  );
}
