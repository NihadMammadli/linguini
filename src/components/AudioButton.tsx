import { useSpeech } from '@/hooks/useSpeech';
import styles from './AudioButton.module.css';

interface AudioButtonProps {
  text: string;
  label?: string;
  rate?: number;
  big?: boolean;
}

/** Speaks Georgian text via the speech wrapper; degrades to a notice. */
export function AudioButton({
  text,
  label = 'Play audio',
  rate,
  big = false,
}: AudioButtonProps) {
  const { say, speaking, supported } = useSpeech();

  if (!supported) {
    return (
      <span className={styles.fallback} title="Speech not available in this browser">
        ♪ audio placeholder
      </span>
    );
  }

  return (
    <button
      type="button"
      className={`${styles.btn} ${big ? styles.big : ''} ${
        speaking ? styles.on : ''
      }`}
      onClick={() => say(text, rate)}
      aria-label={label}
    >
      <span className={styles.icon} aria-hidden>
        {speaking ? '❚❚' : '►'}
      </span>
      <span>{speaking ? 'Playing…' : label}</span>
    </button>
  );
}
