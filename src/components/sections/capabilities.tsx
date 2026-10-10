import { CloudIcon, DatabaseIcon, PaletteIcon, SparkleIcon, TreeStructureIcon } from '@phosphor-icons/react/ssr'
import Image from 'next/image'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { cn } from '@/lib/cn'

function Cell({ children, className, delay }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <Reveal delay={delay} className={cn('relative overflow-hidden rounded-[1.75rem] p-7 ring-1 ring-line md:p-9', className)}>
      {children}
    </Reveal>
  )
}

function CellTitle({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-10 items-center justify-center rounded-full bg-fg/6">{icon}</span>
      <h3 className="font-semibold text-xl tracking-tight md:text-2xl">{children}</h3>
    </div>
  )
}

export function Capabilities() {
  return (
    <section id="servicos" className="mx-auto w-full max-w-7xl px-4 py-24 md:px-8 md:py-32">
      <SectionHeading
        title="Onde eu entro no projeto"
        description="Do rascunho da interface à infraestrutura. Assumo o produto inteiro ou a parte que estiver travando o time."
      />

      <div className="mt-14 grid grid-cols-1 gap-4 md:mt-20 md:gap-5 lg:grid-cols-12">
        <Cell className="flex flex-col bg-surface lg:col-span-7 lg:row-span-2">
          <CellTitle icon={<PaletteIcon className="size-5" />}>Produto e interface</CellTitle>
          <p className="mt-4 max-w-[48ch] text-muted leading-relaxed">
            Design de interface, design systems e front-end com React e Next.js. Cuido de hierarquia, acessibilidade, tema claro e
            escuro e performance, sem perder o detalhe do pixel.
          </p>
          <div className="relative mt-8 -mr-9 -mb-9 min-h-[260px] flex-1 overflow-hidden rounded-tl-2xl shadow-soft ring-1 ring-line md:-mr-9 md:-mb-9">
            <Image
              src="/projects/indicadores-dashboard.webp"
              alt="Detalhe da interface do Indicadores OAB-MA"
              fill
              sizes="(min-width: 1024px) 640px, 100vw"
              className="object-cover object-top-left"
            />
          </div>
        </Cell>

        <Cell className="bg-accent text-on-accent ring-0 lg:col-span-5" delay={0.06}>
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-on-accent/10">
              <SparkleIcon weight="fill" className="size-5" />
            </span>
            <h3 className="font-semibold text-xl tracking-tight md:text-2xl">IA aplicada</h3>
          </div>
          <p className="mt-4 max-w-[46ch] leading-relaxed opacity-85">
            Trabalho com agentes de código no dia a dia para projetar, revisar e entregar mais rápido. Também integro LLMs em
            produtos e automatizo processos internos.
          </p>
        </Cell>

        <Cell className="bg-surface lg:col-span-5" delay={0.12}>
          <CellTitle icon={<DatabaseIcon className="size-5" />}>Back-end e APIs</CellTitle>
          <p className="mt-4 max-w-[46ch] text-muted leading-relaxed">
            APIs em Node.js com Fastify, Prisma e PostgreSQL. Autenticação, RBAC, e-mails transacionais, relatórios em PDF e
            documentação com Swagger.
          </p>
        </Cell>

        <Cell
          className="bg-[radial-gradient(circle_at_1px_1px,var(--line)_1px,transparent_0)] bg-surface-2 [background-size:18px_18px] lg:col-span-6"
          delay={0.06}
        >
          <CellTitle icon={<CloudIcon className="size-5" />}>Infra e DevOps</CellTitle>
          <p className="mt-4 max-w-[52ch] text-muted leading-relaxed">
            Docker, Kubernetes, Azure (AZ-900 e AZ-104), Linux, pfSense e Windows Server. Uma base sólida em redes e segurança que
            vem de anos operando infraestrutura.
          </p>
        </Cell>

        <Cell className="bg-surface lg:col-span-6" delay={0.12}>
          <CellTitle icon={<TreeStructureIcon className="size-5" />}>ERP e processos</CellTitle>
          <p className="mt-4 max-w-[52ch] text-muted leading-relaxed">
            Responsável pela gestão do TOTVS Protheus na OAB Maranhão, com participação na implantação conduzida pelo CFOAB. Dou
            suporte às áreas financeira e administrativa e conduzo o alinhamento das integrações com o Conselho Federal.
          </p>
        </Cell>
      </div>
    </section>
  )
}
