import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useProfile } from '@/hooks/useProfile';
import styles from './Navbar.module.css';

const LINKS = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/alphabet', label: 'Alphabet' },
  { to: '/words', label: 'Words' },
  { to: '/sentences', label: 'Sentences' },
  { to: '/dictation', label: 'Dictation' },
  { to: '/review', label: 'Review' },
];

export function Navbar() {
  const { hasProfile, progress } = useProfile();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`${styles.bar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.brand} onClick={() => setOpen(false)}>
          Linguini<span className={styles.dot}>.</span>
        </Link>

        <button
          className={styles.burger}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`${styles.nav} ${open ? styles.navOpen : ''}`}>
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ''}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/profile"
            className={styles.profile}
            onClick={() => setOpen(false)}
          >
            {hasProfile ? progress.username : 'Sign in'}
          </Link>
        </nav>
      </div>
    </header>
  );
}
