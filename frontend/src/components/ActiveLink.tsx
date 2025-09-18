import { Link, useLocation } from 'react-router'

type ActiveLinkProps = {
  to: string
  children: React.ReactNode
  className?: string
  activeClassName?: string
}

export function ActiveLink({
  to,
  children,
  className = '',
  activeClassName = 'text-emerald-400 font-bold underline',
}: ActiveLinkProps) {
  const location = useLocation()
  const isActive = location.pathname === to
  return (
    <Link to={to} className={`${className} ${isActive ? activeClassName : ''}`}>
      {children}
    </Link>
  )
}
