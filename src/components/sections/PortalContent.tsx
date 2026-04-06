'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import styles from './PortalContent.module.css'

interface PortalContentProps {
  user: {
    id: string
    email?: string
  }
  profile: {
    contact_name: string
    company_name: string
    partnership_tier: string
    partnership_start: string | null
    partnership_end: string | null
    status: string | null
    dashboard_url: string | null
  } | null
}

export default function PortalContent({ user, profile }: PortalContentProps) {
  const tierLabels: Record<string, string> = {
    'phase-1': 'Phase I: Diagnostic EKG',
    'phase-2': 'Phase II: Engine Orchestration',
    'phase-3': 'Phase III: Unified Engine',
  }

  return (
    <main className={styles.portal}>
      <motion.div
        className={styles.portalCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.header}>
          <h1 className={styles.title}>Client Portal</h1>
          <p className={styles.welcome}>
            Welcome back{profile ? `, ${profile.contact_name}` : ''}
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
                <span className={styles.label}>Partnership</span>
                <span className={styles.value}>
                  {tierLabels[profile.partnership_tier] || profile.partnership_tier}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Status</span>
                <span className={`${styles.value} ${styles.statusBadge} ${styles[`status-${profile.status}`]}`}>
                  {profile.status || 'Active'}
                </span>
              </div>
              {profile.partnership_start && (
                <div className={styles.infoItem}>
                  <span className={styles.label}>Start Date</span>
                  <span className={styles.value}>
                    {new Date(profile.partnership_start).toLocaleDateString('en-US', { 
                      year: 'numeric', month: 'long', day: 'numeric' 
                    })}
                  </span>
                </div>
              )}
            </div>

            {profile.dashboard_url && (
              <motion.a
                href={profile.dashboard_url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.dashboardLink}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Open Your Dashboard →
              </motion.a>
            )}
          </div>
        ) : (
          <div className={styles.noProfle}>
            <p className={styles.noProfileText}>
              Your client profile is being set up. If you believe this is an error, 
              please <Link href="/contact" className={styles.contactLink}>contact us</Link>.
            </p>
          </div>
        )}

        <div className={styles.quickLinks}>
          <h2 className={styles.sectionTitle}>Quick Links</h2>
          <div className={styles.linkGrid}>
            <Link href="/contact" className={styles.quickLink}>
              <span className={styles.linkIcon}>💬</span>
              <span>Contact Your Architect</span>
            </Link>
            <Link href="/services" className={styles.quickLink}>
              <span className={styles.linkIcon}>📋</span>
              <span>Partnership Details</span>
            </Link>
            <Link href="/blog" className={styles.quickLink}>
              <span className={styles.linkIcon}>📖</span>
              <span>Latest Insights</span>
            </Link>
            <Link href="/calculator" className={styles.quickLink}>
              <span className={styles.linkIcon}>🔬</span>
              <span>Run New EKG</span>
            </Link>
          </div>
        </div>

        <div className={styles.footer}>
          <span className={styles.footerText}>
            Signed in as {user.email}
          </span>
          <form action="/api/auth/signout" method="post">
            <button type="submit" className={styles.signOutBtn}>
              Sign Out
            </button>
          </form>
        </div>
      </motion.div>
    </main>
  )
}
