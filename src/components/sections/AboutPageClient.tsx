'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/sections/PageHero'
import styles from './AboutPage.module.css'
import { BentoGrid, BentoCard, BentoCardIcon, BentoCardTitle, BentoCardDescription } from '@/components/layout/BentoGrid'
import { 
  ClipboardDocumentCheckIcon, 
  SparklesIcon, 
  CurrencyDollarIcon, 
  BookOpenIcon, 
  CalendarIcon, 
  UserGroupIcon 
} from '@heroicons/react/24/outline/index.js'

// Map icons to links based on label or index
const getIcon = (label: string) => {
  if (label.includes('Assessment')) return <ClipboardDocumentCheckIcon className="w-6 h-6" />
  if (label.includes('Services')) return <SparklesIcon className="w-6 h-6" />
  if (label.includes('Pricing')) return <CurrencyDollarIcon className="w-6 h-6" />
  if (label.includes('Blog')) return <BookOpenIcon className="w-6 h-6" />
  if (label.includes('Contact')) return <CalendarIcon className="w-6 h-6" />
  return <UserGroupIcon className="w-6 h-6" />
}

const getDescription = (label: string) => {
  if (label.includes('Assessment')) return 'Determine your revenue maturity across 22 structural checkpoints.'
  if (label.includes('Services')) return 'Strategy, implementation, and fractional leadership.'
  if (label.includes('Pricing')) return 'Flexible partnership tiers for every growth stage.'
  if (label.includes('Blog')) return 'Field notes on project management and commercial engines.'
  if (label.includes('Contact')) return 'Schedule a direct diagnostic session with me.'
  return 'Connect with me on LinkedIn for daily insights.'
}

interface AboutData {
  hero: { title: string; subtitle: string }
  bio: string[]
  metrics: { value: string; label: string; context: string }[]
  certifications: { id: string; name: string; issuer: string; date: string; url: string; shortName: string; description: string }[]
  experience: { role: string; company: string; date: string }[]
  education: { degree: string; school: string; date: string }
  links: { label: string; url: string; primary: boolean; colSpan?: number; rowSpan?: number }[]
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
}

export default function AboutPageClient({ data }: { data: AboutData }) {
  return (
    <>
      <PageHero title={data.hero.title} subtitle={data.hero.subtitle} />

      <main className={styles.aboutContainer}>
        {/* Hero Image */}
        <motion.section
          className={styles.heroImageContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image 
            src="/images/richard-headshot.jpg" 
            alt="Richard Norwood" 
            fill
            style={{ 
              objectFit: 'cover', 
              objectPosition: 'top center',
              transform: 'scaleX(-1)'
            }}
            sizes="(max-width: 768px) 100vw, 100vw"
            priority
          />
        </motion.section>

        {/* Bio Narrative */}
        <motion.section 
          className={styles.bioSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div className={styles.certBadges} variants={fadeUp}>
            {data.certifications.filter(c => ['pmp', 'gda'].includes(c.id)).map((cert) => (
              <a 
                key={cert.id}
                href={cert.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.certBadge}
                data-tooltip={cert.description}
              >
                <div className={styles.certBadgeImage}>{cert.shortName === 'PMP®' ? 'PMP' : 'GDA'}</div>
                <span className={styles.certBadgeText}>{cert.shortName} Certified</span>
              </a>
            ))}
          </motion.div>

          {data.bio.map((paragraph, idx) => (
            <motion.p key={idx} variants={fadeUp}>{paragraph}</motion.p>
          ))}
        </motion.section>

        {/* Next Steps Bento Grid */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <h2 className={styles.sectionTitle}>Next Steps</h2>
          <BentoGrid columns={3}>
            {data.links.map((link, idx) => {
              const isPrimary = link.primary;
              return (
                <BentoCard 
                  key={idx} 
                  index={idx}
                  colSpan={(link.colSpan as 1|2|3) || (isPrimary ? 2 : 1)}
                  rowSpan={(link.rowSpan as 1|2) || (isPrimary ? 2 : 1)}
                  featured={isPrimary}
                >
                  <Link 
                    href={link.url}
                    className={styles.bentoLink}
                    target={link.url.startsWith('http') ? '_blank' : undefined}
                    rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    <BentoCardIcon>
                      {getIcon(link.label)}
                    </BentoCardIcon>
                    <BentoCardTitle>{link.label}</BentoCardTitle>
                    <BentoCardDescription>
                      {getDescription(link.label)}
                    </BentoCardDescription>
                  </Link>
                </BentoCard>
              )
            })}
          </BentoGrid>
        </motion.section>
        {/* Key Metrics */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <h2 className={styles.sectionTitle}>Impact</h2>
          <div className={styles.metricsGrid}>
            {data.metrics.map((metric, idx) => (
              <motion.div key={idx} className={styles.metricCard} variants={fadeUp}>
                <div className={styles.metricValue}>{metric.value}</div>
                <div className={styles.metricLabel}>{metric.label}</div>
                <div className={styles.metricContext}>{metric.context}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Certifications */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <h2 className={styles.sectionTitle}>Certifications</h2>
          <div className={styles.certGrid}>
            {data.certifications.map((cert, idx) => (
              <motion.a 
                key={idx} 
                href={cert.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.certCard}
                variants={fadeUp}
                data-tooltip={cert.description}
              >
                <div className={styles.certName}>{cert.name}</div>
                <div className={styles.certIssuer}>{cert.issuer}</div>
                <div className={styles.certMeta}>
                  <span>{cert.date}</span>
                  <span className={styles.certVerify}>Verify ↗</span>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.section>

        {/* Experience Timeline */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <h2 className={styles.sectionTitle}>Experience</h2>
          <div className={styles.timeline}>
            {data.experience.map((exp, idx) => (
              <motion.div key={idx} className={styles.timelineItem} variants={fadeUp}>
                <div className={styles.timelineDot} />
                <div className={styles.timelineRole}>{exp.role}</div>
                <div className={styles.timelineCompany}>{exp.company}</div>
                <div className={styles.timelineDate}>{exp.date}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
    </>
  )
}
