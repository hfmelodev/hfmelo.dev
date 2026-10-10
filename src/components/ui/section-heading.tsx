import { Reveal } from '@/components/reveal'
import { cn } from '@/lib/cn'

type SectionHeadingProps = {
  title: React.ReactNode
  description?: React.ReactNode
  className?: string
}

export function SectionHeading({ title, description, className }: SectionHeadingProps) {
  return (
    <Reveal className={cn('max-w-3xl', className)}>
      <h2 className="text-balance font-semibold text-4xl leading-[1.05] tracking-tighter md:text-5xl">{title}</h2>
      {description ? <p className="mt-5 max-w-[60ch] text-lg text-muted leading-relaxed">{description}</p> : null}
    </Reveal>
  )
}
