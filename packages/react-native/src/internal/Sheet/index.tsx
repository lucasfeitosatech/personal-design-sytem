import { radius, space } from '@lucasfeitosatech/design-tokens';
import type { ReactNode } from 'react';
import { Modal as RNModal, Pressable, StyleSheet, View } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export type SheetProps = {
  open: boolean;
  onRequestClose: () => void;
  children: ReactNode;
  /**
   * Bottom inset of the device, from the app's `useSafeAreaInsets().bottom`. It is a prop and not a
   * hook call so this package does not force a safe-area dependency on every consumer.
   */
  safeBottom?: number;
  accessibilityLabel?: string;
  /** `alertdialog` semantics for a destructive decision. */
  alert?: boolean;
};

/**
 * A panel from the bottom of the screen, over the scrim. The shared base of Select and Modal.
 *
 * Deliberately gesture-free: dragging it down needs a gesture library, and which one is the
 * application's decision. Tapping the scrim closes, which is the same escape with one finger.
 */
export function Sheet({ open, onRequestClose, children, safeBottom = 0, accessibilityLabel, alert = false }: SheetProps) {
  const { palette } = useTheme();
  return (
    <RNModal visible={open} transparent animationType="slide" onRequestClose={onRequestClose} statusBarTranslucent>
      <Pressable style={[styles.scrim, { backgroundColor: palette.scrim }]} onPress={onRequestClose} accessibilityLabel="Fechar" />
      <View
        accessibilityViewIsModal
        accessibilityRole={alert ? 'alert' : undefined}
        accessibilityLabel={accessibilityLabel}
        style={[styles.sheet, { backgroundColor: palette.surface, paddingBottom: space[4] + safeBottom }]}
      >
        <View style={[styles.handle, { backgroundColor: palette.border }]} />
        {children}
      </View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  scrim: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  sheet: {
    position: 'absolute', left: 0, right: 0, bottom: 0,
    borderTopLeftRadius: radius.lg, borderTopRightRadius: radius.lg,
    paddingTop: space[2], paddingHorizontal: space[4], maxHeight: '80%',
  },
  handle: { width: 36, height: 5, borderRadius: radius.pill, alignSelf: 'center', marginBottom: space[3] },
});
