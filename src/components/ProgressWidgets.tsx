import styles from './ProgressWidgets.module.css';

export function ProgressBar({
  value,
  label,
}: {
  value: number; // 0..1
  label?: string;
}) {
  const pct = Math.round(Math.min(1, Math.max(0, value)) * 100);
  return (
    <div className={styles.barWrap}>
      {label && (
        <div className={styles.barLabel}>
          <span>{label}</span>
          <span>{pct}%</span>
        </div>
      )}
      <div
        className={styles.barTrack}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className={styles.barFill} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function ProgressRing({
  value,
  size = 96,
  caption,
}: {
  value: number;
  size?: number;
  caption?: string;
}) {
  const pct = Math.min(1, Math.max(0, value));
  const stroke = 8;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className={styles.ring} style={{ width: size }}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--c-line)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--c-gold)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset var(--dur) var(--ease)' }}
        />
      </svg>
      <div className={styles.ringText}>
        <strong>{Math.round(pct * 100)}%</strong>
        {caption && <span>{caption}</span>}
      </div>
    </div>
  );
}

export function StreakBadge({
  count,
  best,
}: {
  count: number;
  best: number;
}) {
  return (
    <div className={styles.streak}>
      <span className={styles.streakNum}>{count}</span>
      <span className={styles.streakUnit}>
        day{count === 1 ? '' : 's'} in a row
      </span>
      <span className={styles.streakBest}>best · {best}</span>
    </div>
  );
}
