import type { ModalContract } from '@lucasfeitosatech/design-core';
import { space } from '@lucasfeitosatech/design-tokens';
import { StyleSheet, View } from 'react-native';
import { Button } from '../Button';
import { Sheet } from '../internal/Sheet';
import { Text } from '../Text';

export type ModalProps = ModalContract & {
  /** Bottom inset, passed through to the sheet. */
  safeBottom?: number;
};

/**
 * A decision, as a bottom sheet.
 *
 * The actions are stacked full width with the primary above the secondary, because a thumb reaches
 * the bottom of the screen and not a row of small buttons at the top right. Tapping the scrim is
 * the same as the secondary action, which is the phone's equivalent of Escape.
 */
export function Modal({ open, title, body, primaryAction, secondaryAction, onClose, alert = false, safeBottom }: ModalProps) {
  return (
    <Sheet open={open} onRequestClose={onClose} safeBottom={safeBottom} accessibilityLabel={title} alert={alert}>
      <View style={styles.content}>
        <Text size="lg" weight="semibold" accessibilityRole="header">
          {title}
        </Text>
        {body ? typeof body === 'string' ? <Text size="base" tone="secondary">{body}</Text> : body : null}
        <View style={styles.actions}>
          <Button variant={primaryAction.variant ?? (alert ? 'danger' : 'primary')} loading={primaryAction.loading} onPress={primaryAction.onPress} block>
            {primaryAction.label}
          </Button>
          {secondaryAction ? (
            <Button variant="ghost" loading={secondaryAction.loading} onPress={secondaryAction.onPress ?? onClose} block>
              {secondaryAction.label}
            </Button>
          ) : null}
        </View>
      </View>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  content: { gap: space[3] },
  actions: { gap: space[2], marginTop: space[2] },
});
