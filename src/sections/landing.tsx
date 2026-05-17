import { Section } from '@/components/Section';
import { Card } from '@/components/Card';
import { Reveal } from '@/components/Reveal';
import { ButtonLink } from '@/components/Button';
import { ALPHABET } from '@/data/alphabet';
import s from './landing.module.css';

export function WhyWriting() {
  return (
    <Section
      tone="beige"
      id="method"
      eyebrow="Why writing works"
      title="Production beats recognition."
      lead="Tapping the right tile teaches you to recognise. Writing teaches you to retrieve — and retrieval is what survives outside the app."
    >
      <div className={s.split}>
        <Reveal className={s.body} anim="left">
          <ul className={s.list}>
            <li>Every prompt forces you to reconstruct the language from memory.</li>
            <li>Typing engages spelling, sound, and meaning at once.</li>
            <li>No multiple choice — there is nothing to recognise or guess.</li>
            <li>Mistakes are captured, not hidden, so they can be retrained.</li>
          </ul>
        </Reveal>
        <Reveal anim="right">
          <div className={s.demo}>
            <span className={s.prompt}>You see</span>
            <p className={s.en}>“water”</p>
            <div className={s.demoLine}>წყალი</div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export function ActiveRecall() {
  const points = [
    {
      g: 'მ',
      h: 'Retrieve, don’t review',
      p: 'You are asked to produce the answer before you ever see it. The effort of recall is the learning.',
    },
    {
      g: 'რ',
      h: 'Desirable difficulty',
      p: 'Sessions stay just hard enough to strengthen memory without tipping into frustration.',
    },
    {
      g: 'ე',
      h: 'Error-driven',
      p: 'Wrong answers schedule themselves to return — weakness becomes the curriculum.',
    },
  ];
  return (
    <Section
      tone="surface"
      eyebrow="Active recall"
      title="The method, in three ideas."
      lead="Linguini is built on the cognitive science of retrieval practice and spaced repetition."
    >
      <div className={s.grid}>
        {points.map((p, i) => (
          <Reveal key={p.h} delay={i * 0.08}>
            <Card className={s.feature}>
              <span className={s.featureIcon}>{p.g}</span>
              <h3>{p.h}</h3>
              <p>{p.p}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function AlphabetShowcase() {
  const sample = ALPHABET.slice(0, 14);
  return (
    <Section
      tone="light"
      eyebrow="Mkhedruli"
      title="Thirty-three letters, learned by hand."
      lead="The alphabet trainer moves from sight to sound to production — you type every letter until it is yours."
    >
      <Reveal>
        <div className={s.alphabetGrid}>
          {sample.map((l) => (
            <div key={l.id} className={s.glyphTile}>
              <b>{l.glyph}</b>
              <span>{l.translit}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

export function FeaturesGrid() {
  const features = [
    { g: 'ა', h: 'Alphabet Trainer', p: 'Progressive letters, recognition, “type what you hear”, and confusion-pair drills.' },
    { g: 'წ', h: 'Word Recall', p: 'Reconstruct vocabulary from English prompts with similarity-aware feedback.' },
    { g: 'ს', h: 'Sentence Builder', p: 'Produce full sentences, then study a token breakdown and structure note.' },
    { g: 'დ', h: 'Dictation', p: 'Hear Georgian and write it — the highest-fidelity recall test.' },
    { g: 'რ', h: 'Review System', p: 'A Leitner queue resurfaces your weakest letters, words, and sentences.' },
    { g: 'მ', h: 'Local & private', p: 'Everything is stored in your browser. No accounts, no tracking.' },
  ];
  return (
    <Section
      tone="surface"
      eyebrow="The studio"
      title="Everything is a writing exercise."
    >
      <div className={s.grid}>
        {features.map((f, i) => (
          <Reveal key={f.h} delay={(i % 3) * 0.08}>
            <Card className={s.feature} goldEdge>
              <span className={s.featureIcon}>{f.g}</span>
              <h3>{f.h}</h3>
              <p>{f.p}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function DailyPractice() {
  return (
    <Section tone="beige" eyebrow="A daily habit" title="Ten quiet minutes a day.">
      <div className={s.split}>
        <Reveal className={s.body} anim="left">
          <p>
            Each day Linguini assembles a short writing session from new
            material and whatever you have been getting wrong. No streaks to
            protect, no notifications — just a calm, repeatable practice.
          </p>
          <ul className={s.list}>
            <li>Today’s writing exercises, drawn from your curriculum.</li>
            <li>A review queue that grows from your own mistakes.</li>
            <li>Progress you can see, without points or badges.</li>
          </ul>
        </Reveal>
        <Reveal anim="right">
          <div className={s.demo}>
            <span className={s.prompt}>Dictation</span>
            <p className={s.en}>You hear a word…</p>
            <div className={s.demoLine}>გ ა მ ა რ ჯ ო ბ ა</div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export function MistakeRepetition() {
  return (
    <Section
      tone="light"
      eyebrow="Error-driven learning"
      title="Your mistakes become the syllabus."
      lead="Every miss is classified — wrong letter, missing letter, a transliteration slip — and scheduled to return until it is no longer a weakness."
    >
      <div className={s.grid}>
        {[
          { h: 'Capture', p: 'Each error is recorded with its pattern and the item it belongs to.' },
          { h: 'Schedule', p: 'Failed items drop to the front of a spaced queue; mastered ones fade back.' },
          { h: 'Retrain', p: 'Review sessions are built only from what you have not yet mastered.' },
        ].map((c, i) => (
          <Reveal key={c.h} delay={i * 0.08}>
            <Card className={s.feature}>
              <h3>{c.h}</h3>
              <p>{c.p}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function FooterCTA() {
  return (
    <Section tone="navy">
      <Reveal className={s.cta}>
        <span className="eyebrow" style={{ color: 'var(--c-gold-soft)' }}>
          Begin
        </span>
        <h2>Start writing Georgian today.</h2>
        <p>
          No account, no cost, no noise. Open the studio and type your first
          letter.
        </p>
        <ButtonLink as="link" to="/dashboard" variant="gold" size="lg">
          Enter the studio
        </ButtonLink>
      </Reveal>
    </Section>
  );
}
