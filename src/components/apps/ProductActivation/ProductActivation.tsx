'use client';

import { useState, useCallback } from 'react';
import type { AppProps, AppConfig } from '@/lib/wms/types';
import pricingData from '@/../content/pricing.json';
import styles from './ProductActivation.module.css';

type Step = 1 | 2 | 3 | 4;

export default function ProductActivation({ onTitleChange, onClose }: AppProps) {
  const [step, setStep] = useState<Step>(1);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  // Update window title dynamically
  const updateTitle = useCallback(
    (newStep: Step) => {
      onTitleChange?.(`Partnership Application - Step ${newStep}`);
    },
    [onTitleChange]
  );

  const next = useCallback(() => {
    if (step === 2 && !selectedTier) return;
    const nextStep = Math.min(step + 1, 4) as Step;
    setStep(nextStep);
    updateTitle(nextStep);
  }, [step, selectedTier, updateTitle]);

  const back = useCallback(() => {
    const prevStep = Math.max(step - 1, 1) as Step;
    setStep(prevStep);
    updateTitle(prevStep);
  }, [step, updateTitle]);

  return (
    <div className={styles.wizard}>
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.headerIcon}>🤝</span>
        <div>
          <div className={styles.headerTitle}>Apply for Partnership</div>
          <div className={styles.headerSub}>Step {step} of 4</div>
        </div>
      </div>

      {/* Progress */}
      <div className={styles.progress}>
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={`${styles.progressDot} ${s <= step ? styles.active : ''}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className={styles.content}>
        {step === 1 && (
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>
              Let&apos;s architect your Revenue Engine
            </h3>
            <p className={styles.stepDesc}>
              We don&apos;t build websites; we build proprietary machines that sit on your balance sheet. 
              The journey begins by diagnosing your commercial leaks and establishing a Sovereign Engine.
            </p>
            <p className={styles.stepDesc}>
              Click &quot;Next&quot; to review the 3 Phases of our B2B Productized Consultancy.
            </p>
          </div>
        )}

        {step === 2 && (
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Which Phase aligns with your Maturity?</h3>
            <div className={styles.tierGrid}>
              {pricingData.tiers.map((tier) => (
                <button
                  key={tier.id}
                  className={`${styles.tierCard} ${
                    selectedTier === tier.id ? styles.selectedTier : ''
                  }`}
                  onClick={() => setSelectedTier(tier.id)}
                >
                  <div className={styles.tierName}>{tier.name}</div>
                  <div className={styles.tierPrice}>
                    {tier.term}
                  </div>
                  <div className={styles.tierTagline}>{tier.tagline}</div>
                </button>
              ))}
            </div>
            {selectedTier && (
              <p className={styles.stepDesc} style={{ marginTop: '12px', textAlign: 'center' }}>
                You selected: <strong>{pricingData.tiers.find(t => t.id === selectedTier)?.name}</strong>
              </p>
            )}
          </div>
        )}

        {step === 3 && (
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Schedule your Discovery Session</h3>
            <div className={styles.confirmBox}>
              <p>
                <strong>Focus:</strong>{' '}
                {pricingData.tiers.find((t) => t.id === selectedTier)?.name}
              </p>
              <p>
                <strong>Engagement:</strong>{' '}
                {pricingData.tiers.find((t) => t.id === selectedTier)?.term}
              </p>
              <p className={styles.stepDesc} style={{ marginTop: '12px' }}>
                You are requesting a 1:1 strategy session with Richard Norwood, PMP, to discuss your Commercial EKG and evaluate if this Phase is the right fit. 
              </p>
              <p className={styles.stepDesc}>
                Click &quot;Schedule&quot; to confirm your intent and open the booking calendar.
              </p>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className={styles.stepContent}>
            <div className={styles.successIcon}>📅</div>
            <h3 className={styles.stepTitle}>Intent Captured</h3>
            <p className={styles.stepDesc}>
              Thank you for exploring the {pricingData.tiers.find((t) => t.id === selectedTier)?.name} with us.
            </p>
            <p className={styles.stepDesc}>
              Your next step is to click the link below or open the AIM Buddy List to chat directly with our team to finalize your booking time.
            </p>
            <p className={styles.stepDesc} style={{ marginTop: '16px', textAlign: 'center' }}>
              <a href="#" style={{ color: '#3A6EA5', fontWeight: 'bold' }}>Open Booking Calendar →</a>
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <button className={styles.wizBtn} onClick={back} disabled={step === 1 || step === 4}>
          ← Back
        </button>
        <div style={{ flex: 1 }} />
        {step < 4 && (
          <button
            className={`${styles.wizBtn} ${styles.primary}`}
            onClick={next}
            disabled={step === 2 && !selectedTier}
          >
            {step === 3 ? 'Schedule' : 'Next →'}
          </button>
        )}
        {step === 4 && (
          <button className={styles.wizBtn} onClick={() => onClose?.()}>
            Close
          </button>
        )}
      </div>
    </div>
  );
}

export const productActivationConfig: AppConfig = {
  id: 'product-activation',
  title: 'Partnership App',
  icon: '/icons/icons/stats.png',
  defaultSize: { width: 500, height: 420 },
  minSize: { width: 450, height: 350 },
  component: ProductActivation,
};
