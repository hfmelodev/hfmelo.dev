export const GATE_STORAGE_KEY = 'hfmelo:human-verified'
export const GATE_EVENT = 'human-gate:change'

/** Crawlers e geradores de prévia passam direto: o portão é piada, não pode custar SEO. */
const crawlerPattern =
  'bot|crawl|spider|slurp|lighthouse|pagespeed|facebookexternalhit|whatsapp|linkedin|telegram|discord|preview'

/**
 * Roda antes do primeiro paint. Marca o <html> com data-gate="locked" se este navegador
 * ainda não passou na verificação, para o CSS mostrar o portão sem piscar o site antes.
 */
export const gateScript = `(function(){try{if(new RegExp('${crawlerPattern}','i').test(navigator.userAgent))return;if(localStorage.getItem('${GATE_STORAGE_KEY}'))return}catch(e){}document.documentElement.setAttribute('data-gate','locked')})()`
