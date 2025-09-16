import { createContext } from 'react'
import { type RabitContextType } from './RabitTypes'

export const RabitContext = createContext<RabitContextType | undefined>(undefined)
