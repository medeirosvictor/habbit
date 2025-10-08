import type { HabitData, MessageTypes } from '@/shared/types'

export interface HabitContextType {
  onUpdateHabit: (updatedHabit: HabitData, onlyDoneId?: number) => void
  onDeleteHabit: (id: number) => void
  onFetchHabits: () => Promise<void>
  onCreateHabit: (title: string) => void
  onDayChangeHabitUpdate: () => void
  onFetchHabit: (id: number) => Promise<HabitData | undefined>
  habits: Array<HabitData>
  setHabits: React.Dispatch<React.SetStateAction<Array<HabitData>>>
  message: MessageTypes | null
  setMessage: React.Dispatch<React.SetStateAction<MessageTypes | null>>
  checkForSharedHabits: (habits: Array<HabitData>) => Array<HabitData>
  getDoneNotHabitHabits: () => Array<HabitData>
  getNotDoneHabits: () => Array<HabitData>
  getNotDoneOrHabitHabits: () => Array<HabitData>
}
