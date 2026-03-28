import AuthForm from '@/components/forms/AuthForm'

export const metadata = {
  title: 'Create Account - Revenue Architecture',
  description: 'Join the definitive commercial engine.'
}

export default function SignupPage() {
  return (
    <>
      <AuthForm type="signup" />
    </>
  )
}
