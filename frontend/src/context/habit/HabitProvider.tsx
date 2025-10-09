import { HabitContext } from './HabitContextObject'
import type { HabitContextType } from './HabitTypes'
import type { HabitData } from '@/shared/types'
import { type ReactNode, useState, useRef, useEffect, useCallback } from 'react'
import { isSameDay } from '@/utils/date'
import api from '@/api'
import { supabase } from '@/supabase-client'

export function HabitProvider({ children }: { children: ReactNode }) {
  const [habits, setHabits] = useState<Array<HabitData>>([])
  const [currentDay, setCurrentDay] = useState<string>(new Date().toDateString())
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Stable callback for day change update
  const onDayChangeHabitUpdate = useCallback(() => {
    api
      .get('/api/habits/')
      .then((res) => res.data)
      .then((data) => {
        data.sort((a: HabitData, b: HabitData) => {
          if (a.is_habit && !b.is_habit) return -1
          if (!a.is_habit && b.is_habit) return 1
          return 0
        })
        const today = new Date(currentDay)
        data.forEach((habit: HabitData) => {
          const lastUpdated = new Date(habit.last_updated)
          if (lastUpdated.toDateString() !== today.toDateString()) {
            habit.completed = false
            api.put(`/api/habits/update/${habit.id}/`, habit).catch((err) => {
              console.log(err)
            })
          }
        })
        setHabits(data)
      })
      .catch((err) => console.log(err))
  }, [currentDay])

  // To keep track of last day without causing re-renders
  useEffect(() => {
    timerRef.current = setInterval(() => {
      const todayString = new Date().toDateString()
      if (todayString !== currentDay) {
        setCurrentDay(todayString)
        onDayChangeHabitUpdate()
      }
    }, 60 * 1000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [currentDay, onDayChangeHabitUpdate])

  // On initial load or page refresh, check if habits need to be reset
  useEffect(() => {
    if (habits.length === 0) return
    onDayChangeHabitUpdate()
  }, [onDayChangeHabitUpdate, habits.length])

  const onFetchHabit = async (id: number) => {
    try {
      const res = await api.get(`/api/habits/${id}/`)
      if (res.status !== 200) return
      return res.data
    } catch (err) {
      console.log(err)
    }
  }

  const onFetchHabits = async () => {
    const res = await api.get('/api/habits/')
    if (res.status !== 200) return
    setHabits(res.data)
  }

  const onDeleteHabit = (id: number) => {
    api
      .delete(`/api/habits/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          updateMessage({ type: 'info', text: 'habit deleted' })
          setHabits((prev: Array<HabitData>) => prev.filter((act) => act.id !== id))
        } else console.log('failed to delete')
      })
      .catch((err) => console.log(err))
  }

  const onUpdateHabit = async (updatedHabit: HabitData, onlyDoneId?: number) => {
    if (onlyDoneId && !updatedHabit.id) {
      await onFetchHabit(onlyDoneId).then((data) => {
        if (data) updatedHabit = data
        updatedHabit.completed = !updatedHabit.completed
      })
    }

    const { id, last_completed, completed } = updatedHabit
    const today = new Date()

    if (completed) {
      if (last_completed && isSameDay(last_completed, today)) {
        updateMessage({
          type: 'error',
          text: 'Habit already completed today. No update to times_completed made.',
        })
      } else {
        updatedHabit.times_completed = last_completed ? updatedHabit.times_completed + 1 : 1
        updatedHabit.last_completed = today
      }
    }

    api
      .put(`/api/habits/update/${id}/`, updatedHabit)
      .then((res) => {
        if (res.status === 200) {
          setHabits((prev) =>
            prev.map((habit) =>
              habit.id === updatedHabit.id ? { ...habit, ...updatedHabit } : habit,
            ),
          )
          console.log('Habit updated: ', res.data)
          updateMessage({ type: 'success', text: 'Habit updated: ' + res.data })
        } else {
          updateMessage({ type: 'error', text: 'Update failed' })
        }
      })
      .catch((err) => console.log(err))
  }

  const onCreateHabit = async (title: string) => {
    const { error, data } = await supabase.from('habbits').insert({ title }).single()
    if (error || !data) {
      console.log('Error creating habit:', error)
      updateMessage({ type: 'error', text: 'Failed to create habit' })
      return
    }

    const habitData = data as Partial<HabitData>
    const newHabit: HabitData = {
      id: habitData.id!,
      title: habitData.title!,
      description: habitData.description ?? '',
      is_habit: habitData.is_habit ?? false,
      created_at: habitData.created_at ? new Date(habitData.created_at) : new Date(),
      last_updated: habitData.last_updated ? new Date(habitData.last_updated) : new Date(),
      times_completed: habitData.times_completed ?? 0,
      completed: habitData.completed ?? false,
      shared: habitData.shared ?? false,
      last_completed: habitData.last_completed ? new Date(habitData.last_completed) : null,
    }
    setHabits((prev) => [...prev, newHabit])
    updateMessage({ type: 'success', text: 'Habit created' })
  }

  const checkForSharedHabits = (habits: Array<HabitData>) => {
    return habits.filter((ac) => ac.shared)
  }

  const getDoneNotHabitHabits = () => {
    return habits.filter((ac) => ac.completed && !ac.is_habit)
  }

  const getNotDoneOrHabitHabits = () => {
    return habits.filter((ac) => !ac.completed || ac.is_habit)
  }

  const getNotDoneHabits = () => {
    return habits.filter((ac) => !ac.completed)
  }

  const contextValue: HabitContextType = {
    onUpdateHabit,
    onDeleteHabit,
    onFetchHabits,
    onCreateHabit,
    habits,
    setHabits,
    onDayChangeHabitUpdate,
    onFetchHabit,
    checkForSharedHabits,
    getDoneNotHabitHabits,
    getNotDoneHabits,
    getNotDoneOrHabitHabits,
  }

  return <HabitContext.Provider value={contextValue}>{children}</HabitContext.Provider>
}
