'use client';

import Link from 'next/link';
import { Button, Dialog, DialogTrigger, Modal, ModalOverlay } from 'react-aria-components';

const navigation = [
    { name: 'Services', href: '/services' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
];

export function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass">
            <nav className="container flex items-center justify-between py-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-xl font-bold text-gradient">
                        Richard Norwood
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* CTA Buttons */}
                <div className="hidden md:flex items-center gap-4">
                    <Link
                        href="/login"
                        className="text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
                    >
                        Login
                    </Link>
                    <Link
                        href="/calculator"
                        className="px-4 py-2 text-sm font-medium text-white bg-[var(--color-cta)] hover:bg-[var(--color-cta-hover)] rounded-[var(--radius-lg)] transition-colors"
                    >
                        Audit Your Engine
                    </Link>
                </div>

                {/* Mobile Menu Trigger */}
                <DialogTrigger>
                    <Button
                        className="md:hidden p-2 text-[var(--color-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] rounded-[var(--radius-md)]"
                        aria-label="Menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </Button>
                    <ModalOverlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm is-entering:animate-in is-entering:fade-in is-exiting:animate-out is-exiting:fade-out">
                        <Modal className="fixed inset-x-0 top-0 z-50 glass border-b border-[var(--color-border)] outline-none is-entering:animate-in is-entering:slide-in-from-top is-exiting:animate-out is-exiting:slide-out-to-top">
                            <Dialog className="outline-none">
                                {({ close }) => (
                                    <div className="container py-4 space-y-4">
                                        <div className="flex justify-between items-center mb-4">
                                            <Link href="/" className="text-xl font-bold text-gradient" onClick={close}>
                                                Richard Norwood
                                            </Link>
                                            <Button
                                                onPress={close}
                                                className="p-2 text-[var(--color-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] rounded-[var(--radius-md)]"
                                                aria-label="Close menu"
                                            >
                                                <svg
                                                    className="w-6 h-6"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </Button>
                                        </div>
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className="block text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-foreground)] py-2"
                                                onClick={close}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                        <hr className="border-[var(--color-border)]" />
                                        <Link
                                            href="/login"
                                            className="block text-sm font-medium text-[var(--color-muted)] py-2"
                                            onClick={close}
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href="/calculator"
                                            className="block w-full text-center px-4 py-3 text-sm font-medium text-white bg-[var(--color-primary)] rounded-[var(--radius-lg)] hover:bg-[var(--color-primary-hover)] transition-colors"
                                            onClick={close}
                                        >
                                            Audit Your Engine
                                        </Link>
                                    </div>
                                )}
                            </Dialog>
                        </Modal>
                    </ModalOverlay>
                </DialogTrigger>
            </nav>
        </header>
    );
}
