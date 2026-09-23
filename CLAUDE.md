# Design system — instruções operacionais

Leia o `README.md` para a forma geral e `docs/component-contracts/README.md` para o estado de cada
componente. Este arquivo é o que você, agente, precisa saber antes de mexer.

## A regra que sustenta tudo

`design-core` nunca importa um renderizador. `components-react` e `components-react-native` nunca se
importam. Os dois consomem `design-tokens` e `design-core`. Nenhum ponto de entrada carrega as duas
renderizações, e os tipos de um não podem referenciar os do outro. É isso que impede o React Native
de entrar no bundle do navegador e o DOM de entrar no build nativo.

## Antes de escrever componente

1. **O contrato primeiro**, em `packages/core/src/contracts/`. Arrays const, depois tipos derivados
   deles, para um renderizador poder iterar os valores em tempo de execução em vez de repetir a união.
2. **Tom semântico, nunca do produto.** `paid`, `overdue` e `skipped` são vocabulário de conta a
   pagar. O sistema fala em `success`, `danger` e `muted`, e a aplicação mapeia o dela. O único lugar
   onde tom encosta em chave de paleta são os mapas `*_TOKEN` no core.
3. **Lógica pura vai para o core**, não para o componente. As máscaras são o exemplo: `formatMoney` e
   `periodValue` são funções puras testadas uma vez e usadas pelos dois lados sem alteração.
4. **Diferença de plataforma se declara, não se esconde.** Se o controle é outro nos dois lados, são
   dois controles. Select é popover no navegador e folha inferior no aparelho porque popover em
   celular cai debaixo do polegar.

## Regras de acessibilidade que já estão pagas

Status nunca só por cor: vem glifo junto (D-03). Anel de foco visível em tudo que recebe foco, com
2px nos campos. `Spinner` exige rótulo. `RadioGroup` no navegador é `fieldset` com `legend` de
verdade, que é o que faz o leitor anunciar "2 de 3". Indeterminado do Checkbox é propriedade do DOM
na web e `accessibilityState` `mixed` no nativo. Placeholder usa o tom terciário, porque o tom
desabilitado reprova em contraste (D-20).

## Comandos

```bash
export NVM_DIR="$HOME/.nvm"; . "$NVM_DIR/nvm.sh"; nvm use 22
npm install
npm run build        # tokens primeiro, depois quem os consome
npm run typecheck    # os quatro pacotes
npx vitest run packages/core
```

O pacote web builda com **Vite**, não tsup: ele publica CSS Modules, e o tsup processa CSS por um
caminho próprio que emite as classes globais sem mapa. Isso compila, passa no typecheck e renderiza
sem estilo nenhum. Não troque de volta.

## Validar antes de publicar

```bash
npm run pack:all                       # gera dist-packages/
npm run install-into -- ../<app>       # copia e instala na superfície certa
```

Sempre por tarball, nunca por `npm link`: link esconde arquivo que ficou de fora do pacote,
declaração não publicada e segunda cópia do React. Depois de instalar, rode o typecheck do app, o
build do web (prova que a folha de estilo foi empacotada) e `react-native bundle` (prova que o Metro
resolveu pelo caminho nativo).

## Nunca

- Editar `packages/tokens/src/`: é gerado. A fonte é `packages/tokens/source/*.tokens.json`.
- Publicar pilha de fontes CSS ou receita de sombra como tema nativo. O aparelho precisa de nome de
  família instalada e de elevação própria.
- Converter `line-height` proporcional direto para `lineHeight` no nativo, onde o valor é altura.
- Acrescentar dependência ao pacote nativo sem necessidade: ele distribui TypeScript de propósito,
  para o Metro compilar com o preset do React Native.

## Lacunas conhecidas e conscientes

Fontes no nativo caem na do sistema até Libre Franklin e IBM Plex Mono serem embutidas no app. A
folha inferior fecha tocando o scrim e não arrastando, porque gesto depende de biblioteca que a
aplicação escolhe. Não existe conjunto de ícones: os glifos são texto.
