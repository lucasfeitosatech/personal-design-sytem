import type { SectionContract } from '@lucasfeitosatech/design-core';
import { View, type ViewProps } from 'react-native';
import { Card } from '../Card';
import { Text } from '../Text';
import { styles } from './styles';

export type SectionProps = Omit<ViewProps, 'children'> & SectionContract;

/** A titled block. Sentence case heading, mono meta on the right, one quiet action (D-18). */
export function Section({ title, meta, action, style, children, ...rest }: SectionProps) {
  return (
    <Card style={[styles.section, style]} {...rest}>
      <View style={styles.header}>
        <View style={styles.heading}>
          <Text size="md" weight="semibold" accessibilityRole="header">
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
      {children}
    </Card>
  );
}
