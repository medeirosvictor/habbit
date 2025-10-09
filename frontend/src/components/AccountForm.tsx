import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '@/hooks/useAuth'

const AccountForm = () => {
  const styles = {
    input: 'border-1 border-violet-700 p-1 min-w-[275px]',
    button:
      'cursor-pointer border-1 border-emerald-600 p-2 mt-2 hover:border-emerald-950 hover:bg-violet-900 hover:text-white w-[100px]',
  }

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const { login, register, getCurrentProfile } = useAuth()
  const [method, setMethod] = useState<'login' | 'register'>('login')

  const handleSubmit = async (e: FormEvent) => {
    setLoading(true)
    e.preventDefault()
    const success =
      method === 'register' ? await register(email, password) : await login(email, password)

    if (success) {
      const profile = await getCurrentProfile()
      if (profile) navigate('/profile')
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
          className={styles.input}
        />
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className={styles.input}
        />
        <div className="flex gap-4">
          <button
            className={styles.button}
            type="submit"
            value="login"
            onClick={() => setMethod('login')}
          >
            Login
          </button>
          <button
            className={styles.button}
            type="submit"
            value="register"
            onClick={() => setMethod('register')}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  )
}

export default AccountForm
