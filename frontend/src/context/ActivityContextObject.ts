import { createContext } from 'react'
import { type ActivityContextType } from './ActivityTypes'

export const ActivityContext = createContext<ActivityContextType | undefined>(undefined)
