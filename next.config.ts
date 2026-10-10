import type { NextConfig } from 'next'

// Valida as variáveis de ambiente no dev e no build: falta de chave quebra cedo, não em produção.
import './src/env/client'
import './src/env/server'

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
}

export default nextConfig
