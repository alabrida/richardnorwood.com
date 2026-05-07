import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import { buildMetadata } from '@/lib/metadata'
import Image from 'next/image'
import * as motion from 'framer-motion/client'
import FrameworkAlterationsCard from './FrameworkAlterationsCard'
import ZipFileCleanerTool from './ZipFileCleanerTool'
import styles from './PortalDashboard.module.css'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return buildMetadata({
    title: 'Dashboard | Root Impact Wellness',
    description: 'Secure partnership dashboard for active client work.',
    path: `/portal/${slug}/dashboard`,
    noIndex: true,
  })
}

export default async function ClientDashboard({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('client_profiles')
    .select('*')
    .eq('slug', slug)
    .eq('user_id', user.id)
    .single()

  if (!profile) {
    notFound()
  }

  const brand = profile.brand_colors || { primary: '#2BB6F6' }

  return (
    <main className={styles.dashboard} style={{ '--brand-primary': brand.primary, '--brand-primary-glow': `${brand.primary}33` } as React.CSSProperties}>
      <div className={styles.container}>
        <motion.header 
          className={styles.header}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className={styles.headerContent}>
            <div className={styles.brandHeader}>
              <div className={styles.logoFrame}>
                <Image
                  src="/images/riw-logo.png"
                  alt={`${profile.company_name} logo`}
                  fill
                  sizes="132px"
                  style={{ objectFit: 'contain', padding: 8 }}
                  priority={false}
                />
              </div>
              <div>
                <h1 className={styles.title}>
                  Strategic Alignment Dashboard
                </h1>
                <p className={styles.subHeadline}>
                  {profile.company_name}
                </p>
                <p className={styles.welcomeText}>
                  Welcome to your partnership portal, {profile.contact_name?.split(' ')[0] || 'Verrick'}. Below is your 30-day alignment agenda and immediate action items.
                </p>
              </div>
            </div>
            <div className={styles.statusBlock}>
              <div className={styles.statusLabel}>Partnership Status</div>
              <div className={styles.statusValue}>
                Active Alignment
              </div>
            </div>
          </div>
        </motion.header>

        <div className={styles.grid}>
          <FrameworkAlterationsCard
            clientId={profile.id}
            companyName={profile.company_name}
            brandPrimary={brand.primary}
          />

          <div className={styles.sideStack}>
            <motion.div
              className={`${styles.card} ${styles.compactCard}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div>
                <h3 className={styles.cardTitle}>Partnership Roadmap</h3>
                <ul className={styles.roadmapList}>
                  <li className={styles.roadmapItem}>
                    <div className={`${styles.roadmapWeek} ${styles.activeWeek}`}>WK1</div>
                    <span className={styles.roadmapText}>Friction Mapping & EKG Diagnostic</span>
                  </li>
                  <li className={styles.roadmapItem}>
                    <div className={styles.roadmapWeek}>WK2</div>
                    <span className={styles.lockedText}>Revenue & Financial Mechanics Re-sync</span>
                  </li>
                  <li className={styles.roadmapItem}>
                    <div className={styles.roadmapWeek}>WK3</div>
                    <span className={styles.lockedText}>Facility & Physical Footprint Governance</span>
                  </li>
                  <li className={styles.roadmapItem}>
                    <div className={styles.roadmapWeek}>WK4</div>
                    <span className={styles.lockedText}>Clinical Standards & Strategic Handoff</span>
                  </li>
                </ul>
              </div>
              <div className={styles.currentStatus}>
                Current Status: Week 1 Diagnostic
              </div>
            </motion.div>

            <motion.div
              className={styles.sideStackItem}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <ZipFileCleanerTool />
            </motion.div>
          </div>
        </div>

        <motion.div 
          className={styles.footerNote}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className={styles.footerText}>
            Need technical support with the portal? <a href="mailto:mail@alabrida.org" className={styles.architectLink}>Contact the Architect</a>
          </p>
        </motion.div>
      </div>
    </main>
  )
}
