import { type ActivityData } from '@/shared/types'
import ActivityTable from '@/components/ActivityTable'
import { useEffect, useState } from 'react'
import api from '@/api'

type Props = {}

function Activitites({}: Props) {
  const [activities, setActivities] = useState<Array<ActivityData>>()

  useEffect(() => {
    getActivities()
  }, [])

  const getActivities = () => {
    api
      .get('/api/activities/')
      .then((res) => res.data)
      .then((data) => {
        setActivities(data)
      })
      .catch((err) => console.log(err))
  }

  const deleteActivity = (id) => {
    api
      .delete(`/api/activities/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) console.log('activity deleted')
        else console.log('failed to delete')
      })
      .catch((err) => console.log(err))
  }

  return (
    <div id="activities" className="flex flex-col max-w-[1060px] mx-auto">
      {activities && <ActivityTable activities={activities} setActivities={setActivities} />}
    </div>
  )
}

export default Activitites
