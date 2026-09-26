import type { ReactNode } from 'react';
import type { ChipTone } from './chip';

/**
 * A row that carries a name, a state, a date and a figure, with one action on the right. Unlike
 * `ListRow` it does not lead anywhere: the row is read, and the control at its end is the only
 * target. The figure and the date are mono so a column of them lines up.
 */

export type BillRowStatus = {
  label: string;
  tone: ChipTone;
};

export type BillRowAction = {
  /** Announced, and it names the row: "Marcar Internet como paga". */
  label: string;
  onPress: () => void;
  icon?: ReactNode;
  /** The action already happened; the control shows it and stays available for the way back. */
  done?: boolean;
  disabled?: boolean;
};

export type BillRowContract = {
  name: string;
  status?: BillRowStatus;
  /** Mono metadata beside the chip: the date, or what the date means now. */
  meta?: string;
  /** The figure, right-aligned in mono. Formatted by the application; the system counts nothing. */
  amount: string;
  action?: BillRowAction;
  /** The row is settled: the name and the figure read quieter, the row stays legible. */
  muted?: boolean;
};

/** Minimum row height in points: two lines of content beside a 44 pt control. */
export const BILL_ROW_MIN_HEIGHT = 60;
