'use client'

import React, { useEffect } from 'react'

export default function CalendlyEmbed() {
  useEffect(() => {
    // Load Calendly widget script dynamically
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '600px', background: 'var(--color-surface)', border: '1px solid var(--color-surface-elevated)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
      <div 
        className="calendly-inline-widget" 
        data-url="https://calendly.com/richard-norwood/strategy-call?hide_event_type_details=1&hide_gdpr_banner=1&background_color=060b16&text_color=e8edf5&primary_color=20c997" 
        style={{ minWidth: '320px', height: '100%' }} 
      />
    </div>
  )
}
