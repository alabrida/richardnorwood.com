import AuthForm from '@/components/forms/AuthForm'

export const metadata = {
  title: 'Client Login - Richard Norwood, PMP',
  description: 'Access your partnership client portal.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function LoginPage() {
  return (
    <>
      <AuthForm type="login" />
    </>
  )
}
