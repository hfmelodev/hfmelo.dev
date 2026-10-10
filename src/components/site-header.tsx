'use client'

import { MoonIcon, SunIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'motion/react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { profile } from '@/data/profile'
import { cn } from '@/lib/cn'

const links = [
  { href: '#projetos', label: 'Projetos' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#trajetoria', label: 'Trajetória' },
]

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      type="button"
      aria-label="Alternar tema"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="relative flex size-9 items-center justify-center rounded-full text-muted transition-colors duration-300 hover:bg-fg/6 hover:text-fg active:scale-95"
    >
      <SunIcon
        weight="regular"
        className="size-[18px] rotate-0 scale-100 transition-transform duration-500 ease-fluid dark:-rotate-90 dark:scale-0"
      />
      <MoonIcon
        weight="regular"
        className="absolute size-[18px] rotate-90 scale-0 transition-transform duration-500 ease-fluid dark:rotate-0 dark:scale-100"
      />
    </button>
  )
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-40 flex justify-center px-4">
        <nav
          aria-label="Principal"
          className="flex h-14 w-full max-w-3xl items-center justify-between gap-2 rounded-full border border-line bg-surface/75 py-2 pr-2 pl-5 shadow-soft backdrop-blur-xl"
        >
          <a href="#inicio" className="flex items-center gap-2 font-semibold text-sm tracking-tight">
            <span className="flex size-7 items-center justify-center rounded-full bg-fg font-mono text-[11px] text-bg">HM</span>
            <span className="hidden sm:inline">{profile.fullName}</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-3.5 py-2 text-muted text-sm transition-colors duration-300 hover:bg-fg/6 hover:text-fg"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <a
              href="#contato"
              className="hidden rounded-full bg-fg px-4 py-2 font-medium text-bg text-sm transition-all duration-300 hover:bg-fg/90 active:scale-[0.98] md:inline-flex"
            >
              Fale comigo
            </a>
            <button
              type="button"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={open}
              onClick={() => setOpen(v => !v)}
              className="relative flex size-9 items-center justify-center rounded-full hover:bg-fg/6 md:hidden"
            >
              <span
                className={cn(
                  'absolute h-px w-4 bg-fg transition-transform duration-500 ease-fluid',
                  open ? 'rotate-45' : '-translate-y-[3px]'
                )}
              />
              <span
                className={cn(
                  'absolute h-px w-4 bg-fg transition-transform duration-500 ease-fluid',
                  open ? '-rotate-45' : 'translate-y-[3px]'
                )}
              />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-30 flex flex-col justify-center bg-bg/90 px-8 backdrop-blur-2xl md:hidden"
          >
            <ul className="flex flex-col gap-2">
              {[...links, { href: '#contato', label: 'Fale comigo' }].map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.06 * i + 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 font-semibold text-4xl tracking-tighter"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
