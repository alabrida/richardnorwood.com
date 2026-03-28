import AuthForm from '@/components/forms/AuthForm'

export const metadata = {
  title: 'Reset Password - Revenue Architecture',
  description: 'Set your new secure password.'
}

export default function ResetPasswordPage() {
  return (
    <>
      <AuthForm type="reset-password" />
    </>
  )
}
