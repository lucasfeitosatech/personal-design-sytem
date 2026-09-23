/** Multi-line entry. Same frame and floating label as TextField; the label rests at the top, not centred. */
export type TextareaContract = {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  /** Visible lines at rest. The field grows with the content up to `maxRows`. */
  rows?: number;
  maxRows?: number;
  maxLength?: number;
  readOnly?: boolean;
};

/** One line of text, in points, used to size the frame from `rows`. */
export const TEXTAREA_LINE_HEIGHT = 20;
export const TEXTAREA_PADDING_Y = 12;
