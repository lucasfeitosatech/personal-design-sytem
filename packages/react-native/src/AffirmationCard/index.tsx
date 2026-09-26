import type { AffirmationCardContract } from '@lucasfeitosatech/design-core';
import { Pressable, View } from 'react-native';
import { Text } from '../Text';
import { useTheme } from '../theme/ThemeProvider';
import { styles } from './styles';

export type AffirmationCardProps = AffirmationCardContract;

/**
 * A sentence with its origin. With `onToggle` the card is a disclosure and the source is what the
 * disclosure reveals; without it the source stays visible. The excerpt is quoted and in mono because
 * it is a quotation: the person has to be able to recognise their own words in it.
 */
export function AffirmationCard({ text, source, collapsedHint, expanded = false, onToggle, actions }: AffirmationCardProps) {
  const { palette } = useTheme();
  const collapsible = Boolean(onToggle);
  const open = !collapsible || expanded;

  const body = (
    <>
      <Text size="lg" maxFontSizeMultiplier={1.2}>
        {text}
      </Text>
      {source && open ? (
        <View style={[styles.source, { borderTopColor: palette.borderSoft }]}>
          <Text size="xs" tone="tertiary" mono maxFontSizeMultiplier={1.2}>
            {source.label}
          </Text>
          <Text size="xs" tone="secondary" mono maxFontSizeMultiplier={1.2}>
            {`“${source.excerpt}”`}
          </Text>
        </View>
      ) : null}
      {collapsible && !expanded && collapsedHint ? (
        <View style={styles.hint}>
          <Text size="xs" tone="tertiary" maxFontSizeMultiplier={1.2}>
            {collapsedHint}
          </Text>
          <Text size="sm" tone="tertiary">
            ⌄
          </Text>
        </View>
      ) : null}
    </>
  );

  const surface = {
    backgroundColor: open && collapsible ? palette.surface : palette.surfaceMuted,
    borderColor: open && collapsible ? palette.accentBorder : palette.border,
  };

  if (!collapsible) {
    return (
      <View style={[styles.card, surface]}>
        {body}
        {actions ? <View style={styles.actions}>{actions}</View> : null}
      </View>
    );
  }

  return (
    <View style={[styles.card, surface]}>
      <Pressable accessibilityRole="button" accessibilityState={{ expanded }} onPress={onToggle} style={styles.disclosure}>
        {body}
      </Pressable>
      {actions ? <View style={styles.actions}>{actions}</View> : null}
    </View>
  );
}
