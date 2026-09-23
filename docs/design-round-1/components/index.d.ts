/**
 * Personal Design System — component contracts.
 * Shipping (Text, Button, Card, Spinner, Field, TextField) mirror packages/core/src/contracts at cf8fcdb.
 * New contracts are proposed for packages/core/src/contracts, one file each, same style:
 * const arrays first, types derived from them. A renderer may add platform props (`type="submit"`,
 * `hitSlop`); it may not remove, rename or change the meaning of these.
 * `state` on every component exists only in the specimen bundle, to force hover/focus/pressed.
 */
import type { ReactNode } from 'react';

// ---------- base.ts (shipping) ----------
export type BaseSize = 'sm' | 'md';
export type BaseTone = 'neutral' | 'accent' | 'danger';
/** Specimen only. */
export type ForcedState = 'hover' | 'focus' | 'pressed' | 'active';

// ---------- text.ts (shipping) ----------
export type TextTone = 'default' | 'secondary' | 'tertiary' | 'disabled' | 'accent' | 'danger';
export type TextSize = 'xs' | 'sm' | 'md' | 'base' | 'lg' | 'xl' | '2xl';
export type TextWeight = 'regular' | 'medium' | 'semibold';
/** Applies the closed type scale. Native: every string goes through here. */
export interface TextProps {
  size?: TextSize;
  tone?: TextTone;
  weight?: TextWeight;
  /** Figures, dates and metadata. Tabular by default. */
  mono?: boolean;
  /** Truncates to this many lines. */
  lines?: number;
  /** Web only: the element to render. */
  as?: string;
  children?: ReactNode;
}
export declare function Text(props: TextProps): JSX.Element;

// ---------- button.ts (shipping) ----------
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
/** Min height: sm 32, md 38 (web ≥880px); 44 on a device and under 880px. */
export interface ButtonProps {
  variant?: ButtonVariant;
  size?: BaseSize;
  /** Blocks interaction and announces busy. Draws a spinner before the label. */
  loading?: boolean;
  /** Fills the available width. */
  block?: boolean;
  disabled?: boolean;
  /** Decorative, never the only carrier of meaning. */
  icon?: ReactNode;
  children: ReactNode;
  onClick?: () => void;
  state?: ForcedState | ForcedState[];
}
export declare function Button(props: ButtonProps): JSX.Element;

// ---------- surface.ts (shipping) ----------
export type SurfaceTone = 'default' | 'raised' | 'muted';
/** A bordered surface; luminance and a 1px border, never a shadow. */
export interface CardProps { tone?: SurfaceTone; flush?: boolean; children?: ReactNode; }
export declare function Card(props: CardProps): JSX.Element;
export interface SpinnerProps { size?: BaseSize; /** Required and announced. */ label: string; }
export declare function Spinner(props: SpinnerProps): JSX.Element;

// ---------- field.ts (shipping) ----------
/** Label, hint and error around a control. An error replaces the hint. */
export interface FieldContract {
  label: string;
  hideLabel?: boolean;
  hint?: string;
  /** When present the field is invalid and the message is announced. */
  error?: string;
  required?: boolean;
  disabled?: boolean;
}
export interface FieldProps extends FieldContract { children: ReactNode | ((control: object) => ReactNode); }
export declare function Field(props: FieldProps): JSX.Element;

// ---------- input.ts (shipping) ----------
export type InputMode = 'text' | 'numeric' | 'decimal' | 'email' | 'tel' | 'url' | 'search';
/** Frame height: sm 48, md 56. Label resting 14, floating 11. */
export interface TextFieldProps extends FieldContract {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  size?: BaseSize;
  secret?: boolean;
  mode?: InputMode;
  maxLength?: number;
  readOnly?: boolean;
  mono?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  state?: ForcedState | ForcedState[];
}
export declare function TextField(props: TextFieldProps): JSX.Element;

// ---------- textarea.ts (new) ----------
/** Multi-line TextField. Web: vertical resize grip. Device: grows from rows to maxRows, then scrolls. */
export interface TextareaProps extends FieldContract {
  value?: string;
  onValueChange?: (value: string) => void;
  /** Visible lines at rest. Default 2. */
  rows?: number;
  /** Device: the most it grows before scrolling. Default 6. */
  maxRows?: number;
  /** Shows a mono counter "n/max" under the frame. */
  maxLength?: number;
  readOnly?: boolean;
  state?: ForcedState | ForcedState[];
}
export declare function Textarea(props: TextareaProps): JSX.Element;

// ---------- password.ts (new) ----------
/** TextField with a reveal button inside the frame (aria-pressed; 32px web, 44pt device). */
export interface PasswordFieldProps extends Omit<TextFieldProps, 'secret' | 'suffix' | 'mode'> {
  revealed?: boolean;
  onRevealedChange?: (revealed: boolean) => void;
  revealState?: ForcedState;
}
export declare function PasswordField(props: PasswordFieldProps): JSX.Element;

// ---------- toggle.ts (new) ----------
/** Immediate on/off. Track 40×24 web, 51×31 device. The whole row is the target. */
export interface SwitchProps {
  label: string;
  description?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  state?: ForcedState | ForcedState[];
}
export declare function Switch(props: SwitchProps): JSX.Element;

export interface CheckboxProps {
  label: string;
  description?: string;
  checked?: boolean;
  /** Draws a dash; aria-checked="mixed". Wins over checked. */
  indeterminate?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  /** A string shows the message; true only outlines (inside a group). */
  error?: string | boolean;
  state?: ForcedState | ForcedState[];
}
export declare function Checkbox(props: CheckboxProps): JSX.Element;

