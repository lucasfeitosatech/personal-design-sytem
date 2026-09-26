import { PRACTICE_TILE_MIN_HEIGHT, TILE_STATE_TOKEN, type PracticeTileContract, type TileGridContract } from '@lucasfeitosatech/design-core';
import type { Palette } from '@lucasfeitosatech/design-tokens';
import type { ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from '../Text';
import { useTheme } from '../theme/ThemeProvider';
import { styles } from './styles';

export type PracticeTileProps = PracticeTileContract;
export type TileGridProps = TileGridContract & { children?: ReactNode };

/**
 * A tile that toggles, with its own name and a mono line under it. The state is a checkbox state and
 * not a pressed one: `partial` has to reach assistive technology as "partially checked", which only
 * the checkbox role can say.
 */
export function PracticeTile({ label, meta, state = 'idle', onPress, disabled = false }: PracticeTileProps) {
  const { palette } = useTheme();
  const token = TILE_STATE_TOKEN[state];
  const markColor = token.mark ? palette[token.mark as keyof Palette] : undefined;

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityLabel={meta ? `${label}, ${meta}` : label}
      accessibilityState={{ checked: state === 'partial' ? 'mixed' : state === 'done', disabled }}
      disabled={disabled || !onPress}
      onPress={onPress}
      style={({ pressed }) => [
        styles.tile,
        {
          minHeight: PRACTICE_TILE_MIN_HEIGHT,
          backgroundColor: palette[token.background as keyof Palette],
          borderColor: palette[token.border as keyof Palette],
          borderStyle: state === 'muted' ? 'dashed' : 'solid',
        },
        pressed && !disabled ? styles.pressed : null,
        disabled ? styles.disabled : null,
      ]}
    >
      <View style={[styles.mark, { borderColor: markColor ?? palette.textTertiary }]}>
        {token.half ? <View style={[styles.half, { backgroundColor: markColor }]} /> : null}
        {markColor && !token.half ? (
          <View style={[styles.fill, { backgroundColor: markColor }]}>
            <Text size="xs" weight="semibold" style={{ color: palette.onAccent }}>
              ✓
            </Text>
          </View>
        ) : null}
      </View>
      <View style={styles.labels}>
        <Text size="base" weight="medium" lines={2} maxFontSizeMultiplier={1.2}>
          {label}
        </Text>
        {meta ? (
          <Text size="xs" tone="tertiary" mono maxFontSizeMultiplier={1.2}>
            {meta}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}

/**
 * The two-column grid the tiles sit in. It owns the gap and the group announcement; a tile never
 * knows how many neighbours it has. Tiles wrap rather than shrink, so 120 % type costs a row and
 * never a truncated name.
 */
export function TileGrid({ label, children }: TileGridProps) {
  return (
    <View accessibilityRole={label ? 'list' : undefined} accessibilityLabel={label} style={styles.grid}>
      {children}
    </View>
  );
}
