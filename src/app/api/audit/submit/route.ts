import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { profile, responses } = await req.json()

    const emailContent = `
      <h1>Audit Completed: ${profile.company_name}</h1>
      <p>A new clinical and operational audit has been submitted.</p>
      
      <h2>Responses:</h2>
      <pre>${JSON.stringify(responses, null, 2)}</pre>
      
      <p>View details in the portal: https://richardnorwood.com/portal/${profile.slug}/dashboard</p>
    `

    await resend.emails.send({
      from: 'System <notifications@richardnorwood.com>',
      to: 'mail@alabrida.org',
      subject: `Audit Completed: ${profile.company_name}`,
      html: emailContent
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 })
  }
}
