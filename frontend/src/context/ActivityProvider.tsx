import { ActivityContext } from './ActivityContextObject'
import type { ActivityContextType } from './ActivityTypes'
import { type ActivityData } from '@/shared/types'
import { type ReactNode, useState, useRef, useEffect } from 'react'
import api from '@/api'

export function ActivityProvider({ children }: { children: ReactNode }) {
  const [activities, setActivities] = useState<Array<ActivityData>>([])
  const [currentDay, setCurrentDay] = useState<string>(new Date().toDateString())
  const timerRef = useRef<NodeJS.Timeout | null>(null)

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

  const onFetchActivities = async () => {
    const res = await api.get('/api/activities/')
    if (res.status !== 200) return
    setActivities(res.data)
  }

  const onDayChangeActivityUpdate = async () => {
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
  }

  const onDeleteActivity = (id: number) => {
    api
      .delete(`/api/activities/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          console.log('activity deleted')
          setActivities((prev: Array<ActivityData>) => prev.filter((act) => act.id !== id))
        } else console.log('failed to delete')
      })
      .catch((err) => console.log(err))
  }

  const onUpdateActivity = (updatedActivity: ActivityData) => {
    const { id } = updatedActivity
    api
      .put(`/api/activities/update/${id}/`, updatedActivity)
      .then((res) => {
        if (res.status === 200) {
          console.log('Activity updated: ', res.data)
          setActivities((prev) =>
            prev.map((activity) =>
              activity.id === updatedActivity.id ? { ...activity, ...updatedActivity } : activity,
            ),
          )
        } else {
          console.log('Update failed')
        }
      })
      .catch((err) => console.log(err))
  }

  const onCreateActivity = (title: string) => {
    const newActivity: ActivityData = {
      id: Date.now(),
      title,
      description: '',
      is_habit: false,
      completed: false,
      shared: false,
      created_at: new Date(),
      last_updated: new Date(),
      times_completed: 0,
    }

    api
      .post('/api/activities/', { title })
      .then((res) => {
        if (res.status === 201) {
          console.log('activity created')
          setActivities((prev) => [...prev, newActivity])
        } else console.log('failed to create')
      })
      .catch((err) => console.log(err))
  }

  const contextValue: ActivityContextType = {
    onUpdateActivity,
    onDeleteActivity,
    onFetchActivities,
    onCreateActivity,
    activities,
    setActivities,
    onDayChangeActivityUpdate,
  }

  return <ActivityContext.Provider value={contextValue}>{children}</ActivityContext.Provider>
}
