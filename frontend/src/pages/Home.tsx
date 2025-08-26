import { useEffect, useState } from 'react'
import Navbar from '@/scenes/navbar'
import Activitites from '@/scenes/activitites'
import Shared from '@/scenes/shared'
import { SelectedPage, type ActivityData } from '@/shared/types'

type Props = {}

function Home({}: Props) {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(SelectedPage.Activities)
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
    <div>
      <div className="app bg-gray-50 font-bold">
        <Navbar
          isTopOfPage={isTopOfPage}
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
        />

        <Activitites setSelectedPage={setSelectedPage} />
        <Shared setSelectedPage={setSelectedPage} />
      </div>
    </div>
  )
}

export default Home
