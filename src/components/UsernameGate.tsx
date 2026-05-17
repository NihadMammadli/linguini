import { useState } from 'react';
import { useProfile } from '@/hooks/useProfile';
import { Button } from './Button';
import p from '@/pages/pages.module.css';

/** First-visit local profile prompt. No real auth — just a name. */
export function UsernameGate() {
  const { ready, hasProfile, setUsername } = useProfile();
  const [name, setName] = useState('');

  if (!ready || hasProfile) return null;

  return (
    <div className={p.backdrop} role="dialog" aria-modal="true">
      <div className={p.modal}>
        <span className="eyebrow">Welcome to Linguini</span>
        <h2>What should we call you?</h2>
        <p>
          No account, no email. Your name and progress live only in this
          browser.
        </p>
        <form
          className={p.modalForm}
          onSubmit={(e) => {
            e.preventDefault();
            setUsername(name || 'Learner');
          }}
        >
          <input
            className={p.field}
            value={name}
            autoFocus
            maxLength={24}
            placeholder="Your name"
            onChange={(e) => setName(e.target.value)}
          />
          <Button type="submit" size="lg" fullWidth>
            Enter the studio
          </Button>
        </form>
      </div>
    </div>
  );
}
