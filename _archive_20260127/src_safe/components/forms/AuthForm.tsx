'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'

interface AuthFormProps {
    type: 'login' | 'signup'
}

export function AuthForm({ type }: AuthFormProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)

        try {
            if (type === 'signup') {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: `${location.origin}/auth/callback`,
                    },
                })
                if (error) throw error
                toast.success('Check your email to confirm your account')
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                })
                if (error) throw error
                toast.success('Successfully logged in')
                router.push('/dashboard')
                router.refresh()
            }
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full max-w-md mx-auto p-6 rounded-[var(--radius-xl)] bg-[var(--color-background)] border border-[var(--color-border)] shadow-lg">
            <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold mb-2">
                    {type === 'login' ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-[var(--color-muted)] text-sm">
                    {type === 'login'
                        ? 'Enter your credentials to access your dashboard'
                        : 'Start your revenue journey today'}
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

                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                        required
                        minLength={6}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 px-4 rounded-[var(--radius-lg)] bg-[var(--color-primary)] text-white font-medium hover:bg-[var(--color-primary-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Processing...' : type === 'login' ? 'Sign In' : 'Sign Up'}
                </button>
            </form>

            <div className="mt-6 text-center text-sm">
                <span className="text-[var(--color-muted)]">
                    {type === 'login' ? "Don't have an account? " : "Already have an account? "}
                </span>
                <Link
                    href={type === 'login' ? '/signup' : '/login'}
                    className="text-[var(--color-primary)] hover:underline font-medium"
                >
                    {type === 'login' ? 'Sign up' : 'Log in'}
                </Link>
            </div>
        </div>
    )
}
