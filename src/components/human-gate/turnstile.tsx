'use client'

import Script from 'next/script'
import { useEffect, useRef, useState } from 'react'

type TurnstileOptions = {
  sitekey: string
  theme?: 'light' | 'dark' | 'auto'
  language?: string
  appearance?: 'always' | 'execute' | 'interaction-only'
  size?: 'normal' | 'flexible' | 'compact'
  callback?: (token: string) => void
  'error-callback'?: () => void
  'timeout-callback'?: () => void
  'before-interactive-callback'?: () => void
}

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: TurnstileOptions) => string | undefined
      remove: (widgetId: string) => void
    }
  }
}

type TurnstileProps = {
  siteKey: string
  theme: 'light' | 'dark'
  onToken: (token: string) => void
  onError: () => void
  onInteractive: () => void
}

/** Widget do Cloudflare Turnstile em modo explícito; só aparece se a Cloudflare pedir interação. */
export function Turnstile({ siteKey, theme, onToken, onError, onInteractive }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const handlers = useRef({ onToken, onError, onInteractive })
  const [scriptReady, setScriptReady] = useState(false)

  useEffect(() => {
    handlers.current = { onToken, onError, onInteractive }
  })

  useEffect(() => {
    const container = containerRef.current
    if (!scriptReady || !container || !window.turnstile) return

    const widgetId = window.turnstile.render(container, {
      sitekey: siteKey,
      theme,
      language: 'pt-br',
      appearance: 'interaction-only',
      size: 'flexible',
      callback: token => handlers.current.onToken(token),
      'error-callback': () => handlers.current.onError(),
      'timeout-callback': () => handlers.current.onError(),
      'before-interactive-callback': () => handlers.current.onInteractive(),
    })

    return () => {
      if (widgetId) window.turnstile?.remove(widgetId)
    }
  }, [scriptReady, siteKey, theme])

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        onReady={() => setScriptReady(true)}
        onError={() => handlers.current.onError()}
      />
      <div ref={containerRef} className="empty:hidden" />
    </>
  )
}
