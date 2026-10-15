import { toastTimeout, type ToastContract } from '@lucasfeitosatech/design-core';
import { easing, motion, radius, space } from '@lucasfeitosatech/design-tokens';
import { useEffect, useRef, type ReactNode } from 'react';
import { Animated, Easing, Pressable, StyleSheet, View } from 'react-native';
import { useReduceMotion } from '../internal/useReduceMotion';
import { Text } from '../Text';
import { useTheme } from '../theme/ThemeProvider';

export type ToastProps = ToastContract;

/**
 * A short confirmation above the tab bar.
 *
 * It enters rising 12 pt while it fades in, and leaves falling 8 pt: the toast is mounted when it
 * is shown, and the application keeps it mounted through `leaving` so the out plays before
 * `onExited` lets it unmount. There is no hover on a device, so the pause the web toast gets does
 * not exist here; the timings are the same otherwise. An error never dismisses itself.
 */
export function Toast({ message, tone = 'default', actionLabel, actionDisabled = false, onAction, onDismiss, dismissLabel = 'Fechar', leaving = false, onExited }: ToastProps) {
  const { palette } = useTheme();
  const reduced = useReduceMotion();
  const timeout = toastTimeout(tone, Boolean(actionLabel));
  const dismiss = useRef(onDismiss);
  dismiss.current = onDismiss;
  const exited = useRef(onExited);
  exited.current = onExited;
  // A stop() fires its callback with finished false, and a replaced run must not fire onExited:
  // the generation token invalidates the callback of any execution cancelled by a cleanup.
  const generation = useRef(0);

  // The values start in the off state so a toast that mounts mid-screen never paints settled for
  // a frame before it moves.
  const opacity = useRef(new Animated.Value(0)).current;
  const offset = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    if (timeout === null) return;
    const timer = setTimeout(() => dismiss.current?.(), timeout);
    return () => clearTimeout(timer);
  }, [timeout]);

  useEffect(() => {
    if (reduced) {
      // No displacement: at most the short fade.
      offset.setValue(0);
      const fade = Animated.timing(opacity, { toValue: 1, duration: motion.fast, useNativeDriver: true });
      fade.start();
      return () => fade.stop();
    }
    const curve = Easing.bezier(...easing.out);
    const enter = Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: motion.base, easing: curve, useNativeDriver: true }),
      Animated.timing(offset, { toValue: 0, duration: motion.base, easing: curve, useNativeDriver: true }),
    ]);
    enter.start();
    return () => enter.stop();
  }, [reduced, opacity, offset]);

  useEffect(() => {
    if (!leaving) return;
    const gen = generation.current;
    const onExit = (result: { finished: boolean }) => {
      if (result.finished && gen === generation.current) exited.current?.();
    };
    if (reduced) {
      const fade = Animated.timing(opacity, { toValue: 0, duration: motion.fast, useNativeDriver: true });
      fade.start(onExit);
      return () => {
        generation.current += 1;
        fade.stop();
      };
    }
    const curve = Easing.bezier(...easing.out);
    const leave = Animated.parallel([
      Animated.timing(opacity, { toValue: 0, duration: motion.fast, easing: curve, useNativeDriver: true }),
      Animated.timing(offset, { toValue: 8, duration: motion.fast, easing: curve, useNativeDriver: true }),
    ]);
    leave.start(onExit);
    return () => {
      generation.current += 1;
      leave.stop();
    };
  }, [leaving, reduced, opacity, offset]);

  const isError = tone === 'error';
  return (
    <Animated.View
      accessibilityLiveRegion={isError ? 'assertive' : 'polite'}
      style={[styles.toast, { backgroundColor: isError ? palette.overdue : palette.text, opacity, transform: [{ translateY: offset }] }]}
    >
      <Text size="md" style={[styles.message, { color: isError ? palette.onOverdue : palette.bg }]} lines={2}>
        {message}
      </Text>
      {actionLabel && (onAction || actionDisabled) ? (
        <Pressable onPress={actionDisabled ? undefined : onAction} accessibilityRole="button" accessibilityState={{ disabled: actionDisabled }} disabled={actionDisabled} hitSlop={8}>
          <Text size="md" weight="semibold" style={{ color: isError ? palette.onOverdue : palette.bg, opacity: actionDisabled ? 0.55 : 1 }}>
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
    </Animated.View>
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
