import { useState, type ReactNode } from 'react'
import type { ToastMessageTypes } from '@/shared/types'
import { ToastContext } from './ToastContextObject'

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<ToastMessageTypes | null>(null)

  const showMessage = (msg: ToastMessageTypes) => {
    setMessage(msg)
    setTimeout(() => setMessage(null), 3500)
  }

  return <ToastContext.Provider value={{ message, showMessage }}>{children}</ToastContext.Provider>
}
