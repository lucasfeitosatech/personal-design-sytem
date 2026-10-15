import { PRACTICE_TILE_MIN_HEIGHT, TILE_STATE_TOKEN, type PracticeTileContract, type TileGridContract } from '@lucasfeitosatech/design-core';
import type { Palette } from '@lucasfeitosatech/design-tokens';
import type { ReactNode } from 'react';
import { Animated, Pressable, View } from 'react-native';
import { usePressScale } from '../internal/usePressScale';
import { CheckMark, PopMark, useTurnedOn } from '../internal/CheckMark';
import { Text } from '../Text';
import { useTheme } from '../theme/ThemeProvider';
import { MARK, styles } from './styles';

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
  // A grid that loads already marked paints its checks settled; only a new `done` pops and draws.
  const turnCount = useTurnedOn(state === 'done');
  const press = usePressScale();

  return (
    <Animated.View style={[styles.cell, press.style]}>
    <Pressable
      onPressIn={press.onPressIn}
      onPressOut={press.onPressOut}
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
      {/* The key remounts the mark on every new `done`, which is what replays the pop. */}
      <PopMark key={turnCount} animate={turnCount > 0} size={MARK} style={[styles.mark, { borderColor: markColor ?? palette.textTertiary }]}>
        {token.half ? <View style={[styles.half, { backgroundColor: markColor }]} /> : null}
        {markColor && !token.half ? (
          <View style={[styles.fill, { backgroundColor: markColor }]}>
            <CheckMark animate={turnCount > 0} color={palette.onAccent} />
          </View>
        ) : null}
      </PopMark>
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
    </Animated.View>
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
