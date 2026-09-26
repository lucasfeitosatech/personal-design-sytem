import type { AIActionContract, AIPanelContract } from '@lucasfeitosatech/design-core';
import { Pressable, View } from 'react-native';
import { Skeleton } from '../Skeleton';
import { Spinner } from '../Spinner';
import { Text } from '../Text';
import { useTheme } from '../theme/ThemeProvider';
import { styles } from './styles';

export type AIPanelProps = AIPanelContract;
export type AIActionProps = AIActionContract;

/**
 * The quiet control that asks for a generation: a small ring and a word, in the accent, never filled.
 * It keeps the 44 pt target through padding rather than through a background, so it does not read as
 * a button competing with the section's own.
 */
export function AIAction({ label, onPress, loading = false, disabled = false }: AIActionProps) {
  const { palette } = useTheme();
  const inactive = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: inactive, busy: loading }}
      disabled={inactive}
      onPress={onPress}
      hitSlop={8}
      style={({ pressed }) => [styles.action, pressed && !inactive ? styles.pressed : null, inactive ? styles.inactive : null]}
    >
      <View style={[styles.dot, { borderColor: palette.accent }]} />
      <Text size="md" weight="medium" tone="accent" maxFontSizeMultiplier={1.2}>
        {label}
      </Text>
    </Pressable>
  );
}

/**
 * Generated text, in the three shapes it can take. `unavailable` is drawn dashed and says so in
 * words: a provider that is not answering is a state of this panel and never an error on the screen
 * around it, which keeps writing possible while the model is down.
 */
export function AIPanel({ state = 'ready', title, meta, busyLabel = 'Gerando…', children }: AIPanelProps) {
  const { palette } = useTheme();
  const frame = { backgroundColor: palette.surfaceMuted, borderColor: palette.border };

  if (state === 'loading') {
    return (
      <View style={[styles.panel, frame]}>
        <View style={styles.busy}>
          <Spinner label={busyLabel} size="sm" />
          {/* The spinner already announces it; hearing the same sentence twice is not more informative. */}
          <Text size="sm" tone="secondary" maxFontSizeMultiplier={1.2} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
            {busyLabel}
          </Text>
        </View>
        <Skeleton width="90%" height={8} />
        <Skeleton width="70%" height={8} />
      </View>
    );
  }

  if (state === 'unavailable') {
    return (
      <View accessibilityRole="alert" style={[styles.panel, styles.dashed, frame]}>
        <View style={styles.busy}>
          <Text size="sm" tone="secondary">
            !
          </Text>
          <Text size="sm" tone="secondary" maxFontSizeMultiplier={1.2}>
            {children}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.panel, frame]}>
      {title || meta ? (
        <View style={styles.header}>
          <Text size="xs" tone="tertiary" maxFontSizeMultiplier={1.2}>
            {title}
          </Text>
          {meta ? (
            <Text size="xs" tone="tertiary" mono maxFontSizeMultiplier={1.2}>
              {meta}
            </Text>
          ) : null}
        </View>
      ) : null}
      {typeof children === 'string' ? (
        <Text size="base" tone="secondary" maxFontSizeMultiplier={1.2}>
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  );
}
