'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './StagePage.module.css';

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

      {/* ── Problem Section ── */}
      <motion.section
        className={styles.problemSection}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={fadeUp}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.problemCard}>
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
              className={styles.fabCard}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
            >
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
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── CTA Section ── */}
      <motion.section
        className={styles.ctaSection}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={fadeUp}
        transition={{ duration: 0.6 }}
      >
        <h2 className={styles.ctaTitle}>
          Ready to strengthen this stage?
        </h2>
        <p className={styles.ctaSubtitle}>
          See where friction lives and what to fix first in your{' '}
          {stage.charAt(0).toUpperCase() + stage.slice(1)} stage.
        </p>
        <Link href={data.cta_url} className={styles.ctaButton}>
          {data.cta} →
        </Link>
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
