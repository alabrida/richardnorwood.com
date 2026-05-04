'use client';

import React from 'react';
import { useForm } from '@tanstack/react-form';
import { toast } from 'sonner';

interface ClearanceFormProps {
  leadId: string;
  email: string;
  isPaidFlow?: boolean;
  onLocalSuccess?: () => void;
}

export default function ClearanceForm({ leadId, email, isPaidFlow = false, onLocalSuccess }: ClearanceFormProps) {
  const form = useForm({
    defaultValues: {
      bottleneck: '',
      systems: '',
      owns_paths: 'sovereign',
      validate_fit: 'self_serve',
    },
    onSubmit: async ({ value }) => {
      try {
        const formData = new FormData();
        formData.append('lead_id', leadId);
        formData.append('email', email);
        formData.append('bottleneck', value.bottleneck);
        formData.append('systems', value.systems);
        formData.append('owns_paths', value.owns_paths);
        formData.append('validate_fit', value.validate_fit);

        const response = await fetch('/api/clearance', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) throw new Error('Clearance failed');

        if (onLocalSuccess) {
          onLocalSuccess();
        } else if (isPaidFlow) {
          toast.success('Information received. Redirecting to secure checkout...');
          setTimeout(() => {
            window.location.href = 'https://buy.stripe.com/mock-audit-purchase';
          }, 1500);
        } else {
          window.location.href = `/clearance/success?email=${encodeURIComponent(email)}`;
        }
      } catch {
        toast.error('Submission failed. Please try again.');
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}
    >
      <form.Field name="bottleneck">
        {(field) => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <label style={{ fontSize: 'var(--text-sm)', fontWeight: 'bold', color: 'var(--color-text)' }}>
              Primary Revenue Bottleneck
            </label>
            <textarea
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Where is the system leaking? (e.g. Lead conversion is manual, data is fragmented...)"
              required
              rows={4}
              style={{ width: '100%', padding: 'var(--space-4)', background: 'var(--color-bg-alt)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', color: 'var(--color-text)', resize: 'none' }}
            />
          </div>
        )}
      </form.Field>

      <form.Field name="owns_paths">
        {(field) => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <label style={{ fontSize: 'var(--text-sm)', fontWeight: 'bold', color: 'var(--color-text)' }}>
              Infrastructure Sovereignty
            </label>
            <select
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              style={{ width: '100%', padding: 'var(--space-4)', background: 'var(--color-bg-alt)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', color: 'var(--color-text)' }}
            >
              <option value="sovereign">We own our data & discovery paths</option>
              <option value="platform_dependent">Dependent on 3rd party algorithms/ads</option>
              <option value="locked_in">Totally locked into proprietary vendor stacks</option>
            </select>
          </div>
        )}
      </form.Field>

      <form.Field name="validate_fit">
        {(field) => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <label style={{ fontSize: 'var(--text-sm)', fontWeight: 'bold', color: 'var(--color-text)' }}>
              Buyer Validation
            </label>
            <select
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              style={{ width: '100%', padding: 'var(--space-4)', background: 'var(--color-bg-alt)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', color: 'var(--color-text)' }}
            >
              <option value="self_serve">Buyers can validate fit without talking to us</option>
              <option value="human_required">Requires human intervention for basic fit</option>
            </select>
          </div>
        )}
      </form.Field>

      <form.Field name="systems">
        {(field) => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <label style={{ fontSize: 'var(--text-sm)', fontWeight: 'bold', color: 'var(--color-text)' }}>
              Current Tech Stack / CRM
            </label>
            <input
              type="text"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="e.g. HubSpot, Salesforce, custom DB..."
              required
              style={{ width: '100%', padding: 'var(--space-4)', background: 'var(--color-bg-alt)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', color: 'var(--color-text)' }}
            />
          </div>
        )}
      </form.Field>

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <button
            type="submit"
            disabled={!canSubmit}
            style={{ 
              background: isPaidFlow ? 'var(--color-accent)' : 'var(--color-secondary)', 
              color: 'var(--color-text-inverse)', 
              padding: '16px', 
              borderRadius: 'var(--radius-full)', 
              fontWeight: 'bold', 
              border: 'none', 
              cursor: 'pointer',
              marginTop: 'var(--space-4)',
              transition: 'opacity 0.2s'
            }}
          >
            {isSubmitting ? 'Verifying...' : (isPaidFlow ? 'Confirm & Proceed to Payment' : 'Complete Review')}
          </button>
        )}
      </form.Subscribe>
    </form>
  );
}
