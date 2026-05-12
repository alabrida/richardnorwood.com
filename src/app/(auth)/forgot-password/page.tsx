import AuthForm from '@/components/forms/AuthForm'

export const metadata = {
  title: 'Forgot Password - Revenue Architecture',
  description: 'Reset your password.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function ForgotPasswordPage() {
  return (
    <>
      <AuthForm type="forgot-password" />
    </>
  )
}
