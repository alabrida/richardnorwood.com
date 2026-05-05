import PageHero from '@/components/sections/PageHero'
import styles from '@/components/sections/LegalPage.module.css'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title: 'Privacy Policy | Richard Norwood, PMP',
  description: 'How Richard Norwood collects, uses, protects, and retains information submitted through this consulting website and client portal.',
  path: '/privacy',
})

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        subtitle="How information is handled when you use this website, submit a form, or work through the client portal."
      />

      <div className={styles.legalShell}>
        <article className={styles.legalPanel}>
          <p className={styles.updated}>Last updated: May 5, 2026</p>

          <section className={styles.section}>
            <h2>Information Collected</h2>
            <p>
              This site collects information you choose to provide through contact forms, health checks, newsletter signups,
              discovery requests, payment flows, and client portal activity. That information may include your name, email
              address, phone number, company details, website URL, operational responses, and messages you submit.
            </p>
            <p>
              The site may also collect basic technical information such as device type, browser, pages viewed, referrer,
              approximate location, and interaction data. This helps maintain security, measure site performance, and improve
              the consulting experience.
            </p>
          </section>

          <section className={styles.section}>
            <h2>How Information Is Used</h2>
            <ul>
              <li>Respond to inquiries, discovery requests, and client support needs.</li>
              <li>Generate diagnostic outputs, audit recommendations, and engagement next steps.</li>
              <li>Operate the client portal, authentication, notifications, and project communication workflows.</li>
              <li>Improve content, conversion paths, and the overall customer experience.</li>
              <li>Protect the site, prevent abuse, and comply with legal or payment obligations.</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>Service Providers</h2>
            <p>
              This website may use trusted service providers for hosting, analytics, authentication, email delivery, forms,
              scheduling, payments, and data storage. These providers are used only to operate the site and deliver requested
              services. Examples may include Vercel, Supabase, Resend, PayPal, Stripe, Google Calendar, and similar operational
              tools.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Cookies And Analytics</h2>
            <p>
              Cookies and similar technologies may be used for essential site operation, analytics, security, and preference
              management. You can control cookies through your browser settings. Disabling some cookies may limit form,
              portal, or personalization features.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Retention And Security</h2>
            <p>
              Information is retained only as long as needed for the business purpose it was collected for, unless a longer
              period is required for legal, security, payment, or recordkeeping reasons. Reasonable technical and organizational
              safeguards are used to protect submitted information, but no internet system can be guaranteed to be completely
              secure.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Your Choices</h2>
            <p>
              You may request access, correction, or deletion of personal information by contacting{' '}
              <a href="mailto:mail@alabrida.org">mail@alabrida.org</a>. Newsletter emails can be unsubscribed from using the
              unsubscribe option provided in the message when available.
            </p>
          </section>
        </article>
      </div>
    </>
  )
}
