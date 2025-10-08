import { useState, type FormEvent, type SubmitEvent } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '@/hooks/useAuth'
import axios from 'axios'

type Props = {
  setErrorMessage: (message: string) => void
}

const AccountForm = ({ setErrorMessage }: Props) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const { login, register } = useAuth()

  const handleSubmit = async (e: FormEvent) => {
    setLoading(true)
    e.preventDefault()
    const method = (e.nativeEvent as SubmitEvent).submitter.value
    console.log(method)
    const success =
      method === 'register' ? await register(email, password) : await login(email, password)

    if (success) {
      navigate('/')
    } else {
      setErrorMessage(`${method} failed. please check your credentials or email confirmation.`)
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
        <div className="flex gap-4">
          <button
            className={`cursor-pointer border-1 border-emerald-600 p-2 mt-2 hover:border-emerald-950 hover:bg-violet-900 hover:text-white`}
            type="submit"
            value="login"
          >
            Login
          </button>
          <button
            className={`cursor-pointer border-1 border-emerald-600 p-2 mt-2 hover:border-emerald-950 hover:bg-violet-900 hover:text-white bg-emerald-600 text-white`}
            type="submit"
            value="register"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  )
}

export default AccountForm
