import { TEXTAREA_LINE_HEIGHT, TEXTAREA_PADDING_Y, type FieldContract, type TextareaContract } from '@lucasfeitosatech/design-core';
import { space } from '@lucasfeitosatech/design-tokens';
import { useEffect, useRef, useState } from 'react';
import { Animated, TextInput, View, type TextInputProps } from 'react-native';
import { Field } from '../Field';
import { FLOAT_DURATION, LABEL_BAND } from '../TextField/styles';
import { useReduceMotion } from '../internal/useReduceMotion';
import { useTheme } from '../theme/ThemeProvider';
import { styles } from './styles';

export type TextareaProps = Omit<TextInputProps, 'style' | 'value' | 'editable' | 'onChangeText' | 'multiline'> &
  Omit<FieldContract, 'children'> &
  TextareaContract & {
    /**
     * @deprecated The label no longer crosses the border, so there is no notch to paint and no
     * colour to declare. Kept accepted so existing callers keep compiling; it has no effect.
     */
    surfaceBehind?: string;
  };

/**
 * Multi-line entry. The label rests at the first line, not centred, and lifts into a fixed band
 * above the scrollable input, which is always reserved: the frame's height never moves with focus
 * or entry.
 */
export function Textarea({ label, hint, error, required, disabled, rows = 4, maxRows, readOnly, surfaceBehind, value, onValueChange, placeholder, ...rest }: TextareaProps) {
  const { palette } = useTheme();
  const reduced = useReduceMotion();
  const [focused, setFocused] = useState(false);
  const lifted = focused || (value ?? '').length > 0;
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
  const fill = disabled ? palette.surfaceRaised : palette.surface;
  // The band is always there, so the limits depend on the content lines alone, not on the label
  // being lifted.
  const inputFor = (lines: number) => TEXTAREA_PADDING_Y * 2 + lines * TEXTAREA_LINE_HEIGHT;
  const minHeight = LABEL_BAND + inputFor(rows);

  return (
    <Field label={label} hideLabel hint={hint} error={error} required={required} disabled={disabled}>
      {(control) => (
        // The label is a sibling of the frame, not a child: on iOS the frame's CALayer border
        // paints over its own children, so a label inside the frame gets clipped by the line.
        <View style={styles.container}>
          <View style={[styles.frame, { minHeight, borderColor, borderWidth, backgroundColor: fill, paddingHorizontal: space[3] - (borderWidth - 1) }]}>
            <View style={styles.labelBand} />
            <TextInput
              multiline
              textAlignVertical="top"
              style={[
                styles.input,
                {
                  color: palette.text,
                  maxHeight: maxRows ? inputFor(maxRows) : undefined,
                },
              ]}
              placeholder={lifted ? placeholder : undefined}
              placeholderTextColor={palette.textTertiary}
              value={value}
              onChangeText={onValueChange}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              editable={control.editable && readOnly !== true}
              accessibilityLabel={control.accessibilityLabel}
              accessibilityHint={control.accessibilityHint}
              {...rest}
            />
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
                color: error ? palette.overdue : focused ? palette.accent : palette.textTertiary,
                left: borderWidth + space[3],
                // The border no longer counts into the absolute position: it used to be a child of
                // the frame, so the two values carry the borderWidth back on, as left already does.
                // Lifted, the label sits 6pt inside the top border, in the reserved band; at rest
                // it rests on the first line below the band.
                top: progress.interpolate({ inputRange: [0, 1], outputRange: [LABEL_BAND + TEXTAREA_PADDING_Y + borderWidth, 6 + borderWidth] }),
                fontSize: progress.interpolate({ inputRange: [0, 1], outputRange: [14, 11] }),
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
}
