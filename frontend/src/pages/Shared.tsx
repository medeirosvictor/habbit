import ActivityTable from '@/components/ActivityTable'
import type { FC } from 'react'
import { useState, useEffect } from 'react'
import { type ActivityData } from '@/shared/types'
import api from '@/api'

const Shared: FC = () => {
  const [activites, setActivities] = useState<ActivityData[]>([])

  useEffect(() => {
    api
      .get('/api/activities/')
      .then((res) => res.data)
      .then((data) => {
        const sharedActivities = data.filter((activity: ActivityData) => activity.shared)
        setActivities(sharedActivities)
      })
  }, [])

  return (
    <div>
      <div>
        <ActivityTable activities={activites} setActivities={setActivities} />
      </div>
    </div>
  )
}

export default Shared
