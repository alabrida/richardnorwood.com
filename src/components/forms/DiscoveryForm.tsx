'use client';

import React from 'react';
import { useForm } from '@tanstack/react-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface Question {
  id: string;
  text: string;
  type: string;
}

interface DiscoveryFormProps {
  tier: string;
  email: string;
  title: string;
  questions: Question[];
}

export default function DiscoveryForm({ tier, email, title, questions }: DiscoveryFormProps) {
  const router = useRouter();

  const form = useForm({
    defaultValues: questions.reduce((acc, q) => ({ ...acc, [q.id]: '' }), {}),
    onSubmit: async ({ value }) => {
      try {
        const response = await fetch('/api/discovery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            tier,
            answers: value,
          }),
        });

        if (!response.ok) throw new Error('Submission failed');

        toast.success('Discovery complete! Your dashboard is being provisioned.');
        router.push('/discovery/success');
      } catch (err) {
        toast.error('Something went wrong. Please try again.');
      }
    },
  });

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-surface border border-border rounded-2xl shadow-2xl">
      <h2 className="text-3xl font-heading font-bold mb-2 text-text">{title}</h2>
      <p className="text-text-muted mb-8 italic">Step 2: Refining the scope for your {tier} partnership.</p>
      
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        {questions.map((q) => (
          <form.Field
            key={q.id}
            name={q.id}
            children={(field) => (
              <div className="space-y-2">
                <label htmlFor={field.name} className="block text-sm font-semibold text-text">
                  {q.text}
                </label>
                {q.type === 'text' ? (
                  <textarea
                    id={field.name}
                    value={field.state.value as string}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full px-4 py-3 bg-primary border border-border rounded-lg text-text focus:border-secondary outline-none transition-all min-h-[100px] resize-none"
                    required
                  />
                ) : (
                  <input
                    id={field.name}
                    type={q.type}
                    value={field.state.value as string}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full px-4 py-3 bg-primary border border-border rounded-lg text-text focus:border-secondary outline-none transition-all"
                    required
                  />
                )}
              </div>
            )}
          />
        ))}

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full mt-8 py-4 px-8 bg-secondary text-text-inverse font-heading font-bold text-lg rounded-full hover:bg-secondary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl hover:shadow-secondary/20"
            >
              {isSubmitting ? 'Provisioning Dashboard...' : 'Complete Discovery'}
            </button>
          )}
        />
      </form>
    </div>
  );
}
