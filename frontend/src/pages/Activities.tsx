import { type ActivityData } from '@/shared/types'
import ActivityTable from '@/components/ActivityTable'
import { useEffect, useState, useRef } from 'react'
import api from '@/api'

function Activities() {
  const [activities, setActivities] = useState<ActivityData[]>([])
  const [currentDay, setCurrentDay] = useState<string>(new Date().toDateString())
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Fetch activities and check completion only when currentDay changes
  useEffect(() => {
    api
      .get('/api/activities/')
      .then((res) => res.data)
      .then((data) => {
        data.sort((a: ActivityData, b: ActivityData) => {
          if (a.is_habit && !b.is_habit) return -1
          if (!a.is_habit && b.is_habit) return 1
          return 0
        })

        // Only reset completed if last_updated is not today
        const today = new Date(currentDay)
        data.forEach((activity: ActivityData) => {
          const lastUpdated = new Date(activity.last_updated)
          if (lastUpdated.toDateString() !== today.toDateString()) {
            activity.completed = false
            api.put(`/api/activities/update/${activity.id}/`, activity).catch((err) => {
              console.log(err)
            })
          }
        })

        setActivities(data)
      })
      .catch((err) => console.log(err))
  }, [currentDay])

  // Set up timer to check for day change
  useEffect(() => {
    timerRef.current = setInterval(() => {
      const todayString = new Date().toDateString()
      if (todayString !== currentDay) {
        setCurrentDay(todayString)
      }
    }, 60 * 1000) // check every minute
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [currentDay])

  return (
    <div id="activities" className="flex flex-col max-w-[1060px] mx-auto">
      {activities && (
        <ActivityTable
          activities={activities}
          setActivities={setActivities}
          isStaticTable={false}
        />
      )}
    </div>
  )
}

export default Activities
