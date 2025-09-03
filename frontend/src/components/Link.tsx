import { getActiveLink } from '@/utils/activeLink'

interface LinkProps {
  page: string
  name: string
  onClick?: () => void
}

function Link({ page, name, onClick }: LinkProps) {
  const activeLink = getActiveLink()

  return (
    <a
      href={`/${page}`}
      className={`${page === activeLink ? 'text-primary-500 underline' : ''}
       transition duration-500 hover:text-primary-300`}
      onClick={onClick}
    >
      {name}
    </a>
  )
}

export default Link
