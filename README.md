# 🔴 Clima em Marte

App React Native que exibe dados meteorológicos simulados e reais do rover Curiosity da NASA em Marte.

## Funcionalidades

| Tela | Conteúdo |
|------|----------|
| **Clima** | Sol atual, hora local em Marte (ao vivo), temperatura mín/máx, pressão, UV, nascer/pôr do sol, atmosfera |
| **Alertas** | Alertas simulados de impactos meteóricos com níveis de criticidade (dados mockados) |
| **Marte** | Curiosidades sobre o planeta, histórico de missões, glossário de termos e fonte dos dados |

A tela de Clima também dá acesso ao **Histórico de Sols** — os últimos 7 dias marcianos registrados pelo REMS.

## Fonte dos Dados

API oficial da NASA: `https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json`

Os dados vêm do instrumento **REMS** (Rover Environmental Monitoring Station) do Curiosity, localizado na Cratera Gale (137,4°E), e são atualizados periodicamente conforme transmissões do rover para a Terra. Não é necessária chave de API.

> Os dados de alertas meteóricos são **simulados** seguindo o modelo de banco de dados do projeto.

## Como Rodar

### Pré-requisitos

- Node.js 18+
- App **Expo Go** instalado no celular ([iOS](https://apps.apple.com/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

### Instalação

```bash
npm install
npx expo start
```

Escaneie o QR code com o Expo Go para abrir no celular.


## Estrutura do Projeto

```
MarsWeather/
├── app/
│   ├── _layout.tsx        # Layout raiz e barra de abas
│   ├── index.tsx          # Tela: Clima
│   ├── alerts.tsx         # Tela: Alertas
│   ├── about.tsx          # Tela: Marte
│   └── history.tsx        # Tela: Histórico de Sols
├── components/
│   └── UI.tsx             # Componentes reutilizáveis
├── styles/
│   ├── clima.styles.ts    # Estilos da tela Clima
│   ├── alertas.styles.ts  # Estilos da tela Alertas
│   ├── marte.styles.ts    # Estilos da tela Marte
│   ├── historico.styles.ts# Estilos da tela Histórico
│   └── ui.styles.ts       # Estilos dos componentes UI
├── services/
│   └── maas2.ts           # Cliente da API NASA + funções auxiliares
├── constants/
│   └── theme.ts           # Cores, tipografia e espaçamentos
└── assets/
    └── mars_bg.jpg        # Imagem de fundo (substituível)
```

## Tecnologias

- [Expo](https://expo.dev) (managed workflow)
- [Expo Router](https://expo.github.io/router) — navegação baseada em arquivos
- [TypeScript](https://www.typescriptlang.org)
- Fontes: [Orbitron](https://fonts.google.com/specimen/Orbitron) + [Exo 2](https://fonts.google.com/specimen/Exo+2) via `@expo-google-fonts`
