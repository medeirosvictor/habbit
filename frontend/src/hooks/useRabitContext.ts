import { useContext } from 'react'
import { RabitContext } from '@/context/RabitContextObject'
import type { RabitContextType } from '@/context/RabitTypes'

export function useRabitContext(): RabitContextType {
  const ctx = useContext(RabitContext)
  if (!ctx) throw new Error('useRabit must be used within RabitProvider')
  return ctx
}
