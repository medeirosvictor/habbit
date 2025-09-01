import { useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'
import Logo from '@/assets/logo.png'
import Link from './Link'
import type { SelectedPage } from '@/shared/types'
import useMediaQuery from '@/hooks/useMediaQuery'
import { useAuth } from '@/hooks/useAuth'

interface NavbarProps {
  isTopOfPage: boolean
  selectedPage: SelectedPage
  setSelectedPage: (value: SelectedPage) => void
}

const Navbar = ({ isTopOfPage, selectedPage, setSelectedPage }: NavbarProps) => {
  const flexBetween = 'flex items-center justify-between'
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false)
  const isAboveMediumScreens = useMediaQuery('(min-width: 1060px)')
  const navbarBackground = isTopOfPage ? '' : 'bg-primary-100 drop-shadow'
  const { isAuthorized, logout } = useAuth()

  return (
    <nav className="h-[110px]">
      <div
        className={`${navbarBackground} ${flexBetween} fixed top-0 z-30 w-full py-5 transition duration-400 bg-primary-100`}
      >
        <div className={`${flexBetween} mx-auto w-5/6`}>
          <div className={`${flexBetween} w-full gap-16`}>
            {/* Left side nav */}
            <img className="md:w-[100px] w-[60px]" src={Logo} alt="logo" />

            <h1 className="text-3xl">Habbit</h1>
            {/* Right side nav */}
            {isAboveMediumScreens ? (
              <div className={`${flexBetween} w-full`}>
                <div className={`${flexBetween} gap-8 text-sm`}>
                  <Link page="home" name="activities" />
                  <Link page="shared" name="shared" />
                  <Link page="about" name="about" />
                </div>
                <div className={`${flexBetween} gap-8 text-sm`}>
                  <Link
                    page={isAuthorized ? 'Logout' : 'Login'}
                    name={isAuthorized ? 'Logout' : 'Login'}
                  />
                </div>
              </div>
            ) : (
              <div className="flex justify-between">
                <button
                  className="rounded-full bg-secondary-500 p-2"
                  onClick={() => setIsMenuToggled(!isMenuToggled)}
                >
                  <Bars3Icon className="h-6 w-6 text-white" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Side Modal */}
      {!isAboveMediumScreens && isMenuToggled && (
        <div className="fixed right-0 bottom-0 z-40 h-full w-[250px] bg-primary-100 drop-shadow-lg">
          <div className="flex justify-end p-12">
            <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
              <XMarkIcon className="h-6 w-6 text-gray-500" />
            </button>
          </div>
          <div className="ml-[33%] flex flex-col text-xl gap-10">
            <Link page="/" name="activities" />
            <Link page="shared" name="shared" />
            <Link page="about" name="about" />
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
