import { useState } from 'react';
import { Circle, Path, Svg } from 'react-native-svg';
import { Pressable } from 'react-native';
import { TextField, type TextFieldProps } from '../TextField';
import { useTheme } from '../theme/ThemeProvider';
import { styles } from './styles';

export type PasswordFieldProps = Omit<TextFieldProps, 'secret' | 'suffix' | 'mode'> & {
  /** Accessible name of the reveal control while the value is hidden. */
  revealLabel?: string;
  /** And while it is shown. An icon-only button needs a name in both states. */
  concealLabel?: string;
};

/** A TextField that hides its value, with a reveal control inside the frame. */
export function PasswordField({ revealLabel = 'Mostrar senha', concealLabel = 'Ocultar senha', ...rest }: PasswordFieldProps) {
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
          accessibilityLabel={revealed ? concealLabel : revealLabel}
          accessibilityState={{ selected: revealed }}
          hitSlop={8}
          style={styles.reveal}
        >
          <EyeIcon crossed={revealed} stroke={palette.textTertiary} />
        </Pressable>
      }
    />
  );
}

/**
 * The eye shows what pressing will do: open while the value is hidden, struck through while it is
 * shown — the same states as the web's inline SVG, with the same strokes on the same 24 grid.
 *
 * Drawn with `react-native-svg`, which stays a peer dependency: the app already ships it, and the
 * system carries no icon set of its own.
 */
function EyeIcon({ crossed, stroke }: { crossed: boolean; stroke: string }) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      accessible={false}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <Path d="M2.5 12s3.5-6.5 9.5-6.5 9.5 6.5 9.5 6.5-3.5 6.5-9.5 6.5S2.5 12 2.5 12Z" />
      <Circle cx={12} cy={12} r={3} />
      {crossed ? <Path d="M4 4l16 16" /> : null}
    </Svg>
  );
}
