import { ArrowUpRightIcon } from '@phosphor-icons/react/ssr'
import { Reveal } from '@/components/reveal'
import { type SideProject, sideProjects } from '@/data/projects'

const cardClass = 'group flex h-full flex-col gap-3 rounded-[1.25rem] bg-surface p-5 ring-1 ring-line'

function CardBody({ project }: { project: SideProject }) {
  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold tracking-tight">{project.name}</h3>
        {project.href ? (
          <ArrowUpRightIcon
            weight="bold"
            className="size-4 shrink-0 text-muted transition-all duration-500 ease-fluid group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-ink"
          />
        ) : null}
      </div>
      <p className="text-muted text-sm leading-relaxed">{project.description}</p>
      <p className="mt-auto pt-2 font-mono text-[11px] text-muted">{project.tags.join(' / ')}</p>
    </>
  )
}

export function MoreProjects() {
  return (
    <section aria-labelledby="mais-projetos" className="mx-auto w-full max-w-7xl px-4 pb-24 md:px-8 md:pb-32">
      <Reveal>
        <h2 id="mais-projetos" className="font-semibold text-2xl tracking-tighter md:text-3xl">
          Mais projetos e estudos
        </h2>
      </Reveal>

      <ul className="scrollbar-none -mx-4 mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
        {sideProjects.map((project, i) => (
          <Reveal
            as="li"
            key={project.name}
            delay={(i % 4) * 0.05}
            className={`w-[80%] shrink-0 snap-start sm:w-auto ${i === 0 ? 'sm:col-span-2' : ''}`}
          >
            {project.href ? (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${cardClass} transition-all duration-500 ease-fluid hover:-translate-y-1 hover:shadow-soft`}
              >
                <CardBody project={project} />
              </a>
            ) : (
              <div className={cardClass}>
                <CardBody project={project} />
              </div>
            )}
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
