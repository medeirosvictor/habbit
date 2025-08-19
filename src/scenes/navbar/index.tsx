import { useState } from 'react'
import { Bar3Icon, XMarkIcon } from '@heroicons/react/24/solid'
import Logo from '@/assets/logo.png'
import Link from './Link'
import type { SelectedPage } from '@/shared/types'

interface NavbarProps {
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
}

const Navbar = ({ selectedPage, setSelectedPage }: NavbarProps) => {
  const flexBetween = 'flex items-center justify-between'

  return (
    <nav>
      <div className={`${flexBetween} fixed top-0 z-30 w-full py-6`}>
        <div className={`${flexBetween} mx-auto w-5/6`}>
          <div className={`${flexBetween} w-full gap-16`}>
            {/* Left side nav */}
            <img className='w-[300px]' src={Logo} alt="logo" />
            {/* Right side nav */}
            <div className={`${flexBetween} w-full`}>
              <div className={`${flexBetween} gap-8 text-sm`}>
                <Link page='Activities' selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                <Link page='Shared' selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                <Link page='About' selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                <Link page='Contact Us' selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
              </div>
              <div className={`${flexBetween} gap-8 text-sm`}>
                <Link page='Sign In' selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                <Link page='Buy me a Coffee' selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
