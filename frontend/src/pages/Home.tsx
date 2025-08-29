import { useEffect, useState } from 'react'
import Navbar from '@/partials/navbar'
import Activitites from '@/scenes/activitites'
import Shared from '@/scenes/shared'
import { SelectedPage, type ActivityData } from '@/shared/types'

type Props = {
  setSelectedPage: (value: SelectedPage) => void
}

function Home({ setSelectedPage }: Props) {
  return (
    <div>
      <div className="app bg-gray-50 font-bold">
        <Activitites setSelectedPage={setSelectedPage} />
        <Shared setSelectedPage={setSelectedPage} />
      </div>
    </div>
  )
}

export default Home
