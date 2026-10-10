import { CertificateIcon } from '@phosphor-icons/react/ssr'
import { Reveal } from '@/components/reveal'
import { certifications, education, experience } from '@/data/profile'

export function Experience() {
  return (
    <section id="trajetoria" className="mx-auto w-full max-w-7xl px-4 py-24 md:px-8 md:py-32">
      <div className="grid gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <Reveal className="md:sticky md:top-28">
            <h2 className="font-semibold text-4xl leading-[1.05] tracking-tighter md:text-5xl">Trajetória</h2>
            <p className="mt-5 max-w-[34ch] text-muted leading-relaxed">
              Da bancada de suporte à coordenação de tecnologia, sempre perto de quem usa o sistema.
            </p>
          </Reveal>
        </div>

        <ol className="relative md:col-span-8">
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-[5px] w-px bg-line" />
          {experience.map((job, i) => (
            <Reveal as="li" key={`${job.role}-${job.period}`} delay={i * 0.04} className="relative pb-12 pl-10 last:pb-0">
              <span
                aria-hidden="true"
                className={
                  i === 0
                    ? 'absolute top-1.5 left-0 size-[11px] rounded-full bg-accent ring-4 ring-accent/20'
                    : 'absolute top-1.5 left-0 size-[11px] rounded-full bg-surface-2 ring-1 ring-fg/20'
                }
              />
              <p className="font-mono text-muted text-xs">{job.period}</p>
              <h3 className="mt-2 font-semibold text-2xl tracking-tight">{job.role}</h3>
              <p className="mt-1 text-fg/80">{job.company}</p>
              <p className="mt-3 max-w-[60ch] text-muted leading-relaxed">{job.summary}</p>
            </Reveal>
          ))}
        </ol>
      </div>

      <div className="mt-24 grid gap-4 md:grid-cols-3 md:gap-5">
        {education.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.06} className="rounded-[1.75rem] bg-surface p-7 ring-1 ring-line">
            <p className="font-mono text-accent-ink text-xs">{item.year}</p>
            <h3 className="mt-3 font-semibold text-lg tracking-tight">{item.title}</h3>
            <p className="mt-1 text-fg/80 text-sm">{item.school}</p>
            <p className="mt-3 text-muted text-sm leading-relaxed">{item.note}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
        <p className="flex shrink-0 items-center gap-2 font-medium text-sm">
          <CertificateIcon className="size-5 text-accent-ink" />
          Certificações
        </p>
        <ul className="flex flex-wrap gap-2">
          {certifications.map(cert => (
            <li key={cert} className="rounded-full bg-fg/5 px-3 py-1.5 text-muted text-sm">
              {cert}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
