import { useState } from 'react'
import { Bar3Icon, XMarkIcon } from '@heroicons/react/24/solid'

type Props = {}

const Navbar = (props: Props) => {
  const flexBetween = 'flex items-center justify-between'

  return (
    <nav>
      <div className={`${flexBetween} fixed top-0 z-30 w-full py-6`}>
        <div className={`${flexBetween} mx-auto w-5/6`}>
          <div className={`${flexBetween} w-full gap-16`}>
            {/* Left side nav */}
            <img src="" alt="logo" />
            {/* Right side nav */}
            <div className={`${flexBetween} w-full`}>
              <div className={`${flexBetween} gap-8 text-sm`}>
                <p>Activites</p>
                <p>Shared</p>
                <p>About</p>
              </div>
              <div className={`${flexBetween} gap-8 text-sm`}>
                <p>Sign In</p>
                <p>Buy me a Coffee</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
