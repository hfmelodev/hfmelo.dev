export type ProjectImage = {
  src: string
  /** Versão alternativa exibida no tema claro, quando existir a mesma tela nos dois temas. */
  srcLight?: string
  width: number
  height: number
  alt: string
}

export type Project = {
  slug: string
  name: string
  client: string
  summary: string
  highlight?: string
  stack: string[]
  image: ProjectImage
  url?: string
}

export const featuredProjects: Project[] = [
  {
    slug: 'pje',
    name: 'pJe OAB',
    client: 'OAB Maranhão',
    summary:
      'Hub que reúne os tribunais brasileiros que usam o Processo Judicial Eletrônico, além de INSS Digital, Área Criminal, SEI, Portal da Advocacia e o status de cada sistema.',
    highlight: 'Acesso direto aos tribunais de todos os estados',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Radix UI', 'Zod', 'Vercel'],
    image: {
      src: '/projects/pje-dark.webp',
      srcLight: '/projects/pje-light.webp',
      width: 1600,
      height: 1000,
      alt: 'Tela inicial do pJe OAB com a seleção de estado e tribunal',
    },
    url: 'https://pje.oabma.org.br',
  },
  {
    slug: 'atende',
    name: 'OAB Atende',
    client: 'OAB Maranhão',
    summary:
      'Registro e acompanhamento dos atendimentos à advocacia maranhense, com dashboards por período, rankings, relatório em PDF e gestão de serviços e funcionários.',
    highlight: '9.240 atendimentos registrados',
    stack: ['Next.js', 'TanStack Query', 'Recharts', 'Fastify', 'Prisma', 'PostgreSQL', 'Resend'],
    image: {
      src: '/projects/atende-dashboard.webp',
      width: 1600,
      height: 875,
      alt: 'Dashboard do OAB Atende com atendimentos por mês, por ano e por dia',
    },
    url: 'https://atende.oabma.org.br',
  },
  {
    slug: 'indicadores',
    name: 'Indicadores OAB-MA',
    client: 'Diretoria da OAB Maranhão',
    summary:
      'Painel de indicadores do cadastro de advogados: adimplência, faixa etária, subseções, anos de contribuição e relatórios para a tomada de decisão da Diretoria.',
    highlight: '27.399 advogados ativos analisados',
    // TODO: confirmar a stack do Indicadores (repositório privado).
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Gráficos'],
    image: {
      src: '/projects/indicadores-dashboard.webp',
      width: 1600,
      height: 1000,
      alt: 'Visão cadastral do Indicadores com adimplência e compromissos por ano',
    },
  },
  {
    slug: 'labcode',
    name: 'LabCode',
    client: 'Produto próprio',
    summary:
      'Plataforma de cursos online com player de vídeo, progresso por aula, comentários em thread, ranking de alunos, pagamentos e painel administrativo com drag-and-drop.',
    stack: ['Next.js 16', 'React 19', 'Prisma 7', 'PostgreSQL', 'Clerk', 'Cloudflare R2', 'Asaas'],
    image: {
      src: '/projects/labcode-dark.webp',
      srcLight: '/projects/labcode-light.webp',
      width: 1488,
      height: 930,
      alt: 'Catálogo de cursos do LabCode',
    },
    url: 'https://labcode.hit.dev.br',
  },
  {
    slug: 'salalivre',
    name: 'Sala Livre',
    client: 'Produto SaaS',
    summary:
      'Gestão das salas da advocacia: libera computadores após validar a adimplência, acompanha sessões em tempo real e organiza a fila de impressão de cada sala.',
    highlight: 'Liberação de computadores em segundos, com validação de adimplência',
    // TODO: confirmar a stack do Sala Livre.
    stack: ['Next.js', 'TypeScript', 'Tempo real', 'Agente desktop'],
    image: {
      src: '/projects/salalivre.webp',
      width: 1600,
      height: 1000,
      alt: 'Página inicial do Sala Livre com o painel de liberações',
    },
    url: 'https://web.salalivre.app',
  },
  {
    slug: 'training',
    name: 'Training',
    client: 'Produto próprio',
    summary:
      'PWA de treino que mostra o treino do dia, ensina a execução com vídeo e conduz a sessão com cardio, cronômetro de descanso e alertas. Multiusuário, funciona offline e monta a dieta com IA.',
    highlight: 'Dieta gerada por IA com validação no servidor',
    stack: ['Next.js 16', 'Prisma 7', 'PostgreSQL', 'Better Auth', 'AI SDK', 'Zustand', 'PWA'],
    image: {
      src: '/projects/training-dashboard.webp',
      width: 1640,
      height: 930,
      alt: 'Tela inicial do Training com o treino do dia, a semana e as métricas',
    },
    url: 'https://training.hit.dev.br',
  },
  {
    slug: 'qrcode',
    name: 'QR Code Wi-Fi',
    client: 'OAB Maranhão',
    summary:
      'Gera papéis de parede institucionais com QR Code de Wi-Fi para as salas de atendimento, com templates da Seccional, preview em tempo real e histórico.',
    // TODO: confirmar a stack do QR Code Wi-Fi.
    stack: ['Next.js', 'Prisma', 'Supabase', 'Canvas', 'Sharp'],
    image: {
      src: '/projects/qrcode-wallpaper.webp',
      width: 1260,
      height: 860,
      alt: 'Gerador de wallpaper com QR Code Wi-Fi e o preview do papel de parede',
    },
  },
  {
    slug: 'descontolegal',
    name: 'Desconto Legal',
    client: 'CAAMA Maranhão',
    summary:
      'Divulgação e gestão das empresas conveniadas da CAAMA, organizadas por cidade e categoria. Área pública para consultar os benefícios e painel administrativo para empresas, cidades, categorias e usuários.',
    highlight: 'Convênios para a advocacia em todo o Maranhão',
    stack: ['Next.js 16', 'React 19', 'Prisma', 'PostgreSQL', 'Auth.js', 'Supabase Storage', 'Radix UI'],
    image: {
      src: '/projects/descontolegal.webp',
      width: 1600,
      height: 1000,
      alt: 'Página inicial do Desconto Legal com o programa de vantagens da CAAMA',
    },
    url: 'https://descontolegal.caama.org.br',
  },
]

