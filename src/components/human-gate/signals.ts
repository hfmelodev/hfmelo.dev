/*
 * Sinais lidos do próprio navegador para personalizar a piada.
 * Nada daqui é enviado ou guardado: só vira texto na tela.
 */

export type LineTone = 'ok' | 'warn'
export type LogLine = { tone: LineTone; text: string }

export type PointerTrace = { moves: number; touched: boolean }

function browserName(ua: string) {
  if ('brave' in navigator) return 'Brave'
  if (/Edg\//.test(ua)) return 'Edge'
  if (/OPR\/|Opera/.test(ua)) return 'Opera'
  if (/Firefox\//.test(ua)) return 'Firefox'
  if (/Chrome\//.test(ua)) return 'Chrome'
  if (/Safari\//.test(ua)) return 'Safari'
  return null
}

function systemName(ua: string) {
  if (/Android/.test(ua)) return 'Android'
  if (/iPhone|iPad|iPod/.test(ua)) return 'iOS'
  if (/CrOS/.test(ua)) return 'ChromeOS'
  if (/Windows/.test(ua)) return 'Windows'
  if (/Mac OS X|Macintosh/.test(ua)) return 'macOS'
  if (/Linux/.test(ua)) return 'Linux'
  return null
}

export function browserLine(): LogLine {
  const ua = navigator.userAgent
  const browser = browserName(ua)
  const system = systemName(ua)

  if (!browser) return { tone: 'ok', text: 'navegador: identidade misteriosa, mas com alma' }
  return { tone: 'ok', text: system ? `navegador: ${browser} no ${system}` : `navegador: ${browser}` }
}

export function clockLine(): LogLine {
  const now = new Date()
  const hour = now.getHours()
  const time = new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' }).format(now)

  const remark =
    hour < 5
      ? 'acordado a essa hora? humano demais'
      : hour < 12
        ? 'o café ainda tá batendo'
        : hour < 14
          ? 'hora do almoço e você aqui. respeito'
          : hour < 18
            ? 'aquela reunião podia ter sido um e-mail'
            : 'já devia ter desligado o computador'

  return { tone: 'ok', text: `horário local ${time}: ${remark}` }
}

export function themeLine(): LogLine {
  const dark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return { tone: 'ok', text: dark ? 'tema escuro no sistema: gente de bem' : 'tema claro no sistema: corajoso' }
}

export function pointerLine(trace: PointerTrace): LogLine {
  if (trace.touched || (trace.moves === 0 && window.matchMedia('(pointer: coarse)').matches)) {
    return { tone: 'ok', text: 'toque na tela: IAs ainda não têm dedos' }
  }
  if (trace.moves > 3) return { tone: 'ok', text: 'cursor trêmulo, imperfeito, maravilhosamente humano' }
  return { tone: 'ok', text: 'cursor imóvel. suspeito, mas passa' }
}

/** Playwright, Selenium e afins deixam essa marca. A decisão continua sendo da Cloudflare. */
export function webdriverLine(): LogLine {
  return navigator.webdriver
    ? { tone: 'warn', text: 'navigator.webdriver = true. te peguei, robô' }
    : { tone: 'ok', text: 'nenhum rastro de automação no navegador' }
}

export type DiagnosticStep = { pending: string; resolve: () => LogLine }

/** A sequência do diagnóstico: cada passo mostra o que está "analisando" e depois o resultado. */
export function diagnosticSteps(trace: PointerTrace): DiagnosticStep[] {
  return [
    { pending: 'iniciando teste de Turing reverso', resolve: () => ({ tone: 'ok', text: 'teste de Turing reverso iniciado' }) },
    { pending: 'identificando o navegador', resolve: browserLine },
    { pending: 'conferindo o relógio', resolve: clockLine },
    { pending: 'espiando o tema do sistema', resolve: themeLine },
    { pending: 'observando o cursor', resolve: () => pointerLine(trace) },
    { pending: 'procurando rastros de automação', resolve: webdriverLine },
    {
      pending: 'relendo suas últimas mensagens',
      resolve: () => ({ tone: 'ok', text: 'frases começando com "Ótima pergunta!": 0' }),
    },
    { pending: 'contando travessões', resolve: () => ({ tone: 'ok', text: 'travessões suspeitos na sua escrita: 0' }) },
  ]
}
