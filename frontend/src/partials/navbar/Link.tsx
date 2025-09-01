import { getActiveLink } from '@/utils/activeLink'

interface LinkProps {
  page: string
  name: string
}

function Link({ page, name }: LinkProps) {
  const activeLink = getActiveLink()

  return (
    <a
      href={`/${page}`}
      className={`${page === activeLink ? 'text-primary-500' : ''}
       transition duration-500 hover:text-primary-300`}
    >
      {name}
    </a>
  )
}

export default Link
