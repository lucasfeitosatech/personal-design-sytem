import { TEXTAREA_LINE_HEIGHT, TEXTAREA_PADDING_Y, type FieldContract, type TextareaContract } from '@lucasfeitosatech/design-core';
import { space } from '@lucasfeitosatech/design-tokens';
import { useEffect, useRef, useState } from 'react';
import { Animated, TextInput, View, type TextInputProps } from 'react-native';
import { Field } from '../Field';
import { FLOAT_DURATION } from '../TextField/styles';
import { useTheme } from '../theme/ThemeProvider';
import { styles } from './styles';

export type TextareaProps = Omit<TextInputProps, 'style' | 'value' | 'editable' | 'onChangeText' | 'multiline'> &
  Omit<FieldContract, 'children'> &
  TextareaContract & {
    /** The colour behind the frame; the floating label paints it to fake a notch. */
    surfaceBehind?: string;
  };

/** Multi-line entry. The label rests at the first line, not centred, and lifts onto the border. */
export function Textarea({ label, hint, error, required, disabled, rows = 4, maxRows, readOnly, surfaceBehind, value, onValueChange, placeholder, ...rest }: TextareaProps) {
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
  const fill = disabled ? palette.surfaceRaised : palette.surface;
  const notch = surfaceBehind ?? palette.surface;
  const minHeight = rows * TEXTAREA_LINE_HEIGHT + TEXTAREA_PADDING_Y * 2;

  return (
    <Field label={label} hideLabel hint={hint} error={error} required={required} disabled={disabled}>
      {(control) => (
        <View style={[styles.frame, { minHeight, borderColor, borderWidth, backgroundColor: fill, paddingHorizontal: space[3] - (borderWidth - 1) }]}>
          <Animated.Text
            pointerEvents="none"
            numberOfLines={1}
            style={[
              styles.label,
              {
                color: error ? palette.overdue : focused ? palette.accent : palette.textTertiary,
                backgroundColor: notch,
                top: progress.interpolate({ inputRange: [0, 1], outputRange: [TEXTAREA_PADDING_Y, -8] }),
                fontSize: progress.interpolate({ inputRange: [0, 1], outputRange: [14, 11] }),
                paddingHorizontal: progress.interpolate({ inputRange: [0, 1], outputRange: [0, 4] }),
              },
            ]}
          >
            {label}
            {required ? ' *' : ''}
          </Animated.Text>
          <TextInput
            multiline
            textAlignVertical="top"
            style={[styles.input, { color: palette.text, maxHeight: maxRows ? maxRows * TEXTAREA_LINE_HEIGHT + TEXTAREA_PADDING_Y * 2 : undefined }]}
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
      )}
    </Field>
  );
}
