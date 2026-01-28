import { AuthForm } from '@/components/forms/AuthForm'
import { Container } from '@/components/layout'

export default function LoginPage() {
    return (
        <Container className="py-20 md:py-32">
            <AuthForm type="login" />
        </Container>
    )
}
