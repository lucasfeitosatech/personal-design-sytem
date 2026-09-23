# Galerias

Uma tela por plataforma, exercitando todos os componentes publicados. Servem para validar um
tarball antes de publicar e para olhar os estados lado a lado.

Não fazem parte do pacote: `files` no `package.json` de cada pacote não inclui esta pasta.

## Como validar um tarball

```bash
npm run build
for p in tokens core react react-native; do (cd packages/$p && npm pack --pack-destination /tmp/ds); done

# web
cd <app-web> && npm i /tmp/ds/*design-tokens*.tgz /tmp/ds/*design-core*.tgz /tmp/ds/*components-react-0*.tgz
cp <design-system>/examples/web-gallery.tsx src/ && npm run typecheck && npm run build

# nativo
cd <app-nativo> && npm i /tmp/ds/*design-tokens*.tgz /tmp/ds/*design-core*.tgz /tmp/ds/*components-react-native*.tgz
cp <design-system>/examples/native-gallery.tsx App.tsx && npx tsc --noEmit
npx react-native bundle --platform ios --dev false --entry-file index.js --bundle-output /tmp/ios.jsbundle
```

O que cada passo prova: o typecheck prova que as declarações chegaram no pacote, o build do web prova
que a folha de estilo foi empacotada e entrou no bundle, e o `bundle` do Metro prova que o Node
resolveu as entradas do pacote pelo caminho nativo. Link local (`npm link`) esconde os três.
