'use client'

import { useSyncExternalStore } from 'react'
import { GATE_EVENT } from '@/components/human-gate/gate-script'

function subscribe(onChange: () => void) {
  window.addEventListener(GATE_EVENT, onChange)
  return () => window.removeEventListener(GATE_EVENT, onChange)
}

/** `true` quando o portão de verificação não está trancando o site (já passou ou nem apareceu). */
export function useGatePassed() {
  return useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.gate !== 'locked',
    () => true
  )
}
