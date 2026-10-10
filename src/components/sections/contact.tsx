import { GithubLogoIcon, InstagramLogoIcon, LinkedinLogoIcon, WhatsappLogoIcon } from '@phosphor-icons/react/ssr'
import { CopyEmail } from '@/components/copy-email'
import { Reveal } from '@/components/reveal'
import { PillLink } from '@/components/ui/pill-link'
import { profile } from '@/data/profile'

const channels = [
  { label: 'LinkedIn', href: profile.linkedin, icon: LinkedinLogoIcon },
  { label: 'Instagram', href: profile.instagram, icon: InstagramLogoIcon },
  { label: 'GitHub', href: profile.github, icon: GithubLogoIcon },
  { label: 'WhatsApp', href: profile.whatsapp, icon: WhatsappLogoIcon },
]

export function Contact() {
  return (
    <section id="contato" className="mx-auto w-full max-w-7xl px-4 py-24 md:px-8 md:py-32">
      <div className="rounded-4xl bg-fg/2.5 p-1.5 ring-1 ring-line">
        <div className="rounded-[calc(2rem-0.375rem)] bg-surface px-6 py-16 text-center md:px-12 md:py-28">
          <Reveal>
            <p className="inline-flex rounded-full border border-line px-3 py-1 font-medium text-[11px] text-muted uppercase tracking-[0.2em]">
              Contato
            </p>
            <h2 className="mx-auto mt-7 max-w-[16ch] text-balance font-semibold text-4xl leading-[1.05] tracking-tighter sm:text-5xl md:text-7xl">
              Tem um sistema para tirar do papel?
            </h2>
            <p className="mx-auto mt-6 max-w-[48ch] text-lg text-muted leading-relaxed">
              Conte o problema. Eu ajudo a desenhar a solução e a colocar no ar, do protótipo ao deploy.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <PillLink href={`mailto:${profile.email}`}>Fale comigo</PillLink>
            <CopyEmail email={profile.email} />
          </Reveal>

          <Reveal delay={0.16} className="mt-12 flex flex-wrap items-center justify-center gap-2">
            {channels.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-muted text-sm transition-colors duration-300 hover:bg-fg/5 hover:text-fg"
              >
                <Icon className="size-4.5" />
                {label}
              </a>
            ))}
          </Reveal>

          <p className="mt-8 font-mono text-muted text-xs">{profile.email}</p>
        </div>
      </div>
    </section>
  )
}
