import { useState, type FormEvent } from 'react'
import api from '@/api'
import { useNavigate } from 'react-router'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants'

type Props = {
  route: string
  method: string
}

const AccountForm = ({ route, method }: Props) => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const formName = method === 'login' ? 'Login' : 'Register'

  const handleSubmit = async (e: FormEvent) => {
    setLoading(true)
    e.preventDefault()

    try {
      const res = await api.post(route, { username, password })
      if (method === 'login') {
        localStorage.setItem(ACCESS_TOKEN, res.data.access)
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
        console.log(localStorage)
        navigate('/')
      } else {
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {loading}
      <form onSubmit={handleSubmit}>
        <h1>{formName}</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">{formName}</button>
      </form>
    </div>
  )
}

export default AccountForm
