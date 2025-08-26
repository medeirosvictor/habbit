import AccountForm from '@/components/AccountForm'

type Props = {}

function Register({}: Props) {
  return (
    <div>
      <AccountForm route="/api/user/register/" method="register" />
    </div>
  )
}

export default Register
