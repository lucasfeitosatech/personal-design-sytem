/** Gallery: every component and state, for validating a tarball on a device. */
import {
  Button, Card, Checkbox, Chip, Divider, EmptyState, Modal, PasswordField, RadioGroup, Section, Select,
  Spinner, Switch, Text, Textarea, TextField, ThemeProvider, Toast, ToastRegion,
} from '@lucasfeitosatech/components-react-native';
import { BUTTON_VARIANTS } from '@lucasfeitosatech/design-core';
import { darkPalette, lightPalette, space } from '@lucasfeitosatech/design-tokens';
import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, useColorScheme, View } from 'react-native';
import { CHIP_TONES } from '@lucasfeitosatech/design-core';

function Screen() {
  const [empty, setEmpty] = useState('');
  const [filled, setFilled] = useState('Lucas Feitosa');
  const [note, setNote] = useState('');
  const [secret, setSecret] = useState('senha-secreta');
  const [on, setOn] = useState(true);
  const [checked, setChecked] = useState<boolean | 'indeterminate'>('indeterminate');
  const [choice, setChoice] = useState('mensal');
  const [picked, setPicked] = useState('accent');
  const [banco, setBanco] = useState('nubank');
  const [confirm, setConfirm] = useState(false);
  const [toast, setToast] = useState<'default' | 'error' | null>(null);
  const palette = useColorScheme() === 'dark' ? darkPalette : lightPalette;

  return (
    <SafeAreaView style={[styles.fill, { backgroundColor: palette.bgPage }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text size="2xl" weight="semibold">Componentes</Text>

        <Card tone="raised" style={styles.card}>
          {BUTTON_VARIANTS.map((v) => <Button key={v} variant={v}>{v}</Button>)}
          <Button variant="primary" loading>carregando</Button>
        </Card>

        <Card style={styles.card}>
          <TextField label="Vazio" hint="rótulo em repouso" value={empty} onValueChange={setEmpty} />
          <TextField label="Preenchido" value={filled} onValueChange={setFilled} />
          <TextField label="Valor" mono mode="decimal" value="1.234,56" onValueChange={() => {}} prefix={<Text tone="tertiary">R$</Text>} />
          <PasswordField label="Senha" value={secret} onValueChange={setSecret} />
          <TextField label="Com erro" error="Obrigatório" value="" onValueChange={() => {}} />
          <TextField label="Desabilitado" disabled value="não editável" onValueChange={() => {}} />
        </Card>

        <Card style={styles.card}>
          <Textarea label="Anotação" hint="cresce com o texto" rows={3} maxRows={8} value={note} onValueChange={setNote} />
        </Card>

        <Card style={styles.card}>
          <Switch checked={on} onCheckedChange={setOn} label="Usar IA neste espaço" description="Nada é gerado sem um toque seu." />
          <Switch checked={false} onCheckedChange={() => {}} label="Desabilitado" disabled />
          <View style={styles.divider} />
          <Checkbox checked={checked} onCheckedChange={(v) => setChecked(v)} label="Selecionar tudo" description="parcialmente marcado" />
          <Checkbox checked={false} onCheckedChange={() => {}} label="Com erro" error="Escolha ao menos um" />
          <View style={styles.divider} />
          <RadioGroup
            label="Recorrência"
            value={choice}
            onValueChange={setChoice}
            options={[
              { value: 'mensal', label: 'Mensal', description: 'todo mês, no mesmo dia' },
              { value: 'anual', label: 'Anual' },
              { value: 'unica', label: 'Única', disabled: true },
            ]}
          />
          <Spinner label="Carregando" />
        </Card>

        <Section title="Etiquetas" meta="6 tons" action={<Text size="xs" tone="accent">ver todos</Text>}>
          <View style={styles.chips}>
            {CHIP_TONES.map((t) => (
              <Chip key={t} label={t} tone={t} selected={picked === t} onPress={() => setPicked(t)} />
            ))}
          </View>
          <Divider />
          <View style={styles.chips}>
            <Chip label="1.234,56" tone="neutral" mono />
            <Chip label="removível" tone="accent" onRemove={() => {}} />
          </View>
        </Section>

        <EmptyState
          title="Nada registrado em setembro ainda."
          body="Comece marcando uma prática ou escrevendo uma linha."
          actions={<Button variant="secondary" size="sm">Escrever no diário</Button>}
        />
        <EmptyState tone="error" title="Não foi possível carregar." actions={<Button variant="primary" size="sm">Tentar de novo</Button>} />

        <Card style={styles.card}>
          <Select
            label="Banco"
            hint="abre uma folha, não um popover"
            value={banco}
            onValueChange={setBanco}
            options={[
              { value: 'nubank', label: 'Nubank', description: 'conta corrente' },
              { value: 'itau', label: 'Itaú' },
              { value: 'bb', label: 'Banco do Brasil' },
              { value: 'caixa', label: 'Caixa', disabled: true },
            ]}
          />
          <Select label="Vazio" placeholder="Selecione" options={[{ value: 'a', label: 'Opção A' }]} onValueChange={() => {}} />
          <Select label="Com erro" error="Escolha um banco" options={[{ value: 'a', label: 'Opção A' }]} onValueChange={() => {}} />
          <Button variant="danger" onPress={() => setConfirm(true)}>Abrir confirmação</Button>
          <Button variant="secondary" onPress={() => setToast('default')}>Mostrar aviso</Button>
          <Button variant="ghost" onPress={() => setToast('error')}>Mostrar erro</Button>
        </Card>
      </ScrollView>

      <Modal
        open={confirm}
        alert
        title="Excluir a conta Netflix?"
        body="As ocorrências já pagas continuam no histórico. Isso não pode ser desfeito."
        primaryAction={{ label: 'Excluir', onPress: () => setConfirm(false) }}
        secondaryAction={{ label: 'Cancelar' }}
        onClose={() => setConfirm(false)}
        safeBottom={34}
      />

      <ToastRegion tabBar={0} safeBottom={34}>
        {toast ? (
          <Toast
            message={toast === 'error' ? 'Não foi possível salvar.' : 'Conta marcada como paga.'}
            tone={toast}
            actionLabel={toast === 'default' ? 'Desfazer' : undefined}
            onAction={() => setToast(null)}
            onDismiss={() => setToast(null)}
          />
        ) : null}
      </ToastRegion>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Screen />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  content: { padding: space[4], gap: space[4] },
  card: { gap: space[4] },
  divider: { height: 1, backgroundColor: '#00000014' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
});
