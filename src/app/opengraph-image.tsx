import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
export const alt = 'Richard Norwood, PMP — Revenue Architecture Advisor'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#060b16',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '24px',
            background: 'rgba(15, 26, 46, 0.8)',
            padding: '64px',
            borderRadius: '24px',
            border: '2px solid rgba(240, 180, 41, 0.2)',
          }}
        >
          <h1
            style={{
              fontSize: '64px',
              fontWeight: 800,
              color: '#e8edf5',
              margin: 0,
              textAlign: 'center',
              lineHeight: 1.2,
            }}
          >
            Richard Norwood, PMP
          </h1>
          <p
            style={{
              fontSize: '36px',
              color: '#f0b429',
              margin: 0,
              fontWeight: 600,
              letterSpacing: '0.05em',
            }}
          >
            REVENUE ARCHITECTURE ADVISOR
          </p>
          <div
            style={{
              marginTop: '32px',
              display: 'flex',
              gap: '24px',
            }}
          >
            <div
              style={{
                background: '#f0b429',
                color: '#060b16',
                padding: '12px 24px',
                borderRadius: '9999px',
                fontSize: '24px',
                fontWeight: 'bold',
              }}
            >
              Align
            </div>
            <div
              style={{
                background: 'transparent',
                color: '#8899b4',
                padding: '12px 24px',
                border: '2px solid #8899b4',
                borderRadius: '9999px',
                fontSize: '24px',
                fontWeight: 'bold',
              }}
            >
              Build
            </div>
            <div
              style={{
                background: 'transparent',
                color: '#8899b4',
                padding: '12px 24px',
                border: '2px solid #8899b4',
                borderRadius: '9999px',
                fontSize: '24px',
                fontWeight: 'bold',
              }}
            >
              Command
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
