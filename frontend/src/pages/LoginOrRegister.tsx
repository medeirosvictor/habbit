import AccountForm from '@/components/AccountForm'

type Props = {}

function LoginOrRegister({}: Props) {
  return (
    <div>
      <div>
        <AccountForm route="/api/token/" method="login" />
      </div>
      <div>
        <AccountForm route="/api/user/register/" method="register" />
      </div>
    </div>
  )
}

export default LoginOrRegister
