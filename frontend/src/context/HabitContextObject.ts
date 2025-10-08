import { createContext } from 'react'
import { type HabitContextType } from './HabitTypes'

export const HabitContext = createContext<HabitContextType | undefined>(undefined)
