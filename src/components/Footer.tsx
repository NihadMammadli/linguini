import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div>
          <p className={styles.brand}>
            Linguini<span className={styles.dot}>.</span>
          </p>
          <p className={styles.tag}>
            A writing-first studio for the Georgian language.
          </p>
        </div>
        <nav className={styles.links}>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/alphabet">Alphabet</Link>
          <Link to="/words">Words</Link>
          <Link to="/sentences">Sentences</Link>
          <Link to="/review">Review</Link>
        </nav>
      </div>
      <div className={`container ${styles.legal}`}>
        <span>Local-first · your progress stays in this browser.</span>
        <span>© {new Date().getFullYear()} Linguini</span>
      </div>
    </footer>
  );
}
