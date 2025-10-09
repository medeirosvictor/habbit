import { useContext } from 'react'
import { ToastContext } from '@/context/toast/ToastContextObject'
import type { ToastContextType } from '@/context/toast/ToastTypes'

export function useToast(): ToastContextType {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
