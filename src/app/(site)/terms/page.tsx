import PageHero from '@/components/sections/PageHero'
import styles from '@/components/sections/LegalPage.module.css'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title: 'Terms of Service | Richard Norwood, PMP',
  description: 'Terms governing use of the Richard Norwood consulting website, health checks, content, forms, and client portal.',
  path: '/terms',
})

export default function TermsPage() {
  return (
    <>
      <PageHero
        title="Terms of Service"
        subtitle="The baseline terms for using this website, submitted materials, diagnostic tools, and client portal."
      />

      <div className={styles.legalShell}>
        <article className={styles.legalPanel}>
          <p className={styles.updated}>Last updated: May 5, 2026</p>

          <section className={styles.section}>
            <h2>Use Of This Website</h2>
            <p>
              This website is provided by Richard Norwood, PMP for consulting, educational, diagnostic, and client-service
              purposes. By using the site, submitting a form, purchasing a service, or accessing the client portal, you agree
              to use the site lawfully and not interfere with its operation, security, or availability.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Consulting Content</h2>
            <p>
              Articles, frameworks, health checks, audit outputs, and other materials are provided for business education and
              decision support. They are not legal, financial, tax, medical, or investment advice. Any implementation decision
              remains your responsibility and should be evaluated in the context of your own business, team, market, and risks.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Submitted Information</h2>
            <p>
              You are responsible for the accuracy of information you submit through forms, diagnostics, payment flows, and
              portal workflows. Do not submit confidential third-party information unless you are authorized to do so. Submitted
              information may be used to respond to your request, prepare recommendations, operate the portal, and deliver
              consulting services.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Payments And Engagements</h2>
            <p>
              Paid services, discovery sessions, audits, and consulting engagements may be subject to additional written terms,
              scopes of work, invoices, or payment-provider requirements. If separate written engagement terms conflict with
              these website terms, the written engagement terms control for that specific engagement.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Intellectual Property</h2>
            <p>
              Site content, frameworks, templates, page designs, written materials, and diagnostic structures are owned by or
              licensed to Richard Norwood unless otherwise stated. You may view and use them for your internal evaluation, but
              you may not copy, resell, redistribute, or present them as your own without written permission.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Availability And Liability</h2>
            <p>
              The site is provided on an as-available basis. Reasonable effort is made to keep it accurate and available, but
              errors, interruptions, or outdated information may occur. To the fullest extent permitted by law, liability for
              use of the site is limited to the amount paid for the specific service giving rise to the claim.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Contact</h2>
            <p>
              Questions about these terms can be sent to <a href="mailto:mail@alabrida.org">mail@alabrida.org</a>.
            </p>
          </section>
        </article>
      </div>
    </>
  )
}
