import {
  siClaude,
  siCloudflare,
  siDocker,
  siFastify,
  siKubernetes,
  siLinux,
  siNextdotjs,
  siNodedotjs,
  siPfsense,
  siPostgresql,
  siPrisma,
  siReact,
  siTailwindcss,
  siTotvs,
  siTypescript,
  siVercel,
} from 'simple-icons'
import { BrandIcon } from '@/components/brand-icon'

const stack = [
  siNodedotjs,
  siTypescript,
  siReact,
  siNextdotjs,
  siFastify,
  siPrisma,
  siPostgresql,
  siTailwindcss,
  siClaude,
  siDocker,
  siKubernetes,
  siVercel,
  siCloudflare,
  siLinux,
  siPfsense,
  siTotvs,
]

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden} className="flex shrink-0 items-center gap-12 pr-12">
      {stack.map(icon => (
        <li key={icon.slug} className="flex items-center gap-3 text-muted transition-colors duration-300 hover:text-fg">
          <BrandIcon icon={icon} className="size-6" />
          <span className="whitespace-nowrap font-medium text-base tracking-tight">{icon.title}</span>
        </li>
      ))}
    </ul>
  )
}

export function StackMarquee() {
  return (
    <section aria-label="Tecnologias que uso" className="border-line border-y py-8">
      <div className="group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
          <Row />
          <Row hidden />
        </div>
      </div>
    </section>
  )
}
