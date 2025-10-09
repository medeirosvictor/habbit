import { createContext } from 'react'
import { type ToastContextType } from './ToastTypes'

export const ToastContext = createContext<ToastContextType | undefined>(undefined)
