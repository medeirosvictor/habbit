import type { SelectedPage } from '@/shared/types'
import React from 'react'

type Props = {
  setSelectedPage: (value: SelectedPage) => void
}

function Shared({ setSelectedPage }: Props) {
  return (
    <section>
      <div>
        Shared Activities
      </div>
    </section>
  )
}

export default Shared
