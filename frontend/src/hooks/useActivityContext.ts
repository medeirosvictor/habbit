import { useContext } from 'react'
import { ActivityContext } from '@/context/ActivityContextObject'
import type { ActivityContextType } from '@/context/ActivityTypes'

export function useActivityContext(): ActivityContextType {
  const ctx = useContext(ActivityContext)
  if (!ctx) throw new Error('useActivity must be used within ActivityProvider')
  return ctx
}
