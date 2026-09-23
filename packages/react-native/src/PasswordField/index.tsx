import { useState } from 'react';
import { Pressable } from 'react-native';
import { Text } from '../Text';
import { TextField, type TextFieldProps } from '../TextField';
import { useTheme } from '../theme/ThemeProvider';
import { styles } from './styles';

export type PasswordFieldProps = Omit<TextFieldProps, 'secret' | 'suffix' | 'mode'> & {
  showLabel?: string;
  hideLabel_?: string;
};

/** A TextField that hides its value, with a reveal control inside the frame. */
export function PasswordField({ showLabel = 'Mostrar senha', hideLabel_ = 'Ocultar senha', ...rest }: PasswordFieldProps) {
  const [revealed, setRevealed] = useState(false);
  const { palette } = useTheme();
  return (
    <TextField
      {...rest}
      secret={!revealed}
      textContentType="password"
      autoComplete="current-password"
      suffix={
        <Pressable
          onPress={() => setRevealed((r) => !r)}
          accessibilityRole="button"
          accessibilityLabel={revealed ? hideLabel_ : showLabel}
          accessibilityState={{ selected: revealed }}
          hitSlop={8}
          style={styles.reveal}
        >
          <Text tone="tertiary" style={{ color: palette.textTertiary }}>
            {revealed ? '◎' : '○'}
          </Text>
        </Pressable>
      }
    />
  );
}
