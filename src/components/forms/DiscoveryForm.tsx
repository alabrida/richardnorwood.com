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
          body: JSON.stringify({ email, tier, answers: value }),
        });

        if (!response.ok) throw new Error('Submission failed');

        toast.success('Information received. Preparing your strategic results.');
        router.push('/discovery/success');
      } catch {
        toast.error('Something went wrong. Please try again.');
      }
    },
  });

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-[#0f1a2e] border border-[rgba(136,153,180,0.15)] rounded-2xl shadow-2xl">
      <h2 className="text-3xl font-heading font-bold mb-2 text-[#e8edf5]">{title}</h2>
      <p className="text-[#8899b4] mb-8 italic">Step 2: Refining the scope for your {tier} partnership.</p>
      
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        {questions.map((q) => (
          <form.Field key={q.id} name={q.id}>
            {(field) => (
              <div className="space-y-2">
                <label htmlFor={field.name} className="block text-sm font-semibold text-[#e8edf5]">
                  {q.text}
                </label>
                {q.type === 'text' ? (
                  <textarea
                    id={field.name}
                    value={field.state.value as string}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0a1628] border border-[rgba(136,153,180,0.15)] rounded-lg text-[#e8edf5] focus:border-[#f0b429] outline-none transition-all min-h-[100px] resize-none"
                    required
                  />
                ) : (
                  <input
                    id={field.name}
                    type={q.type}
                    value={field.state.value as string}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0a1628] border border-[rgba(136,153,180,0.15)] rounded-lg text-[#e8edf5] focus:border-[#f0b429] outline-none transition-all"
                    required
                  />
                )}
              </div>
            )}
          </form.Field>
        ))}

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full mt-8 py-4 px-8 bg-[#f0b429] text-[#060b16] font-heading font-bold text-lg rounded-full hover:bg-[#d49a1a] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl hover:shadow-[#f0b429]/20"
            >
              {isSubmitting ? 'Preparing Your Results...' : 'Finalize Discovery'}
            </button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}
