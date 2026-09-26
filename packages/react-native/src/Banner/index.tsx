import { BANNER_TONE_TOKEN, type BannerContract } from '@lucasfeitosatech/design-core';
import { View } from 'react-native';
import { Text } from '../Text';
import { useTheme } from '../theme/ThemeProvider';
import { styles } from './styles';

export type BannerProps = BannerContract;

/**
 * A standing condition, pinned in the content: no connection, an unsent draft, a rejected form. It has
 * no timer and no close control by default — the condition, not the reader, decides when it goes.
 */
export function Banner({ tone = 'warning', title, body, actions, icon }: BannerProps) {
  const { palette } = useTheme();
  const token = BANNER_TONE_TOKEN[tone];

  return (
    <View
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
      style={[styles.banner, { borderColor: palette[token.border], backgroundColor: palette[token.background] }]}
    >
      {icon ? <View style={styles.icon}>{icon}</View> : null}
      <View style={styles.main}>
        <Text size="md" weight="medium" maxFontSizeMultiplier={1.2}>
          {title}
        </Text>
        {typeof body === 'string' ? (
          <Text size="sm" tone="secondary" maxFontSizeMultiplier={1.2}>
            {body}
          </Text>
        ) : (
          body
        )}
        {actions ? <View style={styles.actions}>{actions}</View> : null}
      </View>
    </View>
  );
}
