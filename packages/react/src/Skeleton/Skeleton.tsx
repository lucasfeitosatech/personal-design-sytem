import { SKELETON_PULSE_MS, SKELETON_SHAPE_HEIGHT, type SkeletonContract, type SkeletonGroupContract } from '@lucasfeitosatech/design-core';
import type { CSSProperties } from 'react';
import styles from './Skeleton.module.css';

export type SkeletonProps = SkeletonContract;
export type SkeletonGroupProps = SkeletonGroupContract;

/**
 * A placeholder in the shape of the content that is coming, never a blocking spinner. It pulses,
 * and the pulse stops when the system asks for reduced motion — a static block is still legible,
 * which is the point of drawing the shape. The block is decoration: hidden from assistive
 * technology, because the announcement lives in the group.
 */
export function Skeleton({ shape = 'line', width, height }: SkeletonProps) {
  const style: CSSProperties = {
    height: height ?? SKELETON_SHAPE_HEIGHT[shape],
    width: typeof width === 'number' ? `${width}px` : width ?? '100%',
    animationDuration: `${SKELETON_PULSE_MS}ms`,
  };
  return <div className={[styles.skeleton, styles[shape]].join(' ')} style={style} aria-hidden="true" />;
}

/**
 * The container a screen wraps its placeholders in. It carries the only announcement — `aria-busy`
 * plus a visually hidden label — and a reader that met each block instead would hear "loading" six
 * times.
 */
export function SkeletonGroup({ label, card = false, children }: SkeletonGroupProps) {
  return (
    <div className={[styles.group, card ? styles.groupCard : ''].filter(Boolean).join(' ')} aria-busy="true">
      <span className="ds-visually-hidden">{label}</span>
      {children}
    </div>
  );
}
