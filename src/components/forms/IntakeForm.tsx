'use client';

import React from 'react';
import { useForm } from '@tanstack/react-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface IntakeFormProps {
  defaultTier?: string;
}

export default function IntakeForm({ defaultTier = '90-days' }: IntakeFormProps) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      company: '',
      websiteUrl: '',
      tier: defaultTier,
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await fetch('/api/intake', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(value),
        });

        if (!response.ok) throw new Error('Submission failed');

        toast.success('Intake complete. Starting analysis...');
        router.push(`/discovery/${value.tier}?email=${encodeURIComponent(value.email)}`);
      } catch (err) {
        toast.error('Something went wrong. Please try again.');
      }
    },
  });

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-surface border border-border rounded-xl shadow-xl">
      <h2 className="text-2xl font-heading font-bold mb-6 text-text">Initialize Your Engine</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        <form.Field
          name="name"
          children={(field) => (
            <div>
              <label htmlFor={field.name} className="block text-xs font-medium text-text-muted uppercase mb-1">Name</label>
              <input
                id={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Richard Norwood"
                className="w-full px-4 py-2 bg-primary border border-border rounded-md text-text focus:border-secondary outline-none transition-colors"
                required
              />
            </div>
          )}
        />
        <form.Field
          name="email"
          children={(field) => (
            <div>
              <label htmlFor={field.name} className="block text-xs font-medium text-text-muted uppercase mb-1">Work Email</label>
              <input
                id={field.name}
                type="email"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="you@company.com"
                className="w-full px-4 py-2 bg-primary border border-border rounded-md text-text focus:border-secondary outline-none transition-colors"
                required
              />
            </div>
          )}
        />
        <form.Field
          name="company"
          children={(field) => (
            <div>
              <label htmlFor={field.name} className="block text-xs font-medium text-text-muted uppercase mb-1">Company</label>
              <input
                id={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Acme Corp"
                className="w-full px-4 py-2 bg-primary border border-border rounded-md text-text focus:border-secondary outline-none transition-colors"
                required
              />
            </div>
          )}
        />
        <form.Field
          name="websiteUrl"
          children={(field) => (
            <div>
              <label htmlFor={field.name} className="block text-xs font-medium text-text-muted uppercase mb-1">Website URL</label>
              <input
                id={field.name}
                type="url"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="https://acme.com"
                className="w-full px-4 py-2 bg-primary border border-border rounded-md text-text focus:border-secondary outline-none transition-colors"
                required
              />
            </div>
          )}
        />
        
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full mt-6 py-3 px-6 bg-secondary text-text-inverse font-heading font-bold rounded-full hover:bg-secondary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-secondary/20"
            >
              {isSubmitting ? 'Processing...' : 'Next Step: Discovery'}
            </button>
          )}
        />
      </form>
    </div>
  );
}