export interface ChoiceOption { value: string; label: string; description?: string; disabled?: boolean; meta?: string; }
export interface ChoiceGroupProps extends Omit<FieldContract, 'hideLabel'> {
  options: ChoiceOption[];
  states?: Record<string, ForcedState | ForcedState[]>;
}
export interface CheckboxGroupProps extends ChoiceGroupProps { value?: string[]; onValueChange?: (value: string[]) => void; }
export declare function CheckboxGroup(props: CheckboxGroupProps): JSX.Element;
/** One of a few, all visible. Arrow keys move the choice; only the selected option is tabbable. */
export interface RadioGroupProps extends ChoiceGroupProps { value?: string; onValueChange?: (value: string) => void; }
export declare function RadioGroup(props: RadioGroupProps): JSX.Element;

// ---------- select.ts (new) ----------
/** Web: popover listbox anchored under the field. Device: bottom sheet with 52pt rows. */
export interface SelectProps extends FieldContract {
  options: ChoiceOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  readOnly?: boolean;
  /** Specimen: the keyboard-highlighted row (web). */
  activeValue?: string;
  /** Specimen: the pressed row (device). */
  pressedValue?: string;
  state?: ForcedState | ForcedState[];
}
export declare function Select(props: SelectProps): JSX.Element;

// ---------- masked.ts (new) ----------
/** Money in BRL. value = digits in cents ("123456" → "R$ 1.234,56"). Right aligned, mono. Device: number pad. */
export interface MoneyInputProps extends Omit<TextFieldProps, 'value' | 'onValueChange' | 'mode' | 'prefix' | 'mono'> {
  value?: string;
  onValueChange?: (cents: string) => void;
}
export declare function MoneyInput(props: MoneyInputProps): JSX.Element;
/** Month and year, "MM/AAAA". value = up to 6 digits ("032026"). A month outside 01–12 is an error. */
export interface PeriodInputProps extends Omit<TextFieldProps, 'value' | 'onValueChange' | 'mode' | 'mono'> {
  value?: string;
  onValueChange?: (digits: string) => void;
}
export declare function PeriodInput(props: PeriodInputProps): JSX.Element;
export declare function formatMoney(cents: string | number): string;
export declare function formatPeriod(digits: string): string;

// ---------- chip.ts (new) ----------
export type ChipTone = 'neutral' | 'accent' | 'paid' | 'pending' | 'due-soon' | 'overdue' | 'skipped';
/** 28px web, 32pt device. Status tones always carry their glyph. */
export interface ChipProps {
  tone?: ChipTone;
  /** Makes it a filter toggle (aria-pressed). */
  selected?: boolean;
  onSelectedChange?: (selected: boolean) => void;
  /** Adds a remove button (44pt target on a device). */
  onRemove?: () => void;
  removeLabel?: string;
  disabled?: boolean;
  children: string;
  state?: ForcedState | ForcedState[];
  removeState?: ForcedState;
}
export declare function Chip(props: ChipProps): JSX.Element;

// ---------- presentation.ts (new) ----------
export interface EmptyStateProps {
  title: string;
  /** One line. */
  body?: string;
  /** One Button. */
  action?: ReactNode;
  tone?: 'default' | 'error';
}
export declare function EmptyState(props: EmptyStateProps): JSX.Element;
export interface SectionProps {
  title: string;
  /** Mono, right aligned: a total, a count, a date. */
  meta?: string;
  /** A quiet action: Button variant="ghost" size="sm". */
  action?: ReactNode;
  as?: 'h2' | 'h3';
  children?: ReactNode;
}
export declare function Section(props: SectionProps): JSX.Element;
export interface DividerProps { orientation?: 'horizontal' | 'vertical'; tone?: 'default' | 'soft'; inset?: boolean; }
export declare function Divider(props: DividerProps): JSX.Element;

// ---------- overlay.ts (new) ----------
export interface ModalAction { label: string; variant?: ButtonVariant; loading?: boolean; onPress?: () => void; }
/** Web: centred 440px dialog over the scrim. Device: bottom sheet, handle, stacked actions, safe area. */
export interface ModalProps {
  open?: boolean;
  title: string;
  body: ReactNode;
  primaryAction: ModalAction;
  secondaryAction?: ModalAction;
  onClose?: () => void;
  /** role="alertdialog" and focus starts on the secondary action. Use with a danger primary. */
  alert?: boolean;
}
export declare function Modal(props: ModalProps): JSX.Element | null;
/** role="status" (default, auto-dismiss 6s / 10s with an action) or role="alert" (error, stays). */
export interface ToastProps {
  message: string;
  tone?: 'default' | 'error';
  actionLabel?: string;
  onAction?: () => void;
  onDismiss?: () => void;
}
export declare function Toast(props: ToastProps): JSX.Element;
/** Web: bottom-left, 24px. Device: full width minus 16, above tab bar (60) + safe area (34) + 8. */
export declare function ToastRegion(props: { children: ReactNode; tabBar?: number; safeBottom?: number }): JSX.Element;
export declare function BottomSheet(props: { title?: string; onClose?: () => void; children: ReactNode }): JSX.Element;
export declare function PlatformProvider(props: { platform: 'web' | 'native'; children: ReactNode }): JSX.Element;
