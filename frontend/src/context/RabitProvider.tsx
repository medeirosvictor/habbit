import { RabitContext } from './RabitContextObject'
import type { RabitContextType } from './RabitTypes'
import type { RabitData, MessageTypes } from '@/shared/types'
import { type ReactNode, useState, useRef, useEffect, useCallback } from 'react'
import { isSameDay } from '@/utils/date'
import api from '@/api'
import { supabase } from '@/supabase-client'

export function RabitProvider({ children }: { children: ReactNode }) {
  const [rabits, setRabits] = useState<Array<RabitData>>([])
  const [currentDay, setCurrentDay] = useState<string>(new Date().toDateString())
  const [message, setMessage] = useState<MessageTypes | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Stable callback for day change update
  const onDayChangeRabitUpdate = useCallback(() => {
    api
      .get('/api/rabits/')
      .then((res) => res.data)
      .then((data) => {
        data.sort((a: RabitData, b: RabitData) => {
          if (a.is_habit && !b.is_habit) return -1
          if (!a.is_habit && b.is_habit) return 1
          return 0
        })
        const today = new Date(currentDay)
        data.forEach((rabit: RabitData) => {
          const lastUpdated = new Date(rabit.last_updated)
          if (lastUpdated.toDateString() !== today.toDateString()) {
            rabit.completed = false
            api.put(`/api/rabits/update/${rabit.id}/`, rabit).catch((err) => {
              console.log(err)
            })
          }
        })
        setRabits(data)
      })
      .catch((err) => console.log(err))
  }, [currentDay])

  // To keep track of last day without causing re-renders
  useEffect(() => {
    timerRef.current = setInterval(() => {
      const todayString = new Date().toDateString()
      if (todayString !== currentDay) {
        setCurrentDay(todayString)
        onDayChangeRabitUpdate()
      }
    }, 60 * 1000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [currentDay, onDayChangeRabitUpdate])

  // On initial load or page refresh, check if habits need to be reset
  useEffect(() => {
    if (rabits.length === 0) return
    onDayChangeRabitUpdate()
  }, [onDayChangeRabitUpdate, rabits.length])

  const updateMessage = (msg: MessageTypes) => {
    setMessage(msg)
    setTimeout(() => setMessage(null), 3500)
  }

  const onFetchRabit = async (id: number) => {
    try {
      const res = await api.get(`/api/rabits/${id}/`)
      if (res.status !== 200) return
      return res.data
    } catch (err) {
      console.log(err)
    }
  }

  const onFetchRabits = async () => {
    const res = await api.get('/api/rabits/')
    if (res.status !== 200) return
    setRabits(res.data)
  }

  const onDeleteRabit = (id: number) => {
    api
      .delete(`/api/rabits/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          updateMessage({ type: 'info', text: 'rabit deleted' })
          setRabits((prev: Array<RabitData>) => prev.filter((act) => act.id !== id))
        } else console.log('failed to delete')
      })
      .catch((err) => console.log(err))
  }

  const onUpdateRabit = async (updatedRabit: RabitData, onlyDoneId?: number) => {
    if (onlyDoneId && !updatedRabit.id) {
      await onFetchRabit(onlyDoneId).then((data) => {
        if (data) updatedRabit = data
        updatedRabit.completed = !updatedRabit.completed
      })
    }

    const { id, last_completed, completed } = updatedRabit
    const today = new Date()

    if (completed) {
      if (last_completed && isSameDay(last_completed, today)) {
        updateMessage({
          type: 'error',
          text: 'Rabit already completed today. No update to times_completed made.',
        })
      } else {
        updatedRabit.times_completed = last_completed ? updatedRabit.times_completed + 1 : 1
        updatedRabit.last_completed = today
      }
    }

    api
      .put(`/api/rabits/update/${id}/`, updatedRabit)
      .then((res) => {
        if (res.status === 200) {
          setRabits((prev) =>
            prev.map((rabit) =>
              rabit.id === updatedRabit.id ? { ...rabit, ...updatedRabit } : rabit,
            ),
          )
          console.log('Rabit updated: ', res.data)
          updateMessage({ type: 'success', text: 'Rabit updated: ' + res.data })
        } else {
          updateMessage({ type: 'error', text: 'Update failed' })
        }
      })
      .catch((err) => console.log(err))
  }

  const onCreateRabit = async (title: string) => {
    const { error, data } = await supabase.from('habbits').insert({ title }).single()
    if (error || !data) {
      console.log('Error creating rabit:', error)
      updateMessage({ type: 'error', text: 'Failed to create rabit' })
      return
    }

    const rabitData = data as Partial<RabitData>
    const newRabit: RabitData = {
      id: rabitData.id!,
      title: rabitData.title!,
      description: rabitData.description ?? '',
      is_habit: rabitData.is_habit ?? false,
      created_at: rabitData.created_at ? new Date(rabitData.created_at) : new Date(),
      last_updated: rabitData.last_updated ? new Date(rabitData.last_updated) : new Date(),
      times_completed: rabitData.times_completed ?? 0,
      completed: rabitData.completed ?? false,
      shared: rabitData.shared ?? false,
      last_completed: rabitData.last_completed ? new Date(rabitData.last_completed) : null,
    }
    setRabits((prev) => [...prev, newRabit])
    updateMessage({ type: 'success', text: 'Rabit created' })
  }

  const checkForSharedRabits = (rabits: Array<RabitData>) => {
    return rabits.filter((ac) => ac.shared)
  }

  const getDoneNotHabitRabits = () => {
    return rabits.filter((ac) => ac.completed && !ac.is_habit)
  }

  const getNotDoneOrHabitRabits = () => {
    return rabits.filter((ac) => !ac.completed || ac.is_habit)
  }

  const getNotDoneRabits = () => {
    return rabits.filter((ac) => !ac.completed)
  }

  const contextValue: RabitContextType = {
    onUpdateRabit,
    onDeleteRabit,
    onFetchRabits,
    onCreateRabit,
    rabits,
    setRabits,
    onDayChangeRabitUpdate,
    onFetchRabit,
    message,
    setMessage,
    checkForSharedRabits,
    getDoneNotHabitRabits,
    getNotDoneRabits,
    getNotDoneOrHabitRabits,
  }

  return <RabitContext.Provider value={contextValue}>{children}</RabitContext.Provider>
}
