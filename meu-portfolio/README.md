# Portfólio — Ramon Lopes

Portfólio pessoal feito com **HTML semântico, CSS e JavaScript puro**. O projeto foi pensado para apresentar minha formação, meu projeto de estoque e meus canais profissionais.

## Como executar

1. Baixe ou clone este repositório.
2. Abra a pasta no Visual Studio Code.
3. Abra `index.html` no navegador. Para uma experiência mais próxima de um site publicado, use uma extensão de servidor local, como Live Server.
4. As fontes Manrope e DM Mono são carregadas do Google Fonts. Se estiver sem internet, o navegador usa fontes alternativas do sistema.

## Funcionalidades

- Layout responsivo para desktop, tablet e celular.
- Menu de navegação móvel com estado acessível via `aria-expanded`.
- Menu móvel fecha ao selecionar uma seção, pressionar `Escape` ou voltar ao layout desktop.
- Link para pular diretamente ao conteúdo principal.
- Destaque da seção visível na navegação, quando o navegador oferece `IntersectionObserver`.
- Ano do rodapé atualizado automaticamente.
- Estados de foco visíveis para navegação por teclado.
- Respeito à preferência do sistema por movimento reduzido.

## Tecnologias

- HTML5
- CSS3 (Grid, Flexbox, variáveis CSS e media queries)
- JavaScript (DOM, eventos e `IntersectionObserver`)

## Estrutura

```text
meu-portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── icons/
│   └── images/
├── pages/
│   └── README.md
└── README.md
```

## Projeto em destaque: Sistema de Estoque em Tempo Real

O projeto é apresentado como uma solução com backend em Java/Spring Boot, banco de dados MySQL e aplicativo Flutter conectado por API REST.

- [Repositório do backend](https://github.com/ramon-lopes/estoque-api-backend)
- [Repositório do aplicativo](https://github.com/ramon-lopes/app-mgr-software)

## Publicação

Este site pode ser publicado gratuitamente pelo GitHub Pages. Depois de enviar os arquivos para um repositório GitHub, abra as configurações do repositório e procure a área **Pages**. Configure a publicação a partir da branch principal e da pasta raiz (`/root`), salve e aguarde o endereço público ser disponibilizado.

## Próximas melhorias

- Adicionar outros projetos com descrição do problema, decisões técnicas e resultados.
- Incluir capturas de tela reais do sistema de estoque.
- Adicionar testes automatizados e verificar o site com ferramentas de acessibilidade.
- Considerar uma página individual para cada projeto quando houver conteúdo suficiente.
