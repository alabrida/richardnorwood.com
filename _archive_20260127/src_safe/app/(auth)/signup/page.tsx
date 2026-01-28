import { AuthForm } from '@/components/forms/AuthForm'
import { Container } from '@/components/layout'

export default function SignupPage() {
    return (
        <Container className="py-20 md:py-32">
            <AuthForm type="signup" />
        </Container>
    )
}
