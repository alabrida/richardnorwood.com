import { ResetPasswordForm } from '@/components/forms/ResetPasswordForm'
import { Container } from '@/components/layout'
import { Suspense } from 'react'

export default function ResetPasswordPage() {
    return (
        <Container className="py-20 md:py-32">
            <Suspense fallback={<div>Loading...</div>}>
                <ResetPasswordForm />
            </Suspense>
        </Container>
    )
}
