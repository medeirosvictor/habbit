import ActionButton from '@/shared/ActionButton'
import useMediaQuery from '@/hooks/useMediaQuery'
import { SelectedPage, type ActivityData } from '@/shared/types'
import ActivityTable from '@/components/ActivityTable'
import { useState } from 'react'
import { mockActivities } from '@/data/mockdata'
import AddActivityForm from '@/components/AddActivityForm'

type Props = {
  setSelectedPage: (value: SelectedPage) => void
}

function Activitites({ setSelectedPage }: Props) {
  const isAboveMediumScreens = useMediaQuery('(min-width: 1060px)')
  const [activities, setActivitites] = useState<Array<ActivityData>>(mockActivities)


  return (
    <section id='activities' className='my-5 py-5'>
      <div className='flex flex-col mx-auto w-5/6 justify-center'>
        <ActivityTable activities={activities}/>
      </div>
    </section>
  )
}

export default Activitites
