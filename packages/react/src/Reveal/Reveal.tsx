import type { ReactNode } from 'react';
import styles from './Reveal.module.css';

export type RevealProps = {
  /** The element to render. Pick it for meaning, not for the effect. */
  as?: 'div' | 'section' | 'li';
  className?: string;
  children?: ReactNode;
};

/**
 * Fades a block up as it enters the viewport, driven by the scroll itself — pure CSS through
 * `animation-timeline: view()`, with no JavaScript and no scroll listener. Where the browser has
 * no view timeline (Firefox today) the content is simply there: a reveal that would hold content
 * back waiting on JS is not a reveal, it is a blank.
 */
export function Reveal({ as: Tag = 'div', className, children }: RevealProps) {
  return (
    <Tag className={[styles.reveal, className ?? ''].filter(Boolean).join(' ')}>
      {children}
    </Tag>
  );
}
