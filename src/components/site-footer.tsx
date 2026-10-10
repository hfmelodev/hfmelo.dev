import { ArrowUpIcon } from '@phosphor-icons/react/ssr'
import { profile } from '@/data/profile'

export function SiteFooter() {
  return (
    <footer className="border-line border-t">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-10 text-muted text-sm sm:flex-row sm:items-center sm:justify-between md:px-8">
        <p>
          {profile.fullName}, {profile.location}
        </p>
        <a href="#inicio" className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-fg">
          Voltar ao topo
          <ArrowUpIcon className="size-4" />
        </a>
      </div>
    </footer>
  )
}
