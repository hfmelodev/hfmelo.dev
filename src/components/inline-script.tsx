/**
 * Script que roda durante o parse do HTML, antes do primeiro paint.
 * No cliente vira text/plain para o React não reclamar nem executar de novo.
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === 'undefined' ? 'text/javascript' : 'text/plain'}
      suppressHydrationWarning
      // biome-ignore lint/security/noDangerouslySetInnerHtml: script estático do próprio projeto
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
