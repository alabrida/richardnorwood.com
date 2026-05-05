import Link from 'next/link'
import MockDashboard from '@/components/ui/MockDashboard'
import styles from './Hero.module.css'

interface HeroProps {
  data: {
    headline: string
    subhead: string
    cta_text: string
    cta_url: string
  }
}

export default function HeroSection({ data }: HeroProps) {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroBackground}>
        <div className={styles.heroGradientOverlay} />
        <div className={styles.heroGrid} />
      </div>

      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <div className={styles.titleWrapper}>
            <h1 className={styles.heroTitle}>{data.headline}</h1>
          </div>

          <p className={styles.heroSubhead}>{data.subhead}</p>

          <div className={styles.ctaWrapper}>
            <Link href={data.cta_url} className={styles.primaryCta}>
              <span className={styles.ctaText}>{data.cta_text}</span>
              <span className={styles.ctaArrow} aria-hidden="true">&#8594;</span>
            </Link>
            <Link href="/blueprint" className={`${styles.secondaryCta} pulse-green-glow`}>
              <span className={styles.ctaText}>Get the 5-Stage Blueprint</span>
            </Link>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <MockDashboard />
        </div>
      </div>
    </section>
  )
}
