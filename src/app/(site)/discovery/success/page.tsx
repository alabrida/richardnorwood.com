import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function DiscoverySuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center pt-20 px-4 bg-primary overflow-hidden">
      <div className="max-w-xl w-full text-center space-y-8 relative z-10">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-secondary/20 border border-secondary/40 rounded-full flex items-center justify-center animate-pulse">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-secondary">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-heading font-bold text-text">Intake Received</h1>
          <p className="text-xl text-text-muted">
            The Actor is now processing your data. Your personalized dashboard is being provisioned via Terraform.
          </p>
        </div>

        <div className="p-6 bg-surface border border-border rounded-xl space-y-4 text-left">
          <h3 className="text-lg font-bold text-text uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 bg-secondary rounded-full" />
            Next Steps
          </h3>
          <ul className="space-y-3 text-text-subtle">
            <li className="flex gap-3 italic">
              <span className="text-secondary font-bold">1.</span>
              Check your inbox for a scheduling link to our Discovery Call.
            </li>
            <li className="flex gap-3 italic">
              <span className="text-secondary font-bold">2.</span>
              Your dashboard credentials will be sent once provisioning is complete (~5 mins).
            </li>
          </ul>
        </div>

        <div className="pt-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-secondary font-bold hover:text-secondary-dark transition-colors"
          >
            ← Return to Command Center
          </Link>
        </div>
      </div>
      
      {/* Synthetic background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[120px] -z-0 pointer-events-none" />
    </main>
  );
}
