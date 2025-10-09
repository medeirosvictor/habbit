import AccountForm from '@/components/AccountForm'
import Logo from '@/assets/logo.png'
import { useLayoutEffect, type FC } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useNavigate } from 'react-router'

const AuthPage: FC = () => {
  const { isAuthorized } = useAuth()
  const navigate = useNavigate()

  useLayoutEffect(() => {
    if (isAuthorized) {
      navigate('/')
    }
  }, [isAuthorized, navigate])

  return (
    <div className="w-5/6 h-5/6 mx-auto flex flex-col justify-center items-center">
      <img src={Logo} alt="habbit-logo" />
      <AccountForm />
    </div>
  )
}

export default AuthPage
