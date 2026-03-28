import AuthForm from '@/components/forms/AuthForm'

export const metadata = {
  title: 'Forgot Password - Revenue Architecture',
  description: 'Reset your password.'
}

export default function ForgotPasswordPage() {
  return (
    <>
      <AuthForm type="forgot-password" />
    </>
  )
}
