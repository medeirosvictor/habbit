import { useState, type FormEvent } from 'react'
import api from '@/api'
import { useNavigate } from 'react-router'
import { useAuth } from '@/hooks/useAuth'
import axios from 'axios'

type Props = {
  route: string
  method: string
  setErrorMessage: (message: string) => void
}

const AccountForm = ({ route, method, setErrorMessage }: Props) => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const formName = method === 'login' ? 'Login' : 'Register'
  const { login } = useAuth()

  const handleSubmit = async (e: FormEvent) => {
    setLoading(true)
    e.preventDefault()

    try {
      const res = await api.post(route, { username, password })

      if (res.status == 200 || res.status === 201) {
        await login(res.data.access, res.data.refresh)
        navigate('/activities')
      }
    } catch (error: Error | unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.detail)
        localStorage.clear()
      }
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
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
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
        {method === 'register' && (
          <>
            <input
              type="email"
              name="email"
              id=""
              placeholder="email"
              className="border-1 border-violet-700 p-1"
            />
          </>
        )}
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
