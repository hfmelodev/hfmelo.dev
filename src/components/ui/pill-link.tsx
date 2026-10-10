import { ArrowUpRightIcon } from '@phosphor-icons/react/ssr'
import { cn } from '@/lib/cn'

type PillLinkProps = React.ComponentProps<'a'> & {
  variant?: 'primary' | 'ghost'
  icon?: React.ReactNode
}

/** Botão em pílula com ícone aninhado ("button-in-button"). */
export function PillLink({ variant = 'primary', icon, className, children, ...props }: PillLinkProps) {
  return (
    <a
      className={cn(
        'group inline-flex items-center gap-3 whitespace-nowrap rounded-full py-2 pr-2 pl-5 font-medium text-sm transition-all duration-500 ease-fluid active:scale-[0.98]',
        variant === 'primary' && 'bg-fg text-bg hover:bg-fg/90',
        variant === 'ghost' && 'bg-surface text-fg ring-1 ring-line hover:bg-surface-2',
        className
      )}
      {...props}
    >
      {children}
      <span
        className={cn(
          'flex size-8 items-center justify-center rounded-full transition-transform duration-500 ease-fluid group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105',
          variant === 'primary' ? 'bg-bg/12' : 'bg-fg/6'
        )}
      >
        {icon ?? <ArrowUpRightIcon weight="bold" className="size-3.5" />}
      </span>
    </a>
  )
}
