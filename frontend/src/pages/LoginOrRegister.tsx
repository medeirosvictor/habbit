import AccountForm from '@/components/AccountForm'
import Logo from '@/assets/logo.png'
import { useState, useLayoutEffect, type FC, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useNavigate } from 'react-router'

const LoginOrRegister: FC = () => {
  const [isRegister, setIsRegister] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const { isAuthorized } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }, [errorMessage])

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
          <AccountForm
            route="/api/user/register/"
            method="register"
            setErrorMessage={setErrorMessage}
          />
        ) : (
          <AccountForm route="/api/token/" method="login" setErrorMessage={setErrorMessage} />
        )}
      </div>
      <button onClick={() => setIsRegister(!isRegister)} className="underline mt-4">
        {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
      </button>

      <div
        className={`text-sm border-1 p-2 text-white bg-red-500 h-[60px] text-center items-center flex flex-col justify-center transition duration-500 ${errorMessage ? 'opacity-100' : 'opacity-0'}`}
      >
        {errorMessage}
      </div>
    </div>
  )
}

export default LoginOrRegister
