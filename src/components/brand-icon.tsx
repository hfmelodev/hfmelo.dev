import type { SimpleIcon } from 'simple-icons'
import { cn } from '@/lib/cn'

export function BrandIcon({ icon, className }: { icon: SimpleIcon; className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" aria-label={icon.title} className={cn('size-5 fill-current', className)}>
      <path d={icon.path} />
    </svg>
  )
}
