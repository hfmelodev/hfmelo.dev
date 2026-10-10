'use client'

import { ArrowRightIcon, CheckIcon, CircleNotchIcon, WarningIcon } from '@phosphor-icons/react'
import { AnimatePresence, animate, motion, useMotionTemplate, useMotionValue, useReducedMotion } from 'motion/react'
import { useTheme } from 'next-themes'
import { useEffect, useEffectEvent, useRef, useState } from 'react'
import { profile } from '@/data/profile'
import { clientEnv } from '@/env/client'
import { cn } from '@/lib/cn'
import { type Verdict, verifyHuman } from '@/lib/verify-human'
import { GATE_EVENT, GATE_STORAGE_KEY } from './gate-script'
import { diagnosticSteps, type LogLine, type PointerTrace } from './signals'
import { Turnstile } from './turnstile'

type Phase = 'idle' | 'checking' | 'confirmed' | 'leaving' | 'gone'
type Entry = { pending: string; result: LogLine | null }

const VERDICT_TIMEOUT = 10_000
const AUTO_ENTER = 2600
const ESCAPE_AFTER = 15_000
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]
const EASE_FLUID: [number, number, number, number] = [0.32, 0.72, 0, 1]

const headlines = {
  checking: {
    title: 'Prove que você não é um robô.',
    sub: 'Nem uma IA. Os robôs andam muito espertos ultimamente.',
  },
  human: { title: 'Humano confirmado.', sub: `Boas-vindas ao ${profile.name}.` },
  suspect: { title: 'Robô, mas educado.', sub: 'Pode entrar. Só não conta pra ninguém.' },
  unsure: { title: 'Humano até que se prove o contrário.', sub: 'Pode entrar.' },
}

const verdictLines: Record<Verdict, LogLine> = {
  human: { tone: 'ok', text: 'Cloudflare Turnstile: humano aprovado' },
  suspect: { tone: 'warn', text: 'a Cloudflare acha que você é um robô. vou fingir que não vi' },
  unsure: { tone: 'warn', text: 'a Cloudflare ficou em dúvida, mas vou confiar em você' },
}

let greeted = false

function greetDevTools() {
  if (greeted) return
  greeted = true
  console.log(
    `%cAbriu o DevTools? Definitivamente humano.%c\nBora conversar: ${profile.email}`,
    'color:#f0803c;font:600 15px ui-monospace,monospace',
    'color:inherit;font:13px ui-monospace,monospace'
  )
}

function announce() {
  window.dispatchEvent(new Event(GATE_EVENT))
}

function LineIcon({ tone }: { tone: LogLine['tone'] | 'pending' }) {
  if (tone === 'pending') return <CircleNotchIcon weight="bold" className="size-3.5 animate-spin text-muted" />
  if (tone === 'warn') return <WarningIcon weight="bold" className="size-3.5 text-accent-ink" />
  return <CheckIcon weight="bold" className="size-3.5 text-accent-ink" />
}

function Line({ tone, children }: { tone: LogLine['tone'] | 'pending'; children: React.ReactNode }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 6, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.35, ease: EASE_OUT }}
      className="flex gap-3"
    >
      <span className="flex h-[1.6em] shrink-0 items-center">
        <LineIcon tone={tone} />
      </span>
      <motion.span
        key={tone}
        initial={{ opacity: 0, filter: 'blur(3px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.3, ease: EASE_OUT }}
        className={cn(tone === 'pending' ? 'text-muted' : 'text-fg')}
      >
        {children}
      </motion.span>
    </motion.li>
  )
}

/**
 * Portão de entrada em tom de piada: um "teste de Turing reverso" com sinais do próprio
 * navegador enquanto o Cloudflare Turnstile valida de verdade. Nunca deixa ninguém de fora.
 */
