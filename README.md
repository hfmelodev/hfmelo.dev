<div align="center">

# hfmelo.dev

Portfolio pessoal de **Hilquias Ferreira Melo**, desenvolvedor FullStack em São Luís, Maranhão.

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Biome](https://img.shields.io/badge/Biome-2.5-60A5FA?logo=biome&logoColor=white)](https://biomejs.dev)

![Página inicial do portfolio](./docs/preview.webp)

</div>

## Sobre

Site de apresentação com os sistemas que desenhei e desenvolvi de ponta a ponta, da interface à API e à infraestrutura. Reúne projetos em produção para a OAB Maranhão e a CAAMA, produtos próprios, trajetória profissional, formação e contato.

O site é uma página única, prerenderizada de forma estática e sem backend. Todo o conteúdo fica em arquivos de dados tipados, o que torna simples incluir um projeto novo ou ajustar um texto sem mexer nos componentes.

## Destaques técnicos

- **Next.js 16 com App Router**, Cache Components e React Compiler. Todas as rotas, inclusive a imagem Open Graph e o ícone, são geradas no build.
- **Tema escuro por padrão**, com alternância manual que fica salva no navegador (`next-themes`).
- **Screenshots que acompanham o tema**: quando existe a mesma tela nos modos claro e escuro, a imagem troca junto com o site, e só a versão visível é carregada.
- **Animações com Motion** (entrada por scroll, menu mobile e microinterações), desligadas automaticamente para quem usa `prefers-reduced-motion`.
- **Design system próprio em Tailwind CSS 4**: tokens de cor em OKLCH, um único acento, raios e sombras padronizados.
- **Acessibilidade**: navegação por teclado, textos alternativos, contraste AA e marcação semântica (`nav`, `ol`, `dl`).
- **SEO e compartilhamento**: metadados completos, `lang="pt-BR"` e imagem Open Graph gerada com `next/og`.
- **Cuidado com dados nos prints**: dados pessoais de terceiros e credenciais foram recortados ou pixelados antes de entrar no repositório.

## Stack

| Camada | Tecnologias |
| --- | --- |
| Framework | Next.js 16, React 19, React Compiler |
| Linguagem | TypeScript 5 |
| Estilo | Tailwind CSS 4, `clsx`, `tailwind-merge` |
| Animação | Motion |
| Ícones | Phosphor Icons, Simple Icons |
| Tema | next-themes |
| Qualidade | Biome (lint, formatação e ordenação de classes) |
| Gerenciador | pnpm |

## Como rodar

Pré-requisitos: Node.js 20.9 ou superior e pnpm.

```bash
pnpm install   # instala as dependências
pnpm dev       # http://localhost:3000
```

| Script | O que faz |
| --- | --- |
| `pnpm dev` | Ambiente de desenvolvimento |
| `pnpm build` | Build de produção |
| `pnpm start` | Servidor de produção a partir do build |
| `pnpm lint` | Verificação com Biome |
| `pnpm format` | Formatação com Biome |

## Estrutura

```
src/
  app/            layout, página, estilos globais, ícone e imagem Open Graph
  components/
    sections/     seções da página (hero, projetos, serviços, sobre, trajetória, contato)
    ui/           componentes reutilizáveis (botões, títulos de seção)
  data/           conteúdo do site: perfil, experiências, formação e projetos
  lib/            utilitários
  assets/         arquivos usados na geração da imagem Open Graph
public/
  projects/       screenshots dos projetos (WebP)
docs/             imagens do README
```

## Editando o conteúdo

Não é preciso mexer nos componentes para atualizar o site:

- **`src/data/profile.ts`**: nome, cargo, contatos, números da seção "Sobre", experiências, formação e certificações.
- **`src/data/projects.ts`**: projetos em destaque (com screenshot, stack e link) e a lista de projetos menores.

Para incluir um projeto em destaque, adicione o screenshot em `public/projects/` e uma nova entrada em `featuredProjects`. O campo `url` é opcional: sem ele, o card aparece sem o botão "Visitar". Para screenshots com versão clara e escura da mesma tela, informe `srcLight`.

## Contato

- E-mail: [hfmelodev@gmail.com](mailto:hfmelodev@gmail.com)
- LinkedIn: [linkedin.com/in/hfmelodev](https://www.linkedin.com/in/hfmelodev)
- Instagram: [@hilquiasfmelo](https://www.instagram.com/hilquiasfmelo/)
- GitHub: [@hfmelodev](https://github.com/hfmelodev)

## Licença

O código está disponível para consulta e estudo. Textos, fotos e screenshots dos projetos pertencem a Hilquias Ferreira Melo e às respectivas instituições, e não devem ser reutilizados sem autorização.
