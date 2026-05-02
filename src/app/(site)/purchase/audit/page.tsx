'use client';

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Container from '@/components/layout/Container';
import ClearanceForm from '@/components/forms/ClearanceForm';
import PayPalCheckout from '@/components/forms/PayPalCheckout';

export default function PurchaseAuditPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const leadId = searchParams.get('id');
  const email = searchParams.get('email');
  const [isClearanceComplete, setIsClearanceComplete] = useState(false);

  if (!leadId || !email) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', background: '#060b16' }}>
        <Container>
          <div style={{ textAlign: 'center', color: '#fff' }}>
            <h1 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>Access Link Invalid</h1>
            <p style={{ color: 'var(--color-text-subtle)' }}>Please run the Health Check first to generate your audit link.</p>
          </div>
        </Container>
      </main>
    );
  }

  const handleClearanceSuccess = () => {
    setIsClearanceComplete(true);
  };

  const handlePaymentSuccess = (data: any) => {
    router.push(`/purchase/success?email=${encodeURIComponent(email)}&id=${leadId}`);
  };

  return (
    <main style={{ minHeight: '100vh', padding: 'var(--space-32) 0', background: '#060b16' }}>
      <Container>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 12px', background: 'rgba(240, 180, 41, 0.1)', border: '1px solid rgba(240, 180, 41, 0.2)', borderRadius: 'var(--radius-full)', color: 'var(--color-secondary)', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 'var(--space-4)' }}>
              {isClearanceComplete ? 'Verification Successful' : 'Clearance Required for Instant Access'}
            </div>
            <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: 'var(--space-4)' }}>
              {isClearanceComplete ? 'Finalize Access' : 'Finalizing Your Strategic Review'}
            </h1>
            <p style={{ color: 'var(--color-text-subtle)', fontSize: 'var(--text-lg)', maxWidth: 600, margin: '0 auto' }}>
              {isClearanceComplete 
                ? 'Your business context has been successfully received. Secure your comprehensive results below.' 
                : 'To ensure your 22-point diagnostic is accurate, I need to align our findings with your current business state.'}
            </p>
          </div>

          <div style={{ background: 'var(--color-surface-elevated)', borderRadius: 'var(--radius-2xl)', border: '1px solid var(--color-border)', padding: 'var(--space-10)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
            {!isClearanceComplete ? (
              <ClearanceForm 
                leadId={leadId} 
                email={email} 
                isPaidFlow={true} 
                onLocalSuccess={handleClearanceSuccess} 
              />
            ) : (
              <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-8)', textAlign: 'center' }}>
                  Secure Checkout: Instant Audit Access
                </h3>
                <PayPalCheckout leadId={leadId} onSuccess={handlePaymentSuccess} />
              </div>
            )}
          </div>

          <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginTop: 'var(--space-10)', fontSize: 'var(--text-sm)' }}>
            Secure Transmission Active. Your data is encrypted and used only for diagnostic purposes.
          </p>
        </div>
      </Container>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
