import { useContext } from 'react'
import { HabitContext } from '@/context/habit/HabitContextObject'
import type { HabitContextType } from '@/context/habit/HabitTypes'

export function useHabitContext(): HabitContextType {
  const ctx = useContext(HabitContext)
  if (!ctx) throw new Error('useHabit must be used within HabitProvider')
  return ctx
}
