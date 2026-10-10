import { ArrowUpRightIcon, SealCheckIcon } from '@phosphor-icons/react/ssr'
import Image from 'next/image'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { featuredProjects, type Project } from '@/data/projects'
import { cn } from '@/lib/cn'

function Shot({ project, sizes, className }: { project: Project; sizes: string; className?: string }) {
  const { image } = project

  return (
    <div className={cn('relative overflow-hidden bg-surface-2', className)}>
      <div className="absolute inset-x-5 top-5 bottom-0 overflow-hidden rounded-t-xl shadow-soft ring-1 ring-line transition-transform duration-700 ease-fluid group-hover:-translate-y-1.5 md:inset-x-8 md:top-8">
        {image.srcLight ? (
          <>
            <Image src={image.srcLight} alt={image.alt} fill sizes={sizes} className="object-cover object-top-left dark:hidden" />
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={sizes}
              className="hidden object-cover object-top-left dark:block"
            />
          </>
        ) : (
          <Image src={image.src} alt={image.alt} fill sizes={sizes} className="object-cover object-top-left" />
        )}
      </div>
    </div>
  )
}

function Meta({ project, large }: { project: Project; large?: boolean }) {
  return (
    <div className={cn('flex flex-col', large ? 'gap-5 p-7 md:p-10' : 'gap-4 p-6 md:p-8')}>
      <p className="font-mono text-muted text-xs">{project.client}</p>
      <h3 className={cn('font-semibold tracking-tighter', large ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl')}>
        {project.name}
      </h3>
      <p className="max-w-[56ch] text-muted leading-relaxed">{project.summary}</p>

      {project.highlight ? (
        <p className="flex items-center gap-2 font-medium text-accent-ink text-sm">
          <SealCheckIcon weight="fill" className="size-4" />
          {project.highlight}
        </p>
      ) : null}

      <ul className="flex flex-wrap gap-1.5">
        {project.stack.map(tech => (
          <li key={tech} className="rounded-full bg-fg/5 px-2.5 py-1 text-[12px] text-muted">
            {tech}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-fg px-4 py-2 font-medium text-bg text-sm transition-all duration-300 hover:bg-fg/90 active:scale-[0.98]"
          >
            Visitar
            <ArrowUpRightIcon weight="bold" className="size-3.5" />
            <span className="sr-only">{project.name}</span>
          </a>
        ) : null}
      </div>
    </div>
  )
}

/** Casca externa + núcleo interno (double-bezel). */
function Shell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <article className={cn('group rounded-[1.75rem] bg-fg/[0.025] p-1.5 ring-1 ring-line', className)}>
      <div className="flex h-full flex-col overflow-hidden rounded-[calc(1.75rem-0.375rem)] bg-surface shadow-[inset_0_1px_0_oklch(1_0_0/0.06)]">
        {children}
      </div>
    </article>
  )
}

export function Work() {
  const [pje, atende, indicadores, labcode, salalivre, training, qrcode, descontolegal] = featuredProjects

  return (
    <section id="projetos" className="mx-auto w-full max-w-7xl px-4 py-24 md:px-8 md:py-32">
      <SectionHeading
        title="Trabalhos selecionados"
        description="Sistemas em produção que eu desenhei e desenvolvi de ponta a ponta, da interface à API e ao deploy."
      />

      <div className="mt-14 grid grid-cols-1 gap-4 md:mt-20 md:gap-5 lg:grid-cols-12">
        <Reveal className="lg:col-span-12">
          <Shell>
            <div className="grid lg:grid-cols-12">
              <Shot
                project={pje}
                sizes="(min-width: 1024px) 760px, 100vw"
                className="h-[260px] sm:h-[360px] lg:col-span-7 lg:h-auto lg:min-h-[480px]"
              />
              <div className="lg:col-span-5">
                <Meta project={pje} large />
              </div>
            </div>
          </Shell>
        </Reveal>

        <Reveal className="lg:col-span-7">
          <Shell className="h-full">
            <Shot project={atende} sizes="(min-width: 1024px) 720px, 100vw" className="h-[240px] md:h-[320px]" />
            <Meta project={atende} />
          </Shell>
        </Reveal>

        <Reveal className="lg:col-span-5" delay={0.08}>
          <Shell className="h-full">
            <Shot project={indicadores} sizes="(min-width: 1024px) 520px, 100vw" className="h-[240px] md:h-[320px]" />
            <Meta project={indicadores} />
          </Shell>
        </Reveal>

        <Reveal className="lg:col-span-5">
          <Shell className="h-full">
            <Shot project={labcode} sizes="(min-width: 1024px) 520px, 100vw" className="h-[240px] md:h-[320px]" />
            <Meta project={labcode} />
          </Shell>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={0.08}>
          <Shell className="h-full">
            <Shot project={salalivre} sizes="(min-width: 1024px) 720px, 100vw" className="h-[240px] md:h-[320px]" />
            <Meta project={salalivre} />
          </Shell>
        </Reveal>

        <Reveal className="lg:col-span-12">
          <Shell>
            <div className="grid lg:grid-cols-12">
              <Shot
                project={descontolegal}
                sizes="(min-width: 1024px) 760px, 100vw"
                className="h-[260px] sm:h-[360px] lg:order-2 lg:col-span-7 lg:h-auto lg:min-h-[480px]"
              />
              <div className="lg:order-1 lg:col-span-5">
                <Meta project={descontolegal} large />
              </div>
            </div>
          </Shell>
        </Reveal>

        <Reveal className="lg:col-span-7">
          <Shell className="h-full">
            <Shot project={training} sizes="(min-width: 1024px) 720px, 100vw" className="h-[240px] md:h-[320px]" />
            <Meta project={training} />
          </Shell>
        </Reveal>

        <Reveal className="lg:col-span-5" delay={0.08}>
          <Shell className="h-full">
            <Shot project={qrcode} sizes="(min-width: 1024px) 520px, 100vw" className="h-[240px] md:h-[320px]" />
            <Meta project={qrcode} />
          </Shell>
        </Reveal>
      </div>
    </section>
  )
}
