import { INPUT_HEIGHT, type FieldContract, type TextFieldContract } from '@lucasfeitosatech/design-core';
import { nativeText, radius, space } from '@lucasfeitosatech/design-tokens';
import { forwardRef, useEffect, useRef, useState, type ComponentRef, type ReactNode } from 'react';
import { Animated, Text, TextInput, View, type LayoutChangeEvent, type TextInputProps } from 'react-native';
import { Field } from '../Field';
import { NotchedOutline } from '../internal/NotchedOutline';
import { useReduceMotion } from '../internal/useReduceMotion';
import { fontFamily } from '../Text/styles';
import { useTheme } from '../theme/ThemeProvider';
import { FLOAT_DURATION, keyboardFor, NATIVE_LABEL_FLOAT_LINE, NATIVE_LABEL_FLOAT_SIZE, NATIVE_LABEL_REST_LINE, NOTCH_GAP, styles } from './styles';

export type TextFieldProps = Omit<TextInputProps, 'style' | 'value' | 'editable' | 'onChangeText' | 'placeholder'> &
  Omit<FieldContract, 'children'> &
  TextFieldContract & {
    prefix?: ReactNode;
    suffix?: ReactNode;
    /**
     * @deprecated The raised label crosses the border and the notch around it is a real cut in the
     * line, so there is no background to declare. Kept accepted so existing callers keep
     * compiling; it has no effect.
     */
    surfaceBehind?: string;
  };

/**
 * Single-line text entry with a floating label, the same contract as the web.
 *
 * The web floats the label with CSS; a device has no `:not(:placeholder-shown)`, so the lift is an
 * animation driven by focus and by the value being non-empty. Raised, the label sits centred on
 * the top border line and the border is interrupted behind it — a real notch, drawn by the
 * internal outline, with no background painted under the text. At rest the label fills the row in
 * the size of the text it will be replaced by.
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
  // The frame's measured size; 0 until the first onLayout, when the outline is drawn uncut.
  const [bounds, setBounds] = useState({ width: 0, height: 0 });
  // The label's width at floating size, measured by an invisible twin: the notch must open as
  // wide as the raised label, plus the gap on either side.
  const [labelWidth, setLabelWidth] = useState(0);
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
  // 2px on focus. The stroke is the outline's, not the frame's, so the content never moves.
  const borderWidth = focused ? 2 : 1;
  const labelColor = error ? palette.overdue : focused ? palette.accent : palette.textTertiary;
  const fill = disabled ? palette.surfaceRaised : palette.surface;
  // Constant: with no border on the frame, the padding cannot breathe with focus.
  const pad = (size === 'sm' ? space[2] : space[3]) + 1;
  // The cut starts a gap before the label, so the raised text never touches the stroke.
  const notchStart = pad - NOTCH_GAP;
  const notchWidth = progress.interpolate({ inputRange: [0, 1], outputRange: [0, labelWidth > 0 ? labelWidth + 2 * NOTCH_GAP : 0] });
  // Measured height, or the contract's minimum before the first onLayout.
  const height = bounds.height > 0 ? bounds.height : INPUT_HEIGHT[size];

  const onLayout = (event: LayoutChangeEvent) => {
    setBounds({ width: event.nativeEvent.layout.width, height: event.nativeEvent.layout.height });
  };

  return (
    <Field label={label} hideLabel hint={hint} error={error} required={required} disabled={disabled}>
      {(control) => (
        <View style={styles.container} onLayout={onLayout}>
          <View style={[styles.frame, { minHeight: INPUT_HEIGHT[size], backgroundColor: fill, paddingHorizontal: pad }]}>
            <View style={styles.row}>
              {prefix}
              <TextInput
                ref={ref}
                style={[
                  styles.input,
                  { color: palette.text, textAlign: align },
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
          </View>
          {/* The border is drawn, not set: iOS cannot notch a CALayer's stroke, so the line is a
              clipped drawing and the gap behind the label is a hole, not a painted background. */}
          <NotchedOutline
            width={bounds.width}
            height={bounds.height}
            borderWidth={borderWidth}
            borderColor={borderColor}
            borderRadius={radius.sm}
            notchStart={notchStart}
            notchWidth={notchWidth}
          />
          {/* Invisible twin of the raised label: it only measures the width the notch opens to. */}
          <Text
            accessible={false}
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            pointerEvents="none"
            numberOfLines={1}
            onLayout={(event) => setLabelWidth(event.nativeEvent.layout.width)}
            style={[styles.measure, { fontSize: NATIVE_LABEL_FLOAT_SIZE, lineHeight: NATIVE_LABEL_FLOAT_LINE }]}
          >
            {label}
            {required ? ' *' : ''}
          </Text>
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
                left: pad,
                // At rest the label is centred on the frame, in the size of the text it replaces;
                // lifted, the centre of its line lands on the centre of the stroke.
                top: progress.interpolate({ inputRange: [0, 1], outputRange: [height / 2 - NATIVE_LABEL_REST_LINE / 2, borderWidth / 2 - NATIVE_LABEL_FLOAT_LINE / 2] }),
                fontSize: progress.interpolate({ inputRange: [0, 1], outputRange: [nativeText.base, NATIVE_LABEL_FLOAT_SIZE] }),
                lineHeight: progress.interpolate({ inputRange: [0, 1], outputRange: [NATIVE_LABEL_REST_LINE, NATIVE_LABEL_FLOAT_LINE] }),
                maxWidth: bounds.width > 0 ? bounds.width - 2 * pad : undefined,
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
