'use client';

import { useState, useCallback } from 'react';
import type { AppProps, AppConfig } from '@/lib/wms/types';
import pricingData from '@/../content/pricing.json';
import styles from './ProductActivation.module.css';

type Step = 1 | 2 | 3 | 4;

export default function ProductActivation(_props: AppProps) {
  const [step, setStep] = useState<Step>(1);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const next = useCallback(() => {
    if (step === 2 && !selectedTier) return;
    setStep((prev) => Math.min(prev + 1, 4) as Step);
  }, [step, selectedTier]);

  const back = useCallback(() => {
    setStep((prev) => Math.max(prev - 1, 1) as Step);
  }, []);

  return (
    <div className={styles.wizard}>
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.headerIcon}>🔑</span>
        <div>
          <div className={styles.headerTitle}>Revenue Architect Product Activation</div>
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
              Let&apos;s activate your Revenue Architect license
            </h3>
            <p className={styles.stepDesc}>
              Choose a plan that fits your needs. You can always upgrade later as your
              business grows.
            </p>
            <p className={styles.stepDesc}>
              Click &quot;Next&quot; to see available plans.
            </p>
          </div>
        )}

        {step === 2 && (
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Choose your plan</h3>
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
                    {tier.price === 0
                      ? 'Free'
                      : tier.price
                      ? `$${tier.price}/mo`
                      : 'Custom'}
                  </div>
                  <div className={styles.tierTagline}>{tier.tagline}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Confirm your selection</h3>
            <div className={styles.confirmBox}>
              <p>
                <strong>Plan:</strong>{' '}
                {pricingData.tiers.find((t) => t.id === selectedTier)?.name}
              </p>
              <p>
                <strong>Price:</strong>{' '}
                {(() => {
                  const t = pricingData.tiers.find((t) => t.id === selectedTier);
                  return t?.price === 0
                    ? 'Free'
                    : t?.price
                    ? `$${t.price}/month`
                    : 'Custom pricing';
                })()}
              </p>
              <p className={styles.stepDesc}>
                {selectedTier === 'free'
                  ? 'No credit card required. Start immediately.'
                  : selectedTier === 'battleship'
                  ? 'A team member will contact you to discuss pricing.'
                  : 'You will be redirected to secure checkout via Stripe.'}
              </p>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className={styles.stepContent}>
            <div className={styles.successIcon}>✅</div>
            <h3 className={styles.stepTitle}>Your product is now activated!</h3>
            <p className={styles.stepDesc}>
              Thank you for choosing Revenue Architect. Your{' '}
              {pricingData.tiers.find((t) => t.id === selectedTier)?.name} plan is now
              active.
            </p>
            <p className={styles.stepDesc}>
              You can manage your subscription anytime from Control Panel → User Accounts.
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
            {step === 3 ? 'Activate' : 'Next →'}
          </button>
        )}
        {step === 4 && (
          <button className={styles.wizBtn} onClick={() => setStep(1)}>
            Close
          </button>
        )}
      </div>
    </div>
  );
}

export const productActivationConfig: AppConfig = {
  id: 'product-activation',
  title: 'Product Activation',
  icon: '/icons/activation.png',
  defaultSize: { width: 500, height: 420 },
  minSize: { width: 400, height: 350 },
  component: ProductActivation,
};
