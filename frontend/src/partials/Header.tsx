import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { SelectedPage } from '@/shared/types'

type Props = {
  selectedPage: SelectedPage
  setSelectedPage: (value: SelectedPage) => void
}

function Header({ selectedPage, setSelectedPage }: Props) {
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true)
        setSelectedPage(SelectedPage.Activities)
      }
      if (window.scrollY !== 0) setIsTopOfPage(false)
    }

    window.addEventListener('scroll', handleScroll)

    // when the component unmounts/disappears
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <Navbar
      isTopOfPage={isTopOfPage}
      selectedPage={selectedPage}
      setSelectedPage={setSelectedPage}
    />
  )
}

export default Header
