import { z } from 'zod'

const schema = z.object({
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().trim().min(1, 'Defina a site key do Cloudflare Turnstile'),
})

/**
 * Variáveis públicas, embutidas no bundle do cliente no build.
 * Cada uma precisa ser lida por nome literal para o Next conseguir substituir.
 */
export const clientEnv = schema.parse({
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
})
