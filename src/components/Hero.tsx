import { useEffect, useState, type CSSProperties } from 'react';
import { ButtonLink } from './Button';
import styles from './Hero.module.css';

const GLYPHS = ['ა', 'ბ', 'გ', 'დ', 'ე', 'ვ', 'ზ', 'თ', 'ი', 'კ', 'ლ', 'მ'];

/**
 * Fullscreen editorial hero. The "image" is a navy treatment with a faint
 * Georgian-glyph field; a blur-to-sharp wrapper is ready for a real photo
 * (drop a URL into `--hero-image`) without code changes.
 */
export function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className={styles.hero}>
      <div
        className={`${styles.bg} ${loaded ? styles.bgSharp : ''}`}
        aria-hidden
      >
        <div className={styles.glyphField}>
          {GLYPHS.map((g, i) => (
            <span key={i} style={{ '--i': i } as CSSProperties}>
              {g}
            </span>
          ))}
        </div>
      </div>
      <div className={styles.overlay} aria-hidden />

      <div className={`container ${styles.content}`}>
        <span className={`eyebrow ${styles.eyebrow} ${styles.s0}`}>
          The Georgian writing studio
        </span>
        <h1 className={`${styles.title} ${styles.s1}`}>
          Learn Georgian by Writing,
          <span className={styles.accent}> Not Guessing.</span>
        </h1>
        <p className={`${styles.sub} ${styles.s2}`}>
          An immersive Georgian learning system focused on memory, recall, and
          real language production. From your first ა to your first sentence,
          every keystroke trains your hand and your memory together.
        </p>
        <ul className={`${styles.meta} ${styles.s2}`} aria-label="Highlights">
          <li>
            <strong>33</strong> letters, mastered by hand
          </li>
          <li>
            <strong>0</strong> transliteration crutches
          </li>
          <li>
            <strong>10 min</strong> daily practice loop
          </li>
        </ul>
        <div className={`${styles.actions} ${styles.s3}`}>
          <ButtonLink as="link" to="/dashboard" variant="gold" size="lg">
            Start Learning
          </ButtonLink>
          <ButtonLink as="link" to="/#method" variant="outline" size="lg">
            Explore Method
          </ButtonLink>
        </div>
      </div>

      <a href="#method" className={styles.scrollCue} aria-label="Scroll down">
        <span />
      </a>
    </section>
  );
}
