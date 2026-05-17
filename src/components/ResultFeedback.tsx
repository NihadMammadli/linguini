import type { CheckResult } from '@/types/models';
import styles from './ResultFeedback.module.css';

/** Calm, editorial feedback: verdict, highlighted diff, hint, correction. */
export function ResultFeedback({ result }: { result: CheckResult }) {
  const { correct, diff, hint, expected, got } = result;
  return (
    <div
      className={`${styles.wrap} ${correct ? styles.ok : styles.bad}`}
      role="status"
      aria-live="polite"
    >
      <div className={styles.verdict}>
        <span className={styles.mark} aria-hidden>
          {correct ? '✓' : '↺'}
        </span>
        <span>{correct ? 'Recalled correctly' : 'Not quite'}</span>
      </div>

      {!correct && got.trim() !== '' && (
        <p className={styles.diff}>
          {diff.map((d, i) => (
            <span key={i} className={styles[`d_${d.status}`]}>
              {d.char}
            </span>
          ))}
        </p>
      )}

      <p className={styles.hint}>{hint}</p>

      {!correct && (
        <p className={styles.answer}>
          Answer: <strong className="geo">{expected}</strong>
        </p>
      )}
    </div>
  );
}
