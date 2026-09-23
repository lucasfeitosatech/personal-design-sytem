import type { TextContract } from '@lucasfeitosatech/design-core';
import type { ElementType, HTMLAttributes } from 'react';
import styles from './Text.module.css';

export type TextProps = Omit<HTMLAttributes<HTMLElement>, 'children'> &
  TextContract & {
    /** The element to render. Pick it for meaning, not for size. */
    as?: ElementType;
  };

/** Applies the type scale. On the web it is optional where CSS already inherits; keep it for anything that carries a tone or a figure. */
export function Text({ as: Tag = 'span', size = 'base', tone = 'default', weight = 'regular', mono = false, lines, className, style, children, ...rest }: TextProps) {
  const classes = [styles.text, styles[`size-${size}`], styles[`tone-${tone}`], styles[`weight-${weight}`], mono ? styles.mono : '', lines ? styles.clamp : '', className ?? '']
    .filter(Boolean)
    .join(' ');
  return (
    <Tag className={classes} style={lines ? { ...style, WebkitLineClamp: lines } : style} {...rest}>
      {children}
    </Tag>
  );
}
