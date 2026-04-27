'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/sections/PageHero'
import styles from './AboutPage.module.css'

interface AboutData {
  hero: { title: string; subtitle: string }
  bio: string[]
  metrics: { value: string; label: string; context: string }[]
  certifications: { id: string; name: string; issuer: string; date: string; url: string; shortName: string }[]
  experience: { role: string; company: string; date: string }[]
  education: { degree: string; school: string; date: string }
  links: { label: string; url: string; primary: boolean }[]
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
          {data.bio.map((paragraph, idx) => (
            <motion.p key={idx} variants={fadeUp}>{paragraph}</motion.p>
          ))}
        </motion.section>

        {/* Quick Links (Link in bio functionality) */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <h2 className={styles.sectionTitle}>Quick Links</h2>
          <div className={styles.linksGrid}>
            {data.links.map((link, idx) => (
              <motion.div key={idx} variants={fadeUp}>
                <Link 
                  href={link.url}
                  className={link.primary ? styles.quickLinkPrimary : styles.quickLinkSecondary}
                  target={link.url.startsWith('http') ? '_blank' : undefined}
                  rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>
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
