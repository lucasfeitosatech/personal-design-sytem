import type { AffirmationCardContract } from '@lucasfeitosatech/design-core';
import { useId } from 'react';
import { Text } from '../Text';
import styles from './AffirmationCard.module.css';

export type AffirmationCardProps = AffirmationCardContract;

/**
 * A sentence with its origin. With `onToggle` the card is a disclosure — the sentence is the
 * button and the source is the region it controls; without it the source stays visible. The
 * excerpt is quoted and in mono because it is a quotation: the person has to be able to recognise
 * their own words in it.
 */
export function AffirmationCard({ text, source, collapsedHint, expanded = false, onToggle, actions }: AffirmationCardProps) {
  const sourceId = useId();
  const collapsible = Boolean(onToggle);
  const open = !collapsible || expanded;

  const sourceRegion = source ? (
    <div className={styles.source} id={collapsible ? sourceId : undefined}>
      <Text as="div" size="xs" tone="tertiary" mono>
        {source.label}
      </Text>
      <Text as="div" size="xs" tone="secondary" mono>
        {`“${source.excerpt}”`}
      </Text>
    </div>
  ) : null;

  if (!collapsible) {
    return (
      <div className={[styles.card, styles.plain].join(' ')}>
        <Text as="div" size="lg">
          {text}
        </Text>
        {sourceRegion}
        {actions ? <div className={styles.actions}>{actions}</div> : null}
      </div>
    );
  }

  return (
    <div className={[styles.card, open ? styles.open : styles.closed].join(' ')}>
      <button type="button" className={styles.disclosure} aria-expanded={expanded} aria-controls={open ? sourceId : undefined} onClick={onToggle}>
        <Text as="span" size="lg">
          {text}
        </Text>
        {!expanded && collapsedHint ? (
          <span className={styles.hint}>
            <Text as="span" size="xs" tone="tertiary">
              {collapsedHint}
            </Text>
            <span className={styles.chevron} aria-hidden="true">
              ⌄
            </span>
          </span>
        ) : null}
      </button>
      {open ? sourceRegion : null}
      {actions ? <div className={styles.actions}>{actions}</div> : null}
    </div>
  );
}
