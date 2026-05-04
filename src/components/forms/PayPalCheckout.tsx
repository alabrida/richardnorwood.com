'use client';

import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import type { OnApproveData } from '@paypal/paypal-js';
import { toast } from 'sonner';

type PayPalOrderResponse = {
  id?: string;
  status?: string;
};

interface PayPalCheckoutProps {
  leadId: string;
  onSuccess: (data: PayPalOrderResponse) => void;
}

export default function PayPalCheckout({ leadId, onSuccess }: PayPalCheckoutProps) {
  const [loading, setLoading] = useState(false);

  const initialOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
    enableFunding: "venmo,paylater",
    dataSdkIntegrationSource: "button-factory",
    currency: "USD",
  };

  const createOrder = async (): Promise<string> => {
    try {
      const response = await fetch("/api/paypal/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lead_id: leadId }),
      });
      const order = await response.json() as PayPalOrderResponse;
      if (!order.id) {
        throw new Error('Missing PayPal order ID');
      }
      return order.id;
    } catch (err) {
      console.error(err);
      toast.error("Failed to initialize checkout.");
      throw err;
    }
  };

  const onApprove = async (data: OnApproveData) => {
    setLoading(true);
    try {
      const response = await fetch("/api/paypal/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderID: data.orderID, lead_id: leadId }),
      });
      const orderData = await response.json() as PayPalOrderResponse;

      if (orderData.status === 'COMPLETED') {
        toast.success("Payment successful. Provisioning your audit...");
        onSuccess(orderData);
      } else {
        toast.error("Payment was not completed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during payment capture.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {loading && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(6, 11, 22, 0.8)', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-xl)' }}>
          <p style={{ color: 'var(--color-secondary)', fontWeight: 'bold' }}>Finalizing Transaction...</p>
        </div>
      )}
      
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons 
          style={{ layout: "vertical", shape: "pill", label: "pay" }}
          createOrder={createOrder}
          onApprove={onApprove}
        />
      </PayPalScriptProvider>
      
      <div style={{ marginTop: 'var(--space-6)', textAlign: 'center' }}>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-subtle)' }}>
          Secure payment processed via PayPal. All major cards accepted.
        </p>
      </div>
    </div>
  );
}
