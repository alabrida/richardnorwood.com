import AuthForm from '@/components/forms/AuthForm'

export const metadata = {
  title: 'Sign In - Revenue Architecture',
  description: 'Log in to your master dashboard.'
}

export default function LoginPage() {
  return (
    <>
      <AuthForm type="login" />
    </>
  )
}
