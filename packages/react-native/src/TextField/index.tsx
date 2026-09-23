import { INPUT_HEIGHT, LABEL_FLOATING_SIZE, LABEL_RESTING_SIZE, type FieldContract, type TextFieldContract } from '@lucasfeitosatech/design-core';
import { space } from '@lucasfeitosatech/design-tokens';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Animated, TextInput, View, type TextInputProps } from 'react-native';
import { Field } from '../Field';
import { monoFamily } from '../Text/styles';
import { useTheme } from '../theme/ThemeProvider';
import { FLOAT_DURATION, keyboardFor, styles } from './styles';

export type TextFieldProps = Omit<TextInputProps, 'style' | 'value' | 'editable' | 'onChangeText' | 'placeholder'> &
  Omit<FieldContract, 'children'> &
  TextFieldContract & {
    prefix?: ReactNode;
    suffix?: ReactNode;
    /**
     * The colour behind the frame. The floating label paints it to fake a notch, because a native
     * border cannot be cut. Defaults to the surface colour, which is right inside a Card; pass the
     * page colour when the field sits directly on the background.
     */
    surfaceBehind?: string;
  };

/**
 * Single-line text entry with a floating label, the same contract as the web.
 *
 * The web floats the label with CSS; a device has no `:not(:placeholder-shown)`, so the lift is an
 * animation driven by focus and by the value being non-empty. The label paints the surface colour
 * behind itself to sit on the border line, because a native border cannot be notched.
 */
export function TextField({
  label,
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
  surfaceBehind,
  value,
  onValueChange,
  ...rest
}: TextFieldProps) {
  const { palette } = useTheme();
  const [focused, setFocused] = useState(false);
  const lifted = focused || (value ?? '').length > 0;
  const progress = useRef(new Animated.Value(lifted ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(progress, { toValue: lifted ? 1 : 0, duration: FLOAT_DURATION, useNativeDriver: false }).start();
  }, [lifted, progress]);

  const borderColor = error ? palette.overdue : focused ? palette.accent : palette.border;
  // 2px on focus, the padding pulled in by 1 so the frame keeps its size.
  const borderWidth = focused ? 2 : 1;
  const labelColor = error ? palette.overdue : focused ? palette.accent : palette.textTertiary;
  const fill = disabled ? palette.surfaceRaised : palette.surface;
  // Not the fill: a disabled field is grey inside, but the notch opens onto whatever is behind it.
  const notch = surfaceBehind ?? palette.surface;

  return (
    <Field label={label} hideLabel hint={hint} error={error} required={required} disabled={disabled}>
      {(control) => (
        <View style={[styles.frame, { minHeight: INPUT_HEIGHT[size], borderColor, borderWidth, backgroundColor: fill, paddingHorizontal: (size === 'sm' ? space[2] : space[3]) - (borderWidth - 1) }]}>
          <Animated.Text
            pointerEvents="none"
            numberOfLines={1}
            style={[
              styles.label,
              {
                color: labelColor,
                backgroundColor: notch,
                left: prefix ? space[3] + 24 : space[3],
                top: progress.interpolate({ inputRange: [0, 1], outputRange: [INPUT_HEIGHT[size] / 2 - 10, -8] }),
                fontSize: progress.interpolate({ inputRange: [0, 1], outputRange: [LABEL_RESTING_SIZE, LABEL_FLOATING_SIZE] }),
                paddingHorizontal: progress.interpolate({ inputRange: [0, 1], outputRange: [0, 4] }),
              },
            ]}
          >
            {label}
            {required ? ' *' : ''}
          </Animated.Text>
          {prefix}
          <TextInput
            style={[styles.input, { color: palette.text }, mono ? { fontFamily: monoFamily } : null]}
            value={value}
            onChangeText={onValueChange}
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
