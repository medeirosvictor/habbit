import type { ToastMessageTypes } from '@/shared/types'

export type ToastContextType = {
  message: ToastMessageTypes | null
  showMessage: (msg: ToastMessageTypes) => void
}
