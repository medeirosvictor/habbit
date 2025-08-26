import type { SelectedPage } from '@/shared/types';
import AnchorLink from 'react-anchor-link-smooth-scroll'

interface LinkProps {
  page: string;
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
}

function Link({
  page,
  selectedPage,
  setSelectedPage
}: LinkProps) {
  const lowerCasePage = page.toLocaleLowerCase().replace(/ /g, '') as SelectedPage

  return (
    <AnchorLink
      href={`#${lowerCasePage}`}
      className={`${selectedPage === lowerCasePage ? 'text-primary-500': ''}
       transition duration-500 hover:text-primary-300`}
      onClick={() => setSelectedPage(lowerCasePage)}>
      {page}
    </AnchorLink>
  )
}

export default Link
