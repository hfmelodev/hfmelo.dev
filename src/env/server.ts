import { z } from 'zod'

const schema = z.object({
  TURNSTILE_SECRET_KEY: z.string().trim().min(1, 'Defina a secret key do Cloudflare Turnstile'),
})

/** Variáveis secretas: só podem ser importadas em código que roda no servidor. */
export const serverEnv = schema.parse({
  TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
})
