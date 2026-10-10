import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 9999,
        background: '#ff7a3d',
        color: '#1c120c',
        fontSize: 14,
        fontWeight: 700,
        letterSpacing: -0.5,
      }}
    >
      HM
    </div>,
    size
  )
}
