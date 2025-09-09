import type { ActivityData } from '@/shared/types'

export interface ActivityContextType {
  onUpdateActivity: (updatedActivity: ActivityData) => void
  onDeleteActivity: (id: number) => void
  onFetchActivities: () => Promise<void>
  onCreateActivity: (title: string) => void
  onDayChangeActivityUpdate: () => void
  activities: Array<ActivityData>
  setActivities: React.Dispatch<React.SetStateAction<Array<ActivityData>>>
}
