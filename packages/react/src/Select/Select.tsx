import { matchByPrefix, nextEnabled, type SelectContract } from '@lucasfeitosatech/design-core';
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { Field } from '../Field';
import { Text } from '../Text';
import styles from './Select.module.css';

export type SelectProps = SelectContract;

/**
 * A combobox with a listbox popover anchored under the field.
 *
 * The active row and the selected one are different things: arrows move the active row, Enter
 * commits it. Announcing only the selection would leave a keyboard user unable to tell where they
 * are. Type-ahead resets after a second of silence, the way a native select does.
 */
export function Select({ options, value, onValueChange, label, hideLabel, hint, error, required, disabled, placeholder = 'Selecione', open, onOpenChange, readOnly }: SelectProps) {
  const id = useId();
  const listId = `${id}-list`;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isOpen = open ?? uncontrolledOpen;
  const setOpen = (next: boolean) => {
    if (open === undefined) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  const selectedIndex = options.findIndex((o) => o.value === value);
  const [activeIndex, setActiveIndex] = useState(Math.max(selectedIndex, 0));
  const typed = useRef({ text: '', at: 0 });
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  });

  const commit = (index: number) => {
    const option = options[index];
    if (!option || option.disabled) return;
    onValueChange?.(option.value);
    setOpen(false);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled || readOnly) return;
    if (event.key === 'Escape') return setOpen(false);
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!isOpen) return setOpen(true);
      return setActiveIndex((i) => nextEnabled(options, i, event.key === 'ArrowDown' ? 1 : -1));
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      return isOpen ? commit(activeIndex) : setOpen(true);
    }
    if (event.key.length === 1) {
      const now = Date.now();
      typed.current = { text: now - typed.current.at > 1000 ? event.key : typed.current.text + event.key, at: now };
      const match = matchByPrefix(options, typed.current.text);
      if (match) setActiveIndex(options.indexOf(match));
    }
  };

  const selected = options[selectedIndex];

  return (
    <Field label={label} hideLabel={hideLabel} hint={hint} error={error} required={required} disabled={disabled}>
      {(control) => (
        <div className={styles.root} ref={rootRef}>
          <button
            type="button"
            role="combobox"
            aria-expanded={isOpen}
            aria-controls={listId}
            aria-activedescendant={isOpen ? `${id}-${activeIndex}` : undefined}
            className={[styles.frame, error ? styles.invalid : '', disabled ? styles.disabled : ''].filter(Boolean).join(' ')}
            onClick={() => !readOnly && setOpen(!isOpen)}
            onKeyDown={onKeyDown}
            {...control}
          >
            <Text size="base" tone={selected ? 'default' : 'tertiary'} className={styles.value}>
              {selected?.label ?? placeholder}
            </Text>
            <span className={[styles.chevron, isOpen ? styles.chevronOpen : ''].filter(Boolean).join(' ')} aria-hidden="true">
              ⌄
            </span>
          </button>
          {isOpen ? (
            <ul className={styles.list} id={listId} role="listbox" aria-label={label}>
              {options.map((option, index) => (
                <li
                  key={option.value}
                  id={`${id}-${index}`}
                  role="option"
                  aria-selected={option.value === value}
                  aria-disabled={option.disabled}
                  className={[styles.row, index === activeIndex ? styles.active : '', option.disabled ? styles.rowDisabled : ''].filter(Boolean).join(' ')}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => commit(index)}
                >
                  <Text size="base">{option.label}</Text>
                  {option.value === value ? (
                    <span className={styles.check} aria-hidden="true">
                      ✓
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      )}
    </Field>
  );
}
