import React from 'react';
import styles from './RevenueDashboard.module.css';

interface StageScore {
  stage: string;
  score: number;
  color: string;
}

interface Leak {
  rank: number;
  title: string;
  stage: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
}

interface DashboardData {
  overall_score: number;
  stage_scores: StageScore[];
  leaks: Leak[];
}

interface RevenueDashboardProps {
  data: DashboardData;
  getScoreColor: (score: number) => string;
}

export default function RevenueDashboard({ data, getScoreColor }: RevenueDashboardProps) {
  return (
    <div className={styles.dashboard}>
      <div className={styles.scoreHeader}>
        <div className={styles.scoreCircle} style={{ background: getScoreColor(data.overall_score) }}>
          {data.overall_score}
        </div>
        <div className={styles.scoreInfo}>
          <div className={styles.scoreTitle}>Revenue Journey Score</div>
          <div className={styles.scoreDesc}>Your overall score across all 5 stages of the Revenue Journey.</div>
        </div>
      </div>

      <div className={styles.stageBars}>
        {data.stage_scores.map((stage) => (
          <div key={stage.stage} className={styles.stageBar}>
            <span className={styles.stageLabel} style={{ color: stage.color }}>{stage.stage}</span>
            <div className={styles.stageTrack}>
              <div className={styles.stageFill} style={{ width: `${stage.score}%`, background: stage.color }} />
            </div>
            <span className={styles.stageScore}>{stage.score}%</span>
          </div>
        ))}
      </div>

      <div className={styles.sectionTitle}>Top Revenue Leaks</div>
      <div className={styles.leakList}>
        {data.leaks.map((leak) => (
          <div key={leak.rank} className={styles.leakItem}>
            <div className={styles.leakHeader}>
              <span className={`${styles.leakRank} ${leak.severity === 'high' ? styles.high : leak.severity === 'medium' ? styles.medium : ''}`}>
                {leak.rank}
              </span>
              <span className={styles.leakTitle}>{leak.title}</span>
              <span className={styles.leakStage}>{leak.stage}</span>
            </div>
            <div className={styles.leakDesc}>{leak.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
