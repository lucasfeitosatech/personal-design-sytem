import type { EmptyStateContract } from '@lucasfeitosatech/design-core';
import { View } from 'react-native';
import { Text } from '../Text';
import { useTheme } from '../theme/ThemeProvider';
import { styles } from './styles';

export type EmptyStateProps = EmptyStateContract;

/** Nothing to show, or something failed. Always offers one way out. */
export function EmptyState({ title, body, tone = 'default', actions }: EmptyStateProps) {
  const { palette } = useTheme();
  const isError = tone === 'error';
  return (
    <View
      accessibilityLiveRegion={isError ? 'polite' : 'none'}
      style={[
        styles.empty,
        isError
          ? { borderStyle: 'solid', borderColor: palette.overdueBorder, backgroundColor: palette.overdueSoft }
          : { borderStyle: 'dashed', borderColor: palette.border },
      ]}
    >
      <Text size="md" weight="medium" tone={isError ? 'danger' : 'default'}>
        {title}
      </Text>
      {body ? (
        <Text size="sm" tone="secondary">
          {body}
        </Text>
      ) : null}
      {actions ? <View style={styles.actions}>{actions}</View> : null}
    </View>
  );
}
