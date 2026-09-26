import type { ReactNode } from 'react';

/**
 * Chrome that carries navigation. These are the three shapes a phone needs and the browser does not:
 * a title bar that follows the platform, a bottom tab bar, and the row of a list that leads
 * somewhere. Icons are nodes the consumer injects — the system ships no icon set, so a renderer that
 * needs a glyph of its own uses text.
 */

export type TabItem = {
  key: string;
  label: string;
  icon?: ReactNode;
};

/**
 * The bottom tab bar. No badge, no counter, no dot: a tab bar that notifies turns an app people open
 * when they choose into one that asks to be opened.
 *
 * Platform sizing is the component's business, not the consumer's: iOS is 60 points above the safe
 * area, Android is an 80 dp bar with a pill behind the selected icon. `safeBottom` is the inset the
 * app measured, because the system carries no dependency on a safe-area library.
 */
export type TabBarContract = {
  items: TabItem[];
  active: string;
  onChange: (key: string) => void;
  safeBottom?: number;
};

export type AppBarAction = {
  key: string;
  /** Announced. The control itself is a glyph, so without this it is unreadable. */
  label: string;
  icon?: ReactNode;
  onPress: () => void;
};

/**
 * The screen's title bar. Two platform shapes of one contract: iOS draws a 44 pt bar with a
 * back control in the accent and, when `large`, the title at 2xl underneath; Android draws a 64 dp
 * bar with the title at xl beside the back arrow and no large title.
 *
 * `backLabel` is the previous screen's name. iOS shows it beside the chevron, Android announces it.
 */
export type AppBarContract = {
  title: string;
  subtitle?: ReactNode;
  backLabel?: string;
  onBack?: () => void;
  actions?: AppBarAction[];
  /** Root screens of a stack. Ignored on Android, which has no large title. */
  large?: boolean;
};

export const LIST_ROW_TRAILING = ['chevron', 'none'] as const;
export type ListRowTrailing = (typeof LIST_ROW_TRAILING)[number];

/**
 * One row of a navigating list: label, optional injected icon, mono meta on the right, and a
 * chevron when the row leads somewhere. 52 points tall, so the whole row is the target.
 */
export type ListRowContract = {
  label: string;
  icon?: ReactNode;
  /** The small mono figure before the chevron. */
  meta?: ReactNode;
  detail?: string;
  trailing?: ListRowTrailing | ReactNode;
  onPress?: () => void;
  disabled?: boolean;
};

/** Minimum row height in points. A row is one target, not a label with a target inside it. */
export const LIST_ROW_MIN_HEIGHT = 52;

/** Bar heights per platform, in points. The web token (60) describes a browser and does not apply. */
export const TAB_BAR_HEIGHT = { ios: 60, android: 80 } as const;
export const APP_BAR_HEIGHT = { ios: 44, android: 64 } as const;
