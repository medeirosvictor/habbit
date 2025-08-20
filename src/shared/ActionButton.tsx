import type React from "react"
import AnchorLink from "react-anchor-link-smooth-scroll"
import { SelectedPage } from "./types"

type ActionButtonProps = {
  children: React.ReactNode
  setSelectedPage: (value: SelectedPage) => void
}

const ActionButton = ({ children, setSelectedPage }: ActionButtonProps) => {
  return (
    <AnchorLink
      className='rounded-md bg-secondary-500 px-10 py-2 hover:bg-primary-300 text-white'
      onClick={() => setSelectedPage(SelectedPage.ContactUs)}
      href={`#${SelectedPage.ContactUs}`}
    >
      {children}
    </AnchorLink>
  )
}

export default ActionButton
