import { TAB_BAR_HEIGHT, type TabBarContract } from '@lucasfeitosatech/design-core';
import { Platform, Pressable, View } from 'react-native';
import { Text } from '../Text';
import { useTheme } from '../theme/ThemeProvider';
import { styles } from './styles';

export type TabBarProps = TabBarContract;

const ios = Platform.OS !== 'android';

/**
 * The bottom tab bar, sized by the platform and not by the web token: 60 points above the safe area on
 * iOS, an 80 dp bar with a pill behind the selected icon on Android. It carries no badge and no
 * counter — see the contract.
 *
 * `safeBottom` comes from the app because the system depends on no safe-area library.
 */
export function TabBar({ items, active, onChange, safeBottom = 0 }: TabBarProps) {
  const { palette } = useTheme();

  return (
    <View
      accessibilityRole="tablist"
      style={[
        styles.bar,
        { height: (ios ? TAB_BAR_HEIGHT.ios : TAB_BAR_HEIGHT.android) + safeBottom, paddingBottom: safeBottom },
        { backgroundColor: palette.surface, borderTopColor: palette.border },
      ]}
    >
      {items.map((item) => {
        const selected = item.key === active;
        return (
          <Pressable
            key={item.key}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            accessibilityLabel={item.label}
            onPress={() => onChange(item.key)}
            style={[styles.tab, ios ? styles.tabIos : styles.tabAndroid]}
          >
            {item.icon ? (
              <View style={[styles.icon, ios ? null : styles.iconAndroid, !ios && selected ? { backgroundColor: palette.accentSoft } : null]}>
                {item.icon}
              </View>
            ) : null}
            <Text
              size={ios ? 'xs' : 'sm'}
              weight={selected && !ios ? 'semibold' : 'medium'}
              tone={selected ? (ios ? 'accent' : 'default') : ios ? 'tertiary' : 'secondary'}
              lines={1}
              maxFontSizeMultiplier={1.2}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
