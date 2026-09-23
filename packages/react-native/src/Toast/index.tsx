import { toastTimeout, type ToastContract } from '@lucasfeitosatech/design-core';
import { radius, space } from '@lucasfeitosatech/design-tokens';
import { useEffect, useRef, type ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from '../Text';
import { useTheme } from '../theme/ThemeProvider';

export type ToastProps = ToastContract;

/**
 * A short confirmation above the tab bar.
 *
 * There is no hover on a device, so the pause the web toast gets does not exist here; the timings
 * are the same otherwise. An error never dismisses itself.
 */
export function Toast({ message, tone = 'default', actionLabel, onAction, onDismiss, dismissLabel = 'Fechar' }: ToastProps) {
  const { palette } = useTheme();
  const timeout = toastTimeout(tone, Boolean(actionLabel));
  const dismiss = useRef(onDismiss);
  dismiss.current = onDismiss;

  useEffect(() => {
    if (timeout === null) return;
    const timer = setTimeout(() => dismiss.current?.(), timeout);
    return () => clearTimeout(timer);
  }, [timeout]);

  const isError = tone === 'error';
  return (
    <View
      accessibilityLiveRegion={isError ? 'assertive' : 'polite'}
      style={[styles.toast, { backgroundColor: isError ? palette.overdue : palette.text }]}
    >
      <Text size="md" style={[styles.message, { color: isError ? palette.onOverdue : palette.bg }]} lines={2}>
        {message}
      </Text>
      {actionLabel && onAction ? (
        <Pressable onPress={onAction} accessibilityRole="button" hitSlop={8}>
          <Text size="md" weight="semibold" style={{ color: isError ? palette.onOverdue : palette.bg }}>
            {actionLabel}
          </Text>
        </Pressable>
      ) : null}
      {onDismiss ? (
        <Pressable onPress={onDismiss} accessibilityRole="button" accessibilityLabel={dismissLabel} hitSlop={8}>
          <Text size="lg" style={{ color: isError ? palette.onOverdue : palette.bg }}>
            ×
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

/**
 * Anchors the toasts above the tab bar and the home indicator. Both measurements are the
 * application's to know, so they arrive as props rather than a safe-area dependency here.
 */
export function ToastRegion({ children, tabBar = 0, safeBottom = 0 }: { children: ReactNode; tabBar?: number; safeBottom?: number }) {
  return <View pointerEvents="box-none" style={[styles.region, { bottom: tabBar + safeBottom + space[2] }]}>{children}</View>;
}

const styles = StyleSheet.create({
  region: { position: 'absolute', left: space[4], right: space[4], gap: space[2] },
  toast: { flexDirection: 'row', alignItems: 'center', gap: space[3], paddingVertical: space[3], paddingHorizontal: space[4], borderRadius: radius.md },
  message: { flex: 1 },
});
