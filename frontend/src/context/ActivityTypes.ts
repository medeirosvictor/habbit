import type { ActivityData, MessageTypes } from '@/shared/types'

export interface ActivityContextType {
  onUpdateActivity: (updatedActivity: ActivityData, onlyDoneId?: number) => void
  onDeleteActivity: (id: number) => void
  onFetchActivities: () => Promise<void>
  onCreateActivity: (title: string) => void
  onDayChangeActivityUpdate: () => void
  onFetchActivity: (id: number) => Promise<ActivityData | undefined>
  activities: Array<ActivityData>
  setActivities: React.Dispatch<React.SetStateAction<Array<ActivityData>>>
  message: MessageTypes | null
  setMessage: React.Dispatch<React.SetStateAction<MessageTypes | null>>
  checkForSharedActivities: (activities: Array<ActivityData>) => Array<ActivityData>
}