export type SideProject = {
  name: string
  description: string
  tags: string[]
  href?: string
}

export const sideProjects: SideProject[] = [
  {
    name: 'Eventos OAB-MA',
    description: 'Agenda e compartilhamento de todos os eventos da Seccional.',
    tags: ['React', 'Vite', 'GraphQL'],
    href: 'https://eventos.oabma.org.br',
  },
  {
    name: 'Nomos',
    description: 'Solicitações de acesso dos advogados ao INSS Digital (GERID).',
    tags: ['React', 'Fastify', 'Prisma'],
    href: 'https://web-nomos.vercel.app',
  },
  {
    name: 'Craft Resume',
    description: 'Criador de currículos interativo, do zero até o deploy.',
    tags: ['Next.js', 'Tiptap', 'shadcn/ui'],
  },
  {
    name: 'Board',
    description: 'Board público de roadmap inspirado no Featurebase.',
    tags: ['Next.js', 'React Compiler'],
  },
  {
    name: 'Mercado Fácil',
    description: 'Lista de supermercado para montar em casa e marcar no corredor.',
    tags: ['Next.js', 'Prisma', 'TanStack Query'],
  },
  {
    name: 'Bunker CSV',
    description: 'Processamento massivo de CSV com ingestão automatizada e persistência.',
    tags: ['Fastify', 'Prisma', 'Multipart'],
  },
  {
    name: 'Nexus',
    description: 'API de fórum escalável construída com Domain-Driven Design.',
    tags: ['Fastify', 'DDD', 'Vitest'],
  },
]
