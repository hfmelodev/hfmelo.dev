'use client'

import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { useGatePassed } from '@/lib/use-gate-passed'

type RevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'li' | 'article' | 'section'
}

/**
 * Entrada suave ao entrar na viewport. Respeita prefers-reduced-motion via MotionConfig
 * e espera o portão de verificação abrir, para a entrada do site acontecer à vista.
 */
export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const Component = motion[as]
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const gatePassed = useGatePassed()
  const shown = inView && gatePassed

  return (
    <Component
      ref={ref as React.Ref<never>}
      className={className}
      initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
      animate={shown ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Component>
  )
}
