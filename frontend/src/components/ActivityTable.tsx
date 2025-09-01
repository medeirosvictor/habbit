import type { ActivityData } from '@/shared/types'
import ActivityTableItem from './ActivityTableItem'
import AddActivityForm from './AddActivityForm'
import { useState } from 'react'

interface ActivityTableProps {
  activities: Array<ActivityData>
  setActivities: React.Dispatch<React.SetStateAction<Array<ActivityData>>>
}

function ActivityTable({ activities, setActivities }: ActivityTableProps) {
  const [openDetailId, setOpenDetailId] = useState<number | null>(null)

  const onDelete = (id: number) => {
    setActivities((prev: Array<ActivityData>) => prev.filter((act) => act.id !== id))
  }

  const onUpdate = (updatedActivity: ActivityData) => {
    setActivities((prev) =>
      prev.map((activity) =>
        activity.id === updatedActivity.id ? { ...activity, ...updatedActivity } : activity,
      ),
    )
  }

  return (
    <div className="border-1 drop-shadow-md">
      {activities?.map((activity) => (
        <ActivityTableItem
          activity={activity}
          key={activity.id}
          onDelete={onDelete}
          onUpdate={onUpdate}
          isOpen={openDetailId === activity.id}
          setOpenDetailId={setOpenDetailId}
        />
      ))}
      <AddActivityForm setActivities={setActivities} />
    </div>
  )
}

export default ActivityTable
