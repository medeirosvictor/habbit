import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '@/hooks/useAuth'
import axios from 'axios'

type Props = {
  method: string
  setErrorMessage: (message: string) => void
}

const AccountForm = ({ method, setErrorMessage }: Props) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const formName = method === 'login' ? 'Login' : 'Register'
  const { login, register } = useAuth()

  const handleSubmit = async (e: FormEvent) => {
    setLoading(true)
    e.preventDefault()

    try {
      if (method === 'register') {
        const { error, data } = await register(email, password)
        if (error) {
          setErrorMessage(error.message)
          setLoading(false)
          return
        }
        if (data?.user) {
          await login(data.user.email, password)
          navigate('/rabits')
        }
      } else {
        const { error, data } = await login(email, password)
        if (error) {
          setErrorMessage(error.message)
          setLoading(false)
          return
        }
        navigate('/rabits')
      }
    } catch (error: Error | unknown) {
      setErrorMessage(
        error instanceof Error ? error.message : 'An unknown error occurred during registration.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      {loading}
      <h1 className="text-5xl">Habbit</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-1 justify-center items-center">
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border-1 border-violet-700 p-1"
        />
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border-1 border-violet-700 p-1"
        />
        <button
          className={`cursor-pointer border-1 border-emerald-600 p-2 mt-2 hover:border-emerald-950 hover:bg-violet-900 hover:text-white ${method === 'register' ? 'bg-emerald-600 text-white' : ''}`}
          type="submit"
        >
          {formName}
        </button>
      </form>
    </div>
  )
}

export default AccountForm
