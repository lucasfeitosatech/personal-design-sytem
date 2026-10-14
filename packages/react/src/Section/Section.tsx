import type { SectionContract } from '@lucasfeitosatech/design-core';
import type { HTMLAttributes } from 'react';
import { Card } from '../Card';
import { Text } from '../Text';
import styles from './Section.module.css';

export type SectionProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & SectionContract;

/** A titled block. Sentence case heading, mono meta on the right, one quiet action (D-18). */
export function Section({ title, meta, action, variant = 'card', className, children, ...rest }: SectionProps) {
  const header = (
    <header className={styles.header}>
      <div className={styles.heading}>
        <Text as="h2" size={variant === 'plain' ? 'lg' : 'md'} weight={variant === 'plain' ? 'medium' : 'semibold'} className={variant === 'plain' ? styles.plainTitle : undefined}>
          {title}
        </Text>
        {meta !== undefined && meta !== null ? (
          <Text as="span" size="xs" tone="tertiary" mono>
            {meta}
          </Text>
        ) : null}
      </div>
      {action ? <div className={styles.action}>{action}</div> : null}
    </header>
  );
  if (variant === 'plain') {
    return (
      <section className={[styles.section, styles.plain, className ?? ''].filter(Boolean).join(' ')} {...rest}>
        {header}
        {children}
      </section>
    );
  }
  return (
    <Card className={[styles.section, className ?? ''].filter(Boolean).join(' ')} {...rest}>
      {header}
      {children}
    </Card>
  );
}
