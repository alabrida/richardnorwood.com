'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './StagePage.module.css';
import GlowCard from '@/components/ui/GlowCard';
import CallButton from '@/components/ui/CallButton';

const stageGlowMap: Record<string, { r: number; g: number; b: number }> = {
  awareness: { r: 59, g: 130, b: 246 },
  consideration: { r: 168, g: 85, b: 247 },
  decision: { r: 245, g: 158, b: 11 },
  conversion: { r: 16, g: 185, b: 129 },
  retention: { r: 239, g: 68, b: 68 },
};


interface FAB {
  feature: string;
  advantage: string;
  benefit: string;
}

interface StageNavItem {
  slug: string;
  label: string;
}

interface StageData {
  title: string;
  headline: string;
  tagline: string;
  problem_hook: string;
  symptoms: string[];
  solution_summary: string;
  stat_callout: {
    number: string;
    label: string;
    source: string;
  };
  fabs: FAB[];
  cta: string;
  cta_url: string;
  color: string;
  next_stage: StageNavItem | null;
  prev_stage: StageNavItem | null;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

export default function StagePageClient({
  data,
  stage,
}: {
  data: StageData;
  stage: string;
}) {
  const currentGlow = stageGlowMap[stage.toLowerCase()] || { r: 240, g: 180, b: 41 };

  return (
    <main className={styles.stagePage}>
      {/* ── Hero ── */}
      <motion.section
        className={styles.hero}
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className={styles.stageBadge}
          style={{
            color: data.color,
            backgroundColor: `color-mix(in srgb, ${data.color} 12%, transparent)`,
          }}
        >
          {data.title}
        </motion.div>

        <motion.h1
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className={styles.heroHeadline}
        >
          {data.headline}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className={styles.heroTagline}
        >
          {data.tagline}
        </motion.p>

        <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
          <Link href={data.cta_url} className={styles.heroCta}>
            {data.cta} →
          </Link>
        </motion.div>
      </motion.section>

      <motion.section
        className={styles.problemSection}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={fadeUp}
        transition={{ duration: 0.6 }}
      >
        <GlowCard 
          className={styles.problemCard} 
          glow={currentGlow}
          glowColor={data.color}
        >
          <div className={styles.stageCardContent}>
            <p
              className={styles.problemLabel}
              style={{ color: data.color }}
            >
              Sound familiar?
            </p>
            <h2 className={styles.problemHook}>{data.problem_hook}</h2>

            <ul className={styles.symptomList}>
              {data.symptoms.map((symptom, i) => (
                <motion.li
                  key={i}
                  className={styles.symptomItem}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                >
                  <span
                    className={styles.symptomCheck}
                    style={{ color: data.color }}
                  >
                    ✓
                  </span>
                  <span>{symptom}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </GlowCard>
      </motion.section>

      {/* ── Stat Callout ── */}
      <motion.section
        className={styles.statSection}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={fadeUp}
        transition={{ duration: 0.7 }}
      >
        <div className={styles.statNumber} style={{ color: data.color }}>
          {data.stat_callout.number}
        </div>
        <p className={styles.statLabel}>{data.stat_callout.label}</p>
        <p className={styles.statSource}>— {data.stat_callout.source}</p>
      </motion.section>

      {/* ── Solution Section ── */}
      <motion.section
        className={styles.solutionSection}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={fadeUp}
        transition={{ duration: 0.6 }}
      >
        <p className={styles.solutionText}>{data.solution_summary}</p>
      </motion.section>

      {/* ── FAB Grid ── */}
      <section className={styles.fabSection}>
        <motion.h2
          className={styles.fabSectionTitle}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
        >
          What we build at this stage
        </motion.h2>

        <motion.div
          className={styles.fabGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
        >
          {data.fabs.map((fab, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
            >
              <GlowCard 
                className={styles.fabCard}
                glow={currentGlow}
                glowColor={data.color}
              >
                <div className={styles.stageCardContent}>
                  <div
                    className={styles.fabNumber}
                    style={{
                      backgroundColor: `color-mix(in srgb, ${data.color} 15%, transparent)`,
                      color: data.color,
                    }}
                  >
                    0{i + 1}
                  </div>

                  <h3 className={styles.fabFeatureTitle}>{fab.feature}</h3>
                  <p className={styles.fabAdvantage}>{fab.advantage}</p>

                  <div className={styles.fabDivider} />

                  <p className={styles.fabBenefit}>{fab.benefit}</p>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── CTA Section ── */}
      <motion.section
        className={styles.ctaSectionWrapper}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={fadeUp}
        transition={{ duration: 0.6 }}
      >
        <GlowCard 
          className={styles.ctaSection}
          glow={currentGlow}
          glowColor={data.color}
        >
          <div className={styles.stageCardContent}>
            <h2 className={styles.ctaTitle}>
              Ready to strengthen this stage?
            </h2>
            <p className={styles.ctaSubtitle}>
              See where friction lives and what to fix first in your{' '}
              {stage.charAt(0).toUpperCase() + stage.slice(1)} stage.
            </p>
            <div className={styles.ctaButtonGroup}>
              <Link href={data.cta_url} className={styles.ctaButton}>
                {data.cta} →
              </Link>
              <CallButton size="large" />
              <Link 
                href="/blueprint" 
                className={styles.ctaButtonSecondary}
              >
                Get the Blueprint (PDF)
              </Link>
            </div>
          </div>
        </GlowCard>
      </motion.section>

      {/* ── Stage Navigation ── */}
      <nav className={styles.stageNav}>
        {data.prev_stage ? (
          <Link
            href={`/revenue-journey/${data.prev_stage.slug}`}
            className={styles.stageNavLink}
          >
            ← {data.prev_stage.label}
          </Link>
        ) : (
          <span />
        )}

        <Link href="/#ideology" className={styles.stageNavCenter}>
          All Stages
        </Link>

        {data.next_stage ? (
          <Link
            href={`/revenue-journey/${data.next_stage.slug}`}
            className={styles.stageNavLink}
          >
            {data.next_stage.label} →
          </Link>
        ) : (
          <span />
        )}
      </nav>

      {/* ── Background Glow ── */}
      <div
        className={styles.backgroundGlow}
        style={{ backgroundColor: data.color }}
      />
    </main>
  );
}
