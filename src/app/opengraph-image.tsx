import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'

export const alt = 'Hilquias Ferreira Melo, Desenvolvedor FullStack e Designer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const photo = await readFile(join(process.cwd(), 'src/assets/hilquias.jpg'))
const photoSrc = `data:image/jpeg;base64,${photo.toString('base64')}`

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '80px',
        background: '#0f0f12',
        color: '#f4f4f6',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 680 }}>
        <div style={{ fontSize: 26, color: '#a1a1aa', letterSpacing: 4, textTransform: 'uppercase' }}>Hilquias Ferreira Melo</div>
        <div style={{ marginTop: 28, fontSize: 76, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3 }}>
          Sistemas completos, do design ao deploy.
        </div>
        <div style={{ marginTop: 32, fontSize: 28, color: '#a1a1aa' }}>FullStack, UI Design e IA aplicada</div>
      </div>
      <div
        style={{
          display: 'flex',
          width: 340,
          height: 340,
          borderRadius: 9999,
          padding: 10,
          background: '#ff7a3d',
        }}
      >
        {/* biome-ignore lint/performance/noImgElement: ImageResponse não usa next/image */}
        <img src={photoSrc} alt="" width={320} height={320} style={{ borderRadius: 9999, objectFit: 'cover' }} />
      </div>
    </div>,
    size
  )
}
