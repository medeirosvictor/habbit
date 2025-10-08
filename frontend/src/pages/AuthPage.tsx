import AccountForm from '@/components/AccountForm'
import Logo from '@/assets/logo.png'
import { useState, useLayoutEffect, type FC, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useNavigate } from 'react-router'

const AuthPage: FC = () => {
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
      navigate('/')
    }
  }, [isAuthorized, navigate])

  return (
    <div className="w-5/6 h-5/6 mx-auto flex flex-col justify-center items-center">
      <img src={Logo} alt="habbit-logo" />
      <AccountForm setErrorMessage={setErrorMessage} />
      <div
        className={`text-sm border-1 p-2 text-white bg-red-500 h-[60px] text-center items-center flex flex-col justify-center transition duration-500 ${errorMessage ? 'opacity-100' : 'opacity-0'}`}
      >
        {errorMessage}
      </div>
    </div>
  )
}

export default AuthPage