export function HumanGate() {
  const reduceMotion = useReducedMotion()
  const { resolvedTheme } = useTheme()
  const [phase, setPhase] = useState<Phase>('idle')
  const [entries, setEntries] = useState<Entry[]>([])
  const [logDone, setLogDone] = useState(false)
  const [verdict, setVerdict] = useState<Verdict | null>(null)
  const [interactive, setInteractive] = useState(false)
  const [stuck, setStuck] = useState(false)
  // A cortina sobe recortando o portão de baixo para cima; o valor é o recorte inferior em %.
  const curtain = useMotionValue(0)
  const fade = useMotionValue(1)
  const clipPath = useMotionTemplate`inset(0% 0% ${curtain}% 0%)`
  const gateRef = useRef<HTMLDivElement>(null)
  const enterRef = useRef<HTMLButtonElement>(null)

  const settle = (next: Verdict) => setVerdict(current => current ?? next)

  // Decide se o portão entra em cena: o script inline já marcou o <html> antes do paint.
  useEffect(() => {
    greetDevTools()
    setPhase(document.documentElement.dataset.gate === 'locked' ? 'checking' : 'gone')
  }, [])

  // Prende o foco no portão enquanto ele cobre a página. Não usa `inert` no resto do site
  // porque mexer nesses elementos antes da hidratação gera mismatch no React.
  const trapping = phase === 'checking' || phase === 'confirmed'

  useEffect(() => {
    if (!trapping) return
    const gate = gateRef.current
    if (!gate) return
    if (!gate.contains(document.activeElement)) gate.focus()
    const keepFocus = (event: FocusEvent) => {
      if (event.target instanceof Node && !gate.contains(event.target)) gate.focus()
    }
    document.addEventListener('focusin', keepFocus)
    return () => document.removeEventListener('focusin', keepFocus)
  }, [trapping])

  // O diagnóstico, linha por linha: cada passo "pensa" um pouco antes de dar o resultado.
  useEffect(() => {
    if (phase !== 'checking') return
    const think = () => (reduceMotion ? 160 : 700 + Math.random() * 450)
    const pause = reduceMotion ? 60 : 260
    const trace: PointerTrace = { moves: 0, touched: false }
    const onPointer = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') trace.moves++
      else trace.touched = true
    }
    window.addEventListener('pointermove', onPointer)
    window.addEventListener('pointerdown', onPointer)

    const steps = diagnosticSteps(trace)
    setEntries([])
    setLogDone(false)
    let index = 0
    let timer: ReturnType<typeof setTimeout>

    const start = () => {
      const step = steps[index]
      setEntries(current => [...current, { pending: step.pending, result: null }])
      timer = setTimeout(finishStep, think())
    }
    const finishStep = () => {
      const result = steps[index].resolve()
      const position = index
      setEntries(current => current.map((entry, i) => (i === position ? { ...entry, result } : entry)))
      index++
      timer = setTimeout(index < steps.length ? start : () => setLogDone(true), pause)
    }
    timer = setTimeout(start, 500)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('pointerdown', onPointer)
    }
  }, [phase, reduceMotion])

  // Sem rede ou com a Cloudflare calada: a piada segue e a entrada é liberada.
  useEffect(() => {
    if (phase !== 'checking' || interactive) return
    const timer = setTimeout(() => setVerdict(current => current ?? 'unsure'), VERDICT_TIMEOUT)
    return () => clearTimeout(timer)
  }, [phase, interactive])

  // Desafio interativo travado (navegador muito restritivo): oferece uma saída depois de um tempo.
  useEffect(() => {
    if (!interactive) return
    const timer = setTimeout(() => setStuck(true), ESCAPE_AFTER)
    return () => clearTimeout(timer)
  }, [interactive])

  useEffect(() => {
    if (phase !== 'checking' || !logDone || !verdict) return
    const timer = setTimeout(() => setPhase('confirmed'), 500)
    return () => clearTimeout(timer)
  }, [phase, logDone, verdict])

  const finish = () => {
    document.documentElement.removeAttribute('data-gate')
    announce()
    setPhase('gone')
  }

  const leave = () => {
    try {
      localStorage.setItem(GATE_STORAGE_KEY, new Date().toISOString())
    } catch {}
    document.documentElement.dataset.gate = 'leaving'
    announce()
    setPhase('leaving')

    const exit = reduceMotion
      ? animate(fade, 0, { duration: 0.3, ease: EASE_OUT })
      : animate(curtain, 100, { duration: 0.85, ease: EASE_FLUID })
    exit.then(finish)
  }

  const autoEnter = useEffectEvent(leave)

  useEffect(() => {
    if (phase !== 'confirmed') return
    enterRef.current?.focus({ preventScroll: true })
    const timer = setTimeout(autoEnter, AUTO_ENTER)
    return () => clearTimeout(timer)
  }, [phase])

  if (phase === 'gone') return null

  const headline = phase === 'checking' || phase === 'idle' || !verdict ? headlines.checking : headlines[verdict]
  const settled = phase === 'confirmed' || phase === 'leaving'

  return (
    <motion.div
      ref={gateRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="human-gate-title"
      tabIndex={-1}
      className="human-gate fixed inset-0 z-100 overflow-y-auto bg-bg outline-none"
      style={{ clipPath, opacity: fade }}
    >
      <div className="absolute top-6 left-4 flex items-center gap-2 font-semibold text-sm tracking-tight md:left-8">
        <span className="flex size-7 items-center justify-center rounded-full bg-fg font-mono text-[11px] text-bg">HM</span>
        {profile.name}
      </div>

      <div className="mx-auto flex min-h-full w-full max-w-xl flex-col justify-center px-4 pt-24 pb-12">
        <div aria-live="polite" className="min-h-[7.5rem] sm:min-h-[8.5rem]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={headline.title}
              initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -6, filter: 'blur(6px)', transition: { duration: 0.18 } }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
            >
              <h2
                id="human-gate-title"
                className="text-balance font-semibold text-4xl leading-[1.05] tracking-tighter sm:text-5xl"
              >
                {headline.title}
              </h2>
              <p className="mt-4 text-lg text-muted">{headline.sub}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 rounded-[28px] bg-surface p-1.5 shadow-soft ring-1 ring-line">
          <div className="rounded-[22px] bg-surface-2/50 px-5 py-5 font-mono text-[13px] leading-[1.6] sm:px-6">
            <ol aria-label="Diagnóstico de humanidade" className="flex min-h-[15rem] flex-col gap-1.5">
              {entries.map((entry, index) => (
                <Line key={index} tone={entry.result?.tone ?? 'pending'}>
                  {entry.result?.text ?? `${entry.pending}…`}
                </Line>
              ))}
              {logDone && (
                <Line key={verdict ?? 'pending'} tone={verdict ? verdictLines[verdict].tone : 'pending'}>
                  {verdict
                    ? verdictLines[verdict].text
                    : interactive
                      ? 'a Cloudflare quer uma confirmação sua'
                      : 'consultando a Cloudflare…'}
                </Line>
              )}
            </ol>

            {phase === 'checking' && !verdict && (
              <div className={cn(interactive && 'mt-4')}>
                <Turnstile
                  siteKey={clientEnv.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                  theme={resolvedTheme === 'light' ? 'light' : 'dark'}
                  onToken={token =>
                    verifyHuman(token)
                      .then(response => settle(response.result))
                      .catch(() => settle('unsure'))
                  }
                  onError={() => settle('unsure')}
                  onInteractive={() => setInteractive(true)}
                />
                {stuck && (
                  <button
                    type="button"
                    onClick={() => settle('unsure')}
                    className="mt-3 text-muted underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-fg"
                  >
                    não consigo passar, me deixa entrar
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex min-h-12 flex-wrap items-center justify-between gap-x-6 gap-y-4">
          <p className="max-w-[34ch] text-muted text-xs leading-relaxed">
            Os dados acima são lidos só no seu navegador. A verificação de verdade é da Cloudflare Turnstile.
          </p>

          <AnimatePresence>
            {settled && (
              <motion.button
                ref={enterRef}
                type="button"
                onClick={phase === 'confirmed' ? leave : undefined}
                initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.45, ease: EASE_OUT }}
                className="group relative inline-flex items-center gap-3 overflow-hidden whitespace-nowrap rounded-full bg-fg py-2 pr-2 pl-5 font-medium text-bg text-sm outline-offset-4 transition-colors duration-300 hover:bg-fg/90 focus-visible:outline-2 focus-visible:outline-accent active:scale-[0.98]"
              >
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 origin-left bg-bg/10"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: AUTO_ENTER / 1000, ease: 'linear' }}
                />
                <span className="relative">Entrar no site</span>
                <span className="relative flex size-8 items-center justify-center rounded-full bg-bg/12 transition-transform duration-500 ease-fluid group-hover:translate-x-0.5">
                  <ArrowRightIcon weight="bold" className="size-3.5" />
                </span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
