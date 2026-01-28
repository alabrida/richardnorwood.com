'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'
import Link from 'next/link'

export function ForgotPasswordForm() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const supabase = createClient()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${location.origin}/auth/callback?next=/reset-password`,
            })
            if (error) throw error
            toast.success('Check your email for the password reset link')
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full max-w-md mx-auto p-6 rounded-[var(--radius-xl)] bg-[var(--color-background)] border border-[var(--color-border)] shadow-lg">
            <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold mb-2">Reset Password</h2>
                <p className="text-[var(--color-muted)] text-sm">
                    Enter your email to receive a reset link
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 px-4 rounded-[var(--radius-lg)] bg-[var(--color-primary)] text-white font-medium hover:bg-[var(--color-primary-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Sending Link...' : 'Send Reset Link'}
                </button>
            </form>

            <div className="mt-6 text-center text-sm">
                <Link
                    href="/login"
                    className="text-[var(--color-primary)] hover:underline font-medium"
                >
                    Back to Login
                </Link>
            </div>
        </div>
    )
}
