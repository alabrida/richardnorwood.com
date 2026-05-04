'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  loadCoreSdkScript,
  type OnApproveDataOneTimePayments,
  type OnErrorData,
  type OneTimePaymentSession,
} from '@paypal/paypal-js/sdk-v6';
import { toast } from 'sonner';

type PayPalEnvironment = 'production' | 'sandbox';

type PayPalConfig = {
  clientId: string;
  environment: PayPalEnvironment;
};

type PayPalOrderResponse = {
  id?: string;
  status?: string;
};

type CheckoutStatus = 'initializing' | 'ready' | 'ineligible' | 'error';

interface PayPalCheckoutProps {
  leadId: string;
  onSuccess: (data: PayPalOrderResponse) => void;
}

export default function PayPalCheckout({ leadId, onSuccess }: PayPalCheckoutProps) {
  const buttonRef = useRef<HTMLElement | null>(null);
  const sessionRef = useRef<OneTimePaymentSession | null>(null);
  const [status, setStatus] = useState<CheckoutStatus>('initializing');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    let button: HTMLElement | null = null;
    let handleClick: (() => Promise<void>) | null = null;

    const fetchConfig = async (): Promise<PayPalConfig> => {
      const response = await fetch('/api/paypal/config');
      if (!response.ok) {
        throw new Error('Failed to load PayPal configuration');
      }

      return await response.json() as PayPalConfig;
    };

    const createOrder = async (): Promise<{ orderId: string }> => {
      const response = await fetch('/api/paypal/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lead_id: leadId }),
      });
      const order = await response.json() as PayPalOrderResponse;

      if (!order.id) {
        throw new Error('Missing PayPal order ID');
      }

      return { orderId: order.id };
    };

    const captureOrder = async ({ orderId }: OnApproveDataOneTimePayments) => {
      setLoading(true);
      try {
        const response = await fetch('/api/paypal/orders', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderID: orderId, lead_id: leadId }),
        });
        const orderData = await response.json() as PayPalOrderResponse;

        if (orderData.status === 'COMPLETED') {
          toast.success('Payment successful. Provisioning your audit...');
          onSuccess(orderData);
        } else {
          toast.error('Payment was not completed. Please try again.');
        }
      } catch (error) {
        console.error(error);
        toast.error('An error occurred during payment capture.');
      } finally {
        setLoading(false);
      }
    };

    const handleSessionError = (error: OnErrorData) => {
      console.error(error);
      toast.error(error.message || 'PayPal checkout failed. Please try again.');
    };

    const initializePayPal = async () => {
      setStatus('initializing');

      try {
        const config = await fetchConfig();
        const paypal = await loadCoreSdkScript({
          environment: config.environment,
          dataSdkIntegrationSource: 'richardnorwood-consulting-checkout',
        });

        if (!active || !paypal) return;

        const sdkInstance = await paypal.createInstance({
          clientId: config.clientId,
          components: ['paypal-payments'] as const,
          pageType: 'checkout',
        });

        const paymentMethods = await sdkInstance.findEligibleMethods({
          amount: '497.00',
          currencyCode: 'USD',
          paymentFlow: 'ONE_TIME_PAYMENT',
        });

        if (!active) return;

        if (!paymentMethods.isEligible('paypal')) {
          setStatus('ineligible');
          return;
        }

        const session = sdkInstance.createPayPalOneTimePaymentSession({
          commit: true,
          onApprove: captureOrder,
          onCancel: () => toast.message('PayPal checkout canceled.'),
          onError: handleSessionError,
        });

        sessionRef.current = session;
        button = buttonRef.current;

        handleClick = async () => {
          setLoading(true);
          try {
            await session.start(
              { presentationMode: 'auto' },
              createOrder()
            );
          } catch (error) {
            console.error(error);
            toast.error('PayPal checkout could not be started.');
          } finally {
            setLoading(false);
          }
        };

        button?.addEventListener('click', handleClick);
        button?.removeAttribute('hidden');
        setStatus('ready');
      } catch (error) {
        console.error(error);
        if (active) {
          setStatus('error');
        }
      }
    };

    initializePayPal();

    return () => {
      active = false;
      if (button && handleClick) {
        button.removeEventListener('click', handleClick);
      }
      sessionRef.current?.destroy();
      sessionRef.current = null;
    };
  }, [leadId, onSuccess]);

  const isBusy = loading || status === 'initializing';

  return (
    <div style={{ position: 'relative' }}>
      {isBusy && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(6, 11, 22, 0.8)', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-xl)' }}>
          <p style={{ color: 'var(--color-secondary)', fontWeight: 'bold' }}>
            {status === 'initializing' ? 'Preparing secure checkout...' : 'Finalizing Transaction...'}
          </p>
        </div>
      )}

      {status === 'error' && (
        <p style={{ color: 'var(--color-error)', textAlign: 'center', marginBottom: 'var(--space-4)' }}>
          PayPal checkout is temporarily unavailable. Please refresh and try again.
        </p>
      )}

      {status === 'ineligible' && (
        <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', marginBottom: 'var(--space-4)' }}>
          PayPal checkout is not available for this session.
        </p>
      )}

      {React.createElement('paypal-button', {
        ref: buttonRef,
        hidden: true,
        style: { display: status === 'ready' ? 'block' : 'none' },
      })}

      <div style={{ marginTop: 'var(--space-6)', textAlign: 'center' }}>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-subtle)' }}>
          Secure payment processed via PayPal. All major cards accepted.
        </p>
      </div>
    </div>
  );
}
