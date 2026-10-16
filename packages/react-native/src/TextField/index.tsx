import { INPUT_HEIGHT, LABEL_FLOATING_SIZE, LABEL_RESTING_SIZE, type FieldContract, type TextFieldContract } from '@lucasfeitosatech/design-core';
import { space } from '@lucasfeitosatech/design-tokens';
import { forwardRef, useEffect, useRef, useState, type ComponentRef, type ReactNode } from 'react';
import { Animated, TextInput, View, type TextInputProps } from 'react-native';
import { Field } from '../Field';
import { useReduceMotion } from '../internal/useReduceMotion';
import { fontFamily } from '../Text/styles';
import { useTheme } from '../theme/ThemeProvider';
import { FLOAT_DURATION, keyboardFor, LIFTED_INPUT_PAD_TOP, styles } from './styles';

export type TextFieldProps = Omit<TextInputProps, 'style' | 'value' | 'editable' | 'onChangeText' | 'placeholder'> &
  Omit<FieldContract, 'children'> &
  TextFieldContract & {
    prefix?: ReactNode;
    suffix?: ReactNode;
    /**
     * @deprecated The label no longer crosses the border, so there is no notch to paint and no
     * colour to declare. Kept accepted so existing callers keep compiling; it has no effect.
     */
    surfaceBehind?: string;
  };

/**
 * Single-line text entry with a floating label, the same contract as the web.
 *
 * The web floats the label with CSS; a device has no `:not(:placeholder-shown)`, so the lift is an
 * animation driven by focus and by the value being non-empty. The label floats up inside the frame,
 * at the top, and the input gains a top padding that keeps the text clear of it.
 */
export const TextField = forwardRef<ComponentRef<typeof TextInput>, TextFieldProps>(function TextField(
  {
    label,
    hint,
    error,
    required,
    disabled,
    size = 'md',
    secret = false,
    mode = 'text',
    mono = false,
    align = 'left',
    readOnly,
    prefix,
    suffix,
    surfaceBehind,
    value,
    onValueChange,
    placeholder,
    ...rest
  },
  ref,
) {
  const { palette } = useTheme();
  const reduced = useReduceMotion();
  const [focused, setFocused] = useState(false);
  // A prefix already occupies the row, so the label has nowhere to rest.
  const lifted = focused || (value ?? '').length > 0 || prefix !== undefined;
  const progress = useRef(new Animated.Value(lifted ? 1 : 0)).current;

  useEffect(() => {
    if (reduced) {
      // No timing to stop: the label lands where it ends.
      progress.setValue(lifted ? 1 : 0);
      return;
    }
    Animated.timing(progress, { toValue: lifted ? 1 : 0, duration: FLOAT_DURATION, useNativeDriver: false }).start();
  }, [lifted, progress, reduced]);

  const borderColor = error ? palette.overdue : focused ? palette.accent : palette.border;
  // 2px on focus, the padding pulled in by 1 so the frame keeps its size.
  const borderWidth = focused ? 2 : 1;
  const labelColor = error ? palette.overdue : focused ? palette.accent : palette.textTertiary;
  const fill = disabled ? palette.surfaceRaised : palette.surface;

  return (
    <Field label={label} hideLabel hint={hint} error={error} required={required} disabled={disabled}>
      {(control) => (
        // The label is a sibling of the frame, not a child: on iOS the frame's CALayer border
        // paints over its own children, so a label inside the frame gets clipped by the line.
        <View style={styles.container}>
          <View style={[styles.frame, { minHeight: INPUT_HEIGHT[size], borderColor, borderWidth, backgroundColor: fill, paddingHorizontal: (size === 'sm' ? space[2] : space[3]) - (borderWidth - 1) }]}>
            {prefix}
            <TextInput
              ref={ref}
              style={[
                styles.input,
                { color: palette.text, textAlign: align, paddingTop: lifted ? LIFTED_INPUT_PAD_TOP : 0 },
                mono ? { fontFamily: fontFamily('regular', true) } : null,
              ]}
              placeholder={lifted ? placeholder : undefined}
              placeholderTextColor={palette.textTertiary}
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
          {/* The visual label is not a node: the input already carries its name, and a second
              announcement of the same word is a field that says its name twice. */}
          <Animated.Text
            accessible={false}
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            pointerEvents="none"
            numberOfLines={1}
            style={[
              styles.label,
              {
                color: labelColor,
                left: borderWidth + space[3],
                // The border no longer counts into the absolute position: it used to be a child of
                // the frame, so the two values carry the borderWidth back on, as left already does.
                // Lifted, the label sits 6pt inside the top border, and the input clears it.
                top: progress.interpolate({ inputRange: [0, 1], outputRange: [INPUT_HEIGHT[size] / 2 - 10 + borderWidth, 6 + borderWidth] }),
                fontSize: progress.interpolate({ inputRange: [0, 1], outputRange: [LABEL_RESTING_SIZE, LABEL_FLOATING_SIZE] }),
              },
            ]}
          >
            {label}
            {required ? ' *' : ''}
          </Animated.Text>
        </View>
      )}
    </Field>
  );
});
