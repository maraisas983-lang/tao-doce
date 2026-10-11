# Tão Doce — Doceria Gourmet

Site organizado a partir do HTML original, que permanece intacto na pasta Downloads.

## Estrutura

- `index.html`: estrutura da página, navegação e rodapé.
- `css/styles.css`: estilos, animações e regras de responsividade.
- `js/config.js`: telefone, WhatsApp e informações da doceria.
- `js/products.js`: categorias, descrições e dados dos produtos.
- `js/assets.js`: caminhos das imagens e sequência de quadros da animação.
- `js/app.js`: telas, navegação, filtros, animações e interações.
- `assets/images/`: fotos, logo e elementos decorativos.
- `assets/frames/`: quadros WebP da animação principal, na ordem original.

## Como abrir

Abra `index.html` no navegador. Mantenha as pastas `css`, `js` e `assets` ao lado dele.
As fontes do Google precisam de conexão com a internet.

Para usar um servidor local, execute na pasta do projeto:

```powershell
python -m http.server 8000
```

Depois, acesse `http://localhost:8000`.

## Como editar

Atualize os contatos em `js/config.js` e o catálogo em `js/products.js`.
Para trocar uma foto, adicione o arquivo a `assets/images/` e atualize seu caminho
em `js/assets.js` ou no campo `imagem` do produto. Os caminhos são relativos ao HTML.

Os scripts são carregados na ordem indicada no HTML: imagens, configurações,
produtos e aplicação. Essa ordem permite abrir o site diretamente, sem compilação.

Os estilos mantêm sua ordem original para preservar a prioridade das regras CSS.
Os textos provisórios, os contatos e as funcionalidades do arquivo original foram mantidos.
As dependências existentes do Capacitor também foram preservadas; esta organização
não configura nem gera um aplicativo Android.

## Formatação

```powershell
npm install
npm run format
npm run format:check
```
