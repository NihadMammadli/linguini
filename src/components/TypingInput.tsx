import {
  forwardRef,
  useImperativeHandle,
  useRef,
  type KeyboardEvent,
} from 'react';
import styles from './TypingInput.module.css';

interface TypingInputProps {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  disabled?: boolean;
  multiline?: boolean;
  state?: 'idle' | 'correct' | 'wrong';
  autoFocus?: boolean;
}

export interface TypingInputHandle {
  focus: () => void;
}

/** The central writing surface. Enter submits (Shift+Enter for newline). */
export const TypingInput = forwardRef<TypingInputHandle, TypingInputProps>(
  function TypingInput(
    {
      value,
      onChange,
      onSubmit,
      placeholder = 'Type the Georgian here…',
      disabled = false,
      multiline = false,
      state = 'idle',
      autoFocus = true,
    },
    ref,
  ) {
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
    }));

    const handleKey = (
      e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      if (e.key === 'Enter' && (!multiline || !e.shiftKey)) {
        e.preventDefault();
        onSubmit();
      }
    };

    const cls = `${styles.field} ${styles[state]}`;

    return multiline ? (
      <textarea
        ref={inputRef as React.RefObject<HTMLTextAreaElement>}
        className={`${cls} ${styles.area} geo`}
        value={value}
        rows={3}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        spellCheck={false}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKey}
      />
    ) : (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        className={`${cls} geo`}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        spellCheck={false}
        autoComplete="off"
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKey}
      />
    );
  },
);
