import type { RabitData, MessageTypes } from '@/shared/types'

export interface RabitContextType {
  onUpdateRabit: (updatedRabit: RabitData, onlyDoneId?: number) => void
  onDeleteRabit: (id: number) => void
  onFetchRabits: () => Promise<void>
  onCreateRabit: (title: string) => void
  onDayChangeRabitUpdate: () => void
  onFetchRabit: (id: number) => Promise<RabitData | undefined>
  rabits: Array<RabitData>
  setRabits: React.Dispatch<React.SetStateAction<Array<RabitData>>>
  message: MessageTypes | null
  setMessage: React.Dispatch<React.SetStateAction<MessageTypes | null>>
  checkForSharedRabits: (rabits: Array<RabitData>) => Array<RabitData>
  getDoneNotHabitRabits: () => Array<RabitData>
  getNotDoneRabits: () => Array<RabitData>
  getNotDoneOrHabitRabits: () => Array<RabitData>
}
