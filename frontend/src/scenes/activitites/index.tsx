import { type ActivityData } from '@/shared/types'
import ActivityTable from '@/components/ActivityTable'
import { useEffect, useState } from 'react'
import { mockActivities } from '@/data/mockdata'
import api from '@/api'

type Props = {}

function Activitites({}: Props) {
  const [activities, setActivities] = useState<Array<ActivityData>>(mockActivities)

  useEffect(() => {
    getActivities()
  }, [])

  const getActivities = () => {
    api
      .get('/api/activities/')
      .then((res) => res.data)
      .then((data) => {
        setActivities(data)
        console.log(data)
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
    <section id="activities" className="my-5 py-5">
      <div className="flex flex-col mx-auto w-5/6 justify-center">
        <ActivityTable activities={activities} setActivities={setActivities} />
      </div>
    </section>
  )
}

export default Activitites
