import type { ChoiceOption } from './choice';
import type { FieldContract } from './field';

/**
 * Pick one option from a list, in the TextField frame with a chevron. Use it from six options up,
 * or when they need not all be visible; below that a RadioGroup shows the choices without a click.
 *
 * The two renderings are different controls, not one control restyled. On the web it is a combobox
 * with a listbox popover anchored under the field, driven by arrows, type-ahead, Enter and Escape.
 * On a device it is a bottom sheet over the scrim, where a row tap selects and closes. A popover on
 * a phone lands under the thumb or off screen, and a sheet on a desktop steals the whole window.
 */
export type SelectContract = Omit<FieldContract, 'children'> & {
  options: readonly ChoiceOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  /** Controlled open state. Leave it out and the component owns it. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  readOnly?: boolean;
};

/** Row heights, in points. A phone row is taller because a thumb is not a cursor. */
export const SELECT_ROW_HEIGHT = { web: 36, native: 52 } as const;

/** Finds the option a typed prefix points at, for the web's type-ahead. */
export function matchByPrefix(options: readonly ChoiceOption[], prefix: string): ChoiceOption | undefined {
  const needle = prefix.trim().toLowerCase();
  if (needle === '') return undefined;
  return options.find((option) => !option.disabled && option.label.toLowerCase().startsWith(needle));
}

/** The next enabled option in a direction, wrapping at the ends. */
export function nextEnabled(options: readonly ChoiceOption[], from: number, step: 1 | -1): number {
  const total = options.length;
  for (let i = 1; i <= total; i += 1) {
    const index = (from + step * i + total * total) % total;
    if (!options[index]?.disabled) return index;
  }
  return from;
}
