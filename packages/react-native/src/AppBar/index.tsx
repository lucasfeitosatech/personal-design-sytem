import { APP_BAR_HEIGHT, type AppBarContract } from '@lucasfeitosatech/design-core';
import { Platform, Pressable, View } from 'react-native';
import { Text } from '../Text';
import { useTheme } from '../theme/ThemeProvider';
import { styles } from './styles';

export type AppBarProps = AppBarContract;

const ios = Platform.OS !== 'android';

/**
 * The screen's title bar in each platform's own shape: iOS a 44 pt bar whose back control carries the
 * previous screen's name in the accent, with the title at 2xl underneath on a root screen; Android a
 * 64 dp bar with the title beside the arrow and no large title.
 *
 * The chevron is text, not an icon: the system ships no icon set, and a bar has to work without one.
 */
export function AppBar({ title, subtitle, backLabel, onBack, actions, large = false }: AppBarProps) {
  const { palette } = useTheme();
  const largeTitle = ios && large;

  return (
    <View style={{ backgroundColor: palette.bgPage }}>
      <View style={[styles.row, ios ? styles.rowIos : styles.rowAndroid, { height: ios ? APP_BAR_HEIGHT.ios : APP_BAR_HEIGHT.android }]}>
        {onBack ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={backLabel ? `Voltar para ${backLabel}` : 'Voltar'}
            onPress={onBack}
            style={ios ? styles.backIos : styles.backAndroid}
          >
            <Text size="xl" tone={ios ? 'accent' : 'default'}>
              {ios ? '‹' : '←'}
            </Text>
            {ios && backLabel ? (
              <Text size="lg" tone="accent" lines={1}>
                {backLabel}
              </Text>
            ) : null}
          </Pressable>
        ) : null}

        <View style={styles.titleSlot}>
          {largeTitle ? null : (
            <Text size={ios ? 'lg' : 'xl'} weight="semibold" lines={1} accessibilityRole="header" style={ios ? styles.titleIos : onBack ? undefined : styles.titleAndroid}>
              {title}
            </Text>
          )}
        </View>

        {actions?.length ? (
          <View style={styles.actions}>
            {actions.map((action) => (
              <Pressable key={action.key} accessibilityRole="button" accessibilityLabel={action.label} onPress={action.onPress} style={styles.action}>
                {action.icon ?? (
                  <Text size="md" weight="medium" tone="accent">
                    {action.label}
                  </Text>
                )}
              </Pressable>
            ))}
          </View>
        ) : null}
      </View>

      {largeTitle ? (
        <Text size="2xl" weight="semibold" accessibilityRole="header" style={styles.large}>
          {title}
        </Text>
      ) : null}
      {subtitle ? <View style={styles.subtitle}>{typeof subtitle === 'string' ? <Text tone="secondary">{subtitle}</Text> : subtitle}</View> : null}
    </View>
  );
}
