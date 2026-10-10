'use server'

import { serverEnv } from '@/env/server'

const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

export type Verdict = 'human' | 'suspect' | 'unsure'

/**
 * Valida o token do Turnstile no servidor. O portão é uma brincadeira: `suspect` (a Cloudflare
 * recusou) e `unsure` (token vazio ou a rede falhou) só mudam a piada, ninguém fica de fora.
 */
export async function verifyHuman(token: string): Promise<{ result: Verdict }> {
  if (!token) return { result: 'unsure' }

  try {
    const response = await fetch(SITEVERIFY_URL, {
      method: 'POST',
      body: new URLSearchParams({ secret: serverEnv.TURNSTILE_SECRET_KEY, response: token }),
      signal: AbortSignal.timeout(5000),
    })
    const data: { success?: boolean } = await response.json()

    return { result: data.success ? 'human' : 'suspect' }
  } catch {
    return { result: 'unsure' }
  }
}
