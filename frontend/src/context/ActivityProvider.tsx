import { ActivityContext } from './ActivityContextObject'
import type { ActivityContextType } from './ActivityTypes'
import type { ActivityData, MessageTypes } from '@/shared/types'
import { type ReactNode, useState, useRef, useEffect } from 'react'
import api from '@/api'

export function ActivityProvider({ children }: { children: ReactNode }) {
  const [activities, setActivities] = useState<Array<ActivityData>>([])
  const [currentDay, setCurrentDay] = useState<string>(new Date().toDateString())
  const [message, setMessage] = useState<MessageTypes | null>(null)
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

  const updateMessage = (msg: MessageTypes) => {
    setMessage(msg)
    setTimeout(() => setMessage(null), 2500)
  }

  const onFetchActivity = async (id: number) => {
    try {
      const res = await api.get(`/api/activities/${id}/`)
      if (res.status !== 200) return
      return res.data
    } catch (err) {
      console.log(err)
    }
  }

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
          updateMessage({ type: 'info', text: 'activity deleted' })
          setActivities((prev: Array<ActivityData>) => prev.filter((act) => act.id !== id))
        } else console.log('failed to delete')
      })
      .catch((err) => console.log(err))
  }

  const onUpdateActivity = async (updatedActivity: ActivityData, onlyDoneId?: number) => {
    if (onlyDoneId && !updatedActivity.id) {
      await onFetchActivity(onlyDoneId).then((data) => {
        if (data) updatedActivity = data
        updatedActivity.completed = !updatedActivity.completed
      })
    }

    const { id, last_completed, completed } = updatedActivity
    const lastCompletedDate = new Date(last_completed || '')
    const today = new Date()

    if (completed) {
      if (last_completed) {
        if (lastCompletedDate.toDateString() === today.toDateString()) {
          updateMessage({
            type: 'error',
            text: 'Activity already completed today. No update to times_completed made.',
          })
        } else {
          updatedActivity.times_completed += 1
        }
      } else {
        updatedActivity.last_completed = new Date()
        updatedActivity.times_completed = 1
      }
    }

    api
      .put(`/api/activities/update/${id}/`, updatedActivity)
      .then((res) => {
        if (res.status === 200) {
          updateMessage({ type: 'success', text: 'Activity updated: ' + res.data })
          setActivities((prev) =>
            prev.map((activity) =>
              activity.id === updatedActivity.id ? { ...activity, ...updatedActivity } : activity,
            ),
          )
        } else {
          updateMessage({ type: 'error', text: 'Update failed' })
        }
      })
      .catch((err) => console.log(err))
  }

  const onCreateActivity = (title: string) => {
    api
      .post('/api/activities/', { title })
      .then((res) => {
        if (res.status === 201) {
          updateMessage({ type: 'success', text: 'activity created' })
          setActivities((prev) => [...prev, res.data])
        } else console.log('failed to create')
      })
      .catch((err) => console.log(err))
  }

  const checkForSharedActivities = (activities: Array<ActivityData>) => {
    return activities.filter((ac) => ac.shared)
  }

  const contextValue: ActivityContextType = {
    onUpdateActivity,
    onDeleteActivity,
    onFetchActivities,
    onCreateActivity,
    activities,
    setActivities,
    onDayChangeActivityUpdate,
    onFetchActivity,
    message,
    setMessage,
    checkForSharedActivities,
  }

  return <ActivityContext.Provider value={contextValue}>{children}</ActivityContext.Provider>
}
