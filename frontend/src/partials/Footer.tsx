import { Link } from 'react-router'
import { useAuth } from '@/hooks/useAuth'
import type { FC } from 'react'

const Footer: FC = () => {
  const { isAuthorized } = useAuth()

  return (
    <footer className="flex md:flex-row justify-center items-center gap-2 h-16 bg-black text-white font-bold px-4 text-sm">
      <span>© 2025 Victor Medeiros</span>
      <a
        href="https://github.com/medeirosvictor/habbit"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-gray-300"
      >
        GitHub Repo
      </a>
      <div className="flex gap-3">
        <Link to="login">{isAuthorized ? '' : 'login / register'}</Link>
        <Link to="about">about</Link>
      </div>
    </footer>
  )
}

export default Footer
