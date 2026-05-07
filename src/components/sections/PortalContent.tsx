'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import GlowCard from '@/components/ui/GlowCard'
import styles from './PortalContent.module.css'

interface User {
  id: string;
  email?: string;
}

interface Profile {
  contact_name?: string;
  company_name: string;
  partnership_tier: string;
  status: string;
  partnership_start?: string;
  dashboard_url?: string;
  slug?: string;
}

interface PortalContentProps {
  user: User;
  profile: Profile | null;
}

export default function PortalContent({ user, profile }: PortalContentProps) {
  if (!user) {
    return (
      <main className={styles.portal}>
        <div style={{ textAlign: 'center', padding: 'var(--space-20)', color: 'var(--color-text-muted)' }}>
          <p>Loading your portal session...</p>
        </div>
      </main>
    )
  }

  const brandPrimary = '#2BB6F6'

  return (
    <main className={styles.portal}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <GlowCard className={styles.portalCard} glowColor={brandPrimary}>
          <div className={styles.portalContent}>
            <div className={styles.header}>
              <h1 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--text-3xl)',
                background: 'linear-gradient(180deg, var(--color-text) 0%, var(--color-text-muted) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: 'var(--space-2)',
                fontWeight: 'bold',
              }}>
                Partnership Portal
              </h1>
              <p style={{ color: 'var(--color-secondary)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 'var(--text-sm)' }}>
                {profile?.company_name || 'Strategic Alignment Hub'}
              </p>
            </div>

            {profile ? (
              <div className={styles.profileSection}>
                <div className={styles.infoGrid}>
                  <div className={styles.infoItem}>
                    <span className={styles.label}>Company</span>
                    <span className={styles.value}>{profile.company_name}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.label}>Agreement</span>
                    <span className={styles.value}>30-Day Strategic Alignment</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.label}>Current Week</span>
                    <span className={styles.value}>WK1: Diagnostic</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.label}>Status</span>
                    <span className={`${styles.value} ${styles.statusBadge} ${styles[`status-${profile.status}`]}`}>
                      {profile.status || 'Active'}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.noProfle}>
                <p className={styles.noProfileText}>
                  Your profile is being provisioned for the 30-day alignment.
                  If you have questions, please <Link href="/contact" className={styles.contactLink}>contact us</Link>.
                </p>
              </div>
            )}

            <div style={{ marginTop: 'var(--space-8)', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-8)' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-6)', color: 'white' }}>
                Partnership Roadmap
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
                  <div style={{ width: 24, height: 24, borderRadius: '4px', border: `1px solid ${brandPrimary}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: brandPrimary, fontWeight: 'bold' }}>WK1</div>
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ color: 'white', fontWeight: 'bold', fontSize: 'var(--text-sm)' }}>Friction Mapping & EKG Diagnostic</div>
                    <div style={{ fontSize: 10, color: brandPrimary, fontWeight: 'bold' }}>ACTIVE PHASE</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center', opacity: 0.4 }}>
                  <div style={{ width: 24, height: 24, borderRadius: '4px', border: '1px solid var(--color-text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>WK2</div>
                  <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>Revenue & Financial Mechanics</div>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center', opacity: 0.4 }}>
                  <div style={{ width: 24, height: 24, borderRadius: '4px', border: '1px solid var(--color-text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>WK3</div>
                  <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>Facility & Physical Footprint</div>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center', opacity: 0.4 }}>
                  <div style={{ width: 24, height: 24, borderRadius: '4px', border: '1px solid var(--color-text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>WK4</div>
                  <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>Clinical Standards & Strategic Handoff</div>
                </div>
              </div>

              {profile?.slug && (
                <Link
                  href={`/portal/${profile.slug}/dashboard`}
                  style={{
                    marginTop: 'var(--space-10)',
                    display: 'block',
                    background: 'linear-gradient(135deg, var(--color-secondary), var(--color-secondary-dark))',
                    color: 'var(--color-text-inverse)',
                    padding: 'var(--space-4) var(--space-8)',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 'bold',
                    textDecoration: 'none',
                    textAlign: 'center',
                    fontFamily: 'var(--font-heading)',
                    boxShadow: '0 4px 14px rgba(240, 180, 41, 0.3)',
                  }}
                >
                  Open Partnership Dashboard
                </Link>
              )}
            </div>

            <div className={styles.footer} style={{ marginTop: 'var(--space-12)' }}>
              <span className={styles.footerText}>
                Secure Session: {user.email}
              </span>
              <form action="/api/auth/signout" method="post">
                <button type="submit" className={styles.signOutBtn}>
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </GlowCard>
      </motion.div>
    </main>
  )
}
