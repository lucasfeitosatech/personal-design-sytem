import { APP_BAR_HEIGHT, type AppBarContract } from '@lucasfeitosatech/design-core';
import { Platform, Pressable, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Eyebrow } from '../Eyebrow';
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
 * The back mark is drawn, not typed: a 2 pt chevron on iOS and an arrow on Android, sized to the
 * label beside it, so it sits on the same line as the title below instead of floating as a glyph.
 *
 * With `eyebrow` set, the large title screen gains the editorial label above the title, with the
 * accent dot — the same voice as the web's page header. The large title drops to medium weight and
 * tightens its tracking to match. Android has no large title, so the eyebrow never appears there.
 */
export function AppBar({ title, subtitle, backLabel, onBack, actions, large = false, eyebrow }: AppBarProps) {
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
            <Svg width={22} height={22} viewBox="0 0 24 24" accessible={false} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
              <Path
                d={ios ? 'M15 18l-6-6 6-6' : 'M19 12H5M12 19l-7-7 7-7'}
                stroke={ios ? palette.accent : palette.text}
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </Svg>
            {ios && backLabel ? (
              <Text size="md" weight="medium" tone="accent" lines={1}>
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
        <View style={styles.large}>
          {eyebrow ? <Eyebrow dot>{eyebrow}</Eyebrow> : null}
          <Text size="2xl" weight="medium" accessibilityRole="header" style={styles.largeTitle}>
            {title}
          </Text>
        </View>
      ) : null}
      {subtitle ? <View style={styles.subtitle}>{typeof subtitle === 'string' ? <Text tone="secondary">{subtitle}</Text> : subtitle}</View> : null}
    </View>
  );
}
