import type { ActivityData } from '@/shared/types'
import ActivityTableItem from './ActivityTableItem'
import AddActivityForm from './AddActivityForm'
import { useState } from 'react'
import { Link } from 'react-router'

interface ActivityTableProps {
  activities: Array<ActivityData>
  setActivities: React.Dispatch<React.SetStateAction<Array<ActivityData>>>
  isStaticTable?: boolean
}

function ActivityTable({ activities, setActivities, isStaticTable = true }: ActivityTableProps) {
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
    <div className="border-1 rounded-lg">
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
      {!isStaticTable ? (
        <AddActivityForm setActivities={setActivities} />
      ) : (
        <div className="p-4 text-center text-gray-500">
          No activities shared,{' '}
          <Link to="/activities" className="text-blue-500 underline">
            go share some!
          </Link>
        </div>
      )}
    </div>
  )
}

export default ActivityTable
