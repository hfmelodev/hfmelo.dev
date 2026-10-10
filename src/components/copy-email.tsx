'use client'

import { CheckIcon, CopyIcon } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timeout = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timeout)
  }, [copied])

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-muted text-sm ring-1 ring-line transition-colors duration-300 hover:bg-fg/5 hover:text-fg active:scale-[0.98]"
    >
      {copied ? <CheckIcon weight="bold" className="size-4 text-accent-ink" /> : <CopyIcon className="size-4" />}
      <span aria-live="polite">{copied ? 'E-mail copiado' : 'Copiar e-mail'}</span>
    </button>
  )
}
