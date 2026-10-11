/** Mensagem que já vem preenchida no WhatsApp, para identificar quem chegou pelo site. */
const whatsappMessage =
  'Olá, Hilquias! Conheci seu trabalho pelo portfólio hfmelo.dev e gostaria de conversar sobre um projeto. Podemos falar?'

export const profile = {
  name: 'hfmelo.dev',
  fullName: 'Hilquias Ferreira Melo',
  shortName: 'Hilquias',
  role: 'Desenvolvedor FullStack',
  location: 'São Luís, Maranhão',
  email: 'hfmelodev@gmail.com',
  phone: '(98) 98329-1170',
  whatsapp: `https://wa.me/5598983291170?text=${encodeURIComponent(whatsappMessage)}`,
  github: 'https://github.com/hfmelodev',
  instagram: 'https://www.instagram.com/hilquiasfmelo/',
  linkedin: 'https://www.linkedin.com/in/hfmelodev',
  site: 'https://hfmelo.dev',
}

export const stats = [
  { value: '5', label: 'anos construindo produtos FullStack' },
  { value: '26', label: 'repositórios públicos no GitHub' },
  { value: '9 mil+', label: 'atendimentos registrados no OAB Atende' },
  { value: '27 mil+', label: 'advogados na base dos sistemas da OAB-MA' },
]

export const experience = [
  {
    period: 'Jul 2023 - atual',
    role: 'Coordenador de Tecnologia',
    company: 'OAB Seccional do Maranhão',
    summary:
      'Lidero a equipe de TI, coordeno os projetos de tecnologia da Seccional e conduzo a gestão do TOTVS Protheus. Também desenho e desenvolvo os sistemas internos e públicos da OAB-MA.',
  },
  {
    period: 'Ago 2021 - Jul 2023',
    role: 'Analista de Suporte em TI',
    company: 'OAB Seccional do Maranhão',
    summary:
      'Suporte avançado em hardware, software e rede, diagnóstico de problemas complexos com documentação estruturada e manutenção da infraestrutura.',
  },
  {
    period: 'Jul 2019 - Ago 2021',
    role: 'Técnico em Informática',
    company: 'Hospital Dr. Clementino Moura (Socorrão II)',
    summary: 'Infraestrutura e resolução de incidentes críticos em um ambiente hospitalar de alta demanda.',
  },
  {
    period: 'Jan 2017 - Ago 2021',
    role: 'Técnico em Informática',
    company: 'SLZ Informática',
    summary: 'Suporte terceirizado com SLA rigoroso para uma rede de 9 clínicas médicas.',
  },
]

export const education = [
  {
    year: '2020',
    title: 'Análise e Desenvolvimento de Sistemas',
    school: 'FACAM, Faculdade do Maranhão',
    note: 'Graduado com honras, melhor aluno 2018-2019',
  },
  {
    year: '2020',
    title: 'Ignite e GoStack FullStack',
    school: 'Rocketseat',
    note: 'Formação intensiva em desenvolvimento web',
  },
  {
    year: '2017',
    title: 'Técnico em Informática',
    school: 'Faculdade Laboro',
    note: 'Formação técnica em TI',
  },
]

export const certifications = [
  'Microsoft Azure AZ-900',
  'Microsoft Azure AZ-104',
  'Formação Next.js',
  'Criando SaaS com Next.js e RBAC',
  'Node.js',
  'Masterizando o Tailwind',
  'Redux e Zustand',
]
