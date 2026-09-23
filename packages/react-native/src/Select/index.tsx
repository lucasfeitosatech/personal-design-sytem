import { INPUT_HEIGHT, SELECT_ROW_HEIGHT, type SelectContract } from '@lucasfeitosatech/design-core';
import { radius, space } from '@lucasfeitosatech/design-tokens';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Field } from '../Field';
import { Sheet } from '../internal/Sheet';
import { Text } from '../Text';
import { useTheme } from '../theme/ThemeProvider';

export type SelectProps = SelectContract & {
  /** Bottom inset, passed through to the sheet. */
  safeBottom?: number;
};

/**
 * The field opens a bottom sheet, not a popover.
 *
 * A popover on a phone lands under the thumb that opened it or off the edge of the screen; a sheet
 * comes from where the thumb already is. A row tap selects and closes, so the control needs no
 * confirm button.
 */
export function Select({ options, value, onValueChange, label, hideLabel, hint, error, required, disabled, placeholder = 'Selecione', open, onOpenChange, readOnly, safeBottom }: SelectProps) {
  const { palette } = useTheme();
  const [uncontrolled, setUncontrolled] = useState(false);
  const isOpen = open ?? uncontrolled;
  const setOpen = (next: boolean) => {
    if (open === undefined) setUncontrolled(next);
    onOpenChange?.(next);
  };
  const selected = options.find((o) => o.value === value);
  const borderColor = error ? palette.overdue : isOpen ? palette.accent : palette.border;

  return (
    <Field label={label} hideLabel={hideLabel} hint={hint} error={error} required={required} disabled={disabled}>
      {(control) => (
        <>
          <Pressable
            onPress={() => !disabled && !readOnly && setOpen(true)}
            accessibilityRole="button"
            accessibilityLabel={control.accessibilityLabel}
            accessibilityHint={control.accessibilityHint}
            accessibilityState={{ disabled: disabled || readOnly, expanded: isOpen }}
            style={[
              styles.frame,
              { minHeight: INPUT_HEIGHT.md, borderColor, borderWidth: isOpen ? 2 : 1, backgroundColor: disabled ? palette.surfaceRaised : palette.surface },
              disabled ? styles.disabled : null,
            ]}
          >
            <Text size="base" tone={selected ? 'default' : 'tertiary'} lines={1} style={styles.value}>
              {selected?.label ?? placeholder}
            </Text>
            <Text size="base" tone="tertiary">⌄</Text>
          </Pressable>

          <Sheet open={isOpen} onRequestClose={() => setOpen(false)} safeBottom={safeBottom} accessibilityLabel={label}>
            <Text size="lg" weight="semibold" accessibilityRole="header">{label}</Text>
            <ScrollView style={styles.list}>
              {options.map((option) => {
                const isSelected = option.value === value;
                return (
                  <Pressable
                    key={option.value}
                    onPress={() => {
                      if (option.disabled) return;
                      onValueChange?.(option.value);
                      setOpen(false);
                    }}
                    accessibilityRole="menuitem"
                    accessibilityState={{ selected: isSelected, disabled: option.disabled }}
                    style={({ pressed }) => [
                      styles.row,
                      pressed && !option.disabled ? { backgroundColor: palette.surfaceRaised } : null,
                      option.disabled ? styles.disabled : null,
                    ]}
                  >
                    <View style={styles.rowText}>
                      <Text size="base">{option.label}</Text>
                      {option.description ? <Text size="xs" tone="tertiary">{option.description}</Text> : null}
                    </View>
                    {isSelected ? <Text size="base" weight="semibold" style={{ color: palette.accent }}>✓</Text> : null}
                  </Pressable>
                );
              })}
            </ScrollView>
          </Sheet>
        </>
      )}
    </Field>
  );
}

const styles = StyleSheet.create({
  frame: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: space[2], borderRadius: radius.sm, paddingHorizontal: space[3] },
  disabled: { opacity: 0.55 },
  value: { flex: 1 },
  list: { marginTop: space[2] },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: space[2], minHeight: SELECT_ROW_HEIGHT.native, paddingHorizontal: space[2], borderRadius: radius.sm },
  rowText: { flex: 1, gap: 2 },
});
