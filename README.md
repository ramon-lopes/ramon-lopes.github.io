# Portfólio — Ramon Lopes

Portfólio pessoal feito com **HTML semântico, CSS e JavaScript puro**. O projeto apresenta minha trajetória acadêmica, meu projeto de estoque e meus canais profissionais.

## Como executar

1. Baixe ou clone este repositório.
2. Abra a pasta no Visual Studio Code.
3. Abra `index.html` no navegador. Para uma experiência mais próxima de um site publicado, use uma extensão de servidor local, como Live Server.
4. As fontes Manrope e DM Mono são carregadas do Google Fonts. Sem internet, o navegador usa fontes alternativas do sistema.

## Foto de perfil

Para adicionar a foto pessoal na seção **Início**:

1. Coloque a imagem dentro da pasta `assets/`.
2. Dê ao arquivo o nome `foto-perfil.jpg`.
3. Mantenha esse nome e caminho ou atualize o atributo `src` da imagem `.profile-photo` em `index.html`.

A imagem de reserva `assets/foto-perfil-placeholder.svg` aparece automaticamente enquanto a foto pessoal não estiver no projeto. Uma foto vertical, com rosto e ombros visíveis e boa iluminação, funciona melhor no enquadramento atual.

## Funcionalidades

- Layout responsivo para desktop, tablet e celular.
- Retrato de perfil com imagem de reserva automática.
- Menu móvel acessível, com fechamento por seleção, tecla `Escape` ou retorno ao layout desktop.
- Destaque automático da seção atual na navegação.
- Link para pular diretamente ao conteúdo principal.
- Ano do rodapé atualizado automaticamente.
- Estados de foco visíveis para navegação por teclado.
- Respeito à preferência do sistema por movimento reduzido.

## Tecnologias

- HTML5
- CSS3 (Grid, Flexbox, variáveis CSS e media queries)
- JavaScript (DOM, eventos e `requestAnimationFrame`)

## Estrutura

```text
meu-portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   └── foto-perfil-placeholder.svg
├── pages/
│   └── README.md
└── README.md
```

## Projeto em destaque: Sistema de Estoque em Tempo Real

O projeto é apresentado como uma solução com backend em Java/Spring Boot, banco de dados MySQL e aplicativo Flutter conectado por API REST.

- [Repositório do backend](https://github.com/ramon-lopes/estoque-api-backend)
- [Repositório do aplicativo](https://github.com/ramon-lopes/app-mgr-software)

## Publicação

O site está preparado para publicação pelo GitHub Pages a partir da branch principal e da pasta raiz do repositório.

## Próximas melhorias

- Adicionar a foto pessoal em `assets/foto-perfil.jpg`.
- Incluir capturas de tela reais do sistema de estoque.
- Adicionar outros projetos quando estiverem suficientemente completos para apresentação.
- Verificar o site com ferramentas de acessibilidade e em diferentes tamanhos de tela.
