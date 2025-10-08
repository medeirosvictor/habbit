import { useContext } from 'react'
import { HabitContext } from '@/context/HabitContextObject'
import type { HabitContextType } from '@/context/HabitTypes'

export function useHabitContext(): HabitContextType {
  const ctx = useContext(HabitContext)
  if (!ctx) throw new Error('useHabit must be used within HabitProvider')
  return ctx
}
