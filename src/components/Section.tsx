import type { ReactNode } from 'react';
import { Reveal } from './Reveal';
import styles from './Section.module.css';

interface SectionProps {
  children: ReactNode;
  tone?: 'surface' | 'beige' | 'light' | 'navy';
  id?: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
  className?: string;
}

/** Editorial section shell with alternating tones and a revealed header. */
export function Section({
  children,
  tone = 'surface',
  id,
  eyebrow,
  title,
  lead,
  className = '',
}: SectionProps) {
  return (
    <section id={id} className={`${styles.section} ${styles[tone]} ${className}`}>
      <div className="container">
        {(eyebrow || title || lead) && (
          <Reveal className={styles.head}>
            <>
              {eyebrow && <span className="eyebrow">{eyebrow}</span>}
              {title && <h2 className={styles.title}>{title}</h2>}
              {lead && <p className={styles.lead}>{lead}</p>}
            </>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
