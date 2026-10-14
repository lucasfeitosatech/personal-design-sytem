import type { SectionContract } from '@lucasfeitosatech/design-core';
import { View, type ViewProps } from 'react-native';
import { Card } from '../Card';
import { Text } from '../Text';
import { useTheme } from '../theme/ThemeProvider';
import { styles } from './styles';

export type SectionProps = Omit<ViewProps, 'children'> & SectionContract;

/**
 * A titled block. Sentence case heading, mono meta on the right, one quiet action (D-18).
 * `card` frames the block; `plain` opens it, separated from the previous one by a hairline.
 */
export function Section({ title, meta, action, variant = 'card', style, children, ...rest }: SectionProps) {
  const { palette } = useTheme();
  const plain = variant === 'plain';
  const header = (
    <View style={styles.header}>
      <View style={styles.heading}>
        <Text size={plain ? 'lg' : 'md'} weight={plain ? 'medium' : 'semibold'} style={plain ? styles.plainTitle : undefined} accessibilityRole="header">
          {title}
        </Text>
        {meta !== undefined && meta !== null ? (
          <Text size="xs" tone="tertiary" mono>
            {meta}
          </Text>
        ) : null}
      </View>
      {action ? <View style={styles.action}>{action}</View> : null}
    </View>
  );
  if (plain) {
    return (
      <View style={[styles.section, styles.plain, { borderTopColor: palette.border }, style]} {...rest}>
        {header}
        {children}
      </View>
    );
  }
  return (
    <Card style={[styles.section, style]} {...rest}>
      {header}
      {children}
    </Card>
  );
}
