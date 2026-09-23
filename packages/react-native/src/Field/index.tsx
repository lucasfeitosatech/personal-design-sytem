import type { FieldContract } from '@lucasfeitosatech/design-core';
import type { ReactNode } from 'react';
import { View } from 'react-native';
import { Text } from '../Text';
import { styles } from './styles';

/** What the control needs to be reachable and described, in native terms. */
export type FieldControlProps = {
  accessibilityLabel: string;
  accessibilityHint: string | undefined;
  'aria-invalid': true | undefined;
  editable: boolean;
};

export type FieldProps = Omit<FieldContract, 'children'> & {
  children: (control: FieldControlProps) => ReactNode;
};

/**
 * Label, hint and error around a control. There is no `htmlFor` on a device: the control carries
 * the label itself, so the visible label is decorative and hidden from the reader to avoid a
 * double announcement.
 */
export function Field({ label, hideLabel = false, hint, error, required, disabled, children }: FieldProps) {
  return (
    <View style={styles.field}>
      {!hideLabel ? (
        <Text size="sm" tone="secondary" weight="medium" accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
          {label}
          {required ? ' *' : ''}
        </Text>
      ) : null}
      {children({
        accessibilityLabel: required ? `${label}, obrigatório` : label,
        accessibilityHint: error ?? hint,
        'aria-invalid': error ? true : undefined,
        editable: !disabled,
      })}
      {error ? (
        <Text size="xs" tone="danger" accessibilityLiveRegion="polite">
          {error}
        </Text>
      ) : hint ? (
        <Text size="xs" tone="tertiary" accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
          {hint}
        </Text>
      ) : null}
    </View>
  );
}
