import AccountForm from '@/components/AccountForm'

type Props = {}

function Login({}: Props) {
  return (
    <div>
      <AccountForm route="/api/token/" method="login" />
    </div>
  )
}

export default Login
