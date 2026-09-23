import type { SwitchContract } from '@lucasfeitosatech/design-core';
import { useId } from 'react';
import { Text } from '../Text';
import styles from './Switch.module.css';

export type SwitchProps = SwitchContract;

/**
 * Commits immediately. A real checkbox underneath with `role="switch"`, so it is reachable by
 * keyboard, announces its state, and participates in a form without any JavaScript of ours.
 */
export function Switch({ checked, onCheckedChange, label, description, disabled }: SwitchProps) {
  const id = useId();
  const descriptionId = description ? `${id}-description` : undefined;
  return (
    <div className={[styles.row, disabled ? styles.disabled : ''].filter(Boolean).join(' ')}>
      <input
        id={id}
        type="checkbox"
        role="switch"
        className={styles.input}
        checked={checked}
        disabled={disabled}
        aria-describedby={descriptionId}
        onChange={(event) => onCheckedChange(event.target.checked)}
      />
      <label className={styles.control} htmlFor={id}>
        <span className={styles.track} aria-hidden="true">
          <span className={styles.thumb} />
        </span>
        <span className={styles.labels}>
          <Text size="base">{label}</Text>
          {description ? (
            <Text as="span" id={descriptionId} size="xs" tone="tertiary">
              {description}
            </Text>
          ) : null}
        </span>
      </label>
    </div>
  );
}
