import AccountForm from '@/components/AccountForm'
import Logo from '@/assets/logo.png'

type Props = {}

function Login({}: Props) {
  return (
    <div className="w-5/6 h-5/6 mx-auto flex flex-col justify-center items-center">
      <img src={Logo} alt="habbit-logo" />
      <div>
        <AccountForm route="/api/token/" method="login" />
      </div>
    </div>
  )
}

export default Login
