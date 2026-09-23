import { INPUT_MIN_HEIGHT, type FieldContract, type TextFieldContract } from '@lucasfeitosatech/design-core';
import { space, tap, text as textScale } from '@lucasfeitosatech/design-tokens';
import { useState, type ReactNode } from 'react';
import { TextInput, View, type TextInputProps } from 'react-native';
import { Field } from '../Field';
import { monoFamily } from '../Text/styles';
import { useTheme } from '../theme/ThemeProvider';
import { keyboardFor, styles } from './styles';

export type TextFieldProps = Omit<TextInputProps, 'style' | 'value' | 'editable' | 'onChangeText'> &
  Omit<FieldContract, 'children'> &
  TextFieldContract & {
    prefix?: ReactNode;
    suffix?: ReactNode;
  };

/** Single-line text entry. Same contract as the web; the binding is `onChangeText`. */
export function TextField({
  label,
  hideLabel,
  hint,
  error,
  required,
  disabled,
  size = 'md',
  secret = false,
  mode = 'text',
  mono = false,
  readOnly,
  prefix,
  suffix,
  value,
  onValueChange,
  placeholder,
  ...rest
}: TextFieldProps) {
  const { palette } = useTheme();
  const [focused, setFocused] = useState(false);
  const borderColor = error ? palette.overdue : focused ? palette.accent : palette.border;

  return (
    <Field label={label} hideLabel={hideLabel} hint={hint} error={error} required={required} disabled={disabled}>
      {(control) => (
        <View
          style={[
            styles.frame,
            { minHeight: Math.max(INPUT_MIN_HEIGHT[size], tap), paddingHorizontal: size === 'sm' ? space[2] : space[3] },
            { borderColor, backgroundColor: disabled ? palette.surfaceRaised : palette.surface },
          ]}
        >
          {prefix}
          <TextInput
            style={[styles.input, { color: palette.text, fontSize: textScale.base }, mono ? { fontFamily: monoFamily } : null]}
            value={value}
            onChangeText={onValueChange}
            placeholder={placeholder}
            /* Tertiary, not disabled: the disabled tone fails contrast (D-20). */
            placeholderTextColor={palette.textTertiary}
            secureTextEntry={secret}
            keyboardType={keyboardFor(mode)}
            autoCapitalize={mode === 'email' || mode === 'url' ? 'none' : undefined}
            autoCorrect={mode === 'text' ? undefined : false}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            editable={control.editable && readOnly !== true}
            accessibilityLabel={control.accessibilityLabel}
            accessibilityHint={control.accessibilityHint}
            {...rest}
          />
          {suffix}
        </View>
      )}
    </Field>
  );
}
