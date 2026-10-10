import { ArrowDownIcon } from '@phosphor-icons/react/ssr'
import Image from 'next/image'
import { Reveal } from '@/components/reveal'
import { PillLink } from '@/components/ui/pill-link'
import { profile } from '@/data/profile'

const ringText = 'FULLSTACK / UI DESIGN / INTELIGÊNCIA ARTIFICIAL / NODE.JS / REACT / NEXT.JS / TYPESCRIPT /\u00a0'

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative mx-auto flex w-full max-w-7xl items-center overflow-x-clip px-4 pt-28 pb-16 md:min-h-[min(100dvh,820px)] md:px-8 md:pt-24"
    >
      <div className="grid w-full items-center gap-14 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-7">
          <Reveal>
            <p className="inline-flex items-center rounded-full border border-line bg-surface px-3 py-1 font-medium text-[11px] text-muted uppercase tracking-[0.2em]">
              {profile.fullName}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-7 max-w-[14ch] text-balance font-semibold text-5xl leading-[1.02] tracking-tighter sm:text-6xl lg:text-7xl">
              Sistemas completos, <span className="text-muted">do design ao deploy.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-7 max-w-[46ch] text-lg text-muted leading-relaxed">
              Desenvolvedor FullStack. Do planejamento à interface, da API à infraestrutura, entrego o produto inteiro com IA no
              fluxo.
            </p>
          </Reveal>

          <Reveal delay={0.24} className="mt-10 flex flex-wrap items-center gap-3">
            <PillLink href="#projetos" icon={<ArrowDownIcon weight="bold" className="size-3.5" />}>
              Ver projetos
            </PillLink>
            <PillLink href="#contato" variant="ghost">
              Fale comigo
            </PillLink>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="flex justify-center md:col-span-5 md:justify-end">
          <div className="relative aspect-square w-full max-w-90 sm:max-w-105">
            <svg
              viewBox="0 0 200 200"
              aria-hidden="true"
              className="absolute inset-0 size-full animate-spin-slow fill-muted font-mono text-[7px]"
            >
              <defs>
                <path id="hero-ring" d="M100,100 m-92,0 a92,92 0 1,1 184,0 a92,92 0 1,1 -184,0" />
              </defs>
              <text>
                <textPath href="#hero-ring" textLength={576} lengthAdjust="spacing">
                  {ringText}
                </textPath>
              </text>
            </svg>

            <div className="absolute inset-[11%] rounded-full bg-surface p-2 shadow-soft ring-1 ring-line">
              <div className="relative size-full overflow-hidden rounded-full bg-surface-2">
                <Image
                  src="/hilquias.webp"
                  alt={`Foto de ${profile.fullName}`}
                  fill
                  preload
                  sizes="(min-width: 768px) 340px, 80vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="absolute right-[6%] bottom-[10%] flex size-20 items-center justify-center rounded-full bg-accent font-semibold text-on-accent text-sm leading-tight tracking-tight shadow-soft ring-4 ring-bg sm:size-24">
              <span className="text-center">
                10+
                <br />
                <span className="font-medium text-[11px]">anos em TI</span>
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
