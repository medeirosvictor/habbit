import AccountForm from '@/components/AccountForm'
import Logo from '@/assets/logo.png'
import type { FC } from 'react'
import { useState, useLayoutEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useNavigate } from 'react-router'

const LoginOrRegister: FC = () => {
  const [isRegister, setIsRegister] = useState(false)
  const { isAuthorized } = useAuth()
  const navigate = useNavigate()

  useLayoutEffect(() => {
    if (isAuthorized) {
      navigate('/activities')
    }
  }, [isAuthorized, navigate])

  return (
    <div className="w-5/6 h-5/6 mx-auto flex flex-col justify-center items-center">
      <img src={Logo} alt="habbit-logo" />
      <div>
        {isRegister ? (
          <AccountForm route="/api/user/register/" method="register" />
        ) : (
          <AccountForm route="/api/token/" method="login" />
        )}
      </div>
      <button onClick={() => setIsRegister(!isRegister)} className="underline mt-4">
        {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
      </button>
    </div>
  )
}

export default LoginOrRegister
