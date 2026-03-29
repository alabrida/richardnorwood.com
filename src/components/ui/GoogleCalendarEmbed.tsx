'use client'

import React from 'react'

export default function GoogleCalendarEmbed() {
  // TODO: Replace this URL with your actual Google Workspace Appointment Schedule link
  // e.g., 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ...xyz?gv=true'
  const appointmentUrl = 'https://calendar.app.google/fdgEMc2rsP7wr79R8'

  const isPlaceholder = appointmentUrl === 'YOUR_GOOGLE_CALENDAR_APPOINTMENT_URL'

  return (
    <div style={{ width: '100%', height: '100%', background: 'var(--color-surface)', border: '1px solid var(--color-surface-elevated)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', position: 'relative' }}>
      {!isPlaceholder ? (
        <iframe 
          src={appointmentUrl} 
          style={{ border: 0, width: '100%', height: '100%' }} 
          frameBorder="0"
          title="Google Calendar Appointment"
        />
      ) : (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem', padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)', fontFamily: 'var(--font-body)' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <p>Google Calendar Appointment is ready to connect.</p>
          <p style={{ fontSize: '0.9em', opacity: 0.8 }}>Update the <code>appointmentUrl</code> variable in <code>GoogleCalendarEmbed.tsx</code> with your Google Workspace link.</p>
        </div>
      )}
    </div>
  )
}
