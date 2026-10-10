import { Reveal } from '@/components/reveal'
import { stats } from '@/data/profile'

export function About() {
  return (
    <section id="sobre" className="border-line border-y bg-surface">
      <div className="mx-auto w-full max-w-7xl px-4 py-24 md:px-8 md:py-36">
        <Reveal>
          <p className="max-w-[30ch] text-balance font-semibold text-3xl leading-[1.15] tracking-tighter md:text-5xl">
            Comecei no suporte de clínicas e hospitais.{' '}
            <span className="text-muted">
              Hoje coordeno a Tecnologia da OAB Maranhão e construo os sistemas que a advocacia maranhense usa todo dia.
            </span>
          </p>
        </Reveal>

        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12">
          <Reveal className="space-y-5 text-lg text-muted leading-relaxed md:col-span-6">
            <p>
              São mais de 10 anos em TI. Essa estrada pelo suporte e pela infraestrutura me deu algo que muito dev não tem: eu sei
              o que acontece com o sistema depois do deploy, na mão de quem usa.
            </p>
            <p>
              Por isso trato design e engenharia como uma coisa só. Penso na interface, na API, no banco e na operação juntos, e
              uso IA como parte do processo para testar ideias, revisar código e chegar antes ao que funciona.
            </p>
          </Reveal>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 md:col-span-5 md:col-start-8">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.06}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-semibold text-4xl tracking-tighter md:text-5xl">{stat.value}</span>
                  <span className="mt-2 block text-muted text-sm leading-snug">{stat.label}</span>
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
