import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { gateScript } from '@/components/human-gate/gate-script'
import { HumanGate } from '@/components/human-gate/human-gate'
import { InlineScript } from '@/components/inline-script'
import { Providers } from '@/components/providers'
import { profile } from '@/data/profile'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const description =
  'Desenvolvedor FullStack. Sistemas web de ponta a ponta com Node.js, React e Next.js, do planejamento à infraestrutura, com IA no fluxo de trabalho.'

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title: {
    default: `${profile.name}`,
    template: `%s | ${profile.name}`,
  },
  description,
  authors: [{ name: profile.fullName, url: profile.github }],
  keywords: ['Desenvolvedor FullStack', 'Next.js', 'React', 'Node.js', 'TypeScript', 'UI Design', 'IA', 'São Luís'],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    title: `${profile.name} | Desenvolvedor FullStack e DevOps`,
    description,
    siteName: profile.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.name} | Desenvolvedor FullStack e DevOps`,
    description,
  },
}

export const viewport: Viewport = {
  themeColor: '#0f0f12',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <InlineScript html={gateScript} />
        <Providers>
          <HumanGate />
          {children}
        </Providers>
      </body>
    </html>
  )
}
