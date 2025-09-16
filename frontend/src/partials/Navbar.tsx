import { useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'
import Logo from '@/assets/logo.png'
import Link from '@/components/Link'
import type { SelectedPage } from '@/shared/types'
import useMediaQuery from '@/hooks/useMediaQuery'
import { useAuth } from '@/hooks/useAuth'

interface NavbarProps {
  isTopOfPage: boolean
  selectedPage: SelectedPage
  setSelectedPage: (value: SelectedPage) => void
}

const Navbar = ({ isTopOfPage }: NavbarProps) => {
  const flexBetween = 'flex items-center justify-between'
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false)
  const isAboveMediumScreens = useMediaQuery('(min-width: 1060px)')
  const navbarBackground = isTopOfPage ? '' : 'bg-gray-100 drop-shadow'
  const { isAuthorized, logout } = useAuth()

  return (
    <>
      <nav
        className={`${navbarBackground} ${flexBetween} h-[70px] sticky top-0 z-30 w-full py-5 transition duration-400 bg-linear-to-r from-emerald-500 to-teal-500 border-b-1 border-dashed text-white`}
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
                  <Link page="rabits" name="rabits" />
                  <Link page="shared" name="shared" />
                  <Link page="friends" name="friends" />
                  <Link page="profile" name="profile" />
                  <Link page="about" name="about" />
                </div>
                <div className={`${flexBetween} gap-8 text-sm`}>
                  <button
                    className="w-[80px] text-red-400 font-bold underline"
                    onClick={isAuthorized ? logout : undefined}
                  >
                    {isAuthorized ? 'Logout' : 'Login'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between">
                <button
                  className="rounded-full bg-[#467ab8] p-2"
                  onClick={() => setIsMenuToggled(!isMenuToggled)}
                >
                  <Bars3Icon className="h-6 w-6 text-white" />
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      {/* Mobile Side Modal */}
      {!isAboveMediumScreens && isMenuToggled && (
        <div className="fixed right-0 bottom-0 z-40 h-full w-[250px] bg-linear-to-t from-emerald-600 to-teal-700 drop-shadow-lg border-l-1 border-dashed text-white">
          <div className="flex justify-end p-12">
            <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
              <XMarkIcon className="h-6 w-6 text-[#fd73e0] cursor-pointer" />
            </button>
          </div>
          <div className="ml-[33%] flex flex-col text-xl gap-10">
            <Link page="rabits" name="rabits" />
            <Link page="shared" name="shared" />
            <Link page="friends" name="friends" />
            <Link page="profile" name="profile" />
            <Link page="about" name="about" />
            <button
              className="border-1 p-2 w-[100px] text-red-400 font-bold"
              onClick={isAuthorized ? logout : undefined}
            >
              {isAuthorized ? 'Logout' : 'Login'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
